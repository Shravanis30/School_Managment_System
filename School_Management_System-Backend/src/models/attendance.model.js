
// import mongoose from 'mongoose';

// const attendanceRecordSchema = new mongoose.Schema({
//   date: {
//     type: String, 
//     required: true,

//   },
//   status: {
//     type: String,
//     enum: ['present', 'absent', 'leave'],  
//     required: true,
//   },
//   subject: {
//     type: String,
//     required: [true, 'Subject is required'],
//     trim: true,
//     minlength: [2, 'Subject name too short'],
//   },

//   classId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Class',
//     required: true,
//   }
// }, { _id: false });

// const attendanceSchema = new mongoose.Schema({
//   studentId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Student',
//     required: true,
//     // unique: true,
//   },
//   academicYear: {
//     type: String,
//     required: true,
//   },
//   records: {
//     type: [attendanceRecordSchema],
//     default: [],
//   },
// }, { timestamps: true });

// attendanceSchema.index(
//   { studentId: 1, academicYear: 1 },
//   { unique: true }
// );
// const Attendance = mongoose.model('Attendance', attendanceSchema);
// export default Attendance;



// models/attendance.model.js
import mongoose from 'mongoose';

const attendanceRecordSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['present', 'absent', 'leave'],
    required: true,
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    minlength: [2, 'Subject name too short'],
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  }
}, { _id: false });

const attendanceSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  academicYear: {
    type: String,
    required: true,
  },
  records: {
    type: [attendanceRecordSchema],
    default: [],
  },
}, { timestamps: true });

attendanceSchema.index(
  { studentId: 1, academicYear: 1 },
  { unique: true }
);

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
