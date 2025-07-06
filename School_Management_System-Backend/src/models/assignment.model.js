// // models/Assignment.js
// import mongoose from 'mongoose';


// const assignmentSchema = new mongoose.Schema({
//   classId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Class',
//     required: true,
//   },
//   className: {
//     type: String,
//     required: true,
//   },
//   subject: {
//     type: String,
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   description: String,
//   dueDate: Date,
//   teacherId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Teacher',
//     required: true,
//   },
// }, {
//   timestamps: true,
// });



// export default mongoose.model('Assignment', assignmentSchema);


// models/assignment.model.js
import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Class',
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  dueDate: Date,
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model('Assignment', assignmentSchema);