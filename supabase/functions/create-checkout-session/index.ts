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
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    const supabaseAdmin =
      createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get(
          "SUPABASE_SERVICE_ROLE_KEY"
        )!
      );

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

    const {
      data: { user },
      error: authError,
    } =
      await supabaseAdmin.auth.getUser(
        token
      );

    if (authError || !user) {
      throw new Error("Unauthorized");
    }

    const {
      organisation_id,
      plan,
    } = await req.json();

    if (
      !organisation_id ||
      !plan
    ) {
      throw new Error(
        "Missing organisation_id or plan"
      );
    }

    const {
      data: organisation,
      error: orgError,
    } =
      await supabaseAdmin
        .from("organisations")
        .select("*")
        .eq(
          "id",
          organisation_id
        )
        .single();

    if (
      orgError ||
      !organisation
    ) {
      throw new Error(
        "Organisation not found"
      );
    }

    const PRICE_MAP = {
      basic:
        Deno.env.get(
          "STRIPE_BASIC_PRICE_ID"
        ),
      standard:
        Deno.env.get(
          "STRIPE_STANDARD_PRICE_ID"
        ),
      premium:
        Deno.env.get(
          "STRIPE_PREMIUM_PRICE_ID"
        ),
    };

    const priceId =
      PRICE_MAP[
        plan as keyof typeof PRICE_MAP
      ];

    if (!priceId) {
      throw new Error(
        "Invalid plan"
      );
    }

    // const session =
    //   await stripe.checkout.sessions.create({
    //     mode: "subscription",

    //     customer_email:
    //       organisation.contact_email,

    //     line_items: [
    //       {
    //         price: priceId,
    //         quantity: 1,
    //       },
    //     ],

    //     subscription_data: {
    //       metadata: {
    //         organisation_id,
    //         plan,
    //         user_id: user.id,
    //       },
    //     },

    //     metadata: {
    //       organisation_id,
    //       plan,
    //       user_id: user.id,
    //     },

    //     success_url:
    //       "http://localhost:3000/billing/success?session_id={CHECKOUT_SESSION_ID}",

    //     cancel_url:
    //       "http://localhost:3000/pricing",
    //   });

    const session =
      await stripe.checkout.sessions.create({
        mode: "subscription",

        customer_email:
          organisation.contact_email,

        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],

        subscription_data: {
          metadata: {
            organisation_id,
            plan,
            user_id: user.id,
          },
        },

        metadata: {
          organisation_id,
          plan,
          user_id: user.id,
        },

        success_url:
          `${Deno.env.get("SITE_URL")}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
          // 'https://skillguardian.co.uk/billing/success?session_id={CHECKOUT_SESSION_ID}',

        cancel_url:
          `${Deno.env.get("SITE_URL")}/pricing`,
          // 'https://skillguardian.co.uk/billing',
      });

    return new Response(
      JSON.stringify({
        url: session.url,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type":
            "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
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