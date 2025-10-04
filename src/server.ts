import http, { Server } from 'http';
import dotenv from 'dotenv';
import app from './app';
import { prisma } from './config/db';
import { seedAdmin } from './modules/user/user.controller';

dotenv.config();

let server: Server | null = null;

async function connectToDB() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected');
  } catch (error) {
    console.error('❌ DB connection error:', error);
    process.exit(1);
  }
}

async function startServer() {
  try {
    await connectToDB();

    // Seed admin on server start
    await seedAdmin();

    server = http.createServer(app);
    server.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });

    handleProcessEvents();
  } catch (error) {
    console.error('❌ Error during server startup:', error);
    process.exit(1);
  }
}

async function gracefulShutdown(signal: string) {
  console.warn(`🔄 Received ${signal}, shutting down gracefully...`);

  if (server) {
    server.close(async () => {
      console.log('✅ HTTP server closed.');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

function handleProcessEvents() {
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  process.on('uncaughtException', (error) => {
    console.error('💥 Uncaught Exception:', error);
    gracefulShutdown('uncaughtException');
  });
  process.on('unhandledRejection', (reason) => {
    console.error('💥 Unhandled Rejection:', reason);
    gracefulShutdown('unhandledRejection');
  });
}

startServer();
