'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function BillingSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-md w-full bg-white border rounded-xl p-8 text-center">

        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

        <h1 className="text-2xl font-bold mb-2">
          Payment Successful
        </h1>

        <p className="text-slate-600 mb-6">
          Your subscription has been activated successfully.
        </p>

        <Link
          href="/dashboard"
          className="inline-flex px-4 py-2 bg-[#005EB8] text-white rounded-md"
        >
          Continue to Dashboard
        </Link>

      </div>
    </div>
  );
}