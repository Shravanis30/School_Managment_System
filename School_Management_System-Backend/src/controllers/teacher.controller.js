// controllers/teacher.controller.js
import Teacher from '../models/teacher.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';

export const createTeacher = async (req, res) => {
  if (req.role !== 'admin') throw new ApiError(403, 'Only admins can create teachers');

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
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const getTeachers = async (req, res) => {
  try {
    if (req.role !== 'admin') throw new ApiError(403, 'Only admins can view teachers');

    const teachers = await Teacher.find({ adminId: req.user._id });
    res.status(200).json(teachers);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

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

    res
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: 'Login successful' });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const deleteTeacherController = async (req, res) => {
  try {
    if (req.role !== 'admin') throw new ApiError(403, 'Only admins can delete teachers');

    const teacherId = req.params.id;
    const deleted = await Teacher.findOneAndDelete({ _id: teacherId, adminId: req.user._id });

    if (!deleted) throw new ApiError(404, 'Teacher not found or unauthorized');

    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

// teacher.controller.js
export const getStudentsByClassForTeacher = async (req, res) => {
  try {
    const students = await Student.find({
      className: req.params.className,
      adminId: req.user.adminId // Using teacher's adminId
    });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students' });
  }
};