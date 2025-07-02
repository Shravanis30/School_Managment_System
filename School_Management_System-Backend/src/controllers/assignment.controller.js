import Assignment from "../models/assignment.model.js";
import StudentSubmission from "../models/submission.model.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage }).single("file");

export const uploadAssignment = async (req, res) => {
  try {
    const assignment = new Assignment(req.body);
    await assignment.save();
    res.status(201).json({ message: "Assignment uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Upload failed" });
  }
};

export const submitAssignment = async (req, res) => {
  try {
    const fileUrl = `/uploads/${req.file.filename}`;
    const submission = new StudentSubmission({
      assignmentId: req.body.assignmentId,
      studentName: req.body.studentName,
      studentId: req.body.studentId || null,
      submittedFile: fileUrl,
    });
    await submission.save();
    res.status(201).json({ message: "Assignment submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Submission failed" });
  }
};

export const getAssignmentsByClass = async (req, res) => {
  try {
    const assignments = await Assignment.find({ className: req.params.className });
    res.status(200).json(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch assignments" });
  }
};

export const getSubmissionsByClassAndSubject = async (req, res) => {
  try {
    const { className: className, subject } = req.params;
    const assignments = await Assignment.find({ className: className, subject });
    const assignmentIds = assignments.map(a => a._id);
    const submissions = await StudentSubmission.find({ assignmentId: { $in: assignmentIds } })
      .populate("assignmentId")
      .populate("studentId");
    res.status(200).json(submissions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch submissions" });
  }
};