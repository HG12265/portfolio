import express from 'express';
import { login, logout, getMe, checkMe } from '../controllers/authController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.get('/me', requireAdmin, checkMe || getMe);

export default router;
