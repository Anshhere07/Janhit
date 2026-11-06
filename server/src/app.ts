import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { ENV } from './config/env.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { apiLimiter } from './middlewares/rateLimiter.js';

// Route imports
import { authRouter } from './routes/authRoutes.js';
import { doctorRouter } from './routes/doctorRoutes.js';
import { departmentRouter } from './routes/departmentRoutes.js';
import { appointmentRouter } from './routes/appointmentRoutes.js';
import { blogRouter } from './routes/blogRoutes.js';
import { galleryRouter } from './routes/galleryRoutes.js';
import { enquiryRouter } from './routes/enquiryRoutes.js';
import { settingRouter } from './routes/settingRoutes.js';
import { statsRouter } from './routes/statsRoutes.js';

export function createApp(): Express {
  const app = express();

  // 1. Security Headers
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
      contentSecurityPolicy: false, // Allows flexible API usage
    })
  );

  // 2. CORS configuration (supports local dev, production domain, and Vercel deployments)
  app.use(
    cors({
      origin: (origin, callback) => {
        if (
          !origin ||
          origin === ENV.CORS_ORIGIN ||
          origin.includes('localhost') ||
          origin.includes('127.0.0.1') ||
          origin.endsWith('.vercel.app')
        ) {
          callback(null, true);
        } else {
          callback(null, true); // Allow configured hospital domains
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    })
  );

  // 3. Body parsers
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // 4. Rate Limiter for general endpoints
  app.use('/api', apiLimiter);

  // 5. Health Check & Root Info (accessible at /health, /api/health, and /api)
  app.get(['/health', '/api/health', '/api'], (req: Request, res: Response) => {
    res.status(200).json({
      status: 'UP',
      hospital: 'Janhit Hospital (जनहित हॉस्पिटल) API Backend',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // 6. API v1 Routes
  const apiV1 = express.Router();
  apiV1.use('/auth', authRouter);
  apiV1.use('/doctors', doctorRouter);
  apiV1.use('/departments', departmentRouter);
  apiV1.use('/appointments', appointmentRouter);
  apiV1.use('/blogs', blogRouter);
  apiV1.use('/gallery', galleryRouter);
  apiV1.use('/enquiries', enquiryRouter);
  apiV1.use('/settings', settingRouter);
  apiV1.use('/stats', statsRouter);

  app.use('/api/v1', apiV1);
  app.use('/api', apiV1); // Compatibility alias

  // 7. 404 Route Handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: `Endpoint ${req.method} ${req.url} does not exist on Janhit Hospital API Server.`,
    });
  });

  // 8. Global Centralized Error Handler
  app.use(errorHandler);

  return app;
}

