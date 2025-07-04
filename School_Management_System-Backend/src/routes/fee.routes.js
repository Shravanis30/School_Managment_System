import express from "express";
import authMiddleware, { authorizeRole } from "../middlewares/auth.middleware.js";
import {
  setFeeStructure,
  getFeeStructure,
  getCollection,
  getPending,
  payFee,
  getStudentFee
} from "../controllers/fee.controller.js";
import feestructureModel from "../models/feestructure.model.js";

const router = express.Router();

// 📌 Admin-only routes
router.post("/structure", authMiddleware, authorizeRole("admin"), setFeeStructure);
router.get("/structure", authMiddleware, authorizeRole("admin"), getFeeStructure);
router.get("/collection", authMiddleware, authorizeRole("admin"), getCollection);
router.get("/pending", authMiddleware, authorizeRole("admin"), getPending);

// 📌 Student-only routes
router.post("/pay", authMiddleware, authorizeRole("student"), payFee);
router.get("/payments", authMiddleware, authorizeRole("student"), getStudentFee);

// ✅ Used by student to get their own class fee structure
router.get("/my-structure", authMiddleware, authorizeRole("student"), async (req, res) => {
  try {
    const className = req.user.className;
    const fee = await feestructureModel.findOne({ className });

    if (!fee) return res.status(404).json({ message: "Fee structure not found" });

    res.json({
      term1: fee.term1,
      term2: fee.term2
    });
  } catch (error) {
    console.error("Error in /my-structure:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
