import { getDb, readJsonStore, writeJsonStore } from '../config/db.js';
import { logActivity } from '../middleware/auditMiddleware.js';

export const getProjects = async (req, res) => {
  try {
    const { pool, isMysqlConnected } = getDb();
    if (isMysqlConnected && pool) {
      const [rows] = await pool.query('SELECT * FROM projects ORDER BY display_order ASC, id DESC');
      const formatted = rows.map(p => ({
        ...p,
        tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags,
        features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features,
      }));
      return res.status(200).json({ success: true, data: formatted });
    }
    const projects = readJsonStore('projects');
    return res.status(200).json({ success: true, data: projects });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const {
      title, subtitle, category, description, long_description,
      tags, features, architecture, role, duration, github_url,
      demo_url, featured, published, display_order
    } = req.body;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    let image_url = req.file ? `/uploads/${req.file.filename}` : (req.body.image_url || '/assets/mentor-mentee.png');

    const parsedTags = Array.isArray(tags) ? tags : (typeof tags === 'string' ? JSON.parse(tags) : []);
    const parsedFeatures = Array.isArray(features) ? features : (typeof features === 'string' ? JSON.parse(features) : []);

    const { pool, isMysqlConnected } = getDb();

    if (isMysqlConnected && pool) {
      const [result] = await pool.query(
        `INSERT INTO projects 
          (slug, title, subtitle, category, image_url, description, long_description, tags, features, architecture, role, duration, github_url, demo_url, featured, published, display_order)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          slug, title, subtitle, category, image_url, description, long_description,
          JSON.stringify(parsedTags), JSON.stringify(parsedFeatures), architecture, role, duration,
          github_url, demo_url, featured ? 1 : 0, published !== undefined ? (published ? 1 : 0) : 1, display_order || 0
        ]
      );
      await logActivity(req, 'CREATE', 'Projects', `Created project: ${title}`);
      return res.status(201).json({ success: true, message: 'Project created successfully.', id: result.insertId });
    } else {
      const projects = readJsonStore('projects');
      const newProj = {
        id: Date.now(),
        slug,
        title,
        subtitle,
        category: category || 'Full Stack',
        image_url,
        description,
        long_description,
        tags: parsedTags,
        features: parsedFeatures,
        architecture,
        role: role || 'Full Stack Developer',
        duration,
        github_url,
        demo_url,
        featured: !!featured,
        published: published !== undefined ? !!published : true,
        display_order: display_order || projects.length + 1,
        created_at: new Date().toISOString()
      };
      projects.push(newProj);
      writeJsonStore('projects', projects);
      await logActivity(req, 'CREATE', 'Projects', `Created project: ${title}`);
      return res.status(201).json({ success: true, message: 'Project created successfully.', data: newProj });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title, subtitle, category, description, long_description,
      tags, features, architecture, role, duration, github_url,
      demo_url, featured, published, display_order
    } = req.body;

    let image_url = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;

    const parsedTags = Array.isArray(tags) ? tags : (typeof tags === 'string' ? JSON.parse(tags) : []);
    const parsedFeatures = Array.isArray(features) ? features : (typeof features === 'string' ? JSON.parse(features) : []);

    const { pool, isMysqlConnected } = getDb();

    if (isMysqlConnected && pool) {
      let query = `UPDATE projects SET title=?, subtitle=?, category=?, description=?, long_description=?, tags=?, features=?, architecture=?, role=?, duration=?, github_url=?, demo_url=?, featured=?, published=?, display_order=?`;
      let params = [title, subtitle, category, description, long_description, JSON.stringify(parsedTags), JSON.stringify(parsedFeatures), architecture, role, duration, github_url, demo_url, featured ? 1 : 0, published ? 1 : 0, display_order];

      if (image_url) {
        query += `, image_url=?`;
        params.push(image_url);
      }
      query += ` WHERE id=?`;
      params.push(id);

      await pool.query(query, params);
    } else {
      let projects = readJsonStore('projects');
      projects = projects.map(p => {
        if (p.id == id) {
          return {
            ...p,
            title, subtitle, category, description, long_description,
            tags: parsedTags, features: parsedFeatures, architecture, role, duration,
            github_url, demo_url, featured: !!featured, published: !!published, display_order,
            image_url: image_url || p.image_url,
            updated_at: new Date().toISOString()
          };
        }
        return p;
      });
      writeJsonStore('projects', projects);
    }

    await logActivity(req, 'UPDATE', 'Projects', `Updated project ID: ${id} (${title})`);
    return res.status(200).json({ success: true, message: 'Project updated successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { pool, isMysqlConnected } = getDb();

    if (isMysqlConnected && pool) {
      await pool.query('DELETE FROM projects WHERE id = ?', [id]);
    } else {
      let projects = readJsonStore('projects');
      projects = projects.filter(p => p.id != id);
      writeJsonStore('projects', projects);
    }

    await logActivity(req, 'DELETE', 'Projects', `Deleted project ID: ${id}`);
    return res.status(200).json({ success: true, message: 'Project deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
