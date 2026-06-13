import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useSubscription(
  organisationId?: string
) {
  const [loading, setLoading] =
    useState(true);

  const [subscription, setSubscription] =
    useState<any>(null);

  useEffect(() => {
    if (!organisationId) return;

    const load = async () => {
      const { data } =
        await supabase
          .from("organisations")
          .select(`
            subscription_tier,
            subscription_status,
            current_period_end
          `)
          .eq("id", organisationId)
          .single();

      setSubscription(data);
      setLoading(false);
    };

    load();
  }, [organisationId]);

  return {
    loading,
    subscription,
    isActive:
      subscription?.subscription_status ===
      "active",
  };
}