// // routes/payment.routes.js
// import express from "express";
// import { createOrder, verifyPayment } from "../controllers/payment.controller.js";
// import authMiddleware from "../middlewares/auth.middleware.js";

// const router = express.Router();

// router.post("/create-order", authMiddleware, createOrder);
// router.post("/verify", authMiddleware, verifyPayment);

// export default router;




// ✅ routes/payment.routes.js
import express from "express";
import { createOrder, verifyPayment } from "../controllers/payment.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create-order", authMiddleware, createOrder);
router.post("/verify", authMiddleware, verifyPayment);

export default router;
