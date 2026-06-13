'use client';

import { useState } from 'react';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Mail, CheckCircle, Loader2, Phone, MapPin,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const SUBJECTS = [
  { value: 'Course Inquiry',            label: 'Course Inquiry' },
  { value: 'Subscription & Billing',    label: 'Subscription & Billing' },
  { value: 'Technical Support',         label: 'Technical Support' },
  { value: 'Organisation Registration', label: 'Organisation Registration' },
  { value: 'Certificate Issue',         label: 'Certificate Issue' },
  { value: 'Partnership Inquiry',       label: 'Partnership Inquiry' },
  { value: 'Other',                     label: 'Other' },
];

interface FormState {
  name: string;
  email: string;
  organisation: string;
  subject: string;
  message: string;
}

const EMPTY: FormState = {
  name: '', email: '', organisation: '', subject: '', message: '',
};

export function ContactModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k: keyof FormState, v: string) => {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: '' }));
  };

  const validate = (): boolean => {
    const e: Partial<FormState> = {};
    if (!form.name.trim())    e.name    = 'Your name is required.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                              e.email   = 'A valid email address is required.';
    if (!form.subject)        e.subject = 'Please select a subject.';
    if (form.message.trim().length < 10)
                              e.message = 'Message must be at least 10 characters.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/send-contact-email`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          },
          body: JSON.stringify({
            name:         form.name.trim(),
            email:        form.email.trim(),
            organisation: form.organisation.trim(),
            subject:      form.subject,
            message:      form.message.trim(),
          }),
        }
      );
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error ?? 'Submission failed.');
      setDone(true);
    } catch (err: any) {
      setErrors({ message: err.message ?? 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after animation completes
    setTimeout(() => { setDone(false); setForm(EMPTY); setErrors({}); }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={open => !open && handleClose()}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden gap-0">

        {done ? (
          /* ── Success state ─────────────────────────────────────────────── */
          <div className="flex flex-col items-center justify-center py-14 px-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-5">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Message sent!</h2>
            <p className="text-slate-500 text-sm mb-1 max-w-sm leading-relaxed">
              Thanks for getting in touch. Our team will respond to <strong>{form.email}</strong> within one business day.
            </p>
            <p className="text-xs text-slate-400 mb-8">
              For urgent matters email us directly at{' '}
              <a href="mailto:support@skillguardian.co.uk" className="text-[#005EB8] hover:underline">
                support@skillguardian.co.uk
              </a>
            </p>
            <Button onClick={handleClose} className="bg-[#005EB8] hover:bg-[#004a93] text-white px-8">
              Close
            </Button>
          </div>
        ) : (
          /* ── Form ──────────────────────────────────────────────────────── */
          <div className="flex flex-col sm:flex-row">

            {/* Left panel */}
            <div className="bg-[#005EB8] text-white p-7 sm:w-64 flex-shrink-0 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <span className="font-black text-white text-xs tracking-tight" style={{ letterSpacing: '-0.03em' }}>SG</span>
                  </div>
                  <span className="font-bold text-sm">SkillGuardian</span>
                </div>
                <h2 className="text-xl font-bold leading-snug mb-2">Get in touch</h2>
                <p className="text-blue-200 text-sm leading-relaxed">
                  Have a question about our platform, pricing, or training courses? We're here to help.
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-300 mb-0.5">Email us</p>
                    <a
                      href="mailto:support@skillguardian.co.uk"
                      className="text-sm font-medium text-white hover:text-blue-200 transition-colors break-all"
                    >
                      support@skillguardian.co.uk
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-300 mb-0.5">Response time</p>
                    <p className="text-sm font-medium text-white">Within 1 business day</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-blue-300 mb-0.5">Based in</p>
                    <p className="text-sm font-medium text-white">United Kingdom</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right panel — form */}
            <div className="flex-1 p-7 overflow-y-auto max-h-[90vh] sm:max-h-none">
              <DialogHeader className="mb-5 text-left">
                <DialogTitle className="text-lg font-bold text-slate-900">Send us a message</DialogTitle>
                <p className="text-sm text-slate-500 mt-0.5">All fields marked <span className="text-red-500">*</span> are required.</p>
              </DialogHeader>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full name" required error={errors.name}>
                    <Input
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={e => set('name', e.target.value)}
                      className={cn('h-10', errors.name && 'border-red-400 focus-visible:ring-red-400')}
                    />
                  </Field>
                  <Field label="Email address" required error={errors.email}>
                    <Input
                      type="email"
                      placeholder="jane@yourorg.com"
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                      className={cn('h-10', errors.email && 'border-red-400 focus-visible:ring-red-400')}
                    />
                  </Field>
                </div>

                {/* Organisation */}
                <Field label="Organisation name" hint="Optional">
                  <Input
                    placeholder="e.g. Sunrise Care Home Ltd"
                    value={form.organisation}
                    onChange={e => set('organisation', e.target.value)}
                    className="h-10"
                  />
                </Field>

                {/* Subject dropdown */}
                <Field label="Subject" required error={errors.subject}>
                  <Select value={form.subject} onValueChange={v => set('subject', v)}>
                    <SelectTrigger className={cn('h-10', errors.subject && 'border-red-400 focus:ring-red-400')}>
                      <SelectValue placeholder="Select a subject..." />
                    </SelectTrigger>
                    <SelectContent>
                      {SUBJECTS.map(s => (
                        <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                {/* Message */}
                <Field label="Message" required error={errors.message}>
                  <Textarea
                    placeholder="Tell us how we can help..."
                    value={form.message}
                    onChange={e => set('message', e.target.value)}
                    rows={4}
                    className={cn(
                      'resize-none leading-relaxed',
                      errors.message && 'border-red-400 focus-visible:ring-red-400'
                    )}
                  />
                  <p className="text-xs text-slate-400 mt-1 text-right">
                    {form.message.length} characters
                  </p>
                </Field>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-11 bg-[#005EB8] hover:bg-[#004a93] text-white font-medium"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>

                <p className="text-xs text-center text-slate-400">
                  We'll reply to <span className="font-medium">{form.email || 'your email'}</span> within one business day.
                </p>
              </form>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Small helper to keep field markup tidy
function Field({
  label, required, hint, error, children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-slate-700 text-sm">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
        {hint && <span className="text-slate-400 font-normal ml-1 text-xs">({hint})</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
