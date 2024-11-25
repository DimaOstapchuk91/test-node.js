import createHttpError from 'http-errors';
import { getAllStudents, getStudentById } from '../services/students.js';

export const getAllStudentsController = async (req, res) => {
  const students = await getAllStudents();

  if (!students) throw createHttpError(404, 'Not found Students');

  res.status(200).json({
    status: 200,
    message: 'Students Successfully',
    data: students,
  });
};

export const getStudentByIdController = async (req, res) => {
  const { studentId } = req.params;

  const student = await getStudentById(studentId);

  if (!student) throw createHttpError(404, 'Student Not Found');

  res.status(200).json({
    status: 200,
    message: 'Students Successfully',
    data: student,
  });
};
