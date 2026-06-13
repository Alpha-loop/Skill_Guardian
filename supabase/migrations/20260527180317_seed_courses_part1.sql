/*
  # Seed SkillGuardian Course Data - Part 1
  
  ## Overview
  Seeds 30 accredited healthcare training courses covering:
  - Core Mandatory (12 courses)
  - Legal Requirements (2 courses)
  - Role-Based (6 courses)
  - Clinical Nurse Training (10 courses)
  
  Each course includes:
  - Course metadata (category, target role, expiry)
  - 8-12 flashcard questions
  - 8-10 quiz questions with 4 options
*/

-- Insert all 30 courses
INSERT INTO courses (id, organisation_id, category, title, description, target_role, expiry_months, is_active, created_by)
VALUES
  -- Core Mandatory
  ('10000000-0000-0000-0000-000000000001', NULL, 'core_mandatory', 'Safeguarding Adults Level 1', 'Understanding your duty to protect vulnerable adults from abuse, neglect, and exploitation. Covers the Care Act 2014 and reporting procedures.', 'all_staff', 12, true, NULL),
  ('10000000-0000-0000-0000-000000000002', NULL, 'core_mandatory', 'Safeguarding Children Level 1', 'Essential training for all staff on recognising and responding to child abuse. Covers Working Together to Safeguard Children guidance.', 'all_staff', 12, true, NULL),
  ('10000000-0000-0000-0000-000000000003', NULL, 'core_mandatory', 'Infection Prevention and Control', 'Standard precautions to prevent the spread of infection in care settings. Covers hand hygiene, PPE, and isolation procedures.', 'all_staff', 12, true, NULL),
  ('10000000-0000-0000-0000-000000000004', NULL, 'core_mandatory', 'Health and Safety', 'Workplace health and safety responsibilities under the Health and Safety at Work Act 1974. Covers risk assessment, incident reporting, and COSHH.', 'all_staff', 12, true, NULL),
  ('10000000-0000-0000-0000-000000000005', NULL, 'core_mandatory', 'Fire Safety', 'Fire prevention, evacuation procedures, and safe use of fire equipment in care settings. Covers PEEP plans for residents and staff.', 'all_staff', 12, true, NULL),
  ('10000000-0000-0000-0000-000000000006', NULL, 'core_mandatory', 'Moving and Handling', 'Safe moving and handling techniques to protect both staff and residents. Covers manual handling legislation, risk assessment, and equipment use.', 'all_staff', 12, true, NULL),
  ('10000000-0000-0000-0000-000000000007', NULL, 'core_mandatory', 'Basic Life Support (BLS)', 'Life-saving skills for cardiac arrest response including CPR and AED use. Covers adult and paediatric resuscitation guidelines.', 'all_staff', 12, true, NULL),
  ('10000000-0000-0000-0000-000000000008', NULL, 'core_mandatory', 'Medication Management (Basic)', 'Safe administration and handling of medications in care settings. Covers the 5 rights of medication, storage, and documentation.', 'all_staff', 12, true, NULL),
  ('10000000-0000-0000-0000-000000000009', NULL, 'core_mandatory', 'Mental Capacity Act (MCA) & DoLS', 'Understanding the Mental Capacity Act 2005 and Deprivation of Liberty Safeguards. Covers capacity assessment, best interests decisions, and LPS.', 'all_staff', 12, true, NULL),
  ('10000000-0000-0000-0000-000000000010', NULL, 'core_mandatory', 'Information Governance & GDPR', 'Protecting personal and sensitive information in healthcare. Covers GDPR principles, data subject rights, and reporting data breaches.', 'all_staff', 12, true, NULL),
  ('10000000-0000-0000-0000-000000000011', NULL, 'core_mandatory', 'Equality, Diversity & Human Rights', 'Promoting equality, challenging discrimination, and upholding human rights in care. Covers the Equality Act 2010 and the Human Rights Act 1998.', 'all_staff', 24, true, NULL),
  ('10000000-0000-0000-0000-000000000012', NULL, 'core_mandatory', 'The Care Certificate (15 Standards)', 'The fundamental standards of care that all new care workers must achieve. Covers all 15 Care Certificate standards as mandated by CQC.', 'all_staff', NULL, true, NULL),
  -- Legal Requirements
  ('10000000-0000-0000-0000-000000000013', NULL, 'legal_requirement', 'Oliver McGowan Training - Tier 1', 'Mandatory training on learning disability and autism awareness for all health and care staff. Covers understanding, communication, and best practice.', 'all_staff', 36, true, NULL),
  ('10000000-0000-0000-0000-000000000014', NULL, 'legal_requirement', 'Oliver McGowan Training - Tier 2', 'Enhanced mandatory training for staff who provide direct care to people with learning disabilities and autism. Includes lived experience perspectives.', 'all_staff', 36, true, NULL),
  -- Role-Based
  ('10000000-0000-0000-0000-000000000015', NULL, 'role_based', 'Food Hygiene', 'Safe food handling, storage, and preparation in care settings. Covers Food Safety and Hygiene Regulations 2013 and HACCP principles.', 'carers_only', 12, true, NULL),
  ('10000000-0000-0000-0000-000000000016', NULL, 'role_based', 'Dementia Awareness', 'Understanding dementia, its impact on individuals, and person-centred approaches to care. Covers communication strategies and supporting wellbeing.', 'carers_only', 24, true, NULL),
  ('10000000-0000-0000-0000-000000000017', NULL, 'role_based', 'Falls Prevention and Management', 'Identifying fall risk factors and implementing prevention strategies. Covers post-fall assessment, documentation, and learning from incidents.', 'carers_only', 12, true, NULL),
  ('10000000-0000-0000-0000-000000000018', NULL, 'role_based', 'Pressure Area Care', 'Preventing and managing pressure ulcers in vulnerable individuals. Covers the SSKIN bundle, risk assessment tools, and documentation.', 'carers_only', 12, true, NULL),
  ('10000000-0000-0000-0000-000000000019', NULL, 'role_based', 'Communication and Duty of Candour', 'Effective communication in care and the legal duty to be open and honest when things go wrong. Covers the Duty of Candour Regulation.', 'carers_only', 24, true, NULL),
  ('10000000-0000-0000-0000-000000000020', NULL, 'role_based', 'Conflict Resolution', 'De-escalating challenging behaviour and managing conflict safely in care environments. Covers verbal and non-verbal techniques.', 'carers_only', 12, true, NULL),
  -- Clinical Nurse
  ('10000000-0000-0000-0000-000000000021', NULL, 'clinical_nurse', 'Catheter Care', 'Clinical management of urinary catheters including insertion, care, and complication prevention. Covers CAUTI prevention and documentation requirements.', 'nurses_only', 12, true, NULL),
  ('10000000-0000-0000-0000-000000000022', NULL, 'clinical_nurse', 'Wound Management and Tissue Viability', 'Assessment and management of acute and chronic wounds. Covers wound bed preparation, dressing selection, and referral pathways.', 'nurses_only', 12, true, NULL),
  ('10000000-0000-0000-0000-000000000023', NULL, 'clinical_nurse', 'PEG Feeding', 'Care and management of percutaneous endoscopic gastrostomy tubes. Covers feeding regimens, troubleshooting, and infection prevention.', 'nurses_only', 12, true, NULL),
  ('10000000-0000-0000-0000-000000000024', NULL, 'clinical_nurse', 'Clinical Observations and NEWS2', 'Accurate measurement and interpretation of clinical observations using the National Early Warning Score 2. Covers escalation pathways.', 'nurses_only', 12, true, NULL),
  ('10000000-0000-0000-0000-000000000025', NULL, 'clinical_nurse', 'Deterioration Recognition and Sepsis', 'Identifying the deteriorating patient and responding to sepsis using the Sepsis Six bundle. Covers SBAR communication tool.', 'nurses_only', 12, true, NULL),
  ('10000000-0000-0000-0000-000000000026', NULL, 'clinical_nurse', 'Advanced Medication Management', 'Complex medication management for registered nurses. Covers controlled drugs, high-risk medications, IV therapy, and medication errors.', 'nurses_only', 12, true, NULL),
  ('10000000-0000-0000-0000-000000000027', NULL, 'clinical_nurse', 'Oxygen Therapy', 'Safe administration and monitoring of supplemental oxygen therapy. Covers indications, delivery devices, flow rates, and monitoring.', 'nurses_only', 12, true, NULL),
  ('10000000-0000-0000-0000-000000000028', NULL, 'clinical_nurse', 'Diabetes Management', 'Managing diabetes in the care setting including insulin administration, hypoglycaemia, and sick day rules. Covers Type 1 and Type 2 diabetes.', 'nurses_only', 12, true, NULL),
  ('10000000-0000-0000-0000-000000000029', NULL, 'clinical_nurse', 'NMC Code and Revalidation', 'Understanding the NMC Code of Professional Conduct and revalidation requirements. Covers CPD requirements, reflective accounts, and confirmation process.', 'nurses_only', 36, true, NULL),
  ('10000000-0000-0000-0000-000000000030', NULL, 'clinical_nurse', 'Clinical Governance', 'Quality improvement and clinical governance frameworks in healthcare. Covers audit, risk management, incident reporting, and patient safety.', 'managers_only', 24, true, NULL)
ON CONFLICT (id) DO NOTHING;
