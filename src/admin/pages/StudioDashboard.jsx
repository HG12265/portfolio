import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaFolderOpen, FaTools, FaCertificate, FaGraduationCap, 
  FaEnvelope, FaPlus, FaArrowRight, FaHistory, FaCheckCircle, FaExclamationCircle 
} from 'react-icons/fa';
import api from '../services/api';

export const StudioDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get('/admin/dashboard/summary');
        if (res.data && res.data.success) {
          setSummary(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load dashboard metrics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-primaryBlue border-t-accentSky rounded-full animate-spin" />
        <span className="text-xs font-mono text-textMuted mt-3">Loading Studio Dashboard...</span>
      </div>
    );
  }

  const cards = [
    { title: 'Total Projects', count: summary?.totalProjects || 0, icon: FaFolderOpen, color: 'text-primaryBlue', bg: 'bg-primaryBlue/10', border: 'border-primaryBlue/20', link: '/studio/projects' },
    { title: 'Total Skills', count: summary?.totalSkills || 0, icon: FaTools, color: 'text-accentSky', bg: 'bg-accentSky/10', border: 'border-accentSky/20', link: '/studio/skills' },
    { title: 'Certificates', count: summary?.totalCertificates || 0, icon: FaCertificate, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', link: '/studio/certificates' },
    { title: 'Education', count: summary?.totalEducation || 0, icon: FaGraduationCap, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', link: '/studio/education' },
    { title: 'Contact Messages', count: summary?.totalMessages || 0, badge: summary?.unreadMessages > 0 ? `${summary.unreadMessages} New` : null, icon: FaEnvelope, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', link: '/studio/messages' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primaryBlue/10 border border-primaryBlue/20 text-xs font-mono text-accentSky mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Studio Control Center Active
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-textLight">
              Welcome back, <span className="text-gradient-blue">Gowtham</span>
            </h1>
            <p className="text-xs sm:text-sm text-textMuted font-body mt-1">
              Your portfolio CMS is synchronized. All 7 website sections are actively managed from here.
            </p>
          </div>

          <NavLink
            to="/studio/projects"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primaryBlue hover:bg-blue-600 text-white font-medium text-xs shadow-lg shadow-primaryBlue/20 transition-all self-start md:self-auto"
          >
            <FaPlus className="w-3 h-3" /> Add New Project
          </NavLink>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <NavLink
              key={idx}
              to={card.link}
              className="glass-card p-5 rounded-xl border border-white/10 hover:border-accentSky/40 transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${card.bg} ${card.border} border flex items-center justify-center ${card.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                {card.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500 text-white animate-pulse">
                    {card.badge}
                  </span>
                )}
              </div>
              <div>
                <span className="text-xs font-mono text-textMuted uppercase block">{card.title}</span>
                <span className="text-2xl font-bold font-heading text-textLight block mt-1">{card.count}</span>
              </div>
            </NavLink>
          );
        })}
      </div>

      {/* Quick Action Grid & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Quick Actions */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card p-6 rounded-2xl border border-white/10">
            <h3 className="text-lg font-bold font-heading text-textLight mb-4 flex items-center gap-2">
              <span>Quick Actions</span>
            </h3>

            <div className="space-y-2.5">
              <NavLink
                to="/studio/about"
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-accentSky/30 hover:bg-accentSky/5 transition-all text-xs font-medium text-textLight group"
              >
                <span>Edit Biography & Objectives</span>
                <FaArrowRight className="w-3 h-3 text-textMuted group-hover:text-accentSky group-hover:translate-x-1 transition-all" />
              </NavLink>

              <NavLink
                to="/studio/skills"
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-accentSky/30 hover:bg-accentSky/5 transition-all text-xs font-medium text-textLight group"
              >
                <span>Manage Skills & Categories</span>
                <FaArrowRight className="w-3 h-3 text-textMuted group-hover:text-accentSky group-hover:translate-x-1 transition-all" />
              </NavLink>

              <NavLink
                to="/studio/messages"
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-accentSky/30 hover:bg-accentSky/5 transition-all text-xs font-medium text-textLight group"
              >
                <span>View Contact Messages Inbox</span>
                <FaArrowRight className="w-3 h-3 text-textMuted group-hover:text-accentSky group-hover:translate-x-1 transition-all" />
              </NavLink>

              <NavLink
                to="/studio/resume"
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-accentSky/30 hover:bg-accentSky/5 transition-all text-xs font-medium text-textLight group"
              >
                <span>Upload / Replace Resume PDF</span>
                <FaArrowRight className="w-3 h-3 text-textMuted group-hover:text-accentSky group-hover:translate-x-1 transition-all" />
              </NavLink>
            </div>
          </div>
        </div>

        {/* Audit Activity Stream */}
        <div className="lg:col-span-7">
          <div className="glass-card p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold font-heading text-textLight flex items-center gap-2">
                <FaHistory className="w-4 h-4 text-accentSky" /> Recent Studio Activity
              </h3>
              <NavLink to="/studio/logs" className="text-xs font-mono text-accentSky hover:underline">
                View All Logs
              </NavLink>
            </div>

            <div className="space-y-3">
              {summary?.recentActivity?.length > 0 ? (
                summary.recentActivity.slice(0, 6).map((log, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-start justify-between gap-3 text-xs font-body">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-primaryBlue/20 text-accentSky uppercase">
                          {log.action}
                        </span>
                        <span className="font-semibold text-textLight">{log.module}</span>
                      </div>
                      <p className="text-textMuted text-xs mt-1">{log.details}</p>
                    </div>
                    <span className="text-[10px] font-mono text-textMuted/70 shrink-0">
                      {new Date(log.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-textMuted font-mono">No recent activity recorded.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
