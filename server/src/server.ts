import 'dotenv/config';
import express from 'express';
import { logger } from './utils';
import { port, prismaClient } from './config';

const app = express();

app.get('/', (_, res) => {
  res.send(
    '<div style="text-align: center; margin-top: 20px;"><h1>Welcome to Apartments API 🚀</h1></div>'
  );
});

app.use(express.json({ limit: '5mb' }));

export const up = async () => {
  try {
    await prismaClient.connect();

    const server = app.listen(port, () => {
      logger.info(`Server is running on ${port} 🚀`);
    });

    process.on('SIGINT', async () => {
      logger.warn('Shutting down gracefully...');

      await prismaClient.disconnect();

      server.close(() => {
        logger.info('Server closed successfully! 👋');
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error(`Error occurred while starting the server - ${error} ❌`);
    process.exit(1);
  }
};
