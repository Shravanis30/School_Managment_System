

import Teacher from '../models/teacher.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';

// ✅ Create Teacher (Admin only)
export const createTeacher = async (req, res) => {
  if (req.role !== 'admin') {
    throw new ApiError(403, 'Only admins can create teachers');
  }

  const { fullName, employeeId, email, password, classTeacherOf, subjects, profileImage } = req.body;

  try {
    const existing = await Teacher.findOne({ email });
    if (existing) throw new ApiError(400, 'Teacher already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    const teacher = await Teacher.create({
      adminId: req.user._id,
      fullName,
      employeeId,
      email,
      password: hashedPassword,
      classTeacherOf,
      subjects,
      profileImage,
      role: "teacher",
      designation: "Teacher"
    });

    res.status(201).json({ message: "Teacher created", teacher });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message || "Error creating teacher" });
  }
};

// ✅ Get Teachers by Logged-In Admin
export const getTeachers = async (req, res) => {
  try {
    if (req.role !== 'admin') {
      throw new ApiError(403, 'Only admins can view their teachers');
    }

    const teachers = await Teacher.find({ adminId: req.user._id });
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching teachers", error: err.message });
  }
};

// ✅ Teacher Login
export const loginTeacher = async (req, res) => {
  const { email, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) throw new ApiError(404, 'Teacher not found');

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) throw new ApiError(401, 'Invalid credentials');

    const payload = {
      _id: teacher._id,
      role: 'teacher',
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d',
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '10d',
    });

    // Set tokens via cookie
    res
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
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
    res.status(err.statusCode || 500).json({ message: err.message || "Login error" });
  }
};

// ✅ Get all teachers (Admin only)
export const getAllTeachers = async (req, res) => {
  try {
    if (req.role !== 'admin') {
      throw new ApiError(403, 'Only admins can view all teachers');
    }

    const teachers = await Teacher.find();
    res.status(200).json(teachers);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch teachers', error: err.message });
  }
};

// ✅ Delete teacher by ID (Admin only)
export const deleteTeacherController = async (req, res) => {
  try {
    if (req.role !== 'admin') {
      throw new ApiError(403, 'Only admins can delete teachers');
    }

    const teacherId = req.params.id;
    const deleted = await Teacher.findByIdAndDelete(teacherId);

    if (!deleted) {
      throw new ApiError(404, 'Teacher not found');
    }

    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message || 'Server error' });
  }
};


