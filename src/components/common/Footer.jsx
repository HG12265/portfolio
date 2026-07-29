import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope, FaArrowUp } from 'react-icons/fa';
import { usePortfolio } from '../../context/PortfolioContext';
import { Container } from './Container';

export const Footer = () => {
  const { about, settings } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-surfaceDark/80 border-t border-white/10 py-12 relative">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand Logo & Copyright */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1">
          <div className="flex items-center gap-2 text-lg font-bold font-heading text-textLight">
            <span className="w-6 h-6 rounded bg-primaryBlue flex items-center justify-center text-white text-xs font-mono">
              G
            </span>
            <span>GOWTHAM <span className="text-primaryBlue">G</span></span>
          </div>
          <p className="text-xs text-textMuted font-body mt-1">
            &copy; {new Date().getFullYear()} Gowtham G. All rights reserved.
          </p>
          <p className="text-[11px] text-textMuted/70 font-mono">
            {settings.footer_text || 'Designed & Developed with React, Tailwind CSS & Vite'}
          </p>
        </div>

        {/* Center: Dynamic Social Icons */}
        <div className="flex items-center gap-3">
          {about.github_url && (
            <a
              href={about.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-textMuted hover:text-textLight hover:border-accentSky/40 hover:bg-accentSky/10 transition-all"
              aria-label="GitHub Profile"
              title="GitHub"
            >
              <FaGithub className="w-4 h-4" />
            </a>
          )}
          {about.linkedin_url && (
            <a
              href={about.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-textMuted hover:text-textLight hover:border-accentSky/40 hover:bg-accentSky/10 transition-all"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
          )}
          {about.twitter_url && (
            <a
              href={about.twitter_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-textMuted hover:text-textLight hover:border-accentSky/40 hover:bg-accentSky/10 transition-all"
              aria-label="Twitter Profile"
              title="Twitter / X"
            >
              <FaTwitter className="w-4 h-4" />
            </a>
          )}
          {about.instagram_url && (
            <a
              href={about.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-textMuted hover:text-textLight hover:border-accentSky/40 hover:bg-accentSky/10 transition-all"
              aria-label="Instagram Profile"
              title="Instagram"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
          )}
          {about.email && (
            <a
              href={`mailto:${about.email}`}
              className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-textMuted hover:text-textLight hover:border-accentSky/40 hover:bg-accentSky/10 transition-all"
              aria-label="Email Gowtham"
              title="Email"
            >
              <FaEnvelope className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Right: Back to Top Button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-mono font-medium text-textMuted hover:text-textLight hover:border-primaryBlue/50 hover:bg-primaryBlue/10 transition-all group"
        >
          <span>Back to top</span>
          <FaArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </Container>
    </footer>
  );
};
