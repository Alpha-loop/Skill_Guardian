import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const CARE_CERT_COURSE_ID = "10000000-0000-0000-0000-000000000012";
    const CARE_CERT_BUNDLE_ID = "b0000000-0000-0000-0000-000000000001";

    // Handle individual demo user separately (needs account_type + subscription)
    const indEmail = "individual@demo.skillguardian.com";
    const { data: existingInd } = await supabaseAdmin.auth.admin.listUsers();
    const foundInd = existingInd?.users?.find((x) => x.email === indEmail);
    if (!foundInd) {
      const { data: indUser, error: indErr } = await supabaseAdmin.auth.admin.createUser({
        email: indEmail,
        password: "Demo1234!",
        email_confirm: true,
        user_metadata: { first_name: "Jade", last_name: "Harper", account_type: "individual" },
        app_metadata: { role: "employee", account_type: "individual" },
      });
      if (!indErr && indUser?.user) {
        const uid = indUser.user.id;
        await supabaseAdmin.from("profiles").upsert({
          id: uid,
          email: indEmail,
          first_name: "Jade",
          last_name: "Harper",
          role: "employee",
          professional_role: "care_assistant",
          organisation_id: null,
          account_type: "individual",
          is_active: true,
        }, { onConflict: "id" });
        await supabaseAdmin.from("individual_subscriptions").insert({
          user_id: uid,
          plan: "care_certificate",
          status: "active",
        });
        await supabaseAdmin.from("user_courses").insert({
          user_id: uid,
          course_id: CARE_CERT_COURSE_ID,
          status: "not_started",
        });
        await supabaseAdmin.from("user_bundle_assignments").insert({
          user_id: uid,
          bundle_id: CARE_CERT_BUNDLE_ID,
          assigned_by: null,
        });
      }
    }

    const demoUsers = [
      {
        email: "superadmin@skillguardian.com",
        password: "Demo1234!",
        user_metadata: { first_name: "Super", last_name: "Admin", role: "super_admin" },
        app_metadata: { role: "super_admin", organisation_id: null },
        role: "super_admin",
        organisation_id: null as string | null,
        professional_role: "admin",
        courses: [],
      },
      {
        email: "admin@sunrisecare.com",
        password: "Demo1234!",
        user_metadata: { first_name: "Sarah", last_name: "Johnson", role: "org_admin" },
        app_metadata: { role: "org_admin", organisation_id: "20000000-0000-0000-0000-000000000001" },
        role: "org_admin",
        organisation_id: "20000000-0000-0000-0000-000000000001",
        professional_role: "manager",
        courses: [],
      },
      {
        email: "nurse@sunrisecare.com",
        password: "Demo1234!",
        user_metadata: { first_name: "Emma", last_name: "Clarke", role: "employee" },
        app_metadata: { role: "employee", organisation_id: "20000000-0000-0000-0000-000000000001" },
        role: "employee",
        organisation_id: "20000000-0000-0000-0000-000000000001",
        professional_role: "rgn",
        courses: [
          { course_id: "10000000-0000-0000-0000-000000000001", status: "passed", quiz_score: 92 },
          { course_id: "10000000-0000-0000-0000-000000000003", status: "in_progress", quiz_score: null },
          { course_id: "10000000-0000-0000-0000-000000000007", status: "passed", quiz_score: 88 },
          { course_id: "10000000-0000-0000-0000-000000000009", status: "not_started", quiz_score: null },
          { course_id: "10000000-0000-0000-0000-000000000024", status: "in_progress", quiz_score: null },
          { course_id: "10000000-0000-0000-0000-000000000029", status: "passed", quiz_score: 95 },
          { course_id: "10000000-0000-0000-0000-000000000021", status: "not_started", quiz_score: null },
          { course_id: "10000000-0000-0000-0000-000000000026", status: "not_started", quiz_score: null },
        ],
      },
      {
        email: "carer@sunrisecare.com",
        password: "Demo1234!",
        user_metadata: { first_name: "Tom", last_name: "Davies", role: "employee" },
        app_metadata: { role: "employee", organisation_id: "20000000-0000-0000-0000-000000000001" },
        role: "employee",
        organisation_id: "20000000-0000-0000-0000-000000000001",
        professional_role: "care_assistant",
        courses: [
          { course_id: "10000000-0000-0000-0000-000000000001", status: "passed", quiz_score: 85 },
          { course_id: "10000000-0000-0000-0000-000000000003", status: "passed", quiz_score: 90 },
          { course_id: "10000000-0000-0000-0000-000000000007", status: "not_started", quiz_score: null },
          { course_id: "10000000-0000-0000-0000-000000000012", status: "in_progress", quiz_score: null },
          { course_id: "10000000-0000-0000-0000-000000000016", status: "passed", quiz_score: 78 },
          { course_id: "10000000-0000-0000-0000-000000000017", status: "in_progress", quiz_score: null },
          { course_id: "10000000-0000-0000-0000-000000000015", status: "not_started", quiz_score: null },
          { course_id: "10000000-0000-0000-0000-000000000018", status: "not_started", quiz_score: null },
        ],
      },
      {
        email: "seniorcarer@sunrisecare.com",
        password: "Demo1234!",
        user_metadata: { first_name: "Priya", last_name: "Singh", role: "employee" },
        app_metadata: { role: "employee", organisation_id: "20000000-0000-0000-0000-000000000001" },
        role: "employee",
        organisation_id: "20000000-0000-0000-0000-000000000001",
        professional_role: "senior_carer",
        // Preserve existing course assignments — do not wipe them
        courses: null,
      },
      {
        email: "manager@sunrisecare.com",
        password: "Demo1234!",
        user_metadata: { first_name: "David", last_name: "Brooks", role: "employee" },
        app_metadata: { role: "employee", organisation_id: "20000000-0000-0000-0000-000000000001" },
        role: "employee",
        organisation_id: "20000000-0000-0000-0000-000000000001",
        professional_role: "manager",
        // Preserve existing course assignments — do not wipe them
        courses: null,
      },
    ];

    const results = [];
    const { data: existing } = await supabaseAdmin.auth.admin.listUsers();

    for (const u of demoUsers) {
      const found = existing?.users?.find((x) => x.email === u.email);
      let userId: string;

      if (found) {
        // Check if this is a broken raw-SQL user (30000000-... prefix) — delete and recreate
        const isBroken = found.id.startsWith("30000000");
        if (isBroken) {
          // Save existing course assignments before deleting
          const { data: savedCourses } = await supabaseAdmin
            .from("user_courses")
            .select("*")
            .eq("user_id", found.id);

          const { data: savedCerts } = await supabaseAdmin
            .from("certificate_requests")
            .select("*")
            .eq("user_id", found.id);

          // Delete old broken auth user (cascades identities)
          await supabaseAdmin.auth.admin.deleteUser(found.id);

          // Recreate via Admin API (proper Supabase-managed user)
          const { data: newUser, error: createErr } = await supabaseAdmin.auth.admin.createUser({
            email: u.email,
            password: u.password,
            email_confirm: true,
            user_metadata: u.user_metadata,
            app_metadata: u.app_metadata,
          });

          if (createErr || !newUser?.user) {
            results.push({ email: u.email, action: "error", error: createErr?.message });
            continue;
          }

          userId = newUser.user.id;

          // Upsert profile with new UUID
          await supabaseAdmin.from("profiles").delete().eq("id", found.id);
          await supabaseAdmin.from("profiles").insert({
            id: userId,
            email: u.email,
            first_name: u.user_metadata.first_name,
            last_name: u.user_metadata.last_name,
            role: u.role,
            organisation_id: u.organisation_id,
            professional_role: u.professional_role,
            is_active: true,
          });

          // Restore course assignments under new UUID
          if (savedCourses && savedCourses.length > 0) {
            for (const c of savedCourses) {
              await supabaseAdmin.from("user_courses").insert({
                ...c,
                id: undefined,
                user_id: userId,
              });
            }
          }

          // Restore certificate requests under new UUID
          if (savedCerts && savedCerts.length > 0) {
            for (const cert of savedCerts) {
              await supabaseAdmin.from("certificate_requests").insert({
                ...cert,
                id: undefined,
                user_id: userId,
              });
            }
          }

          results.push({ email: u.email, action: "recreated", oldId: found.id, newId: userId });
        } else {
          // Normal update for non-broken users
          await supabaseAdmin.auth.admin.updateUserById(found.id, {
            password: u.password,
            email_confirm: true,
            user_metadata: u.user_metadata,
            app_metadata: u.app_metadata,
          });
          userId = found.id;

          await supabaseAdmin.from("profiles").upsert({
            id: userId,
            email: u.email,
            first_name: u.user_metadata.first_name,
            last_name: u.user_metadata.last_name,
            role: u.role,
            organisation_id: u.organisation_id,
            professional_role: u.professional_role,
            is_active: true,
          }, { onConflict: "id" });

          if (u.courses && u.courses.length > 0) {
            await supabaseAdmin.from("user_courses").delete().eq("user_id", userId);
            for (const c of u.courses) {
              await supabaseAdmin.from("user_courses").insert({
                user_id: userId,
                course_id: c.course_id,
                status: c.status,
                started_at: c.status !== "not_started" ? new Date().toISOString() : null,
                quiz_score: c.quiz_score ?? null,
                completed_at: c.status === "passed" ? new Date().toISOString() : null,
              });
            }
          }

          results.push({ email: u.email, action: "updated", id: userId });
        }
      } else {
        // Create brand new user
        const { data, error } = await supabaseAdmin.auth.admin.createUser({
          email: u.email,
          password: u.password,
          email_confirm: true,
          user_metadata: u.user_metadata,
          app_metadata: u.app_metadata,
        });
        if (error) {
          results.push({ email: u.email, action: "error", error: error.message });
          continue;
        }
        userId = data.user.id;

        await supabaseAdmin.from("profiles").upsert({
          id: userId,
          email: u.email,
          first_name: u.user_metadata.first_name,
          last_name: u.user_metadata.last_name,
          role: u.role,
          organisation_id: u.organisation_id,
          professional_role: u.professional_role,
          is_active: true,
        }, { onConflict: "id" });

        if (u.courses && u.courses.length > 0) {
          for (const c of u.courses) {
            await supabaseAdmin.from("user_courses").insert({
              user_id: userId,
              course_id: c.course_id,
              status: c.status,
              started_at: c.status !== "not_started" ? new Date().toISOString() : null,
              quiz_score: c.quiz_score ?? null,
              completed_at: c.status === "passed" ? new Date().toISOString() : null,
            });
          }
        }

        results.push({ email: u.email, action: "created", id: userId });
      }
    }

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
