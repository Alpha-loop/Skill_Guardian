'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  Building2, Users, BookOpen, Award, TrendingUp, AlertTriangle,
  Clock, CheckCircle, BarChart3, RefreshCw, Crown, Star, Zap,
  ArrowUpRight, UserCheck, GraduationCap, Stethoscope, Briefcase,
  Heart, Shield, Activity,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import Link from 'next/link';

// ── Types ─────────────────────────────────────────────────────────────────────

interface PlatformStats {
  totalOrgs: number;
  activeOrgs: number;
  suspendedOrgs: number;
  totalEmployees: number;
  totalAdmins: number;
  totalCourses: number;
  totalCompletions: number;
  totalCertificates: number;
  approvedCertificates: number;
  pendingCertificates: number;
  expiringIn30: number;
  overdueCount: number;
}

interface SubscriptionBreakdown {
  basic: number;
  standard: number;
  premium: number;
}

interface CourseCategoryBreakdown {
  core_mandatory: number;
  legal_requirement: number;
  role_based: number;
  clinical_nurse: number;
  management_leadership: number;
}

interface CourseCompletionByCategory {
  category: string;
  total: number;
  completions: number;
  pct: number;
}

interface RoleBreakdown {
  care_assistant: number;
  senior_carer: number;
  rgn: number;
  rmn: number;
  nurse_associate: number;
  clinical_lead: number;
  manager: number;
  admin: number;
  other: number;
}

interface OrgRow {
  id: string;
  name: string;
  subscription_tier: string;
  is_active: boolean;
  seat_limit: number;
  created_at: string;
  employee_count: number;
  completion_rate: number;
}

interface RecentActivity {
  type: 'certificate_approved' | 'certificate_pending' | 'org_joined';
  label: string;
  sub: string;
  time: string;
  color: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const tierConfig: Record<string, { label: string; color: string; icon: typeof Zap; bg: string; border: string }> = {
  basic:    { label: 'Basic',    color: 'text-slate-700', icon: Zap,   bg: 'bg-slate-50',   border: 'border-slate-200' },
  standard: { label: 'Standard', color: 'text-blue-700',  icon: Star,  bg: 'bg-blue-50',    border: 'border-blue-200'  },
  premium:  { label: 'Premium',  color: 'text-amber-700', icon: Crown, bg: 'bg-amber-50',   border: 'border-amber-200' },
};

const categoryConfig: Record<string, { label: string; color: string; barColor: string; icon: typeof BookOpen }> = {
  core_mandatory:        { label: 'Core Mandatory',        color: 'text-[#005EB8]',  barColor: 'bg-[#005EB8]',  icon: Shield      },
  legal_requirement:     { label: 'Legal Requirement',     color: 'text-amber-700',  barColor: 'bg-amber-500',  icon: BookOpen    },
  role_based:            { label: 'Role-Based',            color: 'text-teal-700',   barColor: 'bg-teal-500',   icon: Heart       },
  clinical_nurse:        { label: 'Clinical / Nurse',      color: 'text-emerald-700',barColor: 'bg-emerald-500',icon: Stethoscope },
  management_leadership: { label: 'Management & Leadership',color: 'text-rose-700',  barColor: 'bg-rose-500',   icon: Briefcase   },
};

const roleConfig: Record<string, { label: string; group: string; color: string }> = {
  care_assistant:  { label: 'Care Assistant',      group: 'carers',     color: 'bg-blue-500'    },
  senior_carer:    { label: 'Senior Carer',        group: 'carers',     color: 'bg-blue-400'    },
  rgn:             { label: 'RGN',                 group: 'nurses',     color: 'bg-emerald-500' },
  rmn:             { label: 'RMN',                 group: 'nurses',     color: 'bg-emerald-400' },
  nurse_associate: { label: 'Nurse Associate',     group: 'nurses',     color: 'bg-emerald-300' },
  clinical_lead:   { label: 'Clinical Lead',       group: 'nurses',     color: 'bg-teal-500'    },
  manager:         { label: 'Manager',             group: 'management', color: 'bg-rose-500'    },
  admin:           { label: 'Administrator',       group: 'management', color: 'bg-rose-400'    },
  other:           { label: 'Other',               group: 'other',      color: 'bg-slate-400'   },
};

function StatCard({
  label, value, sub, icon: Icon, color, trend,
}: {
  label: string; value: string | number; sub?: string;
  icon: typeof BookOpen; color: string; trend?: { value: string; up: boolean };
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span className={cn(
            'text-xs font-medium flex items-center gap-0.5 px-2 py-0.5 rounded-full',
            trend.up ? 'text-emerald-700 bg-emerald-50' : 'text-red-600 bg-red-50'
          )}>
            <ArrowUpRight className={cn('w-3 h-3', !trend.up && 'rotate-90')} />
            {trend.value}
          </span>
        )}
      </div>
      <div>
        <div className="text-3xl font-bold text-slate-900">{value}</div>
        <div className="text-sm text-slate-500 mt-0.5">{label}</div>
        {sub && <div className="text-xs text-slate-400 mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const { profile } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());

  const [stats, setStats] = useState<PlatformStats>({
    totalOrgs: 0, activeOrgs: 0, suspendedOrgs: 0,
    totalEmployees: 0, totalAdmins: 0,
    totalCourses: 0, totalCompletions: 0,
    totalCertificates: 0, approvedCertificates: 0, pendingCertificates: 0,
    expiringIn30: 0, overdueCount: 0,
  });
  const [subscriptions, setSubscriptions] = useState<SubscriptionBreakdown>({ basic: 0, standard: 0, premium: 0 });
  const [categoryBreakdown, setCategoryBreakdown] = useState<CourseCategoryBreakdown>({
    core_mandatory: 0, legal_requirement: 0, role_based: 0, clinical_nurse: 0, management_leadership: 0,
  });
  const [completionByCategory, setCompletionByCategory] = useState<CourseCompletionByCategory[]>([]);
  const [roleBreakdown, setRoleBreakdown] = useState<RoleBreakdown>({
    care_assistant: 0, senior_carer: 0, rgn: 0, rmn: 0,
    nurse_associate: 0, clinical_lead: 0, manager: 0, admin: 0, other: 0,
  });
  const [orgs, setOrgs] = useState<OrgRow[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

  // Redirect non-super-admins
  useEffect(() => {
    if (profile && profile.role !== 'super_admin') {
      router.push('/dashboard');
    }
  }, [profile, router]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [
        orgsRes,
        profilesRes,
        coursesRes,
        ucRes,
        certRes,
        expiryRes,
        orgCertCountRes,
        recentCertRes,
      ] = await Promise.all([
        // All organisations
        supabase.from('organisations').select('id, name, subscription_tier, is_active, seat_limit, created_at'),
        // All profiles (employees + admins)
        supabase.from('profiles').select('id, role, professional_role, organisation_id'),
        // All courses with category
        supabase.from('courses').select('id, category').is('organisation_id', null),
        // All user_course completions
        supabase.from('user_courses').select('id, status, course_id'),
        // All certificates
        supabase.from('certificate_requests').select('id, status, organisation_id, request_date'),
        // Expiry tracking
        supabase.from('training_expiry_status').select('user_id, days_until_expiry'),
        // Cert counts per org (for org table)
        supabase.from('certificate_requests').select('organisation_id, status'),
        // Recent certificate requests
        supabase.from('certificate_requests')
          .select('id, status, request_date, profiles(first_name, last_name), courses(title), organisations(name)')
          .order('request_date', { ascending: false })
          .limit(8),
      ]);

      const allOrgs      = (orgsRes.data ?? []) as any[];
      const allProfiles  = (profilesRes.data ?? []) as any[];
      const allCourses   = (coursesRes.data ?? []) as any[];
      const allUC        = (ucRes.data ?? []) as any[];
      const allCerts     = (certRes.data ?? []) as any[];
      const allExpiry    = (expiryRes.data ?? []) as any[];

      // ── Platform Stats ──
      const activeOrgs    = allOrgs.filter(o => o.is_active).length;
      const employees     = allProfiles.filter(p => p.role === 'employee');
      const admins        = allProfiles.filter(p => p.role === 'org_admin');
      const completions   = allUC.filter(u => u.status === 'passed');
      const approved      = allCerts.filter(c => c.status === 'approved');
      const pending       = allCerts.filter(c => c.status === 'pending');
      const expiring30    = allExpiry.filter(e => e.days_until_expiry > 0 && e.days_until_expiry <= 30);
      const overdue       = allExpiry.filter(e => e.days_until_expiry <= 0);

      setStats({
        totalOrgs: allOrgs.length,
        activeOrgs,
        suspendedOrgs: allOrgs.length - activeOrgs,
        totalEmployees: employees.length,
        totalAdmins: admins.length,
        totalCourses: allCourses.length,
        totalCompletions: completions.length,
        totalCertificates: allCerts.length,
        approvedCertificates: approved.length,
        pendingCertificates: pending.length,
        expiringIn30: expiring30.length,
        overdueCount: overdue.length,
      });

      // ── Subscription Breakdown ──
      const subs = { basic: 0, standard: 0, premium: 0 };
      allOrgs.forEach((o: any) => {
        if (o.subscription_tier in subs) subs[o.subscription_tier as keyof typeof subs]++;
      });
      setSubscriptions(subs);

      // ── Course Category Breakdown ──
      const catCount: CourseCategoryBreakdown = {
        core_mandatory: 0, legal_requirement: 0, role_based: 0,
        clinical_nurse: 0, management_leadership: 0,
      };
      allCourses.forEach((c: any) => {
        if (c.category in catCount) catCount[c.category as keyof CourseCategoryBreakdown]++;
      });
      setCategoryBreakdown(catCount);

      // ── Completion Rate by Category ──
      const courseIdToCategory: Record<string, string> = {};
      allCourses.forEach((c: any) => { courseIdToCategory[c.id] = c.category; });
      const catTotals: Record<string, number> = {};
      const catDone: Record<string, number> = {};
      allUC.forEach((uc: any) => {
        const cat = courseIdToCategory[uc.course_id];
        if (!cat) return;
        catTotals[cat] = (catTotals[cat] ?? 0) + 1;
        if (uc.status === 'passed') catDone[cat] = (catDone[cat] ?? 0) + 1;
      });
      const compByCat: CourseCompletionByCategory[] = Object.keys(categoryConfig).map(cat => {
        const total = catTotals[cat] ?? 0;
        const done  = catDone[cat] ?? 0;
        return { category: cat, total, completions: done, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
      });
      setCompletionByCategory(compByCat);

      // ── Role Breakdown ──
      const roles: RoleBreakdown = {
        care_assistant: 0, senior_carer: 0, rgn: 0, rmn: 0,
        nurse_associate: 0, clinical_lead: 0, manager: 0, admin: 0, other: 0,
      };
      employees.forEach((p: any) => {
        const r = p.professional_role as keyof RoleBreakdown;
        if (r in roles) roles[r]++;
        else roles.other++;
      });
      setRoleBreakdown(roles);

      // ── Org Table: employee count + completion rate ──
      const empByOrg: Record<string, number> = {};
      employees.forEach((p: any) => {
        if (p.organisation_id) empByOrg[p.organisation_id] = (empByOrg[p.organisation_id] ?? 0) + 1;
      });

      // Completion rate per org: passed / total user_courses for employees in that org
      const empIdToOrg: Record<string, string> = {};
      employees.forEach((p: any) => { if (p.organisation_id) empIdToOrg[p.id] = p.organisation_id; });
      const orgTotal: Record<string, number> = {};
      const orgDone: Record<string, number> = {};
      allUC.forEach((uc: any) => {
        const orgId = empIdToOrg[uc.user_id];
        if (!orgId) return;
        orgTotal[orgId] = (orgTotal[orgId] ?? 0) + 1;
        if (uc.status === 'passed') orgDone[orgId] = (orgDone[orgId] ?? 0) + 1;
      });

      const orgRows: OrgRow[] = allOrgs.map((o: any) => ({
        id: o.id,
        name: o.name,
        subscription_tier: o.subscription_tier,
        is_active: o.is_active,
        seat_limit: o.seat_limit,
        created_at: o.created_at,
        employee_count: empByOrg[o.id] ?? 0,
        completion_rate: orgTotal[o.id]
          ? Math.round(((orgDone[o.id] ?? 0) / orgTotal[o.id]) * 100)
          : 0,
      }));
      // Sort by most employees
      orgRows.sort((a, b) => b.employee_count - a.employee_count);
      setOrgs(orgRows);

      // ── Recent Activity ──
      const activity: RecentActivity[] = (recentCertRes.data ?? []).map((c: any) => ({
        type: c.status === 'approved' ? 'certificate_approved' : 'certificate_pending',
        label: c.status === 'approved'
          ? `Certificate approved — ${c.profiles?.first_name} ${c.profiles?.last_name}`
          : `Certificate request — ${c.profiles?.first_name} ${c.profiles?.last_name}`,
        sub: `${c.courses?.title} · ${c.organisations?.name}`,
        time: c.request_date,
        color: c.status === 'approved' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50',
      }));
      setRecentActivity(activity);

    } finally {
      setLoading(false);
      setLastRefreshed(new Date());
    }
  };

  useEffect(() => { loadData(); }, []);

  if (profile?.role !== 'super_admin') return null;

  const totalRevenue = subscriptions.basic * 49 + subscriptions.standard * 99 + subscriptions.premium * 199;
  const maxRoleCount = Math.max(...Object.values(roleBreakdown), 1);
  const totalRoleCount = Object.values(roleBreakdown).reduce((a, b) => a + b, 0);

  // Group roles
  const carerCount = roleBreakdown.care_assistant + roleBreakdown.senior_carer;
  const nurseCount = roleBreakdown.rgn + roleBreakdown.rmn + roleBreakdown.nurse_associate + roleBreakdown.clinical_lead;
  const mgmtCount  = roleBreakdown.manager + roleBreakdown.admin;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">

      {/* Header */}
      <div className="mb-8 pt-8 lg:pt-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Platform Analytics</h1>
          <p className="text-slate-500 mt-1 text-sm">
            SkillGuardian · Super Admin ·{' '}
            {loading ? 'Loading...' : `Last updated ${format(lastRefreshed, 'HH:mm, d MMM yyyy')}`}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={loadData}
          disabled={loading}
          className="self-start sm:self-auto gap-2"
        >
          <RefreshCw className={cn('w-4 h-4', loading && 'animate-spin')} />
          Refresh
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-32 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          {/* ── Alert banner ── */}
          {(stats.overdueCount > 0 || stats.expiringIn30 > 0) && (
            <div className="mb-6 grid sm:grid-cols-2 gap-4">
              {stats.overdueCount > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-800 text-sm">
                      {stats.overdueCount} overdue training record{stats.overdueCount !== 1 ? 's' : ''}
                    </p>
                    <p className="text-red-700 text-xs mt-0.5">Across all organisations. Staff are non-compliant.</p>
                  </div>
                </div>
              )}
              {stats.expiringIn30 > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
                  <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-800 text-sm">
                      {stats.expiringIn30} training record{stats.expiringIn30 !== 1 ? 's' : ''} expiring within 30 days
                    </p>
                    <p className="text-amber-700 text-xs mt-0.5">Staff should be prompted to refresh their training.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Top KPIs ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              label="Organisations"
              value={stats.totalOrgs}
              sub={`${stats.activeOrgs} active · ${stats.suspendedOrgs} suspended`}
              icon={Building2}
              color="text-[#005EB8] bg-blue-50"
            />
            <StatCard
              label="Total Staff"
              value={stats.totalEmployees}
              sub={`+ ${stats.totalAdmins} admins`}
              icon={Users}
              color="text-teal-600 bg-teal-50"
            />
            <StatCard
              label="Course Completions"
              value={stats.totalCompletions.toLocaleString()}
              sub={`${stats.totalCourses} courses available`}
              icon={Award}
              color="text-emerald-600 bg-emerald-50"
            />
            <StatCard
              label="Est. Monthly Revenue"
              value={`£${totalRevenue.toLocaleString()}`}
              sub={`${stats.totalOrgs} paying organisations`}
              icon={TrendingUp}
              color="text-amber-600 bg-amber-50"
            />
          </div>

          {/* ── Second row KPIs ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              label="Certificates Issued"
              value={stats.approvedCertificates}
              sub={`${stats.pendingCertificates} pending review`}
              icon={CheckCircle}
              color="text-emerald-600 bg-emerald-50"
            />
            <StatCard
              label="Total Carer Staff"
              value={carerCount}
              sub="Care assistants & senior carers"
              icon={Heart}
              color="text-[#005EB8] bg-blue-50"
            />
            <StatCard
              label="Total Nursing Staff"
              value={nurseCount}
              sub="RGN, RMN, associates & leads"
              icon={Stethoscope}
              color="text-teal-600 bg-teal-50"
            />
            <StatCard
              label="Management Staff"
              value={mgmtCount}
              sub="Managers & administrators"
              icon={Briefcase}
              color="text-rose-600 bg-rose-50"
            />
          </div>

          {/* ── Main grid ── */}
          <div className="grid lg:grid-cols-3 gap-6 mb-6">

            {/* Subscription breakdown */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-slate-900">Subscription Tiers</h2>
                <Badge className="bg-blue-50 text-[#005EB8] border-blue-200 text-xs">
                  {stats.totalOrgs} orgs
                </Badge>
              </div>
              <div className="space-y-4">
                {(['premium', 'standard', 'basic'] as const).map(tier => {
                  const cfg = tierConfig[tier];
                  const count = subscriptions[tier];
                  const pct = stats.totalOrgs > 0 ? Math.round((count / stats.totalOrgs) * 100) : 0;
                  const rev = count * (tier === 'basic' ? 49 : tier === 'standard' ? 99 : 199);
                  return (
                    <div key={tier}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${cfg.bg} ${cfg.border} border`}>
                            <cfg.icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                          </div>
                          <span className="text-sm font-medium text-slate-700">{cfg.label}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-bold text-slate-900">{count}</span>
                          <span className="text-xs text-slate-400 ml-1">({pct}%)</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              'h-full rounded-full transition-all',
                              tier === 'premium' ? 'bg-amber-400' :
                              tier === 'standard' ? 'bg-[#005EB8]' : 'bg-slate-400'
                            )}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500 w-12 text-right">£{rev}/mo</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between items-center">
                <span className="text-xs text-slate-500">Estimated MRR</span>
                <span className="text-base font-bold text-slate-900">£{totalRevenue.toLocaleString()}</span>
              </div>
            </div>

            {/* Course categories breakdown */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-slate-900">Courses by Category</h2>
                <Badge className="bg-blue-50 text-[#005EB8] border-blue-200 text-xs">
                  {stats.totalCourses} total
                </Badge>
              </div>
              <div className="space-y-3">
                {Object.entries(categoryBreakdown).map(([cat, count]) => {
                  const cfg = categoryConfig[cat];
                  const pct = stats.totalCourses > 0 ? Math.round((count / stats.totalCourses) * 100) : 0;
                  return (
                    <div key={cat}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <cfg.icon className={`w-3.5 h-3.5 ${cfg.color}`} />
                          <span className="text-xs font-medium text-slate-700">{cfg.label}</span>
                        </div>
                        <span className="text-xs font-bold text-slate-900">{count} <span className="text-slate-400 font-normal">({pct}%)</span></span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${cfg.barColor}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Staff roles breakdown */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-slate-900">Staff by Role</h2>
                <Badge className="bg-blue-50 text-[#005EB8] border-blue-200 text-xs">
                  {totalRoleCount} staff
                </Badge>
              </div>

              {/* Group summary */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                  { label: 'Carers', count: carerCount, color: 'bg-blue-50 border-blue-200 text-[#005EB8]' },
                  { label: 'Nurses', count: nurseCount, color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
                  { label: 'Mgmt',   count: mgmtCount,  color: 'bg-rose-50 border-rose-200 text-rose-700' },
                ].map(g => (
                  <div key={g.label} className={`rounded-lg border p-2 text-center ${g.color}`}>
                    <div className="text-lg font-bold">{g.count}</div>
                    <div className="text-xs font-medium">{g.label}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                {Object.entries(roleConfig).map(([role, cfg]) => {
                  const count = roleBreakdown[role as keyof RoleBreakdown];
                  if (count === 0) return null;
                  const pct = Math.round((count / maxRoleCount) * 100);
                  return (
                    <div key={role} className="flex items-center gap-2">
                      <span className="text-xs text-slate-600 w-28 flex-shrink-0">{cfg.label}</span>
                      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${cfg.color}`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs font-medium text-slate-700 w-6 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Completion rates by category ── */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-semibold text-slate-900">Course Completion Rates by Category</h2>
                <p className="text-xs text-slate-500 mt-0.5">Percentage of assigned course slots that have been passed across all organisations</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {completionByCategory.map(item => {
                const cfg = categoryConfig[item.category];
                const isGood = item.pct >= 80;
                const isMid  = item.pct >= 50 && item.pct < 80;
                return (
                  <div key={item.category} className="text-center p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                      isGood ? 'bg-emerald-50' : isMid ? 'bg-amber-50' : 'bg-red-50'
                    }`}>
                      <cfg.icon className={`w-5 h-5 ${
                        isGood ? 'text-emerald-600' : isMid ? 'text-amber-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div className={`text-2xl font-bold ${
                      isGood ? 'text-emerald-700' : isMid ? 'text-amber-700' : 'text-red-700'
                    }`}>
                      {item.pct}%
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5 leading-tight">{cfg.label}</div>
                    <div className="text-xs text-slate-400 mt-1">{item.completions} / {item.total}</div>
                    <div className="mt-2 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isGood ? 'bg-emerald-400' : isMid ? 'bg-amber-400' : 'bg-red-400'}`}
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Organisations table + recent activity ── */}
          <div className="grid lg:grid-cols-3 gap-6">

            {/* Organisations table */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-slate-900">All Organisations</h2>
                <Link href="/dashboard/organisations">
                  <Button variant="ghost" size="sm" className="text-[#005EB8] text-xs gap-1">
                    Manage <ArrowUpRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100">
                      <th className="text-left text-xs font-medium text-slate-500 pb-3">Organisation</th>
                      <th className="text-left text-xs font-medium text-slate-500 pb-3">Plan</th>
                      <th className="text-right text-xs font-medium text-slate-500 pb-3">Staff</th>
                      <th className="text-right text-xs font-medium text-slate-500 pb-3 hidden sm:table-cell">Completion</th>
                      <th className="text-center text-xs font-medium text-slate-500 pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {orgs.map(org => {
                      const tierCfg = tierConfig[org.subscription_tier] ?? tierConfig.basic;
                      const isGood = org.completion_rate >= 80;
                      const isMid  = org.completion_rate >= 50;
                      return (
                        <tr key={org.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-3 pr-4">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-[#005EB8]/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-bold text-[#005EB8]">
                                  {org.name.slice(0, 2).toUpperCase()}
                                </span>
                              </div>
                              <span className="font-medium text-slate-800 text-xs truncate max-w-[120px]">{org.name}</span>
                            </div>
                          </td>
                          <td className="py-3 pr-4">
                            <span className={cn(
                              'text-xs font-medium px-2 py-0.5 rounded-full border capitalize',
                              tierCfg.bg, tierCfg.border, tierCfg.color
                            )}>
                              {tierCfg.label}
                            </span>
                          </td>
                          <td className="py-3 pr-4 text-right">
                            <span className="text-xs text-slate-700 font-medium">{org.employee_count}</span>
                            <span className="text-xs text-slate-400">/{org.seat_limit}</span>
                          </td>
                          <td className="py-3 pr-4 text-right hidden sm:table-cell">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${isGood ? 'bg-emerald-400' : isMid ? 'bg-amber-400' : 'bg-red-400'}`}
                                  style={{ width: `${org.completion_rate}%` }}
                                />
                              </div>
                              <span className={cn(
                                'text-xs font-semibold w-8 text-right',
                                isGood ? 'text-emerald-600' : isMid ? 'text-amber-600' : 'text-red-600'
                              )}>
                                {org.completion_rate}%
                              </span>
                            </div>
                          </td>
                          <td className="py-3 text-center">
                            <span className={cn(
                              'text-xs px-2 py-0.5 rounded-full border font-medium',
                              org.is_active
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-red-50 text-red-700 border-red-200'
                            )}>
                              {org.is_active ? 'Active' : 'Suspended'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                    {orgs.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-10 text-center text-slate-400 text-sm">
                          No organisations yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent activity */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-slate-900">Recent Activity</h2>
                <Badge className="bg-slate-50 text-slate-600 border-slate-200 text-xs">
                  Certificates
                </Badge>
              </div>
              {recentActivity.length === 0 ? (
                <div className="py-10 text-center text-slate-400">
                  <Activity className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">No recent activity</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentActivity.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${item.color}`}>
                        {item.type === 'certificate_approved'
                          ? <CheckCircle className="w-3.5 h-3.5" />
                          : <Clock className="w-3.5 h-3.5" />
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-slate-800 leading-snug">{item.label}</p>
                        <p className="text-xs text-slate-500 truncate mt-0.5">{item.sub}</p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {item.time ? format(new Date(item.time), 'd MMM, HH:mm') : ''}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Quick actions */}
              <div className="mt-6 pt-5 border-t border-slate-100 space-y-2">
                <p className="text-xs font-medium text-slate-500 mb-3">Quick Actions</p>
                {[
                  { href: '/dashboard/organisations', icon: Building2, label: 'Manage Organisations', color: 'text-[#005EB8]' },
                  { href: '/dashboard/courses',       icon: BookOpen,  label: 'Course Library',        color: 'text-teal-600'  },
                  { href: '/dashboard/reports',       icon: BarChart3, label: 'CQC Reports',           color: 'text-emerald-600' },
                ].map(action => (
                  <Link key={action.href} href={action.href}>
                    <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group">
                      <action.icon className={`w-4 h-4 ${action.color}`} />
                      <span className="text-xs font-medium text-slate-700 group-hover:text-slate-900">{action.label}</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-300 ml-auto" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
