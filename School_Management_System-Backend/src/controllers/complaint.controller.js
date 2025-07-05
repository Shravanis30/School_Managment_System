

import Complaint from '../models/complaint.model.js';
import { ApiError } from '../utils/ApiError.js';

// ✅ Submit Complaint (Student only)
export const submitComplaint = async (req, res) => {
  try {
    if (req.role !== 'student') {
      throw new ApiError(403, 'Only students can submit complaints');
    }

    // Map frontend fields to backend fields
    const complaint = new Complaint({
      studentId: req.user._id,
      studentName: req.user.name,
      name: req.user.name, // Keep original name field
      class: req.user.className, // Use student's class
      rollNo: req.user.rollNo, // Use student's roll number
      complaintText: req.body.complaint, // Map complaint to complaintText
      priority: req.body.priority,
      category: req.body.priority // Map priority to category
    });

    await complaint.save();
    res.status(201).json({ message: 'Complaint submitted', complaint });
  } catch (err) {
    res.status(err.statusCode || 500).json({ 
      error: err.message || 'Failed to submit complaint' 
    });
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
