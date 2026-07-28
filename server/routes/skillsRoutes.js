import express from 'express';
import { getSkills, createSkill, updateSkill, deleteSkill, reorderSkills } from '../controllers/skillsController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getSkills);
router.post('/', requireAdmin, createSkill);
router.put('/reorder', requireAdmin, reorderSkills);
router.put('/:id', requireAdmin, updateSkill);
router.delete('/:id', requireAdmin, deleteSkill);

export default router;
