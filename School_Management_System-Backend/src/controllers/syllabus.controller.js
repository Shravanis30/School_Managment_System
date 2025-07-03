

// new auth

import Syllabus from '../models/syllabus.model.js';
import { ApiError } from '../utils/ApiError.js';

// ✅ Upload or Update Syllabus (Admin only)
export const uploadSyllabus = async (req, res) => {
  try {
    if (req.role !== 'admin') {
      throw new ApiError(403, 'Only admins can upload or update syllabus');
    }

    const { class: className, syllabusURL } = req.body;

    if (!className || !syllabusURL) {
      throw new ApiError(400, 'Class and syllabus URL are required');
    }

    let syllabus = await Syllabus.findOne({ class: className });

    if (syllabus) {
      syllabus.syllabusURL = syllabusURL;
      await syllabus.save();
      return res.status(200).json({ message: 'Syllabus updated' });
    }

    syllabus = new Syllabus({ class: className, syllabusURL });
    await syllabus.save();
    res.status(201).json({ message: 'Syllabus uploaded' });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({ error: err.message || 'Server error' });
  }
};

// ✅ Get Syllabus by Class (Student, Teacher, Admin)
export const getSyllabusByClass = async (req, res) => {
  try {
    const classId = req.params.classId;
    const syllabus = await Syllabus.findOne({ class: classId });

    if (!syllabus) {
      console.log("Syllabus not found for:", req.params.classId);

      return res.status(404).json({ error: 'Syllabus not found' });
    }

    res.status(200).json(syllabus);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};


