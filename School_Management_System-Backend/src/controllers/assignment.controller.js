
// import Assignment from "../models/assignment.model.js";
// import StudentSubmission from "../models/submission.model.js";
// import multer from "multer";
// import path from "path";
// import { ApiError } from "../utils/ApiError.js";

// // ✅ Multer config
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // make sure this folder exists
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// export const upload = multer({ storage }).single("file");

// // ✅ Teacher uploads assignment
// export const uploadAssignment = async (req, res) => {
//   try {
//     if (req.role !== "teacher") {
//       throw new ApiError(403, "Only teachers can upload assignments");
//     }

//     const assignment = new Assignment({
//       ...req.body,
//       uploadedBy: req.user._id,
//     });

//     await assignment.save();

//     res.status(201).json({ message: "Assignment uploaded successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(err.statusCode || 500).json({ message: err.message || "Upload failed" });
//   }
// };

// // ✅ Student submits assignment with file
// export const submitAssignment = async (req, res) => {
//   try {
//     if (req.role !== "student") {
//       throw new ApiError(403, "Only students can submit assignments");
//     }

//     if (!req.file) {
//       throw new ApiError(400, "No file uploaded");
//     }

//     const fileUrl = `/uploads/${req.file.filename}`;

//     const submission = new StudentSubmission({
//       assignmentId: req.body.assignmentId,
//       studentName: req.user.name,
//       studentId: req.user._id,
//       submittedFile: fileUrl,
//     });

//     await submission.save();

//     res.status(201).json({ message: "Assignment submitted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(err.statusCode || 500).json({ message: err.message || "Submission failed" });
//   }
// };

// export const getAssignmentsByClass = async (req, res) => {
//   const { className } = req.params;

//   try {
//     const assignments = await Assignment.find({ className }).sort({ dueDate: 1 });
//     res.status(200).json(assignments);
//   } catch (error) {
//     console.error("Error fetching assignments:", error.message);
//     res.status(500).json({ message: "Failed to fetch assignments" });
//   }
// };



// // ✅ GET all submissions for a class and subject (Admin/Teacher)
// export const getSubmissionsByClassAndSubject = async (req, res) => {
//   try {
//     const { className, subject } = req.params;

//     if (req.role !== "teacher" && req.role !== "admin") {
//       throw new ApiError(403, "Only teachers or admins can view submissions");
//     }

//     const assignments = await Assignment.find({ className, subject });
//     const assignmentIds = assignments.map((a) => a._id);

//     const submissions = await StudentSubmission.find({ assignmentId: { $in: assignmentIds } })
//       .populate("assignmentId")
//       .populate("studentId");

//     res.status(200).json(submissions);
//   } catch (err) {
//     console.error(err);
//     res.status(err.statusCode || 500).json({ message: err.message || "Failed to fetch submissions" });
//   }
// };


import Assignment from "../models/assignment.model.js";
import StudentSubmission from "../models/submission.model.js";
import multer from "multer";
import path from "path";
import { ApiError } from "../utils/ApiError.js";

// ✅ Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const upload = multer({ storage }).single("file");

// ✅ Upload Assignment (Teacher only)
export const uploadAssignment = async (req, res) => {
  try {
    if (req.role !== "teacher") {
      throw new ApiError(403, "Only teachers can upload assignments");
    }

    const { classId, subject, title, description, dueDate } = req.body;
    const classDoc = await import('../models/class.model.js').then(m => m.default.findById(classId));
    if (!classDoc) return res.status(404).json({ message: "Class not found" });

    const assignment = new Assignment({
      adminId: req.user.adminId || req.user._id, // ✅ Associate with Admin
      classId,
      className: classDoc.name,
      subject,
      title,
      description,
      dueDate,
      teacherId: req.user._id,
    });

    await assignment.save();

    res.status(201).json({ message: "Assignment uploaded successfully" });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({ message: err.message || "Upload failed" });
  }
};

// ✅ Submit Assignment (Student only)
export const submitAssignment = async (req, res) => {
  try {
    if (req.role !== "student") {
      throw new ApiError(403, "Only students can submit assignments");
    }

    if (!req.file) {
      throw new ApiError(400, "No file uploaded");
    }

    const fileUrl = `/uploads/${req.file.filename}`;

    const submission = new StudentSubmission({
      assignmentId: req.body.assignmentId,
      studentName: req.user.name,
      studentId: req.user._id,
      submittedFile: fileUrl,
    });

    await submission.save();

    res.status(201).json({ message: "Assignment submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({ message: err.message || "Submission failed" });
  }
};

// ✅ Get Assignments by Class (admin only sees their data)
export const getAssignmentsByClass = async (req, res) => {
  const { className } = req.params;

  try {
    const assignments = await Assignment.find({
      className,
      adminId: req.user.adminId || req.user._id, // ✅ Filter by admin
    }).sort({ dueDate: 1 });

    res.status(200).json(assignments);
  } catch (error) {
    console.error("Error fetching assignments:", error.message);
    res.status(500).json({ message: "Failed to fetch assignments" });
  }
};

// ✅ Get Submissions for Class & Subject (teacher/admin only)
export const getSubmissionsByClassAndSubject = async (req, res) => {
  try {
    const { className, subject } = req.params;

    if (req.role !== "teacher" && req.role !== "admin") {
      throw new ApiError(403, "Only teachers or admins can view submissions");
    }

    const assignments = await Assignment.find({
      className,
      subject,
      adminId: req.user.adminId || req.user._id, // ✅ Filter by admin
    });

    const assignmentIds = assignments.map((a) => a._id);

    const submissions = await StudentSubmission.find({
      assignmentId: { $in: assignmentIds },
    })
      .populate("assignmentId", "title")
      .populate("studentId", "name");

    res.status(200).json(submissions);
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({ message: err.message || "Failed to fetch submissions" });
  }
};
