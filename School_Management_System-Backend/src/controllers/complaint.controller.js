// // controllers/complaint.controller.js
// import Complaint from '../models/complaint.model.js';

// export const submitComplaint = async (req, res) => {
//   try {
//     const complaint = new Complaint(req.body);
//     await complaint.save();
//     res.status(201).json({ message: 'Complaint submitted', complaint });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to submit complaint' });
//   }
// };

// export const getAllComplaints = async (req, res) => {
//   try {
//     const complaints = await Complaint.find().sort({ createdAt: -1 });
//     res.status(200).json(complaints);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch complaints' });
//   }
// };


// new auth

import Complaint from '../models/complaint.model.js';
import { ApiError } from '../utils/ApiError.js';

// ✅ Submit Complaint (Student only)
export const submitComplaint = async (req, res) => {
  try {
    if (req.role !== 'student') {
      throw new ApiError(403, 'Only students can submit complaints');
    }

    const complaint = new Complaint({
      studentId: req.user._id,
      studentName: req.user.name,
      complaintText: req.body.complaintText,
      category: req.body.category || "General",
    });

    await complaint.save();
    res.status(201).json({ message: 'Complaint submitted', complaint });
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message || 'Failed to submit complaint' });
  }
};

// ✅ Get all complaints (Admin only)
export const getAllComplaints = async (req, res) => {
  try {
    if (req.role !== 'admin') {
      throw new ApiError(403, 'Only admins can view complaints');
    }

    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (err) {
    res.status(err.statusCode || 500).json({ error: err.message || 'Failed to fetch complaints' });
  }
};
