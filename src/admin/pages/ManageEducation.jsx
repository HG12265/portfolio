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
      courses: Array.isArray(edu.courses) ? edu.courses.join(', ') : (edu.courses || ''),
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

    const coursesArr = typeof formData.courses === 'string' ? formData.courses.split(',').map(c => c.trim()).filter(Boolean) : formData.courses;
    const payload = {
      ...formData,
      courses: coursesArr
    };

    try {
      const targetId = editingEdu ? (editingEdu._id || editingEdu.id) : null;
      if (targetId) {
        await api.put(`/admin/education/${targetId}`, payload);
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
          <h1 className="text-2xl font-bold font-heading text-textLight">Manage Education Records</h1>
          <p className="text-xs font-body text-textMuted mt-0.5">
            Add, edit, or remove academic degrees, courses, and institution credentials.
          </p>
        </div>
        <Button variant="primary" size="md" onClick={handleOpenAdd} icon={FaPlus}>
          Add Education Record
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((edu) => {
          const eduId = edu._id || edu.id;
          return (
            <div key={eduId} className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-accentSky/10 border border-accentSky/20 text-accentSky">
                      <FaGraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold font-heading text-textLight">{edu.degree}</h3>
                      <p className="text-xs font-mono text-accentSky">{edu.institution}</p>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-textMuted bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                    {edu.period}
                  </span>
                </div>

                {edu.description && (
                  <p className="text-xs text-textMuted leading-relaxed">{edu.description}</p>
                )}

                {Array.isArray(edu.courses) && edu.courses.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {edu.courses.map((course, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-white/5 text-[11px] font-mono text-textMuted border border-white/5">
                        {course}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] font-mono text-emerald-400 font-semibold">{edu.status || 'Graduated'}</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleOpenEdit(edu)} className="p-2 rounded-lg bg-white/5 hover:text-accentSky border border-white/10" title="Edit">
                    <FaEdit className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(eduId)} className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20" title="Delete">
                    <FaTrash className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Education Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingEdu ? 'Edit Education' : 'Add Education Record'} maxWidth="max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Degree Name *</label>
            <input type="text" value={formData.degree} onChange={(e) => setFormData({ ...formData, degree: e.target.value })} required placeholder="e.g. Master of Computer Applications (MCA)" className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Institution / University *</label>
            <input type="text" value={formData.institution} onChange={(e) => setFormData({ ...formData, institution: e.target.value })} required placeholder="e.g. Periyar University" className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Period *</label>
              <input type="text" value={formData.period} onChange={(e) => setFormData({ ...formData, period: e.target.value })} required placeholder="2025 – 2027" className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight font-mono" />
            </div>

            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Status / Grade</label>
              <input type="text" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} placeholder="Pursuing (Final Year)" className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Course Highlights (comma separated)</label>
            <input type="text" value={formData.courses} onChange={(e) => setFormData({ ...formData, courses: e.target.value })} placeholder="Advanced Web Dev, Database Systems, Cloud" className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Description</label>
            <textarea rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight resize-none" />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" loading={saving}>Save Education Record</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
