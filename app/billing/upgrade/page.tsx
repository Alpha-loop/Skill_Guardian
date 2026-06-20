'use client';

import { useAuth } from '@/contexts/AuthContext';
import IndividualPlans from '@/components/pricing/IndividualPlans';
import OrganisationPlans from '@/components/pricing/OrganisationPlans';
// import EnterpriseCard from '@/components/pricing/EnterpriseCard';

export default function UpgradePlanPage() {
  const { profile } = useAuth();

  return (
    <div className="max-w-7xl mx-auto p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Upgrade Your Plan
        </h1>

        <p className="text-slate-500 mt-2">
          Choose the plan that best suits your needs.
        </p>
      </div>

      {profile?.account_type === 'individual' ? (
        <IndividualPlans />
      ) : (
        <>
          <OrganisationPlans />
          {/* <EnterpriseCard /> */}
        </>
      )}

    </div>
  );
}