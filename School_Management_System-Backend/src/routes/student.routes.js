import express from "express";
import {
  createStudent,
  loginStudent,
  getStudentsByClassByName,
  getAllStudentsGroupedByClass,
  getStudentsByClassId,
  deleteStudent,
  getStudentsByClass,
  getLoggedInStudent,
} from "../controllers/student.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { authorizeRole } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register",authMiddleware, authorizeRole("admin"), createStudent);
router.post("/login", loginStudent);
router.get("/all", authMiddleware, getAllStudentsGroupedByClass);

router.get("/by-class-name/:className", getStudentsByClassByName);
router.get("/by-class-id/:classId", getStudentsByClassId);
router.get('/class/:classId', authMiddleware, getStudentsByClass);


router.get("/me", authMiddleware, getLoggedInStudent); // ✅ This is required
router.delete("/:id", deleteStudent);

export default router;
