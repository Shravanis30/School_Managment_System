// routes/timetable.routes.js
import express from 'express';
import {
  uploadTimetable,
  getTimetableByClass,
  deleteTimetableByClass,
} from '../controllers/timetable.controller.js';

const router = express.Router();

router.post('/', uploadTimetable);
router.get('/:class', getTimetableByClass);
router.delete('/:class', deleteTimetableByClass);

export default router;
