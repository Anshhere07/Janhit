import { PrismaClient, Role, AppointmentStatus, BlogStatus, EnquiryStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Janhit Hospital Database Seed...');

  // 1. Clean existing records (in reverse dependency order)
  await prisma.auditLog.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.appointmentSlot.deleteMany();
  await prisma.treatment.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.department.deleteMany();
  await prisma.facility.deleteMany();
  await prisma.blog.deleteMany();
  await prisma.blogCategory.deleteMany();
  await prisma.galleryItem.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.contactEnquiry.deleteMany();
  await prisma.websiteSetting.deleteMany();
  await prisma.adminUser.deleteMany();

  // 2. Hash default admin passwords
  const defaultPassword = 'JanhitAdmin@2026';
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(defaultPassword, salt);

  // 3. Seed Admin Users
  console.log('👤 Seeding Admin Users...');
  const superAdmin = await prisma.adminUser.create({
    data: {
      name: 'Dr. Ramesh Sharma (Medical Director)',
      email: 'superadmin@janhithospital.com',
      passwordHash,
      role: Role.SUPER_ADMIN,
      phone: '+91-98100-11223',
      isActive: true,
    },
  });

  await prisma.adminUser.createMany({
    data: [
      {
        name: 'Dr. Anita Desai (Admin Head)',
        email: 'admin@janhithospital.com',
        passwordHash,
        role: Role.ADMIN,
        phone: '+91-98100-22334',
        isActive: true,
      },
      {
        name: 'Sunita Verma (Front Desk Manager)',
        email: 'reception@janhithospital.com',
        passwordHash,
        role: Role.RECEPTIONIST,
        phone: '+91-98100-33445',
        isActive: true,
      },
      {
        name: 'Vikram Seth (Medical Writer)',
        email: 'editor@janhithospital.com',
        passwordHash,
        role: Role.CONTENT_EDITOR,
        phone: '+91-98100-44556',
        isActive: true,
      },
    ],
  });

  // 4. Seed Departments
  console.log('🏥 Seeding Clinical Departments...');
  const cardio = await prisma.department.create({
    data: {
      slug: 'cardiology',
      nameEn: 'Cardiology & Cardiac Surgery',
      nameHi: 'हृदय रोग एवं कार्डियक सर्जरी',
      shortIntroEn: 'Comprehensive cardiac care with digital cath lab, non-invasive diagnostics, and coronary interventions.',
      shortIntroHi: 'डिजिटल कैथ लैब, नॉन-इनवेसिव डायग्नोस्टिक्स और कोरोनरी इंटरवेंशन के साथ संपूर्ण हृदय देखभाल।',
      overviewEn: 'Our Cardiology department features state-of-the-art diagnostic and interventional coronary equipment with 24/7 primary angioplasty support.',
      overviewHi: 'हमारा कार्डियोलॉजी विभाग 24/7 प्राथमिक एंजियोप्लास्टी सहायता के साथ अत्याधुनिक डायग्नोस्टिक और इंटरवेंशनल कोरोनरी उपकरणों से लैस है।',
      icon: 'HeartPulse',
      bannerImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
      bedCapacity: 45,
      opdSchedule: '08:00 AM - 08:00 PM',
      emergencyAvailable: true,
      servicesEn: ['Digital Flat Panel Cath Lab', '24/7 Primary Angioplasty (PAMI)', 'Coronary Artery Bypass (CABG)', 'Pacemaker & ICD Implantation', 'Echocardiography (2D/3D & TEE)'],
      servicesHi: ['डिजिटल फ्लैट पैनल कैथ लैब', '24/7 प्राइमरी एंजियोप्लास्टी', 'कोरोनरी बाईपास सर्जरी (CABG)', 'पेसमेकर एवं आईसीडी इम्प्लांटेशन', '2D/3D इकोकार्डियोग्राफी'],
      conditionsEn: ['Coronary Artery Disease', 'Heart Failure', 'Arrhythmias', 'Valvular Heart Disease', 'Hypertensive Emergencies'],
      conditionsHi: ['कोरोनरी धमनी रोग', 'हार्ट फेलियर', 'अतालता (एरिद्मिया)', 'हृदय वाल्व रोग', 'उच्च रक्तचाप आपात स्थिति'],
      orderIndex: 1,
    },
  });

  const neuro = await prisma.department.create({
    data: {
      slug: 'neurology',
      nameEn: 'Neurology & Neuro Surgery',
      nameHi: 'न्यूरोलॉजी एवं न्यूरो सर्जरी',
      shortIntroEn: 'Advanced neurological medicine, acute stroke thrombolysis, and minimally invasive spine surgeries.',
      shortIntroHi: 'उन्नत न्यूरोलॉजिकल मेडिसिन, एक्यूट स्ट्रोक थ्रोम्बोलिसिस और मिनिमली इनवेसिव स्पाइन सर्जरी।',
      overviewEn: 'Dedicated neuro intensive care with intraoperative neuro-monitoring and comprehensive rehabilitation.',
      overviewHi: 'इंट्राऑपरेटिव न्यूरो-मॉनिटरिंग और संपूर्ण पुनर्वास के साथ समर्पित न्यूरो इंटेंसिव केयर।',
      icon: 'Brain',
      bannerImage: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80',
      bedCapacity: 35,
      opdSchedule: '09:00 AM - 06:00 PM',
      emergencyAvailable: true,
      servicesEn: ['Hyperacute Stroke Unit', 'Microscopic Brain Surgery', 'Minimally Invasive Spine Surgery', 'Digital Video EEG & EMG', 'Epilepsy & Parkinson Care'],
      servicesHi: ['हाइपरएक्यूट स्ट्रोक यूनिट', 'माइक्रोस्कोपिक ब्रेन सर्जरी', 'दूरबीन स्पाइन सर्जरी', 'डिजिटल वीडियो ईईजी एवं ईएमजी', 'मिर्गी व पार्किंसंस केयर'],
      conditionsEn: ['Acute Ischemic Stroke', 'Brain Tumours', 'Herniated Disc & Sciatica', 'Epilepsy & Seizures', 'Parkinson Disease'],
      conditionsHi: ['एक्यूट इस्केमिक स्ट्रोक', 'ब्रेन ट्यूमर', 'स्लिप डिस्क एवं साइटिका', 'मिर्गी के दौरे', 'पार्किंसन रोग'],
      orderIndex: 2,
    },
  });

  const ortho = await prisma.department.create({
    data: {
      slug: 'orthopaedics',
      nameEn: 'Orthopaedics & Joint Replacement',
      nameHi: 'हड्डी रोग एवं जोड़ प्रत्यारोपण',
      shortIntroEn: 'Robotic-assisted joint replacement, sports medicine, arthroscopy, and complex trauma reconstruction.',
      shortIntroHi: 'रोबोटिक जोड़ प्रत्यारोपण, स्पोर्ट्स मेडिसिन, आर्थ्रोस्कोपी और जटिल ट्रॉमा पुनर्निर्माण।',
      overviewEn: 'Specialized orthopaedic care utilizing zero-infection modular operation theatres and rapid recovery protocols.',
      overviewHi: 'शून्य-संक्रमण मॉड्यूलर ऑपरेशन थिएटर और त्वरित रिकवरी प्रोटोकॉल के साथ विशेष हड्डी रोग देखभाल।',
      icon: 'Bone',
      bannerImage: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
      bedCapacity: 40,
      opdSchedule: '08:00 AM - 07:00 PM',
      emergencyAvailable: true,
      servicesEn: ['Computer-Navigated Knee Replacement', 'Total Hip Replacement', 'Shoulder & Knee Arthroscopy', 'Complex Poly-trauma Fixation', 'Pediatric Orthopaedics'],
      servicesHi: ['कंप्यूटर-नेविगेटेड घुटना प्रत्यारोपण', 'कूल्हा प्रत्यारोपण', 'दूरबीन द्वारा जोड़ सर्जरी', 'जटिल फ्रैक्चर एवं ट्रॉमा सर्जरी', 'बाल हड्डी रोग'],
      conditionsEn: ['Osteoarthritis', 'Ligament Tears (ACL/PCL)', 'Rheumatoid Arthritis', 'Bone Fractures', 'Spinal Deformities'],
      conditionsHi: ['गठिया (ऑस्टियोआर्थराइटिस)', 'लिगामेंट टूटना', 'रूमेटाइड आर्थराइटिस', 'हड्डी फ्रैक्चर', 'रीढ़ की विकृति'],
      orderIndex: 3,
    },
  });

  // 5. Seed Doctors
  console.log('🩺 Seeding Doctors...');
  const docSharma = await prisma.doctor.create({
    data: {
      slug: 'dr-ramesh-sharma',
      nameEn: 'Dr. Ramesh Sharma',
      nameHi: 'डॉ. रमेश शर्मा',
      departmentId: cardio.id,
      qualifications: 'MBBS, MD (General Medicine), DM (Cardiology), FACC',
      specializationEn: 'Senior Consultant & Chief Interventional Cardiologist',
      specializationHi: 'वरिष्ठ हृदय रोग विशेषज्ञ एवं चीफ इंटरवेंशनल कार्डियोलॉजिस्ट',
      experienceYears: 24,
      consultationFee: 1000,
      photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
      bioEn: 'Over 24 years of clinical excellence in complex coronary angioplasty, radial access procedures, and structural heart interventions.',
      bioHi: 'जटिल कोरोनरी एंजियोप्लास्टी, रेडियल एक्सेस प्रक्रियाओं और स्ट्रक्चरल हार्ट इंटरवेंशन में 24 से अधिक वर्षों का विशिष्ट अनुभव।',
      expertiseEn: ['Complex Bifurcation Angioplasty', 'TAVR / TAVI Procedures', 'Permanent Pacemaker Implantation', 'Heart Failure Management'],
      expertiseHi: ['जटिल कोरोनरी एंजियोप्लास्टी', 'TAVR / TAVI प्रक्रिया', 'स्थायी पेसमेकर प्रत्यारोपण', 'हार्ट फेलियर उपचार'],
      opdDays: ['Monday', 'Wednesday', 'Friday'],
      opdTime: '10:00 AM - 02:00 PM',
      roomNumber: 'OPD-102 (Cath Wing)',
      isHeadOfDepartment: true,
      isAvailableForBooking: true,
      orderIndex: 1,
    },
  });

  const docAnita = await prisma.doctor.create({
    data: {
      slug: 'dr-anita-desai',
      nameEn: 'Dr. Anita Desai',
      nameHi: 'डॉ. अनिता देसाई',
      departmentId: neuro.id,
      qualifications: 'MBBS, MS (General Surgery), MCh (Neuro Surgery), FINR',
      specializationEn: 'Chief Neurosurgeon & Spine Care Specialist',
      specializationHi: 'मुख्य न्यूरोसर्जन एवं स्पाइन केयर विशेषज्ञ',
      experienceYears: 19,
      consultationFee: 1000,
      photoUrl: 'https://images.unsplash.com/photo-1594824813589-3543d3b65554?auto=format&fit=crop&w=600&q=80',
      bioEn: 'Renowned neurosurgeon specializing in micro-neurosurgery, brain aneurysm clipping, and endoscopic skull-base procedures.',
      bioHi: 'माइक्रो-न्यूरोसर्जरी, ब्रेन एन्यूरिज्म और एंडोस्कोपिक स्कल-बेस प्रक्रियाओं में 19 वर्षों से अधिक का प्रतिष्ठित अनुभव।',
      expertiseEn: ['Microscopic Brain Tumour Excision', 'Endoscopic Spine Surgery', 'Cerebrovascular Surgery', 'Pediatric Neurosurgery'],
      expertiseHi: ['माइक्रोस्कोपिक ब्रेन ट्यूमर सर्जरी', 'एंडोस्कोपिक स्पाइन सर्जरी', 'सेरेब्रोवास्कुलर सर्जरी', 'बाल न्यूरोसर्जरी'],
      opdDays: ['Tuesday', 'Thursday', 'Saturday'],
      opdTime: '11:00 AM - 03:00 PM',
      roomNumber: 'OPD-204 (Neuro Suite)',
      isHeadOfDepartment: true,
      isAvailableForBooking: true,
      orderIndex: 2,
    },
  });

  const docVerma = await prisma.doctor.create({
    data: {
      slug: 'dr-vikram-verma',
      nameEn: 'Dr. Vikram Verma',
      nameHi: 'डॉ. विक्रम वर्मा',
      departmentId: ortho.id,
      qualifications: 'MBBS, MS (Orthopaedics), MCh (Orth), Fellowship in Joint Replacement (Germany)',
      specializationEn: 'Director & Chief Robotic Joint Replacement Surgeon',
      specializationHi: 'निदेशक एवं मुख्य रोबोटिक जोड़ प्रत्यारोपण सर्जन',
      experienceYears: 21,
      consultationFee: 900,
      photoUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
      bioEn: 'Pioneer in robotic-assisted knee and hip arthroplasty with over 10,000 successful joint surgeries conducted with rapid rehabilitation.',
      bioHi: '10,000 से अधिक सफल संयुक्त प्रत्यारोपण करने वाले रोबोटिक नी और हिप आर्थ्रोप्लास्टी के अग्रणी विशेषज्ञ।',
      expertiseEn: ['Robotic Total Knee Arthroplasty', 'Direct Anterior Hip Replacement', 'Revision Joint Replacement', 'Sports Arthroscopy'],
      expertiseHi: ['रोबोटिक टोटल नी रिप्लेसमेंट', 'डायरेक्ट एंटीरियर हिप रिप्लेसमेंट', 'रिवीजन जॉइंट रिप्लेसमेंट', 'स्पोर्ट्स आर्थ्रोस्कोपी'],
      opdDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
      opdTime: '09:30 AM - 01:30 PM',
      roomNumber: 'OPD-108 (Ortho Wing)',
      isHeadOfDepartment: true,
      isAvailableForBooking: true,
      orderIndex: 3,
    },
  });

  // 6. Seed Sample Appointments
  console.log('📅 Seeding Appointments...');
  await prisma.appointment.createMany({
    data: [
      {
        referenceNumber: 'APT-2026-1001',
        patientName: 'Rajesh Kumar Aggarwal',
        mobileNumber: '9811002233',
        email: 'rajesh.aggarwal@gmail.com',
        patientAge: 58,
        patientGender: 'male',
        departmentId: cardio.id,
        doctorId: docSharma.id,
        appointmentDate: '2026-11-05',
        preferredTime: '10:30 AM',
        consultationType: 'in-person',
        reason: 'Follow-up consultation after cardiac stent evaluation.',
        status: AppointmentStatus.CONFIRMED,
        adminNotes: 'Patient advised to bring recent ECG and Lipid profile reports.',
        confirmedAt: new Date(),
      },
      {
        referenceNumber: 'APT-2026-1002',
        patientName: 'Meena Devi Sharma',
        mobileNumber: '9876543210',
        email: 'meena.sharma@yahoo.com',
        patientAge: 46,
        patientGender: 'female',
        departmentId: neuro.id,
        doctorId: docAnita.id,
        appointmentDate: '2026-11-06',
        preferredTime: '11:45 AM',
        consultationType: 'in-person',
        reason: 'Severe persistent migraine and cervical spine numbness.',
        status: AppointmentStatus.PENDING,
      },
      {
        referenceNumber: 'APT-2026-1003',
        patientName: 'Devendra Singh',
        mobileNumber: '9822114455',
        email: 'devendra.s@outlook.com',
        patientAge: 64,
        patientGender: 'male',
        departmentId: ortho.id,
        doctorId: docVerma.id,
        appointmentDate: '2026-11-07',
        preferredTime: '10:00 AM',
        consultationType: 'in-person',
        reason: 'Bilateral knee joint pain causing walking difficulty.',
        status: AppointmentStatus.CONFIRMED,
        confirmedAt: new Date(),
      },
    ],
  });

  // 7. Seed Blog Categories & Blogs
  console.log('📝 Seeding Health Blogs...');
  const catHeart = await prisma.blogCategory.create({
    data: {
      slug: 'heart-health',
      nameEn: 'Cardiovascular Wellness',
      nameHi: 'हृदय स्वास्थ्य',
      description: 'Medical insights on heart diseases, hypertension prevention, and cardiac lifestyle habits.',
    },
  });

  await prisma.blog.create({
    data: {
      slug: 'silent-heart-attack-signs-prevention',
      titleEn: 'Silent Heart Attacks: Warning Signs, Risk Factors & Life-Saving Action',
      titleHi: 'साइलेंट हार्ट अटैक: प्रारंभिक लक्षण, जोखिम कारक और बचाव के उपाय',
      excerptEn: 'Learn how to detect atypical heart attack symptoms such as unexplained fatigue, shortness of breath, and jaw discomfort before it turns critical.',
      excerptHi: 'जानिए बिना तेज सीने के दर्द वाले साइलेंट हार्ट अटैक के असामान्य लक्षण जैसे अचानक सांस फूलना, असामान्य थकान व जबड़े का दर्द।',
      contentEn: `Cardiovascular disease remains the leading cause of mortality worldwide. While cinematic depictions of a heart attack involve clutching the chest in agony, nearly one out of every five myocardial infarctions occurs without noticeable acute pain—a phenomenon medically termed a silent myocardial infarction (SMI).

### Key Subtle Symptoms:
1. **Unexplained Shortness of Breath**: Breathlessness during mild exertion.
2. **Prolonged Discomfort in the Jaw or Back**: Pain radiating upwards.
3. **Cold Sweats & Sudden Dizziness**: Sudden autonomic activation.
4. **Severe Indigestion**: Burning sensations misattributed to gastric reflux.

### Preventative Golden Rules:
- Schedule yearly lipid profiles and coronary CT calcium scoring after age 40.
- Maintain blood pressure strictly below 120/80 mmHg.
- Exercise 30 minutes daily with cardiovascular aerobic routines.`,
      contentHi: `हृदय रोग विश्व भर में मृत्यु का सबसे प्रमुख कारण है। अक्सर हम मानते हैं कि दिल का दौरा पड़ने पर सीने में असहनीय दर्द होता है, लेकिन चिकित्सा अध्ययनों के अनुसार लगभग 20% दिल के दौरे बिना किसी तीखे दर्द के आते हैं, जिन्हें 'साइलेंट हार्ट अटैक' (Silent MI) कहा जाता है।

### प्रमुख सूक्ष्म लक्षण:
1. **असामान्य सांस फूलना**: हल्का काम करने पर भी सांस का फूलना।
2. **जबड़े या गर्दन में लगातार खिंचाव**: दर्द जो सीने से जबड़े या पीठ की ओर जाता है।
3. **अचानक अत्यधिक ठंडा पसीना व चक्कर**: बिना किसी शारीरिक परिश्रम के पसीना आना।
4. **गैस या अपच जैसा भारीपन**: जिसे मरीज अक्सर साधारण एसिडिटी समझ लेते हैं।`,
      featuredImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
      author: 'Dr. Ramesh Sharma',
      authorRole: 'Chief Interventional Cardiologist',
      categorySlug: catHeart.slug,
      readTimeEn: '6 min read',
      readTimeHi: '6 मिनट',
      status: BlogStatus.PUBLISHED,
      metaTitle: 'Silent Heart Attack Symptoms & Prevention | Janhit Hospital',
      metaDescription: 'Learn to detect silent heart attacks early. Verified guide by Dr. Ramesh Sharma at Janhit Hospital.',
      viewCount: 1240,
    },
  });

  // 8. Seed Gallery Items
  console.log('🖼️ Seeding Gallery Media...');
  await prisma.galleryItem.createMany({
    data: [
      {
        titleEn: 'Main Hospital Tower & Emergency Entrance',
        titleHi: 'मुख्य अस्पताल भवन एवं 24/7 आपातकालीन प्रवेश द्वार',
        category: 'building',
        imageUrl: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80',
        mediaType: 'image',
        isFeatured: true,
        orderIndex: 1,
      },
      {
        titleEn: 'Central OPD Helpdesk & Registration Lobby',
        titleHi: 'सेंट्रल ओपीडी हेल्पडेस्क एवं मरीज पंजीकरण लॉबी',
        category: 'reception',
        imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
        mediaType: 'image',
        isFeatured: true,
        orderIndex: 2,
      },
      {
        titleEn: 'Level-3 Advanced Neonatal ICU (NICU)',
        titleHi: 'लेवल-3 आधुनिक नवजात शिशु गहन चिकित्सा इकाई (NICU)',
        category: 'icu-nicu',
        imageUrl: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
        mediaType: 'image',
        isFeatured: true,
        orderIndex: 3,
      },
      {
        titleEn: 'Modular Laminar Airflow Operation Theatre',
        titleHi: 'मॉड्यूलर लैमिनार एयरफ्लो ऑपरेशन थिएटर',
        category: 'ot',
        imageUrl: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80',
        mediaType: 'image',
        isFeatured: true,
        orderIndex: 4,
      },
    ],
  });

  // 9. Seed Contact Enquiries
  console.log('📬 Seeding Contact Enquiries...');
  await prisma.contactEnquiry.createMany({
    data: [
      {
        referenceNumber: 'MSG-2026-9011',
        fullName: 'Surendra Nath Gupta',
        mobileNumber: '9812345678',
        email: 'surendra.gupta@gmail.com',
        subject: 'Health Insurance TPA Cashless Query',
        message: 'I want to inquire about cashless admission eligibility for Star Health Insurance policy for knee replacement.',
        status: EnquiryStatus.NEW,
      },
      {
        referenceNumber: 'MSG-2026-9012',
        fullName: 'Pooja Rawat',
        mobileNumber: '9988776655',
        email: 'pooja.rawat@rediffmail.com',
        subject: 'Executive Full Body Health Checkup',
        message: 'Kindly send the package inclusions and pre-test fasting instructions for the Master Health Checkup.',
        status: EnquiryStatus.CONTACTED,
        staffNotes: 'Counselor Priya called patient on Nov 2 and sent checkup preparation PDF on WhatsApp.',
      },
    ],
  });

  // 10. Seed Website Settings
  console.log('⚙️ Seeding Website Settings...');
  await prisma.websiteSetting.upsert({
    where: { id: 'global' },
    update: {},
    create: {
      id: 'global',
      hospitalNameEn: 'Janhit Hospital',
      hospitalNameHi: 'जनहित हॉस्पिटल',
      taglineEn: 'Super Speciality Healthcare & Research Centre',
      taglineHi: 'सुपर स्पेशलिटी हेल्थकेयर एवं रिसर्च सेन्टर',
      addressEn: 'Garhiya Rangeen, Uttar Pradesh - 242303, India',
      addressHi: 'गढ़िया रंगीन, उत्तर प्रदेश - 242303, भारत',
      emergencyPhone: '1800-123-9999',
      generalPhone: '+91-11-2345-6789',
      ambulancePhone: '+91-11-2345-9999',
      whatsappNumber: '+919876543210',
      email: 'care@janhithospital.com',
      opdHoursEn: 'Mon - Sat: 08:00 AM - 08:00 PM',
      opdHoursHi: 'सोमवार - शनिवार: सुबह 08:00 से रात 08:00 बजे तक',
      visitingHoursEn: '05:00 PM - 07:00 PM Daily',
      visitingHoursHi: 'शाम 05:00 से 07:00 बजे तक प्रतिदिन',
      socialLinks: {
        facebook: 'https://facebook.com/janhithospital',
        twitter: 'https://twitter.com/janhithospital',
        instagram: 'https://instagram.com/janhithospital',
        youtube: 'https://youtube.com/@janhithospital',
        linkedin: 'https://linkedin.com/company/janhithospital',
      },
      metaTitle: 'Janhit Hospital | Super Speciality Healthcare & Research Centre',
      metaDescription: 'Janhit Hospital offers world-class super speciality care across cardiology, neurology, orthopaedics, oncology, and 24/7 emergency response.',
      maintenanceMode: false,
    },
  });

  // 11. Initial Audit Log
  await prisma.auditLog.create({
    data: {
      userEmail: 'system@janhithospital.com',
      action: 'SYSTEM_DATABASE_SEEDED',
      entity: 'System',
      entityId: 'seed-001',
      details: {
        departmentsCreated: 3,
        doctorsCreated: 3,
        adminUsersCreated: 4,
        timestamp: new Date().toISOString(),
      },
    },
  });

  console.log('✅ Janhit Hospital Database Seed Completed Successfully!');
  console.log('🔑 Default Admin Credentials:');
  console.log('   Super Admin: superadmin@janhithospital.com | Password: JanhitAdmin@2026');
  console.log('   Hospital Admin: admin@janhithospital.com | Password: JanhitAdmin@2026');
  console.log('   Receptionist: reception@janhithospital.com | Password: JanhitAdmin@2026');
  console.log('   Editor: editor@janhithospital.com | Password: JanhitAdmin@2026');
}

main()
  .catch((e) => {
    console.error('❌ Error during database seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

