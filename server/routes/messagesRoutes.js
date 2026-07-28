import express from 'express';
import { getMessages, submitMessage, toggleReadStatus, deleteMessage } from '../controllers/messagesController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', submitMessage);
router.get('/', requireAdmin, getMessages);
router.patch('/:id/read', requireAdmin, toggleReadStatus);
router.delete('/:id', requireAdmin, deleteMessage);

export default router;
