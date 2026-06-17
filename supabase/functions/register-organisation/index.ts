import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

/**
 * register-organisation
 *
 * Public endpoint (no JWT required) that:
 *  1. Validates all inputs
 *  2. Checks the subdomain/email are not already taken
 *  3. Creates the organisation row
 *  4. Creates the admin auth user (email_confirm: true so they can log in immediately)
 *  5. Upserts the profile row with role = 'org_admin'
 *
 * Returns { success: true } on success.
 * Returns { error: string } with an appropriate HTTP status on failure.
 */

const TIER_SEAT_LIMITS: Record<string, number> = {
  basic: 10,
  standard: 30,
  premium: 100,
};

const TIER_CATEGORIES: Record<string, string[]> = {
  basic:    ["core_mandatory"],
  standard: ["core_mandatory", "legal_requirement", "role_based"],
  premium:  ["core_mandatory", "legal_requirement", "role_based", "clinical_nurse", "management_leadership"],
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 40);
}

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
    const {
      org_name,
      contact_person,
      contact_email,
      subscription_tier,
      admin_first_name,
      admin_last_name,
      admin_email,
      admin_password,
    } = body;

    // ── Validation ────────────────────────────────────────────────────────────
    const missing = [
      ["Organisation name", org_name],
      ["Contact person", contact_person],
      ["Contact email", contact_email],
      ["Subscription tier", subscription_tier],
      ["Admin first name", admin_first_name],
      ["Admin last name", admin_last_name],
      ["Admin email", admin_email],
      ["Password", admin_password],
    ].filter(([, v]) => !v?.trim()).map(([k]) => k);

    if (missing.length > 0) {
      return errResponse(`Missing required fields: ${missing.join(", ")}`, 400);
    }

    if (!["basic", "standard", "premium"].includes(subscription_tier)) {
      return errResponse("Invalid subscription tier.", 400);
    }

    if (admin_password.length < 8) {
      return errResponse("Password must be at least 8 characters.", 400);
    }

    // ── Check for duplicate email ─────────────────────────────────────────────
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", admin_email.toLowerCase().trim())
      .maybeSingle();

    if (existingUser) {
      return errResponse("An account with this email address already exists.", 409);
    }

    // ── Generate unique subdomain ─────────────────────────────────────────────
    let subdomain = slugify(org_name);
    const { data: existing } = await supabase
      .from("organisations")
      .select("subdomain")
      .eq("subdomain", subdomain)
      .maybeSingle();

    if (existing) {
      subdomain = `${subdomain}-${Date.now().toString(36)}`;
    }

    // ── Create organisation ───────────────────────────────────────────────────
    const { data: org, error: orgErr } = await supabase
      .from("organisations")
      .insert({
        name: org_name.trim(),
        subdomain,
        contact_email: contact_email.toLowerCase().trim(),
        contact_person: contact_person.trim(),
        subscription_tier,
        seat_limit: TIER_SEAT_LIMITS[subscription_tier],
        is_active: true,
      })
      .select()
      .single();

    if (orgErr) {
      console.error("Org creation error:", orgErr);
      return errResponse("Failed to create organisation. Please try again.", 500);
    }

    // ── Create admin auth user ────────────────────────────────────────────────
    const { data: newUser, error: userErr } = await supabase.auth.admin.createUser({
      email: admin_email.toLowerCase().trim(),
      password: admin_password,
      email_confirm: true,
      user_metadata: {
        first_name: admin_first_name.trim(),
        last_name: admin_last_name.trim(),
        role: "org_admin",
      },
      app_metadata: {
        role: "org_admin",
        organisation_id: org.id,
      },
    });

    if (userErr) {
      // Roll back the organisation if user creation fails
      await supabase.auth.admin.deleteUser(newUser.user.id);
      await supabase.from("organisations").delete().eq("id", org.id);
      console.error("Auth user creation error:", userErr);
      return errResponse(userErr.message, 400);
    }

    // ── Upsert profile ────────────────────────────────────────────────────────
    const { error: profileErr } = await supabase.from("profiles").upsert({
      id: newUser.user.id,
      email: admin_email.toLowerCase().trim(),
      first_name: admin_first_name.trim(),
      last_name: admin_last_name.trim(),
      role: "org_admin",
      professional_role: "admin",
      organisation_id: org.id,
      is_active: true,
    }, { onConflict: "id" });

    if (profileErr) {
      // Best-effort rollback
      await supabase.auth.admin.deleteUser(newUser.user.id);
      await supabase.from("organisations").delete().eq("id", org.id);
      console.error("Profile upsert error:", profileErr);
      return errResponse("Failed to create user profile. Please try again.", 500);
    }

    const allowedCategories = TIER_CATEGORIES[subscription_tier];

    const { data: tierCourses, error: coursesErr } = await supabase
      .from("courses")
      .select("id, category, target_role")
      .in("category", allowedCategories)
      .eq("is_active", true);

    if (!coursesErr && tierCourses && tierCourses.length > 0) {
      // 1. Populate org_course_library for this organisation
      const libraryRows = tierCourses.map((c: any) => ({
        organisation_id: org.id,
        course_id: c.id,
        assigned_by: newUser.user.id,
      }));

      const { error: libraryErr } = await supabase
        .from("org_course_library")
        .upsert(libraryRows, { onConflict: "organisation_id,course_id", ignoreDuplicates: true });

      if (libraryErr) {
        console.error("org_course_library insert error:", libraryErr);
      }

      // 2. Assign courses to the admin user personally.
      // Admin (registered manager) receives:
      //   - all_staff courses from every allowed category
      //   - all management_leadership courses (regardless of target_role) since they are the manager
      const adminCourses = tierCourses.filter((c: any) =>
        c.target_role === "all_staff" ||
        c.category === "management_leadership"
      );

      if (adminCourses.length > 0) {
        const userCourseRows = adminCourses.map((c: any) => ({
          user_id: newUser.user.id,
          course_id: c.id,
          status: "not_started",
        }));

        const { error: ucErr } = await supabase
          .from("user_courses")
          .upsert(userCourseRows, { onConflict: "user_id,course_id", ignoreDuplicates: true });

        if (ucErr) {
          console.error("user_courses insert error:", ucErr);
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true, organisation_id: org.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("register-organisation error:", err);
    return errResponse(err.message ?? "Unexpected error", 500);
  }
});

function errResponse(message: string, status: number) {
  return new Response(
    JSON.stringify({ error: message }),
    { status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}
