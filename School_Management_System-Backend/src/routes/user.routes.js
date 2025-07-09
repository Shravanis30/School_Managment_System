

// // routes/user.route.js
// import express from 'express';
// import authMiddleware from '../middlewares/auth.middleware.js';
// import { getProfile, logoutUser } from '../controllers/user.controller.js'; // ✅ Import controller
// import upload from '../middlewares/multerConfig.middleware.js';

// const router = express.Router();

// router.get('/profile', authMiddleware, getProfile); // ✅ Use controller
// router.post('/logout', logoutUser);

// // router.post('/upload-profile-image', authMiddleware, upload.single('image'), uploadProfileImage);


// export default router;



// routes/user.routes.js

import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import {
  getProfile,
  logoutUser,
  uploadProfileImage
} from '../controllers/user.controller.js';
import upload from '../middlewares/upload.middleware.js';

const router = express.Router();

// ✅ Get profile of currently logged-in user
router.get('/profile', authMiddleware, getProfile);

// ✅ Logout user
router.post('/logout', logoutUser);

// ✅ Upload profile image (requires auth)
router.post(
  "/upload-profile-image",
  authMiddleware,
  upload.single("image"),
  uploadProfileImage
);

export default router;
