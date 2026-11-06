import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma.js';
import { AuthenticatedRequest } from '../middlewares/auth.js';
import { logAuditEvent } from '../services/auditService.js';

export async function getAllDepartments(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const departments = await prisma.department.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { doctors: true, treatments: true },
        },
      },
      orderBy: { orderIndex: 'asc' },
    });

    res.status(200).json({ success: true, count: departments.length, data: departments });
  } catch (error) {
    next(error);
  }
}

export async function getDepartmentById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { idOrSlug } = req.params;

    const department = await prisma.department.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: {
        doctors: {
          where: { isAvailableForBooking: true },
          orderBy: { orderIndex: 'asc' },
        },
        treatments: {
          where: { isActive: true },
        },
      },
    });

    if (!department) {
      res.status(404).json({ success: false, message: 'Department not found.' });
      return;
    }

    res.status(200).json({ success: true, data: department });
  } catch (error) {
    next(error);
  }
}

export async function createDepartment(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = req.body;
    const slug = data.slug || data.nameEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const department = await prisma.department.create({
      data: {
        slug,
        nameEn: data.nameEn,
        nameHi: data.nameHi || data.nameEn,
        shortIntroEn: data.shortIntroEn || '',
        shortIntroHi: data.shortIntroHi || '',
        overviewEn: data.overviewEn || '',
        overviewHi: data.overviewHi || '',
        icon: data.icon || 'HeartPulse',
        bannerImage: data.bannerImage || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
        bedCapacity: Number(data.bedCapacity) || 20,
        opdSchedule: data.opdSchedule || '08:00 AM - 08:00 PM',
        emergencyAvailable: Boolean(data.emergencyAvailable),
        servicesEn: data.servicesEn || [],
        servicesHi: data.servicesHi || [],
        conditionsEn: data.conditionsEn || [],
        conditionsHi: data.conditionsHi || [],
      },
    });

    if (req.user) {
      await logAuditEvent({
        userId: req.user.userId,
        userEmail: req.user.email,
        action: 'CREATE_DEPARTMENT',
        entity: 'Department',
        entityId: department.id,
        details: { name: department.nameEn, slug: department.slug },
      });
    }

    res.status(201).json({ success: true, message: 'Department created successfully.', data: department });
  } catch (error) {
    next(error);
  }
}

export async function updateDepartment(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const data = req.body;

    const department = await prisma.department.update({
      where: { id },
      data: {
        ...data,
        bedCapacity: data.bedCapacity !== undefined ? Number(data.bedCapacity) : undefined,
      },
    });

    if (req.user) {
      await logAuditEvent({
        userId: req.user.userId,
        userEmail: req.user.email,
        action: 'UPDATE_DEPARTMENT',
        entity: 'Department',
        entityId: department.id,
        details: { name: department.nameEn },
      });
    }

    res.status(200).json({ success: true, message: 'Department updated.', data: department });
  } catch (error) {
    next(error);
  }
}

export async function deleteDepartment(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    const department = await prisma.department.delete({
      where: { id },
    });

    if (req.user) {
      await logAuditEvent({
        userId: req.user.userId,
        userEmail: req.user.email,
        action: 'DELETE_DEPARTMENT',
        entity: 'Department',
        entityId: id,
        details: { name: department.nameEn },
      });
    }

    res.status(200).json({ success: true, message: 'Department deleted.' });
  } catch (error) {
    next(error);
  }
}

