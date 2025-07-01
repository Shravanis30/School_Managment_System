import express from 'express';
import { createTeacher, getTeachers, loginTeacher } from '../controllers/teacher.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createTeacher);
router.get('/list', authMiddleware, getTeachers);
router.post('/login', loginTeacher); 


export default router;