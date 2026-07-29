import Setting from '../models/Setting.js';
import { readJsonStore, writeJsonStore } from '../config/db.js';
import { logActivity } from '../middleware/auditMiddleware.js';

export const getSettings = async (req, res) => {
  try {
    let settingsMap = {};

    try {
      const store = await Setting.find().lean();
      store.forEach(s => {
        settingsMap[s.key_name] = s.value_text;
      });
    } catch {
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

    try {
      for (const [key, val] of Object.entries(settingsObj)) {
        await Setting.findOneAndUpdate(
          { key_name: key },
          { key_name: key, value_text: String(val) },
          { upsert: true, new: true }
        );
      }
    } catch {
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

    await logActivity(req, 'UPDATE', 'Settings', 'Updated global site settings');
    return res.status(200).json({ success: true, message: 'Settings updated successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
