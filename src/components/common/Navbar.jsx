import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaFileDownload, FaPaperPlane } from 'react-icons/fa';
import { developerInfo } from '../../data/developerInfo';
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
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-bgDark/80 backdrop-blur-md border-b border-white/10 py-3.5 shadow-xl'
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
            <span className="text-textLight">GOWTHAM</span> <span className="text-primaryBlue">G</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-surfaceDark/60 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium font-body transition-colors ${
                  isActive
                    ? 'text-textLight font-semibold'
                    : 'text-textMuted hover:text-textLight'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavBg"
                    className="absolute inset-0 bg-primaryBlue/80 rounded-full -z-10 shadow-sm shadow-primaryBlue/30"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={developerInfo.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium font-body text-textMuted border border-white/10 hover:border-accentSky/40 hover:text-textLight transition-all"
          >
            <FaFileDownload className="w-3 h-3 text-accentSky" />
            Resume
          </a>
          <button
            onClick={() => scrollToSection('contact')}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium font-body bg-primaryBlue hover:bg-blue-600 text-white shadow-md shadow-primaryBlue/20 transition-all hover:scale-105"
          >
            <FaPaperPlane className="w-3 h-3" />
            Contact
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-lg text-textMuted hover:text-textLight hover:bg-white/5 transition-colors focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
        </button>
      </Container>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-surfaceDark/95 border-b border-white/10 backdrop-blur-xl overflow-hidden"
          >
            <Container className="py-6 flex flex-col gap-3">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium font-body transition-colors ${
                      isActive
                        ? 'bg-primaryBlue/20 text-accentSky border border-primaryBlue/30'
                        : 'text-textMuted hover:text-textLight hover:bg-white/5'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-2 h-2 rounded-full bg-accentSky" />}
                  </button>
                );
              })}

              <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                <a
                  href={developerInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium border border-white/10 text-textLight hover:bg-white/5"
                >
                  <FaFileDownload className="w-4 h-4 text-accentSky" />
                  Download Resume
                </a>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium bg-primaryBlue text-white shadow-md shadow-primaryBlue/20"
                >
                  <FaPaperPlane className="w-4 h-4" />
                  Get in Touch
                </button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
