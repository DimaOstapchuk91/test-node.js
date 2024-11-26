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
import { validateBody } from '../middlewares/validateBody.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students.js';
import { isValidId } from '../middlewares/isValidId.js';

const jsonParser = express.json();

const router = Router();

router.get('/', ctrlWrapper(getAllStudentsController));
router.get('/:studentId', isValidId, ctrlWrapper(getStudentByIdController));
router.post(
  '/',
  validateBody(createStudentSchema),
  jsonParser,
  ctrlWrapper(createStudentController),
);
router.patch(
  '/:studentId',
  isValidId,
  validateBody(updateStudentSchema),
  jsonParser,
  ctrlWrapper(updateStudentsController),
);
router.delete('/:studentId', isValidId, ctrlWrapper(deleteStudentController));

export default router;
