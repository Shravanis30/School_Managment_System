import Result from '../models/result.model.js';
import Student from '../models/student.model.js';
import { ApiError } from '../utils/ApiError.js';
import path from 'path';
import fs from 'fs';

const BASE_URL = process.env.BACKEND_BASE || 'http://localhost:5000';
const UPLOAD_DIR = '/uploads/results'; // relative to your static folder
export const uploadResult = async (req, res) => {
  try {
    if (req.role !== 'admin') {
      throw new ApiError(403, 'Only admins can upload results');
    }

    const { classId, studentId } = req.params;

    if (!req.file) {
      throw new ApiError(400, 'No file uploaded');
    }

    const student = await Student.findById(studentId);
    if (!student) throw new ApiError(404, 'Student not found');

    // Save result document
    const fileUrl = `${UPLOAD_DIR}/${req.file.filename}`;
    const result = await Result.create({
      class: classId,
      studentId,
      fileUrl,
    });

    res.status(201).json({
      message: 'Result uploaded successfully',
      result,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
export const listResultsByClass = async (req, res) => {
  try {
    if (req.role !== 'admin') {
      throw new ApiError(403, 'Only admins can view results by class');
    }

    const { classId } = req.params;
    const results = await Result.find({ class: classId }).populate('studentId', 'name rollNo');

    res.status(200).json(results);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
export const deleteResultById = async (req, res) => {
  try {
    if (req.role !== 'admin') {
      throw new ApiError(403, 'Only admins can delete results');
    }

    const result = await Result.findById(req.params.id);
    if (!result) throw new ApiError(404, 'Result not found');

    // Delete file from disk
    const filePath = path.join('public', result.fileUrl); // adjust if needed
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await result.deleteOne();

    res.status(200).json({ message: 'Result deleted successfully' });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
export const getStudentResults = async (req, res) => {
  try {
    if (req.role !== 'student') {
      throw new ApiError(403, 'Only students can access this route');
    }

    const studentId = req.userId;

    const results = await Result.find({ studentId }).sort({ uploadedAt: -1 });

    res.status(200).json(results);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};
