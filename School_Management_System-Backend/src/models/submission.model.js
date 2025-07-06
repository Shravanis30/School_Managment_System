// import mongoose from 'mongoose';

// const submissionSchema = new mongoose.Schema({
//   assignmentId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Assignment',
//     required: true,
//   },
//   studentId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Student',
//     required: true,
//   },
//   submittedFile: {
//     type: String,
//     required: true,
//   },
//   submittedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export default mongoose.model('Submission', submissionSchema);

import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  submittedFile: {
    type: String,
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

export default mongoose.model('Submission', submissionSchema);
