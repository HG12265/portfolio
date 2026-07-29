import Resume from '../models/Resume.js';
import { readJsonStore, writeJsonStore } from '../config/db.js';
import { logActivity } from '../middleware/auditMiddleware.js';

export const getResume = async (req, res) => {
  try {
    let active = null;
    try {
      active = await Resume.findOne({ is_active: true }).lean();
    } catch {
      active = null;
    }

    if (!active) {
      const store = readJsonStore('resumes');
      active = store.find(r => r.is_active) || store[0] || { file_name: 'resume-gowtham-g.pdf', file_url: '/assets/resume-gowtham-g.pdf' };
    }

    return res.status(200).json({ success: true, data: active });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const uploadResume = async (req, res) => {
  try {
    const file_name = req.file ? req.file.originalname : (req.body.file_name || 'resume-gowtham-g.pdf');
    const file_url = req.file ? `/uploads/${req.file.filename}` : (req.body.file_url || '/assets/resume-gowtham-g.pdf');

    let newResume = null;

    try {
      await Resume.updateMany({}, { is_active: false });
      newResume = await Resume.create({
        file_name,
        file_url,
        is_active: true
      });
    } catch {
      let store = readJsonStore('resumes');
      store = store.map(r => ({ ...r, is_active: false }));
      newResume = {
        id: Date.now(),
        file_name,
        file_url,
        is_active: true,
        uploaded_at: new Date().toISOString()
      };
      store.unshift(newResume);
      writeJsonStore('resumes', store);
    }

    await logActivity(req, 'UPLOAD', 'Resume', `Uploaded new active resume: ${file_name}`);
    return res.status(201).json({ success: true, message: 'Resume uploaded and activated successfully.', data: newResume });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
