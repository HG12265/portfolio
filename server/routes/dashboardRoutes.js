import express from 'express';
import { getDashboardSummary } from '../controllers/dashboardController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/summary', requireAdmin, getDashboardSummary);

export default router;
