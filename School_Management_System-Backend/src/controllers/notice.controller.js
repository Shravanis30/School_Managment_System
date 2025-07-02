// controllers/notice.controller.js
import Notice from '../models/notice.model.js';

// Create a new notice
export const createNotice = async (req, res) => {
  try {
    const { title, details, date } = req.body;

    const notice = await Notice.create({
      title,
      details,
      date,
      createdBy: req.user.id, // Admin who created
    });

    res.status(201).json(notice);
  } catch (err) {
    res.status(500).json({ message: 'Error creating notice', error: err.message });
  }
};

// Get all notices
export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.json(notices);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notices', error: err.message });
  }
};

// Delete a notice by ID
export const deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;
    await Notice.findByIdAndDelete(id);
    res.json({ message: 'Notice deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting notice', error: err.message });
  }
};
