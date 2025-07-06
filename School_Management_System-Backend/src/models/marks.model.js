

// import mongoose from "mongoose";

// const markSchema = new mongoose.Schema({
//   student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
//   className: { type: String, required: true },
//   team: { type: String, required: true },
//   subjects: { type: [String], required: true },
//   marksPerSubject: {
//     type: Map,
//     of: Number,
//     required: true
//   },
//   totalObtained: { type: Number, required: true },
//   totalMarksPerSubject: { type: Number, required: true },
//   percentage: { type: Number, required: true },
// }, { timestamps: true });

// // Export as "Marks" to match controller
// export default mongoose.model("Marks", markSchema);

// models/marks.model.js
import mongoose from "mongoose";

const markSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true
  },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  className: { type: String, required: true },
  team: { type: String, required: true },
  subjects: { type: [String], required: true },
  marksPerSubject: {
    type: Map,
    of: Number,
    required: true
  },
  totalObtained: { type: Number, required: true },
  totalMarksPerSubject: { type: Number, required: true },
  percentage: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("Marks", markSchema);
