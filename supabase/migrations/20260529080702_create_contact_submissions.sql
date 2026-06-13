/*
  # Create contact_submissions table

  ## Summary
  Stores every "Contact Us" form submission from the landing page.
  Acts as a reliable audit trail even if the email delivery fails.

  ## New Tables
  - `contact_submissions`
    - `id` (uuid, PK)
    - `name` (text) — full name of the sender
    - `email` (text) — reply-to address
    - `organisation` (text, nullable) — optional org name
    - `subject` (text) — selected subject category
    - `message` (text) — free-text message body
    - `created_at` (timestamptz)

  ## Security
  - RLS enabled
  - Public INSERT policy so unauthenticated visitors can submit
  - Super-admin SELECT policy so staff can read submissions from the dashboard
  - No public SELECT (privacy)
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name           text NOT NULL,
  email          text NOT NULL,
  organisation   text NOT NULL DEFAULT '',
  subject        text NOT NULL,
  message        text NOT NULL,
  created_at     timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone (including unauthenticated visitors) can insert a submission
CREATE POLICY "Public can submit contact forms"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only super admins can read submissions
CREATE POLICY "Super admins can read contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
        AND profiles.role = 'super_admin'
    )
  );
