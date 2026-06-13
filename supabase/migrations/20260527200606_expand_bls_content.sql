DO $$ BEGIN

-- Flashcards 26-50 for Basic Life Support (course_id: 10000000-0000-0000-0000-000000000007)

INSERT INTO flashcards (course_id, question_text, answer_text, difficulty, order_index) VALUES
(
  '10000000-0000-0000-0000-000000000007',
  'What is agonal breathing and why is it significant in resuscitation?',
  'Agonal breathing consists of irregular, infrequent gasping or snorting breaths occurring after cardiac arrest due to brain stem reflex activity. It is NOT normal breathing and should not prevent you from starting CPR. Agonal breathing occurs in up to 40% of cardiac arrests and is frequently misidentified as normal breathing, causing fatal delays. If a person is unresponsive and not breathing normally, treat as cardiac arrest and start CPR immediately.',
  3,
  26
),
(
  '10000000-0000-0000-0000-000000000007',
  'How is two-person CPR performed and what are its advantages?',
  'In two-person CPR, one rescuer performs chest compressions while the second delivers rescue breaths (bag-valve-mask or mouth-to-mouth). Rescuers switch roles every 2 minutes to prevent fatigue and maintain compression quality. Advantages: sustained high-quality compressions without the fatigue that degrades single-rescuer technique; ability to use a bag-valve-mask more effectively; allows one rescuer to continue compressions while the other attaches an AED. Quality compressions — rate 100–120/min, depth 5–6 cm, full recoil — are the priority.',
  2,
  27
),
(
  '10000000-0000-0000-0000-000000000007',
  'How does CPR for an infant differ from adult CPR?',
  'For infants (under 1 year): use 2 fingers (middle and ring finger) in the centre of the chest for compressions, or the two-thumb encircling technique for two rescuers; compression depth is approximately one-third of chest depth (about 4 cm); ratio is 30:2 for a single lay rescuer, or 15:2 for two trained healthcare rescuers; rescue breaths are gentle puffs covering both the mouth and nose; tilt the head only slightly (neutral position) to open the airway. Call 999 after 1 minute of CPR if alone.',
  3,
  28
),
(
  '10000000-0000-0000-0000-000000000007',
  'How does CPR for a child (1 year to puberty) differ from adult CPR?',
  'For children: use one or two hands depending on the child''s size; compression depth is one-third of chest depth (approximately 5 cm); rate 100–120 per minute; ratio 30:2 for a single rescuer, 15:2 for two trained rescuers. Give 5 initial rescue breaths before starting compressions (unlike adults). If alone, perform 1 minute of CPR before calling 999. Tilt the head to a neutral position — less extension than in adults to avoid kinking the airway.',
  3,
  29
),
(
  '10000000-0000-0000-0000-000000000007',
  'How do you recognise a cardiac arrest?',
  'A cardiac arrest is recognised by three signs: (1) unresponsiveness — the person does not respond to voice or sternal rub; (2) absent or abnormal breathing — no breathing, or only agonal gasps; (3) no palpable pulse (healthcare providers only; lay rescuers should not waste time checking pulse). Collapse, pallor, cyanosis, and dilated pupils may also be present. Never delay starting CPR to check for a pulse for more than 10 seconds.',
  2,
  30
),
(
  '10000000-0000-0000-0000-000000000007',
  'What is post-resuscitation care and what does the ABCDE approach involve?',
  'Post-resuscitation care aims to optimise outcomes after return of spontaneous circulation (ROSC). The ABCDE approach: Airway — maintain patent airway, consider advanced airway; Breathing — assess respiratory rate, oxygen saturations, ventilate if needed; Circulation — blood pressure, pulse, IV access, 12-lead ECG; Disability — consciousness level (GCS/AVPU), blood glucose; Exposure — examine for injuries, temperature. Targeted temperature management, coronary angiography and ICU transfer are key post-ROSC interventions in hospital settings.',
  3,
  31
),
(
  '10000000-0000-0000-0000-000000000007',
  'Where are AED defibrillation pads placed on an adult?',
  'Pad 1 (sternal/anterior pad) is placed below the right clavicle (collarbone) to the right of the sternum. Pad 2 (apex/lateral pad) is placed in the left mid-axillary line, approximately at the level of the V6 ECG position (level with the lower half of the sternum, avoiding breast tissue). Pads must not touch each other, must avoid any medication patches (remove and wipe skin dry), pacemaker generators, jewellery, and wet skin. Picture diagrams are printed on the pads themselves.',
  2,
  32
),
(
  '10000000-0000-0000-0000-000000000007',
  'What should you do if an AED analyses the rhythm and advises ''no shock advised''?',
  'If the AED advises no shock: immediately resume CPR starting with chest compressions (30:2 or continuous compressions if an advanced airway is in place); do not pause for more than 10 seconds; continue until the AED prompts another analysis (typically every 2 minutes), or the person shows signs of life, or a healthcare professional instructs you to stop. ''No shock advised'' does not mean the person is not in cardiac arrest — non-shockable rhythms (asystole, PEA) also require CPR.',
  2,
  33
),
(
  '10000000-0000-0000-0000-000000000007',
  'How do you manage the airway of a person with a suspected spinal injury who requires CPR?',
  'In suspected spinal injury, jaw thrust is preferred over head tilt-chin lift to open the airway, as it minimises cervical spine movement. If a jaw thrust fails to open the airway and the person is in cardiac arrest, a head tilt-chin lift should still be used — a clear airway takes priority over spinal precautions as the risk of hypoxia outweighs the theoretical risk of worsening a spinal injury. Inline cervical stabilisation should be maintained where possible with additional personnel.',
  3,
  34
),
(
  '10000000-0000-0000-0000-000000000007',
  'How do you recognise anaphylaxis and what is the role of an adrenaline auto-injector (e.g., EpiPen)?',
  'Anaphylaxis is a severe, life-threatening allergic reaction. Features: sudden onset; airway — throat swelling, stridor; breathing — wheeze, increased respiratory rate; circulation — tachycardia, hypotension, pallor; skin — urticaria, flushing, angioedema. Management: call 999; lay the person flat with legs raised (or sit up if breathing difficulty); administer adrenaline auto-injector (e.g., EpiPen) into the outer mid-thigh; repeat after 5 minutes if no improvement. Adrenaline reverses bronchoconstriction and vasoconstriction. Staff must be trained in EpiPen use if residents are prescribed one.',
  3,
  35
),
(
  '10000000-0000-0000-0000-000000000007',
  'What is the correct management of a tonic-clonic seizure in a care setting?',
  'During the seizure: (1) protect the person from injury — clear hazards, do not restrain; (2) cushion their head; (3) do not put anything in their mouth; (4) note the time the seizure started. After the seizure: (5) place in the recovery position; (6) reassure as they regain consciousness; (7) monitor airway and breathing; (8) call 999 if: first ever seizure, seizure lasts more than 5 minutes, another seizure follows, they are injured, or they fail to recover consciousness. Follow the individual''s care plan if they have a known seizure disorder.',
  2,
  36
),
(
  '10000000-0000-0000-0000-000000000007',
  'What does the FAST acronym stand for in stroke recognition?',
  'FAST stands for: Face — has one side of the face drooped? Ask the person to smile. Arms — can they raise both arms and keep them up? Arms drifting down or weakness on one side is a sign. Speech — is their speech slurred, garbled or absent? Can they understand you? Time — time to call 999 immediately. Some organisations now use BE-FAST (Balance, Eyes, then FAST) to capture additional stroke symptoms. ''Time is brain'' — every minute without treatment, approximately 1.9 million neurons are lost.',
  1,
  37
),
(
  '10000000-0000-0000-0000-000000000007',
  'How do you recognise hypoglycaemia and what is the immediate response?',
  'Hypoglycaemia (blood glucose below 4 mmol/L): symptoms include shakiness, sweating, pallor, confusion, aggression, hunger, headache, palpitations, and in severe cases, unconsciousness and seizures. Immediate response for a conscious person: give 15–20 g of fast-acting carbohydrate (e.g., Lucozade Original 90 ml, 5 glucose tablets, or 200 ml fruit juice); recheck blood glucose after 15 minutes and repeat if still below 4 mmol/L. Once recovered, give a starchy snack. If unconscious: do not give anything by mouth; call 999; place in recovery position; glucagon may be administered by trained staff if prescribed.',
  2,
  38
),
(
  '10000000-0000-0000-0000-000000000007',
  'How should severe uncontrolled bleeding be managed?',
  'Management of severe bleeding: (1) apply direct firm pressure to the wound using a clean pad or dressing; (2) maintain continuous pressure — do not remove to inspect; (3) if blood soaks through, add more material on top without removing the original; (4) elevate the injured limb above the level of the heart if possible; (5) call 999; (6) treat for shock — lay flat, raise legs (if no injury prevents this), keep warm; (7) do not apply a tourniquet unless trained to do so; (8) if an object is embedded in the wound, do not remove it — apply pressure around it.',
  2,
  39
),
(
  '10000000-0000-0000-0000-000000000007',
  'What is the correct first aid management for burns?',
  'Burns first aid: (1) cool the burn with cool (not ice cold) running water for a minimum of 20 minutes as soon as possible — this reduces tissue damage; (2) remove clothing and jewellery near the burn (but not if stuck); (3) do not apply butter, cream, toothpaste or ice; (4) cover loosely with cling film (lengthways, not wrapped) or a clean non-fluffy dressing; (5) call 999 for burns larger than a 50p piece, burns to face, hands, feet, genitalia, or circumferential burns; (6) treat for shock if necessary.',
  2,
  40
),
(
  '10000000-0000-0000-0000-000000000007',
  'How is hypothermia recognised and what are the immediate care steps?',
  'Hypothermia is a core body temperature below 35°C. Recognition: shivering (absent in severe hypothermia), confusion, slurred speech, drowsiness, cold and pale skin, slow pulse, loss of coordination. In severe cases: unconsciousness, fixed dilated pupils, cardiac arrhythmia. Immediate care: move to a warm environment; remove wet clothing; wrap in blankets including the head; give warm (not hot) non-alcoholic drinks if conscious; call 999; handle gently as rough handling can trigger ventricular fibrillation; do not apply direct heat. In care settings, frail elderly residents are at high risk.',
  2,
  41
),
(
  '10000000-0000-0000-0000-000000000007',
  'What is a DNACPR order and how should care staff respond to it?',
  'A DNACPR (Do Not Attempt Cardiopulmonary Resuscitation) order is a valid medical decision, documented in the care record and on a specific form (e.g., ReSPECT form), that CPR should not be attempted if the person suffers a cardiorespiratory arrest. It must be signed by a senior clinician and ideally agreed with the person or their legal proxy. Care staff must: locate and follow the DNACPR when a person collapses; call for clinical staff and provide comfort care; not attempt CPR. A DNACPR does not mean withholding other care. It must be accessible and all relevant staff must know of its existence.',
  3,
  42
),
(
  '10000000-0000-0000-0000-000000000007',
  'When should 999 be called in a care setting?',
  'Call 999 immediately for: cardiac arrest; choking where back blows and abdominal thrusts have failed; suspected stroke (use FAST); anaphylaxis; severe bleeding not controlled by pressure; major trauma; loss of consciousness or fitting lasting more than 5 minutes; severe breathing difficulty; suspected myocardial infarction; significant burns; suspected poisoning or overdose; any situation where the person''s life may be at risk. Do not wait for a senior colleague before calling 999 if the situation is life-threatening. Time is critical in all these emergencies.',
  1,
  43
),
(
  '10000000-0000-0000-0000-000000000007',
  'What is SBAR and how is it used when handing over a cardiac arrest call?',
  'SBAR (Situation, Background, Assessment, Recommendation) structures emergency communication: Situation — ''I am calling about [patient name], who is in cardiac arrest''; Background — ''They are a [age]-year-old with [relevant medical history]; CPR started at [time]''; Assessment — ''AED is attached, [shock/no shock] delivered, currently [compressions only/with ventilations]''; Recommendation — ''I need immediate paramedic response — can you confirm ETA?'' SBAR reduces communication errors during high-stress handovers and ensures the receiving team has all critical information immediately.',
  2,
  44
),
(
  '10000000-0000-0000-0000-000000000007',
  'What is the psychological impact on care staff of performing CPR and how should employers support them?',
  'Performing CPR — particularly on a person known to the carer — can cause acute stress, anxiety, PTSD symptoms, guilt, and intrusive thoughts, regardless of the outcome. Employers should provide: immediate debrief after a resuscitation event; access to an employee assistance programme (EAP) or counselling; peer support mechanisms; clear team communication about what happened; and reassurance that the carer acted correctly. Normalising psychological responses and providing structured support reduces long-term harm. A culture of openness and support is essential.',
  2,
  45
),
(
  '10000000-0000-0000-0000-000000000007',
  'Why are regular BLS training refreshers essential for care staff?',
  'CPR skills decay significantly within months of training. Studies show compression quality, correct hand placement and rate deteriorate rapidly without practice. Regular refreshers (at least annually, with some guidance recommending every 6 months for care workers) maintain competence, update staff on guideline changes (Resuscitation Council UK updates periodically), and build confidence. Staff who have refresher training are less hesitant to initiate CPR and perform it more effectively. Manikin practice is essential — theoretical knowledge alone is insufficient.',
  2,
  46
),
(
  '10000000-0000-0000-0000-000000000007',
  'What is the legal standing of a Do Not Resuscitate (DNACPR) form?',
  'A DNACPR is a valid clinical and legal decision when it meets these criteria: it is signed by a senior clinician (usually a doctor); it reflects a documented clinical judgement that CPR would be unsuccessful or not in the person''s best interests; ideally, the person has been involved in the decision, or if they lack capacity, it has been made in their best interests following MCA principles. A DNACPR does not require the person''s or family''s consent — but good practice mandates discussion. Following a valid DNACPR is not a criminal act. Ignoring one may constitute assault.',
  3,
  47
),
(
  '10000000-0000-0000-0000-000000000007',
  'What adaptations are needed when assisting a pregnant woman who has collapsed and is not breathing?',
  'If a pregnant woman (over approximately 20 weeks gestation) is in cardiac arrest: start standard CPR immediately; manually displace the uterus to the left (one carer pushes the abdomen leftwards with one hand) to relieve aortocaval compression, improving venous return and cardiac output; if available, tilt the resuscitation board 15–30 degrees to the left using a wedge or folded blanket; continue CPR and call 999 immediately. Perimortem caesarean section within 5 minutes of arrest onset is performed in hospital to improve maternal and foetal survival. Do not delay CPR.',
  3,
  48
),
(
  '10000000-0000-0000-0000-000000000007',
  'When oxygen is available during CPR, how should it be used?',
  'If supplemental oxygen is available and there is a trained person to manage it: during CPR with bag-valve-mask ventilation, give high-flow oxygen (10–15 L/min) via the bag-valve-mask reservoir; this maximises delivered oxygen concentration; once return of spontaneous circulation (ROSC) is achieved, titrate oxygen to maintain SpO2 94–98% to avoid hyperoxia, which is associated with worse neurological outcomes. Do not interrupt chest compressions to manage oxygen delivery — compressions remain the highest priority.',
  3,
  49
),
(
  '10000000-0000-0000-0000-000000000007',
  'How should bystanders and the crowd be managed while waiting for the emergency services?',
  'Designate a specific person to wait at the building entrance to direct the ambulance crew directly to the patient. Ask unnecessary bystanders to move back to give the resuscitation team space and preserve the patient''s dignity. Assign someone to gather information for the crew (medical history, medication list, DNACPR status, time of collapse). Keep the area clear of obstacles that could delay the crew. If in a public place, ask someone to fetch the nearest AED. Maintain a calm authority to prevent panic spreading to other residents or service users.',
  2,
  50
)
ON CONFLICT DO NOTHING;

-- Quiz questions 21-25 for Basic Life Support (adding 5 to reach 25 total)
INSERT INTO quiz_questions (course_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES
(
  '10000000-0000-0000-0000-000000000007',
  'A person collapses and you observe them making infrequent gasping sounds. They are unresponsive. What do these gasping sounds indicate?',
  'The person is breathing adequately and does not need CPR',
  'Agonal breathing — a reflexive response that is not normal breathing; CPR should be started immediately',
  'The person is choking and needs back blows',
  'The person is having a seizure',
  'B',
  'Agonal breathing is irregular gasping caused by brain stem activity after cardiac arrest. It occurs in up to 40% of cardiac arrests and is frequently misidentified as normal breathing, causing fatal delays to CPR. An unresponsive person making only agonal gasps should be treated as in cardiac arrest and CPR started without delay.'
),
(
  '10000000-0000-0000-0000-000000000007',
  'A resident with a known severe peanut allergy suddenly develops facial swelling, hives, and severe breathing difficulty after eating. They are prescribed an EpiPen. Where should the EpiPen be administered?',
  'Into the upper arm',
  'Into the abdomen',
  'Into the outer mid-thigh',
  'Into the buttock',
  'C',
  'Adrenaline auto-injectors (EpiPen, Jext, Emerade) should be administered into the outer mid-thigh. This site provides rapid absorption, can be given through clothing in an emergency, and is safe even if slightly misplaced. The outer mid-thigh is preferred because it avoids blood vessels and nerves that could be struck at other sites. Call 999 immediately after administration.'
),
(
  '10000000-0000-0000-0000-000000000007',
  'What does the acronym FAST stand for in stroke recognition?',
  'Fast Action Saves Time',
  'Face, Arms, Speech, Time',
  'Flushing, Agitation, Slurred speech, Temperature',
  'Falls, Arm weakness, Stroke signs, Treatment',
  'B',
  'FAST stands for Face (facial drooping, uneven smile), Arms (inability to raise both arms or one arm drifts down), Speech (slurred, garbled or absent speech), Time (time to call 999 immediately). Using FAST enables rapid identification of the three most common stroke presentations. Immediate emergency call is critical as ''time is brain'' — treatment within hours dramatically improves outcomes.'
),
(
  '10000000-0000-0000-0000-000000000007',
  'A resident has a valid DNACPR form in their care records. They are found unresponsive and not breathing. What should staff do?',
  'Begin CPR while another member of staff locates the DNACPR form',
  'Do not attempt CPR; call for senior clinical support and provide comfort care; call 999 if instructed by clinical staff',
  'Attempt CPR for 2 minutes, then stop',
  'Ask the family''s permission before deciding',
  'B',
  'A valid DNACPR means CPR should not be attempted. Staff must know where DNACPR documentation is held and act on it immediately. Comfort care, dignity in dying, and contacting senior clinical staff is the appropriate response. A DNACPR does not mean withholding all care. Family permission is not required to follow a valid DNACPR — the decision is a clinical one, though best practice involves family communication.'
),
(
  '10000000-0000-0000-0000-000000000007',
  'What is the correct compression-to-ventilation ratio when two trained healthcare rescuers perform CPR on an infant?',
  '30:2',
  '15:1',
  '15:2',
  '10:2',
  'C',
  'When two trained healthcare rescuers perform CPR on an infant, the ratio is 15:2 (15 compressions to 2 rescue breaths). This differs from single-rescuer CPR (30:2) and from adult CPR (always 30:2 regardless of rescuer number). The higher proportion of breaths in paediatric CPR reflects that most childhood cardiac arrests are caused by respiratory failure rather than primary cardiac events, making effective ventilation especially important.'
)
ON CONFLICT DO NOTHING;

END $$;
