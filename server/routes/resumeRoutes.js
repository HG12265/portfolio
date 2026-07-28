import express from 'express';
import { getResume, uploadResume } from '../controllers/resumeController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getResume);
router.post('/upload', requireAdmin, upload.single('resume'), uploadResume);

export default router;
