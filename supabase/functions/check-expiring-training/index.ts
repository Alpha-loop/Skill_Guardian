import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

/**
 * check-expiring-training
 *
 * Scans training_expiry_status view and upserts in-app notifications for:
 *   Employees:
 *     - 60 days before expiry  → expiry_warning
 *     - 30 days before expiry  → expiry_warning
 *     - 7 days before expiry   → expiry_warning
 *     - Past expiry            → expiry_overdue
 *
 *   Org admins (one digest per org per run):
 *     - admin_expiry_summary listing all affected employees + courses
 *
 * Deduplication: one notification per (user_id, course_id, title) for employee alerts.
 * Admin summaries: one per (admin_id, date) — keyed by today's date in the title.
 *
 * Intended to be called by a Supabase cron job (pg_cron) once per day.
 */

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } }
    );

    // Fetch all expiry rows from the view
    const { data: expiryRows, error: viewErr } = await supabase
      .from("training_expiry_status")
      .select("*");

    if (viewErr) throw viewErr;
    if (!expiryRows || expiryRows.length === 0) {
      return jsonResponse({ processed: 0, notifications_created: 0 });
    }

    

    // Fetch existing notifications to avoid duplicates
    const { data: existing } = await supabase
      .from("notifications")
      .select("user_id, related_course_id, title");

    const existingKeys = new Set(
      (existing ?? []).map(
        (n: any) => `${n.user_id}::${n.related_course_id ?? ""}::${n.title}`
      )
    );

    // Fetch all org admins so we can send them digest notifications
    const { data: orgAdmins } = await supabase
      .from("profiles")
      .select("id, organisation_id, first_name, last_name")
      .eq("role", "org_admin")
      .eq("is_active", true);

    // Build a map: organisation_id → list of admin profile rows
    const adminsByOrg = new Map<string, any[]>();
    for (const admin of (orgAdmins ?? [])) {
      if (!admin.organisation_id) continue;
      const list = adminsByOrg.get(admin.organisation_id) ?? [];
      list.push(admin);
      adminsByOrg.set(admin.organisation_id, list);
    }

    const toInsert: any[] = [];

    // ── Employee notifications ────────────────────────────────────────────────
    for (const row of expiryRows) {
      const { user_id, organisation_id, first_name, course_id, course_title, days_until_expiry, expires_at } = row;

      const thresholds = [
        { days: 60, label: "60 days", urgent: false },
        { days: 30, label: "30 days", urgent: true },
        { days: 7,  label: "7 days",  urgent: true },
      ];

      if (days_until_expiry !== null && days_until_expiry <= 0) {
        const title = `Training overdue: ${course_title}`;
        const key = `${user_id}::${course_id}::${title}`;
        if (!existingKeys.has(key)) {
          toInsert.push({
            user_id,
            organisation_id,
            type: "expiry_overdue",
            title,
            message: `Your ${course_title} certification has expired. Please complete your refresher training as soon as possible to maintain CQC compliance.`,
            related_course_id: course_id,
            expires_on: expires_at,
            read: false,
          });
          existingKeys.add(key);

          const { data: employeeProfile } = await supabase
            .from("profiles")
            .select("email, first_name")
            .eq("id", user_id)
            .single();

          if (employeeProfile?.email) {
            await fetch(
              `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-email`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${Deno.env.get(
                    "SUPABASE_SERVICE_ROLE_KEY"
                  )}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  to: employeeProfile.email,
                  type: "training_overdue",
                  data: {
                    first_name: employeeProfile.first_name,
                    course: course_title,
                  },
                }),
              }
            );
          }
        }
      } else if (days_until_expiry !== null) {
        for (const threshold of thresholds) {
          if (days_until_expiry <= threshold.days) {
            const title = `${course_title} expires in ${threshold.label}`;
            const key = `${user_id}::${course_id}::${title}`;
            if (!existingKeys.has(key)) {
              toInsert.push({
                user_id,
                organisation_id,
                type: "expiry_warning",
                title,
                message: `Your ${course_title} certification is due for renewal in ${threshold.label}. Book your refresher training to stay compliant.`,
                related_course_id: course_id,
                expires_on: expires_at,
                read: false,
              });
              existingKeys.add(key);

              const { data: employeeProfile } = await supabase
                .from("profiles")
                .select("email, first_name")
                .eq("id", user_id)
                .single();

              if (employeeProfile?.email) {
                await fetch(
                  `${Deno.env.get("SUPABASE_URL")}/functions/v1/send-email`,
                  {
                    method: "POST",
                    headers: {
                      Authorization: `Bearer ${Deno.env.get(
                        "SUPABASE_SERVICE_ROLE_KEY"
                      )}`,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      to: employeeProfile.email,
                      type: "training_expiring",
                      data: {
                        first_name: employeeProfile.first_name,
                        course: course_title,
                        days: days_until_expiry,
                      },
                    }),
                  }
                );
              }
            }
            break;
          }
        }
      }
    }

    // ── Admin digest notifications ────────────────────────────────────────────
    // Group expiring/overdue rows by organisation
    type AlertRow = {
      employee_name: string;
      course_title: string;
      days_until_expiry: number | null;
      expires_at: string | null;
    };
    const alertsByOrg = new Map<string, AlertRow[]>();

    for (const row of expiryRows) {
      const { organisation_id, first_name, last_name, course_title, days_until_expiry, expires_at } = row;
      if (!organisation_id) continue;
      if (days_until_expiry === null) continue;
      // Only include rows within 60 days or overdue
      if (days_until_expiry > 60) continue;

      const list = alertsByOrg.get(organisation_id) ?? [];
      list.push({
        employee_name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
        course_title,
        days_until_expiry,
        expires_at,
      });
      alertsByOrg.set(organisation_id, list);
    }

    

    const todayLabel = new Date().toISOString().split("T")[0]; // e.g. "2026-05-28"

    for (const [orgId, alerts] of alertsByOrg.entries()) {
      const admins = adminsByOrg.get(orgId);
      if (!admins || admins.length === 0) continue;

      // Sort: overdue first, then by days ascending
      alerts.sort((a, b) => {
        const da = a.days_until_expiry ?? -999;
        const db = b.days_until_expiry ?? -999;
        return da - db;
      });

      const overdueCount = alerts.filter(a => (a.days_until_expiry ?? 0) <= 0).length;
      const warningCount = alerts.length - overdueCount;

      // Build a human-readable message listing each employee + course
      const lines: string[] = [];
      if (overdueCount > 0) {
        lines.push(`OVERDUE (${overdueCount}):`);
        for (const a of alerts.filter(r => (r.days_until_expiry ?? 0) <= 0)) {
          lines.push(`  • ${a.employee_name} — ${a.course_title} (expired)`);
        }
      }
      if (warningCount > 0) {
        lines.push(`\nDUE FOR RENEWAL (${warningCount}):`);
        for (const a of alerts.filter(r => (r.days_until_expiry ?? 0) > 0)) {
          const d = a.days_until_expiry!;
          const when = d <= 7 ? `${d} day${d === 1 ? "" : "s"}` : d <= 30 ? `${d} days` : `${d} days`;
          lines.push(`  • ${a.employee_name} — ${a.course_title} (in ${when})`);
        }
      }

      const message = lines.join("\n");
      const title = `Training compliance alert — ${todayLabel}`;

      for (const admin of admins) {
        // One digest per admin per day — keyed on title containing the date
        const key = `${admin.id}::${null}::${title}`;
        if (existingKeys.has(key)) continue;

        toInsert.push({
          user_id: admin.id,
          organisation_id: orgId,
          type: "admin_expiry_summary",
          title,
          message,
          related_course_id: null,
          expires_on: null,
          read: false,
        });
        existingKeys.add(key);
      }
    }

    let created = 0;
    if (toInsert.length > 0) {
      const { error: insertErr } = await supabase
        .from("notifications")
        .insert(toInsert);
      if (insertErr) throw insertErr;
      created = toInsert.length;
    }

    return jsonResponse({
      processed: expiryRows.length,
      notifications_created: created,
    });
  } catch (err: any) {
    console.error("check-expiring-training error:", err);
    return new Response(
      JSON.stringify({ error: err.message ?? "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function jsonResponse(data: unknown) {
  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
