/*
  # Seed Flashcards - Courses 11-30
  
  Remaining courses: equality/diversity, Oliver McGowan, role-based, and clinical nurse courses.
*/

-- Course 11: Equality, Diversity & Human Rights
INSERT INTO flashcards (course_id, question_text, answer_text, order_index, difficulty) VALUES
('10000000-0000-0000-0000-000000000011', 'What are the 9 protected characteristics under the Equality Act 2010?', 'Age, Disability, Gender reassignment, Marriage/civil partnership, Pregnancy/maternity, Race, Religion/belief, Sex, and Sexual orientation.', 1, 1),
('10000000-0000-0000-0000-000000000011', 'What is the difference between direct and indirect discrimination?', 'Direct: treating someone less favourably because of a protected characteristic. Indirect: a policy/rule that applies to everyone but disadvantages people with a protected characteristic.', 2, 2),
('10000000-0000-0000-0000-000000000011', 'What are the 5 fundamental human rights relevant to care?', 'Right to life, Freedom from torture/inhuman treatment, Right to liberty, Right to fair trial, Right to private and family life (Articles 2, 3, 5, 6, 8 of the Human Rights Act 1998).', 3, 2),
('10000000-0000-0000-0000-000000000011', 'What is a "reasonable adjustment" under the Equality Act?', 'A change an employer or service provider must make to avoid putting a disabled person at a substantial disadvantage. What is reasonable depends on the circumstances.', 4, 2),
('10000000-0000-0000-0000-000000000011', 'What is unconscious bias?', 'A bias that happens automatically and is triggered by our brains making quick judgements based on background, cultural environment, and personal experiences. Can affect care quality.', 5, 2),
('10000000-0000-0000-0000-000000000011', 'What does "person-centred care" mean in the context of equality?', 'Tailoring care to the individual''s unique needs, preferences, values, and background. Recognising that one size does not fit all and respecting individual identity.', 6, 1),
('10000000-0000-0000-0000-000000000011', 'What is the Public Sector Equality Duty?', 'Requires public bodies and those delivering public services to: eliminate discrimination, advance equality of opportunity, and foster good relations between different groups.', 7, 3),
('10000000-0000-0000-0000-000000000011', 'What should you do if you witness discriminatory behaviour by a colleague?', 'You have a duty to challenge discrimination. Challenge politely if safe, report to your manager, use the formal complaints/grievance procedure, or speak to a Union representative.', 8, 2);

-- Course 12: The Care Certificate
INSERT INTO flashcards (course_id, question_text, answer_text, order_index, difficulty) VALUES
('10000000-0000-0000-0000-000000000012', 'What are the 15 standards of the Care Certificate?', '1.Understand role, 2.Personal development, 3.Duty of care, 4.Equality & diversity, 5.Work in person-centred way, 6.Communication, 7.Privacy/dignity, 8.Fluids & nutrition, 9.Awareness of mental health, 10.Safeguarding adults, 11.Safeguarding children, 12.Basic life support, 13.Health & safety, 14.Handling info, 15.Infection prevention.', 1, 1),
('10000000-0000-0000-0000-000000000012', 'What is "duty of care"?', 'A legal and ethical obligation to act in the best interests of individuals in your care and to take reasonable steps to avoid harm. Conflicts between duty of care and an individual''s rights must be handled carefully.', 2, 1),
('10000000-0000-0000-0000-000000000012', 'What is a "dilemma" in duty of care?', 'A situation where the duty to keep someone safe conflicts with their right to make their own choices. E.g., a resident who wants to smoke but has a chest condition. Use a risk-benefit approach.', 3, 2),
('10000000-0000-0000-0000-000000000012', 'What does "dignity in care" mean?', 'Treating people with respect, maintaining their privacy, promoting autonomy, and supporting their self-esteem. CQC inspects for dignity in all regulated care settings.', 4, 1),
('10000000-0000-0000-0000-000000000012', 'What is "person-centred values"?', 'Individuality, Independence, Privacy, Partnership, Choice, Dignity, Respect, Rights, and Equality. These should underpin all care practice.', 5, 1),
('10000000-0000-0000-0000-000000000012', 'Why is hydration and nutrition important in care?', 'Dehydration and malnutrition are major causes of ill health in care settings. Staff must monitor food and fluid intake, complete MUST screening, and report concerns.', 6, 1),
('10000000-0000-0000-0000-000000000012', 'What is MUST?', 'Malnutrition Universal Screening Tool. Used to identify adults at risk of malnutrition. Considers BMI, unintentional weight loss, and the effect of acute disease.', 7, 2),
('10000000-0000-0000-0000-000000000012', 'What is a person''s "personal development plan"?', 'A plan created with your manager identifying your learning and development needs. Links to your job role and supports your career progression. Reviewed regularly in supervision.', 8, 1);

-- Course 13: Oliver McGowan Tier 1
INSERT INTO flashcards (course_id, question_text, answer_text, order_index, difficulty) VALUES
('10000000-0000-0000-0000-000000000013', 'Who was Oliver McGowan?', 'A young man with a learning disability and autism who died in 2016 after being prescribed medication he had repeatedly said he did not want. His story led to mandatory training legislation.', 1, 1),
('10000000-0000-0000-0000-000000000013', 'What is a learning disability?', 'A reduced intellectual ability and difficulty with everyday activities, present from childhood. Ranges from mild to profound. Not the same as a learning difficulty like dyslexia.', 2, 1),
('10000000-0000-0000-0000-000000000013', 'What is autism?', 'A lifelong developmental condition affecting how people communicate, interact, and experience the world. Not an illness — it''s a different way of experiencing the world.', 3, 1),
('10000000-0000-0000-0000-000000000013', 'What are "reasonable adjustments" for people with learning disabilities?', 'Changes that must be made so a person with a disability receives equivalent care. E.g., longer appointments, easy-read information, familiar person present, flexible scheduling.', 4, 2),
('10000000-0000-0000-0000-000000000013', 'What is "diagnostic overshadowing"?', 'When health care professionals incorrectly attribute symptoms of physical illness to a person''s learning disability or mental health, leading to misdiagnosis or delayed treatment.', 5, 2),
('10000000-0000-0000-0000-000000000013', 'What is a hospital passport?', 'A document that contains key information about a person with a learning disability to help health staff provide appropriate care quickly in hospital settings.', 6, 2),
('10000000-0000-0000-0000-000000000013', 'What does STOMP stand for?', 'Stopping the Over-Medication of People with a learning disability, autism or both. A campaign to reduce inappropriate use of psychotropic medications.', 7, 3),
('10000000-0000-0000-0000-000000000013', 'Why do people with learning disabilities have poorer health outcomes?', 'Barriers to accessing healthcare, diagnostic overshadowing, communication difficulties, and health staff lacking knowledge and skills to support them effectively.', 8, 2);

-- Course 14: Oliver McGowan Tier 2
INSERT INTO flashcards (course_id, question_text, answer_text, order_index, difficulty) VALUES
('10000000-0000-0000-0000-000000000014', 'What is the purpose of Tier 2 Oliver McGowan Training?', 'For staff who provide direct care or treatment. Goes beyond awareness to include practical skills in communication, reasonable adjustments, and supporting people with complex needs.', 1, 1),
('10000000-0000-0000-0000-000000000014', 'What is "Makaton" and how can it help?', 'A language programme using symbols and signs alongside speech. Helps people with communication difficulties to express themselves and understand others.', 2, 2),
('10000000-0000-0000-0000-000000000014', 'What is sensory sensitivity in autism?', 'Many autistic people experience the world differently — sounds, lights, textures, or smells may be overwhelming. Staff should assess sensory needs and adapt the environment.', 3, 2),
('10000000-0000-0000-0000-000000000014', 'What is a "care and support plan" for a person with a learning disability?', 'A detailed document describing the person''s needs, preferences, and how they want to be supported. Should be co-produced with the person and regularly reviewed.', 4, 2),
('10000000-0000-0000-0000-000000000014', 'What is positive behaviour support (PBS)?', 'An evidence-based approach to understanding why behaviours occur and making positive changes to improve quality of life. Focuses on environment, communication, and individual needs.', 5, 3),
('10000000-0000-0000-0000-000000000014', 'How should you communicate with someone with a learning disability?', 'Use clear simple language, short sentences, visual aids if needed. Allow extra processing time. Check understanding by asking them to repeat information back. Avoid jargon.', 6, 2),
('10000000-0000-0000-0000-000000000014', 'What is the "Annual Health Check" for people with learning disabilities?', 'A free NHS health check for people with a learning disability aged 14 or over. Aims to identify unmet health needs and create a health action plan.', 7, 2),
('10000000-0000-0000-0000-000000000014', 'What does "co-production" mean in the context of Oliver McGowan training?', 'People with learning disabilities and autistic people are actively involved in designing and delivering the training, ensuring it reflects real lived experiences.', 8, 2);

-- Course 15: Food Hygiene
INSERT INTO flashcards (course_id, question_text, answer_text, order_index, difficulty) VALUES
('10000000-0000-0000-0000-000000000015', 'What is HACCP?', 'Hazard Analysis and Critical Control Points — a system for identifying and controlling food safety hazards at critical points in the food preparation process.', 1, 2),
('10000000-0000-0000-0000-000000000015', 'What is the danger zone for food temperature?', 'Between 8°C and 63°C — the range where bacteria multiply most rapidly. Keep cold foods below 8°C and hot foods above 63°C.', 2, 1),
('10000000-0000-0000-0000-000000000015', 'What does a colour-coded chopping board system prevent?', 'Cross-contamination between raw and cooked foods. Red: raw meat, Yellow: cooked meat, Green: salad/fruit/veg, Blue: raw fish, White: bakery/dairy, Brown: vegetables.', 3, 2),
('10000000-0000-0000-0000-000000000015', 'When must you report a food illness to your manager?', 'Immediately if you have vomiting, diarrhoea, or jaundice. You must not handle food until 48 hours after symptoms have stopped.', 4, 1),
('10000000-0000-0000-0000-000000000015', 'What is the correct internal temperature for cooked meat?', '75°C for at least 30 seconds. For poultry, ensure there is no pink flesh and the juices run clear. Use a probe thermometer and clean between uses.', 5, 2),
('10000000-0000-0000-0000-000000000015', 'How should you defrost food safely?', 'In the refrigerator (bottom shelf), under cold running water, or in a microwave if cooking immediately. Never defrost at room temperature as bacteria multiply rapidly.', 6, 2),
('10000000-0000-0000-0000-000000000015', 'What personal hygiene rules apply to food handlers?', 'Wash hands thoroughly, no jewellery except plain wedding band, hair tied back/covered, report any skin conditions, no eating/drinking/smoking in food preparation areas.', 7, 1),
('10000000-0000-0000-0000-000000000015', 'How long can hot food be kept in a bain-marie?', 'No longer than 2 hours. After 2 hours it must be discarded. Monitor temperature regularly — it must remain above 63°C.', 8, 3);

-- Course 16: Dementia Awareness
INSERT INTO flashcards (course_id, question_text, answer_text, order_index, difficulty) VALUES
('10000000-0000-0000-0000-000000000016', 'What is dementia?', 'An umbrella term for a group of symptoms caused by progressive brain disease including memory loss, confusion, personality changes, and difficulty with daily tasks. It is not a normal part of ageing.', 1, 1),
('10000000-0000-0000-0000-000000000016', 'What are the most common types of dementia?', 'Alzheimer''s disease (60-70%), Vascular dementia, Lewy Body dementia, and Frontotemporal dementia. Many people have mixed dementia.', 2, 2),
('10000000-0000-0000-0000-000000000016', 'What is person-centred dementia care?', 'Recognising and respecting the person behind the dementia. Understanding their life history, preferences, and what gives them meaning. Tom Kitwood''s framework focuses on psychological needs.', 3, 2),
('10000000-0000-0000-0000-000000000016', 'What is "sundowning"?', 'Increased confusion, agitation, or anxiety that occurs in the late afternoon or evening in people with dementia. Related to disruption of circadian rhythms.', 4, 2),
('10000000-0000-0000-0000-000000000016', 'What is reminiscence therapy?', 'Using memories from the past to stimulate communication and improve wellbeing. Can involve photographs, music, or objects from a person''s past. Particularly effective in mid-stage dementia.', 5, 2),
('10000000-0000-0000-0000-000000000016', 'How should you respond to challenging behaviour in dementia?', 'See behaviour as communication — what need is the person trying to express? Look for triggers (pain, fear, discomfort). Respond calmly, avoid confrontation, distract or redirect.', 6, 2),
('10000000-0000-0000-0000-000000000016', 'What is a "dementia-friendly environment"?', 'An environment designed to support people with dementia: good lighting, clear signage, contrasting colours, removal of hazards, access to outdoor space, and familiar meaningful objects.', 7, 2),
('10000000-0000-0000-0000-000000000016', 'What are the NICE guidelines for dementia care?', 'Recommend: post-diagnostic support, carer support, activities to promote wellbeing, avoiding antipsychotics unless necessary, regular medication review, and care planning.', 8, 3);

-- Course 17: Falls Prevention
INSERT INTO flashcards (course_id, question_text, answer_text, order_index, difficulty) VALUES
('10000000-0000-0000-0000-000000000017', 'What is the NICE definition of a fall?', 'An unintentional event resulting in a person coming to rest on the ground, floor, or lower level. Includes events where a person is found on the floor even if not observed falling.', 1, 1),
('10000000-0000-0000-0000-000000000017', 'What are the main intrinsic risk factors for falls?', 'Age, previous falls, muscle weakness, balance problems, visual impairment, cognitive impairment, incontinence, polypharmacy, dizziness, and chronic conditions like Parkinson''s.', 2, 2),
('10000000-0000-0000-0000-000000000017', 'What are extrinsic risk factors for falls?', 'Environmental: wet floors, poor lighting, cluttered spaces, ill-fitting footwear, inappropriate walking aids, bed heights, and lack of grab rails.', 3, 2),
('10000000-0000-0000-0000-000000000017', 'What should be done immediately after a resident falls?', 'Do not move them immediately. Assess for injury, call for help/medical assessment. Keep them calm and warm. Complete a post-fall assessment and incident form. Inform family and GP.', 4, 1),
('10000000-0000-0000-0000-000000000017', 'What is a "falls risk assessment tool"?', 'A structured tool to assess fall risk. Common tools include MORSE (hospital) and STRATIFY. Should be completed on admission and when condition changes.', 5, 2),
('10000000-0000-0000-0000-000000000017', 'What is "post-fall observation"?', 'Regular monitoring following a fall to detect delayed signs of injury or deterioration, such as increasing confusion, headache, or limb pain (signs of head injury or fracture).', 6, 2),
('10000000-0000-0000-0000-000000000017', 'How can exercise reduce fall risk?', 'Balance and strengthening exercises (e.g., Otago programme) can reduce falls by up to 35%. Tai Chi has strong evidence. Exercise should be individualised.', 7, 3),
('10000000-0000-0000-0000-000000000017', 'What medications increase falls risk?', 'Sedatives/hypnotics, antihypertensives, antidepressants, antipsychotics, diuretics, and blood pressure medications. Medication review should be part of any falls risk reduction plan.', 8, 3);

-- Course 18: Pressure Area Care
INSERT INTO flashcards (course_id, question_text, answer_text, order_index, difficulty) VALUES
('10000000-0000-0000-0000-000000000018', 'What is a pressure ulcer?', 'Localised damage to skin and underlying tissue caused by prolonged pressure, shear, or friction. Also called bedsores or decubitus ulcers. Mainly in bony prominences.', 1, 1),
('10000000-0000-0000-0000-000000000018', 'What are the 4 grades/categories of pressure ulcers?', 'Category 1: Non-blanchable redness. Category 2: Partial thickness skin loss. Category 3: Full thickness skin loss. Category 4: Full thickness tissue loss.', 2, 2),
('10000000-0000-0000-0000-000000000018', 'What is the SSKIN bundle?', 'Surface, Skin inspection, Keep moving, Incontinence, Nutrition. A framework for preventing pressure ulcers through systematic assessment and intervention.', 3, 2),
('10000000-0000-0000-0000-000000000018', 'What is the Waterlow score?', 'A risk assessment tool for pressure ulcers. Scores body build, continence, skin appearance, mobility, age, sex, malnutrition, and special risks. 10+ = at risk.', 4, 2),
('10000000-0000-0000-0000-000000000018', 'Where are common sites for pressure ulcers?', 'Sacrum, heels, hips (greater trochanter), elbows, shoulders, back of head, ankles, and ears. Any bony prominence in contact with a surface is at risk.', 5, 1),
('10000000-0000-0000-0000-000000000018', 'How often should repositioning occur?', 'At least every 2 hours in bed and every hour in a chair for high-risk individuals. This should be documented. A 30° tilt may be more comfortable than full turning.', 6, 2),
('10000000-0000-0000-0000-000000000018', 'What pressure-relieving equipment is available?', 'Specialist mattresses (foam, alternating pressure), heel protectors, pressure-relieving cushions, and gel pads. Equipment must be properly assessed and fitted.', 7, 2),
('10000000-0000-0000-0000-000000000018', 'What role does nutrition play in pressure ulcer prevention?', 'Malnutrition significantly increases risk. Adequate protein, calories, vitamins C and A, and zinc support skin integrity and wound healing. Refer to dietitian if at risk.', 8, 2);

-- Course 19: Communication & Duty of Candour
INSERT INTO flashcards (course_id, question_text, answer_text, order_index, difficulty) VALUES
('10000000-0000-0000-0000-000000000019', 'What is the Duty of Candour?', 'A legal requirement under Regulation 20 for providers to be open and honest with people when things go wrong that cause harm. Must apologise, explain, and offer support.', 1, 1),
('10000000-0000-0000-0000-000000000019', 'What are the key elements of the Duty of Candour?', 'Telling the person/family promptly about the harm, providing a truthful account, apologising sincerely, taking action to prevent recurrence, and keeping a written record.', 2, 2),
('10000000-0000-0000-0000-000000000019', 'What is active listening?', 'Giving full attention to the speaker, not interrupting, reflecting back what you hear, asking open questions, and acknowledging emotions. It builds trust and reduces conflict.', 3, 1),
('10000000-0000-0000-0000-000000000019', 'What are barriers to effective communication in care?', 'Language differences, hearing impairment, cognitive impairment, pain, anxiety, staff time pressures, inappropriate environment, and lack of augmentative communication tools.', 4, 2),
('10000000-0000-0000-0000-000000000019', 'What is non-verbal communication?', 'Body language, facial expressions, eye contact, tone of voice, gestures, and touch. Up to 70% of communication is non-verbal. Ensure it is congruent with your words.', 5, 1),
('10000000-0000-0000-0000-000000000019', 'What is an "open disclosure"?', 'Proactively informing a person about a mistake or adverse event that affected their care. Part of the Duty of Candour and essential for maintaining trust.', 6, 2),
('10000000-0000-0000-0000-000000000019', 'How should you handle complaints effectively?', 'Listen without interrupting, acknowledge concerns, apologise where appropriate, investigate promptly, explain what happened and what will change, and follow up.', 7, 2),
('10000000-0000-0000-0000-000000000019', 'What is Makaton in communication?', 'A language programme using signs and symbols alongside speech to help people with communication difficulties. Useful for people with learning disabilities or complex communication needs.', 8, 2);

-- Course 20: Conflict Resolution
INSERT INTO flashcards (course_id, question_text, answer_text, order_index, difficulty) VALUES
('10000000-0000-0000-0000-000000000020', 'What is de-escalation?', 'Techniques to reduce the intensity of a conflict or aggressive situation before physical intervention becomes necessary. Includes tone of voice, body language, and verbal strategies.', 1, 1),
('10000000-0000-0000-0000-000000000020', 'What does STAMP stand for in conflict assessment?', 'Staring, Tone of voice, Anxiety, Mumbling, Pacing. These are warning signs that a situation may escalate. Use to assess risk and respond proactively.', 2, 2),
('10000000-0000-0000-0000-000000000020', 'What is the importance of personal space in conflict situations?', 'Invading personal space (typically within 1-2 metres) can be perceived as threatening and escalate aggression. Maintain respectful distance while showing engagement.', 3, 2),
('10000000-0000-0000-0000-000000000020', 'What body language reduces aggression?', 'Open body posture, hands visible, non-threatening side stance, calm facial expression, level eye contact (not staring), and a calm tone of voice.', 4, 2),
('10000000-0000-0000-0000-000000000020', 'When should you involve physical restraint?', 'Only as a last resort when all verbal and non-verbal de-escalation has failed and there is immediate risk of harm. Must be proportionate, documented, and reviewed.', 5, 3),
('10000000-0000-0000-0000-000000000020', 'What are the triggers for aggression in care settings?', 'Pain, confusion, dementia, fear, loss of control, frustration, drug side effects, environmental factors, and feeling unheard or disrespected.', 6, 2),
('10000000-0000-0000-0000-000000000020', 'What should you do after a conflict incident?', 'Complete an incident report, support colleagues who were involved, debrief with your manager, review what triggers were present, and consider what could be done differently.', 7, 2),
('10000000-0000-0000-0000-000000000020', 'What is a "breakaway technique"?', 'A defensive skill allowing you to safely free yourself from a physical grab or hold. Must be taught by a qualified instructor and only used in genuine self-defence.', 8, 3);
