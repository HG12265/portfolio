import { getDb, readJsonStore, writeJsonStore } from '../config/db.js';
import { logActivity } from '../middleware/auditMiddleware.js';

export const getMessages = async (req, res) => {
  try {
    const { pool, isMysqlConnected } = getDb();
    if (isMysqlConnected && pool) {
      const [rows] = await pool.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
      return res.status(200).json({ success: true, data: rows });
    }
    const messages = readJsonStore('contact_messages');
    messages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return res.status(200).json({ success: true, data: messages });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const submitMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }

    const ip_address = req.ip || req.connection.remoteAddress || '127.0.0.1';
    const { pool, isMysqlConnected } = getDb();

    if (isMysqlConnected && pool) {
      const [result] = await pool.query(
        'INSERT INTO contact_messages (name, email, subject, message, is_read, ip_address) VALUES (?, ?, ?, ?, 0, ?)',
        [name, email, subject || 'General Inquiry', message, ip_address]
      );
      return res.status(201).json({ success: true, message: 'Message sent successfully!', id: result.insertId });
    } else {
      const messages = readJsonStore('contact_messages');
      const newMsg = {
        id: Date.now(),
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
        is_read: false,
        ip_address,
        created_at: new Date().toISOString()
      };
      messages.unshift(newMsg);
      writeJsonStore('contact_messages', messages);
      return res.status(201).json({ success: true, message: 'Message sent successfully!', data: newMsg });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const toggleReadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_read } = req.body;
    const { pool, isMysqlConnected } = getDb();

    if (isMysqlConnected && pool) {
      await pool.query('UPDATE contact_messages SET is_read = ? WHERE id = ?', [is_read ? 1 : 0, id]);
    } else {
      let messages = readJsonStore('contact_messages');
      messages = messages.map(m => m.id == id ? { ...m, is_read: !!is_read } : m);
      writeJsonStore('contact_messages', messages);
    }

    await logActivity(req, 'UPDATE', 'Messages', `Updated read status for message ID: ${id}`);
    return res.status(200).json({ success: true, message: 'Message status updated.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { pool, isMysqlConnected } = getDb();

    if (isMysqlConnected && pool) {
      await pool.query('DELETE FROM contact_messages WHERE id = ?', [id]);
    } else {
      let messages = readJsonStore('contact_messages');
      messages = messages.filter(m => m.id != id);
      writeJsonStore('contact_messages', messages);
    }

    await logActivity(req, 'DELETE', 'Messages', `Deleted contact message ID: ${id}`);
    return res.status(200).json({ success: true, message: 'Message deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
