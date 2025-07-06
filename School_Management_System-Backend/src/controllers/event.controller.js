
// import Event from '../models/event.model.js';
// import { ApiError } from '../utils/ApiError.js';

// // ✅ Create Event (Admin only)
// export const createEvent = async (req, res) => {
//   try {
//     if (req.role !== 'admin') {
//       throw new ApiError(403, 'Only admins can create events');
//     }

//     const { title, description, date } = req.body;

//     const newEvent = await Event.create({
//       adminId: req.user._id,
//       title,
//       description,
//       date,
//     });

//     res.status(201).json(newEvent);
//   } catch (err) {
//     res.status(err.statusCode || 500).json({
//       message: err.message || 'Failed to create event',
//     });
//   }
// };

// // ✅ Get All Events (Accessible to all roles)
// export const getAllEvents = async (req, res) => {
//   try {
//     const events = await Event.find().sort({ date: 1 });
//     res.status(200).json(events);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch events', error: err.message });
//   }
// };

// // ✅ Delete Event (Admin only)
// export const deleteEvent = async (req, res) => {
//   try {
//     if (req.role !== 'admin') {
//       throw new ApiError(403, 'Only admins can delete events');
//     }

//     const { id } = req.params;

//     const deleted = await Event.findByIdAndDelete(id);
//     if (!deleted) {
//       throw new ApiError(404, 'Event not found');
//     }

//     res.status(200).json({ message: 'Event deleted successfully' });
//   } catch (err) {
//     res.status(err.statusCode || 500).json({
//       message: err.message || 'Failed to delete event',
//     });
//   }
// };


// controllers/event.controller.js
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

// ✅ Get All Events (Filtered by admin)
export const getAllEvents = async (req, res) => {
  try {
    const adminId = req.user.adminId || req.user._id;

    const events = await Event.find({ adminId }).sort({ date: 1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch events', error: err.message });
  }
};

// ✅ Delete Event (Admin only, and must own it)
export const deleteEvent = async (req, res) => {
  try {
    if (req.role !== 'admin') {
      throw new ApiError(403, 'Only admins can delete events');
    }

    const { id } = req.params;

    const deleted = await Event.findOneAndDelete({ _id: id, adminId: req.user._id });
    if (!deleted) {
      throw new ApiError(404, 'Event not found or not owned by admin');
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(err.statusCode || 500).json({
      message: err.message || 'Failed to delete event',
    });
  }
};
