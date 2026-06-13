/*
  # Fix flashcard counts for MCA & DoLS (48→50) and NMC Code (49→50)
  # Also remove the duplicate quiz question from Falls Prevention (26→25)
*/

DO $$ BEGIN

-- MCA & DoLS — add 2 missing flashcards at order_index 49 and 50
INSERT INTO flashcards (course_id, question_text, answer_text, difficulty, order_index) VALUES
('10000000-0000-0000-0000-000000000009',
 'What is the role of the Supervisory Body in DoLS?',
 'The Supervisory Body (usually the local authority) receives DoLS applications from managing authorities, appoints assessors, decides whether to authorise a deprivation of liberty, and sets the conditions and duration.',
 3, 49),
('10000000-0000-0000-0000-000000000009',
 'What MCA training is required for care staff?',
 'All care staff must have MCA awareness training. Those who regularly assess capacity or make best interests decisions require more in-depth training. Providers must evidence compliance with CQC fundamental standards.',
 2, 50)
ON CONFLICT DO NOTHING;

-- NMC Code and Revalidation — add 1 missing flashcard at order_index 50
INSERT INTO flashcards (course_id, question_text, answer_text, difficulty, order_index) VALUES
('10000000-0000-0000-0000-000000000029',
 'What happens if a nurse fails to revalidate on time?',
 'The NMC will lapse the nurse''s registration, meaning they cannot legally practise as a nurse until revalidation is complete and registration is restored. Continued practising without registration is a criminal offence.',
 3, 50)
ON CONFLICT DO NOTHING;

END $$;

-- Falls Prevention — remove the duplicate 26th quiz question (keep only 25)
DELETE FROM quiz_questions
WHERE course_id = '10000000-0000-0000-0000-000000000017'
  AND id = (
    SELECT id FROM quiz_questions
    WHERE course_id = '10000000-0000-0000-0000-000000000017'
    ORDER BY created_at DESC
    LIMIT 1
  );
