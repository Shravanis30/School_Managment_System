// controllers/event.controller.js
import Event from '../models/event.model.js';

export const createEvent = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const newEvent = await Event.create({
      adminId: req.user.id,
      title,
      description,
      date,
    });
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create event', error: err.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch events', error: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete event', error: err.message });
  }
};
