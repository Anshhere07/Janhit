import { createApp } from './app.js';
import { ENV } from './config/env.js';
import { connectDatabase, prisma } from './config/prisma.js';

const app = createApp();

async function startServer() {
  await connectDatabase();

  const server = app.listen(ENV.PORT, () => {
    console.log(`
========================================================================
🏥 JANHIT HOSPITAL (जनहित हॉस्पिटल) API BACKEND SERVER
========================================================================
🚀 Server running at: http://localhost:${ENV.PORT}
📡 API Base URL:      http://localhost:${ENV.PORT}/api/v1
🛡️ Environment:       ${ENV.NODE_ENV}
🔒 Security:          Helmet, CORS, JWT, Rate-Limiting Active
========================================================================
`);
  });

  // Graceful shutdown handling
  const shutdown = async (signal: string) => {
    console.log(`\n🛑 Received ${signal}. Gracefully shutting down Janhit Hospital API Server...`);
    server.close(async () => {
      await prisma.$disconnect();
      console.log('✅ PostgreSQL connection closed. Server terminated safely.');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

// Only start the standalone HTTP listener when running locally or in standalone container
// On Vercel, the exported Express app is managed directly by Vercel Fluid serverless compute
if (!process.env.VERCEL) {
  startServer().catch((error) => {
    console.error('Fatal error during server startup:', error);
    process.exit(1);
  });
}

export default app;

