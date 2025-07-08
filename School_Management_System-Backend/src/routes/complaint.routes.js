// // routes/complaint.routes.js
// import express from 'express';
// import { submitComplaint, getAllComplaints } from '../controllers/complaint.controller.js';
// import authMiddleware from '../middlewares/auth.middleware.js'

// const router = express.Router();

// router.post('/', authMiddleware, submitComplaint);
// router.get('/', authMiddleware, getAllComplaints);

// export default router;

// routes/complaint.routes.js
import express from 'express';
import { submitComplaint, getAllComplaints, deleteComplaint } from '../controllers/complaint.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, submitComplaint);
router.get('/', authMiddleware, getAllComplaints);
router.delete('/:id', authMiddleware, deleteComplaint);


export default router;
