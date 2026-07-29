import Admin from '../models/Admin.js';
import { readJsonStore } from '../config/db.js';
import { comparePassword, generateToken } from '../utils/security.js';
import { logActivity } from '../middleware/auditMiddleware.js';

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required.' });
  }

  try {
    let admin = null;

    try {
      admin = await Admin.findOne({
        $or: [{ username }, { email: username }]
      }).lean();
    } catch {
      admin = null;
    }

    if (!admin) {
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

    const token = generateToken({ id: admin._id || admin.id, username: admin.username, role: admin.role });

    // Set cross-site compatible cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000
    });

    req.user = { id: admin._id || admin.id, username: admin.username };
    await logActivity(req, 'LOGIN', 'Auth', `Admin ${admin.username} logged into Studio`);

    return res.status(200).json({
      success: true,
      message: 'Authentication successful. Welcome to Studio Dashboard!',
      token,
      user: {
        id: admin._id || admin.id,
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

export const getMe = async (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user
  });
};

export const checkMe = getMe;

export const logout = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  });
  return res.status(200).json({ success: true, message: 'Logged out successfully.' });
};
