// // models/event.model.js
// import mongoose from 'mongoose';

// const eventSchema = new mongoose.Schema({
//   adminId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Admin',
//     required: true,
//   },
//   title: { type: String, required: true },
//   description: String,
//   date: { type: String, required: true }, // YYYY-MM-DD format
// }, { timestamps: true });

// export default mongoose.model('Event', eventSchema);


// models/event.model.js
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
  title: { type: String, required: true },
  description: String,
  date: { type: String, required: true }, // YYYY-MM-DD format
}, { timestamps: true });

export default mongoose.model('Event', eventSchema);
