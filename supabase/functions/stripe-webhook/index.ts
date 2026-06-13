import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import Stripe from "npm:stripe@18.2.1";
import { createClient } from "npm:@supabase/supabase-js@2";

const stripe = new Stripe(
  Deno.env.get("STRIPE_SECRET_KEY")!,
  {
    apiVersion: "2025-05-28.basil",
  }
);

Deno.serve(async (req) => {
  try {
    const signature =
      req.headers.get("stripe-signature");

    if (!signature) {
      return new Response(
        "Missing signature",
        { status: 400 }
      );
    }

    const body =
      await req.text();

    const event =
      await stripe.webhooks.constructEventAsync(
        body,
        signature,
        Deno.env.get(
          "STRIPE_WEBHOOK_SECRET"
        )!
      );

    const supabaseAdmin =
      createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get(
          "SUPABASE_SERVICE_ROLE_KEY"
        )!
      );

    switch (event.type) {

      case "checkout.session.completed": {

        const session =
          event.data.object as Stripe.Checkout.Session;

        const organisationId =
          session.metadata?.organisation_id;

        const userId =
            session.metadata?.user_id;

        const plan =
          session.metadata?.plan;

        const accountType =
            session.metadata?.account_type;

        // Individual purchase
        if (
        accountType === "individual"
        ) {
        if (!userId) break;

        const stripeSubscription =
            await stripe.subscriptions.retrieve(
            session.subscription!.toString()
            );

        const currentPeriodEnd =
            stripeSubscription.items.data[0]
            .current_period_end;

        console.log(
        "INDIVIDUAL UPDATE PAYLOAD",
        {
            userId,
            status: "active",
            stripe_customer_id:
            session.customer?.toString(),
            stripe_subscription_id:
            stripeSubscription.id,
            current_period_end:
            new Date(
                currentPeriodEnd * 1000
            ).toISOString(),
        }
        );

        const { data, error } =
            await supabaseAdmin
            .from(
                "individual_subscriptions"
            )
            .update({
                
                status: "active",

                stripe_customer_id:
                session.customer?.toString(),

                stripe_subscription_id:
                stripeSubscription.id,

                current_period_end:
                new Date(
                    currentPeriodEnd * 1000
                ).toISOString(),
            })
            .eq(
                "user_id",
                userId
            )
            .select();

        console.log(
            "Individual subscription updated:",
            data
        );

        if (error) {
        console.error(
            "INDIVIDUAL UPDATE ERROR FULL:",
            JSON.stringify(error, null, 2)
        );
        }

        break;
        }
        

        if (!organisationId) break;

        await supabaseAdmin
          .from("organisations")
          .update({
            stripe_customer_id:
              session.customer?.toString(),

            stripe_subscription_id:
              session.subscription?.toString(),

            subscription_status:
              "active",

            subscription_tier:
              plan,

            subscription_started_at:
              new Date().toISOString(),
          })
          .eq(
            "id",
            organisationId
          );

        break;
      }

      case "customer.subscription.updated":
        case "customer.subscription.created": {

            const subscription =
                event.data.object as Stripe.Subscription;

            console.log(
                "Subscription Event:",
                event.type
            );

            console.log(
                "Subscription ID:",
                subscription.id
            );

            console.log(
                "Subscription Metadata:",
                subscription.metadata
            );

            const organisationId =
                subscription.metadata?.organisation_id;

            if (!organisationId) {
                console.error(
                "No organisation_id found"
                );

                break;
            }

            const currentPeriodEnd =
                subscription.items?.data?.[0]
                ?.current_period_end;

            console.log(
                "Current Period End Raw:",
                currentPeriodEnd
            );

            const { data, error } =
                await supabaseAdmin
                .from("organisations")
                .update({
                    stripe_subscription_id:
                    subscription.id,

                    subscription_status:
                    subscription.status,

                    current_period_end:
                    currentPeriodEnd
                        ? new Date(
                            currentPeriodEnd * 1000
                        ).toISOString()
                        : null,
                })
                .eq(
                    "id",
                    organisationId
                )
                .select();

            console.log(
                "Update Result:",
                data
            );

            if (error) {
                console.error(
                "Update Error:",
                error
                );
            }

        break;
        }

      case "customer.subscription.deleted": {

        const subscription =
          event.data.object as Stripe.Subscription;

        const organisationId =
          subscription.metadata
            ?.organisation_id;

        if (!organisationId) break;

        await supabaseAdmin
          .from("organisations")
          .update({
            subscription_status:
              "cancelled",
          })
          .eq(
            "id",
            organisationId
          );

        break;
      }
    }

    return new Response(
      JSON.stringify({
        received: true,
      }),
      {
        status: 200,
        headers: {
          "Content-Type":
            "application/json",
        },
      }
    );

  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error
            ? error.message
            : String(error),
      }),
      {
        status: 400,
      }
    );
  }
});