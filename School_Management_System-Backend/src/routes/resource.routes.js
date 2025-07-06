// // src/routes/resource.routes.js
// import express from 'express';
// import {
//   uploadResource,
//   getResourcesByClass,
//   getSubjectsByClass
// } from '../controllers/resource.controller.js';
// import authMiddleware from '../middlewares/auth.middleware.js';
// import upload from '../middlewares/multerConfig.middleware.js'; // ✅ Import multer config

// const router = express.Router();

// // POST /api/resources/upload
// router.post('/upload', authMiddleware, upload.single('file'), uploadResource);

// // GET /api/resources/class/:className
// router.get('/class/:className', authMiddleware, getResourcesByClass);

// // GET /api/resources/subjects/:className
// router.get('/subjects/:className', authMiddleware, getSubjectsByClass);

// export default router;


import express from 'express';
import {
  uploadResource,
  getResourcesByClass,
  getSubjectsByClass
} from '../controllers/resource.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import upload from '../middlewares/multerConfig.middleware.js'; // ✅ Import multer config

const router = express.Router();

// POST /api/resources/upload
router.post('/upload', authMiddleware, upload.single('file'), uploadResource);

// GET /api/resources/class/:className
router.get('/class/:className', authMiddleware, getResourcesByClass);

// GET /api/resources/subjects/:className
router.get('/subjects/:className', authMiddleware, getSubjectsByClass);

export default router;
