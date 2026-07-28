import React, { useState, useEffect } from 'react';
import { FaSave, FaCog, FaSearch, FaCheckCircle } from 'react-icons/fa';
import api from '../services/api';
import { Button } from '../../components/common/Button';

export const ManageSettings = () => {
  const [settings, setSettings] = useState({
    site_title: '',
    logo_text: '',
    seo_description: '',
    seo_keywords: '',
    footer_text: '',
    analytics_id: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/admin/settings');
        if (res.data && res.data.data) {
          setSettings(res.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch settings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await api.put('/admin/settings', settings);
      if (res.data && res.data.success) {
        setStatus({ type: 'success', message: 'SEO Metadata & Site Configuration updated successfully!' });
      }
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to update settings.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-textLight">Website Settings & SEO Configuration</h1>
        <p className="text-xs font-body text-textMuted mt-0.5">
          Configure site title, logo branding, SEO descriptions, meta keywords, and footer text.
        </p>
      </div>

      {status.message && (
        <div className={`p-4 rounded-xl text-xs font-body ${status.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Branding Settings */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-base font-bold font-heading text-accentSky mb-2">Brand & Navbar Settings</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Website Title Tag</label>
              <input type="text" name="site_title" value={settings.site_title || ''} onChange={handleChange} required className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
            </div>

            <div>
              <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Navbar Brand Text</label>
              <input type="text" name="logo_text" value={settings.logo_text || ''} onChange={handleChange} required className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
            </div>
          </div>
        </div>

        {/* SEO Metadata */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-base font-bold font-heading text-accentSky mb-2">SEO Meta Configuration</h3>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Meta Description</label>
            <textarea name="seo_description" rows="3" value={settings.seo_description || ''} onChange={handleChange} required className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight resize-none" />
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Meta Keywords (comma separated)</label>
            <input type="text" name="seo_keywords" value={settings.seo_keywords || ''} onChange={handleChange} className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Footer Text Notice</label>
            <input type="text" name="footer_text" value={settings.footer_text || ''} onChange={handleChange} className="w-full px-3.5 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight" />
          </div>
        </div>

        <Button type="submit" variant="primary" size="lg" loading={saving} icon={FaSave}>
          Save Settings
        </Button>
      </form>
    </div>
  );
};
