'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import {
  Card,
  CardContent,
} from '@/components/ui/card';

import { Button } from '@/components/ui/button';

import {
  CreditCard,
  Calendar,
  Users,
  Crown,
  Receipt,
  ArrowUpRight,
} from 'lucide-react';

import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

export default function BillingPage() {
  const router = useRouter();

  const { organisation } = useAuth();

  const [staffCount, setStaffCount] =
    useState(0);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (!organisation) return;

    loadBillingData();
  }, [organisation]);

  const brandColor =
      organisation?.primary_color || '#005EB8';

  const loadBillingData = async () => {
    try {
      const { count } =
        await supabase
          .from('profiles')
          .select('*', {
            count: 'exact',
            head: true,
          })
          .eq(
            'organisation_id',
            organisation?.id
          );

      setStaffCount(count || 0);
    } finally {
      setLoading(false);
    }
  };

  const openBillingPortal =
    async () => {
      try {
        const session =
          await supabase.auth.getSession();

        const response =
          await fetch(
            `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-billing-portal`,
            {
              method: 'POST',
              headers: {
                Authorization:
                  `Bearer ${session.data.session?.access_token}`,
                'Content-Type':
                  'application/json',
              },
              body: JSON.stringify({
                organisation_id:
                  organisation?.id,
              }),
            }
          );

        const data =
          await response.json();

        if (!response.ok) {
          throw new Error(
            data.error
          );
        }

        window.location.href =
          data.url;
      } catch (error) {
        console.error(error);
      }
    };

  const getPlanPrice = () => {
    switch (
      organisation?.subscription_tier
    ) {
      case 'basic':
        return '£49/month';

      case 'standard':
        return '£99/month';

      case 'premium':
        return '£199/month';

      default:
        return '-';
    }
  };

  const getSeatUsage = () => {
    if (
      organisation?.seat_limit ===
      null
    ) {
      return 'Unlimited';
    }

    return `${staffCount}/${organisation?.seat_limit}`;
  };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">

      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Billing
          </h1>

          <p className="text-slate-500 mt-1">
            Manage your subscription,
            invoices and billing
            settings.
          </p>
        </div>

      </div>

      {/* Main Invoice Style Container */}

      <Card className="overflow-hidden">

        {/* Header */}

        <div className="border-b px-8 py-6 flex justify-between items-center">

          <div>
            <h2 className="text-2xl font-bold">
              Subscription
            </h2>
          </div>

          <div className="text-right">

            <div className="text-sm text-slate-500">
              Organisation
            </div>

            <div className="font-semibold">
              {organisation?.name}
            </div>

          </div>

        </div>

        <CardContent className="p-8">

          {/* Top Section */}

          <div className="grid md:grid-cols-2 gap-10 mb-10">

            <div>

              <h3 className="font-semibold mb-4">
                Subscription Details
              </h3>

              <div className="space-y-3">

                <div>
                  <p className="text-sm text-slate-500">
                    Current Plan
                  </p>

                  <p className="font-medium capitalize">
                    {
                      organisation?.subscription_tier
                    }
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Status
                  </p>

                  <p className="font-medium capitalize text-green-600">
                    {
                      organisation?.subscription_status
                    }
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Started
                  </p>

                  <p>
                    {organisation?.subscription_started_at
                      ? new Date(
                          organisation.subscription_started_at
                        ).toLocaleDateString()
                      : '-'}
                  </p>
                </div>

              </div>

            </div>

            <div>

              <h3 className="font-semibold mb-4">
                Billing Details
              </h3>

              <div className="space-y-3">

                <div>
                  <p className="text-sm text-slate-500">
                    Monthly Cost
                  </p>

                  <p className="font-medium">
                    {getPlanPrice()}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Next Renewal
                  </p>

                  <p>
                    {organisation?.current_period_end
                      ? new Date(
                          organisation.current_period_end
                        ).toLocaleDateString()
                      : '-'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Customer ID
                  </p>

                  <p className="truncate">
                    {
                      organisation?.stripe_customer_id
                    }
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Usage Table */}

          <div className="border rounded-xl overflow-hidden mb-10">

            <table className="w-full">

              <thead className="bg-slate-50">

                <tr>

                  <th className="text-left p-4">
                    Metric
                  </th>

                  <th className="text-left p-4">
                    Value
                  </th>

                </tr>

              </thead>

              <tbody>

                <tr className="border-t">

                  <td className="p-4">
                    Plan
                  </td>

                  <td className="p-4 capitalize">
                    {
                      organisation?.subscription_tier
                    }
                  </td>

                </tr>

                <tr className="border-t">

                  <td className="p-4">
                    Seats Used
                  </td>

                  <td className="p-4">
                    {loading
                      ? 'Loading...'
                      : getSeatUsage()}
                  </td>

                </tr>

                <tr className="border-t">

                  <td className="p-4">
                    Status
                  </td>

                  <td className="p-4 capitalize">
                    {
                      organisation?.subscription_status
                    }
                  </td>

                </tr>

                <tr className="border-t">

                  <td className="p-4">
                    Renewal Date
                  </td>

                  <td className="p-4">
                    {organisation?.current_period_end
                      ? new Date(
                          organisation.current_period_end
                        ).toLocaleDateString()
                      : '-'}
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

          {/* Summary */}

          <div className="flex justify-end mb-10">

            <div className="w-full md:w-80 space-y-3">

              <div className="flex justify-between">

                <span>
                  Current Plan
                </span>

                <span className="capitalize font-medium">
                  {
                    organisation?.subscription_tier
                  }
                </span>

              </div>

              <div className="flex justify-between">

                <span>
                  Monthly Cost
                </span>

                <span>
                  {getPlanPrice()}
                </span>

              </div>

              <div className="flex justify-between font-bold text-lg border-t pt-3">

                <span>Status</span>

                <span className="capitalize">
                  {
                    organisation?.subscription_status
                  }
                </span>

              </div>

            </div>

          </div>

          {/* Actions */}

          <div className="flex justify-end gap-4 border-t pt-6">

            <Button
              variant="outline"
              onClick={openBillingPortal}
            >
              <CreditCard className="w-4 h-4 mr-2" />

              Manage Billing
            </Button>

            <Button
              onClick={() =>
                router.push('/billing/upgrade')
              }
              style={{
                backgroundColor: brandColor,
              }}
            >
              <ArrowUpRight className="w-4 h-4 mr-2" />

              Upgrade Plan
            </Button>

          </div>

        </CardContent>

      </Card>

    </div>
  );
}