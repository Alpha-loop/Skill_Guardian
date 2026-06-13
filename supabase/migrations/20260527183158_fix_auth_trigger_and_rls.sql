/*
  # Fix Auth Trigger and RLS Policies
  
  ## Problem
  The handle_new_user trigger was failing during Supabase Auth sign-in because:
  1. The trigger runs as the calling user, but during auth sign-in auth.uid() is NULL
  2. The RLS policy "Allow profile creation on signup" uses WITH CHECK (id = auth.uid())
     which fails when auth.uid() is NULL (trigger context)
  
  ## Fix
  1. Drop the restrictive INSERT policies on profiles
  2. Add a permissive policy that allows the trigger (service role) to insert
  3. Make the trigger SECURITY DEFINER so it runs as the function owner (bypasses RLS)
  4. Add error handling to the trigger so auth never fails due to profile issues
*/

-- Drop the conflicting INSERT policies on profiles
DROP POLICY IF EXISTS "Allow profile creation on signup" ON profiles;
DROP POLICY IF EXISTS "Org admins can insert profiles in their organisation" ON profiles;

-- Recreate the trigger function as SECURITY DEFINER (bypasses RLS entirely)
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'first_name', ''),
    COALESCE(new.raw_user_meta_data->>'last_name', ''),
    COALESCE((new.raw_user_meta_data->>'role')::user_role, 'employee')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
EXCEPTION WHEN OTHERS THEN
  -- Never let a profile insertion failure block auth
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Re-create the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Add a service-role INSERT policy for profiles (used by trigger + admin operations)
CREATE POLICY "Service role can insert profiles"
  ON profiles FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Allow authenticated users to insert their own profile (for signup flow)
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

-- Allow org admins to insert profiles in their org
CREATE POLICY "Org admins can insert profiles in their org"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (
    organisation_id IN (
      SELECT organisation_id FROM profiles WHERE id = auth.uid() AND role IN ('org_admin', 'super_admin')
    )
  );
