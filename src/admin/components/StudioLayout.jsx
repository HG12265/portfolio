import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, FaUser, FaTools, FaFolderOpen, 
  FaGraduationCap, FaCertificate, FaEnvelope, FaFilePdf, 
  FaCog, FaHistory, FaSignOutAlt, FaExternalLinkAlt, FaBars, FaTimes 
} from 'react-icons/fa';
import api from '../services/api';

const navItems = [
  { path: '/studio/dashboard', label: 'Dashboard', icon: FaTachometerAlt },
  { path: '/studio/about', label: 'About & Profile', icon: FaUser },
  { path: '/studio/projects', label: 'Projects Showcase', icon: FaFolderOpen },
  { path: '/studio/skills', label: 'Skills & Tech', icon: FaTools },
  { path: '/studio/education', label: 'Education', icon: FaGraduationCap },
  { path: '/studio/certificates', label: 'Certificates', icon: FaCertificate },
  { path: '/studio/messages', label: 'Contact Messages', icon: FaEnvelope },
  { path: '/studio/resume', label: 'Resume PDF', icon: FaFilePdf },
  { path: '/studio/settings', label: 'SEO & Settings', icon: FaCog },
  { path: '/studio/logs', label: 'Activity Audit Logs', icon: FaHistory },
];

export const StudioLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch {}
    navigate('/studio/login');
  };

  const currentNavItem = navItems.find(n => location.pathname.startsWith(n.path)) || { label: 'Studio' };

  return (
    <div className="min-h-screen bg-bgDark text-textLight flex flex-col font-body">
      {/* Top Fixed Header */}
      <header className="h-16 bg-surfaceDark/80 backdrop-blur-md border-b border-white/10 fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-textMuted hover:text-textLight"
          >
            {mobileOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
          </button>
          
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primaryBlue to-accentSky flex items-center justify-center text-white font-heading font-bold text-sm shadow-md shadow-primaryBlue/20">
              G
            </span>
            <span className="font-heading font-extrabold text-base tracking-tight hidden sm:inline">
              GOWTHAM <span className="text-primaryBlue">STUDIO</span>
            </span>
          </div>

          <div className="h-4 w-px bg-white/10 hidden sm:block mx-2" />

          {/* Breadcrumb */}
          <span className="text-xs font-mono text-textMuted hidden sm:inline">
            Studio / <span className="text-textLight font-semibold">{currentNavItem.label}</span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-textMuted hover:text-textLight hover:border-accentSky/30 transition-all"
          >
            <FaExternalLinkAlt className="w-3 h-3 text-accentSky" />
            <span className="hidden sm:inline">Live Website</span>
          </a>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400 hover:bg-red-500/20 transition-all"
          >
            <FaSignOutAlt className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="flex pt-16 flex-1">
        {/* Left Sidebar (Desktop & Mobile Drawer) */}
        <aside
          className={`fixed top-16 bottom-0 left-0 z-20 w-64 bg-surfaceDark border-r border-white/10 p-4 transition-transform duration-300 overflow-y-auto custom-scrollbar ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="text-[11px] font-mono text-textMuted uppercase tracking-wider mb-3 px-3">
            CMS Management
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium font-body transition-all ${
                    isActive
                      ? 'bg-primaryBlue text-white font-semibold shadow-md shadow-primaryBlue/25 border border-blue-400/30'
                      : 'text-textMuted hover:text-textLight hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-accentSky'}`} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </aside>

        {/* Main Dashboard Content Area */}
        <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
