import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { usePortfolio } from '../../context/PortfolioContext';
import { Section } from '../common/Section';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';

export const Skills = () => {
  const { skills } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const skillCategories = [
    { id: 'all', name: 'All Stack' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'programming', name: 'Programming' },
    { id: 'database', name: 'Database' },
    { id: 'hosting', name: 'Hosting & Deployment' },
    { id: 'tools', name: 'Tools' },
  ];

  const filteredSkills = skills.filter((skill) => {
    if (skill.enabled === false) return false;
    const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (skill.description && skill.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <Section id="skills" className="bg-white">
      <SectionHeader
        badge="Technical Expertise"
        title="Skills & Technology"
        highlightTitle="Stack"
        subtitle="Core technical competencies, frameworks, databases, cloud hosting platforms, and development tools I utilize to build modern web applications."
      />

      {/* Category Tabs & Search Input */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-2 md:pb-0 custom-scrollbar">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-sm border border-indigo-600'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 shadow-sm'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-lg bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 font-body transition-colors shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
            >
              <FaTimes className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.id || index}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white p-5 rounded-xl border border-slate-200/90 hover:border-indigo-300 transition-all duration-300 group flex flex-col justify-between shadow-sm hover:shadow-lg hover:shadow-slate-200/60"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full shrink-0 shadow-sm"
                      style={{ backgroundColor: skill.color || '#4F46E5' }}
                    />
                    <h3 className="text-base font-bold font-heading text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {skill.name}
                    </h3>
                  </div>
                  <Badge variant={skill.proficiency === 'Advanced' ? 'primary' : 'default'} size="xs">
                    {skill.proficiency || 'Advanced'}
                  </Badge>
                </div>
                <p className="text-slate-600 text-xs font-body leading-relaxed line-clamp-2">
                  {skill.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-indigo-600 font-semibold tracking-wider">
                  {skill.category}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Section>
  );
};
