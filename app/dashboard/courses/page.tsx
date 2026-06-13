'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Course, UserCourse, CourseCategory } from '@/lib/types';
import { isCourseVisibleForRole, targetRoleLabel } from '@/lib/rbac';
import { BookOpen, Search, CheckCircle, Clock, PlayCircle, AlertCircle, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CourseWithProgress extends Course {
  user_course?: UserCourse;
}

const categoryLabels: Record<CourseCategory, string> = {
  core_mandatory:       'Core Mandatory',
  legal_requirement:    'Legal Requirement',
  role_based:           'Role-Based',
  clinical_nurse:       'Clinical / Nurse',
  management_leadership:'Management & Leadership',
};

const categoryColors: Record<CourseCategory, string> = {
  core_mandatory:       'bg-blue-50 text-blue-700 border-blue-200',
  legal_requirement:    'bg-amber-50 text-amber-700 border-amber-200',
  role_based:           'bg-teal-50 text-teal-700 border-teal-200',
  clinical_nurse:       'bg-emerald-50 text-emerald-700 border-emerald-200',
  management_leadership:'bg-rose-50 text-rose-700 border-rose-200',
};

export default function CoursesPage() {
  const { profile, organisation } = useAuth();
  const [courses, setCourses] = useState<CourseWithProgress[]>([]);
  const [filtered, setFiltered] = useState<CourseWithProgress[]>([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const brandColor =
    organisation?.primary_color || '#005EB8';

  useEffect(() => {
    if (!profile) return;
    const load = async () => {
      let withProgress: CourseWithProgress[] = [];

      if (profile.role === 'employee') {
        // Fetch all assigned user_courses with their course data
        const { data: assigned } = await supabase
          .from('user_courses')
          .select('*, course:courses(*)')
          .eq('user_id', profile.id);

        withProgress = (assigned ?? [])
          .filter((uc: any) => {
            if (!uc.course?.is_active) return false;
            // RBAC: only show courses appropriate for this professional role
            return isCourseVisibleForRole(uc.course.target_role, profile.professional_role);
          })
          .map((uc: any) => ({
            ...uc.course,
            user_course: {
              id: uc.id,
              user_id: uc.user_id,
              course_id: uc.course_id,
              status: uc.status,
              quiz_score: uc.quiz_score,
              quiz_attempts: uc.quiz_attempts,
              started_at: uc.started_at,
              completed_at: uc.completed_at,
              review_count: uc.review_count,
              last_reviewed_at: uc.last_reviewed_at,
            },
          }));
      } else {
        // Admins see the full active library
        const { data: coursesData } = await supabase
          .from('courses')
          .select('*')
          .eq('is_active', true)
          .order('category', { ascending: true });

        if (!coursesData) { setLoading(false); return; }
        withProgress = coursesData.map(c => ({ ...c }));
      }

      setCourses(withProgress);
      setFiltered(withProgress);
      setLoading(false);
    };
    load();
  }, [profile]);

  useEffect(() => {
    let result = courses;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(c =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      );
    }
    if (activeCategory !== 'all') {
      result = result.filter(c => c.category === activeCategory);
    }
    setFiltered(result);
  }, [search, activeCategory, courses]);

  const categories = ['all', ...Array.from(new Set(courses.map(c => c.category)))];

  const isEmployee = profile?.role === 'employee';

  // Summary counts for employees
  const passed      = courses.filter(c => c.user_course?.status === 'passed').length;
  const inProgress  = courses.filter(c => c.user_course?.status === 'in_progress').length;
  const notStarted  = courses.filter(c => !c.user_course || c.user_course.status === 'not_started').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="pt-8 lg:pt-0 mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          {isEmployee ? 'My Training' : 'Course Library'}
        </h1>
        <p className="text-slate-500 mt-1">
          {isEmployee
            ? `${courses.length} course${courses.length !== 1 ? 's' : ''} assigned to you`
            : 'Manage and assign training courses'}
        </p>
      </div>

      {/* Employee progress summary */}
      {isEmployee && !loading && courses.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Completed',   value: passed,     color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
            { label: 'In Progress', value: inProgress, color: 'text-amber-700',   bg: 'bg-amber-50 border-amber-200' },
            { label: 'Not Started', value: notStarted, color: 'text-slate-700',   bg: 'bg-slate-50 border-slate-200' },
          ].map(s => (
            <div key={s.label} className={cn('rounded-xl border p-3 text-center', s.bg)}>
              <div className={cn('text-2xl font-bold', s.color)}>{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Search courses..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-sm font-medium transition-all border',
                activeCategory === cat
                  ? 'text-white'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              )}
              style={
                activeCategory === cat
                  ? {
                      backgroundColor: 'var(--brand-color)',
                      border: `var(--brand-color)`,
                    }
                  : undefined
              }
            >
              {cat === 'all' ? 'All' : categoryLabels[cat as CourseCategory] ?? cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="h-48 bg-slate-100 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No courses found</p>
          <p className="text-sm mt-1">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(course => (
            <CourseCard key={course.id} course={course} showRoleBadge={!isEmployee} />
          ))}
        </div>
      )}
    </div>
  );
}

function CourseCard({ course, showRoleBadge }: { course: CourseWithProgress; showRoleBadge: boolean }) {
  const status = course.user_course?.status ?? 'not_started';

  const statusConfig = {
    not_started: { label: 'Not Started', icon: PlayCircle,  iconColor: 'text-slate-400',  bg: 'bg-slate-50' },
    in_progress: { label: 'In Progress', icon: Clock,       iconColor: 'text-amber-500',  bg: 'bg-amber-50' },
    passed:      { label: 'Passed',      icon: CheckCircle, iconColor: 'text-emerald-500',bg: 'bg-emerald-50' },
    failed:      { label: 'Try Again',   icon: AlertCircle, iconColor: 'text-red-500',    bg: 'bg-red-50' },
  };

  const cfg = statusConfig[status];

  return (
    <Link href={`/dashboard/courses/${course.id}`}>
      <div className="group bg-white rounded-xl border border-slate-200 p-5 hover:border-[#005EB8]/40 hover:shadow-md transition-all cursor-pointer h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full border', categoryColors[course.category])}>
            {categoryLabels[course.category]}
          </span>
          <div className={cn('w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0', cfg.bg)}>
            <cfg.icon className={cn('w-4 h-4', cfg.iconColor)} />
          </div>
        </div>

        <h3 className="font-semibold text-slate-900 mb-2 flex-1 leading-snug">{course.title}</h3>
        <p className="text-xs text-slate-500 mb-3 line-clamp-2 leading-relaxed">{course.description}</p>

        {/* Role badge for admin views */}
        {showRoleBadge && course.target_role !== 'all_staff' && (
          <div className="flex items-center gap-1 mb-3">
            <Users className="w-3 h-3 text-slate-400" />
            <span className="text-xs text-slate-400">{targetRoleLabel[course.target_role]}</span>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            {course.expiry_months && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {course.expiry_months}mo expiry
              </span>
            )}
          </div>
          {status === 'passed' && course.user_course?.quiz_score && (
            <span className="text-xs font-medium text-emerald-600">{course.user_course.quiz_score}%</span>
          )}
          <span className={cn('text-xs font-medium', {
            'text-slate-500':  status === 'not_started',
            'text-amber-600':  status === 'in_progress',
            'text-emerald-600':status === 'passed',
            'text-red-600':    status === 'failed',
          })}>
            {cfg.label}
          </span>
        </div>
      </div>
    </Link>
  );
}
