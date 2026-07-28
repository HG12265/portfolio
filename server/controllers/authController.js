import { getDb, readJsonStore } from '../config/db.js';
import { comparePassword, generateToken } from '../utils/security.js';
import { logActivity } from '../middleware/auditMiddleware.js';

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  try {
    const { pool, isMysqlConnected } = getDb();
    let admin = null;

    if (isMysqlConnected && pool) {
      const [rows] = await pool.query('SELECT * FROM admins WHERE username = ? OR email = ?', [username, username]);
      if (rows.length > 0) admin = rows[0];
    } else {
      const admins = readJsonStore('admins');
      admin = admins.find(a => a.username === username || a.email === username);
    }

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
    }

    const isMatch = await comparePassword(password, admin.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials.' });
    }

    const token = generateToken({ id: admin.id, username: admin.username, role: admin.role });

    // Set HTTP-Only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });

    req.user = { id: admin.id, username: admin.username };
    await logActivity(req, 'LOGIN', 'Auth', `Admin ${admin.username} logged into Studio`);

    return res.status(200).json({
      success: true,
      message: 'Authentication successful. Welcome to Studio Dashboard!',
      token,
      user: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: 'Internal server error during login.' });
  }
};

export const logout = async (req, res) => {
  if (req.user) {
    await logActivity(req, 'LOGOUT', 'Auth', `Admin ${req.user.username} logged out`);
  }
  res.clearCookie('token');
  return res.status(200).json({ success: true, message: 'Logged out successfully.' });
};

export const checkMe = (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user
  });
};
