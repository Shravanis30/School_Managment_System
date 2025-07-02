// models/timetable.model.js
import mongoose from 'mongoose';

const timetableSchema = new mongoose.Schema({
  class: { type: String, required: true },
  entries: [
    {
      day: String,
      periods: [String],
    },
  ],
});

export default mongoose.model('Timetable', timetableSchema);
