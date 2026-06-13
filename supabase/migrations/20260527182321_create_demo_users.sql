/*
  # Create Demo Users for SkillGuardian
  
  Creates 3 demo accounts in auth.users with confirmed email and bcrypt-hashed password.
  Password for all accounts: Demo1234!
  
  1. superadmin@skillguardian.com - Super Admin (no organisation)
  2. admin@sunrisecare.com - Org Admin for Sunrise Care Home
  3. nurse@sunrisecare.com - Employee (RGN) for Sunrise Care Home
  
  Also updates their profiles with correct roles and organisation links.
*/

-- Insert demo users into auth.users
-- Password hash for "Demo1234!" using bcrypt
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  role,
  aud
) VALUES
  (
    '30000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000000',
    'superadmin@skillguardian.com',
    crypt('Demo1234!', gen_salt('bf')),
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"first_name": "Super", "last_name": "Admin", "role": "super_admin"}',
    now(),
    now(),
    'authenticated',
    'authenticated'
  ),
  (
    '30000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000000',
    'admin@sunrisecare.com',
    crypt('Demo1234!', gen_salt('bf')),
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"first_name": "Sarah", "last_name": "Johnson", "role": "org_admin"}',
    now(),
    now(),
    'authenticated',
    'authenticated'
  ),
  (
    '30000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000000',
    'nurse@sunrisecare.com',
    crypt('Demo1234!', gen_salt('bf')),
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"first_name": "Emma", "last_name": "Clarke", "role": "employee"}',
    now(),
    now(),
    'authenticated',
    'authenticated'
  )
ON CONFLICT (id) DO NOTHING;

-- Insert identities (required for email/password auth)
INSERT INTO auth.identities (
  id,
  user_id,
  provider_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
) VALUES
  (
    '30000000-0000-0000-0000-000000000001',
    '30000000-0000-0000-0000-000000000001',
    'superadmin@skillguardian.com',
    '{"sub": "30000000-0000-0000-0000-000000000001", "email": "superadmin@skillguardian.com"}',
    'email',
    now(),
    now(),
    now()
  ),
  (
    '30000000-0000-0000-0000-000000000002',
    '30000000-0000-0000-0000-000000000002',
    'admin@sunrisecare.com',
    '{"sub": "30000000-0000-0000-0000-000000000002", "email": "admin@sunrisecare.com"}',
    'email',
    now(),
    now(),
    now()
  ),
  (
    '30000000-0000-0000-0000-000000000003',
    '30000000-0000-0000-0000-000000000003',
    'nurse@sunrisecare.com',
    '{"sub": "30000000-0000-0000-0000-000000000003", "email": "nurse@sunrisecare.com"}',
    'email',
    now(),
    now(),
    now()
  )
ON CONFLICT (id) DO NOTHING;

-- Upsert profiles (the trigger may have already fired, so use upsert)
INSERT INTO profiles (id, organisation_id, email, first_name, last_name, role, professional_role, is_active)
VALUES
  (
    '30000000-0000-0000-0000-000000000001',
    NULL,
    'superadmin@skillguardian.com',
    'Super',
    'Admin',
    'super_admin',
    'admin',
    true
  ),
  (
    '30000000-0000-0000-0000-000000000002',
    '20000000-0000-0000-0000-000000000001',
    'admin@sunrisecare.com',
    'Sarah',
    'Johnson',
    'org_admin',
    'manager',
    true
  ),
  (
    '30000000-0000-0000-0000-000000000003',
    '20000000-0000-0000-0000-000000000001',
    'nurse@sunrisecare.com',
    'Emma',
    'Clarke',
    'employee',
    'rgn',
    true
  )
ON CONFLICT (id) DO UPDATE SET
  organisation_id = EXCLUDED.organisation_id,
  email = EXCLUDED.email,
  first_name = EXCLUDED.first_name,
  last_name = EXCLUDED.last_name,
  role = EXCLUDED.role,
  professional_role = EXCLUDED.professional_role,
  is_active = EXCLUDED.is_active;

-- Assign some courses to the nurse so the employee dashboard has content
INSERT INTO user_courses (user_id, course_id, status, started_at)
VALUES
  ('30000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000001', 'not_started', NULL),
  ('30000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000003', 'in_progress', now()),
  ('30000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000007', 'passed', now() - interval '3 days'),
  ('30000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000009', 'not_started', NULL),
  ('30000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000024', 'in_progress', now() - interval '1 day'),
  ('30000000-0000-0000-0000-000000000003', '10000000-0000-0000-0000-000000000029', 'passed', now() - interval '7 days')
ON CONFLICT (user_id, course_id) DO NOTHING;

-- Update passed courses with scores
UPDATE user_courses
SET quiz_score = 90, quiz_attempts = 1, completed_at = now() - interval '3 days'
WHERE user_id = '30000000-0000-0000-0000-000000000003'
  AND course_id = '10000000-0000-0000-0000-000000000007';

UPDATE user_courses
SET quiz_score = 85, quiz_attempts = 2, completed_at = now() - interval '7 days'
WHERE user_id = '30000000-0000-0000-0000-000000000003'
  AND course_id = '10000000-0000-0000-0000-000000000029';

-- Add a pending certificate request for the nurse
INSERT INTO certificate_requests (user_id, course_id, organisation_id, completion_date, request_date, status)
VALUES (
  '30000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000007',
  '20000000-0000-0000-0000-000000000001',
  now() - interval '3 days',
  now() - interval '1 day',
  'pending'
)
ON CONFLICT (user_id, course_id) DO NOTHING;
