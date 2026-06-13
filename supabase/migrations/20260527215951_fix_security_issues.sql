/*
  # Fix Security Issues

  Addresses all security warnings from the Supabase security advisor:

  1. RLS policies on `profiles`, `user_courses`, `org_course_library` were
     referencing `auth.jwt() -> 'user_metadata'`, which is editable by end
     users and must never be used in a security context. All policies are
     replaced to use `auth.jwt() -> 'app_metadata'` instead (server-controlled).

  2. `public.training_expiry_status` view was created with SECURITY DEFINER,
     meaning it ran with the creator's privileges and bypassed RLS on the
     underlying tables. Recreated as SECURITY INVOKER (the default) so the
     view executes with the calling user's privileges and RLS is enforced.

  3. `public.generate_certificate_id()` had a mutable search_path, which
     allows privilege escalation via search_path injection. Fixed by pinning
     search_path to 'public'.

  4. `public.handle_new_user()` was executable by the `anon` and `authenticated`
     roles as a SECURITY DEFINER function, exposing it as a callable RPC
     endpoint. EXECUTE privilege is revoked from both roles — the function
     is only ever called internally by the auth trigger.
*/

-- ── 1. Fix profiles RLS policies ─────────────────────────────────────────────

DROP POLICY IF EXISTS "Super admins can view all profiles"   ON profiles;
DROP POLICY IF EXISTS "Org admins can view org profiles"     ON profiles;
DROP POLICY IF EXISTS "Org admins can update org profiles"   ON profiles;

-- Super admins: role lives in app_metadata (server-set, not user-editable)
CREATE POLICY "Super admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'super_admin'
  );

-- Org admins can view profiles in their own organisation
CREATE POLICY "Org admins can view org profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') IN ('org_admin', 'super_admin')
    AND (organisation_id)::text = COALESCE(
      auth.jwt() -> 'app_metadata' ->> 'organisation_id', ''
    )
    AND COALESCE(
      auth.jwt() -> 'app_metadata' ->> 'organisation_id', ''
    ) <> ''
  );

-- Org admins can update profiles in their own organisation
CREATE POLICY "Org admins can update org profiles"
  ON profiles FOR UPDATE
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'org_admin'
    AND (organisation_id)::text = COALESCE(
      auth.jwt() -> 'app_metadata' ->> 'organisation_id', ''
    )
    AND COALESCE(
      auth.jwt() -> 'app_metadata' ->> 'organisation_id', ''
    ) <> ''
  )
  WITH CHECK (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'org_admin'
    AND (organisation_id)::text = COALESCE(
      auth.jwt() -> 'app_metadata' ->> 'organisation_id', ''
    )
    AND COALESCE(
      auth.jwt() -> 'app_metadata' ->> 'organisation_id', ''
    ) <> ''
  );

-- ── 2. Fix user_courses RLS policies ─────────────────────────────────────────

DROP POLICY IF EXISTS "Org admins can insert course progress in their org" ON user_courses;
DROP POLICY IF EXISTS "Org admins can delete course progress in their org" ON user_courses;

CREATE POLICY "Org admins can insert course progress in their org"
  ON user_courses FOR INSERT
  TO authenticated
  WITH CHECK (
    (auth.jwt() -> 'app_metadata' ->> 'role') IN ('org_admin', 'super_admin')
    AND user_id IN (
      SELECT id FROM profiles
      WHERE (organisation_id)::text = COALESCE(
        auth.jwt() -> 'app_metadata' ->> 'organisation_id', ''
      )
    )
  );

CREATE POLICY "Org admins can delete course progress in their org"
  ON user_courses FOR DELETE
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') IN ('org_admin', 'super_admin')
    AND user_id IN (
      SELECT id FROM profiles
      WHERE (organisation_id)::text = COALESCE(
        auth.jwt() -> 'app_metadata' ->> 'organisation_id', ''
      )
    )
  );

-- ── 3. Fix org_course_library RLS policies ────────────────────────────────────

DROP POLICY IF EXISTS "Super admins can view org course library"       ON org_course_library;
DROP POLICY IF EXISTS "Super admins can insert org course library"     ON org_course_library;
DROP POLICY IF EXISTS "Super admins can delete org course library"     ON org_course_library;
DROP POLICY IF EXISTS "Org admins can view their org course library"   ON org_course_library;

CREATE POLICY "Super admins can view org course library"
  ON org_course_library FOR SELECT
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'super_admin'
  );

CREATE POLICY "Super admins can insert org course library"
  ON org_course_library FOR INSERT
  TO authenticated
  WITH CHECK (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'super_admin'
  );

CREATE POLICY "Super admins can delete org course library"
  ON org_course_library FOR DELETE
  TO authenticated
  USING (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'super_admin'
  );

CREATE POLICY "Org admins can view their org course library"
  ON org_course_library FOR SELECT
  TO authenticated
  USING (
    (organisation_id)::text = COALESCE(
      auth.jwt() -> 'app_metadata' ->> 'organisation_id', ''
    )
    AND COALESCE(
      auth.jwt() -> 'app_metadata' ->> 'organisation_id', ''
    ) <> ''
    AND (auth.jwt() -> 'app_metadata' ->> 'role') IN ('org_admin', 'employee')
  );

-- ── 4. Fix training_expiry_status view (SECURITY DEFINER → INVOKER) ──────────

DROP VIEW IF EXISTS public.training_expiry_status;

CREATE VIEW public.training_expiry_status
  WITH (security_invoker = true)
AS
SELECT
  uc.user_id,
  p.organisation_id,
  p.first_name,
  p.last_name,
  p.email,
  c.id                                                          AS course_id,
  c.title                                                       AS course_title,
  c.expiry_months,
  uc.completed_at,
  cr.approved_date                                              AS cert_approved_date,
  COALESCE(cr.approved_date, uc.completed_at)                   AS effective_date,
  COALESCE(cr.approved_date, uc.completed_at)
    + (c.expiry_months || ' months')::interval                  AS expires_at,
  EXTRACT(DAY FROM (
    COALESCE(cr.approved_date, uc.completed_at)
    + (c.expiry_months || ' months')::interval
    - now()
  ))::integer                                                   AS days_until_expiry
FROM user_courses uc
JOIN profiles p    ON p.id    = uc.user_id
JOIN courses c     ON c.id    = uc.course_id
LEFT JOIN certificate_requests cr
       ON cr.user_id   = uc.user_id
      AND cr.course_id = uc.course_id
      AND cr.status    = 'approved'
WHERE uc.status = 'passed'
  AND c.expiry_months IS NOT NULL
  AND c.expiry_months > 0
  AND COALESCE(cr.approved_date, uc.completed_at) IS NOT NULL;

-- ── 5. Fix generate_certificate_id: pin search_path ──────────────────────────

CREATE OR REPLACE FUNCTION public.generate_certificate_id()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  chars  text := 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  result text := 'SG-';
  i      int;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN result;
END;
$$;

-- ── 6. Revoke EXECUTE on handle_new_user from anon and authenticated ──────────
-- This function is only ever called by the auth trigger, never via RPC.

REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM authenticated;
