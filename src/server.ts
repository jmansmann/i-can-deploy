import { config } from './config/config';
import { logger } from './utils/logger';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import usersRouter from './routes/users';

async function main() {
  logger.info('Starting application', {
    environment: config.nodeEnv,
    port: config.port,
  });

  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(morgan('dev'));

  app.use('/users', usersRouter);

  const PORT = process.env.PORT ?? 3000;
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });


  logger.info('Application started successfully');
}

// Graceful shutdown handling
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

main().catch((error) => {
  logger.error('Failed to start application', { error });
  process.exit(1);
});
