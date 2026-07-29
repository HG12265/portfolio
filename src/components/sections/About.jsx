import React from 'react';
import { motion } from 'framer-motion';
import {
  FaUserGraduate, FaBullseye, FaLightbulb, FaUsers,
  FaLaptopCode, FaRocket, FaBookOpen
} from 'react-icons/fa';
import { usePortfolio } from '../../context/PortfolioContext';
import { Section } from '../common/Section';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';

export const About = () => {
  const { about } = usePortfolio();

  const cards = [
    {
      icon: FaLaptopCode,
      title: "Professional Biography",
      color: "text-accentSky",
      bgColor: "bg-accentSky/10",
      borderColor: "border-accentSky/20",
      content: (
        <p className="text-textMuted text-sm leading-relaxed font-body">
          {about.bio}
        </p>
      )
    },
    {
      icon: FaBullseye,
      title: "Career Objective",
      color: "text-primaryBlue",
      bgColor: "bg-primaryBlue/10",
      borderColor: "border-primaryBlue/20",
      content: (
        <p className="text-textMuted text-sm leading-relaxed font-body">
          {about.careerObjective}
        </p>
      )
    },
    {
      icon: FaUserGraduate,
      title: "Education Overview",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
      content: (
        <div className="space-y-3 font-body">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="text-sm font-semibold text-textLight">Master of Computer Applications (MCA)</h4>
              <p className="text-xs text-accentSky font-medium mt-0.5">Periyar University</p>
            </div>
            <Badge variant="accent" size="xs">2025 – 2027</Badge>
          </div>
          <div className="flex items-start justify-between gap-2 pt-2.5 border-t border-white/5">
            <div>
              <h4 className="text-sm font-semibold text-textLight">Bachelor of Computer Applications (BCA)</h4>
              <p className="text-xs text-textMuted font-medium mt-0.5">AVS Arts & Science College</p>
            </div>
            <Badge variant="default" size="xs">2022 – 2025</Badge>
          </div>
        </div>
      )
    },
    {
      icon: FaLightbulb,
      title: "Technical Focus Areas",
      color: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
      content: (
        <div className="flex flex-wrap gap-2">
          {(about.interests || []).map((interest, idx) => (
            <Badge key={idx} variant="primary" size="sm">
              {interest}
            </Badge>
          ))}
        </div>
      )
    },
    {
      icon: FaUsers,
      title: "Leadership",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      content: (
        <p className="text-textMuted text-sm leading-relaxed font-body">
          {about.leadershipText || 'Serving as the Department President, I actively coordinate student activities, support technical events, encourage teamwork, and continuously strengthen my leadership, communication, and organizational skills while contributing positively to the department.'}
        </p>
      )
    },
    {
      icon: FaBookOpen,
      title: "Current Learning",
      color: "text-sky-400",
      bgColor: "bg-sky-500/10",
      borderColor: "border-sky-500/20",
      content: (
        <div className="flex flex-wrap gap-2">
          {(about.currentLearning || []).map((item, idx) => (
            <Badge key={idx} variant="accent" size="sm">
              {item}
            </Badge>
          ))}
        </div>
      )
    }
  ];

  return (
    <Section id="about" className="bg-slate-900/30">
      <SectionHeader
        badge="About Me"
        title="Professional Profile &"
        highlightTitle="Background"
        subtitle="A genuine overview of my academic foundation, technical focus, leadership responsibilities, and ongoing skill development."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="glass-card p-6 rounded-2xl border border-white/10 hover:border-accentSky/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${card.bgColor} ${card.borderColor} border flex items-center justify-center ${card.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold font-heading text-textLight">{card.title}</h3>
                </div>
                {card.content}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};
