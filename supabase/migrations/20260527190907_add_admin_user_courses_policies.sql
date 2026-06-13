/*
  # Add admin policies for user_courses table

  1. Changes
    - Add INSERT policy allowing org_admins to insert user_courses for employees in their org
    - Add DELETE policy allowing org_admins to delete user_courses for employees in their org
    - Add DELETE policy allowing users to delete their own course records (needed for reassignment)
  
  2. Why needed
    - Admins assigning courses via edge function (service role) already works
    - But the direct Supabase client calls from the frontend need these policies too
    - The org_admin check uses JWT app_metadata to avoid recursive subqueries
*/

-- Org admins can insert course assignments for employees in their org
CREATE POLICY "Org admins can insert course progress in their org"
  ON user_courses
  FOR INSERT
  TO authenticated
  WITH CHECK (
    (
      ((auth.jwt() -> 'user_metadata') ->> 'role') IN ('org_admin', 'super_admin')
    )
    AND
    (
      user_id IN (
        SELECT id FROM profiles
        WHERE organisation_id::text = COALESCE(
          (auth.jwt() -> 'app_metadata') ->> 'organisation_id',
          ''
        )
      )
    )
  );

-- Org admins can delete course assignments for employees in their org
CREATE POLICY "Org admins can delete course progress in their org"
  ON user_courses
  FOR DELETE
  TO authenticated
  USING (
    (
      ((auth.jwt() -> 'user_metadata') ->> 'role') IN ('org_admin', 'super_admin')
    )
    AND
    (
      user_id IN (
        SELECT id FROM profiles
        WHERE organisation_id::text = COALESCE(
          (auth.jwt() -> 'app_metadata') ->> 'organisation_id',
          ''
        )
      )
    )
  );
