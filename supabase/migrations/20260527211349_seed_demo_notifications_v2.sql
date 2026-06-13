/*
  # Seed Demo Notifications (v2 — correct user IDs)

  User IDs:
  - carer@sunrisecare.com       → 1f36b3a5-1385-4e43-9405-c5144fa028ba
  - nurse@sunrisecare.com       → 1f3c425b-3ff0-4e91-8c7c-32377044bfd8
  - seniorcarer@sunrisecare.com → 30000000-0000-0000-0000-000000000005
  - manager@sunrisecare.com     → 30000000-0000-0000-0000-000000000006
*/

-- Carer: Safeguarding Adults Level 1 — 30-day warning
INSERT INTO notifications (user_id, organisation_id, type, title, message, related_course_id, read, created_at, expires_on)
SELECT
  '1f36b3a5-1385-4e43-9405-c5144fa028ba',
  '20000000-0000-0000-0000-000000000001',
  'expiry_warning',
  'Safeguarding Adults Level 1 expires in 30 days',
  'Your Safeguarding Adults Level 1 certification is due for renewal in 30 days. Book your refresher training to stay compliant.',
  '10000000-0000-0000-0000-000000000001',
  false,
  now() - interval '1 hour',
  now() + interval '30 days'
WHERE NOT EXISTS (
  SELECT 1 FROM notifications
  WHERE user_id = '1f36b3a5-1385-4e43-9405-c5144fa028ba'
    AND related_course_id = '10000000-0000-0000-0000-000000000001'
    AND type = 'expiry_warning'
);

-- Carer: Moving and Handling — 7-day urgent warning
INSERT INTO notifications (user_id, organisation_id, type, title, message, related_course_id, read, created_at, expires_on)
SELECT
  '1f36b3a5-1385-4e43-9405-c5144fa028ba',
  '20000000-0000-0000-0000-000000000001',
  'expiry_warning',
  'Moving and Handling expires in 7 days',
  'Your Moving and Handling certification is due for renewal in 7 days. Book your refresher training immediately to stay compliant.',
  '10000000-0000-0000-0000-000000000006',
  false,
  now() - interval '30 minutes',
  now() + interval '7 days'
WHERE NOT EXISTS (
  SELECT 1 FROM notifications
  WHERE user_id = '1f36b3a5-1385-4e43-9405-c5144fa028ba'
    AND related_course_id = '10000000-0000-0000-0000-000000000006'
    AND type = 'expiry_warning'
);

-- Carer: Dementia Awareness — 60-day warning (already read)
INSERT INTO notifications (user_id, organisation_id, type, title, message, related_course_id, read, created_at, expires_on)
SELECT
  '1f36b3a5-1385-4e43-9405-c5144fa028ba',
  '20000000-0000-0000-0000-000000000001',
  'expiry_warning',
  'Dementia Awareness expires in 60 days',
  'Your Dementia Awareness certification is due for renewal in 60 days. Book your refresher training to stay compliant.',
  '10000000-0000-0000-0000-000000000016',
  true,
  now() - interval '5 days',
  now() + interval '60 days'
WHERE NOT EXISTS (
  SELECT 1 FROM notifications
  WHERE user_id = '1f36b3a5-1385-4e43-9405-c5144fa028ba'
    AND related_course_id = '10000000-0000-0000-0000-000000000016'
    AND type = 'expiry_warning'
);

-- Nurse: Basic Life Support — 60-day warning
INSERT INTO notifications (user_id, organisation_id, type, title, message, related_course_id, read, created_at, expires_on)
SELECT
  '1f3c425b-3ff0-4e91-8c7c-32377044bfd8',
  '20000000-0000-0000-0000-000000000001',
  'expiry_warning',
  'Basic Life Support (BLS) expires in 60 days',
  'Your Basic Life Support (BLS) certification is due for renewal in 60 days. Book your refresher training to stay compliant.',
  '10000000-0000-0000-0000-000000000007',
  false,
  now() - interval '3 hours',
  now() + interval '60 days'
WHERE NOT EXISTS (
  SELECT 1 FROM notifications
  WHERE user_id = '1f3c425b-3ff0-4e91-8c7c-32377044bfd8'
    AND related_course_id = '10000000-0000-0000-0000-000000000007'
    AND type = 'expiry_warning'
);

-- Nurse: NMC Code and Revalidation — 30-day warning
INSERT INTO notifications (user_id, organisation_id, type, title, message, related_course_id, read, created_at, expires_on)
SELECT
  '1f3c425b-3ff0-4e91-8c7c-32377044bfd8',
  '20000000-0000-0000-0000-000000000001',
  'expiry_warning',
  'NMC Code and Revalidation expires in 30 days',
  'Your NMC Code and Revalidation certification is due for renewal in 30 days. Complete your refresher to maintain NMC compliance.',
  '10000000-0000-0000-0000-000000000029',
  false,
  now() - interval '2 hours',
  now() + interval '30 days'
WHERE NOT EXISTS (
  SELECT 1 FROM notifications
  WHERE user_id = '1f3c425b-3ff0-4e91-8c7c-32377044bfd8'
    AND related_course_id = '10000000-0000-0000-0000-000000000029'
    AND type = 'expiry_warning'
);

-- Senior Carer: Safeguarding Adults Level 1 — 30-day warning
INSERT INTO notifications (user_id, organisation_id, type, title, message, related_course_id, read, created_at, expires_on)
SELECT
  '30000000-0000-0000-0000-000000000005',
  '20000000-0000-0000-0000-000000000001',
  'expiry_warning',
  'Safeguarding Adults Level 1 expires in 30 days',
  'Your Safeguarding Adults Level 1 certification is due for renewal in 30 days. Book your refresher training to stay compliant.',
  '10000000-0000-0000-0000-000000000001',
  false,
  now() - interval '45 minutes',
  now() + interval '30 days'
WHERE NOT EXISTS (
  SELECT 1 FROM notifications
  WHERE user_id = '30000000-0000-0000-0000-000000000005'
    AND related_course_id = '10000000-0000-0000-0000-000000000001'
    AND type = 'expiry_warning'
);

-- Senior Carer: Moving and Handling — overdue
INSERT INTO notifications (user_id, organisation_id, type, title, message, related_course_id, read, created_at, expires_on)
SELECT
  '30000000-0000-0000-0000-000000000005',
  '20000000-0000-0000-0000-000000000001',
  'expiry_overdue',
  'Training overdue: Moving and Handling',
  'Your Moving and Handling certification has expired. Complete your refresher training as soon as possible to maintain CQC compliance.',
  '10000000-0000-0000-0000-000000000006',
  false,
  now() - interval '1 day',
  now() - interval '2 days'
WHERE NOT EXISTS (
  SELECT 1 FROM notifications
  WHERE user_id = '30000000-0000-0000-0000-000000000005'
    AND related_course_id = '10000000-0000-0000-0000-000000000006'
    AND type = 'expiry_overdue'
);

-- Manager: Duty of Candour — overdue
INSERT INTO notifications (user_id, organisation_id, type, title, message, related_course_id, read, created_at, expires_on)
SELECT
  '30000000-0000-0000-0000-000000000006',
  '20000000-0000-0000-0000-000000000001',
  'expiry_overdue',
  'Training overdue: Duty of Candour (Regulation 20)',
  'Your Duty of Candour (Regulation 20) certification has expired. Complete your refresher training as soon as possible to maintain CQC compliance.',
  'a0000000-0000-0000-0000-000000000002',
  false,
  now() - interval '2 hours',
  now() - interval '5 days'
WHERE NOT EXISTS (
  SELECT 1 FROM notifications
  WHERE user_id = '30000000-0000-0000-0000-000000000006'
    AND related_course_id = 'a0000000-0000-0000-0000-000000000002'
    AND type = 'expiry_overdue'
);

-- Manager: Supervision and Appraisal — 30-day warning
INSERT INTO notifications (user_id, organisation_id, type, title, message, related_course_id, read, created_at, expires_on)
SELECT
  '30000000-0000-0000-0000-000000000006',
  '20000000-0000-0000-0000-000000000001',
  'expiry_warning',
  'Supervision and Appraisal for Managers expires in 30 days',
  'Your Supervision and Appraisal for Managers certification is due for renewal in 30 days. Book your refresher training to stay compliant.',
  'a0000000-0000-0000-0000-000000000011',
  false,
  now() - interval '1 hour',
  now() + interval '30 days'
WHERE NOT EXISTS (
  SELECT 1 FROM notifications
  WHERE user_id = '30000000-0000-0000-0000-000000000006'
    AND related_course_id = 'a0000000-0000-0000-0000-000000000011'
    AND type = 'expiry_warning'
);
