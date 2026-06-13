'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { CertificateRequest, Course, Profile } from '@/lib/types';
import { Award, Download, Clock, CheckCircle, XCircle,
  Loader2, QrCode, ShieldCheck, BookOpen, Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { generateCertificatePDF, generatePortfolioCertificatePDF, CARE_CERT_COURSE_ID } from '@/lib/certificate';

interface CertWithDetails extends CertificateRequest {
  course?: Course;
  profile?: Profile;
  approver?: Profile;
}

export default function CertificatesPage() {
  const { profile, isIndividual } = useAuth();
  if (!profile) return null;
  if (profile.role === 'employee') return <EmployeeCertificates isIndividual={isIndividual} />;
  return <AdminCertificates />;
}

// ── Employee view ─────────────────────────────────────────────────────────────

function EmployeeCertificates({ isIndividual }: { isIndividual: boolean }) {
  const { profile, organisation } = useAuth();
  const [certs, setCerts] = useState<CertWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) return;
    const load = async () => {
      const { data } = await supabase
        .from('certificate_requests')
        .select('*, courses(*)')
        .eq('user_id', profile.id)
        .order('request_date', { ascending: false });

      if (data) {
        const certList: CertWithDetails[] = data.map((r: any) => ({ ...r, course: r.courses }));

        // Fetch approver names for approved certs
        const approverIds = certList
          .filter(c => c.approved_by)
          .map(c => c.approved_by as string);

        if (approverIds.length > 0) {
          const { data: approvers } = await supabase
            .from('profiles')
            .select('id, first_name, last_name')
            .in('id', Array.from(new Set(approverIds)));

          const approverMap = new Map((approvers ?? []).map((a: any) => [a.id, a]));
          certList.forEach(c => {
            if (c.approved_by) c.approver = approverMap.get(c.approved_by);
          });
        }

        setCerts(certList);
      }
      setLoading(false);
    };
    load();
  }, [profile]);

  const handleDownload = async (cert: CertWithDetails) => {
    if (!cert.course || !profile || cert.status !== 'approved') return;
    setDownloading(cert.id);
    try {
      const isCareCert = cert.course.id === CARE_CERT_COURSE_ID;

      if (isCareCert) {
        await generatePortfolioCertificatePDF({
          employeeName: `${profile.first_name} ${profile.last_name}`,
          completionDate: cert.completion_date,
          certificateId: cert.certificate_id ?? '',
          organisationName: organisation?.name ?? '',
          approvedByName: cert.approver
            ? `${cert.approver.first_name} ${cert.approver.last_name}`
            : undefined,
        });
      } else {
        await generateCertificatePDF({
          employeeName: `${profile.first_name} ${profile.last_name}`,
          courseName: cert.course.title,
          completionDate: cert.completion_date,
          expiryMonths: cert.course.expiry_months,
          certificateId: cert.certificate_id ?? '',
          organisationName: organisation?.name ?? '',
          approvedByName: cert.approver
            ? `${cert.approver.first_name} ${cert.approver.last_name}`
            : undefined,
        });
      }

      await supabase
        .from('certificate_requests')
        .update({ download_count: (cert.download_count ?? 0) + 1 })
        .eq('id', cert.id);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="pt-8 lg:pt-0 mb-6">
        <h1 className="text-2xl font-bold text-slate-900">My Certificates</h1>
        <p className="text-slate-500 mt-1">Download your CQC-compliant training certificates</p>
      </div>

      {/* Info banner */}
      <div className="mb-6 flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
        <QrCode className="w-5 h-5 text-[#005EB8] flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800 leading-relaxed">
          {isIndividual ? (
            <>
              <span className="font-semibold">Certificates are issued automatically when you pass.</span>{' '}
              No approval needed — just complete the course and your certificate is ready to download instantly.
            </>
          ) : (
            <>
              <span className="font-semibold">Each certificate includes a unique QR code.</span> Scanning it links directly to SkillGuardian for instant verification by CQC inspectors or new employers.
            </>
          )}
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-20 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : certs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
          <Award className="w-12 h-12 mx-auto mb-3 text-slate-200" />
          <p className="font-medium text-slate-500">No certificates yet</p>
          <p className="text-sm text-slate-400 mt-1">
            {isIndividual
              ? 'Complete a course and pass the quiz — your certificate will appear here automatically.'
              : 'Complete a course and request your certificate — your manager will then approve it.'
            }
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {certs.map(cert => (
            <EmployeeCertRow
              key={cert.id}
              cert={cert}
              downloading={downloading === cert.id}
              onDownload={() => handleDownload(cert)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function EmployeeCertRow({
  cert,
  downloading,
  onDownload,
}: {
  cert: CertWithDetails;
  downloading: boolean;
  onDownload: () => void;
}) {
  const isCareCert = cert.course?.id === CARE_CERT_COURSE_ID;

  const statusConfig = {
    pending:  { label: 'Pending Review', icon: Clock,         color: 'bg-amber-50 text-amber-700 border-amber-200' },
    approved: { label: 'Approved',       icon: CheckCircle,   color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    rejected: { label: 'Rejected',       icon: XCircle,       color: 'bg-red-50 text-red-700 border-red-200' },
  };
  const cfg = statusConfig[cert.status];

  return (
    <div className={cn(
      'bg-white rounded-xl border p-4 flex items-center gap-4 transition-shadow hover:shadow-sm',
      isCareCert && cert.status === 'approved'
        ? 'border-amber-300 bg-gradient-to-r from-amber-50/60 to-white'
        : cert.status === 'approved' ? 'border-emerald-200' : 'border-slate-200'
    )}>
      <div className={cn(
        'w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0',
        isCareCert ? 'bg-amber-100' : cert.status === 'approved' ? 'bg-emerald-50' : 'bg-blue-50'
      )}>
        {isCareCert
          ? <BookOpen className="w-5 h-5 text-amber-600" />
          : cert.status === 'approved'
            ? <ShieldCheck className="w-5 h-5 text-emerald-600" />
            : <Award className="w-5 h-5 text-[#005EB8]" />
        }
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-slate-900 truncate">{cert.course?.title}</p>
          {isCareCert && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 border border-amber-200 whitespace-nowrap">
              PORTFOLIO — 16 STANDARDS
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3 mt-1">
          <span className={cn(
            'text-xs px-2 py-0.5 rounded-full border flex items-center gap-1',
            cfg.color
          )}>
            <cfg.icon className="w-3 h-3" />
            {cfg.label}
          </span>
          <span className="text-xs text-slate-400">
            Requested {format(new Date(cert.request_date), 'dd MMM yyyy')}
          </span>
          {cert.status === 'approved' && cert.approved_date && (
            <span className="text-xs text-slate-400">
              Approved {format(new Date(cert.approved_date), 'dd MMM yyyy')}
            </span>
          )}
        </div>
        {cert.status === 'rejected' && cert.rejection_reason && (
          <p className="text-xs text-red-600 mt-1">Reason: {cert.rejection_reason}</p>
        )}
        {cert.status === 'approved' && cert.certificate_id && (
          <p className="text-xs text-slate-400 mt-1 font-mono flex items-center gap-1">
            <QrCode className="w-3 h-3" />
            {cert.certificate_id}
          </p>
        )}
      </div>
      {cert.status === 'approved' && (
        <Button
          size="sm"
          onClick={onDownload}
          disabled={downloading}
          className={cn(
            'text-white flex-shrink-0 h-9 px-4',
            isCareCert
              ? 'bg-amber-500 hover:bg-amber-600'
              : 'bg-[#005EB8] hover:bg-[#004a93]'
          )}
        >
          {downloading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Download className="w-3.5 h-3.5 mr-1.5" />
              {isCareCert ? 'Portfolio PDF' : 'Download PDF'}
            </>
          )}
        </Button>
      )}
    </div>
  );
}

// ── Admin view ────────────────────────────────────────────────────────────────

function AdminCertificates() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [certs, setCerts] = useState<CertWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [rejectModal, setRejectModal] = useState<{ open: boolean; certId: string | null }>({ open: false, certId: null });
  const [rejectReason, setRejectReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const load = async () => {
    if (!profile?.organisation_id) return;
    setLoading(true);
    const query = supabase
      .from('certificate_requests')
      .select('*, courses(*), profiles!certificate_requests_user_id_fkey(*)')
      .eq('organisation_id', profile.organisation_id)
      .order('request_date', { ascending: false });

    if (filter !== 'all') query.eq('status', filter);

    const { data } = await query;
    if (data) {
      setCerts(data.map((r: any) => ({ ...r, course: r.courses, profile: r.profiles })));
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, [profile, filter]);

  const approveCert = async (certId: string) => {
    if (!profile) return;
    setActionLoading(true);
    const certCode = `SG-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const { error } = await supabase.from('certificate_requests').update({
      status: 'approved',
      
      approved_by: profile.id,
      approved_date: new Date().toISOString(),
      certificate_id: certCode,
    }).eq('id', certId);

    
    if (!error) {
      toast({ title: 'Certificate approved', description: 'The employee can now download their certificate.' });

      const cert = certs.find(c => c.id === certId);

      if (cert?.profile?.email && cert?.course) {
        await supabase.functions.invoke(
          "send-email",
          {
            body: {
              to: cert.profile.email,
              type: "certificate_approved",
              data: {
                first_name: cert.profile.first_name,
                course: cert.course.title,
                certificate_id: certCode,
              },
            },
          }
        );
      }
      await load();
    }

    
    setActionLoading(false);
  };

  

  const rejectCert = async () => {
    if (!profile || !rejectModal.certId) return;
    setActionLoading(true);
    const { error } = await supabase.from('certificate_requests').update({
      status: 'rejected',
      rejection_reason: rejectReason,
      approved_by: profile.id,
    }).eq('id', rejectModal.certId);

    if (!error) {
      toast({ title: 'Certificate request rejected', description: 'The employee will see the reason in their dashboard.' });
      setRejectModal({ open: false, certId: null });
      setRejectReason('');
      const cert = certs.find(
        c => c.id === rejectModal.certId
      );

      if (cert?.profile?.email && cert?.course) {
        await supabase.functions.invoke(
          "send-email",
          {
            body: {
              to: cert.profile.email,
              type: "certificate_rejected",
              data: {
                first_name: cert.profile.first_name,
                course: cert.course.title,
                reason: rejectReason,
              },
            },
          }
        );
      }
      await load();
    }
    setActionLoading(false);
  };

  const pendingCount = certs.filter(c => c.status === 'pending').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="pt-8 lg:pt-0 mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Certificate Requests</h1>
            <p className="text-slate-500 mt-1">Review and approve employee certificate requests</p>
          </div>
          {pendingCount > 0 && (
            <div className="flex-shrink-0 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 text-center">
              <p className="text-2xl font-bold text-amber-700">{pendingCount}</p>
              <p className="text-xs text-amber-600">awaiting review</p>
            </div>
          )}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(['all', 'pending', 'approved', 'rejected'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all',
              filter === f
                ? 'text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            )}
            style={
                filter === f
                  ? {
                      backgroundColor: 'var(--brand-color)',
                      // border: `var(--brand-color)`,
                    }
                  : undefined
              }
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-24 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : certs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
          <Award className="w-12 h-12 mx-auto mb-3 text-slate-200" />
          <p className="font-medium text-slate-500">
            No {filter === 'all' ? '' : filter + ' '}certificate requests
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {certs.map(cert => (
            <AdminCertRow
              key={cert.id}
              cert={cert}
              actionLoading={actionLoading}
              onApprove={() => approveCert(cert.id)}
              onReject={() => { setRejectModal({ open: true, certId: cert.id }); setRejectReason(''); }}
            />
          ))}
        </div>
      )}

      {/* Reject Modal */}
      <Dialog
        open={rejectModal.open}
        onOpenChange={open => setRejectModal({ open, certId: rejectModal.certId })}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Certificate Request</DialogTitle>
          </DialogHeader>
          <div className="py-2">
            <p className="text-sm text-slate-600 mb-3">
              Please provide a reason for rejecting this certificate request. The employee will see this in their dashboard.
            </p>
            <Textarea
              placeholder="e.g. Quiz score does not meet the minimum pass mark. Please retry the assessment."
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              rows={3}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectModal({ open: false, certId: null })}>
              Cancel
            </Button>
            <Button
              onClick={rejectCert}
              disabled={!rejectReason.trim() || actionLoading}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {actionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Reject Certificate'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AdminCertRow({
  cert,
  actionLoading,
  onApprove,
  onReject,
}: {
  cert: CertWithDetails;
  actionLoading: boolean;
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <div className={cn(
      'bg-white rounded-xl border p-4 transition-shadow hover:shadow-sm',
      cert.status === 'pending' ? 'border-amber-200 bg-amber-50/20' : 'border-slate-200'
    )}>
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
          <Award className="w-5 h-5 text-[#005EB8]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-slate-900">
                {cert.profile?.first_name} {cert.profile?.last_name}
              </p>
              <p className="text-sm text-slate-500">{cert.course?.title}</p>
            </div>
            <StatusBadge status={cert.status} />
          </div>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-400">
            <span>Requested: {format(new Date(cert.request_date), 'dd MMM yyyy')}</span>
            <span>Completed: {format(new Date(cert.completion_date), 'dd MMM yyyy')}</span>
          </div>
          {cert.status === 'rejected' && cert.rejection_reason && (
            <p className="text-xs text-red-600 mt-1">Reason: {cert.rejection_reason}</p>
          )}
          {cert.status === 'approved' && cert.certificate_id && (
            <p className="text-xs text-slate-400 mt-1 font-mono flex items-center gap-1">
              <QrCode className="w-3 h-3" />
              {cert.certificate_id} — QR code included in downloaded certificate
            </p>
          )}
        </div>
        {cert.status === 'pending' && (
          <div className="flex gap-2 flex-shrink-0">
            <Button
              size="sm"
              onClick={onApprove}
              disabled={actionLoading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white h-8"
            >
              <CheckCircle className="w-3.5 h-3.5 mr-1" />
              Approve
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={onReject}
              disabled={actionLoading}
              className="border-red-200 text-red-600 hover:bg-red-50 h-8"
            >
              <XCircle className="w-3.5 h-3.5 mr-1" />
              Reject
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; cls: string }> = {
    pending:  { label: 'Pending Review', cls: 'bg-amber-100 text-amber-700' },
    approved: { label: 'Approved',       cls: 'bg-emerald-100 text-emerald-700' },
    rejected: { label: 'Rejected',       cls: 'bg-red-100 text-red-700' },
  };
  const cfg = config[status] ?? { label: status, cls: 'bg-slate-100 text-slate-700' };
  return (
    <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', cfg.cls)}>
      {cfg.label}
    </span>
  );
}
