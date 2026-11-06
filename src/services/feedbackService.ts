export interface PatientFeedbackSubmission {
  patientName?: string;
  contact?: string; // mobile or email
  category: 'opd' | 'inpatient' | 'nursing' | 'cleanliness' | 'billing' | 'general';
  rating: number; // 1 to 5
  message: string;
  departmentId?: string;
  allowPublicDisplay: boolean;
}

export interface FeedbackResponse {
  feedbackId: string;
  submittedAt: string;
  status: 'RECEIVED_UNDER_REVIEW';
  patientName: string;
  category: string;
  rating: number;
  message: string;
  confirmationNotice: string;
  hindiConfirmationNotice: string;
}

const FEEDBACK_STORAGE_KEY = 'janhit_hospital_patient_feedbacks';

/**
 * Generates an official Feedback Tracking ID. Format: FB-2026-XXXX
 */
export const generateFeedbackId = (): string => {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let random = '';
  for (let i = 0; i < 4; i++) {
    random += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `FB-2026-${random}`;
};

export const feedbackService = {
  /**
   * Submits a patient feedback or review
   */
  async submitFeedback(data: PatientFeedbackSubmission): Promise<FeedbackResponse> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 700));

    const feedbackId = generateFeedbackId();
    const displayName = data.patientName?.trim() || 'Anonymous Patient';

    const response: FeedbackResponse = {
      feedbackId,
      submittedAt: new Date().toISOString(),
      status: 'RECEIVED_UNDER_REVIEW',
      patientName: displayName,
      category: data.category,
      rating: data.rating,
      message: data.message,
      confirmationNotice:
        'Thank you for your valuable feedback. Your review has been submitted to the Hospital Quality & Patient Experience Cell for review.',
      hindiConfirmationNotice:
        'आपकी बहुमूल्य प्रतिक्रिया के लिए धन्यवाद। आपका सुझाव अस्पताल गुणवत्ता एवं मरीज अनुभव प्रकोष्ठ को समीक्षा हेतु प्रेषित कर दिया गया है।',
    };

    try {
      const existingStr = localStorage.getItem(FEEDBACK_STORAGE_KEY);
      const existing: FeedbackResponse[] = existingStr ? JSON.parse(existingStr) : [];
      existing.unshift(response);
      localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(existing.slice(0, 20)));
    } catch {
      // LocalStorage access resilient fallback
    }

    return response;
  },

  /**
   * Retrieves recent feedbacks submitted from this device
   */
  getRecentFeedbacks(): FeedbackResponse[] {
    try {
      const existingStr = localStorage.getItem(FEEDBACK_STORAGE_KEY);
      return existingStr ? JSON.parse(existingStr) : [];
    } catch {
      return [];
    }
  },
};

