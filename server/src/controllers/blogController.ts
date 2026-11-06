import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma.js';
import { AuthenticatedRequest } from '../middlewares/auth.js';
import { logAuditEvent } from '../services/auditService.js';
import { BlogStatus } from '@prisma/client';

export async function getAllBlogs(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { category, search, status } = req.query;

    const whereClause: any = {};

    // Public gets published only; Admin can pass status
    if (status && status !== 'ALL') {
      whereClause.status = status as BlogStatus;
    } else if (!status) {
      whereClause.status = BlogStatus.PUBLISHED;
    }

    if (category && category !== 'all') {
      whereClause.categorySlug = String(category);
    }

    if (search) {
      const q = String(search).trim();
      whereClause.OR = [
        { titleEn: { contains: q, mode: 'insensitive' } },
        { titleHi: { contains: q } },
        { excerptEn: { contains: q, mode: 'insensitive' } },
      ];
    }

    const blogs = await prisma.blog.findMany({
      where: whereClause,
      include: {
        category: true,
      },
      orderBy: { publishedDate: 'desc' },
    });

    res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    next(error);
  }
}

export async function getBlogCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const categories = await prisma.blogCategory.findMany({
      include: {
        _count: { select: { blogs: true } },
      },
      orderBy: { nameEn: 'asc' },
    });

    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
}

export async function getBlogBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { slug } = req.params;

    const blog = await prisma.blog.findUnique({
      where: { slug },
      include: {
        category: true,
      },
    });

    if (!blog) {
      res.status(404).json({ success: false, message: 'Article not found.' });
      return;
    }

    // Increment view count asynchronously
    prisma.blog.update({
      where: { id: blog.id },
      data: { viewCount: { increment: 1 } },
    }).catch(() => {});

    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
}

export async function createBlog(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = req.body;
    const slug = data.slug || data.titleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const blog = await prisma.blog.create({
      data: {
        slug,
        titleEn: data.titleEn,
        titleHi: data.titleHi || data.titleEn,
        excerptEn: data.excerptEn || '',
        excerptHi: data.excerptHi || '',
        contentEn: data.contentEn || '',
        contentHi: data.contentHi || '',
        featuredImage: data.featuredImage || 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80',
        author: data.author || 'Janhit Editorial Board',
        authorRole: data.authorRole || 'Medical Communications',
        reviewerDoctorId: data.reviewerDoctorId || null,
        categorySlug: data.categorySlug || 'general-health',
        readTimeEn: data.readTimeEn || '5 min read',
        readTimeHi: data.readTimeHi || '5 मिनट',
        status: data.status || BlogStatus.PUBLISHED,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        tags: data.tags || [],
      },
    });

    if (req.user) {
      await logAuditEvent({
        userId: req.user.userId,
        userEmail: req.user.email,
        action: 'CREATE_BLOG',
        entity: 'Blog',
        entityId: blog.id,
        details: { title: blog.titleEn, slug: blog.slug, status: blog.status },
      });
    }

    res.status(201).json({ success: true, message: 'Blog article created.', data: blog });
  } catch (error) {
    next(error);
  }
}

export async function updateBlog(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const data = req.body;

    const blog = await prisma.blog.update({
      where: { id },
      data,
    });

    if (req.user) {
      await logAuditEvent({
        userId: req.user.userId,
        userEmail: req.user.email,
        action: 'UPDATE_BLOG',
        entity: 'Blog',
        entityId: blog.id,
        details: { title: blog.titleEn },
      });
    }

    res.status(200).json({ success: true, message: 'Blog article updated.', data: blog });
  } catch (error) {
    next(error);
  }
}

export async function deleteBlog(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;

    const blog = await prisma.blog.delete({
      where: { id },
    });

    if (req.user) {
      await logAuditEvent({
        userId: req.user.userId,
        userEmail: req.user.email,
        action: 'DELETE_BLOG',
        entity: 'Blog',
        entityId: id,
        details: { title: blog.titleEn },
      });
    }

    res.status(200).json({ success: true, message: 'Blog article deleted.' });
  } catch (error) {
    next(error);
  }
}

