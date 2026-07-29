import Project from '../models/Project.js';
import { readJsonStore, writeJsonStore } from '../config/db.js';
import { logActivity } from '../middleware/auditMiddleware.js';

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ display_order: 1, created_at: -1 }).lean();
    if (projects && projects.length > 0) {
      return res.status(200).json({ success: true, data: projects });
    }
    const jsonProjects = readJsonStore('projects');
    return res.status(200).json({ success: true, data: jsonProjects });
  } catch (err) {
    const jsonProjects = readJsonStore('projects');
    return res.status(200).json({ success: true, data: jsonProjects });
  }
};

export const createProject = async (req, res) => {
  try {
    const {
      title, subtitle, category, description, long_description,
      tags, features, architecture, role, duration, github_url, demo_url,
      featured, published, display_order
    } = req.body;

    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now();
    let image_url = req.file ? `/uploads/${req.file.filename}` : (req.body.image_url || '/assets/mentor-mentee.png');

    const parsedTags = typeof tags === 'string' ? JSON.parse(tags || '[]') : (tags || []);
    const parsedFeatures = typeof features === 'string' ? JSON.parse(features || '[]') : (features || []);

    let newProj = null;

    try {
      newProj = await Project.create({
        slug,
        title,
        subtitle,
        category,
        image_url,
        description,
        long_description,
        tags: parsedTags,
        features: parsedFeatures,
        architecture,
        role,
        duration,
        github_url,
        demo_url,
        featured: featured === 'true' || featured === true,
        published: published === 'true' || published === true,
        display_order: parseInt(display_order || '0')
      });
    } catch {
      const jsonProjects = readJsonStore('projects');
      newProj = {
        id: Date.now(),
        slug, title, subtitle, category, image_url, description, long_description,
        tags: parsedTags, features: parsedFeatures, architecture, role, duration, github_url, demo_url,
        featured: featured === 'true' || featured === true,
        published: published === 'true' || published === true,
        display_order: parseInt(display_order || '0'),
        created_at: new Date().toISOString()
      };
      jsonProjects.push(newProj);
      writeJsonStore('projects', jsonProjects);
    }

    await logActivity(req, 'CREATE', 'Projects', `Created project: ${title}`);
    return res.status(201).json({ success: true, message: 'Project created successfully.', data: newProj });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    let image_url = req.file ? `/uploads/${req.file.filename}` : body.image_url;
    const parsedTags = typeof body.tags === 'string' ? JSON.parse(body.tags || '[]') : body.tags;
    const parsedFeatures = typeof body.features === 'string' ? JSON.parse(body.features || '[]') : body.features;

    const updateFields = {
      title: body.title,
      subtitle: body.subtitle,
      category: body.category,
      description: body.description,
      long_description: body.long_description,
      architecture: body.architecture,
      role: body.role,
      duration: body.duration,
      github_url: body.github_url,
      demo_url: body.demo_url,
      featured: body.featured === 'true' || body.featured === true,
      published: body.published === 'true' || body.published === true,
      display_order: parseInt(body.display_order || '0')
    };

    if (image_url) updateFields.image_url = image_url;
    if (parsedTags) updateFields.tags = parsedTags;
    if (parsedFeatures) updateFields.features = parsedFeatures;

    try {
      await Project.findByIdAndUpdate(id, updateFields);
    } catch {
      let jsonProjects = readJsonStore('projects');
      jsonProjects = jsonProjects.map(p => p.id == id ? { ...p, ...updateFields } : p);
      writeJsonStore('projects', jsonProjects);
    }

    await logActivity(req, 'UPDATE', 'Projects', `Updated project ID: ${id}`);
    return res.status(200).json({ success: true, message: 'Project updated successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    try {
      await Project.findByIdAndDelete(id);
    } catch {
      let jsonProjects = readJsonStore('projects');
      jsonProjects = jsonProjects.filter(p => p.id != id);
      writeJsonStore('projects', jsonProjects);
    }

    await logActivity(req, 'DELETE', 'Projects', `Deleted project ID: ${id}`);
    return res.status(200).json({ success: true, message: 'Project deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
