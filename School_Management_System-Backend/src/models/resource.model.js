import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  }, // Path to stored PDF
  className: {
    type: String,
    required: true
  }, // eg. "6th"
  subject: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Resource', resourceSchema);