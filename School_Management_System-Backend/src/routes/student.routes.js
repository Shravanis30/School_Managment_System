// import express from "express";
// import {
//   createStudent,
//   loginStudent,
//   getStudentsByClass,
//   getAllStudentsGroupedByClass,
//   deleteStudent,
//   getLoggedInStudent
// } from "../controllers/student.controller.js";
// import authMiddleware from "../middlewares/auth.middleware.js";
// import { authorizeRole } from '../middlewares/auth.middleware.js';


// const router = express.Router();

// router.post("/register", authorizeRole("admin"), createStudent);
// router.post("/login", loginStudent);
// router.get("/all", authMiddleware, getAllStudentsGroupedByClass);
// router.get('/by-class/:className', getStudentsByClass);
// router.delete('/:id', deleteStudent);



// router.get('/me', authMiddleware, getLoggedInStudent);

// export default router;


import express from "express";
import {
  createStudent,
  loginStudent,
  getStudentsByClass,
  getAllStudentsGroupedByClass,
  deleteStudent,
  getLoggedInStudent,
} from "../controllers/student.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", authorizeRole("admin"), createStudent);
router.post("/login", loginStudent);
router.get("/all", authMiddleware, getAllStudentsGroupedByClass);
router.get("/by-class/:className", getStudentsByClass);
router.get("/me", authMiddleware, getLoggedInStudent); // ✅ This is required
router.delete("/:id", deleteStudent);

export default router;
