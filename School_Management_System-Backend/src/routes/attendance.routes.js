// import express from 'express';
// import { markAttendance, getStudentAttendance, saveAttendance } from '../controllers/attendance.controller.js';
// import authMiddleware from '../middlewares/auth.middleware.js';
// const router = express.Router();

// router.post('/mark', markAttendance);
// router.get('/get-by-date', getStudentAttendance);
// router.post("/save", authMiddleware, saveAttendance);
// router.get('/attendance/student/:id', async (req, res) => {
//   try {
//     const attendance = await attendance.findOne({ studentId: req.params.id });
//     if (!attendance) return res.status(404).json({ message: 'No attendance found' }); // ❌ THIS LINE
//     res.json(attendance);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// });

// export default router;


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
