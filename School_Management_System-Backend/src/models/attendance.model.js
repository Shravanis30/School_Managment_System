// import mongoose from 'mongoose';

// const attendanceSchema = new mongoose.Schema({
//   studentId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Student',
//     required: true,
//   },
//   classId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Class',
//     required: true,
//   },
//   subject: {
//     type: String,
//     required: true,
//   },
//   date: {
//     type: String, // Format: YYYY-MM-DD
//     unique: true,
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ['present', 'absent', 'late'],
//     required: true,
//   },

// });

// const Attendance = mongoose.model('Attendance', attendanceSchema);
// export default Attendance;


import mongoose from 'mongoose';

const attendanceRecordSchema = new mongoose.Schema({
  date: {
    type: String, // Format: YYYY-MM-DD
    required: true,

  },
  status: {
    type: String,
    enum: ['present', 'absent', 'leave'],
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  }
}, { _id: false });

const attendanceSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
    unique: true,
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

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
