DO $$ BEGIN

-- Flashcards 26-50 for Information Governance and GDPR (course_id: 10000000-0000-0000-0000-000000000010)

INSERT INTO flashcards (course_id, question_text, answer_text, difficulty, order_index) VALUES
(
  '10000000-0000-0000-0000-000000000010',
  'What are the six lawful bases for processing personal data under UK GDPR?',
  'The six lawful bases are: (1) Consent — the individual has given clear, specific, informed and unambiguous consent; (2) Contract — processing is necessary to perform a contract with the individual; (3) Legal obligation — processing is necessary to comply with a legal obligation; (4) Vital interests — processing is necessary to protect someone''s life; (5) Public task — processing is necessary to perform a public function or task in the public interest; (6) Legitimate interests — processing is necessary for the organisation''s (or a third party''s) legitimate interests, balanced against the individual''s rights. In health and social care, legal obligation and vital interests are frequently applicable bases.',
  2,
  26
),
(
  '10000000-0000-0000-0000-000000000010',
  'What are the special categories of personal data under UK GDPR and why do they attract additional protection?',
  'Special category data is more sensitive and therefore requires higher levels of protection. The categories are: racial or ethnic origin; political opinions; religious or philosophical beliefs; trade union membership; genetic data; biometric data (where used for unique identification); health data; sex life or sexual orientation. In health and social care, health data is routinely processed and requires a specific condition under Article 9 UK GDPR (such as provision of health or social care) and a Schedule 1 condition under the Data Protection Act 2018. Additional safeguards — including appropriate policies, staff training, and access controls — are mandatory.',
  3,
  27
),
(
  '10000000-0000-0000-0000-000000000010',
  'What are the eight data subject rights under UK GDPR?',
  'The eight rights are: (1) Right to be informed — organisations must be transparent about data use; (2) Right of access — individuals can request their data (Subject Access Request); (3) Right to rectification — individuals can correct inaccurate data; (4) Right to erasure (''right to be forgotten'') — in certain circumstances; (5) Right to restrict processing — pause processing while accuracy is disputed; (6) Right to data portability — receive personal data in a machine-readable format; (7) Right to object — particularly to direct marketing and profiling; (8) Rights related to automated decision-making — not to be subject to solely automated decisions with significant effects.',
  2,
  28
),
(
  '10000000-0000-0000-0000-000000000010',
  'When does the right to erasure apply and when does it NOT apply?',
  'The right to erasure applies when: the data is no longer necessary for its original purpose; consent has been withdrawn and there is no other lawful basis; the individual objects and there are no overriding legitimate grounds; the data was unlawfully processed; erasure is required to comply with law. It does NOT apply when: processing is necessary for compliance with a legal obligation (e.g., retaining health records for the statutory minimum period); processing is necessary for public health purposes; processing is necessary for establishment, exercise or defence of legal claims; processing is necessary for archiving or research in the public interest. In health and social care, retention obligations frequently override erasure requests.',
  3,
  29
),
(
  '10000000-0000-0000-0000-000000000010',
  'What are the data retention periods for health and social care records in the UK?',
  'NHS guidance (Records Management Code of Practice 2021) sets minimum retention periods: adult health records — 8 years after last entry; children''s health records — until the patient''s 25th birthday (or 26th if treatment ended at age 17); mental health records — 20 years after last contact; maternity records — 25 years; care home resident records — 8 years after death or discharge (3 years for children). After the retention period, records must be securely destroyed and destruction documented. Records must not be destroyed if they are subject to a legal hold, ongoing complaint or legal action.',
  3,
  30
),
(
  '10000000-0000-0000-0000-000000000010',
  'What is the role of the Data Protection Officer (DPO)?',
  'The DPO is a statutory role under UK GDPR, required for organisations that process special category data on a large scale (which includes most NHS and care organisations). The DPO''s functions include: advising the organisation on GDPR compliance; monitoring compliance with data protection law; advising on Data Protection Impact Assessments (DPIAs); acting as the point of contact for the ICO; advising on data breach management; and providing training. The DPO must have expert knowledge of data protection law, operate independently, report to the highest level of management, and must not be penalised for performing their duties. The DPO is not personally liable for breaches.',
  2,
  31
),
(
  '10000000-0000-0000-0000-000000000010',
  'What is a personal data breach and what are the reporting timelines under UK GDPR?',
  'A personal data breach is a security incident leading to the accidental or unlawful destruction, loss, alteration, unauthorised disclosure of, or access to, personal data. Examples: sending care records to the wrong person, a laptop containing patient data stolen, a ransomware attack. Reporting timelines: (1) To the ICO — the organisation must report within 72 hours of becoming aware of the breach (if it poses a risk to individuals'' rights and freedoms); (2) To affected individuals — if the breach is high risk to their rights and freedoms, they must be notified without undue delay. If the breach is unlikely to result in risk to individuals, ICO reporting is not required but the breach must still be documented internally.',
  3,
  32
),
(
  '10000000-0000-0000-0000-000000000010',
  'You accidentally send a care record by email to the wrong person. What should you do immediately?',
  'Immediately: (1) inform your line manager and the Data Protection Officer (or designated person); (2) ask the recipient (if contactable) to delete the email and not share or use the information; (3) document what happened, when, what data was involved and who was affected; (4) assess the risk — was the data sensitive? Who received it? (5) the DPO will determine whether a report to the ICO is required within 72 hours; (6) if the affected individual is at high risk from the breach, they must be notified; (7) review processes to prevent recurrence. Do not try to conceal the error — transparent reporting is required by law and by professional duty.',
  2,
  33
),
(
  '10000000-0000-0000-0000-000000000010',
  'What is the data minimisation principle under UK GDPR?',
  'Data minimisation (Article 5(1)(c) UK GDPR) requires that personal data collected and processed must be adequate, relevant and limited to what is necessary in relation to the purposes for which it is processed. In practice: only collect the data you actually need; do not retain data longer than necessary; do not ask for information that is not required; limit access to those who genuinely need it. In care, this means care records should contain what is needed to deliver safe care — not surplus personal information. Data minimisation reduces the risk and impact of breaches and is a core principle of ''privacy by design''.',
  2,
  34
),
(
  '10000000-0000-0000-0000-000000000010',
  'What is the purpose limitation principle and how does it apply in care settings?',
  'Purpose limitation (Article 5(1)(b) UK GDPR) requires that personal data be collected for specified, explicit and legitimate purposes and not further processed in a manner incompatible with those purposes. In care: a resident''s health records collected for the purpose of providing care cannot then be used for marketing without their separate consent; information shared by a resident in confidence cannot be passed to a third party for an unrelated purpose without lawful basis. However, further processing for compatible purposes (such as research with appropriate safeguards) may be permitted. Every use of personal data must be traceable to an original, lawful stated purpose.',
  2,
  35
),
(
  '10000000-0000-0000-0000-000000000010',
  'What are encryption and pseudonymisation and how do they protect personal data?',
  'Encryption converts data into a coded form that can only be read with a decryption key — if encrypted data is stolen, it is unreadable without the key, significantly reducing breach risk. Pseudonymisation replaces directly identifying information (name, NHS number) with a pseudonym (code or number), so the data cannot be attributed to an individual without additional information held separately. Both are ''appropriate technical measures'' under Article 32 UK GDPR to reduce risk of unauthorised access. Pseudonymised data is still personal data (re-identification is possible); anonymised data (from which re-identification is truly impossible) falls outside GDPR. Care organisations should encrypt all mobile devices and portable media.',
  3,
  36
),
(
  '10000000-0000-0000-0000-000000000010',
  'How should a Subject Access Request (SAR) be handled in a care setting?',
  'An individual (or their authorised representative) has the right to request copies of their personal data held by the organisation. Handling a SAR: (1) acknowledge receipt promptly; (2) verify the requester''s identity; (3) respond within one month (can be extended by 2 months for complex requests, with notice); (4) provide a copy of all personal data held, along with information about why it is processed, who it is shared with, and retention periods; (5) redact any third-party data; (6) provide free of charge in most cases; (7) if the request is manifestly unfounded or excessive, you may refuse or charge a reasonable fee. Failure to respond within the deadline is a breach reportable to the ICO.',
  3,
  37
),
(
  '10000000-0000-0000-0000-000000000010',
  'What safeguards must be in place before sharing personal data with third parties in a care setting?',
  'Before sharing with third parties: (1) there must be a lawful basis for sharing (consent, legal obligation, vital interests, etc.); (2) for special category data, a specific condition under Article 9 must apply; (3) a Data Sharing Agreement (DSA) or Data Processing Agreement (DPA) should be in place with the third party; (4) the third party must provide sufficient guarantees about their data security measures; (5) the sharing must be proportionate and limited to what is necessary; (6) the individual should generally be informed (unless a specific exemption applies — e.g., safeguarding); (7) third parties outside the UK must meet equivalent protection standards. Informal sharing by email to personal addresses is not acceptable.',
  3,
  38
),
(
  '10000000-0000-0000-0000-000000000010',
  'What are the eight Caldicott Principles and who developed them?',
  'The Caldicott Principles were developed by Dame Fiona Caldicott (first published 1997, updated 2013, eighth principle added 2020). The eight principles are: (1) Justify the purpose of using confidential information; (2) Use only the minimum necessary personal information; (3) Access to personal information should be on a strict need-to-know basis; (4) Everyone with access should understand their responsibilities; (5) Everyone with access should understand and comply with the law; (6) Manage and respect patient and service user information — explain how it will be used; (7) The duty to share information can be as important as the duty to protect it — sharing for individual care; (8) Inform and engage individuals about how their information is used.',
  3,
  39
),
(
  '10000000-0000-0000-0000-000000000010',
  'What is a Caldicott Guardian and what is their role?',
  'A Caldicott Guardian is a senior person within an NHS organisation or local authority with responsibility for safeguarding the confidentiality of patient and service user information and enabling appropriate information sharing. They advise on information sharing proposals and can act as a ''conscience'' of the organisation on data use. All NHS organisations and local authorities handling social care information must appoint one. The role is a professional requirement (not a statutory post under GDPR, though complementary to it). Caldicott Guardians sit on the National Data Guardian network and provide a focus for Caldicott principles within their organisation.',
  2,
  40
),
(
  '10000000-0000-0000-0000-000000000010',
  'What is the difference between confidentiality and privacy?',
  'Confidentiality refers specifically to the obligation not to disclose information shared in a relationship of trust (e.g., between a care worker and a resident) without consent or legal justification. It is an active duty — ''do not share this information''. Privacy is the broader right of individuals to control information about themselves and to be free from intrusion — it encompasses both confidentiality and the right to a private life (Article 8, Human Rights Act). In care, both concepts apply: workers must not breach confidentiality (share information without authority) and must also respect residents'' privacy in how care is delivered, records are stored, and conversations are conducted.',
  2,
  41
),
(
  '10000000-0000-0000-0000-000000000010',
  'What is the difference between the Freedom of Information Act 2000 and data protection law?',
  'The Freedom of Information Act 2000 (FOIA) gives the public the right to request information held by public authorities (NHS trusts, local authorities, etc.) — it is about access to organisational information, not personal data. Data protection law (UK GDPR and DPA 2018) protects individuals'' personal data and regulates how organisations collect, use and store it. The laws interact: if a FOIA request includes personal data about the requester, it is handled as a Subject Access Request; if it includes personal data about third parties, that data is generally exempt from disclosure under FOIA. Private care homes are not subject to FOIA but are subject to data protection law.',
  2,
  42
),
(
  '10000000-0000-0000-0000-000000000010',
  'How should care records (paper and electronic) be managed to meet information governance requirements?',
  'Paper records: store securely (locked cabinets); do not leave unattended; handle, transport and dispose of securely (cross-cut shredding or confidential waste contractor); do not take off site without authorisation. Electronic records: use strong, unique passwords; lock screens when unattended; do not use personal email or unencrypted USB devices; access only records relevant to your role; log out of systems when finished. Both: retain for the required retention period, then destroy securely with documentation; maintain an up-to-date records inventory; report any suspected data loss. Access controls must restrict data access to those with a legitimate need.',
  2,
  43
),
(
  '10000000-0000-0000-0000-000000000010',
  'What is the Data Security and Protection Toolkit (DSPT)?',
  'The DSPT is an online self-assessment tool developed by NHS Digital that allows organisations that process health and social care data to measure their performance against the National Data Guardian''s data security standards. All CQC-registered organisations are expected to complete the DSPT annually. It covers 10 data security standards across three leadership obligations. Completion demonstrates compliance with the data security requirements of NHS data sharing agreements (DSAs) and is increasingly required to access NHS systems (e.g., NHSmail, spine access). Care homes that have not completed the DSPT may lose access to NHS data flows.',
  3,
  44
),
(
  '10000000-0000-0000-0000-000000000010',
  'What does an information governance audit involve?',
  'An IG audit assesses whether the organisation''s data protection practices meet legal and regulatory requirements. It typically covers: review of policies and procedures; staff training records; physical and technical security of records and systems; compliance with data retention schedules; review of recent incidents and breaches; subject access request handling; third-party data sharing arrangements; DSPT completion status; data protection impact assessments; and whether a DPO has been appointed. Findings are documented in an audit report with recommendations. Regular audits demonstrate accountability under UK GDPR and identify vulnerabilities before they cause harm.',
  2,
  45
),
(
  '10000000-0000-0000-0000-000000000010',
  'What are phishing attacks and social engineering, and how should care staff respond?',
  'Phishing attacks are fraudulent emails, texts or calls designed to trick staff into revealing passwords, clicking malicious links, or transferring data. Social engineering manipulates people psychologically to bypass security (e.g., a caller pretending to be IT support asking for a password). Response: never click unexpected links or open unexpected attachments; never share passwords; verify callers'' identities by calling back on a known number; be suspicious of urgency or unexpected requests; report suspicious emails to IT/information governance immediately; do not respond to the suspicious contact. Phishing is the most common initial access method in healthcare data breaches. Staff awareness training is the primary defence.',
  2,
  46
),
(
  '10000000-0000-0000-0000-000000000010',
  'What are the risks of using personal mobile devices (BYOD) in care settings and what safeguards should be in place?',
  'BYOD (Bring Your Own Device) risks include: photographing residents or their records (a common source of data breaches); using personal messaging apps (WhatsApp, etc.) to share care-related information without consent or security controls; loss or theft of an unencrypted personal device containing resident data; malware on personal devices spreading to care systems. Safeguards: a clear BYOD policy; prohibition on photographing residents without explicit consent; no personal data to be stored on personal devices; use of encrypted, organisation-approved communication apps; mandatory registration and remote-wipe capability for devices used for work; regular staff reminders. Many organisations prohibit personal mobile use in care areas entirely.',
  2,
  47
),
(
  '10000000-0000-0000-0000-000000000010',
  'What is an information sharing protocol (ISP) and when is one used?',
  'An information sharing protocol is a formal agreement between two or more organisations setting out the lawful basis, scope, format, security measures and governance for sharing specified types of personal data. ISPs are used when organisations need to share information on an ongoing or regular basis — for example, between a care home and an NHS trust sharing care records, or between social care and safeguarding teams. An ISP ensures both parties understand their obligations under UK GDPR, the types of data shared, the purposes, and what happens if a breach occurs. In the absence of an ISP, ad hoc sharing may occur without adequate safeguards, increasing legal and reputational risk.',
  2,
  48
),
(
  '10000000-0000-0000-0000-000000000010',
  'What is the accountability principle under UK GDPR and what does it require organisations to do?',
  'The accountability principle (Article 5(2) UK GDPR) requires organisations not only to comply with GDPR but to be able to demonstrate compliance. This means: maintaining records of processing activities (Article 30); appointing a DPO where required; implementing appropriate technical and organisational measures; conducting Data Protection Impact Assessments (DPIAs) for high-risk processing; having data breach response procedures; training staff; reviewing and updating policies; and being able to evidence all of the above to the ICO on request. Accountability shifts the burden from regulators proving non-compliance to organisations proving compliance. It underpins the entire UK GDPR framework.',
  3,
  49
),
(
  '10000000-0000-0000-0000-000000000010',
  'How does the Data Protection Act 2018 relate to UK GDPR?',
  'The Data Protection Act 2018 (DPA 2018) is the UK''s domestic legislation that implements and supplements the EU GDPR (now retained in UK law as ''UK GDPR'' post-Brexit). UK GDPR provides the main framework for data protection; the DPA 2018 adds national specifications, exemptions, and conditions applicable in the UK context, including: conditions for processing special category data (Schedule 1); exemptions (e.g., crime prevention, national security, journalism); provisions for law enforcement processing (Part 3); and the basis for the ICO''s regulatory role. Together, UK GDPR and DPA 2018 form the complete UK data protection framework. The DPA 2018 replaced the Data Protection Act 1998.',
  3,
  50
)
ON CONFLICT DO NOTHING;

-- Quiz questions 11-25 for Information Governance and GDPR
INSERT INTO quiz_questions (course_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(
  '10000000-0000-0000-0000-000000000010',
  'Which of the following is NOT one of the six lawful bases for processing personal data under UK GDPR?',
  'Consent',
  'Legal obligation',
  'Management convenience',
  'Vital interests',
  'C',
  'The six lawful bases under UK GDPR Article 6 are: consent, contract, legal obligation, vital interests, public task, and legitimate interests. ''Management convenience'' is not a lawful basis and processing personal data purely for administrative ease without a proper legal basis would constitute a breach of UK GDPR. Every processing activity must be mapped to one of the six lawful bases.'
),
(
  '10000000-0000-0000-0000-000000000010',
  'Which of the following is a special category of personal data under UK GDPR?',
  'The resident''s preferred meals',
  'The resident''s health data',
  'The resident''s room number',
  'The resident''s next of kin''s name',
  'B',
  'Health data is explicitly listed as a special category under Article 9 UK GDPR. Special categories include: health data, genetic data, biometric data, racial/ethnic origin, religious beliefs, political opinions, sexual orientation, trade union membership. Processing special category data requires both a lawful basis under Article 6 and a separate condition under Article 9, plus a Schedule 1 condition under the Data Protection Act 2018.'
),
(
  '10000000-0000-0000-0000-000000000010',
  'You discover that a colleague emailed a resident''s care plan to the wrong family member this morning. What is the reporting deadline to the ICO if this constitutes a notifiable breach?',
  '24 hours',
  '48 hours',
  '72 hours',
  '7 days',
  'C',
  'Under Article 33 UK GDPR, a personal data breach that is likely to result in a risk to individuals'' rights and freedoms must be reported to the ICO within 72 hours of the organisation becoming aware of it. If this deadline cannot be met, a phased notification with reasons for delay is required. The breach must also be documented internally regardless of whether ICO notification is required.'
),
(
  '10000000-0000-0000-0000-000000000010',
  'A care home resident asks you to delete all records held about them. Under what circumstances can the care home lawfully refuse this request?',
  'The care home can always refuse — residents do not have the right to erasure of care records',
  'The care home can refuse if processing is necessary to comply with a legal obligation, such as statutory health record retention requirements',
  'The care home can refuse only if the resident''s family objects',
  'The care home can refuse if the records are more than 2 years old',
  'B',
  'The right to erasure under Article 17 UK GDPR is not absolute. It does not apply when processing is necessary for compliance with a legal obligation (such as statutory requirements to retain health and social care records for specified minimum periods). A care home must retain records for their required retention period regardless of an erasure request. The resident must be informed of the reason for refusal and their right to complain to the ICO.'
),
(
  '10000000-0000-0000-0000-000000000010',
  'What is the role of the Caldicott Guardian in a health or social care organisation?',
  'To manage the organisation''s financial accounts',
  'To act as a senior responsible person safeguarding the confidentiality of patient and service user information and enabling appropriate information sharing',
  'To approve all data subject access requests',
  'To replace the Data Protection Officer in NHS organisations',
  'B',
  'The Caldicott Guardian is a senior professional within an NHS or social care organisation responsible for protecting the confidentiality of resident and patient information while enabling appropriate, lawful sharing. They advise on information sharing proposals and champion the Caldicott Principles. They are distinct from — but complementary to — the Data Protection Officer role. All NHS organisations and local authorities processing health and social care information must appoint one.'
),
(
  '10000000-0000-0000-0000-000000000010',
  'What are the main responsibilities of a Data Protection Officer (DPO) under UK GDPR?',
  'Physically storing personal data, managing payroll, and signing data sharing agreements',
  'Advising on GDPR compliance, monitoring compliance, advising on DPIAs, acting as the ICO contact point, and providing staff training',
  'Making all data protection decisions for the organisation and taking personal liability for any breaches',
  'Replacing the board of directors on data governance matters',
  'B',
  'The DPO''s functions under Article 39 UK GDPR are: informing and advising the organisation and staff of their obligations; monitoring compliance; advising on and monitoring Data Protection Impact Assessments; cooperating with and acting as the contact point for the ICO. The DPO must have expert knowledge of data protection law, act independently, and report to the highest management level. Crucially, the DPO is not personally liable for breaches — that responsibility lies with the organisation (controller).'
),
(
  '10000000-0000-0000-0000-000000000010',
  'A resident submits a Subject Access Request asking for all information held about them. Within what timeframe must the organisation respond?',
  '14 days',
  'One month, with possible extension to three months for complex requests',
  'Six weeks',
  'Three months in all cases',
  'B',
  'Under Article 12 UK GDPR, controllers must respond to a Subject Access Request within one calendar month of receipt. This can be extended by a further two months (total three months) for requests that are complex or numerous, but the individual must be notified of the extension and reason within the original one-month period. The response must be provided free of charge in most cases. Failure to respond within the deadline is a breach that can be reported to the ICO.'
),
(
  '10000000-0000-0000-0000-000000000010',
  'What does the data minimisation principle require?',
  'That personal data is backed up in multiple locations',
  'That only the minimum amount of personal data necessary for the stated purpose is collected and processed',
  'That data is deleted as soon as it is created',
  'That data is shared as widely as possible to ensure accuracy',
  'B',
  'Data minimisation (Article 5(1)(c) UK GDPR) requires that personal data must be ''adequate, relevant and limited to what is necessary in relation to the purposes for which they are processed''. In care, this means: collect only what is needed to deliver safe care; do not ask for surplus information; restrict access to those who need it; do not retain data beyond its required period. Minimising the data held reduces the impact of any future breach and demonstrates respect for residents'' privacy.'
),
(
  '10000000-0000-0000-0000-000000000010',
  'What is the Data Security and Protection Toolkit (DSPT) and who must complete it?',
  'A checklist for securing medication storage, required by the CQC',
  'An annual online self-assessment tool measuring data security practice against the National Data Guardian''s standards, required for all CQC-registered health and social care organisations',
  'A government database storing all NHS patient records',
  'A training course completed once by the organisation''s IT manager',
  'B',
  'The DSPT is an online self-assessment tool developed by NHS Digital (now NHS England) through which health and social care organisations assess their compliance with the National Data Guardian''s 10 data security standards. All CQC-registered organisations processing health and social care data are expected to complete it annually. Completion is a prerequisite for access to many NHS systems and data flows, including NHSmail. The DSPT covers leadership, culture, training, and technical controls.'
),
(
  '10000000-0000-0000-0000-000000000010',
  'The Data Protection Act 2018 and UK GDPR both apply in the UK. What is the relationship between them?',
  'They are identical legislation — only one needs to be followed',
  'UK GDPR provides the main framework; the DPA 2018 supplements it with domestic conditions, exemptions and specifications particular to the UK',
  'The DPA 2018 replaced GDPR entirely following Brexit — GDPR no longer applies in the UK',
  'GDPR is for businesses; the DPA 2018 applies only to the public sector',
  'B',
  'Following Brexit, EU GDPR was retained in UK domestic law as ''UK GDPR'' under the European Union (Withdrawal) Act 2018. The Data Protection Act 2018 supplements UK GDPR by providing: specific conditions for processing special category data (Schedule 1); law enforcement processing provisions (Part 3); intelligence services processing (Part 4); and various exemptions. Together they form the complete UK data protection framework. The DPA 2018 replaced the Data Protection Act 1998.'
),
(
  '10000000-0000-0000-0000-000000000010',
  'You receive an email from what appears to be your IT department asking you to click a link and enter your login credentials to prevent your account being locked. What should you do?',
  'Click the link and enter your credentials as instructed',
  'Forward the email to all colleagues to warn them',
  'Do not click the link; report the email to your IT/information governance team as a suspected phishing attempt',
  'Reply to the email asking for more information before deciding',
  'C',
  'This is a classic phishing attack. Legitimate IT departments do not ask for passwords by email. The correct response is: do not click any links; do not enter credentials; do not reply; report to IT/information governance immediately using a known, legitimate contact method. Phishing is the leading entry point for cyber attacks on health and social care organisations. Staff training in phishing recognition is one of the most effective cybersecurity defences available.'
),
(
  '10000000-0000-0000-0000-000000000010',
  'A colleague asks for access to a resident''s care records to help cover a shift, but has not been assigned to that resident''s care. Should you share the records?',
  'Yes — all care staff should have access to all resident records for safety reasons',
  'Only if the colleague promises not to share the information further',
  'No — access to personal data must be on a strict need-to-know basis; only those with a legitimate role in the resident''s care should access their records',
  'Yes — as long as a manager verbally approves',
  'C',
  'The need-to-know principle (Caldicott Principle 3 and data minimisation under UK GDPR) requires that access to personal data is restricted to those who genuinely need it to perform their function. A colleague who is not assigned to a resident''s care has no legitimate need to access their records. Sharing without authorisation could constitute a data breach. Access should be formally reviewed and access logs monitored. A verbal approval from a manager does not override data protection law.'
),
(
  '10000000-0000-0000-0000-000000000010',
  'An information sharing protocol is being established between a care home and the local NHS trust. What should it include?',
  'Only the names of the individuals who will be sharing information',
  'The lawful basis for sharing, the categories of data, the purposes, security measures, breach notification procedures and governance responsibilities',
  'A simple letter of intent — formal agreements are only needed for large organisations',
  'Nothing — verbal agreements are sufficient between care organisations',
  'B',
  'An information sharing protocol (ISP) is a formal written agreement that must cover: the legal basis for sharing under UK GDPR; the categories and types of personal data; the specific purposes for which data will be shared; technical and organisational security measures in place; who is responsible for governance; what happens if a breach occurs; review and termination provisions. Without a robust ISP, sharing personal data with third parties may lack a lawful basis and expose both organisations to ICO enforcement action.'
),
(
  '10000000-0000-0000-0000-000000000010',
  'What does data retention mean and what must happen to records at the end of their retention period?',
  'Records can be kept indefinitely provided they are securely stored',
  'Records must be retained for the statutory minimum period, then securely destroyed with destruction documented',
  'Records must be deleted after one year regardless of their content',
  'Retention decisions are left entirely to individual staff members'' judgement',
  'B',
  'Data retention requires keeping records for at least the minimum period specified in law or NHS guidance (e.g., 8 years for adult health records) to meet legal and clinical obligations — and no longer than necessary, per the storage limitation principle (Article 5(1)(e) UK GDPR). At the end of the retention period, records must be destroyed securely: paper records via confidential waste or cross-cut shredding; electronic records via secure deletion. Destruction must be documented. Records subject to a legal hold must not be destroyed regardless of the retention period.'
),
(
  '10000000-0000-0000-0000-000000000010',
  'What is pseudonymisation and how does it differ from anonymisation?',
  'Pseudonymisation and anonymisation are the same thing — both make data completely safe to share',
  'Pseudonymisation replaces identifying information with a code — re-identification is possible with additional information; anonymisation makes re-identification truly impossible and falls outside GDPR',
  'Pseudonymisation means deleting all personal data; anonymisation means sharing it openly',
  'Pseudonymisation applies only to paper records; anonymisation applies only to electronic data',
  'B',
  'Pseudonymisation (Article 4(5) UK GDPR) replaces direct identifiers (name, NHS number) with a code, so the data cannot easily be attributed to an individual without separately held additional information. However, pseudonymised data is still personal data under GDPR — re-identification remains possible. Anonymisation goes further: when done properly, it makes re-identification impossible and the data falls entirely outside the scope of GDPR. True anonymisation is difficult to achieve and must be assessed carefully. Pseudonymisation is a recommended security measure under Article 32.'
)
ON CONFLICT DO NOTHING;

END $$;
