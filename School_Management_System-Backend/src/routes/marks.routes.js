import express from "express";
import Marks from "../models/marks.model.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getMarksForStudent } from "../controllers/marks.controller.js";

const router = express.Router();

router.get("/student", authMiddleware, getMarksForStudent);

// POST /api/marks/multiple-subjects
router.post("/multiple-subjects", authMiddleware, async (req, res) => {
  try {
    const { className, team, totalMarksPerSubject, subjects, studentMarks } = req.body;

    if (!className || !team || !subjects || !studentMarks) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Validate input
    if (!Array.isArray(subjects)) {
      return res.status(400).json({ message: "Subjects must be an array." });
    }
    
    if (!Array.isArray(studentMarks)) {
      return res.status(400).json({ message: "Student marks must be an array." });
    }

    // Save each student's marks
    const results = [];
    for (const entry of studentMarks) {
      const { studentId, marksPerSubject, totalObtained, percentage } = entry;
      
      // Validate marksPerSubject
      if (typeof marksPerSubject !== 'object' || marksPerSubject === null) {
        return res.status(400).json({ message: "Invalid marks format." });
      }

      const createdMark = await Marks.create({
        student: studentId,
        className,
        team,
        subjects,
        marksPerSubject,
        totalObtained,
        percentage,
        totalMarksPerSubject,
      })
      
      results.push(createdMark);
    }

    res.status(201).json({ 
      message: "Marks saved successfully.",
      count: results.length
    });
  } catch (error) {
    console.error("Error saving marks:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;