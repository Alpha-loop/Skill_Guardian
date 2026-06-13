/*
  # SkillGuardian Complete Database Schema

  ## Overview
  Multi-tenant healthcare training platform for care homes and social care organisations.

  ## New Tables
  1. `organisations` - Care home accounts (tenants)
  2. `profiles` - Extended user data linked to auth.users
  3. `courses` - Training courses (global or org-specific)
  4. `flashcards` - Flashcard content for courses
  5. `quiz_questions` - Multiple choice quiz questions
  6. `user_courses` - Course progress tracking per user
  7. `certificate_requests` - Certificate approval workflow
  8. `audit_logs` - Admin action tracking for CQC compliance

  ## Security
  - RLS enabled on all tables
  - Organisation-scoped data isolation
  - Super admin bypass via role check
*/

-- Enums
CREATE TYPE subscription_tier AS ENUM ('basic', 'standard', 'premium');
CREATE TYPE user_role AS ENUM ('super_admin', 'org_admin', 'employee');
CREATE TYPE professional_role AS ENUM ('care_assistant', 'rgn', 'rmn', 'nurse_associate', 'clinical_lead', 'manager', 'admin', 'other');
CREATE TYPE course_category AS ENUM ('core_mandatory', 'legal_requirement', 'role_based', 'clinical_nurse');
CREATE TYPE course_target_role AS ENUM ('all_staff', 'carers_only', 'nurses_only', 'managers_only');
CREATE TYPE course_status AS ENUM ('not_started', 'in_progress', 'passed', 'failed');
CREATE TYPE certificate_status AS ENUM ('pending', 'approved', 'rejected');

-- Organisations table
CREATE TABLE IF NOT EXISTS organisations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  subdomain text UNIQUE NOT NULL,
  contact_email text NOT NULL,
  contact_person text NOT NULL,
  subscription_tier subscription_tier NOT NULL DEFAULT 'basic',
  seat_limit integer NOT NULL DEFAULT 10,
  is_active boolean NOT NULL DEFAULT true,
  logo_url text DEFAULT '',
  primary_color text DEFAULT '#005EB8',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE organisations ENABLE ROW LEVEL SECURITY;

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  organisation_id uuid REFERENCES organisations(id) ON DELETE SET NULL,
  email text NOT NULL,
  first_name text NOT NULL DEFAULT '',
  last_name text NOT NULL DEFAULT '',
  role user_role NOT NULL DEFAULT 'employee',
  professional_role professional_role NOT NULL DEFAULT 'other',
  is_active boolean NOT NULL DEFAULT true,
  last_login timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id uuid REFERENCES organisations(id) ON DELETE CASCADE,
  category course_category NOT NULL,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  target_role course_target_role NOT NULL DEFAULT 'all_staff',
  expiry_months integer,
  is_active boolean NOT NULL DEFAULT true,
  created_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Flashcards table
CREATE TABLE IF NOT EXISTS flashcards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  question_text text NOT NULL,
  answer_text text NOT NULL,
  image_url text DEFAULT '',
  order_index integer NOT NULL DEFAULT 0,
  difficulty integer NOT NULL DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 3),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE flashcards ENABLE ROW LEVEL SECURITY;

-- Quiz questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  question_text text NOT NULL,
  option_a text NOT NULL,
  option_b text NOT NULL,
  option_c text NOT NULL,
  option_d text NOT NULL,
  correct_option char(1) NOT NULL CHECK (correct_option IN ('A', 'B', 'C', 'D')),
  explanation text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

-- User courses (progress tracking)
CREATE TABLE IF NOT EXISTS user_courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  status course_status NOT NULL DEFAULT 'not_started',
  quiz_score integer DEFAULT 0,
  quiz_attempts integer NOT NULL DEFAULT 0,
  started_at timestamptz,
  completed_at timestamptz,
  review_count integer NOT NULL DEFAULT 0,
  last_reviewed_at timestamptz,
  UNIQUE(user_id, course_id)
);

ALTER TABLE user_courses ENABLE ROW LEVEL SECURITY;

-- Certificate requests
CREATE TABLE IF NOT EXISTS certificate_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  organisation_id uuid NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  completion_date timestamptz NOT NULL,
  request_date timestamptz NOT NULL DEFAULT now(),
  status certificate_status NOT NULL DEFAULT 'pending',
  rejection_reason text DEFAULT '',
  approved_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  approved_date timestamptz,
  certificate_id text UNIQUE,
  certificate_file_url text DEFAULT '',
  download_count integer NOT NULL DEFAULT 0,
  UNIQUE(user_id, course_id)
);

ALTER TABLE certificate_requests ENABLE ROW LEVEL SECURITY;

-- Audit logs
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id uuid REFERENCES organisations(id) ON DELETE SET NULL,
  performed_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  action text NOT NULL,
  resource_type text NOT NULL,
  resource_id uuid,
  details jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Course assignments (admin assigns courses to employees)
CREATE TABLE IF NOT EXISTS course_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id uuid NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  assigned_to uuid REFERENCES profiles(id) ON DELETE CASCADE,
  assigned_role course_target_role,
  assigned_by uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  due_date timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(organisation_id, course_id, assigned_to)
);

ALTER TABLE course_assignments ENABLE ROW LEVEL SECURITY;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_organisation_id ON profiles(organisation_id);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_courses_organisation_id ON courses(organisation_id);
CREATE INDEX IF NOT EXISTS idx_courses_category ON courses(category);
CREATE INDEX IF NOT EXISTS idx_flashcards_course_id ON flashcards(course_id);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_course_id ON quiz_questions(course_id);
CREATE INDEX IF NOT EXISTS idx_user_courses_user_id ON user_courses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_courses_course_id ON user_courses(course_id);
CREATE INDEX IF NOT EXISTS idx_certificate_requests_user_id ON certificate_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_certificate_requests_organisation_id ON certificate_requests(organisation_id);
CREATE INDEX IF NOT EXISTS idx_certificate_requests_status ON certificate_requests(status);
CREATE INDEX IF NOT EXISTS idx_audit_logs_organisation_id ON audit_logs(organisation_id);

-- RLS Policies

-- Organisations: super admins see all, org admins see their own
CREATE POLICY "Super admins can view all organisations"
  ON organisations FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

CREATE POLICY "Org admins can view their own organisation"
  ON organisations FOR SELECT
  TO authenticated
  USING (
    id IN (SELECT organisation_id FROM profiles WHERE id = auth.uid())
  );

CREATE POLICY "Super admins can insert organisations"
  ON organisations FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

CREATE POLICY "Super admins can update organisations"
  ON organisations FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin'));

-- Profiles: users see themselves, admins see their org's users
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Org admins can view profiles in their organisation"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    organisation_id IN (
      SELECT organisation_id FROM profiles WHERE id = auth.uid() AND role IN ('org_admin', 'super_admin')
    )
  );

CREATE POLICY "Super admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "Org admins can update profiles in their organisation"
  ON profiles FOR UPDATE
  TO authenticated
  USING (
    organisation_id IN (
      SELECT organisation_id FROM profiles WHERE id = auth.uid() AND role = 'org_admin'
    )
  )
  WITH CHECK (
    organisation_id IN (
      SELECT organisation_id FROM profiles WHERE id = auth.uid() AND role = 'org_admin'
    )
  );

CREATE POLICY "Allow profile creation on signup"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

CREATE POLICY "Org admins can insert profiles in their organisation"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (
    organisation_id IN (
      SELECT organisation_id FROM profiles WHERE id = auth.uid() AND role IN ('org_admin', 'super_admin')
    )
  );

-- Courses: global courses visible to all, org courses only to that org
CREATE POLICY "All authenticated users can view global courses"
  ON courses FOR SELECT
  TO authenticated
  USING (organisation_id IS NULL AND is_active = true);

CREATE POLICY "Org members can view their org courses"
  ON courses FOR SELECT
  TO authenticated
  USING (
    organisation_id IN (SELECT organisation_id FROM profiles WHERE id = auth.uid())
    AND is_active = true
  );

CREATE POLICY "Super admins can view all courses"
  ON courses FOR SELECT
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

CREATE POLICY "Super admins can manage global courses"
  ON courses FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

CREATE POLICY "Super admins can update courses"
  ON courses FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin'));

CREATE POLICY "Org admins can create org courses"
  ON courses FOR INSERT
  TO authenticated
  WITH CHECK (
    organisation_id IN (
      SELECT organisation_id FROM profiles WHERE id = auth.uid() AND role = 'org_admin'
    )
  );

-- Flashcards: same visibility as courses
CREATE POLICY "Authenticated users can view flashcards for visible courses"
  ON flashcards FOR SELECT
  TO authenticated
  USING (
    course_id IN (
      SELECT id FROM courses WHERE organisation_id IS NULL AND is_active = true
      UNION
      SELECT id FROM courses WHERE organisation_id IN (
        SELECT organisation_id FROM profiles WHERE id = auth.uid()
      ) AND is_active = true
    )
  );

CREATE POLICY "Super admins can manage flashcards"
  ON flashcards FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

CREATE POLICY "Super admins can update flashcards"
  ON flashcards FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin'));

-- Quiz questions: same as flashcards
CREATE POLICY "Authenticated users can view quiz questions for visible courses"
  ON quiz_questions FOR SELECT
  TO authenticated
  USING (
    course_id IN (
      SELECT id FROM courses WHERE organisation_id IS NULL AND is_active = true
      UNION
      SELECT id FROM courses WHERE organisation_id IN (
        SELECT organisation_id FROM profiles WHERE id = auth.uid()
      ) AND is_active = true
    )
  );

CREATE POLICY "Super admins can manage quiz questions"
  ON quiz_questions FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin')
  );

CREATE POLICY "Super admins can update quiz questions"
  ON quiz_questions FOR UPDATE
  TO authenticated
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin'))
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin'));

-- User courses: users see own, admins see their org's
CREATE POLICY "Users can view own course progress"
  ON user_courses FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Org admins can view course progress in their org"
  ON user_courses FOR SELECT
  TO authenticated
  USING (
    user_id IN (
      SELECT p.id FROM profiles p
      WHERE p.organisation_id IN (
        SELECT organisation_id FROM profiles WHERE id = auth.uid() AND role IN ('org_admin', 'super_admin')
      )
    )
  );

CREATE POLICY "Users can insert own course progress"
  ON user_courses FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own course progress"
  ON user_courses FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Certificate requests
CREATE POLICY "Users can view own certificate requests"
  ON certificate_requests FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Org admins can view certificate requests in their org"
  ON certificate_requests FOR SELECT
  TO authenticated
  USING (
    organisation_id IN (
      SELECT organisation_id FROM profiles WHERE id = auth.uid() AND role IN ('org_admin', 'super_admin')
    )
  );

CREATE POLICY "Users can insert own certificate requests"
  ON certificate_requests FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Org admins can update certificate requests in their org"
  ON certificate_requests FOR UPDATE
  TO authenticated
  USING (
    organisation_id IN (
      SELECT organisation_id FROM profiles WHERE id = auth.uid() AND role IN ('org_admin', 'super_admin')
    )
  )
  WITH CHECK (
    organisation_id IN (
      SELECT organisation_id FROM profiles WHERE id = auth.uid() AND role IN ('org_admin', 'super_admin')
    )
  );

-- Audit logs
CREATE POLICY "Org admins can view audit logs for their org"
  ON audit_logs FOR SELECT
  TO authenticated
  USING (
    organisation_id IN (
      SELECT organisation_id FROM profiles WHERE id = auth.uid() AND role IN ('org_admin', 'super_admin')
    )
  );

CREATE POLICY "Authenticated users can insert audit logs"
  ON audit_logs FOR INSERT
  TO authenticated
  WITH CHECK (performed_by = auth.uid());

-- Course assignments
CREATE POLICY "Users can view their own assignments"
  ON course_assignments FOR SELECT
  TO authenticated
  USING (assigned_to = auth.uid());

CREATE POLICY "Org admins can view assignments in their org"
  ON course_assignments FOR SELECT
  TO authenticated
  USING (
    organisation_id IN (
      SELECT organisation_id FROM profiles WHERE id = auth.uid() AND role IN ('org_admin', 'super_admin')
    )
  );

CREATE POLICY "Org admins can create assignments in their org"
  ON course_assignments FOR INSERT
  TO authenticated
  WITH CHECK (
    organisation_id IN (
      SELECT organisation_id FROM profiles WHERE id = auth.uid() AND role IN ('org_admin', 'super_admin')
    )
  );

CREATE POLICY "Org admins can update assignments in their org"
  ON course_assignments FOR UPDATE
  TO authenticated
  USING (
    organisation_id IN (
      SELECT organisation_id FROM profiles WHERE id = auth.uid() AND role IN ('org_admin', 'super_admin')
    )
  )
  WITH CHECK (
    organisation_id IN (
      SELECT organisation_id FROM profiles WHERE id = auth.uid() AND role IN ('org_admin', 'super_admin')
    )
  );

-- Function to handle profile creation on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, first_name, last_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'first_name', ''),
    COALESCE(new.raw_user_meta_data->>'last_name', ''),
    COALESCE((new.raw_user_meta_data->>'role')::user_role, 'employee')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to generate unique certificate ID
CREATE OR REPLACE FUNCTION generate_certificate_id()
RETURNS text AS $$
DECLARE
  chars text := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result text := 'SG-';
  i integer;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::integer, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;
