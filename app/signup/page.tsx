'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, ArrowRight, CheckCircle, Eye, EyeOff,
  Building2, User, CreditCard, Loader2, Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

// ── Types ─────────────────────────────────────────────────────────────────────

type Tier = 'basic' | 'standard' | 'premium';

interface FormState {
  // Step 1 — Organisation
  org_name: string;
  contact_person: string;
  contact_email: string;
  // Step 2 — Plan
  subscription_tier: Tier;
  // Step 3 — Admin account
  admin_first_name: string;
  admin_last_name: string;
  admin_email: string;
  admin_password: string;
  admin_confirm_password: string;
}

// ── Plan data ─────────────────────────────────────────────────────────────────

const plans: {
  tier: Tier;
  name: string;
  price: string;
  period: string;
  seats: string;
  description: string;
  features: string[];
  highlighted: boolean;
}[] = [
  {
    tier: 'basic',
    name: 'Basic',
    price: '£49',
    period: '/month',
    seats: 'Up to 10 staff',
    description: 'Perfect for small care homes',
    highlighted: false,
    features: [
      'All 12 core mandatory courses',
      'Care Certificate (All 16 Standards)',
      'CQC-compliant certificates',
      'Compliance dashboard',
      'Automatic expiry reminders',
      'Email support',
    ],
  },
  {
    tier: 'standard',
    name: 'Standard',
    price: '£99',
    period: '/month',
    seats: 'Up to 30 staff',
    description: 'Most popular for growing teams',
    highlighted: true,
    features: [
      'Everything in Basic',
      'Oliver McGowan Mandatory Training',
      'Role-based course assignment',
      'Advanced analytics & reports',
      'Certificate approval workflow',
      'Priority email support',
    ],
  },
  {
    tier: 'premium',
    name: 'Premium',
    price: '£199',
    period: '/month',
    seats: 'Up to 100 staff',
    description: 'For large organisations',
    highlighted: false,
    features: [
      'Everything in Standard',
      'NMC revalidation support',
      '10 clinical nurse courses',
      '15 management & leadership courses',
      'Dedicated account manager',
      'Phone & live chat support',
    ],
  },
];

// ── Step indicator ────────────────────────────────────────────────────────────

const STEPS = [
  { label: 'Organisation', icon: Building2 },
  { label: 'Choose Plan', icon: CreditCard },
  { label: 'Your Account', icon: User },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((step, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={step.label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className={cn(
                'w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-200',
                done
                  ? 'bg-[#005EB8] border-[#005EB8] text-white'
                  : active
                  ? 'border-[#005EB8] text-[#005EB8] bg-white'
                  : 'border-slate-200 text-slate-400 bg-white'
              )}>
                {done
                  ? <Check className="w-4 h-4" />
                  : <step.icon className="w-4 h-4" />
                }
              </div>
              <span className={cn(
                'text-xs font-medium whitespace-nowrap',
                active ? 'text-[#005EB8]' : done ? 'text-slate-600' : 'text-slate-400'
              )}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn(
                'h-0.5 w-12 sm:w-20 mx-1 mb-5 rounded transition-all duration-200',
                i < current ? 'bg-[#005EB8]' : 'bg-slate-200'
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function SignupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState<FormState>({
    org_name: '',
    contact_person: '',
    contact_email: '',
    subscription_tier: 'standard',
    admin_first_name: '',
    admin_last_name: '',
    admin_email: '',
    admin_password: '',
    admin_confirm_password: '',
  });

  // Pre-select plan from URL param (?plan=basic|standard|premium)
  useEffect(() => {
    const plan = searchParams.get('plan') as Tier | null;
    if (plan && ['basic', 'standard', 'premium'].includes(plan)) {
      setForm(f => ({ ...f, subscription_tier: plan }));
    }
  }, [searchParams]);

  const set = (key: keyof FormState, value: string) =>
    setForm(f => ({ ...f, [key]: value }));

  // ── Validation per step ────────────────────────────────────────────────────

  const validateStep0 = () => {
    if (!form.org_name.trim()) return 'Organisation name is required.';
    if (!form.contact_person.trim()) return 'Contact person name is required.';
    if (!form.contact_email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contact_email))
      return 'A valid organisation contact email is required.';
    return '';
  };

  const validateStep2 = () => {
    if (!form.admin_first_name.trim()) return 'First name is required.';
    if (!form.admin_last_name.trim()) return 'Last name is required.';
    if (!form.admin_email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.admin_email))
      return 'A valid email address is required.';
    if (form.admin_password.length < 8) return 'Password must be at least 8 characters.';
    if (form.admin_password !== form.admin_confirm_password) return 'Passwords do not match.';
    return '';
  };

  const next = () => {
    setError('');
    if (step === 0) {
      const err = validateStep0();
      if (err) { setError(err); return; }
    }
    setStep(s => s + 1);
  };

  const back = () => { setError(''); setStep(s => s - 1); };

  const submit = async () => {
    const err = validateStep2();
    if (err) { setError(err); return; }

    setError('');
    setSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/register-organisation`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
          },
          body: JSON.stringify({
            org_name: form.org_name,
            contact_person: form.contact_person,
            contact_email: form.contact_email,
            subscription_tier: form.subscription_tier,
            admin_first_name: form.admin_first_name,
            admin_last_name: form.admin_last_name,
            admin_email: form.admin_email,
            admin_password: form.admin_password,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error ?? 'Registration failed. Please try again.');
        return;
      }

      setDone(true);
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // ── Success screen ─────────────────────────────────────────────────────────

  if (done) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-9 h-9 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Organisation registered!</h1>
          <p className="text-slate-600 mb-2 leading-relaxed">
            <strong>{form.org_name}</strong> is now set up on SkillGuardian.
          </p>
          <p className="text-slate-500 text-sm mb-8 leading-relaxed">
            Your admin account has been created for <strong>{form.admin_email}</strong>.
            You can sign in immediately — no email confirmation required.
          </p>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6 text-left text-sm text-blue-800 space-y-1">
            <p className="font-semibold mb-2">What happens next?</p>
            <div className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" /><span>Sign in with your admin account</span></div>
            <div className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" /><span>Add your employees from the Employees tab</span></div>
            <div className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" /><span>Assign courses and track compliance in real time</span></div>
          </div>
          <Button
            className="w-full bg-[#005EB8] hover:bg-[#004a93] text-white h-11"
            onClick={() => router.push('/login')}
          >
            Sign In to Your Dashboard
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          <p className="mt-4 text-xs text-slate-400">
            Email: {form.admin_email}
          </p>
        </div>
      </div>
    );
  }

  const selectedPlan = plans.find(p => p.tier === form.subscription_tier)!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-slate-100 shadow-sm">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#005EB8] flex items-center justify-center">
              <span className="font-black text-white text-xs tracking-tight" style={{ letterSpacing: '-0.03em' }}>SG</span>
            </div>
            <span className="font-bold text-slate-900 text-sm">SkillGuardian</span>
          </div>
          <Link href="/login" className="text-sm text-slate-500 hover:text-[#005EB8] transition-colors">
            Sign in
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Register your organisation</h1>
          <p className="text-slate-500 mt-2 text-sm">
            Get your team CQC-compliant — takes less than 2 minutes.
          </p>
        </div>

        <StepIndicator current={step} />

        {/* Error banner */}
        {error && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
            {error}
          </div>
        )}

        {/* ── Step 0: Organisation details ── */}
        {step === 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-1">About your organisation</h2>
            <p className="text-sm text-slate-500 mb-6">Tell us about the care organisation you're registering.</p>

            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="org_name">Organisation name <span className="text-red-500">*</span></Label>
                <Input
                  id="org_name"
                  placeholder="e.g. Sunrise Care Home Ltd"
                  value={form.org_name}
                  onChange={e => set('org_name', e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_person">Registered Manager / Contact person <span className="text-red-500">*</span></Label>
                <Input
                  id="contact_person"
                  placeholder="Full name"
                  value={form.contact_person}
                  onChange={e => set('contact_person', e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_email">Organisation contact email <span className="text-red-500">*</span></Label>
                <Input
                  id="contact_email"
                  type="email"
                  placeholder="info@yourorganisation.com"
                  value={form.contact_email}
                  onChange={e => set('contact_email', e.target.value)}
                  className="h-11"
                />
                <p className="text-xs text-slate-400">Used for billing and organisation-level correspondence.</p>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <Button
                onClick={next}
                className="bg-[#005EB8] hover:bg-[#004a93] text-white h-11 px-8"
              >
                Continue
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ── Step 1: Choose plan ── */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-1">Choose a subscription plan</h2>
            <p className="text-sm text-slate-500 mb-6">You can change your plan at any time after signing up.</p>

            <div className="space-y-3">
              {plans.map(plan => (
                <button
                  key={plan.tier}
                  onClick={() => set('subscription_tier', plan.tier)}
                  className={cn(
                    'w-full text-left rounded-xl border-2 p-4 transition-all duration-150 relative',
                    form.subscription_tier === plan.tier
                      ? 'border-[#005EB8] bg-blue-50/50'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  )}
                >
                  {plan.highlighted && (
                    <span className="absolute -top-2.5 left-4 bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      Most Popular
                    </span>
                  )}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        'w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all',
                        form.subscription_tier === plan.tier
                          ? 'border-[#005EB8] bg-[#005EB8]'
                          : 'border-slate-300 bg-white'
                      )}>
                        {form.subscription_tier === plan.tier && (
                          <div className="w-2 h-2 rounded-full bg-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{plan.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{plan.description} · {plan.seats}</p>
                        <ul className="mt-2 space-y-1">
                          {plan.features.slice(0, 3).map(f => (
                            <li key={f} className="flex items-center gap-1.5 text-xs text-slate-600">
                              <CheckCircle className="w-3 h-3 text-[#005EB8] flex-shrink-0" />
                              {f}
                            </li>
                          ))}
                          {plan.features.length > 3 && (
                            <li className="text-xs text-slate-400">+{plan.features.length - 3} more features</li>
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-xl font-bold text-slate-900">{plan.price}</span>
                      <span className="text-xs text-slate-500">{plan.period}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-500 text-center">
              No credit card required to get started. You won't be charged until your trial ends.
            </div>

            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={back} className="h-11 px-6">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </Button>
              <Button
                onClick={next}
                className="bg-[#005EB8] hover:bg-[#004a93] text-white h-11 px-8"
              >
                Continue with {selectedPlan.name}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ── Step 2: Admin account ── */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-slate-900 mb-1">Create your admin account</h2>
            <p className="text-sm text-slate-500 mb-1">
              You'll be the administrator for <strong>{form.org_name}</strong>.
            </p>
            <div className="flex items-center gap-2 mb-6 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
              <Building2 className="w-4 h-4 text-amber-600 flex-shrink-0" />
              <p className="text-xs text-amber-800">
                Only organisation admins can create accounts. Staff are added by their admin — individuals cannot self-register.
              </p>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="admin_first_name">First name <span className="text-red-500">*</span></Label>
                  <Input
                    id="admin_first_name"
                    placeholder="Jane"
                    value={form.admin_first_name}
                    onChange={e => set('admin_first_name', e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin_last_name">Last name <span className="text-red-500">*</span></Label>
                  <Input
                    id="admin_last_name"
                    placeholder="Smith"
                    value={form.admin_last_name}
                    onChange={e => set('admin_last_name', e.target.value)}
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin_email">Your email address <span className="text-red-500">*</span></Label>
                <Input
                  id="admin_email"
                  type="email"
                  placeholder="jane@yourorganisation.com"
                  value={form.admin_email}
                  onChange={e => set('admin_email', e.target.value)}
                  className="h-11"
                />
                <p className="text-xs text-slate-400">This will be your login email.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin_password">Password <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Input
                    id="admin_password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="At least 8 characters"
                    value={form.admin_password}
                    onChange={e => set('admin_password', e.target.value)}
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.admin_password.length > 0 && (
                  <div className="flex gap-1 mt-1">
                    {[
                      form.admin_password.length >= 8,
                      /[A-Z]/.test(form.admin_password),
                      /[0-9]/.test(form.admin_password),
                    ].map((met, i) => (
                      <div
                        key={i}
                        className={cn(
                          'h-1 flex-1 rounded-full transition-colors',
                          met ? 'bg-emerald-500' : 'bg-slate-200'
                        )}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin_confirm_password">Confirm password <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Input
                    id="admin_confirm_password"
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Repeat your password"
                    value={form.admin_confirm_password}
                    onChange={e => set('admin_confirm_password', e.target.value)}
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {form.admin_confirm_password.length > 0 && form.admin_password !== form.admin_confirm_password && (
                  <p className="text-xs text-red-500">Passwords do not match.</p>
                )}
              </div>
            </div>

            {/* Summary */}
            <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm space-y-1.5">
              <p className="font-medium text-slate-700 text-xs uppercase tracking-wide mb-2">Summary</p>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Organisation</span>
                <span className="font-medium text-slate-800">{form.org_name}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Plan</span>
                <span className="font-medium text-slate-800">{selectedPlan.name} — {selectedPlan.price}/mo</span>
              </div>
              <div className="flex justify-between text-xs text-slate-600">
                <span>Seats</span>
                <span className="font-medium text-slate-800">{selectedPlan.seats}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={back} className="h-11 px-6" disabled={submitting}>
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back
              </Button>
              <Button
                onClick={submit}
                disabled={submitting}
                className="bg-[#005EB8] hover:bg-[#004a93] text-white h-11 px-8"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Organisation
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-slate-400 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#005EB8] hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
