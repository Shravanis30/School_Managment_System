import Result from '../models/result.model.js';
import Student from '../models/student.model.js';
import { ApiError } from '../utils/ApiError.js';
import path from 'path';
import fs from 'fs';

const BASE_URL = process.env.BACKEND_BASE || 'http://localhost:5000';
const UPLOAD_DIR = '/uploads/results';

// ✅ Upload a final result PDF (overwrite if exists)
export const uploadResult = async (req, res) => {
  try {
    const { classId, studentId } = req.params;
    const file = req.files?.file?.[0];

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileUrl = `${UPLOAD_DIR}/${file.filename}`;

    // Delete existing result for this student and class
    const existing = await Result.findOne({ student: studentId, className: classId });
    if (existing) {
      const oldPath = path.join('public', existing.fileUrl);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
      await existing.deleteOne();
    }

    const newResult = new Result({
      className: classId,
      student: studentId,
      fileUrl,
    });

    await newResult.save();

    res.status(201).json({ message: "Result uploaded", url: fileUrl });
  } catch (err) {
    console.error("Upload result error", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ List all results for a class (Admin only)
export const listResultsByClass = async (req, res) => {
  try {
    if (req.role !== 'admin') {
      throw new ApiError(403, 'Only admins can view results by class');
    }

    const { classId } = req.params;
    const results = await Result.find({ className: classId }).populate('student', 'name rollNo');

    res.status(200).json(results);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// ✅ Delete a specific result by result ID (Admin only)
export const deleteResultById = async (req, res) => {
  try {
    if (req.role !== 'admin') {
      throw new ApiError(403, 'Only admins can delete results');
    }

    const result = await Result.findById(req.params.id);
    if (!result) throw new ApiError(404, 'Result not found');

    const filePath = path.join('public', result.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await result.deleteOne();

    res.status(200).json({ message: 'Result deleted successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

// ✅ Student: Get their own result (only one final result)
export const getStudentResults = async (req, res) => {
  try {
    if (req.role !== 'student') throw new ApiError(403, 'Access denied');

    const studentId = req.user._id;

    const result = await Result.findOne({ student: studentId });

    if (!result) {
      return res.status(404).json({ message: "No result uploaded yet" });
    }

    res.status(200).json({
      fileUrl: result.fileUrl,
      uploadedAt: result.uploadedAt,
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};
