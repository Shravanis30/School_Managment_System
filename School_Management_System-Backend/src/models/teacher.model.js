// models/teacher.model.js
import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  classTeacherOf: {
    type: String,
    default: ""
  },
  subjects: [{
    type: String
  }],
  role: { type: String, default: 'teacher' },
  designation: { type: String, default: 'Teacher' },
  profileImage: { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model("Teacher", teacherSchema);
