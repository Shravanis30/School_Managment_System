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

router.post("/structure", authMiddleware, authorizeRole("admin"), setFeeStructure);
router.get("/structure", authMiddleware, getFeeStructure);
router.get("/collection", authMiddleware, authorizeRole("admin"), getCollection);
router.get("/pending", authMiddleware, authorizeRole("admin"), getPending);
router.post("/pay", authMiddleware, payFee);
router.get("/payments", authMiddleware, authorizeRole("student"), getStudentFee); // ✅ NEW

router.get('/structure', async (req, res) => {
  const className = req.query.className;
  if (!className) return res.status(400).json({ message: 'className is required' });

  // Fetch from DB, e.g.
  const fee = await feestructureModel.findOne({ className });
  if (!fee) return res.status(404).json({ message: 'Fee structure not found' });

  res.json(fee);
});

router.get("/my-structure", authMiddleware, authorizeRole("student"), async (req, res) => {
  // const className = req.user.className; // comes from student object via authMiddleware
  // const fee = await feestructureModel.findOne({ className });
  const classId = req.params.classId.replace(/^Class\s*/, '');
  const fee = await feestructureModel.findOne({ class: classId });
  if (!fee) return res.status(404).json({ message: 'Fee structure not found' });
  res.json(fee);
});



export default router;
