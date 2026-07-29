import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import { PortfolioProvider } from '../context/PortfolioContext';

// Common Components
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { ScrollProgress } from '../components/common/ScrollProgress';
import { LoadingScreen } from '../components/common/LoadingScreen';
import { CursorFollower } from '../components/common/CursorFollower';
import { ErrorBoundary } from '../components/common/ErrorBoundary';

// Section Components
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Projects } from '../components/sections/Projects';
import { Skills } from '../components/sections/Skills';
import { Education } from '../components/sections/Education';
import { Certificates } from '../components/sections/Certificates';
import { Contact } from '../components/sections/Contact';

export const PublicPortfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [isLoading]);

  return (
    <ErrorBoundary>
      <PortfolioProvider>
        <div className="relative bg-bgDark text-textLight min-h-screen font-body selection:bg-primaryBlue selection:text-white">
          <AnimatePresence>
            {isLoading && <LoadingScreen key="loader" />}
          </AnimatePresence>

          <ScrollProgress />
          <CursorFollower />

          <Navbar activeSection={activeSection} />

          <main id="main-content">
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Education />
            <Certificates />
            <Contact />
          </main>

          <Footer />
        </div>
      </PortfolioProvider>
    </ErrorBoundary>
  );
};
