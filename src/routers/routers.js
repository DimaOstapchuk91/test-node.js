import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getAllStudentsController,
  getStudentByIdController,
} from '../controllers/controllers.js';

const router = Router();

router.get('/', ctrlWrapper(getAllStudentsController));

router.get('/:studentId', ctrlWrapper(getStudentByIdController));

export default router;
