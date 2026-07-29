import React, { useState, useEffect } from 'react';
import { FaSave, FaCheckCircle, FaPlus, FaTimes, FaCamera, FaCloudUploadAlt, FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope, FaImage } from 'react-icons/fa';
import api from '../services/api';
import { Button } from '../../components/common/Button';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

const formatImageUrl = (url) => {
  if (!url) return '/assets/gowtham-profile.png';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:image')) return url;
  if (url.startsWith('/uploads')) return `${API_BASE_URL}${url}`;
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
    github_url: 'https://github.com/hg12265',
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
    Object.keys(formData).forEach((key) => {
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
        setStatus({ type: 'success', message: 'Profile details & Photo updated successfully!' });
        if (res.data.data && res.data.data.profile_image_url) {
          setFormData(res.data.data);
          setPreviewUrl(formatImageUrl(res.data.data.profile_image_url));
        }
      }
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to update profile.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-textMuted font-mono text-xs">
        Loading About & Profile details...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-textLight">Manage Profile & Bio</h1>
          <p className="text-xs font-body text-textMuted mt-0.5">
            Update your homepage Hero title, bio, profile photo, social media links, and technical tags.
          </p>
        </div>
        <Button variant="primary" size="md" onClick={handleSubmit} loading={saving} icon={FaSave}>
          Save All Profile Changes
        </Button>
      </div>

      {status.message && (
        <div
          className={`p-4 rounded-xl text-xs font-body flex items-center gap-2.5 ${
            status.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}
        >
          <FaCheckCircle className="w-4 h-4 shrink-0" />
          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Top Card: Profile Photo & Basic Identity */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Avatar Preview & Upload */}
          <div className="md:col-span-4 flex flex-col items-center text-center">
            <div className="relative group w-36 h-36 rounded-full overflow-hidden border-2 border-accentSky/40 p-1 bg-surfaceDark shadow-xl mb-4">
              <img
                src={previewUrl || formatImageUrl(formData.profile_image_url)}
                alt={formData.name}
                onError={(e) => { e.currentTarget.src = '/assets/gowtham-profile.png'; }}
                className="w-full h-full object-cover rounded-full group-hover:opacity-80 transition-opacity"
              />
              <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
                <FaCamera className="w-6 h-6 mb-1 text-accentSky" />
                <span className="text-[10px] font-mono font-semibold uppercase">Change Photo</span>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            </div>

            <p className="text-[11px] font-mono text-textMuted mb-2">
              Upload a custom profile photo or paste Image URL below
            </p>

            <div className="w-full">
              <label className="block text-[10px] font-mono text-textMuted mb-1 text-left uppercase">Direct Image URL</label>
              <input
                type="text"
                name="profile_image_url"
                value={formData.profile_image_url || ''}
                onChange={(e) => {
                  handleChange(e);
                  setPreviewUrl(formatImageUrl(e.target.value));
                }}
                placeholder="https://example.com/photo.png or /assets/..."
                className="w-full px-3 py-1.5 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight focus:outline-none focus:border-accentSky/60 font-mono"
              />
            </div>
          </div>

          {/* Identity Fields */}
          <div className="md:col-span-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceDark border border-white/10 text-xs text-textLight font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceDark border border-white/10 text-xs text-textLight"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Hero Subtitle / Developer Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Full Stack Developer | React & Backend Specialist"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceDark border border-white/10 text-xs text-textLight font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Tagline / Short Summary</label>
              <textarea
                name="tagline"
                rows="2"
                value={formData.tagline}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceDark border border-white/10 text-xs text-textLight resize-none"
              />
            </div>
          </div>
        </div>

        {/* Social Media Profiles & Links */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-base font-bold font-heading text-textLight border-b border-white/10 pb-2">
            Social Media Profiles & Links
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase flex items-center gap-1.5">
                <FaGithub className="text-textMuted" /> GitHub URL
              </label>
              <input
                type="text"
                name="github_url"
                value={formData.github_url || ''}
                onChange={handleChange}
                placeholder="https://github.com/hg12265"
                className="w-full px-3.5 py-2 rounded-xl bg-surfaceDark border border-white/10 text-xs text-textLight font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase flex items-center gap-1.5">
                <FaLinkedin className="text-sky-400" /> LinkedIn URL
              </label>
              <input
                type="text"
                name="linkedin_url"
                value={formData.linkedin_url || ''}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/gowthamg-dev"
                className="w-full px-3.5 py-2 rounded-xl bg-surfaceDark border border-white/10 text-xs text-textLight font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase flex items-center gap-1.5">
                <FaTwitter className="text-sky-400" /> Twitter / X URL
              </label>
              <input
                type="text"
                name="twitter_url"
                value={formData.twitter_url || ''}
                onChange={handleChange}
                placeholder="https://twitter.com/gowthamg_dev"
                className="w-full px-3.5 py-2 rounded-xl bg-surfaceDark border border-white/10 text-xs text-textLight font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase flex items-center gap-1.5">
                <FaInstagram className="text-pink-400" /> Instagram URL
              </label>
              <input
                type="text"
                name="instagram_url"
                value={formData.instagram_url || ''}
                onChange={handleChange}
                placeholder="https://instagram.com/gowthamg_dev"
                className="w-full px-3.5 py-2 rounded-xl bg-surfaceDark border border-white/10 text-xs text-textLight font-mono"
              />
            </div>
          </div>
        </div>

        {/* Biography & Career Objective */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-base font-bold font-heading text-textLight border-b border-white/10 pb-2">
            Biography & Objectives
          </h3>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Full Biography (About Section) *</label>
            <textarea
              name="bio"
              rows="4"
              value={formData.bio}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceDark border border-white/10 text-xs text-textLight resize-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Career Objective *</label>
            <textarea
              name="career_objective"
              rows="3"
              value={formData.career_objective}
              onChange={handleChange}
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceDark border border-white/10 text-xs text-textLight resize-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Department Leadership Experience</label>
            <textarea
              name="leadership_text"
              rows="3"
              value={formData.leadership_text}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surfaceDark border border-white/10 text-xs text-textLight resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Bottom Save Action */}
        <div className="flex justify-end pt-4">
          <Button type="submit" variant="primary" size="lg" loading={saving} icon={FaSave}>
            Save All Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
};
