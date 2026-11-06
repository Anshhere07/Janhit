import { Router } from 'express';
import {
  submitEnquiry,
  getAllEnquiries,
  updateEnquiryStatus,
} from '../controllers/enquiryController.js';
import { authenticate } from '../middlewares/auth.js';
import { authorizeRoles } from '../middlewares/role.js';
import { bookingLimiter } from '../middlewares/rateLimiter.js';

export const enquiryRouter = Router();

// Public inquiry submission
enquiryRouter.post('/', bookingLimiter, submitEnquiry);

// Admin-protected enquiry management
enquiryRouter.get('/', authenticate, authorizeRoles('SUPER_ADMIN', 'ADMIN', 'RECEPTIONIST'), getAllEnquiries);
enquiryRouter.patch('/:id', authenticate, authorizeRoles('SUPER_ADMIN', 'ADMIN', 'RECEPTIONIST'), updateEnquiryStatus);

