import FeeStructure from "../models/feestructure.model.js";
import StudentFee from "../models/studentfee.model.js";
import { ApiError } from "../utils/ApiError.js";

export const setFeeStructure = async (req, res) => {
  const { className, term1, term2 } = req.body;
  if (req.role !== "admin") throw new ApiError(403, "Admin only");

  let fs = await FeeStructure.findOne({ className });
  if (fs) {
    fs.term1 = term1; fs.term2 = term2;
    await fs.save();
  } else {
    fs = await FeeStructure.create({ className, term1, term2 });
  }
  res.json(fs);
};

export const getFeeStructure = async (req, res) => {
  const className = req.query.className;
  const fs = await FeeStructure.findOne({ className });
  if (!fs) throw new ApiError(404, "Not found");
  res.json(fs);
};

export const getCollection = async (req, res) => {
  const all = await StudentFee.find().populate("studentId", "name className");
  res.json(all);
};

export const getPending = async (req, res) => {
  const pending = await StudentFee.find().populate("studentId", "name className")
    .then(arr => arr.filter(sf => {
      const total = sf.studentId.className && fs?.term1 + fs?.term2;
      return sf.paidTerm1 < sf.paidTerm1 || sf.paidTerm2 < sf.paidTerm2;
    }));
  res.json(pending);
};

export const payFee = async (req, res) => {
  const { studentId, term, amount } = req.body;
  const { paidTerm1, paidTerm2 } = await StudentFee.findOneAndUpdate(
    { studentId },
    { $inc: term === "term1" ? { paidTerm1: amount } : { paidTerm2: amount } },
    { upsert: true, new: true });
  res.json({ paidTerm1, paidTerm2 });
};


export const getStudentFee = async (req, res) => {
  const studentId = req.user._id; // assuming authMiddleware adds this
  const fee = await StudentFee.findOne({ studentId });
  if (!fee) {
    return res.json({ paidTerm1: 0, paidTerm2: 0 });
  }
  res.json({
    paidTerm1: fee.paidTerm1 || 0,
    paidTerm2: fee.paidTerm2 || 0,
  });
};
