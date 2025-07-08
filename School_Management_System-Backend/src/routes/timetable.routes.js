
// routes/timetable.routes.js
import express from 'express';
import {
  uploadTimetable,
  getTimetableByClassName,
  deleteTimetableByClass,
  getAllTimetablesForAdmin
} from '../controllers/timetable.controller.js';
import { authMiddleware, authorizeRole } from '../middlewares/auth.middleware.js'; 

const router = express.Router();

router.post('/', authMiddleware, uploadTimetable);
router.get('/:className', authMiddleware, getTimetableByClassName);
router.delete('/:className', authMiddleware, deleteTimetableByClass);

router.get('/admin/all', authMiddleware, authorizeRole('admin'), getAllTimetablesForAdmin);


export default router;
