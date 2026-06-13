// app/verify/[certificateId]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function VerifyCertificatePage() {
  const params = useParams();
  const certificateId = params.certificateId as string;

  const [loading, setLoading] = useState(true);
  const [certificate, setCertificate] = useState<any>(null);

  useEffect(() => {
    fetchCertificate();
  }, []);

  const fetchCertificate = async () => {
    try {
      const { data, error } = await supabase
        .from('certificate_requests')
        .select(`
            *,
            courses(*),
            profiles!certificate_requests_user_id_fkey(*)
        `)
        .eq('certificate_id', certificateId)
        .eq('status', 'approved')
        .maybeSingle();

        console.log('DATA:', data);
        console.log('ERROR:', error);

      if (error) {
        console.error(error);
        setCertificate(null);
      } else {
        setCertificate(data);
      }
    } catch (err) {
      console.error(err);
      setCertificate(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading certificate...
      </div>
    );
  }

  if (!certificate) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold text-red-600">
          Certificate Not Found
        </h1>

        <p className="mt-4 text-gray-500">
          This certificate is invalid or does not exist.
        </p>
      </div>
    );
  }

  const profile = certificate.profiles;
  const course = certificate.courses;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-600">
            ✓ Certificate Verified
          </h1>

          <p className="mt-2 text-gray-600">
            This certificate has been verified by SkillGuardian.
          </p>
        </div>

        <div className="space-y-4">

          <div>
            <p className="text-sm text-gray-500">Certificate ID</p>
            <p className="font-semibold">
              {certificate.certificate_id}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Employee</p>
            <p className="font-semibold">
              {profile?.first_name} {profile?.last_name}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Course</p>
            <p className="font-semibold">
              {course?.title}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Completion Date</p>
            <p className="font-semibold">
              {new Date(
                certificate.completion_date
              ).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Approved Date</p>
            <p className="font-semibold">
              {certificate.approved_date
                ? new Date(
                    certificate.approved_date
                  ).toLocaleDateString()
                : '-'}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}