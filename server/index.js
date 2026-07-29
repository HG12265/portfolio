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

import { initDb } from './config/db.js';
import { seedDatabase } from './scripts/seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// 1. ALWAYS SET CORS HEADERS ON ALL RESPONSES FIRST
app.use((req, res, next) => {
  const origin = req.headers.origin || '*';
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).send('OK');
  }
  next();
});

// Security Middlewares
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  message: { success: false, message: 'Too many requests from this IP, please try again later.' }
});
app.use('/api/', limiter);

// Strip cPanel subpath prefix (/portfolio-api) if passed by Passenger
app.use((req, res, next) => {
  if (req.url.startsWith('/portfolio-api')) {
    req.url = req.url.replace('/portfolio-api', '') || '/';
  }
  next();
});

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

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    message: 'Portfolio CMS Backend API running live on cPanel Node.js Server!',
    endpoints: {
      health: '/api/health',
      portfolio: '/api/public/portfolio'
    }
  });
});

// Universal Error Handler to prevent crash & ensure CORS headers on error
app.use((err, req, res, next) => {
  const origin = req.headers.origin || '*';
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  console.error('[Unhandled Server Error]', err);
  res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
});

// Await DB connection first, then run seed
(async () => {
  await initDb();
  await seedDatabase();
  app.listen(PORT, () => {
    console.log(`[Server] Portfolio CMS Backend running on http://localhost:${PORT}`);
  });
})();

export default app;
