
DO $$ BEGIN

-- Flashcards 26-50 for Food Hygiene
INSERT INTO flashcards (course_id, question_text, answer_text, difficulty, order_index) VALUES

('10000000-0000-0000-0000-000000000015',
'What does the Food Safety Act 1990 require and how do the Food Hygiene Regulations 2006 extend this?',
'The Food Safety Act 1990 makes it an offence to render food injurious to health, sell food that is not of the nature, substance or quality expected, or to falsely describe food. The Food Hygiene (England) Regulations 2006 implement EU Regulation 852/2004, requiring all food businesses to implement food safety management systems based on HACCP principles.',
2, 26),

('10000000-0000-0000-0000-000000000015',
'What is HACCP and what are its seven principles?',
'HACCP (Hazard Analysis and Critical Control Points) is a food safety management system that identifies, evaluates and controls hazards. The seven principles are: (1) Conduct a hazard analysis; (2) Identify critical control points (CCPs); (3) Establish critical limits; (4) Establish monitoring procedures; (5) Establish corrective actions; (6) Establish verification procedures; (7) Establish documentation and record-keeping.',
3, 27),

('10000000-0000-0000-0000-000000000015',
'What are the four Cs of food safety?',
'The four Cs are: (1) Cleaning — keeping surfaces, equipment and hands clean; (2) Cooking — ensuring food is cooked to a safe temperature throughout; (3) Chilling — storing food at correct temperatures to slow bacterial growth; (4) Cross-contamination — preventing harmful microorganisms from spreading from raw to ready-to-eat foods.',
1, 28),

('10000000-0000-0000-0000-000000000015',
'What is the temperature danger zone in food safety?',
'The temperature danger zone is 8°C to 63°C — the range at which bacteria multiply most rapidly. Food should not be kept within this range for more than 2 hours (or 1 hour in high-risk settings). Hot food should be served above 63°C; cold food should be kept below 8°C (ideally below 5°C in a fridge).',
2, 29),

('10000000-0000-0000-0000-000000000015',
'What are the safe cooking temperatures for common high-risk foods?',
'Key safe internal cooking temperatures (UK guidance): whole poultry — 70°C for 2 minutes; minced meat and burgers — 75°C throughout; pork — 75°C; reheated food — 75°C (82°C in Scotland). The food should reach these temperatures at the thickest part. Probe thermometers should be used and cleaned between uses.',
2, 30),

('10000000-0000-0000-0000-000000000015',
'What are the correct temperatures for fridge and freezer storage?',
'Fridges should operate between 0°C and 5°C (ideally 1–4°C). Freezers should be at -18°C or below. Temperature should be checked and recorded daily. Food should be stored correctly (raw meat below cooked/ready-to-eat food) and containers should be covered and labelled.',
1, 31),

('10000000-0000-0000-0000-000000000015',
'What is the difference between "use by" and "best before" dates on food labels?',
'"Use by" is a safety date — food must not be eaten after this date as it may pose a health risk even if it looks and smells fine. "Best before" is a quality date — food may be safe to eat after this date but may not be at its best quality. Care workers must ensure "use by" dates are strictly observed.',
1, 32),

('10000000-0000-0000-0000-000000000015',
'What are the 14 major allergens that must be declared under EU/UK food allergen regulations?',
'The 14 allergens are: celery, cereals containing gluten (wheat, rye, barley, oats), crustaceans, eggs, fish, lupin, milk, molluscs, mustard, peanuts, sesame, soybeans, sulphur dioxide/sulphites (above 10mg/kg), and tree nuts. These must be declared on pre-packaged foods and communicated for non-prepacked foods.',
2, 33),

('10000000-0000-0000-0000-000000000015',
'How can cross-contact with allergens be prevented in a care home kitchen?',
'Prevention measures include: using separate equipment and utensils for allergen-free meals; thorough cleaning between uses; careful label reading; clear communication with kitchen staff about allergen requirements; using allergen registers for residents; ensuring kitchen staff are trained on the 14 allergens; and never assuming a product is allergen-free without checking.',
2, 34),

('10000000-0000-0000-0000-000000000015',
'What personal hygiene standards apply to food handlers?',
'Food handlers must: wash hands thoroughly before handling food, after handling raw food, after using the toilet, after coughing or sneezing, and after touching face or hair; wear clean clothing; tie back or cover hair; keep nails short and clean; not wear nail varnish or jewellery; report any illness to a supervisor; and cover cuts with blue waterproof dressings.',
1, 35),

('10000000-0000-0000-0000-000000000015',
'When should a food handler be excluded from food preparation work?',
'Food handlers should be excluded if they have: vomiting or diarrhoea (must be clear for 48 hours after last symptom); confirmed food poisoning; infected skin wounds; or have been diagnosed with a notifiable disease such as typhoid. They should inform their manager and must not return until they have medical clearance where required.',
2, 36),

('10000000-0000-0000-0000-000000000015',
'What is the purpose of colour-coded chopping boards and what does each colour represent?',
'Colour-coded boards prevent cross-contamination. The standard UK system: Red — raw meat; Yellow — cooked meat; Blue — raw fish; Green — salad/fruit/vegetables; White — bread/dairy/bakery; Brown — root vegetables. Separate boards must be used for each food category and thoroughly cleaned between uses.',
1, 37),

('10000000-0000-0000-0000-000000000015',
'What are the main food poisoning organisms and what foods are they associated with?',
'Key organisms: Salmonella (poultry, eggs, raw meat); Campylobacter (most common — poultry, unpasteurised milk); E. coli O157 (undercooked beef, unwashed salad, contaminated water); Listeria (chilled ready-to-eat foods, soft cheese, pâté — high risk for pregnant women, elderly and immunocompromised); Staphylococcus aureus (handled foods, dairy); Clostridium perfringens (reheated meat).',
2, 38),

('10000000-0000-0000-0000-000000000015',
'What are the typical symptoms of food poisoning?',
'Symptoms of food poisoning typically include: nausea, vomiting, diarrhoea, stomach cramps, and sometimes fever. Onset varies by organism — Staphylococcus aureus causes symptoms within 1–6 hours; Salmonella within 6–72 hours; Campylobacter within 2–5 days. In vulnerable people (elderly, immunocompromised), food poisoning can be life-threatening.',
2, 39),

('10000000-0000-0000-0000-000000000015',
'What is Natasha''s Law and what does it require?',
'Natasha''s Law (Food Information (Amendment) (England) Regulations 2021) came into force in October 2021 following the death of Natasha Ednan-Laperouse. It requires all food businesses in England to label pre-packed for direct sale (PPDS) food — made on the premises and packaged before sale — with a full ingredients list and allergen information on the packaging.',
2, 40),

('10000000-0000-0000-0000-000000000015',
'What are the nutritional needs of older adults in care settings?',
'Older adults require adequate protein to maintain muscle mass; calcium and vitamin D for bone health; iron; B vitamins; and sufficient fibre and fluid. Energy requirements may decrease, but nutrient density remains important. Risk of malnutrition is high in care settings — the MUST tool (Malnutrition Universal Screening Tool) should be used to screen residents regularly.',
2, 41),

('10000000-0000-0000-0000-000000000015',
'What is the IDDSI framework for texture-modified diets?',
'The International Dysphagia Diet Standardisation Initiative (IDDSI) is a global framework for classifying food textures and drink thicknesses. It uses a scale from 0 (thin liquid) to 7 (regular food), with standardised descriptors and testing methods. It is used when people have dysphagia (swallowing difficulties) to prescribe appropriate texture and thickness levels.',
3, 42),

('10000000-0000-0000-0000-000000000015',
'What are thickened fluids and when are they used?',
'Thickened fluids are liquids modified using a thickener (e.g. starch or gum-based) to reduce flow speed, making swallowing safer for people with dysphagia. IDDSI levels 1 (slightly thick) to 4 (extremely thick) are used. They are prescribed by a speech and language therapist following a swallowing assessment. Providing the wrong consistency can cause aspiration.',
3, 43),

('10000000-0000-0000-0000-000000000015',
'What are the signs of dehydration in older adults and how can it be prevented?',
'Signs include: dark concentrated urine, reduced urine output, dry mouth, confusion, dizziness, fatigue, headache, sunken eyes and low blood pressure. Prevention: offering fluids regularly (many older adults have reduced thirst sensation), recording fluid intake, making drinks appealing and accessible, and monitoring for medications that increase fluid loss (diuretics).',
1, 44),

('10000000-0000-0000-0000-000000000015',
'How should religious and cultural food requirements be met in a care home?',
'Care workers should: document each resident''s dietary requirements on admission; ensure kitchen staff are informed; provide Halal, Kosher, Hindu vegetarian or other appropriate meals; avoid cross-contamination with prohibited foods; respect fasting practices (e.g. Ramadan); and regularly review requirements with the resident and family. Failure to meet these needs may constitute a breach of equality and dignity standards.',
2, 45),

('10000000-0000-0000-0000-000000000015',
'How should food waste be managed in a care home setting?',
'Food waste should be segregated from other waste, stored in appropriate covered bins, and collected regularly to prevent pest attraction. Food waste must not be fed to animals. Records of waste may be required. Minimising food waste also has sustainability and cost benefits. Expired or out-of-temperature food must be disposed of safely and documented.',
2, 46),

('10000000-0000-0000-0000-000000000015',
'What are the principles of pest control in a care home kitchen?',
'Pest control relies on: denying pests access (sealing entry points); denying food and water (covered storage, clean surfaces); regular cleaning; prompt reporting of signs of pests (droppings, gnaw marks); engaging a pest control contractor; and keeping records. Evidence of pests would result in a poor food hygiene rating and could lead to closure.',
2, 47),

('10000000-0000-0000-0000-000000000015',
'What temperature monitoring and recording is required in food safety?',
'Fridge and freezer temperatures should be recorded at least twice daily. Food probe thermometers should be used to check cooking and reheating temperatures and cleaned between uses. Delivery temperatures should be checked. Records must be kept for inspection. Probes must be calibrated regularly. Any temperature breach must be recorded and action taken.',
2, 48),

('10000000-0000-0000-0000-000000000015',
'What should a food safety cleaning schedule include?',
'A cleaning schedule specifies: what is to be cleaned, how often, who is responsible, which cleaning products and dilutions to use, and the method. It should cover surfaces, equipment, floors, walls, bins and fridges. Cleaning records should be kept. Cleaning products must be stored safely away from food and COSHH requirements observed.',
2, 49),

('10000000-0000-0000-0000-000000000015',
'What CQC standards relate to nutrition in care homes?',
'CQC Regulation 14 (Meeting Nutritional and Hydration Needs) requires providers to ensure service users have enough to eat and drink, that their preferences are met, and that nutritional risks are assessed and acted upon. Inspectors assess mealtimes, food quality, support for eating, hydration practices, and use of screening tools such as MUST.',
2, 50)

ON CONFLICT DO NOTHING;

-- Quiz questions 11-25 for Food Hygiene
INSERT INTO quiz_questions (course_id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation) VALUES

('10000000-0000-0000-0000-000000000015',
'What does HACCP stand for?',
'Hygiene and Contamination Control Programme',
'Hazard Analysis and Critical Control Points',
'Health and Care Catering Procedures',
'Hazardous Allergen and Chemical Control Policy',
'B',
'HACCP stands for Hazard Analysis and Critical Control Points. It is a systematic, preventive food safety management system required by the Food Hygiene Regulations 2006 for all food businesses.'),

('10000000-0000-0000-0000-000000000015',
'What is the temperature danger zone for bacterial growth in food?',
'0°C to 37°C',
'5°C to 75°C',
'8°C to 63°C',
'10°C to 70°C',
'C',
'The temperature danger zone is 8°C to 63°C. Bacteria multiply most rapidly in this range. Hot food must be kept above 63°C and cold food below 8°C (ideally 1–5°C) to prevent bacterial growth.'),

('10000000-0000-0000-0000-000000000015',
'How many major allergens must be declared under UK allergen labelling law?',
'Seven',
'Ten',
'Twelve',
'Fourteen',
'D',
'There are 14 major allergens that must be declared: celery, cereals containing gluten, crustaceans, eggs, fish, lupin, milk, molluscs, mustard, peanuts, sesame, soybeans, sulphur dioxide/sulphites, and tree nuts.'),

('10000000-0000-0000-0000-000000000015',
'What is the difference between a "use by" and a "best before" date?',
'"Use by" is a quality date and food can be safely eaten after it; "best before" is a safety date and food must not be eaten after it',
'"Use by" is a safety date — food must not be eaten after this date; "best before" is a quality date — food may still be safe but quality may have declined',
'Both dates mean the same thing — food must be discarded on the stated date',
'"Use by" only applies to dairy products; "best before" applies to all other foods',
'B',
'"Use by" is a food safety date and food must not be consumed after it, regardless of appearance or smell. "Best before" indicates quality — food may still be safe to eat after this date but may not be at its best. In a care home, "use by" dates must be strictly observed.'),

('10000000-0000-0000-0000-000000000015',
'Which food poisoning organism is most commonly reported in the UK?',
'Salmonella',
'E. coli O157',
'Campylobacter',
'Listeria',
'C',
'Campylobacter is the most commonly reported cause of food-borne illness in the UK. It is most often associated with undercooked poultry and cross-contamination from raw chicken. It causes gastroenteritis and can be severe in vulnerable people.'),

('10000000-0000-0000-0000-000000000015',
'When must a food handler be excluded from food preparation?',
'Only when they have a rash on their hands',
'When they have vomiting or diarrhoea, and must remain off for 48 hours after symptoms resolve',
'Only when they have a confirmed diagnosis of Salmonella',
'When they have a cold or mild sore throat',
'B',
'Food handlers must be excluded from work if they have vomiting or diarrhoea and must not return until 48 hours after their last symptom. This is to prevent foodborne illness from spreading to vulnerable service users.'),

('10000000-0000-0000-0000-000000000015',
'What colour chopping board should be used for raw meat?',
'Blue',
'Yellow',
'Green',
'Red',
'D',
'The standard UK colour-coding system for chopping boards allocates red for raw meat. Using separate boards for different food types prevents cross-contamination. The full system: Red (raw meat), Yellow (cooked meat), Blue (raw fish), Green (salad/fruit/veg), White (dairy/bread), Brown (root vegetables).'),

('10000000-0000-0000-0000-000000000015',
'What does Natasha''s Law require?',
'That all food in restaurants must have allergen information on the menu',
'That pre-packed for direct sale (PPDS) food must have a full ingredients and allergen list on its packaging',
'That food businesses must keep a written record of all allergen-containing ingredients',
'That allergen training is mandatory for all food handlers',
'B',
'Natasha''s Law (in force from October 2021) requires all food pre-packed for direct sale — such as sandwiches made and packaged on site — to be labelled with a full ingredients list with allergens clearly emphasised. It was introduced following the death of Natasha Ednan-Laperouse.'),

('10000000-0000-0000-0000-000000000015',
'What is the IDDSI framework used for?',
'Assessing risk of malnutrition in care home residents',
'Classifying food textures and drink thicknesses for people with dysphagia',
'Prescribing nutritional supplements to older adults',
'Calculating calorific content of meals',
'B',
'The International Dysphagia Diet Standardisation Initiative (IDDSI) provides a standardised framework for classifying food textures (levels 3–7) and drink thicknesses (levels 0–4). It is used when a speech and language therapist prescribes modified textures or thickened fluids for people with swallowing difficulties.'),

('10000000-0000-0000-0000-000000000015',
'What is a key sign of dehydration in older adults?',
'Flushed cheeks and increased appetite',
'Dark, concentrated urine and confusion',
'Rapid weight gain and swollen ankles',
'Excessive sweating and increased urine output',
'B',
'In older adults, dehydration commonly presents as dark concentrated urine, reduced urine output, dry mouth, confusion, fatigue and dizziness. Older adults have reduced thirst sensation, making active fluid encouragement by care workers essential.'),

('10000000-0000-0000-0000-000000000015',
'What are the four Cs of food safety?',
'Cooking, Covering, Chilling, Composting',
'Cleaning, Cooking, Chilling, Cross-contamination',
'Cooling, Covering, Checking, Compliance',
'Catering, Compliance, Checking, Control',
'B',
'The four Cs are Cleaning, Cooking, Chilling and Cross-contamination prevention. Together they form the foundation of practical food hygiene in care settings. All four must be applied consistently to prevent food poisoning.'),

('10000000-0000-0000-0000-000000000015',
'Which Listeria-risk foods should be avoided by older adults and those who are immunocompromised?',
'Boiled vegetables and well-cooked rice',
'Chilled ready-to-eat foods, soft cheeses and pâté',
'Freshly cooked meat and pasteurised dairy products',
'Tinned foods and dried pulses',
'B',
'Listeria monocytogenes is associated with chilled ready-to-eat foods, soft cheeses (e.g. brie, camembert), pâté, smoked fish and pre-packed sandwiches. It is particularly dangerous for older adults, pregnant women and immunocompromised individuals, and can cause serious illness even from low doses.'),

('10000000-0000-0000-0000-000000000015',
'What does CQC Regulation 14 require of care home providers?',
'That all care homes employ a qualified nutritionist',
'That service users'' nutritional and hydration needs are met, including individual preferences, and that nutritional risks are assessed and acted upon',
'That all meals must be calorie-counted and displayed on menus',
'That providers report all incidents of weight loss to CQC within 24 hours',
'B',
'CQC Regulation 14 (Meeting Nutritional and Hydration Needs) requires providers to ensure residents have adequate food and drink that meets their preferences and dietary needs, and that nutritional risk is systematically assessed — for example, using the MUST screening tool.'),

('10000000-0000-0000-0000-000000000015',
'What is the correct fridge temperature range for storing high-risk foods?',
'Between 5°C and 10°C',
'Between 0°C and 5°C',
'Below 0°C',
'Between 8°C and 12°C',
'B',
'Fridges should be maintained between 0°C and 5°C (ideally 1–4°C) to prevent bacterial growth in high-risk foods. Temperatures should be checked and recorded at least twice daily. Any fridge consistently operating above 5°C presents a food safety risk.'),

('10000000-0000-0000-0000-000000000015',
'What is the most important personal hygiene action for food handlers?',
'Wearing gloves at all times during food preparation',
'Thorough, correct handwashing with soap and water at all critical points — including before handling food, after handling raw food, after using the toilet and after touching face or hair',
'Applying hand sanitiser gel rather than washing with soap and water',
'Wearing a hair net',
'B',
'Handwashing with soap and water is the single most important personal hygiene measure for food handlers. Alcohol gel is not a substitute for handwashing, especially against norovirus. Critical handwashing points include before touching food, after handling raw food, after toilet use and after any contamination event.')

ON CONFLICT DO NOTHING;

END $$;
