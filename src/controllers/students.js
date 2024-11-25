import { getAllStudents, getStudentById } from '../services/students.js';
import createHttpError from 'http-errors';

export const getStudentsController = async (req, res, next) => {
  const students = await getAllStudents();

  res.json({
    status: 200,
    message: 'Successfully found students!',
    data: students,
  });
};

export const getStudentByIdController = async (req, res, next) => {
  const { studentId } = req.params;
  const student = await getStudentById(studentId);

  // Код який був до цього
  // if (!student) {
  //   res.status(404).json({
  //     message: "Student not found",
  //   });
  //   return;
  // }

  // А тепер додаємо базову обробку помилки замість res.status(404)
  if (!student) {
    // next(new Error('Student not found'));
    // return;
    throw createHttpError(404, 'Student not found');
  }

  res.json({
    status: 200,
    message: `Successfully found student with id ${studentId}!`,
    data: student,
  });
};
