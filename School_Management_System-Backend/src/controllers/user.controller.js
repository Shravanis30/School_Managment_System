
import Admin from "../models/admin.model.js";
import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";

export const getProfile = async (req, res) => {
  try {
    const user = req.user; // Injected from auth middleware
    const role = req.role;

    if (role === 'admin') {
      return res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        schoolName: user.schoolName,
        profileImage: user.profileImage || null,
        role: 'admin',
        designation: 'Principal',
      });
    }

    if (role === 'teacher') {
      return res.status(200).json({
        id: user._id,
        name: user.fullName,
        email: user.email,
        employeeId: user.employeeId,
        classTeacherOf: user.classTeacherOf,
        subjects: user.subjects,
        profileImage: user.profileImage || null,
        role: 'teacher',
        designation: 'Teacher',
      });
    }

    if (role === 'student') {
      return res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        class: user.className,
        rollNo: user.rollNo,
        profileImage: user.profileImage || null,
        role: 'student',
        designation: 'Student',
      });
    }

    return res.status(400).json({ message: "Invalid user role" });
  } catch (err) {
    res.status(500).json({ message: "Error fetching profile", error: err.message });
  }
};


export const logoutUser = async (req, res) => {
  try {
    console.log("Logout route hit. User:", req.user);
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ message: "Error during logout", error: err.message });
  }
};



export const uploadProfileImage = async (req, res) => {
  try {
    const user = req.user;
    const role = req.role;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const profileImage = `/uploads/${req.file.filename}`;

    let updatedUser;

    if (role === 'admin') {
      updatedUser = await Admin.findByIdAndUpdate(user._id, { profileImage }, { new: true });
    } else if (role === 'teacher') {
      updatedUser = await Teacher.findByIdAndUpdate(user._id, { profileImage }, { new: true });
    } else if (role === 'student') {
      updatedUser = await Student.findByIdAndUpdate(user._id, { profileImage }, { new: true });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    res.status(200).json({ profileImage: updatedUser.profileImage });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Server error during upload", error: err.message });
  }
};
