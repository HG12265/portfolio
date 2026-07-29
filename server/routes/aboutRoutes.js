import express from 'express';
import { getAbout, updateAbout } from '../controllers/aboutController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getAbout);
router.put('/', requireAdmin, upload.single('profile_image'), updateAbout);

export default router;
