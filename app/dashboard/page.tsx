'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { supabase } from '@/lib/supabase';
import { Course, UserCourse, CertificateRequest } from '@/lib/types';
import {
  BookOpen, Award, Clock, CheckCircle, AlertCircle, TrendingUp,
  Users, FileCheck, Building2, ArrowRight, BarChart3, AlertTriangle,
  Bell, RefreshCw, Sparkles, Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { format, differenceInDays, addMonths } from 'date-fns';
import { cn } from '@/lib/utils';

interface CourseWithProgress extends Course {
  user_course?: UserCourse;
}

interface ExpiryRow {
  course_id: string;
  course_title: string;
  days_until_expiry: number;
  expires_at: string;
  user_id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

export default function DashboardPage() {
  const { profile, isIndividual } = useAuth();
  if (!profile) return null;
  if (profile.role === 'super_admin') return <SuperAdminOverview />;
  if (profile.role === 'org_admin') return <AdminOverview />;
  if (isIndividual) return <IndividualOverview />;
  return <EmployeeOverview />;
}

// ── Individual Carer Dashboard ─────────────────────────────────────────────────

function IndividualOverview() {
  const { profile, individualSubscription } = useAuth();
  const [courses, setCourses] = useState<CourseWithProgress[]>([]);
  const [certificates, setCertificates] = useState<CertificateRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const [upgrading, setUpgrading] =
  useState(false);

  const handleUpgrade = async () => {
    try {
      setUpgrading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-individual-checkout`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            plan: 'full_access',
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || 'Checkout failed'
        );
      }

      window.location.href = data.url;
    } catch (error) {
      console.error(error);

      alert(
        'Unable to start checkout. Please try again.'
      );
    } finally {
      setUpgrading(false);
    }
  };

  useEffect(() => {
    if (!profile) return;
    const load = async () => {
      const [assignedRes, certRes] = await Promise.all([
        supabase.from('user_courses').select('*, course:courses(*)').eq('user_id', profile.id),
        supabase.from('certificate_requests').select('*').eq('user_id', profile.id).order('request_date', { ascending: false }),
      ]);
      if (assignedRes.data) {
        setCourses(assignedRes.data.map((uc: any) => ({
          ...uc.course,
          user_course: {
            id: uc.id, user_id: uc.user_id, course_id: uc.course_id,
            status: uc.status, quiz_score: uc.quiz_score, quiz_attempts: uc.quiz_attempts,
            started_at: uc.started_at, completed_at: uc.completed_at,
            review_count: uc.review_count, last_reviewed_at: uc.last_reviewed_at,
          },
        })));
      }
      if (certRes.data) setCertificates(certRes.data as CertificateRequest[]);
      setLoading(false);
    };
    load();
  }, [profile]);

  const completed  = courses.filter(c => c.user_course?.status === 'passed').length;
  const inProgress = courses.filter(c => c.user_course?.status === 'in_progress').length;
  const isFullAccess = individualSubscription?.plan === 'full_access';

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="mb-6 pt-8 lg:pt-0">
        <h1 className="text-2xl font-bold text-slate-900">
          Good {getGreeting()}, {profile?.first_name}!
        </h1>
        <p className="text-slate-500 mt-1">Individual Carer · {isFullAccess ? 'Full Access' : 'Care Certificate'} plan</p>
      </div>

      {/* Plan badge */}
      <div className={cn(
        'mb-6 rounded-2xl border p-5 flex flex-col sm:flex-row sm:items-center gap-4',
        isFullAccess ? 'border-[#005EB8]/30 bg-blue-50' : 'border-amber-200 bg-amber-50'
      )}>
        <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0', isFullAccess ? 'bg-[#005EB8]' : 'bg-amber-500')}>
          {isFullAccess ? <Sparkles className="w-5 h-5 text-white" /> : <Award className="w-5 h-5 text-white" />}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-slate-900">{isFullAccess ? 'Full Access Plan' : 'Care Certificate Portfolio Plan'}</p>
          <p className="text-sm text-slate-600 mt-0.5">
            {isFullAccess
              ? 'All 45+ courses are assigned to you. Complete any course to earn an instant certificate.'
              : 'Your Care Certificate Portfolio covering all 16 mandatory standards is assigned and ready.'
            }
          </p>
        </div>
        {!isFullAccess && (
          <Button
            size="sm"
            disabled={upgrading}
            onClick={handleUpgrade}
            className="bg-[#005EB8] hover:bg-[#004a93] text-white flex-shrink-0"
          >
            {upgrading
              ? 'Redirecting...'
              : 'Upgrade to Full Access'}

            <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
          </Button>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Assigned',    value: courses.length, icon: BookOpen,    color: 'text-[#005EB8] bg-blue-50' },
          { label: 'Completed',   value: completed,      icon: CheckCircle, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Certificates',value: certificates.filter(c => c.status === 'approved').length, icon: Award, color: 'text-amber-600 bg-amber-50' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* My Courses */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-slate-900">My Courses</h2>
            <Link href="/dashboard/courses">
              <Button variant="ghost" size="sm" className="text-[#005EB8] text-xs">View all <ArrowRight className="ml-1 w-3 h-3" /></Button>
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 bg-slate-100 rounded-lg animate-pulse" />)}</div>
          ) : courses.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No courses assigned yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {courses.slice(0, 5).map(course => <CourseCard key={course.id} course={course} expiryRows={[]} />)}
            </div>
          )}
        </div>

        {/* My Certificates */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-slate-900">My Certificates</h2>
            <Link href="/dashboard/certificates">
              <Button variant="ghost" size="sm" className="text-[#005EB8] text-xs">View all <ArrowRight className="ml-1 w-3 h-3" /></Button>
            </Link>
          </div>
          {certificates.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <Award className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">Complete a course to earn certificates</p>
              <p className="text-xs mt-1 text-slate-400">Certificates are issued automatically when you pass</p>
            </div>
          ) : (
            <div className="space-y-3">
              {certificates.slice(0, 4).map((cert) => (
                <CertificateCard key={cert.id} cert={cert} courses={courses} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Upgrade prompt for care certificate plan */}
      {!isFullAccess && (
        <div className="mt-6 rounded-2xl border border-[#005EB8]/20 bg-gradient-to-r from-blue-50 to-slate-50 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#005EB8] flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-slate-900">Unlock 45+ Additional Courses</p>
            <p className="text-sm text-slate-600 mt-0.5">
              Upgrade to Full Access for one-time £49 to unlock Moving &amp; Handling, IPC, Medication, BLS, Safeguarding, and more — all with instant certificates.
            </p>
          </div>
          <Button
            onClick={handleUpgrade}
            disabled={upgrading}
            className="bg-[#005EB8] hover:bg-[#004a93] text-white flex-shrink-0"
          >
            {upgrading
              ? 'Redirecting...'
              : 'Upgrade — £49'}

            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

// ── Employee Dashboard ────────────────────────────────────────────────────────

function EmployeeOverview() {
  const { profile, organisation } = useAuth();
  const { notifications, unreadCount } = useNotifications();
  const [courses, setCourses] = useState<CourseWithProgress[]>([]);
  const [certificates, setCertificates] = useState<CertificateRequest[]>([]);
  const [expiryRows, setExpiryRows] = useState<ExpiryRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;
    const load = async () => {
      const [assignedRes, certRes, expiryRes] = await Promise.all([
        supabase.from('user_courses').select('*, course:courses(*)').eq('user_id', profile.id),
        supabase.from('certificate_requests').select('*').eq('user_id', profile.id).order('request_date', { ascending: false }),
        supabase.from('training_expiry_status').select('*').eq('user_id', profile.id).order('days_until_expiry', { ascending: true }),
      ]);

      if (assignedRes.data) {
        setCourses(assignedRes.data.map((uc: any) => ({
          ...uc.course,
          user_course: {
            id: uc.id, user_id: uc.user_id, course_id: uc.course_id,
            status: uc.status, quiz_score: uc.quiz_score, quiz_attempts: uc.quiz_attempts,
            started_at: uc.started_at, completed_at: uc.completed_at,
            review_count: uc.review_count, last_reviewed_at: uc.last_reviewed_at,
          },
        })));
      }
      if (certRes.data) setCertificates(certRes.data as CertificateRequest[]);
      if (expiryRes.data) setExpiryRows(expiryRes.data as ExpiryRow[]);
      setLoading(false);
    };
    load();
  }, [profile]);

  const completed   = courses.filter(c => c.user_course?.status === 'passed').length;
  const inProgress  = courses.filter(c => c.user_course?.status === 'in_progress').length;
  const pending     = certificates.filter(c => c.status === 'pending').length;

  const overdueRows  = expiryRows.filter(r => r.days_until_expiry <= 0);
  const warningRows  = expiryRows.filter(r => r.days_until_expiry > 0 && r.days_until_expiry <= 60);

  // Unread expiry/overdue notifications for the banner
  const urgentNotifs = notifications.filter(n => !n.is_read && (n.type === 'expiry_overdue' || n.type === 'expiry_warning'));

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8 pt-8 lg:pt-0">
        <h1 className="text-2xl font-bold text-slate-900">
          Good {getGreeting()}, {profile?.first_name || 'there'}!
        </h1>
        <p className="text-slate-500 mt-1">
          {organisation?.name} · {formatRole(profile?.professional_role)}
        </p>
      </div>

      {/* Expiry alert banners */}
      {overdueRows.length > 0 && (
        <div className="mb-5 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-800">Training overdue — action required</p>
            <p className="text-sm text-red-700 mt-0.5">
              {overdueRows.map(r => r.course_title).join(', ')} {overdueRows.length === 1 ? 'has' : 'have'} expired.
              Complete your refresher training to maintain CQC compliance.
            </p>
            <Link href="/dashboard/courses">
              <Button size="sm" className="mt-3 bg-red-600 hover:bg-red-700 text-white h-8 text-xs">
                Start refresher <ArrowRight className="ml-1 w-3 h-3" />
              </Button>
            </Link>
          </div>
        </div>
      )}

      {warningRows.length > 0 && overdueRows.length === 0 && (
        <div className="mb-5 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-800">Training due for renewal</p>
            <div className="mt-1 space-y-1">
              {warningRows.map(r => (
                <p key={r.course_id} className="text-sm text-amber-700">
                  <span className="font-medium">{r.course_title}</span>
                  {' — '}
                  {r.days_until_expiry <= 7
                    ? <span className="text-red-600 font-semibold">{r.days_until_expiry} day{r.days_until_expiry !== 1 ? 's' : ''} remaining</span>
                    : <span>{r.days_until_expiry} days remaining</span>
                  }
                </p>
              ))}
            </div>
            <Link href="/dashboard/courses">
              <Button size="sm" variant="outline" className="mt-3 border-amber-300 text-amber-700 hover:bg-amber-100 h-8 text-xs">
                View courses <ArrowRight className="ml-1 w-3 h-3" />
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Assigned Courses',    value: courses.length, icon: BookOpen,      color: 'text-[#005EB8] bg-blue-50' },
          { label: 'Completed',           value: completed,      icon: CheckCircle,   color: 'text-emerald-600 bg-emerald-50' },
          { label: 'In Progress',         value: inProgress,     icon: TrendingUp,    color: 'text-amber-600 bg-amber-50' },
          { label: 'Pending Certificates',value: pending,        icon: Clock,         color: 'text-orange-600 bg-orange-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* My Courses */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-slate-900">My Assigned Courses</h2>
            <Link href="/dashboard/courses">
              <Button variant="ghost" size="sm" className="text-[#005EB8] text-xs">
                View all <ArrowRight className="ml-1 w-3 h-3" />
              </Button>
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 bg-slate-100 rounded-lg animate-pulse" />)}</div>
          ) : courses.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No courses assigned yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {courses.slice(0, 5).map((course) => (
                <CourseCard key={course.id} course={course} expiryRows={expiryRows} />
              ))}
            </div>
          )}
        </div>

        {/* Right column: expiry timeline + certificates */}
        <div className="space-y-6">
          {/* Expiry timeline */}
          {expiryRows.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-semibold text-slate-900 mb-4">Training Expiry Timeline</h2>
              <div className="space-y-3">
                {expiryRows.slice(0, 5).map(row => {
                  const isOverdue  = row.days_until_expiry <= 0;
                  const isUrgent   = row.days_until_expiry > 0 && row.days_until_expiry <= 30;
                  const isWarning  = row.days_until_expiry > 30 && row.days_until_expiry <= 60;
                  const pct = isOverdue ? 100 : Math.max(0, Math.min(100, 100 - (row.days_until_expiry / 365) * 100));
                  return (
                    <div key={row.course_id}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-slate-700 truncate pr-2 flex-1">{row.course_title}</span>
                        <span className={cn('text-xs font-semibold flex-shrink-0', {
                          'text-red-600':   isOverdue || isUrgent,
                          'text-amber-600': isWarning,
                          'text-slate-500': !isOverdue && !isUrgent && !isWarning,
                        })}>
                          {isOverdue
                            ? 'Expired'
                            : `${row.days_until_expiry}d left`
                          }
                        </span>
                      </div>
                      <Progress
                        value={pct}
                        className={cn('h-1.5', {
                          '[&>div]:bg-red-500':    isOverdue || isUrgent,
                          '[&>div]:bg-amber-400':  isWarning,
                          '[&>div]:bg-emerald-400':!isOverdue && !isUrgent && !isWarning,
                        })}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* My Certificates */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-semibold text-slate-900">My Certificates</h2>
              <Link href="/dashboard/certificates">
                <Button variant="ghost" size="sm" className="text-[#005EB8] text-xs">
                  View all <ArrowRight className="ml-1 w-3 h-3" />
                </Button>
              </Link>
            </div>
            {certificates.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <Award className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">Complete a course to earn certificates</p>
              </div>
            ) : (
              <div className="space-y-3">
                {certificates.slice(0, 4).map((cert) => (
                  <CertificateCard key={cert.id} cert={cert} courses={courses} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course, expiryRows }: { course: CourseWithProgress; expiryRows: ExpiryRow[] }) {
  const status = course.user_course?.status ?? 'not_started';
  const score  = course.user_course?.quiz_score ?? 0;
  const expiry = expiryRows.find(r => r.course_id === course.id);

  const statusConfig = {
    not_started: { label: 'Not Started', color: 'bg-slate-100 text-slate-600' },
    in_progress: { label: 'In Progress', color: 'bg-amber-100 text-amber-700' },
    passed:      { label: 'Passed',      color: 'bg-emerald-100 text-emerald-700' },
    failed:      { label: 'Failed',      color: 'bg-red-100 text-red-700' },
  };

  return (
    <Link href={`/dashboard/courses/${course.id}`}>
      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 cursor-pointer">
        <div className="w-9 h-9 bg-[#005EB8]/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-4 h-4 text-[#005EB8]" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-800 truncate">{course.title}</p>
          <div className="flex items-center gap-2 mt-0.5 flex-wrap">
            <span className={`text-xs px-1.5 py-0.5 rounded ${statusConfig[status].color}`}>
              {statusConfig[status].label}
            </span>
            {status === 'passed' && <span className="text-xs text-slate-400">{score}%</span>}
            {expiry && expiry.days_until_expiry <= 60 && (
              <span className={cn('text-xs font-medium', expiry.days_until_expiry <= 0 ? 'text-red-600' : expiry.days_until_expiry <= 30 ? 'text-red-500' : 'text-amber-600')}>
                {expiry.days_until_expiry <= 0 ? 'Expired' : `Expires in ${expiry.days_until_expiry}d`}
              </span>
            )}
          </div>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
      </div>
    </Link>
  );
}

function CertificateCard({ cert, courses }: { cert: CertificateRequest; courses: CourseWithProgress[] }) {
  const course = courses.find(c => c.id === cert.course_id);
  const statusConfig = {
    pending:  { label: 'Pending Review', color: 'bg-amber-100 text-amber-700' },
    approved: { label: 'Approved',       color: 'bg-emerald-100 text-emerald-700' },
    rejected: { label: 'Rejected',       color: 'bg-red-100 text-red-700' },
  };
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
      <div className="w-9 h-9 bg-emerald-50 rounded-lg flex items-center justify-center flex-shrink-0">
        <Award className="w-4 h-4 text-emerald-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 truncate">{course?.title ?? 'Course'}</p>
        <span className={`text-xs px-1.5 py-0.5 rounded ${statusConfig[cert.status].color}`}>
          {statusConfig[cert.status].label}
        </span>
      </div>
      {cert.status === 'approved' && (
        <Button size="sm" variant="outline" className="text-xs h-7 px-2">Download</Button>
      )}
    </div>
  );
}

// ── Admin Dashboard ───────────────────────────────────────────────────────────

function AdminOverview() {
  const { profile, organisation } = useAuth();
  const [stats, setStats] = useState({ employees: 0, completionRate: 0, pendingCerts: 0, overdue: 0 });
  const [recentRequests, setRecentRequests] = useState<any[]>([]);
  const [expiryRows, setExpiryRows] = useState<ExpiryRow[]>([]);
  const [topLearners, setTopLearners] =
    useState<any[]>([]);

  const [topCourses, setTopCourses] =
    useState<any[]>([]);

  useEffect(() => {
    if (!profile?.organisation_id) return;
    const load = async () => {
      const [
        empRes,
        certRes,
        expiryRes,
        completedRes,
        totalAssignmentsRes,
      ] = await Promise.all([
        supabase
          .from('profiles')
          .select('id', {
            count: 'exact',
            head: true,
          })
          .eq(
            'organisation_id',
            profile.organisation_id!
          )
          .eq('role', 'employee'),

        supabase
          .from('certificate_requests')
          .select(`
            *,
            profiles(first_name,last_name),
            courses(title)
          `)
          .eq(
            'organisation_id',
            profile.organisation_id!
          )
          .eq('status', 'pending')
          .order('request_date', {
            ascending: false,
          })
          .limit(5),

        supabase
          .from('training_expiry_status')
          .select('*')
          .eq(
            'organisation_id',
            profile.organisation_id!
          )
          .lte('days_until_expiry', 60)
          .order(
            'days_until_expiry',
            {
              ascending: true,
            }
          )
          .limit(20),

        supabase
          .from('user_courses')
          .select('id', {
            count: 'exact',
            head: true,
          })
          .eq('status', 'completed'),

        supabase
          .from('user_courses')
          .select('id', {
            count: 'exact',
            head: true,
          }),
      ]);

      const courseAssignments =
        await supabase
          .from('user_courses')
          .select(`
            course_id,
            courses(title)
          `);

      const topLearnersRes =
        await supabase
          .from('user_courses')
          .select(`
            user_id,
            profiles(
              first_name,
              last_name
            )
          `)
          .eq('status', 'completed');

      
      if (topLearnersRes.data) {
        const grouped =
          topLearnersRes.data.reduce(
            (acc: any, row: any) => {
              const key =
                row.user_id;

              if (!acc[key]) {
                acc[key] = {
                  name: `${row.profiles?.first_name ?? ''} ${row.profiles?.last_name ?? ''}`,
                  count: 0,
                };
              }

              acc[key].count++;

              return acc;
            },
            {}
          );


        if (courseAssignments.data) {
          const grouped =
            courseAssignments.data.reduce(
              (acc: any, row: any) => {
                const key =
                  row.course_id;

                if (!acc[key]) {
                  acc[key] = {
                    title:
                      row.courses?.title ??
                      'Unknown',
                    count: 0,
                  };
                }

                acc[key].count++;

                return acc;
              },
              {}
            );

          setTopCourses(
            Object.values(grouped)
              .sort(
                (a: any, b: any) =>
                  b.count - a.count
              )
              .slice(0, 5)
          );
        }


        const top =
          Object.values(grouped)
            .sort(
              (a: any, b: any) =>
                b.count - a.count
            )
            .slice(0, 5);

        setTopLearners(top);
      }

      const overdueCount = (expiryRes.data ?? []).filter((r: any) => r.days_until_expiry <= 0).length;
      const totalAssignments =
        totalAssignmentsRes.count ?? 0;

      const completedAssignments =
        completedRes.count ?? 0;

      const completionRate =
        totalAssignments > 0
          ? Math.round(
              (completedAssignments /
                totalAssignments) *
                100
            )
          : 0;

      setStats({
        employees:
          empRes.count ?? 0,

        pendingCerts:
          certRes.data?.length ?? 0,

        overdue:
          overdueCount,

        completionRate,
      });
      setRecentRequests(certRes.data ?? []);
      setExpiryRows(expiryRes.data ?? []);
    };
    load();
  }, [profile]);

  const overdueRows  = expiryRows.filter(r => r.days_until_expiry <= 0);
  const warningRows  = expiryRows.filter(r => r.days_until_expiry > 0);

  const testStripe = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/create-checkout-session`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        organisation_id: profile?.organisation_id,
        plan: "basic",
      }),
    }
  );

  const data = await response.json();

  console.log(data);

  if (data.url) {
    window.location.href = data.url;
  }
};

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8 pt-8 lg:pt-0">
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-500 mt-1">{organisation?.name} · Organisation Admin</p>
      </div>

      {/* <Button onClick={testStripe}>
        Test Stripe Checkout
      </Button> */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Employees',    value: stats.employees,    icon: Users,         color: 'text-[#005EB8] bg-blue-50' },
          { label: 'Pending Certificates',value: stats.pendingCerts, icon: Clock,         color: 'text-amber-600 bg-amber-50' },
          { label: 'Completion Rate',     value: `${stats.completionRate}%`, icon: TrendingUp, color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Overdue Training',    value: stats.overdue,      icon: AlertTriangle, color: stats.overdue > 0 ? 'text-red-600 bg-red-50' : 'text-slate-500 bg-slate-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending certificates */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-slate-900">Pending Certificate Requests</h2>
            <Link href="/dashboard/certificates">
              <Button variant="ghost" size="sm" className="text-[#005EB8] text-xs">View all</Button>
            </Link>
          </div>
          {recentRequests.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <FileCheck className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No pending requests</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentRequests.map((req: any) => (
                <div key={req.id} className="flex items-center gap-3 p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800">{req.profiles?.first_name} {req.profiles?.last_name}</p>
                    <p className="text-xs text-slate-500 truncate">{req.courses?.title}</p>
                  </div>
                  <Link href="/dashboard/certificates">
                    <Button size="sm" className="text-xs h-7 bg-[#005EB8] text-white">Review</Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Expiring training */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-slate-900">
              Expiring Training
              {expiryRows.length > 0 && (
                <span className={cn(
                  'ml-2 text-xs font-semibold px-2 py-0.5 rounded-full',
                  overdueRows.length > 0 ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                )}>
                  {expiryRows.length}
                </span>
              )}
            </h2>
            <Link href="/dashboard/reports">
              <Button variant="ghost" size="sm" className="text-[#005EB8] text-xs">Full report</Button>
            </Link>
          </div>

          {expiryRows.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No training expiring in the next 60 days</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {expiryRows.slice(0, 6).map((row, i) => {
                const isOverdue = row.days_until_expiry <= 0;
                const isUrgent  = row.days_until_expiry > 0 && row.days_until_expiry <= 14;
                return (
                  <div
                    key={`${row.user_id}-${row.course_id}`}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-lg border text-sm',
                      isOverdue ? 'bg-red-50 border-red-200' :
                      isUrgent  ? 'bg-amber-50 border-amber-200' :
                                  'bg-slate-50 border-slate-200'
                    )}
                  >
                    <div className={cn(
                      'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0',
                      isOverdue ? 'bg-red-100' : isUrgent ? 'bg-amber-100' : 'bg-slate-100'
                    )}>
                      {isOverdue
                        ? <AlertTriangle className="w-4 h-4 text-red-600" />
                        : <Clock className={cn('w-4 h-4', isUrgent ? 'text-amber-600' : 'text-slate-500')} />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 truncate text-xs">
                        {row.first_name} {row.last_name}
                      </p>
                      <p className="text-slate-500 truncate text-xs">{row.course_title}</p>
                    </div>
                    <span className={cn(
                      'text-xs font-semibold flex-shrink-0',
                      isOverdue ? 'text-red-600' : isUrgent ? 'text-amber-600' : 'text-slate-500'
                    )}>
                      {isOverdue ? 'Expired' : `${row.days_until_expiry}d`}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold mb-5">
            Top Learners
          </h2>

          <div className="space-y-3">
            {topLearners.length === 0 ? (
              <p className="text-sm text-slate-500">
                No completed courses yet
              </p>
            ) : (
              topLearners.map(
                (
                  learner: any,
                  index
                ) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span>
                      {learner.name}
                    </span>

                    <Badge>
                      {learner.count}
                    </Badge>
                  </div>
                )
              )
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold mb-5">
            Most Assigned Courses
          </h2>

          <div className="space-y-3">
            {topCourses.length === 0 ? (
              <p className="text-sm text-slate-500">
                No assignments yet
              </p>
            ) : (
              topCourses.map(
                (
                  course: any,
                  index
                ) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="truncate">
                      {course.title}
                    </span>

                    <Badge>
                      {course.count}
                    </Badge>
                  </div>
                )
              )
            )}
          </div>
        </div>

        {/* Quick actions */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900 mb-5">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { href: '/dashboard/employees',    icon: Users,      label: 'Manage Employees',    color: 'bg-blue-50 text-[#005EB8]' },
                { href: '/dashboard/courses',      icon: BookOpen,   label: 'Assign Courses',      color: 'bg-teal-50 text-teal-600' },
                { href: '/dashboard/certificates', icon: FileCheck,  label: 'Review Certificates', color: 'bg-amber-50 text-amber-600' },
                { href: '/dashboard/reports',      icon: BarChart3,  label: 'View Reports',        color: 'bg-emerald-50 text-emerald-600' },
              ].map((action) => (
                <Link key={action.href} href={action.href}>
                  <div className="p-4 rounded-xl border border-slate-200 hover:shadow-sm transition-all cursor-pointer">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${action.color}`}>
                      <action.icon className="w-5 h-5" />
                    </div>
                    <p className="text-sm font-medium text-slate-700">{action.label}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
      </div>
    </div>
  );
}

// ── Super Admin Dashboard ─────────────────────────────────────────────────────

function SuperAdminOverview() {
  const [stats, setStats] = useState({
    orgs: 0, activeOrgs: 0, employees: 0, courses: 0,
    completions: 0, pendingCerts: 0, approvedCerts: 0,
  });
  const [subscriptions, setSubscriptions] = useState({ basic: 0, standard: 0, premium: 0 });
  const [expiryCount, setExpiryCount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);

  useEffect(() => {
    const load = async () => {
      const [orgsRes, profilesRes, coursesRes, ucRes, expiryRes, certRes] = await Promise.all([
        supabase.from('organisations').select('id, is_active, subscription_tier'),
        supabase.from('profiles').select('id', { count: 'exact' }).eq('role', 'employee'),
        supabase.from('courses').select('id', { count: 'exact' }).is('organisation_id', null),
        supabase.from('user_courses').select('id', { count: 'exact' }).eq('status', 'passed'),
        supabase.from('training_expiry_status').select('user_id, days_until_expiry').lte('days_until_expiry', 30),
        supabase.from('certificate_requests').select('id, status').in('status', ['pending', 'approved']),
      ]);

      const allOrgs = (orgsRes.data ?? []) as any[];
      const subs = { basic: 0, standard: 0, premium: 0 };
      allOrgs.forEach((o: any) => {
        if (o.subscription_tier in subs) subs[o.subscription_tier as keyof typeof subs]++;
      });
      setSubscriptions(subs);

      const expiryData = (expiryRes.data ?? []) as any[];
      const certs = (certRes.data ?? []) as any[];

      setStats({
        orgs: allOrgs.length,
        activeOrgs: allOrgs.filter(o => o.is_active).length,
        employees: profilesRes.count ?? 0,
        courses: coursesRes.count ?? 0,
        completions: ucRes.count ?? 0,
        pendingCerts: certs.filter(c => c.status === 'pending').length,
        approvedCerts: certs.filter(c => c.status === 'approved').length,
      });
      setExpiryCount(expiryData.filter(e => e.days_until_expiry > 0).length);
      setOverdueCount(expiryData.filter(e => e.days_until_expiry <= 0).length);
    };
    load();
  }, []);

  const totalRevenue = subscriptions.basic * 49 + subscriptions.standard * 99 + subscriptions.premium * 199;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8 pt-8 lg:pt-0">
        <h1 className="text-2xl font-bold text-slate-900">Platform Overview</h1>
        <p className="text-slate-500 mt-1">SkillGuardian · Super Admin</p>
      </div>

      {/* Alert banners */}
      {(overdueCount > 0 || expiryCount > 0) && (
        <div className="grid sm:grid-cols-2 gap-4 mb-6">
          {overdueCount > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-800">
                <span className="font-semibold">{overdueCount} overdue</span> training record{overdueCount !== 1 ? 's' : ''} across all orgs.
              </p>
            </div>
          )}
          {expiryCount > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                <span className="font-semibold">{expiryCount} expiring</span> within 30 days across all organisations.
              </p>
            </div>
          )}
        </div>
      )}

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Organisations',      value: stats.orgs,         sub: `${stats.activeOrgs} active`,        icon: Building2,  color: 'text-[#005EB8] bg-blue-50' },
          { label: 'Total Staff',        value: stats.employees,    sub: 'employees across all orgs',         icon: Users,      color: 'text-teal-600 bg-teal-50' },
          { label: 'Course Completions', value: stats.completions,  sub: `${stats.courses} courses available`, icon: Award,      color: 'text-emerald-600 bg-emerald-50' },
          { label: 'Est. MRR',           value: `£${totalRevenue.toLocaleString()}`, sub: 'monthly recurring revenue', icon: TrendingUp, color: 'text-amber-600 bg-amber-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
            <div className="text-xs text-slate-400 mt-0.5">{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Subscription breakdown */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Subscription Breakdown</h2>
          <div className="space-y-4">
            {([
              { key: 'premium',  label: 'Premium',  price: '£199/mo', barColor: 'bg-amber-400',  textColor: 'text-amber-700', bg: 'bg-amber-50' },
              { key: 'standard', label: 'Standard', price: '£99/mo',  barColor: 'bg-[#005EB8]',  textColor: 'text-[#005EB8]', bg: 'bg-blue-50' },
              { key: 'basic',    label: 'Basic',    price: '£49/mo',  barColor: 'bg-slate-400',  textColor: 'text-slate-600', bg: 'bg-slate-50' },
            ] as const).map(t => {
              const count = subscriptions[t.key as keyof typeof subscriptions];
              const total = stats.orgs || 1;
              const pct = Math.round((count / total) * 100);
              return (
                <div key={t.key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${t.bg} ${t.textColor}`}>{t.label}</span>
                      <span className="text-xs text-slate-400">{t.price}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-800">{count} org{count !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${t.barColor}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between">
            <span className="text-xs text-slate-500">Estimated MRR</span>
            <span className="text-sm font-bold text-slate-900">£{totalRevenue.toLocaleString()}</span>
          </div>
        </div>

        {/* Quick actions */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-5">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { href: '/dashboard/organisations', icon: Building2,  label: 'Organisations',    color: 'bg-blue-50 text-[#005EB8]' },
              { href: '/dashboard/analytics',     icon: BarChart3,  label: 'Full Analytics',   color: 'bg-teal-50 text-teal-600' },
              { href: '/dashboard/courses',       icon: BookOpen,   label: 'Course Library',   color: 'bg-emerald-50 text-emerald-600' },
              { href: '/dashboard/reports',       icon: FileCheck,  label: 'CQC Reports',      color: 'bg-amber-50 text-amber-600' },
            ].map((action) => (
              <Link key={action.href} href={action.href}>
                <div className="p-4 rounded-xl border border-slate-200 hover:shadow-sm transition-all cursor-pointer">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${action.color}`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">{action.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}

function formatRole(role?: string) {
  const map: Record<string, string> = {
    care_assistant: 'Care Assistant',
    senior_carer:   'Senior Carer',
    rgn:            'Registered General Nurse (RGN)',
    rmn:            'Registered Mental Health Nurse (RMN)',
    nurse_associate:'Nursing Associate',
    clinical_lead:  'Clinical Lead',
    manager:        'Manager',
    admin:          'Administrator',
    other:          'Staff Member',
  };
  return map[role ?? 'other'] ?? role;
}
