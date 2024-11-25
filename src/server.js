import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import { getAllStudents, getStudentById } from './services/students.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  // Вбудований у express middleware для обробки (парсингу) JSON-даних у запитах
  // наприклад, у запитах POST або PATCH Обробка JSON-даних: Другий middleware перевіряє, чи дані, які надійшли на сервер, у форматі JSON, і якщо так, розпаковує (парсить) їх.
  app.use(express.json());

  // Штука по безпекі
  app.use(cors());

  // логування часу
  app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

  // Middleware для логування, такий як pino-http, слід розташовувати якомога раніше у ланцюгу middleware, щоб він міг логувати всі вхідні запити до вашого додатку, а також відповіді та можливі помилки, що виникають під час обробки цих запитів. Це означає, що pino повинен бути одним з перших мідлварів, які ви додаєте до екземпляру app.
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // Маршрут для обробки GET-запитів на '/'
  // Обробник GET запита по маршруту ‘/’: Коли запит досягає цього маршруту, сервер відправляє у відповідь JSON з повідомленням ‘Hello, World!’.
  app.get('/', (req, res) => {
    res.json({
      message: 'Hello world!',
    });
  });

  app.get('/students', async (req, res) => {
    const students = await getAllStudents();

    res.status(200).json({ data: students });
  });

  app.get('/students/:studentId', async (req, res) => {
    const { studentId } = req.params;
    const student = await getStudentById(studentId);

    if (!student) {
      res.status(404).json({
        message: 'student not found',
      });
      return;
    }

    res.status(200).json({
      data: student,
    });
  });

  // Middleware для обробки помилок додається завжди самим останнім, після всіх інших middleware та маршрутів, тому що він призначений для обробки помилок, які виникають під час обробки запитів і виконання інших middleware або обробників маршрутів.
  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not Found',
    });
  });

  // обробка всіх помилок
  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  // метод для розгортання сервера
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
