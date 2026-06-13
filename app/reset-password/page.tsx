'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useToast } from '@/hooks/use-toast';

export default function ResetPasswordPage() {
  const [password, setPassword] =
    useState('');

  const [confirmPassword,
    setConfirmPassword] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const router = useRouter();

  const { toast } = useToast();

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      password !== confirmPassword
    ) {
      toast({
        title: 'Passwords do not match',
        variant: 'destructive',
      });

      return;
    }

    if (password.length < 8) {
      toast({
        title:
          'Password must be at least 8 characters',
        variant: 'destructive',
      });

      return;
    }

    setLoading(true);

    const { error } =
      await supabase.auth.updateUser({
        password,
      });

    setLoading(false);

    if (error) {
      toast({
        title: 'Error',
        description:
          error.message,
        variant: 'destructive',
      });

      return;
    }

    toast({
      title:
        'Password updated successfully',
    });

    setTimeout(() => {
      router.push('/login');
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl border p-6">

        <h1 className="text-2xl font-bold mb-2">
          Reset Password
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <Label>
              New Password
            </Label>

            <Input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />
          </div>

          <div>
            <Label>
              Confirm Password
            </Label>

            <Input
              type="password"
              value={
                confirmPassword
              }
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? 'Updating...'
              : 'Update Password'}
          </Button>
        </form>
      </div>
    </div>
  );
}