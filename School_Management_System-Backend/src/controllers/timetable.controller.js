// // controllers/timetable.controller.js

// import Timetable from '../models/timetable.model.js';

// // ✅ UPLOAD timetable
// export const uploadTimetable = async (req, res) => {
//   const { class: className, entries } = req.body;

//   if (!className || !entries || !Array.isArray(entries)) {
//     return res.status(400).json({ message: 'Invalid payload' });
//   }

//   try {
//     let timetable = await Timetable.findOne({ class: className });

//     if (timetable) {
//       timetable.entries = entries;
//       await timetable.save();
//     } else {
//       timetable = await Timetable.create({ class: className, entries });
//     }

//     res.status(200).json(timetable);
//   } catch (err) {
//     res.status(500).json({ message: 'Error uploading timetable', error: err.message });
//   }
// };

// // ✅ GET timetable by class
// export const getTimetableByClass = async (req, res) => {
//   try {
//     const timetable = await Timetable.findOne({ class: req.params.class });
//     if (!timetable) return res.status(404).json({ message: 'Timetable not found' });
//     res.status(200).json(timetable);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching timetable', error: err.message });
//   }
// };

// // ✅ DELETE timetable
// export const deleteTimetableByClass = async (req, res) => {
//   try {
//     const result = await Timetable.findOneAndDelete({ class: req.params.class });
//     if (!result) return res.status(404).json({ message: 'Timetable not found' });
//     res.status(200).json({ message: 'Timetable deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting timetable', error: err.message });
//   }
// };


// new auth

import Timetable from '../models/timetable.model.js';
import { ApiError } from '../utils/ApiError.js';

// ✅ Upload or Update Timetable (Admin only)
export const uploadTimetable = async (req, res) => {
  if (req.role !== 'admin') {
    throw new ApiError(403, 'Only admins can upload or update timetables');
  }

  const { class: className, entries } = req.body;

  if (!className || !entries || !Array.isArray(entries)) {
    throw new ApiError(400, 'Invalid payload: class and entries are required');
  }

  try {
    let timetable = await Timetable.findOne({ class: className });

    if (timetable) {
      timetable.entries = entries;
      await timetable.save();
    } else {
      timetable = await Timetable.create({ class: className, entries });
    }

    res.status(200).json(timetable);
  } catch (err) {
    res.status(500).json({ message: 'Error uploading timetable', error: err.message });
  }
};

// ✅ Get Timetable by Class (Accessible to all roles)
export const getTimetableByClass = async (req, res) => {
  try {
    const timetable = await Timetable.findOne({ class: req.params.classId }); // ✅ Fixed here
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
    const result = await Timetable.findOneAndDelete({ class: req.params.classId });

    if (!result) {
      return res.status(404).json({ message: 'Timetable not found' });
    }

    res.status(200).json({ message: 'Timetable deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting timetable', error: err.message });
  }
};
