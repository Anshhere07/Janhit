import { Router } from 'express';
import { getDashboardStats } from '../controllers/statsController.js';
import { authenticate } from '../middlewares/auth.js';
import { authorizeRoles } from '../middlewares/role.js';

export const statsRouter = Router();

statsRouter.get('/dashboard', authenticate, authorizeRoles('SUPER_ADMIN', 'ADMIN', 'RECEPTIONIST'), getDashboardStats);

