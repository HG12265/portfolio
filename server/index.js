import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import aboutRoutes from './routes/aboutRoutes.js';
import skillsRoutes from './routes/skillsRoutes.js';
import projectsRoutes from './routes/projectsRoutes.js';
import certsRoutes from './routes/certsRoutes.js';
import eduRoutes from './routes/eduRoutes.js';
import messagesRoutes from './routes/messagesRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import publicRoutes from './routes/publicRoutes.js';

import { seedDatabase } from './scripts/seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 200,
  message: { success: false, message: 'Too many requests from this IP, please try again later.' }
});
app.use('/api/', limiter);

// Serve Static Uploads
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Mount REST API Routes
app.use('/api/public', publicRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin/dashboard', dashboardRoutes);
app.use('/api/admin/about', aboutRoutes);
app.use('/api/admin/skills', skillsRoutes);
app.use('/api/admin/projects', projectsRoutes);
app.use('/api/admin/certificates', certsRoutes);
app.use('/api/admin/education', eduRoutes);
app.use('/api/admin/messages', messagesRoutes);
app.use('/api/admin/resume', resumeRoutes);
app.use('/api/admin/settings', settingsRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Run DB seed on startup
seedDatabase().catch(err => console.error('Seed Error:', err));

app.listen(PORT, () => {
  console.log(`[Server] Portfolio CMS Backend running on http://localhost:${PORT}`);
});
