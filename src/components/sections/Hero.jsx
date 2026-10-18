import React from 'react';
import './HeroSection.css';
import { usePortfolio } from '../../context/PortfolioContext';

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Download = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <path d="M12 3v12m-4-4 4 4 4-4M5 17v3h14v-3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Monitor = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
    <rect x="3" y="5" width="18" height="15" rx="2" />
    <path d="M3 10h18M9 20v-3m6 3v-3" />
  </svg>
);

const Cap = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 3 2 9l10 6 10-6-10-6Zm-6 9v5c3 3 9 3 12 0v-5M22 9v7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="m5 12 4 4L19 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Email = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

const GitHub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.18-3.37-1.18-.45-1.15-1.1-1.46-1.1-1.46-.9-.61.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.33 1.08 2.9.82.1-.64.35-1.08.64-1.33-2.22-.25-4.55-1.1-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.52 9.52 0 0 1 12 6.2c.85 0 1.7.11 2.5.34 1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.69-4.57 4.93.36.32.68.95.68 1.93v2.87c0 .26.18.57.69.48A10 10 0 0 0 12 2Z" />
  </svg>
);

const LinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M5 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4ZM3.5 9h3V21h-3V9Zm6 0h2.9v1.64h.04A3.18 3.18 0 0 1 15.3 8.9c3.06 0 3.63 2 3.63 4.6V21h-3v-6.65c0-1.59-.03-3.64-2.22-3.64-2.22 0-2.56 1.73-2.56 3.52V21h-3V9Z" />
  </svg>
);

export const Hero = () => {
  const { about, resumeUrl } = usePortfolio();

  const portrait = about?.profile_image_url || '/assets/gowtham-profile.jpg';
  const email = about?.email || 'itsgowtham.dev@gmail.com';
  const githubUrl = about?.github_url || 'https://github.com/gowthamg-dev';
  const linkedinUrl = about?.linkedin_url || 'https://linkedin.com/in/gowthamg-dev';
  const currentResumePath = resumeUrl || '/assets/resume-gowtham-g.pdf';
  const contactHref = `mailto:${email}`;

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <section className="gh-hero" id="home">
      <section className="hero-main" aria-labelledby="hero-title">
        <div className="hero-content">

          <p className="eyebrow">FULL-STACK WEB DEVELOPER · MCA '27</p>
          <h1 className="hero-title" id="hero-title">
            Hi, I'm <span className="gradient">Gowtham G</span>
          </h1>
          <h2 className="hero-role">
            I build <strong>practical, scalable</strong> web applications.
          </h2>
          <p className="hero-summary">
            I develop responsive web experiences using React, Node.js and MySQL — with hands-on experience building academic portals and management systems for real-world use.
          </p>
          <div className="hero-tech" aria-label="Core technologies">
            {['React.js', 'Node.js', 'Express.js', 'MySQL'].map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <div className="hero-actions">
            <a
              className="hero-cta main"
              href="#projects"
              onClick={(e) => scrollToSection(e, 'projects')}
            >
              <span className="cta-long">Explore My Projects</span>
              <span className="cta-short">View Projects</span>
              <Arrow />
            </a>
            {currentResumePath && (
              <a
                className="hero-cta alt"
                href={currentResumePath}
                target="_blank"
                rel="noopener noreferrer"
                download="GOWTHAM_G_Resume.pdf"
              >
                <Download />
                <span className="cta-long">Download Resume</span>
                <span className="cta-short">Resume</span>
              </a>
            )}
            <a
              className="hero-cta text-only"
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
            >
              Contact Me ↗
            </a>
          </div>
          <div className="hero-proof">
            <div className="hero-proof-mark">
              <Monitor />
            </div>
            <div>
              <strong>Hands-on academic software development</strong>
              <span>University web portals · Examination systems · Management platforms</span>
            </div>
          </div>
        </div>
        <div className="hero-photo-area">
          <div className="photo-glow" />
          <div className="photo-frame">
            <img
              src={portrait}
              alt="Gowtham G in professional attire"
              width="485"
              height="489"
              decoding="async"
              fetchPriority="high"
              onError={(e) => {
                e.currentTarget.src = '/assets/gowtham-profile.jpg';
              }}
            />
            <div className="photo-corner">
              <span className="photo-corner-icon">
                <Cap />
              </span>
              MCA · Class of 2027
            </div>
            <div className="photo-bottom">
              <div>
                <strong>Web applications with real purpose.</strong>
                <small>Based in Salem, Tamil Nadu, India</small>
              </div>
              <span className="mca-chip">PERIYAR UNIVERSITY</span>
            </div>
          </div>
          <div className="photo-float">
            <div className="photo-float-icon">
              <Check />
            </div>
            <div>
              <strong>Real-world project work</strong>
              <span>Academic portals &amp; applications</span>
            </div>
          </div>
        </div>
      </section>
      <div className="quick-connect" aria-label="Contact links">
        <span className="small-label">CONNECT</span>
        <a href={contactHref}>
          <Email /> Email
        </a>
        {githubUrl && (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer">
            <GitHub /> GitHub
          </a>
        )}
        {linkedinUrl && (
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
            <LinkedIn /> LinkedIn
          </a>
        )}
      </div>
    </section>
  );
};

export default Hero;
