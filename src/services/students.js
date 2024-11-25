import { StudentsCollection } from '../db/models/student.js';

export const getAllStudents = async () => {
  const students = await StudentsCollection.find();
  return students;
};

export const getStudentById = async (studentId) => {
  const student = await StudentsCollection.findById(studentId);
  return student;
};

export const createStudent = async (payload) => {
  const student = await StudentsCollection.create(payload);
  return student;
};

export const updateStudent = async (studentId, payload) => {
  const student = await StudentsCollection.findByIdAndUpdate(
    studentId,
    payload,
    { new: true },
  );
  return student;
};
