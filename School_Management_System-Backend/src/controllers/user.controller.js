
import Admin from "../models/admin.model.js";
import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;

    if (userRole === 'admin') {
      const admin = await Admin.findById(userId);
      if (!admin) return res.status(404).json({ message: "Admin not found" });
      return res.json({
        id: admin._id,
        name: admin.name,
        email: admin.email,
        schoolName: admin.schoolName,
        profileImage: admin.profileImage || null,
        role: 'admin',
        designation: 'Principal',
      });
    }

    if (userRole === 'teacher') {
      const teacher = await Teacher.findById(userId);
      if (!teacher) return res.status(404).json({ message: "Teacher not found" });
      return res.json({
        id: teacher._id,
        name: teacher.fullName,
        email: teacher.email,
        employeeId: teacher.employeeId,
        classTeacherOf: teacher.classTeacherOf,
        subjects: teacher.subjects,
        profileImage: teacher.profileImage || null,
        role: 'teacher',
        designation: 'Teacher',
      });
    }

    if (userRole === 'student') {
      const student = await Student.findById(userId);
      if (!student) return res.status(404).json({ message: "Student not found" });
      return res.json({
        id: student._id,
        name: student.name,
        email: student.email,
        class: student.class,
        rollNo: student.rollNo,
        profileImage: student.profileImage || null,
        role: 'student',
        designation: 'Student',
      });
    }

    res.status(400).json({ message: "Invalid user role" });
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
};
