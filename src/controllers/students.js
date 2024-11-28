import createHttpError from 'http-errors';
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from '../services/students.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getAllStudentsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const students = await getAllStudents({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

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

export const createStudentController = async (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw createHttpError(400, 'Request body is missing');
  }

  const student = await createStudent(req.body);

  if (!student) throw createHttpError(404, 'Failed to create student');

  res.status(201).json({
    status: 201,
    message: 'Student successfully created',
    data: student,
  });
};

export const updateStudentsController = async (req, res) => {
  const { studentId } = req.params;

  if (!req.body || Object.keys(req.body).length === 0) {
    throw createHttpError(400, 'Request body is missing');
  }

  const student = await updateStudent(studentId, req.body);

  if (!student) throw createHttpError(404, 'Student Not Found');

  res.status(200).json({
    status: 201,
    message: 'Student successfully changed',
    data: student,
  });
};

export const deleteStudentController = async (req, res) => {
  const { studentId } = req.params;

  const student = await deleteStudent(studentId);

  if (!student) throw createHttpError(404, 'Student Not Found');

  res.status(204).send();
};
