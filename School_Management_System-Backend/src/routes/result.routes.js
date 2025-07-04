import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import {
  uploadResult,
  listResultsByClass,
  deleteResultById,
  getStudentResults,
} from '../controllers/result.controller.js';

import multer from 'multer';
const upload = multer({ dest: 'uploads/results/' });
const router = express.Router();

router.post('/:classId/:studentId', authMiddleware, upload.single('file'), uploadResult);
router.get('/class/:classId', authMiddleware, listResultsByClass);
router.delete('/:id', authMiddleware, deleteResultById);
router.get('/student', authMiddleware, getStudentResults);

export default router;
