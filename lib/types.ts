export type SubscriptionTier = 'basic' | 'standard' | 'premium';
export type UserRole = 'super_admin' | 'org_admin' | 'employee';
export type AccountType = 'organisation' | 'individual';
export type IndividualPlan = 'care_certificate' | 'full_access';
export type ProfessionalRole = 'care_assistant' | 'senior_carer' | 'rgn' | 'rmn' | 'nurse_associate' | 'clinical_lead' | 'manager' | 'admin' | 'other';
export type CourseCategory = 'core_mandatory' | 'legal_requirement' | 'role_based' | 'clinical_nurse' | 'management_leadership';
export type CourseTargetRole = 'all_staff' | 'carers_only' | 'nurses_only' | 'managers_only' | 'managers_and_seniors';
export type CourseStatus = 'not_started' | 'in_progress' | 'passed' | 'failed';
export type CertificateStatus = 'pending' | 'approved' | 'rejected';

export interface Organisation {
  id: string;
  name: string;
  subdomain: string;
  contact_email: string;
  contact_person: string;
  subscription_tier: SubscriptionTier;
  seat_limit: number;
  is_active: boolean;
  logo_url: string;
  primary_color: string;
  created_at: string;
  updated_at: string;
  subscription_status?: string;
  current_period_end?: string;
  subscription_started_at?: string;
  stripe_customer_id: string;
}

export interface Profile {
  id: string;
  organisation_id: string | null;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  professional_role: ProfessionalRole;
  account_type: AccountType;
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  updated_at: string;
}

export interface IndividualSubscription {
  id: string;
  user_id: string;
  plan: IndividualPlan;
  status: 'active' | 'cancelled' | 'expired';
  started_at: string;
  expires_at: string | null;
  stripe_session_id: string | null;
}

export interface Course {
  id: string;
  organisation_id: string | null;
  category: CourseCategory;
  title: string;
  description: string;
  target_role: CourseTargetRole;
  expiry_months: number | null;
  is_active: boolean;
  estimated_minutes: number | null;
  prerequisite_course_id: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface Flashcard {
  id: string;
  course_id: string;
  question_text: string;
  answer_text: string;
  image_url: string;
  order_index: number;
  difficulty: number;
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  course_id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  created_at: string;
}

export interface UserCourse {
  id: string;
  user_id: string;
  course_id: string;
  status: CourseStatus;
  quiz_score: number;
  quiz_attempts: number;
  started_at: string | null;
  completed_at: string | null;
  review_count: number;
  last_reviewed_at: string | null;
}

export interface CertificateRequest {
  id: string;
  user_id: string;
  course_id: string;
  organisation_id: string;
  completion_date: string;
  request_date: string;
  status: CertificateStatus;
  rejection_reason: string;
  approved_by: string | null;
  approved_date: string | null;
  certificate_id: string | null;
  certificate_file_url: string;
  download_count: number;
}

export interface AuditLog {
  id: string;
  organisation_id: string | null;
  performed_by: string | null;
  action: string;
  resource_type: string;
  resource_id: string | null;
  details: Record<string, unknown>;
  created_at: string;
}

export interface CourseAssignment {
  id: string;
  organisation_id: string;
  course_id: string;
  assigned_to: string | null;
  assigned_role: CourseTargetRole | null;
  assigned_by: string;
  due_date: string | null;
  created_at: string;
}

export interface CourseWithProgress extends Course {
  user_course?: UserCourse;
  flashcard_count?: number;
  quiz_question_count?: number;
}

export interface CertificateRequestWithDetails extends CertificateRequest {
  course?: Course;
  profile?: Profile;
  approved_by_profile?: Profile;
}

