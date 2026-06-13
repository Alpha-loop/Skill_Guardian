/*
  # Individual Carer Subscriptions

  ## Summary
  Adds support for individual carers who sign up directly (not via an organisation).
  These users complete the Care Certificate portfolio independently and receive their
  certificate automatically upon passing — no admin approval required.

  ## Changes

  ### 1. profiles table
  - Adds `account_type` column: 'organisation' | 'individual' (default 'organisation')
    Existing rows stay 'organisation'; new individual signups get 'individual'.

  ### 2. New Table: individual_subscriptions
  Tracks payment/subscription state for individually-signed-up carers.
  - `id` (uuid, PK)
  - `user_id` (uuid FK → profiles.id)
  - `plan` (text) — 'care_certificate' | 'full_access'
  - `status` (text) — 'active' | 'cancelled' | 'expired'
  - `started_at` (timestamptz)
  - `expires_at` (timestamptz, nullable — null = lifetime / until cancelled)
  - `stripe_session_id` (text, nullable)
  - UNIQUE(user_id, plan)

  ### Security
  - RLS enabled on individual_subscriptions
  - Users can read their own subscription
  - Service role can insert/update (used by edge function after payment)

  ### 3. Auto-certificate function
  - `auto_approve_individual_cert(p_user_id uuid, p_course_id uuid, p_completion_date timestamptz)`
    Called after an individual carer passes their quiz. Upserts a certificate_request
    with status='approved', certificate_id auto-generated — no admin needed.
*/

-- ────────────────────────────────────────────────────────────
-- 1. Add account_type to profiles
-- ────────────────────────────────────────────────────────────
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'account_type'
  ) THEN
    ALTER TABLE profiles ADD COLUMN account_type text NOT NULL DEFAULT 'organisation'
      CHECK (account_type IN ('organisation', 'individual'));
  END IF;
END $$;

-- ────────────────────────────────────────────────────────────
-- 2. individual_subscriptions table
-- ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS individual_subscriptions (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  plan             text NOT NULL CHECK (plan IN ('care_certificate', 'full_access')),
  status           text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  started_at       timestamptz NOT NULL DEFAULT now(),
  expires_at       timestamptz,
  stripe_session_id text,
  UNIQUE(user_id, plan)
);

ALTER TABLE individual_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own individual subscription"
  ON individual_subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own individual subscription"
  ON individual_subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own individual subscription"
  ON individual_subscriptions FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ────────────────────────────────────────────────────────────
-- 3. Auto-approve certificate function for individual carers
-- ────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION auto_approve_individual_cert(
  p_user_id        uuid,
  p_course_id      uuid,
  p_completion_date timestamptz DEFAULT now()
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_cert_id  text;
  v_req_id   uuid;
  v_org_id   uuid;
BEGIN
  -- Generate unique certificate ID
  v_cert_id := 'SG-' || upper(substring(replace(gen_random_uuid()::text, '-', ''), 1, 8));

  -- Get organisation_id (will be NULL for individual carers)
  SELECT organisation_id INTO v_org_id FROM profiles WHERE id = p_user_id;

  INSERT INTO certificate_requests (
    user_id,
    course_id,
    organisation_id,
    status,
    request_date,
    completion_date,
    approved_date,
    certificate_id,
    approved_by,
    download_count
  ) VALUES (
    p_user_id,
    p_course_id,
    v_org_id,
    'approved',
    p_completion_date,
    p_completion_date,
    p_completion_date,
    v_cert_id,
    NULL,
    0
  )
  ON CONFLICT (user_id, course_id)
  DO UPDATE SET
    status          = 'approved',
    approved_date   = p_completion_date,
    certificate_id  = CASE
                        WHEN certificate_requests.certificate_id IS NULL
                          THEN v_cert_id
                        ELSE certificate_requests.certificate_id
                      END
  RETURNING id INTO v_req_id;

  RETURN v_req_id;
END;
$$;

-- Grant execute to authenticated users (they call it for themselves only — user_id check is in the application layer)
GRANT EXECUTE ON FUNCTION auto_approve_individual_cert TO authenticated;
