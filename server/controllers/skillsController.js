import Skill from '../models/Skill.js';
import { readJsonStore, writeJsonStore } from '../config/db.js';
import { logActivity } from '../middleware/auditMiddleware.js';

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ display_order: 1, created_at: -1 }).lean();
    if (skills && skills.length > 0) {
      return res.status(200).json({ success: true, data: skills });
    }
    const jsonSkills = readJsonStore('skills');
    return res.status(200).json({ success: true, data: jsonSkills });
  } catch (err) {
    const jsonSkills = readJsonStore('skills');
    return res.status(200).json({ success: true, data: jsonSkills });
  }
};

export const createSkill = async (req, res) => {
  try {
    const { name, category, icon_name, proficiency, color, description, display_order, enabled } = req.body;

    let newSkill = null;

    try {
      newSkill = await Skill.create({
        name,
        category,
        icon_name: icon_name || 'FaCode',
        proficiency: proficiency || 'Advanced',
        color: color || '#38BDF8',
        description: description || '',
        display_order: parseInt(display_order || '0'),
        enabled: enabled !== undefined ? (enabled === 'true' || enabled === true) : true
      });
    } catch {
      const skills = readJsonStore('skills');
      newSkill = {
        id: Date.now(),
        name,
        category,
        icon_name: icon_name || 'FaCode',
        proficiency: proficiency || 'Advanced',
        color: color || '#38BDF8',
        description: description || '',
        display_order: parseInt(display_order || '0'),
        enabled: enabled !== undefined ? (enabled === 'true' || enabled === true) : true,
        created_at: new Date().toISOString()
      };
      skills.push(newSkill);
      writeJsonStore('skills', skills);
    }

    await logActivity(req, 'CREATE', 'Skills', `Created skill: ${name}`);
    return res.status(201).json({ success: true, message: 'Skill created successfully.', data: newSkill });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, icon_name, proficiency, color, description, display_order, enabled } = req.body;

    const updateFields = {
      name,
      category,
      icon_name: icon_name || 'FaCode',
      proficiency: proficiency || 'Advanced',
      color: color || '#38BDF8',
      description: description || '',
      display_order: parseInt(display_order || '0'),
      enabled: enabled !== undefined ? (enabled === 'true' || enabled === true) : true
    };

    try {
      await Skill.findByIdAndUpdate(id, updateFields);
    } catch {
      let skills = readJsonStore('skills');
      skills = skills.map(s => s.id == id ? { ...s, ...updateFields } : s);
      writeJsonStore('skills', skills);
    }

    await logActivity(req, 'UPDATE', 'Skills', `Updated skill ID: ${id}`);
    return res.status(200).json({ success: true, message: 'Skill updated successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      await Skill.findByIdAndDelete(id);
    } catch {
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

export const toggleSkillStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { enabled } = req.body;

    try {
      await Skill.findByIdAndUpdate(id, { enabled: !!enabled });
    } catch {
      let skills = readJsonStore('skills');
      skills = skills.map(s => s.id == id ? { ...s, enabled: !!enabled } : s);
      writeJsonStore('skills', skills);
    }

    await logActivity(req, 'UPDATE', 'Skills', `Toggled skill status ID: ${id}`);
    return res.status(200).json({ success: true, message: 'Skill status updated.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
