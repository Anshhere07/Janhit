import { Router } from 'express';
import {
  getAllBlogs,
  getBlogCategories,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { authenticate } from '../middlewares/auth.js';
import { authorizeRoles } from '../middlewares/role.js';

export const blogRouter = Router();

// Public routes
blogRouter.get('/', getAllBlogs);
blogRouter.get('/categories', getBlogCategories);
blogRouter.get('/:slug', getBlogBySlug);

// Admin-protected routes
blogRouter.post('/', authenticate, authorizeRoles('SUPER_ADMIN', 'ADMIN', 'CONTENT_EDITOR'), createBlog);
blogRouter.put('/:id', authenticate, authorizeRoles('SUPER_ADMIN', 'ADMIN', 'CONTENT_EDITOR'), updateBlog);
blogRouter.delete('/:id', authenticate, authorizeRoles('SUPER_ADMIN', 'ADMIN', 'CONTENT_EDITOR'), deleteBlog);

