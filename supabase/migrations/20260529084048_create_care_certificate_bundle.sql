/*
  # Create Care Certificate Bundle

  ## Summary
  Introduces a "bundle" concept so the 16 Care Certificate standards can be
  assigned to a new carer in a single click and result in one combined
  portfolio certificate.

  ## New Tables
  - `bundles`
      - `id` (uuid, PK)
      - `slug` (text, unique) — machine identifier, e.g. 'care-certificate'
      - `title` (text) — display name
      - `description` (text)
      - `is_active` (boolean)
      - `created_at` (timestamptz)
  - `bundle_courses`
      - `id` (uuid, PK)
      - `bundle_id` (uuid FK → bundles.id)
      - `course_id` (uuid FK → courses.id)
      - `sort_order` (int) — display order within the bundle
  - `user_bundle_assignments`
      - `id` (uuid, PK)
      - `user_id` (uuid FK → profiles.id)
      - `bundle_id` (uuid FK → bundles.id)
      - `assigned_by` (uuid FK → profiles.id) — the admin who assigned it
      - `assigned_at` (timestamptz)
      - UNIQUE(user_id, bundle_id)

  ## Security
  - RLS enabled on all three tables
  - Org admins can insert user_bundle_assignments for employees in their org
  - Users can read their own assignments; admins can read all within their org
  - bundles and bundle_courses are readable by all authenticated users (reference data)

  ## Seed Data
  - Inserts the "Care Certificate (All 16 Standards)" bundle
  - Links it to course id 10000000-0000-0000-0000-000000000012
*/

-- ────────────────────────────────────────────────────────────
-- 1. bundles table
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bundles (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        text UNIQUE NOT NULL,
  title       text NOT NULL,
  description text NOT NULL DEFAULT '',
  is_active   boolean NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE bundles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read active bundles"
  ON bundles FOR SELECT
  TO authenticated
  USING (is_active = true);

-- ────────────────────────────────────────────────────────────
-- 2. bundle_courses table
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bundle_courses (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bundle_id   uuid NOT NULL REFERENCES bundles(id) ON DELETE CASCADE,
  course_id   uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  sort_order  integer NOT NULL DEFAULT 0,
  UNIQUE(bundle_id, course_id)
);

ALTER TABLE bundle_courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read bundle courses"
  ON bundle_courses FOR SELECT
  TO authenticated
  USING (true);

-- ────────────────────────────────────────────────────────────
-- 3. user_bundle_assignments table
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS user_bundle_assignments (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  bundle_id   uuid NOT NULL REFERENCES bundles(id) ON DELETE CASCADE,
  assigned_by uuid REFERENCES profiles(id) ON DELETE SET NULL,
  assigned_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(user_id, bundle_id)
);

ALTER TABLE user_bundle_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bundle assignments"
  ON user_bundle_assignments FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Org admins can view bundle assignments in their org"
  ON user_bundle_assignments FOR SELECT
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') IN ('org_admin', 'super_admin')
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = user_bundle_assignments.user_id
        AND profiles.organisation_id = (
          SELECT organisation_id FROM profiles WHERE id = auth.uid()
        )
    )
  );

CREATE POLICY "Org admins can assign bundles to employees in their org"
  ON user_bundle_assignments FOR INSERT
  TO authenticated
  WITH CHECK (
    (auth.jwt() -> 'app_metadata' ->> 'role') IN ('org_admin', 'super_admin')
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = user_bundle_assignments.user_id
        AND profiles.organisation_id = (
          SELECT organisation_id FROM profiles WHERE id = auth.uid()
        )
    )
  );

CREATE POLICY "Org admins can delete bundle assignments in their org"
  ON user_bundle_assignments FOR DELETE
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') IN ('org_admin', 'super_admin')
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = user_bundle_assignments.user_id
        AND profiles.organisation_id = (
          SELECT organisation_id FROM profiles WHERE id = auth.uid()
        )
    )
  );

-- ────────────────────────────────────────────────────────────
-- 4. Seed: Care Certificate bundle
-- ────────────────────────────────────────────────────────────
INSERT INTO bundles (id, slug, title, description)
VALUES (
  'b0000000-0000-0000-0000-000000000001',
  'care-certificate',
  'Care Certificate Portfolio (All 16 Standards)',
  'The complete Care Certificate covering all 16 mandatory standards for new care workers. Assign with one click — on completion the carer receives a single portfolio certificate evidencing all standards.'
)
ON CONFLICT (slug) DO NOTHING;

-- Link the existing Care Certificate course (all 16 standards)
INSERT INTO bundle_courses (bundle_id, course_id, sort_order)
VALUES (
  'b0000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000012',
  1
)
ON CONFLICT (bundle_id, course_id) DO NOTHING;
