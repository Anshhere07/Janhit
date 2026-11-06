export interface NavSubItem {
  key: string;
  label: string;
  hindiLabel: string;
  path: string;
  description?: string;
  hindiDescription?: string;
  badge?: string;
}

export interface NavItem {
  key: string;
  label: string;
  hindiLabel: string;
  path: string;
  hasDropdown?: boolean;
  children?: NavSubItem[];
}

export const HOSPITAL_INFO = {
  name: 'Janhit Hospital',
  hindiName: 'जनहित हॉस्पिटल',
  tagline: 'Super Speciality Healthcare & Research Centre',
  hindiTagline: 'सुपर स्पेशलिटी स्वास्थ्य एवं अनुसंधान केंद्र',
  emergencyPhone: '1800-123-9999',
  ambulancePhone: '+91-98765-43210',
  generalInquiryPhone: '+91-11-2345-6789',
  whatsappNumber: '+919876543210',
  email: 'care@janhithospital.com',
  address: 'Sector 14, Institutional Area, New Delhi - 110001, India',
  hindiAddress: 'सेक्टर 14, इंस्टीट्यूशनल एरिया, नई दिल्ली - 110001, भारत',
  operatingHours: '24 Hours Open (Emergency & Trauma)',
  hindiOperatingHours: '24 घंटे खुला (इमरजेंसी एवं ट्रॉमा केयर)',
  opdHours: 'Mon - Sat: 8:00 AM - 8:00 PM',
  hindiOpdHours: 'सोम - शनि: सुबह 8:00 - रात 8:00',
  accreditations: [
    { name: 'NABH', fullName: 'National Accreditation Board for Hospitals & Healthcare Providers' },
    { name: 'NABL', fullName: 'National Accreditation Board for Testing and Calibration Laboratories' },
    { name: 'ISO 9001:2015', fullName: 'Quality Management Systems Certified' }
  ],
  socialLinks: {
    facebook: 'https://facebook.com',
    twitter: 'https://twitter.com',
    instagram: 'https://instagram.com',
    youtube: 'https://youtube.com',
    linkedin: 'https://linkedin.com'
  }
} as const;

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    key: 'nav.home',
    label: 'Home',
    hindiLabel: 'होम',
    path: '/',
  },
  {
    key: 'nav.about',
    label: 'About Hospital',
    hindiLabel: 'हमारे बारे में',
    path: '/about',
  },
  {
    key: 'nav.doctors',
    label: 'Doctors',
    hindiLabel: 'डॉक्टर्स',
    path: '/doctors',
  },
  {
    key: 'nav.departments',
    label: 'Departments',
    hindiLabel: 'विभाग',
    path: '/departments',
    hasDropdown: true,
    children: [
      {
        key: 'nav.deptCardiology',
        label: 'Cardiology & Heart Care',
        hindiLabel: 'कार्डियोलॉजी एवं हृदय रोग',
        path: '/departments/cardiology',
        description: 'Advanced Cath Lab, 24/7 Primary Angioplasty & Cardiac ICU',
        hindiDescription: 'उन्नत कैथ लैब, 24/7 प्राइमरी एंजियोप्लास्टी एवं कार्डियक आईसीयू',
        badge: '24/7 Active',
      },
      {
        key: 'nav.deptNeurology',
        label: 'Neurology & Neuro Surgery',
        hindiLabel: 'न्यूरोलॉजी एवं मस्तिष्क रोग',
        path: '/departments/neurology',
        description: 'Comprehensive Stroke Unit, Brain & Spine Neuro-navigation',
        hindiDescription: 'स्ट्रोक केयर यूनिट, आधुनिक ब्रेन एवं स्पाइन सर्जरी',
      },
      {
        key: 'nav.deptOrthopaedics',
        label: 'Orthopaedics & Joint Care',
        hindiLabel: 'हड्डी एवं जोड़ रोग (ऑर्थोपेडिक्स)',
        path: '/departments/orthopaedics',
        description: 'Robotic Joint Replacement, Arthroscopy & Sports Medicine',
        hindiDescription: 'रोबोटिक जॉइंट रिप्लेसमेंट एवं स्पोर्ट्स मेडिसिन',
      },
      {
        key: 'nav.deptOncology',
        label: 'Oncology & Cancer Care',
        hindiLabel: 'कैंसर रोग एवं ऑन्कोलॉजी',
        path: '/departments/oncology',
        description: 'Multidisciplinary Tumor Board, Chemotherapy & Immunotherapy',
        hindiDescription: 'ट्यूमर बोर्ड, कीमोथेरेपी एवं आधुनिक इम्यूनोथेरेपी',
      },
      {
        key: 'nav.deptPaediatrics',
        label: 'Paediatrics & Neonatology',
        hindiLabel: 'बाल रोग एवं शिशु देखभाल',
        path: '/departments/paediatrics',
        description: 'Level-3 NICU, Pediatric Intensive Care & Vaccination',
        hindiDescription: 'लेवल-3 एनआईसीयू (NICU) एवं बाल गहन चिकित्सा',
      },
      {
        key: 'nav.deptGastroenterology',
        label: 'Gastroenterology & Hepatology',
        hindiLabel: 'गैस्ट्रोएंटरोलॉजी एवं लिवर रोग',
        path: '/departments/gastroenterology',
        description: 'Advanced Endoscopy, Colonoscopy & Liver Disease Care',
        hindiDescription: 'उन्नत एंडोस्कोपी, कोलोनोस्कोपी एवं लिवर केयर',
      },
      {
        key: 'nav.deptEmergency',
        label: '24/7 Emergency & Trauma',
        hindiLabel: '24/7 इमरजेंसी एवं ट्रॉमा',
        path: '/emergency',
        description: 'Immediate Triage, Critical Resuscitation & Mobile ICU',
        hindiDescription: 'त्वरित ट्राइएज, क्रिटिकल रिससिटेशन एवं मोबाइल आईसीयू',
        badge: 'Urgent',
      },
    ],
  },
  {
    key: 'nav.treatments',
    label: 'Treatments',
    hindiLabel: 'उपचार व सर्जरी',
    path: '/treatments',
    hasDropdown: true,
    children: [
      {
        key: 'nav.treatRobotic',
        label: 'Robotic-Assisted Surgeries',
        hindiLabel: 'रोबोटिक सर्जरी',
        path: '/treatments/robotic-surgery',
        description: 'Sub-millimeter precision, minimal pain and faster recovery',
        hindiDescription: 'सटीक रोबोटिक तकनीक, कम दर्द और त्वरित रिकवरी',
      },
      {
        key: 'nav.treatDialysis',
        label: 'Dialysis & Renal Care',
        hindiLabel: 'डायलिसिस एवं किडनी उपचार',
        path: '/treatments/dialysis',
        description: 'Haemodialysis, Peritoneal Dialysis & Nephrology clinic',
        hindiDescription: 'आधुनिक हेमोडायलिसिस एवं नेफ्रोलॉजी क्लिनिक',
      },
      {
        key: 'nav.treatCriticalCare',
        label: 'Critical Care & Advanced ICU',
        hindiLabel: 'क्रिटिकल केयर एवं आईसीयू',
        path: '/treatments/critical-care',
        description: 'Multidisciplinary ICU with isolation units & ECMO support',
        hindiDescription: 'आइसोलेशन यूनिट्स एवं ईसीएमओ (ECMO) समर्थित आईसीयू',
      },
      {
        key: 'nav.treatLaparoscopic',
        label: 'Laparoscopic Keyhole Surgery',
        hindiLabel: 'दूरबीन द्वारा लैप्रोस्कोपिक सर्जरी',
        path: '/treatments/laparoscopic',
        description: 'Minimally invasive abdominal, gall bladder and hernia surgery',
        hindiDescription: 'पेट, पित्ताशय एवं हर्निया की मिनिमल इनवेसिव सर्जरी',
      },
      {
        key: 'nav.treatHealthChecks',
        label: 'Comprehensive Health Packages',
        hindiLabel: 'सम्पूर्ण स्वास्थ्य जांच पैकेज',
        path: '/treatments/health-checks',
        description: 'Executive cardiac, diabetic, senior citizen & women wellness',
        hindiDescription: 'हृदय, मधुमेह, वरिष्ठ नागरिक एवं महिला हेल्थ चेकअप',
      },
    ],
  },
  {
    key: 'nav.facilities',
    label: 'Facilities',
    hindiLabel: 'सुविधाएं',
    path: '/facilities',
  },
  {
    key: 'nav.gallery',
    label: 'Gallery',
    hindiLabel: 'गैलरी',
    path: '/gallery',
  },
  {
    key: 'nav.contact',
    label: 'Contact Us',
    hindiLabel: 'संपर्क करें',
    path: '/contact',
  },
];
