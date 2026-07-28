import express from 'express';
import { getCertificates, createCertificate, updateCertificate, deleteCertificate } from '../controllers/certsController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getCertificates);
router.post('/', requireAdmin, upload.single('image'), createCertificate);
router.put('/:id', requireAdmin, upload.single('image'), updateCertificate);
router.delete('/:id', requireAdmin, deleteCertificate);

export default router;
