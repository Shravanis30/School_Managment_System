import mongoose from "mongoose";

const feeStructureSchema = new mongoose.Schema({
  className: { type: String, required: true, unique: true },
  term1: { type: Number, required: true },
  term2: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("FeeStructure", feeStructureSchema);
