// import express from 'express';
// import authMiddleware from '../middlewares/auth.middleware.js';

// import Admin from '../models/admin.model.js';
// import Teacher from '../models/teacher.model.js';
// import Student from '../models/student.model.js';

// const router = express.Router();

// // GET /api/user/profile
// router.get('/profile', authMiddleware, async (req, res) => {
//   try {
//     const { id, role } = req.user;
//     let user;

//     if (role === 'admin') {
//       user = await Admin.findById(id).select('-password');
//     } else if (role === 'teacher') {
//       user = await Teacher.findById(id).select('-password');
//     } else if (role === 'student') {
//       user = await Student.findById(id).select('-password');
//     }

//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.status(200).json(user);
//   } catch (err) {
//     console.error('Error fetching profile:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// export default router;



// // new auth
// import express from 'express';
// import authMiddleware from '../middlewares/auth.middleware.js';

// const router = express.Router();

// // GET /api/user/profile
// // routes/user.route.js
// router.get('/profile', authMiddleware, (req, res) => {
//   try {
//     const user = req.user; // Already populated by authMiddleware
//     if (!user) return res.status(404).json({ message: 'User not found' });

//     res.status(200).json({
//       id: user._id,
//       name: user.name,
//       email: user.email,
//       role: req.role,
//       schoolName: user.schoolName || undefined,
//       profileImage: user.profileImage || undefined,
//       designation: user.designation || undefined,
//     });
//   } catch (err) {
//     console.error('Error fetching profile:', err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });


// export default router;



// routes/user.route.js
import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { getProfile, logoutUser } from '../controllers/user.controller.js'; // ✅ Import controller

const router = express.Router();

router.get('/profile', authMiddleware, getProfile); // ✅ Use controller
router.post('/logout', logoutUser);


export default router;
