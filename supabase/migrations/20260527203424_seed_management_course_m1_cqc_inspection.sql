DO $$ BEGIN

-- Insert course
INSERT INTO courses (id, category, title, description, target_role, expiry_months, is_active, estimated_minutes, organisation_id, created_by)
VALUES (
  'A0000000-0000-0000-0000-000000000001',
  'management_leadership',
  'Preparing for a CQC Inspection (Level 3)',
  'Understanding the CQC Single Assessment Framework, quality statements, evidence preparation, inspection day protocols, and responding to findings. Required for Registered Managers under Regulation 17 (Good Governance).',
  'managers_only',
  24,
  true,
  45,
  NULL,
  NULL
)
ON CONFLICT DO NOTHING;

-- Flashcards
INSERT INTO flashcards (course_id, question_text, answer_text, difficulty, order_index) VALUES

('A0000000-0000-0000-0000-000000000001',
 'What is the CQC and what is its statutory role?',
 'The Care Quality Commission (CQC) is the independent regulator of health and social care in England, established under the Health and Social Care Act 2008. Its statutory role is to register, monitor, inspect, and regulate services to ensure they meet fundamental standards of quality and safety. The CQC has powers to publish inspection ratings, issue warning notices, impose conditions, and cancel registrations.',
 1, 1),

('A0000000-0000-0000-0000-000000000001',
 'Explain the 5 CQC ratings and what triggers each.',
 'Outstanding is awarded when a service consistently exceeds expectations and demonstrates innovative, exceptional practice. Good means the service meets all fundamental standards and delivers effective, caring, responsive, and well-led care. Requires Improvement means the service is not meeting all standards and must make improvements within a defined timeframe. Inadequate means there are serious failings that place people at risk of harm and urgent action is required. Ratings are determined by the evidence gathered across all five quality questions during inspection.',
 2, 2),

('A0000000-0000-0000-0000-000000000001',
 'What are the 5 CQC quality questions in the Single Assessment Framework?',
 'The five quality questions are: Safe (are people protected from abuse and avoidable harm?), Effective (does care achieve good outcomes and is it based on best available evidence?), Caring (are staff compassionate and do they treat people with dignity and respect?), Responsive (are services organised to meet individual needs?), and Well-led (is there strong leadership, governance, and a culture of continuous improvement?). Every service is rated against all five questions.',
 1, 3),

('A0000000-0000-0000-0000-000000000001',
 'What are Quality Statements and how did they replace KLOEs?',
 'Quality Statements are commitments within the Single Assessment Framework (SAF) that describe what good care looks like for each quality question. They replaced the previous Key Lines of Enquiry (KLOEs), prompts, and ratings characteristics used before 2023. Each quality statement aligns to one of the five quality questions and is assessed through specific evidence categories. They are written from the perspective of what a service should be doing, making it easier to demonstrate compliance.',
 2, 4),

('A0000000-0000-0000-0000-000000000001',
 'What are the evidence categories in the CQC Single Assessment Framework?',
 'The SAF uses six evidence categories: People''s experiences of care (direct feedback from residents and families), Feedback from staff and leaders (views of those delivering care), Feedback from partners (other professionals and agencies), Observation (what inspectors see during visits), Processes (policies, procedures, governance systems), and Outcomes (measurable results of care such as incident data, clinical outcomes). Evidence from all categories is triangulated to form an overall judgement.',
 2, 5),

('A0000000-0000-0000-0000-000000000001',
 'How should training records be prepared for a CQC inspection?',
 'Training records must show a complete matrix of all mandatory training by role, with completion dates and renewal dates clearly visible. Have both individual staff training passports and a provider-level overview ready. Ensure e-learning certificates are accessible, face-to-face session attendance registers are filed, and any gaps have an action plan with target dates. Inspectors will cross-reference training completion against staff interview responses to verify competence.',
 2, 6),

('A0000000-0000-0000-0000-000000000001',
 'What supervision and appraisal records should be ready for inspection?',
 'Have a supervision schedule showing planned and completed sessions for all staff, including dates and signatures. Individual supervision notes should reflect professional development, wellbeing, performance, and any concerns raised. Annual appraisal records must include objectives set, competency sign-off, and training needs identified. Inspectors look for evidence that supervision is regular, meaningful, and acted upon — not just a tick-box exercise.',
 2, 7),

('A0000000-0000-0000-0000-000000000001',
 'What should be in place regarding policies and procedures before a CQC inspection?',
 'All policies must have a review date within the last 12 months and a version control number. Policies should be accessible to staff (physically or digitally) and staff must be able to demonstrate they know where to find them. Key policies include safeguarding, medicines management, infection control, moving and handling, mental capacity, and complaints. Have a policy review log showing when each was last updated and by whom.',
 2, 8),

('A0000000-0000-0000-0000-000000000001',
 'How should the complaints log be prepared for a CQC inspection?',
 'The complaints log must record every complaint received with the date, nature of complaint, investigation summary, outcome, actions taken, and date closed. Response letters should be filed alongside each entry. Inspectors look for evidence of timely responses (within 20 working days), genuine investigation, and most importantly, evidence that learning from complaints has been applied to improve care. Themed analysis showing systemic improvements is highly valued.',
 2, 9),

('A0000000-0000-0000-0000-000000000001',
 'How should accident and incident reports be prepared, including RCA?',
 'All incidents must be recorded on a standardised form with date, time, location, people involved, immediate actions, and follow-up. Serious incidents must include a Root Cause Analysis (RCA) documenting what happened, contributing factors (using a fishbone or 5 Whys approach), and actions taken to prevent recurrence. Have a summary sheet showing incident trends by type (falls, medication errors, pressure ulcers) and the actions taken. RIDDOR reportable incidents must have evidence of submission to the HSE.',
 3, 10),

('A0000000-0000-0000-0000-000000000001',
 'What resident and family feedback should be prepared for a CQC inspection?',
 'Gather and present Friends and Family Test results, satisfaction surveys, resident meeting minutes, and any written compliments. Show how feedback has been analysed and how it has influenced service improvements. Inspectors want to see that resident and family voice is genuinely embedded — not just collected. Evidence of resident involvement in care planning decisions also demonstrates this. Annual surveys with year-on-year comparison show continuous improvement.',
 2, 11),

('A0000000-0000-0000-0000-000000000001',
 'What is the difference between an announced and unannounced CQC inspection, and how should you prepare for each?',
 'An announced inspection gives the service advance notice (usually 48 hours) and is typically used for planned comprehensive inspections. An unannounced inspection can occur at any time without notice and is more common for responsive inspections triggered by concerns. For announced inspections, use the notice period to organise documents and brief staff. For unannounced inspections, the key is to maintain inspection-ready standards at all times — governance systems, staff knowledge, and care quality should never be reactive.',
 2, 12),

('A0000000-0000-0000-0000-000000000001',
 'What is the typical timeline of a CQC inspection from notification to final report?',
 'After notification (or unannounced arrival), the on-site inspection typically lasts 1–2 days for a care home. Inspectors may request further documents within a few days of the visit. A draft report is usually sent to the provider within 8–12 weeks for a factual accuracy check. The provider has 10 working days to submit a factual accuracy response. The final report is published on the CQC website after this process, typically 12–16 weeks from the inspection date.',
 2, 13),

('A0000000-0000-0000-0000-000000000001',
 'What documents do inspectors typically request in advance of an inspection?',
 'Inspectors commonly request: staffing rotas for the last 3 months, training matrix, supervision and appraisal records, complaints and compliments log, accident and incident reports, medication audit records, most recent care plans (sample), infection control audit, maintenance and health and safety records, DBS check register, recruitment records for recent starters, and the last provider self-assessment. Having these in a pre-prepared inspection folder significantly reduces stress on the day.',
 3, 14),

('A0000000-0000-0000-0000-000000000001',
 'What typical questions do inspectors ask carers during an inspection?',
 'Inspectors typically ask carers: How do you know what support a resident needs? What would you do if you had a safeguarding concern? How do you promote dignity? Can you describe a resident''s care plan? What training have you had and how recently? What would you do in a medication error situation? How are residents involved in decisions about their care? Carers should answer honestly and specifically, referencing actual residents (by description, not name if not consented) and real procedures.',
 2, 15),

('A0000000-0000-0000-0000-000000000001',
 'What questions do inspectors typically ask nurses and clinical leads during inspection?',
 'Clinical staff are asked about: medication management systems, clinical risk assessment processes, wound care and pressure ulcer prevention, escalation pathways (SBAR, RESTORE2), nutritional assessment and MUST scoring, end-of-life care planning (DNACPR, advance directives), oversight of care plan quality, involvement in governance and audits, and how they ensure clinical decisions are evidence-based. Nurses should be able to cite specific residents'' clinical needs (anonymised) and the rationale for clinical decisions made.',
 3, 16),

('A0000000-0000-0000-0000-000000000001',
 'What questions do inspectors typically ask a manager about governance and oversight?',
 'Managers are asked: How do you know the service is safe on a day-to-day basis? What governance systems are in place? How are incidents reviewed and learning shared? What audits are carried out and how often? How do you involve residents and families in running the service? What are your current quality improvement priorities? How do you ensure staff are competent and well-supervised? Managers should respond with specific examples and evidence, not general statements.',
 3, 17),

('A0000000-0000-0000-0000-000000000001',
 'What safety system questions might a manager face during a CQC inspection interview?',
 'Inspectors may ask: How do you manage and learn from incidents? What is your RIDDOR reporting process? How do you identify and respond to deteriorating residents? What is your medicines management audit process? How do you ensure safe staffing levels? What is your process following a serious fall or pressure ulcer? Managers must be able to evidence their answers with data, audit results, and examples of service changes made following safety incidents.',
 3, 18),

('A0000000-0000-0000-0000-000000000001',
 'What questions do inspectors ask residents and families during inspection?',
 'Inspectors ask residents: Do you feel safe here? Are staff kind and do they respect your privacy? Do you have choice and control over your daily routine? Are your care needs being met? Do you know how to make a complaint? They ask families: Do you feel informed about your relative''s care? Are you involved in care planning? How has the service responded when you''ve raised concerns? Are you confident the service is well managed? These conversations are confidential and staff should not hover nearby.',
 2, 19),

('A0000000-0000-0000-0000-000000000001',
 'What are the dos and don''ts for all staff during a CQC inspection?',
 'Do: continue delivering care as normal, answer questions honestly and specifically, direct inspectors to the manager if unsure, be professional and welcoming. Don''t: panic or change normal practice, give pre-rehearsed scripted answers, ask inspectors what they think so far, discuss confidential resident matters in communal areas, hide documents or incidents, or try to manage what the inspector sees. Inspectors are trained to detect artificial behaviour — authentic, consistent practice is the best preparation.',
 2, 20),

('A0000000-0000-0000-0000-000000000001',
 'What is a 7-day preparation checklist after receiving a Notice of Inspection?',
 'Day 1: Notify all staff and reassure them. Days 1-2: Organise documents folder (training, supervision, complaints, incidents, care plans, audits, policies). Day 3: Conduct a rapid self-assessment against the 5 quality questions. Day 4: Brief clinical leads on likely questions and evidence locations. Day 5: Check the physical environment — cleanliness, signage, dignity and privacy. Day 6: Ensure all online systems (care planning software, medicines management) are up to date. Day 7: Final check, confirm who is on shift, ensure manager is present throughout.',
 2, 21),

('A0000000-0000-0000-0000-000000000001',
 'What are condition notices and warning notices, and what are the response timelines?',
 'A condition notice imposes specific requirements on a registered provider, such as restricting admissions or requiring additional oversight. A warning notice is issued when a service is failing to meet a fundamental standard and requires urgent action within a specified timeframe — typically 14 to 28 days. The provider must respond in writing within the stated deadline with evidence of actions taken. Failure to comply can result in cancellation of registration, prosecution, or urgent enforcement action.',
 3, 22),

('A0000000-0000-0000-0000-000000000001',
 'How should a manager write an action plan following a Requires Improvement rating?',
 'The action plan should address each area identified as requiring improvement with specific, measurable actions. Each action must have a named lead person, a realistic target date, and a means of evidencing completion. The plan should be reviewed regularly at governance meetings and progress reported to the provider board. Share the action plan with staff, residents, and families. Submit it to the CQC if required and request a follow-up inspection once the majority of actions are evidenced as complete.',
 3, 23),

('A0000000-0000-0000-0000-000000000001',
 'What is the legal requirement for displaying a CQC rating under Regulation 20A?',
 'Regulation 20A of the Health and Social Care Act 2008 (Regulated Activities) Regulations 2014 requires all CQC-registered providers to display their most recent CQC rating in a conspicuous place at each location and on their website. The rating must be displayed prominently and be clearly visible to service users and visitors. Failure to display the rating is a criminal offence. The CQC provides a branded ratings display card for this purpose, which must be updated whenever a new rating is published.',
 2, 24),

('A0000000-0000-0000-0000-000000000001',
 'What does Regulation 17 (Good Governance) require and what evidence is needed?',
 'Regulation 17 requires providers to have effective systems and processes to assess, monitor, and improve the quality and safety of services. This includes: maintaining accurate, complete, and contemporaneous records; assessing and mitigating risks; identifying, receiving, and acting on complaints; seeking and acting on feedback; and ensuring staff have the skills, competence, and experience to deliver safe, effective care. Evidence includes governance meeting minutes, audit schedules and results, risk registers, staff records, complaints logs, and quality improvement plans.',
 3, 25)

ON CONFLICT DO NOTHING;

-- Quiz questions
INSERT INTO quiz_questions (course_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES

('A0000000-0000-0000-0000-000000000001',
 'What does CQC stand for and under which Act was it established?',
 'Care Quality Commission, established under the Health and Social Care Act 2008',
 'Care Quality Commission, established under the Care Act 2014',
 'Care and Quality Council, established under the Health and Social Care Act 2012',
 'Care Quality Commission, established under the Mental Health Act 1983',
 'A',
 'The Care Quality Commission was established under the Health and Social Care Act 2008 as the independent regulator of health and social care in England.'),

('A0000000-0000-0000-0000-000000000001',
 'Which of the following is NOT one of the CQC''s five quality questions?',
 'Safe',
 'Effective',
 'Accountable',
 'Well-led',
 'C',
 'The five CQC quality questions are Safe, Effective, Caring, Responsive, and Well-led. Accountable is not one of the five quality questions in the Single Assessment Framework.'),

('A0000000-0000-0000-0000-000000000001',
 'What replaced Key Lines of Enquiry (KLOEs) in the CQC Single Assessment Framework?',
 'Quality Standards',
 'Quality Statements',
 'Quality Indicators',
 'Quality Outcomes',
 'B',
 'Quality Statements replaced KLOEs, prompts, and ratings characteristics when the CQC introduced the Single Assessment Framework. They describe what good care looks like for each quality question.'),

('A0000000-0000-0000-0000-000000000001',
 'How many evidence categories are used in the CQC Single Assessment Framework?',
 'Four',
 'Five',
 'Six',
 'Seven',
 'C',
 'The SAF uses six evidence categories: People''s experiences, Feedback from staff and leaders, Feedback from partners, Observation, Processes, and Outcomes. All six are used to triangulate evidence and form judgements.'),

('A0000000-0000-0000-0000-000000000001',
 'Under Regulation 20A, where must a CQC rating be displayed?',
 'Only on the provider''s website',
 'Only at the entrance to the building',
 'In a conspicuous place at each location and on the provider''s website',
 'Only in the manager''s office',
 'C',
 'Regulation 20A requires the rating to be displayed prominently at each location AND on the provider''s website. Failure to display the rating is a criminal offence.'),

('A0000000-0000-0000-0000-000000000001',
 'What is the typical timeframe from a CQC inspection to publication of the final report?',
 '2-4 weeks',
 '4-6 weeks',
 '8-12 weeks for draft, then published after factual accuracy check (typically 12-16 weeks total)',
 '6 months',
 'C',
 'A draft report is typically sent to the provider within 8-12 weeks. After the factual accuracy check period (10 working days), the final report is published, making the total process typically 12-16 weeks.'),

('A0000000-0000-0000-0000-000000000001',
 'What does Regulation 17 primarily require of registered providers?',
 'Safe recruitment processes for all staff',
 'Effective systems to assess, monitor, and improve quality and safety',
 'Regular fire safety assessments',
 'Monthly clinical audits signed off by a registered nurse',
 'B',
 'Regulation 17 (Good Governance) requires providers to have effective systems and processes to assess, monitor, and improve the quality and safety of services. It encompasses record-keeping, risk management, complaint handling, and staff competence.'),

('A0000000-0000-0000-0000-000000000001',
 'During an unannounced CQC inspection, what is the most important thing for staff to do?',
 'Quickly tidy the premises and update care plans before inspectors see them',
 'Contact the registered manager immediately and wait for instructions before speaking to inspectors',
 'Continue delivering care as normal and answer questions honestly and specifically',
 'Decline to answer questions until the manager is present',
 'C',
 'The most important thing is to continue delivering care as normal. Inspectors are trained to detect artificial behaviour. Staff should answer questions honestly and specifically. There is no need to wait for the manager before answering general questions about their role.'),

('A0000000-0000-0000-0000-000000000001',
 'What is the key difference between an announced and unannounced CQC inspection?',
 'Announced inspections only assess the Safe domain; unannounced inspections assess all five domains',
 'Announced inspections give advance notice (typically 48 hours); unannounced inspections happen without warning',
 'Announced inspections are conducted by senior inspectors; unannounced by junior inspectors',
 'Announced inspections result in a written report; unannounced inspections result only in verbal feedback',
 'B',
 'The key difference is notification: announced inspections provide advance notice (typically 48 hours), while unannounced inspections can occur at any time without warning. The best preparation for unannounced inspections is maintaining consistently high standards at all times.'),

('A0000000-0000-0000-0000-000000000001',
 'What should a training matrix demonstrate for CQC purposes?',
 'Only that mandatory training has been completed for staff who have been employed for over a year',
 'All mandatory training by role with completion dates, renewal dates, and an action plan for any gaps',
 'That at least 50% of staff have completed mandatory training in the last 12 months',
 'That training has been completed but individual staff names can be anonymised',
 'B',
 'A training matrix must show all mandatory training by role with completion and renewal dates clearly visible. Any gaps must have an action plan with target dates. Inspectors cross-reference training completion against staff interview responses to verify actual competence.'),

('A0000000-0000-0000-0000-000000000001',
 'What does a CQC inspector primarily look for when reviewing a complaints log?',
 'That all complaints were resolved in the complainant''s favour',
 'Timely responses, genuine investigation, and evidence that learning from complaints has been applied to improve care',
 'That the number of complaints has decreased year on year',
 'That all complaints were resolved without needing to escalate to the ombudsman',
 'B',
 'Inspectors look for evidence of timely responses (within 20 working days), genuine investigation, and crucially, that learning from complaints has been applied to improve care. Themed analysis demonstrating systemic improvements is highly valued.'),

('A0000000-0000-0000-0000-000000000001',
 'What is a warning notice issued by the CQC?',
 'A document sent to residents warning them that the service may close',
 'A notice requiring a provider to meet a fundamental standard within a specified timeframe, typically 14-28 days',
 'A letter sent to staff informing them of performance concerns',
 'A public notice displayed on the CQC website alerting the community to concerns',
 'B',
 'A warning notice is issued when a service is failing to meet a fundamental standard. The provider must respond within the stated timeframe (typically 14-28 days) with evidence of actions taken. Failure to comply can result in cancellation of registration or prosecution.'),

('A0000000-0000-0000-0000-000000000001',
 'What is the most appropriate response when a carer is asked a question by a CQC inspector during an inspection?',
 'Say you cannot answer questions without the manager present',
 'Give a pre-rehearsed scripted answer that reflects positively on the service',
 'Answer honestly and specifically, referencing actual practice and real procedures',
 'Deflect by saying you are too busy caring for residents to stop and talk',
 'C',
 'Carers should answer honestly and specifically, referencing actual practice and real procedures. Inspectors are trained to identify scripted answers and artificial behaviour. Honesty and authenticity are essential.'),

('A0000000-0000-0000-0000-000000000001',
 'Which of the following is a key component of an action plan following a Requires Improvement rating?',
 'A commitment to appeal the rating to the CQC within 7 days',
 'Specific actions with named lead persons, realistic target dates, and means of evidencing completion',
 'A statement from the registered manager that all issues have already been resolved',
 'A request for a new inspection to be carried out within 4 weeks',
 'B',
 'An action plan following a Requires Improvement rating must contain specific, measurable actions with named lead persons, realistic target dates, and clear means of evidencing completion. It should be regularly reviewed and shared with staff, residents, and families.'),

('A0000000-0000-0000-0000-000000000001',
 'What is the purpose of a factual accuracy check in the CQC inspection process?',
 'To allow providers to dispute the overall rating awarded by the inspector',
 'To allow providers to identify and correct factual inaccuracies in the draft report before it is published',
 'To allow providers to add additional positive evidence not seen during the inspection',
 'To allow the CQC to verify that the provider has purchased the correct insurance',
 'B',
 'The factual accuracy check allows providers to identify factual inaccuracies (not disagreements of opinion) in the draft report. Providers have 10 working days to submit a factual accuracy response. This is not an opportunity to change the rating, only to correct factual errors.'),

('A0000000-0000-0000-0000-000000000001',
 'What should supervision records demonstrate to a CQC inspector?',
 'That supervision sessions are completed annually for each member of staff',
 'That supervision is regular, meaningful, and that issues raised are acted upon',
 'That all supervision is conducted by a registered nurse or manager',
 'That staff have not raised any concerns during supervision',
 'B',
 'Inspectors want to see that supervision is regular, meaningful, and acted upon — not just a tick-box exercise. Records should reflect professional development, wellbeing, performance, and any concerns raised, with evidence that these were followed up.'),

('A0000000-0000-0000-0000-000000000001',
 'What is the CQC''s rating of Outstanding awarded for?',
 'Services that have had no complaints in the previous 12 months',
 'Services that consistently exceed expectations and demonstrate innovative, exceptional practice',
 'Services that have achieved full compliance with all CQC fundamental standards',
 'Services that have implemented all recommended actions from a previous inspection',
 'B',
 'Outstanding is awarded when a service consistently exceeds expectations and demonstrates innovative, exceptional practice. It is not simply awarded for compliance — it requires evidence of exceptionally person-centred, responsive, and effective care.'),

('A0000000-0000-0000-0000-000000000001',
 'What are inspectors most likely to ask a manager about regarding incident management?',
 'How many incidents have been reported in the last year and whether any were RIDDOR reportable',
 'How incidents are reviewed, how learning is shared with staff, and how the service has changed practice as a result',
 'Whether incident forms were completed within 24 hours by the member of staff on duty',
 'Whether all incidents were reported to the local safeguarding team',
 'B',
 'Inspectors focus on the governance cycle around incidents: how they are reviewed, how learning is extracted and shared with staff, and critically, how the service has changed its practice to prevent recurrence. Data alone is less valuable than evidence of a genuine learning culture.'),

('A0000000-0000-0000-0000-000000000001',
 'What is the primary purpose of policy review dates and version control in a care home?',
 'To satisfy CQC requirements for document management systems',
 'To ensure policies reflect current legislation, best practice, and that staff are using the most up-to-date guidance',
 'To provide evidence that the manager has read all policies in the last year',
 'To demonstrate that the provider has spent money on policy subscription services',
 'B',
 'Review dates and version control ensure that policies remain current and reflect the latest legislation and best practice. They also help staff and inspectors identify which version is in use and confirm that the provider is actively maintaining its governance systems.'),

('A0000000-0000-0000-0000-000000000001',
 'What should a manager do when an inspector asks to see a sample of care plans?',
 'Provide only the most recently updated care plans to demonstrate current practice',
 'Provide the care plans requested promptly and be prepared to explain the care needs and clinical decisions documented in them',
 'Ask the inspector to review the care planning software training manual first',
 'Only provide care plans for residents who have consented to their records being shared',
 'B',
 'The manager should provide the requested care plans promptly and be prepared to discuss the care needs, risk assessments, and clinical decisions documented. Inspectors are authorised to access care records without individual resident consent for the purpose of inspection under the Health and Social Care Act 2008.')

ON CONFLICT DO NOTHING;

END $$;