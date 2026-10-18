export const certificateCategories = [
  { id: 'all', label: 'All Accolades' },
  { id: 'symposium', label: 'Symposium Wins' },
  { id: 'intercollege', label: 'Inter-College Fests' },
  { id: 'course', label: 'Course Certifications' },
  { id: 'project', label: 'Project Credentials' }
];
pdate
export const certificatesList = [
  {
    id: 'nptel-python',
    category: 'course',
    categoryLabel: 'Course Certification',
    title: 'The Joy of Computing using Python',
    organization: 'NPTEL · IIT Madras',
    duration: 'Jan – Apr 2026 (12 Weeks)',
    award: 'Verified Elite Certificate',
    awardType: 'certified',
    credentialId: 'NPTEL26CS84S46490101104522103',
    featured: true,
    description: 'Successfully completed the 12-week comprehensive NPTEL certification course on Python programming, algorithm design, computational logic, and problem-solving techniques.',
    skills: ['Python', 'Data Structures', 'Computational Thinking', 'Algorithm Design'],
    fileUrl: '/assets/NPTEL26CS84S46490101104522103.pdf',
    fileType: 'pdf'
  },
  {
    id: 'symposium-web-1st',
    category: 'symposium',
    categoryLabel: 'Symposium Award',
    title: 'State-Level Technical Symposium — Web Design Challenge',
    organization: 'Department of Computer Applications',
    duration: '2024 – 2025',
    award: '1st Prize Winner 🥇',
    awardType: 'winner',
    credentialId: 'SYM-WEB-2024-01',
    featured: true,
    description: 'Awarded First Prize in the state-level inter-collegiate symposium web development competition for building a responsive, accessible and interactive web application within timed limits.',
    skills: ['React.js', 'UI/UX Design', 'CSS Architecture', 'Rapid Prototyping'],
    fileUrl: '',
    fileType: 'badge'
  },
  {
    id: 'inter-code-debug-1st',
    category: 'intercollege',
    categoryLabel: 'Inter-College Event',
    title: 'Inter-Collegiate Technical Meet — Code Debugging',
    organization: 'AVS Arts & Science College · Tech Fest',
    duration: '2023 – 2024',
    award: '1st Prize Winner 🏆',
    awardType: 'winner',
    credentialId: 'INT-DBG-2023-88',
    featured: true,
    description: 'Secured First Place in the inter-collegiate code debugging and optimization contest, identifying logical syntax bugs and refactoring algorithmic bottlenecks in C, Python and JavaScript.',
    skills: ['Code Debugging', 'Algorithm Optimization', 'Problem Solving', 'C / C++'],
    fileUrl: '',
    fileType: 'badge'
  },
  {
    id: 'symposium-paper-presentation',
    category: 'symposium',
    categoryLabel: 'Symposium Award',
    title: 'National Technical Symposium — Paper Presentation',
    organization: 'Periyar University Affiliated Institutions',
    duration: '2024',
    award: 'Runner-Up Award 🥈',
    awardType: 'runnerup',
    credentialId: 'SYM-PPT-2024-12',
    featured: false,
    description: 'Presented a technical research paper on modern scalable web architectures, microservices vs monoliths, and practical relational database optimizations for university portals.',
    skills: ['Technical Writing', 'Web Architecture', 'Database Systems', 'Public Speaking'],
    fileUrl: '',
    fileType: 'badge'
  },
  {
    id: 'inter-tech-quiz',
    category: 'intercollege',
    categoryLabel: 'Inter-College Event',
    title: 'Inter-Collegiate IT Fest — Technical Quiz & Web Quiz',
    organization: 'District Inter-College Tech Meet',
    duration: '2023',
    award: 'Cash Award Winner 🎖️',
    awardType: 'winner',
    credentialId: 'INT-QZ-2023-45',
    featured: false,
    description: 'Achieved top honors and cash award in the inter-collegiate technical quiz testing computer network protocols, database concepts, web standards, and software engineering.',
    skills: ['Computer Networks', 'DBMS Concepts', 'Web Protocols', 'Analytical Aptitude'],
    fileUrl: '',
    fileType: 'badge'
  },
  {
    id: 'project-dept-portal',
    category: 'project',
    categoryLabel: 'Project Credential',
    title: 'Academic Department Portal — Project Completion Certificate',
    organization: 'College Academic Development Cell',
    duration: '2024',
    award: 'Project of Excellence ⚡',
    awardType: 'excellence',
    credentialId: 'PRJ-MCA-PORTAL-01',
    featured: true,
    description: 'Received certificate of project excellence for designing and engineering an end-to-end institutional web portal with student management, role-based authentication, and automated workflows.',
    skills: ['React.js', 'Node.js', 'MySQL', 'Full Stack Architecture', 'REST APIs'],
    fileUrl: '',
    fileType: 'badge'
  },
  {
    id: 'fullstack-dev-training',
    category: 'course',
    categoryLabel: 'Course Certification',
    title: 'Full-Stack Web Development & Modern JavaScript',
    organization: 'Specialized Developer Training Program',
    duration: '2023 – 2024',
    award: 'Certificate of Completion 📜',
    awardType: 'certified',
    credentialId: 'CERT-FS-DEV-2024',
    featured: false,
    description: 'Completed hands-on practical training covering ES6+ JavaScript, responsive design patterns, RESTful API consumption, state management, and modern component lifecycle.',
    skills: ['JavaScript ES6+', 'React.js', 'Responsive Design', 'API Integration'],
    fileUrl: '',
    fileType: 'badge'
  }
];

export const certificateStats = [
  {
    id: 'symposium',
    number: '3+',
    label: 'Symposium Honors',
    desc: 'State & National Level Wins'
  },
  {
    id: 'inter',
    number: '4+',
    label: 'Inter-College Fests',
    desc: 'Debugging & Tech Events'
  },
  {
    id: 'course',
    number: '2+',
    label: 'Certified Courses',
    desc: 'NPTEL & Full-Stack'
  },
  {
    id: 'project',
    number: '100%',
    label: 'Verified Projects',
    desc: 'Academic & Live Systems'
  }
];
