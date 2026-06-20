'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

const plans = [
  {
    name: 'Basic',
    price: '£49',
    period: '/month',
    description: 'Perfect for small care homes',
    seats: 'Up to 10 staff',
    features: [
      'All 12 core mandatory courses',
      'Care Certificate (All 16 Standards)',
      'CQC-compliant certificates',
      'Compliance dashboard',
      'Automatic expiry reminders',
      'Email support',
    ],
    highlighted: false,
  },
  {
    name: 'Standard',
    price: '£99',
    period: '/month',
    description: 'Most popular for growing teams',
    seats: 'Up to 30 staff',
    features: [
      'Everything in Basic',
      'Oliver McGowan Mandatory Training',
      'Role-based course assignment',
      'Advanced analytics & reports',
      'Certificate approval workflow',
      'Priority email support',
    ],
    highlighted: true,
  },
  {
    name: 'Premium',
    price: '£199',
    period: '/month',
    description: 'For large organisations',
    seats: 'Up to 100 staff',
    features: [
      'Everything in Standard',
      'NMC revalidation support',
      '10 clinical nurse courses',
      '15 management & leadership courses',
      'Dedicated account manager',
      'Phone & live chat support',
    ],
    highlighted: false,
  },
];

const planRank = {
  basic: 1,
  standard: 2,
  premium: 3,
};

export default function OrganizationPlans() {
  const { organisation } = useAuth();

  const [loadingPlan, setLoadingPlan] =
    useState<string | null>(null);

  const currentPlan =
    organisation?.subscription_tier?.toLowerCase();

  const handleUpgrade = async (
    targetPlan: string
  ) => {
    if (!organisation) return;

    try {
      setLoadingPlan(targetPlan);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-checkout-session`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            organisation_id: organisation.id,
            plan: targetPlan,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'Checkout failed'
        );
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(error);

      alert(
        'Unable to start checkout. Please try again.'
      );
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <>
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px flex-1 bg-slate-100" />
          <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Organisations & Care Homes
          </span>
          <div className="h-px flex-1 bg-slate-100" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map(plan => {
            const planKey =
              plan.name.toLowerCase();

            const isCurrentPlan =
              currentPlan === planKey;

            const isDowngrade =
              currentPlan &&
              planRank[
                planKey as keyof typeof planRank
              ] <
                planRank[
                  currentPlan as keyof typeof planRank
                ];

            return (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 ${
                  plan.highlighted
                    ? 'bg-[#005EB8] text-white shadow-xl ring-2 ring-[#005EB8]'
                    : 'bg-white border border-slate-200 shadow-sm'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3
                    className={`text-lg font-semibold mb-1 ${
                      plan.highlighted
                        ? 'text-white'
                        : 'text-slate-900'
                    }`}
                  >
                    {plan.name}
                  </h3>

                  <p
                    className={`text-sm mb-4 ${
                      plan.highlighted
                        ? 'text-blue-200'
                        : 'text-slate-500'
                    }`}
                  >
                    {plan.description}
                  </p>

                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-4xl font-bold ${
                        plan.highlighted
                          ? 'text-white'
                          : 'text-slate-900'
                      }`}
                    >
                      {plan.price}
                    </span>

                    <span
                      className={`text-sm ${
                        plan.highlighted
                          ? 'text-blue-200'
                          : 'text-slate-500'
                      }`}
                    >
                      {plan.period}
                    </span>
                  </div>

                  <p
                    className={`text-sm mt-1 ${
                      plan.highlighted
                        ? 'text-blue-200'
                        : 'text-slate-500'
                    }`}
                  >
                    {plan.seats}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map(feature => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2 text-sm ${
                        plan.highlighted
                          ? 'text-blue-100'
                          : 'text-slate-600'
                      }`}
                    >
                      <CheckCircle
                        className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                          plan.highlighted
                            ? 'text-blue-300'
                            : 'text-[#005EB8]'
                        }`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {isCurrentPlan ? (
                  <Button
                    disabled
                    className="w-full bg-slate-300 text-slate-600 cursor-not-allowed"
                  >
                    Current Plan
                  </Button>
                ) : isDowngrade ? (
                  <Button
                    disabled
                    className="w-full bg-slate-200 text-slate-500 cursor-not-allowed"
                  >
                    Downgrade Not Available
                  </Button>
                ) : (
                  <Button
                    onClick={() =>
                      handleUpgrade(planKey)
                    }
                    disabled={
                      loadingPlan === planKey
                    }
                    className={`w-full ${
                      plan.highlighted
                        ? 'bg-white text-[#005EB8] hover:bg-blue-50'
                        : 'bg-[#005EB8] text-white hover:bg-[#004a93]'
                    }`}
                  >
                    {loadingPlan === planKey
                      ? 'Redirecting...'
                      : 'Upgrade Plan'}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Enterprise */}
      <div className="bg-slate-900 rounded-2xl p-8 flex flex-col border border-slate-700 mt-12">
        <div className="mb-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Enterprise
          </p>

          <h3 className="text-xl font-bold text-white mb-2">
            More than 100 staff?
          </h3>

          <p className="text-slate-400 text-sm leading-relaxed">
            We offer custom pricing and dedicated support
            for larger organisations. Get in touch and
            we'll put together a plan that fits your team.
          </p>
        </div>

        <ul className="space-y-2.5 mb-8 flex-1">
          {[
            'Custom seat limit',
            'Dedicated account manager',
            'Bulk onboarding support',
            'Custom reporting & CQC exports',
            'Priority phone & live chat support',
          ].map(feature => (
            <li
              key={feature}
              className="flex items-start gap-2 text-sm text-slate-300"
            >
              <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-slate-500" />
              {feature}
            </li>
          ))}
        </ul>

        <a href="mailto:support@skillguardian.co.uk">
          <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-semibold">
            Contact Us
          </Button>
        </a>

        <p className="text-center text-xs text-slate-500 mt-3">
          support@skillguardian.co.uk
        </p>
      </div>
    </>
  );
}