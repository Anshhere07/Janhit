import dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/janhit_hospital?schema=public',
  JWT_SECRET: process.env.JWT_SECRET || 'janhit_super_secret_jwt_key_2026_change_in_production',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:5173',
  UPLOAD_DIR: process.env.UPLOAD_DIR || './uploads',
  UPLOAD_MAX_SIZE_MB: process.env.UPLOAD_MAX_SIZE_MB ? parseInt(process.env.UPLOAD_MAX_SIZE_MB, 10) : 5,
};

