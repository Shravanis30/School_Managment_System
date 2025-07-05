import Attendance from '../models/attendance.model.js';
import { ApiError } from '../utils/ApiError.js';
import mongoose from 'mongoose';


export const getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;
    let { year } = req.query;

    // Authorization
    if (req.user._id.toString() !== studentId) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    // Calculate academic year if not provided
    if (!year) {
      const today = new Date();
      year = today.getMonth() < 3
        ? `${today.getFullYear() - 1}-${today.getFullYear()}`
        : `${today.getFullYear()}-${today.getFullYear() + 1}`;
    }

    // Fetch attendance with proper sorting
    const doc = await Attendance.findOne({ studentId, academicYear: year })
      .sort({ 'records.date': -1 });  // Sort by date descending

    res.status(200).json({
      records: doc?.records || []
    });
  } catch (err) {
    console.error('Error fetching student attendance:', err);
    res.status(500).json({
      message: err.message || 'Internal server error'
    });
  }
};

export const markAttendance = async (req, res) => {
  try {
    // Authorization check
    if (req.role !== 'teacher' && req.role !== 'admin') {
      throw new ApiError(403, 'Only teachers or admins can mark attendance');
    }

    const { studentId, classId, subject, date, status, academicYear } = req.body;

    // Validate inputs
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      throw new ApiError(400, 'Invalid student ID');
    }

    if (!subject || typeof subject !== 'string') {
      throw new ApiError(400, 'Valid subject is required');
    }

    if (!['present', 'absent', 'leave'].includes(status)) {
      throw new ApiError(400, 'Invalid attendance status');
    }

    // Find or create attendance document
    let attendanceDoc = await Attendance.findOne({ studentId, academicYear });

    if (attendanceDoc) {
      // Find existing record
      const recordIndex = attendanceDoc.records.findIndex(
        r => r.date === date && r.subject === subject
      );

      if (recordIndex !== -1) {
        // Update existing record
        attendanceDoc.records[recordIndex].status = status;
      } else {
        // Add new record
        attendanceDoc.records.push({ date, status, subject, classId });
      }
    } else {
      // Create new document
      attendanceDoc = new Attendance({
        studentId,
        academicYear,
        records: [{ date, status, subject, classId }]
      });
    }

    // Save with validation
    const savedDoc = await attendanceDoc.save();
    res.status(200).json({
      message: 'Attendance saved successfully',
      data: savedDoc
    });
  } catch (err) {
    // Handle errors
    if (err.code === 11000) {
      return res.status(409).json({
        message: 'Attendance already recorded for this date and subject'
      });
    }

    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        message: `Validation error: ${messages.join(', ')}`
      });
    }

    res.status(err.statusCode || 500).json({
      message: err.message || 'Internal server error'
    });
  }
};

// ✅ BULK save attendance — only for Teacher or Admin
export const saveAttendance = async (req, res) => {
  try {
    if (req.role !== 'teacher' && req.role !== 'admin') {
      throw new ApiError(403, 'Only teachers or admins can save attendance');
    }

    const { records } = req.body;

    for (const entry of records) {
      const { studentId, academicYear, record } = entry;

      let attendanceDoc = await Attendance.findOne({ studentId, academicYear });

      if (!attendanceDoc) {
        await Attendance.create({
          studentId,
          academicYear,
          records: [record],
        });
      } else {
        const existingIndex = attendanceDoc.records.findIndex(
          (r) => r.date === record.date && r.subject === record.subject
        );

        if (existingIndex !== -1) {
          attendanceDoc.records[existingIndex] = record;
        } else {
          attendanceDoc.records.push(record);
        }

        await attendanceDoc.save();
      }
    }

    res.status(200).json({ message: 'Attendance saved successfully.' });
  } catch (err) {
    console.error('Error saving attendance:', err);
    res
      .status(err.statusCode || 500)
      .json({ message: err.message || 'Internal server error' });
  }
};

