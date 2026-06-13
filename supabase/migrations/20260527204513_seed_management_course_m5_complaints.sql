DO $$ BEGIN

-- Insert course
INSERT INTO courses (id, category, title, description, target_role, expiry_months, is_active, estimated_minutes, organisation_id, created_by)
VALUES (
  'A0000000-0000-0000-0000-000000000005',
  'management_leadership',
  'Complaints Handling (Regulation 16)',
  'Receiving, recording, investigating, and responding to complaints under Regulation 16. Legal requirement for all CQC-registered providers. Includes learning from complaints to improve services.',
  'managers_and_seniors',
  12,
  true,
  45,
  NULL,
  NULL
)
ON CONFLICT DO NOTHING;

-- Flashcards
INSERT INTO flashcards (course_id, question_text, answer_text, difficulty, order_index) VALUES

('A0000000-0000-0000-0000-000000000005',
 'What are the full requirements of Regulation 16 for an effective complaints system?',
 'Regulation 16 of the Health and Social Care Act 2008 (Regulated Activities) Regulations 2014 requires registered providers to have an accessible, effective complaints system that enables any person to make a complaint. Providers must investigate complaints properly, respond to complainants in a timely way, take action where necessary, and have a policy that sets out how complaints are handled. There must also be a nominated person responsible for handling complaints. The CQC inspects compliance with Regulation 16 under the Well-Led and Responsive quality questions.',
 1, 1),

('A0000000-0000-0000-0000-000000000005',
 'What must a complaints policy contain?',
 'A complaints policy must set out: who can complain and how (verbally or in writing), the timeframes for acknowledging and responding to complaints, the process for investigating complaints (fact-gathering, interviews, records review), confidentiality commitments, how complainants can access independent advocacy support, the escalation pathway if the complainant is not satisfied (ombudsman details), and the process for learning from complaints and changing practice. The policy must be accessible to residents and families — displayed in communal areas and available on request.',
 2, 2),

('A0000000-0000-0000-0000-000000000005',
 'Who can make a complaint about a CQC-registered care service?',
 'A complaint can be made by: the resident themselves (if they have capacity), a family member or friend acting on behalf of the resident, a legally appointed representative (e.g., LPA holder), an independent advocate, or anyone who has been affected by the service''s actions — even if they are not a resident. Former residents and their families can also make complaints about care they received previously. The provider must not restrict access to the complaints process.',
 1, 3),

('A0000000-0000-0000-0000-000000000005',
 'What are the timescales for acknowledging and responding to complaints?',
 'The provider must acknowledge receipt of a complaint within 3 working days of receiving it. The acknowledgement should be in writing (or by the complainant''s preferred method) and should confirm that the complaint has been received, the name of the person investigating it, and an estimated timeline for the full response. The full written response to the complaint must be sent within 20 working days of the complaint being received. If more time is needed for a complex investigation, the complainant must be informed and given a revised date.',
 1, 4),

('A0000000-0000-0000-0000-000000000005',
 'What does a thorough complaint investigation process involve?',
 'A thorough investigation involves: gathering all relevant facts (reviewing care records, incident reports, medication records), interviewing the staff involved (separately, without leading questions), interviewing witnesses if applicable, reviewing whether policies and procedures were followed, and considering whether the complaint is part of a pattern. All evidence gathered must be documented. The investigation should be conducted by someone with sufficient authority and who is not directly involved in the events complained about. Findings must be evidence-based and not defensive.',
 2, 5),

('A0000000-0000-0000-0000-000000000005',
 'What must a written complaint response include?',
 'A written complaint response must include: acknowledgement of the complaint and thanks for raising it, a clear explanation of the investigation findings (what happened and why), a sincere apology where failings are identified, details of the specific actions taken or planned to prevent recurrence, information about how to escalate the complaint if not satisfied (including the Local Government and Social Care Ombudsman details), and a contact name for any further questions. The response must be in plain English, compassionate in tone, and free from jargon.',
 2, 6),

('A0000000-0000-0000-0000-000000000005',
 'What fields must a complaints register contain?',
 'A complaints register must record: unique reference number or date, date the complaint was received, name of the complainant (if given), nature/category of the complaint, name of the investigating manager, date acknowledged, outcome of the investigation (upheld, partially upheld, not upheld), actions taken as a result, date of written response, and date closed. The register should be reviewed regularly to identify trends and recurring themes. CQC inspectors will ask to see the register and will assess whether it is complete and up to date.',
 2, 7),

('A0000000-0000-0000-0000-000000000005',
 'What are the escalation pathways if a complainant is not satisfied with the provider''s response?',
 'If a complainant is not satisfied with the provider''s response, they can escalate to: the Local Government and Social Care Ombudsman (LGSCO) — which investigates complaints about adult social care providers; the Parliamentary and Health Service Ombudsman (PHSO) if NHS-funded care is involved; the CQC (which does not investigate individual complaints but uses them as intelligence for inspection); or a solicitor if legal action is being considered. Complainants must be informed of all escalation options in the written response.',
 2, 8),

('A0000000-0000-0000-0000-000000000005',
 'How should learning from complaints be applied to service improvement?',
 'Learning from complaints means analysing each complaint to extract lessons and systematically applying those lessons to improve services. This involves: updating care plans or risk assessments where care failures are identified, reviewing and updating policies and procedures, delivering targeted training to staff involved or to all staff if a systemic issue is identified, and presenting themes from complaints at governance meetings. The provider should be able to demonstrate to the CQC a clear link between a complaint received and a service change made as a result.',
 2, 9),

('A0000000-0000-0000-0000-000000000005',
 'What is the difference between a complaint and a concern, and how are they handled differently?',
 'A concern is an informal expression of worry or dissatisfaction that can often be resolved immediately through conversation — it does not require formal investigation or a written response. A complaint is a more formal expression of dissatisfaction that the complainant wants to be investigated and responded to in writing. Some concerns become complaints if they are not resolved promptly or if the person is not satisfied with the informal response. Both should be recorded, but only formal complaints require the full regulatory complaints process. Concerns provide an early warning of potential systemic issues.',
 2, 10),

('A0000000-0000-0000-0000-000000000005',
 'What whistleblowing protections apply to staff who raise complaints?',
 'Staff who raise complaints or concerns about the quality of care — whether externally to the CQC, the local authority, or the ombudsman — are protected under the Public Interest Disclosure Act 1998. They cannot be dismissed, demoted, or treated unfavourably for making a protected disclosure. Managers must not take retaliatory action against staff who raise complaints. Care homes should have a clear whistleblowing policy that sets out internal and external reporting channels and the protections available to staff who use them.',
 2, 11),

('A0000000-0000-0000-0000-000000000005',
 'When do both Duty of Candour and the complaints process apply simultaneously?',
 'Both Duty of Candour (Regulation 20) and the complaints process (Regulation 16) can apply to the same incident simultaneously. For example, if a resident sustains a fracture from a fall due to a care failure, Duty of Candour requires the provider to proactively notify and apologise to the family. If the family then makes a formal complaint about the incident, the complaints process must also run concurrently. The two processes are separate: Duty of Candour is proactive and provider-initiated; complaints handling is reactive and complainant-initiated. Both must be properly documented.',
 3, 12),

('A0000000-0000-0000-0000-000000000005',
 'How should anonymous complaints be handled?',
 'Anonymous complaints should be taken seriously and investigated to the extent possible, even though the lack of identification limits the investigation. The provider should consider: whether there is enough detail to identify specific events, people, or periods; whether the complaint is corroborated by other information (incident data, audit results, previous complaints); and whether a staff or resident welfare check is warranted. Anonymous complaints cannot receive a written response but should be recorded in the complaints register. Patterns of anonymous complaints may indicate a culture of fear and should prompt a wider review.',
 3, 13),

('A0000000-0000-0000-0000-000000000005',
 'What does complaint closure and follow-up involve?',
 'Complaint closure involves confirming with the complainant that they are satisfied with the investigation and response. This should be done verbally (by phone or in person) in addition to the written response. If the complainant is not satisfied, they should be reminded of their right to escalate to the LGSCO or PHSO. The complaint should not be formally closed in the register until the complainant has had the opportunity to respond. Follow-up also includes confirming that all actions promised in the response have been completed and recording this in the complaints file.',
 2, 14),

('A0000000-0000-0000-0000-000000000005',
 'How does the CQC inspect compliance with the complaints process?',
 'During an inspection, CQC inspectors ask to see: the complaints policy, the complaints register (checking it is complete and up to date), a sample of complaints files (including investigation notes and response letters), evidence of learning from complaints (actions taken, service changes), training records for complaints handling, and whether escalation information is given to complainants. Inspectors may also ask staff and residents directly: "Do you know how to make a complaint?" and "Have you made a complaint and what happened?" A poorly evidenced complaints system impacts the Well-Led and Responsive ratings.',
 2, 15),

('A0000000-0000-0000-0000-000000000005',
 'What is complaints trending analysis and why is it important?',
 'Complaints trending analysis involves reviewing all complaints over a period (monthly or quarterly) to identify recurring themes, categories, or patterns — for example, multiple complaints about meal quality, staffing on night shifts, or communication with families. Trending reveals systemic issues that individual complaint investigations may miss. A single complaint about meal quality might be an isolated concern; five complaints about the same issue over three months suggests a systemic failure requiring a policy or process change. Trending should be presented at governance meetings and reported to the board.',
 3, 16),

('A0000000-0000-0000-0000-000000000005',
 'How should themed complaint responses be handled when multiple complaints share a common theme?',
 'When multiple complaints share a theme, the provider should: address each complaint individually (each complainant deserves a personal response), but also conduct a thematic review of the underlying systemic issue. A themed response should acknowledge the broader pattern, explain the systemic investigation conducted, and set out the service-wide changes being made. This approach demonstrates to complainants and inspectors that complaints are used as a quality improvement tool, not just managed on a case-by-case basis.',
 3, 17),

('A0000000-0000-0000-0000-000000000005',
 'What resident advocacy services are available in England and what is their role in complaints?',
 'Key advocacy services include: Healthwatch England and local Healthwatch organisations (statutory consumer champion for health and social care, can support people to make complaints), POhWER (provides independent advocacy, including NHS Complaints Advocacy Service), VoiceAbility (independent advocacy for people with disabilities and older people), and the Independent Mental Capacity Advocate (IMCA) service (for residents lacking capacity who have no appropriate representative). Providers must inform complainants of their right to access independent advocacy and must not obstruct a resident''s access to advocacy support.',
 2, 18),

('A0000000-0000-0000-0000-000000000005',
 'What is the recommended structure for a complaint response letter?',
 'A good complaint response letter should follow this structure: 1. Acknowledge the complaint and thank the complainant for raising it. 2. Summarise your understanding of the complaint so the complainant knows you have understood it. 3. Explain the investigation process briefly. 4. Set out the findings clearly — what you found and what conclusions you reached. 5. Apologise sincerely where failings are identified. 6. Explain the specific actions taken or planned. 7. Provide escalation information (LGSCO or PHSO details). 8. Give a named contact for any further questions. The letter must be in plain English and a compassionate tone.',
 2, 19),

('A0000000-0000-0000-0000-000000000005',
 'When and how should mediation be used in complaints handling?',
 'Mediation can be offered when: direct communication between the provider and complainant has broken down, the complaint involves a complex or emotionally charged situation, the complainant is seeking a resolution rather than a formal investigation, or both parties agree that a facilitated conversation might resolve the matter. A mediator is an independent third party with no stake in the outcome. Mediation is voluntary and does not prevent the complainant from subsequently escalating to the ombudsman. It can be particularly effective for relationship-based complaints (e.g., communication or dignity concerns) where the complainant wants acknowledgement more than a formal finding.',
 3, 20),

('A0000000-0000-0000-0000-000000000005',
 'How should confidentiality be balanced with sharing information in a complaint investigation?',
 'The investigating manager must balance the complainant''s right to a full explanation with the confidentiality rights of other residents and staff. When sharing investigation findings: do not identify other residents by name (use anonymous descriptors), be careful about sharing information about staff conduct that could constitute a data protection breach or prejudice a disciplinary process. However, complainants have a right to know the substance of what the investigation found — vague, non-committal responses that protect the provider at the expense of transparency are not compliant with Regulation 16.',
 3, 21),

('A0000000-0000-0000-0000-000000000005',
 'When should a manager consider involving a third party to avoid self-investigation bias?',
 'A manager should consider involving a third party when: they are personally involved in the events complained about, they have a personal relationship with the staff member being complained about, the complaint involves a serious allegation of abuse or misconduct, the complainant has expressed lack of confidence in the manager''s ability to investigate impartially, or the provider''s responsible individual or board has a concern about the objectivity of the investigation. Third-party investigators can be sourced from the provider group''s quality team, an external consultant, or (in safeguarding cases) the local authority.',
 3, 22),

('A0000000-0000-0000-0000-000000000005',
 'How should staff wellbeing be considered when a colleague is named in a complaint?',
 'Being named in a complaint can be deeply distressing for staff, particularly if they believe they acted correctly. Managers must: inform the member of staff that a complaint has been received and they have been named, explain the investigation process, offer emotional support (employee assistance programme, occupational health, supervision), emphasise the no-blame, learning-focused nature of the process where appropriate, keep the process confidential, and not assume guilt before investigation is complete. Staff support during complaints handling is a governance issue — distressed staff perform less safely.',
 3, 23),

('A0000000-0000-0000-0000-000000000005',
 'When and how can a provider request a time extension for investigating a complaint?',
 'If a complaint cannot be fully investigated within 20 working days — for example, due to complexity, the need to obtain external reports, or staff availability — the provider must contact the complainant before the deadline expires. The communication should: acknowledge the delay, explain the reason, give a realistic revised completion date, and confirm that the investigation is ongoing. The complainant must agree to the extension or be given the option to escalate. Extensions should not be used routinely — they are for genuinely complex cases and must be the exception, not the standard.',
 2, 24),

('A0000000-0000-0000-0000-000000000005',
 'What should a post-complaint review achieve in terms of policy or practice change?',
 'A post-complaint review should produce: a clear identification of what went wrong and why, a review of whether existing policies and procedures were followed (and if not, why not), and specific, measurable changes to policy, practice, or training. Changes should be documented, communicated to relevant staff, and monitored to ensure they are embedded. The next audit cycle should check whether the change has been effective. The complaints register should record what changed as a result of each upheld complaint, creating an evidence trail of service improvement that can be presented to the CQC.',
 3, 25)

ON CONFLICT DO NOTHING;

-- Quiz questions
INSERT INTO quiz_questions (course_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES

('A0000000-0000-0000-0000-000000000005',
 'Under Regulation 16, within how many working days must a complaint be acknowledged?',
 '1 working day',
 '3 working days',
 '5 working days',
 '10 working days',
 'B',
 'Regulation 16 requires complaints to be acknowledged within 3 working days of receipt. The acknowledgement should confirm the complaint has been received, name the investigating person, and give an estimated timeline for the full response.'),

('A0000000-0000-0000-0000-000000000005',
 'What is the required timeframe for a full written complaint response?',
 '10 working days',
 '14 calendar days',
 '20 working days',
 '28 calendar days',
 'C',
 'The full written response to a complaint must be sent within 20 working days of receiving the complaint. If more time is needed, the complainant must be informed before the deadline and given a revised date.'),

('A0000000-0000-0000-0000-000000000005',
 'Who can make a complaint about a CQC-registered care service under Regulation 16?',
 'Only the resident themselves, if they have capacity',
 'Only the resident or their next of kin',
 'Any person — including the resident, family, representative, advocate, or anyone affected by the service',
 'Only people currently receiving services at the home',
 'C',
 'Anyone can make a complaint — the resident, family members, representatives, advocates, or any person affected by the service''s actions. Former residents and their families can also complain. The provider must not restrict access to the complaints process.'),

('A0000000-0000-0000-0000-000000000005',
 'Which external body investigates complaints about adult social care providers that are not resolved by the provider?',
 'The Care Quality Commission (CQC)',
 'The Parliamentary and Health Service Ombudsman (PHSO)',
 'The Local Government and Social Care Ombudsman (LGSCO)',
 'Skills for Care',
 'C',
 'The Local Government and Social Care Ombudsman (LGSCO) investigates complaints about adult social care providers that have not been resolved at provider level. The CQC does not investigate individual complaints but uses them as inspection intelligence. The PHSO handles NHS complaints.'),

('A0000000-0000-0000-0000-000000000005',
 'What does a complaint response letter MUST include?',
 'A legal disclaimer confirming the provider does not accept liability',
 'Investigation findings, a sincere apology where failings occurred, actions taken, and escalation information',
 'A copy of the complaints policy and the complaints register',
 'A signed statement from the staff member involved in the complaint',
 'B',
 'A complaint response must include: investigation findings, a sincere apology where failings are identified, specific actions taken or planned, and escalation information (LGSCO or PHSO details). It must be in plain English and have a compassionate tone.'),

('A0000000-0000-0000-0000-000000000005',
 'What is the primary purpose of a complaints register?',
 'To demonstrate to inspectors that very few complaints are received',
 'To record every complaint with details of the nature, investigation outcome, actions taken, and date closed, enabling trend analysis and governance oversight',
 'To identify which staff members are most frequently complained about for disciplinary purposes',
 'To satisfy a legal requirement but with no practical governance function',
 'B',
 'The complaints register records every complaint with full details, enabling the manager and board to identify trends, assess investigation quality, monitor timescales, and demonstrate compliance to CQC inspectors. It is a key governance document reviewed at every inspection.'),

('A0000000-0000-0000-0000-000000000005',
 'What is complaints trending analysis and why is it important for governance?',
 'Analysing the time taken to respond to each complaint to ensure timescales are met',
 'Reviewing complaints over time to identify recurring themes and systemic issues that individual complaints may not reveal',
 'Producing a monthly report showing the total number of complaints received',
 'Comparing complaint numbers against similar care homes to benchmark performance',
 'B',
 'Complaints trending analysis involves reviewing all complaints over a period to identify recurring themes and patterns that indicate systemic issues. A single complaint might be isolated; a pattern of similar complaints indicates a systemic failure requiring a service-wide response. Trending should be presented at governance meetings.'),

('A0000000-0000-0000-0000-000000000005',
 'When do both Duty of Candour and the complaints process apply to the same incident?',
 'Never — they are mutually exclusive processes',
 'Only when a resident has died',
 'When an incident constitutes a Notifiable Safety Incident under Regulation 20 AND the family subsequently makes a formal complaint — both processes run concurrently but separately',
 'Only when the CQC has initiated an investigation',
 'C',
 'Both can apply simultaneously. Duty of Candour is proactive and provider-initiated; the complaints process is reactive and complainant-initiated. If an incident triggers Duty of Candour AND the family makes a formal complaint, both processes must run concurrently. They are separate processes with different documentation requirements.'),

('A0000000-0000-0000-0000-000000000005',
 'Which advocacy organisation provides the NHS Complaints Advocacy Service?',
 'Healthwatch England',
 'VoiceAbility',
 'POhWER',
 'The Care Quality Commission',
 'C',
 'POhWER provides the NHS Complaints Advocacy Service, supporting people to make complaints about NHS-funded care. Healthwatch and VoiceAbility are also advocacy organisations providing complaints support. Providers must inform complainants of their right to access independent advocacy.'),

('A0000000-0000-0000-0000-000000000005',
 'What is the difference between a complaint and a concern in care?',
 'A concern relates only to clinical care; a complaint relates to all other service issues',
 'A concern is an informal expression of worry that can often be resolved immediately; a complaint is a formal expression requiring investigation and a written response',
 'A concern can only be raised by staff; a complaint can only be raised by residents or families',
 'There is no meaningful difference — both are handled identically under Regulation 16',
 'B',
 'A concern is informal and can often be resolved through conversation. A complaint is more formal and requires full investigation and a written response. Concerns should be recorded and can become complaints if not resolved promptly. Both provide valuable intelligence about service quality.'),

('A0000000-0000-0000-0000-000000000005',
 'What should a provider do if a complaint cannot be investigated within 20 working days?',
 'Close the complaint and invite the complainant to re-submit it',
 'Send the complainant to the LGSCO immediately',
 'Contact the complainant before the deadline, explain the reason for the delay, give a revised date, and offer the complainant the option to escalate',
 'Send a standard acknowledgement letter saying the investigation is in progress without giving a revised date',
 'C',
 'If 20 working days is insufficient, the provider must contact the complainant before the deadline expires, explain the reason for the delay, give a realistic revised completion date, and offer the option to escalate. Extensions are for genuinely complex cases and should be the exception.'),

('A0000000-0000-0000-0000-000000000005',
 'How should a manager handle an anonymous complaint?',
 'Discard it — anonymous complaints cannot be investigated without knowing the complainant''s identity',
 'Refer it directly to the CQC without investigation',
 'Take it seriously, investigate to the extent possible, record it in the complaints register, and consider whether it is corroborated by other data',
 'Ask all staff whether they know who submitted the anonymous complaint',
 'C',
 'Anonymous complaints must be taken seriously. Even without knowing the complainant''s identity, the provider should investigate the substance of the complaint as far as possible, corroborate with other evidence, and record it in the complaints register. Patterns of anonymous complaints may indicate a culture of fear.'),

('A0000000-0000-0000-0000-000000000005',
 'What information about escalation must always be included in a written complaint response?',
 'The name and contact details of the registered manager',
 'Details of how to escalate to the Local Government and Social Care Ombudsman (LGSCO) or Parliamentary and Health Service Ombudsman (PHSO) if not satisfied',
 'The CQC''s inspection rating for the home',
 'The name of the member of staff responsible for the events complained about',
 'B',
 'All written complaint responses must include escalation information — specifically, the LGSCO details for adult social care complaints and PHSO details for NHS-funded care. This is a Regulation 16 requirement. Complainants must always know how to take their complaint further if dissatisfied.'),

('A0000000-0000-0000-0000-000000000005',
 'When should a manager consider involving a third-party investigator for a complaint?',
 'For all complaints as a standard practice to ensure objectivity',
 'Only when the complainant requests it in writing',
 'When the manager is personally involved in the events, has a conflict of interest, or the complaint involves a serious allegation requiring independent oversight',
 'Only when the complaint has already been escalated to the LGSCO',
 'C',
 'A third-party investigator should be considered when there is a conflict of interest — such as the manager being personally involved in the events complained about, having a personal relationship with the staff member, or when the complaint involves a serious allegation. Third-party involvement protects both the complainant and the provider from the appearance of a self-serving investigation.'),

('A0000000-0000-0000-0000-000000000005',
 'How does the CQC use complaints information during inspections?',
 'The CQC only considers complaints that have been escalated to the LGSCO',
 'The CQC reviews the complaints register, sample complaint files, evidence of learning from complaints, and may ask staff and residents about the complaints process',
 'The CQC relies solely on the number of complaints received to assess the Responsive domain',
 'The CQC does not inspect complaints handling as it is handled by the LGSCO',
 'B',
 'CQC inspectors review the complaints register, sample complaint files (including investigation notes and response letters), evidence of learning, and whether staff and residents know how to make a complaint. A poorly evidenced complaints system impacts the Well-Led and Responsive ratings.'),

('A0000000-0000-0000-0000-000000000005',
 'What does a post-complaint review aim to achieve?',
 'To close the complaint file and archive it',
 'To identify what went wrong, review policy compliance, implement specific measurable changes, and monitor whether those changes have been embedded',
 'To decide whether disciplinary action should be taken against staff involved',
 'To assess whether the complainant''s response to the investigation was satisfactory',
 'B',
 'A post-complaint review aims to embed learning: identify what went wrong, review policy compliance, implement specific measurable changes to policy or practice, and monitor whether those changes are effective. The next audit cycle should check embedding. This evidence trail of service improvement is valuable for CQC inspections.'),

('A0000000-0000-0000-0000-000000000005',
 'How should confidentiality be protected when sharing complaint investigation findings?',
 'All investigation findings can be shared in full with the complainant without restriction',
 'Investigation findings should be so vague as to avoid any risk of identifying staff or other residents',
 'Findings should be shared substantively while protecting other residents'' identities and not disclosing information that could prejudice a disciplinary process',
 'The provider can decline to share any findings on grounds of data protection',
 'C',
 'Complainants have a right to substantive findings — vague responses are not compliant. However, other residents must be anonymised, and care must be taken not to disclose staff conduct information that could breach data protection or prejudice a concurrent disciplinary process. The balance is transparency for the complainant within appropriate confidentiality limits.'),

('A0000000-0000-0000-0000-000000000005',
 'Which legislation protects staff who raise complaints or concerns about care quality?',
 'The Care Act 2014',
 'The Public Interest Disclosure Act 1998',
 'The Health and Social Care Act 2008',
 'The Equality Act 2010',
 'B',
 'Staff who make protected disclosures about care quality are protected under the Public Interest Disclosure Act 1998 (whistleblowing legislation). Employers cannot dismiss, demote, or victimise staff for raising genuine concerns. Managers must not take retaliatory action against staff who raise complaints.'),

('A0000000-0000-0000-0000-000000000005',
 'When is mediation most useful in the complaints handling process?',
 'As a mandatory first step before any written investigation',
 'When direct communication has broken down, the complaint is emotionally charged, and both parties agree that a facilitated conversation might resolve it',
 'Only when the LGSCO recommends it',
 'When the complaint involves a clinical decision that requires independent clinical review',
 'B',
 'Mediation is most useful when direct communication has broken down and the complainant is seeking acknowledgement or resolution rather than a formal finding. It is voluntary, does not prevent further escalation, and can be particularly effective for dignity and communication complaints where the complainant primarily wants to be heard.'),

('A0000000-0000-0000-0000-000000000005',
 'Why is it important to support staff wellbeing when they are named in a complaint?',
 'To prevent staff from resigning before the investigation is complete',
 'It is not important — the investigation should focus entirely on the complainant''s needs',
 'Because distressed staff perform less safely, and treating staff fairly during complaints processes is both an ethical and governance obligation',
 'To ensure the staff member provides a favourable account to the investigating manager',
 'C',
 'Staff named in complaints may be distressed, especially if they believe they acted correctly. This affects their performance and safety. Supporting staff through the process — offering employee assistance, keeping them informed, and maintaining a no-blame stance where appropriate — is both ethically right and a governance obligation. Distressed staff are a safety risk.')

ON CONFLICT DO NOTHING;

END $$;