import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaLock, FaUser, FaShieldAlt } from 'react-icons/fa';
import api from '../services/api';
import { Button } from '../../components/common/Button';

export const StudioLogin = () => {
  const [username, setUsername] = useState('gowtham_admin');
  const [password, setPassword] = useState('Admin@Gowtham2026');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/auth/login', { username, password });
      if (res.data && res.data.success) {
        if (res.data.token) {
          localStorage.setItem('studio_token', res.data.token);
        }
        navigate('/studio/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bgDark flex items-center justify-center p-4 relative overflow-hidden bg-glow-radial">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primaryBlue/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md glass-card p-8 rounded-2xl border border-white/10 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primaryBlue to-accentSky flex items-center justify-center text-white font-heading font-extrabold text-2xl shadow-lg shadow-primaryBlue/30 mb-4">
            G
          </div>
          <h1 className="text-2xl font-bold font-heading text-textLight">
            GOWTHAM <span className="text-primaryBlue">STUDIO</span>
          </h1>
          <p className="text-xs font-mono text-textMuted mt-1">
            Portfolio Management & CMS Control Panel
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-body text-red-400 mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Username / Email</label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-surfaceDark border border-white/10 text-xs font-body text-textLight focus:outline-none focus:border-accentSky/60"
              />
              <FaUser className="w-3.5 h-3.5 text-textMuted absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-textMuted mb-1 uppercase">Master Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-surfaceDark border border-white/10 text-xs font-body text-textLight focus:outline-none focus:border-accentSky/60"
              />
              <FaLock className="w-3.5 h-3.5 text-textMuted absolute left-3.5 top-3.5" />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            icon={FaShieldAlt}
            className="w-full mt-2"
          >
            Authenticate & Access Studio
          </Button>
        </form>

        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-[11px] font-mono text-textMuted">
            Protected Admin Route &bull; JWT Token Encrypted
          </p>
        </div>
      </motion.div>
    </div>
  );
};
