// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // contains user ID and role
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Invalid or expired token" });
//   }
// };
// export const authorizeRole = (role) => {
//   return (req, res, next) => {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1];

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       if (decoded.role !== role) {
//         return res.status(403).json({ message: "Access denied. Not authorized." });
//       }

//       req.user = decoded; // ✅ This is what makes req.user.id work
//       next();
//     } catch (err) {
//       return res.status(401).json({ message: "Invalid token" });
//     }
//   };
// };




// export default authMiddleware;


import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";
import Admin from "../models/admin.model.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw new ApiError(401, "Access token missing");
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token");
  }

  const { _id, role } = decodedToken;

  if (!_id || !role) {
    throw new ApiError(401, "Invalid token payload");
  }

  let user = null;

  if (role === "student") {
    user = await Student.findById(_id).select("-password -refreshToken");
  } else if (role === "teacher") {
    user = await Teacher.findById(_id).select("-password -refreshToken");
  } else if (role === "admin") {
    user = await Admin.findById(_id).select("-password -refreshToken");
  } else {
    throw new ApiError(401, "Invalid user role");
  }

  if (!user) {
    throw new ApiError(401, `${role} not found`);
  }

  req.user = user;
  req.role = role;
  next();
});

export const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      throw new ApiError(403, "You are not authorized for this route");
    }
    next();
  };
};
export default authMiddleware;


export const logoutUser = (req, res) => {
  res
    .clearCookie("accessToken")
    .clearCookie("refreshToken")
    .status(200)
    .json({ message: "Logged out successfully" });
};
