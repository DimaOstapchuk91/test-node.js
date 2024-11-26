import express from 'express';
// import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import router from './routers/students.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(cors());

  // app.use(
  //   pino({
  //     transport: {
  //       target: 'pino-pretty',
  //     },
  //   }),
  // );

  app.use('/students', router);

  app.use('*', notFoundHandler);

  // обробка всіх помилок
  app.use(errorHandler);

  // метод для розгортання сервера
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
