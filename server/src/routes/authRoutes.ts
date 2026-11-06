import { Router } from 'express';
import { login, getCurrentUser, logout, getAuditLogs } from '../controllers/authController.js';
import { authenticate } from '../middlewares/auth.js';
import { authorizeRoles } from '../middlewares/role.js';
import { authLimiter } from '../middlewares/rateLimiter.js';

export const authRouter = Router();

authRouter.post('/login', authLimiter, login);
authRouter.get('/me', authenticate, getCurrentUser);
authRouter.post('/logout', authenticate, logout);
authRouter.get('/audit-logs', authenticate, authorizeRoles('SUPER_ADMIN', 'ADMIN'), getAuditLogs);

