'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { NotificationProvider } from '@/contexts/NotificationContext';
import DashboardNav from '@/components/dashboard/DashboardNav';
import ChatBot from '@/components/dashboard/ChatBot';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const {
    user,
    profile,
    organisation,
    loading,
  } = useAuth();
  const router = useRouter();

  const pathname = usePathname();

  const [
    individualSubscription,
    setIndividualSubscription,
  ] = useState<any>(null);

  const [
    subscriptionLoading,
    setSubscriptionLoading,
  ] = useState(true);

  const allowedRoutes = [
    '/dashboard/settings',
    '/pricing',
  ];

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    const brandColor =
      organisation?.primary_color || '#005EB8';

    document.documentElement.style.setProperty(
      '--brand-color',
      brandColor
    );
  }, [organisation]);

  useEffect(() => {
    const loadSubscription = async () => {
      if (
        !user ||
        !profile ||
        profile.account_type !== 'individual'
      ) {
        setSubscriptionLoading(false);
        return;
      }

      const { data } =
        await supabase
          .from(
            'individual_subscriptions'
          )
          .select('*')
          .eq(
            'user_id',
            user.id
          )
          .maybeSingle();

      setIndividualSubscription(data);
      setSubscriptionLoading(false);
    };

    loadSubscription();
  }, [user, profile]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#005EB8] mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#005EB8] mx-auto mb-3" />
          <p className="text-slate-500 text-sm">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (subscriptionLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-8 h-8 animate-spin text-[#005EB8]" />
      </div>
    );
  }

  if (
    profile.account_type ===
    'individual'
  ) {
    const isAllowedRoute =
      allowedRoutes.some(route =>
        pathname.startsWith(route)
      );

   const hasActiveAccess =
    individualSubscription &&
    individualSubscription.status ===
      'active' &&
    individualSubscription.current_period_end &&
    new Date(
      individualSubscription.current_period_end
    ) > new Date();
    if (
      !hasActiveAccess &&
      !isAllowedRoute
    ) {
      return (
        <SubscriptionRequired profile={profile} />
      );
    }
  }

  if (organisation) {
    const subscriptionStatus =
      organisation.subscription_status;

    const currentPeriodEnd =
      organisation.current_period_end;

    const hasValidPeriod =
      currentPeriodEnd &&
      new Date(currentPeriodEnd) >
        new Date();

    const subscriptionActive =
      subscriptionStatus === 'active' ||
      hasValidPeriod;

    const isAllowedRoute =
      allowedRoutes.some(route =>
        pathname.startsWith(route)
      );

    if (
      !subscriptionActive &&
      !isAllowedRoute
    ) {
      return <SubscriptionRequired profile={profile}/>;
    }
  }

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-slate-50 flex">
        <DashboardNav />
        <main className="flex-1 min-w-0 overflow-auto">
          {children}
        </main>
        <ChatBot />
      </div>
    </NotificationProvider>
  );
}


function SubscriptionRequired(profile: any) {

  const {
    organisation,
  } = useAuth();
  const router = useRouter();

  const handleRenewSubscription = async () => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-individual-checkout`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            plan: "care_certificate",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Checkout failed"
        );
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      alert(
        "Unable to start checkout. Please try again."
      );
    }
  };

  const handleOrganisationCheckout = async () => {
    if(!organisation) return;
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-checkout-session`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            organisation_id: organisation.id,
            plan: organisation.subscription_tier,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Checkout failed"
        );
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      alert(
        "Unable to start checkout. Please try again."
      );
    }
  };

  console.log(profile,"sub")
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-md text-center bg-white p-8 rounded-xl shadow-sm border">

        <h1 className="text-2xl font-bold text-slate-900 mb-4">
          Subscription Required
        </h1>

        <p className="text-slate-600 mb-6">
          {profile?.account_type === 'individual'
            ? 'Your subscription has expired or payment is required to continue using SkillGuardian.'
            : 'Your organisation does not currently have an active subscription. Please update billing information to continue using SkillGuardian.'
          }
        </p>

        <div className="flex gap-3 justify-center">
          {profile?.account_type === 'individual'
            ? (
              <>
                <button
                  onClick={handleRenewSubscription}
                  className="px-4 py-2 border rounded-md"
                >
                  Renew Subscription
                </button>
              </>
            )
            : (
              <>
                {/* <a
                  href="/pricing"
                  className="px-4 py-2 bg-[#005EB8] text-white rounded-md"
                >
                  View Plans
                </a> */}

                <button
                  onClick={handleOrganisationCheckout}
                  className="px-4 py-2 bg-[#005EB8] text-white rounded-md"
                >
                  Renew Subscription
                </button>
              </>
            )
          }
        </div>

      </div>
    </div>
  );
}
