/*
  # Add Individual Carer Demo User

  ## Summary
  Creates a demo individual carer account for testing the self-signup flow.

  ## New User
  - Email: individual@demo.skillguardian.com
  - Password: Demo1234!
  - Role: employee / account_type: individual
  - Plan: care_certificate (active)
  - Care Certificate Portfolio auto-assigned

  No organisation affiliation — this user represents a carer who signed up
  directly (not through an org admin).
*/

-- ── 1. Auth user ──────────────────────────────────────────────────────────────
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
) VALUES (
  '40000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000000',
  'individual@demo.skillguardian.com',
  crypt('Demo1234!', gen_salt('bf')),
  now(),
  '{"provider": "email", "providers": ["email"], "role": "employee", "account_type": "individual"}',
  '{"first_name": "Jade", "last_name": "Harper", "account_type": "individual"}',
  now(),
  now(),
  'authenticated',
  'authenticated'
)
ON CONFLICT (id) DO NOTHING;

-- ── 2. Auth identity ──────────────────────────────────────────────────────────
INSERT INTO auth.identities (
  id,
  user_id,
  provider_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
) VALUES (
  '40000000-0000-0000-0000-000000000001',
  '40000000-0000-0000-0000-000000000001',
  'individual@demo.skillguardian.com',
  '{"sub": "40000000-0000-0000-0000-000000000001", "email": "individual@demo.skillguardian.com"}',
  'email',
  now(),
  now(),
  now()
)
ON CONFLICT (id) DO NOTHING;

-- ── 3. Profile ────────────────────────────────────────────────────────────────
INSERT INTO profiles (
  id, organisation_id, email, first_name, last_name,
  role, professional_role, account_type, is_active
) VALUES (
  '40000000-0000-0000-0000-000000000001',
  NULL,
  'individual@demo.skillguardian.com',
  'Jade',
  'Harper',
  'employee',
  'care_assistant',
  'individual',
  true
)
ON CONFLICT (id) DO UPDATE SET
  organisation_id  = EXCLUDED.organisation_id,
  email            = EXCLUDED.email,
  first_name       = EXCLUDED.first_name,
  last_name        = EXCLUDED.last_name,
  role             = EXCLUDED.role,
  professional_role= EXCLUDED.professional_role,
  account_type     = EXCLUDED.account_type,
  is_active        = EXCLUDED.is_active;

-- ── 4. Individual subscription ────────────────────────────────────────────────
INSERT INTO individual_subscriptions (user_id, plan, status)
VALUES ('40000000-0000-0000-0000-000000000001', 'care_certificate', 'active')
ON CONFLICT (user_id, plan) DO NOTHING;

-- ── 5. Assign Care Certificate course ────────────────────────────────────────
INSERT INTO user_courses (user_id, course_id, status)
VALUES (
  '40000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000012',
  'not_started'
)
ON CONFLICT (user_id, course_id) DO NOTHING;

-- ── 6. Record bundle assignment ───────────────────────────────────────────────
INSERT INTO user_bundle_assignments (user_id, bundle_id, assigned_by)
VALUES (
  '40000000-0000-0000-0000-000000000001',
  'b0000000-0000-0000-0000-000000000001',
  NULL
)
ON CONFLICT (user_id, bundle_id) DO NOTHING;
