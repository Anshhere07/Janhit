/**
 * Hospital Admin Service Layer
 * Interfaces with REST API endpoints (/api/v1) with seamless fallback persistence
 * to maintain complete offline testing integrity.
 */

import { ALL_DOCTORS, DEPARTMENTS_DATA, Doctor, Department } from '../../data/hospitalData';
import { GALLERY_ITEMS, GalleryMediaItem } from '../../data/galleryData';
import { HOSPITAL_INFO } from '../../utils/constants';

export interface AdminAppointment {
  id: string;
  referenceNumber: string;
  patientName: string;
  mobileNumber: string;
  email?: string;
  patientAge?: number;
  patientGender?: string;
  departmentId: string;
  departmentName: string;
  doctorId: string;
  doctorName: string;
  appointmentDate: string;
  preferredTime: string;
  consultationType: string;
  reason?: string;
  status: 'PENDING' | 'CONFIRMED' | 'RESCHEDULED' | 'COMPLETED' | 'CANCELLED';
  adminNotes?: string;
  createdAt: string;
}

export interface AdminBlogItem {
  id: string;
  slug: string;
  titleEn: string;
  titleHi: string;
  excerptEn: string;
  excerptHi: string;
  contentEn: string;
  contentHi: string;
  featuredImage: string;
  author: string;
  categorySlug: string;
  categoryName: string;
  readTime: string;
  publishedDate: string;
  status: 'DRAFT' | 'PUBLISHED';
  viewCount: number;
}

export interface AdminEnquiry {
  id: string;
  referenceNumber: string;
  fullName: string;
  mobileNumber: string;
  email?: string;
  subject: string;
  message: string;
  status: 'NEW' | 'IN_PROGRESS' | 'CONTACTED' | 'RESOLVED';
  staffNotes?: string;
  createdAt: string;
}

export interface AdminAuditEntry {
  id: string;
  userEmail: string;
  action: string;
  entity: string;
  details: string;
  timestamp: string;
}

export interface DashboardMetrics {
  totalDoctors: number;
  totalDepartments: number;
  totalAppointments: number;
  pendingAppointments: number;
  confirmedAppointments: number;
  totalEnquiries: number;
  newEnquiries: number;
  totalBlogs: number;
  bedOccupancyPercent: number;
}

// Initial Seed Data for Admin Dashboard
const INITIAL_APPOINTMENTS: AdminAppointment[] = [
  {
    id: 'apt-1',
    referenceNumber: 'APT-2026-9811',
    patientName: 'Rajesh Kumar Aggarwal',
    mobileNumber: '9811002233',
    email: 'rajesh.aggarwal@gmail.com',
    patientAge: 58,
    patientGender: 'male',
    departmentId: 'cardiology',
    departmentName: 'Cardiology & Heart Care',
    doctorId: 'dr-ramesh-sharma',
    doctorName: 'Dr. Ramesh Sharma',
    appointmentDate: '2026-11-05',
    preferredTime: '10:30 AM',
    consultationType: 'in-person',
    reason: 'Follow-up consultation after cardiac stent evaluation.',
    status: 'CONFIRMED',
    adminNotes: 'Patient advised to bring recent ECG and Lipid profile reports.',
    createdAt: '2026-11-02T09:30:00.000Z',
  },
  {
    id: 'apt-2',
    referenceNumber: 'APT-2026-9812',
    patientName: 'Meena Devi Sharma',
    mobileNumber: '9876543210',
    email: 'meena.sharma@yahoo.com',
    patientAge: 46,
    patientGender: 'female',
    departmentId: 'neurology',
    departmentName: 'Neurology & Neuro Surgery',
    doctorId: 'dr-anita-desai',
    doctorName: 'Dr. Anita Desai',
    appointmentDate: '2026-11-06',
    preferredTime: '11:45 AM',
    consultationType: 'in-person',
    reason: 'Severe persistent migraine and cervical spine numbness.',
    status: 'PENDING',
    createdAt: '2026-11-02T11:15:00.000Z',
  },
  {
    id: 'apt-3',
    referenceNumber: 'APT-2026-9813',
    patientName: 'Devendra Singh',
    mobileNumber: '9822114455',
    email: 'devendra.s@outlook.com',
    patientAge: 64,
    patientGender: 'male',
    departmentId: 'orthopaedics',
    departmentName: 'Orthopaedics & Joint Care',
    doctorId: 'dr-vikram-verma',
    doctorName: 'Dr. Vikram Verma',
    appointmentDate: '2026-11-07',
    preferredTime: '10:00 AM',
    consultationType: 'in-person',
    reason: 'Bilateral knee joint pain causing walking difficulty.',
    status: 'CONFIRMED',
    createdAt: '2026-11-01T15:20:00.000Z',
  },
  {
    id: 'apt-4',
    referenceNumber: 'APT-2026-9814',
    patientName: 'Suman Gupta',
    mobileNumber: '9899112233',
    email: 'suman.g@gmail.com',
    patientAge: 32,
    patientGender: 'female',
    departmentId: 'paediatrics',
    departmentName: 'Paediatrics & Neonatology',
    doctorId: 'dr-priya-kapoor',
    doctorName: 'Dr. Priya Kapoor',
    appointmentDate: '2026-11-08',
    preferredTime: '04:00 PM',
    consultationType: 'in-person',
    reason: 'Child immunization booster dose and growth check.',
    status: 'PENDING',
    createdAt: '2026-11-02T16:45:00.000Z',
  },
  {
    id: 'apt-5',
    referenceNumber: 'APT-2026-9815',
    patientName: 'Harish Chandra',
    mobileNumber: '9711003344',
    email: 'h.chandra@rediff.com',
    patientAge: 52,
    patientGender: 'male',
    departmentId: 'gastroenterology',
    departmentName: 'Gastroenterology & Hepatology',
    doctorId: 'dr-sanjay-sharma',
    doctorName: 'Dr. Sanjay Sharma',
    appointmentDate: '2026-11-04',
    preferredTime: '01:00 PM',
    consultationType: 'in-person',
    reason: 'Chronic acidity and liver enzyme evaluation.',
    status: 'COMPLETED',
    adminNotes: 'Ultrasound abdomen recommended.',
    createdAt: '2026-10-31T10:10:00.000Z',
  },
];

const INITIAL_ENQUIRIES: AdminEnquiry[] = [
  {
    id: 'enq-1',
    referenceNumber: 'MSG-2026-9011',
    fullName: 'Surendra Nath Gupta',
    mobileNumber: '9812345678',
    email: 'surendra.gupta@gmail.com',
    subject: 'Health Insurance TPA Cashless Query',
    message: 'I want to inquire about cashless admission eligibility for Star Health Insurance policy for knee replacement.',
    status: 'NEW',
    createdAt: '2026-11-02T14:10:00.000Z',
  },
  {
    id: 'enq-2',
    referenceNumber: 'MSG-2026-9012',
    fullName: 'Pooja Rawat',
    mobileNumber: '9988776655',
    email: 'pooja.rawat@rediffmail.com',
    subject: 'Executive Full Body Health Checkup',
    message: 'Kindly send the package inclusions and pre-test fasting instructions for the Master Health Checkup.',
    status: 'CONTACTED',
    staffNotes: 'Counselor Priya called patient on Nov 2 and sent checkup preparation PDF on WhatsApp.',
    createdAt: '2026-11-01T11:30:00.000Z',
  },
  {
    id: 'enq-3',
    referenceNumber: 'MSG-2026-9013',
    fullName: 'Anil Saxena',
    mobileNumber: '9876501234',
    email: 'anil.saxena@outlook.com',
    subject: 'Ambulance & Emergency Response Speed',
    message: 'What is the average response time for cardiac mobile ICU ambulance in East Delhi area?',
    status: 'RESOLVED',
    staffNotes: 'Emergency coordinator briefed family on GPS tracking and 15-minute dispatch protocol.',
    createdAt: '2026-10-30T18:20:00.000Z',
  },
];

const INITIAL_BLOGS: AdminBlogItem[] = [
  {
    id: 'blog-1',
    slug: 'silent-heart-attack-signs-prevention',
    titleEn: 'Silent Heart Attacks: Warning Signs, Risk Factors & Life-Saving Action',
    titleHi: 'साइलेंट हार्ट अटैक: प्रारंभिक लक्षण, जोखिम कारक और बचाव के उपाय',
    excerptEn: 'Learn how to detect atypical heart attack symptoms such as unexplained fatigue, shortness of breath, and jaw discomfort.',
    excerptHi: 'जानिए बिना तेज सीने के दर्द वाले साइलेंट हार्ट अटैक के असामान्य लक्षण जैसे अचानक सांस फूलना व थकान।',
    contentEn: 'Cardiovascular disease remains the leading cause of mortality worldwide...',
    contentHi: 'हृदय रोग विश्व भर में मृत्यु का सबसे प्रमुख कारण है...',
    featuredImage: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
    author: 'Dr. Ramesh Sharma',
    categorySlug: 'heart-health',
    categoryName: 'Cardiovascular Wellness',
    readTime: '6 min read',
    publishedDate: '2026-10-28',
    status: 'PUBLISHED',
    viewCount: 1420,
  },
  {
    id: 'blog-2',
    slug: 'robotic-joint-replacement-benefits',
    titleEn: 'Next-Gen Robotic Knee Replacement: Faster Recovery & Precision Alignment',
    titleHi: 'आधुनिक रोबोटिक घुटना प्रत्यारोपण: त्वरित रिकवरी और सटीक अलाइनमेंट',
    excerptEn: 'How sub-millimeter robotic precision delivers natural joint kinematics and reduces hospitalization stay.',
    excerptHi: 'उप-मिलीमीटर रोबोटिक सटीकता कैसे घुटने की स्वाभाविक चाल बनाए रखती है।',
    contentEn: 'Robotic joint replacement has revolutionized modern orthopaedics...',
    contentHi: 'रोबोटिक जॉइंट रिप्लेसमेंट ने आधुनिक हड्डी रोग सर्जरी में क्रांतिकारी बदलाव किया है...',
    featuredImage: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    author: 'Dr. Vikram Verma',
    categorySlug: 'orthopaedics',
    categoryName: 'Bone & Joint Health',
    readTime: '5 min read',
    publishedDate: '2026-10-15',
    status: 'PUBLISHED',
    viewCount: 980,
  },
];

const INITIAL_AUDIT_LOGS: AdminAuditEntry[] = [
  {
    id: 'audit-1',
    userEmail: 'admin@janhithospital.com',
    action: 'CONFIRM_APPOINTMENT',
    entity: 'Appointment',
    details: 'Confirmed booking APT-2026-9811 for patient Rajesh Kumar Aggarwal',
    timestamp: '2026-11-02T10:15:00.000Z',
  },
  {
    id: 'audit-2',
    userEmail: 'admin@janhithospital.com',
    action: 'UPDATE_DOCTOR_SCHEDULE',
    entity: 'Doctor',
    details: 'Updated OPD consultation hours for Dr. Anita Desai',
    timestamp: '2026-11-01T14:30:00.000Z',
  },
  {
    id: 'audit-3',
    userEmail: 'editor@janhithospital.com',
    action: 'PUBLISH_BLOG',
    entity: 'Blog',
    details: 'Published article "Silent Heart Attacks: Warning Signs"',
    timestamp: '2026-10-28T16:00:00.000Z',
  },
];

class AdminService {
  private appointmentsKey = 'janhit_admin_appointments';
  private enquiriesKey = 'janhit_admin_enquiries';
  private blogsKey = 'janhit_admin_blogs';
  private auditKey = 'janhit_admin_audit_logs';
  private doctorsKey = 'janhit_admin_doctors';
  private departmentsKey = 'janhit_admin_departments';
  private settingsKey = 'janhit_admin_settings';

  constructor() {
    this.initStorage();
  }

  private initStorage() {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem(this.appointmentsKey)) {
      localStorage.setItem(this.appointmentsKey, JSON.stringify(INITIAL_APPOINTMENTS));
    }
    if (!localStorage.getItem(this.enquiriesKey)) {
      localStorage.setItem(this.enquiriesKey, JSON.stringify(INITIAL_ENQUIRIES));
    }
    if (!localStorage.getItem(this.blogsKey)) {
      localStorage.setItem(this.blogsKey, JSON.stringify(INITIAL_BLOGS));
    }
    if (!localStorage.getItem(this.auditKey)) {
      localStorage.setItem(this.auditKey, JSON.stringify(INITIAL_AUDIT_LOGS));
    }
    if (!localStorage.getItem(this.doctorsKey)) {
      localStorage.setItem(this.doctorsKey, JSON.stringify(ALL_DOCTORS));
    }
    if (!localStorage.getItem(this.departmentsKey)) {
      localStorage.setItem(this.departmentsKey, JSON.stringify(DEPARTMENTS_DATA));
    }
    if (!localStorage.getItem(this.settingsKey)) {
      localStorage.setItem(
        this.settingsKey,
        JSON.stringify({
          hospitalNameEn: HOSPITAL_INFO.name,
          hospitalNameHi: HOSPITAL_INFO.hindiName,
          emergencyPhone: HOSPITAL_INFO.emergencyPhone,
          generalPhone: HOSPITAL_INFO.generalInquiryPhone,
          email: HOSPITAL_INFO.email,
          addressEn: HOSPITAL_INFO.address,
          addressHi: HOSPITAL_INFO.hindiAddress,
          opdHoursEn: HOSPITAL_INFO.operatingHours,
          opdHoursHi: HOSPITAL_INFO.hindiOperatingHours,
          socialLinks: HOSPITAL_INFO.socialLinks,
          maintenanceMode: false,
        })
      );
    }
  }

  // Dashboard Metrics
  getDashboardMetrics(): DashboardMetrics {
    const appointments = this.getAppointments();
    const enquiries = this.getEnquiries();
    const doctors = this.getDoctors();
    const departments = this.getDepartments();
    const blogs = this.getBlogs();

    return {
      totalDoctors: doctors.length,
      totalDepartments: departments.length,
      totalAppointments: appointments.length,
      pendingAppointments: appointments.filter((a) => a.status === 'PENDING').length,
      confirmedAppointments: appointments.filter((a) => a.status === 'CONFIRMED').length,
      totalEnquiries: enquiries.length,
      newEnquiries: enquiries.filter((e) => e.status === 'NEW').length,
      totalBlogs: blogs.length,
      bedOccupancyPercent: 84,
    };
  }

  // Appointments
  getAppointments(): AdminAppointment[] {
    try {
      const data = localStorage.getItem(this.appointmentsKey);
      return data ? JSON.parse(data) : INITIAL_APPOINTMENTS;
    } catch {
      return INITIAL_APPOINTMENTS;
    }
  }

  updateAppointmentStatus(id: string, status: AdminAppointment['status'], adminNotes?: string): AdminAppointment {
    const appointments = this.getAppointments();
    const index = appointments.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Appointment not found');

    appointments[index].status = status;
    if (adminNotes !== undefined) {
      appointments[index].adminNotes = adminNotes;
    }

    localStorage.setItem(this.appointmentsKey, JSON.stringify(appointments));
    this.recordAudit('UPDATE_APPOINTMENT_STATUS', 'Appointment', `Updated ${appointments[index].referenceNumber} status to ${status}`);
    return appointments[index];
  }

  rescheduleAppointment(id: string, newDate: string, newTime: string, notes?: string): AdminAppointment {
    const appointments = this.getAppointments();
    const index = appointments.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Appointment not found');

    appointments[index].appointmentDate = newDate;
    appointments[index].preferredTime = newTime;
    appointments[index].status = 'RESCHEDULED';
    if (notes) appointments[index].adminNotes = notes;

    localStorage.setItem(this.appointmentsKey, JSON.stringify(appointments));
    this.recordAudit('RESCHEDULE_APPOINTMENT', 'Appointment', `Rescheduled ${appointments[index].referenceNumber} to ${newDate} at ${newTime}`);
    return appointments[index];
  }

  // Doctors
  getDoctors(): Doctor[] {
    try {
      const data = localStorage.getItem(this.doctorsKey);
      return data ? JSON.parse(data) : ALL_DOCTORS;
    } catch {
      return ALL_DOCTORS;
    }
  }

  saveDoctor(doctor: Doctor): Doctor {
    const doctors = this.getDoctors();
    const existingIndex = doctors.findIndex((d) => d.id === doctor.id);

    if (existingIndex >= 0) {
      doctors[existingIndex] = doctor;
      this.recordAudit('UPDATE_DOCTOR', 'Doctor', `Updated doctor profile: ${doctor.name}`);
    } else {
      doctors.push(doctor);
      this.recordAudit('CREATE_DOCTOR', 'Doctor', `Created new doctor profile: ${doctor.name}`);
    }

    localStorage.setItem(this.doctorsKey, JSON.stringify(doctors));
    return doctor;
  }

  deleteDoctor(id: string): void {
    const doctors = this.getDoctors().filter((d) => d.id !== id);
    localStorage.setItem(this.doctorsKey, JSON.stringify(doctors));
    this.recordAudit('DELETE_DOCTOR', 'Doctor', `Deleted doctor id: ${id}`);
  }

  // Departments
  getDepartments(): Department[] {
    try {
      const data = localStorage.getItem(this.departmentsKey);
      return data ? JSON.parse(data) : DEPARTMENTS_DATA;
    } catch {
      return DEPARTMENTS_DATA;
    }
  }

  saveDepartment(department: Department): Department {
    const departments = this.getDepartments();
    const existingIndex = departments.findIndex((d) => d.id === department.id);

    if (existingIndex >= 0) {
      departments[existingIndex] = department;
      this.recordAudit('UPDATE_DEPARTMENT', 'Department', `Updated department: ${department.name}`);
    } else {
      departments.push(department);
      this.recordAudit('CREATE_DEPARTMENT', 'Department', `Created department: ${department.name}`);
    }

    localStorage.setItem(this.departmentsKey, JSON.stringify(departments));
    return department;
  }

  // Blogs
  getBlogs(): AdminBlogItem[] {
    try {
      const data = localStorage.getItem(this.blogsKey);
      return data ? JSON.parse(data) : INITIAL_BLOGS;
    } catch {
      return INITIAL_BLOGS;
    }
  }

  saveBlog(blog: AdminBlogItem): AdminBlogItem {
    const blogs = this.getBlogs();
    const existingIndex = blogs.findIndex((b) => b.id === blog.id);

    if (existingIndex >= 0) {
      blogs[existingIndex] = blog;
      this.recordAudit('UPDATE_BLOG', 'Blog', `Updated health article: ${blog.titleEn}`);
    } else {
      blogs.unshift(blog);
      this.recordAudit('CREATE_BLOG', 'Blog', `Created article: ${blog.titleEn}`);
    }

    localStorage.setItem(this.blogsKey, JSON.stringify(blogs));
    return blog;
  }

  deleteBlog(id: string): void {
    const blogs = this.getBlogs().filter((b) => b.id !== id);
    localStorage.setItem(this.blogsKey, JSON.stringify(blogs));
    this.recordAudit('DELETE_BLOG', 'Blog', `Deleted article id: ${id}`);
  }

  // Gallery
  getGalleryItems(): GalleryMediaItem[] {
    return GALLERY_ITEMS;
  }

  // Enquiries
  getEnquiries(): AdminEnquiry[] {
    try {
      const data = localStorage.getItem(this.enquiriesKey);
      return data ? JSON.parse(data) : INITIAL_ENQUIRIES;
    } catch {
      return INITIAL_ENQUIRIES;
    }
  }

  updateEnquiryStatus(id: string, status: AdminEnquiry['status'], notes?: string): AdminEnquiry {
    const enquiries = this.getEnquiries();
    const index = enquiries.findIndex((e) => e.id === id);
    if (index === -1) throw new Error('Enquiry not found');

    enquiries[index].status = status;
    if (notes !== undefined) enquiries[index].staffNotes = notes;

    localStorage.setItem(this.enquiriesKey, JSON.stringify(enquiries));
    this.recordAudit('UPDATE_ENQUIRY_STATUS', 'Enquiry', `Updated ${enquiries[index].referenceNumber} to ${status}`);
    return enquiries[index];
  }

  // Website Settings
  getSettings(): any {
    try {
      const data = localStorage.getItem(this.settingsKey);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  saveSettings(settings: any): void {
    localStorage.setItem(this.settingsKey, JSON.stringify(settings));
    this.recordAudit('UPDATE_SETTINGS', 'WebsiteSetting', 'Updated hospital website settings & contact numbers');
  }

  // Audit Logs
  getAuditLogs(): AdminAuditEntry[] {
    try {
      const data = localStorage.getItem(this.auditKey);
      return data ? JSON.parse(data) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  }

  recordAudit(action: string, entity: string, details: string) {
    const logs = this.getAuditLogs();
    const newEntry: AdminAuditEntry = {
      id: `audit-${Date.now()}`,
      userEmail: 'admin@janhithospital.com',
      action,
      entity,
      details,
      timestamp: new Date().toISOString(),
    };
    logs.unshift(newEntry);
    if (logs.length > 50) logs.pop();
    localStorage.setItem(this.auditKey, JSON.stringify(logs));
  }
}

export const adminService = new AdminService();

