'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Profile, ProfessionalRole, Course } from '@/lib/types';
import {
  Users, Plus, Search, MoreHorizontal,
  Edit, Loader2, CheckCircle, XCircle, BookOpen, Copy,
  Award, Sparkles, ChevronRight,
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from '@/components/ui/dialog';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import ImportEmployeesModal from '@/components/employees/ImportEmployeesModal';

const CARE_CERT_COURSE_ID = '10000000-0000-0000-0000-000000000012';
const CARE_CERT_BUNDLE_ID = 'b0000000-0000-0000-0000-000000000001';

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

const professionalRoleOptions: Array<{ value: ProfessionalRole; label: string }> = [
  { value: 'care_assistant', label: 'Care Assistant' },
  { value: 'senior_carer', label: 'Senior Carer' },
  { value: 'rgn', label: 'Registered General Nurse (RGN)' },
  { value: 'rmn', label: 'Registered Mental Nurse (RMN)' },
  { value: 'nurse_associate', label: 'Nursing Associate' },
  { value: 'clinical_lead', label: 'Clinical Lead' },
  { value: 'manager', label: 'Manager' },
  { value: 'admin', label: 'Administrator' },
  { value: 'other', label: 'Other' },
];

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

async function callEdgeFunction(path: string, body: object, token: string) {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/${path}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

export default function EmployeesPage() {
  const { profile, organisation } = useAuth();
  const { toast } = useToast();
  const [employees, setEmployees] = useState<Profile[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [importModal, setImportModal] =
    useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [bulkAssignOpen, setBulkAssignOpen] = useState(false);
  const [bulkCourseIds, setBulkCourseIds] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [addModal, setAddModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState<Profile | null>(null);
  const [assignEmployee, setAssignEmployee] = useState<Profile | null>(null);
  const [assignedCourseIds, setAssignedCourseIds] = useState<string[]>([]);
  const [assignSaving, setAssignSaving] = useState(false);
  const [bundleAssigning, setBundleAssigning] = useState<string | null>(null); // employee id being bundle-assigned
  const [bundleModal, setBundleModal] = useState<Profile | null>(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    professional_role: 'care_assistant' as ProfessionalRole,
    role: 'employee' as 'org_admin' | 'employee',
  });
  const [saving, setSaving] = useState(false);
  const [createdCredentials, setCreatedCredentials] = useState<{ email: string; password: string } | null>(null);

  const brandColor =
    organisation?.primary_color || '#005EB8';

  const load = async () => {
    if (!profile?.organisation_id) return;
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('organisation_id', profile.organisation_id)
      .order('first_name', { ascending: true });
    setEmployees((data as Profile[]) ?? []);
    setLoading(false);
  };

  const loadCourses = async () => {
    if (!profile?.organisation_id) return;
    const { data: libraryData } = await supabase
      .from('org_course_library')
      .select('course_id')
      .eq('organisation_id', profile.organisation_id);

    const libraryIds = (libraryData ?? []).map((r: any) => r.course_id);

    if (libraryIds.length === 0) {
      const { data } = await supabase
        .from('courses')
        .select('*')
        .eq('is_active', true)
        .order('category', { ascending: true });
      setAllCourses((data as Course[]) ?? []);
    } else {
      const { data } = await supabase
        .from('courses')
        .select('*')
        .in('id', libraryIds)
        .eq('is_active', true)
        .order('category', { ascending: true });
      setAllCourses((data as Course[]) ?? []);
    }
  };

  useEffect(() => {
    load();
    loadCourses();
  }, [profile]);

  const filtered = employees.filter(e =>
    search === '' ||
    `${e.first_name} ${e.last_name} ${e.email}`.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => {
    setFormData({ first_name: '', last_name: '', email: '', professional_role: 'care_assistant', role: 'employee' });
    setEditEmployee(null);
    setCreatedCredentials(null);
    setAddModal(true);
  };

  const openEdit = (emp: Profile) => {
    setFormData({
      first_name: emp.first_name,
      last_name: emp.last_name,
      email: emp.email,
      professional_role: emp.professional_role,
      role: emp.role === 'org_admin' ? 'org_admin' : 'employee',
    });
    setEditEmployee(emp);
    setCreatedCredentials(null);
    setAddModal(true);
  };

  const openAssign = async (emp: Profile) => {
    setAssignEmployee(emp);
    setAssignedCourseIds([]);
    const { data, error } = await supabase
      .from('user_courses')
      .select('course_id')
      .eq('user_id', emp.id);
    if (!error) {
      setAssignedCourseIds((data ?? []).map((r: any) => r.course_id));
    }
  };

  // One-click assign the Care Certificate bundle
  const assignCareCertBundle = async (
    employee: Profile
  ) => {
  if (!bundleModal) return;

  try {
    setBundleAssigning(bundleModal.id);

    const { error } =
      await supabase
        .from('user_courses')
        .upsert(
          {
            user_id: bundleModal.id,
            course_id: CARE_CERT_COURSE_ID,
            status: 'not_started',
          },
          {
            onConflict: 'user_id,course_id',
          }
        );

    if (error) {
      throw error;
    }

    setBundleModal(null);

    toast({
      title: 'Care Certificate Assigned',
      description:
        `${bundleModal.first_name} ${bundleModal.last_name} can now begin the Care Certificate programme.`,
    });

    await load();

  } catch (error: any) {
    console.error(error);

    toast({
      title: 'Error assigning course',
      description: error.message,
      variant: 'destructive',
    });
  } finally {
    setBundleAssigning(null);
  }
};

  const saveEmployee = async () => {
    if (!profile?.organisation_id) return;
    setSaving(true);

    if (editEmployee) {
      const { error } = await supabase.from('profiles').update({
        first_name: formData.first_name,
        last_name: formData.last_name,
        professional_role: formData.professional_role,
        role: formData.role,
        updated_at: new Date().toISOString(),
      }).eq('id', editEmployee.id);
      if (error) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Employee updated successfully' });
        setAddModal(false);
        await load();
      }
    } else {
      const { data: session } = await supabase.auth.getSession();
      const token = session?.session?.access_token;
      if (!token) {
        toast({ title: 'Not authenticated', variant: 'destructive' });
        setSaving(false);
        return;
      }
      const result = await callEdgeFunction('manage-employee', {
        action: 'create',
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        professional_role: formData.professional_role,
        role: formData.role,
        organisation_id: profile.organisation_id,
      }, token);

      if (result.error) {
        toast({ title: 'Error creating employee', description: result.error, variant: 'destructive' });
      } else {
        setCreatedCredentials({ email: formData.email, password: result.temp_password });
        await load();
      }
    }
    setSaving(false);
  };


  const toggleEmployee = (employeeId: string) => {
    setSelectedEmployees(prev => {
      if (prev.includes(employeeId)) {
        return prev.filter(id => id !== employeeId);
      }

      return [...prev, employeeId];
    });
  };

  const allSelected =
    filtered.every(emp =>
      selectedEmployees.includes(emp.id)
    );

  const toggleSelectAll = () => {
    const filteredIds =
      filtered.map(e => e.id);

    const allSelected =
      filteredIds.every(id =>
        selectedEmployees.includes(id)
      );

    if (allSelected) {
      setSelectedEmployees(prev =>
        prev.filter(
          id => !filteredIds.includes(id)
        )
      );
    } else {
      setSelectedEmployees(prev =>
        Array.from(
          new Set([
            ...prev,
            ...filteredIds,
          ])
        )
      );
    }
  };

  const saveAssignments = async () => {
    if (!assignEmployee) return;
    setAssignSaving(true);

    const { error: deleteError } = await supabase
      .from('user_courses')
      .delete()
      .eq('user_id', assignEmployee.id);

    if (deleteError) {
      toast({ title: 'Error saving assignments', description: deleteError.message, variant: 'destructive' });
      setAssignSaving(false);
      return;
    }

    if (assignedCourseIds.length > 0) {
      const rows = assignedCourseIds.map(course_id => ({
        user_id: assignEmployee.id,
        course_id,
        status: 'not_started',
      }));
      const { error: insertError } = await supabase.from('user_courses').insert(rows);
      if (insertError) {
        toast({ title: 'Error assigning courses', description: insertError.message, variant: 'destructive' });
        setAssignSaving(false);
        return;
      }
    }

    toast({
      title: 'Courses assigned',
      description: `${assignedCourseIds.length} course${assignedCourseIds.length !== 1 ? 's' : ''} assigned to ${assignEmployee.first_name} ${assignEmployee.last_name}`,
    });
    setAssignEmployee(null);
    setAssignSaving(false);
  };

  const saveBulkAssignments = async () => {
    if (bulkCourseIds.length === 0) {
      toast({
        title: 'No Courses Selected',
        description:
          'Please select at least one course.',
        variant: 'destructive',
      });

      return;
    }
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const token = session?.access_token;

    const result = await callEdgeFunction(
      'manage-employee',
      {
        action: 'bulk_assign_courses',
        user_ids: selectedEmployees,
        course_ids: bulkCourseIds,
      },
      token!
    );

    if (result.error) {
      toast({
        title: 'Assignment Failed',
        description: result.error,
        variant: 'destructive',
      });

      return;
    }

    toast({
      title: 'Courses Assigned',
      description:
        `${bulkCourseIds.length} courses assigned to ${selectedEmployees.length} employees`,
    });

    setBulkAssignOpen(false);
    setSelectedEmployees([]);
  };

  

  const toggleActive = async (emp: Profile) => {
    await supabase.from('profiles').update({ is_active: !emp.is_active }).eq('id', emp.id);
    await load();
    toast({ title: emp.is_active ? 'Employee deactivated' : 'Employee activated' });
  };

  const toggleCourse = (courseId: string) => {
    setAssignedCourseIds(prev =>
      prev.includes(courseId) ? prev.filter(id => id !== courseId) : [...prev, courseId]
    );
  };

  const roleLabel = (r: ProfessionalRole) =>
    professionalRoleOptions.find(o => o.value === r)?.label ?? r;

  const coursesByCategory = allCourses.reduce((acc, c) => {
    if (!acc[c.category]) acc[c.category] = [];
    acc[c.category].push(c);
    return acc;
  }, {} as Record<string, Course[]>);

  const categoryLabels: Record<string, string> = {
    core_mandatory: 'Core Mandatory',
    legal_requirement: 'Legal Requirement',
    role_based: 'Role-Based (Carers)',
    clinical_nurse: 'Clinical / Nurse',
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="pt-8 lg:pt-0 mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Employees</h1>
          <p className="text-slate-500 mt-1">{employees.length} members in your organisation</p>
        </div>
       <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setImportModal(true)}
          >
            Import CSV
          </Button>

          <Button
            onClick={openAdd}
            className="hover:bg-[#004a93]"
            style={{
              backgroundColor: brandColor,
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Employee
          </Button>
        </div>
      </div>

      {/* Care Certificate Banner */}
      <div className="mb-6 rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-slate-900 text-sm">Care Certificate Portfolio — All 16 Standards</p>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              Assign the complete Care Certificate to a new carer with one click. They receive a single portfolio
              certificate on completion covering all 16 mandatory standards.
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-500 sm:text-right sm:w-40 shrink-0">
          Select an employee from the list and choose <span className="font-medium text-slate-700">Assign Care Certificate</span> from their menu.
        </p>
      </div>

      {/* <div className="flex gap-2 mb-4">
        <Button
          variant="outline"
          onClick={toggleSelectAll}
        >
          {selectedEmployees.length === filtered.length
            ? 'Unselect All'
            : 'Select All'}
        </Button>

        <Button
          disabled={selectedEmployees.length === 0}
          onClick={() => setBulkAssignOpen(true)}
        >
          Assign Courses
        </Button>
      </div> */}

      {/* Search */}
      <div className="relative max-w-sm mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Search employees..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">

          <span className="text-sm text-slate-600">
            {selectedEmployees.length} selected
          </span>
        </div>

        <Button
          disabled={
            selectedEmployees.length === 0
          }
          onClick={() =>
            setBulkAssignOpen(true)
          }
        >
          Assign Courses
        </Button>
      </div>

      {loading ? (
        <div className="space-y-2">
          {[1,2,3,4,5].map(i => <div key={i} className="h-16 bg-slate-100 rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="hidden sm:grid grid-cols-[0.5fr_2fr_2fr_1fr_1fr_120px] gap-4 px-4 py-3 bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wide">
            <Checkbox
              checked={
                filtered.length > 0 &&
                selectedEmployees.length ===
                  filtered.length
              }
              onCheckedChange={toggleSelectAll}
            />
            <span>Name</span>
            <span>Role</span>
            <span>Status</span>
            <span>Joined</span>
            <span></span>
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <Users className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No employees found</p>
            </div>
          ) : (
            filtered.map((emp, i) => (
              <div
                key={emp.id}
                className={cn(
                  "grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_2fr_1fr_1fr_120px] gap-2 sm:gap-4 px-4 py-3 items-center",
                  i !== 0 && "border-t border-slate-100"
                )}
              >
                <span>
                  <Checkbox
                    checked={selectedEmployees.includes(emp.id)}
                    onCheckedChange={() =>
                      toggleEmployee(emp.id)
                    }
                  />
                </span>
                <div>
                  <p className="font-medium text-slate-900 text-sm">{emp.first_name} {emp.last_name}</p>
                  <p className="text-xs text-slate-400">{emp.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">{roleLabel(emp.professional_role)}</p>
                  {emp.role === 'org_admin' && (
                    <span className="text-xs bg-blue-50 text-[#005EB8] px-1.5 py-0.5 rounded">Admin</span>
                  )}
                </div>
                <div>
                  <span className={cn(
                    'text-xs px-2 py-0.5 rounded-full font-medium',
                    emp.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                  )}>
                    {emp.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-slate-400">
                    {emp.created_at ? format(new Date(emp.created_at), 'dd MMM yy') : '—'}
                  </p>
                </div>
                <div className="flex justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52">
                      {/* Care Certificate one-click — highlighted at the top */}
                      <DropdownMenuItem
                        onClick={() => setBundleModal(emp)}
                        className="text-amber-700 font-medium focus:text-amber-800 focus:bg-amber-50"
                      >
                        <Award className="w-4 h-4 mr-2 text-amber-500" />
                        Assign Care Certificate
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openEdit(emp)}>
                        <Edit className="w-4 h-4 mr-2" /> Edit Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openAssign(emp)}>
                        <BookOpen className="w-4 h-4 mr-2" /> Assign Courses
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleActive(emp)}>
                        {emp.is_active
                          ? <><XCircle className="w-4 h-4 mr-2" />Deactivate</>
                          : <><CheckCircle className="w-4 h-4 mr-2" />Activate</>
                        }
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* ─── Care Certificate Bundle Modal ─── */}
      <Dialog open={!!bundleModal} onOpenChange={v => { if (!v) setBundleModal(null); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle>Assign Care Certificate Portfolio</DialogTitle>
                <DialogDescription className="text-xs mt-0.5">
                  All 16 standards — {bundleModal?.first_name} {bundleModal?.last_name}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 py-1">
            <p className="text-sm text-slate-600 leading-relaxed">
              This will assign the complete Care Certificate (All 16 Standards) to{' '}
              <span className="font-semibold text-slate-800">
                {bundleModal?.first_name} {bundleModal?.last_name}
              </span>. On completion, they will receive a single portfolio certificate evidencing all standards.
            </p>

            {/* Standards list */}
            <div className="bg-slate-50 rounded-xl border border-slate-100 p-4">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
                Included Standards
              </p>
              <div className="grid grid-cols-1 gap-1.5">
                {CARE_CERT_STANDARDS.map((std, idx) => (
                  <div key={std} className="flex items-center gap-2.5 text-xs text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-semibold text-[10px] flex-shrink-0">
                      {idx + 1}
                    </span>
                    {std}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <Sparkles className="w-4 h-4 text-[#005EB8] mt-0.5 flex-shrink-0" />
              <p className="text-xs text-slate-600">
                The carer will receive one combined portfolio certificate upon completing all 16 standards.
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setBundleModal(null)}>Cancel</Button>
            <Button
              onClick={() => bundleModal && assignCareCertBundle(bundleModal)}
              disabled={bundleAssigning === bundleModal?.id}
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              {bundleAssigning === bundleModal?.id
                ? <Loader2 className="w-4 h-4 animate-spin mr-2" />
                : <Award className="w-4 h-4 mr-2" />
              }
              Assign Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ─── Add / Edit Employee Modal ─── */}
      <Dialog open={addModal} onOpenChange={v => { setAddModal(v); if (!v) setCreatedCredentials(null); }}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editEmployee ? 'Edit Employee' : 'Add New Employee'}</DialogTitle>
            <DialogDescription>
              {editEmployee ? 'Update employee information' : 'Add a new member to your organisation'}
            </DialogDescription>
          </DialogHeader>

          {createdCredentials ? (
            <div className="space-y-4 py-2">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                <p className="text-sm font-semibold text-emerald-800 mb-3">Employee created successfully</p>
                <p className="text-xs text-emerald-700 mb-2">Share these login credentials with the employee:</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-emerald-200">
                    <span className="text-xs text-slate-600 font-mono">{createdCredentials.email}</span>
                  </div>
                  <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-emerald-200">
                    <span className="text-xs text-slate-600 font-mono">{createdCredentials.password}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(createdCredentials.password);
                        toast({ title: 'Password copied' });
                      }}
                      className="text-emerald-600 hover:text-emerald-800"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-emerald-600 mt-2">The employee should change their password on first login.</p>
              </div>
              <DialogFooter>
                <Button onClick={() => { setAddModal(false); setCreatedCredentials(null); }} className="bg-[#005EB8] text-white">
                  Done
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <>
              <div className="space-y-4 py-2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>First Name</Label>
                    <Input
                      value={formData.first_name}
                      onChange={e => setFormData(p => ({ ...p, first_name: e.target.value }))}
                      placeholder="Jane"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Last Name</Label>
                    <Input
                      value={formData.last_name}
                      onChange={e => setFormData(p => ({ ...p, last_name: e.target.value }))}
                      placeholder="Smith"
                    />
                  </div>
                </div>
                {!editEmployee && (
                  <div className="space-y-1.5">
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      placeholder="jane.smith@care.com"
                    />
                  </div>
                )}
                <div className="space-y-1.5">
                  <Label>Professional Role</Label>
                  <Select
                    value={formData.professional_role}
                    onValueChange={v => setFormData(p => ({ ...p, professional_role: v as ProfessionalRole }))}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {professionalRoleOptions.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Platform Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={v => setFormData(p => ({ ...p, role: v as 'org_admin' | 'employee' }))}
                  >
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employee">Employee</SelectItem>
                      <SelectItem value="org_admin">Organisation Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setAddModal(false)}>Cancel</Button>
                <Button onClick={saveEmployee} disabled={saving} className="bg-[#005EB8] text-white">
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : editEmployee ? 'Save Changes' : 'Add Employee'}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ─── Assign Courses Modal ─── */}
      <Dialog open={!!assignEmployee} onOpenChange={v => { if (!v) setAssignEmployee(null); }}>
        <DialogContent className="sm:max-w-lg max-h-[80vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Assign Courses</DialogTitle>
            <DialogDescription>
              Select courses for {assignEmployee?.first_name} {assignEmployee?.last_name}
            </DialogDescription>
          </DialogHeader>

          {/* Care Certificate quick-assign callout */}
          <button
            type="button"
            onClick={() => {
              if (assignEmployee) {
                setAssignEmployee(null);
                setBundleModal(assignEmployee);
              }
            }}
            className="mx-0.5 flex items-center gap-3 rounded-xl border-2 border-amber-200 bg-amber-50 px-4 py-3 text-left hover:border-amber-300 hover:bg-amber-100 transition-all"
          >
            <Award className="w-7 h-7 text-amber-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800">Care Certificate Portfolio (All 16 Standards)</p>
              <p className="text-xs text-slate-500 mt-0.5">One-click assignment — generates a single portfolio certificate on completion.</p>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-400 flex-shrink-0" />
          </button>

          <div className="flex-1 overflow-y-auto py-2 space-y-5">
            {Object.entries(coursesByCategory).map(([category, courses]) => (
              <div key={category}>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  {categoryLabels[category] ?? category}
                </p>
                <div className="space-y-1.5">
                  {courses.map(course => {
                    const checked = assignedCourseIds.includes(course.id);
                    return (
                      <button
                        key={course.id}
                        onClick={() => toggleCourse(course.id)}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border text-left transition-all",
                          checked
                            ? "bg-blue-50 border-[#005EB8]/40 text-slate-800"
                            : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                        )}
                      >
                        <div className={cn(
                          "w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border",
                          checked ? "bg-[#005EB8] border-[#005EB8]" : "border-slate-300"
                        )}>
                          {checked && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                        <span className="text-sm">{course.title}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
            <span className="text-xs text-slate-500">{assignedCourseIds.length} course{assignedCourseIds.length !== 1 ? 's' : ''} selected</span>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setAssignEmployee(null)}>Cancel</Button>
              <Button onClick={saveAssignments} disabled={assignSaving} className="bg-[#005EB8] text-white">
                {assignSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Assignments'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={bulkAssignOpen}
        onOpenChange={setBulkAssignOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Assign Courses
            </DialogTitle>

            <DialogDescription>
              Assign courses to
              {' '}
              {selectedEmployees.length}
              {' '}
              employees
            </DialogDescription>
          </DialogHeader>

          {/* course checklist */}
          <div className="space-y-2">
            {allCourses.map(course => (
              <div
                key={course.id}
                className="flex items-center gap-2"
              >
                <Checkbox
                  checked={bulkCourseIds.includes(course.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setBulkCourseIds(prev => [
                        ...prev,
                        course.id,
                      ]);
                    } else {
                      setBulkCourseIds(prev =>
                        prev.filter(
                          id => id !== course.id
                        )
                      );
                    }
                  }}
                />

                <span>{course.title}</span>
              </div>
            ))}
          </div>

          <Button
            onClick={saveBulkAssignments}
          >
            Assign Courses
          </Button>
        </DialogContent>
      </Dialog>

     <ImportEmployeesModal
        open={importModal}
        onOpenChange={setImportModal}
        onSuccess={load}
      />
    </div>
  );
}
