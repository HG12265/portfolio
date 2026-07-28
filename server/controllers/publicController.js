import { getDb, readJsonStore } from '../config/db.js';

export const getPublicPortfolio = async (req, res) => {
  try {
    const { pool, isMysqlConnected } = getDb();

    if (isMysqlConnected && pool) {
      const [aboutRows] = await pool.query('SELECT * FROM about WHERE id = 1');
      const [skillsRows] = await pool.query('SELECT * FROM skills WHERE enabled = 1 ORDER BY display_order ASC, id ASC');
      const [projectsRows] = await pool.query('SELECT * FROM projects WHERE published = 1 ORDER BY display_order ASC, id DESC');
      const [certsRows] = await pool.query('SELECT * FROM certificates ORDER BY display_order ASC, id DESC');
      const [eduRows] = await pool.query('SELECT * FROM education ORDER BY display_order ASC, id ASC');
      const [resumeRows] = await pool.query('SELECT * FROM resumes WHERE is_active = 1 LIMIT 1');
      const [settingsRows] = await pool.query('SELECT * FROM settings');

      const settingsMap = {};
      settingsRows.forEach(s => { settingsMap[s.key_name] = s.value_text; });

      const about = aboutRows[0] || {};
      if (about.technical_interests) about.technical_interests = typeof about.technical_interests === 'string' ? JSON.parse(about.technical_interests) : about.technical_interests;
      if (about.current_learning) about.current_learning = typeof about.current_learning === 'string' ? JSON.parse(about.current_learning) : about.current_learning;

      const projects = projectsRows.map(p => ({
        ...p,
        tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags,
        features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features,
      }));

      const education = eduRows.map(e => ({
        ...e,
        courses: typeof e.courses === 'string' ? JSON.parse(e.courses) : e.courses
      }));

      return res.status(200).json({
        success: true,
        data: {
          about,
          skills: skillsRows,
          projects,
          certificates: certsRows,
          education,
          resume: resumeRows[0] || { file_url: '/assets/resume-gowtham-g.pdf' },
          settings: settingsMap
        }
      });
    } else {
      const about = readJsonStore('about')[0] || {};
      const skills = readJsonStore('skills').filter(s => s.enabled !== false);
      const projects = readJsonStore('projects').filter(p => p.published !== false);
      const certs = readJsonStore('certificates');
      const edu = readJsonStore('education');
      const resumes = readJsonStore('resumes');
      const activeResume = resumes.find(r => r.is_active) || { file_url: '/assets/resume-gowtham-g.pdf' };
      const settingsStore = readJsonStore('settings');
      const settingsMap = {};
      settingsStore.forEach(s => { settingsMap[s.key_name] = s.value_text; });

      return res.status(200).json({
        success: true,
        data: {
          about,
          skills,
          projects,
          certificates: certs,
          education: edu,
          resume: activeResume,
          settings: settingsMap
        }
      });
    }
  } catch (err) {
    console.error('Public portfolio payload error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch public portfolio data.' });
  }
};
