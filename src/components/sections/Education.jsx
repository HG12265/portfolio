import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBookOpen } from 'react-icons/fa';
import { usePortfolio } from '../../context/PortfolioContext';
import { Section } from '../common/Section';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';

export const Education = () => {
  const { education } = usePortfolio();

  return (
    <Section id="education" className="bg-slate-900/40">
      <SectionHeader
        badge="Academic Roadmap"
        title="Education & Academic"
        highlightTitle="Journey"
        subtitle="Formal academic degrees, specialization coursework, and continuous learning goals."
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {education.map((edu, index) => (
          <motion.div
            key={edu.id || index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="glass-card p-6 lg:p-8 rounded-2xl border border-white/10 relative overflow-hidden"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primaryBlue via-accentSky to-blue-500" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primaryBlue/10 border border-primaryBlue/20 flex items-center justify-center text-accentSky shrink-0">
                  <FaGraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading text-textLight">
                    {edu.degree}
                  </h3>
                  <p className="text-xs font-mono text-textMuted mt-0.5">
                    {edu.institution}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="accent">{edu.period}</Badge>
                {edu.grade && <Badge variant="primary">{edu.grade}</Badge>}
              </div>
            </div>

            <p className="text-sm font-body text-textMuted leading-relaxed mb-6">
              {edu.description}
            </p>

            {/* Courses / Modules Grid */}
            {edu.courses && edu.courses.length > 0 && (
              <div>
                <h4 className="text-xs font-mono uppercase text-accentSky mb-3 flex items-center gap-2">
                  <FaBookOpen className="w-3.5 h-3.5" /> Key Focus Courses & Specializations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(edu.courses || []).map((course, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-textLight"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
