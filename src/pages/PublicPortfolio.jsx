import React, { useState, useEffect, useRef } from 'react';
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

const SECTION_IDS = ['home', 'about', 'projects', 'skills', 'education', 'certificates', 'contact'];

export const PublicPortfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const handleSelectSection = (id) => {
    setActiveSection(id);
    isProgrammaticScrollRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 850);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (isProgrammaticScrollRef.current) return;
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        if (isProgrammaticScrollRef.current) return;

        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // 1. Top of page
        if (scrollY < 120) {
          setActiveSection('home');
          return;
        }

        // 2. Near bottom of page (reaches Contact)
        if (windowHeight + scrollY >= documentHeight - 60) {
          setActiveSection('contact');
          return;
        }

        // 3. Active section passing the offset line (160px from top)
        const offset = 160;
        let currentSection = null;

        for (const id of SECTION_IDS) {
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom > offset) {
            currentSection = id;
            break;
          }
        }

        // Fallback: section whose top is closest to the offset line
        if (!currentSection) {
          let closestDist = -Infinity;
          for (const id of SECTION_IDS) {
            const el = document.getElementById(id);
            if (!el) continue;
            const rect = el.getBoundingClientRect();
            if (rect.top <= offset && rect.top > closestDist) {
              closestDist = rect.top;
              currentSection = id;
            }
          }
        }

        if (currentSection) {
          setActiveSection(currentSection);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [isLoading]);

  return (
    <ErrorBoundary>
      <PortfolioProvider>
        <div className="relative bg-slate-50 text-slate-800 min-h-screen font-body selection:bg-indigo-600 selection:text-white">
          <AnimatePresence>
            {isLoading && <LoadingScreen key="loader" />}
          </AnimatePresence>

          <ScrollProgress />
          <CursorFollower />

          <Navbar activeSection={activeSection} onSelectSection={handleSelectSection} />

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
