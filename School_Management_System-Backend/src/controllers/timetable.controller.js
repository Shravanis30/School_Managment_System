// // new auth

// import Timetable from '../models/timetable.model.js';
// import { ApiError } from '../utils/ApiError.js';

// // ✅ Upload or Update Timetable (Admin only)
// export const uploadTimetable = async (req, res) => {
//   if (req.role !== 'admin') {
//     throw new ApiError(403, 'Only admins can upload or update timetables');
//   }

//   const { class: className, entries } = req.body;
//   const normalizedClass = className.trim().replace(/^Class\s*/i, '');

//   let timetable = await Timetable.findOne({ class: normalizedClass });

//   if (!className || !entries || !Array.isArray(entries)) {
//     throw new ApiError(400, 'Invalid payload: class and entries are required');
//   }

//   try {
//     let timetable = await Timetable.findOne({ class: className });

//     if (timetable) {
//       timetable.entries = entries;
//       await timetable.save();
//     } else {
//       timetable = await Timetable.create({ class: normalizedClass, entries });
//     }

//     res.status(200).json(timetable);
//   } catch (err) {
//     res.status(500).json({ message: 'Error uploading timetable', error: err.message });
//   }
// };

// export const getTimetableByClassName = async (req, res) => {
//   try {
//     const { className } = req.params; // Changed to className

//     console.log(`Fetching timetable for: ${className}`);

//     if (!className) {
//       return res.status(400).json({ message: 'Class parameter is required' });
//     }

//     const normalizedClass = className.replace(/^Class\s*/i, '');
//     console.log(`Normalized class: ${normalizedClass}`);

//     const timetable = await Timetable.findOne({
//       class: normalizedClass
//     });

//     if (!timetable) {
//       console.log(`Timetable not found for: ${normalizedClass}`);
//       return res.status(404).json({ message: 'Timetable not found' });
//     }

//     console.log(`Found timetable for: ${normalizedClass}`);
//     res.status(200).json(timetable);
//   } catch (error) {
//     console.error('Timetable fetch error:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
// // ✅ Delete Timetable by Class (Admin only)
// export const deleteTimetableByClass = async (req, res) => {
//   if (req.role !== 'admin') {
//     throw new ApiError(403, 'Only admins can delete timetables');
//   }

//   try {
//     const classId = req.params.classId;
//     const normalizedClass = classId.trim().replace(/^Class\s*/i, '');

//     const result = await Timetable.findOneAndDelete({ class: normalizedClass });

//     if (!result) {
//       return res.status(404).json({ message: 'Timetable not found' });
//     }

//     res.status(200).json({ message: 'Timetable deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting timetable', error: err.message });
//   }
// };



// controllers/timetable.controller.js
import Timetable from '../models/timetable.model.js';
import { ApiError } from '../utils/ApiError.js';

// ✅ Upload or Update Timetable (Admin only)
export const uploadTimetable = async (req, res) => {
  if (req.role !== 'admin') {
    throw new ApiError(403, 'Only admins can upload or update timetables');
  }

  const { class: className, entries } = req.body;
  const normalizedClass = className.trim().replace(/^Class\s*/i, '');

  if (!normalizedClass || !entries || !Array.isArray(entries)) {
    throw new ApiError(400, 'Invalid payload: class and entries are required');
  }

  try {
    let timetable = await Timetable.findOne({ class: normalizedClass, adminId: req.user._id });

    if (timetable) {
      timetable.entries = entries;
      await timetable.save();
    } else {
      timetable = await Timetable.create({ adminId: req.user._id, class: normalizedClass, entries });
    }

    res.status(200).json(timetable);
  } catch (err) {
    res.status(500).json({ message: 'Error uploading timetable', error: err.message });
  }
};

// ✅ Get Timetable by Class (Multi-Tenant)
export const getTimetableByClassName = async (req, res) => {
  try {
    const { className } = req.params;

    if (!className) {
      return res.status(400).json({ message: 'Class parameter is required' });
    }

    const normalizedClass = className.replace(/^Class\s*/i, '');

    const timetable = await Timetable.findOne({ class: normalizedClass, adminId: req.user._id });

    if (!timetable) {
      return res.status(404).json({ message: 'Timetable not found' });
    }

    res.status(200).json(timetable);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// ✅ Delete Timetable by Class (Admin only)
export const deleteTimetableByClass = async (req, res) => {
  if (req.role !== 'admin') {
    throw new ApiError(403, 'Only admins can delete timetables');
  }

  try {
    const classId = req.params.className;
    const normalizedClass = classId.trim().replace(/^Class\s*/i, '');

    const result = await Timetable.findOneAndDelete({ class: normalizedClass, adminId: req.user._id });

    if (!result) {
      return res.status(404).json({ message: 'Timetable not found' });
    }

    res.status(200).json({ message: 'Timetable deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting timetable', error: err.message });
  }
};

// Add this new function
export const getAllTimetablesForAdmin = async (req, res) => {
  try {
    const timetables = await Timetable.find({ adminId: req.user._id });
    res.status(200).json(timetables);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};