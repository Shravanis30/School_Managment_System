import Student from "../models/student.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ✅ Admin registers a student
export const createStudent = async (req, res) => {
  const { name, email, password, class: studentClass, rollNo, profileImage } = req.body;

  try {
    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ message: "Student already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      adminId: req.user.id,
      name,
      email,
      password: hashedPassword,
      class: studentClass,
      rollNo,
      profileImage,
      role: "student",
      designation: "Student"
    });

    res.status(201).json({ message: "Student created", student });
  } catch (err) {
    res.status(500).json({ message: "Error creating student", error: err.message });
  }
};
// ✅ Student Login
export const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ message: "Student not found" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: student._id, role: 'student' }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: {
        id: student._id,
        name: student.name,
        email: student.email,
        class: student.class,
        rollNo: student.rollNo,
        profileImage: student.profileImage,
        role: "student",
        designation: "Student"
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};

