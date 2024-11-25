import { Router } from 'express';
import express from 'express';

import {
  createStudentController,
  deleteStudentController,
  getAllStudentsController,
  getStudentByIdController,
  updateStudentsController,
} from '../controllers/students.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const jsonParser = express.json();

const router = Router();

router.get('/', ctrlWrapper(getAllStudentsController));
router.get('/:studentId', ctrlWrapper(getStudentByIdController));
router.post('/', jsonParser, ctrlWrapper(createStudentController));
router.patch('/:studentId', jsonParser, ctrlWrapper(updateStudentsController));
router.delete('/:studentId', ctrlWrapper(deleteStudentController));

export default router;
