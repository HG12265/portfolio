import { getDb, readJsonStore, writeJsonStore } from '../config/db.js';

export const logActivity = async (req, action, module, details) => {
  const { pool, isMysqlConnected } = getDb();
  const adminId = req.user ? req.user.id : null;
  const adminName = req.user ? req.user.username : 'System';
  const ipAddress = req.ip || req.connection.remoteAddress || '127.0.0.1';

  try {
    if (isMysqlConnected && pool) {
      await pool.query(
        'INSERT INTO activity_logs (admin_id, admin_name, action, module, details, ip_address) VALUES (?, ?, ?, ?, ?, ?)',
        [adminId, adminName, action, module, details, ipAddress]
      );
    } else {
      const logs = readJsonStore('activity_logs');
      const newLog = {
        id: Date.now(),
        admin_id: adminId,
        admin_name: adminName,
        action,
        module,
        details,
        ip_address: ipAddress,
        created_at: new Date().toISOString()
      };
      logs.unshift(newLog);
      writeJsonStore('activity_logs', logs.slice(0, 100)); // keep last 100
    }
  } catch (err) {
    console.error('Failed to log audit activity:', err.message);
  }
};
