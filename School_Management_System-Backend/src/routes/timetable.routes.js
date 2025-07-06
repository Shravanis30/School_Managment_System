// // routes/timetable.routes.js
// import express from 'express';
// import {
//   uploadTimetable,
//   getTimetableByClassName,
//   deleteTimetableByClass,
// } from '../controllers/timetable.controller.js';
// import authMiddleware from '../middlewares/auth.middleware.js';
// const router = express.Router();

// router.post('/', authMiddleware, uploadTimetable);
// // router.get('/:classId',authMiddleware, getTimetableByClassName);
// // router.delete('/:classId',authMiddleware, deleteTimetableByClass);
// // router.get('/:className', authMiddleware, getTimetableByClassName);
// router.get('/:className', authMiddleware, (req, res, next) => {
//   console.log(`Fetching timetable for: ${req.params.className}`);
//   next();
// }, getTimetableByClassName);
// router.delete('/:className', authMiddleware, deleteTimetableByClass);

// export default router;




// routes/timetable.routes.js
import express from 'express';
import {
  uploadTimetable,
  getTimetableByClassName,
  deleteTimetableByClass,
} from '../controllers/timetable.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, uploadTimetable);
router.get('/:className', authMiddleware, getTimetableByClassName);
router.delete('/:className', authMiddleware, deleteTimetableByClass);

export default router;
