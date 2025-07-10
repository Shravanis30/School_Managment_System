


// import express from "express";
// import multer from 'multer';
// import Syllabus from "../models/syllabus.model.js";
// import authMiddleware from "../middlewares/auth.middleware.js";

// const router = express.Router();

// // ✅ Declare 'upload' before using it
// const upload = multer({ dest: 'uploads/' });

// // ✅ Now safe to use 'upload'
// router.post('/upload',authMiddleware ,upload.single('syllabus'), async (req, res) => {
//   try {
//     const className = req.body.class.replace(/^Class\s*/, '');
//     const fileUrl = `/uploads/${req.file.filename}`;

//     let syllabus = await Syllabus.findOne({ class: className });
//     if (syllabus) {
//       syllabus.syllabusURL = fileUrl;
//       await syllabus.save();
//     } else {
//       syllabus = await Syllabus.create({ class: className, syllabusURL: fileUrl });
//     }

//     res.status(200).json({ message: 'Syllabus uploaded successfully', url: fileUrl });
//   } catch (err) {
//     res.status(500).json({ message: 'Upload failed', error: err.message });
//   }
// });

// // ... other routes

// // GET syllabus by classId
// router.get('/:classId', authMiddleware,async (req, res) => {
//   try {
//     console.log("Fetching syllabus for:", req.params.classId);
//     const classId = req.params.classId.replace(/^Class\s*/, '');
//     const syllabus = await Syllabus.findOne({ class: classId });
//     if (!syllabus) {
//       console.log("Not found");
//       return res.status(404).json({ message: "Syllabus not found" });
//     }
//     console.log("Found syllabus:", syllabus.syllabusURL);
//     res.status(200).json(syllabus);
//   } catch (error) {
//     console.error("Fetch error", error);
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // DELETE syllabus by classId
// router.delete("/:classId", authMiddleware,async (req, res) => {
//   try {
//     const classId = req.params.classId.replace(/^Class\s*/, ''); // remove "Class " if present

//     await Syllabus.findOneAndDelete({ class: classId });
//     res.json({ message: "Syllabus deleted" });
//   } catch (err) {
//     res.status(500).json({ error: "Delete failed" });
//   }
// });

// export default router;


// routes/syllabus.routes.js
import express from "express";
import multer from 'multer';
import {
  uploadSyllabus,
  getSyllabusByClass,
  deleteSyllabus,
  getAllSyllabusForAdmin
} from '../controllers/syllabus.controller.js';
import { uploadResourcePDF } from "../middlewares/multerConfig.middleware.js";

// Correct import based on actual folder name
import authMiddleware, { authorizeRole } from '../middlewares/auth.middleware.js';



const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', uploadResourcePDF.single('file'), async (req, res) => {
  try {
    const { className } = req.body;
    if (!req.file || !className) {
      return res.status(400).json({ error: 'Missing file or class name' });
    }

    const syllabusURL = `${process.env.BASE_URL}/uploads/resources/${req.file.filename}`; // or use req.protocol + req.get('host')

    const syllabus = await Syllabus.create({
      class: className,
      syllabusURL,
    });

    res.status(201).json(syllabus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload syllabus' });
  }
});

// ✅ Upload Syllabus PDF
// router.post('/upload', authMiddleware, upload.single('syllabus'), async (req, res, next) => {
//   try {
//     if (req.role !== 'admin') return res.status(403).json({ message: 'Only admins allowed' });

//     const className = req.body.class.replace(/^Class\s*/, '');
//     const fileUrl = `/uploads/${req.file.filename}`;

//     let syllabus = await Syllabus.findOne({ class: className, adminId: req.user._id });
//     if (syllabus) {
//       syllabus.syllabusURL = fileUrl;
//       await syllabus.save();
//     } else {
//       syllabus = await Syllabus.create({ class: className, syllabusURL: fileUrl, adminId: req.user._id });
//     }

//     res.status(200).json({ message: 'Syllabus uploaded successfully', url: fileUrl });
//   } catch (err) {
//     res.status(500).json({ message: 'Upload failed', error: err.message });
//   }
// });

// ✅ Get Syllabus by class
router.get('/:classId', authMiddleware, getSyllabusByClass);

// ✅ Delete syllabus
router.delete('/:classId', authMiddleware, deleteSyllabus);

router.get('/admin/all', authMiddleware, authorizeRole('admin'), getAllSyllabusForAdmin);

export default router;
