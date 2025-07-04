// import mongoose from "mongoose";

// const markSchema = new mongoose.Schema({
//   student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
//   className: String,
//   team: String,
//   subjects: [String],
//   marksPerSubject: {
//     type: Map,
//     of: Number, // subject: marks
//   },
//   totalObtained: Number,
//   totalMarksPerSubject: Number,
//   percentage: Number,
// }, { timestamps: true });

// export default mongoose.model("Mark", markSchema);


import mongoose from "mongoose";

const markSchema = new mongoose.Schema({
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

// Export as "Marks" to match controller
export default mongoose.model("Marks", markSchema);