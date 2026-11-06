export interface TreatmentDiagnosisTest {
  test: string;
  hindiTest: string;
  purpose: string;
  hindiPurpose: string;
}

export interface TreatmentStep {
  step: string;
  hindiStep: string;
  details: string;
  hindiDetails: string;
}

export interface TreatmentFAQ {
  question: string;
  hindiQuestion: string;
  answer: string;
  hindiAnswer: string;
}

export interface TreatmentFastFacts {
  duration: string;
  hindiDuration: string;
  anesthesia: string;
  hindiAnesthesia: string;
  hospitalStay: string;
  hindiHospitalStay: string;
  recoveryTime: string;
  hindiRecoveryTime: string;
}

export interface Treatment {
  id: string;
  name: string;
  hindiName: string;
  departmentId: string;
  departmentName: string;
  hindiDepartmentName: string;
  badge: string;
  hindiBadge: string;
  shortDesc: string;
  hindiShortDesc: string;
  image: string;
  overview: string;
  hindiOverview: string;
  symptomsAndIndications: string[];
  hindiSymptomsAndIndications: string[];
  diagnosticTests: TreatmentDiagnosisTest[];
  treatmentOptions: { option: string; hindiOption: string; details: string; hindiDetails: string }[];
  procedureSteps: TreatmentStep[];
  fastFacts: TreatmentFastFacts;
  recoveryGuidelines: string[];
  hindiRecoveryGuidelines: string[];
  specialistDoctorIds: string[];
  faqs: TreatmentFAQ[];
}

export const TREATMENTS_DATA: Treatment[] = [
  {
    id: 'robotic-surgery',
    name: 'Robotic-Assisted Joint Replacement',
    hindiName: 'माको (Mako) रोबोटिक जॉइंट रिप्लेसमेंट',
    departmentId: 'orthopaedics',
    departmentName: 'Orthopaedics & Joint Care',
    hindiDepartmentName: 'हड्डी एवं जोड़ रोग (ऑर्थोपेडिक्स)',
    badge: 'Robotic Precision',
    hindiBadge: 'रोबोटिक तकनीक',
    shortDesc:
      'CT-guided sub-millimeter robotic precision for total knee and hip replacement with minimal muscle dissection, less pain and rapid walking within hours.',
    hindiShortDesc:
      'सीटी गाइडेड रोबोटिक सटीकता द्वारा घुटने और कूल्हे का सफल प्रत्यारोपण, जिससे मरीज ऑपरेशन के कुछ ही घंटों बाद चलने में समर्थ होते हैं।',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80',
    overview:
      'Mako Robotic-Assisted Surgery represents the pinnacle of modern joint arthroplasty. Before surgery, a 3D CT scan maps the patient’s exact bone morphology and joint alignment. During the procedure, the orthopedic surgeon uses the robotic arm to execute bone cuts strictly within the pre-planned spatial boundaries with 0.5 mm accuracy, sparing healthy bone, ligaments, and nerves.',
    hindiOverview:
      'माको (Mako) रोबोटिक सर्जरी आधुनिक ऑर्थोपेडिक्स की सबसे उन्नत तकनीक है। सर्जरी से पहले मरीज के जोड़ का 3D सीटी स्कैन करके कंप्यूटर द्वारा सटीक योजना बनाई जाती है। ऑपरेशन के दौरान रोबोटिक आर्म 0.5 मिलीमीटर की सूक्ष्म सटीकता से केवल खराब हिस्से को हटाती है, जिससे स्वस्थ नसें व मांसपेशियां पूरी तरह सुरक्षित रहती हैं।',
    symptomsAndIndications: [
      'Severe, chronic knee or hip pain that limits walking, climbing stairs, or standing',
      'Advanced Stage-4 Osteoarthritis with complete loss of joint cartilage (bone-on-bone friction)',
      'Avascular Necrosis (AVN) of the femoral head with bone collapse',
      'Persistent joint stiffness and pain unrelieved by medications, injections, or physiotherapy',
      'Visible bowing or knock-knee deformities impacting balance and mobility',
    ],
    hindiSymptomsAndIndications: [
      'घुटने या कूल्हे में असहनीय पुराना दर्द, जिससे चलने, सीढ़ी चढ़ने या खड़े होने में भारी परेशानी हो',
      'एडवांस्ड स्टेज-4 ऑस्टियोआर्थराइटिस (कार्टिलेज पूरी तरह घिस जाना और हड्डियों का आपस में टकराना)',
      'कूल्हे की हड्डी का गलना (एवस्कुलर नेक्रोसिस / AVN)',
      'दवाओं, इंजेक्शन और फिजियोथेरेपी के बाद भी जोड़ों की जकड़न और दर्द कम न होना',
      'पैरों का टेढ़ा होना जिससे संतुलन और चाल में बदलाव आ गया हो',
    ],
    diagnosticTests: [
      {
        test: 'High-Resolution 3D Knee/Hip CT Protocol',
        hindiTest: '3D ऑर्थोपेडिक सीटी स्कैन प्रोटोकॉल',
        purpose: 'Provides volumetric data used by the robotic software to model bone geometry and align implants.',
        hindiPurpose: 'रोबोटिक सॉफ्टवेयर में मरीज के जोड़ की बनावट का 3D कंप्यूटर मॉडल तैयार करना।',
      },
      {
        test: 'Digital Weight-Bearing Full-Leg Alignment Radiograph',
        hindiTest: 'वेट-बेयरिंग फुल-लेंथ एक्स-रे',
        purpose: 'Assesses mechanical axis deviation from the hip to the ankle joint.',
        hindiPurpose: 'कूल्हे से टखने तक पैर के वजन संतुलन और टेढ़ेपन की सटीक गणना।',
      },
    ],
    treatmentOptions: [
      {
        option: 'Mako Robotic Total Knee Arthroplasty',
        hindiOption: 'रोबोटिक टोटल नी रिप्लेसमेंट',
        details: 'Complete resurfacing of both femoral and tibial compartments with balanced soft-tissue tension.',
        hindiDetails: 'घुटने के दोनों हिस्सों का रोबोटिक आर्म द्वारा संतुलित और प्राकृतिक प्रत्यारोपण।',
      },
      {
        option: 'Mako Robotic Partial (Unicondylar) Knee Arthroplasty',
        hindiOption: 'रोबोटिक पार्शियल (हाफ) नी रिप्लेसमेंट',
        details: 'Preserves healthy compartments and cruciate ligaments when arthritis is confined to one side.',
        hindiDetails: 'यदि केवल आधा घुटना खराब है, तो स्वस्थ हिस्से और लिगामेंट्स को बचाते हुए केवल प्रभावित भाग बदलना।',
      },
    ],
    procedureSteps: [
      {
        step: '1. Virtual 3D Planning',
        hindiStep: '1. वर्चुअल 3D प्लानिंग',
        details: 'Patient CT scan is loaded into the Mako system to customize implant size and angle before making any cuts.',
        hindiDetails: 'ऑपरेशन से पहले सीटी स्कैन द्वारा कंप्यूटर स्क्रीन पर इम्प्लांट के सटीक साइज और कोण का निर्धारण।',
      },
      {
        step: '2. Real-Time Dynamic Balancing',
        hindiStep: '2. लिगामेंट बैलेंसिंग',
        details: 'Sensors attached to the patient provide live feedback on ligament tension across 0 to 120 degrees of flexion.',
        hindiDetails: 'सेंसर्स द्वारा घुटने को मोड़कर लिगामेंट्स के तनाव की लाइव डिजिटल जांच।',
      },
      {
        step: '3. Robotic Bone Resection',
        hindiStep: '3. रोबोटिक बोन रिसेक्शन',
        details: 'The robotic arm haptic boundary prevents the saw blade from moving beyond the programmed bone cut zone.',
        hindiDetails: 'रोबोटिक आर्म केवल तय सीमा के भीतर ही कट लगाती है, जिससे आसपास की नसों को कोई नुकसान नहीं होता।',
      },
      {
        step: '4. Implant Positioning & Rapid Mobilization',
        hindiStep: '4. इम्प्लांट फिक्सेशन व त्वरित चालन',
        details: 'Medical-grade titanium and polyethylene components are secured with bone cement, enabling walking in 4-6 hours.',
        hindiDetails: 'टाइटेनियम इम्प्लांट्स को सुरक्षित रूप से लगाना, जिससे मरीज कुछ ही घंटों में चलने लगता है।',
      },
    ],
    fastFacts: {
      duration: '60 - 75 Minutes',
      hindiDuration: '60 - 75 मिनट',
      anesthesia: 'Combined Spinal & Epidural Anaesthesia',
      hindiAnesthesia: 'स्पाइनल / एपिड्यूरल एनेस्थीसिया (दर्द-रहित)',
      hospitalStay: '2 - 3 Days',
      hindiHospitalStay: '2 से 3 दिन',
      recoveryTime: '2 - 4 Weeks for routine independent activities',
      hindiRecoveryTime: '2 से 4 सप्ताह में सामान्य दिनचर्या',
    },
    recoveryGuidelines: [
      'Begin assisted walking with a walker within 4 to 6 hours after surgery under physiotherapist guidance',
      'Perform prescribed quadriceps strengthening and ankle pump exercises daily to prevent blood clots',
      'Keep the waterproof surgical dressing clean and dry until suture removal at day 12-14',
      'Avoid high-impact jumping or contact sports; swimming and cycling are encouraged after 6 weeks',
      'Attend mandatory clinical follow-up at 2 weeks, 6 weeks, and 6 months with alignment X-rays',
    ],
    hindiRecoveryGuidelines: [
      'ऑपरेशन के 4 से 6 घंटे बाद फिजियोथेरेपिस्ट की देखरेख में वॉकर के सहारे चलना शुरू करें',
      'खून के थक्के जमने से रोकने हेतु रोजाना सुझाई गई क्वाड्रीसेप्स और एंकल पंप एक्सरसाइज करें',
      'टांके कटने (12-14 दिन) तक वाटरप्रूफ ड्रेसिंग को साफ व सूखा रखें',
      'कूदने या भारी वजन उठाने से बचें; 6 सप्ताह बाद तैराकी और साइकलिंग की जा सकती है',
      '2 सप्ताह, 6 सप्ताह और 6 महीने पर एक्स-रे व डॉक्टर फॉलो-अप जांच अवश्य कराएं',
    ],
    specialistDoctorIds: ['dr-rajesh-singh'],
    faqs: [
      {
        question: 'Does the robot perform the surgery automatically?',
        hindiQuestion: 'क्या रोबोट ऑपरेशन अपने आप (ऑटोमैटिक) करता है?',
        answer:
          'No. The robotic arm is entirely guided and controlled by the senior orthopedic surgeon at every second. The robot provides stereotactic guidance, visual feedback, and physical haptic resistance to ensure the surgeon cannot deviate from the safe pre-planned cut boundaries.',
        hindiAnswer:
          'नहीं, रोबोट खुद ऑपरेशन नहीं करता। सर्जरी पूरी तरह अनुभवी सर्जन के हाथों द्वारा की जाती है। रोबोटिक आर्म केवल एक स्मार्ट सहायक उपकरण है जो सर्जन को 0.5 मिमी की सूक्ष्म सटीकता बनाए रखने में मदद करता है।',
      },
      {
        question: 'When can I drive a car after robotic knee replacement?',
        hindiQuestion: 'रोबोटिक नी रिप्लेसमेंट के कितने दिनों बाद कार चला सकते हैं?',
        answer:
          'Most patients with left-knee surgery (in automatic vehicles) can resume driving at 2 to 3 weeks. For right-knee surgery, driving is typically cleared around 4 to 6 weeks once emergency braking reflexes and muscle strength are completely restored.',
        hindiAnswer:
          'बाएं घुटने के ऑपरेशन वाले मरीज (ऑटोमैटिक कार में) 2-3 हफ्ते बाद ड्राइव कर सकते हैं। दाएं घुटने के मरीज ब्रेक लगाने की पूरी ताकत आने पर आमतौर पर 4 से 6 हफ्ते बाद गाड़ी चला सकते हैं।',
      },
    ],
  },
  {
    id: 'coronary-angioplasty',
    name: 'Coronary Angioplasty & Stenting (PCI)',
    hindiName: 'कोरोनरी एंजियोप्लास्टी एवं स्टेंटिंग (PCI)',
    departmentId: 'cardiology',
    departmentName: 'Cardiology & Heart Care',
    hindiDepartmentName: 'कार्डियोलॉजी एवं हृदय रोग',
    badge: '24/7 Primary PCI',
    hindiBadge: '24/7 इमरजेंसी एंजियोप्लास्टी',
    shortDesc:
      'Emergency and elective catheter-based intervention using drug-eluting stents to reopen clogged heart arteries via wrist (radial) access with rapid discharge.',
    hindiShortDesc:
      'कलाई (रेडियल आर्टरी) के रास्ते दवायुक्त आधुनिक स्टेंट डालकर हृदय की बंद नसों को बिना चीर-फाड़ खोलने की आधुनिक जीवनरक्षक प्रक्रिया।',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
    overview:
      'Percutaneous Coronary Intervention (PCI), commonly known as coronary angioplasty, is a minimally invasive technique that restores blood flow to the heart muscle when coronary arteries become severely narrowed or occluded by atherosclerotic plaque. At Janhit Hospital, our interventional cardiology team performs over 95% of procedures transradially through the wrist, backed by IVUS and OCT imaging.',
    hindiOverview:
      'कोरोनरी एंजियोप्लास्टी (PCI) हृदय की बंद या सिकुड़ी हुई धमनियों को बिना ओपन-हार्ट सर्जरी के खोलने की न्यूनतम इनवेसिव प्रक्रिया है। जनहित हॉस्पिटल में 95% से अधिक प्रक्रियाएं कलाई की नस (रेडियल आर्टरी) द्वारा की जाती हैं, जिससे रक्तस्राव का जोखिम नगण्य होता है और मरीज कुछ ही घंटों बाद बैठने-चलने में सक्षम होता है।',
    symptomsAndIndications: [
      'Acute Heart Attack (ST-Elevation Myocardial Infarction / STEMI) requiring emergency Primary PCI',
      'Unstable Angina or worsening chest pain with minimal exertion',
      'Significant coronary blockages (> 70%) documented on diagnostic angiography',
      'Post-infarction persistent ischemia unresponsive to medication therapy',
    ],
    hindiSymptomsAndIndications: [
      'तीव्र दिल का दौरा (हार्ट अटैक), जिसमें आपातकालीन प्राइमरी एंजियोप्लास्टी द्वारा जीवनरक्षा आवश्यक हो',
      'सीने में भारीपन, खिंचाव या दबाव जो आराम करने पर भी ठीक न हो',
      'एंजियोग्राफी में हृदय की मुख्य नसों में 70% से अधिक गंभीर ब्लॉकेज पाया जाना',
      'चलने पर सांस फूलना और अत्यधिक पसीना आना',
    ],
    diagnosticTests: [
      {
        test: 'High-Definition Digital Coronary Angiogram',
        hindiTest: 'डिजिटल कोरोनरी एंजियोग्राफी',
        purpose: 'Direct fluoroscopic mapping of vessel stenosis location and severity.',
        hindiPurpose: 'नसों में ब्लॉकेज के सटीक स्थान, लंबाई और प्रतिशत का डिजिटल परीक्षण।',
      },
      {
        test: 'Intravascular Ultrasound (IVUS) / OCT',
        hindiTest: 'इंट्रावैस्कुलर अल्ट्रासाउंड (IVUS)',
        purpose: 'Cross-sectional luminal scan inside the artery to ensure optimal stent expansion.',
        hindiPurpose: 'नस के अंदर से अल्ट्रासाउंड जांच ताकि स्टेंट पूरी तरह चिपक जाए और भविष्य में ब्लॉकेज न हो।',
      },
    ],
    treatmentOptions: [
      {
        option: 'Drug-Eluting Stent (DES) Implantation',
        hindiOption: 'दवायुक्त स्टेंट (DES) प्रत्यारोपण',
        details: 'Cobalt-chromium or platinum stents coated with antiproliferative drugs to prevent re-narrowing.',
        hindiDetails: 'आधुनिक दवायुक्त स्टेंट जो नस को दोबारा बंद होने से बचाते हैं।',
      },
      {
        option: 'Coronary Rotablation for Calcified Arteries',
        hindiOption: 'रोटाब्लेशन तकनीक (कठोर कैल्शियम हटाना)',
        details: 'Diamond-tipped rotational burr rotating at 160,000 RPM to pulverize rock-hard calcium deposits.',
        hindiDetails: 'हीरे की नोक वाले माइक्रो-कटर द्वारा नस में जमे कठोर कैल्शियम को बारीक पीसना।',
      },
    ],
    procedureSteps: [
      {
        step: '1. Radial Artery Access',
        hindiStep: '1. कलाई की नस से प्रवेश',
        details: 'Local anaesthesia is injected into the wrist, and a tiny 2 mm sheath is introduced into the radial artery.',
        hindiDetails: 'कलाई को सुन्न करके 2 मिलीमीटर की पतली ट्यूब नस में डाली जाती है।',
      },
      {
        step: '2. Catheter Navigation & Balloon Dilatation',
        hindiStep: '2. बलून डायलेटेशन',
        details: 'A micro-guidewire and balloon catheter cross the blockage and gently compress the plaque against the wall.',
        hindiDetails: 'गाइडवायर के सहारे छोटा बलून ब्लॉकेज तक पहुंचाकर नस को खोला जाता है।',
      },
      {
        step: '3. Stent Deployment & Post-Dilatation',
        hindiStep: '3. स्टेंट लगाना',
        details: 'The drug-eluting stent is expanded at precise atmospheric pressure, creating a permanent metallic scaffold.',
        hindiDetails: 'दवायुक्त स्टेंट को उच्च दबाव पर खोलकर नस की दीवार पर स्थायी रूप से सेट किया जाता है।',
      },
    ],
    fastFacts: {
      duration: '45 - 60 Minutes',
      hindiDuration: '45 - 60 मिनट',
      anesthesia: 'Local Anaesthesia with mild conscious sedation',
      hindiAnesthesia: 'स्थानीय सुन्न करना (लोकल एनेस्थीसिया)',
      hospitalStay: '1 - 2 Days',
      hindiHospitalStay: '1 से 2 दिन',
      recoveryTime: '3 - 7 Days for light daily activities',
      hindiRecoveryTime: '3 से 7 दिन में सामान्य दिनचर्या',
    },
    recoveryGuidelines: [
      'Keep the wrist access site clean and avoid lifting heavy weights (> 5 kg) with that arm for 48 hours',
      'Take prescribed dual antiplatelet medications (Aspirin + Ticagrelor/Clopidogrel) strictly without missing a dose',
      'Adopt a heart-healthy Mediterranean or low-salt, low-saturated-fat diet',
      'Participate in our structured Phase-II Cardiac Rehabilitation exercise program after 2 weeks',
      'Report immediately to the emergency room if severe chest pain, shortness of breath, or bleeding occurs',
    ],
    hindiRecoveryGuidelines: [
      'कलाई के पंक्चर वाले हाथ से 48 घंटे तक कोई भारी वजन न उठाएं और पट्टी को सूखा रखें',
      'खून पतला करने वाली दवाएं (एस्पिरिन आदि) डॉक्टर की सलाह के बिना एक दिन भी बंद न करें',
      'नमक, तेल और घी की मात्रा सीमित करके दिल के लिए स्वस्थ खानपान अपनाएं',
      '2 सप्ताह बाद डॉक्टर की अनुमति से हल्की सैर और कार्डियक रिहैब व्यायाम शुरू करें',
      'सीने में भारीपन, सांस फूलने या चक्कर आने पर तुरंत अस्पताल की इमरजेंसी में संपर्क करें',
    ],
    specialistDoctorIds: ['dr-ashok-sharma'],
    faqs: [
      {
        question: 'Can a coronary stent move inside the body after placement?',
        hindiQuestion: 'क्या स्टेंट लगने के बाद शरीर में अपनी जगह से हिल या खिसक सकता है?',
        answer:
          'No. Coronary stents are expanded at high pressures (12 to 18 atmospheres) and become embedded securely into the inner lining of the arterial wall. Within a few weeks, natural endothelial tissue covers the stent, making it a permanent, non-movable structural part of the vessel.',
        hindiAnswer:
          'बिल्कुल नहीं। स्टेंट को बहुत तेज दबाव पर नस की दीवार में फिक्स किया जाता है। कुछ ही हफ्तों में नस की प्राकृतिक कोशिकाएं स्टेंट के ऊपर आ जाती हैं और यह नस का स्थायी हिस्सा बन जाता है; यह कभी खिसक नहीं सकता।',
      },
      {
        question: 'Why is it critical not to discontinue blood thinners after stenting?',
        hindiQuestion: 'स्टेंटिंग के बाद खून पतला करने वाली दवा बंद करना खतरनाक क्यों है?',
        answer:
          'Dual antiplatelet therapy prevents blood platelets from sticking to the newly placed metallic stent before your body heals over it. Abruptly stopping these medications causes an acute stent thrombosis (sudden blood clot in the stent), which can trigger a severe heart attack.',
        hindiAnswer:
          'दवाएं स्टेंट के ऊपर खून का थक्का जमने से रोकती हैं। यदि दवा अचानक बंद कर दी जाए तो स्टेंट में तुरंत थक्का जम सकता है, जिससे जानलेवा हार्ट अटैक का खतरा पैदा हो जाता है।',
      },
    ],
  },
  {
    id: 'brain-spine-surgery',
    name: 'Minimally Invasive Brain & Spine Microsurgery',
    hindiName: 'मिनिमली इनवेसिव ब्रेन एवं स्पाइन माइक्रो-सर्जरी',
    departmentId: 'neurology',
    departmentName: 'Neurology & Neuro Surgery',
    hindiDepartmentName: 'न्यूरोलॉजी एवं मस्तिष्क रोग',
    badge: 'Neuro-Navigation',
    hindiBadge: 'न्यूरो-नेविगेशन तकनीक',
    shortDesc:
      'Optical microscope and 3D computer-guided microsurgical interventions for brain tumors, aneurysm clipping, and endoscopic spinal decompression.',
    hindiShortDesc:
      'कार्ल ज़ीस माइक्रोस्कोप और 3D कंप्यूटर नेविगेशन द्वारा ब्रेन ट्यूमर, एन्यूरिज्म और स्लिप डिस्क की सूक्ष्म, सुरक्षित सर्जरी।',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1000&q=80',
    overview:
      'Neurosurgical procedures at Janhit Hospital merge surgical microscopy, high-precision stereotactic navigation, and continuous intraoperative neurophysiological monitoring (IONM). This multi-technology approach allows neurosurgeons to resect cranial lesions and decompress spinal nerves with millimeter fidelity while preserving speech, motor, and sensory functions.',
    hindiOverview:
      'जनहित हॉस्पिटल में न्यूरोसर्जरी आधुनिक सर्जिकल माइक्रोस्कोप, स्टीरियोटैक्टिक नेविगेशन और न्यूरो-मॉनिटरिंग की सहायता से की जाती है। यह तकनीक न्यूरोसर्जन को मस्तिष्क और रीढ़ की हड्डी के संवेदनशील हिस्सों को सुरक्षित रखते हुए ट्यूमर निकालने और दबी हुई नसों को पूरी तरह खोलने में सक्षम बनाती है।',
    symptomsAndIndications: [
      'Intracranial space-occupying lesions (Gliomas, Meningiomas, Pituitary adenomas, Acoustic neuromas)',
      'Severe, intractable sciatic nerve pain radiating down the leg unresponsive to conservative therapy',
      'Progressive muscle weakness, numbness, or loss of bowel/bladder sphincter control',
      'Cerebral vascular malformations and intracranial aneurysms with rupture risk',
    ],
    hindiSymptomsAndIndications: [
      'मस्तिष्क में गांठ या ट्यूमर (ग्लिओमा, मेनिंजिओमा, पिट्यूटरी ट्यूमर आदि)',
      'सायटिका का असहनीय दर्द जो पीठ से पैरों की उंगलियों तक जाता हो',
      'हाथों या पैरों में लगातार कमजोरी, सुन्नपन या चलने में लड़खड़ाहट',
      'दिमाग की नसों में सूजन या खून का रिसाव (एन्यूरिज्म)',
    ],
    diagnosticTests: [
      {
        test: '3T Contrast Neuro-MRI with Functional Tractography',
        hindiTest: '3T फंक्शनल न्यूरो एमआरआई एवं ट्रैक्टोग्राफी',
        purpose: 'Maps white matter motor and speech tracts adjacent to the tumor.',
        hindiPurpose: 'ट्यूमर के पास स्थित बोलने और चलने-फिरने वाली नसों के रास्तों का 3D नक्शा तैयार करना।',
      },
      {
        test: '128-Slice CT Angiography of Brain & Neck',
        hindiTest: '128-स्लाइस ब्रेन सीटी एंजियोग्राफी',
        purpose: 'Evaluates cerebral vessel patency and vascular supply to the cranial pathology.',
        hindiPurpose: 'मस्तिष्क की रक्त वाहिकाओं और ट्यूमर में खून के प्रवाह की विस्तृत जांच।',
      },
    ],
    treatmentOptions: [
      {
        option: 'Neuronavigation-Guided Tumor Microsurgery',
        hindiOption: 'नेविगेशन-गाइडेड ट्यूमर माइक्रो-सर्जरी',
        details: 'High-power Zeiss microscope integration providing sub-millimeter surgical field visibility.',
        hindiDetails: 'कार्ल ज़ीस माइक्रोस्कोप और जीपीएस जैसी नेविगेशन तकनीक से ट्यूमर को निकालना।',
      },
      {
        option: 'Endoscopic Micro-Discectomy for Slip Disc',
        hindiOption: 'दूरबीन द्वारा स्लिप डिस्क ऑपरेशन',
        details: 'Keyhole skin portal avoiding bone cutting and extensive muscle stripping.',
        hindiDetails: 'बिना हड्डी काटे छोटे छिद्र द्वारा दबी हुई नस को दूरबीन से मुक्त करना।',
      },
    ],
    procedureSteps: [
      {
        step: '1. Stereotactic Pre-Op Registration',
        hindiStep: '1. स्टीरियोटैक्टिक मैपिंग',
        details: 'Patient facial anatomy is registered to preoperative MRI scans with sub-millimeter accuracy.',
        hindiDetails: 'ऑपरेशन से पहले चेहरे और सिर की बनावट को एमआरआई से कंप्यूटर द्वारा मैप करना।',
      },
      {
        step: '2. Microscopic Resection under IONM',
        hindiStep: '2. माइक्रोस्कोपिक ट्यूमर रिसेक्शन',
        details: 'Continuous real-time nerve stimulation confirms integrity of motor pathways during resection.',
        hindiDetails: 'ट्यूमर निकालते समय लगातार नसों की जांच करना ताकि कोई कमजोरी न आए।',
      },
    ],
    fastFacts: {
      duration: '2 - 4 Hours',
      hindiDuration: '2 - 4 घंटे',
      anesthesia: 'General Anaesthesia with neuro-monitoring protocols',
      hindiAnesthesia: 'जनरल एनेस्थीसिया (पूर्ण बेहोशी)',
      hospitalStay: '3 - 5 Days',
      hindiHospitalStay: '3 से 5 दिन',
      recoveryTime: '3 - 6 Weeks for full neurological recovery',
      hindiRecoveryTime: '3 से 6 सप्ताह में संपूर्ण स्वस्थ लाभ',
    },
    recoveryGuidelines: [
      'Gradual mobilization starting on Day 1 or 2 post-surgery with physical therapy assistance',
      'Strict adherence to antiepileptic and anti-edema medications as instructed by the neurosurgical team',
      'Avoid heavy bending, twisting, or lifting weights over 3 kg for the first 4 weeks post-spine surgery',
      'Keep head/spine incisions clean and observe for fever, fluid discharge, or sudden headache changes',
      'Follow-up visit with clinical evaluation at 2 weeks and post-operative MRI surveillance at 3 months',
    ],
    hindiRecoveryGuidelines: [
      'ऑपरेशन के अगले दिन फिजियोथेरेपिस्ट की मदद से धीरे-धीरे बैठना और चलना शुरू करें',
      'डॉक्टर द्वारा दी गई सूजन कम करने और दौरे रोकने वाली दवाएं समय पर लें',
      'स्पाइन सर्जरी के बाद 4 सप्ताह तक आगे झुकने, वजन उठाने या झटके से मुड़ने से बचें',
      'ऑपरेशन के घाव को सूखा रखें; बुखार या सिरदर्द बढ़ने पर तुरंत संपर्क करें',
      '2 सप्ताह पर टांके की जांच और 3 महीने पर फॉलो-अप एमआरआई कराएं',
    ],
    specialistDoctorIds: ['dr-meenakshi-verma'],
    faqs: [
      {
        question: 'What is an awake craniotomy and when is it performed?',
        hindiQuestion: 'अवेक क्रेनियोटॉमी (जागते हुए ब्रेन सर्जरी) क्या है?',
        answer:
          'An awake craniotomy is performed when brain tumors lie near critical areas controlling language or movement. The patient is painlessly awakened in the operating room to speak, read, or move fingers during tumor resection, ensuring vital brain functions remain completely intact.',
        hindiAnswer:
          'जब ट्यूमर मस्तिष्क के बोलने या हाथ-पैर हिलाने वाले केंद्र के पास होता है, तो मरीज को बिना किसी दर्द के जगाकर उससे बात करते हुए सर्जरी की जाती है, जिससे आवाज या अंगों पर कोई असर नहीं पड़ता।',
      },
    ],
  },
  {
    id: 'cancer-therapy',
    name: 'Targeted Oncology, Chemotherapy & Immunotherapy',
    hindiName: 'टारगेटेड कीमोथेरेपी एवं आधुनिक इम्यूनोथेरेपी',
    departmentId: 'oncology',
    departmentName: 'Comprehensive Cancer Centre',
    hindiDepartmentName: 'कैंसर रोग एवं ऑन्कोलॉजी',
    badge: 'Precision Oncology',
    hindiBadge: 'टारगेटेड थेरेपी',
    shortDesc:
      'Day care cancer care combining next-generation targeted small molecules, monoclonal antibodies, and checkpoint inhibitors with minimal side effects.',
    hindiShortDesc:
      'आधुनिक डे-केयर में बिना अस्पताल में भर्ती हुए कुछ ही घंटों में दी जाने वाली टारगेटेड दवाएं एवं इम्यूनोथेरेपी।',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1000&q=80',
    overview:
      'Medical oncology at Janhit Hospital focuses on personalized precision therapies guided by molecular tumor profiling and genomic sequencing. Rather than relying solely on non-specific cytotoxic drugs, our medical oncologists deploy biological agents and immune checkpoint inhibitors (PD-1 / PD-L1 blockers) that empower the patient’s own immune system to target cancer cells.',
    hindiOverview:
      'जनहित हॉस्पिटल में मेडिकल ऑन्कोलॉजी मरीज के ट्यूमर की जेनेटिक और बायोमार्कर जांच के आधार पर की जाती है। यहां पारंपरिक कीमोथेरेपी के साथ-साथ शरीर की प्रतिरोधक क्षमता को कैंसर से लड़ने के लिए सक्रिय करने वाली इम्यूनोथेरेपी और टारगेटेड दवाएं दी जाती हैं, जिससे कमजोरी और दुष्प्रभाव काफी कम होते हैं।',
    symptomsAndIndications: [
      'Histopathologically confirmed solid organ malignancies (Breast, Lung, Colon, Stomach, Ovary, Pancreas)',
      'Hematological neoplasms requiring systemic immunochemotherapy (Lymphomas, Multiple Myeloma)',
      'Adjuvant or neoadjuvant therapy around surgical cancer resections',
    ],
    hindiSymptomsAndIndications: [
      'बायोप्सी द्वारा प्रमाणित कैंसर (स्तन, फेफड़े, आंत, अंडाशय, पेट का कैंसर आदि)',
      'खून और लिम्फ नोड्स के ट्यूमर (लिम्फोमा, मायलोमा आदि)',
      'ऑपरेशन से पहले ट्यूमर को छोटा करने या ऑपरेशन के बाद कैंसर को दोबारा लौटने से रोकने हेतु',
    ],
    diagnosticTests: [
      {
        test: 'Immunohistochemistry (IHC) & Next-Gen Sequencing (NGS)',
        hindiTest: 'आईएचसी (IHC) एवं एनजीएस जीन टेस्टिंग',
        purpose: 'Identifies specific actionable gene mutations (EGFR, ALK, HER2, KRAS, PD-L1).',
        hindiPurpose: 'ट्यूमर में विशिष्ट जीन म्यूटेशन का पता लगाना ताकि सटीक टारगेटेड दवा चुनी जा सके।',
      },
      {
        test: 'Whole-Body Diagnostic PET-CT Scan',
        hindiTest: 'होल-बॉडी पीईटी-सीटी (PET-CT) स्कैन',
        purpose: 'Assesses baseline metabolic tumor burden and response to chemotherapy cycles.',
        hindiPurpose: 'पूरे शरीर में कैंसर की सक्रियता और दवाओं के असर की सटीक तुलनात्मक जांच।',
      },
    ],
    treatmentOptions: [
      {
        option: 'Immune Checkpoint Inhibitor Immunotherapy',
        hindiOption: 'इम्यूनोथेरेपी (रोग प्रतिरोधक उपचार)',
        details: 'Monoclonal antibodies unlocking patient T-cells to identify and eliminate cancer cells.',
        hindiDetails: 'शरीर की टी-कोशिकाओं को कैंसर कोशिकाओं को पहचानकर नष्ट करने हेतु सक्रिय करना।',
      },
      {
        option: 'Targeted Oral Kinase Inhibitors',
        hindiOption: 'टारगेटेड थेरेपी गोलियां',
        details: 'Daily oral tablets designed to shut down molecular signaling pathways that fuel tumor growth.',
        hindiDetails: 'कैंसर कोशिकाओं के बढ़ने वाले सिग्नल को बंद करने वाली विशिष्ट आधुनिक गोलियां।',
      },
    ],
    procedureSteps: [
      {
        step: '1. Multidisciplinary Tumor Board Review',
        hindiStep: '1. ट्यूमर बोर्ड समीक्षा',
        details: 'Pathology slides and genomic mutations are evaluated collaboratively to select evidence-based drug regimens.',
        hindiDetails: 'सभी कैंसर विशेषज्ञों की बैठक में मरीज की रिपोर्ट के अनुसार सर्वोत्तम दवा का चयन।',
      },
      {
        step: '2. Outpatient Day Care Infusion',
        hindiStep: '2. डे-केयर में इन्फ्यूजन',
        details: 'Medications are infused in HEPA-filtered private recliner suites with premedications to prevent nausea.',
        hindiDetails: 'उल्टी और एलर्जी से बचाने वाली दवाओं के साथ आरामदायक लाउंज में कुछ घंटों का इन्फ्यूजन।',
      },
    ],
    fastFacts: {
      duration: '2 - 4 Hours per infusion cycle',
      hindiDuration: '2 - 4 घंटे प्रति साइकिल',
      anesthesia: 'None required (Intravenous administration via PICC/Chemo Port)',
      hindiAnesthesia: 'किसी बेहोशी की आवश्यकता नहीं (कीमो पोर्ट द्वारा)',
      hospitalStay: 'Day Care Outpatient (Same-day discharge)',
      hindiHospitalStay: 'डे-केयर (उसी दिन घर वापसी)',
      recoveryTime: 'Most patients resume desk activities within 24-48 hours',
      hindiRecoveryTime: '24 से 48 घंटे में सामान्य दैनिक कार्य',
    },
    recoveryGuidelines: [
      'Maintain adequate oral hydration (2 to 3 litres of clean water daily) to help flush chemotherapy metabolites',
      'Monitor body temperature twice daily; report immediately if oral temperature exceeds 100.4°F (38°C)',
      'Consume freshly cooked, hygienic, high-protein meals; avoid raw salads, street foods, or unpasteurized dairy',
      'Clean hands frequently and avoid crowded environments during the nadir phase (days 7 to 14 of cycle)',
      'Complete pre-chemo blood counts (CBC with absolute neutrophil count) before every scheduled cycle',
    ],
    hindiRecoveryGuidelines: [
      'दवाओं के असर को निकालने हेतु रोजाना 2 से 3 लीटर उबला या छना हुआ पानी पिएं',
      'दिन में दो बार थर्मामीटर से बुखार नापें; 100.4°F से अधिक बुखार होने पर तुरंत डॉक्टर को बताएं',
      'हमेशा ताजा पका हुआ, सुपाच्य और प्रोटीन युक्त भोजन लें; बाहर के खुले खाने से बचें',
      'संक्रमण से बचने हेतु भीड़भाड़ वाली जगहों पर न जाएं और मास्क का उपयोग करें',
      'प्रत्येक साइकिल से 1 दिन पहले सीबीसी (CBC) ब्लड टेस्ट अवश्य कराएं',
    ],
    specialistDoctorIds: ['dr-alok-kapoor'],
    faqs: [
      {
        question: 'What is a Chemo Port and why is it recommended?',
        hindiQuestion: 'कीमो पोर्ट (Chemo Port) क्या है और यह क्यों लगाया जाता है?',
        answer:
          'A chemo port is a small implantable reservoir placed beneath the skin of the upper chest connected to a large central vein. It prevents repeated painful needle pricks in fragile arm veins and minimizes the risk of chemotherapy drugs leaking into surrounding tissues.',
        hindiAnswer:
          'कीमो पोर्ट कॉलरबोन के नीचे त्वचा में लगाई जाने वाली छोटी सी डिवाइस है। इससे हाथों की नसों में बार-बार सुई चुभाने से मुक्ति मिलती है और कीमोथेरेपी की दवाएं बिना किसी दर्द या नस फटने के जोखिम के सुरक्षित पहुंचाई जाती हैं।',
      },
    ],
  },
  {
    id: 'dialysis',
    name: 'Advanced Hemodialysis & Renal Care',
    hindiName: 'आधुनिक हीमोडायलिसिस एवं रीनल केयर',
    departmentId: 'nephrology',
    departmentName: 'Nephrology & Renal Transplant',
    hindiDepartmentName: 'नेफ्रोलॉजी एवं किडनी रोग',
    badge: 'High-Flux Dialysis',
    hindiBadge: 'हाई-फ्लक्स तकनीक',
    shortDesc:
      'Ultra-pure double-pass RO water hemodialysis with single-use biocompatible dialyzers and continuous nephrologist supervision.',
    hindiShortDesc:
      'डबल-पास आरओ शुद्ध पानी और सिंगल-यूज डायलाइजर द्वारा संक्रमण-मुक्त एवं सुरक्षित हीमोडायलिसिस सेवाएं।',
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1000&q=80',
    overview:
      'The Hemodialysis Unit at Janhit Hospital is designed around patient safety, zero cross-infection, and optimal uremic clearance. Powered by an advanced double-pass reverse osmosis (RO) water purification plant meeting international AAMI water purity benchmarks, our 24-bed suite provides maintenance hemodialysis, online hemodiafiltration (HDF), and bedside CRRT in intensive care suites.',
    hindiOverview:
      'जनहित हॉस्पिटल का डायलिसिस सेंटर अंतरराष्ट्रीय एएएमआई (AAMI) जल शुद्धता मानकों पर आधारित है। यहां 24-बेड का आधुनिक केंद्र है जहां प्रत्येक मरीज के लिए सिंगल-यूज डायलाइजर और पाइप्स का उपयोग किया जाता है। समर्पित आईसीयू में भर्ती गंभीर मरीजों हेतु बेडसाइड सीआरआरटी (CRRT) की सुविधा भी उपलब्ध है।',
    symptomsAndIndications: [
      'End-Stage Renal Disease (ESRD / CKD Stage 5) with estimated GFR < 15 mL/min/1.73m²',
      'Severe uremic symptoms (nausea, intractable vomiting, metallic taste, pericarditis, encephalopathy)',
      'Refractory hyperkalemia (high blood potassium > 6.0 mEq/L) resistant to medications',
      'Fluid overload and pulmonary edema (fluid in lungs) unresponsive to diuretics',
    ],
    hindiSymptomsAndIndications: [
      'किडनी का गंभीर फेलियर (CKD स्टेज-5), जहां जीएफआर (GFR) 15 से नीचे आ गया हो',
      'खून में यूरिया-क्रिएटिनिन बढ़ने से लगातार उल्टी, जी मिचलाना और भूख न लगना',
      'खून में पोटेशियम का खतरनाक स्तर तक बढ़ जाना, जिससे दिल की धड़कन रुकने का खतरा हो',
      'शरीर और फेफड़ों में पानी भर जाना (सांस फूलना और पैरों पर भारी सूजन)',
    ],
    diagnosticTests: [
      {
        test: 'Kidney Function Panel (BUN, Serum Creatinine, Electrolytes)',
        hindiTest: 'किडनी फंक्शन टेस्ट (केएफटी)',
        purpose: 'Monitors uremic solute levels and electrolyte imbalances before and after dialysis.',
        hindiPurpose: 'डायलिसिस से पहले और बाद में यूरिया, क्रिएटिनिन और सोडियम-पोटेशियम की निगरानी।',
      },
      {
        test: 'Arteriovenous (AV) Fistula Color Doppler Ultrasound',
        hindiTest: 'एवी फिस्टुला कलर डॉप्लर सोनोग्राफी',
        purpose: 'Assesses fistula blood flow velocity (> 600 mL/min) and vessel lumen diameter.',
        hindiPurpose: 'डायलिसिस हेतु हाथ की नस (फिस्टुला) में खून के बहाव और चौड़ाई की जांच।',
      },
    ],
    treatmentOptions: [
      {
        option: 'High-Flux Maintenance Hemodialysis',
        hindiOption: 'हाई-फ्लक्स मेंटेनेंस हीमोडायलिसिस',
        details: 'Standard 4-hour sessions 2 to 3 times weekly utilizing high-permeability polysulfone membranes.',
        hindiDetails: 'सप्ताह में 2 या 3 बार 4-4 घंटे का नियमित डायलिसिस सत्र।',
      },
      {
        option: 'Continuous Renal Replacement Therapy (CRRT)',
        hindiOption: 'सतत रीनल रिप्लेसमेंट थेरेपी (CRRT)',
        details: 'Gentle, 24-hour continuous slow filtration tailored for critically ill ICU patients with low blood pressure.',
        hindiDetails: 'आईसीयू के बेहद कमजोर और कम बीपी वाले मरीजों के लिए 24 घंटे चलने वाली धीमी डायलिसिस।',
      },
    ],
    procedureSteps: [
      {
        step: '1. Pre-Dialysis Clinical Triage',
        hindiStep: '1. डायलिसिस पूर्व परीक्षण',
        details: 'Pre-dialysis weight, standing/supine blood pressure, and vascular access site are inspected.',
        hindiDetails: 'वजन, ब्लड प्रेशर और फिस्टुला की जांच करके अतिरिक्त पानी की मात्रा तय करना।',
      },
      {
        step: '2. Extracorporeal Blood Filtration',
        hindiStep: '2. रक्त शोधन प्रक्रिया',
        details: 'Blood flows through the synthetic dialyzer where toxins and excess fluid diffuse into the dialysate bath.',
        hindiDetails: 'रक्त मशीन में जाकर फिल्टर द्वारा साफ होता है और शुद्ध रक्त वापस शरीर में भेजा जाता है।',
      },
    ],
    fastFacts: {
      duration: '4 Hours per session',
      hindiDuration: '4 घंटे प्रति सत्र',
      anesthesia: 'None required (Gentle topical anaesthetic spray on fistula punctures)',
      hindiAnesthesia: 'किसी बेहोशी की आवश्यकता नहीं',
      hospitalStay: 'Outpatient Day Care (Return home immediately after session)',
      hindiHospitalStay: 'डे-केयर (सत्र के तुरंत बाद घर वापसी)',
      recoveryTime: 'Patients relax during session and resume light routine same day',
      hindiRecoveryTime: 'सत्र के कुछ देर आराम के बाद सामान्य दिनचर्या',
    },
    recoveryGuidelines: [
      'Maintain strict daily fluid restriction (typically 1 to 1.5 litres total including tea, soups, and water)',
      'Follow a renal dietitian-approved diet: adequate biological protein, low potassium (limit bananas/citrus), low phosphorus',
      'Protect your AV fistula arm: do not take blood pressure, draw blood samples, or carry heavy shopping bags on that limb',
      'Check the fistula thrill (vibrating sensation) with your fingers twice daily to ensure patent vascular flow',
      'Take prescribed phosphate binders with meals and erythropoietin injections as recommended',
    ],
    hindiRecoveryGuidelines: [
      'रोजाना पानी और तरल पदार्थों की मात्रा डॉक्टर द्वारा तय सीमा (1 से 1.5 लीटर) तक ही रखें',
      'कम पोटेशियम वाला आहार लें (केला, संतरा, नारियल पानी आदि से बचें) और नमक कम खाएं',
      'जिस हाथ में फिस्टुला बना है, उस हाथ से बीपी न नपवाएं और न ही कोई भारी वजन उठाएं',
      'रोजाना उंगलियों से छूकर फिस्टुला की धड़कन (Thrill) महसूस करें कि नस चालू है',
      'भोजन के साथ फॉस्फेट बाइंडर दवाएं और डॉक्टर द्वारा निर्देशित इंजेक्शन समय पर लें',
    ],
    specialistDoctorIds: ['dr-sanjay-gupta'],
    faqs: [
      {
        question: 'Why does dialysis require a strict fluid intake limit?',
        hindiQuestion: 'डायलिसिस के मरीज को पानी कम पीने की सलाह क्यों दी जाती है?',
        answer:
          'When kidneys fail, the body cannot produce adequate urine to remove excess fluid. Consuming excess water between dialysis sessions causes fluid to accumulate in the lungs (pulmonary edema), sudden dangerous spikes in blood pressure, and severe cardiac strain.',
        hindiAnswer:
          'किडनी फेल होने पर पेशाब बनना बंद या बहुत कम हो जाता है। यदि ज्यादा पानी पिया जाए तो वह फेफड़ों में भर जाता है, जिससे दम घुटने लगता है और दिल का दौरा पड़ने का गंभीर खतरा पैदा हो जाता है।',
      },
    ],
  },
  {
    id: 'critical-care',
    name: 'Critical Care & Advanced Multidisciplinary ICU',
    hindiName: 'क्रिटिकल केयर एवं मल्टी-डिसीप्लिनरी आईसीयू',
    departmentId: 'pulmonology',
    departmentName: 'Pulmonology & Critical Care',
    hindiDepartmentName: 'श्वसन एवं फेफड़ा रोग विभाग',
    badge: '1:1 Nursing Ratio',
    hindiBadge: '1:1 समर्पित नर्सिंग',
    shortDesc:
      'Tertiary medical and surgical intensive care suites equipped with advanced Dräger ventilators, ECMO support, and 24/7 dedicated intensivists.',
    hindiShortDesc:
      '100+ क्रिटिकल केयर बेड्स, हाई-एंड वेंटिलेटर, ईसीएमओ और 1:1 समर्पित नर्सिंग देखभाल से सुसज्जित आधुनिक आईसीयू।',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80',
    overview:
      'The Intensive Care Units (ICU) at Janhit Hospital provide round-the-clock specialized critical care medicine for patients experiencing acute life-threatening organ dysfunction. Segregated into Medical ICU, Surgical ICU, Cardiac Care (CCU), and Neuro-ICU, each unit features positive-pressure air filtration, invasive arterial telemetry, and bedside ultrasound.',
    hindiOverview:
      'जनहित हॉस्पिटल की गहन चिकित्सा इकाइयां (ICU) जीवन के लिए गंभीर रूप से संकटग्रस्त मरीजों की 24/7 निगरानी और उपचार हेतु समर्पित हैं। यहां मेडिकल आईसीयू, सर्जिकल आईसीयू, कार्डियक केयर और न्यूरो-आईसीयू अलग-अलग इकाइयों में विभाजित हैं, जहां प्रत्येक बेड पर वेंटिलेटर, इनवेसिव मॉनिटरिंग और 1:1 नर्सिंग अनुपात सुनिश्चित किया जाता है।',
    symptomsAndIndications: [
      'Acute Respiratory Distress Syndrome (ARDS) requiring invasive mechanical lung ventilation',
      'Septic Shock and multi-organ dysfunction syndrome (MODS) requiring vasoactive inotropic support',
      'Severe polytrauma, head injury, and post-cardiac arrest resuscitation care',
      'Complicated post-operative recovery following major cardiovascular or brain surgery',
    ],
    hindiSymptomsAndIndications: [
      'तीव्र श्वसन विफलता (ARDS), जिसमें वेंटिलेटर द्वारा जीवनरक्षक ऑक्सीजन की आवश्यकता हो',
      'सेप्टिक शॉक एवं संक्रमण के कारण रक्तचाप का खतरनाक रूप से गिर जाना',
      'गंभीर दुर्घटना (पॉलिट्रॉमा), सिर की चोट और कोमा की स्थिति',
      'जटिल बाईपास या ब्रेन सर्जरी के बाद की सघन निगरानी',
    ],
    diagnosticTests: [
      {
        test: 'Continuous Arterial Blood Gas (ABG) & Lactate Monitoring',
        hindiTest: 'आर्टेरियल ब्लड गैस (ABG) एवं लैक्टेट जांच',
        purpose: 'Real-time assessment of acid-base balance, oxygenation indices, and cellular perfusion.',
        hindiPurpose: 'रक्त में ऑक्सीजन, कार्बन डाइऑक्साइड और संक्रमण की गंभीरता की निरंतर जांच।',
      },
      {
        test: 'Point-of-Care Bedside Critical Ultrasound & Echocardiography (POCUS)',
        hindiTest: 'बेडसाइड पॉइंट-ऑफ-केयर अल्ट्रासाउंड (POCUS)',
        purpose: 'Instant hemodynamic evaluation of cardiac contractility, lung aeration, and fluid responsiveness.',
        hindiPurpose: 'बेड पर ही अल्ट्रासाउंड द्वारा हृदय की पम्पिंग क्षमता और फेफड़ों में पानी की तुरंत जांच।',
      },
    ],
    treatmentOptions: [
      {
        option: 'Lung-Protective Mechanical Ventilation',
        hindiOption: 'लंग-प्रोटेक्टिव वेंटिलेटर सपोर्ट',
        details: 'Low tidal volume ventilation with prone positioning to recruit collapsed lung alveoli.',
        hindiDetails: 'फेफड़ों को नुकसान से बचाते हुए पेट के बल (प्रोन पोजिशन) लिटाकर ऑक्सीजन का स्तर सुधारना।',
      },
      {
        option: 'Veno-Venous & Veno-Arterial ECMO Support',
        hindiOption: 'ईसीएमओ (ECMO / कृत्रिम फेफड़ा-हृदय मशीन)',
        details: 'Extracorporeal membrane oxygenation temporarily taking over the work of failing lungs or heart.',
        hindiDetails: 'जब वेंटिलेटर भी काम न करे, तब शरीर के बाहर खून में सीधे ऑक्सीजन मिलाने वाली जीवनरक्षक मशीन।',
      },
    ],
    procedureSteps: [
      {
        step: '1. Resuscitation & Airway Protection',
        hindiStep: '1. रिससिटेशन एवं एयरवे सुरक्षा',
        details: 'Endotracheal intubation and central venous access under ultrasound guidance.',
        hindiDetails: 'सांस की नली में ट्यूब डालकर वेंटिलेटर से जोड़ना और गले की बड़ी नस में सेंट्रल लाइन डालना।',
      },
      {
        step: '2. Hemodynamic Stabilization',
        hindiStep: '2. हेमोडायनामिक नियंत्रण',
        details: 'Precision titration of noradrenaline and vasopressin to maintain mean arterial pressure > 65 mmHg.',
        hindiDetails: 'रक्तचाप को सुरक्षित स्तर पर बनाए रखने हेतु विशेष इन्फ्यूजन दवाओं की स्वचालित डोजिंग।',
      },
    ],
    fastFacts: {
      duration: 'Continuous 24/7 Life Support Care',
      hindiDuration: '24/7 सतत जीवनरक्षक गहन चिकित्सा',
      anesthesia: 'Therapeutic analgesia & sedation tailored to patient comfort',
      hindiAnesthesia: 'मरीज के आराम हेतु चिकित्सकीय सीडेशन',
      hospitalStay: 'Variable based on clinical stabilization (Typically 3 - 7 days in ICU)',
      hindiHospitalStay: 'मरीज की स्थिति स्थिर होने तक (सामान्यतः 3 से 7 दिन)',
      recoveryTime: 'Step-down to High Dependency Unit (HDU) followed by general ward',
      hindiRecoveryTime: 'आईसीयू के बाद एचडीयू (HDU) और फिर वार्ड में शिफ्टिंग',
    },
    recoveryGuidelines: [
      'Early mobilization and passive limb physiotherapy in bed as soon as clinical sedation is lightened',
      'Daily sedation holidays and spontaneous breathing trials to achieve early, safe extubation',
      'Strict adherence to institutional hand hygiene, barrier nursing, and closed-suction catheter systems',
      'Step-down to High Dependency Unit (HDU) once inotropic infusions and invasive ventilation are weaned',
      'Involvement of clinical psychologists and nutritionists to prevent post-intensive care syndrome (PICS)',
    ],
    hindiRecoveryGuidelines: [
      'स्थिति में सुधार होते ही बेड पर ही फिजियोथेरेपिस्ट द्वारा हाथ-पैरों की कसरत शुरू करना',
      'मरीज को जल्दी से जल्दी वेंटिलेटर से हटाकर खुद सांस लेने के काबिल बनाने का दैनिक प्रयास',
      'संक्रमण रोकने हेतु सख्त स्वच्छता और दस्ताने-मास्क के नियमों का कड़ाई से पालन',
      'मशीन हटने के बाद मरीज को धीरे-धीरे एचडीयू और फिर सामान्य वार्ड में स्थानांतरित करना',
      'आईसीयू से निकलने के बाद मरीज के मानसिक और शारीरिक पुनर्वास पर विशेष ध्यान देना',
    ],
    specialistDoctorIds: ['dr-neha-choudhary'],
    faqs: [
      {
        question: 'What are the visiting hours and infection control guidelines for the ICU?',
        hindiQuestion: 'आईसीयू में मरीज से मिलने का समय और संक्रमण संबंधी नियम क्या हैं?',
        answer:
          'To protect critically immunocompromised patients from hospital-acquired infections, visitor access is restricted to designated morning (11:00 AM - 12:00 PM) and evening (05:00 PM - 06:00 PM) windows for one immediate family member at a time, with mandatory sanitization and sterile shoe covers.',
        hindiAnswer:
          'गंभीर मरीजों को संक्रमण से बचाने हेतु मिलने का समय सुबह 11:00 से 12:00 और शाम 5:00 से 6:00 बजे तक सीमित है। एक समय में केवल एक परिजन को हाथ सैनिटाइज करके और शू-कवर पहनकर जाने की अनुमति होती है।',
      },
    ],
  },
  {
    id: 'laparoscopic',
    name: 'Laparoscopic Keyhole Gallbladder & Hernia Surgery',
    hindiName: 'दूरबीन द्वारा पित्ताशय एवं हर्निया की सर्जरी',
    departmentId: 'surgery',
    departmentName: 'General & Laparoscopic Surgery',
    hindiDepartmentName: 'जनरल एवं दूरबीन सर्जरी विभाग',
    badge: 'Keyhole Surgery',
    hindiBadge: 'की-होल सर्जरी',
    shortDesc:
      'Minimally invasive keyhole surgery through tiny 5-10 mm punctures for gallbladder stones, hernia mesh repair, and appendix with minimal pain and fast return to work.',
    hindiShortDesc:
      'पेट में केवल 5 से 10 मिमी के छोटे छिद्रों द्वारा पित्त की थैली, हर्निया और अपेंडिक्स का दर्द-रहित दूरबीन ऑपरेशन।',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1000&q=80',
    overview:
      'Laparoscopic surgery replaces traditional large open abdominal incisions with miniature surgical ports and high-definition laparoscopes. Under 4K camera magnification, senior laparoscopic surgeons perform precise dissection, organ retrieval, and anatomical mesh repairs with virtually no muscle cutting, dramatically reducing postoperative pain and recovery time.',
    hindiOverview:
      'दूरबीन (लैप्रोस्कोपिक) सर्जरी में पेट पर बड़ा चीरा लगाने की जगह 3-4 बहुत छोटे छिद्र किए जाते हैं। 4K कैमरे के माध्यम से पेट के अंदर की संरचनाओं को बड़ा और साफ देखकर पित्त की थैली की पथरी, हर्निया या अपेंडिक्स को कुशलता से निकाल दिया जाता है। इसमें दर्द बेहद कम होता है और मरीज अगले ही दिन घर जा सकता है।',
    symptomsAndIndications: [
      'Symptomatic Cholelithiasis (Gallbladder Stones causing right upper quadrant abdominal colic, nausea)',
      'Inguinal, Umbilical, or Incisional Hernias with visible bulge, pain upon coughing or straining',
      'Acute Appendicitis requiring emergency appendectomy to prevent rupture and peritonitis',
      'Gastroesophageal Reflux Disease (GERD) with hiatal hernia unresponsive to antacid medications',
    ],
    hindiSymptomsAndIndications: [
      'पित्त की थैली में पथरी (पेट के दाहिने ऊपरी हिस्से में तेज दर्द, उल्टी या भारीपन)',
      'हर्निया (नाभि, जांघ के जोड़ या पुराने ऑपरेशन के स्थान पर सूजन या गांठ का उभरना)',
      'एक्यूट अपेंडिसाइटिस (पेट के निचले दाहिने हिस्से में अचानक तेज दर्द और बुखार)',
      'लगातार खट्टी डकारें, सीने में जलन और हायटल हर्निया',
    ],
    diagnosticTests: [
      {
        test: 'High-Resolution Abdominal Ultrasound (USG Abdomen)',
        hindiTest: 'पेट का अल्ट्रासाउंड (USG)',
        purpose: 'Visualizes gallstone number, acoustic shadowing, and gallbladder wall thickness.',
        hindiPurpose: 'पित्त की थैली में पथरियों की संख्या, साइज और थैली की सूजन की पुष्टि करना।',
      },
      {
        test: 'Contrast-Enhanced Abdominal CT Scan',
        hindiTest: 'कंट्रास्ट सीटी स्कैन (पेट)',
        purpose: 'Evaluates complex recurrent hernias, abdominal wall defect size, and bowel involvement.',
        hindiPurpose: 'जटिल या दोबारा हुए हर्निया में मांसपेशियों के छेद का सटीक माप लेना।',
      },
    ],
    treatmentOptions: [
      {
        option: 'Laparoscopic Cholecystectomy',
        hindiOption: 'दूरबीन द्वारा पित्ताशय निष्कासन',
        details: 'Clipping and dividing the cystic duct and artery to remove the diseased gallbladder through a tiny portal.',
        hindiDetails: 'पित्त की नली को क्लिप लगाकर सुरक्षित रूप से रोगग्रस्त थैली को बाहर निकालना।',
      },
      {
        option: 'Laparoscopic Hernia Mesh Repair (TEP / TAPP)',
        hindiOption: 'दूरबीन द्वारा हर्निया जाली (Mesh) प्रत्यारोपण',
        details: 'Anatomical placement of polypropylene mesh behind the abdominal wall defect for zero-tension repair.',
        hindiDetails: 'मांसपेशियों के कमजोर छेद के पीछे अंदर से जाली लगाना, जिससे हर्निया दोबारा न उभरे।',
      },
    ],
    procedureSteps: [
      {
        step: '1. Pneumoperitoneum & Port Placement',
        hindiStep: '1. पोर्ट प्लेसमेंट',
        details: 'The abdomen is safely inflated with carbon dioxide gas, and 3-4 small ports (5 to 10 mm) are inserted.',
        hindiDetails: 'पेट में सुरक्षित कार्बन डाइऑक्साइड गैस भरकर 5 से 10 मिमी के 3 छोटे छिद्र बनाना।',
      },
      {
        step: '2. High-Definition Dissection & Extraction',
        hindiStep: '2. दूरबीन द्वारा सर्जरी',
        details: 'Structures are identified and dissected under 4K camera magnification, and the specimen is retrieved in an Endobag.',
        hindiDetails: '4K कैमरे की मदद से पत्थरी वाली थैली को अलग करके सुरक्षित बैग में बाहर निकालना।',
      },
    ],
    fastFacts: {
      duration: '45 - 60 Minutes',
      hindiDuration: '45 - 60 मिनट',
      anesthesia: 'General Anaesthesia with rapid recovery protocols',
      hindiAnesthesia: 'जनरल एनेस्थीसिया (दर्द-रहित)',
      hospitalStay: '24 Hours (Day Care option available for select patients)',
      hindiHospitalStay: '24 घंटे (अगले दिन डिस्चार्ज)',
      recoveryTime: '5 - 7 Days to return to office/desk work',
      hindiRecoveryTime: '5 से 7 दिन में ऑफिस कार्य शुरू',
    },
    recoveryGuidelines: [
      'Begin sips of water within 4 to 6 hours after surgery, progressing to soft diet by evening',
      'Walk gently around the room on the evening of surgery to promote bowel motility and relieve gas discomfort',
      'Keep port puncture dressing strips clean and dry; showering is usually permitted after 48 to 72 hours',
      'Avoid lifting heavy items (> 10 kg) or vigorous abdominal crunches for 4 weeks post-hernia repair',
      'Resume light driving and desk activities within 5 to 7 days',
    ],
    hindiRecoveryGuidelines: [
      'ऑपरेशन के 4 से 6 घंटे बाद पानी और शाम तक हल्का दलिया या सूप लेना शुरू करें',
      'गैस की समस्या दूर करने हेतु ऑपरेशन की शाम को ही कमरे में धीरे-धीरे टहलना शुरू करें',
      'छोटे चीरों की पट्टी को 48 घंटे तक सूखा रखें; 3 दिन बाद नहाया जा सकता है',
      'हर्निया सर्जरी के बाद 4 सप्ताह तक कोई भारी बाल्टी या वजन न उठाएं',
      '5 से 7 दिन में सामान्य ड्राइविंग और ऑफिस का काम शुरू किया जा सकता है',
    ],
    specialistDoctorIds: ['dr-vikram-aditya'],
    faqs: [
      {
        question: 'Does removing the gallbladder affect long-term digestion?',
        hindiQuestion: 'क्या पित्त की थैली निकालने से पाचन तंत्र पर कोई बुरा असर पड़ता है?',
        answer:
          'No. The gallbladder only stores and concentrates bile produced by the liver. After removal, the liver continues producing bile, which drips directly into the small intestine. Patients adapt smoothly and can resume a normal healthy diet within a few weeks.',
        hindiAnswer:
          'बिल्कुल नहीं। पित्त वास्तव में लिवर बनाता है, थैली केवल उसे जमा करती है। थैली निकलने के बाद भी लिवर सामान्य रूप से पित्त बनाता रहता है जो सीधे आंतों में जाता है। मरीज कुछ ही हफ्तों में सामान्य भोजन आराम से पचा सकते हैं।',
      },
    ],
  },
  {
    id: 'health-checks',
    name: 'Comprehensive Preventive Health Packages',
    hindiName: 'सम्पूर्ण प्रिवेंटिव हेल्थ चेकअप पैकेज',
    departmentId: 'cardiology',
    departmentName: 'Cardiology & Heart Care',
    hindiDepartmentName: 'कार्डियोलॉजी एवं हृदय रोग',
    badge: 'Preventive Care',
    hindiBadge: 'स्वास्थ्य जांच पैकेज',
    shortDesc:
      'Thorough diagnostic health screenings covering cardiac, metabolic, kidney, liver, cancer markers, and senior citizen health with same-day consultation.',
    hindiShortDesc:
      'हृदय, लिवर, किडनी, डायबिटीज और कैंसर स्क्रीनिंग की संपूर्ण एक-दिवसीय स्वास्थ्य जांच व वरिष्ठ डॉक्टर परामर्श।',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80',
    overview:
      'Preventive healthcare is the single most powerful strategy to intercept asymptomatic diseases like coronary artery disease, hypertension, early diabetes, and occult malignancies before they produce irreversible organ damage. Janhit Hospital offers customized corporate, executive, and senior citizen wellness packages performed in a dedicated wellness lounge with same-day consolidated specialist consultations.',
    hindiOverview:
      'प्रिवेंटिव हेल्थ चेकअप गंभीर बीमारियों जैसे दिल का दौरा, डायबिटीज, हाई बीपी और शुरुआती कैंसर को समय रहते पहचानने का सबसे प्रभावी माध्यम है। जनहित हॉस्पिटल में संपूर्ण जांचें एक ही समर्पित वेलनेस लाउंज में 3 से 4 घंटे के भीतर पूरी की जाती हैं और उसी दिन वरिष्ठ डॉक्टरों द्वारा रिपोर्ट का परामर्श दिया जाता है।',
    symptomsAndIndications: [
      'Adults aged 30+ seeking baseline metabolic, cardiovascular, and liver health profiling',
      'Individuals with a strong family history of premature heart attacks, stroke, or cancer',
      'Sedentary lifestyle, high occupational stress, smoking, or obesity',
      'Annual corporate executive wellness and comprehensive pre-employment medical clearances',
    ],
    hindiSymptomsAndIndications: [
      '30 वर्ष से अधिक उम्र के नागरिक जो अपने स्वास्थ्य की संपूर्ण जानकारी चाहते हैं',
      'जिनके परिवार में दिल की बीमारी, डायबिटीज, बीपी या कैंसर का पारिवारिक इतिहास हो',
      'तनावपूर्ण दिनचर्या, धूम्रपान, मोटापा या शारीरिक सक्रियता की कमी',
      'वार्षिक कॉर्पोरेट हेल्थ चेकअप एवं वरिष्ठ नागरिकों की वार्षिक स्वास्थ्य जांच',
    ],
    diagnosticTests: [
      {
        test: 'Complete Metabolic & Lipid Profile (Cholesterol, Triglycerides, HDL, LDL)',
        hindiTest: 'लिपिड प्रोफाइल एवं कोलेस्ट्रॉल जांच',
        purpose: 'Quantifies cardiovascular atherosclerotic plaque risk and vascular lipid ratios.',
        hindiPurpose: 'खून में कोलेस्ट्रॉल और दिल की बीमारी के जोखिम का सटीक परीक्षण।',
      },
      {
        test: 'Glycated Hemoglobin (HbA1c) & Fasting Insulin',
        hindiTest: 'एचबीए1सी (HbA1c) 3 माह का शुगर टेस्ट',
        purpose: 'Evaluates long-term 90-day glycemic control and insulin resistance.',
        hindiPurpose: 'पिछले 3 महीनों में शुगर का औसत स्तर और डायबिटीज की शुरुआती स्थिति।',
      },
      {
        test: 'Treadmill Test (TMT) / Stress ECG',
        hindiTest: 'ट्रेडमिल टेस्ट (TMT स्ट्रेस टेस्ट)',
        purpose: 'Identifies exercise-induced myocardial ischemia and heart rate dynamics.',
        hindiPurpose: 'दौड़ने पर दिल की धमनियों में खून के प्रवाह और छिपे हुए ब्लॉकेज की जांच।',
      },
      {
        test: 'Whole-Abdomen Ultrasound & Liver Elastography',
        hindiTest: 'पेट का संपूर्ण अल्ट्रासाउंड व फाइब्रोस्कैन',
        purpose: 'Screening for fatty liver, gallstones, renal cysts, and prostate enlargement.',
        hindiPurpose: 'फैटी लिवर, गुर्दे की पथरी और पुरुषों में प्रोस्टेट ग्रंथि की जांच।',
      },
    ],
    treatmentOptions: [
      {
        option: 'Executive Cardiac & Metabolic Wellness Package',
        hindiOption: 'एग्जीक्यूटिव कार्डियक एवं मेटाबॉलिक पैकेज',
        details: 'Comprehensive testing including TMT, 2D Echo, Lipid Panel, HbA1c, and Cardiologist consultation.',
        hindiDetails: 'टीएमटी, 2D इको, लिपिड, शुगर, लिवर-किडनी जांच एवं सीनियर कार्डियोलॉजिस्ट परामर्श।',
      },
      {
        option: 'Comprehensive Senior Citizen Wellness Package',
        hindiOption: 'वरिष्ठ नागरिक सम्पूर्ण स्वास्थ्य पैकेज',
        details: 'Includes Bone Mineral Density (DEXA), Prostate Specific Antigen (PSA) / Mammography, and Ophthalmology screening.',
        hindiDetails: 'हड्डियों की मजबूती (DEXA), प्रोस्टेट/मैमोग्राफी, आंखों की जांच और समग्र फिजिशियन परामर्श।',
      },
    ],
    procedureSteps: [
      {
        step: '1. Fasting Sample Collection',
        hindiStep: '1. खाली पेट सैंपल संग्रहण',
        details: 'Blood and urine samples collected in our private wellness lounge, followed by a complimentary nutritious breakfast.',
        hindiDetails: 'आरामदायक लाउंज में खाली पेट खून व पेशाब के सैंपल लिए जाते हैं, जिसके बाद पौष्टिक नाश्ता दिया जाता है।',
      },
      {
        step: '2. Non-Invasive Diagnostic Screenings',
        hindiStep: '2. इमेजिंग एवं कार्डियक जांचें',
        details: 'Ultrasound, Digital Chest X-ray, ECG, 2D Echo, and TMT performed with zero waiting queues.',
        hindiDetails: 'अल्ट्रासाउंड, एक्स-रे, ईसीजी, इको और टीएमटी बिना किसी लंबी कतार के प्राथमिकता से पूरे किए जाते हैं।',
      },
      {
        step: '3. One-on-One Senior Consultant Review',
        hindiStep: '3. वरिष्ठ कंसल्टेंट परामर्श',
        details: 'Detailed consolidated review with personalized lifestyle, diet, and medication roadmap.',
        hindiDetails: 'सभी रिपोर्ट तैयार होने पर वरिष्ठ डॉक्टर द्वारा रिपोर्ट का विश्लेषण और जीवनशैली सुधार परामर्श।',
      },
    ],
    fastFacts: {
      duration: '3 - 4 Hours for total package completion',
      hindiDuration: '3 - 4 घंटे में सम्पूर्ण जांच',
      anesthesia: 'None (Completely Non-Invasive)',
      hindiAnesthesia: 'किसी बेहोशी की आवश्यकता नहीं (पूरी तरह दर्दरहित)',
      hospitalStay: 'Zero (Outpatient Wellness Suite)',
      hindiHospitalStay: 'शून्य (उसी दिन रिपोर्ट व परामर्श)',
      recoveryTime: 'Immediate return to daily work and normal activities',
      hindiRecoveryTime: 'तुरंत सामान्य दिनचर्या पर वापस लौटें',
    },
    recoveryGuidelines: [
      'Fast for 10 to 12 hours prior to the checkup (drinking plain water is encouraged)',
      'Wear comfortable loose clothing and sports shoes for the treadmill stress test (TMT)',
      'Bring all existing medical prescriptions, prior test reports, and eyeglasses',
      'Follow personalized lifestyle and dietary modifications outlined in the consolidated report',
      'Schedule annual repeat evaluations to track longitudinal cardiovascular and metabolic trends',
    ],
    hindiRecoveryGuidelines: [
      'जांच से पहले 10 से 12 घंटे खाली पेट रहें (सादा पानी पिया जा सकता है)',
      'ट्रेडमिल टेस्ट (TMT) हेतु आरामदायक कपड़े और स्पोर्ट्स शूज पहनकर आएं',
      'अपनी पुरानी दवाइयों के पर्चे और चश्मा साथ लाएं',
      'कंसल्टेंट डॉक्टर द्वारा सुझाई गई डाइट और व्यायाम के नियमों का पालन करें',
      'वर्ष में एक बार नियमित चेकअप कराकर अपने स्वास्थ्य का तुलनात्मक रिकॉर्ड रखें',
    ],
    specialistDoctorIds: ['dr-ashok-sharma'],
    faqs: [
      {
        question: 'Why do I need a health checkup if I feel completely healthy and have no symptoms?',
        hindiQuestion: 'यदि मैं पूरी तरह स्वस्थ महसूस कर रहा हूँ तो मुझे हेल्थ चेकअप की क्या आवश्यकता है?',
        answer:
          'Many life-threatening conditions like high blood pressure, high cholesterol, early coronary blockages, and early diabetes develop silently over years without any noticeable symptoms. Routine preventive checks catch these vulnerabilities early when they can be reversed with simple lifestyle modifications before causing a heart attack or stroke.',
        hindiAnswer:
          'हाई बीपी, बढ़ा हुआ कोलेस्ट्रॉल, हृदय की नसों में शुरुआती ब्लॉकेज और डायबिटीज के शुरुआती वर्षों में कोई लक्षण दिखाई नहीं देते। इसे साइलेंट किलर कहा जाता है। नियमित जांच से इन्हें बीमारी बनने से पहले ही पकड़कर साधारण सावधानियों से ठीक किया जा सकता है।',
      },
    ],
  },
];

