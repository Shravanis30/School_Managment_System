// // backend/routes/payment.routes.js
// import express from "express";
// import Razorpay from "razorpay";
// import crypto from "crypto";
// import authMiddleware, { authorizeRole } from "../middlewares/auth.middleware.js";
// import dotenv from "dotenv";
// dotenv.config(); // ✅ Must be before using process.env


// const router = express.Router();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // POST /api/payment/create-order
// router.post("/create-order", authMiddleware, authorizeRole("student"), async (req, res) => {
//   try {
//     const { amount, term } = req.body;
//     console.log("[Razorpay] Incoming create-order request:", { amount, term });

//     const options = {
//       amount: amount * 100, // Razorpay expects amount in paise
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);
//     console.log("[Razorpay] Order created successfully:", order);

//     res.json({ orderId: order.id, amount: options.amount, term });
//   } catch (error) {
//     console.error("[Razorpay] Error creating Razorpay order:", error);
//     console.log("Razorpay credentials:", process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_SECRET);

//     res.status(500).json({ message: "Error creating Razorpay order", error });
//   }
// });

// export default router;


import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import authMiddleware, { authorizeRole } from "../middlewares/auth.middleware.js";
import dotenv from "dotenv";
dotenv.config(); // ✅ Must be before using process.env

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// POST /api/payment/create-order
router.post("/create-order", authMiddleware, authorizeRole("student"), async (req, res) => {
  try {
    const { amount, term } = req.body;
    const student = req.user;

    if (!amount || !term) {
      return res.status(400).json({ message: "Amount and term are required" });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return res.json({
      orderId: order.id,
      amount: options.amount,
      currency: options.currency,
      student: {
        name: student.name,
        email: student.email,
        className: student.className,
      },
    });
  } catch (error) {
    console.error("[Razorpay] Error creating Razorpay order:", error);
    console.log("Razorpay credentials:", process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_KEY_SECRET);

    return res.status(500).json({
      message: "Error creating Razorpay order",
      error: error.message,
    });
  }
});

export default router;
