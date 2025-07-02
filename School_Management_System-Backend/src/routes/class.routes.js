import express from 'express';
import {
  createClass,
  addSubjectToClass,
  getAllClasses,
  getClassById,
  deleteSubjectFromClass,
} from '../controllers/class.controller.js';

const router = express.Router();

router.get('/', getAllClasses); // <-- This defines GET /api/classes
router.get('/:id', getClassById);
router.post('/', createClass);
router.post('/:id/subjects', addSubjectToClass);
router.delete('/:id/subjects/:subject', deleteSubjectFromClass); // optional

export default router;
