import express from 'express';
import {
    createNotice,
    getNotices,
    deleteNotice,
} from '../controllers/notice.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

// Only logged-in admins can add or delete
router.post('/', authMiddleware, createNotice);
router.get('/', authMiddleware, getNotices);
router.delete('/:id', authMiddleware, deleteNotice);

export default router;
