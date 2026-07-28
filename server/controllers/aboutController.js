import { getDb, readJsonStore, writeJsonStore } from '../config/db.js';
import { logActivity } from '../middleware/auditMiddleware.js';

export const getAbout = async (req, res) => {
  try {
    const { pool, isMysqlConnected } = getDb();
    if (isMysqlConnected && pool) {
      const [rows] = await pool.query('SELECT * FROM about WHERE id = 1');
      if (rows.length > 0) {
        const item = rows[0];
        item.technical_interests = typeof item.technical_interests === 'string' ? JSON.parse(item.technical_interests) : item.technical_interests;
        item.current_learning = typeof item.current_learning === 'string' ? JSON.parse(item.current_learning) : item.current_learning;
        return res.status(200).json({ success: true, data: item });
      }
    }
    const store = readJsonStore('about');
    return res.status(200).json({ success: true, data: store[0] || {} });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateAbout = async (req, res) => {
  try {
    const {
      name, title, tagline, bio, career_objective,
      technical_interests, leadership_text, current_learning,
      location, email, phone
    } = req.body;

    const { pool, isMysqlConnected } = getDb();

    if (isMysqlConnected && pool) {
      await pool.query(
        `UPDATE about SET 
          name=?, title=?, tagline=?, bio=?, career_objective=?,
          technical_interests=?, leadership_text=?, current_learning=?,
          location=?, email=?, phone=?
         WHERE id = 1`,
        [
          name, title, tagline, bio, career_objective,
          JSON.stringify(technical_interests || []), leadership_text,
          JSON.stringify(current_learning || []), location, email, phone
        ]
      );
    } else {
      const updated = [{
        id: 1, name, title, tagline, bio, career_objective,
        technical_interests, leadership_text, current_learning,
        location, email, phone, updated_at: new Date().toISOString()
      }];
      writeJsonStore('about', updated);
    }

    await logActivity(req, 'UPDATE', 'About', 'Updated biography and professional profile information');
    return res.status(200).json({ success: true, message: 'About profile updated successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
