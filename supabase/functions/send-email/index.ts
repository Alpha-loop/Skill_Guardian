import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

type EmailType =
  | "welcome"
  | "certificate_approved"
  | "certificate_rejected"
  | "training_expiring"
  | "training_overdue"
  | "password_reset";

interface EmailTemplate {
  subject: string;
  html: string;
}

function buildTemplate(
  type: EmailType,
  data: Record<string, unknown>
): EmailTemplate | null {
  switch (type) {
    case "welcome":
      return {
        subject: "Welcome to SkillGuardian",
        html: `
          <h2>Welcome to SkillGuardian</h2>

          <p>Hello ${data.first_name ?? ""},</p>

          <p>Your account has been created.</p>

          <p><strong>Email:</strong> ${data.email ?? ""}</p>
          <p><strong>Temporary Password:</strong> ${data.password ?? ""}</p>

          <p>
            Login here:
            <a href="${data.login_url ?? "#"}">
              ${data.login_url ?? ""}
            </a>
          </p>
        `,
      };

    case "certificate_approved":
      return {
        subject: "Certificate Approved",
        html: `
          <h2>Certificate Approved</h2>

          <p>Hello ${data.first_name ?? ""},</p>

          <p>Your certificate request has been approved.</p>

          <p><strong>Course:</strong> ${data.course ?? ""}</p>
          <p><strong>Certificate ID:</strong> ${data.certificate_id ?? ""}</p>
        `,
      };

    case "certificate_rejected":
      return {
        subject: "Certificate Request Rejected",
        html: `
          <h2>Certificate Request Rejected</h2>

          <p>Hello ${data.first_name ?? ""},</p>

          <p>Your certificate request was rejected.</p>

          <p><strong>Course:</strong> ${data.course ?? ""}</p>

          <p>
            <strong>Reason:</strong><br />
            ${data.reason ?? ""}
          </p>
        `,
      };

    case "training_expiring":
      return {
        subject: "Training Expiry Reminder",
        html: `
          <h2>Training Expiry Reminder</h2>

          <p>
            ${data.course ?? "Training"} expires in
            ${data.days ?? 0} days.
          </p>
        `,
      };

    case "training_overdue":
      return {
        subject: "Training Overdue",
        html: `
          <h2>Training Overdue</h2>

          <p>
            ${data.course ?? "Training"} has expired.
          </p>
        `,
      };

    case "password_reset":
      return {
        subject: "Reset Your Password",
        html: `
          <h2>Password Reset</h2>

          <p>Hello ${data.first_name ?? ""},</p>

          <p>
            Click the link below to reset your password:
          </p>

          <p>
            <a href="${data.reset_link ?? "#"}">
              Reset Password
            </a>
          </p>
        `,
      };

    default:
      return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    const RESEND_API_KEY =
      Deno.env.get("RESEND_API_KEY");

    if (!RESEND_API_KEY) {
      throw new Error(
        "Missing RESEND_API_KEY secret"
      );
    }

    const body = await req.json();

    const {
      to,
      type,
      data = {},
    } = body;

    if (!to) {
      throw new Error(
        "Recipient email is required"
      );
    }

    if (!type) {
      throw new Error(
        "Email type is required"
      );
    }

    const template = buildTemplate(
      type as EmailType,
      data
    );

    if (!template) {
      throw new Error(
        `Unknown email type: ${type}`
      );
    }

    console.log(
      "Sending email",
      JSON.stringify({
        to,
        type,
      })
    );

    const response = await fetch(
      "https://api.resend.com/emails",
      {
        method: "POST",
        headers: {
          Authorization:
            `Bearer ${RESEND_API_KEY}`,
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          from:
            "SkillGuardian <noreply@skillguardian.co.uk>",
          to: [to],
          subject: template.subject,
          html: template.html,
        }),
      }
    );

    const result =
      await response.json();

    if (!response.ok) {
      console.error(
        "Resend API Error",
        result
      );

      return new Response(
        JSON.stringify({
          success: false,
          error:
            result.message ??
            "Email delivery failed",
          details: result,
        }),
        {
          status: response.status,
          headers: {
            ...corsHeaders,
            "Content-Type":
              "application/json",
          },
        }
      );
    }

    console.log(
      "Email sent successfully",
      JSON.stringify(result)
    );

    return new Response(
      JSON.stringify({
        success: true,
        data: result,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type":
            "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "Email function error",
      error
    );

    return new Response(
      JSON.stringify({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : String(error),
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