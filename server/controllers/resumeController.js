import { getDb, readJsonStore, writeJsonStore } from '../config/db.js';
import { logActivity } from '../middleware/auditMiddleware.js';

export const getResume = async (req, res) => {
  try {
    const { pool, isMysqlConnected } = getDb();
    if (isMysqlConnected && pool) {
      const [rows] = await pool.query('SELECT * FROM resumes WHERE is_active = 1 LIMIT 1');
      if (rows.length > 0) return res.status(200).json({ success: true, data: rows[0] });
    }
    const store = readJsonStore('resumes');
    const active = store.find(r => r.is_active) || store[0] || { file_name: 'resume-gowtham-g.pdf', file_url: '/assets/resume-gowtham-g.pdf' };
    return res.status(200).json({ success: true, data: active });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please select a valid PDF file to upload.' });
    }

    const file_name = req.file.originalname;
    const file_url = `/uploads/${req.file.filename}`;
    const { pool, isMysqlConnected } = getDb();

    if (isMysqlConnected && pool) {
      await pool.query('UPDATE resumes SET is_active = 0');
      const [result] = await pool.query(
        'INSERT INTO resumes (file_name, file_url, is_active) VALUES (?, ?, 1)',
        [file_name, file_url]
      );
      await logActivity(req, 'UPLOAD', 'Resume', `Uploaded new active resume: ${file_name}`);
      return res.status(201).json({ success: true, message: 'Resume uploaded and activated successfully.', id: result.insertId, file_url });
    } else {
      let store = readJsonStore('resumes');
      store = store.map(r => ({ ...r, is_active: false }));
      const newResume = {
        id: Date.now(),
        file_name,
        file_url,
        is_active: true,
        uploaded_at: new Date().toISOString()
      };
      store.unshift(newResume);
      writeJsonStore('resumes', store);
      await logActivity(req, 'UPLOAD', 'Resume', `Uploaded new active resume: ${file_name}`);
      return res.status(201).json({ success: true, message: 'Resume uploaded and activated successfully.', data: newResume });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
