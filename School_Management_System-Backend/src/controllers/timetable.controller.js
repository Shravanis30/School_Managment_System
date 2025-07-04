// new auth

import Timetable from '../models/timetable.model.js';
import { ApiError } from '../utils/ApiError.js';

// ✅ Upload or Update Timetable (Admin only)
export const uploadTimetable = async (req, res) => {
  if (req.role !== 'admin') {
    throw new ApiError(403, 'Only admins can upload or update timetables');
  }

  const { class: className, entries } = req.body;
  const normalizedClass = className.trim().replace(/^Class\s*/i, ''); // removes "Class " if present

  let timetable = await Timetable.findOne({ class: normalizedClass });

  if (!className || !entries || !Array.isArray(entries)) {
    throw new ApiError(400, 'Invalid payload: class and entries are required');
  }

  try {
    let timetable = await Timetable.findOne({ class: className });

    if (timetable) {
      timetable.entries = entries;
      await timetable.save();
    } else {
      timetable = await Timetable.create({ class: normalizedClass, entries });
    }

    res.status(200).json(timetable);
  } catch (err) {
    res.status(500).json({ message: 'Error uploading timetable', error: err.message });
  }
};

// ✅ Get Timetable by Class (Accessible to all roles)
export const getTimetableByClass = async (req, res) => {
  try {
    const classId = req.params.classId;
    const timetable = await Timetable.findOne({ class: classId });

    if (!timetable) {
      return res.status(404).json({ message: 'Timetable not found' });
    }
    res.status(200).json(timetable);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching timetable', error: err.message });
  }
};


// ✅ Delete Timetable by Class (Admin only)
export const deleteTimetableByClass = async (req, res) => {
  if (req.role !== 'admin') {
    throw new ApiError(403, 'Only admins can delete timetables');
  }

  try {
    const classId = req.params.classId;
    const result = await Timetable.findOneAndDelete({ class: classId });


    if (!result) {
      return res.status(404).json({ message: 'Timetable not found' });
    }

    res.status(200).json({ message: 'Timetable deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting timetable', error: err.message });
  }
};
