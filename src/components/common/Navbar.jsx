import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaFileDownload, FaPaperPlane } from 'react-icons/fa';
import { usePortfolio } from '../../context/PortfolioContext';
import { Container } from './Container';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar = ({ activeSection, onSelectSection }) => {
  const { resumeUrl } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (onSelectSection) {
      onSelectSection(id);
    }
    setMobileMenuOpen(false);
    setTimeout(() => {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -75;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
    }, 40);
  };

  const currentResumePath = resumeUrl || '/assets/resume-gowtham-g.pdf';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 py-3.5 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <Container className="flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          className="group flex items-center gap-2.5 text-lg font-extrabold font-heading tracking-tight select-none"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-blue-600 flex items-center justify-center text-white font-mono text-sm shadow-sm group-hover:scale-105 transition-transform">
            G
          </span>
          <span className="font-heading">
            <span className="text-slate-900 font-extrabold">GOWTHAM</span>{' '}
            <span className="text-indigo-600 font-extrabold">G</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-full border border-slate-200/80 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-colors ${
                  isActive ? 'text-white font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-indigo-600 rounded-full -z-10 shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={currentResumePath}
            target="_blank"
            rel="noopener noreferrer"
            download="GOWTHAM_G_Resume.pdf"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-indigo-300 text-xs font-mono font-medium text-slate-700 hover:text-indigo-600 shadow-sm transition-all"
          >
            <FaFileDownload className="w-3 h-3 text-slate-700" />
            <span>Resume</span>
          </a>

          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-xs font-mono font-semibold text-white shadow-sm shadow-indigo-600/20 transition-all"
          >
            <span>↗ Let's Talk</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl bg-white border border-slate-200 text-slate-800 shadow-sm focus:outline-none active:scale-95 transition-transform"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
        </button>
      </Container>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden bg-white/98 border-b border-slate-200 backdrop-blur-2xl overflow-hidden shadow-xl"
          >
            <Container className="py-5 flex flex-col space-y-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-mono transition-all flex items-center justify-between active:bg-slate-100 ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                    )}
                  </button>
                );
              })}

              <div className="pt-4 border-t border-slate-200 flex flex-col gap-2.5">
                <a
                  href={currentResumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="GOWTHAM_G_Resume.pdf"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white border border-slate-200 text-xs font-mono text-slate-800 active:scale-98 transition-transform shadow-sm"
                >
                  <FaFileDownload className="w-3.5 h-3.5 text-indigo-600" /> Download Resume
                </a>

                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-indigo-600 text-xs font-mono font-bold text-white shadow-sm shadow-indigo-600/30 active:scale-98 transition-transform"
                >
                  <FaPaperPlane className="w-3.5 h-3.5" /> Get in Touch
                </button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
