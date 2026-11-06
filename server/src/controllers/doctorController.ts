import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma.js';
import { AuthenticatedRequest } from '../middlewares/auth.js';
import { logAuditEvent } from '../services/auditService.js';

export async function getAllDoctors(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { department, search, available } = req.query;

    const whereClause: any = {};

    if (department && department !== 'all') {
      whereClause.department = { slug: String(department) };
    }

    if (available === 'true') {
      whereClause.isAvailableForBooking = true;
    }

    if (search) {
      const q = String(search);
      whereClause.OR = [
        { nameEn: { contains: q, mode: 'insensitive' } },
        { nameHi: { contains: q } },
        { specializationEn: { contains: q, mode: 'insensitive' } },
      ];
    }

    const doctors = await prisma.doctor.findMany({
      where: whereClause,
      include: {
        department: {
          select: { id: true, slug: true, nameEn: true, nameHi: true },
        },
      },
      orderBy: { orderIndex: 'asc' },
    });

    res.status(200).json({ success: true, count: doctors.length, data: doctors });
  } catch (error) {
    next(error);
  }
}

export async function getDoctorById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { idOrSlug } = req.params;

    const doctor = await prisma.doctor.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: {
        department: true,
      },
    });

    if (!doctor) {
      res.status(404).json({ success: false, message: 'Doctor not found.' });
      return;
    }

    res.status(200).json({ success: true, data: doctor });
  } catch (error) {
    next(error);
  }
}

export async function createDoctor(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = req.body;

    const slug = data.slug || data.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const doctor = await prisma.doctor.create({
      data: {
        slug,
        departmentId: data.departmentId,
        nameEn: data.nameEn,
        nameHi: data.nameHi || data.nameEn,
        qualifications: data.qualifications,
        specializationEn: data.specializationEn,
        specializationHi: data.specializationHi || data.specializationEn,
        experienceYears: Number(data.experienceYears) || 5,
        consultationFee: Number(data.consultationFee) || 500,
        photoUrl: data.photoUrl || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
        bioEn: data.bioEn || '',
        bioHi: data.bioHi || '',
        expertiseEn: data.expertiseEn || [],
        expertiseHi: data.expertiseHi || [],
        opdDays: data.opdDays || ['Monday', 'Wednesday', 'Friday'],
        opdTime: data.opdTime || '09:00 AM - 02:00 PM',
        roomNumber: data.roomNumber || 'OPD-101',
        isHeadOfDepartment: Boolean(data.isHeadOfDepartment),
        isAvailableForBooking: data.isAvailableForBooking !== undefined ? Boolean(data.isAvailableForBooking) : true,
      },
    });

    if (req.user) {
      await logAuditEvent({
        userId: req.user.userId,
        userEmail: req.user.email,
        action: 'CREATE_DOCTOR',
        entity: 'Doctor',
        entityId: doctor.id,
        details: { doctorName: doctor.nameEn, slug: doctor.slug },
      });
    }

    res.status(201).json({ success: true, message: 'Doctor profile created successfully.', data: doctor });
  } catch (error) {
    next(error);
  }
}

export async function updateDoctor(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const data = req.body;

    const doctor = await prisma.doctor.update({
      where: { id },
      data: {
        ...data,
        experienceYears: data.experienceYears !== undefined ? Number(data.experienceYears) : undefined,
        consultationFee: data.consultationFee !== undefined ? Number(data.consultationFee) : undefined,
      },
    });

    if (req.user) {
      await logAuditEvent({
        userId: req.user.userId,
        userEmail: req.user.email,
        action: 'UPDATE_DOCTOR',
        entity: 'Doctor',
        entityId: doctor.id,
        details: { doctorName: doctor.nameEn },
      });
    }

    res.status(200).json({ success: true, message: 'Doctor profile updated successfully.', data: doctor });
  } catch (error) {
    next(error);
  }
}

export async function deleteDoctor(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    const doctor = await prisma.doctor.delete({
      where: { id },
    });

    if (req.user) {
      await logAuditEvent({
        userId: req.user.userId,
        userEmail: req.user.email,
        action: 'DELETE_DOCTOR',
        entity: 'Doctor',
        entityId: id,
        details: { doctorName: doctor.nameEn },
      });
    }

    res.status(200).json({ success: true, message: 'Doctor profile removed.' });
  } catch (error) {
    next(error);
  }
}

