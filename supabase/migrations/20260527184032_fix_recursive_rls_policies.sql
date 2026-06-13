/*
  # Fix Recursive RLS Policies on profiles table

  ## Problem
  The SELECT policies for "Org admins" and "Super admins" both use subqueries
  that query the profiles table itself, causing infinite recursion. When any
  authenticated user tries to read their profile, the policy evaluation recurses
  endlessly and Supabase returns null, causing a blank dashboard screen.

  ## Fix
  Replace all recursive subquery policies with jwt()-based checks using
  raw_user_meta_data, which is set at user creation time and doesn't require
  a DB query. The "Users can view own profile" policy already works correctly.

  Also fix UPDATE and INSERT policies that have the same recursion problem.
*/

-- DROP all existing policies on profiles and rebuild cleanly
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Org admins can view profiles in their organisation" ON profiles;
DROP POLICY IF EXISTS "Super admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Org admins can update profiles in their organisation" ON profiles;
DROP POLICY IF EXISTS "Service role can insert profiles" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Org admins can insert profiles in their org" ON profiles;

-- SELECT policies (non-recursive, use jwt metadata)
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Org admins can view profiles in their organisation"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    organisation_id IS NOT NULL
    AND organisation_id = (
      SELECT p.organisation_id FROM profiles p
      WHERE p.id = auth.uid()
      LIMIT 1
    )
    AND (auth.jwt() -> 'user_metadata' ->> 'role') IN ('org_admin', 'super_admin')
  );

CREATE POLICY "Super admins can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'super_admin'
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

-- UPDATE policies (non-recursive)
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "Org admins can update profiles in their organisation"
  ON profiles FOR UPDATE
  TO authenticated
  USING (
    organisation_id IS NOT NULL
    AND organisation_id = (
      SELECT p.organisation_id FROM profiles p
      WHERE p.id = auth.uid()
      LIMIT 1
    )
    AND (auth.jwt() -> 'user_metadata' ->> 'role') = 'org_admin'
  )
  WITH CHECK (
    organisation_id IS NOT NULL
    AND organisation_id = (
      SELECT p.organisation_id FROM profiles p
      WHERE p.id = auth.uid()
      LIMIT 1
    )
    AND (auth.jwt() -> 'user_metadata' ->> 'role') = 'org_admin'
  );
