// // controllers/class.controller.js
// import Class from '../models/class.model.js';

// // Create a new class
// export const createClass = async (req, res) => {
//   const { name } = req.body;

//   if (!name?.trim()) {
//     return res.status(400).json({ message: 'Class name is required' });
//   }

//   try {
//     const newClass = await Class.create({ name: name.trim() });
//     res.status(201).json(newClass);
//   } catch (err) {
//     res.status(500).json({ message: 'Error creating class', error: err.message });
//   }
// };

// // Add subject to a class
// export const addSubjectToClass = async (req, res) => {
//   const { id } = req.params;
//   const { subject } = req.body;

//   if (!subject?.trim()) {
//     return res.status(400).json({ message: 'Subject is required' });
//   }

//   try {
//     const cls = await Class.findById(id);
//     if (!cls) return res.status(404).json({ message: 'Class not found' });

//     // Prevent duplicate subjects (case-insensitive)
//     const isDuplicate = cls.subjects.some(
//       (s) => s.toLowerCase() === subject.trim().toLowerCase()
//     );

//     if (isDuplicate) {
//       return res.status(409).json({ message: 'Subject already exists for this class' });
//     }

//     cls.subjects.push(subject.trim());
//     await cls.save();
//     res.status(200).json(cls);
//   } catch (err) {
//     res.status(500).json({ message: 'Error adding subject', error: err.message });
//   }
// };

// // Get all classes
// export const getAllClasses = async (req, res) => {
//   try {
//     const classes = await Class.find();
//     res.status(200).json(classes);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching classes', error: err.message });
//   }
// };

// // Get a single class by ID
// export const getClassById = async (req, res) => {
//   try {
//     const cls = await Class.findById(req.params.id);
//     if (!cls) return res.status(404).json({ message: 'Class not found' });
//     res.status(200).json(cls);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching class', error: err.message });
//   }
// };

// // OPTIONAL: Delete a subject from a class
// export const deleteSubjectFromClass = async (req, res) => {
//   const { id, subject } = req.params;

//   try {
//     const cls = await Class.findById(id);
//     if (!cls) return res.status(404).json({ message: 'Class not found' });

//     cls.subjects = cls.subjects.filter((s) => s !== subject);
//     await cls.save();

//     res.status(200).json({ message: 'Subject removed successfully', class: cls });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting subject', error: err.message });
//   }
// };


// new auth


import Class from '../models/class.model.js';
import { ApiError } from '../utils/ApiError.js';

// ✅ Create a new class (Admin only)
export const createClass = async (req, res) => {
  if (req.role !== 'admin') {
    throw new ApiError(403, 'Only admins can create classes');
  }

  const { name } = req.body;

  if (!name?.trim()) {
    throw new ApiError(400, 'Class name is required');
  }

  try {
    const newClass = await Class.create({ name: name.trim() });
    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).json({ message: 'Error creating class', error: err.message });
  }
};

// ✅ Add subject to a class (Admin only)
export const addSubjectToClass = async (req, res) => {
  if (req.role !== 'admin') {
    throw new ApiError(403, 'Only admins can add subjects to a class');
  }

  const { id } = req.params;
  const { subject } = req.body;

  if (!subject?.trim()) {
    throw new ApiError(400, 'Subject is required');
  }

  try {
    const cls = await Class.findById(id);
    if (!cls) throw new ApiError(404, 'Class not found');

    const isDuplicate = cls.subjects.some(
      (s) => s.toLowerCase() === subject.trim().toLowerCase()
    );

    if (isDuplicate) {
      throw new ApiError(409, 'Subject already exists for this class');
    }

    cls.subjects.push(subject.trim());
    await cls.save();
    res.status(200).json(cls);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message || 'Error adding subject' });
  }
};

// ✅ Get all classes (Accessible to all roles)
export const getAllClasses = async (req, res) => {
  try {
    const classes = await Class.find();
    res.status(200).json(classes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching classes', error: err.message });
  }
};

// ✅ Get a class by ID (Accessible to all roles)
export const getClassById = async (req, res) => {
  try {
    const cls = await Class.findById(req.params.id);
    if (!cls) throw new ApiError(404, 'Class not found');
    res.status(200).json(cls);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message || 'Error fetching class' });
  }
};

// ✅ Delete a subject from a class (Admin only)
export const deleteSubjectFromClass = async (req, res) => {
  if (req.role !== 'admin') {
    throw new ApiError(403, 'Only admins can delete subjects');
  }

  const { id, subject } = req.params;

  try {
    const cls = await Class.findById(id);
    if (!cls) throw new ApiError(404, 'Class not found');

    cls.subjects = cls.subjects.filter((s) => s !== subject);
    await cls.save();

    res.status(200).json({ message: 'Subject removed successfully', class: cls });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message || 'Error deleting subject' });
  }
};
