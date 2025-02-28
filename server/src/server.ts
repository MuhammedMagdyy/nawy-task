import 'dotenv/config';
import express from 'express';
import { nodeEnv, port, prismaClient } from './config';
import { errorHandler } from './middlewares';
import routes from './routes';
import { logger } from './utils';

const app = express();

app.get('/', (_, res) => {
  res.send(
    '<div style="text-align: center; margin-top: 20px;"><h1>Welcome to Apartments API 🚀</h1></div>'
  );
});

app.use(express.json({ limit: '5mb' }));
app.use('/api/v1', routes);
app.use(errorHandler);

export const up = async () => {
  try {
    await prismaClient.connect();

    const server = app.listen(port, () => {
      logger.info(`Server is running on ${port} 🚀 in ${nodeEnv} mode`);
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
