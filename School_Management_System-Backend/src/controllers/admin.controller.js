


// // changes auth
// import Admin from "../models/admin.model.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { ApiError } from "../utils/ApiError.js";

// // ✅ Register Admin
// export const registerAdmin = async (req, res) => {
//   const { name, schoolName, email, password, profileImage } = req.body;

//   try {
//     const existingAdmin = await Admin.findOne({ email });
//     if (existingAdmin) throw new ApiError(400, "Admin already exists");

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const admin = await Admin.create({
//       name,
//       schoolName,
//       email,
//       password: hashedPassword,
//       profileImage,
//       role: "admin",
//       designation: "Principal",
//     });

//     // Token payload
//     const payload = {
//       _id: admin._id,
//       role: "admin",
//     };

//     // Access & Refresh tokens
//     const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d",
//     });

//     const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "10d",
//     });

//     // Set cookies
//     res
//       .cookie("accessToken", accessToken, {
//         httpOnly: true,
//         secure: true, // ✅ Required for cross-site cookies
//         sameSite: "none",
//         maxAge: 24 * 60 * 60 * 1000, // 1 day
//       })
//       .cookie("refreshToken", refreshToken, {
//         httpOnly: true,
//         secure: true, // ✅ Required for cross-site cookies
//         sameSite: "none",
//         maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
//       })
//       .status(201)
//       .json({
//         message: "Admin registered successfully",
//         admin: {
//           _id: admin._id,
//           name: admin.name,
//           email: admin.email,
//           schoolName: admin.schoolName,
//           profileImage: admin.profileImage,
//           role: "admin",
//           designation: "Principal",
//         },
//       });
//   } catch (err) {
//     res.status(err.statusCode || 500).json({
//       message: err.message || "Server error",
//     });
//   }
// };

// // Login Admin
// export const loginAdmin = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const admin = await Admin.findOne({ email });
//     if (!admin) throw new ApiError(404, "Admin not found");

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) throw new ApiError(401, "Invalid credentials");

//     const payload = {
//       _id: admin._id,
//       role: "admin",
//     };

//     const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d",
//     });

//     const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "10d",
//     });

//     res
//       .cookie("accessToken", accessToken, {
//         httpOnly: true,
//         secure: true, // ✅ Required for cross-site cookies
//         sameSite: "none",
//         maxAge: 24 * 60 * 60 * 1000,
//       })
//       .cookie("refreshToken", refreshToken, {
//         httpOnly: true,
//         secure: true, // ✅ Required for cross-site cookies
//         sameSite: "none",
//         maxAge: 10 * 24 * 60 * 60 * 1000,
//       })
//       .status(200)
//       .json({
//         message: "Logged in successfully",
//         admin: {
//           _id: admin._id,
//           name: admin.name,
//           email: admin.email,
//           schoolName: admin.schoolName,
//           profileImage: admin.profileImage,
//           role: "admin",
//           designation: "Principal",
//         },
//       });
//   } catch (err) {
//     res.status(err.statusCode || 500).json({
//       message: err.message || "Server error",
//     });
//   }
// };


// ✅ admin.controller.js
import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export const registerAdmin = async (req, res) => {
  const { name, schoolName, email, password, profileImage } = req.body;

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) throw new ApiError(400, "Admin already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      schoolName,
      email,
      password: hashedPassword,
      profileImage,
      role: "admin",
      designation: "Principal",
    });

    const payload = {
      _id: admin._id,
      role: "admin",
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "10d",
    });

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 10 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        message: "Admin registered successfully",
        admin: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          schoolName: admin.schoolName,
          profileImage: admin.profileImage,
          role: "admin",
          designation: "Principal",
        },
      });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Server error",
    });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) throw new ApiError(404, "Admin not found");

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) throw new ApiError(401, "Invalid credentials");

    const payload = {
      _id: admin._id,
      role: "admin",
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d",
    });

    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "10d",
    });

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 10 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Logged in successfully",
        admin: {
          _id: admin._id,
          name: admin.name,
          email: admin.email,
          schoolName: admin.schoolName,
          profileImage: admin.profileImage,
          role: "admin",
          designation: "Principal",
        },
      });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || "Server error",
    });
  }
};
