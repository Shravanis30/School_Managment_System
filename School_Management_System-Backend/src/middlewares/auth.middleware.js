

import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Student from "../models/student.model.js";
import Teacher from "../models/teacher.model.js";
import Admin from "../models/admin.model.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
    console.log('Checking authentication...');
  console.log('Cookies:', req.cookies);
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
    // user = await Student.findById(_id).select("-password -refreshToken");

    console.log("Looking up student:", _id);
    user = await Student.findById(_id).select("-password -refreshToken");
    if (!user) console.log("❌ Student not found in DB");
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
