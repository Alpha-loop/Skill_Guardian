'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setLoading(true);

    const { error } =
      await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo:
            `${window.location.origin}/reset-password`,
        }
      );

    setLoading(false);

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });

      return;
    }

    toast({
      title: 'Reset Link Sent',
      description:
        'If an account exists, a password reset email has been sent.',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl border p-6">
        <h1 className="text-2xl font-bold mb-2">
          Forgot Password
        </h1>

        <p className="text-slate-500 mb-6">
          Enter your email to receive a reset link.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <Label>Email Address</Label>

            <Input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? 'Sending...'
              : 'Send Reset Link'}
          </Button>
        </form>

        <Link
          href="/login"
          className="block mt-4 text-center text-sm text-[#005EB8]"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}