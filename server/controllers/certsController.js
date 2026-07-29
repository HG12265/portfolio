import { getDb, readJsonStore, writeJsonStore } from '../config/db.js';
import { logActivity } from '../middleware/auditMiddleware.js';

export const getCertificates = async (req, res) => {
  try {
    const { pool, isMysqlConnected } = getDb();
    if (isMysqlConnected && pool) {
      const [rows] = await pool.query('SELECT * FROM certificates ORDER BY display_order ASC, id DESC');
      const mapped = rows.map(r => ({
        ...r,
        organization: r.organization || r.issuer || '',
        duration: r.duration || r.year || ''
      }));
      return res.status(200).json({ success: true, data: mapped });
    }
    const certs = readJsonStore('certificates');
    certs.sort((a, b) => (a.display_order || 0) - (b.display_order || 0));
    return res.status(200).json({ success: true, data: certs });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createCertificate = async (req, res) => {
  try {
    const { title, organization, duration, description, display_order } = req.body;
    let image_url = req.file ? `/uploads/${req.file.filename}` : (req.body.image_url || '/assets/mentor-mentee.png');

    const orgVal = organization || '';
    const durVal = duration || '';

    const { pool, isMysqlConnected } = getDb();

    if (isMysqlConnected && pool) {
      const [result] = await pool.query(
        'INSERT INTO certificates (title, organization, issuer, duration, year, image_url, description, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [title, orgVal, orgVal, durVal, durVal, image_url, description || '', display_order || 0]
      );
      await logActivity(req, 'CREATE', 'Certificates', `Added certificate: ${title}`);
      return res.status(201).json({ success: true, message: 'Certificate created successfully.', id: result.insertId });
    } else {
      const certs = readJsonStore('certificates');
      const newCert = {
        id: Date.now(),
        title,
        organization: orgVal,
        issuer: orgVal,
        duration: durVal,
        year: durVal,
        image_url,
        description: description || '',
        display_order: display_order || certs.length + 1,
        created_at: new Date().toISOString()
      };
      certs.push(newCert);
      writeJsonStore('certificates', certs);
      await logActivity(req, 'CREATE', 'Certificates', `Added certificate: ${title}`);
      return res.status(201).json({ success: true, message: 'Certificate created successfully.', data: newCert });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, organization, duration, description, display_order } = req.body;
    let image_url = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;

    const orgVal = organization || '';
    const durVal = duration || '';

    const { pool, isMysqlConnected } = getDb();

    if (isMysqlConnected && pool) {
      let query = 'UPDATE certificates SET title=?, organization=?, issuer=?, duration=?, year=?, description=?, display_order=?';
      let params = [title, orgVal, orgVal, durVal, durVal, description || '', display_order || 0];
      if (image_url) {
        query += ', image_url=?';
        params.push(image_url);
      }
      query += ' WHERE id=?';
      params.push(id);

      await pool.query(query, params);
    } else {
      let certs = readJsonStore('certificates');
      certs = certs.map(c => {
        if (c.id == id) {
          return {
            ...c,
            title,
            organization: orgVal || c.organization || c.issuer,
            issuer: orgVal || c.issuer,
            duration: durVal || c.duration || c.year,
            year: durVal || c.year,
            description: description !== undefined ? description : c.description,
            display_order: display_order || c.display_order,
            image_url: image_url || c.image_url,
            updated_at: new Date().toISOString()
          };
        }
        return c;
      });
      writeJsonStore('certificates', certs);
    }

    await logActivity(req, 'UPDATE', 'Certificates', `Updated certificate ID: ${id} (${title})`);
    return res.status(200).json({ success: true, message: 'Certificate updated successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const { pool, isMysqlConnected } = getDb();

    if (isMysqlConnected && pool) {
      await pool.query('DELETE FROM certificates WHERE id = ?', [id]);
    } else {
      let certs = readJsonStore('certificates');
      certs = certs.filter(c => c.id != id);
      writeJsonStore('certificates', certs);
    }

    await logActivity(req, 'DELETE', 'Certificates', `Deleted certificate ID: ${id}`);
    return res.status(200).json({ success: true, message: 'Certificate deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
