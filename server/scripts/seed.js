import Admin from '../models/Admin.js';
import About from '../models/About.js';
import Skill from '../models/Skill.js';
import Project from '../models/Project.js';
import Certificate from '../models/Certificate.js';
import Education from '../models/Education.js';
import Resume from '../models/Resume.js';
import Setting from '../models/Setting.js';

import { hashPassword } from '../utils/security.js';
import { readJsonStore, writeJsonStore } from '../config/db.js';

export const seedDatabase = async () => {
  console.log('[Seed] Checking database seeding requirements...');

  const adminPasswordHash = await hashPassword('Admin@Gowtham2026');

  // Initial Seed Data Definitions
  const defaultAdmins = [
    {
      username: 'gowtham_admin',
      email: 'itsgowtham.dev@gmail.com',
      password_hash: adminPasswordHash,
      role: 'admin'
    }
  ];

  const defaultAbout = [
    {
      name: 'GOWTHAM G',
      title: 'Full Stack Developer | React & Backend Developer | MCA Student',
      tagline: 'Building modern, scalable, and user-centric web applications with clean architecture and intuitive user experiences.',
      bio: 'I am an MCA student and Full Stack Developer passionate about building modern web applications using React.js, Node.js, Express.js, and MySQL / MongoDB. I enjoy transforming ideas into responsive, scalable, and user-friendly digital solutions while continuously learning new technologies and improving my development skills.',
      career_objective: 'I aspire to build scalable, secure, and user-focused web applications while continuously expanding my technical expertise, learning modern technologies, and contributing to meaningful software projects that create real-world impact.',
      technical_interests: [
        'Full Stack Web Development',
        'Responsive Web Applications',
        'Backend API Development',
        'Database Design',
        'Cloud Hosting & Deployment',
        'Modern UI Development'
      ],
      leadership_text: 'Serving as the Department President, I actively coordinate student activities, support technical events, encourage teamwork, and continuously strengthen my leadership, communication, and organizational skills while contributing positively to the department.',
      current_learning: [
        'Cloud Deployment',
        'AWS',
        'Docker',
        'Modern React',
        'Backend Scalability'
      ],
      location: 'Salem, Tamil Nadu, India',
      email: 'itsgowtham.dev@gmail.com',
      phone: '+91 9344232465',
      profile_image_url: '/assets/gowtham-profile.png'
    }
  ];

  const defaultSkills = [
    { name: 'HTML5', category: 'frontend', icon_name: 'FaHtml5', proficiency: 'Advanced', color: '#E34F26', description: 'Semantic markup, accessibility standards, web forms.', display_order: 1, enabled: true },
    { name: 'CSS3', category: 'frontend', icon_name: 'FaCss3Alt', proficiency: 'Advanced', color: '#1572B6', description: 'Flexbox, Grid layouts, custom animations, media queries.', display_order: 2, enabled: true },
    { name: 'JavaScript', category: 'frontend', icon_name: 'FaJsSquare', proficiency: 'Advanced', color: '#F7DF1E', description: 'ES6+ syntax, asynchronous programming, DOM manipulation.', display_order: 3, enabled: true },
    { name: 'React.js', category: 'frontend', icon_name: 'FaReact', proficiency: 'Advanced', color: '#61DAFB', description: 'Component-based architecture, Hooks, state management.', display_order: 4, enabled: true },
    { name: 'Tailwind CSS', category: 'frontend', icon_name: 'SiTailwindcss', proficiency: 'Advanced', color: '#38BDF8', description: 'Utility-first styling, custom design systems.', display_order: 5, enabled: true },
    { name: 'Node.js', category: 'backend', icon_name: 'FaNodeJs', proficiency: 'Advanced', color: '#339933', description: 'Server-side JavaScript runtime, event-driven architecture.', display_order: 7, enabled: true },
    { name: 'Express.js', category: 'backend', icon_name: 'SiExpress', proficiency: 'Advanced', color: '#F8FAFC', description: 'Routing controllers, custom middleware, JWT auth.', display_order: 8, enabled: true },
    { name: 'MongoDB', category: 'database', icon_name: 'SiMongodb', proficiency: 'Advanced', color: '#47A248', description: 'NoSQL document database, Mongoose ODM schemas.', display_order: 11, enabled: true }
  ];

  const defaultProjects = [
    {
      slug: 'periyar-university-official-website',
      title: 'Periyar University Official Website – Schools & Departments',
      subtitle: 'Official academic portal for schools & department information management',
      category: 'Web Applications',
      image_url: '/assets/dept-portal.png',
      description: 'Designed and developed the Schools & Departments section of the official Periyar University website. The platform provides a structured interface for managing academic schools and department information with responsive layouts and database-driven content management.',
      long_description: 'Designed and developed the Schools & Departments section of the official Periyar University website. The platform provides a structured interface for managing academic schools and department information with responsive layouts and database-driven content management.',
      tags: ['Next.js', 'Node.js', 'Express.js', 'MongoDB'],
      features: ['Responsive academic portal', 'Dynamic department management', 'Database-driven content', 'Production deployment'],
      architecture: 'Built using Next.js with server-side rendering for optimal SEO and performance, backed by Node.js, Express.js REST APIs, and a MongoDB database.',
      role: 'Lead Full Stack Developer',
      duration: 'Production System',
      github_url: 'https://github.com/example/repository',
      demo_url: 'https://periyaruniversity.site/',
      featured: true,
      published: true,
      display_order: 1
    },
    {
      slug: 'pg-entrance-examination-portal',
      title: 'PG Entrance Examination Portal',
      subtitle: 'Digital entrance examination portal for Department of Computer Science',
      category: 'Examination Systems',
      image_url: '/assets/online-exam.png',
      description: 'Developed the Postgraduate Entrance Examination Portal for the Department of Computer Science, Periyar University.',
      long_description: 'Developed the Postgraduate Entrance Examination Portal for the Department of Computer Science, Periyar University.',
      tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
      features: ['Secure candidate authentication', 'Online examination workflow', 'Real-time result processing'],
      architecture: 'React.js single page application powered by Express.js RESTful APIs and MongoDB database.',
      role: 'Full Stack Developer',
      duration: 'Production System',
      github_url: 'https://github.com/example/repository',
      demo_url: 'https://periyaruniversity.site/pgentrance',
      featured: true,
      published: true,
      display_order: 2
    },
    {
      slug: 'lifedrop-ai',
      title: 'LifeDrop AI',
      subtitle: 'Intelligent HealthTech platform connecting donors via AI & Blockchain',
      category: 'HealthTech',
      image_url: '/assets/ecommerce.png',
      description: 'LifeDrop AI is an intelligent HealthTech platform that connects blood donors and recipients through AI-powered search.',
      long_description: 'LifeDrop AI is an intelligent HealthTech platform that connects blood donors and recipients through AI-powered search.',
      tags: ['React', 'Node.js', 'MongoDB', 'Gemini AI'],
      features: ['AI-powered donor search', 'Geo-aware donor matching', 'Blockchain audit trail'],
      architecture: 'React PWA integrated with Node.js backend, MongoDB geospatial indexing, and Google Gemini AI model.',
      role: 'Lead Developer',
      duration: 'Featured Project',
      github_url: 'https://github.com/example/repository',
      demo_url: 'https://life-drop-ai.vercel.app',
      featured: true,
      published: true,
      display_order: 3
    }
  ];

  const defaultCertificates = [
    {
      title: 'Full Stack Web Development Professional',
      organization: 'Coursera / Meta',
      duration: '2025',
      description: 'Comprehensive validation of full stack web application development using React, Node.js, Express, and MongoDB.',
      image_url: '/assets/mentor-mentee.png',
      display_order: 1
    },
    {
      title: 'React Developer Specialist',
      organization: 'Meta Frontend Developer Program',
      duration: '2024',
      description: 'Advanced certification in React component architecture, state management, custom hooks, and UI performance.',
      image_url: '/assets/dept-portal.png',
      display_order: 2
    }
  ];

  const defaultEducation = [
    {
      degree: 'Master of Computer Applications (MCA)',
      institution: 'Periyar University',
      period: '2025 – 2027',
      status: 'Pursuing (Final Year)',
      grade: 'First Class',
      description: 'Advanced academic studies in Full Stack Web Development, Database Management Systems, Web Technologies, and Software Principles.',
      courses: ['Advanced Web Development', 'Database Systems (MySQL & MongoDB)', 'Data Structures & Algorithms', 'Web Application Development'],
      display_order: 1
    }
  ];

  const defaultSettings = [
    { key_name: 'site_title', value_text: 'GOWTHAM G | Full Stack Developer | MCA Student' },
    { key_name: 'logo_text', value_text: 'GOWTHAM G' },
    { key_name: 'footer_text', value_text: 'Designed & Developed with React, Tailwind CSS & Vite' }
  ];

  const defaultResumes = [
    { file_name: 'resume-gowtham-g.pdf', file_url: '/assets/resume-gowtham-g.pdf', is_active: true }
  ];

  // 1. JSON DataStore Initial Seeding ONLY if empty
  if (readJsonStore('admins').length === 0) writeJsonStore('admins', defaultAdmins);
  if (readJsonStore('about').length === 0) writeJsonStore('about', defaultAbout);
  if (readJsonStore('skills').length === 0) writeJsonStore('skills', defaultSkills);
  if (readJsonStore('projects').length === 0) writeJsonStore('projects', defaultProjects);
  if (readJsonStore('education').length === 0) writeJsonStore('education', defaultEducation);
  if (readJsonStore('certificates').length === 0) writeJsonStore('certificates', defaultCertificates);
  if (readJsonStore('settings').length === 0) writeJsonStore('settings', defaultSettings);
  if (readJsonStore('resumes').length === 0) writeJsonStore('resumes', defaultResumes);

  // 2. MongoDB Initial Seeding ONLY if models are empty
  try {
    if ((await Admin.countDocuments()) === 0) await Admin.create(defaultAdmins[0]);
    if ((await About.countDocuments()) === 0) await About.create(defaultAbout[0]);
    if ((await Skill.countDocuments()) === 0) await Skill.insertMany(defaultSkills);
    if ((await Project.countDocuments()) === 0) await Project.insertMany(defaultProjects);
    if ((await Education.countDocuments()) === 0) await Education.insertMany(defaultEducation);
    if ((await Certificate.countDocuments()) === 0) await Certificate.insertMany(defaultCertificates);
    if ((await Setting.countDocuments()) === 0) await Setting.insertMany(defaultSettings);
    if ((await Resume.countDocuments()) === 0) await Resume.create(defaultResumes[0]);
  } catch (err) {
    console.log('[Seed Notice] MongoDB seed skipped or not connected yet.');
  }

  console.log('[Seed] Seeding check completed.');
};

if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedDatabase();
}
