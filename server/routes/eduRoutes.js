import express from 'express';
import { getEducation, createEducation, updateEducation, deleteEducation } from '../controllers/eduController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getEducation);
router.post('/', requireAdmin, createEducation);
router.put('/:id', requireAdmin, updateEducation);
router.delete('/:id', requireAdmin, deleteEducation);

export default router;
