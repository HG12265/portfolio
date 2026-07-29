import { hashPassword } from '../utils/security.js';
import { getDb, readJsonStore, writeJsonStore } from '../config/db.js';

export const seedDatabase = async () => {
  console.log('[Seed] Checking database seeding requirements...');

  const adminPasswordHash = await hashPassword('Admin@Gowtham2026');

  // Initial Seed Data Definitions
  const defaultAdmins = [
    {
      id: 1,
      username: 'gowtham_admin',
      email: 'itsgowtham.dev@gmail.com',
      password_hash: adminPasswordHash,
      role: 'admin',
      created_at: new Date().toISOString()
    }
  ];

  const defaultAbout = [
    {
      id: 1,
      name: 'GOWTHAM G',
      title: 'Full Stack Developer | React & Backend Developer | MCA Student',
      tagline: 'Building modern, scalable, and user-centric web applications with clean architecture and intuitive user experiences.',
      bio: 'I am an MCA student and Full Stack Developer passionate about building modern web applications using React.js, Node.js, Express.js, and MySQL. I enjoy transforming ideas into responsive, scalable, and user-friendly digital solutions while continuously learning new technologies and improving my development skills.',
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
    { id: 1, name: 'HTML5', category: 'frontend', icon_name: 'FaHtml5', proficiency: 'Advanced', color: '#E34F26', description: 'Semantic markup, accessibility standards, web forms.', display_order: 1, enabled: true },
    { id: 2, name: 'CSS3', category: 'frontend', icon_name: 'FaCss3Alt', proficiency: 'Advanced', color: '#1572B6', description: 'Flexbox, Grid layouts, custom animations, media queries.', display_order: 2, enabled: true },
    { id: 3, name: 'JavaScript', category: 'frontend', icon_name: 'FaJsSquare', proficiency: 'Advanced', color: '#F7DF1E', description: 'ES6+ syntax, asynchronous programming, DOM manipulation.', display_order: 3, enabled: true },
    { id: 4, name: 'React.js', category: 'frontend', icon_name: 'FaReact', proficiency: 'Advanced', color: '#61DAFB', description: 'Component-based architecture, Hooks, state management.', display_order: 4, enabled: true },
    { id: 5, name: 'Tailwind CSS', category: 'frontend', icon_name: 'SiTailwindcss', proficiency: 'Advanced', color: '#38BDF8', description: 'Utility-first styling, custom design systems.', display_order: 5, enabled: true },
    { id: 6, name: 'Bootstrap', category: 'frontend', icon_name: 'SiBootstrap', proficiency: 'Intermediate', color: '#7952B3', description: 'Responsive grid layout system, UI components.', display_order: 6, enabled: true },
    { id: 7, name: 'Node.js', category: 'backend', icon_name: 'FaNodeJs', proficiency: 'Advanced', color: '#339933', description: 'Server-side JavaScript runtime, event-driven architecture.', display_order: 7, enabled: true },
    { id: 8, name: 'Express.js', category: 'backend', icon_name: 'SiExpress', proficiency: 'Advanced', color: '#F8FAFC', description: 'Routing controllers, custom middleware, JWT auth.', display_order: 8, enabled: true },
    { id: 9, name: 'Python', category: 'programming', icon_name: 'FaPython', proficiency: 'Intermediate', color: '#3776AB', description: 'Object-oriented programming, data structures, scripting.', display_order: 9, enabled: true },
    { id: 10, name: 'Java', category: 'programming', icon_name: 'FaJava', proficiency: 'Intermediate', color: '#007396', description: 'Core Java fundamentals, OOP concepts, collections.', display_order: 10, enabled: true },
    { id: 11, name: 'MySQL', category: 'database', icon_name: 'SiMysql', proficiency: 'Advanced', color: '#4479A1', description: 'Relational database management, complex SQL queries, joins.', display_order: 11, enabled: true },
    { id: 12, name: 'AWS', category: 'hosting', icon_name: 'FaAws', proficiency: 'Intermediate', color: '#FF9900', description: 'Cloud hosting, EC2 instances, S3 bucket storage.', display_order: 12, enabled: true },
    { id: 13, name: 'Vercel', category: 'hosting', icon_name: 'SiVercel', proficiency: 'Advanced', color: '#F8FAFC', description: 'Automated frontend deployment pipelines, domain routing.', display_order: 13, enabled: true },
    { id: 14, name: 'Render', category: 'hosting', icon_name: 'SiRender', proficiency: 'Intermediate', color: '#46E3B7', description: 'Cloud application hosting for Node.js web services.', display_order: 14, enabled: true },
    { id: 15, name: 'cPanel', category: 'hosting', icon_name: 'SiCpanel', proficiency: 'Intermediate', color: '#FF6C2C', description: 'Web hosting management, FTP deployment, DNS records.', display_order: 15, enabled: true },
    { id: 16, name: 'Docker', category: 'hosting', icon_name: 'FaDocker', proficiency: 'Basic', color: '#2496ED', description: 'Containerization basics, Dockerfile creation.', display_order: 16, enabled: true },
    { id: 17, name: 'Nginx', category: 'hosting', icon_name: 'SiNginx', proficiency: 'Basic', color: '#009639', description: 'Web server configuration, reverse proxy setup.', display_order: 17, enabled: true },
    { id: 18, name: 'Git', category: 'tools', icon_name: 'FaGitAlt', proficiency: 'Advanced', color: '#F05032', description: 'Distributed version control, branching strategies.', display_order: 18, enabled: true },
    { id: 19, name: 'GitHub', category: 'tools', icon_name: 'FaGithub', proficiency: 'Advanced', color: '#F8FAFC', description: 'Repository hosting, Pull Request reviews, Actions.', display_order: 19, enabled: true },
    { id: 20, name: 'VS Code', category: 'tools', icon_name: 'FaCode', proficiency: 'Advanced', color: '#007ACC', description: 'Primary IDE, debugging, extension configuration.', display_order: 20, enabled: true },
    { id: 21, name: 'npm', category: 'tools', icon_name: 'FaNpm', proficiency: 'Advanced', color: '#CB3837', description: 'Node Package Manager, dependency installation.', display_order: 21, enabled: true }
  ];

  const defaultProjects = [
    {
      id: 1,
      slug: 'periyar-university-official-website',
      title: 'Periyar University Official Website – Schools & Departments',
      subtitle: 'Official academic portal for schools & department information management',
      category: 'Web Applications',
      image_url: '/assets/dept-portal.png',
      description: 'Designed and developed the Schools & Departments section of the official Periyar University website. The platform provides a structured interface for managing academic schools and department information with responsive layouts and database-driven content management.',
      long_description: 'Designed and developed the Schools & Departments section of the official Periyar University website. The platform provides a structured interface for managing academic schools and department information with responsive layouts and database-driven content management.',
      tags: ['Next.js', 'Node.js', 'Express.js', 'MySQL'],
      features: [
        'Responsive academic portal',
        'Dynamic department management',
        'Database-driven content',
        'Optimized for desktop and mobile',
        'Production deployment'
      ],
      architecture: 'Built using Next.js with server-side rendering for optimal SEO and performance, backed by Node.js, Express.js REST APIs, and a MySQL relational database.',
      role: 'Lead Full Stack Developer',
      duration: 'Production System',
      github_url: 'https://github.com/example/repository',
      demo_url: 'https://periyaruniversity.site/',
      status: 'Production',
      institution: 'Periyar University',
      is_production: true,
      featured: true,
      published: true,
      display_order: 1
    },
    {
      id: 2,
      slug: 'pg-entrance-examination-portal',
      title: 'PG Entrance Examination Portal',
      subtitle: 'Digital entrance examination portal for Department of Computer Science',
      category: 'Examination Systems',
      image_url: '/assets/online-exam.png',
      description: 'Developed the Postgraduate Entrance Examination Portal for the Department of Computer Science, Periyar University. The system manages candidate registration, authentication, examination workflow, and result processing.',
      long_description: 'Developed the Postgraduate Entrance Examination Portal for the Department of Computer Science, Periyar University. The system manages candidate registration, authentication, examination workflow, and result processing.',
      tags: ['React.js', 'Node.js', 'Express.js', 'MySQL'],
      features: [
        'Secure candidate authentication',
        'Online examination workflow',
        'Responsive dashboard',
        'Real-time examination process',
        'Production deployment'
      ],
      architecture: 'React.js single page application powered by Express.js RESTful APIs and MySQL database with candidate session isolation.',
      role: 'Full Stack Developer',
      duration: 'Production System',
      github_url: 'https://github.com/example/repository',
      demo_url: 'https://periyaruniversity.site/pgentrance',
      status: 'Production',
      institution: 'Periyar University',
      is_production: true,
      featured: true,
      published: true,
      display_order: 2
    },
    {
      id: 3,
      slug: 'phd-entrance-examination-portal',
      title: 'Ph.D Entrance Examination Portal',
      subtitle: 'Official doctorate entrance assessment & result processing portal',
      category: 'Examination Systems',
      image_url: '/assets/phd-portal.png',
      description: 'Designed and developed the official Ph.D Entrance Examination Portal for Periyar University. The platform supports candidate authentication, examination management, question delivery, and secure result processing.',
      long_description: 'Designed and developed the official Ph.D Entrance Examination Portal for Periyar University. The platform supports candidate authentication, examination management, question delivery, and secure result processing.',
      tags: ['React.js', 'Node.js', 'Express.js', 'MySQL'],
      features: [
        'Secure examination portal',
        'Candidate verification',
        'Examination management',
        'Optimized user experience',
        'Production deployment'
      ],
      architecture: 'High-concurrency React frontend backed by Express APIs and MySQL schema handling candidate answer submissions.',
      role: 'Lead Full Stack Developer',
      duration: 'Production System',
      github_url: 'https://github.com/example/repository',
      demo_url: 'https://periyaruniversity.site/phdentrance',
      status: 'Production',
      institution: 'Periyar University',
      is_production: true,
      featured: true,
      published: true,
      display_order: 3
    },
    {
      id: 4,
      slug: 'student-election-management-system',
      title: 'Student Election Management System',
      subtitle: 'Digital student council voting & ballot administration system',
      category: 'Academic Management',
      image_url: '/assets/election-sys.png',
      description: 'Developed a complete Student Election Management System for the Department of Computer Science, Periyar University. The platform simplifies election administration, candidate management, voting processes, and result publication.',
      long_description: 'Developed a complete Student Election Management System for the Department of Computer Science, Periyar University. The platform simplifies election administration, candidate management, voting processes, and result publication.',
      tags: ['HTML5', 'CSS3', 'PHP', 'MySQL'],
      features: [
        'Election management',
        'Candidate management',
        'Student authentication',
        'Secure voting workflow',
        'Production deployment'
      ],
      architecture: 'Modular PHP backend with MySQL relational database enforcing single-vote integrity and instant result compilation.',
      role: 'Lead Developer',
      duration: 'Production System',
      github_url: 'https://github.com/example/repository',
      demo_url: 'https://periyaruniversity.site/election/index.php',
      status: 'Production',
      institution: 'Periyar University',
      is_production: true,
      featured: true,
      published: true,
      display_order: 4
    },
    {
      id: 5,
      slug: 'mentor-mentee-management-system',
      title: 'Mentor Mentee Management System',
      subtitle: 'Centralized student mentoring & academic progress portal',
      category: 'Academic Management',
      image_url: '/assets/mentor-mentee.png',
      description: 'Developed a centralized Mentor-Mentee Management System for the Department of Computer Science, Periyar University. The platform digitizes mentoring activities, student records, academic monitoring, and communication between mentors and students.',
      long_description: 'Developed a centralized Mentor-Mentee Management System for the Department of Computer Science, Periyar University. The platform digitizes mentoring activities, student records, academic monitoring, and communication between mentors and students.',
      tags: ['React.js', 'Node.js', 'Express.js', 'MySQL'],
      features: [
        'Mentor allocation',
        'Student management',
        'Academic tracking',
        'Dashboard & reports',
        'Production deployment'
      ],
      architecture: 'React SPA with Node/Express REST endpoints and MySQL database managing faculty-student allocations.',
      role: 'Lead Full Stack Developer',
      duration: 'Production System',
      github_url: 'https://github.com/example/repository',
      demo_url: 'https://periyaruniversity.site/mentor',
      status: 'Production',
      institution: 'Periyar University',
      is_production: true,
      featured: true,
      published: true,
      display_order: 5
    },
    {
      id: 6,
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
      status: 'Featured Project',
      institution: 'HealthTech Platform',
      is_production: false,
      featured: true,
      published: true,
      display_order: 6
    }
  ];

  const defaultEducation = [
    {
      id: 1,
      degree: 'Master of Computer Applications (MCA)',
      institution: 'Periyar University',
      period: '2025 – 2027',
      status: 'Pursuing (Final Year)',
      grade: 'First Class',
      description: 'Advanced academic studies in Full Stack Web Development, Relational Database Management Systems, Web Technologies, and Software Development Principles.',
      courses: ['Advanced Web Development', 'Relational Database Systems (MySQL)', 'Data Structures & Algorithms', 'Web Application Development', 'Cloud Deployment Fundamentals'],
      display_order: 1
    },
    {
      id: 2,
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

  const defaultCertificates = [
    {
      id: 1,
      title: 'Full Stack Web Development Professional',
      organization: 'Coursera / Meta',
      duration: '2025',
      description: 'Comprehensive validation of full stack web application development using React, Node.js, Express, and MySQL.',
      image_url: '/assets/mentor-mentee.png',
      display_order: 1
    },
    {
      id: 2,
      title: 'React Developer Specialist',
      organization: 'Meta Frontend Developer Program',
      duration: '2024',
      description: 'Advanced certification in React component architecture, state management, custom hooks, and UI performance.',
      image_url: '/assets/dept-portal.png',
      display_order: 2
    },
    {
      id: 3,
      title: 'Web Application Development Certification',
      organization: 'FreeCodeCamp / Tech Academy',
      duration: '2025',
      description: 'Practical training in responsive web design, ES6+ JavaScript standards, RESTful APIs, and frontend integration.',
      image_url: '/assets/online-exam.png',
      display_order: 3
    },
    {
      id: 4,
      title: 'Cloud Hosting & Deployment Essentials',
      organization: 'AWS Academy / Vercel',
      duration: '2024',
      description: 'Fundamentals of cloud server configuration, serverless deployments, domain routing, and web service management.',
      image_url: '/assets/election-sys.png',
      display_order: 4
    },
    {
      id: 5,
      title: 'Database Design & MySQL Specialist',
      organization: 'Oracle Academy / HackerRank',
      duration: '2024',
      description: 'Relational database schema design, complex multi-table SQL queries, indexing, and performance tuning.',
      image_url: '/assets/phd-portal.png',
      display_order: 5
    }
  ];

  const defaultSettings = [
    { id: 1, key_name: 'site_title', value_text: 'GOWTHAM G | Full Stack Developer | MCA Student' },
    { id: 2, key_name: 'logo_text', value_text: 'GOWTHAM G' },
    { id: 3, key_name: 'seo_description', value_text: 'Personal Portfolio of Gowtham G - MCA Student, Full Stack Developer, React Developer, Backend Developer, and Web Application Specialist based in Salem, Tamil Nadu, India.' },
    { id: 4, key_name: 'seo_keywords', value_text: 'Gowtham G, Full Stack Developer, React Developer, MCA Student, Backend Developer, Web Developer Portfolio, ReactJS, Node.js, Tailwind CSS, Salem' },
    { id: 5, key_name: 'footer_text', value_text: 'Designed & Developed with React, Tailwind CSS & Vite' }
  ];

  const defaultResumes = [
    {
      id: 1,
      file_name: 'resume-gowtham-g.pdf',
      file_url: '/assets/resume-gowtham-g.pdf',
      is_active: true,
      uploaded_at: new Date().toISOString()
    }
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

  // 2. MySQL Database Seeding ONLY if tables are empty
  try {
    const { pool, isMysqlConnected } = getDb();
    if (isMysqlConnected && pool) {
      const [adminRows] = await pool.query('SELECT COUNT(*) as count FROM admins');
      if (adminRows[0].count === 0) {
        await pool.query('INSERT INTO admins (id, username, email, password_hash, role) VALUES (?, ?, ?, ?, ?)', [1, 'gowtham_admin', 'itsgowtham.dev@gmail.com', adminPasswordHash, 'admin']);
      }

      const [aboutRows] = await pool.query('SELECT COUNT(*) as count FROM about');
      if (aboutRows[0].count === 0) {
        await pool.query(
          `INSERT INTO about (id, name, title, tagline, bio, career_objective, technical_interests, leadership_text, current_learning, location, email, phone, profile_image_url)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            1, defaultAbout[0].name, defaultAbout[0].title, defaultAbout[0].tagline, defaultAbout[0].bio, defaultAbout[0].career_objective,
            JSON.stringify(defaultAbout[0].technical_interests), defaultAbout[0].leadership_text, JSON.stringify(defaultAbout[0].current_learning),
            defaultAbout[0].location, defaultAbout[0].email, defaultAbout[0].phone, defaultAbout[0].profile_image_url
          ]
        );
      }

      const [skillsRows] = await pool.query('SELECT COUNT(*) as count FROM skills');
      if (skillsRows[0].count === 0) {
        for (const s of defaultSkills) {
          await pool.query(
            'INSERT INTO skills (id, name, category, icon_name, proficiency, color, description, display_order, enabled) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [s.id, s.name, s.category, s.icon_name, s.proficiency, s.color, s.description, s.display_order, s.enabled ? 1 : 0]
          );
        }
      }

      const [projRows] = await pool.query('SELECT COUNT(*) as count FROM projects');
      if (projRows[0].count === 0) {
        for (const p of defaultProjects) {
          await pool.query(
            `INSERT INTO projects (id, slug, title, subtitle, category, image_url, description, long_description, tags, features, architecture, role, duration, github_url, demo_url, featured, published, display_order)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              p.id, p.slug, p.title, p.subtitle, p.category, p.image_url, p.description, p.long_description,
              JSON.stringify(p.tags), JSON.stringify(p.features), p.architecture, p.role, p.duration,
              p.github_url, p.demo_url, p.featured ? 1 : 0, p.published ? 1 : 0, p.display_order
            ]
          );
        }
      }

      const [eduRows] = await pool.query('SELECT COUNT(*) as count FROM education');
      if (eduRows[0].count === 0) {
        for (const e of defaultEducation) {
          await pool.query(
            'INSERT INTO education (id, degree, institution, period, status, grade, description, courses, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [e.id, e.degree, e.institution, e.period, e.status, e.grade, e.description, JSON.stringify(e.courses), e.display_order]
          );
        }
      }

      const [certRows] = await pool.query('SELECT COUNT(*) as count FROM certificates');
      if (certRows[0].count === 0) {
        for (const c of defaultCertificates) {
          await pool.query(
            'INSERT INTO certificates (id, title, organization, duration, image_url, description, display_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [c.id, c.title, c.organization, c.duration, c.image_url, c.description, c.display_order]
          );
        }
      }

      const [resumeRows] = await pool.query('SELECT COUNT(*) as count FROM resumes');
      if (resumeRows[0].count === 0) {
        await pool.query('INSERT INTO resumes (id, file_name, file_url, is_active) VALUES (?, ?, ?, 1)', [1, 'resume-gowtham-g.pdf', '/assets/resume-gowtham-g.pdf']);
      }

      const [settingRows] = await pool.query('SELECT COUNT(*) as count FROM settings');
      if (settingRows[0].count === 0) {
        for (const st of defaultSettings) {
          await pool.query('INSERT INTO settings (id, key_name, value_text) VALUES (?, ?, ?)', [st.id, st.key_name, st.value_text]);
        }
      }
    }
  } catch (err) {
    console.error('MySQL table check/seed error:', err.message);
  }

  console.log('[Seed] Seeding check completed.');
};

// Execute seed if run directly
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedDatabase();
}
