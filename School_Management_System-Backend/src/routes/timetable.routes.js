// routes/timetable.routes.js
import express from 'express';
import {
  uploadTimetable,
  getTimetableByClassName,
  deleteTimetableByClass,
} from '../controllers/timetable.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();

router.post('/', authMiddleware, uploadTimetable);
router.get('/:classId',authMiddleware, getTimetableByClassName);
router.delete('/:classId',authMiddleware, deleteTimetableByClass);

export default router;
