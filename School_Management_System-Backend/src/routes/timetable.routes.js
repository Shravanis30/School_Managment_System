// routes/timetable.routes.js
import express from 'express';
import {
  uploadTimetable,
  getTimetableByClass,
  deleteTimetableByClass,
} from '../controllers/timetable.controller.js';

const router = express.Router();

router.post('/', uploadTimetable);
router.get('/:classId', getTimetableByClass);
router.delete('/:classId', deleteTimetableByClass);

export default router;
