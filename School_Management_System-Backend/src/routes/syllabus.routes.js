


import express from "express";
import multer from 'multer';
import Syllabus from "../models/syllabus.model.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// ✅ Declare 'upload' before using it
const upload = multer({ dest: 'uploads/' });

// ✅ Now safe to use 'upload'
router.post('/upload',authMiddleware ,upload.single('syllabus'), async (req, res) => {
  try {
    const className = req.body.class.replace(/^Class\s*/, '');
    const fileUrl = `/uploads/${req.file.filename}`;

    let syllabus = await Syllabus.findOne({ class: className });
    if (syllabus) {
      syllabus.syllabusURL = fileUrl;
      await syllabus.save();
    } else {
      syllabus = await Syllabus.create({ class: className, syllabusURL: fileUrl });
    }

    res.status(200).json({ message: 'Syllabus uploaded successfully', url: fileUrl });
  } catch (err) {
    res.status(500).json({ message: 'Upload failed', error: err.message });
  }
});

// ... other routes

// GET syllabus by classId
router.get('/:classId', authMiddleware,async (req, res) => {
  try {
    console.log("Fetching syllabus for:", req.params.classId);
    const classId = req.params.classId.replace(/^Class\s*/, '');
    const syllabus = await Syllabus.findOne({ class: classId });
    if (!syllabus) {
      console.log("Not found");
      return res.status(404).json({ message: "Syllabus not found" });
    }
    console.log("Found syllabus:", syllabus.syllabusURL);
    res.status(200).json(syllabus);
  } catch (error) {
    console.error("Fetch error", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// DELETE syllabus by classId
router.delete("/:classId", authMiddleware,async (req, res) => {
  try {
    const classId = req.params.classId.replace(/^Class\s*/, ''); // remove "Class " if present

    await Syllabus.findOneAndDelete({ class: classId });
    res.json({ message: "Syllabus deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});




export default router;

