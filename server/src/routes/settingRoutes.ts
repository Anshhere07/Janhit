import { Router } from 'express';
import { getSettings, updateSettings } from '../controllers/settingController.js';
import { authenticate } from '../middlewares/auth.js';
import { authorizeRoles } from '../middlewares/role.js';

export const settingRouter = Router();

// Public
settingRouter.get('/', getSettings);

// Admin-protected
settingRouter.put('/', authenticate, authorizeRoles('SUPER_ADMIN', 'ADMIN'), updateSettings);

