/*
  # Add admin_expiry_summary notification type

  ## Summary
  Extends the notifications.type check constraint to include 'admin_expiry_summary',
  a new type used to notify organisation admins when one or more of their employees
  have training that is expiring soon or already overdue.

  ## Changes
  - Drops and recreates the check constraint on notifications.type to add the new value
  - No data loss — existing rows are untouched

  ## Security
  - No RLS changes needed; existing policies already cover org_admin reads by organisation_id
*/

ALTER TABLE notifications
  DROP CONSTRAINT IF EXISTS notifications_type_check;

ALTER TABLE notifications
  ADD CONSTRAINT notifications_type_check
  CHECK (type IN (
    'expiry_warning',
    'expiry_overdue',
    'certificate_approved',
    'certificate_rejected',
    'course_assigned',
    'admin_expiry_summary'
  ));
