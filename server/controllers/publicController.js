import About from '../models/About.js';
import Skill from '../models/Skill.js';
import Project from '../models/Project.js';
import Certificate from '../models/Certificate.js';
import Education from '../models/Education.js';
import Resume from '../models/Resume.js';
import Setting from '../models/Setting.js';

import { readJsonStore } from '../config/db.js';

export const getPublicPortfolio = async (req, res) => {
  try {
    let about = null;
    let skills = [];
    let projects = [];
    let certificates = [];
    let education = [];
    let resume = null;
    let settings = {};

    try {
      about = await About.findOne().lean();
      skills = await Skill.find({ enabled: true }).sort({ display_order: 1 }).lean();
      projects = await Project.find({ published: true }).sort({ display_order: 1 }).lean();
      certificates = await Certificate.find().sort({ display_order: 1 }).lean();
      education = await Education.find().sort({ display_order: 1 }).lean();
      resume = await Resume.findOne({ is_active: true }).lean();

      const settingsArr = await Setting.find().lean();
      settingsArr.forEach(s => {
        settings[s.key_name] = s.value_text;
      });
    } catch {
      // Fallback
    }

    if (!about) {
      const aboutArr = readJsonStore('about');
      about = aboutArr[0] || null;
    }
    if (skills.length === 0) skills = readJsonStore('skills').filter(s => s.enabled);
    if (projects.length === 0) projects = readJsonStore('projects').filter(p => p.published);
    if (certificates.length === 0) certificates = readJsonStore('certificates');
    if (education.length === 0) education = readJsonStore('education');
    if (!resume) {
      const resumeArr = readJsonStore('resumes');
      resume = resumeArr.find(r => r.is_active) || null;
    }
    if (Object.keys(settings).length === 0) {
      const settingsArr = readJsonStore('settings');
      settingsArr.forEach(s => { settings[s.key_name] = s.value_text; });
    }

    return res.status(200).json({
      success: true,
      data: {
        about,
        skills,
        projects,
        certificates,
        education,
        resume,
        settings
      }
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
