/*
  # Reseed course assignments for senior carer and manager demo accounts

  After recreating seniorcarer@sunrisecare.com and manager@sunrisecare.com
  via the Admin API (new UUIDs), their course assignments need to be restored.

  New UUIDs:
    - seniorcarer: 3c27c7f4-2c9b-42a2-91b9-805b7eda10a6
    - manager:     cfc97ad4-e671-4036-a627-c3d58008b351
*/

-- ── Senior Carer (Priya Singh) ────────────────────────────────────────────────
INSERT INTO user_courses (user_id, course_id, status, started_at, quiz_score, quiz_attempts, completed_at, review_count)
VALUES
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', '10000000-0000-0000-0000-000000000001', 'passed',      now()-interval '20 days', 92, 1, now()-interval '20 days', 3),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', '10000000-0000-0000-0000-000000000002', 'passed',      now()-interval '18 days', 88, 1, now()-interval '18 days', 2),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', '10000000-0000-0000-0000-000000000003', 'passed',      now()-interval '15 days', 84, 2, now()-interval '15 days', 3),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', '10000000-0000-0000-0000-000000000004', 'not_started', NULL, NULL, 0, NULL, 0),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', '10000000-0000-0000-0000-000000000005', 'in_progress', now()-interval '3 days',  NULL, 0, NULL, 1),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', '10000000-0000-0000-0000-000000000006', 'passed',      now()-interval '12 days', 96, 1, now()-interval '12 days', 2),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', '10000000-0000-0000-0000-000000000007', 'not_started', NULL, NULL, 0, NULL, 0),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', '10000000-0000-0000-0000-000000000008', 'not_started', NULL, NULL, 0, NULL, 0),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', '10000000-0000-0000-0000-000000000009', 'not_started', NULL, NULL, 0, NULL, 0),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', '10000000-0000-0000-0000-000000000010', 'not_started', NULL, NULL, 0, NULL, 0),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', '10000000-0000-0000-0000-000000000011', 'not_started', NULL, NULL, 0, NULL, 0),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', '10000000-0000-0000-0000-000000000012', 'not_started', NULL, NULL, 0, NULL, 0),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', '10000000-0000-0000-0000-000000000013', 'not_started', NULL, NULL, 0, NULL, 0),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', '10000000-0000-0000-0000-000000000014', 'not_started', NULL, NULL, 0, NULL, 0),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', '10000000-0000-0000-0000-000000000015', 'not_started', NULL, NULL, 0, NULL, 0),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', '10000000-0000-0000-0000-000000000016', 'passed',      now()-interval '8 days',  88, 1, now()-interval '8 days',  2),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', '10000000-0000-0000-0000-000000000017', 'passed',      now()-interval '6 days',  84, 1, now()-interval '6 days',  2),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', '10000000-0000-0000-0000-000000000018', 'not_started', NULL, NULL, 0, NULL, 0),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', '10000000-0000-0000-0000-000000000019', 'not_started', NULL, NULL, 0, NULL, 0),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', '10000000-0000-0000-0000-000000000020', 'not_started', NULL, NULL, 0, NULL, 0),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', 'a0000000-0000-0000-0000-000000000002', 'in_progress', now()-interval '2 days',  NULL, 0, NULL, 1),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', 'a0000000-0000-0000-0000-000000000003', 'not_started', NULL, NULL, 0, NULL, 0),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', 'a0000000-0000-0000-0000-000000000005', 'not_started', NULL, NULL, 0, NULL, 0),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', 'a0000000-0000-0000-0000-000000000006', 'not_started', NULL, NULL, 0, NULL, 0),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', 'a0000000-0000-0000-0000-000000000007', 'not_started', NULL, NULL, 0, NULL, 0),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', 'a0000000-0000-0000-0000-000000000008', 'not_started', NULL, NULL, 0, NULL, 0),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', 'a0000000-0000-0000-0000-000000000009', 'not_started', NULL, NULL, 0, NULL, 0),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', 'a0000000-0000-0000-0000-000000000010', 'not_started', NULL, NULL, 0, NULL, 0),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', 'a0000000-0000-0000-0000-000000000013', 'not_started', NULL, NULL, 0, NULL, 0),
  ('3c27c7f4-2c9b-42a2-91b9-805b7eda10a6', 'a0000000-0000-0000-0000-000000000015', 'not_started', NULL, NULL, 0, NULL, 0)
ON CONFLICT (user_id, course_id) DO NOTHING;

-- ── Manager (David Brooks) ────────────────────────────────────────────────────
INSERT INTO user_courses (user_id, course_id, status, started_at, quiz_score, quiz_attempts, completed_at, review_count)
VALUES
  ('cfc97ad4-e671-4036-a627-c3d58008b351', '10000000-0000-0000-0000-000000000001', 'passed',      now()-interval '30 days', 96, 1, now()-interval '30 days', 3),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', '10000000-0000-0000-0000-000000000002', 'passed',      now()-interval '28 days', 92, 1, now()-interval '28 days', 3),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', '10000000-0000-0000-0000-000000000003', 'passed',      now()-interval '25 days', 88, 1, now()-interval '25 days', 2),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', '10000000-0000-0000-0000-000000000004', 'passed',      now()-interval '22 days', 84, 1, now()-interval '22 days', 2),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', '10000000-0000-0000-0000-000000000005', 'passed',      now()-interval '20 days', 80, 2, now()-interval '20 days', 2),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', '10000000-0000-0000-0000-000000000006', 'passed',      now()-interval '18 days', 92, 1, now()-interval '18 days', 2),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', '10000000-0000-0000-0000-000000000007', 'passed',      now()-interval '15 days', 88, 1, now()-interval '15 days', 3),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', '10000000-0000-0000-0000-000000000008', 'not_started', NULL, NULL, 0, NULL, 0),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', '10000000-0000-0000-0000-000000000009', 'in_progress', now()-interval '2 days',  NULL, 0, NULL, 1),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', '10000000-0000-0000-0000-000000000010', 'not_started', NULL, NULL, 0, NULL, 0),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', '10000000-0000-0000-0000-000000000011', 'not_started', NULL, NULL, 0, NULL, 0),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', '10000000-0000-0000-0000-000000000012', 'not_started', NULL, NULL, 0, NULL, 0),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', '10000000-0000-0000-0000-000000000013', 'not_started', NULL, NULL, 0, NULL, 0),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', '10000000-0000-0000-0000-000000000014', 'not_started', NULL, NULL, 0, NULL, 0),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', 'a0000000-0000-0000-0000-000000000001', 'in_progress', now()-interval '4 days',  NULL, 0, NULL, 2),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', 'a0000000-0000-0000-0000-000000000002', 'passed',      now()-interval '12 days', 92, 1, now()-interval '12 days', 3),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', 'a0000000-0000-0000-0000-000000000003', 'not_started', NULL, NULL, 0, NULL, 0),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', 'a0000000-0000-0000-0000-000000000004', 'not_started', NULL, NULL, 0, NULL, 0),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', 'a0000000-0000-0000-0000-000000000005', 'not_started', NULL, NULL, 0, NULL, 0),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', 'a0000000-0000-0000-0000-000000000006', 'not_started', NULL, NULL, 0, NULL, 0),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', 'a0000000-0000-0000-0000-000000000007', 'not_started', NULL, NULL, 0, NULL, 0),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', 'a0000000-0000-0000-0000-000000000008', 'not_started', NULL, NULL, 0, NULL, 0),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', 'a0000000-0000-0000-0000-000000000009', 'not_started', NULL, NULL, 0, NULL, 0),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', 'a0000000-0000-0000-0000-000000000010', 'not_started', NULL, NULL, 0, NULL, 0),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', 'a0000000-0000-0000-0000-000000000011', 'passed',      now()-interval '10 days', 90, 1, now()-interval '10 days', 3),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', 'a0000000-0000-0000-0000-000000000012', 'not_started', NULL, NULL, 0, NULL, 0),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', 'a0000000-0000-0000-0000-000000000013', 'not_started', NULL, NULL, 0, NULL, 0),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', 'a0000000-0000-0000-0000-000000000014', 'not_started', NULL, NULL, 0, NULL, 0),
  ('cfc97ad4-e671-4036-a627-c3d58008b351', 'a0000000-0000-0000-0000-000000000015', 'not_started', NULL, NULL, 0, NULL, 0)
ON CONFLICT (user_id, course_id) DO NOTHING;

-- Certificate for the manager's completed Duty of Candour
INSERT INTO certificate_requests (user_id, course_id, organisation_id, completion_date, request_date, status)
VALUES (
  'cfc97ad4-e671-4036-a627-c3d58008b351',
  'a0000000-0000-0000-0000-000000000002',
  '20000000-0000-0000-0000-000000000001',
  now()-interval '12 days',
  now()-interval '1 day',
  'pending'
)
ON CONFLICT (user_id, course_id) DO NOTHING;
