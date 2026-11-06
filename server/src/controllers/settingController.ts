import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma.js';
import { AuthenticatedRequest } from '../middlewares/auth.js';
import { logAuditEvent } from '../services/auditService.js';

export async function getSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const settings = await prisma.websiteSetting.findUnique({
      where: { id: 'global' },
    });

    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    next(error);
  }
}

export async function updateSettings(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = req.body;

    const settings = await prisma.websiteSetting.upsert({
      where: { id: 'global' },
      update: data,
      create: {
        id: 'global',
        ...data,
      },
    });

    if (req.user) {
      await logAuditEvent({
        userId: req.user.userId,
        userEmail: req.user.email,
        action: 'UPDATE_WEBSITE_SETTINGS',
        entity: 'WebsiteSetting',
        entityId: 'global',
        details: { updatedFields: Object.keys(data) },
      });
    }

    res.status(200).json({ success: true, message: 'Website settings updated successfully.', data: settings });
  } catch (error) {
    next(error);
  }
}

