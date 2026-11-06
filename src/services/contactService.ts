export interface ContactSubmission {
  fullName: string;
  mobileNumber: string;
  email: string;
  subject: string;
  hindiSubject?: string;
  message: string;
}

export interface ContactResponse {
  referenceId: string;
  submittedAt: string;
  status: 'RECEIVED';
  data: ContactSubmission;
  confirmationNotice: string;
  hindiConfirmationNotice: string;
}

const CONTACT_STORAGE_KEY = 'janhit_hospital_contact_inquiries';

/**
 * Generates an official Contact Inquiry Reference ID.
 * Format: MSG-2026-XXXX
 */
export const generateContactReferenceId = (): string => {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let random = '';
  for (let i = 0; i < 4; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `MSG-2026-${random}`;
};

export const contactService = {
  /**
   * Submits a public contact enquiry to Janhit Hospital
   */
  async submitContactEnquiry(submission: ContactSubmission): Promise<ContactResponse> {
    // Simulate backend network latency
    await new Promise((resolve) => setTimeout(resolve, 750));

    const referenceId = generateContactReferenceId();
    const response: ContactResponse = {
      referenceId,
      submittedAt: new Date().toISOString(),
      status: 'RECEIVED',
      data: submission,
      confirmationNotice:
        'Thank you for contacting Janhit Hospital. Your message has been routed to our Patient Relations & Helpdesk coordinator. We will respond to your registered mobile/email within 2 hours.',
      hindiConfirmationNotice:
        'जनहित हॉस्पिटल से संपर्क करने हेतु धन्यवाद। आपका संदेश हमारे मरीज सहायता समन्वयक को भेज दिया गया है। हमारी टीम 2 घंटे के भीतर आपके मोबाइल अथवा ईमेल पर संपर्क करेगी।',
    };

    try {
      const existingStr = localStorage.getItem(CONTACT_STORAGE_KEY);
      const existing: ContactResponse[] = existingStr ? JSON.parse(existingStr) : [];
      existing.unshift(response);
      localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(existing.slice(0, 20)));
    } catch {
      // LocalStorage access resilient fallback
    }

    return response;
  },

  /**
   * Retrieves recent contact messages submitted from this browser session
   */
  getRecentSubmissions(): ContactResponse[] {
    try {
      const existingStr = localStorage.getItem(CONTACT_STORAGE_KEY);
      return existingStr ? JSON.parse(existingStr) : [];
    } catch {
      return [];
    }
  },
};

