import React, { useState, useEffect } from 'react';
import { FaFilePdf, FaCloudUploadAlt, FaDownload, FaCheckCircle, FaTrash } from 'react-icons/fa';
import api from '../services/api';
import { Button } from '../../components/common/Button';

export const ManageResume = () => {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });

  const fetchResume = async () => {
    try {
      const res = await api.get('/admin/resume');
      if (res.data && res.data.data) {
        setResume(res.data.data);
      }
    } catch (err) {
      console.error('Failed to fetch resume:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setUploading(true);
    setStatus({ type: '', message: '' });

    const payload = new FormData();
    payload.append('resume', selectedFile);

    try {
      const res = await api.post('/admin/resume/upload', payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data && res.data.success) {
        setStatus({ type: 'success', message: 'New resume PDF uploaded and activated successfully!' });
        setSelectedFile(null);
        fetchResume();
      }
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Failed to upload resume PDF.' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-textLight">Manage Resume PDF</h1>
        <p className="text-xs font-body text-textMuted mt-0.5">
          Upload, replace, or preview your active downloadable PDF resume.
        </p>
      </div>

      {status.message && (
        <div className={`p-4 rounded-xl text-xs font-body ${status.type === 'success' ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border border-red-500/20 text-red-400'}`}>
          {status.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Active Resume Details */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primaryBlue/10 border border-primaryBlue/20 flex items-center justify-center text-accentSky">
              <FaFilePdf className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold font-heading text-textLight">Active Public Resume</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 font-bold">Active</span>
              </div>
              <p className="text-xs font-mono text-textMuted mt-0.5">{resume?.file_name || 'resume-gowtham-g.pdf'}</p>
            </div>
          </div>

          <p className="text-xs text-textMuted leading-relaxed">
            This PDF document is served directly when visitors click "Download Resume" in the Hero section or Navbar.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <Button variant="primary" size="md" href={resume?.file_url || '/assets/resume-gowtham-g.pdf'} target="_blank" icon={FaDownload}>
              View / Download Active PDF
            </Button>
          </div>
        </div>

        {/* Right: Upload / Replace Dropzone */}
        <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-base font-bold font-heading text-accentSky flex items-center gap-2">
            <FaCloudUploadAlt className="w-5 h-5" /> Upload / Replace Resume
          </h3>

          <form onSubmit={handleUpload} className="space-y-4">
            <div className="border-2 border-dashed border-white/15 rounded-xl p-6 text-center hover:border-accentSky/50 transition-colors cursor-pointer bg-white/5">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="hidden"
                id="resumeFileInput"
              />
              <label htmlFor="resumeFileInput" className="cursor-pointer flex flex-col items-center gap-2">
                <FaFilePdf className="w-8 h-8 text-accentSky" />
                <span className="text-xs font-semibold text-textLight">
                  {selectedFile ? selectedFile.name : 'Click to browse PDF resume'}
                </span>
                <span className="text-[11px] font-mono text-textMuted">PDF format only (Max 10 MB)</span>
              </label>
            </div>

            <Button type="submit" variant="accent" size="md" loading={uploading} disabled={!selectedFile} icon={FaCloudUploadAlt} className="w-full">
              Upload & Activate PDF
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
