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

export const Navbar = ({ activeSection }) => {
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
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 100);
  };

  const currentResumePath = resumeUrl || '/assets/resume-gowtham-g.pdf';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-bgDark/95 backdrop-blur-md border-b border-white/10 py-3.5 shadow-xl'
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
          <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primaryBlue to-accentSky flex items-center justify-center text-white font-mono text-sm shadow-md shadow-primaryBlue/20 group-hover:scale-105 transition-transform">
            G
          </span>
          <span className="font-heading">
            <span className="text-textLight font-extrabold">GOWTHAM</span>{' '}
            <span className="text-primaryBlue font-extrabold">G</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-surfaceDark/70 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-mono font-medium transition-colors ${
                  isActive ? 'text-white font-semibold' : 'text-textMuted hover:text-textLight'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primaryBlue rounded-full -z-10 shadow-sm"
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
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surfaceDark border border-white/10 hover:border-accentSky/40 text-xs font-mono font-medium text-textLight hover:text-accentSky transition-all"
          >
            <FaFileDownload className="w-3.5 h-3.5 text-accentSky" />
            <span>Resume</span>
          </a>

          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primaryBlue hover:bg-blue-600 text-xs font-mono font-semibold text-white shadow-md shadow-primaryBlue/25 transition-all"
          >
            <FaPaperPlane className="w-3 h-3" />
            <span>Hire Me</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl bg-surfaceDark border border-white/10 text-textLight focus:outline-none active:scale-95 transition-transform"
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
            className="lg:hidden bg-bgDark/98 border-b border-white/10 backdrop-blur-2xl overflow-hidden shadow-2xl"
          >
            <Container className="py-5 flex flex-col space-y-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`text-left px-4 py-3 rounded-xl text-sm font-mono transition-all flex items-center justify-between active:bg-white/10 ${
                      isActive
                        ? 'bg-primaryBlue/20 text-accentSky border border-primaryBlue/40 font-bold'
                        : 'text-textMuted hover:text-textLight hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-accentSky animate-pulse" />
                    )}
                  </button>
                );
              })}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                <a
                  href={currentResumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="GOWTHAM_G_Resume.pdf"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-surfaceDark border border-white/10 text-xs font-mono text-textLight active:scale-98 transition-transform"
                >
                  <FaFileDownload className="w-3.5 h-3.5 text-accentSky" /> Download Resume
                </a>

                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primaryBlue text-xs font-mono font-bold text-white shadow-lg shadow-primaryBlue/30 active:scale-98 transition-transform"
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
