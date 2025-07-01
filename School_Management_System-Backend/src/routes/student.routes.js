import express from "express";
import {
  createStudent,
  loginStudent,
} from "../controllers/student.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", authMiddleware, createStudent); 
router.post("/login", loginStudent);

export default router;
