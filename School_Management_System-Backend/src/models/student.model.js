// import mongoose from "mongoose";

// const studentSchema = new mongoose.Schema({
//   adminId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Admin",
//     required: true,
//   },
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   className: { type: String, required: true },
//   rollNo: { type: String, required: true },
//   role: { type: String, default: 'student' },
//   designation: { type: String, default: 'Student' },
//   profileImage: { type: String, default: '' },
//   paidFee: { type: Number, default: 0 },

// }, { timestamps: true });

// const Student = mongoose.model("Student", studentSchema);
// export default Student;


// models/student.model.js
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  className: { type: String, required: true },
  rollNo: { type: String, required: true },
  role: { type: String, default: 'student' },
  designation: { type: String, default: 'Student' },
  profileImage: { type: String, default: '' },
  paidFee: { type: Number, default: 0 },
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);
export default Student;

