/*
  # Add Demo Users: Senior Carer and Care Manager
  
  Adds two new demo employees to Sunrise Care Home:
    - seniorcarer@sunrisecare.com  — Senior Carer
    - manager@sunrisecare.com      — Care Manager (professional_role = manager)
  
  Also assigns role-appropriate courses to the existing carer (Tom Davies),
  the new senior carer, and the new manager so each dashboard shows
  only the courses relevant to their professional role.
  
  Password for all accounts: Demo1234!
*/

-- ── Auth users ────────────────────────────────────────────────────────────────
INSERT INTO auth.users (
  id, instance_id, email, encrypted_password, email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data, created_at, updated_at, role, aud
) VALUES
  (
    '30000000-0000-0000-0000-000000000005',
    '00000000-0000-0000-0000-000000000000',
    'seniorcarer@sunrisecare.com',
    crypt('Demo1234!', gen_salt('bf')),
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"first_name": "Priya", "last_name": "Singh", "role": "employee"}',
    now(), now(), 'authenticated', 'authenticated'
  ),
  (
    '30000000-0000-0000-0000-000000000006',
    '00000000-0000-0000-0000-000000000000',
    'manager@sunrisecare.com',
    crypt('Demo1234!', gen_salt('bf')),
    now(),
    '{"provider": "email", "providers": ["email"]}',
    '{"first_name": "David", "last_name": "Brooks", "role": "employee"}',
    now(), now(), 'authenticated', 'authenticated'
  )
ON CONFLICT (id) DO NOTHING;

-- ── Identities ────────────────────────────────────────────────────────────────
INSERT INTO auth.identities (
  id, user_id, provider_id, identity_data, provider,
  last_sign_in_at, created_at, updated_at
) VALUES
  (
    '30000000-0000-0000-0000-000000000005',
    '30000000-0000-0000-0000-000000000005',
    'seniorcarer@sunrisecare.com',
    '{"sub": "30000000-0000-0000-0000-000000000005", "email": "seniorcarer@sunrisecare.com"}',
    'email', now(), now(), now()
  ),
  (
    '30000000-0000-0000-0000-000000000006',
    '30000000-0000-0000-0000-000000000006',
    'manager@sunrisecare.com',
    '{"sub": "30000000-0000-0000-0000-000000000006", "email": "manager@sunrisecare.com"}',
    'email', now(), now(), now()
  )
ON CONFLICT (id) DO NOTHING;

-- ── Profiles ─────────────────────────────────────────────────────────────────
INSERT INTO profiles (id, organisation_id, email, first_name, last_name, role, professional_role, is_active)
VALUES
  (
    '30000000-0000-0000-0000-000000000005',
    '20000000-0000-0000-0000-000000000001',
    'seniorcarer@sunrisecare.com',
    'Priya', 'Singh',
    'employee', 'senior_carer', true
  ),
  (
    '30000000-0000-0000-0000-000000000006',
    '20000000-0000-0000-0000-000000000001',
    'manager@sunrisecare.com',
    'David', 'Brooks',
    'employee', 'manager', true
  )
ON CONFLICT (id) DO UPDATE SET
  organisation_id   = EXCLUDED.organisation_id,
  email             = EXCLUDED.email,
  first_name        = EXCLUDED.first_name,
  last_name         = EXCLUDED.last_name,
  role              = EXCLUDED.role,
  professional_role = EXCLUDED.professional_role,
  is_active         = EXCLUDED.is_active;

-- ── Course assignments — existing Carer (Tom Davies) ────────────────────────
-- Sees: all_staff + carers_only + management all_staff
INSERT INTO user_courses (user_id, course_id, status, started_at, quiz_score, quiz_attempts, completed_at, review_count)
VALUES
  ('1f36b3a5-1385-4e43-9405-c5144fa028ba', '10000000-0000-0000-0000-000000000001', 'passed',      now()-interval '14 days', 88, 1, now()-interval '14 days', 3),
  ('1f36b3a5-1385-4e43-9405-c5144fa028ba', '10000000-0000-0000-0000-000000000002', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('1f36b3a5-1385-4e43-9405-c5144fa028ba', '10000000-0000-0000-0000-000000000003', 'in_progress', now()-interval '2 days',  NULL, 0, NULL, 1),
  ('1f36b3a5-1385-4e43-9405-c5144fa028ba', '10000000-0000-0000-0000-000000000004', 'passed',      now()-interval '10 days', 84, 2, now()-interval '10 days', 2),
  ('1f36b3a5-1385-4e43-9405-c5144fa028ba', '10000000-0000-0000-0000-000000000005', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('1f36b3a5-1385-4e43-9405-c5144fa028ba', '10000000-0000-0000-0000-000000000006', 'passed',      now()-interval '7 days',  92, 1, now()-interval '7 days',  2),
  ('1f36b3a5-1385-4e43-9405-c5144fa028ba', '10000000-0000-0000-0000-000000000007', 'in_progress', now()-interval '1 day',   NULL, 0, NULL, 1),
  ('1f36b3a5-1385-4e43-9405-c5144fa028ba', '10000000-0000-0000-0000-000000000008', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('1f36b3a5-1385-4e43-9405-c5144fa028ba', '10000000-0000-0000-0000-000000000009', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('1f36b3a5-1385-4e43-9405-c5144fa028ba', '10000000-0000-0000-0000-000000000010', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('1f36b3a5-1385-4e43-9405-c5144fa028ba', '10000000-0000-0000-0000-000000000011', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('1f36b3a5-1385-4e43-9405-c5144fa028ba', '10000000-0000-0000-0000-000000000012', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('1f36b3a5-1385-4e43-9405-c5144fa028ba', '10000000-0000-0000-0000-000000000013', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('1f36b3a5-1385-4e43-9405-c5144fa028ba', '10000000-0000-0000-0000-000000000014', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('1f36b3a5-1385-4e43-9405-c5144fa028ba', '10000000-0000-0000-0000-000000000015', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('1f36b3a5-1385-4e43-9405-c5144fa028ba', '10000000-0000-0000-0000-000000000016', 'passed',      now()-interval '5 days',  80, 1, now()-interval '5 days',  2),
  ('1f36b3a5-1385-4e43-9405-c5144fa028ba', '10000000-0000-0000-0000-000000000017', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('1f36b3a5-1385-4e43-9405-c5144fa028ba', '10000000-0000-0000-0000-000000000018', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('1f36b3a5-1385-4e43-9405-c5144fa028ba', '10000000-0000-0000-0000-000000000019', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('1f36b3a5-1385-4e43-9405-c5144fa028ba', '10000000-0000-0000-0000-000000000020', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('1f36b3a5-1385-4e43-9405-c5144fa028ba', 'a0000000-0000-0000-0000-000000000003', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('1f36b3a5-1385-4e43-9405-c5144fa028ba', 'a0000000-0000-0000-0000-000000000010', 'not_started', NULL,                     NULL, 0, NULL, 0)
ON CONFLICT (user_id, course_id) DO NOTHING;

-- ── Course assignments — Senior Carer (Priya Singh) ──────────────────────────
-- Sees: all_staff + carers_only + managers_and_seniors + management all_staff
INSERT INTO user_courses (user_id, course_id, status, started_at, quiz_score, quiz_attempts, completed_at, review_count)
VALUES
  ('30000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000001', 'passed',      now()-interval '20 days', 92, 1, now()-interval '20 days', 3),
  ('30000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000002', 'passed',      now()-interval '18 days', 88, 1, now()-interval '18 days', 2),
  ('30000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000003', 'passed',      now()-interval '15 days', 84, 2, now()-interval '15 days', 3),
  ('30000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000004', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000005', 'in_progress', now()-interval '3 days',  NULL, 0, NULL, 1),
  ('30000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000006', 'passed',      now()-interval '12 days', 96, 1, now()-interval '12 days', 2),
  ('30000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000007', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000008', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000009', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000010', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000011', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000012', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000013', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000014', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000015', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000016', 'passed',      now()-interval '8 days',  88, 1, now()-interval '8 days',  2),
  ('30000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000017', 'passed',      now()-interval '6 days',  84, 1, now()-interval '6 days',  2),
  ('30000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000018', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000019', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000005', '10000000-0000-0000-0000-000000000020', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000002', 'in_progress', now()-interval '2 days',  NULL, 0, NULL, 1),
  ('30000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000003', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000005', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000006', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000007', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000008', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000009', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000010', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000013', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000005', 'a0000000-0000-0000-0000-000000000015', 'not_started', NULL,                     NULL, 0, NULL, 0)
ON CONFLICT (user_id, course_id) DO NOTHING;

-- ── Course assignments — Manager (David Brooks) ──────────────────────────────
-- Sees: all_staff + managers_only + managers_and_seniors
INSERT INTO user_courses (user_id, course_id, status, started_at, quiz_score, quiz_attempts, completed_at, review_count)
VALUES
  ('30000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000001', 'passed',      now()-interval '30 days', 96, 1, now()-interval '30 days', 3),
  ('30000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000002', 'passed',      now()-interval '28 days', 92, 1, now()-interval '28 days', 3),
  ('30000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000003', 'passed',      now()-interval '25 days', 88, 1, now()-interval '25 days', 2),
  ('30000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000004', 'passed',      now()-interval '22 days', 84, 1, now()-interval '22 days', 2),
  ('30000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000005', 'passed',      now()-interval '20 days', 80, 2, now()-interval '20 days', 2),
  ('30000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000006', 'passed',      now()-interval '18 days', 92, 1, now()-interval '18 days', 2),
  ('30000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000007', 'passed',      now()-interval '15 days', 88, 1, now()-interval '15 days', 3),
  ('30000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000008', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000009', 'in_progress', now()-interval '2 days',  NULL, 0, NULL, 1),
  ('30000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000010', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000011', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000012', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000013', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000006', '10000000-0000-0000-0000-000000000014', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000001', 'in_progress', now()-interval '4 days',  NULL, 0, NULL, 2),
  ('30000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000002', 'passed',      now()-interval '12 days', 92, 1, now()-interval '12 days', 3),
  ('30000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000003', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000004', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000005', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000006', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000007', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000008', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000009', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000010', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000011', 'passed',      now()-interval '10 days', 90, 1, now()-interval '10 days', 3),
  ('30000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000012', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000013', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000014', 'not_started', NULL,                     NULL, 0, NULL, 0),
  ('30000000-0000-0000-0000-000000000006', 'a0000000-0000-0000-0000-000000000015', 'not_started', NULL,                     NULL, 0, NULL, 0)
ON CONFLICT (user_id, course_id) DO NOTHING;

-- Certificate for the manager's completed Duty of Candour
INSERT INTO certificate_requests (user_id, course_id, organisation_id, completion_date, request_date, status)
VALUES (
  '30000000-0000-0000-0000-000000000006',
  'a0000000-0000-0000-0000-000000000002',
  '20000000-0000-0000-0000-000000000001',
  now()-interval '12 days',
  now()-interval '1 day',
  'pending'
)
ON CONFLICT (user_id, course_id) DO NOTHING;
