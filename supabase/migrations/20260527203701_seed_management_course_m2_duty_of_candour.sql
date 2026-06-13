DO $$ BEGIN

-- Insert course
INSERT INTO courses (id, category, title, description, target_role, expiry_months, is_active, estimated_minutes, organisation_id, created_by)
VALUES (
  'A0000000-0000-0000-0000-000000000002',
  'management_leadership',
  'Duty of Candour (Regulation 20)',
  'Legal requirement to be open and transparent with residents and families when things go wrong. Applies to all CQC-registered providers under the Health and Social Care Act 2008 (Regulated Activities) Regulations 2014.',
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

('A0000000-0000-0000-0000-000000000002',
 'What is Duty of Candour? — Regulation 20 full definition',
 'Duty of Candour is a legal obligation under Regulation 20 of the Health and Social Care Act 2008 (Regulated Activities) Regulations 2014 requiring all CQC-registered providers to be open and transparent with people who use services when a Notifiable Safety Incident occurs. Providers must tell the person (or their representative) as soon as reasonably practicable, give a truthful account, apologise, and provide support. It is both an organisational duty (on providers) and a professional duty (on registered clinicians).',
 1, 1),

('A0000000-0000-0000-0000-000000000002',
 'Which legislation underpins the organisational Duty of Candour?',
 'The organisational Duty of Candour is set out in Regulation 20 of the Health and Social Care Act 2008 (Regulated Activities) Regulations 2014. This regulation applies to all providers registered with the CQC. It was introduced following the Francis Inquiry into failings at Mid Staffordshire NHS Foundation Trust, which highlighted a widespread culture of concealment in the NHS and care sector.',
 1, 2),

('A0000000-0000-0000-0000-000000000002',
 'When does Duty of Candour apply? — definition of a Notifiable Safety Incident',
 'Duty of Candour applies when a Notifiable Safety Incident occurs — defined as an unintended or unexpected incident that occurs during the provision of a regulated activity and appears to have resulted in (or could result in) the death of the service user, severe harm, moderate harm, or prolonged psychological harm. The incident must be unintended: if a risk was known and accepted by the resident, it may not meet the threshold. Both physical and psychological harm are included.',
 2, 3),

('A0000000-0000-0000-0000-000000000002',
 'What is the definition of moderate harm in the context of Duty of Candour?',
 'Moderate harm means harm that requires a moderate increase in treatment and significant but not permanent harm. Examples in a care home context include: a fracture resulting from a fall that requires hospitalisation, a medication error that causes a serious adverse reaction requiring medical treatment, a wound infection that significantly delays recovery, or a pressure ulcer that develops to Grade 3 due to a care failure. The key test is whether treatment beyond routine management was required.',
 2, 4),

('A0000000-0000-0000-0000-000000000002',
 'What is the definition of severe harm in Duty of Candour?',
 'Severe harm means permanent or long-term harm that has a significant effect on the person''s functioning or quality of life. Examples include: permanent disability resulting from a fall, brain injury following an unwitnessed collapse, loss of a limb due to infection, or a medication error resulting in kidney failure. Severe harm triggers the full Duty of Candour process immediately. Any incident where there is doubt about severity should be treated as if it meets the threshold until confirmed otherwise.',
 2, 5),

('A0000000-0000-0000-0000-000000000002',
 'When does a death trigger Duty of Candour obligations?',
 'A death triggers Duty of Candour when it is an unintended or unexpected outcome of a care failure — not when death was the expected outcome of a known terminal condition or accepted clinical risk. For example, a resident dying peacefully following a known deterioration in a palliative care context does not trigger Duty of Candour. However, a death following a fall, medication overdose, aspiration from a missed SALT assessment, or undetected sepsis would require a Duty of Candour conversation.',
 3, 6),

('A0000000-0000-0000-0000-000000000002',
 'What are the 5 steps of Duty of Candour?',
 'The five steps are: 1. Tell — notify the resident and/or family as soon as reasonably practicable that an incident has occurred. 2. Apologise — give a sincere, unqualified apology. 3. Explain — provide an honest account of what happened based on known facts. 4. Support — offer ongoing support, signpost to advocacy and complaints. 5. Follow-up in writing — send a written account of the investigation findings, actions taken, and any changes made to prevent recurrence. All five steps must be completed.',
 1, 7),

('A0000000-0000-0000-0000-000000000002',
 'Step 1: What should you tell the resident and/or family, and when?',
 'You must tell the resident and/or their representative as soon as reasonably practicable after the incident is identified — ideally the same day or within 24 hours. You should tell them: that an incident has occurred, what you know so far (facts only — do not speculate), that you are investigating, and that you will keep them informed. Ensure the conversation takes place in a private, comfortable setting. Document the date, time, who was present, and what was said.',
 2, 8),

('A0000000-0000-0000-0000-000000000002',
 'Step 2: How should the apology be given in a Duty of Candour conversation?',
 'The apology must be sincere, direct, and unqualified. Use clear language: "I am sorry that this happened to [name]." Avoid conditional apologies such as "I''m sorry if you feel..." or "We apologise, however..." which undermine the sincerity of the apology. The apology does not need to wait until the investigation is complete — you can apologise that the incident happened before the full facts are known. An apology under Duty of Candour is not an admission of legal liability.',
 2, 9),

('A0000000-0000-0000-0000-000000000002',
 'Why does "sorry but..." undermine the apology and what should you say instead?',
 '"Sorry but..." introduces a justification or excuse that deflects responsibility and signals to the family that the organisation is not genuinely taking ownership. It invalidates the apology. Instead, give the apology first and separately: "I am truly sorry this happened." Then, in a separate sentence, provide factual context if needed: "We are still investigating exactly what occurred and will share our findings with you." The apology and the explanation should be given as two distinct elements, not combined.',
 2, 10),

('A0000000-0000-0000-0000-000000000002',
 'Step 3: How should you explain what happened in a Duty of Candour conversation?',
 'Explain only what is known based on the facts available at the time. Be clear about what is confirmed and what is still being investigated. Do not speculate, blame individual members of staff, or give an explanation that may later contradict the investigation findings. Use plain language without jargon. If the full picture is not yet clear, say so honestly: "We are still gathering information and will share our full findings with you as soon as the investigation is complete."',
 2, 11),

('A0000000-0000-0000-0000-000000000002',
 'Step 4: What does ongoing support mean in the Duty of Candour process?',
 'Ongoing support means actively offering the resident and family practical and emotional support throughout the process. This includes: signposting to independent advocacy services (such as Healthwatch or a local advocacy charity), explaining the complaints process, offering a named contact point for questions, and checking in regularly to ensure they feel supported and informed. Support should continue even after the investigation is complete, particularly in cases of bereavement or serious injury.',
 2, 12),

('A0000000-0000-0000-0000-000000000002',
 'Step 5: What must a Duty of Candour written follow-up letter contain?',
 'The written follow-up must be sent as soon as reasonably practicable after the investigation is complete and must include: a truthful account of the investigation findings, a sincere written apology, details of the actions taken or proposed to prevent recurrence, information about how to escalate further if the person is not satisfied (including the complaints process and the Local Government Ombudsman), and a contact name for any further questions. The letter must be written in plain English and compassionate in tone.',
 3, 13),

('A0000000-0000-0000-0000-000000000002',
 'What are the timescales for completing Duty of Candour?',
 'The initial notification (Step 1) should take place as soon as reasonably practicable after the incident is identified — typically within 10 working days for the full verbal conversation, though the initial notification should happen much sooner (often same day or next day). The written follow-up (Step 5) should be sent as soon as reasonably practicable after the investigation concludes. There is no single fixed deadline in the Regulations, but the CQC expects prompt, timely action and will scrutinise delays.',
 2, 14),

('A0000000-0000-0000-0000-000000000002',
 'Who must be notified under Duty of Candour?',
 'The primary person to be notified is the resident themselves, if they have capacity to understand the conversation. If they lack capacity, notify their next of kin, legal representative, or lasting power of attorney holder. If there is no family or representative, an independent advocate should be contacted. If the incident is also a Notifiable Event under CQC regulations (such as a death or serious injury), the CQC must also be notified separately via the CQC provider portal.',
 2, 15),

('A0000000-0000-0000-0000-000000000002',
 'What must be documented after a Duty of Candour conversation?',
 'Document: the date and time of the conversation, who was present (names and roles), the exact words used in the apology (as close to verbatim as possible), what was explained to the family, how they responded, what support was offered, and any follow-up actions agreed. The record should be made as soon as possible after the conversation while details are fresh. It should be stored in the incident file and cross-referenced in the resident''s care record.',
 2, 16),

('A0000000-0000-0000-0000-000000000002',
 'What should be recorded in the resident''s care record following a Duty of Candour conversation?',
 'The resident''s care record should contain a brief, factual note recording that a Duty of Candour conversation took place, the date, who was informed, and that an apology was given. Avoid recording extensive detail in the care record — the full record of the conversation belongs in the incident file. However, any changes to the resident''s care plan as a result of the incident should be documented fully in the care record, along with the clinical rationale.',
 2, 17),

('A0000000-0000-0000-0000-000000000002',
 'What is the Professional Duty of Candour for registered nurses?',
 'The NMC Code (2018) requires registered nurses to be open and honest when things go wrong. Nurses must: tell the person (or their representative) as soon as possible, apologise, explain what happened and the likely effects, act immediately to put things right, offer support, and not obstruct or conceal information. This professional duty operates alongside (not instead of) the organisational Duty of Candour under Regulation 20. Both apply simultaneously when a registrant is employed by a CQC-registered provider.',
 3, 18),

('A0000000-0000-0000-0000-000000000002',
 'What is the difference between the organisational and professional Duty of Candour?',
 'The organisational Duty of Candour (Regulation 20) is a legal duty on the registered provider (the care organisation) and applies to all CQC-regulated services regardless of whether a registered professional is involved. The professional Duty of Candour is a regulatory requirement on individual registered professionals (nurses, doctors, allied health professionals) through their professional codes. Both duties can apply simultaneously. If a nurse employed by a care home is involved in a notifiable incident, both the organisation and the individual nurse have Duty of Candour obligations.',
 3, 19),

('A0000000-0000-0000-0000-000000000002',
 'What are the consequences of failing to comply with Duty of Candour?',
 'Failing to comply with Regulation 20 is a criminal offence. The CQC can prosecute providers without first issuing a warning notice if it believes Duty of Candour has not been met. Penalties include fines and criminal prosecution of the organisation and/or individual directors. The CQC will also reflect non-compliance in its inspection ratings, likely impacting the Well-led and Safe domains. For registered nurses, failure to comply with the professional Duty of Candour can result in NMC investigation and fitness-to-practise proceedings.',
 3, 20),

('A0000000-0000-0000-0000-000000000002',
 'What is the difference between Duty of Candour and complaints handling?',
 'Duty of Candour is proactive — the provider must initiate the conversation with the resident or family without waiting to be asked. A complaint is reactive — it is initiated by the resident or family expressing dissatisfaction. The two processes can overlap: an incident triggering Duty of Candour may also result in a complaint. When this happens, both processes should run concurrently but separately. The Duty of Candour conversation is not a substitute for a complaints investigation and vice versa.',
 2, 21),

('A0000000-0000-0000-0000-000000000002',
 'How does Duty of Candour relate to employment law and whistleblowing protections?',
 'Staff who raise Duty of Candour concerns or disclose incidents are protected under the Public Interest Disclosure Act 1998 (whistleblowing legislation). Employers must not victimise or dismiss staff who make protected disclosures about patient safety. If a member of staff is pressured not to report an incident or is punished for doing so, this may constitute an unfair dismissal claim and a criminal breach of Regulation 20. Managers must foster a culture where staff feel safe to report incidents without fear of reprisal.',
 3, 22),

('A0000000-0000-0000-0000-000000000002',
 'What are the training requirements for Duty of Candour?',
 'Regulation 20 requires that all relevant staff receive training on Duty of Candour appropriate to their role. This includes registered managers, senior carers, nurses, and any staff who may be the first person to identify a notifiable incident or speak with a resident or family about what happened. Training should cover: what Duty of Candour is, when it applies, the 5 steps, how to have a candour conversation, documentation requirements, and reporting lines. Training must be documented and refreshed regularly.',
 2, 23),

('A0000000-0000-0000-0000-000000000002',
 'How do CQC inspectors check Duty of Candour compliance during an inspection?',
 'Inspectors check Duty of Candour compliance by reviewing: the incident log for notifiable incidents, the investigation files for those incidents (looking for evidence of the conversation, apology, and written follow-up), care records for cross-referenced documentation, and staff training records for Duty of Candour training. They may also ask staff directly: "What would you do if a resident was harmed due to a care failure?" and "Has there been a situation where you needed to tell a family something had gone wrong?" Resident and family interviews may also explore whether they were informed when things went wrong.',
 3, 24),

('A0000000-0000-0000-0000-000000000002',
 'Case study: What distinguishes good practice from poor practice in Duty of Candour situations?',
 'Good practice: A resident falls and sustains a hip fracture. The manager contacts the family the same day, apologises sincerely, explains what is known so far, and agrees to share the investigation findings. A follow-up letter is sent within two weeks detailing the RCA findings, the care plan changes made, and staff retraining completed. Poor practice: The family is not informed until they visit three days later. The manager says "We''re sorry but she was a falls risk" (conditional apology). No written follow-up is provided. The incident is recorded internally but not shared with the family. The latter constitutes a likely breach of Regulation 20.',
 3, 25)

ON CONFLICT DO NOTHING;

-- Quiz questions
INSERT INTO quiz_questions (course_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES

('A0000000-0000-0000-0000-000000000002',
 'Under which regulation is the organisational Duty of Candour set out?',
 'Regulation 17 of the Health and Social Care Act 2008 (Regulated Activities) Regulations 2014',
 'Regulation 20 of the Health and Social Care Act 2008 (Regulated Activities) Regulations 2014',
 'Regulation 9 of the Health and Social Care Act 2008 (Regulated Activities) Regulations 2014',
 'Regulation 20 of the Care Act 2014',
 'B',
 'The organisational Duty of Candour is set out in Regulation 20 of the Health and Social Care Act 2008 (Regulated Activities) Regulations 2014. It applies to all providers registered with the CQC.'),

('A0000000-0000-0000-0000-000000000002',
 'Which of the following best defines a Notifiable Safety Incident?',
 'Any accident or incident that results in a resident needing first aid',
 'An unintended or unexpected incident that appears to have resulted in death, severe harm, moderate harm, or prolonged psychological harm',
 'Any incident that results in a resident being transferred to hospital',
 'Any incident that a staff member considers to be reportable under RIDDOR',
 'B',
 'A Notifiable Safety Incident is an unintended or unexpected incident that occurs during provision of a regulated activity and appears to have resulted in (or could result in) death, severe harm, moderate harm, or prolonged psychological harm.'),

('A0000000-0000-0000-0000-000000000002',
 'Which of the following correctly lists the 5 steps of Duty of Candour in order?',
 'Investigate, Apologise, Tell, Support, Write',
 'Tell, Apologise, Explain, Support, Follow-up in writing',
 'Report, Apologise, Investigate, Notify CQC, Write',
 'Tell, Investigate, Explain, Notify family, Write',
 'B',
 'The 5 steps of Duty of Candour are: Tell (notify the person), Apologise (sincerely and unconditionally), Explain (based on known facts), Support (ongoing practical and emotional support), and Follow-up in writing (investigation findings and actions taken).'),

('A0000000-0000-0000-0000-000000000002',
 'Which of the following is an example of moderate harm triggering Duty of Candour?',
 'A resident slips but is uninjured',
 'A resident sustains a fracture from a fall requiring hospitalisation',
 'A resident complains of mild bruising after a transfer',
 'A resident receives the wrong flavour of yoghurt at lunchtime',
 'B',
 'Moderate harm means harm requiring a significant increase in treatment beyond routine management. A fracture requiring hospitalisation is a clear example of moderate harm, triggering the full Duty of Candour process.'),

('A0000000-0000-0000-0000-000000000002',
 'When should the initial Duty of Candour notification ideally take place?',
 'Within 20 working days of the incident',
 'Only after the full investigation is complete',
 'As soon as reasonably practicable — ideally the same day or within 24 hours of identifying the incident',
 'Within 7 calendar days of the incident',
 'C',
 'The initial notification should take place as soon as reasonably practicable after the incident is identified. The CQC expects prompt action, and waiting until the investigation is complete before telling the family is a breach of Duty of Candour.'),

('A0000000-0000-0000-0000-000000000002',
 'Which of the following represents a compliant Duty of Candour apology?',
 '"We are sorry if you feel that the care was not up to standard."',
 '"We apologise, however your mother was already a high falls risk."',
 '"I am truly sorry that this happened to your mother."',
 '"We regret the inconvenience this has caused your family."',
 'C',
 'A Duty of Candour apology must be sincere and unqualified. "I am truly sorry that this happened" is direct and unconditional. The other options all include qualifications, deflections, or minimising language that undermine the apology.'),

('A0000000-0000-0000-0000-000000000002',
 'Is an apology under Duty of Candour an admission of legal liability?',
 'Yes — apologising confirms the provider was negligent',
 'No — an apology under Duty of Candour is not an admission of legal liability',
 'Only if the apology is given in writing',
 'Only if the apology is witnessed by a third party',
 'B',
 'An apology under Duty of Candour is explicitly not an admission of legal liability. The legislation and CQC guidance make clear that apologising is the right and required thing to do, and it does not prejudge any legal proceedings.'),

('A0000000-0000-0000-0000-000000000002',
 'What should you do if the full facts of an incident are not yet known at the time of the initial Duty of Candour conversation?',
 'Delay the conversation until the investigation is complete',
 'Speculate about likely causes to give the family a full picture',
 'Be honest about what is known so far and confirm you will share investigation findings once complete',
 'Send a written letter instead of having a face-to-face conversation',
 'C',
 'You should not delay the initial conversation until all facts are known. Be honest about what is known and what is still being investigated. Do not speculate. Commit to sharing full findings once the investigation is complete.'),

('A0000000-0000-0000-0000-000000000002',
 'If a resident lacks capacity, who should be informed under Duty of Candour?',
 'No one — Duty of Candour only applies when the resident has full capacity',
 'Only the GP and the local authority',
 'Their next of kin, legal representative, or lasting power of attorney holder; or an independent advocate if none is available',
 'Only the CQC',
 'C',
 'If the resident lacks capacity, the notification must be made to their next of kin, legal representative, or lasting power of attorney holder. If no such person is available, an independent advocate should be contacted. Duty of Candour still fully applies.'),

('A0000000-0000-0000-0000-000000000002',
 'What must a Duty of Candour written follow-up letter include?',
 'Only an apology and contact details for the CQC',
 'Investigation findings, a written apology, actions taken to prevent recurrence, and how to escalate further',
 'A copy of the incident report form and the staff rota for the day of the incident',
 'Legal advice and confirmation that the provider does not accept liability',
 'B',
 'The written follow-up must include: investigation findings, a written apology, actions taken or proposed to prevent recurrence, and information about how to escalate further (complaints process and ombudsman details). It must be written in plain English with a compassionate tone.'),

('A0000000-0000-0000-0000-000000000002',
 'What is the consequence of failing to comply with Regulation 20 (Duty of Candour)?',
 'The provider receives a formal warning but no further action',
 'The Duty of Candour only applies to NHS providers, so there is no consequence for care homes',
 'Failing to comply is a criminal offence; the CQC can prosecute without first issuing a warning notice, and fines or prosecution may follow',
 'The provider must write a letter of apology to the CQC within 14 days',
 'C',
 'Failure to comply with Regulation 20 is a criminal offence. Unlike some other breaches, the CQC can prosecute without first issuing a warning notice. Fines and criminal prosecution are possible, and non-compliance will affect inspection ratings.'),

('A0000000-0000-0000-0000-000000000002',
 'What is the key difference between Duty of Candour and complaints handling?',
 'Duty of Candour applies only to deaths; complaints handling applies to all incidents',
 'Duty of Candour is proactive (initiated by the provider); complaints are reactive (initiated by the resident or family)',
 'Complaints handling is a legal requirement; Duty of Candour is only guidance',
 'There is no difference — both processes are identical',
 'B',
 'Duty of Candour is proactive — the provider must initiate the conversation without waiting to be asked. A complaint is reactive — it is initiated by the resident or family. Both can apply simultaneously to the same incident but are separate processes.'),

('A0000000-0000-0000-0000-000000000002',
 'What is the Professional Duty of Candour for registered nurses?',
 'An optional best-practice guidance issued by the NMC',
 'A requirement under the NMC Code for nurses to be open and honest when things go wrong, separate from but complementary to the organisational duty',
 'A requirement that applies only when a nurse is working in an NHS setting',
 'A duty that replaces the organisational Duty of Candour when a nurse is the responsible clinician',
 'B',
 'The NMC Code requires registered nurses to be open and honest when things go wrong — this is the professional Duty of Candour. It operates alongside (not instead of) the organisational duty under Regulation 20. Both apply simultaneously when a nurse is employed by a CQC-registered provider.'),

('A0000000-0000-0000-0000-000000000002',
 'What protections exist for staff who report incidents under Duty of Candour obligations?',
 'No specific protections — staff report at their own risk',
 'Staff are protected under the Public Interest Disclosure Act 1998 (whistleblowing legislation) against victimisation or dismissal for making protected disclosures about patient safety',
 'Staff are protected only if they are a registered nurse or other regulated professional',
 'Staff are protected only if they report directly to the CQC rather than their manager',
 'B',
 'Staff making protected disclosures about patient safety are protected under the Public Interest Disclosure Act 1998. Employers must not victimise or dismiss staff for raising Duty of Candour concerns. Managers must foster a culture where staff can report incidents safely.'),

('A0000000-0000-0000-0000-000000000002',
 'Which of the following scenarios does NOT trigger the organisational Duty of Candour?',
 'A resident sustains a Grade 3 pressure ulcer due to a gap in repositioning care',
 'A resident receives a double dose of medication due to a handover error, requiring medical review',
 'A resident dies peacefully from a known terminal illness following agreed palliative care',
 'A resident sustains a fractured wrist following an unwitnessed fall',
 'C',
 'A death from a known terminal illness following agreed palliative care is not an unintended or unexpected outcome — it was the expected clinical trajectory. Duty of Candour only applies to unintended or unexpected incidents. The other three scenarios all involve unintended harm meeting the threshold.'),

('A0000000-0000-0000-0000-000000000002',
 'How do CQC inspectors verify Duty of Candour compliance during an inspection?',
 'They review only the incidents that resulted in a death',
 'They check incident logs, investigation files for evidence of the conversation and written follow-up, staff training records, and may ask staff directly about their understanding of Duty of Candour',
 'They request a signed declaration from the registered manager confirming compliance',
 'They only check whether a policy exists — they do not review individual incident files',
 'B',
 'Inspectors check incident logs, investigation files for evidence of the verbal conversation, apology, and written follow-up, care records, and staff training records. They may also ask staff directly about Duty of Candour procedures. Resident and family interviews may also explore whether families were informed.'),

('A0000000-0000-0000-0000-000000000002',
 'What must be documented immediately after a Duty of Candour conversation?',
 'Only the date and name of the person informed',
 'The date and time, who was present, the exact words of the apology, what was explained, how the family responded, what support was offered, and any agreed follow-up actions',
 'A signed statement from the family confirming they received the apology',
 'A copy of the CQC notification form submitted in relation to the incident',
 'B',
 'Full documentation after a Duty of Candour conversation must include: date and time, who was present, the words used in the apology (as close to verbatim as possible), what was explained, the family''s response, support offered, and follow-up actions agreed. This record should be made as soon as possible after the conversation.'),

('A0000000-0000-0000-0000-000000000002',
 'What should a Duty of Candour conversation explicitly NOT include?',
 'An apology for what happened',
 'Facts that are known at the time of the conversation',
 'Speculation about causes or blame of individual staff members',
 'Information about how to make a complaint',
 'C',
 'A Duty of Candour conversation must be based on known facts only. You must not speculate about causes or blame individual staff members, as this may contradict the investigation findings and could prejudice any disciplinary or legal process. Stick to what is confirmed and acknowledge what is not yet known.'),

('A0000000-0000-0000-0000-000000000002',
 'All relevant staff must receive Duty of Candour training. Which group is NOT specifically described as requiring this training?',
 'Registered managers',
 'Senior carers who may be first to identify a notifiable incident',
 'Kitchen and catering staff who have no direct care responsibilities',
 'Registered nurses',
 'C',
 'Duty of Candour training must be given to all relevant staff — those who may identify a notifiable incident or speak with residents and families. This includes managers, senior carers, and nurses. Kitchen and catering staff with no direct care responsibilities are not the primary target group, though all staff benefit from general awareness.'),

('A0000000-0000-0000-0000-000000000002',
 'What does ''as soon as reasonably practicable'' mean in the context of Duty of Candour timescales?',
 'Within 20 working days as stated in the Care Act 2014',
 'Within 14 calendar days as recommended by the NMC',
 'Promptly, without unnecessary delay — the initial conversation should typically happen within 24 hours of identifying the incident, not weeks later',
 'At the next scheduled family meeting, however far away that may be',
 'C',
 '"As soon as reasonably practicable" means without unnecessary delay. For the initial notification, this typically means within 24 hours or the same day. Waiting for a scheduled meeting or until the investigation is complete before informing the family is not compliant with Duty of Candour.')

ON CONFLICT DO NOTHING;

END $$;