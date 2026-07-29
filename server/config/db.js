import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env configuration
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

const dataDir = path.join(__dirname, '../data_store');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const MONGODB_URI = process.env.MONGODB_URI || '';

let isMongoConnected = false;

export const initDb = async () => {
  if (!MONGODB_URI) {
    console.log('[Database] MONGODB_URI not provided. Using local JSON DataStore fallback.');
    isMongoConnected = false;
    return { isMongoConnected };
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000
    });
    isMongoConnected = true;
    console.log('[Database] SUCCESS: Connected to MongoDB Atlas Cluster!');
  } catch (err) {
    isMongoConnected = false;
    console.log(`[Database] MongoDB connection error (${err.message}). Using local JSON DataStore fallback.`);
  }

  return { isMongoConnected };
};

// File-based fallback helper for offline/zero-config mode
export const readJsonStore = (tableName) => {
  const filePath = path.join(dataDir, `${tableName}.json`);
  if (!fs.existsSync(filePath)) return [];
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const writeJsonStore = (tableName, data) => {
  const filePath = path.join(dataDir, `${tableName}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

export const getDb = () => ({
  isMongoConnected: mongoose.connection.readyState === 1
});
