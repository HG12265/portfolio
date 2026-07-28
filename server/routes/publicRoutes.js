import express from 'express';
import { getPublicPortfolio } from '../controllers/publicController.js';

const router = express.Router();

router.get('/portfolio', getPublicPortfolio);

export default router;
