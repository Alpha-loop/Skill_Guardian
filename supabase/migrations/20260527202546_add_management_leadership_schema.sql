/*
  # Management & Leadership — Schema Changes

  1. Adds 'management_leadership' to the course_category enum
  2. Adds 'senior_carer' to the professional_role enum
  3. Adds 'managers_and_seniors' to course_target_role enum
  4. Adds prerequisite_course_id (nullable FK) and estimated_minutes to courses table
  5. RLS: no changes needed — existing policies cover new enum values
*/

-- Extend enums (safe to add new values)
ALTER TYPE course_category ADD VALUE IF NOT EXISTS 'management_leadership';
ALTER TYPE professional_role ADD VALUE IF NOT EXISTS 'senior_carer';
ALTER TYPE course_target_role ADD VALUE IF NOT EXISTS 'managers_and_seniors';

-- Add new columns to courses
ALTER TABLE courses
  ADD COLUMN IF NOT EXISTS estimated_minutes integer DEFAULT 45,
  ADD COLUMN IF NOT EXISTS prerequisite_course_id uuid REFERENCES courses(id) ON DELETE SET NULL;

-- Backfill estimated_minutes for existing courses (50 flashcards ≈ 50 min)
UPDATE courses SET estimated_minutes = 50 WHERE estimated_minutes IS NULL OR estimated_minutes = 45;
-- Management courses will be inserted with 45
