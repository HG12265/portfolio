import express from 'express';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/projectsController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getProjects);
router.post('/', requireAdmin, upload.single('image'), createProject);
router.put('/:id', requireAdmin, upload.single('image'), updateProject);
router.delete('/:id', requireAdmin, deleteProject);

export default router;
