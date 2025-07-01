// import jwt from "jsonwebtoken";
// import Admin from "../models/admin.model.js";
// import Teacher from "../models/teacher.model.js";
// import Student from "../models/student.model.js";

// const authMiddleware = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "Unauthorized: No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     // 🔐 Decode token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const { id, role } = decoded;

//     // 👤 Dynamically find the user based on role
//     let user;
//     if (role === "admin") {
//       user = await Admin.findById(id);
//     } else if (role === "teacher") {
//       user = await Teacher.findById(id);
//     } else if (role === "student") {
//       user = await Student.findById(id);
//     }

//     if (!user) {
//       return res.status(401).json({ message: "Unauthorized: User not found" });
//     }

//     // 👌 Attach user info and role to request
//     req.user = { id: user._id, role }; // Minimal for downstream usage
//     req.fullUser = user; // Full object if needed in protected routes

//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Unauthorized: Invalid token" });
//   }
// };

// export default authMiddleware;



import jwt from "jsonwebtoken";
import Admin from "../models/admin.model.js";
import Teacher from "../models/teacher.model.js";
import Student from "../models/student.model.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, role } = decoded;

    let user;
    if (role === "admin") {
      user = await Admin.findById(id);
    } else if (role === "teacher") {
      user = await Teacher.findById(id);
    } else if (role === "student") {
      user = await Student.findById(id);
    }

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // Optionally check if account is disabled
    // if (user.isDisabled) return res.status(403).json({ message: "Account disabled" });

    req.user = { id: user._id, role };
    req.fullUser = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default authMiddleware;
