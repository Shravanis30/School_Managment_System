// models/complaint.model.js
import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  name: String,
  class: String,
  rollNo: String,
  complaint: String,
  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Complaint', complaintSchema);
