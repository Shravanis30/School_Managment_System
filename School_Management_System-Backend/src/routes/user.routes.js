

// routes/user.route.js
import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { getProfile, logoutUser } from '../controllers/user.controller.js'; // ✅ Import controller

const router = express.Router();

router.get('/profile', authMiddleware, getProfile); // ✅ Use controller
router.post('/logout', logoutUser);


export default router;
