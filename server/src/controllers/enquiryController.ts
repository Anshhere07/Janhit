import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma.js';
import { AuthenticatedRequest } from '../middlewares/auth.js';
import { logAuditEvent } from '../services/auditService.js';
import { EnquiryStatus } from '@prisma/client';

export async function submitEnquiry(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { fullName, mobileNumber, email, subject, message } = req.body;

    if (!fullName || !mobileNumber || !message) {
      res.status(400).json({ success: false, message: 'Name, mobile number, and message are required.' });
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceNumber = `MSG-2026-${randomSuffix}`;

    const enquiry = await prisma.contactEnquiry.create({
      data: {
        referenceNumber,
        fullName: fullName.trim(),
        mobileNumber: mobileNumber.trim(),
        email: email ? email.trim() : null,
        subject: subject || 'General Inquiry',
        message: message.trim(),
        status: EnquiryStatus.NEW,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been received. Our helpdesk team will contact you shortly.',
      referenceNumber: enquiry.referenceNumber,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllEnquiries(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { status, search } = req.query;

    const whereClause: any = {};

    if (status && status !== 'ALL') {
      whereClause.status = status as EnquiryStatus;
    }

    if (search) {
      const q = String(search).trim();
      whereClause.OR = [
        { fullName: { contains: q, mode: 'insensitive' } },
        { mobileNumber: { contains: q } },
        { referenceNumber: { contains: q, mode: 'insensitive' } },
      ];
    }

    const enquiries = await prisma.contactEnquiry.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error) {
    next(error);
  }
}

export async function updateEnquiryStatus(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { status, staffNotes } = req.body;

    const enquiry = await prisma.contactEnquiry.update({
      where: { id },
      data: {
        status: status as EnquiryStatus,
        staffNotes: staffNotes !== undefined ? staffNotes : undefined,
      },
    });

    if (req.user) {
      await logAuditEvent({
        userId: req.user.userId,
        userEmail: req.user.email,
        action: `ENQUIRY_STATUS_${status}`,
        entity: 'ContactEnquiry',
        entityId: id,
        details: { referenceNumber: enquiry.referenceNumber, newStatus: status },
      });
    }

    res.status(200).json({ success: true, message: 'Enquiry updated.', data: enquiry });
  } catch (error) {
    next(error);
  }
}

