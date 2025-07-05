
import Razorpay from "razorpay";
import crypto from "crypto";
import Student from "../models/student.model.js";
import StudentFee from "../models/studentfee.model.js";
import PaymentTransaction from "../models/paymentTransaction.model.js";
import { ApiError } from "../utils/ApiError.js";

// Initialize Razorpay with proper error handling
let razorpay;
try {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  // Test Razorpay credentials
  razorpay.orders
    .all({ count: 1 })
    .then(() => console.log("Razorpay credentials verified"))
    .catch(err => console.error("Razorpay credential test failed:", err.message));
} catch (err) {
  console.error("Razorpay initialization failed:", err);
  process.exit(1);
}

export const createOrder = async (req, res) => {
  try {
    const { amount, term } = req.body;
    const student = req.user;

    // Validate input
    if (!amount || !term) {
      throw new ApiError(400, "Amount and term are required");
    }
    
    if (isNaN(amount) || amount <= 0) {
      throw new ApiError(400, "Amount must be a positive number");
    }
    
    if (amount < 1) {
      throw new ApiError(400, "Minimum payment amount is ₹1");
    }

    // Fetch full student details
    const studentDetails = await Student.findById(student._id);
    if (!studentDetails) {
      throw new ApiError(404, "Student not found");
    }

    // Generate shorter receipt ID
    const shortId = student._id.toString().slice(-6);
    const timestamp = Date.now().toString().slice(-6);
    const receipt = `r_${shortId}_${term}_${timestamp}`;

    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: "INR",
      receipt: receipt,
    };

    const order = await razorpay.orders.create(options);
    
    res.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      student: {
        name: studentDetails.name,
        email: studentDetails.email,
        className: studentDetails.className,
      },
    });
  } catch (err) {
    console.error("Razorpay order creation error:", err);
    
    // Handle Razorpay-specific errors
    if (err.error?.description) {
      throw new ApiError(500, `Razorpay error: ${err.error.description}`);
    }
    
    throw new ApiError(500, err.message || "Failed to create payment order");
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      term,
      amount,
    } = req.body;

    // Validate input
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      throw new ApiError(400, "Missing payment verification data");
    }

    // Verify the payment signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      throw new ApiError(400, "Payment signature mismatch");
    }

    // Create payment transaction record
    const newTransaction = await PaymentTransaction.create({
      studentId: req.user._id,
      term,
      amount,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    });

    // Update StudentFee record
    const updateField = term === "term1" ? "paidTerm1" : "paidTerm2";
    const updatedFee = await StudentFee.findOneAndUpdate(
      { studentId: req.user._id },
      { $inc: { [updateField]: amount } },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: "Payment successful and fee updated",
      transaction: newTransaction,
      fee: updatedFee,
    });
  } catch (error) {
    console.error("Payment verification error:", error);

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, "Error processing payment verification");
  }
};