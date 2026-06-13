/*
  # Update Care Certificate to Reflect All 16 Standards

  The Care Certificate framework was updated to include Standard 16:
  Awareness of Learning Disability & Autism. This migration:

  1. Corrects the course title from "(15 Standards)" to "(All 16 Standards)"
  2. Updates the description to list all 16 standards accurately
  3. Adds flashcards covering Standard 16 content
  4. Adds quiz questions covering Standard 16 content
*/

-- Update course title and description
UPDATE courses
SET
  title       = 'The Care Certificate (All 16 Standards)',
  description = 'The Care Certificate is the expected standard for anyone new to health and social care in the UK. This course covers all 16 CQC-aligned standards: (1) Understand Your Role, (2) Your Personal Development, (3) Duty of Care, (4) Equality, Diversity & Human Rights, (5) Work in a Person-Centred Way, (6) Communication, (7) Privacy & Dignity, (8) Fluids & Nutrition, (9) Awareness of Mental Health, Dementia & Learning Disability, (10) Adult Safeguarding, (11) Safeguarding Children, (12) Basic Life Support, (13) Health & Safety, (14) Handling Information, (15) Infection Prevention & Control, and (16) Awareness of Learning Disability & Autism. Fully portable — your certificate travels with you throughout your care career.'
WHERE id = '10000000-0000-0000-0000-000000000012';

-- ── Additional flashcards for Standard 16 ────────────────────────────────────

INSERT INTO flashcards (course_id, question_text, answer_text, order_index, difficulty) VALUES
('10000000-0000-0000-0000-000000000012',
 'What is Standard 16 of the Care Certificate?',
 'Standard 16 is "Awareness of Learning Disability & Autism". It requires care workers to understand what learning disabilities and autism are, how they affect individuals, and how to provide person-centred, respectful support.',
 51, 1),

('10000000-0000-0000-0000-000000000012',
 'What is a learning disability?',
 'A learning disability is a reduced intellectual ability and difficulty with everyday activities — such as managing money, reading, or communicating — that affects someone for their whole life. It is not the same as a learning difficulty (e.g. dyslexia) or a mental health problem.',
 52, 1),

('10000000-0000-0000-0000-000000000012',
 'What is autism?',
 'Autism (Autism Spectrum Condition/ASC) is a lifelong developmental condition that affects how people perceive and interact with the world. It is a spectrum — every autistic person is different. Common features include differences in communication, social interaction, and sensory processing.',
 53, 1),

('10000000-0000-0000-0000-000000000012',
 'What does "person-centred support" mean for someone with a learning disability or autism?',
 'It means focusing on the individual''s strengths, preferences, and goals — not just their diagnosis. Support should be tailored to what matters to them, respect their choices, and promote independence rather than assuming what they need.',
 54, 2),

('10000000-0000-0000-0000-000000000012',
 'What is the Oliver McGowan Mandatory Training and why does it link to Standard 16?',
 'The Oliver McGowan Mandatory Training is a legally required programme (Health and Care Act 2022) on learning disability and autism for all health and care staff. It directly supports Standard 16 by ensuring staff understand these conditions and can deliver safe, compassionate care.',
 55, 2),

('10000000-0000-0000-0000-000000000012',
 'Name three adjustments you might make to communicate effectively with someone with a learning disability.',
 '(1) Use plain, clear language and short sentences. (2) Allow extra time for the person to process and respond. (3) Use visual aids, pictures, or Makaton signs to support understanding.',
 56, 2),

('10000000-0000-0000-0000-000000000012',
 'What is sensory sensitivity in the context of autism?',
 'Many autistic people experience sensory input differently — they may be hypersensitive (over-sensitive) or hyposensitive (under-sensitive) to light, sound, touch, smell, or taste. This can cause distress or discomfort in certain environments, so care workers should adapt the environment where possible.',
 57, 2),

('10000000-0000-0000-0000-000000000012',
 'What is the "social model of disability"?',
 'The social model holds that people are disabled not by their impairment but by barriers created by society — physical barriers, negative attitudes, and inaccessible systems. Care workers should work to remove barriers and challenge stigma rather than "fixing" the person.',
 58, 2),

('10000000-0000-0000-0000-000000000012',
 'What is "reasonable adjustment" under the Equality Act 2010?',
 'A reasonable adjustment is a change made to remove or reduce a disadvantage for a disabled person. In care, this could mean providing written information in Easy Read format, allowing a support person to be present, or adjusting appointment times to suit the individual''s routine.',
 59, 2),

('10000000-0000-0000-0000-000000000012',
 'Why might a person with autism struggle in a hospital or care home environment?',
 'Hospital and care home environments can be unpredictable, loud, and brightly lit — all of which can be distressing for autistic people. Changes to routine, unfamiliar staff, and sensory overload can increase anxiety. Staff should prepare the person in advance, minimise sensory triggers, and maintain consistent routines.',
 60, 3);

-- ── Additional quiz questions for Standard 16 ─────────────────────────────────

INSERT INTO quiz_questions (course_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
('10000000-0000-0000-0000-000000000012',
 'Which Care Certificate standard specifically covers Awareness of Learning Disability and Autism?',
 'Standard 9',
 'Standard 14',
 'Standard 16',
 'Standard 12',
 'C',
 'Standard 16 — added to reflect the growing importance of supporting people with learning disabilities and autism in all health and care settings. It is directly linked to the Oliver McGowan Mandatory Training requirements.'),

('10000000-0000-0000-0000-000000000012',
 'Which legislation made training on learning disability and autism mandatory for all health and care staff?',
 'Care Act 2014',
 'Mental Capacity Act 2005',
 'Equality Act 2010',
 'Health and Care Act 2022',
 'D',
 'The Health and Care Act 2022 introduced the requirement for all CQC-regulated providers to ensure their staff complete the Oliver McGowan Mandatory Training on learning disability and autism.'),

('10000000-0000-0000-0000-000000000012',
 'A person with a learning disability is being admitted to your care home. What is the most important first step?',
 'Ask their GP for a full diagnosis history',
 'Find out from the person (and those who know them best) what support they need and what matters to them',
 'Assign them to the highest dependency care group',
 'Ensure all staff are briefed on their medical notes',
 'B',
 'Person-centred care starts with listening to the individual. Understanding what matters to them — their preferences, routines, and communication needs — is the foundation of safe and respectful support.'),

('10000000-0000-0000-0000-000000000012',
 'What does the social model of disability say?',
 'Disability is caused entirely by a person''s medical condition',
 'Disabled people need to adapt to fit into society',
 'People are disabled by societal barriers, not by their impairment alone',
 'Learning disabilities are the same as mental health conditions',
 'C',
 'The social model of disability recognises that while a person may have an impairment, it is barriers in society — physical, attitudinal, and systemic — that create disability. Care workers should work to remove these barriers.'),

('10000000-0000-0000-0000-000000000012',
 'An autistic resident becomes distressed when their usual morning routine is changed. What is the best response?',
 'Explain firmly that routines cannot always be accommodated',
 'Document it as challenging behaviour and notify the manager',
 'Acknowledge their distress, explain the change calmly in advance where possible, and work to restore predictability',
 'Administer PRN medication immediately',
 'C',
 'Predictability and routine are often essential for autistic people. Where changes cannot be avoided, advance warning and clear, calm communication significantly reduce distress. This is a reasonable adjustment under the Equality Act 2010.');
