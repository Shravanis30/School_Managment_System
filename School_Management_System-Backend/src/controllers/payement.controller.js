import Razorpay from "razorpay";
import crypto from "crypto";
import StudentFee from "../models/studentfee.model.js";
import { ApiError } from "../utils/ApiError.js";

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
    const { amount, term } = req.body;
    const student = req.user;

    if (!amount || !term) throw new ApiError(400, "Amount and term required");

    const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: `rcpt_${student._id}_${term}_${Date.now()}`,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            student: {
                name: student.name,
                email: student.email,
                className: student.className,
            },
        });
    } catch (err) {
        throw new ApiError(500, "Failed to create Razorpay order");
        console.log("[Razorpay] KEY_ID:", process.env.RAZORPAY_KEY_ID);
        console.log("[Razorpay] KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);

    }
};

export const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    term,
    amount,
  } = req.body;

  const signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (signature !== razorpay_signature)
    throw new ApiError(400, "Payment signature mismatch");

  const studentId = req.user._id;
  const update = term === "term1"
    ? { paidTerm1: amount }
    : { paidTerm2: amount };

  const updated = await StudentFee.findOneAndUpdate(
    { studentId },
    { $inc: update },
    { upsert: true, new: true }
  );

  console.log("[Payment Updated] ", updated);

  res.json({
    success: true,
    message: "Payment successful and fee updated",
  });
};
