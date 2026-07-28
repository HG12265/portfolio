export const projectCategories = [
  'All',
  'Full Stack',
  'Academic Systems',
  'Management Portals',
  'E-Commerce'
];

export const projectsData = [
  {
    id: 'mentor-mentee-system',
    title: 'Mentor Mentee Management System',
    subtitle: 'Institutional mentor-student mapping & progress tracking platform',
    category: 'Academic Systems',
    image: '/assets/mentor-mentee.png',
    description: 'An enterprise web portal designed to automate student-faculty mentor assignments, track academic counseling sessions, and monitor student progress in real-time.',
    longDescription: 'The Mentor Mentee Management System eliminates manual spreadsheet tracking across academic departments. It provides role-based access for Admins, Mentors, and Mentees. Mentors can schedule counseling sessions, log discussion notes, upload performance reports, and trigger automated alerts for at-risk students.',
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
    github: 'https://github.com/gowthamg-dev/mentor-mentee-management-system',
    demo: 'https://mentor-mentee-portal.vercel.app',
    featured: true
  },
  {
    id: 'department-student-portal',
    title: 'Department Student Portal',
    subtitle: 'Unified academic dashboard for coursework & departmental announcements',
    category: 'Academic Systems',
    image: '/assets/dept-portal.png',
    description: 'A comprehensive academic management hub for students and faculty featuring timetable schedules, assignment submissions, attendance tracking, and real-time notices.',
    longDescription: 'Developed to streamline daily department activities, the Department Student Portal offers a centralized dashboard. Students can view personal timetables, track subject-wise attendance percentages, submit assignment files securely, and receive official departmental bulletins without email clutter.',
    tags: ['React.js', 'Tailwind CSS', 'Node.js', 'Express', 'MySQL'],
    features: [
      'Live dynamic timetable with active lecture highlights.',
      'Subject-wise attendance percentage tracker with warning badges below 75%.',
      'Secure file upload and grading system for course assignments.',
      'Departmental announcement ticker with tag-based filtering (Exam, Event, Urgent).',
      'Responsive dark/light interface optimized for mobile and desktop screens.'
    ],
    architecture: 'Relational database schema designed with MySQL ensuring data integrity across courses, enrollments, and submissions. Node/Express REST backend handling file storage and query optimization.',
    role: 'Full Stack Developer',
    duration: '2.5 Months',
    github: 'https://github.com/gowthamg-dev/department-student-portal',
    demo: 'https://dept-student-portal.vercel.app',
    featured: true
  },
  {
    id: 'online-examination-system',
    title: 'Online Examination System',
    subtitle: 'Secure digital assessment platform with automated evaluation',
    category: 'Full Stack',
    image: '/assets/online-exam.png',
    description: 'A robust web-based testing platform featuring timed examinations, random question shuffle, anti-proctoring tab switch detectors, and instant score analytics.',
    longDescription: 'Developed for conduct of internal assessment tests, this system allows faculty to build question banks with varying difficulty levels. During exams, candidate activity is monitored via browser visibility API to prevent tab switching, and answers are evaluated automatically upon submission.',
    tags: ['React.js', 'Node.js', 'MySQL', 'Tailwind CSS'],
    features: [
      'Countdown timer sync with auto-submission upon expiry.',
      'Tab-switch detection and anti-cheating security warnings.',
      'Automated grading for MCQ and short-answer matching questions.',
      'Comprehensive candidate performance dashboard with graphical score breakdown.',
      'Randomized question and option order generation per student session.'
    ],
    architecture: 'React frontend equipped with custom countdown hooks and browser event listeners. MySQL database handles flexible question bank schemas and candidate response objects.',
    role: 'Full Stack Developer',
    duration: '2 Months',
    github: 'https://github.com/gowthamg-dev/online-examination-system',
    demo: 'https://online-exam-system.vercel.app',
    featured: true
  },
  {
    id: 'college-election-system',
    title: 'College Election Management System',
    subtitle: 'Encrypted digital voting platform with transparent real-time tallying',
    category: 'Management Portals',
    image: '/assets/election-sys.png',
    description: 'A secure electronic voting application for student council elections, incorporating voter verification, encrypted ballot submissions, and live tally visualization.',
    longDescription: 'Designed to modernize student election processes, the application authenticates voters against college registration IDs. Each vote cast is cryptographically hashed to guarantee single-vote integrity while maintaining voter anonymity.',
    tags: ['React.js', 'Express.js', 'Node.js', 'MySQL', 'Tailwind CSS'],
    features: [
      'Multi-factor student voter verification system.',
      'Candidate campaign card showcasing manifestos and position claims.',
      'Cryptographically sealed vote casting ensuring complete voter anonymity.',
      'Real-time graphical vote tallying dashboard for election commissioners.',
      'Audit log trail for total votes cast versus verified voters.'
    ],
    architecture: 'MySQL database utilizing strict transaction isolation levels to prevent double-voting concurrency bugs.',
    role: 'Lead Developer',
    duration: '2 Months',
    github: 'https://github.com/gowthamg-dev/college-election-management',
    demo: 'https://college-election-portal.vercel.app',
    featured: false
  },
  {
    id: 'phd-entrance-portal',
    title: 'PhD Entrance Examination Portal',
    subtitle: 'National-level candidate registration & admit card generation system',
    category: 'Management Portals',
    image: '/assets/phd-portal.png',
    description: 'A scalable web application handling candidate registrations, document verifications, exam center allocations, and downloadable digital admit cards.',
    longDescription: 'Built to manage high-volume entrance examination workflows for postgraduate research programs. Candidates complete multi-step profile creation, upload academic credentials, pay fees (mock flow), and download QR-code verified admit cards.',
    tags: ['React.js', 'Node.js', 'Express', 'MySQL', 'Tailwind CSS'],
    features: [
      'Multi-step registration wizard with dynamic field validation.',
      'Document scanner upload module with size and format verification.',
      'Automated exam hall ticket generation with dynamic candidate QR codes.',
      'Admin portal for seat allotment and exam center capacity management.',
      'Instant result and cutoff publication dashboard.'
    ],
    architecture: 'Designed with reusable modular form components on React. Node.js backend dynamically generates high-resolution admit card PDFs on demand.',
    role: 'Full Stack Developer',
    duration: '3 Months',
    github: 'https://github.com/gowthamg-dev/phd-entrance-exam-portal',
    demo: 'https://phd-entrance-portal.vercel.app',
    featured: false
  },
  {
    id: 'ecommerce-website',
    title: 'Modern E-Commerce Store',
    subtitle: 'Responsive digital shop with product filtering, shopping cart & checkout',
    category: 'E-Commerce',
    image: '/assets/ecommerce.png',
    description: 'A modern, full-featured electronic commerce platform built with React and Tailwind CSS, featuring instantaneous product searching, category filters, and cart state persistence.',
    longDescription: 'A production-grade e-commerce application focusing on sub-second page transitions, responsive product grids, slide-over cart management, and seamless order review flows.',
    tags: ['React.js', 'Tailwind CSS', 'Context API', 'Node.js'],
    features: [
      'Real-time search and multi-attribute filter panel (Category, Price range, Rating).',
      'Persistent cart state using localStorage and React Context API.',
      'Product image zoom gallery and variant selectors.',
      'Checkout drawer with address validation and mock payment processing.',
      'Sleek dark theme UI optimized for maximum visual engagement.'
    ],
    architecture: 'Optimized React client with virtualized product lists for ultra-fast rendering. Custom hooks manage persistent cart state and query parameter routing.',
    role: 'Frontend & UI Developer',
    duration: '1.5 Months',
    github: 'https://github.com/gowthamg-dev/modern-ecommerce-react',
    demo: 'https://modern-tech-store.vercel.app',
    featured: true
  }
];
