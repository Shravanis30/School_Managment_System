
import express from 'express';
import LeaveApplication from '../models/leaveapplication.model.js';
import authMiddleware, { authorizeRole } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Updated submit route
router.post('/submit', authMiddleware, authorizeRole('student'), async (req, res) => {
  try {
    const { fromDate, toDate, reason } = req.body;

    // Use className instead of class
    const newLeave = new LeaveApplication({
      studentName: req.user.name,
      class: req.user.className,  // Changed from req.user.class
      rollNo: req.user.rollNo,
      fromDate,
      toDate,
      reason,
    });

    await newLeave.save();
    res.status(201).json({ message: 'Leave application submitted!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Failed to submit leave',
      details: error.message
    });
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


// Add to leave.route.js
router.patch('/:id', authMiddleware, authorizeRole('teacher', 'admin'), async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await LeaveApplication.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update leave status' });
  }
});
export default router;
