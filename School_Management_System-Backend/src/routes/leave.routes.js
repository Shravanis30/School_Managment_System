import express from 'express';
import LeaveApplication from '../models/leaveapplication.model.js';

const router = express.Router();

// POST - Submit Leave
router.post('/submit', async (req, res) => {
  try {
    const newLeave = new LeaveApplication(req.body);
    await newLeave.save();
    res.status(201).json({ message: 'Leave application submitted!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit leave' });
  }
});

// GET - View All Leaves (For Teachers)
router.get('/', async (req, res) => {
  try {
    const leaves = await LeaveApplication.find().sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leave applications' });
  }
});

export default router;
