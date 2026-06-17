'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Organisation, SubscriptionTier, Course, CourseCategory } from '@/lib/types';
import {
  Building2, Plus, Search, MoreHorizontal, Globe, Users,
  CheckCircle, XCircle, Edit, Loader2, BookOpen, Lock, Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription,
} from '@/components/ui/dialog';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// ── Subscription tier course access rules ────────────────────────────────────
const TIER_ALLOWED_CATEGORIES: Record<SubscriptionTier, CourseCategory[]> = {
  basic:    ['core_mandatory'],
  standard: ['core_mandatory', 'legal_requirement', 'role_based'],
  premium:  ['core_mandatory', 'legal_requirement', 'role_based', 'clinical_nurse', 'management_leadership'],
};

const TIER_LABELS: Record<SubscriptionTier, { label: string; description: string; color: string; badge: string }> = {
  basic:    { label: 'Basic',    description: 'Core mandatory training only',                                  color: 'text-slate-600',  badge: 'bg-slate-100 text-slate-600' },
  standard: { label: 'Standard', description: 'Core + legal + role-based training',                          color: 'text-blue-700',   badge: 'bg-blue-100 text-blue-700' },
  premium:  { label: 'Premium',  description: 'Full library including clinical, nurse & management courses', color: 'text-amber-700',  badge: 'bg-amber-100 text-amber-700' },
};

const CATEGORY_LABELS: Record<CourseCategory, string> = {
  core_mandatory:       'Core Mandatory',
  legal_requirement:    'Legal Requirement',
  role_based:           'Role-Based',
  clinical_nurse:       'Clinical / Nurse',
  management_leadership:'Management & Leadership',
};

const CATEGORY_COLORS: Record<CourseCategory, string> = {
  core_mandatory:       'text-blue-700 bg-blue-50 border-blue-200',
  legal_requirement:    'text-amber-700 bg-amber-50 border-amber-200',
  role_based:           'text-teal-700 bg-teal-50 border-teal-200',
  clinical_nurse:       'text-emerald-700 bg-emerald-50 border-emerald-200',
  management_leadership:'text-rose-700 bg-rose-50 border-rose-200',
};

export default function OrganisationsPage() {
  const { profile } = useAuth();
  const { toast } = useToast();
  const [orgs, setOrgs] = useState<Organisation[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Org add/edit modal
  const [modal, setModal] = useState(false);
  const [editOrg, setEditOrg] = useState<Organisation | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '', subdomain: '', contact_email: '', contact_person: '',
    subscription_tier: 'basic' as SubscriptionTier,
    seat_limit: 10, primary_color: '#005EB8',
  });
  const [empCounts, setEmpCounts] = useState<Record<string, number>>({});

  // Course library modal
  const [libraryOrg, setLibraryOrg] = useState<Organisation | null>(null);
  const [libraryCourseIds, setLibraryCourseIds] = useState<Set<string>>(new Set());
  const [librarySaving, setLibrarySaving] = useState(false);
  const [libraryLoading, setLibraryLoading] = useState(false);

  const load = async () => {
    const { data } = await supabase.from('organisations').select('*').order('created_at', { ascending: false });
    const orgsData = (data ?? []) as Organisation[];
    setOrgs(orgsData);
    const counts: Record<string, number> = {};
    await Promise.all(orgsData.map(async org => {
      const { count } = await supabase.from('profiles').select('id', { count: 'exact' })
        .eq('organisation_id', org.id).eq('role', 'employee');
      counts[org.id] = count ?? 0;
    }));
    setEmpCounts(counts);
    setLoading(false);
  };

  const loadCourses = async () => {
    const { data } = await supabase.from('courses').select('*').eq('is_active', true).order('category');
    setAllCourses((data ?? []) as Course[]);
  };

  useEffect(() => { load(); loadCourses(); }, []);

  const filtered = orgs.filter(o =>
    search === '' ||
    `${o.name} ${o.subdomain} ${o.contact_person}`.toLowerCase().includes(search.toLowerCase())
  );

  // ── Org add/edit ────────────────────────────────────────────────────────────
  const openAdd = () => {
    setFormData({ name: '', subdomain: '', contact_email: '', contact_person: '', subscription_tier: 'basic', seat_limit: 10, primary_color: '#005EB8' });
    setEditOrg(null);
    setModal(true);
  };

  const openEdit = (org: Organisation) => {
    setFormData({
      name: org.name, subdomain: org.subdomain,
      contact_email: org.contact_email, contact_person: org.contact_person,
      subscription_tier: org.subscription_tier, seat_limit: org.seat_limit,
      primary_color: org.primary_color,
    });
    setEditOrg(org);
    setModal(true);
  };

  const save = async () => {
    setSaving(true);
    if (editOrg) {
      const { error } = await supabase.from('organisations').update({ ...formData, updated_at: new Date().toISOString() }).eq('id', editOrg.id);
      if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });
      else { toast({ title: 'Organisation updated' }); setModal(false); await load(); }
    } else {
      const { error } = await supabase.from('organisations').insert({ ...formData, is_active: true, logo_url: '' });
      if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });
      else { toast({ title: 'Organisation created' }); setModal(false); await load(); }
    }
    setSaving(false);
  };

  const toggleActive = async (org: Organisation) => {
    await supabase.from('organisations').update({ is_active: !org.is_active }).eq('id', org.id);
    await load();
    toast({ title: org.is_active ? 'Organisation suspended' : 'Organisation reactivated' });
  };

  // ── Course library assignment ────────────────────────────────────────────────
  const openLibrary = async (org: Organisation) => {
    setLibraryOrg(org);
    setLibraryLoading(true);
    const { data } = await supabase
      .from('org_course_library')
      .select('course_id')
      .eq('organisation_id', org.id);
    setLibraryCourseIds(new Set((data ?? []).map((r: any) => r.course_id)));
    setLibraryLoading(false);
  };

  const applyTierPreset = (tier: SubscriptionTier) => {
    const allowed = TIER_ALLOWED_CATEGORIES[tier];
    const ids = new Set(
      allCourses
        .filter(c => allowed.includes(c.category as CourseCategory))
        .map(c => c.id)
    );
    setLibraryCourseIds(ids);
  };

  const toggleLibraryCourse = (courseId: string, allowed: boolean) => {
    if (!allowed) return; // locked by tier — can't add
    setLibraryCourseIds(prev => {
      const next = new Set(prev);
      next.has(courseId) ? next.delete(courseId) : next.add(courseId);
      return next;
    });
  };

  const saveLibrary = async () => {
    if (!libraryOrg || !profile) return;
    setLibrarySaving(true);

    // Delete all current entries for this org, then reinsert selected
    const { error: delError } = await supabase
      .from('org_course_library')
      .delete()
      .eq('organisation_id', libraryOrg.id);

    if (delError) {
      toast({ title: 'Error saving library', description: delError.message, variant: 'destructive' });
      setLibrarySaving(false);
      return;
    }

    if (libraryCourseIds.size > 0) {
      const rows = Array.from(libraryCourseIds).map(course_id => ({
        organisation_id: libraryOrg.id,
        course_id,
        assigned_by: profile.id,
      }));
      const { error: insError } = await supabase.from('org_course_library').insert(rows);
      if (insError) {
        toast({ title: 'Error saving library', description: insError.message, variant: 'destructive' });
        setLibrarySaving(false);
        return;
      }
    }

    toast({
      title: 'Course library saved',
      description: `${libraryCourseIds.size} course${libraryCourseIds.size !== 1 ? 's' : ''} available to ${libraryOrg.name}`,
    });
    setLibraryOrg(null);
    setLibrarySaving(false);
  };

  // ── Helpers ─────────────────────────────────────────────────────────────────
  const autoSubdomain = (name: string) =>
    name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const tierColors: Record<SubscriptionTier, string> = {
    basic:    'bg-slate-100 text-slate-600',
    standard: 'bg-blue-100 text-blue-700',
    premium:  'bg-amber-100 text-amber-700',
  };

  // Group courses by category for the library modal
  const coursesByCategory = allCourses.reduce((acc, c) => {
    const cat = c.category as CourseCategory;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(c);
    return acc;
  }, {} as Record<CourseCategory, Course[]>);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="pt-8 lg:pt-0 mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Organisations</h1>
          <p className="text-slate-500 mt-1">{orgs.length} organisations on the platform</p>
        </div>
        <Button onClick={openAdd} className="bg-[#005EB8] hover:bg-[#004a93] text-white flex-shrink-0">
          <Plus className="w-4 h-4 mr-2" />Add Organisation
        </Button>
      </div>

      <div className="relative max-w-sm mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input placeholder="Search organisations..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-24 bg-slate-100 rounded-xl animate-pulse" />)}</div>
      ) : (
        <div className="space-y-3">
          {filtered.map(org => (
            <div key={org.id} className="bg-white rounded-xl border border-slate-200 p-4 hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white font-bold text-sm"
                  style={{ backgroundColor: org.primary_color || '#005EB8' }}
                >
                  {org.name[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div>
                      <p className="font-semibold text-slate-900">{org.name}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Globe className="w-3 h-3" />{org.subdomain}.skillguardian.com
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Users className="w-3 h-3" />{empCounts[org.id] ?? 0} / {org.seat_limit} staff
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium capitalize', tierColors[org.subscription_tier])}>
                        {org.subscription_tier}
                      </span>
                      <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', org.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700')}>
                        {org.is_active ? 'Active' : 'Suspended'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                    <span>{org.contact_person}</span>
                    <span>{org.contact_email}</span>
                    <span>Joined {format(new Date(org.created_at), 'MMM yyyy')}</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 flex-shrink-0">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => openEdit(org)}>
                      <Edit className="w-4 h-4 mr-2" /> Edit Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openLibrary(org)}>
                      <BookOpen className="w-4 h-4 mr-2" /> Assign Courses
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toggleActive(org)} className={org.is_active ? 'text-red-600' : 'text-emerald-600'}>
                      {org.is_active ? <><XCircle className="w-4 h-4 mr-2" />Suspend</> : <><CheckCircle className="w-4 h-4 mr-2" />Reactivate</>}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Add / Edit Organisation modal ─────────────────────────────────── */}
      <Dialog open={modal} onOpenChange={setModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{editOrg ? 'Edit Organisation' : 'Add New Organisation'}</DialogTitle>
            <DialogDescription>{editOrg ? 'Update organisation details' : 'Onboard a new care home or organisation'}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Organisation Name</Label>
              <Input
                value={formData.name}
                onChange={e => {
                  const name = e.target.value;
                  setFormData(p => ({ ...p, name, subdomain: p.subdomain || autoSubdomain(name) }));
                }}
                placeholder="Sunrise Care Home"
              />
            </div>
            <div className="space-y-1.5">
              <Label>Subdomain</Label>
              <div className="flex items-center gap-2">
                <Input value={formData.subdomain} onChange={e => setFormData(p => ({ ...p, subdomain: autoSubdomain(e.target.value) }))} placeholder="sunrise-care" className="flex-1" />
                <span className="text-sm text-slate-400 whitespace-nowrap">.skillguardian.com</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Contact Person</Label>
                <Input value={formData.contact_person} onChange={e => setFormData(p => ({ ...p, contact_person: e.target.value }))} placeholder="Manager Name" />
              </div>
              <div className="space-y-1.5">
                <Label>Contact Email</Label>
                <Input type="email" value={formData.contact_email} onChange={e => setFormData(p => ({ ...p, contact_email: e.target.value }))} placeholder="manager@care.com" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Subscription Tier</Label>
                <Select value={formData.subscription_tier} onValueChange={v => {
                  const tier = v as SubscriptionTier;
                  const maxByTier: Record<SubscriptionTier, number> = { basic: 10, standard: 30, premium: 100 };
                  setFormData(p => ({ ...p, subscription_tier: tier, seat_limit: Math.min(p.seat_limit, maxByTier[tier]) }));
                }}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic (£49/mo)</SelectItem>
                    <SelectItem value="standard">Standard (£99/mo)</SelectItem>
                    <SelectItem value="premium">Premium (£199/mo)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Seat Limit</Label>
                <Input
                  type="number"
                  value={formData.seat_limit}
                  onChange={e => {
                    const val = parseInt(e.target.value) || 10;
                    const max = formData.subscription_tier === 'premium' ? 100 : formData.subscription_tier === 'standard' ? 30 : 10;
                    setFormData(p => ({ ...p, seat_limit: Math.min(val, max) }));
                  }}
                  min={1}
                  max={formData.subscription_tier === 'premium' ? 100 : formData.subscription_tier === 'standard' ? 30 : 10}
                />
                {formData.subscription_tier === 'premium' && (
                  <p className="text-xs text-slate-500">Premium tier is limited to 100 staff. For larger teams, contact support.</p>
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Brand Colour</Label>
              <div className="flex items-center gap-3">
                <input type="color" value={formData.primary_color} onChange={e => setFormData(p => ({ ...p, primary_color: e.target.value }))} className="w-10 h-10 rounded cursor-pointer border border-slate-200" />
                <Input value={formData.primary_color} onChange={e => setFormData(p => ({ ...p, primary_color: e.target.value }))} className="flex-1" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModal(false)}>Cancel</Button>
            <Button onClick={save} disabled={saving} className="bg-[#005EB8] text-white">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : editOrg ? 'Save Changes' : 'Create Organisation'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Assign Courses (library) modal ────────────────────────────────── */}
      <Dialog open={!!libraryOrg} onOpenChange={v => { if (!v) setLibraryOrg(null); }}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col p-0 gap-0">
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex-shrink-0">
            <DialogTitle className="text-lg font-bold text-slate-900 mb-0.5">
              Assign Course Library
            </DialogTitle>
            <DialogDescription className="text-sm text-slate-500">
              {libraryOrg?.name} &middot; <span className={cn('font-medium capitalize', TIER_LABELS[libraryOrg?.subscription_tier ?? 'basic'].color)}>
                {libraryOrg?.subscription_tier} plan
              </span> &middot; {TIER_LABELS[libraryOrg?.subscription_tier ?? 'basic'].description}
            </DialogDescription>

            {/* Tier preset buttons */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="text-xs text-slate-400 self-center mr-1">Quick select:</span>
              {(['basic', 'standard', 'premium'] as SubscriptionTier[]).map(tier => {
                const t = TIER_LABELS[tier];
                const isCurrentTier = tier === libraryOrg?.subscription_tier;
                return (
                  <button
                    key={tier}
                    onClick={() => applyTierPreset(tier)}
                    className={cn(
                      'flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border font-medium transition-all',
                      isCurrentTier
                        ? 'ring-2 ring-offset-1 ring-[#005EB8]'
                        : 'hover:border-slate-300',
                      t.badge, 'border-transparent'
                    )}
                  >
                    {tier === 'premium' && <Sparkles className="w-3 h-3" />}
                    {t.label} preset
                    {isCurrentTier && <span className="text-xs opacity-70">(current)</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Course list */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
            {libraryLoading ? (
              <div className="space-y-2">{[1,2,3,4].map(i => <div key={i} className="h-10 bg-slate-100 rounded-lg animate-pulse" />)}</div>
            ) : (
              (Object.keys(CATEGORY_LABELS) as CourseCategory[]).map(cat => {
                const courses = coursesByCategory[cat] ?? [];
                const tierAllowed = TIER_ALLOWED_CATEGORIES[libraryOrg?.subscription_tier ?? 'basic'].includes(cat);
                return (
                  <div key={cat}>
                    {/* Category header */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className={cn('text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-md border', CATEGORY_COLORS[cat])}>
                        {CATEGORY_LABELS[cat]}
                      </span>
                      {!tierAllowed && (
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <Lock className="w-3 h-3" /> Not included in {libraryOrg?.subscription_tier} plan
                        </span>
                      )}
                      {tierAllowed && (
                        <button
                          onClick={() => {
                            const allSelected = courses.every(c => libraryCourseIds.has(c.id));
                            setLibraryCourseIds(prev => {
                              const next = new Set(prev);
                              if (allSelected) courses.forEach(c => next.delete(c.id));
                              else courses.forEach(c => next.add(c.id));
                              return next;
                            });
                          }}
                          className="text-xs text-[#005EB8] hover:underline"
                        >
                          {courses.every(c => libraryCourseIds.has(c.id)) ? 'Deselect all' : 'Select all'}
                        </button>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      {courses.map(course => {
                        const checked = libraryCourseIds.has(course.id);
                        const locked = !tierAllowed;
                        return (
                          <button
                            key={course.id}
                            onClick={() => toggleLibraryCourse(course.id, !locked)}
                            disabled={locked}
                            className={cn(
                              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left transition-all',
                              locked
                                ? 'bg-slate-50 border-slate-100 opacity-50 cursor-not-allowed'
                                : checked
                                  ? 'bg-blue-50 border-[#005EB8]/30'
                                  : 'bg-white border-slate-200 hover:border-slate-300 cursor-pointer'
                            )}
                          >
                            {/* Checkbox */}
                            <div className={cn(
                              'w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-colors',
                              locked ? 'border-slate-200 bg-slate-100' : checked ? 'bg-[#005EB8] border-[#005EB8]' : 'border-slate-300 bg-white'
                            )}>
                              {locked
                                ? <Lock className="w-2.5 h-2.5 text-slate-400" />
                                : checked && <CheckCircle className="w-3 h-3 text-white" />
                              }
                            </div>

                            <span className={cn('flex-1 text-sm', locked ? 'text-slate-400' : 'text-slate-700')}>
                              {course.title}
                            </span>

                            {/* Target role pill */}
                            <span className={cn('text-xs px-1.5 py-0.5 rounded hidden sm:inline-block', {
                              'bg-slate-100 text-slate-500': course.target_role === 'all_staff',
                              'bg-teal-50 text-teal-600': course.target_role === 'carers_only',
                              'bg-emerald-50 text-emerald-600': course.target_role === 'nurses_only',
                              'bg-blue-50 text-blue-600': course.target_role === 'managers_only',
                            })}>
                              {course.target_role?.replace(/_/g, ' ')}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between flex-shrink-0 bg-white">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-900">{libraryCourseIds.size}</span>
              <span className="text-sm text-slate-500">course{libraryCourseIds.size !== 1 ? 's' : ''} selected</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setLibraryOrg(null)}>Cancel</Button>
              <Button onClick={saveLibrary} disabled={librarySaving} className="bg-[#005EB8] hover:bg-[#004a93] text-white">
                {librarySaving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <BookOpen className="w-4 h-4 mr-2" />}
                Save Library
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
