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
        if (!item.profile_image_url) item.profile_image_url = '/assets/gowtham-profile.png';
        if (!item.github_url) item.github_url = 'https://github.com/gowthamg-dev';
        if (!item.linkedin_url) item.linkedin_url = 'https://linkedin.com/in/gowthamg-dev';
        if (!item.twitter_url) item.twitter_url = 'https://twitter.com/gowthamg_dev';
        if (!item.instagram_url) item.instagram_url = 'https://instagram.com/gowthamg_dev';
        return res.status(200).json({ success: true, data: item });
      }
    }
    const store = readJsonStore('about');
    const data = store[0] || {};
    if (!data.profile_image_url) data.profile_image_url = '/assets/gowtham-profile.png';
    if (!data.github_url) data.github_url = 'https://github.com/gowthamg-dev';
    if (!data.linkedin_url) data.linkedin_url = 'https://linkedin.com/in/gowthamg-dev';
    if (!data.twitter_url) data.twitter_url = 'https://twitter.com/gowthamg_dev';
    if (!data.instagram_url) data.instagram_url = 'https://instagram.com/gowthamg_dev';
    return res.status(200).json({ success: true, data });
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

    const { pool, isMysqlConnected } = getDb();

    if (isMysqlConnected && pool) {
      await pool.query(
        `UPDATE about SET 
          name=?, title=?, tagline=?, bio=?, career_objective=?,
          technical_interests=?, leadership_text=?, current_learning=?,
          location=?, email=?, phone=?, profile_image_url=?,
          github_url=?, linkedin_url=?, twitter_url=?, instagram_url=?
         WHERE id = 1`,
        [
          name, title, tagline, bio, career_objective,
          JSON.stringify(parsedInterests), leadership_text,
          JSON.stringify(parsedLearning), location, email, phone,
          profile_image_url,
          github_url || 'https://github.com/gowthamg-dev',
          linkedin_url || 'https://linkedin.com/in/gowthamg-dev',
          twitter_url || 'https://twitter.com/gowthamg_dev',
          instagram_url || 'https://instagram.com/gowthamg_dev'
        ]
      );
    } else {
      const updated = [{
        id: 1, name, title, tagline, bio, career_objective,
        technical_interests: parsedInterests, leadership_text,
        current_learning: parsedLearning, location, email, phone,
        profile_image_url,
        github_url: github_url || 'https://github.com/gowthamg-dev',
        linkedin_url: linkedin_url || 'https://linkedin.com/in/gowthamg-dev',
        twitter_url: twitter_url || 'https://twitter.com/gowthamg_dev',
        instagram_url: instagram_url || 'https://instagram.com/gowthamg_dev',
        updated_at: new Date().toISOString()
      }];
      writeJsonStore('about', updated);
    }

    await logActivity(req, 'UPDATE', 'About', 'Updated profile information and social media links');
    return res.status(200).json({ success: true, message: 'About profile and social links updated successfully.', profile_image_url });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
