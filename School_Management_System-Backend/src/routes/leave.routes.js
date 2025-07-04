
import express from 'express';
import LeaveApplication from '../models/leaveapplication.model.js';
import authMiddleware, { authorizeRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

// ✅ POST - Submit Leave (student only)
router.post('/submit', authMiddleware, authorizeRole('student'), async (req, res) => {
  try {
    const { fromDate, toDate, reason } = req.body;

    // Pull student data from req.user
    const newLeave = new LeaveApplication({
      studentName: req.user.name,
      class: req.user.class,
      rollNo: req.user.rollNo,
      fromDate,
      toDate,
      reason,
    });

    await newLeave.save();
    res.status(201).json({ message: 'Leave application submitted!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit leave' });
  }
});

// ✅ GET - View All Leaves (For Teachers/Admins)
router.get('/', authMiddleware, authorizeRole('teacher', 'admin'), async (req, res) => {
  try {
    const leaves = await LeaveApplication.find().sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leave applications' });
  }
});

export default router;
