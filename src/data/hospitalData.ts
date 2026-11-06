export * from './departmentsData';
export * from './treatmentsData';
export * from './facilitiesData';

export interface Specialty {
  id: string;
  title: string;
  hindiTitle: string;
  description: string;
  hindiDescription: string;
  icon: string;
  stats: string;
  image?: string;
  path: string;
}

export interface Metric {
  id: string;
  value: string;
  label: string;
  hindiLabel: string;
  description: string;
}

export interface DoctorSchedule {
  day: string;
  hindiDay: string;
  time: string;
  hindiTime: string;
  room: string;
}

export interface Doctor {
  id: string;
  name: string;
  hindiName: string;
  qualifications: string;
  specialization: string;
  hindiSpecialization: string;
  department: string;
  hindiDepartment: string;
  departmentId: string;
  experienceYears: number;
  experience: string;
  hindiExperience: string;
  designation: string;
  hindiDesignation: string;
  image: string;
  bio: string;
  hindiBio: string;
  expertise: string[];
  hindiExpertise: string[];
  languagesSpoken: string[];
  hindiLanguagesSpoken: string[];
  opdTimings: string;
  hindiOpdTimings: string;
  schedule: DoctorSchedule[];
  availabilityDays: string[];
  isAvailableToday?: boolean;
}

export interface InfrastructureItem {
  id: string;
  title: string;
  hindiTitle: string;
  category: string;
  hindiCategory: string;
  description: string;
  hindiDescription: string;
  specifications: string[];
  hindiSpecifications: string[];
  image: string;
  badge: string;
}

export interface WhyChooseUsItem {
  id: string;
  icon: string;
  title: string;
  hindiTitle: string;
  description: string;
  hindiDescription: string;
  stat?: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  hindiPatientName: string;
  department: string;
  hindiDepartment: string;
  treatment: string;
  hindiTreatment: string;
  rating: number;
  review: string;
  hindiReview: string;
  date: string;
  verified: boolean;
  avatar: string;
}

export interface HealthArticle {
  id: string;
  slug: string;
  title: string;
  hindiTitle: string;
  excerpt: string;
  hindiExcerpt: string;
  category: string;
  hindiCategory: string;
  readTime: string;
  hindiReadTime: string;
  date: string;
  doctorAuthor: string;
  hindiDoctorAuthor: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  hindiTitle: string;
  category: string;
  hindiCategory: string;
  image: string;
  isVideo?: boolean;
}

export interface HistoryMilestone {
  year: string;
  title: string;
  hindiTitle: string;
  description: string;
  hindiDescription: string;
  badge: string;
  hindiBadge: string;
  highlightStat?: string;
}

export interface CoreValue {
  id: string;
  letter: string;
  title: string;
  hindiTitle: string;
  description: string;
  hindiDescription: string;
  icon: string;
}

export interface LeaderProfile {
  id: string;
  name: string;
  hindiName: string;
  designation: string;
  hindiDesignation: string;
  qualifications: string;
  bio: string;
  hindiBio: string;
  image: string;
  badge: string;
}

export interface DetailedAccreditation {
  id: string;
  name: string;
  title: string;
  hindiTitle: string;
  issuingBody: string;
  validity: string;
  description: string;
  hindiDescription: string;
  scope: string[];
  hindiScope: string[];
  icon: string;
}

export interface InstitutionalAchievement {
  id: string;
  metric: string;
  title: string;
  hindiTitle: string;
  description: string;
  hindiDescription: string;
  icon: string;
}

export const HOSPITAL_METRICS: Metric[] = [
  {
    id: 'beds',
    value: '500+',
    label: 'Hospital Beds & Critical ICUs',
    hindiLabel: 'अस्पताल बेड एवं क्रिटिकल आईसीयू',
    description: 'Ultra-clean positive pressure suites & isolation rooms',
  },
  {
    id: 'doctors',
    value: '120+',
    label: 'Senior Consultants & Specialists',
    hindiLabel: 'वरिष्ठ विशेषज्ञ एवं सर्जन',
    description: 'AIIMS, PGI and internationally trained clinical faculty',
  },
  {
    id: 'surgeries',
    value: '25,000+',
    label: 'Successful Major Surgeries',
    hindiLabel: 'सफल प्रमुख सर्जिकल प्रक्रियाएं',
    description: 'Robotic, cardiac bypass, neuro & joint replacements',
  },
  {
    id: 'satisfaction',
    value: '99.4%',
    label: 'Patient Trust & Satisfaction',
    hindiLabel: 'मरीजों का विश्वास व संतुष्टि',
    description: 'Third-party audited clinical and nursing feedback',
  },
];

export const HOSPITAL_SPECIALTIES: Specialty[] = [
  {
    id: 'cardiology',
    title: 'Cardiology & Heart Care',
    hindiTitle: 'कार्डियोलॉजी एवं हृदय रोग',
    description: 'State-of-the-art Philips Azurion biplane Cath Lab, 24/7 Primary PCI, EP studies, and robotic bypass surgery.',
    hindiDescription: 'अत्याधुनिक फिलिप्स बाइप्लेन कैथ लैब, 24/7 प्राइमरी एंजियोप्लास्टी, ईपी स्टडीज और बायपास सर्जरी।',
    icon: 'HeartPulse',
    stats: '15,000+ Interventions',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    path: '/departments/cardiology',
  },
  {
    id: 'neurology',
    title: 'Neurology & Neuro Surgery',
    hindiTitle: 'न्यूरोलॉजी एवं मस्तिष्क रोग',
    description: 'Rapid 15-minute stroke triage, neuro-endoscopy, brain tumor microsurgery, and robotic spine navigation.',
    hindiDescription: '15 मिनट में स्ट्रोक ट्राइएज, न्यूरो-एंडोस्कोपी, ब्रेन ट्यूमर माइक्रो-सर्जरी और स्पाइन नेविगेशन।',
    icon: 'Brain',
    stats: '24/7 Stroke Unit',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80',
    path: '/departments/neurology',
  },
  {
    id: 'orthopaedics',
    title: 'Orthopaedics & Robotic Surgery',
    hindiTitle: 'हड्डी एवं जोड़ रोग (ऑर्थोपेडिक्स)',
    description: 'Mako robotic-assisted total knee and hip arthroplasty, arthroscopic ligament repair, and complex trauma.',
    hindiDescription: 'माको (Mako) रोबोटिक नी व हिप रिप्लेसमेंट, आर्थ्रोस्कोपिक लिगामेंट सर्जरी एवं फ्रैक्चर केयर।',
    icon: 'Bone',
    stats: '8,000+ Joint Surgeries',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    path: '/departments/orthopaedics',
  },
  {
    id: 'oncology',
    title: 'Comprehensive Cancer Centre',
    hindiTitle: 'कैंसर रोग एवं ऑन्कोलॉजी',
    description: 'Multidisciplinary tumor board, high-precision TrueBeam radiation, day care chemotherapy, and immunotherapy.',
    hindiDescription: 'ट्यूमर बोर्ड, ट्रू-बीम रेडिएशन थेरेपी, डे-केयर कीमोथेरेपी और आधुनिक इम्यूनोथेरेपी।',
    icon: 'Activity',
    stats: 'NABH Oncology Centre',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    path: '/departments/oncology',
  },
  {
    id: 'paediatrics',
    title: 'Paediatrics & Neonatal Care (NICU)',
    hindiTitle: 'बाल रोग एवं नवजात शिशु गहन चिकित्सा',
    description: 'Level-III tertiary neonatal ICU, pediatric cardiac intensive care, developmental assessment, and vaccination.',
    hindiDescription: 'लेवल-III एनआईसीयू (NICU), बाल हृदय रोग चिकित्सा और शिशु स्वास्थ्य टीकाकरण क्लिनिक।',
    icon: 'Baby',
    stats: 'Level-III NICU',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    path: '/departments/paediatrics',
  },
  {
    id: 'gastroenterology',
    title: 'Gastroenterology & Hepatology',
    hindiTitle: 'गैस्ट्रोएंटरोलॉजी एवं लिवर रोग',
    description: 'High-definition video endoscopy, colonoscopy, ERCP for bile duct stones, and fatty liver clinic.',
    hindiDescription: 'एचडी वीडियो एंडोस्कोपी, कोलोनोस्कोपी, ईआरसीपी (ERCP) एवं हेपेटाइटिस व लिवर केयर क्लिनिक।',
    icon: 'Stethoscope',
    stats: '12,000+ Endoscopies',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    path: '/departments/gastroenterology',
  },
];

export const ALL_DOCTORS: Doctor[] = [
  {
    id: 'dr-ashok-sharma',
    name: 'Dr. Ashok Sharma',
    hindiName: 'डॉ. अशोक शर्मा',
    qualifications: 'MBBS, MD (Medicine), DM (Cardiology), FACC (USA)',
    specialization: 'Director & Chief Interventional Cardiologist',
    hindiSpecialization: 'निदेशक एवं मुख्य इंटरवेंशनल कार्डियोलॉजिस्ट',
    department: 'Cardiology & Heart Care',
    hindiDepartment: 'कार्डियोलॉजी एवं हृदय रोग विभाग',
    departmentId: 'cardiology',
    experienceYears: 24,
    experience: '24+ Years Experience',
    hindiExperience: '24+ वर्ष का अनुभव',
    designation: 'Director & Head of Department',
    hindiDesignation: 'निदेशक एवं विभागाध्यक्ष',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Ashok Sharma is an internationally recognized interventional cardiologist with over two decades of clinical leadership in complex coronary angioplasty, transcatheter aortic valve replacement (TAVR), and heart failure management. Prior to establishing the cardiac sciences centre at Janhit Hospital, Dr. Sharma served as senior faculty at premier medical institutes, championing zero-delay 24/7 Primary PCI protocols for acute heart attack patients.',
    hindiBio: 'डॉ. अशोक शर्मा दो दशकों से अधिक के अनुभव वाले भारत के विख्यात इंटरवेंशनल कार्डियोलॉजिस्ट हैं। वे जटिल कोरोनरी एंजियोप्लास्टी, टीएवीआर (TAVR) और हार्ट फेलियर मैनेजमेंट में विशेषज्ञता रखते हैं। जनहित हॉस्पिटल के कार्डियक साइंसेज सेंटर के प्रमुख के रूप में उन्होंने 24/7 इमरजेंसी एंजियोप्लास्टी का शून्य-विलंब प्रोटोकॉल स्थापित किया है।',
    expertise: [
      'Complex Coronary Angioplasty (PCI)',
      'Rotablation & IVUS Guided Stenting',
      'TAVR & Structural Heart Interventions',
      'Permanent Pacemaker & ICD Implantation',
      'Preventive Cardiology & Heart Failure Care',
    ],
    hindiExpertise: [
      'जटिल कोरोनरी एंजियोप्लास्टी (PCI)',
      'रोटाब्लेशन एवं इंट्रावैस्कुलर अल्ट्रासाउंड (IVUS)',
      'टीएवीआर (TAVR) वाल्व रिप्लेसमेंट',
      'पेसमेकर एवं आईसीडी इम्प्लांटेशन',
      'हार्ट फेलियर एवं प्रिवेंटिव कार्डियोलॉजी',
    ],
    languagesSpoken: ['Hindi', 'English'],
    hindiLanguagesSpoken: ['हिंदी', 'अंग्रेज़ी'],
    opdTimings: 'Mon, Wed, Fri: 10:00 AM - 02:00 PM',
    hindiOpdTimings: 'सोम, बुध, शुक्र: सुबह 10:00 - दोपहर 02:00',
    schedule: [
      { day: 'Monday', hindiDay: 'सोमवार', time: '10:00 AM - 02:00 PM', hindiTime: 'सुबह 10:00 - दोपहर 02:00', room: 'OPD Suite 101 (Cath Lab Block)' },
      { day: 'Wednesday', hindiDay: 'बुधवार', time: '10:00 AM - 02:00 PM', hindiTime: 'सुबह 10:00 - दोपहर 02:00', room: 'OPD Suite 101 (Cath Lab Block)' },
      { day: 'Friday', hindiDay: 'शुक्रवार', time: '10:00 AM - 02:00 PM', hindiTime: 'सुबह 10:00 - दोपहर 02:00', room: 'OPD Suite 101 (Cath Lab Block)' },
    ],
    availabilityDays: ['Monday', 'Wednesday', 'Friday'],
    isAvailableToday: true,
  },
  {
    id: 'dr-meenakshi-verma',
    name: 'Dr. Meenakshi Verma',
    hindiName: 'डॉ. मीनाक्षी वर्मा',
    qualifications: 'MBBS, MS (Neuro Surgery), MCh (AIIMS), FINR (Zurich)',
    specialization: 'Head, Brain & Spine Neuro Surgery',
    hindiSpecialization: 'विभागाध्यक्ष, मस्तिष्क एवं स्पाइन न्यूरो सर्जरी',
    department: 'Neurology & Neuro Surgery',
    hindiDepartment: 'न्यूरोलॉजी एवं मस्तिष्क रोग विभाग',
    departmentId: 'neurology',
    experienceYears: 19,
    experience: '19+ Years Experience',
    hindiExperience: '19+ वर्ष का अनुभव',
    designation: 'Head & Chief Neurosurgeon',
    hindiDesignation: 'विभागाध्यक्ष एवं मुख्य न्यूरोसर्जन',
    image: 'https://images.unsplash.com/photo-1594824813579-4d6b5e028b34?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Meenakshi Verma is an accomplished neurosurgeon trained at AIIMS New Delhi and the University Hospital Zurich. She specializes in minimally invasive brain tumor resections, awake craniotomies, endoscopic skull-base surgery, and robotic spine navigation. Dr. Verma leads Janhit Hospital’s rapid 15-minute stroke resuscitation team and comprehensive neuro-critical care unit.',
    hindiBio: 'डॉ. मीनाक्षी वर्मा एम्स नई दिल्ली और यूनिवर्सिटी हॉस्पिटल ज्यूरिख से प्रशिक्षित प्रमुख न्यूरोसर्जन हैं। वे जटिल ब्रेन ट्यूमर माइक्रो-सर्जरी, एंडोस्कोपिक स्कल बेस सर्जरी और स्पाइन नेविगेशन में पारंगत हैं। जनहित हॉस्पिटल में वे 15-मिनट स्ट्रोक रेस्क्यू यूनिट और न्यूरो-क्रिटिकल केयर का नेतृत्व करती हैं।',
    expertise: [
      'Minimally Invasive Brain Tumor Surgery',
      'Micro-Vascular Spine Decompression',
      'Endoscopic Pituitary & Skull Base Surgery',
      'Acute Ischemic Stroke Mechanical Thrombectomy',
      'Pediatric Neuro Surgery & Hydrocephalus',
    ],
    hindiExpertise: [
      'माइक्रो-सर्जिकल ब्रेन ट्यूमर ऑपरेशन',
      'रोबोटिक स्पाइन डीकंप्रेशन एवं डिस्क रिपेयर',
      'एंडोस्कोपिक स्कल बेस सर्जरी',
      'तीव्र स्ट्रोक मैकेनिकल थ्रोम्बेक्टोमी',
      'बाल न्यूरो सर्जरी एवं हाइड्रोसेफालस',
    ],
    languagesSpoken: ['Hindi', 'English', 'German'],
    hindiLanguagesSpoken: ['हिंदी', 'अंग्रेज़ी', 'जर्मन'],
    opdTimings: 'Tue, Thu, Sat: 09:30 AM - 01:30 PM',
    hindiOpdTimings: 'मंगल, गुरु, शनि: सुबह 09:30 - दोपहर 01:30',
    schedule: [
      { day: 'Tuesday', hindiDay: 'मंगलवार', time: '09:30 AM - 01:30 PM', hindiTime: 'सुबह 09:30 - दोपहर 01:30', room: 'OPD Suite 205 (Neuro Sciences)' },
      { day: 'Thursday', hindiDay: 'गुरुवार', time: '09:30 AM - 01:30 PM', hindiTime: 'सुबह 09:30 - दोपहर 01:30', room: 'OPD Suite 205 (Neuro Sciences)' },
      { day: 'Saturday', hindiDay: 'शनिवार', time: '09:30 AM - 01:30 PM', hindiTime: 'सुबह 09:30 - दोपहर 01:30', room: 'OPD Suite 205 (Neuro Sciences)' },
    ],
    availabilityDays: ['Tuesday', 'Thursday', 'Saturday'],
    isAvailableToday: true,
  },
  {
    id: 'dr-rajesh-singh',
    name: 'Dr. Rajesh Singh',
    hindiName: 'डॉ. राजेश सिंह',
    qualifications: 'MBBS, MS (Ortho), Fellowship in Robotic Arthroplasty (Germany)',
    specialization: 'Director & Senior Robotic Joint Replacement Surgeon',
    hindiSpecialization: 'निदेशक एवं वरिष्ठ रोबोटिक जॉइंट रिप्लेसमेंट सर्जन',
    department: 'Orthopaedics & Joint Care',
    hindiDepartment: 'हड्डी एवं जोड़ रोग (ऑर्थोपेडिक्स)',
    departmentId: 'orthopaedics',
    experienceYears: 21,
    experience: '21+ Years Experience',
    hindiExperience: '21+ वर्ष का अनुभव',
    designation: 'Director, Institute of Bone & Joint Sciences',
    hindiDesignation: 'निदेशक, अस्थि एवं जोड़ रोग संस्थान',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Rajesh Singh is a pioneer in computer-navigated and Mako robotic-assisted total knee and hip arthroplasty with over 8,000 successful joint replacements. Trained in Germany and the UK, he specializes in rapid-recovery joint reconstruction protocols allowing patients to walk within hours of surgery with minimal tissue trauma and fast rehabilitation.',
    hindiBio: 'डॉ. राजेश सिंह कंप्यूटर-नेविगेटेड और माको (Mako) रोबोटिक नी व हिप रिप्लेसमेंट के प्रख्यात विशेषज्ञ हैं। उन्होंने 8,000 से अधिक सफल जॉइंट रिप्लेसमेंट किए हैं। जर्मनी और यूके से प्रशिक्षित डॉ. सिंह न्यूनतम चीरे और तीव्र रिकवरी प्रोटोकॉल के साथ मरीजों को ऑपरेशन के कुछ ही घंटों में चलने में सक्षम बनाते हैं।',
    expertise: [
      'Mako Robotic Total Knee & Hip Replacement',
      'Direct Anterior Muscle-Sparing Hip Arthroplasty',
      'Complex Revision Joint Surgeries',
      'Arthroscopic ACL & Sports Ligament Reconstruction',
      'Polytrauma & Complex Pelvic Fractures',
    ],
    hindiExpertise: [
      'माको रोबोटिक नी व हिप रिप्लेसमेंट',
      'डायरेक्ट एंटीरियर हिप रिप्लेसमेंट',
      'रिवीजन जॉइंट रिप्लेसमेंट सर्जरी',
      'दूरबीन द्वारा एसीएल लिगामेंट रिपेयर',
      'गंभीर फ्रैक्चर एवं ट्रॉमा सर्जरी',
    ],
    languagesSpoken: ['Hindi', 'English', 'Punjabi'],
    hindiLanguagesSpoken: ['हिंदी', 'अंग्रेज़ी', 'पंजाबी'],
    opdTimings: 'Mon to Sat: 11:00 AM - 04:00 PM',
    hindiOpdTimings: 'सोम से शनि: सुबह 11:00 - शाम 04:00',
    schedule: [
      { day: 'Monday to Saturday', hindiDay: 'सोमवार से शनिवार', time: '11:00 AM - 04:00 PM', hindiTime: 'सुबह 11:00 - शाम 04:00', room: 'OPD Suite 312 (Orthopaedics)' },
    ],
    availabilityDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    isAvailableToday: true,
  },
  {
    id: 'dr-sunita-deshmukh',
    name: 'Dr. Sunita Deshmukh',
    hindiName: 'डॉ. सुनीता देशमुख',
    qualifications: 'MBBS, MD (Paediatrics), Fellowship Neonatology (IAP, UK)',
    specialization: 'Director of Neonatal & Child Critical Care (NICU)',
    hindiSpecialization: 'निदेशक, नवजात शिशु गहन चिकित्सा (NICU)',
    department: 'Paediatrics & Neonatal Care (NICU)',
    hindiDepartment: 'शिशु एवं बाल रोग विभाग',
    departmentId: 'paediatrics',
    experienceYears: 18,
    experience: '18+ Years Experience',
    hindiExperience: '18+ वर्ष का अनुभव',
    designation: 'Director & Chief Paediatrician',
    hindiDesignation: 'निदेशक एवं मुख्य बाल रोग विशेषज्ञ',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Sunita Deshmukh has dedicated eighteen years to newborn survival and pediatric critical care. As the Director of Janhit Hospital\'s Level-3 tertiary NICU, she has successfully cared for extremely low birth weight preemies (< 600g). Her clinical acumen spans advanced high-frequency oscillatory ventilation, therapeutic hypothermia for neonatal asphyxia, and childhood developmental screenings.',
    hindiBio: 'डॉ. सुनीता देशमुख नवजात शिशु जीवनरक्षा और बाल रोग गहन चिकित्सा की प्रसिद्ध विशेषज्ञ हैं। जनहित हॉस्पिटल के लेवल-3 एनआईसीयू (NICU) की निदेशक के रूप में उन्होंने 600 ग्राम से भी कम वजन वाले अत्यंत संवेदनशील नवजात शिशुओं की जान बचाई है।',
    expertise: [
      'Extreme Prematurity & Low Birth Weight Care',
      'High-Frequency Oscillatory Ventilation',
      'Neonatal Therapeutic Hypothermia',
      'Pediatric Asthma & Allergy Management',
      'Developmental Milestone & Vaccination Guidance',
    ],
    hindiExpertise: [
      'अत्यंत कम वजन वाले नवजात शिशुओं की देखभाल',
      'उच्च-आवृत्ति वेंटिलेटर सपोर्ट',
      'हाइपोथर्मिया थेरेपी',
      'बाल अस्थमा व एलर्जी उपचार',
      'शिशु टीकाकरण एवं समग्र विकास परामर्श',
    ],
    languagesSpoken: ['Hindi', 'English', 'Marathi'],
    hindiLanguagesSpoken: ['हिंदी', 'अंग्रेज़ी', 'मराठी'],
    opdTimings: 'Mon, Tue, Thu, Fri: 10:00 AM - 02:00 PM',
    hindiOpdTimings: 'सोम, मंगल, गुरु, शुक्र: सुबह 10:00 - दोपहर 02:00',
    schedule: [
      { day: 'Monday', hindiDay: 'सोमवार', time: '10:00 AM - 02:00 PM', hindiTime: 'सुबह 10:00 - दोपहर 02:00', room: 'OPD Suite 118 (Mother & Child Block)' },
      { day: 'Tuesday', hindiDay: 'मंगलवार', time: '10:00 AM - 02:00 PM', hindiTime: 'सुबह 10:00 - दोपहर 02:00', room: 'OPD Suite 118 (Mother & Child Block)' },
      { day: 'Thursday', hindiDay: 'गुरुवार', time: '10:00 AM - 02:00 PM', hindiTime: 'सुबह 10:00 - दोपहर 02:00', room: 'OPD Suite 118 (Mother & Child Block)' },
      { day: 'Friday', hindiDay: 'शुक्रवार', time: '10:00 AM - 02:00 PM', hindiTime: 'सुबह 10:00 - दोपहर 02:00', room: 'OPD Suite 118 (Mother & Child Block)' },
    ],
    availabilityDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    isAvailableToday: true,
  },
  {
    id: 'dr-alok-kapoor',
    name: 'Dr. Alok Kapoor',
    hindiName: 'डॉ. आलोक कपूर',
    qualifications: 'MBBS, MD (Medicine), DM (Medical Oncology, Tata Memorial Hospital)',
    specialization: 'Chief Medical Oncologist & Director Cancer Services',
    hindiSpecialization: 'मुख्य मेडिकल ऑन्कोलॉजिस्ट एवं निदेशक कैंसर सेवाएं',
    department: 'Comprehensive Cancer Centre',
    hindiDepartment: 'कैंसर रोग एवं ऑन्कोलॉजी विभाग',
    departmentId: 'oncology',
    experienceYears: 17,
    experience: '17+ Years Experience',
    hindiExperience: '17+ वर्ष का अनुभव',
    designation: 'Director, Medical Oncology & Immunotherapy',
    hindiDesignation: 'निदेशक, मेडिकल ऑन्कोलॉजी एवं इम्यूनोथेरेपी',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Alok Kapoor is a premier medical oncologist who trained at Tata Memorial Centre, Mumbai. With 17+ years of experience, Dr. Kapoor is an authority in precision targeted therapies, next-generation immunotherapy, and molecular oncology. He heads Janhit Hospital\'s multidisciplinary Tumor Board ensuring every cancer patient receives a customized, evidence-based treatment blueprint.',
    hindiBio: 'डॉ. आलोक कपूर टाटा मेमोरियल हॉस्पिटल मुंबई से प्रशिक्षित शीर्ष मेडिकल ऑन्कोलॉजिस्ट हैं। 17+ वर्षों के अनुभव के साथ वे टारगेटेड थेरेपी, इम्यूनोथेरेपी और मॉलिक्यूलर ऑन्कोलॉजी के विशेषज्ञ हैं। वे अस्पताल के मल्टी-डिसीप्लिनरी ट्यूमर बोर्ड का नेतृत्व करते हैं।',
    expertise: [
      'Targeted Molecular Therapy & Immunotherapy',
      'Breast, Lung & Gastrointestinal Malignancies',
      'Autologous Stem Cell Transplantation',
      'Chemotherapy Infusion Protocols',
      'Multidisciplinary Tumor Board Consultation',
    ],
    hindiExpertise: [
      'टारगेटेड मॉलिक्यूलर एवं इम्यूनोथेरेपी',
      'ब्रेस्ट, फेफड़े एवं पेट के कैंसर का उपचार',
      'ऑटोलॉगस स्टेम सेल ट्रांसप्लांट',
      'डे-केयर कीमोथेरेपी प्रोटोकॉल',
      'मल्टी-डिसीप्लिनरी ट्यूमर बोर्ड परामर्श',
    ],
    languagesSpoken: ['Hindi', 'English'],
    hindiLanguagesSpoken: ['हिंदी', 'अंग्रेज़ी'],
    opdTimings: 'Mon, Wed, Sat: 10:30 AM - 03:00 PM',
    hindiOpdTimings: 'सोम, बुध, शनि: सुबह 10:30 - दोपहर 03:00',
    schedule: [
      { day: 'Monday', hindiDay: 'सोमवार', time: '10:30 AM - 03:00 PM', hindiTime: 'सुबह 10:30 - दोपहर 03:00', room: 'OPD Suite 402 (Cancer Centre)' },
      { day: 'Wednesday', hindiDay: 'बुधवार', time: '10:30 AM - 03:00 PM', hindiTime: 'सुबह 10:30 - दोपहर 03:00', room: 'OPD Suite 402 (Cancer Centre)' },
      { day: 'Saturday', hindiDay: 'शनिवार', time: '10:30 AM - 03:00 PM', hindiTime: 'सुबह 10:30 - दोपहर 03:00', room: 'OPD Suite 402 (Cancer Centre)' },
    ],
    availabilityDays: ['Monday', 'Wednesday', 'Saturday'],
    isAvailableToday: true,
  },
  {
    id: 'dr-priya-nair',
    name: 'Dr. Priya Nair',
    hindiName: 'डॉ. प्रिया नायर',
    qualifications: 'MBBS, MD (Internal Medicine), DM (Gastroenterology, SGPGI Lucknow)',
    specialization: 'Senior Consultant Gastroenterologist & Hepatologist',
    hindiSpecialization: 'वरिष्ठ गैस्ट्रोएंटरोलॉजिस्ट एवं लिवर रोग विशेषज्ञ',
    department: 'Gastroenterology & Hepatology',
    hindiDepartment: 'गैस्ट्रोएंटरोलॉजी एवं लिवर रोग विभाग',
    departmentId: 'gastroenterology',
    experienceYears: 15,
    experience: '15+ Years Experience',
    hindiExperience: '15+ वर्ष का अनुभव',
    designation: 'Senior Consultant - Digestive & Liver Diseases',
    hindiDesignation: 'वरिष्ठ कंसल्टेंट - पाचन एवं लिवर रोग',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Priya Nair is an expert gastroenterologist and hepatologist trained at the prestigious Sanjay Gandhi Postgraduate Institute of Medical Sciences (SGPGIMS). She has performed over 12,000 endoscopic procedures, specializing in diagnostic and therapeutic colonoscopies, ERCP for complex bile duct stones, endoscopic ultrasound (EUS), and chronic liver disease management.',
    hindiBio: 'डॉ. प्रिया नायर एसजीपीजीआई लखनऊ से प्रशिक्षित विख्यात गैस्ट्रोएंटरोलॉजिस्ट व लिवर विशेषज्ञ हैं। उन्होंने 12,000 से अधिक एंडोस्कोपिक प्रक्रियाएं की हैं। वे पित्त की थैली व नली की पथरी निकालने (ERCP), फैटी लिवर व हेपेटाइटिस उपचार में पारंगत हैं।',
    expertise: [
      'Therapeutic ERCP & Stone Extraction',
      'Endoscopic Ultrasound (EUS) & Biopsy',
      'Capsule Endoscopy & Colonoscopy',
      'Viral Hepatitis & Cirrhosis Management',
      'Inflammatory Bowel Disease (IBD / Crohn\'s)',
    ],
    hindiExpertise: [
      'ईआरसीपी (ERCP) पित्त नली पथरी निष्कासन',
      'एंडोस्कोपिक अल्ट्रासाउंड (EUS)',
      'कोलोनोस्कोपी व कैप्सूल एंडोस्कोपी',
      'हेपेटाइटिस एवं लिवर सिरोसिस उपचार',
      'अल्सरेटिव कोलाइटिस एवं आईबीडी क्लिनिक',
    ],
    languagesSpoken: ['Hindi', 'English', 'Malayalam'],
    hindiLanguagesSpoken: ['हिंदी', 'अंग्रेज़ी', 'मलयालम'],
    opdTimings: 'Tue, Thu, Fri: 11:00 AM - 03:30 PM',
    hindiOpdTimings: 'मंगल, गुरु, शुक्र: सुबह 11:00 - दोपहर 03:30',
    schedule: [
      { day: 'Tuesday', hindiDay: 'मंगलवार', time: '11:00 AM - 03:30 PM', hindiTime: 'सुबह 11:00 - दोपहर 03:30', room: 'OPD Suite 215 (Digestive Care)' },
      { day: 'Thursday', hindiDay: 'गुरुवार', time: '11:00 AM - 03:30 PM', hindiTime: 'सुबह 11:00 - दोपहर 03:30', room: 'OPD Suite 215 (Digestive Care)' },
      { day: 'Friday', hindiDay: 'शुक्रवार', time: '11:00 AM - 03:30 PM', hindiTime: 'सुबह 11:00 - दोपहर 03:30', room: 'OPD Suite 215 (Digestive Care)' },
    ],
    availabilityDays: ['Tuesday', 'Thursday', 'Friday'],
    isAvailableToday: true,
  },
  {
    id: 'dr-sanjay-gupta',
    name: 'Dr. Sanjay Gupta',
    hindiName: 'डॉ. संजय गुप्ता',
    qualifications: 'MBBS, MD (Medicine), DM (Nephrology, AIIMS), FISN',
    specialization: 'Director of Nephrology & Kidney Transplant Services',
    hindiSpecialization: 'निदेशक, नेफ्रोलॉजी एवं किडनी प्रत्यारोपण सेवाएं',
    department: 'Nephrology & Renal Care',
    hindiDepartment: 'नेफ्रोलॉजी एवं किडनी रोग विभाग',
    departmentId: 'nephrology',
    experienceYears: 22,
    experience: '22+ Years Experience',
    hindiExperience: '22+ वर्ष का अनुभव',
    designation: 'Director & Chief Transplant Physician',
    hindiDesignation: 'निदेशक एवं मुख्य ट्रांसप्लांट फिजिशियन',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Sanjay Gupta is a renowned nephrologist with 22+ years of clinical excellence in kidney transplantation, chronic kidney disease (CKD) staging, and critical care hemodialysis. A former faculty member at AIIMS, he has supervised over 1,500 successful live and deceased-donor renal transplants and oversees Janhit Hospital\'s 24-bed state-of-the-art dialysis suite.',
    hindiBio: 'डॉ. संजय गुप्ता एम्स के पूर्व प्राध्यापक और 22+ वर्षों के अनुभवी वरिष्ठ नेफ्रोलॉजी एवं किडनी ट्रांसप्लांट विशेषज्ञ हैं। उन्होंने 1,500 से अधिक सफल किडनी प्रत्यारोपणों में क्लीनिकल मार्गदर्शन किया है और अस्पताल के 24-बेड अत्याधुनिक डायलिसिस सेंटर का संचालन करते हैं।',
    expertise: [
      'Living Donor & ABO-Incompatible Kidney Transplant',
      'Critical Care Hemodialysis & SLED / CRRT',
      'Chronic Kidney Disease (CKD) Prevention',
      'Diabetic Nephropathy & Glomerulonephritis',
      'Peritoneal Dialysis (CAPD / APD)',
    ],
    hindiExpertise: [
      'किडनी प्रत्यारोपण (रीनल ट्रांसप्लांट)',
      'क्रिटिकल केयर हीमोडायलिसिस एवं CRRT',
      'क्रॉनिक किडनी डिजीज (CKD) रोकथाम',
      'डायबिटिक किडनी रोग प्रबंधन',
      'पेरिटोनियल डायलिसिस (CAPD)',
    ],
    languagesSpoken: ['Hindi', 'English'],
    hindiLanguagesSpoken: ['हिंदी', 'अंग्रेज़ी'],
    opdTimings: 'Mon, Tue, Wed, Fri: 09:00 AM - 01:00 PM',
    hindiOpdTimings: 'सोम, मंगल, बुध, शुक्र: सुबह 09:00 - दोपहर 01:00',
    schedule: [
      { day: 'Monday', hindiDay: 'सोमवार', time: '09:00 AM - 01:00 PM', hindiTime: 'सुबह 09:00 - दोपहर 01:00', room: 'OPD Suite 304 (Renal Sciences)' },
      { day: 'Tuesday', hindiDay: 'मंगलवार', time: '09:00 AM - 01:00 PM', hindiTime: 'सुबह 09:00 - दोपहर 01:00', room: 'OPD Suite 304 (Renal Sciences)' },
      { day: 'Wednesday', hindiDay: 'बुधवार', time: '09:00 AM - 01:00 PM', hindiTime: 'सुबह 09:00 - दोपहर 01:00', room: 'OPD Suite 304 (Renal Sciences)' },
      { day: 'Friday', hindiDay: 'शुक्रवार', time: '09:00 AM - 01:00 PM', hindiTime: 'सुबह 09:00 - दोपहर 01:00', room: 'OPD Suite 304 (Renal Sciences)' },
    ],
    availabilityDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    isAvailableToday: true,
  },
  {
    id: 'dr-neha-choudhary',
    name: 'Dr. Neha Choudhary',
    hindiName: 'डॉ. नेहा चौधरी',
    qualifications: 'MBBS, MD (Pulmonary Medicine), DNB, FCCP (USA)',
    specialization: 'Senior Consultant Pulmonologist & Critical Care Specialist',
    hindiSpecialization: 'वरिष्ठ पल्मोनोलॉजिस्ट एवं क्रिटिकल केयर विशेषज्ञ',
    department: 'Pulmonology & Critical Care',
    hindiDepartment: 'श्वसन एवं फेफड़ा रोग विभाग',
    departmentId: 'pulmonology',
    experienceYears: 14,
    experience: '14+ Years Experience',
    hindiExperience: '14+ वर्ष का अनुभव',
    designation: 'Senior Consultant - Pulmonary & Sleep Medicine',
    hindiDesignation: 'वरिष्ठ कंसल्टेंट - पल्मोनरी एवं स्लीप मेडिसिन',
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Neha Choudhary is an acclaimed pulmonologist and intensivist with comprehensive experience in managing severe acute respiratory distress syndrome (ARDS), chronic obstructive pulmonary disease (COPD), interstitial lung disease (ILD), and obstructive sleep apnea. She directs the advanced bronchoscopy and pulmonary function lab at Janhit Hospital.',
    hindiBio: 'डॉ. नेहा चौधरी श्वसन व फेफड़ा रोगों की ख्यातिप्राप्त विशेषज्ञ हैं। वे अस्थमा, सीओपीडी (COPD), फेफड़ों के संक्रमण और स्लीप एपनिया के इलाज में विशेष अनुभव रखती हैं। जनहित हॉस्पिटल में वे उन्नत ब्रोंकोस्कोपी और पल्मोनरी फंक्शन लैब का संचालन करती हैं।',
    expertise: [
      'Rigid & Flexible Diagnostic Bronchoscopy',
      'Severe Asthma, COPD & Interstitial Lung Disease',
      'Polysomnography (Sleep Study) & CPAP Care',
      'Critical Care ARDS & ECMO Support',
      'Post-Infectious Pulmonary Rehabilitation',
    ],
    hindiExpertise: [
      'डायग्नोस्टिक ब्रोंकोस्कोपी',
      'सीओपीडी (COPD) एवं गंभीर अस्थमा उपचार',
      'स्लीप स्टडी (Sleep Study) एवं खर्राटों का इलाज',
      'क्रिटिकल केयर वेंटिलेशन व ईसीएमओ सपोर्ट',
      'पोस्ट-कोविड फेफड़ा पुनर्वास क्लिनिक',
    ],
    languagesSpoken: ['Hindi', 'English'],
    hindiLanguagesSpoken: ['हिंदी', 'अंग्रेज़ी'],
    opdTimings: 'Mon to Fri: 12:00 PM - 04:00 PM',
    hindiOpdTimings: 'सोम से शुक्र: दोपहर 12:00 - शाम 04:00',
    schedule: [
      { day: 'Monday to Friday', hindiDay: 'सोमवार से शुक्रवार', time: '12:00 PM - 04:00 PM', hindiTime: 'दोपहर 12:00 - शाम 04:00', room: 'OPD Suite 114 (Pulmonary Wing)' },
    ],
    availabilityDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    isAvailableToday: true,
  },
  {
    id: 'dr-vikram-aditya',
    name: 'Dr. Vikram Aditya',
    hindiName: 'डॉ. विक्रम आदित्य',
    qualifications: 'MBBS, MS (General Surgery), FMAS, FIAGES',
    specialization: 'Senior Consultant Minimal Access & Bariatric Surgeon',
    hindiSpecialization: 'वरिष्ठ लैप्रोस्कोपिक एवं बैरियाट्रिक सर्जन',
    department: 'General & Laparoscopic Surgery',
    hindiDepartment: 'जनरल एवं दूरबीन सर्जरी विभाग',
    departmentId: 'surgery',
    experienceYears: 16,
    experience: '16+ Years Experience',
    hindiExperience: '16+ वर्ष का अनुभव',
    designation: 'Senior Consultant - Advanced Laparoscopic Surgery',
    hindiDesignation: 'वरिष्ठ कंसल्टेंट - आधुनिक दूरबीन सर्जरी',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Vikram Aditya is an acclaimed gastrointestinal and advanced laparoscopic surgeon with over 7,500 keyhole procedures to his credit. He specializes in single-incision laparoscopic gall bladder and hernia repairs, complex colorectal surgeries, and metabolic bariatric surgery, focusing on rapid postoperative mobility and minimal pain.',
    hindiBio: 'डॉ. विक्रम आदित्य 16+ वर्षों के अनुभवी दूरबीन (लैप्रोस्कोपिक) एवं बैरियाट्रिक सर्जन हैं। उन्होंने 7,500 से अधिक सफल की-होल सर्जरीज की हैं। वे गॉलब्लेडर, हर्निया और आंतों के ऑपरेशन में न्यूनतम दर्द और तेज रिकवरी तकनीक के विशेषज्ञ हैं।',
    expertise: [
      'Single-Incision Laparoscopic Cholecystectomy',
      'Advanced Laparoscopic Hernia Repairs (TEP / TAPP)',
      'Minimally Invasive Colorectal Resections',
      'Emergency Laparoscopic Appendectomy & Trauma',
      'Metabolic & Weight-Loss Bariatric Surgery',
    ],
    hindiExpertise: [
      'दूरबीन द्वारा पित्त की थैली का ऑपरेशन',
      'आधुनिक लैप्रोस्कोपिक हर्निया रिपेयर',
      'दूरबीन द्वारा आंतों की सर्जरी',
      'इमरजेंसी लैप्रोस्कोपिक अपेंडिक्स ऑपरेशन',
      'मोटापा घटाने की बैरियाट्रिक सर्जरी',
    ],
    languagesSpoken: ['Hindi', 'English'],
    hindiLanguagesSpoken: ['हिंदी', 'अंग्रेज़ी'],
    opdTimings: 'Mon, Wed, Fri, Sat: 02:00 PM - 06:00 PM',
    hindiOpdTimings: 'सोम, बुध, शुक्र, शनि: दोपहर 02:00 - शाम 06:00',
    schedule: [
      { day: 'Mon, Wed, Fri, Sat', hindiDay: 'सोम, बुध, शुक्र, शनि', time: '02:00 PM - 06:00 PM', hindiTime: 'दोपहर 02:00 - शाम 06:00', room: 'OPD Suite 220 (Surgical Block)' },
    ],
    availabilityDays: ['Monday', 'Wednesday', 'Friday', 'Saturday'],
    isAvailableToday: true,
  },
  {
    id: 'dr-pooja-malhotra',
    name: 'Dr. Pooja Malhotra',
    hindiName: 'डॉ. पूजा मल्होत्रा',
    qualifications: 'MBBS, MS (Obstetrics & Gynaecology), DGO, Fellowship in Fetal Medicine',
    specialization: 'Senior Consultant High-Risk Obstetrics & Gynaecology',
    hindiSpecialization: 'वरिष्ठ स्त्री एवं प्रसूति रोग विशेषज्ञ',
    department: 'Obstetrics & Gynaecology',
    hindiDepartment: 'स्त्री एवं प्रसूति रोग विभाग',
    departmentId: 'gynaecology',
    experienceYears: 16,
    experience: '16+ Years Experience',
    hindiExperience: '16+ वर्ष का अनुभव',
    designation: 'Senior Consultant - High-Risk Birthing & Fetal Care',
    hindiDesignation: 'वरिष्ठ कंसल्टेंट - सुरक्षित मातृत्व एवं भ्रूण चिकित्सा',
    image: 'https://images.unsplash.com/photo-1594824813579-4d6b5e028b34?auto=format&fit=crop&w=800&q=80',
    bio: 'Dr. Pooja Malhotra is an esteemed obstetrician and gynaecologist specializing in high-risk pregnancy management, painless natural childbirth, fetal ultrasonography, and minimally invasive hysteroscopic and laparoscopic gynaecologic surgeries. She heads the woman-centric maternity wing at Janhit Hospital.',
    hindiBio: 'डॉ. पूजा मल्होत्रा 16+ वर्षों के अनुभव वाली जानी-मानी स्त्री व प्रसूति रोग विशेषज्ञ हैं। वे हाई-रिस्क प्रेगनेंसी, दर्द-रहित प्रसव, भ्रूण सोनोग्राफी और दूरबीन द्वारा गर्भाशय की गांठों (फाइब्रॉएड) के उपचार में विशेष दक्षता रखती हैं।',
    expertise: [
      'High-Risk Pregnancy & Recurrent Miscarriage Care',
      'Painless Normal Delivery (Epidural Analgesia)',
      'Laparoscopic Hysterectomy & Myomectomy',
      'Polycystic Ovarian Syndrome (PCOS) Management',
      'Advanced Fetal Anomaly Screening',
    ],
    hindiExpertise: [
      'हाई-रिस्क गर्भावस्था एवं सुरक्षित प्रसव',
      'दर्द-रहित नॉर्मल डिलीवरी',
      'दूरबीन द्वारा गर्भाशय व फाइब्रॉएड ऑपरेशन',
      'पीसीओडी (PCOS) एवं बांझपन निवारण क्लिनिक',
      'एडवांस्ड फीटल अल्ट्रासाउंड स्क्रीनिंग',
    ],
    languagesSpoken: ['Hindi', 'English', 'Punjabi'],
    hindiLanguagesSpoken: ['हिंदी', 'अंग्रेज़ी', 'पंजाबी'],
    opdTimings: 'Mon to Sat: 09:00 AM - 02:00 PM',
    hindiOpdTimings: 'सोम से शनि: सुबह 09:00 - दोपहर 02:00',
    schedule: [
      { day: 'Monday to Saturday', hindiDay: 'सोमवार से शनिवार', time: '09:00 AM - 02:00 PM', hindiTime: 'सुबह 09:00 - दोपहर 02:00', room: 'OPD Suite 112 (Women\'s Health Wing)' },
    ],
    availabilityDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    isAvailableToday: true,
  },
];

export const FEATURED_DOCTORS: Doctor[] = ALL_DOCTORS.slice(0, 4);

export const HOSPITAL_INFRASTRUCTURE: InfrastructureItem[] = [
  {
    id: 'modular-ot',
    title: 'Ultra-Clean Modular Operation Theatres',
    hindiTitle: 'अल्ट्रा-क्लीन मॉड्यूलर ऑपरेशन थिएटर',
    category: 'Surgical Suites',
    hindiCategory: 'सर्जिकल सुइट्स',
    description: '10 laminar airflow OTs with HEPA filtering (<1 CFU/m³), robotic integration and anti-microbial surfaces.',
    hindiDescription: 'हेपा फिल्टर्ड लैमिनार एयरफ्लो, रोबोटिक इंटीग्रेशन और 100% स्टेराइल जर्म-फ्री वातावरण वाले 10 ओटी।',
    specifications: ['HEPA Air Exchange 30+/hr', 'Mako & DaVinci Robotic Ready', 'Integrated Live HD Surgical Feeds'],
    hindiSpecifications: ['प्रति घंटा 30+ हेपा एयर एक्सचेंज', 'रोबोटिक सर्जरी समर्थित', 'लाइव एचडी एंडोस्कोपिक मॉनिटरिंग'],
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
    badge: 'Class 100 OT',
  },
  {
    id: 'critical-icu',
    title: 'Multidisciplinary ICUs & Isolation Bays',
    hindiTitle: 'मल्टी-डिसीप्लिनरी आईसीयू एवं आइसोलेशन बे',
    category: 'Critical Care',
    hindiCategory: 'गहन चिकित्सा',
    description: '100+ dedicated beds for Medical, Surgical, Cardiac (CCU) and Neuro ICUs with 1:1 nursing ratios.',
    hindiDescription: '100+ क्रिटिकल केयर बेड्स, वेंटिलेटर, ईसीएमओ और 1:1 समर्पित नर्सिंग देखभाल।',
    specifications: ['1:1 Nurse-to-Patient Ratio', 'Dräger High-End Ventilators', 'Central Telemetry Monitoring'],
    hindiSpecifications: ['1:1 समर्पित नर्स-मरीज अनुपात', 'हाई-एंड ड्रैगर वेंटिलेटर्स', 'सेंट्रल टेलीमेट्री मॉनिटरिंग'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    badge: '100+ ICU Beds',
  },
  {
    id: 'diagnostics-mri-ct',
    title: '3 Tesla Silent MRI & 128-Slice Dual CT',
    hindiTitle: '3 टेस्ला साइलेंट एमआरआई एवं 128-स्लाइस सीटी',
    category: 'Radiology & Imaging',
    hindiCategory: 'रेडियोलॉजी एवं इमेजिंग',
    description: 'Ultra-low radiation scans, cardiac angiography in 5 heartbeats, and high-definition brain tractography.',
    hindiDescription: 'अल्ट्रा-लो रेडिएशन, 5 सेकंड में कार्डियक एंजियोग्राफी और साइलेंट टनल तकनीक।',
    specifications: ['Wide Bore 70cm Gantry', 'Cardiac Scan in < 5 Sec', 'Zero Radiation Contrast Protocols'],
    hindiSpecifications: ['70 सेमी चौड़ा कम्फर्ट बोर', '5 सेकंड से कम में हार्ट स्कैन', 'न्यूनतम रेडिएशन तकनीक'],
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    badge: '24/7 Diagnostics',
  },
  {
    id: 'nicu-level3',
    title: 'Level-3 Neonatal Intensive Care (NICU)',
    hindiTitle: 'लेवल-3 नवजात शिशु आईसीयू (NICU)',
    category: 'Newborn Care',
    hindiCategory: 'नवजात शिशु देखभाल',
    description: 'Giraffe incubators, nitric oxide therapy, infant phototherapy and transport incubators for preemies.',
    hindiDescription: 'जिराफ इनक्यूबेटर्स, नाइट्रिक ऑक्साइड थेरेपी और समय पूर्व जन्मे बच्चों के लिए 24/7 विशेषज्ञ देखभाल।',
    specifications: ['Advanced Giraffe Omnibeds', 'Total Parenteral Nutrition (TPN)', 'Mobile Preterm Transport Unit'],
    hindiSpecifications: ['जिराफ ओमनीबेड इनक्यूबेटर्स', 'शिशु हेतु पूर्ण न्यूट्रीशन यूनिट', 'सघन मोबाइल ट्रांसपोर्ट यूनिट'],
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    badge: 'Level-3 Accredited',
  },
];

export const WHY_CHOOSE_US_POINTS: WhyChooseUsItem[] = [
  {
    id: 'zero-triage-delay',
    icon: 'Clock',
    title: 'Zero Emergency Triage Delay',
    hindiTitle: 'इमरजेंसी में शून्य प्रतीक्षा समय',
    description: 'Rapid golden-hour resuscitation and immediate trauma team mobilization within under 5 minutes.',
    hindiDescription: 'गोल्डन ऑवर में 5 मिनट के भीतर आपातकालीन टीम और जीवन रक्षक उपचार की त्वरित शुरुआत।',
    stat: '< 5 Mins',
  },
  {
    id: 'nabh-nabl-gold',
    icon: 'ShieldCheck',
    title: 'NABH & NABL Gold Standards',
    hindiTitle: 'एनएबीएच व एनएबीएल मान्यता',
    description: 'Strict adherence to national patient safety benchmarks, 100% sterile medication, and sterile procedures.',
    hindiDescription: 'राष्ट्रीय स्तर के सख्त सुरक्षा मानक, 100% सुरक्षित दवाएं एवं शून्य संक्रमण नीति।',
    stat: '100% Compliant',
  },
  {
    id: 'transparent-billing',
    icon: 'FileText',
    title: 'Transparent & Ethical Billing',
    hindiTitle: 'पारदर्शी व नैतिक शुल्क नीति',
    description: 'Clear financial estimates upfront with zero hidden charges. Empaneled with Ayushman Bharat, CGHS & TPAs.',
    hindiDescription: 'कोई गुप्त शुल्क नहीं। आयुष्मान भारत, सीजीएचएस और सभी प्रमुख बीमा कंपनियों के साथ कैशलेस सुविधा।',
    stat: '35+ TPAs',
  },
  {
    id: 'robotic-tech',
    icon: 'Cpu',
    title: 'Sub-Millimeter Robotic Surgery',
    hindiTitle: 'सटीक रोबोटिक एवं दूरबीन सर्जरी',
    description: 'Advanced Mako and laparoscopic systems ensuring reduced surgical blood loss and 3x faster discharge.',
    hindiDescription: 'कम दर्द, न्यूनतम रक्तस्राव और अस्पताल से 3 गुना तेज डिस्चार्ज सुनिश्चित करने वाली रोबोटिक तकनीक।',
    stat: '3x Faster Recovery',
  },
  {
    id: 'compassionate-nursing',
    icon: 'HeartHandshake',
    title: 'Compassionate Patient-First Ethos',
    hindiTitle: 'करुणामयी मरीज-प्रथम देखभाल',
    description: 'Dedicated patient welfare desk, language translators, family lounge suites, and 24/7 grievance redressal.',
    hindiDescription: 'मरीज सहायता डेस्क, भाषा अनुवादक, परिवार लाउंज और 24/7 त्वरित समाधान व्यवस्था।',
    stat: '24/7 Helpdesk',
  },
  {
    id: 'full-diagnostic-ecosystem',
    icon: 'Activity',
    title: 'Integrated Diagnostic Ecosystem',
    hindiTitle: 'एकीकृत जांच व डायग्नोस्टिक्स',
    description: 'Under-one-roof pathology, digital x-ray, ultrasound, 3T MRI and blood bank for zero patient transit hassle.',
    hindiDescription: 'एक ही छत के नीचे पैथोलॉजी, डिजिटल एक्स-रे, अल्ट्रासाउंड, एमआरआई और ब्लड बैंक की सुविधा।',
    stat: 'In-House Testing',
  },
];

export const PATIENT_TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    patientName: 'Rameshwar Dayal Verma',
    hindiPatientName: 'रामेश्वर दयाल वर्मा',
    department: 'Cardiology (Heart Care)',
    hindiDepartment: 'कार्डियोलॉजी (हृदय रोग)',
    treatment: 'Emergency Primary Angioplasty',
    hindiTreatment: 'आपातकालीन प्राइमरी एंजियोप्लास्टी',
    rating: 5,
    review: 'When I suffered acute chest pain at midnight, Janhit Hospital emergency team started catheterization within 18 minutes. Dr. Ashok Sharma saved my life with extreme professionalism.',
    hindiReview: 'आधी रात को जब मुझे सीने में तेज दर्द हुआ, जनहित अस्पताल की इमरजेंसी टीम ने 18 मिनट में कैथ लैब शुरू कर दी। डॉ. अशोक शर्मा ने समय पर एंजियोप्लास्टी कर मेरी जान बचाई।',
    date: 'February 2026',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'test-2',
    patientName: 'Smt. Kamla Devi',
    hindiPatientName: 'श्रीमती कमला देवी',
    department: 'Orthopaedics',
    hindiDepartment: 'ऑर्थोपेडिक्स (हड्डी रोग)',
    treatment: 'Bilateral Robotic Total Knee Replacement',
    hindiTreatment: 'दोनों घुटनों की रोबोटिक सर्जरी',
    rating: 5,
    review: 'I had been bedridden for 3 years due to severe arthritis. Thanks to Dr. Rajesh Singh and robotic surgery, I started walking pain-free on the 2nd day itself. Clean wards and great food.',
    hindiReview: 'गठिया के कारण मैं 3 वर्षों से बिस्तर पर थी। डॉ. राजेश सिंह और रोबोटिक तकनीक की बदौलत सर्जरी के दूसरे दिन ही मैं बिना दर्द चलने लगी। अस्पताल के कमरे बेहद स्वच्छ हैं।',
    date: 'January 2026',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'test-3',
    patientName: 'Vikram Joshi',
    hindiPatientName: 'विक्रम जोशी',
    department: 'Paediatrics & NICU',
    hindiDepartment: 'बाल रोग एवं एनआईसीयू',
    treatment: 'Preterm Newborn Intensive Care (31 Weeks)',
    hindiTreatment: 'समय पूर्व जन्मे शिशु की गहन देखभाल',
    rating: 5,
    review: 'Our baby was born prematurely at 31 weeks. Dr. Sunita Deshmukh and the dedicated NICU nursing staff cared for our baby for 22 days like family. We are forever grateful.',
    hindiReview: 'हमारा बच्चा 31वें सप्ताह में जन्मा था। डॉ. सुनीता देशमुख और एनआईसीयू की सिस्टर्स ने 22 दिनों तक हमारे बच्चे की अपने परिवार की तरह देखभाल की। हम सदैव आभारी रहेंगे।',
    date: 'December 2025',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
];

export const HEALTH_AWARENESS_ARTICLES: HealthArticle[] = [
  {
    id: 'art-1',
    slug: 'heart-attack-warning-signs',
    title: 'Silent Heart Attack: Warning Signs You Must Never Ignore',
    hindiTitle: 'साइलेंट हार्ट अटैक: इन चेतावनी संकेतों को कभी नजरअंदाज न करें',
    excerpt: 'Recognizing subtle symptoms like uncharacteristic fatigue, jaw pain, shortness of breath and cold sweats in time can save lives.',
    hindiExcerpt: 'अकारण थकान, जबड़े में दर्द, सांस फूलना और अचानक ठंडा पसीना आना जैसे लक्षणों की समय पर पहचान जीवन बचा सकती है।',
    category: 'Heart Health',
    hindiCategory: 'हृदय स्वास्थ्य',
    readTime: '4 Min Read',
    hindiReadTime: '4 मिनट पठन',
    date: '28 Oct 2026',
    doctorAuthor: 'Dr. Ashok Sharma (Cardiologist)',
    hindiDoctorAuthor: 'डॉ. अशोक शर्मा (कार्डियोलॉजिस्ट)',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'art-2',
    slug: 'joint-pain-robotic-replacement',
    title: 'Arthritis & Joint Health: When is Robotic Knee Replacement Ideal?',
    hindiTitle: 'जोड़ों का दर्द: रोबोटिक घुटना रिप्लेसमेंट कब और क्यों आवश्यक है?',
    excerpt: 'Discover how computer-mapped robotic arm assistance allows sub-millimeter implant fitting, preserving healthy natural bone.',
    hindiExcerpt: 'जानें कि 3D कंप्यूटर मैपिंग और रोबोटिक तकनीक कैसे स्वस्थ प्राकृतिक हड्डी को सुरक्षित रखते हुए सटीक रिप्लेसमेंट करती है।',
    category: 'Orthopaedics',
    hindiCategory: 'हड्डी एवं जोड़',
    readTime: '5 Min Read',
    hindiReadTime: '5 मिनट पठन',
    date: '22 Oct 2026',
    doctorAuthor: 'Dr. Rajesh Singh (Orthopaedic Surgeon)',
    hindiDoctorAuthor: 'डॉ. राजेश सिंह (ऑर्थोपेडिक सर्जन)',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'art-3',
    slug: 'childhood-vaccination-guide',
    title: 'Essential Child Immunization Schedule: A Complete Pediatric Guide',
    hindiTitle: 'शिशु टीकाकरण सारिणी: माता-पिता के लिए संपूर्ण स्वास्थ्य गाइड',
    excerpt: 'Critical vaccinations from birth to age 5 to shield your children against preventable infections and build lifelong immunity.',
    hindiExcerpt: 'जन्म से 5 वर्ष तक के बच्चों के लिए अनिवार्य टीकों की समय सारिणी जो बच्चों को घातक बीमारियों से सुरक्षित रखती है।',
    category: 'Pediatric Care',
    hindiCategory: 'शिशु स्वास्थ्य',
    readTime: '6 Min Read',
    hindiReadTime: '6 मिनट पठन',
    date: '15 Oct 2026',
    doctorAuthor: 'Dr. Sunita Deshmukh (Pediatrician)',
    hindiDoctorAuthor: 'डॉ. सुनीता देशमुख (शिशु रोग विशेषज्ञ)',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
  },
];

export const HOSPITAL_GALLERY_PREVIEWS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Philips Biplane Cardiac Cath Lab',
    hindiTitle: 'फिलिप्स बाइप्लेन कार्डियक कैथ लैब',
    category: 'Cardiology',
    hindiCategory: 'हृदय रोग विभाग',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gal-2',
    title: 'Modular Class-100 Operation Theatre',
    hindiTitle: 'क्लास-100 मॉड्यूलर ऑपरेशन थिएटर',
    category: 'Surgery',
    hindiCategory: 'सर्जरी विभाग',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gal-3',
    title: 'Executive Deluxe Patient Room',
    hindiTitle: 'डीलक्स प्राइवेट पेशेंट सुइट',
    category: 'Inpatient Rooms',
    hindiCategory: 'मरीज कक्ष',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gal-4',
    title: 'Advanced 3T Silent MRI Suite',
    hindiTitle: '3 टेस्ला साइलेंट एमआरआई सुइट',
    category: 'Radiology',
    hindiCategory: 'रेडियोलॉजी',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gal-5',
    title: 'Mobile Critical Care ICU Ambulance',
    hindiTitle: 'मोबाइल क्रिटिकल केयर आईसीयू एम्बुलेंस',
    category: 'Emergency 24/7',
    hindiCategory: '24/7 इमरजेंसी',
    image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gal-6',
    title: 'Healing Landscape & Patient Reception',
    hindiTitle: 'अस्पताल रिसेप्शन एवं शांतिदायक लॉन',
    category: 'Campus',
    hindiCategory: 'अस्पताल परिसर',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
  },
];

/* -------------------------------------------------------------------------- */
/*                   PHASE 04: ABOUT HOSPITAL SECTION DATA                    */
/* -------------------------------------------------------------------------- */

export const HOSPITAL_HISTORY_TIMELINE: HistoryMilestone[] = [
  {
    year: '2008',
    title: 'Foundational Stone & 100-Bed Facility',
    hindiTitle: 'संस्थान की स्थापना एवं 100-बेड का शुभारंभ',
    description: 'Inauguration of Janhit Hospital with core specialties (General Medicine, General Surgery, Paediatrics and 24/7 Emergency triage).',
    hindiDescription: 'जनहित हॉस्पिटल का 100 बिस्तरों, बुनियादी चिकित्सा विभागों और 24 घंटे आपातकालीन सेवा के साथ ऐतिहासिक शुभारंभ।',
    badge: 'Foundation',
    hindiBadge: 'स्थापना',
    highlightStat: '100 Initial Beds',
  },
  {
    year: '2013',
    title: 'Expansion to 250 Beds & Advanced Cath Lab',
    hindiTitle: '250 बेड विस्तार एवं आधुनिक कैथ लैब',
    description: 'Commissioning of the first digital flat-panel cardiac catheterization lab and 40-bed specialized Medical & Surgical ICUs.',
    hindiDescription: 'डिजिटल कार्डियक कैथ लैब और 40 बिस्तरों वाली अत्याधुनिक मेडिकल व सर्जिकल आईसीयू का संचालन प्रारंभ।',
    badge: 'Speciality Care',
    hindiBadge: 'विशेषज्ञ विस्तार',
    highlightStat: '250 Beds & Cath Lab',
  },
  {
    year: '2017',
    title: 'National Accreditations (NABH & NABL)',
    hindiTitle: 'राष्ट्रीय मान्यता (NABH एवं NABL)',
    description: 'Awarded prestigious NABH hospital accreditation for clinical quality and NABL accreditation for diagnostic pathology laboratories.',
    hindiDescription: 'मरीज सुरक्षा व गुणवत्ता हेतु प्रतिष्ठित एनएबीएच (NABH) और पैथोलॉजी लैब हेतु एनएबीएल (NABL) मान्यता प्राप्त।',
    badge: 'Accreditation',
    hindiBadge: 'गुणवत्ता प्रमाणीकरण',
    highlightStat: 'NABH Gold Standard',
  },
  {
    year: '2021',
    title: 'Level-3 NICU & Comprehensive Cancer Wing',
    hindiTitle: 'लेवल-3 एनआईसीयू एवं कैंसर केयर विंग',
    description: 'Establishment of regional tertiary Level-3 Neonatal ICU and dedicated day-care chemotherapy and surgical oncology wing.',
    hindiDescription: 'क्षेत्रीय रेफरल लेवल-3 नवजात शिशु आईसीयू और आधुनिक कीमोथेरेपी व सर्जिकल ऑन्कोलॉजी विंग की स्थापना।',
    badge: 'Super Speciality',
    hindiBadge: 'सुपर स्पेशलिटी',
    highlightStat: 'Level-3 NICU',
  },
  {
    year: '2024',
    title: 'Robotic Surgery & 500-Bed Mega Campus',
    hindiTitle: 'रोबोटिक सर्जरी एवं 500-बेड मेगा परिसर',
    description: 'Deployment of computer-guided robotic arthroplasty, 3 Tesla silent MRI, and expansion to a 500+ bed state-of-the-art campus.',
    hindiDescription: 'कंप्यूटर-नेविगेटेड रोबोटिक जॉइंट सर्जरी, 3 टेस्ला साइलेंट एमआरआई और 500+ बेड वाले विशाल आधुनिक कैंपस का विस्तार।',
    badge: 'Modern Era',
    hindiBadge: 'आधुनिक तकनीक',
    highlightStat: '500+ Hospital Beds',
  },
  {
    year: '2026',
    title: 'Centres of Research & Clinical Eminence',
    hindiTitle: 'अनुसंधान व चिकित्सा उत्कृष्टता का नया युग',
    description: 'Ranked among the premier tertiary referral and academic healthcare institutions serving patients across North India with ethical pride.',
    hindiDescription: 'उत्तर भारत के प्रमुख रेफरल और शैक्षणिक स्वास्थ्य संस्थानों में शुमार, 99.4% मरीज विश्वास के साथ निरंतर सेवा में समर्पित।',
    badge: 'Present Day',
    hindiBadge: 'वर्तमान गौरव',
    highlightStat: '99.4% Trust',
  },
];

export const CORE_VALUES: CoreValue[] = [
  {
    id: 'compassion',
    letter: 'H',
    title: 'Healing with Compassion',
    hindiTitle: 'करुणामयी एवं मानवीय उपचार',
    description: 'We treat every patient not as a medical case, but with profound empathy, dignity, and personal warmth.',
    hindiDescription: 'हम प्रत्येक मरीज को केवल एक केस नहीं, बल्कि गहरी आत्मीयता, सम्मान और संवेदनशीलता के साथ स्वस्थ करते हैं।',
    icon: 'Heart',
  },
  {
    id: 'ethics',
    letter: 'E',
    title: 'Ethical Integrity & Transparency',
    hindiTitle: 'नैतिक निष्ठा एवं पूर्ण पारदर्शिता',
    description: 'Uncompromising medical ethics, zero unnecessary tests or procedures, and 100% transparent billing.',
    hindiDescription: 'अटूट चिकित्सा नैतिकता, कोई अनावश्यक जांच या प्रक्रिया नहीं, और बिलिंग में पूर्ण पारदर्शिता।',
    icon: 'ShieldCheck',
  },
  {
    id: 'accuracy',
    letter: 'A',
    title: 'Advanced Clinical Precision',
    hindiTitle: 'उन्नत चिकित्सा व वैज्ञानिक सटीकता',
    description: 'Evidence-based clinical guidelines, robotic precision, and continuous benchmarking with international healthcare.',
    hindiDescription: 'प्रमाण-आधारित प्रोटोकॉल, रोबोटिक सटीकता और अंतरराष्ट्रीय स्वास्थ्य मानकों का निरंतर पालन।',
    icon: 'Cpu',
  },
  {
    id: 'respect',
    letter: 'R',
    title: 'Respect & Patient Dignity',
    hindiTitle: 'मरीज का सम्मान एवं अधिकार',
    description: 'Protecting patient privacy, honoring informed consent, and ensuring compassionate cultural and linguistic respect.',
    hindiDescription: 'मरीज की निजता की सुरक्षा, निर्णय में सहमति का आदर और सभी के प्रति निष्पक्ष व सम्मानजनक व्यवहार।',
    icon: 'HeartHandshake',
  },
  {
    id: 'trust',
    letter: 'T',
    title: 'Teamwork & Dedication',
    hindiTitle: 'समर्पण एवं सामूहिक सहयोग',
    description: 'Multidisciplinary collaboration between clinicians, nurses, pharmacists, and paramedical teams for holistic healing.',
    hindiDescription: 'मरीज के समग्र स्वास्थ्य लाभ हेतु चिकित्सकों, नर्सिंग स्टाफ और पैरामेडिकल टीमों का एकीकृत सहयोग।',
    icon: 'Users',
  },
];

export const HOSPITAL_LEADERSHIP: LeaderProfile[] = [
  {
    id: 'chairman',
    name: 'Dr. V. K. Saxena',
    hindiName: 'डॉ. वी. के. सक्सेना',
    designation: 'Founder, Chairman & Managing Director',
    hindiDesignation: 'संस्थापक, चेयरमैन एवं प्रबंध निदेशक',
    qualifications: 'MBBS, MS (Surgery), M.Ch, FRCS (Edinburgh), FIAGES',
    bio: 'A visionary surgeon and healthcare pioneer with over 32 years of clinical governance experience. Dr. Saxena established Janhit Hospital with the single mission of providing tertiary medical care within reach of every citizen without compromising ethical standards.',
    hindiBio: '32 वर्षों से अधिक के सर्जिकल व प्रशासनिक अनुभव से युक्त स्वास्थ्य अग्रणी। डॉ. सक्सेना ने नैतिक मानकों से समझौता किए बिना प्रत्येक नागरिक तक विश्वस्तरीय स्वास्थ्य सेवाएं पहुंचाने के संकल्प के साथ जनहित हॉस्पिटल की स्थापना की।',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    badge: 'Founder & CMD',
  },
  {
    id: 'medical-director',
    name: 'Dr. Pratibha Sharma',
    hindiName: 'डॉ. प्रतिभा शर्मा',
    designation: 'Medical Director & Chief of Clinical Governance',
    hindiDesignation: 'मेडिकल डायरेक्टर एवं प्रमुख, क्लीनिकल गवर्नेंस',
    qualifications: 'MBBS, MD (Internal Medicine), DNB, MHA (AIIMS New Delhi)',
    bio: 'Overseeing patient safety, antibiotic stewardship, and clinical audits. Dr. Sharma has led Janhit Hospital to achieve consistent NABH gold compliance and pioneered multidisciplinary tumour and trauma protocols.',
    hindiBio: 'मरीज सुरक्षा, एंटीबायोटिक स्टीवर्डशिप और क्लीनिकल ऑडिट्स की प्रमुख। डॉ. शर्मा के मार्गदर्शन में जनहित हॉस्पिटल ने लगातार एनएबीएच (NABH) के उच्चतम मानकों को हासिल किया है।',
    image: 'https://images.unsplash.com/photo-1594824813579-4d6b5e028b34?auto=format&fit=crop&w=600&q=80',
    badge: 'Medical Director',
  },
  {
    id: 'chief-operating-officer',
    name: 'Col. (Retd.) Rajiv Anand',
    hindiName: 'कर्नल (से.नि.) राजीव आनंद',
    designation: 'Chief Operating Officer (COO)',
    hindiDesignation: 'मुख्य संचालन अधिकारी (COO)',
    qualifications: 'B.Tech, MBA (Hospital Administration), PMP',
    bio: 'Former senior Indian Army officer with extensive expertise in hospital logistics, critical infrastructure continuity, and disaster management. Ensures 24/7 seamless hospital operations and zero supply chain disruption.',
    hindiBio: 'भारतीय सेना के पूर्व वरिष्ठ अधिकारी, जिन्हें अस्पताल प्रबंधन, आपातकालीन आपदा प्रतिक्रिया और आधुनिक लॉजिस्टिक्स का गहन अनुभव है। अस्पताल की 24 घंटे निर्बाध सेवाओं को सुनिश्चित करते हैं।',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    badge: 'Operations Head',
  },
  {
    id: 'director-nursing',
    name: 'Smt. Ananya Sen',
    hindiName: 'श्रीमती अनन्या सेन',
    designation: 'Director of Nursing & Patient Welfare',
    hindiDesignation: 'निदेशक, नर्सिंग एवं मरीज कल्याण',
    qualifications: 'M.Sc Nursing (Critical Care), Infection Control Specialist (UK)',
    bio: 'Leading a compassionate team of over 600 certified nurses. Champion of sterile infection control, 1:1 ICU monitoring, patient grievance redressal, and continuing nursing education.',
    hindiBio: '600 से अधिक प्रशिक्षित और करुणामयी नर्सेस की टीम का नेतृत्व। 1:1 आईसीयू नर्सिंग, संक्रमण रोकथाम और मरीज कल्याण कार्यक्रमों की विशेष मार्गदर्शक।',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    badge: 'Nursing Leadership',
  },
];

export const DETAILED_ACCREDITATIONS: DetailedAccreditation[] = [
  {
    id: 'nabh',
    name: 'NABH',
    title: 'National Accreditation Board for Hospitals & Healthcare Providers',
    hindiTitle: 'राष्ट्रीय अस्पताल एवं स्वास्थ्य सेवा प्रदाता प्रत्यायन बोर्ड',
    issuingBody: 'Quality Council of India (QCI)',
    validity: 'Certified & Annually Audited',
    description: 'The highest institutional benchmark in India verifying patient safety, medication administration, injection safety, and credentialing of medical staff.',
    hindiDescription: 'भारत में मरीज सुरक्षा, सुरक्षित दवा प्रबंधन और डॉक्टरों की योग्यता की पुष्टि करने वाला सर्वोच्च राष्ट्रीय गुणवत्ता मानक।',
    scope: ['Patient Safety Protocols', 'Infection Control Practices', 'Emergency Triage & Disaster Readiness', 'Ethical Clinical Audit'],
    hindiScope: ['मरीज सुरक्षा मानक', 'संक्रमण नियंत्रण प्रक्रियाएं', 'इमरजेंसी ट्राइएज व आपदा तत्परता', 'नैतिक क्लीनिकल ऑडिट'],
    icon: 'Award',
  },
  {
    id: 'nabl',
    name: 'NABL',
    title: 'National Accreditation Board for Testing and Calibration Laboratories',
    hindiTitle: 'राष्ट्रीय परीक्षण और अंशशोधन प्रयोगशाला प्रत्यायन बोर्ड',
    issuingBody: 'Department of Science & Technology, Govt. of India',
    validity: 'ISO 15189:2012 Certified',
    description: 'Guarantees the diagnostic accuracy, equipment calibration, and rapid turnaround time of our 24/7 central pathology and microbiology labs.',
    hindiDescription: 'हमारी 24 घंटे कार्यरत केंद्रीय पैथोलॉजी व माइक्रोबायोलॉजी लैब की जांच सटीकता और अंतरराष्ट्रीय गुणवत्ता की गारंटी।',
    scope: ['Clinical Biochemistry', 'Hematology & Immunopathology', 'Molecular Diagnostics & RT-PCR', 'Blood Bank Cross-Matching'],
    hindiScope: ['क्लीनिकल बायोकेमिस्ट्री', 'हेमेटोलॉजी एवं इम्यूनो-पैथोलॉजी', 'मॉलिक्यूलर डायग्नोस्टिक्स', 'ब्लड बैंक क्रॉस-मैचिंग'],
    icon: 'CheckCircle',
  },
  {
    id: 'iso',
    name: 'ISO 9001:2015',
    title: 'Quality Management Systems Certification',
    hindiTitle: 'अंतरराष्ट्रीय गुणवत्ता प्रबंधन प्रणाली प्रमाणन',
    issuingBody: 'International Organization for Standardization',
    validity: 'Certified Compliance',
    description: 'Ensures structured institutional workflows, continuous employee training, data privacy, and transparent patient feedback management.',
    hindiDescription: 'सुव्यवस्थित प्रशासनिक प्रक्रियाएं, मरीज डेटा सुरक्षा और निरंतर सेवा सुधार को सुनिश्चित करने वाला वैश्विक प्रमाणन।',
    scope: ['Facility Maintenance Standards', 'Transparent Billing Systems', 'Patient Grievance Redressal', 'Bio-Medical Waste Management'],
    hindiScope: ['परिसर रख-रखाव मानक', 'पारदर्शी बिलिंग प्रणाली', 'मरीज शिकायत निवारण व्यवस्था', 'बायो-मेडिकल कचरा प्रबंधन'],
    icon: 'ShieldCheck',
  },
  {
    id: 'aerb',
    name: 'AERB Certified',
    title: 'Atomic Energy Regulatory Board Compliance',
    hindiTitle: 'परमाणु ऊर्जा नियामक बोर्ड (AERB) सुरक्षा प्रमाणन',
    issuingBody: 'AERB, Govt. of India',
    validity: 'Radiation Safety Certified',
    description: 'Certifies that our 128-Slice CT, Digital X-Ray, Cath Lab, and Mammography units follow strict low-dose ALARA radiation safety benchmarks.',
    hindiDescription: 'हमारे 128-स्लाइस सीटी, एक्स-रे और कैथ लैब में न्यूनतम रेडिएशन व पूर्ण सुरक्षा मानकों की आधिकारिक पुष्टि।',
    scope: ['Radiation Shielding Validation', 'Dose Monitoring Badges', 'Patient Radiation Minimization', 'Emergency Safety Interlocks'],
    hindiScope: ['रेडिएशन शील्डिंग जांच', 'डोज मॉनिटरिंग बैज', 'न्यूनतम रेडिएशन प्रोटोकॉल', 'आपातकालीन सेफ्टी इंटरलॉक्स'],
    icon: 'Activity',
  },
];

export const INSTITUTIONAL_ACHIEVEMENTS: InstitutionalAchievement[] = [
  {
    id: 'ach-surgeries',
    metric: '25,000+',
    title: 'Major Surgeries Successfully Performed',
    hindiTitle: 'सफल प्रमुख सर्जिकल प्रक्रियाएं',
    description: 'Across robotic orthopaedics, beating-heart CABG, micro-neuro surgery, and minimally invasive laparoscopy.',
    hindiDescription: 'रोबोटिक ऑर्थोपेडिक्स, बायपास सर्जरी, न्यूरो सर्जरी और दूरबीन ऑपरेशन में उल्लेखनीय सफलता।',
    icon: 'Activity',
  },
  {
    id: 'ach-patients',
    metric: '500,000+',
    title: 'Outpatient Consultations Completed',
    hindiTitle: 'मरीजों को स्वास्थ्य परामर्श',
    description: 'Empowering families across the National Capital Region with compassionate, accessible clinical care.',
    hindiDescription: 'दिल्ली-एनसीआर और निकटवर्ती राज्यों के 5 लाख से अधिक मरीजों को समर्पित स्वास्थ्य परामर्श।',
    icon: 'Heart',
  },
  {
    id: 'ach-satisfaction',
    metric: '99.4%',
    title: 'Patient Trust & Audit Satisfaction',
    hindiTitle: 'मरीजों का विश्वास एवं संतुष्टि',
    description: 'Independent post-discharge satisfaction audits monitoring doctor communication, nursing care, and hygiene.',
    hindiDescription: 'डिस्चार्ज के बाद स्वतंत्र ऑडिट द्वारा डॉक्टर संवाद, नर्सिंग सेवा और स्वच्छता में 99.4% संतुष्टि।',
    icon: 'ShieldCheck',
  },
  {
    id: 'ach-emergency',
    metric: '< 5 Mins',
    title: 'Average Emergency Triage Response Time',
    hindiTitle: 'औसत आपातकालीन ट्राइएज समय',
    description: 'Immediate golden-hour mobilization of specialized clinical teams for stroke, chest pain, and polytrauma.',
    hindiDescription: 'स्ट्रोक, दिल का दौरा और गंभीर दुर्घटना में 5 मिनट से कम में विशेषज्ञ टीम की त्वरित तैनाती।',
    icon: 'Clock',
  },
];
