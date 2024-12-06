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
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';
import { ROLES } from '../constants/index.js';

const jsonParser = express.json();

const router = Router();

router.get(
  '/',
  authenticate,
  checkRoles(ROLES.TEACHER),
  ctrlWrapper(getAllStudentsController),
);
router.get(
  '/:studentId',
  authenticate,
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  ctrlWrapper(getStudentByIdController),
);

router.post(
  '/',
  authenticate,
  checkRoles(ROLES.TEACHER),
  validateBody(createStudentSchema),
  jsonParser,
  ctrlWrapper(createStudentController),
);

router.patch(
  '/:studentId',
  authenticate,
  checkRoles(ROLES.TEACHER, ROLES.PARENT),
  isValidId,
  validateBody(updateStudentSchema),
  jsonParser,
  ctrlWrapper(updateStudentsController),
);
router.delete(
  '/:studentId',
  authenticate,
  checkRoles(ROLES.TEACHER),
  isValidId,
  ctrlWrapper(deleteStudentController),
);

export default router;
