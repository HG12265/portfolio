import React from 'react';
import { motion } from 'framer-motion';
import {
  FaUserGraduate, FaBullseye, FaLightbulb, FaUsers,
  FaLaptopCode, FaRocket, FaBookOpen
} from 'react-icons/fa';
import { developerInfo } from '../../data/developerInfo';
import { Section } from '../common/Section';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';

export const About = () => {
  const cards = [
    {
      icon: FaLaptopCode,
      title: "Professional Biography",
      color: "text-accentSky",
      bgColor: "bg-accentSky/10",
      borderColor: "border-accentSky/20",
      content: (
        <p className="text-textMuted text-sm leading-relaxed font-body">
          I am an MCA student and Full Stack Developer passionate about building modern web applications using React.js, Node.js, Express.js, and MySQL. I enjoy transforming ideas into responsive, scalable, and user-friendly digital solutions while continuously learning new technologies and improving my development skills.
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
          I aspire to build scalable, secure, and user-focused web applications while continuously expanding my technical expertise, learning modern technologies, and contributing to meaningful software projects that create real-world impact.
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
          {developerInfo.interests.map((interest, idx) => (
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
          Serving as the Department President, I actively coordinate student activities, support technical events, encourage teamwork, and continuously strengthen my leadership, communication, and organizational skills while contributing positively to the department.
        </p>
      )
    },
    {
      icon: FaRocket,
      title: "Quick Highlights",
      color: "text-rose-400",
      bgColor: "bg-rose-500/10",
      borderColor: "border-rose-500/20",
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-body">
          {developerInfo.quickFacts.map((fact, idx) => (
            <div key={idx} className="p-2.5 rounded-lg bg-white/5 border border-white/5">
              <span className="text-[10px] font-mono text-textMuted uppercase block">{fact.label}</span>
              <span className="text-xs font-semibold text-textLight block mt-0.5">{fact.value}</span>
            </div>
          ))}
        </div>
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
          {developerInfo.currentLearning.map((item, idx) => (
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
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${card.bgColor} ${card.borderColor} border flex items-center justify-center ${card.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold font-heading text-textLight">
                    {card.title}
                  </h3>
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
