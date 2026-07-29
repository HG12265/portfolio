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
      profile_image_url: '/assets/gowtham-profile.png',
      github_url: 'https://github.com/hg12265',
      linkedin_url: 'https://linkedin.com/in/gowthamg-dev',
      twitter_url: 'https://twitter.com/gowthamg_dev',
      instagram_url: 'https://instagram.com/gowthamg_dev'
    }
  ];

  const defaultSkills = [
    { name: 'HTML5', category: 'frontend', icon_name: 'FaHtml5', proficiency: 'Advanced', color: '#E34F26', description: 'Semantic markup, accessibility standards, web forms.', display_order: 1, enabled: true },
    { name: 'CSS3', category: 'frontend', icon_name: 'FaCss3Alt', proficiency: 'Advanced', color: '#1572B6', description: 'Flexbox, Grid layouts, custom animations, media queries.', display_order: 2, enabled: true },
    { name: 'JavaScript', category: 'frontend', icon_name: 'FaJsSquare', proficiency: 'Advanced', color: '#F7DF1E', description: 'ES6+ syntax, asynchronous programming, DOM manipulation.', display_order: 3, enabled: true },
    { name: 'React.js', category: 'frontend', icon_name: 'FaReact', proficiency: 'Advanced', color: '#61DAFB', description: 'Component-based architecture, Hooks, state management.', display_order: 4, enabled: true },
    { name: 'Tailwind CSS', category: 'frontend', icon_name: 'SiTailwindcss', proficiency: 'Advanced', color: '#38BDF8', description: 'Utility-first styling, custom design systems.', display_order: 5, enabled: true },
    { name: 'Bootstrap', category: 'frontend', icon_name: 'SiBootstrap', proficiency: 'Intermediate', color: '#7952B3', description: 'Responsive grid layout system, UI components.', display_order: 6, enabled: true },
    { name: 'Node.js', category: 'backend', icon_name: 'FaNodeJs', proficiency: 'Advanced', color: '#339933', description: 'Server-side JavaScript runtime, event-driven architecture.', display_order: 7, enabled: true },
    { name: 'Express.js', category: 'backend', icon_name: 'SiExpress', proficiency: 'Advanced', color: '#F8FAFC', description: 'Routing controllers, custom middleware, JWT auth.', display_order: 8, enabled: true },
    { name: 'Python', category: 'programming', icon_name: 'FaPython', proficiency: 'Intermediate', color: '#3776AB', description: 'Object-oriented programming, data structures, scripting.', display_order: 9, enabled: true },
    { name: 'Java', category: 'programming', icon_name: 'FaJava', proficiency: 'Intermediate', color: '#007396', description: 'Core Java fundamentals, OOP concepts, collections.', display_order: 10, enabled: true },
    { name: 'MySQL', category: 'database', icon_name: 'SiMysql', proficiency: 'Advanced', color: '#4479A1', description: 'Relational database management, complex SQL queries, joins.', display_order: 11, enabled: true },
    { name: 'MongoDB', category: 'database', icon_name: 'SiMongodb', proficiency: 'Advanced', color: '#47A248', description: 'NoSQL document database, Mongoose ODM schemas.', display_order: 12, enabled: true },
    { name: 'AWS', category: 'hosting', icon_name: 'FaAws', proficiency: 'Intermediate', color: '#FF9900', description: 'Cloud hosting, EC2 instances, S3 bucket storage.', display_order: 13, enabled: true },
    { name: 'Vercel', category: 'hosting', icon_name: 'SiVercel', proficiency: 'Advanced', color: '#F8FAFC', description: 'Automated frontend deployment pipelines, domain routing.', display_order: 14, enabled: true },
    { name: 'Render', category: 'hosting', icon_name: 'SiRender', proficiency: 'Advanced', color: '#46E3B7', description: 'Cloud application hosting for Node.js web services.', display_order: 15, enabled: true },
    { name: 'cPanel', category: 'hosting', icon_name: 'SiCpanel', proficiency: 'Intermediate', color: '#FF6C2C', description: 'Web hosting management, FTP deployment, DNS records.', display_order: 16, enabled: true },
    { name: 'Docker', category: 'hosting', icon_name: 'FaDocker', proficiency: 'Basic', color: '#2496ED', description: 'Containerization basics, Dockerfile creation.', display_order: 17, enabled: true },
    { name: 'Git', category: 'tools', icon_name: 'FaGitAlt', proficiency: 'Advanced', color: '#F05032', description: 'Distributed version control, branching strategies.', display_order: 18, enabled: true },
    { name: 'GitHub', category: 'tools', icon_name: 'FaGithub', proficiency: 'Advanced', color: '#F8FAFC', description: 'Repository hosting, Pull Request reviews, Actions.', display_order: 19, enabled: true },
    { name: 'VS Code', category: 'tools', icon_name: 'FaCode', proficiency: 'Advanced', color: '#007ACC', description: 'Primary IDE, debugging, extension configuration.', display_order: 20, enabled: true },
    { name: 'npm', category: 'tools', icon_name: 'FaNpm', proficiency: 'Advanced', color: '#CB3837', description: 'Node Package Manager, dependency installation.', display_order: 21, enabled: true }
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
      features: [
        'Responsive academic portal',
        'Dynamic department management',
        'Database-driven content',
        'Optimized for desktop and mobile',
        'Production deployment'
      ],
      architecture: 'Built using Next.js with server-side rendering for optimal SEO and performance, backed by Node.js, Express.js REST APIs, and a MongoDB relational database.',
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
      description: 'Developed the Postgraduate Entrance Examination Portal for the Department of Computer Science, Periyar University. The system manages candidate registration, authentication, examination workflow, and result processing.',
      long_description: 'Developed the Postgraduate Entrance Examination Portal for the Department of Computer Science, Periyar University. The system manages candidate registration, authentication, examination workflow, and result processing.',
      tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
      features: [
        'Secure candidate authentication',
        'Online examination workflow',
        'Responsive dashboard',
        'Real-time examination process',
        'Production deployment'
      ],
      architecture: 'React.js single page application powered by Express.js RESTful APIs and MongoDB database with candidate session isolation.',
      role: 'Full Stack Developer',
      duration: 'Production System',
      github_url: 'https://github.com/example/repository',
      demo_url: 'https://periyaruniversity.site/pgentrance',
      featured: true,
      published: true,
      display_order: 2
    },
    {
      slug: 'phd-entrance-examination-portal',
      title: 'Ph.D Entrance Examination Portal',
      subtitle: 'Official doctorate entrance assessment & result processing portal',
      category: 'Examination Systems',
      image_url: '/assets/phd-portal.png',
      description: 'Designed and developed the official Ph.D Entrance Examination Portal for Periyar University. The platform supports candidate authentication, examination management, question delivery, and secure result processing.',
      long_description: 'Designed and developed the official Ph.D Entrance Examination Portal for Periyar University. The platform supports candidate authentication, examination management, question delivery, and secure result processing.',
      tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
      features: [
        'Secure examination portal',
        'Candidate verification',
        'Examination management',
        'Optimized user experience',
        'Production deployment'
      ],
      architecture: 'High-concurrency React frontend backed by Express APIs and MongoDB schema handling candidate answer submissions.',
      role: 'Lead Full Stack Developer',
      duration: 'Production System',
      github_url: 'https://github.com/example/repository',
      demo_url: 'https://periyaruniversity.site/phdentrance',
      featured: true,
      published: true,
      display_order: 3
    },
    {
      slug: 'student-election-management-system',
      title: 'Student Election Management System',
      subtitle: 'Digital student council voting & ballot administration system',
      category: 'Academic Management',
      image_url: '/assets/election-sys.png',
      description: 'Developed a complete Student Election Management System for the Department of Computer Science, Periyar University. The platform simplifies election administration, candidate management, voting processes, and result publication.',
      long_description: 'Developed a complete Student Election Management System for the Department of Computer Science, Periyar University. The platform simplifies election administration, candidate management, voting processes, and result publication.',
      tags: ['HTML5', 'CSS3', 'PHP', 'MongoDB'],
      features: [
        'Election management',
        'Candidate management',
        'Student authentication',
        'Secure voting workflow',
        'Production deployment'
      ],
      architecture: 'Modular backend with database enforcing single-vote integrity and instant result compilation.',
      role: 'Lead Developer',
      duration: 'Production System',
      github_url: 'https://github.com/example/repository',
      demo_url: 'https://periyaruniversity.site/election/index.php',
      featured: true,
      published: true,
      display_order: 4
    },
    {
      slug: 'mentor-mentee-management-system',
      title: 'Mentor Mentee Management System',
      subtitle: 'Centralized student mentoring & academic progress portal',
      category: 'Academic Management',
      image_url: '/assets/mentor-mentee.png',
      description: 'Developed a centralized Mentor-Mentee Management System for the Department of Computer Science, Periyar University. The platform digitizes mentoring activities, student records, academic monitoring, and communication between mentors and students.',
      long_description: 'Developed a centralized Mentor-Mentee Management System for the Department of Computer Science, Periyar University. The platform digitizes mentoring activities, student records, academic monitoring, and communication between mentors and students.',
      tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
      features: [
        'Mentor allocation',
        'Student management',
        'Academic tracking',
        'Dashboard & reports',
        'Production deployment'
      ],
      architecture: 'React SPA with Node/Express REST endpoints and MongoDB database managing faculty-student allocations.',
      role: 'Lead Full Stack Developer',
      duration: 'Production System',
      github_url: 'https://github.com/example/repository',
      demo_url: 'https://periyaruniversity.site/mentor',
      featured: true,
      published: true,
      display_order: 5
    },
    {
      slug: 'lifedrop-ai',
      title: 'LifeDrop AI',
      subtitle: 'Intelligent HealthTech platform connecting donors via AI & Blockchain',
      category: 'HealthTech',
      image_url: '/assets/ecommerce.png',
      description: 'LifeDrop AI is an intelligent HealthTech platform that connects blood donors and recipients through AI-powered search, location-aware matching, and a transparent blockchain-based audit trail to improve emergency blood donation.',
      long_description: 'LifeDrop AI is an intelligent HealthTech platform that connects blood donors and recipients through AI-powered search, location-aware matching, and a transparent blockchain-based audit trail to improve emergency blood donation.',
      tags: ['React', 'Node.js', 'MongoDB', 'Gemini AI'],
      features: [
        'AI-powered donor search',
        'Geo-aware donor matching',
        'Blockchain audit trail',
        'Progressive Web App (PWA)',
        'Android support',
        'Tamil & English multilingual interface'
      ],
      architecture: 'React PWA integrated with Node.js backend, MongoDB geospatial indexing, and Google Gemini AI model for donor matching.',
      role: 'Lead Developer',
      duration: 'Featured Project',
      github_url: 'https://github.com/example/repository',
      demo_url: 'https://life-drop-ai.vercel.app',
      featured: true,
      published: true,
      display_order: 6
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
    },
    {
      title: 'Web Application Development Certification',
      organization: 'FreeCodeCamp / Tech Academy',
      duration: '2025',
      description: 'Practical training in responsive web design, ES6+ JavaScript standards, RESTful APIs, and frontend integration.',
      image_url: '/assets/online-exam.png',
      display_order: 3
    },
    {
      title: 'Cloud Hosting & Deployment Essentials',
      organization: 'AWS Academy / Vercel',
      duration: '2024',
      description: 'Fundamentals of cloud server configuration, serverless deployments, domain routing, and web service management.',
      image_url: '/assets/election-sys.png',
      display_order: 4
    },
    {
      title: 'Database Design & SQL / MongoDB Specialist',
      organization: 'Oracle Academy / HackerRank',
      duration: '2024',
      description: 'Relational database schema design, complex multi-table SQL queries, indexing, and performance tuning.',
      image_url: '/assets/phd-portal.png',
      display_order: 5
    }
  ];

  const defaultEducation = [
    {
      degree: 'Master of Computer Applications (MCA)',
      institution: 'Periyar University',
      period: '2025 – 2027',
      status: 'Pursuing (Final Year)',
      grade: 'First Class',
      description: 'Advanced academic studies in Full Stack Web Development, Database Management Systems, Web Technologies, and Software Development Principles.',
      courses: ['Advanced Web Development', 'Database Systems (MySQL & MongoDB)', 'Data Structures & Algorithms', 'Web Application Development', 'Cloud Deployment Fundamentals'],
      display_order: 1
    },
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'AVS Arts & Science College',
      period: '2022 – 2025',
      status: 'Graduated',
      grade: 'Distinction',
      description: 'Foundational degree in computer applications covering Object-Oriented Programming, Web Programming, Relational Databases, and Computer Networks.',
      courses: ['Object Oriented Programming in Java', 'Data Structures', 'Web Programming (HTML, CSS, JS)', 'Database Management Systems', 'Computer Networks'],
      display_order: 2
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

  // 2. MongoDB Initial Seeding ONLY if models are empty or incomplete
  try {
    if ((await Admin.countDocuments()) === 0) await Admin.create(defaultAdmins[0]);
    if ((await About.countDocuments()) === 0) await About.create(defaultAbout[0]);
    if ((await Skill.countDocuments()) === 0) await Skill.insertMany(defaultSkills);
    
    // Ensure all 6 production projects exist in MongoDB Atlas
    const projCount = await Project.countDocuments();
    if (projCount < 6) {
      await Project.deleteMany({});
      await Project.insertMany(defaultProjects);
    }

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
