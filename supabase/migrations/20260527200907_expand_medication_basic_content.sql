DO $$ BEGIN

-- Flashcards 26-50 for Medication Management Basic (course_id: 10000000-0000-0000-0000-000000000008)

INSERT INTO flashcards (course_id, question_text, answer_text, difficulty, order_index) VALUES
(
  '10000000-0000-0000-0000-000000000008',
  'What are the six rights of medication administration?',
  'The six rights are: (1) Right Person — verify the resident''s identity against the MAR chart using at least two identifiers (name, date of birth); (2) Right Drug — check the medication label matches the MAR chart; (3) Right Dose — confirm the prescribed dose is what you are administering; (4) Right Route — oral, topical, inhaled, etc. — as prescribed; (5) Right Time — administer at the correct prescribed time; (6) Right Documentation — sign the MAR chart immediately after administration. Some frameworks add Right Reason and Right Response as further rights.',
  1,
  26
),
(
  '10000000-0000-0000-0000-000000000008',
  'What are controlled drugs and what are the legal storage requirements in care settings?',
  'Controlled drugs (CDs) are medicines regulated under the Misuse of Drugs Act 1971 and the Misuse of Drugs (Safe Custody) Regulations 1973. In care settings: CDs must be stored in a locked, fixed, metal cabinet that meets BS 2881 standards; the cabinet must only be accessible to authorised staff; a CD register must be maintained with each supply, administration and disposal recorded in ink with no deletions; two members of staff must witness and sign for each administration; stock must be checked regularly; discrepancies must be reported immediately. Failure to comply is a criminal offence.',
  3,
  27
),
(
  '10000000-0000-0000-0000-000000000008',
  'What is the Medicines Act 1968 and why is it relevant to care workers?',
  'The Medicines Act 1968 is the primary legislation governing the manufacture, supply and administration of medicines in the UK. It classifies medicines into three categories: Prescription Only Medicines (POMs) — require a prescription; Pharmacy (P) medicines — available from a pharmacist; General Sale List (GSL) medicines — available in general retail. In care settings, it establishes that medicines may only be administered to a resident by the person for whom they are prescribed, by an authorised person acting on a prescription, or under specific exemptions. Care workers must administer medicines in accordance with prescriptions and organisational policy.',
  2,
  28
),
(
  '10000000-0000-0000-0000-000000000008',
  'What are the main types of medication errors in care settings?',
  'Types of medication errors include: (1) Omission — a dose is missed or not given; (2) Wrong resident — medication given to the wrong person; (3) Wrong dose — too much or too little given; (4) Wrong time — given significantly outside the prescribed timeframe; (5) Wrong route — e.g., oral medication given via a feeding tube without appropriate crushing; (6) Wrong drug — dispensing or selection error; (7) Transcription error — incorrect entry on the MAR chart; (8) Near miss — an error that was caught before reaching the resident. All errors and near misses must be reported.',
  2,
  29
),
(
  '10000000-0000-0000-0000-000000000008',
  'What must you do immediately after discovering or making a medication error?',
  'Immediately: (1) do not try to conceal the error; (2) assess the resident for any adverse effects and seek medical advice (call the prescriber, pharmacist, or 999 if serious); (3) document what happened accurately in the resident''s care records; (4) complete an incident report (e.g., Datix) with full details — drug, dose, time, what happened; (5) inform your line manager; (6) the prescriber or pharmacist should be notified for clinical advice; (7) the resident (and family if appropriate) should be informed; (8) participate in a review to prevent recurrence. Honesty and prompt reporting protect the resident and are a professional and legal obligation.',
  3,
  30
),
(
  '10000000-0000-0000-0000-000000000008',
  'When is covert medication administration lawful?',
  'Covert medication (administering medicine without the resident''s knowledge, typically hidden in food or drink) may only be lawful when: the resident lacks mental capacity to consent to the medication (assessed under the MCA 2005); it has been agreed through a best interests decision involving the multidisciplinary team, family/proxy, and a pharmacist (who advises on whether the formulation can safely be altered); a GP or prescriber endorses the decision; the decision is fully documented in the care plan. Covert medication is never a shortcut to avoid difficult conversations. It is a last resort for those who would otherwise experience significant harm.',
  3,
  31
),
(
  '10000000-0000-0000-0000-000000000008',
  'When is it permissible to crush tablets or open capsules for administration?',
  'Tablets should never be crushed unless specifically authorised by a pharmacist and prescriber. Reasons crushing may be inappropriate: modified-release tablets lose their controlled-release mechanism; enteric-coated tablets lose gastric protection; some drugs become toxic, carcinogenic or unpalatable when crushed; crushing may alter pharmacokinetics. The process must follow Specials Legislation if the preparation is altered significantly. Always consult the pharmacist before crushing any medication. Document the authorisation in the care plan. If a liquid alternative is available, it is generally preferred.',
  3,
  32
),
(
  '10000000-0000-0000-0000-000000000008',
  'What are PRN medications and when should they be administered?',
  'PRN (pro re nata — ''as needed'') medications are prescribed for use when a specific symptom or condition arises rather than at regular intervals. Examples: analgesia for breakthrough pain, laxatives, antiemetics. Administration criteria: (1) the resident must display the symptom or condition the PRN is prescribed for; (2) the minimum time since the last PRN dose must have elapsed; (3) the maximum daily dose must not be exceeded; (4) staff must document the reason for administration, the time, and the dose on the MAR chart; (5) effectiveness should be recorded after a reasonable interval. Never give a PRN medication ''just in case'' without clinical indication.',
  2,
  33
),
(
  '10000000-0000-0000-0000-000000000008',
  'What is a medication review and who conducts it?',
  'A medication review is a structured, critical examination of a person''s medicines to assess whether they are still appropriate, effective, safe and the simplest possible regimen. Reviews are conducted by a prescriber (GP, nurse prescriber, pharmacist independent prescriber) and should involve the resident. In care homes, the NHS Long Term Plan and NICE guidelines recommend a comprehensive medication review at least annually for residents on multiple medicines (polypharmacy). Reviews can result in medication being stopped, the dose changed, or substituted. Care staff contribute by reporting observed side effects and changes in condition.',
  2,
  34
),
(
  '10000000-0000-0000-0000-000000000008',
  'What should you do with out-of-date medications?',
  'Expired medications must not be administered under any circumstances. They should be: (1) removed from the stock immediately and placed in a labelled container or bag; (2) recorded in the disposal records or CD register as appropriate; (3) returned to a pharmacy for safe disposal — never disposed of in household waste or down the sink; (4) documented in the care record or medicine management records. Controlled drugs must follow specific disposal protocols — a pharmacist or authorised witness must oversee CD disposal. Using expired medication is unsafe and constitutes a medication error.',
  2,
  35
),
(
  '10000000-0000-0000-0000-000000000008',
  'What is the STOMP programme?',
  'STOMP (Stopping Over-Medication of People with a learning disability, autism or both) is a national NHS initiative led by NHS England targeting the inappropriate use of psychotropic medicines (antipsychotics, antidepressants, anxiolytics, mood stabilisers, hypnotics) in people with learning disabilities and/or autism. These medications are often prescribed to manage behaviour without adequate review. STOMP promotes regular medication reviews, reducing unnecessary psychotropic prescribing, and using positive behavioural support as an alternative. Care staff should be aware of STOMP and advocate for medication reviews where psychotropics are prescribed without clear indication.',
  3,
  36
),
(
  '10000000-0000-0000-0000-000000000008',
  'What is deprescribing and why is it important in care settings?',
  'Deprescribing is the planned, supervised process of stopping or reducing medications that may be causing harm or are no longer of benefit. It is particularly important in care settings where residents are often elderly with polypharmacy (multiple concurrent medicines), increasing the risk of adverse drug reactions, interactions and falls. Deprescribing involves shared decision-making between the prescriber, resident, family and care staff. Common candidates include proton pump inhibitors, statins in frailty, and hypnotics. Care staff play a role by reporting side effects and changes in condition that may prompt a review.',
  2,
  37
),
(
  '10000000-0000-0000-0000-000000000008',
  'What is medication reconciliation and when does it occur?',
  'Medication reconciliation is the process of comparing a patient''s current medication list against all other sources of medicine information (GP records, hospital discharge letters, patient/carer reports) to identify and resolve discrepancies. It occurs: on admission to a care home; on transfer from hospital; on return from any clinical setting. Errors at these transition points are common causes of harm. The goal is to ensure the resident receives all intended medicines and no unintended ones. In care homes, a pharmacist or nurse should lead reconciliation on admission.',
  2,
  38
),
(
  '10000000-0000-0000-0000-000000000008',
  'What is medication concordance and what does non-concordance mean?',
  'Concordance refers to the shared agreement between a prescriber and a patient about the treatment plan, reflecting a partnership model rather than one-way compliance. A concordant patient understands, agrees with and takes their medicines as prescribed. Non-concordance occurs when a person does not take their medicines as prescribed — either deliberately (intentional) or through forgetfulness, difficulty swallowing, side effects, or misunderstanding (unintentional). Care staff must take non-concordance seriously: explore the reason, report to the prescriber, and never document a medicine as given if it was not taken.',
  2,
  39
),
(
  '10000000-0000-0000-0000-000000000008',
  'What is the care worker''s duty regarding medication side effects?',
  'Care workers must: (1) be aware of common side effects of medications they administer; (2) actively observe residents for signs of side effects; (3) document observations in care notes; (4) report side effects to a senior or prescriber promptly; (5) never ignore a resident''s complaint that they feel unwell after taking a medication. Some side effects (e.g., rashes suggesting anaphylaxis, severe sedation, falls from antihypertensives) require immediate action. Proactive monitoring of side effects is part of the duty of care and contributes to medication safety and review processes.',
  2,
  40
),
(
  '10000000-0000-0000-0000-000000000008',
  'What are topical medications and what precautions apply when applying them?',
  'Topical medications are applied directly to the skin or mucous membranes — e.g., creams, ointments, gels, transdermal patches. Precautions: (1) wear gloves to avoid self-absorption; (2) apply to clean, dry, intact skin (unless treating a wound); (3) use the correct amount as prescribed; (4) rotate application sites for patches to prevent skin reactions; (5) remove old patches before applying new ones and dispose of safely (used patches still contain active drug and must not be accessible to children or confused residents); (6) do not apply to broken or irritated skin unless specifically prescribed.',
  2,
  41
),
(
  '10000000-0000-0000-0000-000000000008',
  'What is the correct technique for administering eye drops and ear drops?',
  'Eye drops: (1) wash hands; (2) ask the resident to tilt head back and look up; (3) gently pull down the lower eyelid to form a pocket; (4) instil the prescribed number of drops into the pocket without touching the eye with the dropper tip; (5) ask the resident to close their eye gently; (6) apply gentle pressure to the inner corner for 1 minute to reduce systemic absorption; (7) wait 5 minutes between different eye drop medications. Ear drops: (1) tilt head with affected ear upward; (2) instil drops; (3) press the tragus gently to encourage the drops into the canal; (4) keep the head tilted for 1–2 minutes.',
  2,
  42
),
(
  '10000000-0000-0000-0000-000000000008',
  'What are the correct techniques for administering inhalers?',
  'Metered-dose inhaler (MDI): (1) shake the inhaler; (2) ask the resident to breathe out fully; (3) seal lips around mouthpiece or hold in spacer; (4) press the canister as the resident breathes in slowly and deeply; (5) hold breath for 10 seconds; (6) wait 30–60 seconds between puffs. Using a spacer device improves drug delivery significantly and reduces oral candidiasis with steroid inhalers. Dry powder inhalers (DPIs): do not shake; breathe in quickly and forcefully. Technique should be observed and corrected regularly. Rinsing mouth after steroid inhalers prevents oral thrush.',
  2,
  43
),
(
  '10000000-0000-0000-0000-000000000008',
  'What is the correct process for applying and removing transdermal patches?',
  'Applying: (1) select a clean, dry, hairless skin site (upper arm, chest, or as directed in the BNF/manufacturer guidance); (2) remove previous patch first; (3) peel backing from new patch and apply firmly with palm; (4) record site on MAR chart; (5) wash hands. Removing: (1) fold the used patch in half with sticky sides together; (2) dispose of in a sharps bin or as directed by the manufacturer — never in household waste, as used patches retain significant drug content. Rotate sites to prevent skin irritation. Document the site used on the MAR chart.',
  2,
  44
),
(
  '10000000-0000-0000-0000-000000000008',
  'How should liquid medications be measured accurately?',
  'Use a calibrated oral syringe for small volumes (under 5 ml) — this is significantly more accurate than a medicine cup. For larger volumes, use a graduated medicine cup placed on a flat surface and read at eye level to avoid parallax error. Check the prescribed dose against the concentration of the liquid (e.g., ''5 mg/5 ml'' or ''10 mg/5 ml'') to calculate the correct volume. Never estimate — measuring errors with liquid medicines are a significant cause of over- and under-dosing. Oral syringes should be purple-coloured and labelled ''oral use only'' to prevent accidental IV administration.',
  2,
  45
),
(
  '10000000-0000-0000-0000-000000000008',
  'What is a MAR chart and what information does it contain?',
  'A MAR (Medication Administration Record) chart is the legal document recording all prescribed medicines and their administration in a care setting. It contains: the resident''s name, date of birth, care home, and allergy status; each medication name, dose, form and route; prescribed times; space for a signature or code for each dose given, refused, or omitted; codes for non-administration (e.g., ''R'' for refused, ''S'' for sleeping); prescriber details. The MAR chart is a legal document — it must be completed accurately and contemporaneously. Signing for a medicine not given is fraudulent and a professional and legal offence.',
  2,
  46
),
(
  '10000000-0000-0000-0000-000000000008',
  'When is self-administration of medication by a care home resident appropriate?',
  'Self-administration is appropriate when: the resident has been assessed as having the physical and cognitive ability to manage their own medicines safely; a risk assessment supports it; the decision is in the resident''s best interests and respects their autonomy; appropriate storage (lockable bedside cabinet) is available; and a monitoring plan is in place. Self-administration should be encouraged where safe to do so, as it supports independence, dignity and empowerment under the Care Act 2014. Regular reviews of the resident''s continued ability to self-administer safely must be conducted.',
  2,
  47
),
(
  '10000000-0000-0000-0000-000000000008',
  'A resident refuses their prescribed medication. What is the correct response?',
  'If a resident with mental capacity refuses their medication: (1) respect their decision — refusal by a capacitated adult is a legal right; (2) do not coerce, deceive or hide the medication; (3) explore the reason for refusal (side effects, difficulty swallowing, forgetfulness, taste); (4) attempt gentle re-offer at a different time if appropriate; (5) document the refusal on the MAR chart and in care notes with reason given; (6) inform the prescriber or senior promptly — particularly for critical medications (e.g., anti-epileptics, anticoagulants); (7) the prescriber may wish to review or discuss the medication. Never document a refused medication as administered.',
  2,
  48
),
(
  '10000000-0000-0000-0000-000000000008',
  'What is a homely remedies policy and what does it permit?',
  'A homely remedies policy allows care homes to administer a small number of non-prescription (GSL) medicines — such as paracetamol, antacids, simple linctus or antihistamines — to residents for minor, self-limiting conditions without a prescriber''s individual prescription, using a standing protocol. The policy must: specify which remedies are permitted and for which conditions; set dose limits and frequency; state contraindications and interactions to check (e.g., do not give paracetamol if the resident is already prescribed it); require documentation on the MAR chart; specify when to seek prescriber advice. The policy must be approved by a pharmacist and authorised by management.',
  3,
  49
),
(
  '10000000-0000-0000-0000-000000000008',
  'What is the difference between a medication error and a near miss, and why should both be reported?',
  'A medication error is an incident where the wrong medicine, dose, route, time or person was involved and the error reached the resident (with or without harm). A near miss is an error that was caught and corrected before reaching the resident (e.g., wrong drug dispensed but identified before administration). Both must be reported via the organisational incident system and to the prescriber/pharmacist. Reporting near misses is particularly valuable as it reveals system weaknesses that, if unaddressed, will eventually cause harm. A just and open reporting culture requires that staff are not blamed for honest mistakes — blame cultures suppress reporting and increase patient risk.',
  2,
  50
)
ON CONFLICT DO NOTHING;

-- Quiz questions 11-25 for Medication Management Basic
INSERT INTO quiz_questions (course_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(
  '10000000-0000-0000-0000-000000000008',
  'Which of the following is NOT one of the six rights of medication administration?',
  'Right person',
  'Right drug',
  'Right prescriber',
  'Right documentation',
  'C',
  'The six rights of medication administration are: right person, right drug, right dose, right route, right time, and right documentation. ''Right prescriber'' is not one of the six rights, though verifying the prescription is valid is part of safe practice. The six rights provide a systematic check to prevent the most common types of medication errors.'
),
(
  '10000000-0000-0000-0000-000000000008',
  'Where must controlled drugs be stored in a care home?',
  'In a locked drawer in the medication trolley',
  'In a locked, fixed, metal cabinet meeting BS 2881 standards, accessible only to authorised staff',
  'In the medication fridge alongside other medicines',
  'In the manager''s office in any lockable container',
  'B',
  'The Misuse of Drugs (Safe Custody) Regulations 1973 require controlled drugs to be stored in a locked, fixed metal cabinet meeting BS 2881 standards. The cabinet must be wall-mounted and key-access restricted to authorised staff. A separate CD register must record all supplies, administrations and disposals. Failure to comply is a criminal offence.'
),
(
  '10000000-0000-0000-0000-000000000008',
  'You administer a medication and later realise you gave it to the wrong resident. What is your immediate priority?',
  'Complete the shift and document the error in the handover notes',
  'Inform the resident''s family before telling your manager',
  'Assess the resident for adverse effects, inform your line manager and the prescriber immediately, and complete an incident report',
  'Administer the correct resident''s medication again to compensate',
  'C',
  'The immediate priority after a medication error is resident safety — assess for adverse effects and seek medical advice without delay. Inform the line manager and prescriber. Complete a full incident report. Never attempt to ''compensate'' with additional doses. Transparent and prompt reporting is a professional and legal obligation and protects both the resident and the care worker.'
),
(
  '10000000-0000-0000-0000-000000000008',
  'Under what circumstances may covert medication administration be lawful in a care setting?',
  'Whenever a resident refuses medication and the carer believes it is for their own good',
  'Only when the resident lacks mental capacity, a best interests decision has been made involving the MDT and pharmacist, and it is fully documented',
  'When a family member requests it to avoid distress to the resident',
  'When a GP verbally agrees over the phone without written documentation',
  'B',
  'Covert medication is only lawful under the MCA 2005 framework: the resident must lack mental capacity to consent; a formal best interests decision must be made with the multidisciplinary team (including a pharmacist to advise on formulation safety); this must be fully documented in the care plan. It is never permissible for a capacitated resident who refuses. A verbal agreement alone, or family request alone, is insufficient.'
),
(
  '10000000-0000-0000-0000-000000000008',
  'A resident is prescribed paracetamol 500mg as a PRN medication for pain. They have not complained of pain. Should you administer it?',
  'Yes — it is always better to prevent pain before it starts',
  'Yes — if it is near their regular administration time',
  'No — PRN medications should only be given when the specific symptom or clinical indication is present',
  'Yes — administer and document it as a precaution',
  'C',
  'PRN (as needed) medicines must only be administered when the specific clinical indication is present — in this case, when the resident reports or displays signs of pain. Administering a PRN drug without indication could cause harm (e.g., hepatotoxicity from paracetamol if the resident later receives it again from another route), constitutes a prescribing boundary violation, and must be documented accurately on the MAR chart.'
),
(
  '10000000-0000-0000-0000-000000000008',
  'What must you do before crushing a tablet for a resident who has difficulty swallowing?',
  'Crush the tablet and mix it with food without further checks',
  'Consult the pharmacist and prescriber first, as many tablets cannot safely be crushed without altering their therapeutic effect or safety profile',
  'Ask the resident''s family for permission',
  'Check if the resident has crushed tablets before and repeat the same approach',
  'B',
  'Many tablets must never be crushed — modified-release formulations lose their controlled release, enteric-coated tablets lose gastric protection, and some drugs become hazardous when crushed. Always consult the pharmacist before crushing any tablet. Authorisation must be documented in the care plan. Liquid alternatives should be sought as the preferred solution.'
),
(
  '10000000-0000-0000-0000-000000000008',
  'What is the MAR chart and what are the consequences of signing for a medicine that was not actually given?',
  'A daily activity record — incomplete signatures are an administrative matter only',
  'A legal document recording medication administration — falsely signing for a medicine not given constitutes fraud and professional misconduct',
  'An informal record kept for care planning purposes — errors can be corrected retrospectively',
  'A prescription that doubles as an administration record',
  'B',
  'The MAR chart is a legal document. Signing for a medication that was not administered is fraudulent misrepresentation. It could result in criminal prosecution, referral to a regulatory body (e.g., NMC, Skills for Care), dismissal, and — most importantly — puts the resident at risk (the error will not be identified and corrected if the record falsely shows the medicine was given). Always record accurately: use the correct non-administration code if a dose is omitted.'
),
(
  '10000000-0000-0000-0000-000000000008',
  'A resident with capacity refuses their blood pressure medication. What should you document on the MAR chart?',
  'Administer the medication anyway as it is prescribed for their benefit',
  'Leave the space blank and tell the next shift verbally',
  'Record the refusal using the correct non-administration code (e.g., ''R'' for refused) and document the reason in the care notes; inform the prescriber',
  'Crush it and give it covertly to ensure they receive their treatment',
  'C',
  'A capacitated resident''s refusal of medication must be respected — this is a legal right under the MCA 2005 and common law. The MAR chart must be completed with the appropriate non-administration code for refusal. The reason should be documented in the care notes. The prescriber must be informed, particularly for clinically critical medications. Giving medication covertly to a capacitated refusing resident is unlawful.'
),
(
  '10000000-0000-0000-0000-000000000008',
  'You find a stock of tablets in a resident''s medication drawer that expired 3 months ago. What should you do?',
  'Administer them — small margins of expiry rarely cause harm',
  'Remove them from use, document the disposal, return them to the pharmacy, and report the finding to your manager',
  'Check with a colleague whether they think the tablets are likely to still be effective',
  'Dispose of them in the household waste bin',
  'B',
  'Expired medications must never be administered — their potency, stability and safety cannot be guaranteed. They must be removed from stock immediately, documented, and returned to a pharmacy for safe disposal (never household waste or sink, as this causes environmental contamination). CDs require witnessed disposal. The finding should be reported to the manager to investigate how the expiry was missed and prevent recurrence.'
),
(
  '10000000-0000-0000-0000-000000000008',
  'What does the STOMP programme aim to achieve?',
  'To stop the over-use of paracetamol in care homes',
  'To stop the over-medication of people with learning disabilities and/or autism with psychotropic medicines',
  'To standardise medication trolley checks across the NHS',
  'To promote self-administration of medication in all care settings',
  'B',
  'STOMP (Stopping Over-Medication of People with learning disabilities, autism or both) is an NHS England initiative targeting the inappropriate prescribing of psychotropic medicines (antipsychotics, antidepressants, anxiolytics, hypnotics and mood stabilisers) in people with learning disabilities and/or autism. These medicines are frequently prescribed to manage behaviour rather than for specific psychiatric indications, often without adequate review. STOMP promotes regular reviews and positive behavioural support alternatives.'
),
(
  '10000000-0000-0000-0000-000000000008',
  'How should a transdermal medication patch be disposed of after removal?',
  'Place it in the household waste bin',
  'Flush it down the toilet',
  'Fold it adhesive-side in on itself and dispose of in a sharps bin or as per manufacturer instructions — never in household waste',
  'Leave it on a surface for the cleaner to dispose of',
  'C',
  'Used transdermal patches still contain significant quantities of active drug and must never be placed in household waste or flushed. Accidental contact with a used patch (particularly opioid patches such as fentanyl or buprenorphine) by children, confused residents, or other vulnerable individuals could be fatal. Fold sticky-side in, dispose of in a sharps bin or drug waste container as per organisational policy and manufacturer guidance. Document disposal.'
),
(
  '10000000-0000-0000-0000-000000000008',
  'A resident using a metered-dose inhaler complains they get ''a white coating in their mouth'' after using it. What is most likely causing this and how can it be prevented?',
  'An allergic reaction to the inhaler — stop use immediately',
  'Oral candidiasis (thrush) caused by steroid inhaler residue — can be prevented by rinsing the mouth and gargling with water after each use',
  'Normal dry mouth from the inhaler — advise the resident to drink more water',
  'An inhaler technique problem — the resident is exhaling instead of inhaling',
  'B',
  'Oral candidiasis (oral thrush) is a well-known side effect of inhaled corticosteroids (e.g., beclometasone, fluticasone, budesonide). Steroid residue deposited in the mouth suppresses local immunity and allows Candida to overgrow. Prevention: advise rinsing the mouth with water and gargling (or brushing teeth) after every dose of a steroid inhaler. Using a spacer device also reduces oral deposition significantly.'
),
(
  '10000000-0000-0000-0000-000000000008',
  'What is the most accurate method for measuring a small volume of liquid medicine (e.g., 2.5 ml)?',
  'A standard medicine cup',
  'A tablespoon from the kitchen',
  'A calibrated oral syringe',
  'A teaspoon',
  'C',
  'Calibrated oral syringes are significantly more accurate than medicine cups for small volumes. Standard medicine cups have markings that are difficult to read accurately at low volumes, and household spoons vary considerably in actual volume. Oral syringes designed for oral use are coloured purple and labelled ''oral only'' to prevent accidental IV administration. For volumes under 5 ml, an oral syringe must be used to ensure dose accuracy.'
),
(
  '10000000-0000-0000-0000-000000000008',
  'What does medication reconciliation involve on a resident''s admission to a care home?',
  'Rewriting the hospital discharge list onto the MAR chart without checking for discrepancies',
  'Comparing all available medication information sources to create a complete, accurate medication list and identify and resolve any discrepancies',
  'Giving the resident all medications they request without waiting for a GP review',
  'Stopping all previous medications until a new GP review',
  'B',
  'Medication reconciliation at admission involves gathering information from all available sources (GP summary, hospital discharge letter, patient/family report, community pharmacy records) and comparing them to identify omissions, duplications, dosing discrepancies or discontinued medicines. It is a high-risk transition point where errors commonly occur. A pharmacist or nurse should lead this process and all discrepancies must be resolved with the prescriber before medicines are administered.'
),
(
  '10000000-0000-0000-0000-000000000008',
  'What is the purpose of a homely remedies policy in a care home?',
  'To allow staff to prescribe any over-the-counter medicine to residents without GP involvement',
  'To allow non-prescription GSL medicines to be administered for minor self-limiting conditions under a pharmacist-approved standing protocol, without an individual prescription',
  'To permit residents to self-medicate from their own supply of any medicine they choose',
  'To allow nurses to prescribe controlled drugs in emergencies',
  'B',
  'A homely remedies policy allows care homes to administer a limited list of General Sale List (GSL) medicines — such as paracetamol or antacids — for minor, self-limiting conditions, using a standing protocol approved by a pharmacist. It does not permit staff to prescribe or to administer pharmacy (P) or prescription-only medicines (POMs) without a prescription. Administration must still be documented on the MAR chart and contraindications checked.'
)
ON CONFLICT DO NOTHING;

END $$;
