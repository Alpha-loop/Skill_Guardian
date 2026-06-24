import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe@18.2.1";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const stripe = new Stripe(
  Deno.env.get("STRIPE_SECRET_KEY")!,
  {
    apiVersion: "2025-05-28.basil",
  }
);

Deno.serve(async (req) => {
  // Handle browser preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    const authHeader =
      req.headers.get("Authorization");

    if (!authHeader) {
      throw new Error("Unauthorized");
    }

    const token =
      authHeader.replace(
        "Bearer ",
        ""
      );

    const supabaseAdmin =
      createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get(
          "SUPABASE_SERVICE_ROLE_KEY"
        )!
      );

    const {
      data: { user },
      error: authError,
    } =
      await supabaseAdmin.auth.getUser(
        token
      );

    if (authError || !user) {
      throw new Error(
        "Unauthorized"
      );
    }

    const {
      organisation_id,
    } = await req.json();

    if (!organisation_id) {
      throw new Error(
        "Missing organisation_id"
      );
    }

    const {
      data: organisation,
      error: orgError,
    } =
      await supabaseAdmin
        .from("organisations")
        .select(
          "id, stripe_customer_id"
        )
        .eq(
          "id",
          organisation_id
        )
        .single();

    if (orgError || !organisation) {
      throw new Error(
        "Organisation not found"
      );
    }

    if (
      !organisation.stripe_customer_id
    ) {
      throw new Error(
        "No Stripe customer found for this organisation"
      );
    }

    const siteUrl =
      Deno.env.get("SITE_URL") ??
      "https://skillguardian.co.uk";

    console.log(
      "Creating billing portal for customer:",
      organisation.stripe_customer_id
    );

    const session =
      await stripe.billingPortal.sessions.create(
        {
          customer:
            organisation.stripe_customer_id,

          return_url:
            `${siteUrl}/dashboard/settings`,
        }
      );

    return new Response(
      JSON.stringify({
        success: true,
        url: session.url,
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
      "Billing Portal Error:",
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
        status: 400,
        headers: {
          ...corsHeaders,
          "Content-Type":
            "application/json",
        },
      }
    );
  }
});