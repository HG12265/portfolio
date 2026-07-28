import { verifyToken } from '../utils/security.js';

export const requireAdmin = (req, res, next) => {
  let token = null;

  // 1. Check HTTP-Only cookie
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } 
  // 2. Check Authorization header
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Access token missing. Please log in to access the Studio dashboard.'
    });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Token expired or invalid.'
    });
  }

  req.user = decoded;
  next();
};
