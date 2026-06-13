/*
  # Seed Demo Organisation Data
  
  Creates a demo organisation for testing purposes.
  Note: Demo users must be created via Supabase Auth to get proper UUIDs.
  This migration creates the organisation only.
*/

INSERT INTO organisations (id, name, subdomain, contact_email, contact_person, subscription_tier, seat_limit, is_active, primary_color)
VALUES (
  '20000000-0000-0000-0000-000000000001',
  'Sunrise Care Home',
  'sunrise-care',
  'admin@sunrisecare.com',
  'Sarah Johnson',
  'standard',
  30,
  true,
  '#005EB8'
) ON CONFLICT (id) DO NOTHING;

INSERT INTO organisations (id, name, subdomain, contact_email, contact_person, subscription_tier, seat_limit, is_active, primary_color)
VALUES (
  '20000000-0000-0000-0000-000000000002',
  'Meadowbrook Supported Living',
  'meadowbrook',
  'manager@meadowbrook.com',
  'James Williams',
  'premium',
  50,
  true,
  '#1E6B8C'
) ON CONFLICT (id) DO NOTHING;
