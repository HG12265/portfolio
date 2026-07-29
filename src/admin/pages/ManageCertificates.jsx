import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaFilePdf, FaExternalLinkAlt, FaCloudUploadAlt } from 'react-icons/fa';
import api from '../services/api';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

const formatFileUrl = (url) => {
  if (!url) return '/assets/mentor-mentee.png';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/uploads')) return `http://localhost:5000${url}`;
  return url;
};

export const ManageCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    duration: '',
    description: '',
    display_order: 1,
    image_url: ''
  });

  const fetchCertificates = async () => {
    try {
      const res = await api.get('/admin/certificates');
      if (res.data && res.data.data) {
        setCertificates(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch certificates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleOpenAdd = () => {
    setEditingCert(null);
    setSelectedFile(null);
    setFormData({
      title: '',
      organization: '',
      duration: new Date().getFullYear().toString(),
      description: '',
      display_order: certificates.length + 1,
      image_url: '/assets/mentor-mentee.png'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cert) => {
    setEditingCert(cert);
    setSelectedFile(null);
    setFormData({
      title: cert.title || '',
      organization: cert.organization || cert.issuer || '',
      duration: cert.duration || cert.year || '',
      description: cert.description || '',
      display_order: cert.display_order || 1,
      image_url: cert.image_url || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this certificate?')) return;
    try {
      await api.delete(`/admin/certificates/${id}`);
      fetchCertificates();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete certificate.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('organization', formData.organization);
    payload.append('duration', formData.duration);
    payload.append('description', formData.description);
    payload.append('display_order', formData.display_order);

    if (selectedFile) {
      payload.append('image', selectedFile);
    } else if (formData.image_url) {
      payload.append('image_url', formData.image_url);
    }

    try {
      if (editingCert) {
        await api.put(`/admin/certificates/${editingCert.id}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/admin/certificates', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      setIsModalOpen(false);
      fetchCertificates();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save certificate.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-textLight">Manage Certificates</h1>
          <p className="text-xs font-body text-textMuted mt-0.5">
            Add, edit, replace file uploads, or reorder professional developer certificates.
          </p>
        </div>
        <Button variant="primary" size="md" onClick={handleOpenAdd} icon={FaPlus}>
          Add Certificate
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => {
          const fileUrl = formatFileUrl(cert.image_url);
          const isPdf = fileUrl.toLowerCase().endsWith('.pdf');

          return (
            <div key={cert.id} className="glass-card rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between">
              <div>
                <div className="relative aspect-video bg-surfaceDark overflow-hidden border-b border-white/5">
                  {isPdf ? (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-accentSky p-4">
                      <FaFilePdf className="w-10 h-10 text-red-400 mb-1" />
                      <span className="text-xs font-mono text-textMuted">PDF Certificate Document</span>
                    </div>
                  ) : (
                    <img
                      src={fileUrl}
                      alt={cert.title}
                      onError={(e) => { e.currentTarget.src = '/assets/mentor-mentee.png'; }}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-accentSky">
                    <span className="font-semibold">{cert.organization || cert.issuer}</span>
                    <span className="text-textMuted">{cert.duration || cert.year}</span>
                  </div>
                  <h3 className="text-base font-bold font-heading text-textLight">{cert.title}</h3>
                  {cert.description && (
                    <p className="text-xs text-textMuted line-clamp-2 leading-relaxed">{cert.description}</p>
                  )}
                </div>
              </div>

              <div className="px-5 pb-5 pt-3 border-t border-white/5 flex items-center justify-between">
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-accentSky hover:underline flex items-center gap-1"
                >
                  <FaExternalLinkAlt className="w-3 h-3" /> View File
                </a>

                <div className="flex items-center gap-2">
                  <button onClick={() => handleOpenEdit(cert)} className="p-2 rounded-lg bg-white/5 hover:text-accentSky border border-white/10" title="Edit">
                    <FaEdit className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(cert.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20" title="Delete">
                    <FaTrash className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Certificate Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingCert ? 'Edit Certificate' : 'Add Certificate'} maxWidth="max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Certificate Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="e.g. Full Stack Web Development Professional"
              className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none focus:border-accentSky/60"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Organization *</label>
              <input
                type="text"
                value={formData.organization}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                required
                placeholder="e.g. Coursera / Meta"
                className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none focus:border-accentSky/60"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Duration *</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
                placeholder="e.g. 2025 or Jan - Mar 2025"
                className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none focus:border-accentSky/60"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Description</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the certificate achievements..."
              className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none focus:border-accentSky/60 resize-none font-body"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Certificate Image / PDF Upload *</label>
            <div className="flex items-center gap-3">
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="w-full text-xs text-textMuted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-mono file:bg-primaryBlue file:text-white hover:file:bg-blue-600 cursor-pointer"
              />
            </div>
            {editingCert && !selectedFile && (
              <p className="text-[11px] font-mono text-textMuted mt-1">Current file: {formData.image_url}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Display Order (Optional)</label>
            <input
              type="number"
              value={formData.display_order}
              onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 1 })}
              className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none focus:border-accentSky/60"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" loading={saving}>Save Certificate</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
