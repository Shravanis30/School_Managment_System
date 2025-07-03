// // controllers/event.controller.js
// import Event from '../models/event.model.js';

// export const createEvent = async (req, res) => {
//   try {
//     const { title, description, date } = req.body;
//     const newEvent = await Event.create({
//       adminId: req.user.id,
//       title,
//       description,
//       date,
//     });
//     res.status(201).json(newEvent);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to create event', error: err.message });
//   }
// };

// export const getAllEvents = async (req, res) => {
//   try {
//     const events = await Event.find();
//     res.json(events);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch events', error: err.message });
//   }
// };

// export const deleteEvent = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Event.findByIdAndDelete(id);
//     res.json({ message: 'Event deleted' });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to delete event', error: err.message });
//   }
// };



// new auth

import Event from '../models/event.model.js';
import { ApiError } from '../utils/ApiError.js';

// ✅ Create Event (Admin only)
export const createEvent = async (req, res) => {
  try {
    if (req.role !== 'admin') {
      throw new ApiError(403, 'Only admins can create events');
    }

    const { title, description, date } = req.body;

    const newEvent = await Event.create({
      adminId: req.user._id,
      title,
      description,
      date,
    });

    res.status(201).json(newEvent);
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || 'Failed to create event',
    });
  }
};

// ✅ Get All Events (Accessible to all roles)
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch events', error: err.message });
  }
};

// ✅ Delete Event (Admin only)
export const deleteEvent = async (req, res) => {
  try {
    if (req.role !== 'admin') {
      throw new ApiError(403, 'Only admins can delete events');
    }

    const { id } = req.params;

    const deleted = await Event.findByIdAndDelete(id);
    if (!deleted) {
      throw new ApiError(404, 'Event not found');
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || 'Failed to delete event',
    });
  }
};
