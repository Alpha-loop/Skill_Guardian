/*
  # Fix Demo User app_metadata

  The seniorcarer@sunrisecare.com and manager@sunrisecare.com accounts were
  created without role or organisation_id in raw_app_meta_data. Since the
  security fix migration moved all RLS policies to read from app_metadata
  (instead of user_metadata), these accounts cannot pass any auth checks,
  causing "Database error querying schema" on login.

  This migration:
  1. Sets correct raw_app_meta_data for seniorcarer (role: employee, org_id set)
  2. Sets correct raw_app_meta_data for manager (role: employee, org_id set)
  3. Also backfills the existing carer and nurse accounts which only had
     provider info but missing explicit role confirmation
*/

-- Fix seniorcarer@sunrisecare.com (id: 30000000-0000-0000-0000-000000000005)
UPDATE auth.users
SET raw_app_meta_data = jsonb_build_object(
  'provider',         'email',
  'providers',        jsonb_build_array('email'),
  'role',             'employee',
  'organisation_id',  '20000000-0000-0000-0000-000000000001'
)
WHERE id = '30000000-0000-0000-0000-000000000005';

-- Fix manager@sunrisecare.com (id: 30000000-0000-0000-0000-000000000006)
UPDATE auth.users
SET raw_app_meta_data = jsonb_build_object(
  'provider',         'email',
  'providers',        jsonb_build_array('email'),
  'role',             'employee',
  'organisation_id',  '20000000-0000-0000-0000-000000000001'
)
WHERE id = '30000000-0000-0000-0000-000000000006';

-- Also ensure carer@sunrisecare.com has correct app_metadata (it exists but verify)
UPDATE auth.users
SET raw_app_meta_data = jsonb_build_object(
  'provider',         'email',
  'providers',        jsonb_build_array('email'),
  'role',             'employee',
  'organisation_id',  '20000000-0000-0000-0000-000000000001'
)
WHERE email = 'carer@sunrisecare.com'
  AND (
    raw_app_meta_data->>'role' IS NULL
    OR raw_app_meta_data->>'organisation_id' IS NULL
  );

-- Also ensure nurse@sunrisecare.com has correct app_metadata
UPDATE auth.users
SET raw_app_meta_data = jsonb_build_object(
  'provider',         'email',
  'providers',        jsonb_build_array('email'),
  'role',             'employee',
  'organisation_id',  '20000000-0000-0000-0000-000000000001'
)
WHERE email = 'nurse@sunrisecare.com'
  AND (
    raw_app_meta_data->>'role' IS NULL
    OR raw_app_meta_data->>'organisation_id' IS NULL
  );
