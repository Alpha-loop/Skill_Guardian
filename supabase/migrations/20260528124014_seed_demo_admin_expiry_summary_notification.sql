/*
  # Seed demo admin expiry summary notification

  Inserts a sample 'admin_expiry_summary' notification for the demo org admin (Sarah Johnson)
  so the new notification type is visible immediately after deployment.

  Uses INSERT...WHERE NOT EXISTS to remain idempotent.
*/

INSERT INTO notifications (user_id, organisation_id, type, title, message, related_course_id, read, created_at)
SELECT
  '1524f52f-e647-420d-a9eb-340964d6c1b7',
  '20000000-0000-0000-0000-000000000001',
  'admin_expiry_summary',
  'Training compliance alert — 2026-05-28',
  'OVERDUE (2):
  • James Carter — Safeguarding Adults (expired)
  • Emily Patel — Fire Safety (expired)

DUE FOR RENEWAL (3):
  • James Carter — Basic Life Support (in 6 days)
  • Emily Patel — Moving & Handling (in 14 days)
  • Tom Hughes — Medication Administration (in 28 days)',
  NULL,
  false,
  now()
WHERE NOT EXISTS (
  SELECT 1 FROM notifications
  WHERE user_id = '1524f52f-e647-420d-a9eb-340964d6c1b7'
    AND type = 'admin_expiry_summary'
    AND title = 'Training compliance alert — 2026-05-28'
);
