
import express from 'express';
import {
  markAttendance,
  getStudentAttendance,
  saveAttendance
} from '../controllers/attendance.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// ✅ Protected routes using authMiddleware
router.post('/mark', authMiddleware, markAttendance);
router.post('/save', authMiddleware, saveAttendance);

// ✅ Main fix: Student attendance fetch route
router.get('/student/:studentId', authMiddleware, getStudentAttendance);

export default router;
