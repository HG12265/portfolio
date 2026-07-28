import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../data_store');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || '';
const DB_NAME = process.env.DB_NAME || 'portfolio_cms';
const DB_PORT = process.env.DB_PORT || 3306;

let pool = null;
let isMysqlConnected = false;

// Initialize MySQL pool asynchronously
(async () => {
  try {
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
    // Test connection
    const connection = await pool.getConnection();
    connection.release();
    isMysqlConnected = true;
    console.log(`[Database] MySQL connected successfully to ${DB_NAME} at ${DB_HOST}:${DB_PORT}`);
  } catch (err) {
    isMysqlConnected = false;
    console.log(`[Database] MySQL connection offline (${err.message}). Using local JSON DataStore fallback.`);
  }
})();

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
