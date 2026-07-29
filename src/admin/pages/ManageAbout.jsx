import React, { useState, useEffect } from 'react';
import { FaSave, FaCheckCircle, FaPlus, FaTimes, FaCamera, FaCloudUploadAlt, FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import api from '../services/api';
import { Button } from '../../components/common/Button';

const formatImageUrl = (url) => {
  if (!url) return '/assets/gowtham-profile.png';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/uploads')) return `http://localhost:5000${url}`;
  return url;
};

export const ManageAbout = () => {
  const [formData, setFormData] = useState({
    name: 'GOWTHAM G',
    title: '',
    tagline: '',
    bio: '',
    career_objective: '',
    technical_interests: [],
    leadership_text: '',
    current_learning: [],
    location: '',
    email: 'itsgowtham.dev@gmail.com',
    phone: '+91 9344232465',
    profile_image_url: '/assets/gowtham-profile.png',
    github_url: 'https://github.com/gowthamg-dev',
    linkedin_url: 'https://linkedin.com/in/gowthamg-dev',
    twitter_url: 'https://twitter.com/gowthamg_dev',
    instagram_url: 'https://instagram.com/gowthamg_dev'
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const [newInterestTag, setNewInterestTag] = useState('');
  const [newLearningTag, setNewLearningTag] = useState('');

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await api.get('/admin/about');
        if (res.data && res.data.data) {
          setFormData(res.data.data);
          setPreviewUrl(formatImageUrl(res.data.data.profile_image_url));
        }
      } catch (err) {
        console.error('Failed to load about details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAddInterest = () => {
    if (!newInterestTag.trim()) return;
    setFormData({
      ...formData,
      technical_interests: [...(formData.technical_interests || []), newInterestTag.trim()]
    });
    setNewInterestTag('');
  };

  const handleRemoveInterest = (index) => {
    const updated = [...(formData.technical_interests || [])];
    updated.splice(index, 1);
    setFormData({ ...formData, technical_interests: updated });
  };

  const handleAddLearning = () => {
    if (!newLearningTag.trim()) return;
    setFormData({
      ...formData,
      current_learning: [...(formData.current_learning || []), newLearningTag.trim()]
    });
    setNewLearningTag('');
  };

  const handleRemoveLearning = (index) => {
    const updated = [...(formData.current_learning || [])];
    updated.splice(index, 1);
    setFormData({ ...formData, current_learning: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: '', message: '' });

    const payload = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'technical_interests' || key === 'current_learning') {
        payload.append(key, JSON.stringify(formData[key] || []));
      } else {
        payload.append(key, formData[key] || '');
      }
    });

    if (selectedFile) {
      payload.append('profile_image', selectedFile);
    }

    try {
      const res = await api.put('/admin/about', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data && res.data.success) {
        setStatus({ type: 'success', message: 'Profile details, social links & photo updated successfully!' });
        if (res.data.profile_image_url) {
          setFormData(prev => ({ ...prev, profile_image_url: res.data.profile_image_url }));
          setPreviewUrl(formatImageUrl(res.data.profile_image_url));
        }
      }
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to update profile details.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-12 text-center text-xs font-mono text-textMuted">Loading profile data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-textLight">Manage About & Profile</h1>
          <p className="text-xs font-body text-textMuted mt-0.5">
            Update your homepage profile picture, biography, social links, leadership, focus tags, and contact info.
          </p>
        </div>
      </div>

      {status.message && (
        <div className={`p-4 rounded-xl text-xs font-body ${status.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture Uploader Card */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-accentSky/50 bg-slate-800 shrink-0 shadow-xl group">
            <img
              src={previewUrl || '/assets/gowtham-profile.png'}
              alt="Profile Preview"
              onError={(e) => { e.currentTarget.src = '/assets/profile.png'; }}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-bgDark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <FaCamera className="w-6 h-6 text-accentSky" />
            </div>
          </div>

          <div className="space-y-2 flex-1 text-center sm:text-left">
            <h3 className="text-base font-bold font-heading text-textLight">Homepage Profile Picture</h3>
            <p className="text-xs text-textMuted font-body leading-relaxed">
              Upload a high-resolution photo (PNG, JPG, WEBP) to update your main card image in the Hero section.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 justify-center sm:justify-start">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="profilePicInput"
              />
              <label
                htmlFor="profilePicInput"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primaryBlue/20 hover:bg-primaryBlue/30 text-accentSky border border-primaryBlue/30 text-xs font-mono font-semibold cursor-pointer transition-all"
              >
                <FaCloudUploadAlt className="w-4 h-4" />
                <span>{selectedFile ? 'Change Selected File' : 'Select New Profile Picture'}</span>
              </label>

              {selectedFile && (
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  File Selected: {selectedFile.name}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Social Media Links Manager Card */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-base font-bold font-heading text-accentSky flex items-center gap-2">
            Social Media Profiles & Links
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase flex items-center gap-1.5">
                <FaGithub className="w-3.5 h-3.5 text-textLight" /> GitHub Profile URL
              </label>
              <input
                type="text"
                name="github_url"
                value={formData.github_url || ''}
                onChange={handleChange}
                placeholder="https://github.com/username"
                className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none focus:border-accentSky/60"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase flex items-center gap-1.5">
                <FaLinkedin className="w-3.5 h-3.5 text-blue-400" /> LinkedIn Profile URL
              </label>
              <input
                type="text"
                name="linkedin_url"
                value={formData.linkedin_url || ''}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none focus:border-accentSky/60"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase flex items-center gap-1.5">
                <FaTwitter className="w-3.5 h-3.5 text-sky-400" /> Twitter / X Profile URL
              </label>
              <input
                type="text"
                name="twitter_url"
                value={formData.twitter_url || ''}
                onChange={handleChange}
                placeholder="https://twitter.com/username"
                className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none focus:border-accentSky/60"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase flex items-center gap-1.5">
                <FaInstagram className="w-3.5 h-3.5 text-pink-400" /> Instagram Profile URL
              </label>
              <input
                type="text"
                name="instagram_url"
                value={formData.instagram_url || ''}
                onChange={handleChange}
                placeholder="https://instagram.com/username"
                className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none focus:border-accentSky/60"
              />
            </div>
          </div>
        </div>

        {/* Core Profile Information */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-base font-bold font-heading text-accentSky mb-2">Core Profile Information</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Full Name</label>
              <input type="text" name="name" value={formData.name || ''} onChange={handleChange} required className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none focus:border-accentSky/60" />
            </div>

            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Professional Headline</label>
              <input type="text" name="title" value={formData.title || ''} onChange={handleChange} required className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none focus:border-accentSky/60" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Hero Tagline</label>
            <input type="text" name="tagline" value={formData.tagline || ''} onChange={handleChange} className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none focus:border-accentSky/60" />
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Professional Biography</label>
            <textarea name="bio" rows="4" value={formData.bio || ''} onChange={handleChange} required className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none focus:border-accentSky/60 resize-none font-body" />
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Career Objective</label>
            <textarea name="career_objective" rows="3" value={formData.career_objective || ''} onChange={handleChange} required className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none focus:border-accentSky/60 resize-none font-body" />
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Leadership Statement</label>
            <textarea name="leadership_text" rows="3" value={formData.leadership_text || ''} onChange={handleChange} className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none focus:border-accentSky/60 resize-none font-body" />
          </div>
        </div>

        {/* Focus Tags & Current Learning */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-white/10">
            <h3 className="text-base font-bold font-heading text-accentSky mb-3">Technical Focus Areas</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {(formData.technical_interests || []).map((tag, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primaryBlue/20 border border-primaryBlue/30 text-xs font-mono text-accentSky">
                  <span>{tag}</span>
                  <button type="button" onClick={() => handleRemoveInterest(idx)} className="hover:text-red-400"><FaTimes className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={newInterestTag} onChange={(e) => setNewInterestTag(e.target.value)} placeholder="Add focus tag..." className="flex-1 px-3 py-1.5 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none" />
              <Button type="button" variant="secondary" size="sm" onClick={handleAddInterest} icon={FaPlus}>Add</Button>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-white/10">
            <h3 className="text-base font-bold font-heading text-accentSky mb-3">Current Learning</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {(formData.current_learning || []).map((tag, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accentSky/20 border border-accentSky/30 text-xs font-mono text-accentSky">
                  <span>{tag}</span>
                  <button type="button" onClick={() => handleRemoveLearning(idx)} className="hover:text-red-400"><FaTimes className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={newLearningTag} onChange={(e) => setNewLearningTag(e.target.value)} placeholder="Add learning tag..." className="flex-1 px-3 py-1.5 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none" />
              <Button type="button" variant="secondary" size="sm" onClick={handleAddLearning} icon={FaPlus}>Add</Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="glass-card p-6 rounded-2xl border border-white/10">
          <h3 className="text-base font-bold font-heading text-accentSky mb-3">Contact Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Email</label>
              <input type="email" name="email" value={formData.email || ''} onChange={handleChange} required className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none focus:border-accentSky/60" />
            </div>
            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Phone</label>
              <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} required className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none focus:border-accentSky/60" />
            </div>
            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Location</label>
              <input type="text" name="location" value={formData.location || ''} onChange={handleChange} required className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none focus:border-accentSky/60" />
            </div>
          </div>
        </div>

        <Button type="submit" variant="primary" size="lg" loading={saving} icon={FaSave}>
          Save All Profile Changes & Social Links
        </Button>
      </form>
    </div>
  );
};
