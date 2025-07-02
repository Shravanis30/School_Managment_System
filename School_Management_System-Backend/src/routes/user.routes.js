import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';

import Admin from '../models/admin.model.js';
import Teacher from '../models/teacher.model.js';
import Student from '../models/student.model.js';

const router = express.Router();

// GET /api/user/profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const { id, role } = req.user;
    let user;

    if (role === 'admin') {
      user = await Admin.findById(id).select('-password');
    } else if (role === 'teacher') {
      user = await Teacher.findById(id).select('-password');
    } else if (role === 'student') {
      user = await Student.findById(id).select('-password');
    }

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
