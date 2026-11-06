import { Router } from 'express';
import {
  getAllGalleryItems,
  createGalleryItem,
  deleteGalleryItem,
} from '../controllers/galleryController.js';
import { authenticate } from '../middlewares/auth.js';
import { authorizeRoles } from '../middlewares/role.js';

export const galleryRouter = Router();

// Public gallery view
galleryRouter.get('/', getAllGalleryItems);

// Admin-protected media upload & deletion
galleryRouter.post('/', authenticate, authorizeRoles('SUPER_ADMIN', 'ADMIN', 'CONTENT_EDITOR'), createGalleryItem);
galleryRouter.delete('/:id', authenticate, authorizeRoles('SUPER_ADMIN', 'ADMIN', 'CONTENT_EDITOR'), deleteGalleryItem);

