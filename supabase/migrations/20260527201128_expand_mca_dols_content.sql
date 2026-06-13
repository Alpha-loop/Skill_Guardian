DO $$ BEGIN

-- Flashcards 26-50 for MCA and DoLS (course_id: 10000000-0000-0000-0000-000000000009)
-- Note: course currently has 23 flashcards; adding order_index 26-50 to reach 50 total

INSERT INTO flashcards (course_id, question_text, answer_text, difficulty, order_index) VALUES
(
  '10000000-0000-0000-0000-000000000009',
  'What are the five statutory principles of the Mental Capacity Act 2005 and what does each mean in practice?',
  'Principle 1 — Presumption of capacity: every adult is assumed to have capacity unless proven otherwise. Principle 2 — Right to be supported: all practicable steps must be taken to help a person make a decision before concluding they cannot. Principle 3 — Right to make unwise decisions: a person is not to be treated as lacking capacity merely because they make a decision others consider unwise. Principle 4 — Best interests: anything done for a person who lacks capacity must be in their best interests. Principle 5 — Least restrictive option: before an act is done, consider whether there is a less restrictive alternative that achieves the same purpose.',
  2,
  26
),
(
  '10000000-0000-0000-0000-000000000009',
  'What is the two-stage capacity test under the MCA 2005?',
  'Stage 1 — Diagnostic threshold: is there an impairment or disturbance in the functioning of the mind or brain? (This includes dementia, brain injury, mental illness, learning disability, delirium.) Stage 2 — Functional test: as a result of that impairment, can the person: (a) understand the information relevant to the decision; (b) retain the information long enough to make a decision; (c) use or weigh the information as part of the decision-making process; (d) communicate their decision (by any means)? If a person cannot do one or more of steps (a)–(d) due to the impairment, they lack capacity for that specific decision at that time.',
  3,
  27
),
(
  '10000000-0000-0000-0000-000000000009',
  'How should fluctuating capacity be handled?',
  'Fluctuating capacity occurs when a person''s ability to make decisions varies over time — for example, due to dementia, delirium, mental illness, or the effects of medication. The approach: (1) assess capacity at the most appropriate time (e.g., when a person is at their clearest — often mornings for dementia); (2) delay non-urgent decisions until a period of capacity if possible; (3) document each assessment with date, time and context; (4) if a person lacks capacity at the time a decision must be made, proceed under best interests; (5) revisit regularly — do not assume previous assessments are current. Capacity is always decision- and time-specific.',
  3,
  28
),
(
  '10000000-0000-0000-0000-000000000009',
  'What techniques support a person to make their own decision (supported decision-making)?',
  'Supported decision-making is required before concluding a person lacks capacity. Techniques include: using simple, jargon-free language; using visual aids, symbols, pictures or objects; providing information in written or audio format; involving a trusted person, interpreter, or speech and language therapist; choosing the right time and environment (quiet, minimal distraction); breaking complex decisions into smaller parts; allowing adequate time; using open questions; presenting options one at a time. The MCA Code of Practice emphasises that failing to provide adequate support may itself cause apparent incapacity.',
  2,
  29
),
(
  '10000000-0000-0000-0000-000000000009',
  'What does the MCA 2005 best interests checklist require?',
  'When acting for a person who lacks capacity, the best interests decision must consider: (1) whether and when capacity might be regained; (2) the person''s past and present wishes, feelings, beliefs and values; (3) any advance decision or statements they made while capacitated; (4) the views of carers, family, attorney (LPA), deputy, and IMCA where relevant; (5) the least restrictive option; (6) the person''s current wishes (even if they cannot fully communicate them); (7) whether the decision can be postponed. Best interests is not the same as clinical best interests — it encompasses the whole person. The decision-maker should be able to explain how each factor was weighed.',
  3,
  30
),
(
  '10000000-0000-0000-0000-000000000009',
  'What is an Advance Decision to Refuse Treatment (ADRT) and when is it legally binding?',
  'An ADRT is a written statement made by a person with capacity, specifying which medical treatments they refuse if they later lack capacity and the circumstances in which the refusal applies. It is legally binding if: (1) the person was 18 or over and had capacity when making it; (2) it specifies the treatment refused and the circumstances; (3) for refusals of life-sustaining treatment, it must be in writing, signed, witnessed and include the statement ''even if my life is at risk''; (4) there is no reason to believe the person changed their mind. A binding ADRT overrides healthcare professionals'' and family members'' wishes. Care staff must know how to locate and act on an ADRT.',
  3,
  31
),
(
  '10000000-0000-0000-0000-000000000009',
  'What is a Lasting Power of Attorney (LPA) and what are the two types?',
  'An LPA is a legal document made by a person with capacity (the ''donor''), appointing another person (the ''attorney'') to make decisions on their behalf if they lose capacity. There are two types: (1) Property and Financial Affairs LPA — covers decisions about property, bank accounts, investments and finances; can be used while the donor still has capacity (with their consent); (2) Health and Welfare LPA — covers decisions about care, treatment, where the person lives and medical treatment; can only be used when the donor lacks capacity. Both must be registered with the Office of the Public Guardian before use. Care staff must verify registration before acting on an attorney''s instructions.',
  2,
  32
),
(
  '10000000-0000-0000-0000-000000000009',
  'What is the Court of Protection and what is its role?',
  'The Court of Protection is a specialist court established by the MCA 2005 to make decisions on financial and welfare matters for adults who lack mental capacity, where those decisions cannot be made by agreement. Its functions include: making declarations about capacity; making welfare and property/financial decisions; appointing deputies to make ongoing decisions; hearing challenges to best interests decisions or LPAs; hearing cases about the lawfulness of deprivations of liberty. The Court can be approached when there is a dispute about capacity or best interests, or when no attorney or deputy is in place and a serious or contentious decision must be made.',
  3,
  33
),
(
  '10000000-0000-0000-0000-000000000009',
  'When must an Independent Mental Capacity Advocate (IMCA) be instructed?',
  'An IMCA must be instructed (under sections 35–41 MCA 2005) when: (1) an NHS body or local authority is proposing serious medical treatment or accommodation moves for a person who lacks capacity; (2) the person has no family, friends or other representatives (other than paid carers) who can be consulted in the best interests process; (3) the person is unbefriended. Additionally, an IMCA should be considered for deprivation of liberty authorisations and adult safeguarding enquiries. The IMCA''s role is to represent and support the incapacitated person''s interests — they are not a decision-maker.',
  3,
  34
),
(
  '10000000-0000-0000-0000-000000000009',
  'What are the Liberty Protection Safeguards (LPS) and how do they differ from DoLS?',
  'The Liberty Protection Safeguards (LPS), introduced by the Mental Capacity (Amendment) Act 2019, replace the Deprivation of Liberty Safeguards (DoLS) for adults lacking mental capacity who need to be deprived of their liberty in their best interests. Key differences from DoLS: LPS extend to 16–17 year-olds; LPS apply in a wider range of settings including domestic settings and supported living (not just hospitals and care homes); the responsible body for authorisation is the hospital manager, NHS trust, or local authority (not just the supervisory body); LPS introduce a ''responsible body'' concept; the renewal process is less cumbersome. Implementation has been subject to delay; current guidance should be checked.',
  3,
  35
),
(
  '10000000-0000-0000-0000-000000000009',
  'What are the key differences between DoLS (Deprivation of Liberty Safeguards) and the Liberty Protection Safeguards (LPS)?',
  'DoLS (under the MCA 2005 Schedule A1): applies only to care homes and hospitals; uses standard and urgent authorisations; Supervisory Body (local authority or NHS) authorises; six qualifying assessments required; applies only to adults (18+); no provision for domestic settings. LPS (Mental Capacity (Amendment) Act 2019): broader settings including community and domestic; applies from age 16; responsible body authorises; simplified process with pre-authorisation review by approved mental capacity professional (AMCP) for contested or complex cases; designed to address the backlog and bureaucracy of DoLS. DoLS remains in force until LPS fully commences.',
  3,
  36
),
(
  '10000000-0000-0000-0000-000000000009',
  'What constitutes a deprivation of liberty under the MCA?',
  'A deprivation of liberty occurs when a person is under continuous supervision and control and is not free to leave. This does not require physical locks — a person may be deprived of their liberty even if they have never tried to leave, if they would be prevented from doing so. Factors courts consider include: level of supervision, control over movements, restrictions on contact with others, and use of restraint. Minor restrictions (e.g., locked communal doors) alone do not constitute deprivation. Each case is fact-specific and must be assessed individually.',
  3,
  37
),
(
  '10000000-0000-0000-0000-000000000009',
  'What is the ''acid test'' from the P v Cheshire West case and why is it significant?',
  'In the Supreme Court case of P v Cheshire West and Chester Council [2014], Lady Hale established the ''acid test'' for determining whether a deprivation of liberty exists: a person is deprived of their liberty if they are under continuous supervision and control AND are not free to leave. Crucially, the test is objective: the person''s happiness with their situation, their mental state, the relative normality of their care, and the benign intentions of staff are irrelevant to the question. This ruling dramatically expanded the scope of DoLS applications as it became clear that many care home residents met the test.',
  3,
  38
),
(
  '10000000-0000-0000-0000-000000000009',
  'How does a care home apply for a DoLS authorisation?',
  'The Managing Authority (care home) must apply to the Supervisory Body (local authority) for a standard DoLS authorisation using Form 1. The process: (1) the care home identifies that a resident appears to be deprived of their liberty and that this may need to be authorised; (2) an urgent authorisation (Form 1) can be granted by the care home itself for up to 7 days while awaiting a standard authorisation; (3) the supervisory body arranges up to six qualifying assessments (age, mental health, mental capacity, best interests, eligibility, no refusals); (4) if all assessments are positive, a standard authorisation is granted for up to 12 months. The resident must be appointed a Relevant Person''s Representative (RPR).',
  3,
  39
),
(
  '10000000-0000-0000-0000-000000000009',
  'What happens when a DoLS authorisation is refused?',
  'If the Supervisory Body''s assessments conclude that the DoLS cannot be authorised (e.g., the deprivation is not in the person''s best interests, or another qualifying assessment fails), the Managing Authority (care home) must end the deprivation of liberty. If the person''s care needs cannot be met without depriving them of their liberty, and the deprivation cannot be authorised under DoLS, the matter may need to be referred to the Court of Protection for a welfare order. In practice, refusal is uncommon; more common is that conditions are attached to the authorisation or the care plan is adjusted.',
  3,
  40
),
(
  '10000000-0000-0000-0000-000000000009',
  'How does the MCA relate to consent for personal care tasks?',
  'Personal care tasks (washing, dressing, continence care) are ''acts in connection with care or treatment'' under section 5 MCA 2005. If a person has capacity, their consent must be obtained before each task — implied or expressed. If they lack capacity, section 5 provides a defence for carrying out such tasks without consent, provided: the carer reasonably believes the person lacks capacity for that decision; and the carer reasonably believes the act is in the person''s best interests. Restraint may only be used if proportionate and to prevent harm. Even without full capacity, the person''s cooperation and comfort signals should be respected.',
  2,
  41
),
(
  '10000000-0000-0000-0000-000000000009',
  'What must be documented in a capacity assessment?',
  'Documentation must include: the date and time of the assessment; the specific decision being assessed; the impairment or disturbance identified (stage 1); evidence of how each limb of the functional test was assessed (stage 2) — what information was given, what the person understood, retained and communicated; what steps were taken to support the person; the outcome; the assessor''s name and role; review date. The assessment must be proportionate — a decision to brush someone''s hair requires less formal documentation than a decision about a major medical procedure. Documentation should be in the care record and accessible to all relevant staff.',
  2,
  42
),
(
  '10000000-0000-0000-0000-000000000009',
  'What is the interface between the MCA 2005 and the Mental Health Act 1983?',
  'The MCA and MHA serve different functions: the MHA allows compulsory detention and treatment for mental disorder without consent, regardless of capacity. The MCA authorises acts for people who lack capacity in their best interests. Key interface points: the MHA eligibility assessment in DoLS checks that DoLS is not being used instead of the MHA when it would be more appropriate; a person who is liable to be detained under the MHA cannot be subject to DoLS simultaneously; treatment for a physical condition in a person detained under the MHA may still be governed by the MCA. Mental health law knowledge is needed to navigate cases involving both regimes.',
  3,
  43
),
(
  '10000000-0000-0000-0000-000000000009',
  'When is restraint of a person who lacks capacity lawful under the MCA 2005?',
  'Restraint is only lawful under the MCA 2005 when: (1) the person using restraint reasonably believes it is necessary to prevent harm to the person who lacks capacity; and (2) the restraint used is proportionate to the likelihood and seriousness of that harm. Restraint includes any use of force, any threat of force, or any restriction of a person''s movement. Restraint for the benefit of others (not the incapacitated person) is not authorised by the MCA. Where restraint amounts to a deprivation of liberty, a DoLS or Court of Protection order is required in addition.',
  3,
  44
),
(
  '10000000-0000-0000-0000-000000000009',
  'What does proportionality mean in the context of MCA best interests decisions?',
  'Proportionality requires that any intervention for a person who lacks capacity must be the least restrictive means of achieving the intended purpose. More intrusive or restrictive options must be considered alongside less restrictive alternatives and the less restrictive option chosen unless there is clear justification. For example: using a bed rail rather than a locked ward; supporting a person to eat independently rather than using artificial feeding; offering an alternative form of transport rather than refusing an outing. Proportionality is explicitly required by principle 5 of the MCA and underpins all best interests decisions and DoLS assessments.',
  2,
  45
),
(
  '10000000-0000-0000-0000-000000000009',
  'Can a person with capacity make an unwise decision and what must care staff do?',
  'Yes — principle 3 of the MCA 2005 states that a person is not to be treated as lacking capacity merely because they make a decision that others consider unwise. Adults with capacity have the right to make decisions others disagree with, even decisions that risk their health or wellbeing. Care staff must: respect the decision; not assume lack of capacity; ensure the person has been given all relevant information; document the decision and the support given; and record that the person appeared to understand the risks. Persistent ''unwise'' decisions do not automatically indicate a loss of capacity, though they may prompt a capacity review if there is also evidence of an underlying impairment.',
  2,
  46
),
(
  '10000000-0000-0000-0000-000000000009',
  'Give a practical example of a capacity assessment in a care home setting.',
  'Example: A resident with moderate dementia is refusing a course of antibiotics prescribed for a urinary tract infection. The nurse asks: (1) Do they have an impairment? Yes — dementia. (2) Can they understand why antibiotics are needed and what refusing means? The nurse explains in simple terms — the resident can repeat it back. (3) Can they retain the information? With prompting, yes. (4) Can they weigh the pros and cons? The resident states ''I don''t want more pills, I feel alright now''. (5) Can they communicate? Yes, verbally. Conclusion: on balance, the resident has capacity for this specific decision. Their refusal must be respected. The nurse documents the assessment and informs the GP.',
  2,
  47
),
(
  '10000000-0000-0000-0000-000000000009',
  'How should DoLS authorisations be reviewed and what triggers an early review?',
  'A standard DoLS authorisation lasts up to 12 months and should be reviewed before it expires. An early review must be requested when: the person''s condition changes significantly; the person regains capacity; new information suggests the deprivation is no longer in their best interests; the person, their RPR, or an IMCA requests a review; or there is a safeguarding concern. The Supervisory Body must consider the review request. If the care home believes conditions attached to the authorisation can no longer be met, it must notify the Supervisory Body. Keeping authorisations current and reviewed is a legal obligation.',
  2,
  48
),
(
  '10000000-0000-0000-0000-000000000009',
  'What is the role of the Supervisory Body in the DoLS process?',
  'The Supervisory Body is the local authority (for care homes and some other settings) or the NHS body (for hospitals). Its role includes: receiving DoLS applications from Managing Authorities; commissioning up to six qualifying assessments; granting or refusing standard authorisations; setting conditions on authorisations; appointing the Relevant Person''s Representative (RPR); monitoring compliance; and handling review requests. The Supervisory Body provides scrutiny and independent oversight of deprivations of liberty to safeguard the rights of vulnerable people. Local authorities have faced criticism for backlogs in processing DoLS applications — an issue the LPS aims to address.',
  3,
  49
),
(
  '10000000-0000-0000-0000-000000000009',
  'What MCA training are care staff expected to receive?',
  'The Care Certificate (Standard 9) requires all new care workers to understand MCA principles and their application. The MCA Code of Practice (2007) states that all health and social care staff should receive sufficient training to apply the Act in their role. The level of training should be proportionate to the role: frontline care workers need a working knowledge of the five principles, capacity assessment, best interests and DoLS/LPS; senior staff and nurses need deeper competence to conduct and document formal capacity assessments. The CQC expects evidence of MCA training as part of inspection. Regular refreshers are required as guidance and case law evolves.',
  2,
  50
)
ON CONFLICT DO NOTHING;

-- Quiz questions 21-25 for MCA and DoLS (adding 5 to reach 25 total)
INSERT INTO quiz_questions (course_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(
  '10000000-0000-0000-0000-000000000009',
  'Which of the following correctly states the five statutory principles of the Mental Capacity Act 2005?',
  'Presumption of incapacity; right to refuse support; right to make wise decisions; family best interests; most convenient option',
  'Presumption of capacity; all practicable support before concluding incapacity; right to make unwise decisions; best interests; least restrictive option',
  'Presumption of capacity; right to professional assessment; right to refuse treatment; next-of-kin consent; least invasive option',
  'Assessment of capacity; best interests of the NHS; right to a second opinion; duty to consult family; proportionate response',
  'B',
  'The five statutory principles under section 1 MCA 2005 are: (1) presume capacity; (2) support the person to make their own decision before concluding they cannot; (3) do not treat an unwise decision as evidence of incapacity; (4) any act done or decision made for a person lacking capacity must be in their best interests; (5) consider the least restrictive option. These principles must be applied to every act and decision under the Act.'
),
(
  '10000000-0000-0000-0000-000000000009',
  'What is an Advance Decision to Refuse Treatment (ADRT)?',
  'A request by a person for a specific treatment to be given in the future',
  'A written statement by a person with capacity specifying which treatments they refuse should they later lack capacity, which can be legally binding',
  'A court order authorising medical treatment for a person without capacity',
  'A form signed by the next of kin on behalf of an incapacitated person',
  'B',
  'An ADRT (under sections 24–26 MCA 2005) is a written statement made by a person over 18 with capacity, specifying treatments they do not want in specified future circumstances if they later lack capacity. If it meets the legal requirements (and, for life-sustaining treatment, includes the words ''even if my life is at risk'' and is signed and witnessed), it is legally binding and overrides professional and family wishes. It cannot request treatment — only refuse it.'
),
(
  '10000000-0000-0000-0000-000000000009',
  'When must an Independent Mental Capacity Advocate (IMCA) be instructed?',
  'For every capacity assessment regardless of circumstances',
  'When an NHS body or local authority proposes serious medical treatment or accommodation changes for a person lacking capacity who has no appropriate family or friends to consult',
  'Only when the person is subject to a DoLS authorisation',
  'Whenever a person is admitted to a care home',
  'B',
  'Under sections 35-41 MCA 2005, an IMCA must be instructed when an NHS body or local authority proposes serious medical treatment or a change in accommodation for a person who lacks capacity and who is unbefriended (has no family, friends or other relevant persons, other than paid carers, who can be consulted). The IMCA represents and supports the person''s interests in the best interests decision-making process — they are not a proxy decision-maker.'
),
(
  '10000000-0000-0000-0000-000000000009',
  'What is the ''acid test'' established in P v Cheshire West [2014] for determining a deprivation of liberty?',
  'Whether the person is unhappy with their care arrangements',
  'Whether the person is under continuous supervision and control AND is not free to leave',
  'Whether the care setting uses locked doors',
  'Whether restraint has been physically applied to the person',
  'B',
  'The Supreme Court in P v Cheshire West [2014] established that the ''acid test'' for deprivation of liberty is whether the person is under continuous supervision and control AND is not free to leave. Crucially, the person''s happiness with their situation, the quality of their care, and the good intentions of staff are irrelevant to this objective test. This ruling significantly expanded the scope of the DoLS regime as it revealed that many care home residents were being deprived of their liberty without authorisation.'
),
(
  '10000000-0000-0000-0000-000000000009',
  'The Liberty Protection Safeguards (LPS) are replacing DoLS. Which of the following is a key improvement under the LPS?',
  'LPS will only apply to NHS hospitals, removing the burden from care homes',
  'LPS will extend to a wider range of settings including community and domestic settings, and will apply from age 16',
  'LPS will remove the requirement for any form of independent authorisation',
  'LPS will require family consent before any deprivation of liberty is authorised',
  'B',
  'The Liberty Protection Safeguards (Mental Capacity (Amendment) Act 2019) address key limitations of DoLS: they extend to a broader range of settings including supported living and domestic settings; they apply from age 16 (rather than 18); they simplify the authorisation process through a responsible body structure; and they introduce pre-authorisation review by an Approved Mental Capacity Professional (AMCP) for contested cases. The LPS are intended to reduce the significant backlogs that have accumulated under DoLS. Implementation has been subject to delay.'
)
ON CONFLICT DO NOTHING;

END $$;
