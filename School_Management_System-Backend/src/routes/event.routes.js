import express from 'express';
import { createEvent, getAllEvents, deleteEvent } from '../controllers/event.controller.js';
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post('/', authMiddleware, createEvent);
router.get('/', getAllEvents);
router.delete('/:id', authMiddleware, deleteEvent);

export default router;
