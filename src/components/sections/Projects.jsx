import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaInfoCircle, FaCheck, FaUniversity, FaRocket } from 'react-icons/fa';
import { usePortfolio } from '../../context/PortfolioContext';
import { Section } from '../common/Section';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

export const Projects = () => {
  const { projects } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    'All',
    'Production',
    'Web Applications',
    'Examination Systems',
    'Academic Management',
    'HealthTech'
  ];

  const isProjectProduction = (project) => {
    return (
      project.status === 'Production' ||
      project.is_production === true ||
      project.is_production === 1 ||
      project.category === 'Production Website' ||
      (project.demo_url && project.demo_url.includes('periyaruniversity')) ||
      (project.duration && String(project.duration).toLowerCase().includes('production'))
    );
  };

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Production') {
      return isProjectProduction(project);
    }
    return project.category === activeCategory;
  });

  return (
    <Section id="projects" className="bg-slate-900/40">
      <SectionHeader
        badge="Featured Production Systems"
        title="Real-World Production"
        highlightTitle="Projects"
        subtitle="Live, deployed software systems actively used across university departments, online examination portals, and health technology platforms."
      />

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all ${activeCategory === category
                ? 'bg-primaryBlue text-white shadow-md shadow-primaryBlue/25 border border-blue-400/40'
                : 'bg-surfaceDark text-textMuted hover:text-textLight hover:bg-white/5 border border-white/10'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredProjects.map((project, index) => {
            const isProd = isProjectProduction(project);
            const isUni = project.demo_url && project.demo_url.includes('periyaruniversity');

            return (
              <motion.div
                key={project.id || index}
                layout
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                viewport={{ once: true }}
                transition={{ duration: 0.25 }}
                className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group border border-white/10 hover:border-accentSky/40 transition-all duration-300 shadow-xl"
              >
                {/* Card Header & Preview Image */}
                <div>
                  <div className="relative aspect-video overflow-hidden bg-surfaceDark">
                    <img
                      src={project.image_url || project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bgDark/90 via-bgDark/20 to-transparent opacity-90" />

                    {/* Status & Production Badges (Top Right) */}
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
                      {isProd && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/90 text-white text-[10px] font-mono font-bold shadow-lg shadow-emerald-500/30 backdrop-blur-md border border-emerald-400/40">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          Production
                        </span>
                      )}

                      {isUni && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-primaryBlue/90 text-white text-[10px] font-mono font-semibold backdrop-blur-md border border-blue-400/30">
                          <FaUniversity className="w-3 h-3 text-sky-300" /> Periyar Univ
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="text-[11px] font-mono text-accentSky uppercase tracking-wider block mb-1">
                      {project.category}
                    </span>
                    <h3 className="text-lg font-bold font-heading text-textLight group-hover:text-accentSky transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-textMuted font-body leading-relaxed line-clamp-3 mt-2.5">
                      {project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {(project.tags || []).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-white/5 border border-white/10 text-textMuted font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Actions Footer */}
                <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-mono text-accentSky hover:underline flex items-center gap-1.5"
                  >
                    <FaInfoCircle className="w-3.5 h-3.5" /> Key Highlights
                  </button>

                  <div className="flex items-center gap-2">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-textMuted hover:text-textLight border border-white/10 transition-colors"
                        title="GitHub Repository"
                      >
                        <FaGithub className="w-4 h-4" />
                      </a>
                    )}

                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primaryBlue hover:bg-blue-600 text-white text-xs font-mono font-semibold shadow-md shadow-primaryBlue/25 transition-all"
                        title="Live System Demo"
                      >
                        <span>Live Site</span>
                        <FaExternalLinkAlt className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Interactive Project Details Modal */}
      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject.title}
          maxWidth="max-w-3xl"
        >
          <div className="space-y-6">
            <div className="aspect-video rounded-xl overflow-hidden bg-surfaceDark border border-white/10 relative">
              <img
                src={selectedProject.image_url || selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <span className="px-3 py-1 rounded-md bg-emerald-500 text-white text-xs font-mono font-bold">
                  🟢 Production Live System
                </span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-4 mb-2">
                <span className="text-xs font-mono text-accentSky uppercase tracking-wider">
                  {selectedProject.category} &bull; {selectedProject.role || 'Lead Full Stack Developer'}
                </span>
                <span className="text-xs font-mono text-textMuted">
                  {selectedProject.institution || selectedProject.duration}
                </span>
              </div>
              <p className="text-sm font-body text-textMuted leading-relaxed">
                {selectedProject.long_description || selectedProject.description}
              </p>
            </div>

            {selectedProject.features && (
              <div>
                <h4 className="text-xs font-mono uppercase text-accentSky tracking-wider mb-3 flex items-center gap-1.5">
                  <FaRocket className="w-3.5 h-3.5 text-accentSky" /> Key Highlights & Production Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(selectedProject.features || []).map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5">
                      <FaCheck className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                      <span className="text-xs font-body text-textLight">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedProject.architecture && (
              <div>
                <h4 className="text-xs font-mono uppercase text-textMuted tracking-wider mb-2">
                  System Architecture & Stack Details
                </h4>
                <p className="text-xs font-body text-textMuted leading-relaxed bg-surfaceDark p-4 rounded-xl border border-white/10 font-mono">
                  {selectedProject.architecture}
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              {selectedProject.github_url && (
                <Button variant="outline" size="sm" href={selectedProject.github_url} target="_blank" icon={FaGithub}>
                  Repository
                </Button>
              )}
              {selectedProject.demo_url && (
                <Button variant="primary" size="sm" href={selectedProject.demo_url} target="_blank" icon={FaExternalLinkAlt}>
                  Open Live Website
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </Section>
  );
};
