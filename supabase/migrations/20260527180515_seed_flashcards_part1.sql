/*
  # Seed Flashcards - Courses 1-10
  
  Flashcard content for core mandatory courses.
  Each course has 8-12 flashcards covering key learning points.
*/

-- Course 1: Safeguarding Adults Level 1
INSERT INTO flashcards (course_id, question_text, answer_text, order_index, difficulty) VALUES
('10000000-0000-0000-0000-000000000001', 'What is safeguarding in adult care?', 'Safeguarding means protecting an adult''s right to live in safety, free from abuse and neglect. It is everyone''s responsibility under the Care Act 2014.', 1, 1),
('10000000-0000-0000-0000-000000000001', 'Name the 6 principles of safeguarding (EMPOWERED)', 'Empowerment, Prevention, Proportionality, Protection, Partnership, and Accountability. These form the framework for safeguarding practice.', 2, 2),
('10000000-0000-0000-0000-000000000001', 'What are the 10 types of abuse?', 'Physical, Sexual, Emotional/Psychological, Financial/Material, Modern Slavery, Discriminatory, Organisational, Neglect, Domestic Violence, and Self-Neglect.', 3, 2),
('10000000-0000-0000-0000-000000000001', 'What should you do if you suspect abuse?', 'Do not ignore it. Report your concerns to your line manager or the safeguarding lead immediately. Document what you observed using factual language. Never investigate alone.', 4, 1),
('10000000-0000-0000-0000-000000000001', 'What is "Making Safeguarding Personal"?', 'An approach that places the person at the centre of the safeguarding process. It focuses on outcomes that matter to them and ensures they are involved in decisions about their safety.', 5, 2),
('10000000-0000-0000-0000-000000000001', 'Who are "adults at risk" under the Care Act 2014?', 'An adult who has care and support needs AND is experiencing, or at risk of, abuse or neglect AND is unable to protect themselves because of those needs.', 6, 2),
('10000000-0000-0000-0000-000000000001', 'What is a Safeguarding Adult Review (SAR)?', 'A review held when a person with care and support needs dies or is seriously harmed as a result of abuse or neglect. It identifies learning to improve practice.', 7, 3),
('10000000-0000-0000-0000-000000000001', 'What does "whistleblowing" mean in safeguarding?', 'Reporting concerns about abuse, misconduct, or illegal activity by a colleague or organisation. The Public Interest Disclosure Act protects whistleblowers from retaliation.', 8, 2),
('10000000-0000-0000-0000-000000000001', 'What is "county lines" in the context of safeguarding?', 'A form of criminal exploitation where gangs use vulnerable adults to transport and deal drugs. Staff should be aware of sudden changes in behaviour, unexplained money, or new contacts.', 9, 3),
('10000000-0000-0000-0000-000000000001', 'How should you record safeguarding concerns?', 'Use factual, objective language. Record what you saw, heard, or were told. Include dates, times, and who was present. Avoid speculation or personal opinions.', 10, 2);

-- Course 2: Safeguarding Children Level 1
INSERT INTO flashcards (course_id, question_text, answer_text, order_index, difficulty) VALUES
('10000000-0000-0000-0000-000000000002', 'What does "Working Together to Safeguard Children" require?', 'All agencies and individuals must take a co-ordinated approach to child protection. Everyone working with children has a duty to act on concerns.', 1, 1),
('10000000-0000-0000-0000-000000000002', 'What are the four categories of child abuse?', 'Physical abuse, Emotional abuse, Sexual abuse, and Neglect. Any of these can cause significant harm to a child.', 2, 1),
('10000000-0000-0000-0000-000000000002', 'What is a "child in need" under the Children Act 1989?', 'A child who is unlikely to achieve a reasonable standard of health or development without support, or whose health/development is likely to be significantly impaired.', 3, 2),
('10000000-0000-0000-0000-000000000002', 'What is Female Genital Mutilation (FGM) and what must you do if you suspect it?', 'FGM is illegal in the UK. All regulated health and social care professionals MUST report to police if they discover FGM has been carried out on a girl under 18.', 4, 2),
('10000000-0000-0000-0000-000000000002', 'What are signs of neglect in a child?', 'Poor hygiene, inappropriate clothing, hunger, untreated medical conditions, poor school attendance, and a child who is always tired or unsupervised.', 5, 2),
('10000000-0000-0000-0000-000000000002', 'What should you NOT do if a child discloses abuse?', 'Do not promise confidentiality, do not investigate yourself, do not ask leading questions, do not confront the alleged abuser, and do not delay reporting.', 6, 2),
('10000000-0000-0000-0000-000000000002', 'What is the "Prevent" duty in the context of child safeguarding?', 'The duty under the Counter-Terrorism and Security Act 2015 to have due regard to preventing people from being drawn into terrorism. Applies to healthcare settings.', 7, 3),
('10000000-0000-0000-0000-000000000002', 'What is a Child Protection Plan?', 'A formal plan created when a child is at continuing risk of significant harm. It outlines actions to protect the child and support the family.', 8, 2);

-- Course 3: Infection Prevention and Control
INSERT INTO flashcards (course_id, question_text, answer_text, order_index, difficulty) VALUES
('10000000-0000-0000-0000-000000000003', 'What are the 5 moments for hand hygiene (WHO)?', '1. Before patient contact, 2. Before aseptic task, 3. After body fluid exposure risk, 4. After patient contact, 5. After contact with patient surroundings.', 1, 1),
('10000000-0000-0000-0000-000000000003', 'How long should you wash hands with soap and water?', 'At least 20 seconds using the 7-step technique. Use soap and water when hands are visibly soiled or after caring for a patient with C. difficile.', 2, 1),
('10000000-0000-0000-0000-000000000003', 'What does PPE stand for and what does it include?', 'Personal Protective Equipment. In healthcare it includes gloves, aprons, eye protection, and face masks. Select PPE based on risk assessment.', 3, 1),
('10000000-0000-0000-0000-000000000003', 'What is the chain of infection?', 'The cycle by which infections spread: Infectious Agent → Reservoir → Portal of Exit → Mode of Transmission → Portal of Entry → Susceptible Host. Breaking any link prevents spread.', 4, 2),
('10000000-0000-0000-0000-000000000003', 'What is "standard precautions" in infection control?', 'A set of work practices applied to all patients regardless of diagnosis. Includes hand hygiene, PPE, safe sharps handling, and respiratory hygiene.', 5, 2),
('10000000-0000-0000-0000-000000000003', 'How should you handle a needlestick injury?', 'Encourage bleeding, wash with soap and water, do not suck. Report immediately to manager, complete incident form, seek occupational health advice within hours.', 6, 2),
('10000000-0000-0000-0000-000000000003', 'What is cohort nursing/caring?', 'Grouping patients or residents with the same infection together to reduce spread to uninfected individuals. Used during outbreaks of norovirus or COVID-19.', 7, 3),
('10000000-0000-0000-0000-000000000003', 'When should you use alcohol hand rub instead of soap and water?', 'For routine decontamination when hands are not visibly soiled. NOT effective against C. difficile spores — use soap and water for those cases.', 8, 2),
('10000000-0000-0000-0000-000000000003', 'What is MRSA and how is it spread?', 'Methicillin-resistant Staphylococcus aureus — a bacterium resistant to many antibiotics. Spread by direct contact with an infected person or contaminated surfaces.', 9, 2);

-- Course 4: Health and Safety
INSERT INTO flashcards (course_id, question_text, answer_text, order_index, difficulty) VALUES
('10000000-0000-0000-0000-000000000004', 'What are your main duties under the Health and Safety at Work Act 1974?', 'To take reasonable care of your own health and safety AND that of others affected by your work. To co-operate with your employer on health and safety matters.', 1, 1),
('10000000-0000-0000-0000-000000000004', 'What does a risk assessment involve?', 'Identify hazards, decide who might be harmed and how, evaluate risks and decide on precautions, record findings, review and update.', 2, 1),
('10000000-0000-0000-0000-000000000004', 'What is COSHH?', 'Control of Substances Hazardous to Health. Employers must assess exposure to hazardous substances and control the risk. Includes cleaning chemicals, medications, and body fluids.', 3, 2),
('10000000-0000-0000-0000-000000000004', 'When must a RIDDOR report be made?', 'Reporting of Injuries, Diseases and Dangerous Occurrences Regulations: report work-related deaths, specified injuries, over-7-day incapacitation, occupational diseases, or dangerous occurrences.', 4, 3),
('10000000-0000-0000-0000-000000000004', 'What is a near miss and why should you report it?', 'An unplanned event that could have resulted in injury or illness but did not. Reporting near misses helps prevent future accidents and is a legal requirement.', 5, 2),
('10000000-0000-0000-0000-000000000004', 'What is the hierarchy of control measures?', 'Elimination → Substitution → Engineering Controls → Administrative Controls → PPE. Start with elimination as the most effective control.', 6, 3),
('10000000-0000-0000-0000-000000000004', 'What is a Display Screen Equipment (DSE) assessment?', 'An assessment of workstations used by staff who regularly use screens. Covers posture, lighting, breaks, and equipment setup to prevent musculoskeletal problems.', 7, 2),
('10000000-0000-0000-0000-000000000004', 'What are the requirements for a first aid kit in a care setting?', 'Must be easily accessible, clearly marked, and stocked with appropriate supplies. Contents should be checked regularly and expired items replaced.', 8, 1);

-- Course 5: Fire Safety
INSERT INTO flashcards (course_id, question_text, answer_text, order_index, difficulty) VALUES
('10000000-0000-0000-0000-000000000005', 'What is the fire triangle?', 'Fire needs three elements: Fuel (something to burn), Heat (ignition source), and Oxygen. Remove any one of these to extinguish or prevent fire.', 1, 1),
('10000000-0000-0000-0000-000000000005', 'What does RACE stand for in fire emergency response?', 'Rescue (anyone in immediate danger), Alert (sound the alarm), Contain (close doors and windows), Extinguish/Evacuate (use extinguisher if safe, otherwise evacuate).', 2, 1),
('10000000-0000-0000-0000-000000000005', 'What is a PEEP?', 'Personal Emergency Evacuation Plan — an individual plan for people who cannot evacuate independently, such as wheelchair users or people with dementia.', 3, 2),
('10000000-0000-0000-0000-000000000005', 'When should you use a fire extinguisher?', 'Only if you have been trained, the fire is small and contained, you have a clear escape route behind you, and you are not putting yourself at risk.', 4, 2),
('10000000-0000-0000-0000-000000000005', 'What colour is a CO2 fire extinguisher and what is it used for?', 'Black. Used on electrical fires and flammable liquid fires. Do NOT use on cooking oil fires or in confined spaces.', 5, 2),
('10000000-0000-0000-0000-000000000005', 'How often must fire drills be conducted in a care home?', 'At least annually, but best practice recommends every 6 months including at least one during a night shift. All staff must participate.', 6, 2),
('10000000-0000-0000-0000-000000000005', 'What is the role of a fire warden?', 'To check their designated area during evacuation, ensure all persons are accounted for at the assembly point, and liaise with the fire service on arrival.', 7, 2),
('10000000-0000-0000-0000-000000000005', 'What is a "compartment" in fire safety terms?', 'A fire-resistant section of a building designed to contain a fire for a specified time. Fire doors are essential for maintaining compartmentation.', 8, 3);

-- Course 6: Moving and Handling
INSERT INTO flashcards (course_id, question_text, answer_text, order_index, difficulty) VALUES
('10000000-0000-0000-0000-000000000006', 'What does the Manual Handling Operations Regulations 1992 require?', 'Employers must avoid hazardous manual handling, assess risk of unavoidable handling, and reduce risk of injury. Workers must follow safe systems of work.', 1, 1),
('10000000-0000-0000-0000-000000000006', 'What does TILE stand for in manual handling risk assessment?', 'Task (what is being done), Individual (who is doing it), Load (what is being moved), Environment (where it is happening). Use to assess and control risk.', 2, 1),
('10000000-0000-0000-0000-000000000006', 'What is a "hoist" and when must it be used?', 'A mechanical device to lift and transfer patients who cannot weight-bear. A hoist must be used when indicated in the care plan — manual lifting of people is never acceptable.', 3, 1),
('10000000-0000-0000-0000-000000000006', 'What is a sliding sheet used for?', 'To reduce friction when repositioning a person in bed. Allows carers to move residents safely without lifting, reducing risk of injury to both parties.', 4, 1),
('10000000-0000-0000-0000-000000000006', 'What is the minimum number of people required to use a hoist?', 'Generally two carers are required for safe hoist use, unless a risk assessment indicates otherwise or a solo-carer hoist is specifically approved in the care plan.', 5, 2),
('10000000-0000-0000-0000-000000000006', 'How often must handling equipment be inspected?', 'Under LOLER (Lifting Operations and Lifting Equipment Regulations), hoists and slings must be thoroughly examined at least every 6 months by a competent person.', 6, 3),
('10000000-0000-0000-0000-000000000006', 'What should you check before using a hoist sling?', 'Check for wear, tears, or damage. Ensure it matches the hoist model and is the correct size for the resident. Check the sling''s safe working load (SWL).', 7, 2),
('10000000-0000-0000-0000-000000000006', 'What is the safe posture for manual handling?', 'Feet shoulder-width apart, knees slightly bent, straight back (not necessarily upright), load close to body, smooth movement avoiding twisting.', 8, 2),
('10000000-0000-0000-0000-000000000006', 'What must you do if a resident falls?', 'Do not attempt to lift them immediately. Ensure their safety, call for help, assess for injury, follow the post-fall protocol, complete an incident report.', 9, 2);

-- Course 7: Basic Life Support
INSERT INTO flashcards (course_id, question_text, answer_text, order_index, difficulty) VALUES
('10000000-0000-0000-0000-000000000007', 'What is the first step in the BLS sequence?', 'Ensure the scene is safe for you and the casualty. Do not put yourself at risk. Check for hazards before approaching.', 1, 1),
('10000000-0000-0000-0000-000000000007', 'How do you check if an adult is unconscious?', 'Shout and tap their shoulders. If no response, they are unconscious. Shout for help immediately.', 2, 1),
('10000000-0000-0000-0000-000000000007', 'How do you check for breathing in an unconscious person?', 'Open the airway (head tilt, chin lift), then look, listen, and feel for normal breathing for no more than 10 seconds. Occasional gasps are NOT normal breathing.', 3, 1),
('10000000-0000-0000-0000-000000000007', 'What is the ratio of chest compressions to rescue breaths in adult CPR?', '30 compressions to 2 rescue breaths. Push hard and fast at the centre of the chest, at least 5-6cm deep and at a rate of 100-120 per minute.', 4, 1),
('10000000-0000-0000-0000-000000000007', 'What does AED stand for and how is it used?', 'Automated External Defibrillator. Switch on and follow voice/visual prompts. Attach pads as shown. Stand clear and deliver shock when advised. Resume CPR immediately after.', 5, 1),
('10000000-0000-0000-0000-000000000007', 'What is the recovery position?', 'A position for unconscious breathing casualties. Roll onto side, support head, upper arm and leg bent for stability. Prevents airway obstruction from vomit.', 6, 1),
('10000000-0000-0000-0000-000000000007', 'What is the chain of survival?', 'Early recognition and call for help → Early CPR → Early defibrillation → Post-resuscitation care. Each link is critical to survival.', 7, 2),
('10000000-0000-0000-0000-000000000007', 'When should CPR be stopped?', 'When the person starts breathing normally, a trained clinician takes over, you become physically unable to continue, or a valid Do Not Attempt CPR (DNACPR) order is confirmed.', 8, 2),
('10000000-0000-0000-0000-000000000007', 'What are the signs of choking?', 'Clutching the throat, unable to speak or cry, unable to breathe or wheezing, cyanosis (blue lips/skin). Prompt action is required.', 9, 2);

-- Course 8: Medication Management Basic
INSERT INTO flashcards (course_id, question_text, answer_text, order_index, difficulty) VALUES
('10000000-0000-0000-0000-000000000008', 'What are the "5 Rights" of medication administration?', 'Right Patient, Right Drug, Right Dose, Right Route, Right Time. Some frameworks add Right Documentation as a 6th right.', 1, 1),
('10000000-0000-0000-0000-000000000008', 'What is a Medication Administration Record (MAR)?', 'A legal document recording all medications prescribed and administered. Must be completed accurately and immediately after administration with signature and time.', 2, 1),
('10000000-0000-0000-0000-000000000008', 'How should medications be stored?', 'In a locked, secure cabinet. Temperature-sensitive medications in a dedicated fridge. Controlled Drugs in a double-locked cabinet with restricted key access.', 3, 2),
('10000000-0000-0000-0000-000000000008', 'What is a Controlled Drug (CD)?', 'Medications with potential for misuse regulated under the Misuse of Drugs Act 1971. Examples: morphine, oxycodone. Require two-person checking and specific documentation.', 4, 2),
('10000000-0000-0000-0000-000000000008', 'What should you do if you make a medication error?', 'Do not hide it. Report immediately to the nurse in charge and manager. Monitor the resident. Complete an incident form. Support may be available to prevent recurrence.', 5, 1),
('10000000-0000-0000-0000-000000000008', 'What is a PRN medication?', '"Pro re nata" — to be given as needed. The MAR should clearly state the indication, dose, frequency, and maximum dose. Document effectiveness after administration.', 6, 2),
('10000000-0000-0000-0000-000000000008', 'What should you check before giving medication?', 'Confirm the right person (ask name and check ID band), check the MAR, check expiry date, check for allergies, check prescribed dose and route.', 7, 1),
('10000000-0000-0000-0000-000000000008', 'What is covert medication administration?', 'Concealing medication in food or drink without the person''s knowledge. It must only be done with a capacity assessment, best interests decision, and IMCA input where appropriate.', 8, 3);

-- Course 9: Mental Capacity Act & DoLS
INSERT INTO flashcards (course_id, question_text, answer_text, order_index, difficulty) VALUES
('10000000-0000-0000-0000-000000000009', 'What are the 5 key principles of the Mental Capacity Act 2005?', '1. Assume capacity unless proven otherwise, 2. Support to make decisions, 3. Right to make unwise decisions, 4. Best interests if lacking capacity, 5. Least restrictive option.', 1, 1),
('10000000-0000-0000-0000-000000000009', 'What is the two-stage test for mental capacity?', 'Stage 1: Is there an impairment or disturbance in the mind or brain? Stage 2: Does this impairment cause the person unable to: understand, retain, use/weigh, or communicate a decision?', 2, 2),
('10000000-0000-0000-0000-000000000009', 'What does "best interests" mean under the MCA?', 'When a person lacks capacity, decisions must be made in their best interests. Consider their wishes, values, beliefs and the views of family or carers. Not what others think is best.', 3, 2),
('10000000-0000-0000-0000-000000000009', 'What is DoLS?', 'Deprivation of Liberty Safeguards — a legal process to protect people who lack capacity and need to be deprived of their liberty in a care home or hospital for their own safety.', 4, 2),
('10000000-0000-0000-0000-000000000009', 'What is a Lasting Power of Attorney (LPA)?', 'A legal document allowing a person to appoint someone to make decisions on their behalf if they lose capacity. Health and Welfare LPA or Property and Financial Affairs LPA.', 5, 2),
('10000000-0000-0000-0000-000000000009', 'What is an IMCA?', 'Independent Mental Capacity Advocate — an independent person who represents and supports people who lack capacity AND have no family or friends to consult. Must be involved in major decisions.', 6, 3),
('10000000-0000-0000-0000-000000000009', 'When is a capacity assessment needed?', 'When a specific decision needs to be made for someone you have reason to believe may lack capacity for that decision. Capacity is decision-specific and time-specific.', 7, 2),
('10000000-0000-0000-0000-000000000009', 'What is the Liberty Protection Safeguards (LPS)?', 'The replacement for DoLS under the Mental Capacity (Amendment) Act 2019. Extends safeguards to more settings including supported living and community settings.', 8, 3);

-- Course 10: Information Governance & GDPR
INSERT INTO flashcards (course_id, question_text, answer_text, order_index, difficulty) VALUES
('10000000-0000-0000-0000-000000000010', 'What are the 6 principles of GDPR?', 'Lawfulness/Fairness/Transparency, Purpose Limitation, Data Minimisation, Accuracy, Storage Limitation, Integrity/Confidentiality (and Accountability).', 1, 1),
('10000000-0000-0000-0000-000000000010', 'What is "special category data" under GDPR?', 'Sensitive data requiring higher protection: health data, race/ethnicity, religious beliefs, political opinions, trade union membership, genetic/biometric data, sex life/orientation.', 2, 2),
('10000000-0000-0000-0000-000000000010', 'What should you do if you discover a data breach?', 'Report immediately to your manager/data protection officer. If a risk to individuals, report to the ICO within 72 hours. Document all breaches regardless of severity.', 3, 2),
('10000000-0000-0000-0000-000000000010', 'What are a data subject''s rights under GDPR?', 'Right to access, rectification, erasure, restriction of processing, data portability, to object, and rights related to automated decision making.', 4, 2),
('10000000-0000-0000-0000-000000000010', 'What does "confidentiality" mean in healthcare?', 'Information given in confidence should only be used for the purpose it was given and shared only with consent or where there is a legal basis. It is both a legal and ethical duty.', 5, 1),
('10000000-0000-0000-0000-000000000010', 'What is the "Caldicott Principles"?', 'A framework for protecting patient information: Justify purpose, Use only when necessary, Minimum necessary, Access on need-to-know, Understand responsibilities, Comply with law, Duty to share can be as important as duty to protect.', 6, 3),
('10000000-0000-0000-0000-000000000010', 'Can you discuss a resident''s care in a public corridor?', 'No. Care discussions should take place in private. Even using a resident''s name in a public area can breach confidentiality. Be aware of who can overhear.', 7, 1),
('10000000-0000-0000-0000-000000000010', 'When can you share information without consent?', 'When required by law, when there is a safeguarding concern, to prevent serious harm or death, for public health reasons, or with a court order. Always document your reasons.', 8, 2);
