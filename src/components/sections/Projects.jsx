import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaInfoCircle, FaCheck, FaLayerGroup } from 'react-icons/fa';
import { projectsData, projectCategories } from '../../data/projectsData';
import { Section } from '../common/Section';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = projectsData.filter((project) => {
    if (activeCategory === 'All') return true;
    return project.category === activeCategory;
  });

  return (
    <Section id="projects" className="bg-slate-900/40">
      <SectionHeader
        badge="Featured Showcase"
        title="Enterprise-Grade"
        highlightTitle="Projects"
        subtitle="A collection of web applications, academic management portals, and full-stack software built with robust architecture and attention to detail."
      />

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
        {projectCategories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-xs font-mono font-medium transition-all ${
              activeCategory === category
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
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group border border-white/10"
            >
              {/* Card Header & Preview Image */}
              <div>
                <div className="relative overflow-hidden aspect-video bg-surfaceDark">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surfaceDark via-transparent to-transparent opacity-80" />
                  
                  {/* Category Pill Overlay */}
                  <div className="absolute top-3 left-3">
                    <Badge variant="primary" size="xs">
                      {project.category}
                    </Badge>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold font-heading text-textLight group-hover:text-accentSky transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-textMuted mt-1 mb-3">
                    {project.subtitle}
                  </p>
                  <p className="text-xs font-body text-textMuted leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-textMuted"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-textMuted">
                        +{project.tags.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Actions Footer */}
              <div className="px-6 pb-6 pt-2 border-t border-white/5 flex items-center justify-between gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedProject(project)}
                  icon={FaInfoCircle}
                >
                  Details
                </Button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-textMuted hover:text-textLight hover:border-accentSky/40 hover:bg-accentSky/10 transition-all"
                    title="View Source Code"
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-primaryBlue/20 border border-primaryBlue/40 text-accentSky hover:bg-primaryBlue hover:text-white transition-all"
                    title="Live Preview"
                  >
                    <FaExternalLinkAlt className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Detailed Project Modal */}
      {selectedProject && (
        <Modal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          title={selectedProject.title}
          maxWidth="max-w-4xl"
        >
          <div className="space-y-6">
            {/* Modal Image Header */}
            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-surfaceDark">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surfaceDark/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <Badge variant="accent">{selectedProject.category}</Badge>
                <div className="flex gap-2">
                  <Badge variant="default">{selectedProject.role}</Badge>
                  <Badge variant="primary">{selectedProject.duration}</Badge>
                </div>
              </div>
            </div>

            {/* Subtitle & Full Description */}
            <div>
              <h4 className="text-lg font-bold font-heading text-accentSky mb-2">
                Overview & Purpose
              </h4>
              <p className="text-sm text-textMuted leading-relaxed font-body">
                {selectedProject.longDescription}
              </p>
            </div>

            {/* Key Features List */}
            <div>
              <h4 className="text-lg font-bold font-heading text-accentSky mb-3">
                Key System Features
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {selectedProject.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-white/5 border border-white/5">
                    <FaCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-textLight font-body leading-normal">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Architecture Overview */}
            <div>
              <h4 className="text-lg font-bold font-heading text-accentSky mb-2 flex items-center gap-2">
                <FaLayerGroup className="w-4 h-4" /> Architecture & Implementation
              </h4>
              <p className="text-sm text-textMuted leading-relaxed font-body bg-slate-900/60 p-4 rounded-xl border border-white/5 font-mono text-xs">
                {selectedProject.architecture}
              </p>
            </div>

            {/* Complete Tech Tags */}
            <div>
              <h4 className="text-xs font-mono uppercase text-textMuted mb-2">Technologies Used</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tags.map((tag, idx) => (
                  <Badge key={idx} variant="primary" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <Button
                variant="outline"
                href={selectedProject.github}
                target="_blank"
                icon={FaGithub}
              >
                GitHub Repository
              </Button>
              <Button
                variant="primary"
                href={selectedProject.demo}
                target="_blank"
                icon={FaExternalLinkAlt}
                iconPosition="right"
              >
                Live Demo
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </Section>
  );
};
