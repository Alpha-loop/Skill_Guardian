/*
  # Organisation Course Library

  Tracks which courses a super admin has enabled for each organisation,
  gated by the organisation's subscription tier.

  1. New Table
    - `org_course_library`
      - `id` (uuid, primary key)
      - `organisation_id` (uuid, FK → organisations)
      - `course_id` (uuid, FK → courses)
      - `assigned_by` (uuid, FK → auth.users — the super admin)
      - `created_at` (timestamptz)
      - Unique constraint on (organisation_id, course_id)

  2. Security
    - RLS enabled
    - Super admins can SELECT / INSERT / DELETE all rows
    - Org admins can SELECT rows for their own organisation (so they know what's in their library)
    - No other access

  3. Subscription tier course limits (enforced in application logic)
    - basic: core_mandatory only
    - standard: core_mandatory + legal_requirement + role_based
    - premium: all courses including clinical_nurse
*/

CREATE TABLE IF NOT EXISTS org_course_library (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id uuid NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  course_id      uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  assigned_by    uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at     timestamptz DEFAULT now(),
  UNIQUE (organisation_id, course_id)
);

ALTER TABLE org_course_library ENABLE ROW LEVEL SECURITY;

-- Super admins can view all library entries
CREATE POLICY "Super admins can view org course library"
  ON org_course_library FOR SELECT
  TO authenticated
  USING (
    ((auth.jwt() -> 'user_metadata') ->> 'role') = 'super_admin'
  );

-- Super admins can insert library entries
CREATE POLICY "Super admins can insert org course library"
  ON org_course_library FOR INSERT
  TO authenticated
  WITH CHECK (
    ((auth.jwt() -> 'user_metadata') ->> 'role') = 'super_admin'
  );

-- Super admins can delete library entries
CREATE POLICY "Super admins can delete org course library"
  ON org_course_library FOR DELETE
  TO authenticated
  USING (
    ((auth.jwt() -> 'user_metadata') ->> 'role') = 'super_admin'
  );

-- Org admins can view their own organisation's library (so they know what courses are available)
CREATE POLICY "Org admins can view their org course library"
  ON org_course_library FOR SELECT
  TO authenticated
  USING (
    organisation_id::text = COALESCE(
      (auth.jwt() -> 'app_metadata') ->> 'organisation_id', ''
    )
    AND COALESCE(
      (auth.jwt() -> 'app_metadata') ->> 'organisation_id', ''
    ) <> ''
    AND ((auth.jwt() -> 'user_metadata') ->> 'role') IN ('org_admin', 'employee')
  );
