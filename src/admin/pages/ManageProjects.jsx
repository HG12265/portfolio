import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaStar, FaEye, FaEyeSlash, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import api from '../services/api';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';

export const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    category: 'Full Stack',
    description: '',
    long_description: '',
    tags: '',
    features: '',
    architecture: '',
    role: 'Full Stack Developer',
    duration: '',
    github_url: '',
    demo_url: '',
    featured: false,
    published: true,
    display_order: 1,
    image_url: ''
  });

  const fetchProjects = async () => {
    try {
      const res = await api.get('/admin/projects');
      if (res.data && res.data.data) {
        setProjects(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenAdd = () => {
    setEditingProject(null);
    setSelectedFile(null);
    setFormData({
      title: '',
      subtitle: '',
      category: 'Full Stack',
      description: '',
      long_description: '',
      tags: 'React.js, Node.js, Express.js, MySQL, Tailwind CSS',
      features: 'Role-based authentication, Interactive dashboard, RESTful APIs',
      architecture: 'Decoupled MERN stack architecture.',
      role: 'Full Stack Developer',
      duration: '2 Months',
      github_url: 'https://github.com/gowthamg-dev',
      demo_url: 'https://demo.vercel.app',
      featured: false,
      published: true,
      display_order: projects.length + 1,
      image_url: '/assets/mentor-mentee.png'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (proj) => {
    setEditingProject(proj);
    setSelectedFile(null);
    setFormData({
      title: proj.title,
      subtitle: proj.subtitle || '',
      category: proj.category || 'Full Stack',
      description: proj.description || '',
      long_description: proj.long_description || '',
      tags: Array.isArray(proj.tags) ? proj.tags.join(', ') : '',
      features: Array.isArray(proj.features) ? proj.features.join('\n') : '',
      architecture: proj.architecture || '',
      role: proj.role || 'Full Stack Developer',
      duration: proj.duration || '',
      github_url: proj.github_url || '',
      demo_url: proj.demo_url || '',
      featured: !!proj.featured,
      published: proj.published !== undefined ? !!proj.published : true,
      display_order: proj.display_order || 1,
      image_url: proj.image_url || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`/admin/projects/${id}`);
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete project.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'tags') {
        const arr = formData.tags.split(',').map(t => t.trim()).filter(Boolean);
        payload.append('tags', JSON.stringify(arr));
      } else if (key === 'features') {
        const arr = formData.features.split('\n').map(f => f.trim()).filter(Boolean);
        payload.append('features', JSON.stringify(arr));
      } else {
        payload.append(key, formData[key]);
      }
    });

    if (selectedFile) {
      payload.append('image', selectedFile);
    }

    try {
      if (editingProject) {
        await api.put(`/admin/projects/${editingProject.id}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/admin/projects', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to save project.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-textLight">Manage Projects Showcase</h1>
          <p className="text-xs font-body text-textMuted mt-0.5">
            Add, edit, toggle featured status, or publish/archive project showcases.
          </p>
        </div>
        <Button variant="primary" size="md" onClick={handleOpenAdd} icon={FaPlus}>
          Create Project Showcase
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div key={proj.id} className="glass-card rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between">
            <div>
              <div className="relative aspect-video bg-surfaceDark overflow-hidden">
                <img src={proj.image_url} alt={proj.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge variant="primary" size="xs">{proj.category}</Badge>
                  {proj.featured && <Badge variant="warning" size="xs">Featured</Badge>}
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold font-heading text-textLight">{proj.title}</h3>
                <p className="text-xs font-mono text-accentSky mt-0.5 mb-2">{proj.subtitle}</p>
                <p className="text-xs text-textMuted line-clamp-2">{proj.description}</p>
              </div>
            </div>

            <div className="px-5 pb-5 pt-3 border-t border-white/5 flex items-center justify-between">
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${proj.published ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                {proj.published ? 'Published' : 'Archived'}
              </span>

              <div className="flex items-center gap-2">
                <button onClick={() => handleOpenEdit(proj)} className="p-2 rounded-lg bg-white/5 hover:text-accentSky border border-white/10">
                  <FaEdit className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(proj.id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20">
                  <FaTrash className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingProject ? 'Edit Project' : 'Create Project Showcase'} maxWidth="max-w-3xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Project Title *</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
            </div>

            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Category</label>
              <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Subtitle / One-liner</label>
            <input type="text" value={formData.subtitle} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Short Description (Card View) *</label>
            <textarea rows="2" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight resize-none" />
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Detailed Overview (Modal View)</label>
            <textarea rows="3" value={formData.long_description} onChange={(e) => setFormData({ ...formData, long_description: e.target.value })} className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight resize-none" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Tech Stack (comma separated)</label>
              <input type="text" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="React.js, Node.js, MySQL" className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
            </div>

            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Role</label>
              <input type="text" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Key Features (one per line)</label>
            <textarea rows="3" value={formData.features} onChange={(e) => setFormData({ ...formData, features: e.target.value })} placeholder="Automated mentee mapping&#10;Role-based access control" className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight resize-none font-mono" />
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Architecture & Stack Details</label>
            <textarea rows="2" value={formData.architecture} onChange={(e) => setFormData({ ...formData, architecture: e.target.value })} className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight resize-none" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">GitHub Repository URL</label>
              <input type="text" value={formData.github_url} onChange={(e) => setFormData({ ...formData, github_url: e.target.value })} className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
            </div>

            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Live Demo URL</label>
              <input type="text" value={formData.demo_url} onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })} className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Project Preview Image</label>
            <input type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} className="w-full text-xs text-textMuted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-mono file:bg-primaryBlue file:text-white hover:file:bg-blue-600 cursor-pointer" />
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 text-xs font-body text-textLight cursor-pointer">
              <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} />
              <span>Mark as Featured Project</span>
            </label>

            <label className="flex items-center gap-2 text-xs font-body text-textLight cursor-pointer">
              <input type="checkbox" checked={formData.published} onChange={(e) => setFormData({ ...formData, published: e.target.checked })} />
              <span>Published on Website</span>
            </label>
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-white/10">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" loading={saving}>Save Project</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
