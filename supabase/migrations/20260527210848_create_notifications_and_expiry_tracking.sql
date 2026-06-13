/*
  # Notifications and Training Expiry Tracking

  1. New Tables
    - `notifications`
      - Per-user in-app notifications (expiry warnings, certificate approvals, etc.)
      - type: 'expiry_warning' | 'expiry_overdue' | 'certificate_approved' | 'certificate_rejected'
      - read: bool (dismissed/read flag)
      - expires_at: when the underlying certificate expires (for ordering/display)
      - related_course_id: optional FK to courses

  2. New View
    - `training_expiry_status` — joins user_courses + certificate_requests + courses
      to calculate expiry date and days remaining for every passed course that has
      an expiry_months value. Used by the edge function and the dashboard.

  3. Security
    - RLS enabled on notifications
    - Employees: read/update own notifications
    - Org admins: read notifications for their org members
    - Super admins: read all
    - Edge function (service role): insert/update all
*/

-- ── notifications table ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  organisation_id uuid REFERENCES organisations(id) ON DELETE CASCADE,
  type            text NOT NULL CHECK (type IN ('expiry_warning','expiry_overdue','certificate_approved','certificate_rejected','course_assigned')),
  title           text NOT NULL,
  message         text NOT NULL,
  related_course_id uuid REFERENCES courses(id) ON DELETE SET NULL,
  read            boolean NOT NULL DEFAULT false,
  created_at      timestamptz NOT NULL DEFAULT now(),
  expires_on      timestamptz
);

CREATE INDEX IF NOT EXISTS notifications_user_id_idx ON notifications(user_id);
CREATE INDEX IF NOT EXISTS notifications_org_idx ON notifications(organisation_id);
CREATE INDEX IF NOT EXISTS notifications_read_idx ON notifications(user_id, read);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Employees can read and mark-read their own notifications
CREATE POLICY "Users can read own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can mark own notifications read"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Org admins can read notifications for their organisation members
CREATE POLICY "Org admins can read org notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (
    organisation_id IN (
      SELECT organisation_id FROM profiles
      WHERE id = auth.uid() AND role = 'org_admin'
    )
  );

-- Super admins can read all
CREATE POLICY "Super admins can read all notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'super_admin'
    )
  );

-- Service role (edge functions) can insert notifications
CREATE POLICY "Service role can insert notifications"
  ON notifications FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update notifications"
  ON notifications FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ── training_expiry_status view ───────────────────────────────────────────────
-- Calculates expiry date for every passed course with expiry_months set.
-- Also shows the approved certificate date if one exists.
CREATE OR REPLACE VIEW training_expiry_status AS
SELECT
  uc.user_id,
  p.organisation_id,
  p.first_name,
  p.last_name,
  p.email,
  c.id                                                AS course_id,
  c.title                                             AS course_title,
  c.expiry_months,
  uc.completed_at,
  cr.approved_date                                    AS cert_approved_date,
  -- Use certificate approval date if available, otherwise course completion date
  COALESCE(cr.approved_date, uc.completed_at)         AS effective_date,
  COALESCE(cr.approved_date, uc.completed_at)
    + (c.expiry_months || ' months')::interval        AS expires_at,
  EXTRACT(DAY FROM (
    COALESCE(cr.approved_date, uc.completed_at)
    + (c.expiry_months || ' months')::interval
    - now()
  ))::integer                                         AS days_until_expiry
FROM user_courses uc
JOIN profiles p    ON p.id    = uc.user_id
JOIN courses c     ON c.id    = uc.course_id
LEFT JOIN certificate_requests cr
       ON cr.user_id = uc.user_id
      AND cr.course_id = uc.course_id
      AND cr.status = 'approved'
WHERE uc.status = 'passed'
  AND c.expiry_months IS NOT NULL
  AND c.expiry_months > 0
  AND COALESCE(cr.approved_date, uc.completed_at) IS NOT NULL;
