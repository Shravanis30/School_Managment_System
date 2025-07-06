
// new auth


import Student from "../models/student.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import { ApiError } from "../utils/ApiError.js";

// ✅ Admin registers a student
export const createStudent = async (req, res) => {
  const { name, email, password, className: studentClass, rollNo, profileImage } = req.body;

  try {
    const existing = await Student.findOne({ email });
    if (existing) {
      throw new ApiError(400, "Student already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      adminId: req.user._id, // from token middleware
      name,
      email,
      password: hashedPassword,
      className: studentClass,
      rollNo,
      profileImage,
      role: "student",
      designation: "Student"
    });

    res.status(201).json({ message: "Student created", student });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// ✅ Student Login
export const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      throw new ApiError(404, "Student not found");
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      throw new ApiError(401, "Invalid credentials");
    }

    const payload = {
      _id: student._id,
      role: "student",
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "10d",
    });

    // Send tokens via HTTP-only cookies
    // res
    //   .cookie("accessToken", accessToken, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     maxAge: 24 * 60 * 60 * 1000,
    //   })
    //   .cookie("refreshToken", refreshToken, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === "production",
    //     maxAge: 10 * 24 * 60 * 60 * 1000,
    //   })
    //   .status(200)
    //   .json({
    //     message: "Login successful",
    //     user: {
    //       id: student._id,
    //       name: student.name,
    //       email: student.email,
    //       className: student.className,
    //       rollNo: student.rollNo,
    //       profileImage: student.profileImage,
    //       role: student.role,
    //       designation: student.designation,
    //     },
    //   });
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true, // ✅ Required for cross-site cookies
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true, // ✅ Required for cross-site cookies
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Login successful" });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// ✅ Grouped students for logged-in Admin
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({ adminId: req.user._id });

    const grouped = {};
    students.forEach((student) => {
      const className = student.className || "Unknown";
      if (!grouped[className]) grouped[className] = [];
      grouped[className].push(student);
    });

    res
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true, // ✅ Required for cross-site cookies
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true, // ✅ Required for cross-site cookies
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: "Error fetching students", error: err.message });
  }
};

// ✅ All students grouped by class
export const getAllStudentsGroupedByClass = async (req, res) => {
  try {
    const students = await Student.find();
    const grouped = {};

    students.forEach((student) => {
      const cls = student.className || "Unknown";
      if (!grouped[cls]) grouped[cls] = [];
      grouped[cls].push(student);
    });

    res.status(200).json(grouped);
  } catch (err) {
    res.status(500).json({ message: "Error grouping students", error: err.message });
  }
};

// ✅ Students by class name
export const getStudentsByClassByName = async (req, res) => {
  const { className } = req.params;

  try {
    const students = await Student.find({ className });
    if (!students.length) {
      return res.status(404).json({ message: `No students found for class ${className}` });
    }
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "Error fetching students", error: err.message });
  }
};

// ✅ Delete student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await Student.findByIdAndDelete(id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting student", error: err.message });
  }
};
// controllers/student.controller.js
export const getLoggedInStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.user._id).select("-password");
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error: error.message });
  }
};

// ✅ Students by classId (optional)
export const getStudentsByClassId = async (req, res) => {
  try {
    const classId = req.params.classId;
    const students = await Student.find({ class: classId }).populate("class");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error: error.message });
  }
};


export const getStudentsByClass = async (req, res) => {
  const { classId } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).json({ message: 'Invalid class ID' });
    }

    const classDoc = await Class.findById(classId);
    if (!classDoc) {
      return res.status(404).json({ message: 'Class not found' });
    }

    // 🔥 Match students with className (or use classId if you store it that way)
    const students = await Student.find({ className: classDoc.name }).select("name _id");

    res.status(200).json(students);
  } catch (err) {
    console.error("Server error while fetching students by class:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};



// student.controller.js
export const getStudentsByClassName = async (req, res) => {
  try {
    const { className } = req.params;
    const students = await Student.find({ className: className });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};