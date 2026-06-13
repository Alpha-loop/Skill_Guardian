import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe@18.2.1";
import { createClient } from "npm:@supabase/supabase-js@2";

const stripe = new Stripe(
  Deno.env.get("STRIPE_SECRET_KEY")!,
  {
    apiVersion: "2025-05-28.basil",
  }
);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
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
      throw new Error("Unauthorized");
    }

    const {
      data: subscription,
      error: subError,
    } =
      await supabaseAdmin
        .from(
          "individual_subscriptions"
        )
        .select("*")
        .eq(
          "user_id",
          user.id
        )
        .single();

    if (
      subError ||
      !subscription
    ) {
      throw new Error(
        "Subscription record not found"
      );
    }

    const priceId =
      subscription.plan ===
      "care_certificate"
        ? Deno.env.get(
            "STRIPE_CARE_CERT_PRICE_ID"
          )
        : Deno.env.get(
            "STRIPE_FULL_ACCESS_PRICE_ID"
          );

    if (!priceId) {
      throw new Error(
        "Price ID not configured"
      );
    }

    const session =
      await stripe.checkout.sessions.create(
        {
          mode: "subscription",

          customer_email:
            user.email,

          line_items: [
            {
              price: priceId,
              quantity: 1,
            },
          ],

          success_url:
            `${Deno.env.get("SITE_URL")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,

          cancel_url:
            `${Deno.env.get("SITE_URL")}/pricing`,

          metadata: {
            account_type:
              "individual",

            user_id:
              user.id,

            plan:
              subscription.plan,
          },
        }
      );

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