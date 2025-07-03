// src/routes/resources.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  uploadResource,
  getResourcesByClass,
  getSubjectsByClass
} from '../controllers/resource.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/resources/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// POST /api/resources/upload
router.post('/upload', authMiddleware, upload.single('file'), uploadResource);

// GET /api/resources/class/:className
router.get('/class/:className', getResourcesByClass);

// GET /api/resources/subjects/:className
router.get('/subjects/:className', getSubjectsByClass);

export default router;
