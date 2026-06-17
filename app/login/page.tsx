'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, profile } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) {
      toast({ title: 'Sign in failed', description: error.message, variant: 'destructive' });
      setLoading(false);
      return;
    }
    // Redirect based on role after short delay for profile to load
    setTimeout(() => {
      setLoading(false);
    }, 500);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 text-slate-500 hover:text-slate-700 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
          <div className="w-12 h-12 bg-[#005EB8] rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="font-black text-white text-lg tracking-tight" style={{ letterSpacing: '-0.03em' }}>SG</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-slate-500 mt-1">Sign in to your SkillGuardian account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@organisation.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                href="/forget-password"
                className="text-sm text-[#005EB8] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#005EB8] hover:bg-[#004a93] text-white font-medium"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : 'Sign In'}
            </Button>
          </form>
        </div>

        {/* <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-xs text-blue-700 font-medium mb-2">Demo accounts (password: Demo1234!)</p>
          <div className="space-y-1.5 text-xs">
            {[
              { role: 'Super Admin',        email: 'superadmin@skillguardian.com' },
              { role: 'Org Admin',          email: 'admin@sunrisecare.com' },
              { role: 'Care Manager',       email: 'manager@sunrisecare.com' },
              { role: 'Senior Carer',       email: 'seniorcarer@sunrisecare.com' },
              { role: 'Nurse (RGN)',        email: 'nurse@sunrisecare.com' },
              { role: 'Care Assistant',     email: 'carer@sunrisecare.com' },
              { role: 'Individual Carer',   email: 'individual@demo.skillguardian.com' },
            ].map(({ role, email }) => (
              <button
                key={email}
                type="button"
                onClick={() => { setEmail(email); setPassword('Demo1234!'); }}
                className="w-full text-left flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-blue-100 transition-colors group"
              >
                <span className="text-blue-800 font-medium">{role}</span>
                <span className="text-blue-500 group-hover:text-blue-700 transition-colors truncate ml-2 text-right">{email}</span>
              </button>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}
