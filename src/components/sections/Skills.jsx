import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { skillsData, skillCategories } from '../../data/skillsData';
import { Section } from '../common/Section';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkills = skillsData.filter((skill) => {
    const matchesCategory = activeCategory === 'all' || skill.category === activeCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Section id="skills" className="bg-glow-radial">
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
                  ? 'bg-primaryBlue text-white shadow-md shadow-primaryBlue/20 border border-blue-400/30'
                  : 'bg-surfaceDark text-textMuted hover:text-textLight hover:bg-white/5 border border-white/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-textMuted" />
          <input
            type="text"
            placeholder="Search technology..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-lg bg-surfaceDark border border-white/10 text-xs text-textLight placeholder-textMuted/60 focus:outline-none focus:border-accentSky/50 font-body transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted hover:text-textLight"
            >
              <FaTimes className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Skills Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        <AnimatePresence>
          {filteredSkills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
                className="glass-card p-5 rounded-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" style={{ color: skill.color }} />
                    </div>
                    <Badge 
                      variant={skill.proficiency === 'Advanced' ? 'primary' : 'default'}
                      size="xs"
                    >
                      {skill.proficiency}
                    </Badge>
                  </div>

                  <h3 className="text-base font-bold font-heading text-textLight group-hover:text-accentSky transition-colors">
                    {skill.name}
                  </h3>
                  <p className="text-xs text-textMuted font-body mt-1.5 leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {filteredSkills.length === 0 && (
        <div className="text-center py-12 text-textMuted text-sm font-mono">
          No matching skills found for "{searchQuery}".
        </div>
      )}
    </Section>
  );
};
