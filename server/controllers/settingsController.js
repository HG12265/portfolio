import { getDb, readJsonStore, writeJsonStore } from '../config/db.js';
import { logActivity } from '../middleware/auditMiddleware.js';

export const getSettings = async (req, res) => {
  try {
    const { pool, isMysqlConnected } = getDb();
    let settingsMap = {};

    if (isMysqlConnected && pool) {
      const [rows] = await pool.query('SELECT * FROM settings');
      rows.forEach(r => {
        settingsMap[r.key_name] = r.value_text;
      });
    } else {
      const store = readJsonStore('settings');
      store.forEach(s => {
        settingsMap[s.key_name] = s.value_text;
      });
    }

    const defaultSettings = {
      site_title: 'GOWTHAM G | Full Stack Developer | MCA Student',
      logo_text: 'GOWTHAM G',
      seo_description: 'Personal Portfolio of Gowtham G - MCA Student, Full Stack Developer, React Developer, Backend Developer, and Web Application Specialist based in Salem, Tamil Nadu, India.',
      seo_keywords: 'Gowtham G, Full Stack Developer, React Developer, MCA Student, Backend Developer, Web Developer Portfolio, ReactJS, Node.js, Tailwind CSS, Salem',
      footer_text: 'Designed & Developed with React, Tailwind CSS & Vite',
      analytics_id: ''
    };

    return res.status(200).json({ success: true, data: { ...defaultSettings, ...settingsMap } });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const settingsObj = req.body; // Key-value object
    const { pool, isMysqlConnected } = getDb();

    if (isMysqlConnected && pool) {
      for (const [key, val] of Object.entries(settingsObj)) {
        await pool.query(
          'INSERT INTO settings (key_name, value_text) VALUES (?, ?) ON DUPLICATE KEY UPDATE value_text = ?',
          [key, String(val), String(val)]
        );
      }
    } else {
      let store = readJsonStore('settings');
      for (const [key, val] of Object.entries(settingsObj)) {
        const found = store.find(s => s.key_name === key);
        if (found) {
          found.value_text = String(val);
        } else {
          store.push({ id: Date.now(), key_name: key, value_text: String(val) });
        }
      }
      writeJsonStore('settings', store);
    }

    await logActivity(req, 'UPDATE', 'Settings', 'Updated SEO metadata and website configuration settings');
    return res.status(200).json({ success: true, message: 'Settings updated successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
