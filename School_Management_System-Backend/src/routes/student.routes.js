// import express from "express";
// import {
//   createStudent,
//   loginStudent,
//   getStudentsByClassByName,
//   getAllStudentsGroupedByClass,
//   getStudentsByClassId,
//   deleteStudent,
//   getStudentsByClass,
//   getLoggedInStudent,
//   getStudentsByClassName
// } from "../controllers/student.controller.js";
// import authMiddleware from "../middlewares/auth.middleware.js";
// import { authorizeRole } from "../middlewares/auth.middleware.js";
// import Student from "../models/student.model.js";

// const router = express.Router();
// // router.get('/me', authMiddleware, getLoggedInStudent);
// router.get('/me', authMiddleware, (req, res, next) => {
//   console.log('Hitting /me route');
//   next();
// }, getLoggedInStudent);

// router.get('/:classId', authMiddleware, (req, res, next) => {
//   console.log(`Hitting classId route with: ${req.params.classId}`);
//   next();
// }, getStudentsByClass);
// router.post("/login", loginStudent);

// router.get("/by-class-name/:className", getStudentsByClassByName);
// router.get("/by-class-id/:classId", getStudentsByClassId);
// router.post("/register",authMiddleware, authorizeRole("admin"), createStudent);
// router.get("/all", authMiddleware, getAllStudentsGroupedByClass);
// // router.get('/:classId', authMiddleware, getStudentsByClass);
// router.get('/class/:className', getStudentsByClassName);


// // routes/student.routes.js

// export default router;




// routes/student.routes.js
import express from "express";
import {
  createStudent,
  loginStudent,
  getStudentsByClassName,
  getAllStudentsGroupedByClass,
  deleteStudent,
  getLoggedInStudent
} from "../controllers/student.controller.js";
import authMiddleware, { authorizeRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", authMiddleware, authorizeRole("admin"), createStudent);
router.post("/login", loginStudent);
router.get("/me", authMiddleware, getLoggedInStudent);
router.get("/by-class-name/:className", authMiddleware, authorizeRole("admin"), getStudentsByClassName);
router.get("/all", authMiddleware, authorizeRole("admin"), getAllStudentsGroupedByClass);
router.delete("/:id", authMiddleware, authorizeRole("admin"), deleteStudent);

export default router;
