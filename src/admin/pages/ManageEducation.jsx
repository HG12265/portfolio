import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaGraduationCap } from 'react-icons/fa';
import api from '../services/api';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';

export const ManageEducation = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    period: '2025 – 2027',
    status: 'Pursuing (Final Year)',
    grade: 'First Class',
    description: '',
    courses: 'Advanced Web Development, Database Management, Cloud Deployment',
    display_order: 1
  });

  const fetchEdu = async () => {
    try {
      const res = await api.get('/admin/education');
      if (res.data && res.data.data) {
        setEducation(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch education:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEdu();
  }, []);

  const handleOpenAdd = () => {
    setEditingEdu(null);
    setFormData({
      degree: '',
      institution: '',
      period: '2025 – 2027',
      status: 'Pursuing',
      grade: 'First Class',
      description: '',
      courses: 'Full Stack Web Development, MySQL Database',
      display_order: education.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (edu) => {
    setEditingEdu(edu);
    setFormData({
      degree: edu.degree,
      institution: edu.institution,
      period: edu.period,
      status: edu.status || '',
      grade: edu.grade || '',
      description: edu.description || '',
      courses: Array.isArray(edu.courses) ? edu.courses.join(', ') : '',
      display_order: edu.display_order || 1
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this education record?')) return;
    try {
      await api.delete(`/admin/education/${id}`);
      fetchEdu();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete education record.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const coursesArr = formData.courses.split(',').map(c => c.trim()).filter(Boolean);
    const payload = {
      ...formData,
      courses: coursesArr
    };

    try {
      if (editingEdu) {
        await api.put(`/admin/education/${editingEdu.id}`, payload);
      } else {
        await api.post('/admin/education', payload);
      }
      setIsModalOpen(false);
      fetchEdu();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save education record.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-textLight">Manage Academic Education</h1>
          <p className="text-xs font-body text-textMuted mt-0.5">
            Add, update, or reorder degree qualifications and course focus modules.
          </p>
        </div>
        <Button variant="primary" size="md" onClick={handleOpenAdd} icon={FaPlus}>
          Add Education Record
        </Button>
      </div>

      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id} className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primaryBlue/10 border border-primaryBlue/20 flex items-center justify-center text-accentSky shrink-0">
                <FaGraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold font-heading text-textLight">{edu.degree}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-accentSky/20 text-accentSky">{edu.period}</span>
                </div>
                <p className="text-xs font-mono text-accentSky mt-0.5">{edu.institution} &bull; {edu.grade}</p>
                <p className="text-xs text-textMuted font-body mt-2 leading-relaxed">{edu.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 shrink-0">
              <button onClick={() => handleOpenEdit(edu)} className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:text-accentSky">
                <FaEdit className="w-4 h-4" />
              </button>
              <button onClick={() => handleDelete(edu.id)} className="p-2.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20">
                <FaTrash className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingEdu ? 'Edit Education' : 'Add Education Record'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Degree Name *</label>
            <input type="text" value={formData.degree} onChange={(e) => setFormData({ ...formData, degree: e.target.value })} required className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Institution / University *</label>
            <input type="text" value={formData.institution} onChange={(e) => setFormData({ ...formData, institution: e.target.value })} required className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Period *</label>
              <input type="text" value={formData.period} onChange={(e) => setFormData({ ...formData, period: e.target.value })} required className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
            </div>

            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Status</label>
              <input type="text" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
            </div>

            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Grade / Honor</label>
              <input type="text" value={formData.grade} onChange={(e) => setFormData({ ...formData, grade: e.target.value })} className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Description</label>
            <textarea rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight resize-none" />
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Key Focus Courses (comma separated)</label>
            <input type="text" value={formData.courses} onChange={(e) => setFormData({ ...formData, courses: e.target.value })} placeholder="Advanced Web Development, MySQL, Java" className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" loading={saving}>Save Education</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
