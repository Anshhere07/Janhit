import { Router } from 'express';
import {
  createAppointment,
  getAllAppointments,
  getAppointmentByReference,
  updateAppointmentStatus,
  rescheduleAppointment,
} from '../controllers/appointmentController.js';
import { authenticate } from '../middlewares/auth.js';
import { authorizeRoles } from '../middlewares/role.js';
import { bookingLimiter } from '../middlewares/rateLimiter.js';

export const appointmentRouter = Router();

// Public booking submission & tracking
appointmentRouter.post('/', bookingLimiter, createAppointment);
appointmentRouter.get('/track/:ref', getAppointmentByReference);

// Admin / Front desk management routes
appointmentRouter.get('/', authenticate, authorizeRoles('SUPER_ADMIN', 'ADMIN', 'RECEPTIONIST'), getAllAppointments);
appointmentRouter.patch('/:id/status', authenticate, authorizeRoles('SUPER_ADMIN', 'ADMIN', 'RECEPTIONIST'), updateAppointmentStatus);
appointmentRouter.patch('/:id/reschedule', authenticate, authorizeRoles('SUPER_ADMIN', 'ADMIN', 'RECEPTIONIST'), rescheduleAppointment);

