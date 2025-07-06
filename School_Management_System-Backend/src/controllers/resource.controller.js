
// // new auth 

// import Resource from '../models/resource.model.js';
// import path from 'path';
// import fs from 'fs';
// import { ApiError } from '../utils/ApiError.js';

// // ✅ Upload resource (Teacher only)
// export const uploadResource = async (req, res) => {
//   try {
//     if (req.role !== 'teacher') {
//       throw new ApiError(403, 'Only teachers can upload resources');
//     }

//     const { title, className, subject } = req.body;
//     const file = req.file;

//     if (!file) {
//       throw new ApiError(400, 'No file uploaded');
//     }

//     const resource = new Resource({
//       title,
//       className,
//       subject,
//       uploadedBy: req.user._id,
//       fileUrl: `/uploads/resources/${file.filename}`,
//     });

//     await resource.save();

//     res.status(201).json({ message: 'Resource uploaded successfully', resource });
//   } catch (err) {
//     console.error('Upload Error:', err);
//     res.status(err.statusCode || 500).json({ message: err.message || 'Server error uploading resource' });
//   }
// };

// // ✅ Get resources by class (Accessible to students, teachers, admins)
// export const getResourcesByClass = async (req, res) => {
//   try {
//     const className = req.params.className;
//     const resources = await Resource.find({ className });
//     res.status(200).json(resources);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch resources', error: err.message });
//   }
// };

// // ✅ Get subjects by class (for filtering)
// export const getSubjectsByClass = async (req, res) => {
//   try {
//     const className = req.params.className;
//     const subjects = await Resource.distinct('subject', { className });
//     res.status(200).json(subjects);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch subjects', error: err.message });
//   }
// };



import Resource from '../models/resource.model.js';
import { ApiError } from '../utils/ApiError.js';

// ✅ Upload resource (Teacher only)
export const uploadResource = async (req, res) => {
  try {
    if (req.role !== 'teacher') {
      throw new ApiError(403, 'Only teachers can upload resources');
    }

    const { title, className, subject } = req.body;
    const file = req.file;

    if (!file) {
      throw new ApiError(400, 'No file uploaded');
    }

    const resource = new Resource({
      title,
      className,
      subject,
      uploadedBy: req.user._id,
      adminId: req.user.adminId, // 🔑 Associate resource with admin
      fileUrl: `/uploads/resources/${file.filename}`,
    });

    await resource.save();

    res.status(201).json({ message: 'Resource uploaded successfully', resource });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(err.statusCode || 500).json({ message: err.message || 'Server error uploading resource' });
  }
};

// ✅ Get resources by class (Scoped by admin)
export const getResourcesByClass = async (req, res) => {
  try {
    const className = req.params.className;
    const adminId = req.user.adminId;

    const resources = await Resource.find({ className, adminId });
    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch resources', error: err.message });
  }
};

// ✅ Get subjects by class (Scoped by admin)
export const getSubjectsByClass = async (req, res) => {
  try {
    const className = req.params.className;
    const adminId = req.user.adminId;

    const subjects = await Resource.distinct('subject', { className, adminId });
    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch subjects', error: err.message });
  }
};
