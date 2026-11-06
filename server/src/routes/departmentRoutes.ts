import { Router } from 'express';
import {
  getAllDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '../controllers/departmentController.js';
import { authenticate } from '../middlewares/auth.js';
import { authorizeRoles } from '../middlewares/role.js';

export const departmentRouter = Router();

// Public routes
departmentRouter.get('/', getAllDepartments);
departmentRouter.get('/:idOrSlug', getDepartmentById);

// Admin-protected routes
departmentRouter.post('/', authenticate, authorizeRoles('SUPER_ADMIN', 'ADMIN'), createDepartment);
departmentRouter.put('/:id', authenticate, authorizeRoles('SUPER_ADMIN', 'ADMIN'), updateDepartment);
departmentRouter.delete('/:id', authenticate, authorizeRoles('SUPER_ADMIN', 'ADMIN'), deleteDepartment);

