import Certificate from '../models/Certificate.js';
import { readJsonStore, writeJsonStore } from '../config/db.js';
import { logActivity } from '../middleware/auditMiddleware.js';

export const getCertificates = async (req, res) => {
  try {
    const certs = await Certificate.find().sort({ display_order: 1, created_at: -1 }).lean();
    if (certs && certs.length > 0) {
      return res.status(200).json({ success: true, data: certs });
    }
    const jsonCerts = readJsonStore('certificates');
    return res.status(200).json({ success: true, data: jsonCerts });
  } catch (err) {
    const jsonCerts = readJsonStore('certificates');
    return res.status(200).json({ success: true, data: jsonCerts });
  }
};

export const createCertificate = async (req, res) => {
  try {
    const { title, organization, duration, description, display_order } = req.body;
    let image_url = req.file ? `/uploads/${req.file.filename}` : (req.body.image_url || '/assets/mentor-mentee.png');

    let newCert = null;

    try {
      newCert = await Certificate.create({
        title,
        organization: organization || '',
        duration: duration || '',
        image_url,
        description: description || '',
        display_order: parseInt(display_order || '0')
      });
    } catch {
      const jsonCerts = readJsonStore('certificates');
      newCert = {
        id: Date.now(),
        title,
        organization: organization || '',
        duration: duration || '',
        image_url,
        description: description || '',
        display_order: parseInt(display_order || '0'),
        created_at: new Date().toISOString()
      };
      jsonCerts.push(newCert);
      writeJsonStore('certificates', jsonCerts);
    }

    await logActivity(req, 'CREATE', 'Certificates', `Added certificate: ${title}`);
    return res.status(201).json({ success: true, message: 'Certificate created successfully.', data: newCert });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, organization, duration, description, display_order } = req.body;
    let image_url = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;

    const updateFields = {
      title,
      organization: organization || '',
      duration: duration || '',
      description: description || '',
      display_order: parseInt(display_order || '0')
    };
    if (image_url) updateFields.image_url = image_url;

    try {
      await Certificate.findByIdAndUpdate(id, updateFields);
    } catch {
      let jsonCerts = readJsonStore('certificates');
      jsonCerts = jsonCerts.map(c => c.id == id ? { ...c, ...updateFields } : c);
      writeJsonStore('certificates', jsonCerts);
    }

    await logActivity(req, 'UPDATE', 'Certificates', `Updated certificate ID: ${id}`);
    return res.status(200).json({ success: true, message: 'Certificate updated successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    try {
      await Certificate.findByIdAndDelete(id);
    } catch {
      let jsonCerts = readJsonStore('certificates');
      jsonCerts = jsonCerts.filter(c => c.id != id);
      writeJsonStore('certificates', jsonCerts);
    }

    await logActivity(req, 'DELETE', 'Certificates', `Deleted certificate ID: ${id}`);
    return res.status(200).json({ success: true, message: 'Certificate deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
