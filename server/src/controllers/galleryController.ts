import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma.js';
import { AuthenticatedRequest } from '../middlewares/auth.js';
import { logAuditEvent } from '../services/auditService.js';

export async function getAllGalleryItems(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category, mediaType } = req.query;

    const whereClause: any = {};

    if (category && category !== 'all') {
      whereClause.category = String(category);
    }

    if (mediaType) {
      whereClause.mediaType = String(mediaType);
    }

    const items = await prisma.galleryItem.findMany({
      where: whereClause,
      orderBy: { orderIndex: 'asc' },
    });

    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
}

export async function createGalleryItem(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = req.body;

    const item = await prisma.galleryItem.create({
      data: {
        titleEn: data.titleEn,
        titleHi: data.titleHi || data.titleEn,
        descriptionEn: data.descriptionEn || null,
        descriptionHi: data.descriptionHi || null,
        category: data.category || 'building',
        imageUrl: data.imageUrl,
        thumbnailUrl: data.thumbnailUrl || data.imageUrl,
        mediaType: data.mediaType || 'image',
        videoUrl: data.videoUrl || null,
        duration: data.duration || null,
        isFeatured: Boolean(data.isFeatured),
      },
    });

    if (req.user) {
      await logAuditEvent({
        userId: req.user.userId,
        userEmail: req.user.email,
        action: 'CREATE_GALLERY_ITEM',
        entity: 'GalleryItem',
        entityId: item.id,
        details: { category: item.category, title: item.titleEn },
      });
    }

    res.status(201).json({ success: true, message: 'Gallery item added.', data: item });
  } catch (error) {
    next(error);
  }
}

export async function deleteGalleryItem(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    const item = await prisma.galleryItem.delete({
      where: { id },
    });

    if (req.user) {
      await logAuditEvent({
        userId: req.user.userId,
        userEmail: req.user.email,
        action: 'DELETE_GALLERY_ITEM',
        entity: 'GalleryItem',
        entityId: id,
        details: { title: item.titleEn },
      });
    }

    res.status(200).json({ success: true, message: 'Gallery media deleted.' });
  } catch (error) {
    next(error);
  }
}

