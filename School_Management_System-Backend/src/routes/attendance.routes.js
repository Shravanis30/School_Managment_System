
// import express from 'express';
// import {
//   markAttendance,
//   getStudentAttendance,
//   saveAttendance
// } from '../controllers/attendance.controller.js';

// import authMiddleware from '../middlewares/auth.middleware.js';

// const router = express.Router();

// // ✅ Protected routes using authMiddleware
// router.post('/mark', authMiddleware, markAttendance);
// router.post('/save', authMiddleware, saveAttendance);

// // ✅ Main fix: Student attendance fetch route
// router.get('/student/:studentId', authMiddleware, getStudentAttendance);

// export default router;


import express from 'express';
import multer from 'multer';
import authMiddleware from '../middlewares/auth.middleware.js';
import {
  uploadAssignment,
  submitAssignment,
  getAssignmentsByClass,
  getSubmissionsByClassAndSubject,
  upload
} from '../controllers/assignment.controller.js';

const router = express.Router();

// ✅ Upload assignment (teacher only)
router.post('/upload', authMiddleware, uploadAssignment);

// ✅ Submit assignment (student with file)
router.post('/submit', authMiddleware, upload, submitAssignment);

// ✅ Get assignments for a class (student/teacher)
router.get('/class/:className', authMiddleware, getAssignmentsByClass);

// ✅ Get all submissions for a class and subject (admin/teacher)
router.get('/submissions/:className/:subject', authMiddleware, getSubmissionsByClassAndSubject);

export default router;
