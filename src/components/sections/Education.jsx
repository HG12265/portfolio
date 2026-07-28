import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaBookOpen, FaAward, FaStar } from 'react-icons/fa';
import { educationData } from '../../data/educationData';
import { Section } from '../common/Section';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';

export const Education = () => {
  return (
    <Section id="education" className="bg-slate-900/40">
      <SectionHeader
        badge="Academic Roadmap"
        title="Education & Academic"
        highlightTitle="Excellence"
        subtitle="Formal academic degrees, specialization coursework, and future continuous learning goals."
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {educationData.map((edu, index) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
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
                <Badge variant="primary">{edu.grade}</Badge>
              </div>
            </div>

            <p className="text-sm font-body text-textMuted leading-relaxed mb-6">
              {edu.description}
            </p>

            {/* Courses / Modules Grid */}
            <div>
              <h4 className="text-xs font-mono uppercase text-accentSky mb-3 flex items-center gap-2">
                <FaBookOpen className="w-3.5 h-3.5" /> Key Focus Courses & Specializations
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {edu.courses.map((course, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2 text-xs font-body text-textLight"
                  >
                    <FaStar className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="truncate">{course}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};
