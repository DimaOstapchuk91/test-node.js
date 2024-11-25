import { Router } from 'express';
import express from 'express';

import {
  createStudentController,
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

export default router;
