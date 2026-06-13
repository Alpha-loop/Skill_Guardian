/*
  # Fix auth.identities identity_data for senior carer and manager demo accounts

  The seniorcarer@sunrisecare.com and manager@sunrisecare.com accounts were
  inserted with incomplete identity_data — missing the required email_verified
  and phone_verified fields that Supabase Auth expects for email/password logins.

  All other demo accounts have these fields. Their absence causes Supabase Auth
  to throw "Database error querying schema" during sign-in processing.

  This migration adds the missing fields to both broken identity rows.
*/

UPDATE auth.identities
SET identity_data = jsonb_build_object(
  'sub',            user_id::text,
  'email',          email,
  'email_verified', false,
  'phone_verified', false
)
WHERE user_id IN (
  '30000000-0000-0000-0000-000000000005',
  '30000000-0000-0000-0000-000000000006'
);
