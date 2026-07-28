import { getDb, readJsonStore } from '../config/db.js';

export const getDashboardSummary = async (req, res) => {
  try {
    const { pool, isMysqlConnected } = getDb();
    let stats = {
      totalProjects: 0,
      totalSkills: 0,
      totalCertificates: 0,
      totalEducation: 0,
      totalMessages: 0,
      unreadMessages: 0,
      recentActivity: []
    };

    if (isMysqlConnected && pool) {
      const [[{ count: pCount }]] = await pool.query('SELECT COUNT(*) as count FROM projects');
      const [[{ count: sCount }]] = await pool.query('SELECT COUNT(*) as count FROM skills');
      const [[{ count: cCount }]] = await pool.query('SELECT COUNT(*) as count FROM certificates');
      const [[{ count: eCount }]] = await pool.query('SELECT COUNT(*) as count FROM education');
      const [[{ count: mCount }]] = await pool.query('SELECT COUNT(*) as count FROM contact_messages');
      const [[{ count: uCount }]] = await pool.query('SELECT COUNT(*) as count FROM contact_messages WHERE is_read = 0');
      const [logs] = await pool.query('SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT 10');

      stats = {
        totalProjects: pCount,
        totalSkills: sCount,
        totalCertificates: cCount,
        totalEducation: eCount,
        totalMessages: mCount,
        unreadMessages: uCount,
        recentActivity: logs
      };
    } else {
      const projects = readJsonStore('projects');
      const skills = readJsonStore('skills');
      const certs = readJsonStore('certificates');
      const education = readJsonStore('education');
      const messages = readJsonStore('contact_messages');
      const logs = readJsonStore('activity_logs');

      stats = {
        totalProjects: projects.length,
        totalSkills: skills.length,
        totalCertificates: certs.length,
        totalEducation: education.length,
        totalMessages: messages.length,
        unreadMessages: messages.filter(m => !m.is_read).length,
        recentActivity: logs.slice(0, 10)
      };
    }

    return res.status(200).json({ success: true, data: stats });
  } catch (err) {
    console.error('Dashboard Summary Error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch dashboard summary metrics.' });
  }
};
