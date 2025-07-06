// import mongoose from "mongoose";

// const feeStructureSchema = new mongoose.Schema({
//   className: { type: String, required: true, unique: true },
//   term1: { type: Number, required: true },
//   term2: { type: Number, required: true },
// }, { 
//   timestamps: true,
//   toJSON: { virtuals: true },  // Include virtuals in JSON output
//   toObject: { virtuals: true } // Include virtuals when converting to objects
// });

// // Add virtual for total fee
// feeStructureSchema.virtual('total').get(function() {
//   return this.term1 + this.term2;
// });

// export default mongoose.model("FeeStructure", feeStructureSchema);



// models/feestructure.model.js
import mongoose from "mongoose";

const feeStructureSchema = new mongoose.Schema({
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
  className: { type: String, required: true },
  term1: { type: Number, required: true },
  term2: { type: Number, required: true },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

feeStructureSchema.virtual('total').get(function() {
  return this.term1 + this.term2;
});

feeStructureSchema.index({ adminId: 1, className: 1 }, { unique: true });

export default mongoose.model("FeeStructure", feeStructureSchema);
