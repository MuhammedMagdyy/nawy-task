import 'dotenv/config';
import express from 'express';
import { logger } from './utils';
import { port } from './config';

const app = express();

app.use(express.json());

app.get('/', (_, res) => {
  res.send(
    '<div style="text-align: center; margin-top: 20px;"><h1>Welcome to Apartments API 🚀</h1></div>'
  );
});

app.listen(port, () => {
  logger.info(`Server is running on port ${port} 🚀`);
});
