import mongoose from 'mongoose';

const leaveApplicationSchema = new mongoose.Schema({
  studentName: { type: String, required: true },
  class: { type: String, required: true },
  rollNo: { type: String, required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  reason: { type: String, required: true },
  // Add status to schema
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },
}, { timestamps: true });

export default mongoose.model('LeaveApplication', leaveApplicationSchema);
