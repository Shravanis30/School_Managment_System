import express from 'express';
import classModel from '../models/class.model.js';
import {
  createClass,
  addSubjectToClass,
  getAllClasses,
  getClassById,
  deleteSubjectFromClass,
} from '../controllers/class.controller.js';

import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();


router.get('/', authMiddleware, getAllClasses);
router.get('/:id', authMiddleware, getClassById);
router.post('/', authMiddleware, createClass);
router.post('/:id/subjects', authMiddleware, addSubjectToClass);
router.delete('/:id/subjects/:subject', authMiddleware, deleteSubjectFromClass);

router.get('/:classId/subjects', authMiddleware, async (req, res) => {
  const { classId } = req.params;
  try {
    // fetch class by ID
    const classDoc = await classModel.findById(classId);

    if (!classDoc) {
      return res.status(404).json({ error: "Class not found" });
    }

    // assuming subjects are stored like: classDoc.subjects = ['Math', 'Science']
    res.json(classDoc.subjects || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while fetching subjects" });
  }
});
export default router;
