import Submission from "../models/submission.model.js";
import Assignment from "../models/assignment.model.js";
import Student from "../models/student.model.js";
import { ApiError } from "../utils/ApiError.js";
import path from "path";
import fs from "fs";

// ✅ Submit an assignment (Student)
export const submitAssignment = async (req, res) => {
  try {
    if (req.role !== 'student') {
      throw new ApiError(403, "Only students can submit assignments");
    }

    const { assignmentId } = req.params;
    const studentId = req.user._id;
    const file = req.file;

    if (!file) {
      throw new ApiError(400, "No file uploaded");
    }

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      throw new ApiError(404, "Assignment not found");
    }

    const existing = await Submission.findOne({ assignmentId, studentId });
    if (existing) {
      // delete old file
      const oldPath = path.join("public", existing.submittedFile);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      await existing.deleteOne();
    }

    const submission = await Submission.create({
      assignmentId,
      studentId,
      submittedFile: `/uploads/submissions/${file.filename}`,
    });

    res.status(201).json({ message: "Assignment submitted", submission });
  } catch (err) {
    console.error("Submit error:", err);
    res.status(err.statusCode || 500).json({ message: err.message || "Server error" });
  }
};

// ✅ Get submissions for an assignment (Teacher/Admin)
export const getSubmissionsByAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;

    const submissions = await Submission.find({ assignmentId })
      .populate("studentId", "name rollNo className");

    res.status(200).json(submissions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch submissions", error: err.message });
  }
};

// ✅ Get all submissions for logged-in student's assignments
export const getStudentSubmissions = async (req, res) => {
  try {
    if (req.role !== 'student') {
      throw new ApiError(403, "Only students can view their submissions");
    }

    const submissions = await Submission.find({ studentId: req.user._id }).populate("assignmentId");
    res.status(200).json(submissions);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch student submissions", error: err.message });
  }
};

// ✅ Delete a submission (Teacher/Admin)
export const deleteSubmission = async (req, res) => {
  try {
    const { id } = req.params;
    const submission = await Submission.findById(id);

    if (!submission) {
      return res.status(404).json({ message: "Submission not found" });
    }

    const filePath = path.join("public", submission.submittedFile);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await submission.deleteOne();

    res.status(200).json({ message: "Submission deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete submission", error: err.message });
  }
};
