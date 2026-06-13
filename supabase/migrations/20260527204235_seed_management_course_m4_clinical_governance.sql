DO $$ BEGIN

-- Insert course
INSERT INTO courses (id, category, title, description, target_role, expiry_months, is_active, estimated_minutes, organisation_id, created_by)
VALUES (
  'A0000000-0000-0000-0000-000000000004',
  'management_leadership',
  'Clinical Governance and Risk Management',
  'Framework for quality improvement in care settings. Covers risk assessment methodologies, incident reporting, root cause analysis, audit cycles, and quality improvement tools. Required for CQC Regulation 17 compliance.',
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

('A0000000-0000-0000-0000-000000000004',
 'What is the definition of clinical governance and its relevance to care homes?',
 'Clinical governance was defined by Scally and Donaldson (1998) as "a framework through which NHS organisations are accountable for continuously improving the quality of their services and safeguarding high standards of care by creating an environment in which excellence in clinical care will flourish." In care homes, clinical governance means having systems and processes to deliver safe, effective, quality care — including risk management, staff training, audit, incident review, and a culture of continuous improvement. It underpins CQC Regulation 17 (Good Governance).',
 2, 1),

('A0000000-0000-0000-0000-000000000004',
 'What are the 7 pillars of clinical governance?',
 'The 7 pillars are: 1. Clinical Effectiveness — ensuring care is evidence-based and achieves good outcomes. 2. Risk Management — identifying and mitigating risks systematically. 3. Patient/Resident Safety — systems to prevent harm. 4. Communication — clear, timely communication across teams and with residents. 5. Education and Training — ensuring staff are competent and continuously developing. 6. Information — using data and records to drive quality. 7. Staff Management — recruitment, supervision, appraisal, and wellbeing. All seven work together to create a high-quality care environment.',
 2, 2),

('A0000000-0000-0000-0000-000000000004',
 'What are the 5 steps of risk assessment?',
 'The 5 steps of risk assessment (HSE framework) are: 1. Identify the hazards — what could cause harm? 2. Decide who might be harmed and how — residents, staff, visitors. 3. Evaluate the risks — assess likelihood and severity, consider existing controls. 4. Record findings — document the assessment with controls in place and residual risk. 5. Review and update — reassess regularly and after any incident. In care homes, this applies to individual residents (manual handling, falls, skin integrity) and environmental hazards (fire, infection, equipment).',
 1, 3),

('A0000000-0000-0000-0000-000000000004',
 'What is the hierarchy of risk controls applied to care settings?',
 'The hierarchy of risk controls (most to least effective) is: 1. Eliminate — remove the hazard entirely (e.g., remove a broken piece of equipment). 2. Substitute — replace with something less hazardous (e.g., use a hoist instead of manual lift). 3. Engineering controls — physical barriers or aids (e.g., bed rails, call systems). 4. Administrative controls — procedures, training, supervision (e.g., repositioning schedules). 5. PPE — personal protective equipment as a last resort (e.g., gloves, aprons). In care, administrative controls and PPE are most commonly used but should not be relied upon as the primary control.',
 2, 4),

('A0000000-0000-0000-0000-000000000004',
 'What must be reported under incident reporting, RIDDOR, and internal vs external reporting?',
 'Internally, all incidents including near-misses must be reported using the organisation''s incident form. Externally: RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013) requires reporting of deaths, specified injuries to workers, injuries to non-workers (including residents) requiring hospitalisation, dangerous occurrences, and certain diseases to the HSE. The CQC must be notified of Notifiable Events (deaths, serious injuries, deprivation of liberty). The local authority safeguarding team must be notified of any suspected abuse. Documentation of all reports must be retained.',
 3, 5),

('A0000000-0000-0000-0000-000000000004',
 'What are the 6 steps of Significant Event Analysis (SEA)?',
 'The 6 steps of SEA are: 1. Describe the event — what happened, when, who was involved. 2. Gather information — collect all relevant records, statements, and data. 3. Analyse — identify what went well, what went wrong, and why. 4. Identify agreed actions — specific improvements to prevent recurrence. 5. Implement changes — carry out the agreed actions within set timescales. 6. Share learning — disseminate the findings to relevant staff and teams. SEA is a no-blame tool focused on system improvement rather than individual fault.',
 2, 6),

('A0000000-0000-0000-0000-000000000004',
 'What is Root Cause Analysis (RCA) and what methods are used?',
 'Root Cause Analysis (RCA) is a systematic method for identifying the underlying cause(s) of an incident or problem rather than just addressing surface symptoms. Key methods include: the Fishbone (Ishikawa) Diagram — a visual tool categorising causes into people, process, equipment, and environment; the 5 Whys technique — asking "why?" repeatedly until the root cause is identified; and the People-Process-Equipment-Environment model — systematically examining each category for contributing factors. RCA findings should drive changes to systems and processes, not just individual behaviour.',
 2, 7),

('A0000000-0000-0000-0000-000000000004',
 'How do PDSA cycles work for continuous improvement in care?',
 'PDSA (Plan-Do-Study-Act) is a quality improvement cycle used to test changes on a small scale before wider implementation. Plan: identify what you want to improve, set a measurable aim, and plan a small test of change. Do: implement the change in a small, controlled way (e.g., a single shift or ward). Study: analyse the results — did it work? Act: if successful, scale up; if not, modify the plan and test again. PDSA cycles are iterative — multiple cycles lead to sustained improvement. They are recommended by NHS England and NICE for quality improvement in care settings.',
 2, 8),

('A0000000-0000-0000-0000-000000000004',
 'What is the clinical audit cycle and how is it used in care homes?',
 'The clinical audit cycle has 5 stages: 1. Set criteria — define what best practice looks like (evidence-based standard). 2. Collect data — measure current practice against the standard. 3. Compare — identify gaps between current practice and the standard. 4. Make changes — implement improvements to close the gap. 5. Re-audit — measure again to confirm improvement has been achieved. In care homes, audit topics include: medication administration accuracy, pressure ulcer prevention, care plan completeness, falls management, and infection control. Re-auditing is essential — without it, the cycle is incomplete.',
 2, 9),

('A0000000-0000-0000-0000-000000000004',
 'What are the key performance indicators (KPIs) for care homes?',
 'Key KPIs for care homes include: pressure ulcer incidence and avoidability rate, falls rate and falls with harm rate, medication errors (including near-misses), healthcare-associated infection rate (UTIs, chest infections), hospital readmission rate within 30 days, unplanned weight loss, dehydration incidents, staff turnover and sickness rate, training completion rate, and complaints and compliments ratio. KPIs should be tracked monthly, benchmarked against national averages, and reviewed at governance meetings. Trends over time are more meaningful than single-point data.',
 2, 10),

('A0000000-0000-0000-0000-000000000004',
 'What is the duty of quality under the Health and Social Care Act 2012 and CQC requirements?',
 'Section 26 of the Health and Social Care Act 2012 places a duty on NHS commissioners and providers to continuously improve the quality of services. For care homes, CQC Regulation 17 translates this into a duty to have effective governance systems in place. Providers must be able to demonstrate that they assess, monitor, and improve quality continuously — not just in response to incidents or inspections. Quality accounts, self-assessment, and governance reporting are all tools for evidencing the duty of quality.',
 3, 11),

('A0000000-0000-0000-0000-000000000004',
 'What should be included in a clinical governance report?',
 'A clinical governance report should include: incident data (types, trends, RIDDOR reportables), KPI performance against targets, audit results and action plans, complaints and compliments summary, training completion rates, supervision and appraisal completion rates, staffing levels and turnover, any never events or serious incidents and their RCA outcomes, and quality improvement project progress. Reports should be produced monthly or quarterly and presented to the provider board or responsible individual. They form a central part of the evidence for CQC Well-led compliance.',
 3, 12),

('A0000000-0000-0000-0000-000000000004',
 'How is a fishbone (Ishikawa) diagram used in a care home RCA?',
 'A fishbone diagram is a visual tool where the "head" of the fish represents the problem (e.g., a resident fell and sustained a fracture) and the "bones" represent categories of contributing factors: People (staffing levels, training, communication), Process (care plan accuracy, handover, assessment), Equipment (bed height, call bells, footwear), and Environment (floor surfaces, lighting, obstacles). Each category is explored to identify specific contributing causes. The diagram helps teams see all factors simultaneously and prevents the instinct to blame a single person rather than a system.',
 2, 13),

('A0000000-0000-0000-0000-000000000004',
 'What is process mapping and how is it used to map a care pathway?',
 'Process mapping is a visual representation of every step in a care pathway — from admission to discharge or a specific care event. It shows who does what, in what order, and where handoffs between people or teams occur. To map a pathway, identify the start and end point, list every step (using boxes), add decision points (diamonds), and link them with arrows. Process maps reveal: duplication, unnecessary steps, gaps, and points of handover failure. In care homes, process mapping is used for medication administration, wound care, falls response, and care planning.',
 3, 14),

('A0000000-0000-0000-0000-000000000004',
 'What is the LeDeR programme and how does it relate to learning from deaths in care homes?',
 'The Learning from Deaths of People with a Learning Disability (LeDeR) programme was established to review and learn from the deaths of people with learning disabilities. From 2023, it was expanded to include autistic people. Care homes accommodating people with learning disabilities or autism must refer deaths to the LeDeR programme for review. More broadly, all care homes should have a local mortality review process: reviewing each death to determine whether care was appropriate, whether anything could have prevented it, and what learning can be applied. This is part of the governance duty under Regulation 17.',
 3, 15),

('A0000000-0000-0000-0000-000000000004',
 'How does whistleblowing function as a governance tool — what is Freedom to Speak Up?',
 'Freedom to Speak Up (FTSU) is a national initiative, originally NHS-based but increasingly relevant to social care, that encourages staff to raise concerns without fear of reprisal. The FTSU Guardian role exists to support staff who raise concerns about safety and quality. In care homes, managers should create a culture where staff feel psychologically safe to report incidents, near-misses, and governance failures. Whistleblowing is protected under the Public Interest Disclosure Act 1998. Staff concerns are a key source of governance intelligence — suppressing concerns damages quality and safety.',
 3, 16),

('A0000000-0000-0000-0000-000000000004',
 'What is a staff training governance matrix and how are competency sign-off and refresher tracking managed?',
 'A training governance matrix is a document (usually a spreadsheet or care management system feature) that maps every mandatory training requirement by role, showing each staff member''s completion date and renewal due date. Competency sign-off means a supervisor or assessor has verified that the staff member can apply the training in practice — not just completed the e-learning. Refresher tracking ensures that training does not lapse. The matrix should be reviewed monthly by the manager and reported at governance meetings. Gaps must have action plans with target dates.',
 2, 17),

('A0000000-0000-0000-0000-000000000004',
 'How does information governance fit within clinical governance — what are DSPT and Caldicott?',
 'Information governance (IG) ensures that personal and confidential data is handled lawfully, securely, and appropriately — forming part of the broader clinical governance framework. The Data Security and Protection Toolkit (DSPT) is an online self-assessment tool used by organisations handling NHS data to demonstrate compliance with data protection standards. The Caldicott Principles are 8 principles governing the use of identifiable patient/resident data, overseen by a nominated Caldicott Guardian. Care homes processing personal health data must comply with GDPR, DSPT requirements, and the Caldicott Framework.',
 3, 18),

('A0000000-0000-0000-0000-000000000004',
 'What should a governance dashboard show for board-level reporting?',
 'A governance dashboard provides an at-a-glance view of service quality for the provider board or responsible individual. It should include: KPI performance (RAG-rated: Red/Amber/Green), incident trends, audit results, training compliance rates, staffing data (vacancies, agency use, sickness), complaints and Duty of Candour cases, regulatory notifications, and quality improvement project status. A good dashboard enables the board to identify risks early, hold the manager to account, and fulfil their CQC Regulation 17 oversight responsibilities.',
 3, 19),

('A0000000-0000-0000-0000-000000000004',
 'What are never events in care homes and what are the reporting requirements?',
 'Never events are serious, largely preventable patient safety incidents that should not occur if the correct safeguards are in place. While the official NHS Never Events list is primarily designed for acute settings, applicable examples in care include: wrong-site medication administration of a high-risk drug, serious harm from a bedrail entrapment, and retained foreign objects. Care homes should define their own "should never happen" list. All serious incidents must be reported to the CQC as Notifiable Events, and an RCA must be completed. Never events should trigger an immediate review of safety systems.',
 3, 20),

('A0000000-0000-0000-0000-000000000004',
 'What are human factors in patient safety and what are common causes of error in care settings?',
 'Human factors refers to how the design of systems, environments, and tasks affects human performance and error. Common causes of error in care include: fatigue (particularly at end of long shifts), interruptions during medication administration, poor communication at handover, high cognitive load (too many tasks simultaneously), inadequate training for the task, and a blame culture that discourages reporting. Addressing human factors means designing systems that reduce the likelihood of error — for example, standardised handover tools (SBAR), dedicated medication administration time, and double-checking systems for high-risk medicines.',
 3, 21),

('A0000000-0000-0000-0000-000000000004',
 'What is benchmarking and how is it used to compare a service against national standards?',
 'Benchmarking means comparing your service''s performance data against an external reference point — either national standards (such as NICE guidelines or CQC national data) or peer organisations of similar size and type. In care homes, benchmarking might compare your pressure ulcer prevalence, falls rate, or staff turnover against national averages published by NHS Digital or Skills for Care. Benchmarking helps identify whether your performance is genuinely good or simply average, and flags areas for targeted improvement. It should be a regular feature of governance reporting.',
 2, 22),

('A0000000-0000-0000-0000-000000000004',
 'How is SBAR used in governance escalation?',
 'SBAR (Situation-Background-Assessment-Recommendation) is a structured communication tool used to escalate concerns clearly and efficiently. In governance, it can be used when escalating a serious concern to the board: Situation — describe the issue concisely; Background — provide relevant context (trend data, previous actions); Assessment — your analysis of the severity and risk; Recommendation — what action you are requesting or proposing. Using SBAR in governance meetings ensures that concerns are communicated with sufficient detail for the board to make an informed decision.',
 2, 23),

('A0000000-0000-0000-0000-000000000004',
 'What is a harm review panel and how does multidisciplinary review of serious incidents work?',
 'A harm review panel is a multidisciplinary group convened to review serious incidents — particularly those involving significant harm or death. Typically includes: the registered manager, a senior nurse or clinical lead, the responsible individual or board representative, and ideally an external clinical or quality adviser. The panel reviews the RCA, scrutinises the adequacy of the investigation, confirms whether all root causes have been identified, approves the action plan, and monitors completion. The panel provides independent oversight that prevents defensive or incomplete internal investigations.',
 3, 24),

('A0000000-0000-0000-0000-000000000004',
 'What does the CQC''s Well-Led domain look for in governance systems during inspection?',
 'The CQC''s Well-Led domain assesses whether the service has a clear vision and values, strong leadership, effective governance systems, a culture of openness and learning, and meaningful involvement of residents and families in running the service. Inspectors look for: a functioning governance committee or meeting structure, regular audits with evidence of action, an incident reporting culture, training compliance, staff supervision, and a board that has meaningful oversight — not just rubber-stamping. A service cannot achieve Good or Outstanding in Well-Led without robust governance systems evidenced in practice.',
 3, 25)

ON CONFLICT DO NOTHING;

-- Quiz questions
INSERT INTO quiz_questions (course_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES

('A0000000-0000-0000-0000-000000000004',
 'Who defined clinical governance in 1998 and what was the original context?',
 'Donaldson and Scally, in the context of improving social care homes',
 'Scally and Donaldson, in the context of making NHS organisations accountable for continuously improving quality',
 'Francis and Keogh, following the Mid Staffordshire Inquiry',
 'The CQC, as part of the Single Assessment Framework',
 'B',
 'Clinical governance was defined by Scally and Donaldson in 1998 as a framework through which NHS organisations are accountable for continuously improving the quality of their services. The principles have since been adopted across all health and social care settings.'),

('A0000000-0000-0000-0000-000000000004',
 'Which of the following is NOT one of the 7 pillars of clinical governance?',
 'Risk Management',
 'Clinical Effectiveness',
 'Financial Planning',
 'Staff Management',
 'C',
 'The 7 pillars of clinical governance are: Clinical Effectiveness, Risk Management, Patient/Resident Safety, Communication, Education and Training, Information, and Staff Management. Financial Planning is not one of the seven pillars.'),

('A0000000-0000-0000-0000-000000000004',
 'What is the correct order of the 5 steps of risk assessment?',
 'Evaluate, Identify, Record, Control, Review',
 'Identify hazards, Decide who may be harmed, Evaluate risks, Record findings, Review and update',
 'Report, Investigate, Mitigate, Monitor, Audit',
 'Plan, Do, Study, Act, Review',
 'B',
 'The HSE''s 5 steps of risk assessment are: 1. Identify the hazards, 2. Decide who might be harmed and how, 3. Evaluate the risks, 4. Record findings, 5. Review and update. This framework applies to individual resident risk assessments and environmental hazards alike.'),

('A0000000-0000-0000-0000-000000000004',
 'In the hierarchy of risk controls, which is the MOST effective control?',
 'PPE (Personal Protective Equipment)',
 'Administrative controls (procedures and training)',
 'Elimination of the hazard',
 'Engineering controls',
 'C',
 'Elimination is the most effective control — removing the hazard entirely. The hierarchy (most to least effective) is: Eliminate, Substitute, Engineer, Administrative controls, PPE. PPE is the least effective as it relies entirely on individual behaviour.'),

('A0000000-0000-0000-0000-000000000004',
 'Under RIDDOR, which of the following must be reported to the HSE?',
 'All falls, regardless of injury',
 'Deaths of workers, specified injuries to workers, and injuries to non-workers (including residents) requiring hospitalisation',
 'Only incidents involving residents who are NHS-funded',
 'Any incident that results in a complaint from a family member',
 'B',
 'RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013) requires reporting of: deaths, specified injuries to workers, injuries to non-workers requiring hospitalisation, dangerous occurrences, and certain diseases. All falls that result in resident hospitalisation must be reported to the HSE under RIDDOR.'),

('A0000000-0000-0000-0000-000000000004',
 'What is the 5 Whys technique in Root Cause Analysis?',
 'A method of asking five different people why an incident occurred to get a rounded view',
 'A technique of asking "why?" repeatedly in response to each answer until the root cause of an incident is identified',
 'A five-step incident investigation checklist required by the CQC',
 'A questioning tool used during CQC staff interviews to assess safety culture',
 'B',
 'The 5 Whys technique involves asking "why?" in response to each successive answer, typically five times, until the root cause is identified. For example: a resident fell (why?) → the floor was wet (why?) → a spill was not cleaned up (why?) → the cleaning schedule was not followed (why?) → there was insufficient staffing (why?) → bank staff were not briefed on the schedule. This reveals a systemic cause rather than individual blame.'),

('A0000000-0000-0000-0000-000000000004',
 'In a PDSA cycle, what does the "Study" phase involve?',
 'Reading academic literature about the improvement topic',
 'Analysing the results of the small test of change to determine whether it worked',
 'Studying the care plans of residents involved in the improvement',
 'Conducting a clinical audit before implementing any changes',
 'B',
 'In a PDSA cycle, the Study phase involves analysing the results of the small test of change: did it achieve the intended improvement? Data collected during the Do phase is reviewed to inform the next decision — whether to scale up (Act), modify, or abandon the change.'),

('A0000000-0000-0000-0000-000000000004',
 'What is the final and essential step of the clinical audit cycle?',
 'Writing up the audit findings in a report',
 'Presenting the audit results to the board',
 'Re-audit to confirm that the changes made have achieved the intended improvement',
 'Filing the audit in the governance folder',
 'C',
 'The audit cycle is only complete when the re-audit is done. Without re-auditing, there is no evidence that the changes implemented actually improved practice. The cycle must close: set criteria → collect data → compare → make changes → re-audit. Many services complete audits but fail to close the loop.'),

('A0000000-0000-0000-0000-000000000004',
 'Which of the following is a Key Performance Indicator (KPI) for care homes?',
 'The number of visitors attending the home each week',
 'The number of GP visits to the home each month',
 'Pressure ulcer incidence and avoidability rate',
 'The number of new admissions each quarter',
 'C',
 'Pressure ulcer incidence and avoidability rate is a key clinical KPI for care homes. Other KPIs include falls rate, medication errors, infection rates, hospital readmissions, and staff turnover. Visitor numbers and GP visits are not standard KPIs in this context.'),

('A0000000-0000-0000-0000-000000000004',
 'What categories does a fishbone (Ishikawa) diagram examine in a care home RCA?',
 'Policy, Procedure, People, and Paperwork',
 'People, Process, Equipment, and Environment',
 'Planning, Delivery, Review, and Improvement',
 'Safety, Effectiveness, Caring, and Responsiveness',
 'B',
 'A fishbone diagram examines four main categories of contributing factors: People, Process, Equipment, and Environment. Each bone of the fish represents one category, with specific causes branching off it. This prevents single-cause attribution and reveals the systemic nature of most incidents.'),

('A0000000-0000-0000-0000-000000000004',
 'What does a governance dashboard''s RAG rating system mean?',
 'Risk, Analysis, and Guidance — a three-stage investigation tool',
 'Red (serious concern), Amber (monitor), Green (on track) — a colour-coded performance indicator system',
 'Regulation, Accountability, and Governance — the three pillars of CQC compliance',
 'Report, Assess, and Grade — the CQC''s three-stage inspection process',
 'B',
 'RAG stands for Red/Amber/Green — a traffic light colour-coding system used in governance dashboards. Red indicates a serious concern requiring immediate action, Amber indicates a developing concern to monitor, and Green indicates performance is on track. RAG ratings enable boards to prioritise governance attention effectively.'),

('A0000000-0000-0000-0000-000000000004',
 'What does SBAR stand for in the context of clinical governance escalation?',
 'Safety, Benchmark, Assessment, Review',
 'Situation, Background, Assessment, Recommendation',
 'Safeguarding, Behaviour, Action, Reporting',
 'System, Background, Analysis, Risk',
 'B',
 'SBAR stands for Situation, Background, Assessment, Recommendation. It is a structured communication tool used to escalate concerns clearly. In governance, it ensures that boards receive sufficient context to make informed decisions about quality and safety concerns.'),

('A0000000-0000-0000-0000-000000000004',
 'What is the primary purpose of Significant Event Analysis (SEA) in care home governance?',
 'To identify individuals to blame for clinical errors',
 'To fulfil the requirement to report all incidents to the CQC',
 'A no-blame, structured review process focused on system improvement and learning from significant events',
 'To produce a report for the coroner following any death in the home',
 'C',
 'SEA is a no-blame tool focused on system improvement. Its 6 steps help teams understand what happened, why it happened, and what systemic changes are needed to prevent recurrence. It is distinct from disciplinary processes and should be presented to staff as a learning exercise.'),

('A0000000-0000-0000-0000-000000000004',
 'What does the Data Security and Protection Toolkit (DSPT) assess in care settings?',
 'Whether a care home''s IT equipment is up to date',
 'Whether an organisation handling NHS data meets data protection and security standards',
 'The quality of clinical records kept in the care home',
 'Whether staff have completed GDPR e-learning modules',
 'B',
 'The DSPT is an online self-assessment tool used by organisations handling NHS data to demonstrate compliance with data protection and security standards. It is part of the broader information governance framework, which sits within clinical governance. Many care homes access NHS services and must therefore complete the DSPT.'),

('A0000000-0000-0000-0000-000000000004',
 'What is the LeDeR programme and who does it cover?',
 'A leadership development programme for registered care managers',
 'A programme for reviewing and learning from deaths of people with learning disabilities and autistic people',
 'A mandatory reporting system for all deaths in CQC-registered care homes',
 'A national benchmarking programme comparing mortality rates across care providers',
 'B',
 'LeDeR (Learning from Deaths of People with a Learning Disability) reviews deaths of people with learning disabilities and autism to identify learning and improve services. Care homes accommodating these groups must refer deaths to the LeDeR programme. It was expanded to include autistic people from 2023.'),

('A0000000-0000-0000-0000-000000000004',
 'What is the key difference between administrative controls and engineering controls in risk management?',
 'Engineering controls are cheaper and easier to implement than administrative controls',
 'Engineering controls are physical modifications that reduce risk at source; administrative controls are procedures and behaviours that reduce risk through human action',
 'Administrative controls are more effective than engineering controls because they involve staff directly',
 'There is no meaningful difference — both are equivalent in the hierarchy of controls',
 'B',
 'Engineering controls are physical modifications that reduce risk (e.g., bed rails, non-slip flooring, equipment guards). Administrative controls are procedures and behaviours (e.g., training, repositioning schedules, supervision). Engineering controls are higher in the hierarchy because they do not depend on human behaviour and are therefore more reliable.'),

('A0000000-0000-0000-0000-000000000004',
 'How does benchmarking improve governance in care homes?',
 'Benchmarking is only useful in NHS trusts, not in independent care home providers',
 'Benchmarking allows a care home to compare its performance against national standards or peer organisations, identifying whether performance is genuinely good or requiring improvement',
 'Benchmarking is primarily used to set staff targets and performance review criteria',
 'Benchmarking must only be done by external consultants to ensure objectivity',
 'B',
 'Benchmarking helps managers understand whether their performance data represents genuinely good care or is simply average or below average. By comparing KPIs against national data (from NHS Digital, Skills for Care, etc.) or peer organisations, managers can identify specific areas for targeted improvement.'),

('A0000000-0000-0000-0000-000000000004',
 'What is the primary purpose of a harm review panel in care home governance?',
 'To determine whether a staff member should be dismissed following a serious incident',
 'To provide multidisciplinary, independent oversight of serious incident investigations, ensuring all root causes are identified and action plans are adequate',
 'To replace the need for a formal RCA in straightforward incident cases',
 'To satisfy a CQC requirement for a monthly governance committee',
 'B',
 'A harm review panel provides independent oversight of serious incident investigations. It ensures that investigations are not defensive or incomplete, that all root causes have been identified, and that the action plan is adequate. It may include an external clinical or quality adviser to ensure objectivity.'),

('A0000000-0000-0000-0000-000000000004',
 'Which human factors intervention best reduces the risk of medication errors in care homes?',
 'Requiring all staff to pass a medication exam annually',
 'Posting the medication policy on the notice board in the staff room',
 'Designing a dedicated, interruption-free medication administration time with double-checking systems for high-risk medicines',
 'Issuing disciplinary warnings after every medication error',
 'C',
 'Human factors research shows that interruptions during medication administration significantly increase error rates. Creating a dedicated, interruption-free administration time and implementing double-checking systems for high-risk medicines directly addresses the systemic causes of error. Punitive approaches (disciplinary warnings) suppress reporting without reducing errors.'),

('A0000000-0000-0000-0000-000000000004',
 'What does the CQC''s Well-Led domain primarily assess in governance terms?',
 'Whether the home has a valid registration certificate displayed at the entrance',
 'Whether there is strong leadership, effective governance systems, a culture of openness and learning, and meaningful resident and family involvement',
 'Whether the registered manager has completed their Level 5 qualification',
 'Whether the home has achieved a Good or Outstanding rating in all other four domains',
 'B',
 'The Well-Led domain assesses leadership quality, governance system effectiveness, organisational culture, and resident/family involvement. A service cannot achieve Good or Outstanding in Well-Led without robust, evidenced governance systems. It encompasses all elements of clinical governance including audit, incident review, training, and quality improvement.')

ON CONFLICT DO NOTHING;

END $$;