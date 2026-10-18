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
    <Section id="education" className="bg-slate-50/70">
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
            className="bg-white p-6 lg:p-8 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all relative overflow-hidden"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-400" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm">
                  <FaGraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-heading text-slate-900">
                    {edu.degree}
                  </h3>
                  <p className="text-xs font-mono text-slate-500 mt-0.5">
                    {edu.institution}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="primary">{edu.period}</Badge>
                {edu.grade && <Badge variant="success">{edu.grade}</Badge>}
              </div>
            </div>

            <p className="text-sm font-body text-slate-600 leading-relaxed mb-6">
              {edu.description}
            </p>

            {/* Courses / Modules Grid */}
            {edu.courses && edu.courses.length > 0 && (
              <div>
                <h4 className="text-xs font-mono uppercase text-indigo-600 mb-3 flex items-center gap-2 font-semibold">
                  <FaBookOpen className="w-3.5 h-3.5" /> Key Focus Courses & Specializations
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(edu.courses || []).map((course, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-100 border border-slate-200/80 text-slate-700 font-medium"
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
