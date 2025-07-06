import express from "express";
import multer from "multer";
import {
  submitAssignment,
  getSubmissionsByAssignment,
  getStudentSubmissions,
  deleteSubmission,
} from "../controllers/submission.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// ✅ Multer config
const upload = multer({ dest: "uploads/submissions/" });

// 🔒 Submit an assignment
router.post(
  "/submit/:assignmentId",
  authMiddleware,
  upload.single("file"),
  submitAssignment
);

// 🔒 Get submissions for an assignment (admin/teacher)
router.get(
  "/assignment/:assignmentId",
  authMiddleware,
  getSubmissionsByAssignment
);

// 🔒 Get all submissions by student
router.get(
  "/student/me",
  authMiddleware,
  getStudentSubmissions
);

// 🔒 Delete submission by ID
router.delete("/:id", authMiddleware, deleteSubmission);

export default router;
