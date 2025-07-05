// models/complaint.model.js
import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  studentName: String,
  name: String,
  class: String,
  rollNo: String,
  complaint: String,
  complaintText: String, // Add this
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
  },
  category: String, // Add this
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
export default mongoose.model('Complaint', complaintSchema);
