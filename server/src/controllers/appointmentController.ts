import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma.js';
import { AuthenticatedRequest } from '../middlewares/auth.js';
import { logAuditEvent } from '../services/auditService.js';
import { AppointmentStatus } from '@prisma/client';

export async function createAppointment(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = req.body;

    if (!data.patientName || !data.mobileNumber || !data.departmentId || !data.doctorId || !data.appointmentDate || !data.preferredTime) {
      res.status(400).json({
        success: false,
        message: 'Missing required booking parameters. Please check all fields.',
      });
      return;
    }

    // Generate unique reference number: APT-2026-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const referenceNumber = `APT-2026-${randomSuffix}`;

    const appointment = await prisma.appointment.create({
      data: {
        referenceNumber,
        patientName: data.patientName.trim(),
        mobileNumber: data.mobileNumber.trim(),
        email: data.email ? data.email.trim() : null,
        patientAge: data.age ? parseInt(data.age, 10) : null,
        patientGender: data.gender || null,
        departmentId: data.departmentId,
        doctorId: data.doctorId,
        appointmentDate: data.appointmentDate,
        preferredTime: data.preferredTime,
        consultationType: data.consultationType || 'in-person',
        reason: data.reasonForVisit || data.reason || null,
        status: AppointmentStatus.PENDING,
      },
      include: {
        department: { select: { nameEn: true, nameHi: true } },
        doctor: { select: { nameEn: true, nameHi: true, roomNumber: true } },
      },
    });

    res.status(201).json({
      success: true,
      message: 'Appointment booking request received. Our front desk will confirm your slot shortly.',
      referenceNumber: appointment.referenceNumber,
      status: appointment.status,
      appointment,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllAppointments(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { status, date, doctorId, departmentId, search } = req.query;

    const whereClause: any = {};

    if (status && status !== 'ALL') {
      whereClause.status = status as AppointmentStatus;
    }

    if (date) {
      whereClause.appointmentDate = String(date);
    }

    if (doctorId) {
      whereClause.doctorId = String(doctorId);
    }

    if (departmentId) {
      whereClause.departmentId = String(departmentId);
    }

    if (search) {
      const q = String(search).trim();
      whereClause.OR = [
        { patientName: { contains: q, mode: 'insensitive' } },
        { mobileNumber: { contains: q } },
        { referenceNumber: { contains: q, mode: 'insensitive' } },
      ];
    }

    const appointments = await prisma.appointment.findMany({
      where: whereClause,
      include: {
        department: { select: { id: true, nameEn: true, nameHi: true } },
        doctor: { select: { id: true, nameEn: true, nameHi: true, roomNumber: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    res.status(200).json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    next(error);
  }
}

export async function getAppointmentByReference(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { ref } = req.params;

    const appointment = await prisma.appointment.findUnique({
      where: { referenceNumber: ref },
      include: {
        department: true,
        doctor: true,
      },
    });

    if (!appointment) {
      res.status(404).json({ success: false, message: 'Appointment not found.' });
      return;
    }

    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    next(error);
  }
}

export async function updateAppointmentStatus(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { status, adminNotes, cancelledReason } = req.body;

    const updated = await prisma.appointment.update({
      where: { id },
      data: {
        status: status as AppointmentStatus,
        adminNotes: adminNotes !== undefined ? adminNotes : undefined,
        cancelledReason: cancelledReason !== undefined ? cancelledReason : undefined,
        confirmedAt: status === AppointmentStatus.CONFIRMED ? new Date() : undefined,
      },
      include: {
        doctor: { select: { nameEn: true } },
        department: { select: { nameEn: true } },
      },
    });

    if (req.user) {
      await logAuditEvent({
        userId: req.user.userId,
        userEmail: req.user.email,
        action: `APPOINTMENT_STATUS_${status}`,
        entity: 'Appointment',
        entityId: id,
        details: {
          referenceNumber: updated.referenceNumber,
          newStatus: status,
          patientName: updated.patientName,
        },
      });
    }

    res.status(200).json({ success: true, message: `Appointment status updated to ${status}.`, data: updated });
  } catch (error) {
    next(error);
  }
}

export async function rescheduleAppointment(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const { newDate, newTime, reason } = req.body;

    if (!newDate || !newTime) {
      res.status(400).json({ success: false, message: 'Please provide new date and time slot.' });
      return;
    }

    const updated = await prisma.appointment.update({
      where: { id },
      data: {
        appointmentDate: newDate,
        preferredTime: newTime,
        status: AppointmentStatus.RESCHEDULED,
        adminNotes: reason ? `Rescheduled: ${reason}` : 'Rescheduled by hospital admin desk',
      },
    });

    if (req.user) {
      await logAuditEvent({
        userId: req.user.userId,
        userEmail: req.user.email,
        action: 'APPOINTMENT_RESCHEDULED',
        entity: 'Appointment',
        entityId: id,
        details: { referenceNumber: updated.referenceNumber, newDate, newTime },
      });
    }

    res.status(200).json({ success: true, message: 'Appointment rescheduled successfully.', data: updated });
  } catch (error) {
    next(error);
  }
}

