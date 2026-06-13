'use client';

import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import {
  BarChart3, Download, Users, Award, BookOpen, TrendingUp,
  CheckCircle, AlertCircle, Clock, FileText, Printer, RefreshCw,
  ChevronDown, ChevronUp, Shield, Calendar, XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format, addMonths, isAfter } from 'date-fns';
import { cn } from '@/lib/utils';

interface CourseRecord {
  course_id: string;
  course_title: string;
  category: string;
  target_role: string;
  expiry_months: number | null;
  status: string;
  quiz_score: number | null;
  completed_at: string | null;
  started_at: string | null;
  expiry_date: string | null;
  is_expired: boolean;
}

interface EmployeeReport {
  user_id: string;
  name: string;
  email: string;
  professional_role: string;
  is_active: boolean;
  courses: CourseRecord[];
  total: number;
  completed: number;
  in_progress: number;
  not_started: number;
  expired: number;
  compliance_pct: number;
  rag: 'green' | 'amber' | 'red';
}

interface OrgStats {
  total_staff: number;
  fully_compliant: number;
  at_risk: number;
  non_compliant: number;
  overall_completion: number;
  report_date: string;
}

const categoryLabels: Record<string, string> = {
  core_mandatory: 'Core Mandatory',
  legal_requirement: 'Legal Requirement',
  role_based: 'Role-Based',
  clinical_nurse: 'Clinical / Nurse',
};

const categoryColors: Record<string, string> = {
  core_mandatory: 'text-blue-700 bg-blue-50',
  legal_requirement: 'text-amber-700 bg-amber-50',
  role_based: 'text-teal-700 bg-teal-50',
  clinical_nurse: 'text-emerald-700 bg-emerald-50',
};

const professionalRoleLabels: Record<string, string> = {
  care_assistant: 'Care Assistant',
  rgn: 'Registered General Nurse (RGN)',
  rmn: 'Registered Mental Nurse (RMN)',
  nurse_associate: 'Nursing Associate',
  clinical_lead: 'Clinical Lead',
  manager: 'Manager',
  admin: 'Administrator',
  other: 'Staff Member',
};

function ragFromPct(pct: number): 'green' | 'amber' | 'red' {
  if (pct >= 80) return 'green';
  if (pct >= 50) return 'amber';
  return 'red';
}

export default function ReportsPage() {
  const { profile, organisation } = useAuth();
  const [employees, setEmployees] = useState<EmployeeReport[]>([]);
  const [orgStats, setOrgStats] = useState<OrgStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const printRef = useRef<HTMLDivElement>(null);

  const brandColor =
    organisation?.primary_color || '#005EB8';

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const generateReport = async () => {
    if (!profile?.organisation_id) return;
    setLoading(true);

    const [empRes, ucRes, certRes] = await Promise.all([
      supabase.from('profiles').select('*')
        .eq('organisation_id', profile.organisation_id)
        .eq('role', 'employee')
        .order('last_name'),
      supabase.from('user_courses')
        .select('*, courses(*)')
        .in('user_id', (await supabase.from('profiles').select('id').eq('organisation_id', profile.organisation_id).eq('role', 'employee')).data?.map((p: any) => p.id) ?? []),
      supabase.from('certificate_requests').select('*').eq('organisation_id', profile.organisation_id),
    ]);

    const empList = empRes.data ?? [];
    const allUc = ucRes.data ?? [];
    const today = new Date();

    const reportEmployees: EmployeeReport[] = empList.map((emp: any) => {
      const empUc = allUc.filter((uc: any) => uc.user_id === emp.id);

      const courses: CourseRecord[] = empUc.map((uc: any) => {
        const course = uc.courses ?? {};
        let expiry_date: string | null = null;
        let is_expired = false;
        if (uc.status === 'passed' && uc.completed_at && course.expiry_months) {
          const exp = addMonths(new Date(uc.completed_at), course.expiry_months);
          expiry_date = exp.toISOString();
          is_expired = isAfter(today, exp);
        }
        return {
          course_id: uc.course_id,
          course_title: course.title ?? 'Unknown',
          category: course.category ?? '',
          target_role: course.target_role ?? '',
          expiry_months: course.expiry_months ?? null,
          status: is_expired ? 'expired' : uc.status,
          quiz_score: uc.quiz_score,
          completed_at: uc.completed_at,
          started_at: uc.started_at,
          expiry_date,
          is_expired,
        };
      });

      const total = courses.length;
      const completed = courses.filter(c => c.status === 'passed').length;
      const expired = courses.filter(c => c.is_expired).length;
      const in_progress = courses.filter(c => c.status === 'in_progress').length;
      const not_started = courses.filter(c => c.status === 'not_started').length;
      const effective_completed = completed; // expired already shown separately
      const compliance_pct = total > 0 ? Math.round((effective_completed / total) * 100) : 0;

      return {
        user_id: emp.id,
        name: `${emp.first_name} ${emp.last_name}`,
        email: emp.email,
        professional_role: emp.professional_role,
        is_active: emp.is_active,
        courses,
        total,
        completed,
        in_progress,
        not_started,
        expired,
        compliance_pct,
        rag: ragFromPct(compliance_pct),
      };
    });

    const fully = reportEmployees.filter(e => e.rag === 'green').length;
    const atRisk = reportEmployees.filter(e => e.rag === 'amber').length;
    const nonComp = reportEmployees.filter(e => e.rag === 'red').length;
    const allAssigned = reportEmployees.reduce((a, e) => a + e.total, 0);
    const allCompleted = reportEmployees.reduce((a, e) => a + e.completed, 0);

    setOrgStats({
      total_staff: reportEmployees.length,
      fully_compliant: fully,
      at_risk: atRisk,
      non_compliant: nonComp,
      overall_completion: allAssigned > 0 ? Math.round((allCompleted / allAssigned) * 100) : 0,
      report_date: format(today, "dd MMMM yyyy 'at' HH:mm"),
    });

    setEmployees(reportEmployees);
    setGenerated(true);
    setExpandedIds(new Set());
    setLoading(false);
  };

  const exportCSV = () => {
    if (!employees.length) return;
    const lines: string[] = [
      `CQC Training Compliance Report`,
      `Organisation: ${organisation?.name ?? ''}`,
      `Generated: ${orgStats?.report_date ?? ''}`,
      '',
      'Employee,Email,Professional Role,Status,Total Assigned,Completed,In Progress,Not Started,Expired,Compliance %,RAG',
      ...employees.map(e => [
        `"${e.name}"`, e.email, `"${professionalRoleLabels[e.professional_role] ?? e.professional_role}"`,
        e.is_active ? 'Active' : 'Inactive',
        e.total, e.completed, e.in_progress, e.not_started, e.expired,
        `${e.compliance_pct}%`, e.rag.toUpperCase(),
      ].join(',')),
      '',
      'COURSE DETAIL',
      'Employee,Course,Category,Status,Score,Completed Date,Expiry Date',
      ...employees.flatMap(e =>
        e.courses.map(c => [
          `"${e.name}"`, `"${c.course_title}"`, `"${categoryLabels[c.category] ?? c.category}"`,
          c.is_expired ? 'Expired' : c.status.replace(/_/g, ' '),
          c.quiz_score != null ? `${c.quiz_score}%` : '',
          c.completed_at ? format(new Date(c.completed_at), 'dd/MM/yyyy') : '',
          c.expiry_date ? format(new Date(c.expiry_date), 'dd/MM/yyyy') : '',
        ].join(','))
      ),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CQC-Compliance-Report-${organisation?.name?.replace(/\s+/g, '-') ?? 'org'}-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const printReport = () => window.print();

  const ragConfig = {
    green: { label: 'Compliant', bg: 'bg-emerald-100', text: 'text-emerald-800', dot: 'bg-emerald-500', border: 'border-emerald-200' },
    amber: { label: 'At Risk', bg: 'bg-amber-100', text: 'text-amber-800', dot: 'bg-amber-500', border: 'border-amber-200' },
    red: { label: 'Non-Compliant', bg: 'bg-red-100', text: 'text-red-800', dot: 'bg-red-500', border: 'border-red-200' },
  };

  const statusConfig: Record<string, { label: string; icon: React.ElementType; iconColor: string; bg: string }> = {
    passed: { label: 'Passed', icon: CheckCircle, iconColor: 'text-emerald-500', bg: 'bg-emerald-50' },
    in_progress: { label: 'In Progress', icon: Clock, iconColor: 'text-amber-500', bg: 'bg-amber-50' },
    not_started: { label: 'Not Started', icon: BarChart3, iconColor: 'text-slate-400', bg: 'bg-slate-50' },
    failed: { label: 'Failed', icon: XCircle, iconColor: 'text-red-500', bg: 'bg-red-50' },
    expired: { label: 'Expired', icon: AlertCircle, iconColor: 'text-red-500', bg: 'bg-red-50' },
  };

  return (
    <>
      {/* Print styles */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #cqc-report, #cqc-report * { visibility: visible; }
          #cqc-report { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
          .print-break { page-break-before: always; }
        }
      `}</style>

      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="pt-8 lg:pt-0 mb-6 flex items-start justify-between gap-4 flex-wrap no-print">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">CQC Compliance Report</h1>
            <p className="text-slate-500 mt-1">Training compliance evidence for CQC inspections</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            {generated && (
              <>
                <Button onClick={exportCSV} variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" /> Export CSV
                </Button>
                <Button onClick={printReport} variant="outline" size="sm">
                  <Printer className="w-4 h-4 mr-2" /> Print / PDF
                </Button>
              </>
            )}
            <Button
              onClick={generateReport}
              disabled={loading}
              className="hover:bg-[#004a93] text-white"
              style={{
                backgroundColor: brandColor,
              }}
            >
              {loading ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <FileText className="w-4 h-4 mr-2" />
              )}
              {generated ? 'Regenerate Report' : 'Generate Report'}
            </Button>
          </div>
        </div>

        {!generated && !loading && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Shield className="w-8 h-8 text-[#005EB8]" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">CQC Training Compliance Report</h2>
            <p className="text-slate-500 max-w-md mx-auto mb-2 text-sm leading-relaxed">
              Generate a comprehensive training compliance report showing each employee's course completion status,
              RAG ratings, and expiry dates — ready for CQC inspections.
            </p>
            <p className="text-xs text-slate-400 mb-8">Covers all assigned courses, quiz scores, and certificate status</p>
            <Button
              onClick={generateReport}
              disabled={loading}
              className="hover:bg-[#004a93] text-white px-8 py-2.5"
              style={{
                backgroundColor: brandColor,
              }}
            >
              {loading ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <FileText className="w-4 h-4 mr-2" />}
              Generate CQC Report
            </Button>
          </div>
        )}

        {loading && (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <RefreshCw className="w-8 h-8 animate-spin text-[#005EB8] mx-auto mb-4" />
            <p className="text-slate-500 text-sm">Compiling compliance data...</p>
          </div>
        )}

        {generated && !loading && orgStats && (
          <div id="cqc-report" ref={printRef}>
            {/* Print header (visible only when printing) */}
            <div className="hidden print:block mb-6">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-7 h-7 text-[#005EB8]" />
                <h1 className="text-xl font-bold text-slate-900">SkillGuardian — CQC Training Compliance Report</h1>
              </div>
              <p className="text-sm text-slate-600">
                {organisation?.name} · Generated {orgStats.report_date}
              </p>
            </div>

            {/* Summary cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
              {[
                { label: 'Total Staff', value: orgStats.total_staff, icon: Users, color: 'text-[#005EB8] bg-blue-50' },
                { label: 'Fully Compliant', value: orgStats.fully_compliant, icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
                { label: 'At Risk', value: orgStats.at_risk, icon: AlertCircle, color: 'text-amber-600 bg-amber-50' },
                { label: 'Non-Compliant', value: orgStats.non_compliant, icon: XCircle, color: 'text-red-600 bg-red-50' },
                { label: 'Overall Completion', value: `${orgStats.overall_completion}%`, icon: TrendingUp, color: 'text-teal-600 bg-teal-50' },
              ].map(stat => (
                <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-4">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${stat.color}`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Report metadata bar */}
            <div className="bg-slate-800 text-white rounded-xl px-5 py-3 mb-6 flex flex-wrap items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-300" />
                <span className="font-semibold">{organisation?.name}</span>
                <span className="text-slate-400">·</span>
                <span className="text-slate-300">CQC Training Compliance Report</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-xs">
                <Calendar className="w-3.5 h-3.5" />
                Generated {orgStats.report_date}
              </div>
            </div>

            {/* RAG legend */}
            <div className="flex flex-wrap gap-3 mb-5 no-print">
              {(['green', 'amber', 'red'] as const).map(rag => (
                <div key={rag} className={cn('flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border', ragConfig[rag].bg, ragConfig[rag].border)}>
                  <div className={cn('w-2 h-2 rounded-full', ragConfig[rag].dot)} />
                  <span className={cn('font-medium', ragConfig[rag].text)}>{ragConfig[rag].label}</span>
                  <span className={ragConfig[rag].text}>
                    {rag === 'green' ? '≥80%' : rag === 'amber' ? '50–79%' : '<50%'}
                  </span>
                </div>
              ))}
            </div>

            {/* Employee rows */}
            <div className="space-y-3">
              {employees.map((emp) => {
                const rag = ragConfig[emp.rag];
                const expanded = expandedIds.has(emp.user_id);
                const coursesByCategory = emp.courses.reduce((acc, c) => {
                  const cat = c.category || 'other';
                  if (!acc[cat]) acc[cat] = [];
                  acc[cat].push(c);
                  return acc;
                }, {} as Record<string, CourseRecord[]>);

                return (
                  <div key={emp.user_id} className={cn('bg-white rounded-xl border overflow-hidden transition-all', rag.border)}>
                    {/* Employee header row */}
                    <button
                      onClick={() => toggleExpand(emp.user_id)}
                      className="w-full text-left px-5 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors no-print"
                    >
                      {/* RAG dot */}
                      <div className={cn('w-3 h-3 rounded-full flex-shrink-0', rag.dot)} />

                      {/* Name + role */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-slate-900">{emp.name}</span>
                          {!emp.is_active && (
                            <span className="text-xs bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">Inactive</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                          <span className="text-xs text-slate-500">{emp.email}</span>
                          <span className="text-slate-300">·</span>
                          <span className="text-xs text-slate-500">{professionalRoleLabels[emp.professional_role] ?? emp.professional_role}</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="hidden sm:flex items-center gap-6 text-center flex-shrink-0">
                        <div>
                          <div className="text-lg font-bold text-slate-900">{emp.completed}/{emp.total}</div>
                          <div className="text-xs text-slate-400">Completed</div>
                        </div>
                        <div>
                          <div className={cn('text-lg font-bold', emp.rag === 'green' ? 'text-emerald-600' : emp.rag === 'amber' ? 'text-amber-600' : 'text-red-600')}>
                            {emp.compliance_pct}%
                          </div>
                          <div className="text-xs text-slate-400">Compliance</div>
                        </div>
                        <div className={cn('px-3 py-1.5 rounded-lg text-xs font-semibold border', rag.bg, rag.text, rag.border)}>
                          {rag.label}
                        </div>
                      </div>

                      <div className="flex-shrink-0 text-slate-400">
                        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {/* Print-only summary row */}
                    <div className="hidden print:flex px-5 py-3 items-center gap-4 border-b border-slate-100">
                      <div className={cn('w-2 h-2 rounded-full flex-shrink-0', rag.dot)} />
                      <div className="flex-1">
                        <span className="font-semibold text-slate-900 text-sm">{emp.name}</span>
                        <span className="text-slate-400 text-xs ml-2">{professionalRoleLabels[emp.professional_role] ?? emp.professional_role}</span>
                      </div>
                      <div className="text-sm font-bold text-slate-900">{emp.completed}/{emp.total} courses</div>
                      <div className={cn('text-sm font-bold', emp.rag === 'green' ? 'text-emerald-600' : emp.rag === 'amber' ? 'text-amber-600' : 'text-red-600')}>
                        {emp.compliance_pct}%
                      </div>
                      <div className={cn('px-2 py-1 rounded text-xs font-semibold', rag.bg, rag.text)}>{rag.label}</div>
                    </div>

                    {/* Expanded detail (screen) */}
                    {expanded && (
                      <div className="border-t border-slate-100 px-5 pb-5 pt-4 no-print">
                        {/* Mini stats */}
                        <div className="grid grid-cols-4 gap-3 mb-5">
                          {[
                            { label: 'Completed', value: emp.completed, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                            { label: 'In Progress', value: emp.in_progress, color: 'text-amber-600', bg: 'bg-amber-50' },
                            { label: 'Not Started', value: emp.not_started, color: 'text-slate-500', bg: 'bg-slate-50' },
                            { label: 'Expired', value: emp.expired, color: 'text-red-600', bg: 'bg-red-50' },
                          ].map(s => (
                            <div key={s.label} className={cn('rounded-lg p-3 text-center', s.bg)}>
                              <div className={cn('text-xl font-bold', s.color)}>{s.value}</div>
                              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                            </div>
                          ))}
                        </div>

                        {/* Compliance bar */}
                        <div className="mb-5">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs text-slate-500">Overall compliance</span>
                            <span className={cn('text-xs font-bold', emp.rag === 'green' ? 'text-emerald-600' : emp.rag === 'amber' ? 'text-amber-600' : 'text-red-600')}>
                              {emp.compliance_pct}%
                            </span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={cn('h-full rounded-full transition-all', emp.rag === 'green' ? 'bg-emerald-500' : emp.rag === 'amber' ? 'bg-amber-500' : 'bg-red-500')}
                              style={{ width: `${emp.compliance_pct}%` }}
                            />
                          </div>
                        </div>

                        {/* Courses by category */}
                        <div className="space-y-4">
                          {Object.entries(coursesByCategory).map(([cat, courses]) => (
                            <div key={cat}>
                              <p className={cn('text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded-md inline-block mb-2', categoryColors[cat] ?? 'text-slate-600 bg-slate-100')}>
                                {categoryLabels[cat] ?? cat}
                              </p>
                              <div className="space-y-1.5">
                                {courses.map(course => {
                                  const sc = statusConfig[course.status] ?? statusConfig['not_started'];
                                  return (
                                    <div key={course.course_id} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100">
                                      <div className={cn('w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0', sc.bg)}>
                                        <sc.icon className={cn('w-3.5 h-3.5', sc.iconColor)} />
                                      </div>
                                      <span className="flex-1 text-sm text-slate-700">{course.course_title}</span>
                                      <div className="flex items-center gap-3 text-xs flex-shrink-0">
                                        {course.quiz_score != null && course.status === 'passed' && (
                                          <span className={cn('font-medium', course.quiz_score >= 80 ? 'text-emerald-600' : 'text-red-500')}>
                                            {course.quiz_score}%
                                          </span>
                                        )}
                                        {course.completed_at && (
                                          <span className="text-slate-400">
                                            {format(new Date(course.completed_at), 'dd MMM yyyy')}
                                          </span>
                                        )}
                                        {course.expiry_date && (
                                          <span className={cn(course.is_expired ? 'text-red-500 font-medium' : 'text-slate-400')}>
                                            {course.is_expired ? 'Expired ' : 'Expires '}{format(new Date(course.expiry_date), 'dd MMM yyyy')}
                                          </span>
                                        )}
                                        <span className={cn('px-1.5 py-0.5 rounded-full font-medium', {
                                          'bg-emerald-100 text-emerald-700': course.status === 'passed',
                                          'bg-amber-100 text-amber-700': course.status === 'in_progress',
                                          'bg-slate-100 text-slate-600': course.status === 'not_started',
                                          'bg-red-100 text-red-700': course.status === 'failed' || course.status === 'expired',
                                        })}>
                                          {sc.label}
                                        </span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Print-only course detail */}
                    <div className="hidden print:block px-5 pb-4">
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="text-left py-1.5 text-slate-500 font-medium">Course</th>
                            <th className="text-left py-1.5 text-slate-500 font-medium">Category</th>
                            <th className="text-left py-1.5 text-slate-500 font-medium">Status</th>
                            <th className="text-left py-1.5 text-slate-500 font-medium">Score</th>
                            <th className="text-left py-1.5 text-slate-500 font-medium">Completed</th>
                            <th className="text-left py-1.5 text-slate-500 font-medium">Expires</th>
                          </tr>
                        </thead>
                        <tbody>
                          {emp.courses.map(course => (
                            <tr key={course.course_id} className="border-b border-slate-100">
                              <td className="py-1.5 pr-4 text-slate-800">{course.course_title}</td>
                              <td className="py-1.5 pr-4 text-slate-600">{categoryLabels[course.category] ?? course.category}</td>
                              <td className="py-1.5 pr-4 capitalize text-slate-600">{course.status.replace(/_/g, ' ')}</td>
                              <td className="py-1.5 pr-4 text-slate-600">{course.quiz_score != null ? `${course.quiz_score}%` : '—'}</td>
                              <td className="py-1.5 pr-4 text-slate-600">{course.completed_at ? format(new Date(course.completed_at), 'dd/MM/yyyy') : '—'}</td>
                              <td className="py-1.5 text-slate-600">{course.expiry_date ? format(new Date(course.expiry_date), 'dd/MM/yyyy') : '—'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 text-center">
              This report was generated by SkillGuardian on {orgStats.report_date} for {organisation?.name}.
              It represents training completion data at the time of generation and should be retained as evidence for CQC inspections.
            </div>
          </div>
        )}
      </div>
    </>
  );
}
