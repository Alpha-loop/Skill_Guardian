'use client';

import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Award, CheckCircle, ArrowRight, ArrowLeft,
  Loader2, Eye, EyeOff, BookOpen, Sparkles, Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/supabase';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const CARE_CERT_STANDARDS = [
  'Understand Your Role',
  'Your Personal Development',
  'Duty of Care',
  'Equality, Diversity & Human Rights',
  'Work in a Person-Centred Way',
  'Communication',
  'Privacy & Dignity',
  'Fluids & Nutrition',
  'Awareness of Mental Health, Dementia & Learning Disability',
  'Safeguarding Adults',
  'Safeguarding Children',
  'Basic Life Support',
  'Health & Safety',
  'Handling Information',
  'Infection Prevention & Control',
  'Awareness of Learning Disability & Autism',
];

const PLANS = [
  {
    id: 'care_certificate' as const,
    name: 'Care Certificate',
    price: '£29',
    period: 'one-time',
    badge: null,
    description: 'Everything a new carer needs to be job-ready.',
    color: 'border-amber-300 bg-gradient-to-b from-amber-50 to-white',
    headerColor: 'bg-amber-500',
    icon: Award,
    features: [
      'All 16 Care Certificate standards',
      '100+ flashcards for every standard',
      'Full assessment quiz per standard',
      'Instant portfolio certificate on passing',
      'Downloadable PDF with QR verification',
      'CQC-compliant evidence of completion',
      'Lifetime access to your certificate',
    ],
  },
  {
    id: 'full_access' as const,
    name: 'Full Access',
    price: '£49',
    period: 'one-time',
    badge: 'Best Value',
    description: 'Care Certificate + every course on the platform.',
    color: 'border-[#005EB8] bg-gradient-to-b from-blue-50 to-white ring-2 ring-[#005EB8]',
    headerColor: 'bg-[#005EB8]',
    icon: Sparkles,
    features: [
      'Everything in Care Certificate',
      '45+ additional accredited courses',
      'Moving & Handling, IPC, Safeguarding',
      'Medication, BLS, Mental Capacity',
      'Equality, Fire Safety, Food Hygiene',
      'Instant certificates for every course',
      'Career portfolio — all in one place',
    ],
  },
];

type Step = 'plan' | 'account';

export default function IndividualSignupPage() {
  return (
    <Suspense fallback={null}>
      <IndividualSignupContent />
    </Suspense>
  );
}

function IndividualSignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultPlan = searchParams.get('plan') === 'full_access' ? 'full_access' : 'care_certificate';

  const [step, setStep] = useState<Step>('plan');
  const [selectedPlan, setSelectedPlan] = useState<'care_certificate' | 'full_access'>(defaultPlan as any);
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const plan = PLANS.find(p => p.id === selectedPlan)!;

  const handleSubmit = async () => {
    setError('');
    if (!form.first_name.trim() || !form.last_name.trim()) return setError('Please enter your name.');
    if (!form.email.trim()) return setError('Please enter your email address.');
    if (form.password.length < 8) return setError('Password must be at least 8 characters.');
    if (form.password !== form.confirmPassword) return setError('Passwords do not match.');

    setSaving(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/register-individual`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          first_name: form.first_name.trim(),
          last_name: form.last_name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
          plan: selectedPlan,
          professional_role: 'care_assistant',
        }),
      });

      const data = await res.json();
      if (data.error) {
        setError(data.error);
        setSaving(false);
        return;
      }

      // Sign in automatically
      const { error: signInErr } = await supabase.auth.signInWithPassword({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      if (signInErr) {
        // Account was created; just redirect to login
        router.push('/login?registered=1');
      } else {
        router.replace('/dashboard');
      }
    } catch (e: any) {
      setError(e.message ?? 'Something went wrong. Please try again.');
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#005EB8] flex items-center justify-center">
              <span className="font-black text-white text-sm tracking-tight" style={{ letterSpacing: '-0.03em' }}>SG</span>
            </div>
            <span className="text-xl font-bold text-slate-900">SkillGuardian</span>
          </Link>
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>Already have an account?</span>
            <Link href="/login" className="text-[#005EB8] font-medium hover:underline">Sign in</Link>
          </div>
        </div>
      </nav>

      {/* Progress */}
      <div className="max-w-3xl mx-auto px-4 pt-8 pb-2">
        <div className="flex items-center gap-3 mb-8">
          {(['plan', 'account'] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors',
                step === s
                  ? 'bg-[#005EB8] text-white'
                  : (step === 'account' && s === 'plan')
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-200 text-slate-500'
              )}>
                {step === 'account' && s === 'plan' ? <CheckCircle className="w-4 h-4" /> : i + 1}
              </div>
              <span className={cn('text-sm font-medium hidden sm:block', step === s ? 'text-slate-900' : 'text-slate-400')}>
                {s === 'plan' ? 'Choose Plan' : 'Create Account'}
              </span>
              {i < 1 && <div className="w-8 h-0.5 bg-slate-200" />}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-16">
        {/* ── Step 1: Plan Selection ── */}
        {step === 'plan' && (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                Start Your Care Certificate
              </h1>
              <p className="text-slate-500">
                Choose a plan. Complete training at your own pace. Get your certificate instantly.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 mb-8">
              {PLANS.map(p => {
                const Icon = p.icon;
                const isSelected = selectedPlan === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPlan(p.id)}
                    className={cn(
                      'relative rounded-2xl border-2 p-6 text-left transition-all hover:shadow-md',
                      isSelected ? p.color : 'border-slate-200 bg-white hover:border-slate-300'
                    )}
                  >
                    {p.badge && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-amber-400 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                          {p.badge}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', p.headerColor)}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{p.name}</p>
                        <p className="text-xs text-slate-500">{p.description}</p>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-1 mb-4">
                      <span className="text-3xl font-bold text-slate-900">{p.price}</span>
                      <span className="text-sm text-slate-500">{p.period}</span>
                    </div>
                    <ul className="space-y-2">
                      {p.features.map(f => (
                        <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    {isSelected && (
                      <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-[#005EB8] flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Care Certificate standards preview */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-amber-500" />
                <p className="font-semibold text-slate-900">All 16 Care Certificate Standards Included</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {CARE_CERT_STANDARDS.map((std, i) => (
                  <div key={std} className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-semibold text-[10px] flex-shrink-0">
                      {i + 1}
                    </span>
                    {std}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
                <ArrowLeft className="w-4 h-4" /> Back
              </Link>
              <Button
                onClick={() => setStep('account')}
                className="bg-[#005EB8] hover:bg-[#004a93] text-white px-8"
              >
                Continue — {plan.price}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ── Step 2: Account Creation ── */}
        {step === 'account' && (
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-slate-900 mb-2">Create Your Account</h1>
              <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-4 py-1.5 text-sm">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="font-medium text-amber-800">{plan.name}</span>
                <span className="text-amber-600">— {plan.price} {plan.period}</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>First Name</Label>
                    <Input
                      value={form.first_name}
                      onChange={e => setForm(p => ({ ...p, first_name: e.target.value }))}
                      placeholder="Jane"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Last Name</Label>
                    <Input
                      value={form.last_name}
                      onChange={e => setForm(p => ({ ...p, last_name: e.target.value }))}
                      placeholder="Smith"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="jane.smith@example.com"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label>Password</Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={form.password}
                      onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                      placeholder="Minimum 8 characters"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    value={form.confirmPassword}
                    onChange={e => setForm(p => ({ ...p, confirmPassword: e.target.value }))}
                    placeholder="Re-enter password"
                  />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <div className="flex items-start gap-2 text-xs text-slate-500 bg-slate-50 rounded-lg p-3">
                  <Lock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-slate-400" />
                  <span>
                    By creating an account you agree to our{' '}
                    <Link href="/terms" className="text-[#005EB8] hover:underline">Terms of Use</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-[#005EB8] hover:underline">Privacy Policy</Link>.
                  </span>
                </div>
              </div>
            </div>

            {/* What happens next */}
            <div className="mt-5 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
              <p className="text-xs font-semibold text-emerald-800 mb-2">What happens after signup:</p>
              <div className="space-y-1.5">
                {[
                  'Care Certificate Portfolio is instantly assigned to your dashboard',
                  'Complete 100+ flashcards across all 16 standards at your own pace',
                  'Pass the assessment quiz (80% pass mark) per standard',
                  'Your portfolio certificate is issued automatically — no waiting',
                  selectedPlan === 'full_access' ? '45+ additional courses also unlocked immediately' : '',
                ].filter(Boolean).map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-emerald-700">
                    <CheckCircle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-emerald-500" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => setStep('plan')}
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <Button
                onClick={handleSubmit}
                disabled={saving}
                className="bg-[#005EB8] hover:bg-[#004a93] text-white px-8"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
