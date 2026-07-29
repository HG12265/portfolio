import About from '../models/About.js';
import { readJsonStore, writeJsonStore } from '../config/db.js';
import { logActivity } from '../middleware/auditMiddleware.js';

export const getAbout = async (req, res) => {
  try {
    let item = null;
    try {
      item = await About.findOne().lean();
    } catch {
      item = null;
    }

    if (!item) {
      const store = readJsonStore('about');
      item = store[0] || {};
    }

    if (!item.profile_image_url) item.profile_image_url = '/assets/gowtham-profile.png';
    if (!item.github_url) item.github_url = 'https://github.com/hg12265';
    if (!item.linkedin_url) item.linkedin_url = 'https://linkedin.com/in/gowthamg-dev';
    if (!item.twitter_url) item.twitter_url = 'https://twitter.com/gowthamg_dev';
    if (!item.instagram_url) item.instagram_url = 'https://instagram.com/gowthamg_dev';

    return res.status(200).json({ success: true, data: item });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateAbout = async (req, res) => {
  try {
    const {
      name, title, tagline, bio, career_objective,
      technical_interests, leadership_text, current_learning,
      location, email, phone,
      github_url, linkedin_url, twitter_url, instagram_url
    } = req.body;

    let profile_image_url = req.file ? `/uploads/${req.file.filename}` : (req.body.profile_image_url || '/assets/gowtham-profile.png');

    const parsedInterests = Array.isArray(technical_interests) ? technical_interests : (typeof technical_interests === 'string' ? JSON.parse(technical_interests) : []);
    const parsedLearning = Array.isArray(current_learning) ? current_learning : (typeof current_learning === 'string' ? JSON.parse(current_learning) : []);

    const updateFields = {
      name,
      title,
      tagline,
      bio,
      career_objective,
      technical_interests: parsedInterests,
      leadership_text,
      current_learning: parsedLearning,
      location,
      email,
      phone,
      profile_image_url,
      github_url: github_url || 'https://github.com/hg12265',
      linkedin_url: linkedin_url || 'https://linkedin.com/in/gowthamg-dev',
      twitter_url: twitter_url || 'https://twitter.com/gowthamg_dev',
      instagram_url: instagram_url || 'https://instagram.com/gowthamg_dev'
    };

    let updatedAbout = null;

    try {
      const existing = await About.findOne();
      if (existing) {
        updatedAbout = await About.findByIdAndUpdate(existing._id, updateFields, { new: true }).lean();
      } else {
        updatedAbout = await About.create(updateFields);
      }
    } catch {
      let store = readJsonStore('about');
      if (store.length > 0) {
        store[0] = { ...store[0], ...updateFields };
      } else {
        store.push({ id: 1, ...updateFields });
      }
      writeJsonStore('about', store);
      updatedAbout = store[0];
    }

    await logActivity(req, 'UPDATE', 'About', 'Updated Profile details & Photo');
    return res.status(200).json({ success: true, message: 'About profile details updated successfully.', data: updatedAbout });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
