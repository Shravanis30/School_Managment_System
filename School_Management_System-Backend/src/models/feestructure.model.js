import mongoose from "mongoose";

const feeStructureSchema = new mongoose.Schema({
  className: { type: String, required: true, unique: true },
  term1: { type: Number, required: true },
  term2: { type: Number, required: true },
}, { 
  timestamps: true,
  toJSON: { virtuals: true },  // Include virtuals in JSON output
  toObject: { virtuals: true } // Include virtuals when converting to objects
});

// Add virtual for total fee
feeStructureSchema.virtual('total').get(function() {
  return this.term1 + this.term2;
});

export default mongoose.model("FeeStructure", feeStructureSchema);