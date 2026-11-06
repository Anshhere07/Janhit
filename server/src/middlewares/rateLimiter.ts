import rateLimit from 'express-rate-limit';

// Global API rate limiter: 15 minutes, max 300 requests
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: {
    success: false,
    message: 'Too many requests from this IP address. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Strict rate limiter for sensitive authentication & login endpoints
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20, // 20 login attempts per 15 minutes
  message: {
    success: false,
    message: 'Too many login attempts. For security reasons, please try again in 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Booking submissions rate limiter
export const bookingLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 15,
  message: {
    success: false,
    message: 'Booking request limit reached. Please wait before submitting another appointment.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

