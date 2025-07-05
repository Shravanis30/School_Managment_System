// fee.controller.js
import FeeStructure from "../models/feestructure.model.js";
import StudentFee from "../models/studentfee.model.js";
import PaymentTransaction from "../models/paymentTransaction.model.js"; // ADD THIS
import Student from "../models/student.model.js"; // ADD THIS
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

// export const getCollection = async (req, res) => {
//   try {

//   } catch (error) {
//     console.error("Error fetching payment collection:", error);
//     res.status(500).json([]); // Return empty array instead of object
//   }
// };

export const getCollection = async (req, res) => {
  try {
    console.log("Fetching payment transactions...");
    const transactions = await PaymentTransaction.find()
      .populate("studentId", "name className email rollNo")
      .sort({ createdAt: -1 });
    
    console.log(`Found ${transactions.length} transactions`);
    res.json(transactions);
  } catch (error) {
    console.error("Error fetching payment collection:", error);
    res.status(500).json([]);
  }
};

export const getPending = async (req, res) => {
  try {
    const students = await Student.find().select("name className");
    const feeStructures = await FeeStructure.find();
    const feeMap = {};

    feeStructures.forEach(fs => {
      feeMap[fs.className] = fs;
    });

    const studentFees = await StudentFee.find();
    const feeRecordMap = {};

    studentFees.forEach(sf => {
      feeRecordMap[sf.studentId.toString()] = sf;
    });

    const pending = students.map(student => {
      const feeRecord = feeRecordMap[student._id.toString()] || { paidTerm1: 0, paidTerm2: 0 };
      const feeStruct = feeMap[student.className];

      if (!feeStruct) return null;

      const dueTerm1 = feeStruct.term1 - (feeRecord.paidTerm1 || 0);
      const dueTerm2 = feeStruct.term2 - (feeRecord.paidTerm2 || 0);

      return {
        studentId: student._id,
        name: student.name,
        className: student.className,
        dueTerm1: Math.max(0, dueTerm1),
        dueTerm2: Math.max(0, dueTerm2),
      };
    }).filter(item => item !== null && (item.dueTerm1 > 0 || item.dueTerm2 > 0));

    res.json(pending);
  } catch (error) {
    console.error("Error in getPending:", error);
    res.status(500).json([]); // Return empty array instead of object
  }
};