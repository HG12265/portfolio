import Education from '../models/Education.js';
import { readJsonStore, writeJsonStore } from '../config/db.js';
import { logActivity } from '../middleware/auditMiddleware.js';

export const getEducation = async (req, res) => {
  try {
    const edu = await Education.find().sort({ display_order: 1, created_at: -1 }).lean();
    if (edu && edu.length > 0) {
      return res.status(200).json({ success: true, data: edu });
    }
    const jsonEdu = readJsonStore('education');
    return res.status(200).json({ success: true, data: jsonEdu });
  } catch (err) {
    const jsonEdu = readJsonStore('education');
    return res.status(200).json({ success: true, data: jsonEdu });
  }
};

export const createEducation = async (req, res) => {
  try {
    const { degree, institution, period, status, grade, description, courses, display_order } = req.body;
    const parsedCourses = Array.isArray(courses) ? courses : (typeof courses === 'string' ? JSON.parse(courses) : []);

    let newEdu = null;

    try {
      newEdu = await Education.create({
        degree,
        institution,
        period,
        status: status || 'Graduated',
        grade,
        description,
        courses: parsedCourses,
        display_order: parseInt(display_order || '0')
      });
    } catch {
      const edu = readJsonStore('education');
      newEdu = {
        id: Date.now(),
        degree, institution, period, status, grade, description,
        courses: parsedCourses,
        display_order: parseInt(display_order || '0'),
        created_at: new Date().toISOString()
      };
      edu.push(newEdu);
      writeJsonStore('education', edu);
    }

    await logActivity(req, 'CREATE', 'Education', `Added education record: ${degree}`);
    return res.status(201).json({ success: true, message: 'Education record created successfully.', data: newEdu });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateEducation = async (req, res) => {
  try {
    const { id } = req.params;
    const { degree, institution, period, status, grade, description, courses, display_order } = req.body;
    const parsedCourses = Array.isArray(courses) ? courses : (typeof courses === 'string' ? JSON.parse(courses) : []);

    const updateFields = {
      degree,
      institution,
      period,
      status,
      grade,
      description,
      courses: parsedCourses,
      display_order: parseInt(display_order || '0')
    };

    try {
      await Education.findByIdAndUpdate(id, updateFields);
    } catch {
      let edu = readJsonStore('education');
      edu = edu.map(e => e.id == id ? { ...e, ...updateFields } : e);
      writeJsonStore('education', edu);
    }

    await logActivity(req, 'UPDATE', 'Education', `Updated education record ID: ${id}`);
    return res.status(200).json({ success: true, message: 'Education record updated successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;

    try {
      await Education.findByIdAndDelete(id);
    } catch {
      let edu = readJsonStore('education');
      edu = edu.filter(e => e.id != id);
      writeJsonStore('education', edu);
    }

    await logActivity(req, 'DELETE', 'Education', `Deleted education record ID: ${id}`);
    return res.status(200).json({ success: true, message: 'Education record deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
