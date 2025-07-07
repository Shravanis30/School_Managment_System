// import express from 'express';
// import { createTeacher, getTeachers, getAllTeachers, loginTeacher, deleteTeacherController } from '../controllers/teacher.controller.js';
// import { authorizeRole } from '../middlewares/auth.middleware.js';
// import authMiddleware from '../middlewares/auth.middleware.js';

// const router = express.Router();

// // router.post('/create', authMiddleware, createTeacher);
// router.post("/create", authMiddleware, createTeacher);

// router.get('/list', authMiddleware, getTeachers);
// router.post('/login', loginTeacher); 

// // DELETE /api/teachers/:id
// router.delete('/:id', authMiddleware, deleteTeacherController);

// router.get('/', authMiddleware, getAllTeachers);

// export default router;



// routes/teacher.routes.js
import express from 'express';
import {
  createTeacher,
  getTeachers,
  loginTeacher,
  deleteTeacherController,
  getStudentsByClassForTeacher
} from '../controllers/teacher.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { authorizeRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createTeacher);
router.get('/list', authMiddleware, getTeachers);
router.post('/login', loginTeacher);
router.delete('/:id', authMiddleware, deleteTeacherController);
// In teacher.routes.js
router.get(
  '/students-by-class/:className',
  authMiddleware,
  authorizeRole('teacher'),
  getStudentsByClassForTeacher
);
export default router;
