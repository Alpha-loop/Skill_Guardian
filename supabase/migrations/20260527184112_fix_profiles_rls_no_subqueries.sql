/*
  # Fix profiles RLS - eliminate ALL subqueries on profiles table

  ## Problem
  Any policy on profiles that contains a subquery SELECT from profiles
  causes infinite recursion. This includes the org_admin policies that
  looked up organisation_id via a subquery.

  ## Fix
  Use ONLY auth.uid() and auth.jwt() claims in all policies.
  Organisation_id must come from jwt claims, not from a DB lookup.
  We store organisation_id in app_metadata so it's available in jwt.
*/

-- Drop all policies on profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Org admins can view profiles in their organisation" ON profiles;
DROP POLICY IF EXISTS "Super admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Org admins can update profiles in their organisation" ON profiles;
DROP POLICY IF EXISTS "Service role can insert profiles" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Org admins can insert profiles in their org" ON profiles;

-- Simple, non-recursive SELECT policies
-- 1. Every authenticated user can read their own row
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

-- 2. Super admins can read all profiles (jwt claim only, no subquery)
CREATE POLICY "Super admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'super_admin'
  );

-- 3. Org admins can view profiles in their org (org_id from jwt app_metadata)
CREATE POLICY "Org admins can view org profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') IN ('org_admin', 'super_admin')
    AND organisation_id::text = COALESCE(
      auth.jwt() -> 'app_metadata' ->> 'organisation_id', ''
    )
    AND COALESCE(auth.jwt() -> 'app_metadata' ->> 'organisation_id', '') != ''
  );

-- Simple UPDATE policies (no subqueries)
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "Org admins can update org profiles"
  ON profiles FOR UPDATE
  TO authenticated
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'org_admin'
    AND organisation_id::text = COALESCE(
      auth.jwt() -> 'app_metadata' ->> 'organisation_id', ''
    )
    AND COALESCE(auth.jwt() -> 'app_metadata' ->> 'organisation_id', '') != ''
  )
  WITH CHECK (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'org_admin'
    AND organisation_id::text = COALESCE(
      auth.jwt() -> 'app_metadata' ->> 'organisation_id', ''
    )
    AND COALESCE(auth.jwt() -> 'app_metadata' ->> 'organisation_id', '') != ''
  );

-- INSERT policies
CREATE POLICY "Service role can insert profiles"
  ON profiles FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());
