import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaTrash, FaCheck, FaSearch, FaTimes, FaEnvelopeOpen } from 'react-icons/fa';
import api from '../services/api';
import { Modal } from '../../components/common/Modal';

export const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all, unread, read
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async () => {
    try {
      const res = await api.get('/admin/messages');
      if (res.data && res.data.data) {
        setMessages(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch messages:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleOpenMessage = async (msg) => {
    setSelectedMessage(msg);
    if (!msg.is_read) {
      try {
        await api.patch(`/admin/messages/${msg.id}/read`, { is_read: true });
        fetchMessages();
      } catch (err) {
        console.error('Failed to update read status:', err);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact message?')) return;
    try {
      await api.delete(`/admin/messages/${id}`);
      setSelectedMessage(null);
      fetchMessages();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete message.');
    }
  };

  const filteredMessages = messages.filter((m) => {
    const matchesFilter = filter === 'all' || (filter === 'unread' && !m.is_read) || (filter === 'read' && m.is_read);
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-textLight">Contact Messages Inbox</h1>
          <p className="text-xs font-body text-textMuted mt-0.5">
            Manage inquiries, project requests, and messages submitted from the public contact form.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5">
          <button onClick={() => setFilter('all')} className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium ${filter === 'all' ? 'bg-primaryBlue text-white' : 'bg-surfaceDark text-textMuted border border-white/10'}`}>
            All Messages ({messages.length})
          </button>
          <button onClick={() => setFilter('unread')} className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium ${filter === 'unread' ? 'bg-rose-500 text-white' : 'bg-surfaceDark text-textMuted border border-white/10'}`}>
            Unread ({messages.filter(m => !m.is_read).length})
          </button>
          <button onClick={() => setFilter('read')} className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium ${filter === 'read' ? 'bg-emerald-500 text-white' : 'bg-surfaceDark text-textMuted border border-white/10'}`}>
            Read ({messages.filter(m => m.is_read).length})
          </button>
        </div>

        <div className="relative w-full md:w-64">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-textMuted" />
          <input type="text" placeholder="Search inbox..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 pr-4 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none focus:border-accentSky/60" />
        </div>
      </div>

      {/* Messages List */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="divide-y divide-white/5">
          {filteredMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => handleOpenMessage(msg)}
              className={`p-4 sm:p-5 cursor-pointer transition-colors flex items-center justify-between gap-4 ${
                !msg.is_read ? 'bg-primaryBlue/10 hover:bg-primaryBlue/15' : 'hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${!msg.is_read ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-white/5 text-textMuted border border-white/10'}`}>
                  {!msg.is_read ? <FaEnvelope className="w-4 h-4" /> : <FaEnvelopeOpen className="w-4 h-4" />}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className={`text-sm font-semibold truncate ${!msg.is_read ? 'text-textLight font-bold' : 'text-textMuted'}`}>{msg.name}</h4>
                    <span className="text-xs text-accentSky font-mono truncate">&lt;{msg.email}&gt;</span>
                  </div>
                  <p className="text-xs text-textLight font-medium mt-0.5 truncate">{msg.subject}</p>
                  <p className="text-xs text-textMuted truncate mt-0.5">{msg.message}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[11px] font-mono text-textMuted/70 hidden sm:inline">
                  {new Date(msg.created_at).toLocaleDateString()}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(msg.id);
                  }}
                  className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
                >
                  <FaTrash className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {filteredMessages.length === 0 && (
            <div className="p-8 text-center text-xs font-mono text-textMuted">No contact messages found in inbox.</div>
          )}
        </div>
      </div>

      {/* Message Drawer Modal */}
      {selectedMessage && (
        <Modal isOpen={!!selectedMessage} onClose={() => setSelectedMessage(null)} title={selectedMessage.subject}>
          <div className="space-y-4 font-body">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-2">
              <div>
                <h4 className="text-base font-bold text-textLight">{selectedMessage.name}</h4>
                <a href={`mailto:${selectedMessage.email}`} className="text-xs font-mono text-accentSky hover:underline">{selectedMessage.email}</a>
              </div>
              <span className="text-xs font-mono text-textMuted">Received: {new Date(selectedMessage.created_at).toLocaleString()}</span>
            </div>

            <div className="bg-surfaceDark p-4 rounded-xl border border-white/10 text-xs text-textLight leading-relaxed whitespace-pre-wrap">
              {selectedMessage.message}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-textMuted">Sender IP: {selectedMessage.ip_address}</span>
              <div className="flex gap-2">
                <a href={`mailto:${selectedMessage.email}?subject=RE: ${selectedMessage.subject}`} className="px-4 py-2 rounded-lg bg-primaryBlue text-white text-xs font-medium hover:bg-blue-600">
                  Reply via Email
                </a>
                <button onClick={() => handleDelete(selectedMessage.id)} className="px-3 py-2 rounded-lg bg-red-500/10 text-red-400 text-xs font-medium hover:bg-red-500/20 border border-red-500/20">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
