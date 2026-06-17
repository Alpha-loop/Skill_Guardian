'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Course, UserCourse, CourseCategory, SubscriptionTier, CourseTargetRole } from '@/lib/types';
import { isCourseVisibleForRole, targetRoleLabel } from '@/lib/rbac';
import {
  BookOpen, Search, CheckCircle, Clock, PlayCircle, AlertCircle, Users,
  Plus, X, Loader2, Pencil, Trash2, ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface CourseWithProgress extends Course {
  user_course?: UserCourse;
}

const TIER_CATEGORIES: Record<SubscriptionTier, CourseCategory[]> = {
  basic:    ['core_mandatory'],
  standard: ['core_mandatory', 'legal_requirement', 'role_based'],
  premium:  ['core_mandatory', 'legal_requirement', 'role_based', 'clinical_nurse', 'management_leadership'],
};

const categoryLabels: Record<CourseCategory, string> = {
  core_mandatory:        'Core Mandatory',
  legal_requirement:     'Legal Requirement',
  role_based:            'Role-Based',
  clinical_nurse:        'Clinical / Nurse',
  management_leadership: 'Management & Leadership',
};

const categoryColors: Record<CourseCategory, string> = {
  core_mandatory:        'bg-blue-50 text-blue-700 border-blue-200',
  legal_requirement:     'bg-amber-50 text-amber-700 border-amber-200',
  role_based:            'bg-teal-50 text-teal-700 border-teal-200',
  clinical_nurse:        'bg-emerald-50 text-emerald-700 border-emerald-200',
  management_leadership: 'bg-rose-50 text-rose-700 border-rose-200',
};

const ALL_CATEGORIES: CourseCategory[] = [
  'core_mandatory', 'legal_requirement', 'role_based', 'clinical_nurse', 'management_leadership',
];

const ALL_TARGET_ROLES: CourseTargetRole[] = [
  'all_staff', 'carers_only', 'nurses_only', 'managers_only', 'managers_and_seniors',
];

interface CourseFormData {
  title: string;
  description: string;
  category: CourseCategory;
  target_role: CourseTargetRole;
  expiry_months: string;
  estimated_minutes: string;
}

const EMPTY_FORM: CourseFormData = {
  title: '',
  description: '',
  category: 'core_mandatory',
  target_role: 'all_staff',
  expiry_months: '12',
  estimated_minutes: '30',
};

export default function CoursesPage() {
  const { profile, organisation } = useAuth();
  const { toast } = useToast();
  const [courses, setCourses] = useState<CourseWithProgress[]>([]);
  const [filtered, setFiltered] = useState<CourseWithProgress[]>([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [form, setForm] = useState<CourseFormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const isSuperAdmin = profile?.role === 'super_admin';

  const brandColor =
    organisation?.primary_color || '#005EB8';

  useEffect(() => {
    if (!profile) return;
    loadCourses();
  }, [profile, organisation]);

  const loadCourses = async () => {
    if (!profile) return;
    let withProgress: CourseWithProgress[] = [];

    if (profile.role === 'employee') {
      const { data: assigned } = await supabase
        .from('user_courses')
        .select('*, course:courses(*)')
        .eq('user_id', profile.id);

      withProgress = (assigned ?? [])
        .filter((uc: any) => {
          if (!uc.course?.is_active) return false;
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
    } else if (profile.role === 'super_admin') {
      const { data } = await supabase
        .from('courses')
        .select('*')
        .order('category', { ascending: true })
        .order('title', { ascending: true });

      withProgress = (data ?? []).map(c => ({ ...c }));
    } else {
      const tier = (organisation?.subscription_tier ?? 'premium') as SubscriptionTier;
      const allowedCategories = TIER_CATEGORIES[tier] ?? TIER_CATEGORIES.premium;

      const [coursesRes, userCoursesRes] = await Promise.all([
        supabase
          .from('courses')
          .select('*')
          .eq('is_active', true)
          .in('category', allowedCategories)
          .order('category', { ascending: true }),
        supabase
          .from('user_courses')
          .select('*')
          .eq('user_id', profile.id),
      ]);

      if (!coursesRes.data) { setLoading(false); return; }

      const ucMap = new Map(
        (userCoursesRes.data ?? []).map((uc: UserCourse) => [uc.course_id, uc])
      );

      withProgress = coursesRes.data.map(c => ({
        ...c,
        user_course: ucMap.get(c.id),
      }));
    }

    setCourses(withProgress);
    setFiltered(withProgress);
    setLoading(false);
  };

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


  const openCreate = () => {
    setEditingCourse(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (course: Course) => {
    setEditingCourse(course);
    setForm({
      title: course.title,
      description: course.description,
      category: course.category,
      target_role: course.target_role,
      expiry_months: course.expiry_months?.toString() ?? '',
      estimated_minutes: course.estimated_minutes?.toString() ?? '',
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      toast({ title: 'Missing fields', description: 'Title and description are required.', variant: 'destructive' });
      return;
    }
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      target_role: form.target_role,
      expiry_months: form.expiry_months ? parseInt(form.expiry_months, 10) : null,
      estimated_minutes: form.estimated_minutes ? parseInt(form.estimated_minutes, 10) : null,
      is_active: true,
    };

    if (editingCourse) {
      const { error } = await supabase.from('courses').update(payload).eq('id', editingCourse.id);
      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Course updated' });
        setModalOpen(false);
        setLoading(true);
        loadCourses();
      }
    } else {
      const { error } = await supabase.from('courses').insert(payload);
      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Course created' });
        setModalOpen(false);
        setLoading(true);
        loadCourses();
      }
    }
    setSaving(false);
  };

  const handleToggleActive = async (course: Course) => {
    const { error } = await supabase
      .from('courses')
      .update({ is_active: !course.is_active })
      .eq('id', course.id);
    if (!error) {
      setCourses(prev => prev.map(c => c.id === course.id ? { ...c, is_active: !course.is_active } : c));
    }
  };

  const handleDelete = async (courseId: string) => {
    const { error } = await supabase.from('courses').delete().eq('id', courseId);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Course deleted' });
      setCourses(prev => prev.filter(c => c.id !== courseId));
      setDeleteConfirm(null);
    }
  };

  const categories = ['all', ...Array.from(new Set(courses.map(c => c.category)))];

  const isEmployee = profile?.role === 'employee';

  // Summary counts for employees
  const passed     = courses.filter(c => c.user_course?.status === 'passed').length;
  const inProgress = courses.filter(c => c.user_course?.status === 'in_progress').length;
  const notStarted = courses.filter(c => !c.user_course || c.user_course.status === 'not_started').length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="pt-8 lg:pt-0 mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {isEmployee ? 'My Training' : 'Course Library'}
          </h1>
          <p className="text-slate-500 mt-1">
            {isSuperAdmin
              ? `${courses.length} course${courses.length !== 1 ? 's' : ''} in the platform library`
              : isEmployee
              ? `${courses.length} course${courses.length !== 1 ? 's' : ''} assigned to you`
              : (() => {
                  const tier = organisation?.subscription_tier;
                  const label = tier === 'basic' ? 'Basic' : tier === 'standard' ? 'Standard' : tier === 'premium' ? 'Premium' : null;
                  return label
                    ? `${courses.length} courses available on your ${label} plan`
                    : `${courses.length} courses available`;
                })()
            }
          </p>
        </div>
        {isSuperAdmin && (
          <Button
            onClick={openCreate}
            className="bg-[#005EB8] hover:bg-[#004a93] text-white flex-shrink-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Course
          </Button>
        )}
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
          {isSuperAdmin && (
            <Button onClick={openCreate} className="mt-4 bg-[#005EB8] hover:bg-[#004a93] text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create First Course
            </Button>
          )}
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              showRoleBadge={!isEmployee}
              isSuperAdmin={isSuperAdmin}
              onEdit={() => openEdit(course)}
              onToggleActive={() => handleToggleActive(course)}
              deleteConfirm={deleteConfirm}
              setDeleteConfirm={setDeleteConfirm}
              onDelete={() => handleDelete(course.id)}
            />
          ))}
        </div>
      )}


      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-y-auto max-h-[90vh] z-10">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-lg font-semibold text-slate-900">
                {editingCourse ? 'Edit Course' : 'Create New Course'}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Course Title <span className="text-red-500">*</span></label>
                <Input
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Safeguarding Adults Level 1"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Description <span className="text-red-500">*</span></label>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  rows={3}
                  placeholder="Brief overview of what this course covers..."
                  className="w-full rounded-md border border-slate-300 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                />
              </div>

              {/* Category + Target Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
                  <div className="relative">
                    <select
                      value={form.category}
                      onChange={e => setForm(f => ({ ...f, category: e.target.value as CourseCategory }))}
                      className="w-full appearance-none rounded-md border border-slate-300 bg-background px-3 py-2 pr-8 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {ALL_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{categoryLabels[cat]}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Target Audience</label>
                  <div className="relative">
                    <select
                      value={form.target_role}
                      onChange={e => setForm(f => ({ ...f, target_role: e.target.value as CourseTargetRole }))}
                      className="w-full appearance-none rounded-md border border-slate-300 bg-background px-3 py-2 pr-8 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      {ALL_TARGET_ROLES.map(role => (
                        <option key={role} value={role}>{targetRoleLabel[role]}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Expiry + Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Expiry (months)
                    <span className="text-slate-400 font-normal ml-1">optional</span>
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="60"
                    value={form.expiry_months}
                    onChange={e => setForm(f => ({ ...f, expiry_months: e.target.value }))}
                    placeholder="12"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Duration (minutes)
                    <span className="text-slate-400 font-normal ml-1">optional</span>
                  </label>
                  <Input
                    type="number"
                    min="1"
                    value={form.estimated_minutes}
                    onChange={e => setForm(f => ({ ...f, estimated_minutes: e.target.value }))}
                    placeholder="30"
                  />
                </div>
              </div>

              {editingCourse && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
                  After saving, go into the course to add or edit flashcards and quiz questions.
                </div>
              )}

              {!editingCourse && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-600">
                  After creating the course, open it to add flashcards and quiz questions.
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-slate-200 px-6 py-4 flex gap-3">
              <Button variant="outline" onClick={() => setModalOpen(false)} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 bg-[#005EB8] hover:bg-[#004a93] text-white"
              >
                {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                {editingCourse ? 'Save Changes' : 'Create Course'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CourseCard({
  course,
  showRoleBadge,
  isSuperAdmin,
  onEdit,
  onToggleActive,
  deleteConfirm,
  setDeleteConfirm,
  onDelete,
}: {
  course: CourseWithProgress;
  showRoleBadge: boolean;
  isSuperAdmin: boolean;
  onEdit: () => void;
  onToggleActive: () => void;
  deleteConfirm: string | null;
  setDeleteConfirm: (id: string | null) => void;
  onDelete: () => void;
}) {
  const status = course.user_course?.status ?? 'not_started';

  const statusConfig = {
    not_started: { label: 'Not Started', icon: PlayCircle,  iconColor: 'text-slate-400',   bg: 'bg-slate-50' },
    in_progress: { label: 'In Progress', icon: Clock,       iconColor: 'text-amber-500',   bg: 'bg-amber-50' },
    passed:      { label: 'Passed',      icon: CheckCircle, iconColor: 'text-emerald-500', bg: 'bg-emerald-50' },
    failed:      { label: 'Try Again',   icon: AlertCircle, iconColor: 'text-red-500',     bg: 'bg-red-50' },
  };

  const cfg = statusConfig[status];
  const isConfirmingDelete = deleteConfirm === course.id;

  return (
    <div className={cn(
      'group bg-white rounded-xl border border-slate-200 p-5 transition-all h-full flex flex-col',
      isSuperAdmin ? 'hover:border-slate-300 hover:shadow-sm' : 'hover:border-[#005EB8]/40 hover:shadow-md cursor-pointer',
      !course.is_active && isSuperAdmin && 'opacity-60'
    )}>
      <div className="flex items-start justify-between mb-3">
        <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full border', categoryColors[course.category])}>
          {categoryLabels[course.category]}
        </span>
        <div className="flex items-center gap-1.5">
          {isSuperAdmin ? (
            <>
              {!course.is_active && (
                <span className="text-xs text-slate-400 font-medium">Draft</span>
              )}
              <button
                onClick={e => { e.stopPropagation(); onEdit(); }}
                className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
                title="Edit course"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              {isConfirmingDelete ? (
                <div className="flex items-center gap-1">
                  <button
                    onClick={e => { e.stopPropagation(); onDelete(); }}
                    className="px-2 py-0.5 rounded text-xs bg-red-600 text-white font-medium hover:bg-red-700"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); setDeleteConfirm(null); }}
                    className="px-2 py-0.5 rounded text-xs bg-slate-200 text-slate-700 hover:bg-slate-300"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={e => { e.stopPropagation(); setDeleteConfirm(course.id); }}
                  className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"
                  title="Delete course"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </>
          ) : (
            <div className={cn('w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0', cfg.bg)}>
              <cfg.icon className={cn('w-4 h-4', cfg.iconColor)} />
            </div>
          )}
        </div>
      </div>

      {isSuperAdmin ? (
        <Link href={`/dashboard/courses/${course.id}`} className="flex-1 flex flex-col min-w-0">
          <h3 className="font-semibold text-slate-900 mb-2 leading-snug hover:text-[#005EB8] transition-colors">{course.title}</h3>
          <p className="text-xs text-slate-500 mb-3 line-clamp-2 leading-relaxed flex-1">{course.description}</p>
        </Link>
      ) : (
        <Link href={`/dashboard/courses/${course.id}`} className="flex-1 flex flex-col min-w-0">
          <h3 className="font-semibold text-slate-900 mb-2 leading-snug">{course.title}</h3>
          <p className="text-xs text-slate-500 mb-3 line-clamp-2 leading-relaxed flex-1">{course.description}</p>
        </Link>
      )}

      {/* Role badge */}
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
          {course.estimated_minutes && (
            <span>{course.estimated_minutes}min</span>
          )}
        </div>
        {isSuperAdmin ? (
          <button
            onClick={e => { e.stopPropagation(); onToggleActive(); }}
            className={cn(
              'text-xs font-medium px-2 py-0.5 rounded-full border transition-colors',
              course.is_active
                ? 'text-emerald-700 bg-emerald-50 border-emerald-200 hover:bg-emerald-100'
                : 'text-slate-500 bg-slate-50 border-slate-200 hover:bg-slate-100'
            )}
          >
            {course.is_active ? 'Active' : 'Inactive'}
          </button>
        ) : (
          <>
            {status === 'passed' && course.user_course?.quiz_score && (
              <span className="text-xs font-medium text-emerald-600">{course.user_course.quiz_score}%</span>
            )}
            <span className={cn('text-xs font-medium', {
              'text-slate-500':   status === 'not_started',
              'text-amber-600':   status === 'in_progress',
              'text-emerald-600': status === 'passed',
              'text-red-600':     status === 'failed',
            })}>
              {cfg.label}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
