import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const CARE_CERT_COURSE_ID = "10000000-0000-0000-0000-000000000012";
const CARE_CERT_BUNDLE_ID = "b0000000-0000-0000-0000-000000000001";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const body = await req.json();
    const { first_name, last_name, email, password, plan, professional_role } = body;

    // ── Validation ────────────────────────────────────────────────────────────
    const missing = [
      ["First name", first_name],
      ["Last name", last_name],
      ["Email", email],
      ["Password", password],
      ["Plan", plan],
    ].filter(([, v]) => !v?.trim()).map(([k]) => k);

    if (missing.length > 0) {
      return err(`Missing required fields: ${missing.join(", ")}`, 400);
    }

    if (!["care_certificate", "full_access"].includes(plan)) {
      return err("Invalid plan selected.", 400);
    }

    if (password.length < 8) {
      return err("Password must be at least 8 characters.", 400);
    }

    // ── Check for duplicate email ─────────────────────────────────────────────
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email.toLowerCase().trim())
      .maybeSingle();

    if (existing) {
      return err("An account with this email address already exists.", 409);
    }

    // ── Create auth user ──────────────────────────────────────────────────────
    const { data: newUser, error: userErr } = await supabase.auth.admin.createUser({
      email: email.toLowerCase().trim(),
      password,
      email_confirm: true,
      user_metadata: {
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        account_type: "individual",
      },
      app_metadata: {
        role: "employee",
        account_type: "individual",
      },
    });

    if (userErr) {
      return err(userErr.message, 400);
    }

    const userId = newUser.user.id;

    // ── Upsert profile ────────────────────────────────────────────────────────
    const { error: profileErr } = await supabase.from("profiles").upsert({
      id: userId,
      email: email.toLowerCase().trim(),
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      role: "employee",
      professional_role: professional_role?.trim() || "care_assistant",
      organisation_id: null,
      account_type: "individual",
      is_active: true,
    }, { onConflict: "id" });

    if (profileErr) {
      console.error(
        "PROFILE ERROR:",
        JSON.stringify(profileErr, null, 2)
      );

      await supabase.auth.admin.deleteUser(userId);

      return err(
        profileErr.message,
        500
      );
    }

    // ── Record individual subscription ────────────────────────────────────────
    const { error: subErr } =
      await supabase
        .from(
          "individual_subscriptions"
        )
        .insert({
          user_id: userId,
          plan,
          status: "pending",
        });

    if (subErr) {
      console.error("Subscription insert error:", subErr);
      // Non-fatal — continue
    }

    // ── Auto-assign Care Certificate course ───────────────────────────────────
    const { error: ucErr } = await supabase.from("user_courses").insert({
      user_id: userId,
      course_id: CARE_CERT_COURSE_ID,
      status: "not_started",
    });

    if (ucErr) {
      console.error("user_courses insert error:", ucErr);
    }

    // Record bundle assignment
    const { error: bundleErr } = await supabase.from("user_bundle_assignments").insert({
      user_id: userId,
      bundle_id: CARE_CERT_BUNDLE_ID,
      assigned_by: null,
    });

    if (bundleErr) {
      console.error("bundle assignment error:", bundleErr);
    }

    // ── If full_access, assign ALL active courses ─────────────────────────────
    if (plan === "full_access") {
      const { data: allCourses } = await supabase
        .from("courses")
        .select("id")
        .eq("is_active", true)
        .is("organisation_id", null)
        .neq("id", CARE_CERT_COURSE_ID); // already assigned above

      if (allCourses && allCourses.length > 0) {
        const rows = allCourses.map((c: any) => ({
          user_id: userId,
          course_id: c.id,
          status: "not_started",
        }));
        const { error: bulkErr } = await supabase.from("user_courses").insert(rows);
        if (bulkErr) console.error("bulk course assign error:", bulkErr);
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e: any) {
    console.error(
      "REGISTER-INDIVIDUAL CRASH:",
      e
    );

    return new Response(
      JSON.stringify({
        error: e?.message ?? String(e),
        stack: e?.stack ?? null,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type":
            "application/json",
        },
      }
    );
  }
});

function err(message: string, status: number) {
  return new Response(
    JSON.stringify({ error: message }),
    { status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}
