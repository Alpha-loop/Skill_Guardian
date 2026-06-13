import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SUPPORT_EMAIL = "support@skillguardian.co.uk";
const FROM_EMAIL    = "noreply@skillguardian.co.uk";
const FROM_NAME     = "SkillGuardian Contact Form";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { name, email, organisation, subject, message } = body;

    // ── Basic validation ──────────────────────────────────────────────────────
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return errRes("Missing required fields: name, email, subject, message.", 400);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return errRes("Invalid email address.", 400);
    }
    if (message.trim().length < 10) {
      return errRes("Message is too short.", 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false } }
    );

    // ── Persist to DB (always, regardless of email outcome) ───────────────────
    const { error: dbErr } = await supabase.from("contact_submissions").insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      organisation: organisation?.trim() ?? "",
      subject: subject.trim(),
      message: message.trim(),
    });

    if (dbErr) {
      console.error("DB insert error:", dbErr);
      // Non-fatal — still try to send the email
    }

    // ── Send email via Resend ─────────────────────────────────────────────────
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

    if (RESEND_API_KEY) {
      const orgLine = organisation?.trim()
        ? `<tr><td style="padding:4px 0;color:#64748b;font-size:13px;width:140px">Organisation</td><td style="padding:4px 0;font-size:13px;color:#0f172a">${escHtml(organisation.trim())}</td></tr>`
        : "";

      const htmlBody = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family:Inter,Helvetica,Arial,sans-serif;background:#f8fafc;margin:0;padding:32px 16px">
  <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:12px;border:1px solid #e2e8f0;overflow:hidden">

    <!-- Header -->
    <div style="background:#005EB8;padding:24px 32px;display:flex;align-items:center;gap:12px">
      <div style="width:36px;height:36px;background:#ffffff;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;font-weight:700;font-size:14px;color:#005EB8">SG</div>
      <span style="color:#ffffff;font-size:18px;font-weight:700;margin-left:10px">SkillGuardian</span>
      <span style="color:#bfdbfe;font-size:14px;margin-left:6px">— New Contact Submission</span>
    </div>

    <!-- Body -->
    <div style="padding:32px">
      <p style="margin:0 0 20px;font-size:15px;color:#334155">
        A new contact form submission has been received. Details below.
      </p>

      <!-- Sender details table -->
      <div style="background:#f1f5f9;border-radius:8px;padding:20px;margin-bottom:24px">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:4px 0;color:#64748b;font-size:13px;width:140px">Name</td><td style="padding:4px 0;font-size:13px;color:#0f172a;font-weight:600">${escHtml(name.trim())}</td></tr>
          <tr><td style="padding:4px 0;color:#64748b;font-size:13px">Email</td><td style="padding:4px 0;font-size:13px"><a href="mailto:${escHtml(email)}" style="color:#005EB8">${escHtml(email)}</a></td></tr>
          ${orgLine}
          <tr><td style="padding:4px 0;color:#64748b;font-size:13px">Subject</td><td style="padding:4px 0;font-size:13px;color:#0f172a">${escHtml(subject.trim())}</td></tr>
        </table>
      </div>

      <!-- Message -->
      <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#475569;text-transform:uppercase;letter-spacing:0.05em">Message</p>
      <div style="background:#f8fafc;border-left:4px solid #005EB8;border-radius:0 8px 8px 0;padding:16px;font-size:14px;color:#334155;line-height:1.7;white-space:pre-wrap">${escHtml(message.trim())}</div>

      <!-- Reply hint -->
      <p style="margin:24px 0 0;font-size:13px;color:#94a3b8">
        Reply directly to this email to respond to ${escHtml(name.trim())} at <a href="mailto:${escHtml(email)}" style="color:#005EB8">${escHtml(email)}</a>.
      </p>
    </div>

    <!-- Footer -->
    <div style="padding:16px 32px;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8;text-align:center">
      SkillGuardian · CQC-Compliant Training Platform · skillguardian.co.uk
    </div>
  </div>
</body>
</html>`;

      const plainText = [
        `New contact form submission — SkillGuardian`,
        ``,
        `Name:         ${name.trim()}`,
        `Email:        ${email.trim()}`,
        organisation?.trim() ? `Organisation: ${organisation.trim()}` : null,
        `Subject:      ${subject.trim()}`,
        ``,
        `Message:`,
        message.trim(),
        ``,
        `---`,
        `Reply to: ${email.trim()}`,
      ].filter(l => l !== null).join("\n");

      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: `${FROM_NAME} <${FROM_EMAIL}>`,
          to: [SUPPORT_EMAIL],
          reply_to: email.trim(),
          subject: `[Contact] ${subject.trim()} — ${name.trim()}`,
          html: htmlBody,
          text: plainText,
        }),
      });

      if (!resendRes.ok) {
        const errBody = await resendRes.text();
        console.error("Resend error:", resendRes.status, errBody);
        // Still return success to the user since we saved to DB
      }
    } else {
      console.warn("RESEND_API_KEY not set — submission saved to DB only.");
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("send-contact-email error:", err);
    return errRes(err.message ?? "Unexpected error", 500);
  }
});

function errRes(message: string, status: number) {
  return new Response(
    JSON.stringify({ error: message }),
    { status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
}

function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
