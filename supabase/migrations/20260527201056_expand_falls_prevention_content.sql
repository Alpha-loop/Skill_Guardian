
DO $$ BEGIN

-- Flashcards 26-50 for Falls Prevention and Management
INSERT INTO flashcards (course_id, question_text, answer_text, difficulty, order_index) VALUES

('10000000-0000-0000-0000-000000000017',
'What is the difference between intrinsic and extrinsic fall risk factors?',
'Intrinsic factors are internal to the person — such as muscle weakness, balance problems, cognitive impairment, visual impairment, polypharmacy, hypotension, and fear of falling. Extrinsic factors are environmental — such as slippery floors, poor lighting, trailing cables, inappropriate footwear, and poorly adjusted walking aids.',
2, 26),

('10000000-0000-0000-0000-000000000017',
'What do NICE guidelines say about falls prevention?',
'NICE Guideline NG147 (2019) recommends multifactorial falls risk assessments for older people at risk; individualised interventions including strength and balance training; medication review; home hazard assessment; and vision and cardiovascular assessment. It emphasises that falls prevention should be personalised and evidence-based.',
2, 27),

('10000000-0000-0000-0000-000000000017',
'What falls risk assessment tools are commonly used in care settings?',
'Commonly used tools include: STRATIFY (simple 5-question tool for hospital inpatients), Morse Fall Scale (6-item tool for hospital settings), and the Falls Risk Assessment Tool (FRAT) for community settings. The MUST tool, while primarily for nutritional assessment, also captures mobility. Clinical judgement should always supplement any tool.',
2, 28),

('10000000-0000-0000-0000-000000000017',
'What does a post-fall ABCDE assessment involve?',
'ABCDE post-fall assessment: A — Airway (is it clear?); B — Breathing (adequate rate and depth?); C — Circulation (pulse, blood pressure, signs of internal bleeding?); D — Disability (conscious level using AVPU or GCS, pupils); E — Exposure (check for injuries — check head, neck, spine, limbs before moving the person). Vital signs should be monitored regularly after a fall.',
2, 29),

('10000000-0000-0000-0000-000000000017',
'How frequently should observations be taken following a fall?',
'Post-fall observation frequency depends on the level of concern: if there is risk of head injury, neurological observations (GCS, pupils, blood pressure, pulse, temperature, SpO2) should be taken every 30 minutes for 2 hours, then every hour for 4 hours, then every 2 hours as minimum, or as directed by clinical protocol. Any deterioration warrants immediate escalation.',
3, 30),

('10000000-0000-0000-0000-000000000017',
'When should an ambulance be called after a fall?',
'Call 999 immediately if: the person is unconscious; there is suspected head, neck or spinal injury; the person cannot be helped up safely; there is suspected fracture (especially hip — shortened and externally rotated leg); there is active bleeding; the person is in severe pain; or there is suspected stroke or cardiac event. Never move someone with a suspected spinal injury.',
2, 31),

('10000000-0000-0000-0000-000000000017',
'What are the complications of a long lie after a fall?',
'A long lie (being on the floor for more than an hour) can cause: pressure ulcers, hypothermia, dehydration, rhabdomyolysis (muscle breakdown leading to renal failure), pneumonia, deep vein thrombosis, psychological trauma including fear of falling, and significant functional decline. It is a medical emergency.',
3, 32),

('10000000-0000-0000-0000-000000000017',
'What is the relationship between delirium and falls?',
'Delirium (acute confusion) significantly increases fall risk due to disorientation, impulsive behaviour, impaired judgement and agitation. Falls can also cause or exacerbate delirium, particularly in older adults. Any new confusion after a fall should be assessed urgently as it may indicate head injury, pain, or other acute illness.',
3, 33),

('10000000-0000-0000-0000-000000000017',
'How does polypharmacy contribute to fall risk and what should a medication review include?',
'Certain medications increase fall risk: sedatives, hypnotics, antihypertensives (causing postural hypotension), diuretics (causing urgency), antidepressants, antipsychotics, and opioids. A medication review after a fall should assess whether any medication is contributing to fall risk and whether it can be reduced or stopped, involving the prescriber or clinical pharmacist.',
3, 34),

('10000000-0000-0000-0000-000000000017',
'What is osteoporosis and how does it relate to fall risk?',
'Osteoporosis is reduced bone density that increases fracture risk, particularly in post-menopausal women and older men. The FRAX tool estimates 10-year fracture probability. Falls in people with osteoporosis are much more likely to result in serious fractures (especially hip, wrist and vertebral). Prevention includes calcium, vitamin D, bisphosphonates, and fall prevention measures.',
2, 35),

('10000000-0000-0000-0000-000000000017',
'What is the incidence of hip fracture in the UK and what are the implications?',
'Around 70,000–75,000 hip fractures occur in the UK each year, predominantly in older adults. They are associated with significant morbidity and mortality — up to 30% of patients die within 12 months. Surgical repair (internal fixation or hip replacement) is usually required within 36 hours. Rehabilitation is essential for recovery of function.',
3, 36),

('10000000-0000-0000-0000-000000000017',
'When are bed rails appropriate and how should their use be assessed?',
'Bed rails may prevent falls out of bed for some people but carry risks: entrapment, injury on the rail, and increased agitation in people with dementia (who may try to climb over). Their use must be based on individual risk assessment, involving the person in the decision, considering alternatives first, and regularly reviewed. Bed rails must not be used punitively or as a restraint.',
3, 37),

('10000000-0000-0000-0000-000000000017',
'What role does footwear play in falls prevention?',
'Inappropriate footwear is a significant extrinsic risk factor. Non-slip, well-fitting footwear with good ankle support reduces falls risk. Bare feet, socks, or slippers without grip are associated with higher fall risk. Referral to a podiatrist or orthotist may be appropriate for foot problems that affect gait and balance.',
1, 38),

('10000000-0000-0000-0000-000000000017',
'What is the role of vitamin D in falls prevention?',
'Vitamin D deficiency impairs muscle strength and neuromuscular function, increasing fall risk. NICE and NHS England recommend vitamin D supplementation for older adults, particularly those who are housebound or in care homes. Supplementation (typically 10 micrograms/400 IU daily) is safe and cost-effective as part of a falls prevention strategy.',
2, 39),

('10000000-0000-0000-0000-000000000017',
'What is the Otago Exercise Programme?',
'The Otago Exercise Programme is an evidence-based, individually prescribed set of leg-strengthening and balance exercises for older adults, designed to be done at home with a physical therapist''s support. Studies show it reduces falls by approximately 35% in community-dwelling older adults. It is recommended by NICE as part of a multifactorial falls prevention plan.',
2, 40),

('10000000-0000-0000-0000-000000000017',
'What environmental modifications can reduce falls risk?',
'Modifications include: removing clutter and trailing cables; ensuring adequate lighting (especially at night); installing grab rails in bathrooms and on stairs; using non-slip mats; ensuring the toilet is accessible; using contrasting colours for steps; lowering bed height; and ensuring walking aids are within reach. Home hazard assessments by OTs are recommended for people at high risk.',
1, 41),

('10000000-0000-0000-0000-000000000017',
'How can call bells and assistive technology support falls prevention?',
'Call bells allow residents to summon help before attempting to mobilise alone. Bed and chair pressure sensors alert staff when a high-risk person attempts to get up. Wearable fall detectors alert carers after a fall. These technologies can reduce response time and prevent long lies, but must not replace regular monitoring and person-centred care.',
2, 42),

('10000000-0000-0000-0000-000000000017',
'What is the fear of falling and what is its psychological impact?',
'Fear of falling (also called post-fall anxiety syndrome) is a common consequence of falls, affecting up to 50% of older adults who fall. It leads to activity restriction, reduced mobility, social isolation and deconditioning — paradoxically increasing fall risk. It requires psychological support alongside physical rehabilitation. Simply preventing future falls is not sufficient.',
2, 43),

('10000000-0000-0000-0000-000000000017',
'What documentation is required after a fall?',
'Documentation should include: date, time and location of fall; how the person was found; injuries sustained; post-fall observations; actions taken (first aid, medical review, family notification); any witness accounts; and the person''s own account if possible. An incident report must be completed. Failure to document accurately may have legal consequences.',
2, 44),

('10000000-0000-0000-0000-000000000017',
'Which falls are reportable under RIDDOR?',
'Falls in the workplace that result in a worker being incapacitated for more than seven days must be reported under RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013). Falls of service users that result in hospitalisation, a specified injury (such as a fracture), or death may also trigger reporting under RIDDOR or the CQC Duty of Candour and notification requirements.',
3, 45),

('10000000-0000-0000-0000-000000000017',
'What is the role of physiotherapy and occupational therapy in falls prevention?',
'Physiotherapists assess and address gait, balance, strength, and functional mobility, designing exercise programmes and providing walking aid assessments. Occupational therapists assess home environments, recommend adaptations and assistive equipment, and support recovery of function after a fall. Both professions are essential to a multidisciplinary falls prevention service.',
2, 46),

('10000000-0000-0000-0000-000000000017',
'What is a falls care bundle?',
'A falls care bundle is a structured set of evidence-based interventions applied consistently to patients at risk of falls. Typically it includes: falls risk assessment on admission; non-slip footwear; bed rails review; call bell within reach; safe environment check; medication review; and regular orientation. Bundles improve compliance with best practice.',
2, 47),

('10000000-0000-0000-0000-000000000017',
'How should a falls incident be reviewed to enable learning?',
'Falls should be reviewed through a structured incident review process: identifying contributing factors (root cause analysis); reviewing the risk assessment; examining whether the care plan was followed; and identifying system improvements. Learning should be shared with the whole team. Serious falls or those causing significant harm should be reviewed as a significant incident or Serious Incident (SI).',
3, 48),

('10000000-0000-0000-0000-000000000017',
'How does dehydration increase falls risk?',
'Dehydration causes orthostatic hypotension (blood pressure drop on standing), dizziness, confusion and muscle weakness — all of which increase falls risk. In older adults, the thirst sensation is diminished. Care workers should promote regular fluid intake, monitor urine colour, and recognise signs of dehydration early as a falls prevention measure.',
2, 49),

('10000000-0000-0000-0000-000000000017',
'How does cognitive impairment increase falls risk?',
'Cognitive impairment affects judgement, attention, memory and the ability to recognise hazards or remember to use a walking aid. People with dementia may not recall being told to ask for help before mobilising. This requires care workers to be proactive: regular monitoring, use of sensor alarms, environmental adjustments, and clear, consistent communication adapted to the person''s cognitive level.',
2, 50)

ON CONFLICT DO NOTHING;

-- Quiz questions 11-25 for Falls Prevention and Management
INSERT INTO quiz_questions (course_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES

('10000000-0000-0000-0000-000000000017',
'What is the difference between intrinsic and extrinsic fall risk factors?',
'Intrinsic factors are related to the care environment; extrinsic factors are related to the person''s health',
'Intrinsic factors are internal to the person (e.g. muscle weakness, polypharmacy); extrinsic factors are environmental (e.g. poor lighting, slippery floors)',
'Intrinsic factors are preventable; extrinsic factors are not',
'There is no meaningful difference between the two',
'B',
'Intrinsic factors are those within the person, such as balance problems, visual impairment, cognitive impairment and medications. Extrinsic factors are environmental hazards such as poor lighting, trailing cables, unsuitable footwear and wet floors.'),

('10000000-0000-0000-0000-000000000017',
'What does a post-fall ABCDE assessment assess?',
'Admission, Bleeding, Consciousness, Documentation, Environment',
'Airway, Breathing, Circulation, Disability (conscious level), Exposure (checking for injury)',
'Assessment, Brief history, Cause, Diagnosis, Emergency response',
'Alertness, Blood pressure, Confusion, Deformity, Escalation',
'B',
'The ABCDE approach after a fall covers: Airway (clear?), Breathing (adequate?), Circulation (pulse, blood pressure), Disability (conscious level, neurological status), and Exposure (head-to-toe check for injuries). The person should not be moved until spinal injury has been considered.'),

('10000000-0000-0000-0000-000000000017',
'What is a long lie and why is it dangerous?',
'Lying in an uncomfortable position for more than 10 minutes',
'Being on the floor for more than one hour after a fall, which can cause pressure ulcers, hypothermia, rhabdomyolysis and significant psychological harm',
'A prolonged period of bed rest following a hip fracture',
'An unsafe sleep position associated with respiratory problems',
'B',
'A long lie (being unable to get up from the floor for an hour or more) is a medical emergency. It can cause pressure ulcers, hypothermia, muscle breakdown (rhabdomyolysis leading to renal failure), dehydration, pneumonia and significant psychological trauma.'),

('10000000-0000-0000-0000-000000000017',
'Which class of medications most commonly contributes to fall risk in older adults?',
'Antibiotics',
'Vitamins and supplements',
'Sedatives, hypnotics, antihypertensives, antidepressants and antipsychotics',
'Painkillers used for acute injury only',
'C',
'Multiple medication classes increase fall risk: sedatives and hypnotics cause drowsiness; antihypertensives can cause postural hypotension; antidepressants and antipsychotics affect balance and cognition. A medication review after a fall is an essential component of falls prevention.'),

('10000000-0000-0000-0000-000000000017',
'What is osteoporosis and how does it relate to falls?',
'A condition causing excessive bone growth, making bones harder and more resistant to fracture',
'A neurological condition that increases fall frequency',
'A condition of reduced bone density that increases fracture risk, particularly in older adults, so falls are much more likely to result in serious injury',
'A muscle-wasting condition that causes instability',
'C',
'Osteoporosis reduces bone density, making fractures much more likely following a fall. Hip, wrist and vertebral fractures are most common. Falls prevention is therefore crucial for people with osteoporosis, alongside calcium, vitamin D and bone-protective medications.'),

('10000000-0000-0000-0000-000000000017',
'When should bed rails be used for a person at risk of falls?',
'Automatically for all residents in a care home as a standard precaution',
'Only following an individual risk assessment, with consideration of entrapment risk and alternatives, and with the person''s agreement',
'For all people with dementia to prevent them getting out of bed unsafely',
'Whenever a person has fallen from bed in the previous month',
'B',
'Bed rail use must be based on individual assessment. They carry risks including entrapment and injury, and can increase agitation in people with dementia. Alternatives should be considered first, the person''s consent sought, and use reviewed regularly.'),

('10000000-0000-0000-0000-000000000017',
'What is the psychological impact of fear of falling?',
'It has no significant impact on physical health',
'It motivates people to exercise more carefully',
'It leads to activity restriction, deconditioning, social isolation and paradoxically increases fall risk',
'It is only an issue for people who have experienced a serious fall resulting in fracture',
'C',
'Fear of falling affects up to 50% of older adults who have fallen. It leads to voluntary activity restriction, which causes physical deconditioning, reduced mobility and social isolation — all of which increase the risk of future falls. Psychological support is an essential part of falls rehabilitation.'),

('10000000-0000-0000-0000-000000000017',
'Under RIDDOR, when must a fall in the workplace be reported?',
'Any fall of a service user must be reported to RIDDOR within 24 hours',
'Falls resulting in a worker being incapacitated for more than seven days must be reported to HSE',
'All falls must be reported to CQC under RIDDOR',
'RIDDOR only applies to falls in construction and manufacturing settings',
'B',
'RIDDOR (Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013) requires workplace falls resulting in a worker being incapacitated for more than seven days to be reported to the HSE. Falls causing specified injuries (fractures, loss of consciousness) must be reported immediately.'),

('10000000-0000-0000-0000-000000000017',
'What is the Otago Exercise Programme?',
'A hospital-based rehabilitation programme for hip fracture recovery',
'An evidence-based set of leg-strengthening and balance exercises shown to reduce falls by approximately 35% in older adults',
'A cognitive stimulation programme designed to reduce falls caused by confusion',
'A group exercise class developed by the NHS for care home residents',
'B',
'The Otago Exercise Programme is an individually prescribed home exercise programme of leg-strengthening and balance exercises. Research shows it reduces falls by approximately 35%. It is recommended by NICE as part of multifactorial falls prevention for community-dwelling older adults.'),

('10000000-0000-0000-0000-000000000017',
'How does dehydration contribute to falls risk?',
'Dehydration causes electrolyte imbalances that damage joints',
'Dehydration reduces blood volume, causing orthostatic hypotension, dizziness and confusion, all of which increase fall risk',
'Dehydration is only a falls risk in hot weather',
'Dehydration increases falls risk only in people under the age of 70',
'B',
'Dehydration leads to reduced blood volume, which causes postural hypotension (dizziness on standing), confusion and muscle weakness — all key fall risk factors. Older adults have a diminished thirst sensation, so active fluid encouragement by care workers is important.'),

('10000000-0000-0000-0000-000000000017',
'What role does an occupational therapist play in falls prevention?',
'Prescribing medications to reduce dizziness and postural hypotension',
'Conducting home hazard assessments, recommending environmental adaptations and assistive equipment to reduce fall risk',
'Providing surgery for hip fractures',
'Managing physiotherapy rehabilitation after a hip fracture',
'B',
'Occupational therapists assess the home environment for fall hazards, recommend adaptations (grab rails, lighting improvements, stair rails) and assistive equipment (raised toilet seats, bath boards), and support recovery of function and independence following a fall.'),

('10000000-0000-0000-0000-000000000017',
'What is a falls care bundle?',
'A collection of training materials about falls prevention',
'A structured set of evidence-based interventions applied consistently to all patients at risk of falls',
'A legal document completed after a serious fall',
'A set of emergency procedures for responding to a fall',
'B',
'A falls care bundle is a group of evidence-based interventions applied together, consistently. Typical elements include: falls risk assessment, non-slip footwear, call bell access, environmental check, medication review, and regular orientation. Bundles improve adherence to best practice.'),

('10000000-0000-0000-0000-000000000017',
'Why is cognitive impairment a significant fall risk factor?',
'People with cognitive impairment are more likely to ask for help, increasing staff workload',
'Cognitive impairment reduces judgement, attention and memory, making it harder to recognise hazards, use mobility aids, or remember to call for help',
'Cognitive impairment only increases fall risk in outdoor environments',
'Cognitive impairment causes falls exclusively through sleep disturbance',
'B',
'Cognitive impairment impairs the ability to recognise danger, remember instructions, plan movements safely and use walking aids correctly. People with dementia may forget they need a walking frame or that they should call for assistance, requiring proactive monitoring and adapted communication strategies.'),

('10000000-0000-0000-0000-000000000017',
'When should an ambulance be called following a fall?',
'Only when the person has lost consciousness',
'If the person has a suspected fracture, head injury, uncontrolled bleeding, cannot be helped up safely, or there are signs of stroke or cardiac event',
'Only if the person is under the age of 75',
'When the fall was witnessed by more than one care worker',
'B',
'An ambulance should be called immediately in any fall where there is suspected serious injury (fracture, head injury, spinal injury), the person cannot be helped up safely, there is uncontrolled bleeding, or there are signs of stroke or cardiac event. Never move a person with a suspected spinal injury.'),

('10000000-0000-0000-0000-000000000017',
'What complication can occur in a person with existing dementia who experiences a fall?',
'Permanent improvement in cognitive function due to the physical challenge',
'Falls can trigger or worsen delirium, which presents as acute confusion and fluctuating consciousness, and must be assessed urgently',
'Falls in people with dementia rarely cause injury due to muscle relaxation',
'People with dementia are protected from delirium following a fall',
'B',
'People with dementia are at high risk of developing delirium following a fall — especially if there is pain, injury, infection or dehydration. Delirium presents as acute confusion with fluctuating consciousness and is a medical emergency requiring prompt assessment and treatment.'),

('10000000-0000-0000-0000-000000000017',
'What environmental modification is most effective for reducing night-time falls?',
'Installing motion-activated lighting in corridors, bathrooms and bedrooms to ensure visibility when a person gets up at night',
'Locking bedroom doors at night to prevent residents from getting up',
'Sedating residents at bedtime to prevent night-time movement',
'Removing all furniture from bedrooms to reduce trip hazards',
'A',
'Night-time falls are often caused by poor visibility. Motion-activated lighting ensures that when a person gets up in the night, adequate light is immediately available without them having to locate and operate a light switch. It is a simple, low-cost intervention with strong evidence.')

ON CONFLICT DO NOTHING;

END $$;
