DO $$ BEGIN

-- Insert course
INSERT INTO courses (id, category, title, description, target_role, expiry_months, is_active, estimated_minutes, organisation_id, created_by)
VALUES (
  'A0000000-0000-0000-0000-000000000003',
  'management_leadership',
  'Professional Boundaries in Care',
  'Understanding appropriate relationships between staff, residents, families, and colleagues. Preventing exploitation and over-involvement, maintaining professionalism, and recognising when boundaries are being crossed.',
  'all_staff',
  24,
  true,
  45,
  NULL,
  NULL
)
ON CONFLICT DO NOTHING;

-- Flashcards
INSERT INTO flashcards (course_id, question_text, answer_text, difficulty, order_index) VALUES

('A0000000-0000-0000-0000-000000000003',
 'What are professional boundaries and why do they matter in care?',
 'Professional boundaries are the limits that define the appropriate relationship between a care worker and those in their care. They ensure that the relationship remains therapeutic, safe, and focused on the resident''s needs rather than the worker''s personal needs. Boundaries matter in care because the power imbalance between carer and resident creates a heightened vulnerability to exploitation — intentional or unintentional. Maintaining boundaries protects residents, staff, and the integrity of the care organisation.',
 1, 1),

('A0000000-0000-0000-0000-000000000003',
 'What is the power dynamic between care worker and resident and why does it create risk?',
 'In a care setting, the worker holds significant power over the resident''s daily life — controlling access to food, hygiene, medication, mobility, and social contact. Residents are often dependent, vulnerable, and may have cognitive impairments that make it difficult to recognise or report exploitation. This power imbalance creates a risk that even well-meaning care workers can unconsciously exploit — for example, by forming dependent relationships that meet the worker''s emotional needs rather than the resident''s. Awareness of this dynamic is the first step in boundary management.',
 2, 2),

('A0000000-0000-0000-0000-000000000003',
 'What is acceptable regarding gifts and what is not, and why does this matter?',
 'Most care homes operate a policy permitting small, low-value tokens of appreciation (e.g., chocolates, flowers) but prohibiting cash gifts, significant financial gifts, items of jewellery, or being named in a will. The reason is that the power imbalance can be exploited — intentionally or not — to receive gifts or financial advantage from vulnerable residents. Staff must declare any gifts received and record them in the gifts register. Accepting prohibited gifts can constitute financial abuse and a disciplinary or criminal matter.',
 2, 3),

('A0000000-0000-0000-0000-000000000003',
 'What social media rules apply to care staff and why do professional profiles matter?',
 'Care staff must never post photographs of residents, identify the care home in posts about difficult residents or colleagues, or post content that could be considered discriminatory, disrespectful, or damaging to the organisation''s reputation. Staff should not connect with residents or their families on personal social media platforms. Professional profiles (such as LinkedIn) should not share confidential information. The reason is that social media content is public and permanent, and breaches can constitute a GDPR violation, a safeguarding concern, and gross misconduct.',
 2, 4),

('A0000000-0000-0000-0000-000000000003',
 'What are the rules around physical boundaries in care — appropriate touch, personal space, and consent?',
 'Touch in care should be purposeful, explained, and consented to. Before physical contact, tell the resident what you are about to do and seek their agreement. Respect their personal space and do not make physical contact for your own comfort (e.g., hugging a resident because you feel affectionate towards them). Intimate care requires explicit consent and must follow the care plan. Any unsolicited, unnecessary, or sexual physical contact is an abuse. Cultural differences in attitudes to touch should be documented in the care plan and respected.',
 2, 5),

('A0000000-0000-0000-0000-000000000003',
 'What are emotional boundaries in care, and how do you recognise over-involvement and emotional dependency?',
 'Emotional boundaries mean keeping a caring, compassionate relationship without becoming emotionally dependent on or enmeshed with a resident. Signs of over-involvement include: thinking about a specific resident excessively when off duty, buying personal gifts for them, sharing personal problems with them, becoming upset when another staff member cares for them, or feeling you are the only one who understands them. Over-involvement harms both the worker (risk of burnout) and the resident (who may not receive consistent care from others). Supervision is the key tool for reflection.',
 2, 6),

('A0000000-0000-0000-0000-000000000003',
 'What financial boundaries must care staff maintain and what must they never do?',
 'Care staff must never: borrow or accept money from residents, assist residents in changing their will or financial arrangements, accept cash gifts of any value, become involved in managing a resident''s finances unless formally authorised (e.g., a DWP appointee), or act as a lasting power of attorney for a resident. Financial exploitation is one of the most common forms of abuse of older people. Even where the resident offers money voluntarily, accepting it crosses a professional boundary and may constitute financial abuse.',
 2, 7),

('A0000000-0000-0000-0000-000000000003',
 'What are dual relationships and why are romantic or befriending relationships with residents problematic?',
 'A dual relationship occurs when a care worker has both a professional and a personal relationship with a resident — for example, becoming a close personal friend or a romantic partner. These relationships are problematic because they undermine the objectivity and impartiality needed to deliver safe, person-centred care. The power imbalance makes genuine consent to a romantic relationship highly questionable. Such relationships may also lead to preferential treatment, neglect of other residents, and professional misconduct or criminal proceedings.',
 3, 8),

('A0000000-0000-0000-0000-000000000003',
 'What are the signs that a professional boundary is being crossed?',
 'Warning signs include: keeping a relationship with a resident secret from colleagues, giving a resident special treatment not in their care plan, arranging to visit the resident outside of working hours, exchanging personal phone numbers, sharing personal problems with a resident, accepting gifts repeatedly, speaking negatively about colleagues to a resident, or defending a resident''s behaviour against organisational policies in ways that compromise care. Any of these behaviours should prompt reflection and, if persistent, a report to management.',
 2, 9),

('A0000000-0000-0000-0000-000000000003',
 'What is a care worker''s responsibility when they observe a colleague crossing a professional boundary?',
 'Care workers have a duty to report boundary concerns about colleagues. This is not a betrayal — it is a safeguarding responsibility. The initial step is to approach your line manager or registered manager and report what you have observed. If the concern involves the manager, report to the provider board, HR, or the Local Authority Designated Officer (LADO) if the concern meets a safeguarding threshold. Whistleblowing protections apply. Failing to report known boundary violations may make you complicit in the harm caused.',
 2, 10),

('A0000000-0000-0000-0000-000000000003',
 'What are a manager''s responsibilities when a professional boundary concern is raised?',
 'When a boundary concern is raised, the manager must: take it seriously and not minimise it, document the concern, conduct an initial fact-finding exercise, consider whether immediate safeguarding action is needed, assess whether the staff member should be redeployed or suspended pending investigation, follow the organisation''s disciplinary and safeguarding procedures, and report to external agencies (LADO, CQC, DBS) if required. The manager must also support the member of staff who raised the concern, protecting them from victimisation.',
 3, 11),

('A0000000-0000-0000-0000-000000000003',
 'Case study: A carer becomes very close to a resident''s family — how should this be analysed through a boundary lens?',
 'A carer who develops a very close personal relationship with a resident''s family may begin sharing confidential information about other residents, accepting meals or hospitality, or advocating for this resident over others. Even with good intentions, this creates a conflict of interest and a boundary violation. The carer may start making unofficial care decisions based on the family''s preferences rather than the care plan. The manager should address this through supervision, set clear expectations, and if necessary review staffing arrangements to restore appropriate distance.',
 3, 12),

('A0000000-0000-0000-0000-000000000003',
 'What are the whistleblowing pathways for professional boundary violations?',
 'If a boundary concern is not addressed internally, staff can escalate to: the organisation''s nominated safeguarding lead, the Local Authority Designated Officer (LADO) if the concern involves a regulated activity with a vulnerable adult, the CQC via the provider portal or online concern form, the individual''s professional regulatory body (NMC for nurses, HCPC for allied health professionals), or the police if a criminal act is suspected. Whistleblowers are protected under the Public Interest Disclosure Act 1998 against victimisation or dismissal.',
 3, 13),

('A0000000-0000-0000-0000-000000000003',
 'What does the NMC Code say about professional boundaries for nurses?',
 'The NMC Code (2018) requires nurses to maintain clear professional boundaries at all times. This includes: not entering into personal relationships with people in their care, not accepting gifts that could be seen as inducements, maintaining objectivity in clinical decisions, not exploiting the vulnerability of people in their care for personal gain or emotional satisfaction, and practising within their professional competence. Nurses who breach professional boundaries face fitness-to-practise referral, which can result in conditions, suspension, or removal from the NMC register.',
 3, 14),

('A0000000-0000-0000-0000-000000000003',
 'What does Skills for Care guidance say about professional boundaries for care workers?',
 'Skills for Care''s guidance on professional boundaries emphasises that care workers should act in the best interests of the people they support, not their own personal or emotional interests. Key principles include: maintaining confidentiality, not forming personal relationships with residents, behaving professionally both in and outside the workplace, using supervision to reflect on boundary challenges, and understanding that boundary violations — even unintentional ones — can harm vulnerable people. The guidance supports the Care Certificate standard on personal development and wellbeing.',
 2, 15),

('A0000000-0000-0000-0000-000000000003',
 'What does self-awareness mean in the context of professional boundary management?',
 'Self-awareness means recognising your own emotional needs, vulnerabilities, and triggers that might make you susceptible to boundary crossing. For example, a care worker going through loneliness at home may unconsciously seek emotional fulfilment through over-involvement with a resident. A worker with a strong desire to be liked may struggle to maintain firmness around gift policies. Regular reflection — ideally through clinical supervision — helps staff identify these tendencies before they become boundary violations.',
 2, 16),

('A0000000-0000-0000-0000-000000000003',
 'How can supervision be used as a tool for professional boundary reflection and support?',
 'Supervision provides a safe, confidential space for care workers to discuss challenging relationships with residents or families. A skilled supervisor can help staff identify early warning signs of over-involvement, process difficult emotions (such as grief when a long-term resident dies), and develop strategies to maintain appropriate professional distance. Supervision records should note any boundary-related discussions (without identifying details) and the agreed actions. Regular, quality supervision is a protective factor against boundary violations.',
 2, 17),

('A0000000-0000-0000-0000-000000000003',
 'How and where should professional boundary concerns be documented?',
 'Document boundary concerns in a confidential incident or concern log, not in the resident''s care record (which they have the right to access). The record should include: the date and nature of the concern, who raised it, what was observed, and the actions taken. If a safeguarding referral is made, the referral form and any subsequent correspondence should be stored securely. Managers should keep a separate record of all boundary-related concerns as part of the organisation''s governance oversight.',
 2, 18),

('A0000000-0000-0000-0000-000000000003',
 'How does burnout contribute to professional boundary erosion?',
 'Staff experiencing burnout — characterised by emotional exhaustion, depersonalisation, and reduced sense of personal accomplishment — are at higher risk of boundary violations. Exhausted staff may seek emotional reward from certain residents (over-involvement) or may become dismissive or detached (under-involvement). Both are boundary failures. Burnout also impairs professional judgement, making staff less able to recognise when lines are being crossed. Organisations must monitor workload, provide supervision, and take action when burnout is identified.',
 3, 19),

('A0000000-0000-0000-0000-000000000003',
 'How should cultural differences be handled in the context of professional boundaries?',
 'Some cultural practices — such as more physical expressions of warmth, gift-giving as a sign of respect, or a strong family role in care decisions — may differ from standard care home norms. These differences should be respectfully acknowledged and, where appropriate, documented in the care plan. However, cultural difference does not override professional boundary requirements. For example, the gift policy still applies even if gift-giving is culturally customary. Cultural awareness should inform how boundaries are communicated, but not whether they are maintained.',
 3, 20),

('A0000000-0000-0000-0000-000000000003',
 'What are the legal consequences of professional boundary violations in care?',
 'Legal consequences depend on the severity of the violation. Financial exploitation of a vulnerable adult is a criminal offence under the Mental Capacity Act 2005 and the Fraud Act 2006. Sexual contact with a person in care who lacks capacity to consent is a criminal offence under the Sexual Offences Act 2003. Serious boundary violations may result in a DBS barred list referral, preventing the individual from ever working with vulnerable people again. Less serious violations may result in disciplinary action, dismissal, or regulatory referral.',
 3, 21),

('A0000000-0000-0000-0000-000000000003',
 'When does a professional boundary violation become an adult safeguarding concern?',
 'A boundary violation becomes an adult safeguarding concern when it involves: actual or suspected abuse (financial, physical, sexual, emotional, or psychological), exploitation of a vulnerable adult, a pattern of behaviour suggesting grooming, or any situation where the resident has been harmed or is at risk of harm. At this point, the concern must be referred to the local authority adult safeguarding team under the Care Act 2014 duty to enquire. The CQC should also be notified if the incident meets the threshold for a Notifiable Event.',
 3, 22),

('A0000000-0000-0000-0000-000000000003',
 'What are the rules around online and digital boundaries — texting, social media friend requests?',
 'Care staff must not: give personal mobile numbers to residents or family members, accept social media friend requests from residents or their families, text residents outside their professional role, or use personal devices to photograph residents even with apparent consent. All communication must go through official channels (the care home''s phone, email, or communication platform). Violations of digital boundaries can escalate quickly and may constitute a GDPR breach, a safeguarding concern, or evidence of inappropriate conduct.',
 2, 23),

('A0000000-0000-0000-0000-000000000003',
 'How should staff manage boundaries with families — including over-involvement and complaints?',
 'Staff should be warm and professional with families while maintaining clear boundaries: not sharing information about other residents, not discussing staffing matters or personal opinions about management, and not forming personal friendships that create conflicts of interest. When a family member is over-involved — for example, attempting to direct care in ways that contradict the care plan or bypassing the manager — this should be addressed calmly and escalated to the manager. All complaints from families must go through the formal complaints process.',
 2, 24),

('A0000000-0000-0000-0000-000000000003',
 'How should an organisation respond after a professional boundary violation — what does rebuilding look like?',
 'After a boundary violation, the organisation should: complete a thorough investigation, take appropriate disciplinary action, provide supervision and reflective practice for the staff member if they remain in post, review whether systemic factors (poor supervision, high workload) contributed, and update policies or training as needed. If a resident was harmed, Duty of Candour applies. The manager should debrief the team sensitively, without identifying the individual, to share learning. Rebuilding professional standards requires consistent modelling from management.',
 3, 25)

ON CONFLICT DO NOTHING;

-- Quiz questions
INSERT INTO quiz_questions (course_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES

('A0000000-0000-0000-0000-000000000003',
 'A resident''s family member regularly brings in home-cooked meals for a specific carer and has started giving them cash at Christmas. What is the most appropriate action?',
 'Accept the cash as it is a personal gift unrelated to work',
 'Decline the cash, record it in the gifts register, speak with the manager, and politely explain the gift policy to the family',
 'Accept the cash but donate it to a charity to avoid personal benefit',
 'Accept the food but decline the cash, as food is not a boundary concern',
 'B',
 'Cash gifts of any value must not be accepted. The carer should decline, record the offer in the gifts register, and speak with the manager. The family should be informed of the gift policy in a kind and non-confrontational way. All gifts — offered or accepted — should be recorded.'),

('A0000000-0000-0000-0000-000000000003',
 'A care worker has been taking photographs of a resident on their personal phone to "share with family". Which of the following is true?',
 'This is acceptable if the resident gives verbal consent',
 'This is a breach of professional boundaries and GDPR; all photographs must be taken and shared through official organisational channels with documented consent',
 'This is acceptable if the family has requested it',
 'This is acceptable as long as the photographs are not posted on social media',
 'B',
 'Using a personal device to photograph residents — even with verbal consent and even if not posted publicly — breaches GDPR, organisational policy, and professional boundaries. All photography must use official channels with documented consent and appropriate data handling.'),

('A0000000-0000-0000-0000-000000000003',
 'A senior carer notices that a colleague always asks to be allocated to the same resident, visits them on days off, and has been exchanging personal text messages. What should the senior carer do?',
 'Say nothing — it is the colleague''s personal life',
 'Confront the colleague directly and tell them to stop',
 'Report the concern to the registered manager as a potential boundary violation and possible safeguarding concern',
 'Wait to see if any actual harm occurs before raising a concern',
 'C',
 'The described behaviour shows multiple signs of a professional boundary violation — special allocation requests, visiting outside work hours, and personal contact. This must be reported to the manager. Failing to report can make the observer complicit in any harm. Whistleblowing protections apply.'),

('A0000000-0000-0000-0000-000000000003',
 'Which of the following correctly describes the power dynamic in a care relationship?',
 'The resident holds power because they are a paying service user',
 'Power is equal between the care worker and the resident',
 'The care worker holds significant power over the resident''s daily life, creating heightened vulnerability to exploitation',
 'The power dynamic is only relevant in nursing homes, not residential care homes',
 'C',
 'The care worker holds significant power over the resident''s daily life — controlling access to food, hygiene, medication, and social contact. This power imbalance exists in all care settings and is the reason professional boundaries are especially important in care.'),

('A0000000-0000-0000-0000-000000000003',
 'A resident with dementia tells a carer they want to change their will to leave money to them. What is the correct response?',
 'Accept the offer as the resident has the right to make their own decisions',
 'Tell the resident you are flattered and will think about it',
 'Decline clearly, do not get involved in financial or legal matters for residents, document the conversation, and inform the manager',
 'Contact the resident''s solicitor on their behalf to begin the process',
 'C',
 'Care workers must never be involved in residents'' financial or legal affairs. Even if the resident has capacity, accepting financial benefit from a resident is a professional boundary violation. The conversation must be documented and the manager informed so appropriate safeguarding steps can be taken.'),

('A0000000-0000-0000-0000-000000000003',
 'Which of the following is a sign of emotional over-involvement with a resident?',
 'Knowing the resident''s care plan in detail',
 'Spending time comforting a resident who is distressed',
 'Becoming upset when another carer is allocated to your favourite resident and thinking about them frequently when off duty',
 'Treating a resident with warmth and compassion',
 'C',
 'Emotional over-involvement is indicated by thinking about a specific resident excessively when off duty, feeling distressed when other carers look after them, or feeling you are the only person who can care for them. Warmth and compassion are appropriate — obsessive attachment is not.'),

('A0000000-0000-0000-0000-000000000003',
 'What is a dual relationship in the context of professional care?',
 'When two carers share responsibility for the same resident',
 'When a care worker has both a professional and a personal relationship with a resident or family member',
 'When a resident receives care from both nursing staff and care assistants',
 'When a carer works two jobs in different care homes',
 'B',
 'A dual relationship occurs when a care worker has both a professional and a personal relationship with a resident — such as a close friendship or romantic involvement. These are problematic because they undermine professional objectivity and compromise safe, person-centred care.'),

('A0000000-0000-0000-0000-000000000003',
 'Under which Act does sexual contact with a person in care who lacks capacity to consent become a criminal offence?',
 'The Care Act 2014',
 'The Mental Capacity Act 2005',
 'The Sexual Offences Act 2003',
 'The Health and Social Care Act 2008',
 'C',
 'Sexual contact with a person who lacks capacity to consent is a criminal offence under the Sexual Offences Act 2003. This applies regardless of whether the person appears to be willing or initiates contact — capacity to consent to sexual activity must be assessed and documented.'),

('A0000000-0000-0000-0000-000000000003',
 'A care worker tells a resident personal details about their own relationship problems during care tasks. Which boundary is being crossed?',
 'Financial boundary',
 'Physical boundary',
 'Emotional boundary — sharing personal problems with residents reverses the professional relationship and may burden a vulnerable person',
 'Digital boundary',
 'C',
 'Sharing personal problems with residents crosses the emotional boundary. The professional relationship should be focused on the resident''s needs, not the worker''s. This reversal of the caring role can burden a vulnerable person and is a warning sign of poor boundary management.'),

('A0000000-0000-0000-0000-000000000003',
 'What does the NMC Code require of registered nurses regarding professional boundaries?',
 'Nurses are permitted to form personal friendships with residents as long as no financial benefit is involved',
 'Nurses must maintain clear professional boundaries at all times, including not entering into personal relationships with people in their care or accepting gifts that could be seen as inducements',
 'The NMC Code does not address professional boundaries — this is covered only by the employer''s policy',
 'Nurses must maintain boundaries only with residents who have capacity',
 'B',
 'The NMC Code (2018) requires nurses to maintain clear professional boundaries at all times: not entering into personal relationships with people in their care, not exploiting vulnerability, and not accepting inappropriate gifts. Breach of professional boundaries can result in fitness-to-practise proceedings.'),

('A0000000-0000-0000-0000-000000000003',
 'A care worker adds a resident''s daughter on their personal Facebook and begins messaging her regularly with updates about her mother. What is the appropriate response from a manager?',
 'Allow it as long as the resident''s daughter initiated the contact',
 'Allow it as an example of going above and beyond for families',
 'Address this as a digital boundary violation — all communication with families must go through official channels; personal social media contact is not permitted',
 'Allow it but ask the care worker to keep communications professional in tone',
 'C',
 'Personal social media contact with a resident''s family member is a boundary violation regardless of who initiates it. All communication must go through official channels. This is both a boundary and a GDPR concern — personal data about a resident could easily be shared inappropriately through informal channels.'),

('A0000000-0000-0000-0000-000000000003',
 'Which of the following scenarios should be referred to the Local Authority Designated Officer (LADO)?',
 'A carer who is persistently late for shifts',
 'A senior carer who is suspected of financially exploiting a resident',
 'A manager who has a difficult relationship with a family member',
 'A carer who has complained about their working conditions',
 'B',
 'Suspected financial exploitation of a resident by a care worker is a safeguarding concern that must be referred to the LADO and the local authority adult safeguarding team. The LADO handles allegations against people in positions of trust with vulnerable adults or children.'),

('A0000000-0000-0000-0000-000000000003',
 'How does burnout increase the risk of professional boundary violations?',
 'Burnout only affects performance, not professional judgement',
 'Burnout has no specific link to professional boundary violations',
 'Burnout impairs professional judgement, increases emotional vulnerability, and may lead staff to seek emotional reward from certain residents (over-involvement) or become detached (under-involvement)',
 'Burnout affects nurses more than care assistants, making it mainly a clinical concern',
 'C',
 'Burnout impairs judgement and emotional regulation, making staff more vulnerable to boundary erosion. Over-involvement (seeking emotional reward from a resident) and under-involvement (detachment, depersonalisation) are both boundary failures that burnout can trigger. Regular supervision and workload management are protective factors.'),

('A0000000-0000-0000-0000-000000000003',
 'A resident''s family member asks a care worker whether a fellow resident is being given the right medication. What is the correct response?',
 'Tell the family member what you know, as transparency with families is important',
 'Politely decline to discuss other residents and direct any concerns to the registered manager or senior nurse',
 'Provide general information about the medication administration process without naming the resident',
 'Tell the family member this information is available under the Freedom of Information Act',
 'B',
 'Information about any resident is confidential. Discussing a resident''s medication with another resident''s family is a breach of confidentiality and a boundary violation. The care worker should decline politely and direct any concerns about another resident to the registered manager.'),

('A0000000-0000-0000-0000-000000000003',
 'What is the primary purpose of using supervision to address professional boundary issues?',
 'To formally discipline staff who have crossed boundaries',
 'To create a safe space for reflection, identifying early warning signs of over-involvement, and developing strategies to maintain appropriate professional distance',
 'To gather evidence for a potential dismissal procedure',
 'To satisfy CQC requirements for supervision frequency',
 'B',
 'Supervision is primarily a reflective and supportive tool. It provides a safe space to explore challenging relationships, process difficult emotions, and identify early warning signs of boundary issues before they escalate into violations. It is protective for both staff and residents.'),

('A0000000-0000-0000-0000-000000000003',
 'Financial exploitation of a vulnerable adult by a care worker can be a criminal offence under which legislation?',
 'The Health and Social Care Act 2008',
 'The Mental Capacity Act 2005 and the Fraud Act 2006',
 'The Care Act 2014 and the Equality Act 2010',
 'The Public Interest Disclosure Act 1998',
 'B',
 'Financial exploitation of a vulnerable adult can be prosecuted under the Mental Capacity Act 2005 (which prohibits exploitation of those lacking capacity) and the Fraud Act 2006. Serious financial boundary violations can result in criminal conviction and a DBS barred list referral.'),

('A0000000-0000-0000-0000-000000000003',
 'A carer is exhausted and struggling emotionally. They start confiding in a resident they feel close to, telling them about personal problems. How should this be addressed?',
 'This is fine — it shows the carer trusts the resident and helps build a therapeutic relationship',
 'This is only a concern if the resident raises a complaint',
 'This is a boundary violation that should be addressed through supervision; the carer needs support to process their own emotional needs through appropriate channels',
 'This is a minor concern that does not need to be reported',
 'C',
 'Confiding personal problems in a resident is an emotional boundary violation that burdens a vulnerable person and reverses the professional relationship. The carer''s emotional needs should be addressed through supervision, employee assistance programmes, or peer support — not through residents.'),

('A0000000-0000-0000-0000-000000000003',
 'A care worker from a culture where gift-giving is a deeply respectful gesture receives a significant gift from a resident''s family. What is the correct approach?',
 'Accept the gift as refusing it would be culturally offensive and insensitive',
 'Accept the gift but declare it to the manager and return it later',
 'Explain the gift policy sensitively and decline the gift, recognising the cultural significance but maintaining the professional boundary',
 'Accept the gift on behalf of the team and share it with colleagues',
 'C',
 'Cultural context should inform how the boundary is communicated but does not override it. The care worker should acknowledge the cultural significance of the gesture warmly and then explain the gift policy. Accepting a prohibited gift — regardless of cultural context — constitutes a boundary violation.'),

('A0000000-0000-0000-0000-000000000003',
 'Which of the following is a digital boundary violation?',
 'Using the care home''s secure system to send a resident''s family an update',
 'Texting a resident on a personal mobile phone to check how they are',
 'Photographing a resident using the organisation''s official device with documented consent',
 'Using the care home''s email to respond to a family complaint',
 'B',
 'Texting a resident on a personal mobile phone is a digital boundary violation. All communication must go through official channels. Personal contact via private devices bypasses organisational oversight, raises GDPR concerns, and can facilitate inappropriate relationships.'),

('A0000000-0000-0000-0000-000000000003',
 'What does Skills for Care guidance on professional boundaries state should be used as a key tool for boundary reflection?',
 'Annual appraisal',
 'Peer observation',
 'Regular supervision with a skilled supervisor',
 'Self-directed e-learning modules',
 'C',
 'Skills for Care''s guidance on professional boundaries identifies regular supervision with a skilled supervisor as a key tool for reflection and boundary management. Supervision provides the safe, confidential space needed for staff to explore challenging relationships and identify early warning signs.')

ON CONFLICT DO NOTHING;

END $$;