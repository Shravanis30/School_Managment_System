// import express from 'express';
// import multer from 'multer';
// import authMiddleware from '../middlewares/auth.middleware.js';
// import {
//   uploadResult,
//   listResultsByClass,
//   deleteResultById,
//   getStudentResults,
// } from '../controllers/result.controller.js';

// const router = express.Router();

// // ✅ Multer config (uploads to uploads/results/)
// const upload = multer({ dest: 'uploads/results/' });

// // ✅ Upload final result PDF for a student (Admin only)
// router.post('/:classId/:studentId', authMiddleware, upload.single('file'), uploadResult);

// // ✅ List all results for a class (Admin only)
// router.get('/class/:classId', authMiddleware, listResultsByClass);

// // ✅ Delete result by result _id (Admin only)
// router.delete('/:id', authMiddleware, deleteResultById);

// // ✅ Student view their own result
// router.get('/student', authMiddleware, getStudentResults);

// export default router;


import express from 'express';
import multer from 'multer';
import authMiddleware from '../middlewares/auth.middleware.js';
import {
  uploadResult,
  listResultsByClass,
  deleteResultById,
  getStudentResults,
} from '../controllers/result.controller.js';

const router = express.Router();

// ✅ Multer config (uploads to uploads/results/)
const upload = multer({ dest: 'uploads/results/' });

// ✅ Upload final result PDF for a student (Admin only)
router.post('/:classId/:studentId', authMiddleware, upload.single('file'), uploadResult);

// ✅ List all results for a class (Admin only)
router.get('/class/:classId', authMiddleware, listResultsByClass);

// ✅ Delete result by result _id (Admin only)
router.delete('/:id', authMiddleware, deleteResultById);

// ✅ Student view their own result
router.get('/student', authMiddleware, getStudentResults);

export default router;

