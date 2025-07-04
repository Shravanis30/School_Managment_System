import Attendance from '../models/attendance.model.js';
import { ApiError } from '../utils/ApiError.js';

// ✅ GET attendance for logged-in student (Student only)
export const getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { year } = req.query;

    if (req.role !== 'student') {
      throw new ApiError(403, 'Only students can access their own attendance');
    }

    if (req.user._id.toString() !== studentId) {
      throw new ApiError(403, 'Unauthorized to view this attendance');
    }

    const doc = await Attendance.findOne({ studentId, academicYear: year });

    if (!doc) {
      return res.status(200).json({ records: [] }); // ✅ Return empty array if none
    }

    res.status(200).json({ records: doc.records });
  } catch (err) {
    console.error('Error fetching student attendance:', err);
    res
      .status(err.statusCode || 500)
      .json({ message: err.message || 'Internal server error' });
  }
};

// ✅ MARK attendance — only for Teacher or Admin
export const markAttendance = async (req, res) => {
  try {
    if (req.role !== 'teacher' && req.role !== 'admin') {
      throw new ApiError(403, 'Only teachers or admins can mark attendance');
    }

    const { studentId, classId, subject, date, status, academicYear } = req.body;

    if (!studentId || !classId || !subject || !date || !status || !academicYear) {
      throw new ApiError(400, 'Missing required fields');
    }

    let attendanceDoc = await Attendance.findOne({ studentId, academicYear });

    if (!attendanceDoc) {
      attendanceDoc = new Attendance({
        studentId,
        academicYear,
        records: [{ date, status, subject, classId }],
      });
    } else {
      const existingIndex = attendanceDoc.records.findIndex(
        (record) => record.date === date && record.subject === subject
      );

      if (existingIndex !== -1) {
        attendanceDoc.records[existingIndex] = { date, status, subject, classId };
      } else {
        attendanceDoc.records.push({ date, status, subject, classId });
      }
    }

    await attendanceDoc.save();
    res.status(200).json({ message: 'Attendance saved successfully' });
  } catch (err) {
    console.error('Error marking attendance:', err);
    res
      .status(err.statusCode || 500)
      .json({ message: err.message || 'Internal server error' });
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
