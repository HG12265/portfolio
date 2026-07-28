import { getDb, readJsonStore, writeJsonStore } from '../config/db.js';
import { logActivity } from '../middleware/auditMiddleware.js';

export const getCertificates = async (req, res) => {
  try {
    const { pool, isMysqlConnected } = getDb();
    if (isMysqlConnected && pool) {
      const [rows] = await pool.query('SELECT * FROM certificates ORDER BY display_order ASC, id DESC');
      return res.status(200).json({ success: true, data: rows });
    }
    const certs = readJsonStore('certificates');
    return res.status(200).json({ success: true, data: certs });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const createCertificate = async (req, res) => {
  try {
    const { title, issuer, year, credential_id, description, verify_url, display_order } = req.body;
    let image_url = req.file ? `/uploads/${req.file.filename}` : (req.body.image_url || '/assets/mentor-mentee.png');

    const { pool, isMysqlConnected } = getDb();

    if (isMysqlConnected && pool) {
      const [result] = await pool.query(
        'INSERT INTO certificates (title, issuer, year, credential_id, image_url, description, verify_url, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [title, issuer, year, credential_id, image_url, description, verify_url, display_order || 0]
      );
      await logActivity(req, 'CREATE', 'Certificates', `Added certificate: ${title}`);
      return res.status(201).json({ success: true, message: 'Certificate created successfully.', id: result.insertId });
    } else {
      const certs = readJsonStore('certificates');
      const newCert = {
        id: Date.now(),
        title, issuer, year, credential_id, image_url, description, verify_url,
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
    const { title, issuer, year, credential_id, description, verify_url, display_order } = req.body;
    let image_url = req.file ? `/uploads/${req.file.filename}` : req.body.image_url;

    const { pool, isMysqlConnected } = getDb();

    if (isMysqlConnected && pool) {
      let query = 'UPDATE certificates SET title=?, issuer=?, year=?, credential_id=?, description=?, verify_url=?, display_order=?';
      let params = [title, issuer, year, credential_id, description, verify_url, display_order];
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
            title, issuer, year, credential_id, description, verify_url, display_order,
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
