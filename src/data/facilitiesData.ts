export interface FacilityEquipment {
  name: string;
  hindiName: string;
  specification: string;
  hindiSpecification: string;
}

export interface FacilityPatientInfo {
  timing: string;
  hindiTiming: string;
  visitingHours: string;
  hindiVisitingHours: string;
  rules: string[];
  hindiRules: string[];
  contactNumber: string;
}

export interface Facility {
  id: string;
  name: string;
  hindiName: string;
  category: string;
  hindiCategory: string;
  badge: string;
  hindiBadge: string;
  icon: string;
  shortDesc: string;
  hindiShortDesc: string;
  mainImage: string;
  galleryImages: string[];
  overview: string;
  hindiOverview: string;
  purposeAndServices: {
    title: string;
    hindiTitle: string;
    description: string;
    hindiDescription: string;
  }[];
  equipmentList: FacilityEquipment[];
  patientInfo: FacilityPatientInfo;
  relatedDepartmentIds: string[];
  relevantDoctorIds: string[];
}

export const FACILITIES_DATA: Facility[] = [
  {
    id: 'emergency-trauma',
    name: '24/7 Emergency & Trauma Centre',
    hindiName: '24/7 आपातकालीन एवं ट्रॉमा केंद्र',
    category: 'Emergency & Critical Care',
    hindiCategory: 'आपातकालीन एवं गहन चिकित्सा',
    badge: 'Immediate Triage | 24/7 Active',
    hindiBadge: 'त्वरित ट्राइएज | 24 घंटे सक्रिय',
    icon: 'ShieldAlert',
    shortDesc:
      'Dedicated 20-bed emergency triage facility with minor operation theatre, mobile resuscitation suites, and rapid golden-hour stroke and cardiac response teams.',
    hindiShortDesc:
      'गोल्डन ऑवर रिससिटेशन, माइनर ओटी और 24/7 समर्पित इमरजेंसी एवं ट्रॉमा टीम से सुसज्जित 20-बेड का आपातकालीन केंद्र।',
    mainImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    ],
    overview:
      'The 24/7 Emergency & Trauma Centre at Janhit Hospital is engineered for instantaneous response to life-threatening medical, surgical, and accidental emergencies. Operating under internationally certified triage protocols (ESI Levels 1-5), our trauma team initiates resuscitation within under 5 minutes of arrival, directly linked to our 24/7 biplane Cath Lab and modular OTs.',
    hindiOverview:
      'जनहित हॉस्पिटल का 24/7 आपातकालीन एवं ट्रॉमा केंद्र दुर्घटनाओं, दिल के दौरे और स्ट्रोक के गंभीर मरीजों को तत्काल जीवनरक्षक उपचार प्रदान करने हेतु निर्मित है। अंतरराष्ट्रीय ट्राइएज प्रोटोकॉल के अंतर्गत मरीज के अस्पताल पहुंचते ही 5 मिनट के भीतर विशेषज्ञ टीम उपचार शुरू करती है।',
    purposeAndServices: [
      {
        title: 'Golden Hour Polytrauma Resuscitation',
        hindiTitle: 'गोल्डन ऑवर ट्रॉमा रिससिटेशन',
        description: 'Comprehensive stabilization for severe road traffic accidents, complex fractures, and internal bleeding.',
        hindiDescription: 'सड़क दुर्घटनाओं, गंभीर फ्रैक्चर और आंतरिक रक्तस्राव वाले मरीजों का तत्काल जीवनरक्षक उपचार।',
      },
      {
        title: 'Acute Chest Pain & STEMI Triage',
        hindiTitle: 'सीने में दर्द एवं हार्ट अटैक ट्राइएज',
        description: '5-minute ECG screening activating direct-to-Cath Lab primary angioplasty pathways.',
        hindiDescription: '5 मिनट में ईसीजी जांच और दिल के दौरे के मरीजों को बिना देरी सीधे कैथ लैब ले जाने की सुविधा।',
      },
      {
        title: 'Rapid 15-Minute Stroke Rescue',
        hindiTitle: '15-मिनट एक्यूट स्ट्रोक रेस्क्यू',
        description: 'Immediate non-contrast CT and endovascular neuro-interventional mobilization for stroke thrombolysis.',
        hindiDescription: 'मस्तिष्क पक्षाघात (स्ट्रोक) के मरीजों की तुरंत सीटी जांच और थक्का घोलने वाली दवा की शुरुआत।',
      },
    ],
    equipmentList: [
      {
        name: 'Mindray BeneHeart D6 Biphasic Defibrillators',
        hindiName: 'माइंडरे बाईफेसिक डिफाइब्रिलेटर',
        specification: 'Automated external and manual pacing with real-time CPR quality feedback.',
        hindiSpecification: 'दिल की धड़कन रुकने पर तत्काल शॉक और सीपीआर गाइडेंस देने वाला उपकरण।',
      },
      {
        name: 'Dräger Oxylog 3000 Plus Transport Ventilators',
        hindiName: 'ड्रैगर ट्रांसपोर्ट वेंटिलेटर',
        specification: 'Advanced non-invasive and volume-controlled pressure support ventilation.',
        hindiSpecification: 'इमरजेंसी और शिफ्टिंग के दौरान मरीजों को निरंतर सुरक्षित ऑक्सीजन वेंटिलेशन।',
      },
      {
        name: 'Radiometer ABL90 FLEX Blood Gas Analyzer',
        hindiName: 'एबीजी (ABG) इंस्टेंट ब्लड गैस एनालाइजर',
        specification: 'Lab-quality blood gases, electrolytes, and lactate in 35 seconds from a micro-sample.',
        hindiSpecification: '35 सेकंड में खून की गैस, एसिडिटी और लैक्टेट की सटीक रिपोर्ट देने वाला उपकरण।',
      },
    ],
    patientInfo: {
      timing: '24 Hours Open (365 Days a Year)',
      hindiTiming: '24 घंटे खुला (वर्ष के 365 दिन)',
      visitingHours: 'One primary attendant permitted at bedside during stabilization',
      hindiVisitingHours: 'इमरजेंसी में मरीज के पास केवल एक प्राथमिक परिजन को उपस्थित रहने की अनुमति',
      rules: [
        'No prior appointment or registration queue for acute, critical emergencies',
        'Direct ambulance bay access with dedicated stretcher lift to operation theatres and ICUs',
        'Emergency triage category is assigned immediately based on physiological vitals',
      ],
      hindiRules: [
        'गंभीर एवं आपातकालीन मामलों में किसी पूर्व अपॉइंटमेंट या कतार की आवश्यकता नहीं',
        'सीधे एम्बुलेंस प्रवेश द्वार से ओटी और आईसीयू तक समर्पित स्ट्रेचर लिफ्ट',
        'मरीज की नब्ज और ऑक्सीजन देखकर ट्राइएज प्राथमिकता तुरंत निर्धारित की जाती है',
      ],
      contactNumber: '1800-123-9999',
    },
    relatedDepartmentIds: ['cardiology', 'neurology', 'orthopaedics', 'pulmonology'],
    relevantDoctorIds: ['dr-ashok-sharma', 'dr-meenakshi-verma', 'dr-rajesh-singh'],
  },
  {
    id: 'critical-care-icu',
    name: 'Multidisciplinary ICUs & Critical Care',
    hindiName: 'मल्टी-डिसीप्लिनरी आईसीयू एवं गहन चिकित्सा',
    category: 'Critical Inpatient Care',
    hindiCategory: 'गहन इनपेशेंट चिकित्सा',
    badge: '100+ ICU Beds | 1:1 Nursing',
    hindiBadge: '100+ आईसीयू बेड्स | 1:1 नर्सिंग अनुपात',
    icon: 'Activity',
    shortDesc:
      '100+ high-end intensive care beds segregated into Medical, Surgical, Neuro, and Cardiac ICUs with positive pressure air suites and continuous telemetry.',
    hindiShortDesc:
      '100+ क्रिटिकल केयर बेड्स, वेंटिलेटर, ईसीएमओ, सीआरआरटी और 1:1 समर्पित नर्सिंग देखभाल से सुसज्जित आधुनिक आईसीयू।',
    mainImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=800&q=80',
    ],
    overview:
      'The Intensive Care Units at Janhit Hospital provide round-the-clock tertiary critical care medicine for patients experiencing acute life-threatening organ failure. Featuring separate specialized suites for Cardiac (CCU), Neuro, Medical, and Surgical patients, our ICUs maintain a strict 1:1 nurse-to-patient ratio for ventilated patients and 24/7 dedicated in-house intensivists.',
    hindiOverview:
      'जनहित हॉस्पिटल का आईसीयू विभाग जीवन के लिए गंभीर रूप से संकटग्रस्त मरीजों की 24/7 निगरानी और गहन उपचार हेतु समर्पित है। यहां मेडिकल, सर्जिकल, न्यूरो और कार्डियक आईसीयू अलग-अलग इकाइयों में विभाजित हैं, जहां प्रत्येक वेंटिलेटर मरीज पर 1:1 समर्पित नर्स और 24 घंटे वरिष्ठ इंटेंसिविस्ट डॉक्टर तैनात रहते हैं।',
    purposeAndServices: [
      {
        title: 'Advanced Mechanical Lung Ventilation',
        hindiTitle: 'उन्नत वेंटिलेटर सपोर्ट',
        description: 'Lung-protective ventilation protocols with prone positioning for acute respiratory distress (ARDS).',
        hindiDescription: 'फेफड़ों को सुरक्षित रखते हुए पेट के बल लिटाकर ऑक्सीजन सुधारने वाला विशेष वेंटिलेशन।',
      },
      {
        title: 'Bedside CRRT Renal Replacement',
        hindiTitle: 'बेडसाइड सीआरआरटी (CRRT) डायलिसिस',
        description: 'Continuous slow blood purification for hemodynamically unstable patients with low blood pressure.',
        hindiDescription: 'आईसीयू के बेहद कमजोर मरीजों के लिए 24 घंटे चलने वाली धीमी और सुरक्षित डायलिसिस।',
      },
      {
        title: 'Invasive Hemodynamic Telemetry',
        hindiTitle: 'इनवेसिव हेमोडायनामिक मॉनिटरिंग',
        description: 'Continuous arterial line, central venous pressure, and cardiac output monitoring.',
        hindiDescription: 'धमनियों में विशेष सेंसर डालकर रक्तचाप और हृदय की कार्यक्षमता की लगातार लाइव जांच।',
      },
    ],
    equipmentList: [
      {
        name: 'Dräger Evita V800 High-End ICU Ventilators',
        hindiName: 'ड्रैगर V800 एडवांस्ड वेंटिलेटर',
        specification: 'Smart pulmonary mechanics monitoring with automated weaning modes.',
        hindiSpecification: 'फेफड़ों की क्षमता के अनुसार स्वचालित रूप से ऑक्सीजन नियंत्रित करने वाली मशीन।',
      },
      {
        name: 'Baxter Prismaflex CRRT & TPE System',
        hindiName: 'प्रिज्माफ्लेक्स सीआरआरटी सिस्टम',
        specification: 'Continuous ultrafiltration and therapeutic plasma exchange for multi-organ sepsis.',
        hindiSpecification: 'रक्त से गंभीर संक्रमण के जहर और अतिरिक्त पानी को सुरक्षित निकालने वाली मशीन।',
      },
      {
        name: 'Philips IntelliVue MX750 Multi-Parameter Monitors',
        hindiName: 'फिलिप्स इनवेसिव मल्टी-पैरामीटर मॉनिटर',
        specification: '19-inch high-resolution touchscreen tracking 12-lead ECG, SpO2, invasive BP, and EtCO2.',
        hindiSpecification: 'हृदय गति, ऑक्सीजन, कार्बन डाइऑक्साइड और बीपी की निरंतर लाइव स्क्रीन डिस्प्ले।',
      },
    ],
    patientInfo: {
      timing: '24 Hours Intensive Clinical Monitoring',
      hindiTiming: '24 घंटे सघन चिकित्सकीय निगरानी',
      visitingHours: 'Morning: 11:00 AM - 12:00 PM | Evening: 05:00 PM - 06:00 PM',
      hindiVisitingHours: 'सुबह: 11:00 - 12:00 | शाम: 05:00 - 06:00',
      rules: [
        'Only one immediate family member allowed inside the ICU cubicle at a time',
        'Sterile shoe covers, hand sanitization, and clean surgical masks are mandatory before entry',
        'Daily clinical briefing by the primary consultant and intensivist at 01:00 PM',
      ],
      hindiRules: [
        'संक्रमण रोकने हेतु एक समय में केवल एक ही निकटतम परिजन को अंदर जाने की अनुमति',
        'प्रवेश से पहले शू-कवर पहनना, हाथ सैनिटाइज करना और सर्जिकल मास्क लगाना अनिवार्य',
        'मरीज की स्थिति पर वरिष्ठ कंसल्टेंट द्वारा प्रतिदिन दोपहर 01:00 बजे विस्तृत काउंसलिंग',
      ],
      contactNumber: '+91-11-2345-6789',
    },
    relatedDepartmentIds: ['pulmonology', 'cardiology', 'nephrology', 'neurology'],
    relevantDoctorIds: ['dr-neha-choudhary', 'dr-ashok-sharma', 'dr-sanjay-gupta'],
  },
  {
    id: 'neonatal-icu-nicu',
    name: 'Level-3 Neonatal ICU (NICU)',
    hindiName: 'लेवल-3 नवजात शिशु गहन चिकित्सा (NICU)',
    category: 'Newborn & Pediatric Care',
    hindiCategory: 'नवजात शिशु एवं बाल चिकित्सा',
    badge: 'Level-3 Accredited | Giraffe Omnibeds',
    hindiBadge: 'लेवल-3 मान्यता | जिराफ ओमनीबेड इनक्यूबेटर्स',
    icon: 'Baby',
    shortDesc:
      'Tertiary-level neonatal intensive care equipped with Giraffe micro-incubators, high-frequency oscillatory ventilation, and whole-body hypothermia for micro-preemies.',
    hindiShortDesc:
      '600 ग्राम से कम वजन वाले अत्यंत संवेदनशील नवजात शिशुओं की जीवनरक्षा हेतु आधुनिक इनक्यूबेटर और वेंटिलेटर से सुसज्जित केंद्र।',
    mainImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    ],
    overview:
      'The Level-3 Neonatal Intensive Care Unit (NICU) at Janhit Hospital is a certified center of excellence for newborn critical care. Designed with HEPA-filtered laminar air and strict noise-attenuation controls, the unit has successfully nurtured micro-preemies born as early as 24 weeks gestation weighing under 600 grams.',
    hindiOverview:
      'जनहित हॉस्पिटल का लेवल-3 एनआईसीयू (NICU) नवजात शिशुओं की गहन चिकित्सा का शीर्ष केंद्र है। शांत और रोगाणु-मुक्त वातावरण में स्थित इस यूनिट में 24 सप्ताह में जन्मे और 600 ग्राम से भी कम वजन वाले अत्यंत नाजुक नवजात शिशुओं की जान बचाने हेतु अंतरराष्ट्रीय स्तर की सुविधाएं हैं।',
    purposeAndServices: [
      {
        title: 'Extreme Preterm Micro-Preemie Care',
        hindiTitle: 'अत्यंत कम वजन वाले शिशुओं की देखभाल',
        description: 'Comprehensive incubation with surfactant replacement, humidity control, and parenteral nutrition.',
        hindiDescription: 'समय से पहले जन्मे शिशुओं के कमजोर फेफड़ों को परिपक्व करने और पोषण देने की विशेष सुविधा।',
      },
      {
        title: 'Whole-Body Therapeutic Hypothermia',
        hindiTitle: 'थेराप्यूटिक हाइपोथर्मिया (कूलिंग थेरेपी)',
        description: 'Tecotherm controlled cooling jacket for birth asphyxia within the initial 6 hours of life.',
        hindiDescription: 'जन्म के समय सांस न ले पाने वाले शिशुओं के दिमाग को सुरक्षित रखने हेतु विशेष कूलिंग थेरेपी।',
      },
      {
        title: 'Kangaroo Mother Care (KMC) Program',
        hindiTitle: 'कंगारू मदर केयर एवं स्तनपान क्लिनिक',
        description: 'Skin-to-skin contact suites supporting early maternal bonding and natural immune development.',
        hindiDescription: 'मां के सीने से लगाकर प्राकृतिक गर्मी और मां का दूध पिलाने हेतु समर्पित विशेष कक्ष।',
      },
    ],
    equipmentList: [
      {
        name: 'GE Healthcare Giraffe Omnibed Carestations',
        hindiName: 'जीई जिराफ ओमनीबेड इनक्यूबेटर्स',
        specification: 'Converts from an incubator to an open radiant warmer at the touch of a button.',
        hindiSpecification: 'शिशु को हिलाए बिना इनक्यूबेटर से वार्मर में बदलने वाला आधुनिक जादुई बेड।',
      },
      {
        name: 'SLE6000 High-Frequency Oscillatory Ventilator',
        hindiName: 'हाई-फ्रीक्वेंसी ऑसिलेटरी वेंटिलेटर',
        specification: 'Gentle, high-rate micro-tidal volume ventilation preserving fragile preterm lung tissue.',
        hindiSpecification: 'नाजुक फेफड़ों पर बिना कोई दबाव डाले प्रति मिनट 900 बार हल्की सांस देने वाली मशीन।',
      },
      {
        name: 'Tecotherm Neo Controlled Hypothermia System',
        hindiName: 'टेकोथर्म नियो कूलिंग सिस्टम',
        specification: 'Microprocessor core-body temperature regulation to 33.5°C with servo-controlled cooling.',
        hindiSpecification: 'शिशु के मस्तिष्क को ऑक्सीजन की कमी के नुकसान से बचाने हेतु नियंत्रित तापमान प्रणाली।',
      },
    ],
    patientInfo: {
      timing: '24 Hours Specialized Neonatology Unit',
      hindiTiming: '24 घंटे नवजात शिशु गहन चिकित्सा',
      visitingHours: 'Parents have open 24/7 access to be with their baby under nurse supervision',
      hindiVisitingHours: 'माता-पिता को अपने बच्चे के पास जाने हेतु 24 घंटे खुला सहयोग',
      rules: [
        'Strict handwashing scrubbing protocol before entering the neonatal zone',
        'Outside visitors and children under 12 are restricted to prevent infection spread',
        'Express breast milk feeding support provided by dedicated lactation consultants',
      ],
      hindiRules: [
        'एनआईसीयू में प्रवेश करने से पहले हाथों को कोहनी तक साबुन से धोना अनिवार्य',
        'संक्रमण रोकने हेतु बाहरी रिश्तेदारों और बच्चों का प्रवेश प्रतिबंधित',
        'मां के दूध के सुरक्षित संग्रहण और पिलाने हेतु विशेष नर्स द्वारा पूरा सहयोग',
      ],
      contactNumber: '+91-11-2345-6789',
    },
    relatedDepartmentIds: ['paediatrics'],
    relevantDoctorIds: ['dr-sunita-deshmukh'],
  },
  {
    id: 'modular-operation-theatres',
    name: 'Modular Operation Theatres',
    hindiName: 'अल्ट्रा-क्लीन मॉड्यूलर ऑपरेशन थिएटर',
    category: 'Surgical Infrastructure',
    hindiCategory: 'सर्जिकल इन्फ्रास्ट्रक्चर',
    badge: 'Class 100 OT | Laminar Flow',
    hindiBadge: 'क्लास-100 ओटी | लैमिनार एयरफ्लो',
    icon: 'Cpu',
    shortDesc:
      '10 advanced laminar airflow modular surgical theatres with anti-microbial wall cladding, Mako robotic integration, and 4K surgical imaging.',
    hindiShortDesc:
      'शून्य-संक्रमण नीति वाले 10 आधुनिक मॉड्यूलर ऑपरेशन थिएटर, जहां रोबोटिक, हार्ट बायपास और न्यूरो सर्जरी होती हैं।',
    mainImage: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    ],
    overview:
      'The surgical complex at Janhit Hospital houses 10 digitally integrated modular operating theatres engineered to international Class-100 sterility benchmarks. Equipped with positive pressure laminar airflow, seamless anti-bacterial stainless steel cladding, and ergonomic ceiling pendants, our surgical suites minimize surgical site infection (SSI) risks to near zero.',
    hindiOverview:
      'जनहित हॉस्पिटल का सर्जिकल कॉम्प्लेक्स अंतरराष्ट्रीय क्लास-100 स्टेराइल मानकों पर आधारित 10 मॉड्यूलर ऑपरेशन थिएटरों से सुसज्जित है। यहां हेपा-फिल्टर्ड लैमिनार एयरफ्लो, रोबोटिक आर्म इंटीग्रेशन और जर्म-फ्री दीवारों की व्यवस्था है, जिससे सर्जरी के बाद संक्रमण (इन्फेक्शन) का खतरा लगभग शून्य हो जाता है।',
    purposeAndServices: [
      {
        title: 'Robotic-Assisted Joint & Soft Tissue Surgeries',
        hindiTitle: 'रोबोटिक जॉइंट एवं सर्जरी',
        description: 'Dedicated OT equipped with the Stryker Mako robotic system for sub-millimeter joint reconstruction.',
        hindiDescription: 'माको रोबोटिक आर्म द्वारा घुटने और कूल्हे का अत्यंत सटीक प्रत्यारोपण।',
      },
      {
        title: 'Microscopic Neuro & Spine Interventions',
        hindiTitle: 'माइक्रो-न्यूरो एवं स्पाइन सर्जरी',
        description: 'High-magnification optical microscopy and 3D computer navigation for delicate brain tumor excisions.',
        hindiDescription: 'कार्ल ज़ीस माइक्रोस्कोप और 3D कंप्यूटर नेविगेशन द्वारा नाजुक ब्रेन ट्यूमर ऑपरेशन।',
      },
      {
        title: 'Advanced Laparoscopic & Bariatric Surgery',
        hindiTitle: 'आधुनिक दूरबीन (लैप्रोस्कोपिक) सर्जरी',
        description: '4K ultra-high definition endoscopy for gallbladder, hernia, appendicitis, and gastrointestinal resections.',
        hindiDescription: '4K एचडी कैमरे द्वारा पेट में छोटे छिद्रों से की जाने वाली दर्द-रहित सर्जरी।',
      },
    ],
    equipmentList: [
      {
        name: 'Stryker Mako Robotic Surgical Arm System',
        hindiName: 'स्ट्राइकर माको रोबोटिक सर्जिकल सिस्टम',
        specification: 'CT-guided stereotactic haptic feedback arm for joint arthroplasty bone cuts.',
        hindiSpecification: '0.5 मिलीमीटर की सूक्ष्म सटीकता से केवल खराब हड्डी को काटने वाली रोबोटिक आर्म।',
      },
      {
        name: 'Carl Zeiss Kinevo 900 Robotic Visualization System',
        hindiName: 'कार्ल ज़ीस किनेवो 900 न्यूरो माइक्रोस्कोप',
        specification: '4K 3D digital magnification with robotic point-lock navigation for neurosurgery.',
        hindiSpecification: 'ब्रेन सर्जरी में नसों और ट्यूमर को अत्यधिक बड़ा व स्पष्ट दिखाने वाला आधुनिक माइक्रोस्कोप।',
      },
      {
        name: 'Olympus VISERA ELITE II 4K Laparoscopy Tower',
        hindiName: 'ओलंपस 4K लैप्रोस्कोपी टावर',
        specification: 'Dual-light narrow-band imaging (NBI) identifying micro-vessels during keyhole surgery.',
        hindiSpecification: 'दूरबीन सर्जरी में रक्त वाहिकाओं और अंगों को 4K अल्ट्रा एचडी में दिखाने वाला सिस्टम।',
      },
    ],
    patientInfo: {
      timing: '24 Hours Elective & Emergency Operations',
      hindiTiming: '24 घंटे नियमित एवं आपातकालीन सर्जरी',
      visitingHours: 'Surgical recovery waiting lounge available for family during procedure',
      hindiVisitingHours: 'ऑपरेशन के दौरान परिजनों हेतु आरामदायक वेटिंग लाउंज की सुविधा',
      rules: [
        'Pre-anesthesia checkup (PAC) and fasting instructions (NPO) must be completed before entry',
        'Patients are moved directly to Post-Anesthesia Care Unit (PACU) for monitoring after surgery',
        'Surgeons brief family in person immediately following procedure completion',
      ],
      hindiRules: [
        'ऑपरेशन से पहले बेहोशी डॉक्टर (PAC) की जांच और खाली पेट रहने के नियमों का पालन आवश्यक',
        'ऑपरेशन के बाद मरीज को पूरी तरह होश में आने तक रिकवरी रूम (PACU) में रखा जाता है',
        'सर्जरी पूरी होने के तुरंत बाद मुख्य सर्जन द्वारा परिजनों को व्यक्तिगत रूप से जानकारी दी जाती है',
      ],
      contactNumber: '+91-11-2345-6789',
    },
    relatedDepartmentIds: ['orthopaedics', 'neurology', 'surgery', 'cardiology'],
    relevantDoctorIds: ['dr-rajesh-singh', 'dr-meenakshi-verma', 'dr-vikram-aditya'],
  },
  {
    id: 'radiology-imaging',
    name: 'Radiology & Diagnostic Imaging',
    hindiName: 'रेडियोलॉजी एवं इमेजिंग केंद्र',
    category: 'Diagnostic Infrastructure',
    hindiCategory: 'डायग्नोस्टिक इन्फ्रास्ट्रक्चर',
    badge: '3T Silent MRI | 128-Slice CT',
    hindiBadge: '3 टेस्ला साइलेंट एमआरआई | 128-स्लाइस सीटी',
    icon: 'Radio',
    shortDesc:
      'Comprehensive 24/7 diagnostic imaging centre featuring 3 Tesla wide-bore silent MRI, 128-slice cardiac CT, 4D Doppler ultrasound, and digital mammography.',
    hindiShortDesc:
      '3 टेस्ला साइलेंट एमआरआई, 5 सेकंड में हार्ट सीटी करने वाली 128-स्लाइस सीटी और 4D सोनोग्राफी की 24/7 सुविधा।',
    mainImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
    ],
    overview:
      'The Department of Radiodiagnosis & Imaging at Janhit Hospital is equipped with cutting-edge medical imaging modalities that deliver clinical precision with minimal radiation. Our 3 Tesla MRI features acoustic noise reduction technology and a 70 cm wide bore to eliminate claustrophobia, while our 128-slice CT captures coronary angiograms in under five heartbeats.',
    hindiOverview:
      'जनहित हॉस्पिटल का रेडियोलॉजी एवं इमेजिंग विभाग न्यूनतम रेडिएशन और उच्चतम स्पष्टता वाली जांचें उपलब्ध कराता है। हमारे 3 टेस्ला एमआरआई में आवाज कम करने वाली साइलेंट तकनीक और चौड़ा टनल है जिससे घबराहट नहीं होती। वहीं 128-स्लाइस सीटी स्कैनर मात्र 5 सेकंड में दिल का संपूर्ण स्कैन कर लेता है।',
    purposeAndServices: [
      {
        title: '3 Tesla Silent MRI & Neuro-Tractography',
        hindiTitle: '3 टेस्ला साइलेंट एमआरआई',
        description: 'Brain, spine, joint, and pelvic imaging with high spatial resolution and silent acoustic coils.',
        hindiDescription: 'बिना शोर-शराबे के मस्तिष्क, रीढ़ और जोड़ों की अत्यधिक बारीक 3D स्कैनिंग।',
      },
      {
        title: '128-Slice Low-Dose CT & Angiography',
        hindiTitle: '128-स्लाइस कार्डियक एवं बॉडी सीटी स्कैन',
        description: 'Non-invasive coronary artery angiography, stroke perfusion, and high-resolution chest imaging.',
        hindiDescription: 'बिना तार डाले 5 सेकंड में दिल की नसों की एंजियोग्राफी और फेफड़ों का सीटी स्कैन।',
      },
      {
        title: '4D Sonography & Color Doppler',
        hindiTitle: '4D अल्ट्रासाउंड एवं कलर डॉप्लर',
        description: 'Detailed fetal anomaly scans, peripheral vascular doppler, and guided biopsies.',
        hindiDescription: 'गर्भस्थ शिशु की 4D जांच और नसों में खून के दौरे की डॉप्लर सोनोग्राफी।',
      },
    ],
    equipmentList: [
      {
        name: 'Siemens Magnetom Skyra 3 Tesla MRI Scanner',
        hindiName: 'सीमेंस 3 टेस्ला एमआरआई स्कैनर',
        specification: '70 cm open-bore design, Tim 4G coils, and QuietSuite acoustic reduction technology.',
        hindiSpecification: 'चौड़ा बोर, साइलेंट स्कैनिंग और नसों-हड्डियों की क्रिस्टल-क्लियर तस्वीरें।',
      },
      {
        name: 'GE Revolution ACT 128-Slice Dual-Energy CT',
        hindiName: 'जीई 128-स्लाइस सीटी स्कैनर',
        specification: 'ASiR dose reduction algorithm reducing radiation exposure by up to 82%.',
        hindiSpecification: '82% कम रेडिएशन तकनीक के साथ कुछ ही सेकंड में संपूर्ण शरीर का सीटी स्कैन।',
      },
      {
        name: 'GE Voluson E10 4D Ultrasound System',
        hindiName: 'जीई वोल्यूसन E10 4D अल्ट्रासाउंड',
        specification: 'HDlive silhouette imaging providing lifelike rendering of fetal anatomy.',
        hindiSpecification: 'गर्भस्थ शिशु के विकास और अंगों की स्पष्ट 4D वीडियो सोनोग्राफी।',
      },
    ],
    patientInfo: {
      timing: '24 Hours Emergency & Outpatient Imaging Services',
      hindiTiming: '24 घंटे आपातकालीन एवं ओपीडी जांच सुविधा',
      visitingHours: 'Prior appointment recommended for elective MRI scans to minimize waiting',
      hindiVisitingHours: 'एमआरआई जांच हेतु समय की बचत के लिए पूर्व अपॉइंटमेंट अनुशंसित',
      rules: [
        'All metallic objects, jewellery, and mobile devices must be removed before entering the MRI zone',
        'Inform the radiology team if you have cardiac pacemakers, metallic implants, or are pregnant',
        'Same-day digital report and DICOM image viewing link sent to patient smartphone via SMS',
      ],
      hindiRules: [
        'एमआरआई रूम में जाने से पहले धातु की चीजें, आभूषण और मोबाइल बाहर लॉकर में रखें',
        'यदि शरीर में पेसमेकर या कोई लोहे का इम्प्लांट लगा है, तो डॉक्टर को पहले अवश्य बताएं',
        'जांच की रिपोर्ट और डिजिटल फिल्में उसी दिन मरीज के मोबाइल पर एसएमएस द्वारा उपलब्ध',
      ],
      contactNumber: '+91-11-2345-6789',
    },
    relatedDepartmentIds: ['neurology', 'cardiology', 'orthopaedics', 'oncology'],
    relevantDoctorIds: ['dr-ashok-sharma', 'dr-meenakshi-verma', 'dr-rajesh-singh'],
  },
  {
    id: 'diagnostic-pathology-lab',
    name: '24/7 NABL Pathology & Blood Bank',
    hindiName: '24/7 एनएबीएल पैथोलॉजी व ब्लड बैंक',
    category: 'Laboratory Medicine',
    hindiCategory: 'प्रयोगशाला एवं पैथोलॉजी',
    badge: 'NABL Accredited | 100% Barcoded',
    hindiBadge: 'एनएबीएल मान्यता | 100% बारकोडेड',
    icon: 'TestTube',
    shortDesc:
      'Fully automated clinical pathology laboratory and licensed component blood bank providing biochemistry, hematology, microbiology, and molecular diagnostics.',
    hindiShortDesc:
      'पूर्ण स्वचालित कंप्यूटर चालित पैथोलॉजी लैब और 24/7 ब्लड बैंक, जहां सभी ब्लड टेस्ट बारकोड से सटीक होते हैं।',
    mainImage: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80',
    ],
    overview:
      'The Central Laboratory at Janhit Hospital is accredited by NABL (ISO 15189:2012) and adheres to stringent internal and external quality assurance benchmarks. Operating 24/7 with bi-directional robotic sample analyzers, our pathology service guarantees zero sample misidentification and delivers stat emergency test results within 45 minutes.',
    hindiOverview:
      'जनहित हॉस्पिटल की सेंट्रल लैब भारत के सर्वोच्च गुणवत्ता बोर्ड NABL द्वारा प्रमाणित है। यहां रोबोटिक बारकोड सिस्टम से जांचें होती हैं, जिससे सैंपल बदलने की कोई गुंजाइश नहीं रहती। आपातकालीन खून जांचों की रिपोर्ट मात्र 45 मिनट के भीतर उपलब्ध कराई जाती है।',
    purposeAndServices: [
      {
        title: 'Clinical Biochemistry & Immunoassays',
        hindiTitle: 'क्लीनिकल बायोकेमिस्ट्री एवं हार्मोन जांच',
        description: 'Cardiac enzymes, thyroid profiles, renal panels, tumor markers, and therapeutic drug monitoring.',
        hindiDescription: 'हार्ट अटैक एंजाइम, थायराइड, किडनी-लिवर टेस्ट और कैंसर मार्कर की सटीक जांच।',
      },
      {
        title: 'Automated Hematology & Coagulation',
        hindiTitle: 'ऑटोमेटेड हेमेटोलॉजी एवं खून जमाव जांच',
        description: 'Complete blood counts with 6-part differentials, peripheral smears, and PT/INR assays.',
        hindiDescription: 'सीबीसी (CBC), हीमोग्लोबिन, प्लेटलेट्स और खून पतला होने की जांच।',
      },
      {
        title: 'Licensed Component Blood Bank',
        hindiTitle: 'लाइसेंस प्राप्त कंपोनेंट ब्लड बैंक',
        description: '24/7 voluntary blood banking with separation of packed RBCs, platelets, fresh frozen plasma, and cryoprecipitate.',
        hindiDescription: 'रक्त से पीआरबीसी, प्लेटलेट्स और प्लाज्मा अलग करके सुरक्षित रखने की 24 घंटे सुविधा।',
      },
    ],
    equipmentList: [
      {
        name: 'Roche Cobas 8000 Modular Analyzer Series',
        hindiName: 'रोश कोबास 8000 ऑटोमेटेड एनालाइजर',
        specification: 'Performs up to 4,400 clinical chemistry and immunoassay tests per hour.',
        hindiSpecification: 'प्रति घंटा 4,400 टेस्ट करने वाली दुनिया की सबसे विश्वसनीय पैथोलॉजी मशीन।',
      },
      {
        name: 'Sysmex XN-1000 Automated Hematology Analyzer',
        hindiName: 'सिस्मेक्स XN-1000 ब्लड काउंटर',
        specification: 'Fluorescent flow cytometry for precise platelet and abnormal white cell analysis.',
        hindiSpecification: 'प्लेटलेट्स और श्वेत रक्त कोशिकाओं की सूक्ष्म फ्लो-साइटोमेट्री जांच।',
      },
      {
        name: 'Fenwal Amicus Blood Cell Separator (Apheresis)',
        hindiName: 'फेनवाल सिंगल डोनर प्लेटलेट मशीन',
        specification: 'Automated collection of single donor platelets (SDP) for dengue and oncology patients.',
        hindiSpecification: 'डेंगू और कैंसर मरीजों हेतु डोनर से सीधे केवल प्लेटलेट्स निकालने वाली मशीन।',
      },
    ],
    patientInfo: {
      timing: '24 Hours Sample Collection & Emergency Blood Testing',
      hindiTiming: '24 घंटे ब्लड सैंपल कलेक्शन एवं जांच सुविधा',
      visitingHours: 'Ground floor sample collection counter open round the clock',
      hindiVisitingHours: 'ग्राउंड फ्लोर पर 24 घंटे खुला सैंपल कलेक्शन काउंटर',
      rules: [
        'Fasting requirements (typically 10-12 hours) apply to lipid profiles and fasting glucose',
        'All patient blood vials are barcoded at the bedside in front of the patient',
        'Reports are automatically published to the online patient portal and WhatsApp',
      ],
      hindiRules: [
        'शुगर और कोलेस्ट्रॉल जांच हेतु 10 से 12 घंटे खाली पेट रहना आवश्यक है',
        'मरीज के सामने ही शीशियों पर बारकोड चिपकाया जाता है ताकि कोई गलती न हो',
        'रिपोर्ट तैयार होते ही मरीज के व्हाट्सएप और पोर्टल पर तुरंत पीडीएफ भेजी जाती है',
      ],
      contactNumber: '+91-11-2345-6789',
    },
    relatedDepartmentIds: ['oncology', 'nephrology', 'cardiology'],
    relevantDoctorIds: ['dr-alok-kapoor', 'dr-sanjay-gupta'],
  },
  {
    id: 'inpatient-rooms-wards',
    name: 'Inpatient Suites & General Wards',
    hindiName: 'इनपेशेंट रूम्स, डीलक्स सुइट्स एवं वार्ड',
    category: 'Inpatient Accommodation',
    hindiCategory: 'मरीज आवास एवं भर्ती वार्ड',
    badge: '500+ Beds | Infection-Free Design',
    hindiBadge: '500+ अस्पताल बेड्स | संक्रमण-मुक्त वातावरण',
    icon: 'BedDouble',
    shortDesc:
      'Ergonomically designed patient accommodation ranging from spacious multi-bed care wards to luxury private suites with dedicated attendant amenities.',
    hindiShortDesc:
      'मरीजों के आराम और शीघ्र स्वास्थ्य लाभ हेतु वातानुकूलित जनरल वार्ड, सेमी-प्राइवेट रूम्स और डीलक्स सुइट्स।',
    mainImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
    ],
    overview:
      'Inpatient accommodation at Janhit Hospital is designed with an emphasis on therapeutic comfort, patient safety, and clinical ergonomics. Spread across multi-story hospital wings, accommodation options include economy general wards, twin-sharing semi-private rooms, single executive rooms, and luxury suites equipped with motorized beds and companion sofa-cum-beds.',
    hindiOverview:
      'जनहित हॉस्पिटल में भर्ती मरीजों के रहने की व्यवस्था को अत्यंत आरामदायक और स्वच्छ बनाया गया है। यहां स्वच्छ वातानुकूलित जनरल वार्ड से लेकर ट्विन-शेयरिंग और डीलक्स प्राइवेट रूम्स उपलब्ध हैं। सभी कमरों में मोटराइज्ड इलेक्ट्रिक बेड, अटेंडेंट सोफा-कम-बेड और 24 घंटे समर्पित नर्सिंग कॉल बेल की सुविधा है।',
    purposeAndServices: [
      {
        title: 'Single Private & Deluxe Suites',
        hindiTitle: 'डीलक्स प्राइवेट रूम्स एवं सुइट्स',
        description: 'Spacious private rooms with smart TV, refrigerator, en-suite bathroom, and dedicated attendant sofa-cum-bed.',
        hindiDescription: 'मरीज और परिजन की पूर्ण निजता हेतु टीवी, फ्रिज और अटेंडेंट सोफा युक्त व्यक्तिगत कमरे।',
      },
      {
        title: 'Air-Conditioned Semi-Private & General Wards',
        hindiTitle: 'सेमी-प्राइवेट एवं जनरल वार्ड',
        description: 'Spacious, well-ventilated multi-bed wards with privacy curtains and individual oxygen/suction consoles.',
        hindiDescription: 'पर्दों द्वारा निजता, सेंट्रल ऑक्सीजन और स्वच्छता से परिपूर्ण किफायती इनपेशेंट वार्ड।',
      },
      {
        title: 'Dietitian-Planned Inpatient Meals',
        hindiTitle: 'डाइटिशियन द्वारा प्रमाणित पौष्टिक भोजन',
        description: 'Hygienic, therapeutic meals prepared in our FSSAI-certified kitchen customized to clinical dietary needs.',
        hindiDescription: 'मरीज की बीमारी (डायबिटीज, बीपी, किडनी आदि) के अनुसार तैयार पौष्टिक और स्वादिष्ट भोजन।',
      },
    ],
    equipmentList: [
      {
        name: 'Hill-Rom Centrella Smart Electric Beds',
        hindiName: 'हिल-रोम स्मार्ट इलेक्ट्रिक बेड',
        specification: 'Motorized height and backrest adjustment with built-in bed-exit safety alarm.',
        hindiSpecification: 'रिमोट से उठने-बैठने वाला सुरक्षित इलेक्ट्रिक बेड जो गिरने से बचाता है।',
      },
      {
        name: 'Nurse Call Communication Console',
        hindiName: 'डिजिटल नर्सिंग कॉल सिस्टम',
        specification: 'Instant two-way audio connectivity connecting patient bedside to central nursing desk.',
        hindiSpecification: 'बटन दबाते ही तुरंत नर्स से बात करने और सहायता बुलाने की सुविधा।',
      },
    ],
    patientInfo: {
      timing: '24 Hours Inpatient Care & Nursing',
      hindiTiming: '24 घंटे इनपेशेंट देखभाल व नर्सिंग',
      visitingHours: 'Daily Visiting: 04:00 PM - 07:00 PM (1 visitor at a time with valid pass)',
      hindiVisitingHours: 'दैनिक मुलाकात का समय: शाम 04:00 - 07:00 (पास द्वारा 1 परिजन)',
      rules: [
        'One attendant pass is provided per patient at the time of admission',
        'Outside food is strictly discouraged to maintain clinical dietary compliance',
        'Cashless TPA insurance helpdesk operates on 1st Floor (09:00 AM - 07:00 PM)',
      ],
      hindiRules: [
        'भर्ती के समय मरीज के साथ रहने वाले एक परिजन को अधिकृत अटेंडेंट पास दिया जाता है',
        'मरीज के स्वास्थ्य लाभ हेतु बाहर का खाना लाने पर सख्त मनाही है',
        'कैशलेस टीपीए व बीमा सहायता केंद्र पहली मंजिल पर सुबह 9:00 से शाम 7:00 बजे तक उपलब्ध',
      ],
      contactNumber: '+91-11-2345-6789',
    },
    relatedDepartmentIds: ['cardiology', 'orthopaedics', 'paediatrics'],
    relevantDoctorIds: ['dr-ashok-sharma', 'dr-rajesh-singh', 'dr-sunita-deshmukh'],
  },
  {
    id: 'ambulance-services',
    name: '24/7 Mobile ICU Ambulance Network',
    hindiName: '24/7 एडवांस्ड मोबाइल आईसीयू एम्बुलेंस',
    category: 'Emergency Transport',
    hindiCategory: 'आपातकालीन परिवहन',
    badge: 'Mobile ICU | GPS-Tracked',
    hindiBadge: 'मोबाइल आईसीयू | जीपीएस ट्रैक्ड',
    icon: 'Ambulance',
    shortDesc:
      'Fleet of Advanced Cardiac Life Support (ACLS) and Neonatal Transport ambulances equipped with ventilators, defibrillators, and live telemetry to hospital ER.',
    hindiShortDesc:
      'वेंटिलेटर, डिफाइब्रिलेटर और ट्रेंड पैरामेडिकल स्टाफ से सुसज्जित पहियों पर चलता-फिरता आईसीयू।',
    mainImage: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    ],
    overview:
      'The Janhit Ambulance Network is an advanced mobile intensive care fleet designed to bridge the critical pre-hospital gap. Each ACLS vehicle is manned by certified emergency medical technicians (EMTs) and features transport ventilators, biphasic defibrillators, and live telemetry transmitting vitals to the emergency room while the patient is en route.',
    hindiOverview:
      'जनहित एम्बुलेंस नेटवर्क एक चलता-फिरता अस्पताल है जो मरीज को घर से अस्पताल लाते समय रास्ते में ही जीवनरक्षक उपचार शुरू कर देता है। प्रत्येक एम्बुलेंस में वेंटिलेटर, ऑक्सीजन, डिफाइब्रिलेटर और ट्रेंड इमरजेंसी स्टाफ होता है जो रास्ते में ही अस्पताल के डॉक्टरों को मरीज की नब्ज और ईसीजी भेजता रहता है।',
    purposeAndServices: [
      {
        title: 'Critical Emergency Pickups (Cardiac & Trauma)',
        hindiTitle: 'आपातकालीन मरीज पिकअप (हार्ट अटैक व एक्सीडेंट)',
        description: 'Rapid dispatch within under 10 minutes with live GPS tracking shared with patient family.',
        hindiDescription: 'कॉल आने के 10 मिनट के भीतर जीपीएस ट्रैक्ड एम्बुलेंस की त्वरित रवानगी।',
      },
      {
        title: 'Inter-Hospital Critical Transport',
        hindiTitle: 'एक अस्पताल से दूसरे अस्पताल सुरक्षित शिफ्टिंग',
        description: 'Safe inter-facility transfers for intubated and hemodynamically supported patients.',
        hindiDescription: 'वेंटिलेटर पर चल रहे गंभीर मरीजों की विशेषज्ञ डॉक्टरों की निगरानी में सुरक्षित शिफ्टिंग।',
      },
      {
        title: 'Neonatal Transport Incubator Ambulance',
        hindiTitle: 'नवजात शिशु हेतु विशेष इनक्यूबेटर एम्बुलेंस',
        description: 'Specialized vehicle with transport incubator and infant nitric oxide ventilation.',
        hindiDescription: 'कमजोर नवजात शिशुओं को तापमान और ऑक्सीजन देते हुए सुरक्षित अस्पताल लाने की सुविधा।',
      },
    ],
    equipmentList: [
      {
        name: 'Dräger Oxylog 2000 Plus Transport Ventilator',
        hindiName: 'ड्रैगर ट्रांसपोर्ट वेंटिलेटर',
        specification: 'Rugged portable ventilator with pressure and volume modes suitable for transit.',
        hindiSpecification: 'चलती गाड़ी में भी मरीज को लगातार सुरक्षित सांस देने वाला वेंटिलेटर।',
      },
      {
        name: 'Philips HeartStart MRx Biphasic Defibrillator',
        hindiName: 'फिलिप्स हार्टस्टार्ट डिफाइब्रिलेटर',
        specification: '12-lead ECG monitor and biphasic pacing with wireless transmission to hospital ER.',
        hindiSpecification: 'रास्ते में ही ईसीजी जांच करके अस्पताल की इमरजेंसी टीम को भेजने वाली डिवाइस।',
      },
    ],
    patientInfo: {
      timing: '24 Hours Emergency Dispatch (365 Days)',
      hindiTiming: '24 घंटे एम्बुलेंस सेवा (वर्ष के 365 दिन)',
      visitingHours: 'One family member permitted to accompany patient in front cabin or patient bay',
      hindiVisitingHours: 'मरीज के साथ एक परिजन को एम्बुलेंस में साथ जाने की पूर्ण अनुमति',
      rules: [
        'Dedicated emergency dispatch hotline operates 24/7 with zero call waiting',
        'Live vehicle GPS location link is sent directly to caller smartphone via SMS',
        'Emergency medications and oxygen are initiated on-site by certified paramedics',
      ],
      hindiRules: [
        'एम्बुलेंस हेल्पलाइन पर कॉल करते ही बिना देरी के तुरंत वाहन रवाना किया जाता है',
        'मरीज के परिजनों को एम्बुलेंस की लाइव लोकेशन देखने हेतु एसएमएस लिंक भेजा जाता है',
        'पैरामेडिकल स्टाफ रास्ते में ही ऑक्सीजन और जरूरी दवाएं शुरू कर देता है',
      ],
      contactNumber: '+91-98765-43210',
    },
    relatedDepartmentIds: ['cardiology', 'neurology', 'paediatrics'],
    relevantDoctorIds: ['dr-ashok-sharma', 'dr-sunita-deshmukh'],
  },
  {
    id: 'pharmacy-services',
    name: '24/7 In-House Hospital Pharmacy',
    hindiName: '24/7 इन-हाउस हॉस्पिटल फार्मेसी',
    category: 'Pharmacy & Medical Supplies',
    hindiCategory: 'फार्मेसी एवं दवा सेवाएं',
    badge: '100% Genuine | Cold-Chain Verified',
    hindiBadge: '100% प्रामाणिक दवाएं | कोल्ड-चेन सत्यापित',
    icon: 'Pill',
    shortDesc:
      'Fully stocked computerized pharmacy dispensing 100% verified, temperature-controlled ethical medicines, surgical implants, and critical care injections round the clock.',
    hindiShortDesc:
      '24 घंटे खुली कंप्यूटराइज्ड फार्मेसी, जहां सभी जीवनरक्षक दवाएं, टीके और सर्जिकल सामान उपलब्ध हैं।',
    mainImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    ],
    overview:
      'The 24/7 In-House Pharmacy at Janhit Hospital is managed by certified clinical pharmacists and adheres to national good pharmacy practice standards. Equipped with refrigerated cold-chain storage for vaccines and biologics, our pharmacy maintains a zero-substitute policy, dispensing only doctor-prescribed authentic formulations.',
    hindiOverview:
      'जनहित हॉस्पिटल की इन-हाउस फार्मेसी 24 घंटे सातों दिन खुली रहती है। यहां केवल लाइसेंस प्राप्त फार्मासिस्टों द्वारा डॉक्टर के पर्चे के अनुसार 100% असली और सुरक्षित दवाएं दी जाती हैं। टीकों और इंसुलिन हेतु डिजिटल टेम्परेचर मॉनिटरिंग वाले रेफ्रिजरेटर लगे हैं।',
    purposeAndServices: [
      {
        title: 'Emergency & Critical Care Drug Dispensing',
        hindiTitle: 'इमरजेंसी एवं जीवनरक्षक दवाएं',
        description: 'Instant availability of cardiac emergency, stroke thrombolytic, and intensive care medications.',
        hindiDescription: 'हार्ट अटैक, स्ट्रोक और आईसीयू की अत्यंत दुर्लभ और जरूरी दवाओं की तुरंत उपलब्धता।',
      },
      {
        title: 'Strict Cold-Chain Vaccine Storage',
        hindiTitle: 'कोल्ड-चेन वैक्सीन एवं इंसुलिन स्टोरेज',
        description: '2-8°C digitally logged refrigeration ensuring full biological potency of vaccines and insulins.',
        hindiDescription: '2 से 8 डिग्री सेल्सियस तापमान पर सुरक्षित रखी जाने वाली वैक्सीन और बायोलॉजिकल दवाएं।',
      },
    ],
    equipmentList: [
      {
        name: 'Blue Star Medical Digital Cold-Chain Refrigerators',
        hindiName: 'डिजिटल कोल्ड-चेन रेफ्रिजरेटर',
        specification: 'Continuous automated temperature datalogging with power backup and alarm alerts.',
        hindiSpecification: 'बिजली जाने पर भी तापमान स्थिर रखने वाले विशेष मेडिकल फ्रिज।',
      },
    ],
    patientInfo: {
      timing: '24 Hours Open (Ground Floor Lobby)',
      hindiTiming: '24 घंटे खुली (ग्राउंड फ्लोर लॉबी)',
      visitingHours: 'Open round the clock for outpatients and hospital visitors',
      hindiVisitingHours: 'ओपीडी मरीजों और आम जनता हेतु 24 घंटे खुली',
      rules: [
        'A valid doctor prescription is mandatory for dispensing Schedule H and H1 medications',
        'Computerized printed GST tax invoice provided for all purchases for insurance reimbursement',
        'Inpatient medicine delivery directly to ward bedside by pharmacy assistants',
      ],
      hindiRules: [
        'शेड्यूल एच दवाओं हेतु डॉक्टर का अधिकृत पर्चा दिखाना अनिवार्य है',
        'बीमा क्लेम और टैक्स छूट हेतु कंप्यूटर द्वारा मुद्रित पक्का बिल दिया जाता है',
        'भर्ती मरीजों को दवाएं सीधे उनके कमरे में पहुंचाने की सुविधा उपलब्ध',
      ],
      contactNumber: '+91-11-2345-6789',
    },
    relatedDepartmentIds: ['oncology', 'cardiology', 'paediatrics'],
    relevantDoctorIds: ['dr-alok-kapoor', 'dr-ashok-sharma'],
  },
  {
    id: 'patient-waiting-amenities',
    name: 'Patient Amenities & Waiting Lounges',
    hindiName: 'मरीज सहायता लाउंज एवं प्रतीक्षा क्षेत्र',
    category: 'Hospitality & Patient Experience',
    hindiCategory: 'आतिथ्य एवं मरीज सुविधा',
    badge: 'Spacious & Clean | Wi-Fi Enabled',
    hindiBadge: 'विशाल, स्वच्छ एवं वाई-फाई युक्त',
    icon: 'Building2',
    shortDesc:
      'Spacious, air-conditioned waiting lounges featuring electronic token queue displays, complimentary high-speed Wi-Fi, hygienic cafeteria, and wheelchair accessibility.',
    hindiShortDesc:
      'आरामदायक सोफे, डिजिटल टोकन स्क्रीन, कैफेटेरिया और व्हीलचेयर रैंप से सुसज्जित शांत प्रतीक्षा क्षेत्र।',
    mainImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    ],
    overview:
      'Patient comfort, dignity, and stress reduction are at the heart of Janhit Hospital’s infrastructure. Our multi-floor waiting lounges are equipped with digital token queue screens that eliminate crowded queues, soothing natural lighting, complimentary high-speed Wi-Fi, drinking water stations, and an FSSAI-certified multi-cuisine cafeteria.',
    hindiOverview:
      'अस्पताल में आने वाले मरीजों और उनके परिजनों की सुविधा हेतु हमारे प्रतीक्षा क्षेत्रों को अत्यधिक शांत और विशाल बनाया गया है। यहां डिजिटल टोकन स्क्रीन से नंबर पुकारा जाता है जिससे कतार में खड़े रहने की आवश्यकता नहीं होती। स्वच्छ पेयजल, कैफेटेरिया और व्हीलचेयर की उत्तम व्यवस्था है।',
    purposeAndServices: [
      {
        title: 'Digital Token Queue Management',
        hindiTitle: 'डिजिटल टोकन कतार प्रबंधन',
        description: 'Large LED screens and bilingual audio announcements updating patients on their consultation turn.',
        hindiDescription: 'स्क्रीन और आवाज द्वारा मरीज का नंबर पुकारने की स्वचालित आधुनिक व्यवस्था।',
      },
      {
        title: 'Universal Wheelchair & Stretcher Accessibility',
        hindiTitle: 'व्हीलचेयर एवं सुगम रैंप सुविधा',
        description: 'Zero-step entrance ramps, wide elevators, and complimentary wheelchairs at entrance gate.',
        hindiDescription: 'बुजुर्गों और चलने में असमर्थ मरीजों हेतु प्रवेश द्वार पर ही व्हीलचेयर और बड़े लिफ्ट्स।',
      },
      {
        title: 'Hygienic 24/7 Cafeteria & Beverage Kiosk',
        hindiTitle: 'कैफेटेरिया एवं जलपान गृह',
        description: 'Nutritious hot meals, fresh juices, and packaged healthy snacks for visitors.',
        hindiDescription: 'परिजनों हेतु स्वच्छ, पौष्टिक भोजन, चाय-कॉफी और ताजे फलों के जूस की सुविधा।',
      },
    ],
    equipmentList: [
      {
        name: 'Digital LED Queue Display Terminals',
        hindiName: 'एलईडी कतार डिस्प्ले टर्मिनल',
        specification: 'Smart hospital management software sync providing live OPD estimated wait times.',
        hindiSpecification: 'डॉक्टर के कक्ष के बाहर मरीज का नंबर और प्रतीक्षा समय दिखाने वाली स्क्रीन।',
      },
    ],
    patientInfo: {
      timing: 'Open Daily (07:00 AM - 09:00 PM for OPD Visitors)',
      hindiTiming: 'प्रतिदिन सुबह 07:00 से रात 09:00 बजे तक',
      visitingHours: 'Free open access for all patients and visiting family members',
      hindiVisitingHours: 'सभी मरीजों और परिजनों हेतु खुला व निःशुल्क',
      rules: [
        'Free high-speed patient Wi-Fi connectivity available across all lounges',
        'Smoking, spitting, and tobacco use are strictly prohibited inside hospital premises',
        'Helpdesk executives available at ground lobby to assist elderly or differently-abled visitors',
      ],
      hindiRules: [
        'परिसर में सभी मरीजों हेतु मुफ्त हाई-स्पीड वाई-फाई इंटरनेट उपलब्ध',
        'अस्पताल परिसर में बीड़ी, सिगरेट या तंबाकू का सेवन सख्त वर्जित एवं दंडनीय है',
        'बुजुर्गों और दिव्यांगजनों की सहायता हेतु स्वागत कक्ष पर समर्पित कर्मचारी तत्पर',
      ],
      contactNumber: '+91-11-2345-6789',
    },
    relatedDepartmentIds: ['cardiology', 'neurology', 'orthopaedics'],
    relevantDoctorIds: ['dr-ashok-sharma', 'dr-meenakshi-verma'],
  },
];

