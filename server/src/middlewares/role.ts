import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.js';

export function authorizeRoles(...allowedRoles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized: User authentication required.',
      });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `Forbidden: You do not have permission to perform this action. Required role: [${allowedRoles.join(', ')}].`,
      });
      return;
    }

    next();
  };
}

