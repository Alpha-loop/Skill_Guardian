'use client';

import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export default function IndividualPlans() {
  const { individualSubscription } = useAuth();

  const [loadingPlan, setLoadingPlan] =
    useState<string | null>(null);

  const currentPlan =
    individualSubscription?.plan ?? 'care_certificate';

  const handleUpgrade = async (
    targetPlan: string
  ) => {
    try {
      setLoadingPlan(targetPlan);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-individual-checkout`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
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

  const plans = [
    {
      id: 'care_certificate',
      name: 'Care Certificate',
      price: '£29',
      period: 'one-time',
      badge: null,
      description:
        'All 16 Care Certificate standards + instant portfolio certificate.',
      highlighted: false,
      features: [
        'Care Certificate Portfolio (All 16 Standards)',
        '100+ flashcards for every standard',
        'Instant portfolio certificate on passing',
        'CQC-compliant — accepted by UK employers',
        'Lifetime access',
      ],
    },
    {
      id: 'full_access',
      name: 'Full Access',
      price: '£49',
      period: 'one-time',
      badge: 'Best Value',
      description:
        'Care Certificate + 45+ additional accredited courses.',
      highlighted: true,
      features: [
        'Everything in Care Certificate',
        '45+ additional accredited courses',
        'Moving & Handling, IPC, Safeguarding',
        'Medication, BLS, Mental Capacity & more',
        'Instant certificate for every course',
      ],
    },
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-slate-100" />
        <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
          Individual Carers
        </span>
        <div className="h-px flex-1 bg-slate-100" />
      </div>

      <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
        {plans.map(plan => {
          const isCurrentPlan =
            currentPlan === plan.id;

          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-7 ${
                plan.highlighted
                  ? 'bg-amber-500 text-white shadow-xl ring-2 ring-amber-500'
                  : 'bg-white border border-slate-200 shadow-sm'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

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
                    ? 'text-amber-100'
                    : 'text-slate-500'
                }`}
              >
                {plan.description}
              </p>

              <div className="flex items-baseline gap-1 mb-5">
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
                      ? 'text-amber-100'
                      : 'text-slate-500'
                  }`}
                >
                  {plan.period}
                </span>
              </div>

              <ul className="space-y-2.5 mb-7">
                {plan.features.map(feature => (
                  <li
                    key={feature}
                    className={`flex items-start gap-2 text-sm ${
                      plan.highlighted
                        ? 'text-amber-50'
                        : 'text-slate-600'
                    }`}
                  >
                    <CheckCircle
                      className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        plan.highlighted
                          ? 'text-white'
                          : 'text-emerald-500'
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
              ) : (
                <Button
                  onClick={() =>
                    handleUpgrade(plan.id)
                  }
                  disabled={
                    loadingPlan === plan.id
                  }
                  className={`w-full ${
                    plan.highlighted
                      ? 'bg-white text-amber-600 hover:bg-amber-50'
                      : 'bg-amber-500 hover:bg-amber-600 text-white'
                  }`}
                >
                  {loadingPlan === plan.id
                    ? 'Redirecting...'
                    : 'Upgrade Plan'}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}