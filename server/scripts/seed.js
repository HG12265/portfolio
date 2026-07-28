import { hashPassword } from '../utils/security.js';
import { writeJsonStore } from '../config/db.js';

export const seedDatabase = async () => {
  console.log('[Seed] Seeding initial portfolio content and admin user...');

  // 1. Seed Admin
  const adminPasswordHash = await hashPassword('Admin@Gowtham2026');
  const admins = [
    {
      id: 1,
      username: 'gowtham_admin',
      email: 'itsgowtham.dev@gmail.com',
      password_hash: adminPasswordHash,
      role: 'admin',
      created_at: new Date().toISOString()
    }
  ];
  writeJsonStore('admins', admins);

  // 2. Seed About
  const about = [
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
      phone: '+91 9344232465'
    }
  ];
  writeJsonStore('about', about);

  // 3. Seed Skills
  const skills = [
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
  writeJsonStore('skills', skills);

  // 4. Seed Projects
  const projects = [
    {
      id: 1,
      slug: 'mentor-mentee-management-system',
      title: 'Mentor Mentee Management System',
      subtitle: 'Institutional mentor-student mapping & progress tracking platform',
      category: 'Academic Systems',
      image_url: '/assets/mentor-mentee.png',
      description: 'An enterprise web portal designed to automate student-faculty mentor assignments, track academic counseling sessions, and monitor student progress in real-time.',
      long_description: 'The Mentor Mentee Management System eliminates manual spreadsheet tracking across academic departments. It provides role-based access for Admins, Mentors, and Mentees. Mentors can schedule counseling sessions, log discussion notes, upload performance reports, and trigger automated alerts for at-risk students.',
      tags: ['React.js', 'Node.js', 'Express.js', 'MySQL', 'Tailwind CSS', 'JWT'],
      features: [
        'Automated batch allocation of mentees to assigned faculty mentors.',
        'Interactive dashboard for meeting logs, attendance, and GPA progress.',
        'Automated email notifications for upcoming sessions via EmailJS/Nodemailer.',
        'Role-based Access Control (RBAC) with secure JWT authentication.',
        'Exportable PDF reports for departmental audits and academic compliance.'
      ],
      architecture: 'Built on a decoupled full stack web architecture. Frontend state managed with React Context API and Axios interceptors for JWT token handling. Relational MySQL database queries power real-time analytics.',
      role: 'Lead Full Stack Developer',
      duration: '3 Months (Academic Project)',
      github_url: 'https://github.com/gowthamg-dev/mentor-mentee-management-system',
      demo_url: 'https://mentor-mentee-portal.vercel.app',
      featured: true,
      published: true,
      display_order: 1
    },
    {
      id: 2,
      slug: 'department-student-portal',
      title: 'Department Student Portal',
      subtitle: 'Unified academic dashboard for coursework & departmental announcements',
      category: 'Academic Systems',
      image_url: '/assets/dept-portal.png',
      description: 'A comprehensive academic management hub for students and faculty featuring timetable schedules, assignment submissions, attendance tracking, and real-time notices.',
      long_description: 'Developed to streamline daily department activities, the Department Student Portal offers a centralized dashboard. Students can view personal timetables, track subject-wise attendance percentages, submit assignment files securely, and receive official departmental bulletins without email clutter.',
      tags: ['React.js', 'Tailwind CSS', 'Node.js', 'Express', 'MySQL'],
      features: [
        'Live dynamic timetable with active lecture highlights.',
        'Subject-wise attendance percentage tracker with warning badges below 75%.',
        'Secure file upload and grading system for course assignments.',
        'Departmental announcement ticker with tag-based filtering.',
        'Responsive dark/light interface optimized for mobile and desktop screens.'
      ],
      architecture: 'Relational database schema designed with MySQL ensuring data integrity across courses, enrollments, and submissions.',
      role: 'Full Stack Developer',
      duration: '2.5 Months',
      github_url: 'https://github.com/gowthamg-dev/department-student-portal',
      demo_url: 'https://dept-student-portal.vercel.app',
      featured: true,
      published: true,
      display_order: 2
    },
    {
      id: 3,
      slug: 'online-examination-system',
      title: 'Online Examination System',
      subtitle: 'Secure digital assessment platform with automated evaluation',
      category: 'Full Stack',
      image_url: '/assets/online-exam.png',
      description: 'A robust web-based testing platform featuring timed examinations, random question shuffle, anti-proctoring tab switch detectors, and instant score analytics.',
      long_description: 'Developed for conduct of internal assessment tests, this system allows faculty to build question banks with varying difficulty levels.',
      tags: ['React.js', 'Node.js', 'MySQL', 'Tailwind CSS'],
      features: [
        'Countdown timer sync with auto-submission upon expiry.',
        'Tab-switch detection and anti-cheating security warnings.',
        'Automated grading for MCQ and short-answer matching questions.',
        'Comprehensive candidate performance dashboard with graphical score breakdown.'
      ],
      architecture: 'React frontend equipped with custom countdown hooks and browser event listeners. MySQL database handles question banks.',
      role: 'Full Stack Developer',
      duration: '2 Months',
      github_url: 'https://github.com/gowthamg-dev/online-examination-system',
      demo_url: 'https://online-exam-system.vercel.app',
      featured: true,
      published: true,
      display_order: 3
    },
    {
      id: 4,
      slug: 'college-election-management-system',
      title: 'College Election Management System',
      subtitle: 'Encrypted digital voting platform with transparent real-time tallying',
      category: 'Management Portals',
      image_url: '/assets/election-sys.png',
      description: 'A secure electronic voting application for student council elections, incorporating voter verification, encrypted ballot submissions, and live tally visualization.',
      long_description: 'Designed to modernize student election processes, the application authenticates voters against college registration IDs.',
      tags: ['React.js', 'Express.js', 'Node.js', 'MySQL', 'Tailwind CSS'],
      features: [
        'Multi-factor student voter verification system.',
        'Candidate campaign card showcasing manifestos.',
        'Cryptographically sealed vote casting ensuring complete voter anonymity.',
        'Real-time graphical vote tallying dashboard.'
      ],
      architecture: 'MySQL database utilizing strict transaction isolation levels to prevent double-voting bugs.',
      role: 'Lead Developer',
      duration: '2 Months',
      github_url: 'https://github.com/gowthamg-dev/college-election-management',
      demo_url: 'https://college-election-portal.vercel.app',
      featured: false,
      published: true,
      display_order: 4
    },
    {
      id: 5,
      slug: 'phd-entrance-examination-portal',
      title: 'PhD Entrance Examination Portal',
      subtitle: 'National-level candidate registration & admit card generation system',
      category: 'Management Portals',
      image_url: '/assets/phd-portal.png',
      description: 'A scalable web application handling candidate registrations, document verifications, exam center allocations, and downloadable digital admit cards.',
      long_description: 'Built to manage high-volume entrance examination workflows for postgraduate research programs.',
      tags: ['React.js', 'Node.js', 'Express', 'MySQL', 'Tailwind CSS'],
      features: [
        'Multi-step registration wizard with dynamic field validation.',
        'Document scanner upload module with format verification.',
        'Automated exam hall ticket generation with dynamic QR codes.',
        'Admin portal for seat allotment and exam center capacity management.'
      ],
      architecture: 'Designed with reusable modular form components on React. Node.js backend generates admit card PDFs on demand.',
      role: 'Full Stack Developer',
      duration: '3 Months',
      github_url: 'https://github.com/gowthamg-dev/phd-entrance-exam-portal',
      demo_url: 'https://phd-entrance-portal.vercel.app',
      featured: false,
      published: true,
      display_order: 5
    },
    {
      id: 6,
      slug: 'modern-e-commerce-store',
      title: 'Modern E-Commerce Store',
      subtitle: 'Responsive digital shop with product filtering, shopping cart & checkout',
      category: 'E-Commerce',
      image_url: '/assets/ecommerce.png',
      description: 'A modern, full-featured electronic commerce platform built with React and Tailwind CSS, featuring instantaneous product searching, category filters, and cart state persistence.',
      long_description: 'A production-grade e-commerce application focusing on sub-second page transitions, responsive product grids, slide-over cart management, and seamless order review flows.',
      tags: ['React.js', 'Tailwind CSS', 'Context API', 'Node.js'],
      features: [
        'Real-time search and multi-attribute filter panel.',
        'Persistent cart state using localStorage and React Context API.',
        'Product image zoom gallery and variant selectors.',
        'Checkout drawer with address validation and mock payment processing.'
      ],
      architecture: 'Optimized React client with virtualized product lists for ultra-fast rendering.',
      role: 'Frontend & UI Developer',
      duration: '1.5 Months',
      github_url: 'https://github.com/gowthamg-dev/modern-ecommerce-react',
      demo_url: 'https://modern-tech-store.vercel.app',
      featured: true,
      published: true,
      display_order: 6
    }
  ];
  writeJsonStore('projects', projects);

  // 5. Seed Education
  const education = [
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
  writeJsonStore('education', education);

  // 6. Seed Certificates
  const certificates = [
    {
      id: 1,
      title: 'Full Stack Web Development Professional',
      issuer: 'Coursera / Meta / Professional Tech Academy',
      year: '2025',
      credential_id: 'CERT-FS-98421',
      image_url: '/assets/mentor-mentee.png',
      description: 'Comprehensive program covering end-to-end web application development with React, Node.js, Express, MySQL, REST APIs, and cloud deployment workflows.',
      verify_url: 'https://coursera.org/verify/FS-98421',
      display_order: 1
    },
    {
      id: 2,
      title: 'React Developer Specialist',
      issuer: 'Meta Frontend Developer Program',
      year: '2024',
      credential_id: 'CERT-REACT-44102',
      image_url: '/assets/dept-portal.png',
      description: 'Advanced validation of React skills including Component Architecture, Custom Hooks, State Management, and Performance Optimization.',
      verify_url: 'https://coursera.org/verify/REACT-44102',
      display_order: 2
    },
    {
      id: 3,
      title: 'Web Application Development Certification',
      issuer: 'FreeCodeCamp / Developer Academy',
      year: '2025',
      credential_id: 'CERT-WEB-77192',
      image_url: '/assets/online-exam.png',
      description: 'Practical training on modern web application interfaces, responsive layout design, JavaScript ES6+, and API integration.',
      verify_url: 'https://freecodecamp.org/verify/WEB-77192',
      display_order: 3
    },
    {
      id: 4,
      title: 'Cloud Hosting & Deployment Essentials',
      issuer: 'AWS Academy / Vercel Developer Network',
      year: '2024',
      credential_id: 'CERT-CLOUD-33981',
      image_url: '/assets/election-sys.png',
      description: 'Fundamentals of cloud hosting, serverless deployments, domain routing, SSL configuration, and web application management.',
      verify_url: 'https://aws.amazon.com/verify/CLOUD-33981',
      display_order: 4
    },
    {
      id: 5,
      title: 'Database Design & MySQL Specialist',
      issuer: 'Oracle Academy / HackerRank',
      year: '2024',
      credential_id: 'CERT-SQL-55109',
      image_url: '/assets/phd-portal.png',
      description: 'Expertise in relational database schema design, complex multi-table SQL queries, indexing, and database performance optimization.',
      verify_url: 'https://hackerrank.com/certificates/SQL-55109',
      display_order: 5
    }
  ];
  writeJsonStore('certificates', certificates);

  // 7. Seed Settings
  const settings = [
    { id: 1, key_name: 'site_title', value_text: 'GOWTHAM G | Full Stack Developer | MCA Student' },
    { id: 2, key_name: 'logo_text', value_text: 'GOWTHAM G' },
    { id: 3, key_name: 'seo_description', value_text: 'Personal Portfolio of Gowtham G - MCA Student, Full Stack Developer, React Developer, Backend Developer, and Web Application Specialist based in Salem, Tamil Nadu, India.' },
    { id: 4, key_name: 'seo_keywords', value_text: 'Gowtham G, Full Stack Developer, React Developer, MCA Student, Backend Developer, Web Developer Portfolio, ReactJS, Node.js, Tailwind CSS, Salem' },
    { id: 5, key_name: 'footer_text', value_text: 'Designed & Developed with React, Tailwind CSS & Vite' }
  ];
  writeJsonStore('settings', settings);

  // 8. Seed Resumes
  const resumes = [
    {
      id: 1,
      file_name: 'resume-gowtham-g.pdf',
      file_url: '/assets/resume-gowtham-g.pdf',
      is_active: true,
      uploaded_at: new Date().toISOString()
    }
  ];
  writeJsonStore('resumes', resumes);

  // 9. Seed Initial Activity Logs
  const activity_logs = [
    {
      id: 1,
      admin_id: 1,
      admin_name: 'gowtham_admin',
      action: 'SYSTEM_INIT',
      module: 'System',
      details: 'Initialized Portfolio CMS Database & Admin Studio',
      ip_address: '127.0.0.1',
      created_at: new Date().toISOString()
    }
  ];
  writeJsonStore('activity_logs', activity_logs);

  console.log('[Seed] Database initialization and default admin seed completed successfully.');
};

// Execute seed if run directly
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  seedDatabase();
}
