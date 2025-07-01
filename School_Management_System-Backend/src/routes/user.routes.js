// routes/user.routes.js
import express from 'express';
import { getProfile } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// ✅ Get current user profile
router.get("/profile", authMiddleware, getProfile);


// router.get('/profile', authMiddleware, async (req, res) => {
//   try {
//     const { role, id } = req.user; // injected by authMiddleware

//     let user = null;

//     if (role === 'admin') {
//       user = await Admin.findById(id).select('name profileImage role designation');
//     } else if (role === 'teacher') {
//       user = await Teacher.findById(id).select('fullName profileImage role designation');
//       if (user) user.name = user.fullName;
//     } else if (role === 'student') {
//       user = await Student.findById(id).select('name profileImage role designation');
//     }

//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching user profile', error: err.message });
//   }
// });

export default router;
