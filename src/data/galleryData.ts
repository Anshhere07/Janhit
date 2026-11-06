export interface GalleryCategory {
  id: string;
  name: string;
  hindiName: string;
  description: string;
  hindiDescription: string;
}

export interface GalleryMediaItem {
  id: string;
  title: string;
  hindiTitle: string;
  categoryId: string;
  categoryName: string;
  hindiCategoryName: string;
  image: string;
  thumbnail: string;
  altText: string;
  hindiAltText: string;
  description: string;
  hindiDescription: string;
  featured?: boolean;
}

export interface GalleryVideoItem {
  id: string;
  title: string;
  hindiTitle: string;
  thumbnail: string;
  duration: string;
  category: string;
  hindiCategory: string;
  description: string;
  hindiDescription: string;
  youtubeId: string;
}

/* ========================================================================= */
/* 1. GALLERY CATEGORIES (ALL 9 REQUESTED CATEGORIES)                        */
/* ========================================================================= */
export const GALLERY_CATEGORIES: GalleryCategory[] = [
  {
    id: 'all',
    name: 'All Media',
    hindiName: 'सभी तस्वीरें',
    description: 'Comprehensive visual tour of Janhit Hospital campus and infrastructure.',
    hindiDescription: 'जनहित हॉस्पिटल के संपूर्ण परिसर एवं चिकित्सा व्यवस्था का दृश्य।',
  },
  {
    id: 'building',
    name: 'Hospital Building',
    hindiName: 'अस्पताल भवन व परिसर',
    description: 'Modern 500-bed multi-acre hospital campus, green healing landscape, and facade.',
    hindiDescription: '500-बेड का आधुनिक अस्पताल परिसर, हरित वातावरण और वास्तुकला।',
  },
  {
    id: 'reception',
    name: 'Reception & Lobby',
    hindiName: 'रिसेप्शन व लाउंज',
    description: 'Spacious patient registration lobby, helpdesk, and comfortable waiting lounges.',
    hindiDescription: 'विशाल मरीज पंजीकरण काउंटर, सहायता केंद्र और प्रतीक्षालय।',
  },
  {
    id: 'rooms',
    name: 'Patient Rooms',
    hindiName: 'मरीज कक्ष व सुइट्स',
    description: 'Executive suites, deluxe private rooms, twin-sharing wards, and general care units.',
    hindiDescription: 'डीलक्स प्राइवेट रूम्स, एग्जीक्यूटिव सुइट्स और सुसज्जित वार्ड्स।',
  },
  {
    id: 'icu-nicu',
    name: 'ICU and NICU',
    hindiName: 'आईसीयू एवं एनआईसीयू',
    description: '100+ critical care beds, sterile Level-3 NICU incubators, and central monitoring.',
    hindiDescription: '100+ क्रिटिकल केयर आईसीयू बेड्स और अत्याधुनिक नवजात शिशु इकाई।',
  },
  {
    id: 'ot',
    name: 'Operation Theatre',
    hindiName: 'मॉड्यूलर ऑपरेशन थिएटर',
    description: 'Ultra-clean laminar airflow Class-100 modular surgical suites and robotic arms.',
    hindiDescription: 'लैमिनार एयरफ्लो युक्त क्लास-100 मॉड्यूलर सर्जिकल सुइट्स।',
  },
  {
    id: 'equipment',
    name: 'Medical Equipment',
    hindiName: 'उन्नत चिकित्सा उपकरण',
    description: '3 Tesla Silent MRI, 128-Slice CT, Biplane Cath Lab, and robotic surgery consoles.',
    hindiDescription: '3 टेस्ला साइलेंट एमआरआई, 128-स्लाइस सीटी स्कैन और कैथ लैब।',
  },
  {
    id: 'staff',
    name: 'Doctors and Medical Staff',
    hindiName: 'डॉक्टर एवं चिकित्सा दल',
    description: 'Our compassionate super-specialist surgeons, physicians, and nursing teams.',
    hindiDescription: 'हमारे समर्पित विशेषज्ञ डॉक्टर, सर्जन एवं कुशल नर्सिंग टीम।',
  },
  {
    id: 'events',
    name: 'Hospital Events',
    hindiName: 'अस्पताल कार्यक्रम व सेमिनार',
    description: 'National clinical symposiums, continuous medical education (CME), and annual events.',
    hindiDescription: 'राष्ट्रीय चिकित्सा संगोष्ठी, डॉक्टर प्रशिक्षण सेमिनार एवं वार्षिकोत्सव।',
  },
  {
    id: 'camps',
    name: 'Health Camps',
    hindiName: 'निःशुल्क स्वास्थ्य शिविर',
    description: 'Community health outreach, cardiac screening camps, and blood donation drives.',
    hindiDescription: 'सामुदायिक स्वास्थ्य शिविर, हृदय जांच और रक्तदान महाअभियान।',
  },
];

/* ========================================================================= */
/* 2. VERIFIED HOSPITAL PHOTO GALLERY ITEMS                                  */
/* ========================================================================= */
export const GALLERY_ITEMS: GalleryMediaItem[] = [
  // 1. Hospital Building
  {
    id: 'img-bld-1',
    title: 'Hospital Main Campus & Architectural Facade',
    hindiTitle: 'अस्पताल मुख्य भवन एवं आधुनिक वास्तुकला',
    categoryId: 'building',
    categoryName: 'Hospital Building',
    hindiCategoryName: 'अस्पताल भवन व परिसर',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=600&q=80',
    altText: 'Modern multi-story building of Janhit Super Speciality Hospital, Garhiya Rangeen',
    hindiAltText: 'जनहित सुपर स्पेशलिटी हॉस्पिटल गढ़िया रंगीन का आधुनिक बहुमंजिला भवन',
    description: 'The 500-bed international standard medical campus with dedicated trauma bays, ambulance ramps, and energy-efficient green building architecture.',
    hindiDescription: '500 बेड्स का अंतरराष्ट्रीय मानकों पर निर्मित बहुमंजिला परिसर, जिसमें 24/7 आपातकालीन ट्राइएज और समर्पित एम्बुलेंस लेन की व्यवस्था है।',
    featured: true,
  },
  {
    id: 'img-bld-2',
    title: 'Emergency Entrance & 24/7 Ambulance Bay',
    hindiTitle: 'इमरजेंसी प्रवेश द्वार एवं एम्बुलेंस लेन',
    categoryId: 'building',
    categoryName: 'Hospital Building',
    hindiCategoryName: 'अस्पताल भवन व परिसर',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80',
    altText: 'Janhit Hospital 24/7 emergency entrance with dedicated ambulance bays',
    hindiAltText: 'जनहित हॉस्पिटल का आपातकालीन द्वार और एम्बुलेंस पार्किंग',
    description: 'Direct vehicular access engineered for zero-delay patient drop-off into our Level-1 Trauma Resuscitation Bays.',
    hindiDescription: 'गंभीर मरीजों के तत्काल प्रवेश हेतु डिजाइन किया गया बाधा-मुक्त आपातकालीन मार्ग।',
  },

  // 2. Reception
  {
    id: 'img-rec-1',
    title: 'Central Patient Registration & Information Atrium',
    hindiTitle: 'केंद्रीय मरीज पंजीकरण एवं सहायता केंद्र',
    categoryId: 'reception',
    categoryName: 'Reception & Lobby',
    hindiCategoryName: 'रिसेप्शन व लाउंज',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=600&q=80',
    altText: 'Spacious patient registration desk with digital token display',
    hindiAltText: 'डिजिटल टोकन व्यवस्था से युक्त विशाल पंजीकरण रिसेप्शन लाउंज',
    description: 'Air-conditioned main reception equipped with bilingual electronic token management, May I Help You desks, and comfortable seating for 300+ visitors.',
    hindiDescription: 'वातानुकूलित मुख्य रिसेप्शन लाउंज, जिसमें डिजिटल टोकन प्रणाली और मरीजों की त्वरित सहायता हेतु हेल्पडेस्क उपलब्ध है।',
  },
  {
    id: 'img-rec-2',
    title: 'Executive OPD Consultation Waiting Lounge',
    hindiTitle: 'ओपीडी परामर्श प्रतीक्षालय एवं कैफेटेरिया',
    categoryId: 'reception',
    categoryName: 'Reception & Lobby',
    hindiCategoryName: 'रिसेप्शन व लाउंज',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=600&q=80',
    altText: 'Clean modern waiting lounge for outpatient consultations',
    hindiAltText: 'ओपीडी मरीजों एवं परिजनों के बैठने हेतु स्वच्छ व शांत प्रतीक्षालय',
    description: 'Tranquil seating wing featuring digital appointment status screens, reading materials, and sanitized drinking water stations.',
    hindiDescription: 'मरीजों की सुविधा के लिए डिजिटल टोकन स्क्रीन और आरामदायक कुर्सियों से सुसज्जित प्रतीक्षा क्षेत्र।',
  },

  // 3. Patient Rooms
  {
    id: 'img-rm-1',
    title: 'Presidential Deluxe Patient Suite',
    hindiTitle: 'प्रेसिडेंशियल डीलक्स प्राइवेट पेशेंट सुइट',
    categoryId: 'rooms',
    categoryName: 'Patient Rooms',
    hindiCategoryName: 'मरीज कक्ष व सुइट्स',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=600&q=80',
    altText: 'Executive patient room with motorized bed, sofa for attendant and private bath',
    hindiAltText: 'मोटराइज्ड बेड, अटेंडेंट सोफा और प्राइवेट वॉशरुम से सुसज्जित डीलक्स कमरा',
    description: 'Featuring electronic motorized Hill-Rom beds, nurse call intercoms, companion sofa beds, smart television, and private en-suite sanitized bathrooms.',
    hindiDescription: 'इलेक्ट्रॉनिक रिमोट-नियंत्रित बेड, नर्स कॉल सिस्टम, अटेंडेंट सोफा और निजी वॉशरूम युक्त डीलक्स कमरा।',
    featured: true,
  },
  {
    id: 'img-rm-2',
    title: 'Twin-Sharing Inpatient Recovery Ward',
    hindiTitle: 'ट्विन शेयरिंग सेमी-प्राइवेट वार्ड',
    categoryId: 'rooms',
    categoryName: 'Patient Rooms',
    hindiCategoryName: 'मरीज कक्ष व सुइट्स',
    image: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&w=600&q=80',
    altText: 'Twin sharing hospital room with privacy curtains and monitoring',
    hindiAltText: 'गोपनीयता कर्टन और मॉनिटरिंग से युक्त ट्विन शेयरिंग वार्ड',
    description: 'Spacious semi-private rooms separated by acoustic privacy curtains, each station equipped with dedicated oxygen and suction ports.',
    hindiDescription: 'मरीज की गोपनीयता हेतु मेडिकल कर्टन और अलग ऑक्सीजन पोर्ट से युक्त आरामदायक ट्विन वार्ड।',
  },

  // 4. ICU and NICU
  {
    id: 'img-icu-1',
    title: 'Multi-Disciplinary Critical Care Unit (ICU)',
    hindiTitle: 'मल्टी-स्पेशलिटी क्रिटिकल केयर आईसीयू (ICU)',
    categoryId: 'icu-nicu',
    categoryName: 'ICU and NICU',
    hindiCategoryName: 'आईसीयू एवं एनआईसीयू',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
    altText: 'Advanced Intensive Care Unit with ventilators and central hemodynamics telemetry',
    hindiAltText: 'आधुनिक वेंटिलेटर और टेलीमेट्री मॉनिटरिंग से सुसज्जित गहन चिकित्सा इकाई',
    description: '1:1 patient-to-nurse ratio, Maquet advanced servo-ventilators, continuous cardiac telemetry, and negative-pressure isolation pods.',
    hindiDescription: '1:1 नर्स-मरीज अनुपात, आधुनिक वेंटिलेटर और चौबीसों घंटे वरिष्ठ क्रिटिकल केयर चिकित्सकों की निगरानी।',
    featured: true,
  },
  {
    id: 'img-icu-2',
    title: 'Level-3 Neonatal Intensive Care Unit (NICU)',
    hindiTitle: 'लेवल-3 नवजात शिशु गहन चिकित्सा इकाई (NICU)',
    categoryId: 'icu-nicu',
    categoryName: 'ICU and NICU',
    hindiCategoryName: 'आईसीयू एवं एनआईसीयू',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
    altText: 'Giraffe neonatal incubator in sterile level-3 NICU unit',
    hindiAltText: 'लेवल-3 एनआईसीयू में सुरक्षित इन्क्यूबेटर और नवजात मॉनिटरिंग सिस्टम',
    description: 'Temperature-controlled GE Giraffe incubators, high-frequency oscillatory ventilators (HFOV), and total parenteral nutrition (TPN) for extreme preterm babies.',
    hindiDescription: 'अति-अपरिपक्व और कम वजन वाले नवजात शिशुओं की जीवन रक्षा हेतु अत्याधुनिक इन्क्यूबेटर्स व वेंटिलेटर।',
  },

  // 5. Operation Theatre
  {
    id: 'img-ot-1',
    title: 'Ultra-Clean Class-100 Modular Operation Theatre',
    hindiTitle: 'क्लास-100 लैमिनार एयरफ्लो मॉड्यूलर ऑपरेशन थिएटर',
    categoryId: 'ot',
    categoryName: 'Operation Theatre',
    hindiCategoryName: 'मॉड्यूलर ऑपरेशन थिएटर',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=80',
    altText: 'State of the art modular surgical theatre with ceiling pendants and shadowless LED surgical lights',
    hindiAltText: 'आधुनिक सीलिंग पेंडेंट और शैडोलैस लाइट से सुसज्जित मॉड्यूलर सर्जिकल थिएटर',
    description: 'Seamless anti-microbial wall cladding, HEPA filtration with 25 air changes/hour, and touch-free surgical scrub stations ensuring zero-infection surgical suites.',
    hindiDescription: 'हेपा फिल्टर और लैमिनार एयरफ्लो युक्त 100% संक्रमण-मुक्त मॉड्यूलर सर्जिकल थिएटर।',
    featured: true,
  },
  {
    id: 'img-ot-2',
    title: 'Robotic-Assisted Joint & Laparoscopic Surgical Suite',
    hindiTitle: 'रोबोटिक एवं लेप्रोस्कोपिक सर्जरी सुइट',
    categoryId: 'ot',
    categoryName: 'Operation Theatre',
    hindiCategoryName: 'मॉड्यूलर ऑपरेशन थिएटर',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    altText: 'Surgeons operating with 4K Karl Storz laparoscopic video towers',
    hindiAltText: '4K लेप्रोस्कोपिक टावर और रोबोटिक आर्म से सर्जरी करते वरिष्ठ सर्जन',
    description: '4K Ultra-HD endoscopic video columns and computer-mapped robotic arm consoles for pinhole minimally invasive surgery.',
    hindiDescription: '4K अल्ट्रा-एचडी विजन और रोबोटिक कंसोल के साथ दूरबीन विधि से जटिल ऑपरेशनों का निष्पादन।',
  },

  // 6. Medical Equipment
  {
    id: 'img-eq-1',
    title: 'Philips Azurion Biplane Cardiac Cath Lab',
    hindiTitle: 'फिलिप्स अज़्यूरियन बाइप्लेन कार्डियक कैथ लैब',
    categoryId: 'equipment',
    categoryName: 'Medical Equipment',
    hindiCategoryName: 'उन्नत चिकित्सा उपकरण',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
    altText: 'Philips Biplane catheterization laboratory for emergency primary angioplasty',
    hindiAltText: 'हार्ट अटैक में आपातकालीन एंजियोप्लास्टी हेतु आधुनिक कैथ लैब मशीन',
    description: 'High-precision dual-plane fluoroscopy enabling complex coronary stenting, TAVR valve implants, and neurovascular stroke interventions with minimal radiation.',
    hindiDescription: 'न्यूनतम रेडिएशन और उच्च सटीकता के साथ एंजियोप्लास्टी और स्टेंटिंग करने वाली आधुनिक कैथ लैब।',
    featured: true,
  },
  {
    id: 'img-eq-2',
    title: 'Siemens Magnetom 3 Tesla Silent MRI System',
    hindiTitle: 'सीमेंस 3 टेस्ला साइलेंट एमआरआई स्कैनर',
    categoryId: 'equipment',
    categoryName: 'Medical Equipment',
    hindiCategoryName: 'उन्नत चिकित्सा उपकरण',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
    altText: 'Siemens 3T Silent MRI machine with wide bore for claustrophobia-free scanning',
    hindiAltText: '70 सेमी चौड़े बोर युक्त 3 टेस्ला साइलेंट एमआरआई मशीन',
    description: 'Featuring acoustic reduction technology, wide 70 cm gantry bore, and sub-millimeter neuro-musculoskeletal anatomical resolution.',
    hindiDescription: 'बिना शोर के 70 सेमी चौड़े बोर में मस्तिष्क, रीढ़ और जोड़ों की सूक्ष्म जांच करने वाला 3T एमआरआई।',
  },

  // 7. Doctors and Medical Staff
  {
    id: 'img-stf-1',
    title: 'Senior Cardiology Faculty & Critical Care Team',
    hindiTitle: 'वरिष्ठ हृदय रोग विशेषज्ञ एवं क्रिटिकल केयर कंसल्टेंट',
    categoryId: 'staff',
    categoryName: 'Doctors and Medical Staff',
    hindiCategoryName: 'डॉक्टर एवं चिकित्सा दल',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    altText: 'Chief Interventional Cardiologist examining diagnostic angiograms with fellow physicians',
    hindiAltText: 'मुख्य हृदय रोग विशेषज्ञ डॉक्टरों की टीम के साथ एंजियोग्राफी की समीक्षा करते हुए',
    description: 'Our senior clinicians bring 20+ years of verified clinical experience across AIIMS, PGI, and premier international medical institutions.',
    hindiDescription: 'एम्स और अंतरराष्ट्रीय संस्थानों से प्रशिक्षित हमारे वरिष्ठ डॉक्टरों का 20+ वर्षों का अनुभव।',
  },
  {
    id: 'img-stf-2',
    title: 'Compassionate Inpatient Nursing & Clinical Care Staff',
    hindiTitle: 'समर्पित एवं प्रशिक्षित नर्सिंग केयर दल',
    categoryId: 'staff',
    categoryName: 'Doctors and Medical Staff',
    hindiCategoryName: 'डॉक्टर एवं चिकित्सा दल',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    altText: 'Janhit Hospital nurses conducting vital signs monitoring at bedside',
    hindiAltText: 'मरीज के बिस्तर पर वाइटल्स दर्ज करती हुई जनहित हॉस्पिटल की स्टाफ नर्स',
    description: 'BLS and ACLS certified nursing specialists providing round-the-clock compassionate patient bedside care.',
    hindiDescription: 'बीएलएस एवं एसीएलएस प्रमाणित नर्सिंग स्टाफ जो 24 घंटे मरीजों की आत्मीय देखभाल करते हैं।',
  },

  // 8. Hospital Events
  {
    id: 'img-evt-1',
    title: 'National Cardiology & Interventional Stroke Conclave 2026',
    hindiTitle: 'राष्ट्रीय कार्डियोलॉजी एवं न्यूरो-स्ट्रोक महासम्मेलन 2026',
    categoryId: 'events',
    categoryName: 'Hospital Events',
    hindiCategoryName: 'अस्पताल कार्यक्रम व सेमिनार',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
    altText: 'Medical conference auditorium with doctors attending clinical presentation',
    hindiAltText: 'अस्पताल ऑडिटोरियम में आयोजित राष्ट्रीय चिकित्सक सम्मेलन',
    description: 'Over 400 national delegates gathered at Janhit Auditorium discussing breakthroughs in robotic angioplasty and stroke thrombectomy.',
    hindiDescription: 'जनहित ऑडिटोरियम में 400+ चिकित्सकों की उपस्थिति में रोबोटिक सर्जरी पर आयोजित राष्ट्रीय सम्मेलन।',
  },
  {
    id: 'img-evt-2',
    title: 'World Heart Day Public Awareness Symposium',
    hindiTitle: 'विश्व हृदय दिवस जन-जागरूकता एवं सीपीआर प्रशिक्षण',
    categoryId: 'events',
    categoryName: 'Hospital Events',
    hindiCategoryName: 'अस्पताल कार्यक्रम व सेमिनार',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80',
    altText: 'Hands-on CPR training session conducted for school teachers and police personnel',
    hindiAltText: 'आम नागरिकों व पुलिस कर्मियों को हैंड्स-ऑन सीपीआर प्रशिक्षण देते डॉक्टर',
    description: 'Hands-on basic life support (BLS) and CPR workshops conducted free of cost for citizens, students, and first responders.',
    hindiDescription: 'आम नागरिकों को अचानक कार्डियक अरेस्ट से निपटने हेतु हैंड्स-ऑन सीपीआर की लाइव ट्रेनिंग।',
  },

  // 9. Health Camps
  {
    id: 'img-cmp-1',
    title: 'Community Free Cardiac & Diabetes Screening Camp',
    hindiTitle: 'निःशुल्क हृदय एवं मधुमेह स्वास्थ्य जांच शिविर',
    categoryId: 'camps',
    categoryName: 'Health Camps',
    hindiCategoryName: 'निःशुल्क स्वास्थ्य शिविर',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80',
    altText: 'Doctors examining elderly patients in rural community medical camp',
    hindiAltText: 'सामुदायिक स्वास्थ्य शिविर में वरिष्ठ नागरिकों की जांच करते चिकित्सक',
    description: 'Free blood glucose, ECG, lipid tests, and physician consultations provided to over 1,200 rural families under Janhit Seva initiative.',
    hindiDescription: 'जनहित सेवा पहल के अंतर्गत 1,200 से अधिक नागरिकों की निःशुल्क ईसीजी, शुगर और बीपी जांच।',
    featured: true,
  },
  {
    id: 'img-cmp-2',
    title: 'Voluntary Blood Donation Drive & Bone Density Camp',
    hindiTitle: 'रक्तदान महाअभियान एवं निःशुल्क बोन डेंसिटी (BMD) जांच',
    categoryId: 'camps',
    categoryName: 'Health Camps',
    hindiCategoryName: 'निःशुल्क स्वास्थ्य शिविर',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    altText: 'Voluntary blood donors in hospital blood bank wing',
    hindiAltText: 'अस्पताल के ब्लड बैंक में रक्तदान करते हुए स्वयंसेवी नागरिक',
    description: 'Collecting over 250 units of voluntary whole blood for emergency trauma victims and pediatric thalassemia care.',
    hindiDescription: 'इमरजेंसी ट्रॉमा मरीजों और थैलेसीमिया पीड़ित बच्चों के लिए 250+ यूनिट स्वैच्छिक रक्तदान।',
  },
];

/* ========================================================================= */
/* 3. DEDICATED VIDEO GALLERY ITEMS                                          */
/* ========================================================================= */
export const GALLERY_VIDEOS: GalleryVideoItem[] = [
  {
    id: 'vid-1',
    title: 'Janhit Hospital 3D Campus Tour & Infrastructure Walkthrough',
    hindiTitle: 'जनहित हॉस्पिटल 3D कैंपस टूर एवं इन्फ्रास्ट्रक्चर दृश्य',
    thumbnail: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=800&q=80',
    duration: '04:15 Min',
    category: 'Campus Tour',
    hindiCategory: 'कैंपस टूर',
    description: 'A comprehensive virtual tour showcasing our 500-bed facility, emergency trauma bays, modular OTs, and diagnostic suites.',
    hindiDescription: '500-बेड के आधुनिक अस्पताल परिसर, आपातकालीन ट्रॉमा वार्ड और डायग्नोस्टिक विंग का वर्चुअल वीडियो टूर।',
    youtubeId: 'M7lc1UVf-VE',
  },
  {
    id: 'vid-2',
    title: 'Robotic Knee Replacement: Live OT Demonstration & Patient Mobility',
    hindiTitle: 'रोबोटिक घुटना रिप्लेसमेंट: लाइव ओटी प्रदर्शन एवं मरीज का अनुभव',
    thumbnail: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80',
    duration: '05:30 Min',
    category: 'Surgical Excellence',
    hindiCategory: 'सर्जिकल तकनीक',
    description: 'Dr. Rajesh Singh explains sub-millimeter robotic arm precision and demonstrates a patient walking pain-free 24 hours post-surgery.',
    hindiDescription: 'डॉ. राजेश सिंह द्वारा रोबोटिक तकनीक की सटीकता और ऑपरेशन के अगले दिन मरीज के चलने का लाइव वीडियो।',
    youtubeId: 'ScMzIvxBSi4',
  },
  {
    id: 'vid-3',
    title: 'Level-3 NICU Care: Caring for Preterm Newborns Like Family',
    hindiTitle: 'लेवल-3 एनआईसीयू: समय पूर्व जन्मे शिशुओं की जीवन रक्षक देखभाल',
    thumbnail: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    duration: '03:45 Min',
    category: 'Pediatrics',
    hindiCategory: 'शिशु स्वास्थ्य',
    description: 'Experience how our neonatologists and sterile incubator pods nurtured a 31-week preterm infant back to vibrant health.',
    hindiDescription: '31वें सप्ताह में जन्मे नवजात शिशु की एनआईसीयू में 24 दिनों की सफल जीवन रक्षक देखभाल की कहानी।',
    youtubeId: 'ysz5S6PUM-U',
  },
  {
    id: 'vid-4',
    title: 'Emergency Primary Angioplasty: The Critical 20-Minute Golden Hour Protocol',
    hindiTitle: 'आपातकालीन प्राइमरी एंजियोप्लास्टी: 20 मिनट के भीतर जीवन रक्षा',
    thumbnail: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    duration: '04:50 Min',
    category: 'Emergency Care',
    hindiCategory: 'आपातकालीन सेवा',
    description: 'Inside our 24/7 Cath Lab: How rapid door-to-balloon time saves lives during sudden acute myocardial infarction.',
    hindiDescription: 'सीने में दर्द होने पर 20 मिनट के भीतर कैथ लैब में एंजियोप्लास्टी कर मरीज की जान बचाने का आपातकालीन प्रोटोकॉल।',
    youtubeId: 'jNQXAC9IVRw',
  },
];

