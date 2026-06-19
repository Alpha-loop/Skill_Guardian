import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const VALID_PROFESSIONAL_ROLES = [
  "care_assistant",
  "senior_carer",
  "rgn",
  "rmn",
  "nurse_associate",
  "clinical_lead",
  "manager",
  "admin",
  "other",
];

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

    // Verify caller is authenticated and is org_admin or super_admin
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const callerRole = user.app_metadata?.role;
    const callerOrgId = user.app_metadata?.organisation_id;
    if (!["org_admin", "super_admin"].includes(callerRole)) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { action } = body;

    if (action === "create") {
      const { email, first_name, last_name, professional_role, role, organisation_id, courses } = body;
      const orgId = organisation_id ?? callerOrgId;

      // Generate temp password
      const tempPassword = `SG${Math.random().toString(36).substring(2, 8)}${Math.random().toString(36).substring(2, 4).toUpperCase()}!`;

      // Verify organisation exists
      const { data: organisation, error: orgError } =
        await supabaseAdmin
          .from("organisations")
          .select("id, name, seat_limit")
          .eq("id", orgId)
          .single();

      if (orgError || !organisation) {
        return new Response(
          JSON.stringify({
            error: "Organisation not found",
          }),
          {
            status: 400,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Count active employees
      const { count: currentUsers, error: countError } =
        await supabaseAdmin
          .from("profiles")
          .select("*", {
            count: "exact",
            head: true,
          })
          .eq("organisation_id", orgId)
          .eq("is_active", true);

      if (countError) {
        return new Response(
          JSON.stringify({
            error:
              "Unable to verify seat availability",
          }),
          {
            status: 500,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }

      if (
        (currentUsers ?? 0) >=
        organisation.seat_limit
      ) {
        return new Response(
          JSON.stringify({
            error:
              `Seat limit reached (${organisation.seat_limit} users). Please upgrade your subscription.`,
          }),
          {
            status: 403,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }

      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email,
        password: tempPassword,
        email_confirm: true,
        user_metadata: { first_name, last_name, role: role ?? "employee" },
        app_metadata: { role: role ?? "employee", organisation_id: orgId },
      });

      if (createError) {
        return new Response(JSON.stringify({ error: createError.message }), {
          status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const userId = newUser.user.id;

      await supabaseAdmin.functions.invoke(
        "send-email",
        {
          body: {
            to: email,
            type: "welcome",
            data: {
              first_name,
              email,
              password: tempPassword,
              login_url:
                "https://skillguardian.com/login",
            },
          },
        }
      );

      await supabaseAdmin
        .from("notifications")
        .insert({
          user_id: userId,
          organisation_id: orgId,
          title: "Welcome to SkillGuardian",
          message:
            "Your account is ready. Please login and begin your assigned training.",
          type: "system",
          is_read: false,
        });

      await supabaseAdmin
        .from("audit_logs")
        .insert({
          organisation_id: orgId,
          performed_by: user.id,
          action: "employee_created",
          resource_type: "employee",
          resource_id: userId,
          details: {
            email,
            first_name,
            last_name,
            professional_role,
            creation_method: "manual",
          },
        });

      await supabaseAdmin.from("profiles").upsert({
        id: userId,
        email,
        first_name,
        last_name,
        role: role ?? "employee",
        professional_role,
        organisation_id: orgId,
        is_active: true,
      }, { onConflict: "id" });

      // Assign courses
      if (courses && courses.length > 0) {
        const rows = courses.map((course_id: string) => ({
          user_id: userId,
          course_id,
          status: "not_started",
        }));
        await supabaseAdmin.from("user_courses").insert(rows);
      }

     

      return new Response(JSON.stringify({ success: true, user_id: userId, temp_password: tempPassword }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "assign_courses") {
      const { user_id, course_ids } = body;

      // Remove existing, then add new ones
      await supabaseAdmin.from("user_courses").delete().eq("user_id", user_id);

      if (course_ids && course_ids.length > 0) {
        const rows = course_ids.map((course_id: string) => ({
          user_id,
          course_id,
          status: "not_started",
        }));
        await supabaseAdmin.from("user_courses").insert(rows);
      }

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "bulk_assign_courses") {
      const { user_ids, course_ids } = body;

      if (
        !user_ids ||
        !course_ids ||
        user_ids.length === 0 ||
        course_ids.length === 0
      ) {
        return new Response(
          JSON.stringify({
            error: "Users and courses are required",
          }),
          {
            status: 400,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }

      const rows = [];

      for (const user_id of user_ids) {
        for (const course_id of course_ids) {
          rows.push({
            user_id,
            course_id,
            status: "not_started",
          });
        }
      }

      const { error } =
        await supabaseAdmin
          .from("user_courses")
          .upsert(rows, {
            onConflict: "user_id,course_id",
          });

      if (error) {
        return new Response(
          JSON.stringify({
            error: error.message,
          }),
          {
            status: 400,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }

      await supabaseAdmin
        .from("audit_logs")
        .insert({
          organisation_id: callerOrgId,
          performed_by: user.id,
          action: "bulk_course_assignment",
          resource_type: "course_assignment",
          details: {
            employee_count: user_ids.length,
            course_count: course_ids.length,
          },
        });

      return new Response(
        JSON.stringify({
          success: true,
          assigned: rows.length,
        }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (action === "delete") {
      const { user_id } = body;

      if (!user_id) {
        return new Response(
          JSON.stringify({
            error: "User ID is required",
          }),
          {
            status: 400,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Load employee profile
      const { data: employee } =
        await supabaseAdmin
          .from("profiles")
          .select("*")
          .eq("id", user_id)
          .single();

      if (!employee) {
        return new Response(
          JSON.stringify({
            error: "Employee not found",
          }),
          {
            status: 404,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Org admin can only delete users in own organisation
      if (
        callerRole === "org_admin" &&
        employee.organisation_id !== callerOrgId
      ) {
        return new Response(
          JSON.stringify({
            error: "Forbidden",
          }),
          {
            status: 403,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Delete related records first

      await supabaseAdmin
        .from("user_courses")
        .delete()
        .eq("user_id", user_id);

      await supabaseAdmin
        .from("notifications")
        .delete()
        .eq("user_id", user_id);

      await supabaseAdmin
        .from("profiles")
        .delete()
        .eq("id", user_id);

      const { error: authDeleteError } =
        await supabaseAdmin.auth.admin.deleteUser(
          user_id
        );

      if (authDeleteError) {
        return new Response(
          JSON.stringify({
            error: authDeleteError.message,
          }),
          {
            status: 400,
            headers: {
              ...corsHeaders,
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Audit Log

      await supabaseAdmin
        .from("audit_logs")
        .insert({
          organisation_id:
            employee.organisation_id,
          performed_by: user.id,
          action: "employee_deleted",
          resource_type: "employee",
          resource_id: user_id,
          details: {
            email: employee.email,
            first_name:
              employee.first_name,
            last_name:
              employee.last_name,
          },
        });

      return new Response(
        JSON.stringify({
          success: true,
        }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type":
              "application/json",
          },
        }
      );
    }

    

    if (action === "bulk_create") {
      
      const { employees, organisation_id } = body;

      const orgId =
        organisation_id ?? callerOrgId;

      if (
        !employees ||
        !Array.isArray(employees) ||
        employees.length === 0
      ) {
        return new Response(
          JSON.stringify({
            error:
              "No employees supplied",
          }),
          {
            status: 400,
            headers: {
              ...corsHeaders,
              "Content-Type":
                "application/json",
            },
          }
        );
      }

      const { data: organisation } =
        await supabaseAdmin
          .from("organisations")
          .select(
            "id, seat_limit"
          )
          .eq("id", orgId)
          .single();

      const {
        count: currentUsers,
      } = await supabaseAdmin
        .from("profiles")
        .select("*", {
          count: "exact",
          head: true,
        })
        .eq(
          "organisation_id",
          orgId
        )
        .eq("is_active", true);

      const availableSeats =
        organisation.seat_limit -
        (currentUsers ?? 0);

      if (
        employees.length >
        availableSeats
      ) {
        return new Response(
          JSON.stringify({
            error:
              `Only ${availableSeats} seats available.`,
          }),
          {
            status: 403,
            headers: {
              ...corsHeaders,
              "Content-Type":
                "application/json",
            },
          }
        );
      }

      const results = [];
      const errors = [];

      for (
        let index = 0;
        index < employees.length;
        index++
      ) {
        const employee =
          employees[index];

        try {
          const {
            email,
            first_name,
            last_name,
            professional_role,
          } = employee;

          if (
            !email ||
            !first_name ||
            !last_name
          ) {
            errors.push({
              row: index + 1,
              reason:
                "Missing required fields",
            });
            continue;
          }

          if (
            !VALID_PROFESSIONAL_ROLES.includes(
              professional_role
            )
          ) {
            errors.push({
              row: index + 1,
              reason:
                "Invalid professional role",
            });
            continue;
          }

          const {
            data: existing,
          } =
            await supabaseAdmin
              .from("profiles")
              .select("id")
              .eq("email", email)
              .maybeSingle();

          if (existing) {
            errors.push({
              row: index + 1,
              reason:
                "Email already exists",
            });
            continue;
          }

          const tempPassword =
            `SG${Math.random()
              .toString(36)
              .substring(
                2,
                8
              )}!`;

          const {
            data: newUser,
            error:
              createUserError,
          } =
            await supabaseAdmin.auth.admin.createUser(
              {
                email,
                password:
                  tempPassword,
                email_confirm:
                  true,
                user_metadata: {
                  first_name,
                  last_name,
                  role:
                    "employee",
                },
                app_metadata: {
                  role:
                    "employee",
                  organisation_id:
                    orgId,
                },
              }
            );

          if (
            createUserError
          ) {
            errors.push({
              row: index + 1,
              reason:
                createUserError.message,
            });
            continue;
          }

          const userId =
            newUser.user.id;

          await supabaseAdmin
            .from("profiles")
            .insert({
              id: userId,
              organisation_id:
                orgId,
              email,
              first_name,
              last_name,
              role:
                "employee",
              professional_role,
              is_active:
                true,
            });

          await supabaseAdmin
            .from("notifications")
            .insert({
              user_id:
                userId,
              organisation_id:
                orgId,
              title:
                "Welcome to SkillGuardian",
              message:
                "Your account has been created.",
              type:
                "system",
              is_read:
                false,
            });

          await supabaseAdmin
            .from("audit_logs")
            .insert({
              organisation_id:
                orgId,
              performed_by:
                user.id,
              action:
                "employee_created",
              resource_type:
                "employee",
              resource_id:
                userId,
              details: {
                email,
                import_method:
                  "csv",
              },
            });

          results.push({
            email,
            user_id:
              userId,
          });
        } catch (
          error: any
        ) {
          errors.push({
            row: index + 1,
            reason:
              error.message,
          });
        }
      }

      return new Response(
        JSON.stringify({
          success: true,
          created:
            results.length,
          skipped:
            errors.length,
          results,
          errors,
        }),
        {
          headers: {
            ...corsHeaders,
            "Content-Type":
              "application/json",
          },
        }
      );
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
