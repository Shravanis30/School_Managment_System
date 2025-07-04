import mongoose from "mongoose";

const studentFeeSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  paidTerm1: { type: Number, default: 0 },
  paidTerm2: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("StudentFee", studentFeeSchema);
