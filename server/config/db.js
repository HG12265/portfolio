import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
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

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';
const DB_NAME = process.env.DB_NAME || 'portfolio_cms';
const DB_PORT = parseInt(process.env.DB_PORT || '3306');

let pool = null;
let isMysqlConnected = false;

export const initDb = async () => {
  try {
    // 1. Connection without database to auto-create DB_NAME if needed
    const tempConn = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      port: DB_PORT
    });

    await tempConn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\`;`);
    await tempConn.end();

    // 2. Create pool connected to DB_NAME
    pool = mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASS,
      database: DB_NAME,
      port: DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    const connection = await pool.getConnection();
    
    // Auto add profile_image_url & social links columns if not exist
    try { await connection.query("ALTER TABLE about ADD COLUMN profile_image_url VARCHAR(255) DEFAULT '/assets/gowtham-profile.png';"); } catch {}
    try { await connection.query("ALTER TABLE about ADD COLUMN github_url VARCHAR(255) DEFAULT 'https://github.com/gowthamg-dev';"); } catch {}
    try { await connection.query("ALTER TABLE about ADD COLUMN linkedin_url VARCHAR(255) DEFAULT 'https://linkedin.com/in/gowthamg-dev';"); } catch {}
    try { await connection.query("ALTER TABLE about ADD COLUMN twitter_url VARCHAR(255) DEFAULT 'https://twitter.com/gowthamg_dev';"); } catch {}
    try { await connection.query("ALTER TABLE about ADD COLUMN instagram_url VARCHAR(255) DEFAULT 'https://instagram.com/gowthamg_dev';"); } catch {}

    // Auto migrate certificates table columns and make legacy NOT NULL columns nullable
    try { await connection.query("ALTER TABLE certificates ADD COLUMN organization VARCHAR(100) DEFAULT '';"); } catch {}
    try { await connection.query("ALTER TABLE certificates ADD COLUMN duration VARCHAR(50) DEFAULT '';"); } catch {}
    try { await connection.query("ALTER TABLE certificates MODIFY COLUMN issuer VARCHAR(100) NULL DEFAULT '';"); } catch {}
    try { await connection.query("ALTER TABLE certificates MODIFY COLUMN year VARCHAR(50) NULL DEFAULT '';"); } catch {}
    try { await connection.query("ALTER TABLE certificates MODIFY COLUMN credential_id VARCHAR(100) NULL DEFAULT '';"); } catch {}
    try { await connection.query("ALTER TABLE certificates MODIFY COLUMN verify_url VARCHAR(255) NULL DEFAULT '';"); } catch {}

    connection.release();

    isMysqlConnected = true;
    console.log(`[Database] SUCCESS: MySQL connected to database '${DB_NAME}' at ${DB_HOST}:${DB_PORT}`);
  } catch (err) {
    isMysqlConnected = false;
    console.log(`[Database] MySQL connection offline (${err.message}). Using local JSON DataStore fallback.`);
  }

  return { pool, isMysqlConnected };
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
  pool,
  isMysqlConnected,
});
