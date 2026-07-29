import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaSearch } from 'react-icons/fa';
import api from '../services/api';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';

export const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'frontend',
    icon_name: 'FaCode',
    proficiency: 'Advanced',
    color: '#38BDF8',
    description: '',
    display_order: 1,
    enabled: true
  });

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'programming', label: 'Programming' },
    { id: 'database', label: 'Database' },
    { id: 'hosting', label: 'Hosting & Deployment' },
    { id: 'tools', label: 'Tools' },
  ];

  const fetchSkills = async () => {
    try {
      const res = await api.get('/admin/skills');
      if (res.data && res.data.data) {
        setSkills(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch skills:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleOpenAdd = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      category: 'frontend',
      icon_name: 'FaCode',
      proficiency: 'Advanced',
      color: '#38BDF8',
      description: '',
      display_order: skills.length + 1,
      enabled: true
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name || '',
      category: skill.category || 'frontend',
      icon_name: skill.icon_name || 'FaCode',
      proficiency: skill.proficiency || 'Advanced',
      color: skill.color || '#38BDF8',
      description: skill.description || '',
      display_order: skill.display_order || 1,
      enabled: skill.enabled !== undefined ? !!skill.enabled : true
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    try {
      await api.delete(`/admin/skills/${id}`);
      fetchSkills();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete skill.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const targetId = editingSkill ? (editingSkill._id || editingSkill.id) : null;
      if (targetId) {
        await api.put(`/admin/skills/${targetId}`, formData);
      } else {
        await api.post('/admin/skills', formData);
      }
      setIsModalOpen(false);
      fetchSkills();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save skill.');
    } finally {
      setSaving(false);
    }
  };

  const filteredSkills = skills.filter((s) => {
    const matchesCat = categoryFilter === 'all' || s.category === categoryFilter;
    const matchesSearch = (s.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (s.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-textLight">Manage Skills & Technologies</h1>
          <p className="text-xs font-body text-textMuted mt-0.5">
            Add, edit, enable/disable, or reorder technologies across categories.
          </p>
        </div>
        <Button variant="primary" size="md" onClick={handleOpenAdd} icon={FaPlus}>
          Add New Technology
        </Button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-2 md:pb-0 custom-scrollbar">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategoryFilter(c.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all shrink-0 ${
                categoryFilter === c.id
                  ? 'bg-accentSky text-black font-semibold shadow-md'
                  : 'bg-white/5 text-textMuted hover:bg-white/10 hover:text-textLight'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted w-3.5 h-3.5" />
          <input
            type="text"
            placeholder="Search technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none focus:border-accentSky/60 font-body"
          />
        </div>
      </div>

      {/* Skills Table */}
      <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-slate-900/60 text-[11px] font-mono uppercase text-textMuted">
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Technology</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Proficiency</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs font-body">
              {filteredSkills.map((skill) => {
                const skillId = skill._id || skill.id;
                return (
                  <tr key={skillId} className="hover:bg-white/5 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-textMuted">{skill.display_order}</td>
                    <td className="py-3.5 px-4 font-semibold text-textLight">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: skill.color || '#38BDF8' }} />
                        <span>{skill.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-accentSky uppercase text-[11px]">{skill.category}</td>
                    <td className="py-3.5 px-4">
                      <Badge variant={skill.proficiency === 'Advanced' ? 'primary' : 'default'} size="xs">
                        {skill.proficiency}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${skill.enabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                        {skill.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleOpenEdit(skill)} className="p-2 rounded-lg bg-white/5 hover:text-accentSky border border-white/10" title="Edit">
                          <FaEdit className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDelete(skillId)} className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20" title="Delete">
                          <FaTrash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Skill Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingSkill ? 'Edit Skill' : 'Add New Technology'} maxWidth="max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Technology Name *</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Category</label>
              <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight">
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="programming">Programming</option>
                <option value="database">Database</option>
                <option value="hosting">Hosting & Deployment</option>
                <option value="tools">Tools</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Proficiency</label>
              <select value={formData.proficiency} onChange={(e) => setFormData({ ...formData, proficiency: e.target.value })} className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight">
                <option value="Advanced">Advanced</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Brand / Hex Color</label>
            <div className="flex items-center gap-2">
              <input type="color" value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} className="w-8 h-8 rounded border-0 bg-transparent cursor-pointer" />
              <input type="text" value={formData.color} onChange={(e) => setFormData({ ...formData, color: e.target.value })} className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight font-mono" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Short Description</label>
            <textarea rows="2" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight resize-none" />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" loading={saving}>Save Technology</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
