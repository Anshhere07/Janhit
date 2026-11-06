export interface FAQItem {
  id: string;
  category: 'general' | 'opd' | 'inpatient' | 'insurance' | 'diagnostics' | 'emergency';
  question: string;
  hindiQuestion: string;
  answer: string;
  hindiAnswer: string;
  link?: {
    text: string;
    hindiText: string;
    url: string;
  };
  tags: string[];
}

export interface PatientRight {
  id: string;
  title: string;
  hindiTitle: string;
  description: string;
  hindiDescription: string;
  iconName: string;
}

export interface PatientResponsibility {
  id: string;
  title: string;
  hindiTitle: string;
  description: string;
  hindiDescription: string;
  iconName: string;
}

export interface VisitorGuideline {
  zone: string;
  hindiZone: string;
  timings: string;
  hindiTimings: string;
  maxVisitors: string;
  hindiMaxVisitors: string;
  rules: string[];
  hindiRules: string[];
}

export interface AdmissionStep {
  stepNumber: number;
  title: string;
  hindiTitle: string;
  description: string;
  hindiDescription: string;
  documents: string[];
  hindiDocuments: string[];
}

export interface DischargeStep {
  stepNumber: number;
  title: string;
  hindiTitle: string;
  description: string;
  hindiDescription: string;
  notes: string;
  hindiNotes: string;
}

export interface InsuranceProvider {
  name: string;
  type: 'Govt Scheme' | 'Private TPA' | 'General Insurance';
  category: string;
  cashlessSupport: boolean;
  contact: string;
}

export interface PatientTestimonialItem {
  id: string;
  patientName: string;
  hindiPatientName: string;
  location: string;
  hindiLocation: string;
  department: string;
  hindiDepartment: string;
  doctorName: string;
  hindiDoctorName: string;
  rating: number;
  reviewDate: string;
  hindiReviewDate: string;
  title: string;
  hindiTitle: string;
  story: string;
  hindiStory: string;
  treatment: string;
  hindiTreatment: string;
  avatar: string;
  verifiedPatient: boolean;
}

/* ========================================================================= */
/* 1. FREQUENTLY ASKED QUESTIONS (FAQS)                                      */
/* ========================================================================= */
export const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Questions', hindiLabel: 'सभी प्रश्न' },
  { id: 'general', label: 'General & Campus', hindiLabel: 'सामान्य व अस्पताल' },
  { id: 'opd', label: 'OPD & Appointments', hindiLabel: 'ओपीडी व अपॉइंटमेंट' },
  { id: 'inpatient', label: 'Admission & Wards', hindiLabel: 'भर्ती व वार्ड्स' },
  { id: 'insurance', label: 'Insurance & Billing', hindiLabel: 'बीमा व बिलिंग' },
  { id: 'diagnostics', label: 'Lab & Radiology', hindiLabel: 'जांच व रेडियोलॉजी' },
  { id: 'emergency', label: 'Emergency & Ambulance', hindiLabel: 'इमरजेंसी व एम्बुलेंस' },
] as const;

export const PATIENT_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'opd',
    question: 'How do I book an OPD consultation appointment in advance?',
    hindiQuestion: 'ओपीडी में डॉक्टर से परामर्श हेतु अग्रिम अपॉइंटमेंट कैसे बुक करें?',
    answer:
      'You can book an appointment 24/7 online through our website booking portal, via our WhatsApp Helpdesk (+91-98765-43210), or by calling our central hospital desk at +91-11-2345-6789. Walk-in token registrations are also open at our OPD reception starting 7:30 AM daily.',
    hindiAnswer:
      'आप हमारी वेबसाइट के ऑनलाइन बुकिंग पोर्टल, व्हाट्सएप हेल्पडेस्क (+91-98765-43210) अथवा केंद्रीय अस्पताल डेस्क +91-11-2345-6789 पर कॉल कर किसी भी समय अपॉइंटमेंट बुक कर सकते हैं। इसके अतिरिक्त ओपीडी काउंटर पर सुबह 7:30 बजे से वॉक-इन टोकन भी उपलब्ध हैं।',
    link: {
      text: 'Go to Online Booking Wizard',
      hindiText: 'ऑनलाइन अपॉइंटमेंट बुक करें',
      url: '/appointment',
    },
    tags: ['opd', 'booking', 'tokens', 'doctors'],
  },
  {
    id: 'faq-2',
    category: 'emergency',
    question: 'What is the response protocol for acute medical emergencies and heart attacks?',
    hindiQuestion: 'हार्ट अटैक या गंभीर आपातकालीन स्थिति में अस्पताल की क्या व्यवस्था है?',
    answer:
      'Our 24/7 Emergency & Level-1 Trauma Centre is staffed with emergency physicians, cardiologists, and anaesthetists round-the-clock. For acute chest pain (STEMI), our Cath Lab operates with a door-to-balloon time under 45 minutes. For immediate ambulance dispatch, call 1800-123-9999.',
    hindiAnswer:
      'हमारा 24/7 इमरजेंसी व लेवल-1 ट्रॉमा सेंटर चौबीसों घंटे आपातकालीन चिकित्सकों, हृदय रोग विशेषज्ञों और एनेस्थेटिस्ट्स से सुसज्जित है। सीने में तेज दर्द (हार्ट अटैक) के मामलों में हमारी कैथ लैब 45 मिनट के भीतर एंजियोप्लास्टी शुरू करती है। तत्काल एम्बुलेंस हेतु 1800-123-9999 पर कॉल करें।',
    link: {
      text: 'Emergency Services Details',
      hindiText: 'इमरजेंसी सेवा की जानकारी',
      url: '/facilities/emergency-trauma',
    },
    tags: ['emergency', 'ambulance', 'heart attack', 'trauma'],
  },
  {
    id: 'faq-3',
    category: 'insurance',
    question: 'Is Janhit Hospital empaneled with Ayushman Bharat (PM-JAY) and private TPAs?',
    hindiQuestion: 'क्या जनहित हॉस्पिटल आयुष्मान भारत (PM-JAY) और निजी टीपीए बीमा से संबद्ध है?',
    answer:
      'Yes. Janhit Hospital is fully empaneled under the Pradhan Mantri Jan Arogya Yojana (Ayushman Bharat) and CGHS, offering cashless treatment for eligible cardholders. We are also tied up with 35+ major private insurance companies and Third-Party Administrators (TPAs) including Star Health, HDFC ERGO, Care, Medi Assist, and ICICI Lombard.',
    hindiAnswer:
      'हाँ। जनहित हॉस्पिटल आयुष्मान भारत (PM-JAY) तथा सीजीएचएस (CGHS) के अंतर्गत पूर्णतः संबद्ध है, जहाँ पात्र लाभार्थियों को कैशलेस उपचार उपलब्ध कराया जाता है। इसके अतिरिक्त हम स्टार हेल्थ, एचडीएफसी एर्गो, केयर, मेडी असिस्ट और आईसीआईसीआई लोम्बार्ड सहित 35+ प्रमुख टीपीए से जुड़े हैं।',
    link: {
      text: 'View Complete Insurance & TPA Guide',
      hindiText: 'कैशलेस बीमा व टीपीए गाइड देखें',
      url: '/patient-corner/insurance-tpa',
    },
    tags: ['ayushman', 'pm-jay', 'insurance', 'cashless', 'tpa'],
  },
  {
    id: 'faq-4',
    category: 'inpatient',
    question: 'What are the visiting hours for general wards and critical care ICUs?',
    hindiQuestion: 'सामान्य वार्ड और आईसीयू (ICU) में मरीजों से मिलने का क्या समय है?',
    answer:
      'For General & Private Inpatient Wards, visiting hours are daily from 5:00 PM to 7:00 PM (maximum 2 visitors per patient with visitor passes). For ICUs and CCUs, visiting is strictly restricted to one immediate attendant between 11:00 AM - 12:00 PM and 5:00 PM - 6:00 PM to safeguard against infections.',
    hindiAnswer:
      'सामान्य एवं प्राइवेट वार्ड्स में मरीजों से मिलने का समय प्रतिदिन शाम 5:00 से 7:00 बजे तक है (पास धारक अधिकतम 2 परिजन)। आईसीयू एवं सीसीयू में संक्रमण रोकथाम हेतु केवल एक परिजन को सुबह 11:00 से 12:00 और शाम 5:00 से 6:00 बजे तक मिलने की अनुमति है।',
    link: {
      text: 'Read Visitor Policies & Guidelines',
      hindiText: 'मुलाकात नियम व दिशा-निर्देश पढ़ें',
      url: '/patient-corner/visitor-policy',
    },
    tags: ['visiting', 'hours', 'icu', 'passes', 'rules'],
  },
  {
    id: 'faq-5',
    category: 'diagnostics',
    question: 'How can I collect blood test reports and MRI/CT scan images online?',
    hindiQuestion: 'ब्लड टेस्ट, एमआरआई और सीटी स्कैन की जांच रिपोर्ट ऑनलाइन कैसे प्राप्त करें?',
    answer:
      'Diagnostic pathology reports and digital radiology scans are uploaded to our secure Patient Portal within 4 to 24 hours depending on the investigation. You will receive an SMS containing a direct encrypted link and your registered mobile OTP to view and download PDF reports.',
    hindiAnswer:
      'पैथोलॉजी और रेडियोलॉजी जांच रिपोर्ट 4 से 24 घंटे के भीतर हमारे सुरक्षित मरीज पोर्टल पर अपलोड कर दी जाती हैं। रिपोर्ट तैयार होते ही आपके पंजीकृत मोबाइल नंबर पर ओटीपी सहित एक सीधा एसएमएस लिंक भेजा जाता है जिससे आप पीडीएफ डाउनलोड कर सकते हैं।',
    link: {
      text: 'Explore NABL Diagnostic Laboratory',
      hindiText: 'एनएबीएल पैथोलॉजी लैब देखें',
      url: '/facilities/nabl-laboratory',
    },
    tags: ['reports', 'lab', 'mri', 'ct-scan', 'download'],
  },
  {
    id: 'faq-6',
    category: 'inpatient',
    question: 'What documents are required at the time of planned hospital admission?',
    hindiQuestion: 'योजनाबद्ध अस्पताल भर्ती (Planned Admission) के समय कौन से दस्तावेज आवश्यक हैं?',
    answer:
      'Please bring: (1) Government-issued Photo ID (Aadhaar Card, Voter ID, or Passport), (2) Attending doctor’s hospital admission advice slip, (3) Previous medical records and recent lab reports, (4) Health insurance e-card / Ayushman Bharat Golden Card, and (5) Current ongoing medication prescriptions.',
    hindiAnswer:
      'कृपया निम्नलिखित दस्तावेज साथ लाएं: (1) सरकारी फोटो पहचान पत्र (आधार कार्ड, वोटर आईडी या पासपोर्ट), (2) डॉक्टर का भर्ती पर्चा (Admission Slip), (3) पुरानी मेडिकल फाइल व हालिया जांच रिपोर्ट, (4) स्वास्थ्य बीमा कार्ड / आयुष्मान भारत गोल्डन कार्ड, और (5) नियमित चल रही दवाओं का पर्चा।',
    link: {
      text: 'Step-by-Step Admission Checklist',
      hindiText: 'भर्ती प्रक्रिया चेकलिस्ट',
      url: '/patient-corner/admission-guide',
    },
    tags: ['admission', 'documents', 'checklist', 'aadhaar'],
  },
  {
    id: 'faq-7',
    category: 'general',
    question: 'Is outside food or cooked meals permitted in patient rooms?',
    hindiQuestion: 'क्या अस्पताल में भर्ती मरीज के लिए बाहर का खाना लाने की अनुमति है?',
    answer:
      'To maintain strict infection control, nutrition balance, and dietary compliance prescribed by the treating physician, outside cooked food is not permitted. The hospital’s clinical nutrition department prepares fresh, hygienic, therapeutic meals tailored to each patient’s medical condition.',
    hindiAnswer:
      'संक्रमण नियंत्रण और मरीज के स्वास्थ्य व चिकित्सकीय डाइट चार्ट को ध्यान में रखते हुए बाहर का बना भोजन लाना प्रतिबंधित है। अस्पताल की क्लीनिकल न्यूट्रिशन टीम डॉक्टर के परामर्श अनुसार ताजा, स्वच्छ और अनुकूलित भोजन प्रदान करती है।',
    tags: ['food', 'diet', 'nutrition', 'cafeteria'],
  },
  {
    id: 'faq-8',
    category: 'insurance',
    question: 'How long does the cashless insurance pre-authorization approval take?',
    hindiQuestion: 'कैशलेस मेडिक्लेम प्री-ऑथराइजेशन स्वीकृति में कितना समय लगता है?',
    answer:
      'For planned admissions, pre-authorization should ideally be submitted 48-72 hours prior to hospitalization. Insurance TPAs typically respond within 2 to 4 hours of complete document submission. For emergency admissions, our 24/7 TPA desk initiates emergency approval within 2 hours of arrival.',
    hindiAnswer:
      'योजनाबद्ध भर्ती हेतु प्री-ऑथराइजेशन फॉर्म भर्ती से 48-72 घंटे पूर्व जमा करना उत्तम है। सभी दस्तावेज जमा होने के 2 से 4 घंटे में टीपीए द्वारा प्रारंभिक स्वीकृति दी जाती है। इमरजेंसी में हमारा टीपीए डेस्क भर्ती के 2 घंटे के भीतर आपातकालीन प्रक्रिया शुरू करता है।',
    tags: ['tpa', 'pre-auth', 'cashless', 'insurance'],
  },
  {
    id: 'faq-9',
    category: 'general',
    question: 'What are the hospital pharmacy and emergency medicine timings?',
    hindiQuestion: 'अस्पताल फार्मेसी (दवा काउंटर) का समय क्या है?',
    answer:
      'Janhit Hospital operates a fully stocked, 24/7 In-House Central Pharmacy located on the Ground Floor near the Emergency entrance, ensuring continuous availability of critical medications, surgical disposables, and vaccines.',
    hindiAnswer:
      'जनहित अस्पताल के ग्राउंड फ्लोर पर इमरजेंसी गेट के निकट 24 घंटे सेंट्रल फार्मेसी संचालित है, जहाँ सभी जीवन रक्षक दवाएं, सर्जिकल सामग्री और टीके निरंतर उपलब्ध रहते हैं।',
    tags: ['pharmacy', 'medicines', '24/7'],
  },
  {
    id: 'faq-10',
    category: 'opd',
    question: 'Can I reschedule or cancel my confirmed doctor appointment?',
    hindiQuestion: 'क्या मैं अपना निर्धारित डॉक्टर अपॉइंटमेंट बदल या निरस्त कर सकता हूँ?',
    answer:
      'Yes, you can reschedule or cancel your appointment up to 2 hours before the scheduled time slot by calling our helpline (+91-11-2345-6789) or via our WhatsApp Helpdesk using your reference number (JH-2026-XXXX).',
    hindiAnswer:
      'हाँ, आप अपने परामर्श समय से 2 घंटे पहले तक अस्पताल हेल्पलाइन (+91-11-2345-6789) पर कॉल करके अथवा व्हाट्सएप पर अपना संदर्भ नंबर (JH-2026-XXXX) साझा कर अपॉइंटमेंट पुनर्निर्धारित या निरस्त कर सकते हैं।',
    tags: ['reschedule', 'cancel', 'appointment'],
  },
];

/* ========================================================================= */
/* 2. PATIENT RIGHTS & RESPONSIBILITIES (NABH STANDARD)                      */
/* ========================================================================= */
export const PATIENT_RIGHTS: PatientRight[] = [
  {
    id: 'right-1',
    title: 'Right to Respect and Dignity',
    hindiTitle: 'सम्मान एवं गरिमा का अधिकार',
    description:
      'Every patient has the right to receive compassionate, respectful healthcare free from discrimination based on gender, religion, race, social background, or disability.',
    hindiDescription:
      'प्रत्येक मरीज को जाति, धर्म, लिंग, सामाजिक स्थिति अथवा दिव्यांगता के भेदभाव के बिना आदर, सहानुभूति और गरिमापूर्ण स्वास्थ्य सेवा पाने का अधिकार है।',
    iconName: 'HeartHandshake',
  },
  {
    id: 'right-2',
    title: 'Right to Informed Consent',
    hindiTitle: 'सूचित सहमति (Informed Consent) का अधिकार',
    description:
      'Patients have the right to receive clear, comprehensible information regarding their clinical diagnosis, proposed treatment options, associated risks, and potential alternatives before consenting to any surgical or medical procedure.',
    hindiDescription:
      'किसी भी ऑपरेशन अथवा उपचार से पूर्व अपनी बीमारी, उपचार के विकल्पों, संभावित खतरों और अन्य उपलब्ध उपायों की सरल भाषा में संपूर्ण जानकारी प्राप्त करने का अधिकार है।',
    iconName: 'FileCheck',
  },
  {
    id: 'right-3',
    title: 'Right to Medical Privacy & Confidentiality',
    hindiTitle: 'गोपनीयता एवं निजता का अधिकार',
    description:
      'All personal medical examinations, diagnostic records, test reports, and electronic health information are kept strictly confidential under NABH and statutory healthcare data protection standards.',
    hindiDescription:
      'मरीज की शारीरिक जांच, मेडिकल रिपोर्ट्स और स्वास्थ्य संबंधी सभी व्यक्तिगत जानकारियां एनएबीएच मानकों के तहत पूर्णतः गोपनीय रखी जाती हैं।',
    iconName: 'ShieldCheck',
  },
  {
    id: 'right-4',
    title: 'Right to Transparent Billing & Estimates',
    hindiTitle: 'पारदर्शी बिलिंग एवं खर्च अनुमान का अधिकार',
    description:
      'Patients have the right to receive an itemized cost estimate prior to hospital admission and a transparent, itemized final bill explaining all physician fees, medications, investigations, and bed charges.',
    hindiDescription:
      'भर्ती से पूर्व अनुमानित खर्च और डिस्चार्ज के समय विस्तृत, पारदर्शी बिल प्राप्त करने का अधिकार है, जिसमें डॉक्टर फीस, दवाओं और जांचों का स्पष्ट ब्योरा हो।',
    iconName: 'Receipt',
  },
  {
    id: 'right-5',
    title: 'Right to Seek a Second Medical Opinion',
    hindiTitle: 'द्वितीय चिकित्सीय राय (Second Opinion) का अधिकार',
    description:
      'Patients and their families are fully entitled to seek a second opinion from any independent external medical expert, with prompt assistance in accessing diagnostic case summaries.',
    hindiDescription:
      'मरीज और उनके परिजनों को उपचार के संबंध में किसी भी स्वतंत्र विशेषज्ञ डॉक्टर से दूसरी राय लेने का अधिकार है और अस्पताल इसमें सहयोग प्रदान करता है।',
    iconName: 'UserCheck',
  },
  {
    id: 'right-6',
    title: 'Right to File Grievance and Feedback',
    hindiTitle: 'शिकायत निवारण एवं प्रतिक्रिया का अधिकार',
    description:
      'Patients have the right to express grievances, complaints, or constructive feedback to the hospital quality management cell and receive a formal investigation response within 48 hours.',
    hindiDescription:
      'मरीजों को सेवाओं में किसी कमी या असुविधा पर अस्पताल प्रबंधन को शिकायत दर्ज करने का अधिकार है, जिसका समाधान 48 घंटे के भीतर सुनिश्चित किया जाता है।',
    iconName: 'MessageSquareWarning',
  },
];

export const PATIENT_RESPONSIBILITIES: PatientResponsibility[] = [
  {
    id: 'resp-1',
    title: 'Provide Complete & Accurate Medical History',
    hindiTitle: 'सटीक एवं संपूर्ण मेडिकल इतिहास साझा करना',
    description:
      'Patients must provide full and truthful details regarding past illnesses, hospitalizations, known drug allergies, ongoing medications, and chronic conditions to their treating team.',
    hindiDescription:
      'इलाज कर रहे डॉक्टरों को पुरानी बीमारियों, पूर्व सर्जरी, दवाओं से एलर्जी और वर्तमान में चल रही सभी दवाइयों की सही-सही जानकारी देना आवश्यक है।',
    iconName: 'ClipboardList',
  },
  {
    id: 'resp-2',
    title: 'Adhere to Clinical Treatment Protocols',
    hindiTitle: 'चिकित्सकीय परामर्श एवं निर्देशों का पालन',
    description:
      'Patients and attendants are expected to follow the instructions of doctors, nurses, and allied healthcare professionals regarding medication schedules, fasting requirements, and post-operative mobility.',
    hindiDescription:
      'दवाइयों का समय पर सेवन, जांच पूर्व भूखे रहने के नियम और ऑपरेशन के बाद डॉक्टर व नर्सिंग स्टाफ द्वारा दिए गए दिशा-निर्देशों का निष्ठापूर्वक पालन करें।',
    iconName: 'Stethoscope',
  },
  {
    id: 'resp-3',
    title: 'Maintain Hospital Silence & Decorum',
    hindiTitle: 'अस्पताल में शांति एवं स्वच्छता बनाए रखना',
    description:
      'Respect the peace and recovery of other critically ill patients by observing quiet hours, keeping mobile phones on silent mode in wards and ICUs, and refraining from loud conversations.',
    hindiDescription:
      'अन्य गंभीर मरीजों के स्वास्थ्य लाभ हेतु अस्पताल में शांति बनाए रखें, मोबाइल फोन साइलेंट रखें और वार्ड व आईसीयू क्षेत्र में अनावश्यक शोर न करें।',
    iconName: 'VolumeX',
  },
  {
    id: 'resp-4',
    title: 'Comply with Infection Control Policies',
    hindiTitle: 'संक्रमण नियंत्रण नियमों का कड़ाई से पालन',
    description:
      'Sanitize hands frequently, wear medical masks inside ICUs and isolation wards, and strictly refrain from bringing outside flowers, street food, or unprescribed medicines into hospital premises.',
    hindiDescription:
      'हाथों को नियमित सैनिटाइज करें, संवेदनशील वार्डों में मास्क पहनें तथा बाहर का खाना, फूल या बिना सलाह की दवाइयां अस्पताल परिसर में न लाएं।',
    iconName: 'ShieldAlert',
  },
  {
    id: 'resp-5',
    title: 'Respect Visiting Hours & Passes',
    hindiTitle: 'मुलाकात समय व विज़िटर पास का सम्मान',
    description:
      'Adhere strictly to designated visiting slots and return visitor identity passes at the nursing station during patient discharge.',
    hindiDescription:
      'निर्धारित समय पर ही मरीज से मिलें और डिस्चार्ज के समय नर्सिंग काउंटर पर आगंतुक पास (Visitor Pass) अनिवार्य रूप से जमा कराएं।',
    iconName: 'Clock',
  },
  {
    id: 'resp-6',
    title: 'Timely Settlement of Financial Obligations',
    hindiTitle: 'अस्पताल देयों का समय पर भुगतान',
    description:
      'Ensure prompt settlement of hospital invoices, TPA co-payments, and non-medical deductibles in accordance with the hospital billing guidelines.',
    hindiDescription:
      'अस्पताल बिलों, टीपीए सह-भुगतान (Co-pay) और नॉन-मेडिकल खर्चों का समय पर भुगतान कर पारदर्शी वित्तीय प्रक्रिया में सहयोग करें।',
    iconName: 'CreditCard',
  },
];

/* ========================================================================= */
/* 3. VISITOR GUIDELINES & POLICIES                                          */
/* ========================================================================= */
export const VISITOR_GUIDELINES: VisitorGuideline[] = [
  {
    zone: 'General & Private Inpatient Wards',
    hindiZone: 'सामान्य एवं प्राइवेट वार्ड्स',
    timings: '05:00 PM – 07:00 PM (Daily)',
    hindiTimings: 'शाम 05:00 से 07:00 बजे (प्रतिदिन)',
    maxVisitors: '2 Visitors per patient (with valid pass)',
    hindiMaxVisitors: 'अधिकतम 2 आगंतुक (वैध पास के साथ)',
    rules: [
      'Visitors must obtain an official attendant pass from the admission reception desk.',
      'Children below 12 years of age are not permitted inside inpatient wards for health protection.',
      'Outside prepared meals, street food, and floral arrangements are strictly prohibited.',
      'Hand hygiene is mandatory before entering and after leaving patient rooms.',
    ],
    hindiRules: [
      'आगंतुकों को प्रवेश हेतु रिसेप्शन काउंटर से वैध विज़िटर पास प्राप्त करना अनिवार्य है।',
      'संक्रमण से बचाव के लिए 12 वर्ष से कम उम्र के बच्चों का वार्ड में प्रवेश वर्जित है।',
      'बाहर का बना भोजन, फास्ट फूड और फूल वार्ड में ले जाना पूरी तरह प्रतिबंधित है।',
      'मरीज के कमरे में प्रवेश करने से पूर्व और निकलते समय हाथों को सैनिटाइज करना अनिवार्य है।',
    ],
  },
  {
    zone: 'Intensive Care Units (ICU / CCU / NICU)',
    hindiZone: 'गहन चिकित्सा इकाई (ICU / CCU / NICU)',
    timings: '11:00 AM – 12:00 PM & 05:00 PM – 06:00 PM',
    hindiTimings: 'सुबह 11:00 से 12:00 व शाम 05:00 से 06:00 बजे',
    maxVisitors: 'Strictly 1 immediate family attendant at a time',
    hindiMaxVisitors: 'एक समय में केवल 1 निकटतम परिजन',
    rules: [
      'Visitors must put on sanitized protective gowns, shoe covers, and medical grade N95 masks provided at the ICU airlock.',
      'Mobile phones must be powered off or switched to flight mode inside ICU areas to avoid medical monitor interference.',
      'Doctor briefings regarding patient clinical parameters take place daily between 12:00 PM and 1:00 PM.',
      'Touching invasive arterial lines, ventilators, catheters, or infusion pumps is strictly prohibited.',
    ],
    hindiRules: [
      'आईसीयू प्रवेश द्वार पर उपलब्ध प्रोटेक्टिव गाउन, शू-कवर और मेडिकल मास्क पहनना अनिवार्य है।',
      'वेंटिलेटर व मॉनिटर्स के सुरक्षित संचालन हेतु मोबाइल फोन पूरी तरह बंद अथवा साइलेंट रखें।',
      'मरीज की स्थिति पर वरिष्ठ डॉक्टर द्वारा दैनिक ब्रीफिंग दोपहर 12:00 से 01:00 बजे दी जाती है।',
      'मरीज से जुड़े चिकित्सा उपकरणों, ड्रिप या मॉनिटर्स को छूने का प्रयास न करें।',
    ],
  },
];

/* ========================================================================= */
/* 4. ADMISSION INFORMATION & GUIDE                                          */
/* ========================================================================= */
export const ADMISSION_STEPS: AdmissionStep[] = [
  {
    stepNumber: 1,
    title: 'Consultation & Admission Recommendation',
    hindiTitle: 'डॉक्टर परामर्श एवं भर्ती सलाह',
    description:
      'The attending hospital specialist examines the patient in the OPD or Emergency Department and issues an official Admission Advice Slip detailing medical diagnosis and required room category.',
    hindiDescription:
      'विशेषज्ञ चिकित्सक मरीज की जांच कर बीमारी के अनुसार आवश्यक उपचार व उपयुक्त वार्ड की सिफारिश करते हुए आधिकारिक एडमिशन स्लिप जारी करते हैं।',
    documents: ['Doctor OPD Prescription', 'Clinical Investigation Reports'],
    hindiDocuments: ['डॉक्टर का ओपीडी पर्चा', 'पूर्व जांच रिपोर्ट्स'],
  },
  {
    stepNumber: 2,
    title: 'Registration & Desk Verification',
    hindiTitle: 'पंजीकरण एवं दस्तावेज सत्यापन',
    description:
      'Visit the Central Admission Desk on the Ground Floor. Provide patient identification proofs and select your preferred accommodation class (Suite, Deluxe Single, Twin Sharing, or General Ward).',
    hindiDescription:
      'ग्राउंड फ्लोर पर सेंट्रल एडमिशन काउंटर पर मरीज की आईडी सत्यापित कराएं और अपनी पसंद अनुसार कमरा (सूट, डीलक्स, ट्विन शेयरिंग या सामान्य वार्ड) चुनें।',
    documents: ['Government Photo ID (Aadhaar / Voter ID)', 'Passport photo'],
    hindiDocuments: ['सरकारी पहचान पत्र (आधार / वोटर आईडी)', 'पासपोर्ट फोटो'],
  },
  {
    stepNumber: 3,
    title: 'Insurance / TPA Pre-Authorization Desk',
    hindiTitle: 'टीपीए व आयुष्मान भारत हेल्पडेस्क',
    description:
      'For cashless medical insurance, our dedicated TPA desk immediately verifies your e-card policy and submits the pre-authorization claim to your insurer for prompt initial approval.',
    hindiDescription:
      'कैशलेस बीमा सुविधा हेतु हमारा टीपीए डेस्क आपकी पॉलिसी का सत्यापन कर कंपनी को प्री-ऑथराइजेशन भेजकर त्वरित प्रारंभिक मंजूरी प्राप्त करता है।',
    documents: ['TPA / Insurance Card', 'Policy Schedule', 'Ayushman Golden Card (if applicable)'],
    hindiDocuments: ['टीपीए / हेल्थ इंश्योरेंस कार्ड', 'पॉलिसी कॉपी', 'आयुष्मान गोल्डन कार्ड (यदि लागू हो)'],
  },
  {
    stepNumber: 4,
    title: 'Initial Deposit & Room Allotment',
    hindiTitle: 'प्रारंभिक जमा व कक्ष आवंटन',
    description:
      'For non-cashless admissions, a nominal advance deposit is collected. The patient is issued an identification wristband and escorted to their assigned room by our nursing staff.',
    hindiDescription:
      'नॉन-कैशलेस मामलों में अनुमानित प्रारंभिक अग्रिम राशि जमा की जाती है। मरीज को बारकोड रिस्टबैंड पहनाकर कमरे में शिफ्ट किया जाता है।',
    documents: ['Initial Admission Receipt', 'Patient Identification Band'],
    hindiDocuments: ['एडमिशन रसीद', 'पेशेंट पहचान बैंड'],
  },
  {
    stepNumber: 5,
    title: 'Clinical Handover & Care Orientation',
    hindiTitle: 'क्लीनिकल हैंडओवर व वार्ड परिचय',
    description:
      'The ward primary nurse checks baseline vitals, completes allergy assessments, reviews ongoing medications, and explains nurse call buttons and dining facilities.',
    hindiDescription:
      'वार्ड की नर्स मरीज के वाइटल्स दर्ज करती हैं, दवाइयों व एलर्जी की जानकारी लेती हैं और कॉल बेल व वार्ड सुविधाओं से अवगत कराती हैं।',
    documents: ['Nursing Assessment File', 'Dietary Chart'],
    hindiDocuments: ['नर्सिंग असेसमेंट फाइल', 'डाइट चार्ट'],
  },
];

/* ========================================================================= */
/* 5. DISCHARGE INFORMATION & PROCESS                                        */
/* ========================================================================= */
export const DISCHARGE_STEPS: DischargeStep[] = [
  {
    stepNumber: 1,
    title: 'Doctor Round & Medical Clearance',
    hindiTitle: 'डॉक्टर राउंड एवं मेडिकल क्लीयरेंस',
    description:
      'During morning rounds, the treating physician reviews clinical recovery and confirms patient fitness for discharge, authorizing the discharge process in the hospital system.',
    hindiDescription:
      'सुबह के राउंड में विशेषज्ञ चिकित्सक मरीज के स्वास्थ्य लाभ का मूल्यांकन कर स्वस्थ पाए जाने पर डिस्चार्ज की औपचारिक संस्तुति प्रदान करते हैं।',
    notes: 'Usually initiated between 09:00 AM – 11:00 AM.',
    hindiNotes: 'प्रायः सुबह 09:00 से 11:00 बजे के बीच शुरू किया जाता है।',
  },
  {
    stepNumber: 2,
    title: 'Summary Preparation & Pharmacy Audit',
    hindiTitle: 'डिस्चार्ज समरी तैयार करना व फार्मेसी ऑडिट',
    description:
      'The clinical team prepares a detailed Discharge Summary including clinical course, surgical notes, diagnostic outcomes, and discharge medication prescriptions.',
    hindiDescription:
      'डॉक्टर व नर्सिंग टीम संपूर्ण उपचार विवरण, ऑपरेशन नोट्स, जांच परिणाम और आगे की दवाइयों से युक्त विस्तृत डिस्चार्ज समरी तैयार करते हैं।',
    notes: 'Includes medication reconciliation to prevent drug duplications.',
    hindiNotes: 'दवाओं की परस्पर जांच कर सुरक्षित पर्चा तैयार किया जाता है।',
  },
  {
    stepNumber: 3,
    title: 'Final Billing & TPA Claim Settlement',
    hindiTitle: 'अंतिम बिलिंग व टीपीए अंतिम अनुमोदन',
    description:
      'The billing department tallies all consumables, consultations, and lab services. For cashless patients, the final discharge bill is transmitted to the TPA for final settlement approval.',
    hindiDescription:
      'बिलिंग विभाग सभी दवाओं, जांचों व डॉक्टर विजिट्स का हिसाब करता है। कैशलेस मरीजों हेतु अंतिम बिल टीपीए को भेजकर फाइनल अप्रूवल लिया जाता है।',
    notes: 'TPA final authorization generally takes 2 to 3 hours.',
    hindiNotes: 'टीपीए से फाइनल अप्रूवल में 2 से 3 घंटे का समय लगता है।',
  },
  {
    stepNumber: 4,
    title: 'Discharge Counseling & Medication Handover',
    hindiTitle: 'दवाइयों की समझाइश व स्वास्थ्य परामर्श',
    description:
      'A clinical pharmacist and nurse explain home medication dosages, wound care instructions, dietary restrictions, and emergency red-flag warning signs.',
    hindiDescription:
      'फार्मासिस्ट और नर्स घर पर दवाइयां लेने के सही नियम, घाव की देखभाल, खानपान के परहेज और किसी भी आपात स्थिति के संकेतों की विस्तार से समझाइश देते हैं।',
    notes: 'Patients receive an emergency contact number for post-discharge queries.',
    hindiNotes: 'डिस्चार्ज के बाद किसी भी सवाल हेतु इमरजेंसी फोन नंबर दिया जाता है।',
  },
  {
    stepNumber: 5,
    title: 'Final Settlement & Departure',
    hindiTitle: 'अंतिम रसीद व अस्पताल से विदाई',
    description:
      'Attendant collects the finalized bill, original test reports, discharge summary booklet, and gate pass. Our patient transport team assists to the vehicle.',
    hindiDescription:
      'परिजन बिल की प्रति, मूल जांच रिपोर्ट, डिस्चार्ज समरी और गेट पास प्राप्त करते हैं। अस्पताल का स्टाफ मरीज को वाहन तक सुरक्षित पहुंचाने में सहायता करता है।',
    notes: 'First follow-up consultation is scheduled free within 7 days.',
    hindiNotes: '7 दिनों के भीतर पहला फॉलो-अप परामर्श पूर्णतः निःशुल्क रहता है।',
  },
];

/* ========================================================================= */
/* 6. INSURANCE & TPA EMPANELMENT DATA                                       */
/* ========================================================================= */
export const INSURANCE_PROVIDERS: InsuranceProvider[] = [
  { name: 'Ayushman Bharat (PM-JAY)', type: 'Govt Scheme', category: 'Central Govt', cashlessSupport: true, contact: '14555' },
  { name: 'Central Govt Health Scheme (CGHS)', type: 'Govt Scheme', category: 'Central Govt', cashlessSupport: true, contact: '1800-208-8900' },
  { name: 'Ex-Servicemen Contributory Health Scheme (ECHS)', type: 'Govt Scheme', category: 'Defence', cashlessSupport: true, contact: '1800-114-115' },
  { name: 'Star Health & Allied Insurance', type: 'Private TPA', category: 'Private Health', cashlessSupport: true, contact: '1800-425-2255' },
  { name: 'HDFC ERGO General Insurance', type: 'General Insurance', category: 'Private Health', cashlessSupport: true, contact: '1800-266-6200' },
  { name: 'Care Health Insurance', type: 'Private TPA', category: 'Private Health', cashlessSupport: true, contact: '1800-102-4488' },
  { name: 'ICICI Lombard General Insurance', type: 'General Insurance', category: 'Private Health', cashlessSupport: true, contact: '1800-2666' },
  { name: 'Medi Assist Insurance TPA', type: 'Private TPA', category: 'Third Party Administrator', cashlessSupport: true, contact: '1800-425-9449' },
  { name: 'Paramount Health Services TPA', type: 'Private TPA', category: 'Third Party Administrator', cashlessSupport: true, contact: '022-66620808' },
  { name: 'Vidal Health Insurance TPA', type: 'Private TPA', category: 'Third Party Administrator', cashlessSupport: true, contact: '1800-425-8885' },
  { name: 'Bajaj Allianz General Insurance', type: 'General Insurance', category: 'Private Health', cashlessSupport: true, contact: '1800-209-5858' },
  { name: 'Max Bupa (Niva Bupa) Health Insurance', type: 'Private TPA', category: 'Private Health', cashlessSupport: true, contact: '1860-500-8888' },
];

/* ========================================================================= */
/* 7. VERIFIED PATIENT TESTIMONIALS (CONSENT APPROVED)                       */
/* ========================================================================= */
export const VERIFIED_PATIENT_TESTIMONIALS: PatientTestimonialItem[] = [
  {
    id: 'test-1',
    patientName: 'Rameshwar Dayal Verma',
    hindiPatientName: 'रामेश्वर दयाल वर्मा',
    location: 'New Delhi',
    hindiLocation: 'नई दिल्ली',
    department: 'Cardiology & Heart Care',
    hindiDepartment: 'कार्डियोलॉजी (हृदय रोग)',
    doctorName: 'Dr. Ashok Sharma',
    hindiDoctorName: 'डॉ. अशोक शर्मा',
    rating: 5,
    reviewDate: '14 February 2026',
    hindiReviewDate: '14 फरवरी 2026',
    title: 'Life Saved Within 20 Minutes of Heart Attack',
    hindiTitle: 'हार्ट अटैक के 20 मिनट के भीतर मिली नई जिंदगी',
    story:
      'When I suffered acute chest pain at midnight, Janhit Hospital emergency team started catheterization within 18 minutes. Dr. Ashok Sharma saved my life with extreme professionalism. The nursing staff in the Coronary Care Unit was gentle and caring throughout my 3-day recovery.',
    hindiStory:
      'आधी रात को जब मुझे सीने में तेज दर्द हुआ, जनहित अस्पताल की इमरजेंसी टीम ने 18 मिनट में कैथ लैब शुरू कर दी। डॉ. अशोक शर्मा ने समय पर एंजियोप्लास्टी कर मेरी जान बचाई। सीसीयू में सिस्टर्स का व्यवहार अत्यंत संवेदनशील व आत्मीय रहा।',
    treatment: 'Emergency Primary Angioplasty',
    hindiTreatment: 'आपातकालीन प्राइमरी एंजियोप्लास्टी',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
    verifiedPatient: true,
  },
  {
    id: 'test-2',
    patientName: 'Smt. Kamla Devi',
    hindiPatientName: 'श्रीमती कमला देवी',
    location: 'Ghaziabad, UP',
    hindiLocation: 'गाजियाबाद, उत्तर प्रदेश',
    department: 'Orthopaedics & Joint Care',
    hindiDepartment: 'ऑर्थोपेडिक्स (हड्डी एवं जोड़ रोग)',
    doctorName: 'Dr. Rajesh Singh',
    hindiDoctorName: 'डॉ. राजेश सिंह',
    rating: 5,
    reviewDate: '28 January 2026',
    hindiReviewDate: '28 जनवरी 2026',
    title: 'Walking Pain-Free on the 2nd Day of Knee Replacement',
    hindiTitle: 'घुटना बदलने के दूसरे दिन ही बिना दर्द चलने लगी',
    story:
      'I had been bedridden for 3 years due to severe bilateral osteoarthritis. Thanks to Dr. Rajesh Singh and MAKO robotic surgery, I started walking pain-free on the 2nd day itself. The hospital wards are exceptionally clean, and physiotherapy sessions were world-class.',
    hindiStory:
      'दोनों घुटनों के गंभीर गठिया के कारण मैं 3 वर्षों से चल-फिर नहीं पाती थी। डॉ. राजेश सिंह और रोबोटिक सर्जरी की बदौलत ऑपरेशन के दूसरे दिन ही मैं बिना दर्द चलने लगी। अस्पताल के कमरे बेहद स्वच्छ हैं और फिजियोथेरेपिस्ट का सहयोग सराहनीय रहा।',
    treatment: 'Bilateral Robotic Total Knee Replacement',
    hindiTreatment: 'दोनों घुटनों का रोबोटिक रिप्लेसमेंट',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80',
    verifiedPatient: true,
  },
  {
    id: 'test-3',
    patientName: 'Vikram Joshi & Meena Joshi',
    hindiPatientName: 'विक्रम जोशी एवं मीना जोशी',
    location: 'Faridabad, Haryana',
    hindiLocation: 'फरीदाबाद, हरियाणा',
    department: 'Paediatrics & Neonatology',
    hindiDepartment: 'बाल रोग एवं एनआईसीयू',
    doctorName: 'Dr. Sunita Deshmukh',
    hindiDoctorName: 'डॉ. सुनीता देशमुख',
    rating: 5,
    reviewDate: '12 January 2026',
    hindiReviewDate: '12 जनवरी 2026',
    title: 'Preterm Baby Cared Like Family in Level-3 NICU',
    hindiTitle: 'लेवल-3 एनआईसीयू में हमारे नवजात की परिवार जैसी देखभाल',
    story:
      'Our baby boy was born prematurely at 31 weeks weighing just 1.3 kg. Dr. Sunita Deshmukh and the dedicated Level-3 NICU nursing team monitored him around the clock for 24 days. Today, our baby is thriving happily at home. We will be forever indebted.',
    hindiStory:
      'हमारा बेटा 31वें सप्ताह में मात्र 1.3 किग्रा वजन के साथ जन्मा था। डॉ. सुनीता देशमुख और लेवल-3 एनआईसीयू की समर्पित टीम ने 24 दिनों तक दिन-रात उसकी देखभाल की। आज हमारा बच्चा घर पर पूर्णतः स्वस्थ है। जनहित अस्पताल के प्रति हम सदैव आभारी रहेंगे।',
    treatment: 'Preterm Newborn Intensive Care (31 Weeks)',
    hindiTreatment: 'अति-अपरिपक्व नवजात गहन देखभाल',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
    verifiedPatient: true,
  },
  {
    id: 'test-4',
    patientName: 'Col. Arvind Saxena (Retd.)',
    hindiPatientName: 'कर्नल अरविंद सक्सेना (से.नि.)',
    location: 'Noida, UP',
    hindiLocation: 'नोएडा, उत्तर प्रदेश',
    department: 'Neurology & Neuro Surgery',
    hindiDepartment: 'न्यूरोलॉजी एवं स्पाइन सर्जरी',
    doctorName: 'Dr. Arvind Sharma',
    hindiDoctorName: 'डॉ. अरविंद शर्मा',
    rating: 5,
    reviewDate: '02 December 2025',
    hindiReviewDate: '02 दिसंबर 2025',
    title: 'Complex Spinal Decompression with Rapid Mobilization',
    hindiTitle: 'जटिल स्पाइन सर्जरी के बाद सामान्य जीवन में तीव्र वापसी',
    story:
      'Suffering from severe lumbar canal stenosis, I had lost sensation in my right leg. Dr. Arvind Sharma performed a minimally invasive endoscopic decompression. Within 48 hours, I was discharged walking upright. The cashless ECHS desk executed my clearance with zero hassle.',
    hindiStory:
      'रीढ़ की नस दबने से मेरे दाहिने पैर में सुन्नपन आ गया था। डॉ. अरविंद शर्मा ने मिनिमली इनवेसिव एंडोस्कोपिक सर्जरी की। मात्र 48 घंटे में मैं बिना सहारे चलने लगा। अस्पताल के ईसीएचएस कैशलेस डेस्क ने बेहद सुगमता से प्रक्रिया पूरी की।',
    treatment: 'Microscopic Lumbar Discectomy',
    hindiTreatment: 'माइक्रोस्कोपिक लम्बर डिस्क सर्जरी',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=240&q=80',
    verifiedPatient: true,
  },
  {
    id: 'test-5',
    patientName: 'Priyanka Singhal',
    hindiPatientName: 'प्रियंका सिंघल',
    location: 'Gurugram',
    hindiLocation: 'गुरुग्राम',
    department: 'Obstetrics & Gynaecology',
    hindiDepartment: 'प्रसूति एवं स्त्री रोग',
    doctorName: 'Dr. Sunita Deshmukh',
    hindiDoctorName: 'डॉ. सुनीता देशमुख',
    rating: 5,
    reviewDate: '19 November 2025',
    hindiReviewDate: '19 नवंबर 2025',
    title: 'Gentle, Safe and Respectful Maternity Experience',
    hindiTitle: 'सुरक्षित, सुखद एवं अत्यंत संवेदनशील मातृत्व अनुभव',
    story:
      'Delivered my first daughter at Janhit Hospital. The labor suite was serene, clean, and equipped with modern monitoring. The nurses guided my breathing exercises with immense patience. Transparent billing and no hidden charges at all.',
    hindiStory:
      'जनहित अस्पताल में मेरी प्रथम बिटिया का जन्म हुआ। लेबर रूम अत्यंत शांत, स्वच्छ और आधुनिक सुविधाओं से लैस था। सिस्टर्स ने बहुत धैर्य से सहयोग दिया। सबसे अच्छी बात यह रही कि बिलिंग में कोई छिपा हुआ खर्च नहीं था।',
    treatment: 'Normal Delivery & Painless Labor',
    hindiTreatment: 'सामान्य प्रसव एवं दर्द-रहित लेबर',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
    verifiedPatient: true,
  },
  {
    id: 'test-6',
    patientName: 'Mohd. Salim Khan',
    hindiPatientName: 'मोहम्मद सलीम खान',
    location: 'Aligarh, UP',
    hindiLocation: 'अलीगढ़, उत्तर प्रदेश',
    department: 'Gastroenterology & Laparoscopy',
    hindiDepartment: 'गैस्ट्रोएंटरोलॉजी एवं दूरबीन सर्जरी',
    doctorName: 'Dr. Manoj Kumar',
    hindiDoctorName: 'डॉ. मनोज कुमार',
    rating: 5,
    reviewDate: '04 October 2025',
    hindiReviewDate: '04 अक्टूबर 2025',
    title: 'Gallbladder Laparoscopy – Discharged in 24 Hours',
    hindiTitle: 'पित्ताशय की दूरबीन सर्जरी – 24 घंटे में छुट्टी',
    story:
      'Had multiple painful gallstones. Dr. Manoj Kumar performed laparoscopic cholecystectomy with tiny pinhole incisions. Virtually zero pain, and I returned home the next afternoon. Very impressive surgical infrastructure.',
    hindiStory:
      'पित्त की थैली में कई पथरी होने से असहनीय दर्द था। डॉ. मनोज कुमार ने दूरबीन विधि से सर्जरी की, जिसमें नाममात्र के चीरे लगे। अगले दिन दोपहर में मुझे छुट्टी मिल गई और दर्द बिल्कुल नहीं हुआ। बेहतरीन सर्जिकल व्यवस्था।',
    treatment: 'Laparoscopic Cholecystectomy',
    hindiTreatment: 'दूरबीन विधि से पित्ताशय की थैली निकालना',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80',
    verifiedPatient: true,
  },
];

/* ========================================================================= */
/* 8. GENERAL PATIENT INSTRUCTIONS                                           */
/* ========================================================================= */
export const GENERAL_PATIENT_INSTRUCTIONS = [
  {
    title: 'Hospital Silent Zone Policy',
    hindiTitle: 'अस्पताल शांत क्षेत्र नियम',
    description: 'Keep all electronic devices and mobile phones on silent or vibration mode in all inpatient wings, consultation rooms, and ICUs.',
    hindiDescription: 'सभी वार्ड्स, कंसल्टेशन कक्षों और आईसीयू में मोबाइल फोन साइलेंट अथवा वाइब्रेशन मोड पर रखें।',
  },
  {
    title: 'Hand Hygiene Protocol',
    hindiTitle: 'हैंड सैनिटाइजेशन प्रोटोकॉल',
    description: 'Sanitize hands using automatic wall-mounted rub dispensers before entering and after exiting patient suites to prevent cross-contamination.',
    hindiDescription: 'संक्रमण से बचाव हेतु मरीज के कमरे में प्रवेश करने से पूर्व और बाहर निकलने के बाद वॉल सैनिटाइजर का उपयोग करें।',
  },
  {
    title: 'Valuables & Jewellery Advisory',
    hindiTitle: 'कीमती सामान व आभूषण संबंधी सलाह',
    description: 'Please do not keep large sums of cash, expensive electronics, or gold jewellery in inpatient rooms. Hospital management is not liable for personal losses.',
    hindiDescription: 'अस्पताल के कमरे में अत्यधिक नकदी, महंगे इलेक्ट्रॉनिक्स अथवा सोने के आभूषण न रखें। व्यक्तिगत नुकसान हेतु प्रबंधन उत्तरदायी नहीं होगा।',
  },
  {
    title: 'Zero Tolerance for Tobacco & Smoking',
    hindiTitle: 'तम्बाकू एवं धूम्रपान पूर्णतः प्रतिबंधित',
    description: 'Janhit Hospital is a strictly non-smoking, tobacco-free green healthcare campus under statutory anti-tobacco regulations.',
    hindiDescription: 'जनहित अस्पताल परिसर में धूम्रपान, गुटखा अथवा तम्बाकू का सेवन कानूनी रूप से पूर्णतः प्रतिबंधित और दंडनीय है।',
  },
  {
    title: 'Fire Safety & Evacuation Signage',
    hindiTitle: 'अग्नि सुरक्षा एवं आपातकालीन निकास',
    description: 'Familiarize yourself with emergency green exit signs located in every corridor. In case of alarm, use emergency staircases; do not use elevators.',
    hindiDescription: 'प्रत्येक गलियारे में लगे हरे रंग के आपातकालीन निकास संकेतों को देखें। आपात स्थिति में लिफ्ट का उपयोग न करें, केवल सीढ़ियों से जाएं।',
  },
  {
    title: '24/7 Security & CCTV Surveillance',
    hindiTitle: '24/7 सुरक्षा एवं सीसीटीवी निगरानी',
    description: 'Campus premises are under 24-hour HD CCTV monitoring for patient safety. Uniformed security guards are stationed at all wings.',
    hindiDescription: 'मरीज एवं परिजनों की सुरक्षा हेतु पूरा परिसर 24 घंटे सीसीटीवी कैमरों और सुरक्षा गार्ड्स की निगरानी में रहता है।',
  },
];

