// // models/timetable.model.js
// import mongoose from 'mongoose';

// const timetableSchema = new mongoose.Schema({
//   class: { type: String, required: true },
//   entries: [
//     {
//       day: String,
//       periods: [String],
//     },
//   ],
// });

// export default mongoose.model('Timetable', timetableSchema);


// models/timetable.model.js
import mongoose from 'mongoose';

const timetableSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  class: { type: String, required: true },
  entries: [
    {
      day: String,
      periods: [String],
    },
  ],
}, { timestamps: true });

export default mongoose.model('Timetable', timetableSchema);
