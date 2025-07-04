// middlewares/multerConfig.js
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Define the directory where files will be stored
const resourceUploadPath = path.join('uploads', 'resources');

// Ensure the directory exists
if (!fs.existsSync(resourceUploadPath)) {
  fs.mkdirSync(resourceUploadPath, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, resourceUploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); // .pdf
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

// File filter to allow only PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

// Export configured multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB max size (optional)
  },
});

export default upload;
