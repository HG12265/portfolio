import React from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaUserTie, FaLaptopCode, FaHandsHelping, FaCheckCircle } from 'react-icons/fa';
import { experienceData } from '../../data/experienceData';
import { Section } from '../common/Section';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';

export const Experience = () => {
  const getIcon = (type) => {
    switch (type) {
      case 'Internship': return FaBriefcase;
      case 'Freelance': return FaLaptopCode;
      case 'Leadership': return FaUserTie;
      default: return FaHandsHelping;
    }
  };

  return (
    <Section id="experience" className="bg-glow-radial">
      <SectionHeader
        badge="Career Progression"
        title="Experience &"
        highlightTitle="Leadership"
        subtitle="My journey across technical internships, freelance development projects, student leadership, and open-source contributions."
      />

      {/* Timeline Wrapper */}
      <div className="relative max-w-4xl mx-auto">
        {/* Center Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primaryBlue via-accentSky to-transparent -translate-x-1/2 hidden sm:block" />

        <div className="space-y-12">
          {experienceData.map((item, index) => {
            const Icon = getIcon(item.type);
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col sm:flex-row items-center ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Center Dot / Icon */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-surfaceDark border-2 border-accentSky flex items-center justify-center text-accentSky shadow-lg shadow-accentSky/20 z-10 hidden sm:flex">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Content Card Box */}
                <div className="w-full sm:w-[calc(50%-2.5rem)] glass-card p-6 rounded-2xl border border-white/10">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <Badge variant="primary">{item.type}</Badge>
                    <span className="text-xs font-mono text-textMuted">{item.period}</span>
                  </div>

                  <h3 className="text-lg font-bold font-heading text-textLight">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-accentSky mb-3">
                    {item.organization} &bull; {item.location}
                  </p>

                  <p className="text-xs text-textMuted font-body leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Achievements List */}
                  <div className="space-y-2 mb-4">
                    {item.achievements.map((achieve, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs font-body text-textLight">
                        <FaCheckCircle className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{achieve}</span>
                      </div>
                    ))}
                  </div>

                  {/* Skills Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                    {item.skills.map((skill, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-textMuted">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
};
