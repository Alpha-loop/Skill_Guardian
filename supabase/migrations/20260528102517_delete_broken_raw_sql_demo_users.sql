/*
  # Delete broken raw-SQL demo auth users

  The seniorcarer and manager accounts were inserted directly into auth.users
  via raw SQL with hardcoded UUIDs (30000000-...). Supabase Auth requires users
  to be created through its API to maintain internal consistency. These broken
  entries cause "Database error querying schema" on every login attempt.

  This migration deletes the broken auth entries entirely so the edge function
  can recreate them properly via the Admin API. The profiles and course data
  will be restored by the edge function with new auth-generated UUIDs.
*/

-- Delete identities first (foreign key)
DELETE FROM auth.identities
WHERE user_id IN (
  '30000000-0000-0000-0000-000000000005',
  '30000000-0000-0000-0000-000000000006'
);

-- Delete sessions if any
DELETE FROM auth.sessions
WHERE user_id IN (
  '30000000-0000-0000-0000-000000000005',
  '30000000-0000-0000-0000-000000000006'
);

-- Delete refresh tokens (varchar column)
DELETE FROM auth.refresh_tokens
WHERE user_id = '30000000-0000-0000-0000-000000000005'
   OR user_id = '30000000-0000-0000-0000-000000000006';

-- Delete the broken auth users
DELETE FROM auth.users
WHERE id IN (
  '30000000-0000-0000-0000-000000000005',
  '30000000-0000-0000-0000-000000000006'
);

-- Delete dependent public data (edge function will recreate with correct UUIDs)
DELETE FROM public.user_courses
WHERE user_id IN (
  '30000000-0000-0000-0000-000000000005',
  '30000000-0000-0000-0000-000000000006'
);

DELETE FROM public.certificate_requests
WHERE user_id IN (
  '30000000-0000-0000-0000-000000000005',
  '30000000-0000-0000-0000-000000000006'
);

DELETE FROM public.notifications
WHERE user_id IN (
  '30000000-0000-0000-0000-000000000005',
  '30000000-0000-0000-0000-000000000006'
);

DELETE FROM public.profiles
WHERE id IN (
  '30000000-0000-0000-0000-000000000005',
  '30000000-0000-0000-0000-000000000006'
);
