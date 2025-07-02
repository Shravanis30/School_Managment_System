// routes/complaint.routes.js
import express from 'express';
import { submitComplaint, getAllComplaints } from '../controllers/complaint.controller.js';

const router = express.Router();

router.post('/', submitComplaint);
router.get('/', getAllComplaints);

export default router;
