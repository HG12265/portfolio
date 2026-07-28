import { getDb, readJsonStore, writeJsonStore } from '../config/db.js';
import { logActivity } from '../middleware/auditMiddleware.js';

export const getEducation = async (req, res) => {
  try {
    const { pool, isMysqlConnected } = getDb();
    if (isMysqlConnected && pool) {
      const [rows] = await pool.query('SELECT * FROM education ORDER BY display_order ASC, id ASC');
      const formatted = rows.map(e => ({
        ...e,
        courses: typeof e.courses === 'string' ? JSON.parse(e.courses) : e.courses
      }));
      return res.status(200).json({ success: true, data: formatted });
    }
    const edu = readJsonStore('education');
    return res.status(200).json({ success: true, data: edu });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createEducation = async (req, res) => {
  try {
    const { degree, institution, period, status, grade, description, courses, display_order } = req.body;
    const parsedCourses = Array.isArray(courses) ? courses : (typeof courses === 'string' ? JSON.parse(courses) : []);

    const { pool, isMysqlConnected } = getDb();

    if (isMysqlConnected && pool) {
      const [result] = await pool.query(
        'INSERT INTO education (degree, institution, period, status, grade, description, courses, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [degree, institution, period, status, grade, description, JSON.stringify(parsedCourses), display_order || 0]
      );
      await logActivity(req, 'CREATE', 'Education', `Added education record: ${degree}`);
      return res.status(201).json({ success: true, message: 'Education record created successfully.', id: result.insertId });
    } else {
      const edu = readJsonStore('education');
      const newEdu = {
        id: Date.now(),
        degree, institution, period, status, grade, description,
        courses: parsedCourses,
        display_order: display_order || edu.length + 1,
        created_at: new Date().toISOString()
      };
      edu.push(newEdu);
      writeJsonStore('education', edu);
      await logActivity(req, 'CREATE', 'Education', `Added education record: ${degree}`);
      return res.status(201).json({ success: true, message: 'Education record created successfully.', data: newEdu });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const { degree, institution, period, status, grade, description, courses, display_order } = req.body;
    const parsedCourses = Array.isArray(courses) ? courses : (typeof courses === 'string' ? JSON.parse(courses) : []);

    const { pool, isMysqlConnected } = getDb();

    if (isMysqlConnected && pool) {
      await pool.query(
        'UPDATE education SET degree=?, institution=?, period=?, status=?, grade=?, description=?, courses=?, display_order=? WHERE id=?',
        [degree, institution, period, status, grade, description, JSON.stringify(parsedCourses), display_order, id]
      );
    } else {
      let edu = readJsonStore('education');
      edu = edu.map(e => e.id == id ? { ...e, degree, institution, period, status, grade, description, courses: parsedCourses, display_order } : e);
      writeJsonStore('education', edu);
    }

    await logActivity(req, 'UPDATE', 'Education', `Updated education record ID: ${id} (${degree})`);
    return res.status(200).json({ success: true, message: 'Education record updated successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const { pool, isMysqlConnected } = getDb();

    if (isMysqlConnected && pool) {
      await pool.query('DELETE FROM education WHERE id = ?', [id]);
    } else {
      let edu = readJsonStore('education');
      edu = edu.filter(e => e.id != id);
      writeJsonStore('education', edu);
    }

    await logActivity(req, 'DELETE', 'Education', `Deleted education record ID: ${id}`);
    return res.status(200).json({ success: true, message: 'Education record deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
