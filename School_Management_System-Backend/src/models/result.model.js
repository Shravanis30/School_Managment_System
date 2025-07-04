import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  class: { type: String, required: true },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  fileUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Result', resultSchema);
