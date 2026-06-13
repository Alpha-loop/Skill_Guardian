/*
  # Make certificate_requests.organisation_id nullable for individual carers

  ## Summary
  Individual carers have no organisation_id (they signed up directly).
  The certificate_requests table had organisation_id as NOT NULL, which
  prevented the auto_approve_individual_cert function from inserting records
  for individual carers.

  ## Changes
  - ALTER certificate_requests.organisation_id to allow NULL values
  - Existing rows are unaffected (they all have valid organisation_ids)
*/

ALTER TABLE certificate_requests
  ALTER COLUMN organisation_id DROP NOT NULL;
