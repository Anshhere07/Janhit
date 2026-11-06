export interface BlogCategory {
  id: string;
  name: string;
  hindiName: string;
  description: string;
  hindiDescription: string;
  iconName: string;
}

export interface BlogArticleSection {
  id: string;
  heading: string;
  hindiHeading: string;
  paragraphs: string[];
  hindiParagraphs: string[];
  bulletPoints?: string[];
  hindiBulletPoints?: string[];
  callout?: {
    type: 'tip' | 'warning' | 'info';
    title: string;
    hindiTitle: string;
    text: string;
    hindiText: string;
  };
}

export interface BlogAuthor {
  name: string;
  hindiName: string;
  role: string;
  hindiRole: string;
  avatar: string;
  doctorId?: string;
}

export interface DoctorReviewer {
  name: string;
  hindiName: string;
  qualification: string;
  hindiQualification: string;
  designation: string;
  hindiDesignation: string;
  doctorId: string;
  verifiedBadge: boolean;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  hindiTitle: string;
  excerpt: string;
  hindiExcerpt: string;
  categoryId: string;
  categoryName: string;
  hindiCategoryName: string;
  featured: boolean;
  image: string;
  imageCaption: string;
  hindiImageCaption: string;
  readTime: string;
  hindiReadTime: string;
  publishDate: string;
  hindiPublishDate: string;
  lastUpdatedDate: string;
  hindiLastUpdatedDate: string;
  author: BlogAuthor;
  reviewer: DoctorReviewer;
  departmentId: string;
  departmentName: string;
  hindiDepartmentName: string;
  sections: BlogArticleSection[];
  relatedArticleSlugs: string[];
  tags: string[];
  seo: {
    metaTitle: string;
    hindiMetaTitle: string;
    metaDescription: string;
    hindiMetaDescription: string;
    keywords: string[];
  };
}

/* ========================================================================= */
/* 1. CONFIGURABLE BLOG CATEGORIES                                           */
/* ========================================================================= */
export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: 'health-awareness',
    name: 'Health Awareness',
    hindiName: 'स्वास्थ्य जागरूकता',
    description: 'Public health advisories, preventive lifestyle science, and evidence-based medicine.',
    hindiDescription: 'जन स्वास्थ्य सलाह, निवारक जीवनशैली विज्ञान और साक्ष्य-आधारित चिकित्सा।',
    iconName: 'Activity',
  },
  {
    id: 'heart-health',
    name: 'Heart Health',
    hindiName: 'हृदय स्वास्थ्य',
    description: 'Cardiology insights, hypertension management, heart attack prevention, and surgical advancements.',
    hindiDescription: 'हृदय रोग विज्ञान, बीपी नियंत्रण, हार्ट अटैक से बचाव और आधुनिक एंजियोप्लास्टी।',
    iconName: 'Heart',
  },
  {
    id: 'women-health',
    name: 'Women’s Health',
    hindiName: 'महिला स्वास्थ्य',
    description: 'Maternity care, gynaecological wellness, PCOS management, and cancer screenings.',
    hindiDescription: 'मातृत्व देखभाल, स्त्री रोग परामर्श, पीसीओएस समाधान और गर्भाशय कैंसर स्क्रीनिंग।',
    iconName: 'Users',
  },
  {
    id: 'child-health',
    name: 'Child Health',
    hindiName: 'बाल स्वास्थ्य',
    description: 'Pediatric immunization, neonatal nutrition, adolescent development, and infection care.',
    hindiDescription: 'शिशु टीकाकरण सारिणी, नवजात पोषण, बाल विकास और संक्रमण से सुरक्षा।',
    iconName: 'Baby',
  },
  {
    id: 'bone-joint',
    name: 'Bone & Joint Health',
    hindiName: 'हड्डियों और जोड़ों का स्वास्थ्य',
    description: 'Arthritis relief, robotic joint replacement, osteoporosis prevention, and spine care.',
    hindiDescription: 'गठिया दर्द निवारण, रोबोटिक घुटना रिप्लेसमेंट, ऑस्टियोपोरोसिस और रीढ़ की हड्डी की देखभाल।',
    iconName: 'Bone',
  },
  {
    id: 'digestive-health',
    name: 'Digestive Health',
    hindiName: 'पाचन स्वास्थ्य',
    description: 'Gastroenterology, fatty liver reversal, acidity solutions, and endoscopic procedures.',
    hindiDescription: 'गैस्ट्रोएंटरोलॉजी, फैटी लिवर का उपचार, एसिडिटी के उपाय और एंडोस्कोपी तकनीक।',
    iconName: 'Apple',
  },
  {
    id: 'seasonal-illness',
    name: 'Seasonal Illnesses',
    hindiName: 'मौसमी बीमारियाँ',
    description: 'Dengue, malaria, viral flu, respiratory infections, and seasonal immunity boosters.',
    hindiDescription: 'डेंगू, मलेरिया, वायरल बुखार, सांस की बीमारियां और मौसमी रोग प्रतिरोधक क्षमता।',
    iconName: 'CloudRain',
  },
  {
    id: 'general-wellness',
    name: 'General Wellness',
    hindiName: 'सामान्य स्वास्थ्य सुझाव',
    description: 'Balanced nutrition, sleep hygiene, mental wellness, and daily healthy routines.',
    hindiDescription: 'संतुलित आहार, अनिद्रा निवारण, मानसिक स्वास्थ्य और दैनिक स्वस्थ दिनचर्या।',
    iconName: 'Sparkles',
  },
];

/* ========================================================================= */
/* 2. COMPREHENSIVE MEDICAL ARTICLES                                         */
/* ========================================================================= */
export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'art-1',
    slug: 'heart-attack-warning-signs',
    title: 'Silent Heart Attack: Warning Signs and Golden Hour Protocols You Must Never Ignore',
    hindiTitle: 'साइलेंट हार्ट अटैक: प्रारंभिक चेतावनी संकेत एवं गोल्डन ऑवर नियम जिन्हें कभी नजरअंदाज न करें',
    excerpt:
      'Not all cardiac events begin with dramatic chest-crushing pain. Subtle warning signs like jaw discomfort, uncharacteristic cold sweats, and extreme nausea often precede life-threatening myocardial infarction.',
    hindiExcerpt:
      'हर बार दिल का दौरा तेज सीने के दर्द से शुरू नहीं होता। जबड़े में खिंचाव, अकारण ठंडा पसीना, सांस फूलना और अत्यधिक घबराहट जैसे प्रारंभिक लक्षण गंभीर मायोकार्डियल इन्फ्रार्कशन का संकेत हो सकते हैं।',
    categoryId: 'heart-health',
    categoryName: 'Heart Health',
    hindiCategoryName: 'हृदय स्वास्थ्य',
    featured: true,
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Advanced Catheterization Lab at Janhit Hospital running 24/7 primary angioplasty emergency protocols.',
    hindiImageCaption: 'जनहित अस्पताल की आधुनिक कैथ लैब जहां 24/7 आपातकालीन प्राइमरी एंजियोप्लास्टी की जाती है।',
    readTime: '6 Min Read',
    hindiReadTime: '6 मिनट पठन',
    publishDate: '28 October 2026',
    hindiPublishDate: '28 अक्टूबर 2026',
    lastUpdatedDate: '01 November 2026',
    hindiLastUpdatedDate: '01 नवंबर 2026',
    author: {
      name: 'Dr. Ashok Sharma',
      hindiName: 'डॉ. अशोक शर्मा',
      role: 'Director & Chief Interventional Cardiologist',
      hindiRole: 'निदेशक एवं मुख्य इंटरवेंशनल कार्डियोलॉजिस्ट',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
      doctorId: 'dr-ashok-sharma',
    },
    reviewer: {
      name: 'Dr. Ashok Sharma',
      hindiName: 'डॉ. अशोक शर्मा',
      qualification: 'MBBS, MD (Medicine), DM (Cardiology), FACC',
      hindiQualification: 'एमबीबीएस, एमडी (मेडिसिन), डीएम (कार्डियोलॉजी), एफएसीसी',
      designation: 'Senior Interventional Cardiologist, Janhit Heart Centre',
      hindiDesignation: 'वरिष्ठ इंटरवेंशनल कार्डियोलॉजिस्ट, जनहित हार्ट सेंटर',
      doctorId: 'dr-ashok-sharma',
      verifiedBadge: true,
    },
    departmentId: 'cardiology',
    departmentName: 'Cardiology & Heart Care',
    hindiDepartmentName: 'कार्डियोलॉजी एवं हृदय रोग',
    sections: [
      {
        id: 'understanding-silent-ischemia',
        heading: 'What is a "Silent" Heart Attack?',
        hindiHeading: '"साइलेंट" हार्ट अटैक क्या होता है?',
        paragraphs: [
          'A silent heart attack, clinically referred to as silent myocardial infarction (SMI) or silent ischemia, accounts for almost 45% of all cardiac attacks. During this event, blood flow to a section of the heart muscle is severely compromised by an atheromatous plaque rupture or clot, but the typical agonizing angina pectoris is absent or muted.',
          'Because the symptoms are mild or atypical, patients frequently mistake them for ordinary indigestion, muscular strain, viral exhaustion, or anxiety, inadvertently delaying hospital arrival and missing the crucial initial "Golden Hour".',
        ],
        hindiParagraphs: [
          'साइलेंट हार्ट अटैक, जिसे चिकित्सकीय भाषा में साइलेंट मायोकार्डियल इन्फ्रार्कशन (SMI) कहा जाता है, कुल दिल के दौरों में से लगभग 45% मामलों के लिए जिम्मेदार होता है। इसमें हृदय की धमनियों में रुकावट आने से मांसपेशियों तक रक्त प्रवाह बाधित हो जाता है, परंतु मरीज को सीने में तेज चुभन या भारीपन महसूस नहीं होता।',
          'लक्षण हल्के होने के कारण मरीज इसे सामान्य बदहजमी, गैस का दर्द, मांसपेशियों में खिंचाव अथवा तनाव मानकर अनदेखा कर देते हैं, जिससे अस्पताल पहुंचने में देरी हो जाती है और महत्वपूर्ण "गोल्डन ऑवर" का समय निकल जाता है।',
        ],
        callout: {
          type: 'warning',
          title: 'High-Risk Vulnerability',
          hindiTitle: 'अधिक जोखिम वाले मरीज',
          text: 'Diabetic patients, women, and elderly individuals are significantly more prone to silent ischemia due to diabetic neuropathy affecting autonomic nerve pathways that conduct cardiac pain.',
          hindiText: 'मधुमेह (डायबिटीज) के रोगियों, महिलाओं और वरिष्ठ नागरिकों में दर्द संवाहक नसों के कमजोर होने (न्यूरोपैथी) के कारण साइलेंट हार्ट अटैक का खतरा सबसे अधिक होता है।',
        },
      },
      {
        id: 'atypical-symptoms',
        heading: 'Subtle Symptoms You Must Watch For',
        hindiHeading: 'पहचानें ये अस्पष्ट किंतु गंभीर लक्षण',
        paragraphs: [
          'While intense central chest pressure radiating to the left arm is the classic textbook symptom, silent or atypical cardiac events present with alternative systemic indicators:',
        ],
        hindiParagraphs: [
          'यद्यपि सीने के बीचों-बीच दबाव और बाएं हाथ में दर्द हार्ट अटैक का पारंपरिक लक्षण है, परंतु साइलेंट अटैक में निम्नलिखित असामान्य लक्षण दिखाई देते हैं:',
        ],
        bulletPoints: [
          'Unexplained shortness of breath or breathlessness upon minimal exertion or while resting flat.',
          'Sudden onset of cold profuse sweating (diaphoresis) unrelated to room temperature or physical activity.',
          'Dull aching sensation spreading to the jawline, throat, neck, shoulders, or upper back.',
          'Persistent epigastric burning resembling severe acidity, acompañada by unexplained nausea or vomiting.',
          'Overwhelming, sudden systemic weakness or dizziness that does not resolve after drinking water or resting.',
        ],
        hindiBulletPoints: [
          'बिना किसी भारी काम के अचानक सांस फूलना अथवा सीधे लेटने पर सांस लेने में असहजता होना।',
          'सामान्य कमरे के तापमान में भी अचानक माथे और शरीर पर ठंडा पसीना (Diaphoresis) आना।',
          'जबड़े, गले, गर्दन, कंधे अथवा पीठ के ऊपरी हिस्से में खिंचाव या भारीपन का अहसास होना।',
          'पेट के ऊपरी हिस्से में लगातार जलन होना जो एंटासिड दवा लेने के बाद भी ठीक न हो।',
          'अचानक सिर घूमना, आंखों के आगे अंधेरा छाना और अत्यधिक कमजोरी महसूस होना।',
        ],
      },
      {
        id: 'the-golden-hour',
        heading: 'The Clinical Importance of the "Golden Hour"',
        hindiHeading: 'हार्ट अटैक में "गोल्डन ऑवर" का जीवन रक्षक महत्व',
        paragraphs: [
          'The first 60 minutes following the onset of arterial occlusion are recognized as the clinical "Golden Hour". Myocardial tissue begins to experience irreversible cellular death within 20 to 30 minutes of complete oxygen deprivation.',
          'Receiving medical intervention within this window — specifically Primary Percutaneous Coronary Intervention (Primary Angioplasty) or thrombolytic therapy — preserves ventricular pump function and prevents long-term heart failure or fatal arrhythmias.',
        ],
        hindiParagraphs: [
          'हार्ट अटैक के लक्षण शुरू होने के पहले 60 मिनट को चिकित्सा विज्ञान में "गोल्डन ऑवर" कहा जाता है। यदि हृदय की मांसपेशियों को 30 मिनट से अधिक समय तक रक्त और ऑक्सीजन न मिले, तो कोशिकाएं स्थाई रूप से मृत होने लगती हैं।',
          'इस 1 घंटे के भीतर अस्पताल पहुंचकर कैथ लैब में प्राइमरी एंजियोप्लास्टी (Primary Angioplasty) कराने से हृदय को होने वाले स्थाई नुकसान से पूरी तरह बचाया जा सकता है।',
        ],
        callout: {
          type: 'info',
          title: 'Immediate First-Aid Step',
          hindiTitle: 'तत्काल प्राथमिक उपचार',
          text: 'If a heart attack is suspected, immediately chew one tablet of soluble Aspirin (300 mg) unless contraindicated by known allergy or active bleeding, and rush to a hospital equipped with a 24/7 emergency Cath Lab.',
          hindiText: 'हार्ट अटैक की आशंका होने पर तुरंत 1 गोली घुलनशील एस्पिरिन (300 मिलीग्राम) चबा लें (यदि डॉक्टर ने मना न किया हो) और बिना किसी देरी के 24/7 कैथ लैब युक्त अस्पताल पहुंचें।',
        },
      },
      {
        id: 'prevention-guidelines',
        heading: 'Preventive Checklist for Long-Term Cardiac Health',
        hindiHeading: 'स्वस्थ हृदय के लिए 5 अनिवार्य नियम',
        paragraphs: [
          'Cardiovascular disease is largely preventable through rigorous management of modifiable metabolic risk factors:',
        ],
        hindiParagraphs: [
          'अपनी दैनिक जीवनशैली में छोटे-छोटे बदलाव लाकर हृदय रोगों के खतरे को 80% तक कम किया जा सकता है:',
        ],
        bulletPoints: [
          'Keep Blood Pressure strictly below 130/80 mmHg with low sodium intake and regular monitoring.',
          'Maintain Fasting Blood Sugar below 100 mg/dL and HbA1c under 6.5%.',
          'Target an LDL ("bad cholesterol") level below 70 mg/dL for high-risk patients.',
          'Commit to 30 minutes of moderate aerobic exercise (brisk walking, swimming, cycling) at least 5 days a week.',
          'Eliminate tobacco smoking and second-hand smoke exposure completely.',
        ],
        hindiBulletPoints: [
          'रक्तचाप (Blood Pressure) को हमेशा 130/80 mmHg से नीचे नियंत्रित रखें और नमक का सेवन सीमित करें।',
          'फास्टिंग ब्लड शुगर 100 mg/dL से कम और HbA1c 6.5% से नीचे बनाए रखें।',
          'अपने एलडीएल (खराब कोलेस्ट्रॉल) का स्तर 70 mg/dL से नीचे रखने का प्रयास करें।',
          'सप्ताह में कम से कम 5 दिन 30 मिनट तेज गति से टहलना (Brisk Walk) अथवा व्यायाम अवश्य करें।',
          'बीड़ी, सिगरेट और तंबाकू का सेवन पूरी तरह बंद करें।',
        ],
      },
    ],
    relatedArticleSlugs: ['hypertension-silent-killer-guide', 'diabetes-hba1c-lifestyle-control'],
    tags: ['Cardiology', 'Heart Attack', 'Angioplasty', 'Emergency Care', 'ECG'],
    seo: {
      metaTitle: 'Silent Heart Attack Symptoms & Golden Hour Guide | Janhit Hospital',
      hindiMetaTitle: 'साइलेंट हार्ट अटैक के लक्षण एवं प्राथमिक उपचार | जनहित हॉस्पिटल',
      metaDescription:
        'Learn to recognize the subtle warning signs of a silent heart attack from senior cardiologists at Janhit Hospital. Understand the critical Golden Hour protocol.',
      hindiMetaDescription:
        'जनहित हॉस्पिटल के वरिष्ठ हृदय रोग विशेषज्ञों से जानें साइलेंट हार्ट अटैक के लक्षण, प्राथमिक उपचार और 24/7 कैथ लैब इमरजेंसी के नियम।',
      keywords: ['silent heart attack', 'heart attack symptoms', 'golden hour', 'angioplasty delhi', 'cardiac emergency'],
    },
  },
  {
    id: 'art-2',
    slug: 'joint-pain-robotic-replacement',
    title: 'Severe Knee Arthritis: When is Robotic-Assisted Joint Replacement the Best Choice?',
    hindiTitle: 'गठिया और घुटनों का असहनीय दर्द: रोबोटिक जॉइंट रिप्लेसमेंट कब और क्यों सबसे बेहतर विकल्प है?',
    excerpt:
      'Explore how 3D CT-guided robotic technology allows surgeons to achieve sub-millimeter precision in knee and hip arthroplasty, cutting recovery times in half while preserving healthy bone.',
    hindiExcerpt:
      'जानें कि 3D सीटी गाइडेड रोबोटिक तकनीक कैसे मिलीमीटर्स की सटीकता के साथ घुटना और कूल्हा प्रत्यारोपण करती है, जिससे प्राकृतिक हड्डी सुरक्षित रहती है और मरीज अगले दिन चलने लगता है।',
    categoryId: 'bone-joint',
    categoryName: 'Bone & Joint Health',
    hindiCategoryName: 'हड्डियों और जोड़ों का स्वास्थ्य',
    featured: false,
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'MAKO Robotic-Assisted Joint Replacement Theatre at Janhit Super Speciality Hospital.',
    hindiImageCaption: 'जनहित सुपर स्पेशलिटी अस्पताल का अत्याधुनिक रोबोटिक ऑर्थोपेडिक ऑपरेशन थिएटर।',
    readTime: '5 Min Read',
    hindiReadTime: '5 मिनट पठन',
    publishDate: '22 October 2026',
    hindiPublishDate: '22 अक्टूबर 2026',
    lastUpdatedDate: '30 October 2026',
    hindiLastUpdatedDate: '30 अक्टूबर 2026',
    author: {
      name: 'Dr. Rajesh Singh',
      hindiName: 'डॉ. राजेश सिंह',
      role: 'Director of Orthopaedics & Joint Replacement',
      hindiRole: 'निदेशक - ऑर्थोपेडिक्स एवं रोबोटिक जॉइंट रिप्लेसमेंट',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80',
      doctorId: 'dr-rajesh-singh',
    },
    reviewer: {
      name: 'Dr. Rajesh Singh',
      hindiName: 'डॉ. राजेश सिंह',
      qualification: 'MBBS, MS (Orthopaedics), MCh (Joint Replacement), AO Fellow',
      hindiQualification: 'एमबीबीएस, एमएस (ऑर्थोपेडिक्स), एमसीएच, एओ फेलो',
      designation: 'Chief Robotic Joint Replacement Surgeon',
      hindiDesignation: 'मुख्य रोबोटिक जॉइंट रिप्लेसमेंट सर्जन',
      doctorId: 'dr-rajesh-singh',
      verifiedBadge: true,
    },
    departmentId: 'orthopaedics',
    departmentName: 'Orthopaedics & Joint Care',
    hindiDepartmentName: 'हड्डी एवं जोड़ रोग (ऑर्थोपेडिक्स)',
    sections: [
      {
        id: 'osteoarthritis-progression',
        heading: 'Understanding Osteoarthritis of the Knee',
        hindiHeading: 'घुटने के ऑस्टियोआर्थराइटिस को समझें',
        paragraphs: [
          'Osteoarthritis (OA) is a degenerative wear-and-tear condition that causes gradual deterioration of the protective articular cartilage capping the ends of bones in the knee joint.',
          'When cartilage completely thins down, bone rubs directly against bone, causing intense chronic pain, stiffness, joint deformities ("bowlegs"), and severe limitation of routine walking or climbing stairs.',
        ],
        hindiParagraphs: [
          'ऑस्टियोआर्थराइटिस घुटने के जोड़ में हड्डियों के बीच मौजूद चिकने कार्टिलेज (गद्दी) के घिसने से होने वाली बीमारी है। उम्र बढ़ने, मोटापे अथवा चोट के कारण यह तेजी से बढ़ सकती है।',
          'जब कार्टिलेज पूरी तरह समाप्त हो जाता है, तो हड्डियां आपस में टकराने लगती हैं। इसके कारण जोड़ों में सूजन, पैरों में टेढ़ापन (Bowlegs) और बिना सहारे चलना असंभव हो जाता है।',
        ],
      },
      {
        id: 'robotic-vs-conventional',
        heading: 'How Robotic-Assisted Surgery Differs from Traditional Methods',
        hindiHeading: 'पारंपरिक सर्जरी की तुलना में रोबोटिक तकनीक कैसे बेहतर है?',
        paragraphs: [
          'In conventional knee arthroplasty, the surgeon relies on manual measurement jigs and two-dimensional X-rays to position the artificial prosthesis. While experienced surgeons achieve good outcomes, manual variation remains possible.',
          'With robotic-assisted surgery (such as our MAKO system), a preoperative 3D CT scan maps the patient’s exact bone morphology. The robotic arm provides real-time haptic feedback, preventing the surgeon from cutting outside the boundary by even a fraction of a millimeter.',
        ],
        hindiParagraphs: [
          'पारंपरिक सर्जरी में सर्जन मैनुअल औजारों और सामान्य एक्स-रे के आधार पर जोड़ का प्रत्यारोपण करते हैं। इसमें कभी-कभी मांसपेशियों में अधिक खिंचाव और खून का नुकसान अधिक होता है।',
          'रोबोटिक तकनीक में ऑपरेशन से पहले घुटने का 3D सीटी स्कैन कर कंप्यूटर मॉडल बनाया जाता है। रोबोटिक आर्म सर्जन के हाथों को सब-मिलीमीटर की सटीकता प्रदान करता है, जिससे केवल खराब हिस्सा ही काटा जाता है और स्वस्थ नसें व मांसपेशियां पूर्णतः सुरक्षित रहती हैं।',
        ],
        bulletPoints: [
          'Sub-millimeter implant positioning accuracy tailored to the patient’s natural gait.',
          'Minimal bone resection and preservation of surrounding soft tissue ligaments.',
          'Significantly reduced surgical bleeding and post-operative pain scores.',
          'Accelerated mobilization: 90% of patients start walking with assistance within 24 hours of surgery.',
          'Prolonged implant lifespan exceeding 25 to 30 years.',
        ],
        hindiBulletPoints: [
          'मरीज की शारीरिक बनावट के अनुसार सब-मिलीमीटर स्तर की सटीक फिटिंग।',
          'कम से कम हड्डी की कटाई और आसपास के लिगामेंट्स की पूर्ण सुरक्षा।',
          'ऑपरेशन के दौरान बहुत कम रक्तस्त्राव और दर्द में 70% तक की कमी।',
          'ऑपरेशन के अगले दिन (24 घंटे के भीतर) मरीज का अपने पैरों पर चलना।',
          'रोबोटिक प्रत्यारोपित जोड़ की आयु 25 से 30 वर्ष से भी अधिक होना।',
        ],
      },
    ],
    relatedArticleSlugs: ['heart-attack-warning-signs', 'seasonal-dengue-viral-prevention'],
    tags: ['Orthopaedics', 'Robotic Surgery', 'Knee Replacement', 'Joint Pain', 'Arthritis'],
    seo: {
      metaTitle: 'Robotic Knee Replacement: Benefits & Precision Surgery | Janhit Hospital',
      hindiMetaTitle: 'रोबोटिक घुटना प्रत्यारोपण: आधुनिक तकनीक एवं लाभ | जनहित हॉस्पिटल',
      metaDescription:
        'Discover the clinical advantages of robotic-assisted knee replacement at Janhit Hospital. Minimal pain, rapid recovery, and sub-millimeter surgical accuracy.',
      hindiMetaDescription:
        'जनहित हॉस्पिटल के ऑर्थोपेडिक विभाग से जानें रोबोटिक घुटना रिप्लेसमेंट के फायदे, तेजी से ठीक होने के नियम और सर्जरी की पूरी प्रक्रिया।',
      keywords: ['robotic knee replacement', 'joint replacement delhi', 'arthritis cure', 'knee surgery recovery'],
    },
  },
  {
    id: 'art-3',
    slug: 'childhood-vaccination-guide',
    title: 'Essential Child Immunization: The Definitive Pediatric Vaccination Schedule',
    hindiTitle: 'शिशु टीकाकरण सारिणी: जन्म से 5 वर्ष तक के बच्चों के लिए आवश्यक टीकों की संपूर्ण गाइड',
    excerpt:
      'Shield your child against life-threatening infections including Polio, Hepatitis B, Rotavirus, Pneumococcal disease, and MMR with our verified pediatric immunization timetable.',
    hindiExcerpt:
      'पोलियो, हेपेटाइटिस, रोटावायरस, न्यूमोकोकल निमोनिया और खसरा जैसी जानलेवा बीमारियों से अपने बच्चे को सुरक्षित रखने हेतु शिशु टीकाकरण की संपूर्ण जानकारी।',
    categoryId: 'child-health',
    categoryName: 'Child Health',
    hindiCategoryName: 'बाल स्वास्थ्य',
    featured: false,
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Pediatrics and Neonatal Wellness Clinic at Janhit Hospital.',
    hindiImageCaption: 'जनहित हॉस्पिटल का आधुनिक शिशु स्वास्थ्य एवं टीकाकरण केंद्र।',
    readTime: '6 Min Read',
    hindiReadTime: '6 मिनट पठन',
    publishDate: '15 October 2026',
    hindiPublishDate: '15 अक्टूबर 2026',
    lastUpdatedDate: '26 October 2026',
    hindiLastUpdatedDate: '26 अक्टूबर 2026',
    author: {
      name: 'Dr. Sunita Deshmukh',
      hindiName: 'डॉ. सुनीता देशमुख',
      role: 'Head of Paediatrics & Neonatal Intensive Care',
      hindiRole: 'विभागाध्यक्ष - बाल रोग एवं नवजात गहन चिकित्सा (NICU)',
      avatar: 'https://images.unsplash.com/photo-1594824813633-46c59b2b952f?auto=format&fit=crop&w=300&q=80',
      doctorId: 'dr-sunita-deshmukh',
    },
    reviewer: {
      name: 'Dr. Sunita Deshmukh',
      hindiName: 'डॉ. सुनीता देशमुख',
      qualification: 'MBBS, MD (Paediatrics), Fellowship in Neonatology (IAP)',
      hindiQualification: 'एमबीबीएस, एमडी (पीडियाट्रिक्स), फेलोशिप इन नियोनेटोलॉजी',
      designation: 'Senior Neonatologist & Pediatrician',
      hindiDesignation: 'वरिष्ठ बाल रोग एवं नवजात शिशु विशेषज्ञ',
      doctorId: 'dr-sunita-deshmukh',
      verifiedBadge: true,
    },
    departmentId: 'paediatrics',
    departmentName: 'Paediatrics & Neonatology',
    hindiDepartmentName: 'बाल रोग एवं नवजात शिशु केंद्र',
    sections: [
      {
        id: 'why-vaccinate',
        heading: 'Why Timely Immunization is Vital',
        hindiHeading: 'समय पर टीकाकरण क्यों आवश्यक है?',
        paragraphs: [
          'Vaccines stimulate the young immune system to produce antibodies without causing the disease itself. By vaccinating according to the National Immunization Schedule and Indian Academy of Pediatrics (IAP) recommendations, parents establish robust immunity during the most vulnerable early months of life.',
          'Delaying or missing routine vaccine doses leaves infants susceptible to severe preventable complications, hospitalizations, or irreversible sequelae.',
        ],
        hindiParagraphs: [
          'टीकाकरण बच्चे की प्रतिरक्षा प्रणाली (इम्यूनिटी) को बिना बीमार किए एंटीबॉडीज बनाने के लिए तैयार करता है। भारतीय बाल रोग अकादमी (IAP) के अनुसार समय पर टीका लगवाने से बच्चों में गंभीर संक्रामक बीमारियों से लड़ने की आजीवन शक्ति विकसित होती है।',
          'टीके में देरी करने से नवजात शिशुओं में निमोनिया, दिमागी बुखार और डायरिया जैसे गंभीर संक्रमण का खतरा बढ़ जाता है।',
        ],
      },
      {
        id: 'vaccine-schedule-breakdown',
        heading: 'Key Vaccination Milestones (Birth to 5 Years)',
        hindiHeading: 'टीकाकरण के प्रमुख चरण (जन्म से 5 वर्ष)',
        paragraphs: [
          'Below are the fundamental vaccines recommended for every child:',
        ],
        hindiParagraphs: [
          'प्रत्येक बच्चे के लिए अनुशंसित अनिवार्य टीकों की तालिका:',
        ],
        bulletPoints: [
          'At Birth: BCG (Tuberculosis protection), Oral Polio Vaccine (OPV 0), and Hepatitis B (Birth Dose).',
          '6 Weeks: Pentavalent 1 (DPT + Hep B + Hib), Inactivated Polio (IPV 1), Rotavirus 1, and Pneumococcal Conjugate (PCV 1).',
          '10 Weeks: Pentavalent 2, Rotavirus 2, and Oral Polio Vaccine 2.',
          '14 Weeks: Pentavalent 3, Rotavirus 3, IPV 2, and PCV 2.',
          '9 Months: Measles, Rubella (MR 1), and Vitamin A oral drops.',
          '15 to 18 Months: MMR Booster, Varicella (Chickenpox), and PCV Booster.',
          '4 to 5 Years: DPT Booster 2 and Oral Polio Vaccine Booster.',
        ],
        hindiBulletPoints: [
          'जन्म के समय: बीसीजी (टीबी से बचाव), ओरल पोलियो ड्रॉप्स (ओपीवी-0) और हेपेटाइटिस-बी (बर्थ डोज)।',
          '6 सप्ताह: पेंटावेलेंट-1 (गलाघोंटू, काली खांसी, टिटनेस, हेपेटाइटिस बी, हिब), रोटावायरस-1 और न्यूमोकोकल (पीसीवी-1)।',
          '10 सप्ताह: पेंटावेलेंट-2, रोटावायरस-2 और पोलियो ड्रॉप्स।',
          '14 सप्ताह: पेंटावेलेंट-3, रोटावायरस-3, आईपीवी-2 और पीसीवी-2।',
          '9 माह: खसरा व रूबेला (एमआर-1) और विटामिन-ए की खुराक।',
          '15 से 18 माह: एमएमआर बूस्टर, चिकनपॉक्स (चेचक) और पीसीवी बूस्टर।',
          '4 से 5 वर्ष: डीपीटी बूस्टर-2 और पोलियो बूस्टर खुराक।',
        ],
      },
    ],
    relatedArticleSlugs: ['seasonal-dengue-viral-prevention', 'general-wellness-nutrition'],
    tags: ['Pediatrics', 'Vaccines', 'Immunization', 'Child Care', 'NICU'],
    seo: {
      metaTitle: 'Childhood Immunization & Vaccine Schedule Guide | Janhit Hospital',
      hindiMetaTitle: 'शिशु टीकाकरण सारिणी: जन्म से 5 वर्ष तक की गाइड | जनहित हॉस्पिटल',
      metaDescription:
        'Comprehensive pediatric vaccination schedule per Indian Academy of Pediatrics (IAP) recommendations. Authored by pediatricians at Janhit Hospital.',
      hindiMetaDescription:
        'जनहित हॉस्पिटल के बाल रोग विभाग से जानें जन्म से लेकर 5 वर्ष तक के बच्चों के लिए जरूरी टीकों की पूरी सूची एवं सही समय सारिणी।',
      keywords: ['childhood vaccination', 'pediatric immunization schedule', 'baby vaccines india', 'dpt mmr vaccine'],
    },
  },
  {
    id: 'art-4',
    slug: 'womens-health-pcos-lifestyle',
    title: 'PCOS, Hormonal Imbalance and Fertility: A Gynecologist’s Complete Guide',
    hindiTitle: 'पीसीओएस (PCOS), हार्मोनल असंतुलन और मातृत्व: स्त्री रोग विशेषज्ञों की संपूर्ण मार्गदर्शिका',
    excerpt:
      'Polycystic Ovary Syndrome affects 1 in 5 Indian women. Demystify the causes, insulin resistance links, and evidence-based strategies for cycle regularity and natural conception.',
    hindiExcerpt:
      'भारत में हर 5 में से 1 महिला पीसीओएस से प्रभावित है। जानें इंसुलिन रेजिस्टेंस, अनियमित पीरियड्स, मुंहासे और प्राकृतिक गर्भधारण हेतु सही चिकित्सीय समाधान।',
    categoryId: 'women-health',
    categoryName: 'Women’s Health',
    hindiCategoryName: 'महिला स्वास्थ्य',
    featured: false,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Women’s Health & Advanced Laparoscopic Gynaecology Suite at Janhit Hospital.',
    hindiImageCaption: 'जनहित हॉस्पिटल का समर्पित महिला स्वास्थ्य एवं उन्नत स्त्री रोग परामर्श केंद्र।',
    readTime: '5 Min Read',
    hindiReadTime: '5 मिनट पठन',
    publishDate: '08 October 2026',
    hindiPublishDate: '08 अक्टूबर 2026',
    lastUpdatedDate: '24 October 2026',
    hindiLastUpdatedDate: '24 अक्टूबर 2026',
    author: {
      name: 'Dr. Sunita Deshmukh',
      hindiName: 'डॉ. सुनीता देशमुख',
      role: 'Senior Consultant - Obstetrics & Gynaecology',
      hindiRole: 'वरिष्ठ कंसल्टेंट - प्रसूति एवं स्त्री रोग',
      avatar: 'https://images.unsplash.com/photo-1594824813633-46c59b2b952f?auto=format&fit=crop&w=300&q=80',
      doctorId: 'dr-sunita-deshmukh',
    },
    reviewer: {
      name: 'Dr. Sunita Deshmukh',
      hindiName: 'डॉ. सुनीता देशमुख',
      qualification: 'MBBS, MD (Obstetrics & Gynaecology), DGO',
      hindiQualification: 'एमबीबीएस, एमडी (स्त्री रोग), डीजीओ',
      designation: 'Senior Gynaecologist & Infertility Specialist',
      hindiDesignation: 'वरिष्ठ स्त्री रोग एवं निसंतानता विशेषज्ञ',
      doctorId: 'dr-sunita-deshmukh',
      verifiedBadge: true,
    },
    departmentId: 'paediatrics',
    departmentName: 'Obstetrics & Gynaecology',
    hindiDepartmentName: 'प्रसूति एवं स्त्री रोग विभाग',
    sections: [
      {
        id: 'what-is-pcos',
        heading: 'What is Polycystic Ovary Syndrome (PCOS)?',
        hindiHeading: 'पीसीओएस (PCOS) क्या है और यह क्यों होता है?',
        paragraphs: [
          'PCOS is a complex endocrine disorder marked by hormonal imbalances: elevated androgens ("male hormones"), chronic anovulation (failure of regular egg release), and ovaries studded with small immature follicles.',
          'The core underlying driver in over 70% of cases is hyperinsulinemia and peripheral insulin resistance, where cells fail to respond efficiently to insulin, triggering the ovaries to overproduce testosterone.',
        ],
        hindiParagraphs: [
          'पीसीओएस एक हार्मोनल असंतुलन विकार है जिसमें महिलाओं के शरीर में एंड्रोजन (पुरुष हार्मोन) का स्तर बढ़ जाता है, जिससे ओवरी में अंडे समय पर विकसित नहीं हो पाते और छोटे-छोटे सिस्ट बन जाते हैं।',
          'इसका मुख्य कारण इंसुलिन रेजिस्टेंस है। जब शरीर में इंसुलिन का सही उपयोग नहीं हो पाता, तो ओवरी अतिरिक्त टेस्टोस्टेरोन बनाने लगती है, जिससे पीरियड्स अनियमित हो जाते हैं।',
        ],
      },
    ],
    relatedArticleSlugs: ['childhood-vaccination-guide', 'diabetes-hba1c-lifestyle-control'],
    tags: ['Womens Health', 'PCOS', 'Fertility', 'Hormones', 'Gynaecology'],
    seo: {
      metaTitle: 'PCOS Symptoms, Diet & Fertility Guide | Janhit Hospital',
      hindiMetaTitle: 'पीसीओएस के लक्षण, डाइट और उपचार गाइड | जनहित हॉस्पिटल',
      metaDescription:
        'Expert guidance on managing PCOS, insulin resistance, and menstrual irregularity from senior gynaecologists at Janhit Hospital.',
      hindiMetaDescription:
        'जनहित अस्पताल के स्त्री रोग विशेषज्ञों से जानें पीसीओएस के कारण, हार्मोनल संतुलन के उपाय और स्वस्थ गर्भधारण की सही सलाह।',
      keywords: ['pcos treatment delhi', 'polycystic ovary syndrome', 'irregular periods treatment', 'womens wellness'],
    },
  },
  {
    id: 'art-5',
    slug: 'fatty-liver-disease-reversal',
    title: 'Non-Alcoholic Fatty Liver Disease (NAFLD): Causes, Stages and Reversal Protocol',
    hindiTitle: 'नॉन-अल्कोहलिक फैटी लिवर: कारण, विभिन्न चरण और इसे रिवर्स करने के वैज्ञानिक उपाय',
    excerpt:
      'Fatty liver is rapidly becoming India’s silent epidemic, driven by refined carbohydrates and sedentary lifestyles. Learn how early-stage hepatic steatosis can be completely reversed.',
    hindiExcerpt:
      'अत्यधिक मीठा, मैदा और शारीरिक निष्क्रियता के कारण फैटी लिवर तेजी से बढ़ रहा है। जानें कि ग्रेड-1 और ग्रेड-2 फैटी लिवर को बिना दवा केवल जीवनशैली से कैसे पूरी तरह ठीक किया जा सकता है।',
    categoryId: 'digestive-health',
    categoryName: 'Digestive Health',
    hindiCategoryName: 'पाचन स्वास्थ्य',
    featured: false,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Gastroenterology and Hepatology Care at Janhit Hospital.',
    hindiImageCaption: 'जनहित हॉस्पिटल का आधुनिक गैस्ट्रोएंटरोलॉजी एवं लिवर केयर केंद्र।',
    readTime: '5 Min Read',
    hindiReadTime: '5 मिनट पठन',
    publishDate: '30 September 2026',
    hindiPublishDate: '30 सितंबर 2026',
    lastUpdatedDate: '20 October 2026',
    hindiLastUpdatedDate: '20 अक्टूबर 2026',
    author: {
      name: 'Dr. Manoj Kumar',
      hindiName: 'डॉ. मनोज कुमार',
      role: 'Senior Consultant - Gastroenterology & Hepatology',
      hindiRole: 'वरिष्ठ कंसल्टेंट - गैस्ट्रोएंटरोलॉजी एवं हेपेटोलॉजी',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
      doctorId: 'dr-manoj-kumar',
    },
    reviewer: {
      name: 'Dr. Manoj Kumar',
      hindiName: 'डॉ. मनोज कुमार',
      qualification: 'MBBS, MD (Medicine), DM (Gastroenterology)',
      hindiQualification: 'एमबीबीएस, एमडी (मेडिसिन), डीएम (गैस्ट्रोएंटरोलॉजी)',
      designation: 'Chief Gastroenterologist & Liver Specialist',
      hindiDesignation: 'मुख्य गैस्ट्रोएंटरोलॉजिस्ट एवं लिवर रोग विशेषज्ञ',
      doctorId: 'dr-manoj-kumar',
      verifiedBadge: true,
    },
    departmentId: 'gastroenterology',
    departmentName: 'Gastroenterology & Hepatology',
    hindiDepartmentName: 'गैस्ट्रोएंटरोलॉजी एवं लिवर रोग',
    sections: [
      {
        id: 'what-is-nafld',
        heading: 'The Stages of Fatty Liver Disease',
        hindiHeading: 'फैटी लिवर के विभिन्न चरण',
        paragraphs: [
          'Non-Alcoholic Fatty Liver Disease (NAFLD) begins when excess fat accumulates in hepatocytes (liver cells) exceeding 5% of total liver weight.',
          'If left unmanaged, simple steatosis (Grade 1) can progress to Non-Alcoholic Steatohepatitis (NASH with inflammation), hepatic fibrosis, and eventually irreversible cirrhosis.',
        ],
        hindiParagraphs: [
          'जब लिवर की कोशिकाओं में 5% से अधिक चर्बी (फैट) जमा हो जाती है, तो उसे फैटी लिवर कहा जाता है। शराब न पीने वाले व्यक्तियों में भी यह समस्या अत्यधिक कार्बोहाइड्रेट और वसा के सेवन से हो सकती है।',
          'यदि प्रारंभिक अवस्था में ध्यान न दिया जाए, तो यह सूजन (NASH), फाइब्रोसिस और अंततः लिवर सिरोसिस जैसी गंभीर बीमारी का रूप ले सकती है।',
        ],
      },
    ],
    relatedArticleSlugs: ['diabetes-hba1c-lifestyle-control', 'heart-attack-warning-signs'],
    tags: ['Gastroenterology', 'Liver Health', 'Fatty Liver', 'Diet', 'Metabolism'],
    seo: {
      metaTitle: 'Fatty Liver Reversal: Causes, Diet & Medical Treatment | Janhit Hospital',
      hindiMetaTitle: 'फैटी लिवर कैसे ठीक करें: कारण, डाइट एवं इलाज | जनहित हॉस्पिटल',
      metaDescription:
        'Learn how to reverse early-stage fatty liver disease through targeted nutrition, exercise, and hepatic screening with gastroenterologists at Janhit Hospital.',
      hindiMetaDescription:
        'जनहित हॉस्पिटल के गैस्ट्रोएंटरोलॉजी विभाग से जानें फैटी लिवर के लक्षण, सही खानपान, वजन नियंत्रण और लिवर फाइब्रोस्कैन जांच की पूरी जानकारी।',
      keywords: ['fatty liver cure', 'nafld stages', 'gastroenterologist delhi', 'liver health diet'],
    },
  },
  {
    id: 'art-6',
    slug: 'seasonal-dengue-viral-prevention',
    title: 'Monsoon & Seasonal Fevers: Warning Signs of Dengue, Malaria and Typhoid',
    hindiTitle: 'मौसमी बुखार: डेंगू, मलेरिया और टाइफाइड के गंभीर लक्षण एवं त्वरित उपचार नियम',
    excerpt:
      'High spikes in fever during seasonal transitions demand immediate medical evaluation. Understand platelet monitoring, hydration protocols, and danger signals requiring emergency admission.',
    hindiExcerpt:
      'मौसम बदलने पर तेज बुखार, बदन दर्द और प्लेटलेट्स की गिरावट को सामान्य फ्लू न समझें। जानें डेंगू शॉक सिंड्रोम के चेतावनी संकेत और सही समय पर जांच के नियम।',
    categoryId: 'seasonal-illness',
    categoryName: 'Seasonal Illnesses',
    hindiCategoryName: 'मौसमी बीमारियाँ',
    featured: false,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
    imageCaption: '24/7 Clinical Pathology and Emergency Triage Unit at Janhit Hospital.',
    hindiImageCaption: 'जनहित अस्पताल की 24/7 सेंट्रल पैथोलॉजी लैब एवं आपातकालीन फीवर ओपीडी।',
    readTime: '4 Min Read',
    hindiReadTime: '4 मिनट पठन',
    publishDate: '24 September 2026',
    hindiPublishDate: '24 सितंबर 2026',
    lastUpdatedDate: '18 October 2026',
    hindiLastUpdatedDate: '18 अक्टूबर 2026',
    author: {
      name: 'Dr. Ashok Sharma',
      hindiName: 'डॉ. अशोक शर्मा',
      role: 'Senior Physician & Critical Care Consultant',
      hindiRole: 'वरिष्ठ फिजिशियन एवं क्रिटिकल केयर कंसल्टेंट',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
      doctorId: 'dr-ashok-sharma',
    },
    reviewer: {
      name: 'Dr. Ashok Sharma',
      hindiName: 'डॉ. अशोक शर्मा',
      qualification: 'MBBS, MD (Internal Medicine)',
      hindiQualification: 'एमबीबीएस, एमडी (इंटरनल मेडिसिन)',
      designation: 'Head of Internal Medicine, Janhit Hospital',
      hindiDesignation: 'विभागाध्यक्ष - इंटरनल मेडिसिन, जनहित हॉस्पिटल',
      doctorId: 'dr-ashok-sharma',
      verifiedBadge: true,
    },
    departmentId: 'cardiology',
    departmentName: 'Internal Medicine & Critical Care',
    hindiDepartmentName: 'इंटरनल मेडिसिन एवं क्रिटिकल केयर',
    sections: [
      {
        id: 'dengue-warning-signs',
        heading: 'Recognizing Dengue Warning Signals',
        hindiHeading: 'डेंगू के गंभीर चेतावनी संकेत',
        paragraphs: [
          'While most dengue cases resolve with oral hydration and paracetamol, the critical phase begins precisely when fever subsides around Day 4 to Day 6.',
          'Severe plasma leakage can cause Dengue Shock Syndrome (DSS). Any patient showing warning signs needs immediate emergency inpatient admission.',
        ],
        hindiParagraphs: [
          'डेंगू बुखार में अधिकांश मरीज पर्याप्त पानी पीने और पैरासिटामोल से ठीक हो जाते हैं, परंतु बुखार उतरने के बाद (चौथे से छठे दिन) सबसे नाजुक समय शुरू होता है।',
          'यदि रक्त वाहिकाओं से प्लाज्मा लीक होने लगे, तो रक्तचाप तेजी से गिर जाता है जिसे डेंगू शॉक सिंड्रोम कहते हैं। ऐसे में तुरंत अस्पताल में भर्ती होना आवश्यक है।',
        ],
        bulletPoints: [
          'Severe persistent abdominal pain or tenderness.',
          'Persistent vomiting preventing all oral fluid intake.',
          'Bleeding from gums, nose (epistaxis), or presence of black tarry stools.',
          'Extreme lethargy, confusion, or restlessness.',
          'Rapid decline in platelet count accompanied by sudden rise in hematocrit (HCT).',
        ],
        hindiBulletPoints: [
          'पेट में लगातार तेज दर्द या भारीपन होना।',
          'लगातार उल्टियां होना जिससे पानी पीना भी संभव न हो।',
          'मसूड़ों, नाक से खून आना अथवा शौच का रंग काला होना।',
          'अत्यधिक सुस्ती, बेचैनी या बोलने में भ्रम होना।',
          'प्लेटलेट्स की संख्या में तेजी से गिरावट और हीमेटोक्रिट (HCT) का बढ़ना।',
        ],
      },
    ],
    relatedArticleSlugs: ['childhood-vaccination-guide', 'fatty-liver-disease-reversal'],
    tags: ['Dengue', 'Fevers', 'Malaria', 'Platelets', 'Emergency'],
    seo: {
      metaTitle: 'Dengue Fever Symptoms & Platelet Care Guide | Janhit Hospital',
      hindiMetaTitle: 'डेंगू बुखार के लक्षण, प्लेटलेट्स व इलाज गाइड | जनहित हॉस्पिटल',
      metaDescription:
        'Recognize critical dengue danger signs, hydration protocols, and platelet management guidelines from internal medicine specialists at Janhit Hospital.',
      hindiMetaDescription:
        'जनहित अस्पताल के फिजिशियन से जानें मौसमी बुखार, डेंगू के खतरे के लक्षण, प्लेटलेट्स की जांच और आपातकालीन उपचार के नियम।',
      keywords: ['dengue treatment delhi', 'platelet count drop', 'seasonal fever care', 'dengue warning signs'],
    },
  },
  {
    id: 'art-7',
    slug: 'diabetes-hba1c-lifestyle-control',
    title: 'Reversing Prediabetes: The Science of Blood Sugar, HbA1c and Metabolic Health',
    hindiTitle: 'प्री-डायबिटीज को कैसे रिवर्स करें: ब्लड शुगर, HbA1c और मेटाबॉलिक स्वास्थ्य का विज्ञान',
    excerpt:
      'An elevated HbA1c between 5.7% and 6.4% is a critical window of opportunity. Understand how targeted dietary adjustments and resistance exercise can halt progression to full Type 2 Diabetes.',
    hindiExcerpt:
      'यदि आपका HbA1c 5.7% से 6.4% के बीच है, तो यह समय रहते डायबिटीज को रोकने का सुनहरा अवसर है। जानें सही खानपान और व्यायाम से ब्लड शुगर को सामान्य करने के तरीके।',
    categoryId: 'health-awareness',
    categoryName: 'Health Awareness',
    hindiCategoryName: 'स्वास्थ्य जागरूकता',
    featured: false,
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Comprehensive Diabetes Screening at Janhit Diagnostic Labs.',
    hindiImageCaption: 'जनहित हॉस्पिटल का संपूर्ण डायबिटीज एवं मेटाबॉलिक जांच केंद्र।',
    readTime: '5 Min Read',
    hindiReadTime: '5 मिनट पठन',
    publishDate: '12 September 2026',
    hindiPublishDate: '12 सितंबर 2026',
    lastUpdatedDate: '15 October 2026',
    hindiLastUpdatedDate: '15 अक्टूबर 2026',
    author: {
      name: 'Dr. Ashok Sharma',
      hindiName: 'डॉ. अशोक शर्मा',
      role: 'Chief Cardiometabolic Specialist',
      hindiRole: 'मुख्य कार्डियोमेटाबॉलिक विशेषज्ञ',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
      doctorId: 'dr-ashok-sharma',
    },
    reviewer: {
      name: 'Dr. Ashok Sharma',
      hindiName: 'डॉ. अशोक शर्मा',
      qualification: 'MBBS, MD (Medicine), DM (Cardiology)',
      hindiQualification: 'एमबीबीएस, एमडी, डीएम',
      designation: 'Director of Clinical Services',
      hindiDesignation: 'निदेशक - क्लीनिकल सेवाएं',
      doctorId: 'dr-ashok-sharma',
      verifiedBadge: true,
    },
    departmentId: 'cardiology',
    departmentName: 'Endocrinology & Cardiology',
    hindiDepartmentName: 'एंडोक्रिनोलॉजी एवं हृदय रोग',
    sections: [
      {
        id: 'hba1c-explained',
        heading: 'What Does Your HbA1c Score Actually Mean?',
        hindiHeading: 'HbA1c जांच का क्या अर्थ होता है?',
        paragraphs: [
          'Unlike daily fasting blood sugar readings that fluctuate by the hour, HbA1c measures the percentage of hemoglobin molecules in red blood cells that are glycated (bonded with glucose) over their 90 to 120-day lifespan.',
          'An HbA1c under 5.7% is normal; 5.7% to 6.4% indicates prediabetes; and 6.5% or higher on two separate occasions diagnosticates Type 2 Diabetes.',
        ],
        hindiParagraphs: [
          'दैनिक फास्टिंग ब्लड शुगर घंटे-घंटे पर बदलती है, जबकि HbA1c टेस्ट पिछले 3 महीनों (90-120 दिन) का औसत ब्लड शुगर स्तर दर्शाता है।',
          '5.7% से कम HbA1c सामान्य माना जाता है; 5.7% से 6.4% प्री-डायबिटीज (खतरे की घंटी) है; और 6.5% या उससे अधिक होने पर डायबिटीज की पुष्टि होती है।',
        ],
      },
    ],
    relatedArticleSlugs: ['heart-attack-warning-signs', 'fatty-liver-disease-reversal'],
    tags: ['Diabetes', 'HbA1c', 'Nutrition', 'Blood Sugar', 'Metabolism'],
    seo: {
      metaTitle: 'Reversing Prediabetes & Understanding HbA1c | Janhit Hospital',
      hindiMetaTitle: 'प्री-डायबिटीज को कैसे रोकें: HbA1c टेस्ट गाइड | जनहित हॉस्पिटल',
      metaDescription:
        'Understand HbA1c readings, prediabetes reversal strategies, and insulin sensitivity nutrition from doctors at Janhit Hospital.',
      hindiMetaDescription:
        'जनहित अस्पताल के विशेषज्ञ चिकित्सकों से जानें HbA1c टेस्ट का सही अर्थ और प्री-डायबिटीज को बिना दवा सामान्य करने के नियम।',
      keywords: ['reverse prediabetes', 'hba1c test normal range', 'blood sugar control diet', 'diabetes reversal india'],
    },
  },
  {
    id: 'art-8',
    slug: 'hypertension-silent-killer-guide',
    title: 'High Blood Pressure: Managing the "Silent Killer" with Evidence-Based Habits',
    hindiTitle: 'हाई ब्लड प्रेशर (उच्च रक्तचाप): जानिए "साइलेंट किलर" को नियंत्रित करने के सटीक उपाय',
    excerpt:
      'Over 30% of adult Indians live with hypertension without experiencing noticeable symptoms. Learn the DASH dietary protocol, sodium thresholds, and accurate home monitoring methods.',
    hindiExcerpt:
      'भारत में 30% से अधिक वयस्क बिना किसी लक्षण के उच्च रक्तचाप से पीड़ित हैं। जानें डैश डाइट (DASH), नमक की सही मात्रा और घर पर बीपी नापने के सही नियम।',
    categoryId: 'general-wellness',
    categoryName: 'General Wellness',
    hindiCategoryName: 'सामान्य स्वास्थ्य सुझाव',
    featured: false,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Preventive Health Checkup Wing at Janhit Hospital.',
    hindiImageCaption: 'जनहित हॉस्पिटल का प्रिवेंटिव हेल्थ चेकअप एवं वेलनेस विभाग।',
    readTime: '4 Min Read',
    hindiReadTime: '4 मिनट पठन',
    publishDate: '02 September 2026',
    hindiPublishDate: '02 सितंबर 2026',
    lastUpdatedDate: '10 October 2026',
    hindiLastUpdatedDate: '10 अक्टूबर 2026',
    author: {
      name: 'Dr. Ashok Sharma',
      hindiName: 'डॉ. अशोक शर्मा',
      role: 'Chief Cardiologist',
      hindiRole: 'मुख्य हृदय रोग विशेषज्ञ',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
      doctorId: 'dr-ashok-sharma',
    },
    reviewer: {
      name: 'Dr. Ashok Sharma',
      hindiName: 'डॉ. अशोक शर्मा',
      qualification: 'MBBS, MD, DM (Cardiology)',
      hindiQualification: 'एमबीबीएस, एमडी, डीएम',
      designation: 'Director of Cardiology',
      hindiDesignation: 'निदेशक - कार्डियोलॉजी',
      doctorId: 'dr-ashok-sharma',
      verifiedBadge: true,
    },
    departmentId: 'cardiology',
    departmentName: 'Cardiology & Preventive Medicine',
    hindiDepartmentName: 'कार्डियोलॉजी एवं प्रिवेंटिव मेडिसिन',
    sections: [
      {
        id: 'bp-targets',
        heading: 'Why High Blood Pressure Damages Vital Organs',
        hindiHeading: 'हाई बीपी अंगों को कैसे नुकसान पहुंचाता है?',
        paragraphs: [
          'High blood pressure exerts continuous mechanical shear stress against the delicate endothelium of arterial walls. Over years, this causes arterial hardening (atherosclerosis), triggering heart attacks, brain strokes, kidney failure, and retinal eye damage.',
          'The ideal healthy blood pressure target for most adults is around 120/80 mmHg.',
        ],
        hindiParagraphs: [
          'उच्च रक्तचाप धमनियों की दीवारों पर लगातार असामान्य दबाव डालता है। वर्षों तक बीपी अनियंत्रित रहने से रक्त वाहिकाएं सख्त हो जाती हैं, जिससे ब्रेन स्ट्रोक (लकवा), हार्ट अटैक और किडनी खराब होने का खतरा कई गुना बढ़ जाता है।',
          'अधिकांश वयस्कों के लिए स्वस्थ रक्तचाप का सामान्य स्तर 120/80 mmHg के आसपास होना चाहिए।',
        ],
      },
    ],
    relatedArticleSlugs: ['heart-attack-warning-signs', 'diabetes-hba1c-lifestyle-control'],
    tags: ['Hypertension', 'Blood Pressure', 'Heart Care', 'DASH Diet', 'Wellness'],
    seo: {
      metaTitle: 'High Blood Pressure Management & Diet Tips | Janhit Hospital',
      hindiMetaTitle: 'हाई ब्लड प्रेशर को कैसे नियंत्रित रखें: घरेलू उपाय | जनहित हॉस्पिटल',
      metaDescription:
        'Discover actionable strategies to manage hypertension with DASH nutrition and clinical insights from cardiologists at Janhit Hospital.',
      hindiMetaDescription:
        'जनहित अस्पताल के डॉक्टरों से जानें हाई ब्लड प्रेशर के खतरे, नमक की सही मात्रा और घर पर बीपी नापने के सही नियम।',
      keywords: ['high blood pressure diet', 'hypertension control tips', 'dash diet india', 'bp normal range'],
    },
  },
];

