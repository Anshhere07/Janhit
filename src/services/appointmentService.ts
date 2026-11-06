import { ALL_DOCTORS, DEPARTMENTS_DATA, Doctor, Department } from '../data/hospitalData';

export interface AppointmentSlot {
  id: string;
  time: string;
  hindiTime: string;
  period: 'morning' | 'afternoon' | 'evening';
  isAvailable: boolean;
}

export interface AppointmentRequest {
  departmentId: string;
  departmentName: string;
  hindiDepartmentName: string;
  doctorId: string;
  doctorName: string;
  hindiDoctorName: string;
  appointmentDate: string;
  preferredTime: string;
  hindiPreferredTime: string;
  patientName: string;
  mobileNumber: string;
  email?: string;
  age: string;
  gender?: 'male' | 'female' | 'other' | '';
  reasonForVisit?: string;
  hasInsurance?: boolean;
}

export interface AppointmentResponse {
  referenceNumber: string;
  status: 'PENDING_CONFIRMATION' | 'CONFIRMED' | 'RESCHEDULED';
  createdAt: string;
  data: AppointmentRequest;
  estimatedOpdChamber: string;
  confirmationNotice: string;
  hindiConfirmationNotice: string;
}

export interface PatientEnquiry {
  fullName: string;
  phone: string;
  email?: string;
  department?: string;
  message: string;
}

export interface EnquiryResponse {
  enquiryId: string;
  submittedAt: string;
  status: 'RECEIVED';
  message: string;
  hindiMessage: string;
}

const STORAGE_KEY = 'janhit_hospital_appointments';
const ENQUIRY_STORAGE_KEY = 'janhit_hospital_enquiries';

/**
 * Generates an official Janhit Hospital reference number.
 * Format: JH-2026-XXXX (4-digit uppercase alphanumeric)
 */
export const generateReferenceNumber = (): string => {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let random = '';
  for (let i = 0; i < 4; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `JH-2026-${random}`;
};

/**
 * Service providing endpoints for hospital appointment management
 */
export const appointmentService = {
  /**
   * Retrieves all available medical departments
   */
  async getDepartments(): Promise<Department[]> {
    return Promise.resolve(DEPARTMENTS_DATA);
  },

  /**
   * Retrieves doctors, optionally filtered by clinical department
   */
  async getDoctors(departmentId?: string): Promise<Doctor[]> {
    if (!departmentId || departmentId === 'all') {
      return Promise.resolve(ALL_DOCTORS);
    }
    return Promise.resolve(ALL_DOCTORS.filter((doc) => doc.departmentId === departmentId));
  },

  /**
   * Generates realistic OPD time slots based on the doctor's schedule and day of the week
   */
  async getAvailableTimeSlots(doctorId: string, dateString: string): Promise<AppointmentSlot[]> {
    const selectedDate = new Date(dateString);
    const dayOfWeek = selectedDate.getDay(); // 0 is Sunday

    // Janhit Hospital OPD is closed on Sundays for routine consultations
    if (dayOfWeek === 0) {
      return Promise.resolve([]);
    }

    // Verify doctor exists
    const doctor = ALL_DOCTORS.find((d) => d.id === doctorId);
    if (!doctor) {
      return Promise.resolve([]);
    }

    // Standard clinical OPD slots
    const standardSlots: AppointmentSlot[] = [
      { id: 'm1', time: '09:00 AM - 09:30 AM', hindiTime: 'सुबह 09:00 - 09:30', period: 'morning', isAvailable: true },
      { id: 'm2', time: '09:30 AM - 10:00 AM', hindiTime: 'सुबह 09:30 - 10:00', period: 'morning', isAvailable: true },
      { id: 'm3', time: '10:00 AM - 10:30 AM', hindiTime: 'सुबह 10:00 - 10:30', period: 'morning', isAvailable: true },
      { id: 'm4', time: '10:30 AM - 11:00 AM', hindiTime: 'सुबह 10:30 - 11:00', period: 'morning', isAvailable: true },
      { id: 'm5', time: '11:00 AM - 11:30 AM', hindiTime: 'सुबह 11:00 - 11:30', period: 'morning', isAvailable: true },
      { id: 'm6', time: '11:30 AM - 12:00 PM', hindiTime: 'सुबह 11:30 - दोपहर 12:00', period: 'morning', isAvailable: true },
      { id: 'a1', time: '12:00 PM - 12:30 PM', hindiTime: 'दोपहर 12:00 - 12:30', period: 'afternoon', isAvailable: true },
      { id: 'a2', time: '12:30 PM - 01:00 PM', hindiTime: 'दोपहर 12:30 - 01:00', period: 'afternoon', isAvailable: true },
      { id: 'a3', time: '02:00 PM - 02:30 PM', hindiTime: 'दोपहर 02:00 - 02:30', period: 'afternoon', isAvailable: true },
      { id: 'a4', time: '02:30 PM - 03:00 PM', hindiTime: 'दोपहर 02:30 - 03:00', period: 'afternoon', isAvailable: true },
      { id: 'e1', time: '03:00 PM - 03:30 PM', hindiTime: 'दोपहर 03:00 - 03:30', period: 'evening', isAvailable: true },
      { id: 'e2', time: '03:30 PM - 04:00 PM', hindiTime: 'शाम 03:30 - 04:00', period: 'evening', isAvailable: true },
      { id: 'e3', time: '04:00 PM - 04:30 PM', hindiTime: 'शाम 04:00 - 04:30', period: 'evening', isAvailable: true },
      { id: 'e4', time: '04:30 PM - 05:00 PM', hindiTime: 'शाम 04:30 - 05:00', period: 'evening', isAvailable: true },
    ];

    // Simulate minor slot reservations based on date string hash
    const dateNum = dateString.split('-').reduce((acc, part) => acc + parseInt(part, 10), 0);
    return Promise.resolve(
      standardSlots.map((slot, idx) => ({
        ...slot,
        isAvailable: (idx + dateNum) % 7 !== 0, // Most slots are available
      }))
    );
  },

  /**
   * Submits an appointment request to the hospital backend system
   */
  async submitAppointmentRequest(request: AppointmentRequest): Promise<AppointmentResponse> {
    // Simulate backend network latency
    await new Promise((resolve) => setTimeout(resolve, 800));

    const referenceNumber = generateReferenceNumber();
    const doctor = ALL_DOCTORS.find((d) => d.id === request.doctorId);
    const room = doctor?.schedule[0]?.room || 'OPD Consultation Wing B';

    const response: AppointmentResponse = {
      referenceNumber,
      status: 'PENDING_CONFIRMATION',
      createdAt: new Date().toISOString(),
      data: request,
      estimatedOpdChamber: room,
      confirmationNotice:
        'Your appointment request has been recorded. Our hospital OPD coordinator will contact you via phone/SMS within 15 minutes to confirm your final consultation token.',
      hindiConfirmationNotice:
        'आपका परामर्श अनुरोध दर्ज कर लिया गया है। हमारे अस्पताल ओपीडी समन्वयक 15 मिनट के भीतर आपके मोबाइल पर कॉल या एसएमएस द्वारा टोकन की पुष्टि करेंगे।',
    };

    // Persist to local storage for patient reference lookup
    try {
      const existingStr = localStorage.getItem(STORAGE_KEY);
      const existing: AppointmentResponse[] = existingStr ? JSON.parse(existingStr) : [];
      existing.unshift(response);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 20))); // Keep last 20
    } catch {
      // LocalStorage access resilient fallback
    }

    return response;
  },

  /**
   * Retrieves previously submitted appointment by reference number
   */
  async getAppointmentStatus(referenceNumber: string): Promise<AppointmentResponse | null> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const trimmed = referenceNumber.trim().toUpperCase();

    try {
      const existingStr = localStorage.getItem(STORAGE_KEY);
      if (existingStr) {
        const existing: AppointmentResponse[] = JSON.parse(existingStr);
        const match = existing.find((item) => item.referenceNumber === trimmed);
        if (match) return match;
      }
    } catch {
      // ignore
    }

    // If looking for sample reference number
    if (trimmed === 'JH-2026-9842') {
      return {
        referenceNumber: 'JH-2026-9842',
        status: 'CONFIRMED',
        createdAt: new Date().toISOString(),
        data: {
          departmentId: 'cardiology',
          departmentName: 'Cardiology & Heart Care',
          hindiDepartmentName: 'कार्डियोलॉजी एवं हृदय रोग',
          doctorId: 'dr-ashok-sharma',
          doctorName: 'Dr. Ashok Sharma',
          hindiDoctorName: 'डॉ. अशोक शर्मा',
          appointmentDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          preferredTime: '10:00 AM - 10:30 AM',
          hindiPreferredTime: 'सुबह 10:00 - 10:30',
          patientName: 'Ramesh Kumar',
          mobileNumber: '+91-9876543210',
          age: '48',
          gender: 'male',
          reasonForVisit: 'Routine cardiac health review and blood pressure assessment.',
          hasInsurance: true,
        },
        estimatedOpdChamber: 'OPD Suite 101 (Cath Lab Block)',
        confirmationNotice: 'Confirmed Appointment. Please arrive 15 minutes before your time slot.',
        hindiConfirmationNotice: 'सत्यापित अपॉइंटमेंट। कृपया अपने निर्धारित समय से 15 मिनट पूर्व ओपीडी पहुंचे।',
      };
    }

    return null;
  },

  /**
   * Submits a general patient enquiry
   */
  async submitPatientEnquiry(enquiry: PatientEnquiry): Promise<EnquiryResponse> {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const response: EnquiryResponse = {
      enquiryId: `ENQ-${Date.now().toString().slice(-6)}`,
      submittedAt: new Date().toISOString(),
      status: 'RECEIVED',
      message: `Thank you ${enquiry.fullName}. Your enquiry has been received. Our patient helpdesk will contact you at ${enquiry.phone} shortly.`,
      hindiMessage: `धन्यवाद ${enquiry.fullName} जी। आपकी पूछताछ दर्ज कर ली गई है। हमारा मरीज सहायता केंद्र शीघ्र ही ${enquiry.phone} पर आपसे संपर्क करेगा।`,
    };

    try {
      const existingStr = localStorage.getItem(ENQUIRY_STORAGE_KEY);
      const existing: Array<EnquiryResponse & { enquiry: PatientEnquiry }> = existingStr ? JSON.parse(existingStr) : [];
      existing.unshift({ ...response, enquiry });
      localStorage.setItem(ENQUIRY_STORAGE_KEY, JSON.stringify(existing.slice(0, 10)));
    } catch {
      // ignore
    }

    return response;
  },

  /**
   * Retrieves recent appointments booked from this browser session
   */
  getRecentAppointments(): AppointmentResponse[] {
    try {
      const existingStr = localStorage.getItem(STORAGE_KEY);
      return existingStr ? JSON.parse(existingStr) : [];
    } catch {
      return [];
    }
  },
};
