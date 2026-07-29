import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaEnvelope, FaArrowRight, FaCheckCircle, FaFileDownload } from 'react-icons/fa';
import { usePortfolio } from '../../context/PortfolioContext';
import { Container } from '../common/Container';
import { Button } from '../common/Button';

export const Hero = () => {
  const { about, resumeUrl } = usePortfolio();
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = [
    'Full Stack Developer',
    'React Developer',
    'Backend Developer',
    'MCA Student',
    'Web Application Specialist'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [roles.length]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const profileImageSrc = about.profile_image_url || '/assets/gowtham-profile.png';

  return (
    <section
      id="home"
      className="min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center relative overflow-hidden bg-glow-radial"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primaryBlue/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] rounded-full bg-accentSky/10 blur-[100px] pointer-events-none" />

      <Container className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Headline & Intro */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surfaceDark/80 border border-white/10 text-xs font-mono font-medium text-textMuted mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Available for Roles & Projects</span>
          </div>

          {/* Name & Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading text-textLight">
            Hi, I'm{' '}
            <span className="text-gradient-blue">{about.name || 'GOWTHAM G'}</span>
          </h1>

          {/* Animated Role Rotator */}
          <div className="h-10 sm:h-12 mt-3 flex items-center">
            <span className="text-xl sm:text-2xl font-semibold font-heading text-textMuted mr-2">
              I am a
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="text-xl sm:text-2xl font-bold font-heading text-accentSky border-b-2 border-accentSky/40 pb-0.5"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Tagline / Summary Paragraph */}
          <p className="mt-6 text-base sm:text-lg text-textMuted font-body leading-relaxed max-w-2xl">
            {about.tagline || about.bio || 'Building modern, scalable, and user-centric web applications with clean architecture and intuitive user experiences.'}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToSection('projects')}
              icon={FaArrowRight}
              iconPosition="right"
            >
              View Projects
            </Button>

            <Button
              variant="outline"
              size="lg"
              href={resumeUrl || '/assets/resume-gowtham-g.pdf'}
              target="_blank"
              download="GOWTHAM_G_Resume.pdf"
              icon={FaFileDownload}
            >
              Download Resume
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollToSection('contact')}
            >
              Contact Me
            </Button>
          </div>

          {/* Dynamic Social Media Links */}
          <div className="mt-10 flex flex-wrap items-center gap-6 pt-6 border-t border-white/10 w-full max-w-xl">
            <span className="text-xs font-mono text-textMuted uppercase tracking-wider">
              Connect:
            </span>
            <div className="flex flex-wrap items-center gap-4">
              {about.github_url && (
                <a
                  href={about.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textMuted hover:text-accentSky transition-colors flex items-center gap-1.5 text-xs font-mono"
                >
                  <FaGithub className="w-4 h-4" /> GitHub
                </a>
              )}
              {about.linkedin_url && (
                <a
                  href={about.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textMuted hover:text-accentSky transition-colors flex items-center gap-1.5 text-xs font-mono"
                >
                  <FaLinkedin className="w-4 h-4" /> LinkedIn
                </a>
              )}
              {about.twitter_url && (
                <a
                  href={about.twitter_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textMuted hover:text-accentSky transition-colors flex items-center gap-1.5 text-xs font-mono"
                >
                  <FaTwitter className="w-4 h-4" /> Twitter
                </a>
              )}
              {about.instagram_url && (
                <a
                  href={about.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-textMuted hover:text-accentSky transition-colors flex items-center gap-1.5 text-xs font-mono"
                >
                  <FaInstagram className="w-4 h-4" /> Instagram
                </a>
              )}
              {about.email && (
                <a
                  href={`mailto:${about.email}`}
                  className="text-textMuted hover:text-accentSky transition-colors flex items-center gap-1.5 text-xs font-mono"
                >
                  <FaEnvelope className="w-4 h-4" /> Mail
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Profile Image Card & Floating Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 relative flex justify-center"
        >
          <div className="relative w-full max-w-md">
            {/* Outer Decorative Gradient Border */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-primaryBlue via-accentSky to-primaryBlue opacity-40 blur-md hover:opacity-100 transition duration-1000 animate-pulse" />

            {/* Profile Card Frame */}
            <div className="relative glass-card p-6 sm:p-8 rounded-3xl border border-white/10 bg-surfaceDark/90 backdrop-blur-xl">
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 border border-white/10 group bg-slate-800 flex items-center justify-center">
                <img
                  src={profileImageSrc}
                  alt={about.name || 'GOWTHAM G'}
                  onError={(e) => {
                    e.currentTarget.src = '/assets/profile.png';
                  }}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bgDark/70 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Quick Highlight Pills */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 text-xs font-body text-textLight">
                  <FaCheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>React.js, Node.js & MySQL Specialist</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 text-xs font-body text-textLight">
                  <FaCheckCircle className="w-4 h-4 text-accentSky shrink-0" />
                  <span>Periyar University MCA Student</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
