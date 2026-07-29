import ContactMessage from '../models/ContactMessage.js';
import { readJsonStore, writeJsonStore } from '../config/db.js';
import { sendContactNotification } from '../services/emailService.js';

export const getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ created_at: -1 }).lean();
    if (messages && messages.length > 0) {
      return res.status(200).json({ success: true, data: messages });
    }
    const jsonMsgs = readJsonStore('contact_messages');
    return res.status(200).json({ success: true, data: jsonMsgs });
  } catch (err) {
    const jsonMsgs = readJsonStore('contact_messages');
    return res.status(200).json({ success: true, data: jsonMsgs });
  }
};

export const submitMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }

    const ip_address = req.ip || req.connection.remoteAddress || '127.0.0.1';
    let insertedId = null;

    try {
      const newMsg = await ContactMessage.create({
        name,
        email,
        subject: subject || 'General Inquiry',
        message,
        is_read: false,
        ip_address
      });
      insertedId = newMsg._id;
    } catch {
      const jsonMsgs = readJsonStore('contact_messages');
      insertedId = Date.now();
      jsonMsgs.unshift({
        id: insertedId,
        name, email, subject: subject || 'General Inquiry', message, is_read: false, ip_address,
        created_at: new Date().toISOString()
      });
      writeJsonStore('contact_messages', jsonMsgs);
    }

    sendContactNotification({ name, email, subject, message }).catch(err => {
      console.error('Async email dispatch error:', err);
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      id: insertedId
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const toggleReadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_read } = req.body;

    try {
      await ContactMessage.findByIdAndUpdate(id, { is_read: !!is_read });
    } catch {
      let jsonMsgs = readJsonStore('contact_messages');
      jsonMsgs = jsonMsgs.map(m => m.id == id ? { ...m, is_read: !!is_read } : m);
      writeJsonStore('contact_messages', jsonMsgs);
    }

    return res.status(200).json({ success: true, message: 'Message status updated.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    try {
      await ContactMessage.findByIdAndDelete(id);
    } catch {
      let jsonMsgs = readJsonStore('contact_messages');
      jsonMsgs = jsonMsgs.filter(m => m.id != id);
      writeJsonStore('contact_messages', jsonMsgs);
    }

    return res.status(200).json({ success: true, message: 'Message deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
