import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaArrowRight, FaCode, FaCheckCircle } from 'react-icons/fa';
import { developerInfo } from '../../data/developerInfo';
import { Container } from '../common/Container';
import { Button } from '../common/Button';

export const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % developerInfo.roles.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

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
            <span className="text-gradient-blue">{developerInfo.name}</span>
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
                {developerInfo.roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Tagline / Summary Paragraph */}
          <p className="mt-6 text-base sm:text-lg text-textMuted font-body leading-relaxed max-w-2xl">
            {developerInfo.tagline}
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
              href={developerInfo.resumeUrl}
              target="_blank"
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

          {/* Social Quick Links */}
          <div className="mt-10 flex items-center gap-6 pt-6 border-t border-white/10 w-full max-w-lg">
            <span className="text-xs font-mono text-textMuted uppercase tracking-wider">
              Connect:
            </span>
            <div className="flex items-center gap-4">
              <a
                href={developerInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-textMuted hover:text-accentSky transition-colors flex items-center gap-1.5 text-xs font-mono"
              >
                <FaGithub className="w-4 h-4" /> GitHub
              </a>
              <a
                href={developerInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-textMuted hover:text-accentSky transition-colors flex items-center gap-1.5 text-xs font-mono"
              >
                <FaLinkedin className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Profile Image Card & Floating Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-5 flex justify-center relative"
        >
          <div className="relative w-full max-w-md">
            {/* Soft backdrop glow card */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-primaryBlue via-accentSky to-blue-600 opacity-30 blur-xl animate-pulse-glow" />

            {/* Main Image Container */}
            <div className="relative glass-card p-3 rounded-3xl border border-white/15 overflow-hidden">
              <img
                src="/assets/profile.png"
                alt="Gowtham G - Profile"
                className="w-full h-[400px] sm:h-[450px] object-cover object-top rounded-2xl bg-surfaceDark"
                loading="eager"
              />

              {/* Overlay Glass Tag */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel border border-white/15 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold font-heading text-textLight">
                    Gowtham G
                  </h3>
                  <p className="text-xs font-mono text-accentSky">
                    MCA Scholar & Full Stack Dev
                  </p>
                </div>
                <div className="w-9 h-9 rounded-lg bg-primaryBlue/20 border border-primaryBlue/40 flex items-center justify-center text-accentSky">
                  <FaCode className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Floating Metric Pill 1 */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -left-4 px-4 py-2.5 rounded-xl glass-panel border border-white/15 shadow-xl flex items-center gap-3 hidden sm:flex"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <FaCheckCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-mono text-textMuted uppercase">Projects</p>
                <p className="text-xs font-bold font-heading text-textLight">6+ Enterprise Built</p>
              </div>
            </motion.div>

            {/* Floating Metric Pill 2 */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -right-4 px-4 py-2.5 rounded-xl glass-panel border border-white/15 shadow-xl flex items-center gap-3 hidden sm:flex"
            >
              <div className="w-8 h-8 rounded-lg bg-accentSky/20 text-accentSky flex items-center justify-center">
                <FaCode className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-mono text-textMuted uppercase">Specialization</p>
                <p className="text-xs font-bold font-heading text-textLight">React & MERN Stack</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};
