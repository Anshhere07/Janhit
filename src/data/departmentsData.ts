export interface DepartmentService {
  title: string;
  hindiTitle: string;
  description: string;
  hindiDescription: string;
  icon?: string;
}

export interface ConditionTreated {
  name: string;
  hindiName: string;
  description: string;
  hindiDescription: string;
}

export interface DepartmentProcedure {
  name: string;
  hindiName: string;
  type: string;
  hindiType: string;
  description: string;
  hindiDescription: string;
}

export interface DepartmentFAQ {
  question: string;
  hindiQuestion: string;
  answer: string;
  hindiAnswer: string;
}

export interface Department {
  id: string;
  name: string;
  hindiName: string;
  tagline: string;
  hindiTagline: string;
  icon: string;
  image: string;
  stats: string;
  overview: string;
  hindiOverview: string;
  keyHighlights: string[];
  hindiKeyHighlights: string[];
  services: DepartmentService[];
  conditionsTreated: ConditionTreated[];
  procedures: DepartmentProcedure[];
  treatmentsOffered: string[];
  hindiTreatmentsOffered: string[];
  diagnosticFacilities: string[];
  hindiDiagnosticFacilities: string[];
  doctorIds: string[];
  faqs: DepartmentFAQ[];
}

export const DEPARTMENTS_DATA: Department[] = [
  {
    id: 'cardiology',
    name: 'Cardiology & Heart Care',
    hindiName: 'कार्डियोलॉजी एवं हृदय रोग',
    tagline: 'Advanced Interventional Cardiology, Biplane Cath Lab & 24/7 Primary PCI',
    hindiTagline: 'अत्याधुनिक कैथ लैब, 24/7 प्राइमरी एंजियोप्लास्टी एवं कार्डियक आईसीयू',
    icon: 'HeartPulse',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
    stats: '15,000+ Interventions | < 50 Min Door-to-Balloon',
    overview:
      'The Department of Cardiology & Heart Care at Janhit Hospital is a tertiary referral centre delivering comprehensive diagnostic, interventional, and preventive cardiac solutions. Equipped with a state-of-the-art Philips Azurion biplane catheterization laboratory and a specialized Coronary Care Unit (CCU), our senior cardiology faculty provides round-the-clock emergency Primary Angioplasty (PCI), complex coronary stenting, pacemaker implantation, and structural heart procedures.',
    hindiOverview:
      'जनहित हॉस्पिटल का कार्डियोलॉजी एवं हृदय रोग विभाग अत्याधुनिक तृतीयक चिकित्सा केंद्र है। यहां फिलिप्स बाइप्लेन कैथ लैब, 24/7 इमरजेंसी प्राइमरी एंजियोप्लास्टी (PCI), पेसमेकर इम्प्लांटेशन और विशेष कोरोनरी केयर यूनिट (CCU) की सुविधा उपलब्ध है। हमारे वरिष्ठ हृदय रोग विशेषज्ञ अंतरराष्ट्रीय स्तर के साक्ष्य-आधारित प्रोटोकॉल द्वारा मरीजों को जीवनरक्षक देखभाल प्रदान करते हैं।',
    keyHighlights: [
      '24/7 Dedicated Cardiac Emergency & Cath Lab Team',
      'Sub-50 Minute Door-to-Balloon Time for Acute Myocardial Infarction',
      'Dedicated 24-Bed Coronary Intensive Care Unit (CCU)',
      'Intravascular Ultrasound (IVUS) & Optical Coherence Tomography (OCT)',
      'Cashless Empanelment with Ayushman Bharat & All Major Insurance TPAs',
    ],
    hindiKeyHighlights: [
      '24/7 समर्पित कार्डियक इमरजेंसी एवं कैथ लैब टीम',
      'दिल के दौरे में 50 मिनट से कम का डोर-टू-बलून समय',
      '24-बेड समर्पित कोरोनरी इंटेंसिव केयर यूनिट (CCU)',
      'आईवीयूएस (IVUS) एवं ओसीटी (OCT) इमेजिंग सुविधा',
      'आयुष्मान भारत एवं कैशलेस टीपीए पैनल सुविधा',
    ],
    services: [
      {
        title: 'Emergency Primary PCI (Angioplasty)',
        hindiTitle: 'आपातकालीन प्राइमरी एंजियोप्लास्टी',
        description:
          'Immediate catheter intervention to restore coronary blood flow during acute myocardial infarction (heart attack).',
        hindiDescription:
          'दिल का दौरा पड़ने पर बंद नसों को तुरंत खोलने हेतु आपातकालीन कैथेटर एंजियोप्लास्टी।',
      },
      {
        title: 'Electrophysiology & Pacemakers',
        hindiTitle: 'इलेक्ट्रोफिजियोलॉजी एवं पेसमेकर',
        description:
          'Diagnostic EP studies, radiofrequency ablation for arrhythmias, and single/dual chamber pacemaker & ICD implants.',
        hindiDescription:
          'अनियमित धड़कन (एरिथमिया) की जांच, रेडियोफ्रीक्वेंसी एब्लेशन एवं पेसमेकर प्रत्यारोपण।',
      },
      {
        title: 'Structural & Valvular Heart Care',
        hindiTitle: 'वाल्व रोग एवं संरचनात्मक हृदय उपचार',
        description:
          'Transcatheter Aortic Valve Replacement (TAVR), balloon mitral valvuloplasty, and ASD/VSD device closures.',
        hindiDescription:
          'बिना ओपन-हार्ट सर्जरी के टीएवीआर (TAVR) वाल्व बदलना एवं दिल के छेद का उपचार।',
      },
      {
        title: 'Non-Invasive Cardiac Diagnostics',
        hindiTitle: 'नॉन-इनवेसिव कार्डियक डायग्नोस्टिक्स',
        description:
          '3D Echocardiography, Stress Echocardiography, Treadmill Testing (TMT), and 24-Hour Holter telemetry.',
        hindiDescription:
          '3D इकोकार्डियोग्राफी, स्ट्रेस इको, टीएमटी (TMT) एवं 24 घंटे की होल्टर मॉनिटरिंग।',
      },
    ],
    conditionsTreated: [
      {
        name: 'Coronary Artery Disease (CAD)',
        hindiName: 'कोरोनरी आर्टरी डिजीज (सीएडी)',
        description:
          'Narrowing or blockage of coronary arteries causing angina or myocardial infarction.',
        hindiDescription:
          'हृदय की धमनियों में ब्लॉकेज के कारण सीने में दर्द या दिल का दौरा।',
      },
      {
        name: 'Congestive Heart Failure',
        hindiName: 'हार्ट फेलियर',
        description:
          'Impaired pumping capacity of the heart managed with guideline-directed medical therapy and device support.',
        hindiDescription:
          'हृदय की पम्पिंग क्षमता कम होना, जिसे आधुनिक दवाओं और डिवाइस द्वारा नियंत्रित किया जाता है।',
      },
      {
        name: 'Cardiac Arrhythmias',
        hindiName: 'हृदय गति की अनियमितता (एरिथमिया)',
        description:
          'Abnormally fast, slow, or irregular heartbeats requiring pharmacological or electrical stabilization.',
        hindiDescription:
          'हृदय की धड़कन का बहुत तेज, धीमा या अनियमित होना।',
      },
      {
        name: 'Hypertensive Heart Disease',
        hindiName: 'उच्च रक्तचाप जनित हृदय रोग',
        description:
          'Long-standing high blood pressure leading to left ventricular hypertrophy and vascular stiffness.',
        hindiDescription:
          'अनियंत्रित ब्लड प्रेशर के कारण हृदय की मांसपेशियों का मोटा होना व कमजोरी।',
      },
    ],
    procedures: [
      {
        name: 'Coronary Angioplasty & Stenting (PCI)',
        hindiName: 'कोरोनरी एंजियोप्लास्टी एवं स्टेंटिंग',
        type: 'Minimally Invasive Interventional',
        hindiType: 'मिनिमल इनवेसिव इंटरवेंशन',
        description:
          'Radial or femoral artery access using drug-eluting stents to restore blocked blood flow with sub-millimeter precision.',
        hindiDescription:
          'कलाई या जांघ की नस से दवायुक्त आधुनिक स्टेंट डालकर ब्लॉकेज खोलना।',
      },
      {
        name: 'Permanent Pacemaker Implantation (PPI)',
        hindiName: 'पेसमेकर इम्प्लांटेशन',
        type: 'Surgical Device Implant',
        hindiType: 'सर्जिकल डिवाइस इम्प्लांट',
        description:
          'Subcutaneous pulse generator insertion under local anaesthesia to maintain steady physiological heart rate.',
        hindiDescription:
          'हार्ट बीट को सामान्य बनाए रखने हेतु कॉलरबोन के नीचे पेसमेकर लगाना।',
      },
      {
        name: 'Diagnostic Coronary Angiography',
        hindiName: 'कोरोनरी एंजियोग्राफी',
        type: 'Day Care Diagnostic',
        hindiType: 'डे-केयर जांच',
        description:
          'Contrast fluoroscopy mapping coronary anatomy with high-definition digital visualization.',
        hindiDescription:
          'हृदय की नसों में ब्लॉकेज का सटीक पता लगाने हेतु डिजिटल कंट्रास्ट जांच।',
      },
    ],
    treatmentsOffered: [
      'Coronary Angioplasty (PCI)',
      'Diagnostic Coronary Angiography',
      'Pacemaker & ICD Implantation',
      'TAVR & Valvular Repair',
      'Cardiac Rehabilitation & Diet Counseling',
      'Heart Failure Optimization Clinic',
    ],
    hindiTreatmentsOffered: [
      'कोरोनरी एंजियोप्लास्टी (PCI)',
      'कोरोनरी एंजियोग्राफी',
      'पेसमेकर एवं आईसीडी इम्प्लांट',
      'टीएवीआर (TAVR) वाल्व उपचार',
      'कार्डियक रिहैबिलिटेशन एवं डाइट परामर्श',
      'हार्ट फेलियर विशेषज्ञ क्लिनिक',
    ],
    diagnosticFacilities: [
      'Philips Azurion Biplane Cath Lab',
      'GE Vivid E95 4D Cardiovascular Ultrasound',
      '128-Slice Dual-Source Cardiac CT Angiography',
      '12-Lead Digital ECG & Stress Echo (TMT)',
      '24-48 Hour Digital Telemetry & Holter',
    ],
    hindiDiagnosticFacilities: [
      'फिलिप्स अज़्यूरियन बाइप्लेन कैथ लैब',
      'जीई विविड E95 4D कार्डियोवस्कुलर इको',
      '128-स्लाइस कार्डियक सीटी एंजियोग्राफी',
      '12-लीड डिजिटल ईसीजी व टीएमटी (TMT)',
      '24-48 घंटे डिजिटल होल्टर टेलीमेट्री',
    ],
    doctorIds: ['dr-ashok-sharma'],
    faqs: [
      {
        question: 'What is the immediate procedure when someone arrives with chest pain?',
        hindiQuestion: 'सीने में दर्द के मरीज के आने पर क्या तत्काल प्रक्रिया होती है?',
        answer:
          'Our emergency department initiates an immediate 12-lead ECG within 5 minutes. If an acute ST-elevation myocardial infarction (STEMI) is identified, the catheterization laboratory team is activated instantly for Primary PCI to restore artery blood flow within our benchmark door-to-balloon time of under 50 minutes.',
        hindiAnswer:
          'मरीज के अस्पताल पहुंचते ही 5 मिनट में ईसीजी की जाती है। यदि दिल का दौरा (STEMI) पाया जाता है, तो कैथ लैब टीम तुरंत सक्रिय होकर 50 मिनट के भीतर एंजियोप्लास्टी द्वारा ब्लॉकेज खोल देती है।',
      },
      {
        question: 'Is radial angiography safer than femoral angiography?',
        hindiQuestion: 'क्या कलाई (रेडियल) से की जाने वाली एंजियोग्राफी ज्यादा सुरक्षित है?',
        answer:
          'Yes, radial artery access through the wrist has become our gold standard because it significantly minimizes bleeding risk, avoids prolonged bed rest, and allows most patients to sit up and walk within a few hours post-procedure.',
        hindiAnswer:
          'जी हाँ, कलाई (रेडियल आर्टरी) से एंजियोग्राफी करने पर रक्तस्राव का जोखिम बहुत कम होता है और मरीज प्रक्रिया के कुछ ही घंटों बाद चलने-फिरने में सक्षम हो जाता है।',
      },
    ],
  },
  {
    id: 'neurology',
    name: 'Neurology & Neuro Surgery',
    hindiName: 'न्यूरोलॉजी एवं मस्तिष्क रोग',
    tagline: 'Rapid 15-Minute Stroke Unit, Brain Tumor Microsurgery & Spine Navigation',
    hindiTagline: '15 मिनट में स्ट्रोक ट्राइएज, न्यूरो-एंडोस्कोपी एवं स्पाइन नेविगेशन',
    icon: 'Brain',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1000&q=80',
    stats: '24/7 Stroke Unit | Sub-Millimeter Navigation',
    overview:
      'The Department of Neuro Sciences at Janhit Hospital integrates advanced clinical neurology, stereotactic neurosurgery, and neuro-interventional radiology. Operating with cutting-edge optical microscopes and intraoperative neuro-navigation, our neurosurgical faculty specializes in complex brain tumor excisions, awake craniotomies, micro-vascular spine decompression, and acute mechanical thrombectomy for ischemic stroke.',
    hindiOverview:
      'जनहित हॉस्पिटल का न्यूरो साइंसेज विभाग मस्तिष्क, रीढ़ की हड्डी और तंत्रिका तंत्र के जटिल रोगों के उपचार हेतु समर्पित है। यहां इंट्रा-ऑपरेटिव न्यूरो-नेविगेशन, आधुनिक सर्जिकल माइक्रोस्कोप और 15-मिनट स्ट्रोक रेस्क्यू यूनिट उपलब्ध है। हमारी वरिष्ठ फैकल्टी ब्रेन ट्यूमर, स्पाइन डीकंप्रेशन और तीव्र पक्षाघात (स्ट्रोक) में विशेषज्ञता रखती है।',
    keyHighlights: [
      'Dedicated 24/7 Hyperacute Stroke Pathway with Thrombolysis & Thrombectomy',
      'Carl Zeiss Intraoperative Neurosurgical Optical Microscope',
      'Medtronic StealthStation 3D Computer-Assisted Brain & Spine Navigation',
      'Neuro-Intensive Care Unit (NICU) with Multi-Modal Intracranial Monitoring',
      'Comprehensive Epilepsy & Neurophysiology Diagnostic Suite',
    ],
    hindiKeyHighlights: [
      '24/7 तीव्र स्ट्रोक पाथवे (थ्रोम्बोलिसिस एवं मैकेनिकल थ्रोम्बेक्टोमी)',
      'कार्ल ज़ीस आधुनिक इंट्रा-ऑपरेटिव न्यूरोसर्जिकल माइक्रोस्कोप',
      'मेड्रॉनिक 3D कंप्यूटर-असिस्टेड ब्रेन व स्पाइन नेविगेशन',
      'समर्पित न्यूरो-आईसीयू एवं इंट्राक्रेनियल प्रेशर मॉनिटरिंग',
      'मिर्गी (एपिलेप्सी) व न्यूरोफिजियोलॉजी डायग्नोस्टिक सेंटर',
    ],
    services: [
      {
        title: 'Hyperacute Stroke Management',
        hindiTitle: 'एक्यूट स्ट्रोक एवं पक्षाघात प्रबंधन',
        description:
          'Rapid intravenous tissue plasminogen activator (tPA) thrombolysis and endovascular mechanical clot retrieval.',
        hindiDescription:
          'स्ट्रोक के प्रारंभिक 4.5 घंटों में रक्त का थक्का घोलने वाली दवा और नसों से थक्का निकालने की आधुनिक प्रक्रिया।',
      },
      {
        title: 'Micro-Neurosurgery for Brain Tumors',
        hindiTitle: 'ब्रेन ट्यूमर माइक्रो-न्यूरोसर्जरी',
        description:
          'Neuronavigation-guided microsurgical resection of gliomas, meningiomas, and pituitary adenomas.',
        hindiDescription:
          'कंप्यूटर नेविगेशन द्वारा मस्तिष्क के ट्यूमर को स्वस्थ ऊतकों को बचाते हुए सटीकता से निकालना।',
      },
      {
        title: 'Minimally Invasive Spine Surgery (MISS)',
        hindiTitle: 'दूरबीन द्वारा स्पाइन व स्लिप डिस्क सर्जरी',
        description:
          'Endoscopic discectomy, spinal canal decompression, and percutaneous transpedicular fixation.',
        hindiDescription:
          'न्यूनतम चीरे द्वारा स्लिप डिस्क, सायटिका एवं रीढ़ की हड्डी के दबाव का उपचार।',
      },
      {
        title: 'Epilepsy & Movement Disorders',
        hindiTitle: 'मिर्गी एवं कंपवात (पार्किंसंस) क्लिनिक',
        description:
          'Long-term video EEG monitoring, pharmacological management of seizures, and Parkinson’s therapy.',
        hindiDescription:
          'लंबे समय की वीडियो ईईजी, मिर्गी के दौरों की रोकथाम एवं पार्किंसंस रोग का समग्र उपचार।',
      },
    ],
    conditionsTreated: [
      {
        name: 'Acute Ischemic & Hemorrhagic Stroke',
        hindiName: 'एक्यूट स्ट्रोक (मस्तिष्क पक्षाघात)',
        description:
          'Sudden disruption of cerebral perfusion or intracranial hemorrhage causing neurological deficits.',
        hindiDescription:
          'दिमाग की नस में रुकावट या नस फटने के कारण अचानक बोलने या चलने में असमर्थता।',
      },
      {
        name: 'Brain & Skull-Base Tumors',
        hindiName: 'ब्रेन एवं स्कल-बेस ट्यूमर',
        description:
          'Benign and malignant cranial neoplasms requiring microsurgical or stereotactic interventions.',
        hindiDescription:
          'मस्तिष्क या कपाल के आधार में गांठ या ट्यूमर, जिसके लिए सूक्ष्म सर्जरी आवश्यक होती है।',
      },
      {
        name: 'Herniated Disc & Cervical Spondylosis',
        hindiName: 'स्लिप डिस्क एवं सर्वाइकल स्पॉन्डिलाइटिस',
        description:
          'Spinal disc protrusion compressing nerve roots resulting in sciatica, radiculopathy, or myelopathy.',
        hindiDescription:
          'रीढ़ की डिस्क खिसकने से नसों का दबना, जिससे गर्दन, पीठ या पैरों में तेज दर्द होता है।',
      },
    ],
    procedures: [
      {
        name: 'Minimally Invasive Brain Tumor Microsurgery',
        hindiName: 'माइक्रोस्कोपिक ब्रेन ट्यूमर सर्जरी',
        type: 'Neurosurgical Micro-Procedure',
        hindiType: 'माइक्रो-न्यूरोसर्जरी',
        description:
          'High-precision removal of intracranial lesions using real-time MRI guidance and microscopic illumination.',
        hindiDescription:
          'उच्च आवर्धन माइक्रोस्कोप और रियल-टाइम एमआरआई मार्गदर्शन से ट्यूमर निकालना।',
      },
      {
        name: 'Endoscopic Lumbar Discectomy',
        hindiName: 'एंडोस्कोपिक स्लिप डिस्क सर्जरी',
        type: 'Keyhole Spine Surgery',
        hindiType: 'की-होल स्पाइन सर्जरी',
        description:
          'Ultra-small skin incision using spinal endoscopes to excise herniated disc fragments with minimal muscle trauma.',
        hindiDescription:
          'अत्यंत छोटे चीरे द्वारा दूरबीन से दबी हुई नस को तुरंत दबावमुक्त करना।',
      },
    ],
    treatmentsOffered: [
      'Acute Stroke Thrombolysis & Thrombectomy',
      'Micro-Neurosurgery for Brain Tumors',
      'Minimally Invasive Spine Surgery',
      'Endoscopic Pituitary Surgery',
      'Pediatric Hydrocephalus Shunts',
      'Neuro-Rehabilitation & Speech Therapy',
    ],
    hindiTreatmentsOffered: [
      'स्ट्रोक थ्रोम्बोलिसिस एवं थ्रोम्बेक्टोमी',
      'ब्रेन ट्यूमर माइक्रो-न्यूरोसर्जरी',
      'दूरबीन द्वारा स्पाइन व स्लिप डिस्क सर्जरी',
      'एंडोस्कोपिक पिट्यूटरी सर्जरी',
      'बाल हाइड्रोसेफालस शंट सर्जरी',
      'न्यूरो-रिहैबिलिटेशन व स्पीच थेरेपी',
    ],
    diagnosticFacilities: [
      '3 Tesla Silent MRI with Neuro-Tractography',
      '128-Slice Dual-Source Neuro CT Scanner',
      'Digital 32-Channel Video EEG Lab',
      'Nerve Conduction Velocity (NCV) & EMG',
      'Transcranial Doppler (TCD) Sonography',
    ],
    hindiDiagnosticFacilities: [
      '3 टेस्ला साइलेंट एमआरआई एवं ट्रैक्टोग्राफी',
      '128-स्लाइस न्यूरो सीटी स्कैनर',
      'डिजिटल 32-चैनल वीडियो ईईजी (EEG) लैब',
      'नर्व कंडक्शन वेलोसिटी (NCV) एवं ईएमजी',
      'ट्रांसक्रेनियल डॉप्लर (TCD) अल्ट्रासाउंड',
    ],
    doctorIds: ['dr-meenakshi-verma'],
    faqs: [
      {
        question: 'What is the golden window for acute stroke medical treatment?',
        hindiQuestion: 'स्ट्रोक के इलाज के लिए गोल्डन ऑवर (Golden Window) क्या है?',
        answer:
          'The first 4.5 hours from the onset of stroke symptoms represent the golden window for intravenous thrombolysis (clot-dissolving medicine). For large vessel blockages, mechanical thrombectomy can be performed up to 24 hours in selected patients.',
        hindiAnswer:
          'स्ट्रोक के लक्षण शुरू होने के पहले 4.5 घंटे गोल्डन विंडो होते हैं, जिसमें थ्रोम्बोलिसिस दवा से नस का थक्का तुरंत घोला जा सकता है। बड़ी नस ब्लॉक होने पर 24 घंटे तक मैकेनिकल प्रक्रिया संभव है।',
      },
      {
        question: 'Does every slip disc condition require spine surgery?',
        hindiQuestion: 'क्या स्लिप डिस्क के प्रत्येक मामले में ऑपरेशन जरूरी होता है?',
        answer:
          'No, over 85% of slip disc cases improve with conservative management, targeted physiotherapy, ergonomic modifications, and guided nerve root blocks. Surgery is advised only when progressive neurological weakness, severe nerve compression, or persistent intractable pain occurs.',
        hindiAnswer:
          'बिल्कुल नहीं, 85% से अधिक मरीज फिजियोथेरेपी, दवाओं और एर्गोनोमिक सावधानियों से ठीक हो जाते हैं। सर्जरी केवल गंभीर कमजोरी या असहनीय दर्द होने पर ही सुझाई जाती है।',
      },
    ],
  },
  {
    id: 'orthopaedics',
    name: 'Orthopaedics & Joint Care',
    hindiName: 'हड्डी एवं जोड़ रोग (ऑर्थोपेडिक्स)',
    tagline: 'Mako Robotic Knee & Hip Arthroplasty, Arthroscopy & Sports Medicine',
    hindiTagline: 'माको रोबोटिक नी व हिप रिप्लेसमेंट, आर्थ्रोस्कोपी एवं स्पोर्ट्स मेडिसिन',
    icon: 'Bone',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80',
    stats: '8,000+ Joint Replacements | Same-Day Mobilization',
    overview:
      'The Department of Orthopaedics & Joint Replacement at Janhit Hospital is a premier centre for advanced robotic-assisted joint reconstructive surgery, arthroscopic sports medicine, and complex polytrauma reconstruction. Utilizing state-of-the-art Mako robotic technology, our senior joint replacement faculty delivers CT-guided bone-sparing joint resurfacing that enables patients to walk within hours of surgery.',
    hindiOverview:
      'जनहित हॉस्पिटल का ऑर्थोपेडिक्स एवं रोबोटिक जॉइंट रिप्लेसमेंट विभाग भारत के अग्रणी केंद्रों में से एक है। यहां माको (Mako) रोबोटिक आर्म तकनीक द्वारा घुटने और कूल्हे का अत्यंत सटीक प्रत्यारोपण किया जाता है। हमारे कुशल सर्जन मांसपेशियों को नुकसान पहुंचाए बिना सर्जरी करते हैं, जिससे मरीज ऑपरेशन के कुछ ही घंटों बाद चलने में समर्थ होते हैं।',
    keyHighlights: [
      'Mako SmartRobotics CT-Based 3D Pre-Operative Planning & Sub-Millimeter Bone Resection',
      'Ultra-Sterile Class-100 Laminar Airflow Operation Theatres for Zero Infection Protocol',
      'Rapid Mobilization Protocol: Patients Walk 4-6 Hours Post-Operatively',
      'High-Definition 4K Arthroscopy for ACL, PCL & Meniscus Ligament Repairs',
      '24/7 Dedicated Polytrauma & Complex Pelvi-Acetabular Fracture Management Unit',
    ],
    hindiKeyHighlights: [
      'माको (Mako) रोबोटिक 3D सीटी आधारित सब-मिलीमीटर सटीक जॉइंट रिप्लेसमेंट',
      'शून्य संक्रमण नीति वाले क्लास-100 लैमिनार एयरफ्लो मॉड्यूलर ऑपरेशन थिएटर',
      'तीव्र रिकवरी प्रोटोकॉल: मरीज ऑपरेशन के 4 से 6 घंटे में चलने में सक्षम',
      '4K एचडी आर्थ्रोस्कोपी द्वारा एसीएल (ACL) व मेनिस्कस लिगामेंट रिपेयर',
      '24/7 गंभीर फ्रैक्चर एवं पेल्विक ट्रॉमा केयर यूनिट',
    ],
    services: [
      {
        title: 'Mako Robotic Total Knee Arthroplasty',
        hindiTitle: 'माको रोबोटिक नी रिप्लेसमेंट',
        description:
          'Sub-millimeter implant positioning tailored to patient-specific knee alignment and ligament tension.',
        hindiDescription:
          'मरीज के घुटने की प्राकृतिक बनावट के अनुसार रोबोटिक सटीकता से किया जाने वाला नी रिप्लेसमेंट।',
      },
      {
        title: 'Direct Anterior Muscle-Sparing Hip Replacement',
        hindiTitle: 'मांसपेशी-सुरक्षित डायरेक्ट एंटीरियर हिप रिप्लेसमेंट',
        description:
          'Hip replacement without detaching major muscles, minimizing post-surgical dislocation risks and pain.',
        hindiDescription:
          'प्रमुख मांसपेशियों को काटे बिना आगे से किया जाने वाला हिप रिप्लेसमेंट, जिससे तुरंत रिकवरी होती है।',
      },
      {
        title: 'Keyhole Arthroscopy & Sports Injury Unit',
        hindiTitle: 'दूरबीन द्वारा स्पोर्ट्स लिगामेंट रिपेयर',
        description:
          'Arthroscopic reconstruction of torn anterior cruciate ligaments (ACL), rotator cuff tears, and labral repairs.',
        hindiDescription:
          'दूरबीन द्वारा घुटने के एसीएल लिगामेंट और कंधे के रोटेटर कफ की मरम्मत।',
      },
      {
        title: 'Complex Polytrauma & Fracture Reconstruction',
        hindiTitle: 'जटिल फ्रैक्चर एवं ट्रॉमा सर्जरी',
        description:
          'Advanced internal fixation of comminuted fractures, pelvic acetabular trauma, and non-union cases.',
        hindiDescription:
          'दुर्घटना में टूटी हड्डियों, कूल्हे की हड्डी और जटिल फ्रैक्चर का आधुनिक इम्प्लांट्स द्वारा उपचार।',
      },
    ],
    conditionsTreated: [
      {
        name: 'Severe Osteoarthritis of Knee & Hip',
        hindiName: 'घुटने एवं कूल्हे का गंभीर ऑस्टियोआर्थराइटिस',
        description:
          'Degenerative joint cartilage depletion leading to chronic pain, joint stiffness, and walking deformity.',
        hindiDescription:
          'जोड़ों की कार्टिलेज घिस जाने के कारण चलने में तेज दर्द, जकड़न और पैरों का टेढ़ा होना।',
      },
      {
        name: 'Sports Ligament Tears (ACL, PCL, Meniscus)',
        hindiName: 'स्पोर्ट्स इंजरी एवं लिगामेंट टूटना',
        description:
          'Traumatic twisting injury causing instability, swelling, and locking sensations in the knee.',
        hindiDescription:
          'खेलने या मुड़ने के कारण घुटने का लिगामेंट फटना जिससे घुटने में लचक या अस्थिरता आती है।',
      },
      {
        name: 'Avascular Necrosis of Femoral Head (AVN)',
        hindiName: 'कूल्हे की हड्डी का एवस्कुलर नेक्रोसिस (AVN)',
        description:
          'Loss of blood supply to the hip ball causing bone collapse and intense groin stiffness.',
        hindiDescription:
          'कूल्हे की हड्डी में खून का दौरा बंद होने से हड्डी गलना, जिसे कोर डीकंप्रेशन या रिप्लेसमेंट से ठीक किया जाता है।',
      },
    ],
    procedures: [
      {
        name: 'Mako Robotic Total Knee Arthroplasty',
        hindiName: 'रोबोटिक टोटल नी रिप्लेसमेंट',
        type: 'Robotic-Assisted Joint Surgery',
        hindiType: 'रोबोटिक जॉइंट सर्जरी',
        description:
          'Patient-specific CT-guided bone resurfacing providing natural joint flexion and prolonged implant life.',
        hindiDescription:
          'सीटी स्कैन आधारित 3D प्लानिंग से घुटने की प्राकृतिक गति और 25+ वर्ष चलने वाले इम्प्लांट्स।',
      },
      {
        name: 'Arthroscopic ACL Ligament Reconstruction',
        hindiName: 'आर्थ्रोस्कोपिक एसीएल पुनर्निर्माण',
        type: 'Minimally Invasive Sports Surgery',
        hindiType: 'दूरबीन द्वारा स्पोर्ट्स सर्जरी',
        description:
          'Autograft hamstring or bone-tendon reconstruction restoring rotational joint stability under 4K camera visualization.',
        hindiDescription:
          '4K कैमरे की मदद से खुद की नस द्वारा नया लिगामेंट बनाकर घुटने को पुनः मजबूत बनाना।',
      },
    ],
    treatmentsOffered: [
      'Mako Robotic Knee Replacement',
      'Total & Partial Hip Arthroplasty',
      'Arthroscopic ACL & Meniscus Surgery',
      'Shoulder Rotator Cuff Arthroscopy',
      'Complex Pelvic Trauma Surgery',
      'Dedicated Orthopaedic Rehabilitation',
    ],
    hindiTreatmentsOffered: [
      'माको रोबोटिक नी रिप्लेसमेंट',
      'टोटल एवं पार्शियल हिप रिप्लेसमेंट',
      'दूरबीन द्वारा एसीएल व मेनिस्कस सर्जरी',
      'कंधे की रोटेटर कफ आर्थ्रोस्कोपी',
      'जटिल पेल्विक फ्रैक्चर फिक्सेशन',
      'समर्पित ऑर्थोपेडिक फिजियोथेरेपी',
    ],
    diagnosticFacilities: [
      'Digital Low-Dose Full-Length Weight-Bearing X-Rays',
      'High-Definition 3T Musculoskeletal MRI',
      'Hologic Dual-Energy X-Ray Absorptiometry (DEXA Scan)',
      '128-Slice High-Resolution Ortho CT Scanner',
      'Computerized Gait & Joint Mobility Analysis',
    ],
    hindiDiagnosticFacilities: [
      'डिजिटल फुल-लेंथ वेट-बेयरिंग एक्स-रे',
      '3T मस्कुलोस्केलेटल एमआरआई',
      'होलोजिक डेक्सा (DEXA) बोन डेंसिटी स्कैन',
      '128-स्लाइस ऑर्थोपेडिक सीटी स्कैनर',
      'कंप्यूटराइज्ड गैट एवं जॉइंट मोबिलिटी जांच',
    ],
    doctorIds: ['dr-rajesh-singh'],
    faqs: [
      {
        question: 'How does robotic knee replacement benefit the patient?',
        hindiQuestion: 'रोबोटिक नी रिप्लेसमेंट से मरीज को क्या अतिरिक्त लाभ होता है?',
        answer:
          'Mako robotic surgery allows the surgeon to create a 3D virtual model of your specific anatomy before surgery. During the operation, the robotic arm guides the bone resection with sub-millimeter precision, protecting healthy surrounding ligaments and nerves. This leads to less post-operative pain, reduced blood loss, quicker walking mobilization, and a more natural-feeling joint.',
        hindiAnswer:
          'रोबोटिक सर्जरी से ऑपरेशन से पहले घुटने का 3D मॉडल तैयार होता है। सर्जरी के दौरान रोबोटिक आर्म 0.5 मिमी की सटीकता से केवल खराब हिस्से को हटाती है और स्वस्थ नसों-मांसपेशियों को बचाती है, जिससे दर्द बहुत कम होता है और मरीज कुछ ही घंटों में चलने लगता है।',
      },
      {
        question: 'How long do modern robotic knee implants last?',
        hindiQuestion: 'आधुनिक रोबोटिक नी इम्प्लांट्स कितने साल तक चलते हैं?',
        answer:
          'Due to exact alignment, balanced soft-tissue tension, and advanced highly cross-linked polyethylene materials, clinical studies suggest contemporary robotic knee implants typically last 20 to 25+ years with proper rehabilitation and weight management.',
        hindiAnswer:
          'सटीक अलाइनमेंट और आधुनिक टाइटेनियम व क्रॉस-लिंक्ड पॉलीइथाइलीन तकनीक के कारण आधुनिक रोबोटिक इम्प्लांट्स उचित देखभाल के साथ 20 से 25+ वर्षों तक सुरक्षित कार्य करते हैं।',
      },
    ],
  },
  {
    id: 'oncology',
    name: 'Comprehensive Cancer Centre',
    hindiName: 'कैंसर रोग एवं ऑन्कोलॉजी',
    tagline: 'Multidisciplinary Tumor Board, Precision Targeted Oncology & TrueBeam Radiation',
    hindiTagline: 'ट्यूमर बोर्ड, ट्रू-बीम रेडिएशन थेरेपी, डे-केयर कीमोथेरेपी और इम्यूनोथेरेपी',
    icon: 'Activity',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1000&q=80',
    stats: 'NABH Cancer Centre | Multidisciplinary Tumor Board',
    overview:
      'The Comprehensive Cancer Centre at Janhit Hospital offers unified medical, surgical, and radiation oncology under one roof. Our clinical paradigm revolves around our Multidisciplinary Tumor Board, where medical oncologists, surgical oncologists, radiation specialists, and molecular pathologists collaborate to design an evidence-based, customized therapeutic blueprint for every patient.',
    hindiOverview:
      'जनहित हॉस्पिटल का कैंसर केयर सेंटर मेडिकल, सर्जिकल और रेडिएशन ऑन्कोलॉजी की संपूर्ण सुविधाएं एक ही छत के नीचे प्रदान करता है। हमारे संस्थान में प्रत्येक मरीज का उपचार मल्टी-डिसीप्लिनरी ट्यूमर बोर्ड के परामर्श अनुसार तय होता है। यहां डे-केयर कीमोथेरेपी, टारगेटेड मॉलिक्यूलर थेरेपी और इम्यूनोथेरेपी की अंतरराष्ट्रीय स्तर की सुविधाएं हैं।',
    keyHighlights: [
      'Multidisciplinary Tumor Board for Every Case Before Treatment Initiation',
      'HEPA-Filtered Day Care Chemotherapy Lounge with Dedicated Oncology Nursing',
      'Targeted Next-Generation Molecular Therapy & Immunotherapy Protocols',
      'TrueBeam High-Precision Linear Accelerator for Radiation Oncology',
      'Comprehensive Palliative Care, Pain Management & Cancer Nutrition Support',
    ],
    hindiKeyHighlights: [
      'उपचार शुरू करने से पहले प्रत्येक मरीज हेतु बहु-विशेषज्ञ ट्यूमर बोर्ड चर्चा',
      'हेपा-फिल्टर्ड डे-केयर कीमोथेरेपी लाउंज एवं प्रशिक्षित ऑन्कोलॉजी नर्सेज',
      'टारगेटेड नेक्स्ट-जनरेशन मॉलिक्यूलर थेरेपी एवं इम्यूनोथेरेपी प्रोटोकॉल',
      'सटीक रेडिएशन थेरेपी हेतु ट्रू-बीम (TrueBeam) लीनियर एक्सेलरेटर',
      'कैंसर दर्द निवारण, प्रशामक देखभाल (Palliative Care) एवं पोषण परामर्श',
    ],
    services: [
      {
        title: 'Medical Oncology & Immunotherapy',
        hindiTitle: 'मेडिकल ऑन्कोलॉजी एवं इम्यूनोथेरेपी',
        description:
          'Evidence-based chemotherapy regimens, monoclonal antibodies, immune checkpoint inhibitors, and targeted kinase blockers.',
        hindiDescription:
          'साक्ष्य-आधारित कीमोथेरेपी, मोनोक्लोनल एंटीबॉडीज और शरीर की रोग प्रतिरोधक क्षमता द्वारा कैंसर कोशिकाओं को नष्ट करने वाली इम्यूनोथेरेपी।',
      },
      {
        title: 'Surgical Oncology Resections',
        hindiTitle: 'सर्जिकल ऑन्कोलॉजी एवं कैंसर सर्जरी',
        description:
          'Radical and organ-preserving oncologic surgeries for breast, gastrointestinal, head & neck, and gynaecologic malignancies.',
        hindiDescription:
          'ब्रेस्ट, मुंह, गले, पेट और गर्भाशय के कैंसर की सटीक एवं अंग-संरक्षक सर्जरी।',
      },
      {
        title: 'Precision Radiation Oncology',
        hindiTitle: 'रेडिएशन ऑन्कोलॉजी (सटीक सिकाई)',
        description:
          'Image-Guided Radiotherapy (IGRT), Intensity-Modulated Radiotherapy (IMRT), and Stereotactic Body Radiotherapy (SBRT).',
        hindiDescription:
          'आईएमआरटी एवं एसबीआरटी तकनीक, जिससे स्वस्थ अंगों को नुकसान पहुंचाए बिना केवल ट्यूमर पर सटीक रेडिएशन दिया जाता है।',
      },
    ],
    conditionsTreated: [
      {
        name: 'Breast & Gynaecological Cancers',
        hindiName: 'स्तन एवं महिला जननांग कैंसर',
        description:
          'Invasive ductal carcinoma, ovarian, cervical, and endometrial malignancies managed with multimodal therapy.',
        hindiDescription:
          'स्तन, अंडाशय और गर्भाशय के कैंसर का आधुनिक दवाओं, सर्जरी और रेडिएशन द्वारा उपचार।',
      },
      {
        name: 'Gastrointestinal & Hepatobiliary Malignancies',
        hindiName: 'पेट, आंत, लिवर एवं पित्ताशय कैंसर',
        description:
          'Esophageal, stomach, colorectal, pancreatic, and primary liver carcinomas.',
        hindiDescription:
          'भोजन नली, पेट, आंतों और लिवर के ट्यूमर का विशेषज्ञ ऑन्कोलॉजिस्ट्स द्वारा उपचार।',
      },
      {
        name: 'Lung & Thoracic Cancers',
        hindiName: 'फेफड़ों एवं छाती का कैंसर',
        description:
          'Non-small cell lung cancer (NSCLC) staged and treated with molecular targeted therapy and stereotactic radiation.',
        hindiDescription:
          'फेफड़ों के कैंसर की मॉलिक्यूलर जांच और टारगेटेड गोलियों या कीमोथेरेपी द्वारा चिकित्सा।',
      },
    ],
    procedures: [
      {
        name: 'Targeted Chemotherapy & Immunotherapy',
        hindiName: 'टारगेटेड कीमोथेरेपी एवं इम्यूनोथेरेपी',
        type: 'Medical Oncology Infusion',
        hindiType: 'डे-केयर मेडिकल ऑन्कोलॉजी',
        description:
          'Intravenous infusion of bio-targeted agents in our HEPA-filtered day care suite with minimal systemic toxicity.',
        hindiDescription:
          'संक्रमण-मुक्त डे-केयर में बिना अस्पताल में भर्ती हुए कुछ ही घंटों में दी जाने वाली आधुनिक दवाएं।',
      },
    ],
    treatmentsOffered: [
      'Day Care Chemotherapy & Immunotherapy',
      'Breast Conservation Oncoplastic Surgery',
      'Image-Guided Precision Radiation (IGRT)',
      'Gastrointestinal Cancer Surgery',
      'Cancer Pain Management & Palliative Care',
      'Clinical Nutrition & Psychological Support',
    ],
    hindiTreatmentsOffered: [
      'डे-केयर कीमोथेरेपी एवं इम्यूनोथेरेपी',
      'ब्रेस्ट कंजर्वेशन ऑन्कोप्लास्टिक सर्जरी',
      'इमेज-गाइडेड रेडिएशन थेरेपी (IGRT)',
      'पेट एवं आंतों की कैंसर सर्जरी',
      'कैंसर दर्द प्रबंधन एवं उपशामक देखभाल',
      'कैंसर पोषण एवं मनोवैज्ञानिक परामर्श',
    ],
    diagnosticFacilities: [
      'Whole-Body High-Resolution PET-CT Scanner',
      'Stereotactic Ultrasound & CT Guided Biopsy',
      'Onco-Histopathology & Immunohistochemistry (IHC)',
      'Liquid Biopsy & Molecular Gene Sequencing',
      'Digital Mammography with 3D Tomosynthesis',
    ],
    hindiDiagnosticFacilities: [
      'होल-बॉडी हाई-रेजोल्यूशन पीईटी-सीटी (PET-CT)',
      'अल्ट्रासाउंड व सीटी गाइडेड बायोप्सी',
      'ऑनको-हिस्टोपैथोलॉजी एवं आईएचसी (IHC) लैब',
      'लिक्विड बायोप्सी एवं जीन सीक्वेंसिंग',
      'डिजिटल मैमोग्राफी एवं 3D टोमोसिंथेसिस',
    ],
    doctorIds: ['dr-alok-kapoor'],
    faqs: [
      {
        question: 'What is the role of the Multidisciplinary Tumor Board?',
        hindiQuestion: 'मल्टी-डिसीप्लिनरी ट्यूमर बोर्ड का क्या महत्व है?',
        answer:
          'Our Tumor Board gathers medical, surgical, and radiation oncologists, radiologists, and pathologists in a single conference to review patient scans and biopsy reports. This ensures the treatment plan adheres to international clinical guidelines rather than relying on a single individual opinion.',
        hindiAnswer:
          'ट्यूमर बोर्ड में मेडिकल, सर्जिकल, रेडिएशन कैंसर विशेषज्ञ, रेडियोलॉजिस्ट और पैथोलॉजिस्ट एक साथ बैठकर मरीज की रिपोर्ट की समीक्षा करते हैं। इससे मरीज को सर्वोत्तम और अंतरराष्ट्रीय गाइडलाइन्स के अनुसार उपचार मिलता है।',
      },
      {
        question: 'Do cancer patients always lose hair during treatment?',
        hindiQuestion: 'क्या कैंसर के उपचार में हमेशा बाल झड़ते हैं?',
        answer:
          'No. Hair loss depends specifically on the chemotherapy drugs used. Many modern targeted oral therapies, immunotherapies, and localized radiation therapies do not cause hair loss. Even where hair loss occurs, it is temporary and reverses after completion of therapy.',
        hindiAnswer:
          'नहीं, बाल झड़ना केवल कुछ विशेष कीमोथेरेपी दवाओं पर निर्भर करता है। आधुनिक टारगेटेड थेरेपी और इम्यूनोथेरेपी में बाल नहीं झड़ते। जिन दवाओं से बाल झड़ते भी हैं, वे उपचार समाप्त होने के बाद वापस उग आते हैं।',
      },
    ],
  },
  {
    id: 'paediatrics',
    name: 'Paediatrics & Neonatal Care (NICU)',
    hindiName: 'बाल रोग एवं नवजात शिशु गहन चिकित्सा',
    tagline: 'Level-3 Tertiary NICU, Pediatric Critical Care & Child Development Centre',
    hindiTagline: 'लेवल-III एनआईसीयू (NICU), बाल गहन चिकित्सा और टीकाकरण केंद्र',
    icon: 'Baby',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80',
    stats: 'Level-3 NICU | Preemies < 600g Survived',
    overview:
      'The Department of Paediatrics & Neonatology at Janhit Hospital is dedicated to the total health and well-being of infants, children, and adolescents. Centred around our accredited Level-3 Neonatal Intensive Care Unit (NICU), our team provides advanced mechanical ventilation, total parenteral nutrition (TPN), and developmental supportive care for critically ill and extremely preterm infants.',
    hindiOverview:
      'जनहित हॉस्पिटल का बाल रोग एवं नवजात शिशु गहन चिकित्सा विभाग (NICU) बच्चों के समग्र स्वास्थ्य और जीवनरक्षा हेतु समर्पित है। हमारे लेवल-3 एनआईसीयू में 600 ग्राम से कम वजन वाले अत्यंत संवेदनशील नवजात शिशुओं की जान बचाने हेतु हाई-फ्रीक्वेंसी वेंटिलेटर, इनक्यूबेटर और 24/7 बाल रोग विशेषज्ञों की निगरानी उपलब्ध है।',
    keyHighlights: [
      'Accredited Level-3 Tertiary Neonatal ICU (NICU) with Advanced Giraffe Omnibeds',
      'High-Frequency Oscillatory Ventilation (HFOV) & Inhaled Nitric Oxide Therapy',
      'Whole-Body Therapeutic Hypothermia for Neonatal Hypoxic Ischemic Encephalopathy',
      'Mobile Neonatal Ambulance Transport Equipped with Transport Incubator & Ventilator',
      'Comprehensive Well-Baby Clinic, Immunization & Developmental Milestone Assessments',
    ],
    hindiKeyHighlights: [
      'लेवल-3 एनआईसीयू (NICU) एवं उन्नत जिराफ ओमनीबेड इनक्यूबेटर्स',
      'हाई-फ्रीक्वेंसी ऑसिलेटरी वेंटिलेशन एवं नाइट्रिक ऑक्साइड थेरेपी',
      'जन्म के समय सांस न लेने वाले शिशुओं हेतु थेराप्यूटिक हाइपोथर्मिया (कूलिंग जैकेट)',
      'इनक्यूबेटर और वेंटिलेटर से सुसज्जित समर्पित मोबाइल नवजात एम्बुलेंस',
      'शिशु स्वास्थ्य, पूर्ण टीकाकरण एवं समग्र शारीरिक-मानसिक विकास क्लिनिक',
    ],
    services: [
      {
        title: 'Level-3 Neonatal Intensive Care (NICU)',
        hindiTitle: 'लेवल-3 नवजात शिशु गहन चिकित्सा (NICU)',
        description:
          'Care of extremely preterm preemies (< 28 weeks), respiratory distress syndrome, neonatal sepsis, and congenital anomalies.',
        hindiDescription:
          'समय से पहले जन्मे कमजोर बच्चों, सांस लेने में तकलीफ और गंभीर संक्रमण का 24/7 गहन उपचार।',
      },
      {
        title: 'Pediatric Intensive Care Unit (PICU)',
        hindiTitle: 'बाल गहन चिकित्सा इकाई (PICU)',
        description:
          'Advanced life support for severe childhood pneumonia, dengue shock syndrome, status epilepticus, and polytrauma.',
        hindiDescription:
          'गंभीर निमोनिया, डेंगू, मिर्गी के दौरे और गंभीर रूप से बीमार बच्चों हेतु वेंटिलेटर सपोर्ट।',
      },
      {
        title: 'Childhood Vaccination & Well-Baby Clinic',
        hindiTitle: 'शिशु टीकाकरण एवं स्वास्थ्य जांच',
        description:
          'National immunization schedule and optional vaccines administered under strict cold-chain monitoring.',
        hindiDescription:
          'कोल्ड-चेन सुरक्षा मानकों के अंतर्गत राष्ट्रीय एवं अंतरराष्ट्रीय गाइडलाइन्स अनुसार सभी टीके।',
      },
    ],
    conditionsTreated: [
      {
        name: 'Prematurity & Very Low Birth Weight',
        hindiName: 'समय पूर्व प्रसव एवं अल्प वजन नवजात शिशु',
        description:
          'Babies born before 37 weeks requiring surfactant replacement, temperature regulation, and specialized nutrition.',
        hindiDescription:
          '8 या 7 महीने में जन्मे अत्यंत कमजोर शिशुओं को सुरक्षित इनक्यूबेटर में रखकर परिपक्व करना।',
      },
      {
        name: 'Pediatric Asthma & Respiratory Infections',
        hindiName: 'बच्चों का दमा, ब्रोंकाइटिस एवं निमोनिया',
        description:
          'Recurrent wheezing, reactive airway disease, and infectious consolidations managed with nebulized therapy.',
        hindiDescription:
          'बच्चों में बार-बार खांसी, छाती में घरघराहट और सांस फूलने का सुरक्षित नेबुलाइजर व दवा उपचार।',
      },
    ],
    procedures: [
      {
        name: 'Neonatal Surfactant Therapy & Ventilation',
        hindiName: 'सर्फेक्टेंट थेरेपी एवं नवजात वेंटिलेशन',
        type: 'Neonatal Critical Care',
        hindiType: 'नवजात शिशु गहन चिकित्सा',
        description:
          'Endotracheal surfactant administration and gentle lung ventilation for preterm respiratory distress.',
        hindiDescription:
          'कमजोर फेफड़ों को खोलने हेतु दवा डालना और फेफड़ों को सुरक्षित वेंटिलेशन सपोर्ट देना।',
      },
    ],
    treatmentsOffered: [
      'Level-3 Tertiary Neonatal ICU Care',
      'Whole-Body Therapeutic Hypothermia',
      'Pediatric Intensive Care (PICU)',
      'Childhood Asthma & Allergy Clinic',
      'Complete Pediatric Vaccination Schedule',
      'Developmental Assessment & Growth Tracking',
    ],
    hindiTreatmentsOffered: [
      'लेवल-3 एनआईसीयू गहन शिशु देखभाल',
      'थेराप्यूटिक हाइपोथर्मिया (कूलिंग थेरेपी)',
      'बाल गहन चिकित्सा इकाई (PICU)',
      'बाल दमा एवं एलर्जी क्लिनिक',
      'सम्पूर्ण शिशु टीकाकरण सेवाएं',
      'शिशु शारीरिक व मानसिक विकास निगरानी',
    ],
    diagnosticFacilities: [
      'Dedicated Bedside Neonatal 2D Echocardiography',
      'Portable Low-Dose Digital Pediatric X-Ray',
      'Blood Gas Analyzer (ABG) with Micro-Sampling',
      'Non-Invasive Transcutaneous Bilirubinometer',
      'Ambulance Transport Incubator & Transport Ventilator',
    ],
    hindiDiagnosticFacilities: [
      'बेडसाइड नवजात इकोकार्डियोग्राफी',
      'लो-डोज पोर्टेबल बाल डिजिटल एक्स-रे',
      'माइक्रो-सैंपलिंग एबीजी (ABG) ब्लड गैस एनालाइजर',
      'बिना सुई चुभाए पीलिया जांचने वाला बिलीरुबिनोमीटर',
      'ट्रांसपोर्ट इनक्यूबेटर व मोबाइल वेंटिलेटर युक्त एम्बुलेंस',
    ],
    doctorIds: ['dr-sunita-deshmukh'],
    faqs: [
      {
        question: 'What is a Level-3 NICU and why is it important?',
        hindiQuestion: 'लेवल-3 एनआईसीयू (NICU) क्या है और यह क्यों महत्वपूर्ण है?',
        answer:
          'A Level-3 NICU represents the highest level of certified neonatal intensive care capable of caring for the smallest, most critically ill premature babies (< 28 weeks gestation, < 1000g). It features high-frequency ventilators, nitric oxide therapy, paediatric subspecialists, and round-the-clock neonatologists.',
        hindiAnswer:
          'लेवल-3 एनआईसीयू नवजात शिशुओं की गहन चिकित्सा का सर्वोच्च मान्यता प्राप्त स्तर है। यह 28 सप्ताह से पहले जन्मे और 1 किलो से कम वजन वाले अत्यंत गंभीर शिशुओं की जान बचाने हेतु जीवनरक्षक मशीनों और 24 घंटे बाल रोग विशेषज्ञों से लैस होता है।',
      },
      {
        question: 'Are mothers encouraged to breastfeed inside the NICU?',
        hindiQuestion: 'क्या एनआईसीयू में मां को स्तनपान कराने की अनुमति होती है?',
        answer:
          'Yes, our hospital actively promotes Kangaroo Mother Care (KMC) and early expressed breast milk feeding. Mothers are welcomed into the NICU to bond, nurse, and provide skin-to-skin care as soon as the baby achieves clinical stability.',
        hindiAnswer:
          'जी हाँ, हम कंगारू मदर केयर (KMC) और मां के दूध को बढ़ावा देते हैं। शिशु की स्थिति स्थिर होते ही मां को एनआईसीयू में बच्चे को सीने से लगाने और स्तनपान कराने के लिए पूरा सहयोग दिया जाता है।',
      },
    ],
  },
  {
    id: 'gastroenterology',
    name: 'Gastroenterology & Hepatology',
    hindiName: 'गैस्ट्रोएंटरोलॉजी एवं लिवर रोग',
    tagline: 'Advanced Video Endoscopy, Therapeutic ERCP & Fatty Liver Clinic',
    hindiTagline: 'एचडी वीडियो एंडोस्कोपी, ईआरसीपी (ERCP) एवं फैटी लिवर केयर क्लिनिक',
    icon: 'Stethoscope',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80',
    stats: '12,000+ Endoscopies | 24/7 GI Bleed Management',
    overview:
      'The Department of Gastroenterology & Hepatology at Janhit Hospital is a comprehensive digestive sciences centre equipped with latest Olympus high-definition video endoscopy towers. Our senior gastroenterologists provide diagnostic and therapeutic colonoscopies, endoscopic retrograde cholangiopancreatography (ERCP) for bile duct stones, endoscopic band ligation for bleeding varices, and chronic viral hepatitis therapy.',
    hindiOverview:
      'जनहित हॉस्पिटल का गैस्ट्रोएंटरोलॉजी एवं लिवर रोग विभाग पाचन तंत्र, आंतों और लिवर के रोगों के आधुनिक निदान व उपचार का केंद्र है। यहां अत्याधुनिक एचडी वीडियो एंडोस्कोपी, पित्त की नली से पथरी निकालने हेतु ईआरसीपी (ERCP), खूनी उल्टी रोकने के लिए एंडोस्कोपिक बैंडिंग और फैटी लिवर व हेपेटाइटिस का विशेषज्ञ उपचार उपलब्ध है।',
    keyHighlights: [
      'Olympus EVIS X1 4K High-Definition Video Endoscopy System',
      '24/7 Acute Gastrointestinal Bleed Protocol with Hemoclip & Band Ligation',
      'Therapeutic ERCP for Common Bile Duct (CBD) Stones & Obstructive Jaundice',
      'FibroScan 502 Touch for Painless, Non-Invasive Liver Stiffness & Steatosis Assessment',
      'Dedicated Inflammatory Bowel Disease (IBD: Crohn’s & Ulcerative Colitis) Clinic',
    ],
    hindiKeyHighlights: [
      'ओलंपस 4K अल्ट्रा-एचडी वीडियो एंडोस्कोपी एवं कोलोनोस्कोपी प्रणाली',
      '24/7 पेट से रक्तस्राव (खूनी उल्टी या काला दस्त) रोकने की आपातकालीन सुविधा',
      'बिना चीर-फाड़ दूरबीन (ERCP) द्वारा पित्त की नली से पथरी निकालने की तकनीक',
      'फाइब्रोस्कैन (FibroScan) द्वारा बिना सुई चुभाए लिवर की खराबी और चर्बी की जांच',
      'अल्सरेटिव कोलाइटिस एवं क्रोहन रोग (IBD) हेतु समर्पित क्लिनिक',
    ],
    services: [
      {
        title: 'Diagnostic & Therapeutic Endoscopy',
        hindiTitle: 'डायग्नोस्टिक एवं थेराप्यूटिक एंडोस्कोपी',
        description:
          'Upper GI endoscopy, biopsy of gastric ulcers, polyp removal, and foreign body retrieval under conscious sedation.',
        hindiDescription:
          'मुंह के रास्ते दूरबीन डालकर पेट के अल्सर, ट्यूमर की जांच, पॉलीप निकालना और बायोप्सी।',
      },
      {
        title: 'Therapeutic ERCP for Bile Duct Stones',
        hindiTitle: 'ईआरसीपी (ERCP) द्वारा पित्त नली पथरी निष्कासन',
        description:
          'Sphincterotomy, balloon stone extraction, and plastic/metal biliary stenting for biliary obstruction.',
        hindiDescription:
          'बिना पेट खोले दूरबीन से पित्त नली की पथरी निकालना और पीलिया दूर करने हेतु स्टेंट डालना।',
      },
      {
        title: 'Colonoscopy & Colorectal Screening',
        hindiTitle: 'कोलोनोस्कोपी एवं आंतों की जांच',
        description:
          'Full-length examination of the colon and terminal ileum for chronic diarrhea, bleeding, and early polyp resection.',
        hindiDescription:
          'बड़ी आंत की दूरबीन जांच, ब्लीडिंग के कारण का पता लगाना और कैंसर पूर्व गांठों को हटाना।',
      },
    ],
    conditionsTreated: [
      {
        name: 'Common Bile Duct (CBD) Stones & Jaundice',
        hindiName: 'पित्त नली की पथरी एवं पीलिया',
        description:
          'Calculi blocking the bile duct resulting in severe abdominal pain, high bilirubin, and cholangitis.',
        hindiDescription:
          'पित्त की नली में पथरी फंसने से पेट में तेज दर्द, आंखें पीली होना और संक्रमण।',
      },
      {
        name: 'Liver Cirrhosis & Fatty Liver Disease (NAFLD)',
        hindiName: 'लिवर सिरोसिस एवं फैटी लिवर',
        description:
          'Progressive fibrosis of liver tissue from alcohol, metabolic syndrome, or viral hepatitis.',
        hindiDescription:
          'लिवर पर चर्बी जमना या लिवर का सिकुड़ना, जिससे पेट में पानी भरना और कमजोरी होती है।',
      },
    ],
    procedures: [
      {
        name: 'Therapeutic ERCP & Biliary Stenting',
        hindiName: 'थेराप्यूटिक ईआरसीपी एवं स्टेंटिंग',
        type: 'Endoscopic Interventional Procedure',
        hindiType: 'एंडोस्कोपिक प्रक्रिया',
        description:
          'Fluoroscopic guidance allowing stone extraction basket cannulation with zero external surgical incision.',
        hindiDescription:
          'बिना किसी बाहरी चीरे के मुंह के रास्ते दूरबीन से पित्त नली की पथरी निकालना।',
      },
    ],
    treatmentsOffered: [
      'Diagnostic Upper GI Endoscopy',
      'Diagnostic & Therapeutic Colonoscopy',
      'Therapeutic ERCP for Bile Duct Calculi',
      'Endoscopic Variceal Band Ligation',
      'Liver FibroScan Assessment',
      'Chronic Hepatitis B & C Antiviral Therapy',
    ],
    hindiTreatmentsOffered: [
      'ऊपरी आहार नली एवं पेट की एंडोस्कोपी',
      'बड़ी आंत की संपूर्ण कोलोनोस्कोपी',
      'ईआरसीपी पित्त नली पथरी निष्कासन',
      'खूनी नसों की एंडोस्कोपिक बैंडिंग',
      'फाइब्रोस्कैन लिवर जांच',
      'हेपेटाइटिस बी एवं सी का एंटीवायरल इलाज',
    ],
    diagnosticFacilities: [
      'Olympus EVIS X1 High-Definition Video Endoscope',
      'Echosens FibroScan 502 Touch with XL Probe',
      'Olympus Ultrasonic Endoscope (EUS)',
      'Digital C-Arm Fluoroscopy for ERCP Suites',
      'High-Resolution Capsule Endoscopy System',
    ],
    hindiDiagnosticFacilities: [
      'ओलंपस EVIS X1 हाई-डेफिनिशन वीडियो एंडोस्कोप',
      'इकोसेंस फाइब्रोस्कैन 502 टच (लिवर जांच)',
      'ओलंपस एंडोस्कोपिक अल्ट्रासाउंड (EUS)',
      'ईआरसीपी हेतु डिजिटल सी-आर्म फ्लोरोस्कोपी',
      'कैप्सूल एंडोस्कोपी सिस्टम',
    ],
    doctorIds: ['dr-priya-nair'],
    faqs: [
      {
        question: 'Is upper endoscopy painful for the patient?',
        hindiQuestion: 'क्या एंडोस्कोपी जांच में दर्द होता है?',
        answer:
          'No, endoscopy is not painful. Patients receive a local throat anesthetic spray and mild conscious sedation to ensure comfort throughout the brief 8-10 minute procedure. Most patients experience zero pain and little to no recollection of the test.',
        hindiAnswer:
          'नहीं, एंडोस्कोपी दर्दनाक नहीं होती। गले को सुन्न करने वाला स्प्रे और हल्की बेहोशी दी जाती है, जिससे 8 से 10 मिनट की यह जांच बिना किसी तकलीफ के शांति से पूरी हो जाती है।',
      },
      {
        question: 'How is ERCP different from regular gallbladder surgery?',
        hindiQuestion: 'ईआरसीपी (ERCP) पित्ताशय के सामान्य ऑपरेशन से कैसे अलग है?',
        answer:
          'ERCP is an endoscopic procedure performed down the throat to clear stones stuck inside the bile duct (the pipe draining the liver). It does not involve any cuts in the abdomen. If you also have stones inside the gallbladder organ, laparoscopic surgery is subsequently performed to remove the gallbladder.',
        hindiAnswer:
          'ईआरसीपी मुंह के रास्ते की जाने वाली दूरबीन जांच है जो पित्त की नली में फंसी पथरी को बिना चीरे निकालती है। यदि पित्त की थैली में भी पथरी है, तो उसके लिए अलग से दूरबीन (लैप्रोस्कोपी) द्वारा थैली निकाली जाती है।',
      },
    ],
  },
  {
    id: 'nephrology',
    name: 'Nephrology & Renal Transplant',
    hindiName: 'नेफ्रोलॉजी एवं किडनी रोग',
    tagline: 'High-Flux Hemodialysis, Kidney Transplantation & Diabetic Nephropathy Care',
    hindiTagline: 'हाई-फ्लक्स हीमोडायलिसिस, किडनी प्रत्यारोपण एवं रीनल केयर यूनिट',
    icon: 'Activity',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1000&q=80',
    stats: '1,500+ Transplants Supervised | 24-Bed Dialysis',
    overview:
      'The Department of Nephrology & Kidney Transplantation at Janhit Hospital is a dedicated centre of excellence for renal diseases, acute kidney injury (AKI), chronic kidney disease (CKD), and renal transplantation. Supported by a modern 24-bed dialysis suite with online hemodiafiltration and specialized CRRT for intensive care patients, our nephrologists deliver compassionate, ethical renal care.',
    hindiOverview:
      'जनहित हॉस्पिटल का नेफ्रोलॉजी एवं किडनी रोग विभाग गुर्दे की बीमारियों, डायलिसिस और किडनी प्रत्यारोपण का अत्याधुनिक केंद्र है। यहां 24-बेड का अत्याधुनिक हीमोडायलिसिस केंद्र, आरओ वाटर ट्रीटमेंट प्लांट और आईसीयू मरीजों हेतु सीआरआरटी (CRRT) सुविधा उपलब्ध है। हमारे विशेषज्ञ डॉक्टर किडनी फेलियर की रोकथाम और सफल ट्रांसप्लांट में दक्ष हैं।',
    keyHighlights: [
      '24-Bed High-Flux Dialysis Suite Powered by Double-Pass RO Water Purification',
      'Continuous Renal Replacement Therapy (CRRT / SLED) for Hemodynamically Unstable ICU Patients',
      'Living-Related and ABO-Incompatible Kidney Transplant Services',
      'Ultrasound-Guided Percutaneous Native and Transplant Kidney Biopsies',
      'Dedicated Diabetic Kidney Disease (DKD) Reversal & Prevention Clinic',
    ],
    hindiKeyHighlights: [
      'डबल-पास आरओ शुद्ध पानी से संचालित 24-बेड हाई-फ्लक्स डायलिसिस यूनिट',
      'आईसीयू के गंभीर मरीजों हेतु सतत रीनल रिप्लेसमेंट थेरेपी (CRRT)',
      'रिश्तेदार डोनर एवं एबीओ-इनकम्पैटिबल किडनी प्रत्यारोपण सेवाएं',
      'अल्ट्रासाउंड गाइडेड किडनी बायोप्सी द्वारा रोग का सटीक परीक्षण',
      'डायबिटिक किडनी रोग रोकथाम एवं विशेष नेफ्रोलॉजी क्लिनिक',
    ],
    services: [
      {
        title: 'Maintenance High-Flux Hemodialysis',
        hindiTitle: 'मेंटेनेंस हाई-फ्लक्स हीमोडायलिसिस',
        description:
          'Single-use biocompatible dialyzers ensuring maximum clearance of middle-molecule uremic toxins with zero infection risk.',
        hindiDescription:
          'सिंगल-यूज डायलाइजर द्वारा रक्त की अशुद्धियों को पूरी तरह साफ करने वाली सुरक्षित डायलिसिस।',
      },
      {
        title: 'Kidney Transplantation Services',
        hindiTitle: 'किडनी प्रत्यारोपण (रीनल ट्रांसप्लांट)',
        description:
          'Comprehensive pre-transplant donor evaluation, surgical transplantation, and long-term immunosuppression monitoring.',
        hindiDescription:
          'ट्रांसप्लांट पूर्व डोनर की जांच, सफल ऑपरेशन और ऑपरेशन के बाद संक्रमण से बचाव की विशेष देखभाल।',
      },
      {
        title: 'Peritoneal Dialysis (CAPD / APD)',
        hindiTitle: 'पेरिटोनियल डायलिसिस (घर पर डायलिसिस)',
        description:
          'Catheter insertion and patient training for continuous ambulatory peritoneal dialysis at home.',
        hindiDescription:
          'मरीज को घर पर पेट के रास्ते डायलिसिस करने का प्रशिक्षण और निरंतर चिकित्सकीय मार्गदर्शन।',
      },
    ],
    conditionsTreated: [
      {
        name: 'Chronic Kidney Disease (CKD Stages 1-5)',
        hindiName: 'क्रॉनिक किडनी डिजीज (गुर्दे की खराबी)',
        description:
          'Progressive loss of glomerular filtration due to diabetes, hypertension, or glomerulonephritis.',
        hindiDescription:
          'डायबिटीज या बीपी के कारण धीरे-धीरे यूरिया-क्रिएटिनिन बढ़ना और गुर्दे कमजोर होना।',
      },
      {
        name: 'Nephrotic Syndrome & Glomerulonephritis',
        hindiName: 'नेफ्रोटिक सिंड्रोम एवं पेशाब में प्रोटीन रिसाव',
        description:
          'Immune-mediated kidney inflammation causing massive proteinuria, edema, and lipid abnormalities.',
        hindiDescription:
          'पेशाब में प्रोटीन आना, चेहरे व पैरों पर सूजन और किडनी में सूजन का इम्यूनोथेरेपी उपचार।',
      },
    ],
    procedures: [
      {
        name: 'High-Flux Hemodialysis Session',
        hindiName: 'हाई-फ्लक्स हीमोडायलिसिस सत्र',
        type: 'Outpatient Renal Replacement',
        hindiType: 'डे-केयर रीनल प्रक्रिया',
        description:
          '4-hour controlled extracorporeal blood filtering using high-permeability synthetic membranes.',
        hindiDescription:
          '4 घंटे में रक्त से हानिकारक टॉक्सिन्स और अतिरिक्त पानी को सुरक्षित रूप से निकालना।',
      },
    ],
    treatmentsOffered: [
      'High-Flux Maintenance Hemodialysis',
      'Kidney Transplantation & Post-Transplant Care',
      'Continuous Renal Replacement Therapy (CRRT)',
      'Ultrasound-Guided Renal Biopsy',
      'AV Fistula Evaluation & Care',
      'Peritoneal Dialysis (CAPD) Training',
    ],
    hindiTreatmentsOffered: [
      'हाई-फ्लक्स मेंटेनेंस हीमोडायलिसिस',
      'किडनी ट्रांसप्लांट एवं फॉलो-अप केयर',
      'क्रिटिकल केयर सीआरआरटी (CRRT)',
      'अल्ट्रासाउंड गाइडेड रीनल बायोप्सी',
      'एवी फिस्टुला जांच व देखभाल',
      'पेरिटोनियल डायलिसिस (CAPD) प्रशिक्षण',
    ],
    diagnosticFacilities: [
      '24-Bed RO-Water Ultra-Purified Dialysis Suite',
      'Fresenius 4008S & 5008S Hemodiafiltration Machines',
      'Prismaflex System for Continuous ICU Dialysis (CRRT)',
      'Ultrasound Machine with Color Doppler for Vascular Access',
      'Dedicated Automated Kidney Pathology & Immunofluorescence',
    ],
    hindiDiagnosticFacilities: [
      '24-बेड आरओ-प्यूरिफाइड डायलिसिस सुइट',
      'फ्रेसेनियस आधुनिक हेमोडियाफिल्ट्रेशन मशीनें',
      'प्रिज्माफ्लेक्स आईसीयू सीआरआरटी (CRRT) सिस्टम',
      'एवी फिस्टुला जांच हेतु कलर डॉप्लर अल्ट्रासाउंड',
      'रीनल पैथोलॉजी एवं इम्यूनोफ्लोरेसेंस लैब',
    ],
    doctorIds: ['dr-sanjay-gupta'],
    faqs: [
      {
        question: 'Can chronic kidney disease (CKD) be slowed down if detected early?',
        hindiQuestion: 'क्या समय पर पता चलने से किडनी की खराबी को रोका या धीमा किया जा सकता है?',
        answer:
          'Yes, when detected in early stages (Stages 1 to 3), guideline-directed medical therapy, strict blood pressure and glucose management, low-sodium dietary changes, and SGLT2 inhibitors can significantly slow down or halt kidney function decline.',
        hindiAnswer:
          'जी हाँ, शुरुआती अवस्था में पता चलने पर सही दवाओं, बीपी व शुगर के कड़े नियंत्रण और नमक कम करने से किडनी की बीमारी को आगे बढ़ने से कई वर्षों तक रोका जा सकता है।',
      },
      {
        question: 'Is kidney transplantation better than lifelong dialysis?',
        hindiQuestion: 'क्या आजीवन डायलिसिस की तुलना में किडनी ट्रांसप्लांट बेहतर विकल्प है?',
        answer:
          'For medically suitable candidates, kidney transplantation offers significantly improved long-term survival, superior quality of life, freedom from routine hospital dialysis sessions, and fewer dietary restrictions compared to maintenance dialysis.',
        hindiAnswer:
          'उचित मरीजों के लिए किडनी ट्रांसप्लांट डायलिसिस की तुलना में कहीं बेहतर जीवन गुणवत्ता, सामान्य दिनचर्या और लंबी उम्र प्रदान करता है, जिससे मरीज सामान्य जीवन जी सकता है।',
      },
    ],
  },
  {
    id: 'pulmonology',
    name: 'Pulmonology & Critical Care',
    hindiName: 'श्वसन एवं फेफड़ा रोग विभाग',
    tagline: 'Advanced Bronchoscopy, Severe Asthma, COPD & Sleep Apnea Centre',
    hindiTagline: 'उन्नत ब्रोंकोस्कोपी, गंभीर अस्थमा, सीओपीडी एवं स्लीप एपनिया क्लिनिक',
    icon: 'Activity',
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=1000&q=80',
    stats: 'Advanced PFT Lab | Level-1 Sleep Study',
    overview:
      'The Department of Pulmonology & Critical Care at Janhit Hospital is a specialized respiratory medicine centre equipped with a computerized pulmonary function laboratory, video bronchoscopy suites, and an accredited sleep disorders clinic. Our chest specialists excel in managing chronic obstructive pulmonary disease (COPD), severe asthma, interstitial lung disease (pulmonary fibrosis), and acute respiratory failure.',
    hindiOverview:
      'जनहित हॉस्पिटल का श्वसन एवं फेफड़ा रोग विभाग फेफड़ों की गंभीर बीमारियों, अस्थमा, ब्रोंकाइटिस और निमोनिया के इलाज हेतु समर्पित है। यहां डिजिटल पल्मोनरी फंक्शन टेस्ट (PFT), वीडियो ब्रोंकोस्कोपी और खर्राटों व स्लीप एपनिया की जांच हेतु स्लीप लैब उपलब्ध है। हमारे विशेषज्ञ गंभीर सांस के मरीजों को आईसीयू और वेंटिलेटर सपोर्ट प्रदान करते हैं।',
    keyHighlights: [
      'Computerized Body Plethysmography & Diffusion Capacity (DLCO) Lab',
      'Flexible Video Bronchoscopy with Bronchoalveolar Lavage (BAL) & Transbronchial Biopsy',
      'Level-1 In-Hospital Diagnostic Polysomnography (Sleep Study) for Sleep Apnea',
      'Negative Pressure Airborne Isolation Suites for Infectious Respiratory Pathogens',
      'Structured Pulmonary Rehabilitation Program for Post-Infectious & COPD Patients',
    ],
    hindiKeyHighlights: [
      'कंप्यूटराइज्ड फेफड़ा क्षमता जांच (PFT एवं DLCO लैब)',
      'फ्लेक्सिबल वीडियो ब्रोंकोस्कोपी द्वारा फेफड़ों की दूरबीन जांच एवं बायोप्सी',
      'स्लीप एपनिया एवं खर्राटों के इलाज हेतु लेवल-1 स्लीप स्टडी लैब',
      'संक्रमण-रोधी नेगेटिव प्रेशर आइसोलेशन वार्ड',
      'सीओपीडी एवं पोस्ट-कोविड मरीजों हेतु फेफड़ा पुनर्वास (Pulmonary Rehab)',
    ],
    services: [
      {
        title: 'Diagnostic Video Bronchoscopy',
        hindiTitle: 'वीडियो ब्रोंकोस्कोपी एवं बायोप्सी',
        description:
          'Endoscopic visualization of the tracheobronchial tree, foreign body removal, and endobronchial biopsies.',
        hindiDescription:
          'सांस की नली में दूरबीन डालकर बलगम का नमूना लेना, रुकावट हटाना और बायोप्सी करना।',
      },
      {
        title: 'Comprehensive Asthma & COPD Clinic',
        hindiTitle: 'गंभीर अस्थमा एवं सीओपीडी क्लिनिक',
        description:
          'Individualized inhalation therapy, biological injection therapy for severe eosinophilic asthma, and spirometric monitoring.',
        hindiDescription:
          'आधुनिक इनहेलर तकनीक, बायोलॉजिकल इंजेक्शन और फेफड़ों की कार्यक्षमता की नियमित निगरानी।',
      },
      {
        title: 'Sleep Disorders & CPAP Titration',
        hindiTitle: 'स्लीप डिसऑर्डर एवं खर्राटा क्लिनिक',
        description:
          'Overnight polysomnography assessing obstructive sleep apnea (OSA), nocturnal desaturations, and CPAP calibration.',
        hindiDescription:
          'रात में नींद के दौरान ऑक्सीजन की कमी और खर्राटों की जांच एवं सीपैप (CPAP) मशीन परामर्श।',
      },
    ],
    conditionsTreated: [
      {
        name: 'Chronic Obstructive Pulmonary Disease (COPD)',
        hindiName: 'सीओपीडी (क्रॉनिक ब्रोंकाइटिस व एम्फाइमा)',
        description:
          'Progressive airflow limitation from smoking or environmental biomass smoke leading to breathlessness.',
        hindiDescription:
          'धूम्रपान या प्रदूषण से फेफड़ों की नलियों का सिकुड़ना, जिससे लगातार खांसी और सांस फूलती है।',
      },
      {
        name: 'Interstitial Lung Disease (ILD / Pulmonary Fibrosis)',
        hindiName: 'आईएलडी (फेफड़ों में सिकुड़न व फाइब्रोसिस)',
        description:
          'Scarring and stiffening of lung tissue causing persistent dry cough and low blood oxygen levels.',
        hindiDescription:
          'फेफड़ों के स्पंज जैसे ऊतकों का सख्त होना, जिससे सूखी खांसी और ऑक्सीजन कम होती है।',
      },
    ],
    procedures: [
      {
        name: 'Diagnostic Flexible Bronchoscopy',
        hindiName: 'फ्लेक्सिबल ब्रोंकोस्कोपी',
        type: 'Endoscopic Respiratory Procedure',
        hindiType: 'श्वसन दूरबीन जांच',
        description:
          'Direct camera visualization through the nose or mouth under topical anaesthesia for airway mapping and lavage.',
        hindiDescription:
          'स्थानीय सुन्न करने वाली दवा द्वारा सांस की नलियों की सीधी वीडियो जांच।',
      },
    ],
    treatmentsOffered: [
      'Diagnostic Flexible Bronchoscopy',
      'Complete Pulmonary Function Testing (PFT)',
      'Overnight Sleep Study (Polysomnography)',
      'Severe Asthma Biologic Therapy',
      'Allergy Testing & Immunotherapy',
      'Pulmonary Rehabilitation Program',
    ],
    hindiTreatmentsOffered: [
      'डायग्नोस्टिक फ्लेक्सिबल ब्रोंकोस्कोपी',
      'सम्पूर्ण फेफड़ा कार्यक्षमता परीक्षण (PFT)',
      'स्लीप स्टडी (पॉलीसम्नोग्राफी)',
      'गंभीर अस्थमा हेतु बायोलॉजिकल थेरेपी',
      'एलर्जी परीक्षण एवं इम्यूनोथेरेपी',
      'फेफड़ा पुनर्वास एवं श्वसन व्यायाम',
    ],
    diagnosticFacilities: [
      'Ganshorn Computerized Body Plethysmography & DLCO',
      'Olympus Video Bronchoscope System with HD Monitor',
      'Philips Alice 6 Diagnostic Polysomnography Sleep Lab',
      '128-Slice High-Resolution Computed Tomography (HRCT Chest)',
      'Fractional Exhaled Nitric Oxide (FeNO) Airway Inflammation Analyzer',
    ],
    hindiDiagnosticFacilities: [
      'कंप्यूटराइज्ड बॉडी प्लेथिस्मोग्राफी एवं डीएलसीओ (DLCO)',
      'ओलंपस वीडियो ब्रोंकोस्कोप सिस्टम',
      'फिलिप्स एलिस-6 आधुनिक स्लीप स्टडी लैब',
      '128-स्लाइस हाई-रेजोल्यूशन एचआरसीटी (HRCT) चेस्ट',
      'एफईएनओ (FeNO) सांस नली सूजन जांच उपकरण',
    ],
    doctorIds: ['dr-neha-choudhary'],
    faqs: [
      {
        question: 'Are inhalers habit-forming for asthma patients?',
        hindiQuestion: 'क्या अस्थमा इनहेलर की आदत लग जाती है?',
        answer:
          'No, this is a common myth. Inhalers deliver microscopic doses directly to the lungs where they are needed, with minimal absorption into the rest of the body. They are the safest and most effective way to treat asthma without systemic side effects.',
        hindiAnswer:
          'नहीं, यह एक गलत धारणा है। इनहेलर दवा की बहुत कम मात्रा सीधे फेफड़ों तक पहुंचाते हैं, जिससे शरीर पर कोई दुष्प्रभाव नहीं पड़ता और यह गोलियों या सीरप की तुलना में कहीं अधिक सुरक्षित होते हैं।',
      },
      {
        question: 'When should someone undergo a Sleep Study?',
        hindiQuestion: 'स्लीप स्टडी (Sleep Study) कब करानी चाहिए?',
        answer:
          'A sleep study is recommended if you suffer from chronic loud snoring, wake up gasping for air, experience morning headaches, daytime fatigue, or have uncontrolled high blood pressure despite multiple medications.',
        hindiAnswer:
          'यदि आपको बहुत तेज खर्राटे आते हैं, रात में अचानक सांस रुकती है, सुबह सिर में भारीपन रहता है, दिन में बहुत नींद आती है या बीपी की दवाएं काम नहीं कर रही हैं, तो स्लीप स्टडी आवश्यक है।',
      },
    ],
  },
];

