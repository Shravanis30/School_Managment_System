// import mongoose from "mongoose";

// const paymentTransactionSchema = new mongoose.Schema({
//   studentId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Student',
//     required: true
//   },
//   term: {
//     type: String,
//     enum: ['term1', 'term2'],
//     required: true
//   },
//   amount: {
//     type: Number,
//     required: true
//   },
//   razorpay_payment_id: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   razorpay_order_id: {
//     type: String,
//     required: true
//   },
//   razorpay_signature: {
//     type: String,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'success', 'failed'],
//     default: 'success'
//   }
// }, { 
//   timestamps: true,
//   toJSON: { virtuals: true },
//   toObject: { virtuals: true }
// });

// // Add virtual for student details
// paymentTransactionSchema.virtual('student', {
//   ref: 'Student',
//   localField: 'studentId',
//   foreignField: '_id',
//   justOne: true
// });

// const PaymentTransaction = mongoose.model("PaymentTransaction", paymentTransactionSchema);

// export default PaymentTransaction;

// ✅ models/paymentTransaction.model.js
import mongoose from "mongoose";

const paymentTransactionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  term: {
    type: String,
    enum: ['term1', 'term2'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  razorpay_payment_id: {
    type: String,
    required: true,
    unique: true
  },
  razorpay_order_id: {
    type: String,
    required: true
  },
  razorpay_signature: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'success'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

paymentTransactionSchema.virtual('student', {
  ref: 'Student',
  localField: 'studentId',
  foreignField: '_id',
  justOne: true
});

const PaymentTransaction = mongoose.model("PaymentTransaction", paymentTransactionSchema);
export default PaymentTransaction;
