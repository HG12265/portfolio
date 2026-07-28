import { getDb, readJsonStore, writeJsonStore } from '../config/db.js';
import { logActivity } from '../middleware/auditMiddleware.js';

export const getSkills = async (req, res) => {
  try {
    const { pool, isMysqlConnected } = getDb();
    if (isMysqlConnected && pool) {
      const [rows] = await pool.query('SELECT * FROM skills ORDER BY display_order ASC, id ASC');
      return res.status(200).json({ success: true, data: rows });
    }
    const skills = readJsonStore('skills');
    skills.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
    return res.status(200).json({ success: true, data: skills });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createSkill = async (req, res) => {
  try {
    const { name, category, icon_name, proficiency, color, description, display_order, enabled } = req.body;
    const { pool, isMysqlConnected } = getDb();

    if (isMysqlConnected && pool) {
      const [result] = await pool.query(
        'INSERT INTO skills (name, category, icon_name, proficiency, color, description, display_order, enabled) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [name, category, icon_name || 'FaCode', proficiency || 'Advanced', color || '#38BDF8', description || '', display_order || 0, enabled ? 1 : 0]
      );
      await logActivity(req, 'CREATE', 'Skills', `Created new skill: ${name}`);
      return res.status(201).json({ success: true, message: 'Skill created successfully.', id: result.insertId });
    } else {
      const skills = readJsonStore('skills');
      const newSkill = {
        id: Date.now(),
        name,
        category,
        icon_name: icon_name || 'FaCode',
        proficiency: proficiency || 'Advanced',
        color: color || '#38BDF8',
        description: description || '',
        display_order: display_order || skills.length + 1,
        enabled: enabled !== undefined ? enabled : true,
        created_at: new Date().toISOString()
      };
      skills.push(newSkill);
      writeJsonStore('skills', skills);
      await logActivity(req, 'CREATE', 'Skills', `Created new skill: ${name}`);
      return res.status(201).json({ success: true, message: 'Skill created successfully.', data: newSkill });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, icon_name, proficiency, color, description, display_order, enabled } = req.body;
    const { pool, isMysqlConnected } = getDb();

    if (isMysqlConnected && pool) {
      await pool.query(
        'UPDATE skills SET name=?, category=?, icon_name=?, proficiency=?, color=?, description=?, display_order=?, enabled=? WHERE id=?',
        [name, category, icon_name, proficiency, color, description, display_order, enabled ? 1 : 0, id]
      );
    } else {
      let skills = readJsonStore('skills');
      skills = skills.map(s => s.id == id ? { ...s, name, category, icon_name, proficiency, color, description, display_order, enabled } : s);
      writeJsonStore('skills', skills);
    }

    await logActivity(req, 'UPDATE', 'Skills', `Updated skill ID: ${id} (${name})`);
    return res.status(200).json({ success: true, message: 'Skill updated successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { pool, isMysqlConnected } = getDb();

    if (isMysqlConnected && pool) {
      await pool.query('DELETE FROM skills WHERE id = ?', [id]);
    } else {
      let skills = readJsonStore('skills');
      skills = skills.filter(s => s.id != id);
      writeJsonStore('skills', skills);
    }

    await logActivity(req, 'DELETE', 'Skills', `Deleted skill ID: ${id}`);
    return res.status(200).json({ success: true, message: 'Skill deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const reorderSkills = async (req, res) => {
  try {
    const { items } = req.body; // Array of { id, display_order }
    const { pool, isMysqlConnected } = getDb();

    if (isMysqlConnected && pool) {
      for (const item of items) {
        await pool.query('UPDATE skills SET display_order = ? WHERE id = ?', [item.display_order, item.id]);
      }
    } else {
      let skills = readJsonStore('skills');
      items.forEach(item => {
        const found = skills.find(s => s.id == item.id);
        if (found) found.display_order = item.display_order;
      });
      skills.sort((a, b) => a.display_order - b.display_order);
      writeJsonStore('skills', skills);
    }

    await logActivity(req, 'REORDER', 'Skills', 'Updated skills display order');
    return res.status(200).json({ success: true, message: 'Skills reordered successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
