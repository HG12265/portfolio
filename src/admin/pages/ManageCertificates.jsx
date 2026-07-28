import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaExternalLinkAlt } from 'react-icons/fa';
import api from '../services/api';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

export const ManageCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    year: '2025',
    credential_id: '',
    description: '',
    verify_url: '',
    display_order: 1,
    image_url: ''
  });

  const fetchCerts = async () => {
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
    fetchCerts();
  }, []);

  const handleOpenAdd = () => {
    setEditingCert(null);
    setSelectedFile(null);
    setFormData({
      title: '',
      issuer: '',
      year: '2025',
      credential_id: '',
      description: '',
      verify_url: 'https://coursera.org/verify/',
      display_order: certificates.length + 1,
      image_url: '/assets/mentor-mentee.png'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cert) => {
    setEditingCert(cert);
    setSelectedFile(null);
    setFormData({
      title: cert.title,
      issuer: cert.issuer,
      year: cert.year,
      credential_id: cert.credential_id || '',
      description: cert.description || '',
      verify_url: cert.verify_url || '',
      display_order: cert.display_order || 1,
      image_url: cert.image_url || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this certificate?')) return;
    try {
      await api.delete(`/admin/certificates/${id}`);
      fetchCerts();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete certificate.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = new FormData();
    Object.keys(formData).forEach(key => payload.append(key, formData[key]));
    if (selectedFile) payload.append('image', selectedFile);

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
      fetchCerts();
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
          <h1 className="text-2xl font-bold font-heading text-textLight">Manage Certificates & Credentials</h1>
          <p className="text-xs font-body text-textMuted mt-0.5">
            Add, update, or remove verified certification credentials.
          </p>
        </div>
        <Button variant="primary" size="md" onClick={handleOpenAdd} icon={FaPlus}>
          Add Certificate
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="glass-card p-5 rounded-2xl border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-base font-bold font-heading text-textLight">{cert.title}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-primaryBlue/20 text-accentSky">{cert.year}</span>
              </div>
              <p className="text-xs font-mono text-accentSky mb-2">{cert.issuer}</p>
              <p className="text-xs text-textMuted leading-relaxed line-clamp-3 mb-3">{cert.description}</p>
              <p className="text-[11px] font-mono text-textMuted/70">ID: {cert.credential_id}</p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <a href={cert.verify_url} target="_blank" rel="noopener noreferrer" className="text-xs font-mono text-accentSky flex items-center gap-1 hover:underline">
                Verify <FaExternalLinkAlt className="w-2.5 h-2.5" />
              </a>

              <div className="flex gap-2">
                <button onClick={() => handleOpenEdit(cert)} className="p-2 rounded-lg bg-white/5 border border-white/10 hover:text-accentSky">
                  <FaEdit className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(cert.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20">
                  <FaTrash className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingCert ? 'Edit Certificate' : 'Add Certificate'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Certificate Title *</label>
            <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Issuing Organization *</label>
              <input type="text" value={formData.issuer} onChange={(e) => setFormData({ ...formData, issuer: e.target.value })} required className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
            </div>

            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Year *</label>
              <input type="text" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} required className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Credential ID</label>
              <input type="text" value={formData.credential_id} onChange={(e) => setFormData({ ...formData, credential_id: e.target.value })} className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
            </div>

            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Verification URL</label>
              <input type="text" value={formData.verify_url} onChange={(e) => setFormData({ ...formData, verify_url: e.target.value })} className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Description</label>
            <textarea rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight resize-none" />
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Certificate Badge/Image</label>
            <input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} className="w-full text-xs text-textMuted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-mono file:bg-primaryBlue file:text-white hover:file:bg-blue-600 cursor-pointer" />
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
