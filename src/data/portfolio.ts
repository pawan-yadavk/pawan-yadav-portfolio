// Central configuration for all personal information.
// Edit the values below to update your portfolio. Empty string ("") hides a link.

export const personal = {
  name: 'Pawan Yadav',
  firstName: 'Pawan',
  initials: 'PK',
  role: 'Full Stack Developer',
  tagline: 'Building Modern Web Experiences',
  profileImage: '/images/Document_Photo1.png',
  profileImageAlt: 'Pawan Yadav, Full Stack Developer',
  location: 'Bhopal, Madhya Pradesh, India',
  hometown: 'Saran, Bihar, India',
  email: 'pawanyadav05102005@gmail.com', 
  phone: '9334294779',
  resumeUrl: '/resume.pdf',
  resumeAvailable: true,

  education: {
  degree: 'B.Tech in Computer Science and Cyber Security',
  college: 'Sagar Institute of Research & Technology, Bhopal',
  graduationYear: '2027',

  school12: {
    qualification: 'Class 12th',
    board: 'BSEB',
    college: 'Parbhunath College, Parsa, Saran, Bihar',
    year: '2023',
  },

  school10: {
    qualification: 'Class 10th',
    board: 'BSEB',
    school: 'Vidya Niketan High School, Marar, Saran, Bihar',
    year: '2021',
  },
},

  heroIntro:
    'I build responsive web applications and enjoy solving problems through code — from clean, accessible interfaces to robust backend APIs and databases.',
  roles: [
    'Full Stack Developer',
    'MERN Stack Developer',
    'React Developer',
    'Node.js Developer',
    'Problem Solver',
  ],
};

export const about = {
  paragraphs: [
    "I'm Pawan Yadav, a Full Stack Developer based in Bhopal, India. I'm currently pursuing my B.Tech in Computer Science and Cyber Security at Sagar Institute of Research & Technology, with an expected graduation in 2027.",
    'I enjoy building useful applications end-to-end — designing intuitive frontends, writing maintainable backend APIs, and wiring up databases that make a product actually work. I value clean code, responsive design, and learning by shipping real projects.',
    'As part of the Infosys Springboard Software Development Internship, I contributed to HireHelper, a MERN-stack application for service requests and task management. I worked on backend APIs, database integration, authentication, and core application functionality alongside my team.',
    "Beyond projects, I'm actively strengthening my fundamentals in Java and Data Structures & Algorithms, and exploring full-stack development patterns to grow as a developer.",
  ],
};

export const experience = [
  {
    id: 'infosys-springboard',
    organization: 'Infosys Springboard',
    role: 'Software Development Intern',
    period: 'February 2026 – April 2026',
    location: 'Virtual',
    project: 'HireHelper',
    bullets: [
      'Built backend APIs and integrated database operations for a MERN-stack service-request and task-management application.',
      'Implemented authentication flows and protected routes for users and service providers.',
      'Contributed to core application functionality including task feeds, requests, and notifications.',
      'Worked as part of a collaborative team, following Git workflows and code reviews.',
    ],
  },
  {
  id: 'power-bi-training',
  organization: 'SAGE / SIRT',
  role: 'Power BI Trainee',
  period: 'Summer Training',
  location: 'Bhopal',
  project: 'iPhone Sales Dashboard',
  bullets: [
    'Created an interactive Power BI dashboard to analyze iPhone sales data.',
    'Used charts and visualizations to present sales trends and key metrics.',
    'Practiced data analysis and dashboard design using Power BI.',
  ],
},
];

export const achievements = [
  {
    icon: 'Rocket',
    title: 'Shipped Real Projects',
    description:
      'Built and deployed full-stack applications including HireHelper, Wanderlust Stay, and a Weather App using the MERN stack and React.',
  },
  {
    icon: 'GraduationCap',
    title: 'Internship Experience',
    description:
      'Completed the Infosys Springboard Software Development Internship, contributing to HireHelper as a Software Development Intern.',
  },
  {
    icon: 'Code',
    title: 'Actively Learning',
    description:
      'Strengthening full-stack development, Java, and Data Structures & Algorithms fundamentals while studying CS & Cyber Security.',
  },
];

export const skills = [
  {
    category: 'Frontend',
    icon: 'Monitor',
    items: ['HTML', 'CSS', 'JavaScript', 'React.js', 'Responsive Web Design'],
  },
  {
    category: 'Backend',
    icon: 'Server',
    items: ['Node.js', 'Express.js', 'REST APIs', 'Authentication'],
  },
  {
    category: 'Database',
    icon: 'Database',
    items: ['MongoDB', 'SQL'],
  },
  {
    category: 'Tools',
    icon: 'Wrench',
    items: ['Git', 'GitHub', 'VS Code', 'Power BI'],
  },
  {
    category: 'Programming & Fundamentals',
    icon: 'Cpu',
    items: ['Java', 'C', 'Object-Oriented Programming', 'DSA fundamentals'],
  },
];

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Resume', href: '#resume' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];
