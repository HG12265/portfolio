import {
  FaReact, FaNodeJs, FaPython, FaGitAlt, FaHtml5, FaCss3Alt,
  FaJsSquare, FaDocker, FaAws, FaGithub, FaCode
} from 'react-icons/fa';
import {
  SiTailwindcss, SiExpress, SiMysql
} from 'react-icons/si';

export const skillCategories = [
  { id: 'all', name: 'All Skills' },
  { id: 'frontend', name: 'Frontend' },
  { id: 'backend', name: 'Backend' },
  { id: 'programming', name: 'Programming' },
  { id: 'database', name: 'Database' },
  { id: 'hosting', name: 'Hosting & Deployment' },
  { id: 'tools', name: 'Tools' }
];

export const skillsData = [
  // Frontend
  {
    name: 'HTML5',
    category: 'frontend',
    icon: FaHtml5,
    proficiency: 'Advanced',
    color: '#E34F26',
    description: 'Semantic markup, accessibility standards, web forms, structured document hierarchy.'
  },
  {
    name: 'CSS3',
    category: 'frontend',
    icon: FaCss3Alt,
    proficiency: 'Advanced',
    color: '#1572B6',
    description: 'Flexbox, Grid layouts, custom animations, media queries, responsive design.'
  },
  {
    name: 'JavaScript',
    category: 'frontend',
    icon: FaJsSquare,
    proficiency: 'Advanced',
    color: '#F7DF1E',
    description: 'ES6+ syntax, asynchronous programming, DOM manipulation, web APIs.'
  },
  {
    name: 'React.js',
    category: 'frontend',
    icon: FaReact,
    proficiency: 'Advanced',
    color: '#61DAFB',
    description: 'Component-based architecture, Hooks, state management, SPA routing.'
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    icon: SiTailwindcss,
    proficiency: 'Advanced',
    color: '#38BDF8',
    description: 'Utility-first styling, custom design systems, responsive layout utility classes.'
  },

  // Backend
  {
    name: 'Node.js',
    category: 'backend',
    icon: FaNodeJs,
    proficiency: 'Advanced',
    color: '#339933',
    description: 'Server-side JavaScript runtime, event-driven architecture, RESTful API services.'
  },
  {
    name: 'Express.js',
    category: 'backend',
    icon: SiExpress,
    proficiency: 'Advanced',
    color: '#F8FAFC',
    description: 'Routing controllers, custom middleware, JWT authentication, error handling.'
  },

  // Programming
  {
    name: 'Python',
    category: 'programming',
    icon: FaPython,
    proficiency: 'Intermediate',
    color: '#3776AB',
    description: 'Object-oriented programming, data structures, backend scripting, automation.'
  },

  // Database
  {
    name: 'MySQL',
    category: 'database',
    icon: SiMysql,
    proficiency: 'Advanced',
    color: '#4479A1',
    description: 'Relational database management, complex SQL queries, table indexing, joins.'
  },

  // Hosting & Deployment
  {
    name: 'AWS',
    category: 'hosting',
    icon: FaAws,
    proficiency: 'Intermediate',
    color: '#FF9900',
    description: 'Cloud hosting, EC2 instances, S3 bucket storage, cloud deployment workflows.'
  },
  {
    name: 'Docker',
    category: 'hosting',
    icon: FaDocker,
    proficiency: 'Basic',
    color: '#2496ED',
    description: 'Containerization basics, Dockerfile creation, local environment setup.'
  },

  // Tools
  {
    name: 'Git',
    category: 'tools',
    icon: FaGitAlt,
    proficiency: 'Advanced',
    color: '#F05032',
    description: 'Distributed version control, branching strategies, commit history management.'
  },
  {
    name: 'GitHub',
    category: 'tools',
    icon: FaGithub,
    proficiency: 'Advanced',
    color: '#F8FAFC',
    description: 'Repository hosting, Pull Request reviews, GitHub Actions, project management.'
  },
  {
    name: 'VS Code',
    category: 'tools',
    icon: FaCode,
    proficiency: 'Advanced',
    color: '#007ACC',
    description: 'Primary IDE, debugging, extension configuration, integrated terminal.'
  }
];
