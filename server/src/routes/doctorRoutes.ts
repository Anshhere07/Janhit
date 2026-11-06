import { Router } from 'express';
import {
  getAllDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctorController.js';
import { authenticate } from '../middlewares/auth.js';
import { authorizeRoles } from '../middlewares/role.js';

export const doctorRouter = Router();

// Public routes
doctorRouter.get('/', getAllDoctors);
doctorRouter.get('/:idOrSlug', getDoctorById);

// Admin-protected routes
doctorRouter.post('/', authenticate, authorizeRoles('SUPER_ADMIN', 'ADMIN'), createDoctor);
doctorRouter.put('/:id', authenticate, authorizeRoles('SUPER_ADMIN', 'ADMIN'), updateDoctor);
doctorRouter.delete('/:id', authenticate, authorizeRoles('SUPER_ADMIN', 'ADMIN'), deleteDoctor);

