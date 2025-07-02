import express from 'express';
import { createTeacher, getTeachers, getAllTeachers, loginTeacher, deleteTeacherController } from '../controllers/teacher.controller.js';
import { authorizeRole } from '../middlewares/auth.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// router.post('/create', authMiddleware, createTeacher);
router.post("/create", authorizeRole("admin"), createTeacher);

router.get('/list', authMiddleware, getTeachers);
router.post('/login', loginTeacher); 

// DELETE /api/teachers/:id
router.delete('/:id', authMiddleware, deleteTeacherController);

router.get('/', getAllTeachers);

export default router;