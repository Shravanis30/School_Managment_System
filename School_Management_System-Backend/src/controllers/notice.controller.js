

// import Notice from '../models/notice.model.js';
// import { ApiError } from '../utils/ApiError.js';

// // ✅ Create a new notice (Admin only)
// export const createNotice = async (req, res) => {
//   try {
//     if (req.role !== 'admin') {
//       throw new ApiError(403, 'Only admins can create notices');
//     }

//     const { title, details, date } = req.body;

//     const notice = await Notice.create({
//       title,
//       details,
//       date,
//       createdBy: req.user._id,
//     });

//     res.status(201).json(notice);
//   } catch (err) {
//     res.status(err.statusCode || 500).json({
//       message: err.message || 'Error creating notice',
//     });
//   }
// };

// // ✅ Get all notices (Accessible to all authenticated users)
// export const getNotices = async (req, res) => {
//   try {
//     const notices = await Notice.find().sort({ date: -1 });
//     res.status(200).json(notices);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching notices', error: err.message });
//   }
// };

// // ✅ Delete a notice by ID (Admin only)
// export const deleteNotice = async (req, res) => {
//   try {
//     if (req.role !== 'admin') {
//       throw new ApiError(403, 'Only admins can delete notices');
//     }

//     const { id } = req.params;
//     const deleted = await Notice.findByIdAndDelete(id);

//     if (!deleted) {
//       throw new ApiError(404, 'Notice not found');
//     }

//     res.status(200).json({ message: 'Notice deleted successfully' });
//   } catch (err) {
//     res.status(err.statusCode || 500).json({
//       message: err.message || 'Error deleting notice',
//     });
//   }
// };

import Notice from '../models/notice.model.js';
import { ApiError } from '../utils/ApiError.js';

// ✅ Create a new notice (Admin only)
export const createNotice = async (req, res) => {
  try {
    if (req.role !== 'admin') {
      throw new ApiError(403, 'Only admins can create notices');
    }

    const { title, details, date } = req.body;

    const notice = await Notice.create({
      title,
      details,
      date,
      adminId: req.user._id, // ✅ Save admin ID for multi-tenancy
    });

    res.status(201).json(notice);
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || 'Error creating notice',
    });
  }
};

// ✅ Get all notices (Admin sees their own, teachers/students see from their admin)
export const getNotices = async (req, res) => {
  try {
    let adminId;
    if (req.role === 'admin') {
      adminId = req.user._id;
    } else if (req.user.adminId) {
      adminId = req.user.adminId;
    } else {
      throw new ApiError(403, 'Unauthorized to view notices');
    }

    const notices = await Notice.find({ adminId }).sort({ date: -1 });
    res.status(200).json(notices);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message || 'Error fetching notices' });
  }
};

// ✅ Delete a notice by ID (Admin only, and can only delete their own notice)
export const deleteNotice = async (req, res) => {
  try {
    if (req.role !== 'admin') {
      throw new ApiError(403, 'Only admins can delete notices');
    }

    const { id } = req.params;

    const deleted = await Notice.findOneAndDelete({
      _id: id,
      adminId: req.user._id // ✅ ensure only creator admin can delete
    });

    if (!deleted) {
      throw new ApiError(404, 'Notice not found or unauthorized');
    }

    res.status(200).json({ message: 'Notice deleted successfully' });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || 'Error deleting notice',
    });
  }
};
