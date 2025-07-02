
// routes/assignment.routes.js
import express from 'express';
import multer from 'multer';
import Assignment from '../models/assignment.model.js';
import Submission from '../models/submission.model.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import mongoose from 'mongoose';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// POST /upload
router.post('/upload', authMiddleware, async (req, res) => {
  try {
    const { classId, subject, title, description, dueDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ message: 'Invalid class ID' });
    }

    const newAssignment = new Assignment({
      className: classId, // Use the ObjectId directly if it's already valid
      subject,
      title,
      description,
      dueDate,
    });

    await newAssignment.save();

    res.status(201).json({ message: 'Assignment uploaded successfully' });
  } catch (err) {
    console.error("Upload error:", err.message);
    res.status(500).json({ message: 'Error uploading assignment' });
  }
});


// GET /class/:className


// router.get('/class/:className', authMiddleware, async (req, res) => {
//   try {
//     const classId = new mongoose.Types.ObjectId(req.params.className);
//     const assignments = await Assignment.find({ className: classId });
//     res.json(assignments);
//   } catch (err) {
//     console.error("Assignment fetch error:", err.message);
//     res.status(500).json({ message: 'Error fetching assignments' });
//   }
// });

router.get('/class/:className', authMiddleware, async (req, res) => {
  try {
    // const classId = new mongoose.Types.ObjectId(req.params.className); // convert to ObjectId
    // const assignments = await Assignment.find({ className: classId });

    const assignments = await Assignment.find({ className: req.params.className });
    res.json(assignments);
  } catch (err) {
    console.error("Assignment fetch error:", err.message);
    res.status(500).json({ message: 'Error fetching assignments' });
  }
});




// POST /submit
router.post('/submit', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const { assignmentId } = req.body;
    const studentId = req.user.id;
    const submittedFile = `http://localhost:5000/uploads/${req.file.filename}`;

    const submission = new Submission({ assignmentId, studentId, submittedFile });
    await submission.save();
    res.status(201).json({ message: 'Assignment submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting assignment' });
  }
});

// GET /submissions/:className/:subject
router.get('/submissions/:className/:subject', authMiddleware, async (req, res) => {
  try {
    const assignments = await Assignment.find({
      className: req.params.className,
      subject: req.params.subject,
    });
    const assignmentIds = assignments.map(a => a._id);

    const submissions = await Submission.find({ assignmentId: { $in: assignmentIds } })
      .populate('studentId', 'fullName')
      .populate('assignmentId', 'title');

    res.json(submissions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching submissions' });
  }
});

export default router;