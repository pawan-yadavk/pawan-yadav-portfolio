// Projects configuration. Edit titles, descriptions, tech, links, and images here.
// For images: place a file in /public/projects/ and reference it like '/projects/foo.png'.
// If `image` is empty, a generated gradient visual is shown instead.
// Empty `liveUrl` or `repoUrl` hides that button.

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  technologies: string[];
  image: string; // optional image path under /public
  liveUrl: string;
  repoUrl: string;
  accent: 'electric' | 'violet' | 'cyan';
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: 'hirehelper',
    title: 'HireHelper',
    tagline: 'Service requests & task management',
    description:
      'A MERN-stack application for service requests and task management. Includes authentication, task feeds, requests, chat, notifications, user profiles, and settings.',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'JWT'],
    image: '/hirehelper.png',
    liveUrl: 'https://hire-helper-batch1.vercel.app/',
    repoUrl: 'https://github.com/pawan-yadavk/HireHelper-Batch1',
    accent: 'electric',
    featured: true,
  },
  {
    id: 'wanderlust-stay',
    title: 'Wanderlust Stay',
    tagline: 'Accommodation listing platform',
    description:
      'A MERN-based accommodation listing application inspired by vacation rental platforms. Features authentication, CRUD operations, reviews, Cloudinary image management, and maps.',
    technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'Cloudinary', 'Maps'],
    image: '/airbnb-clone.png',
    liveUrl: '', // Add live deployment URL if available
    repoUrl: '', // Add repository URL if available
    accent: 'violet',
  },
  {
    id: 'weather-app',
    title: 'Weather App',
    tagline: 'Live weather with clean UI',
    description:
      'Built with React, Vite, Material UI, and a weather API. Displays current weather information through a clean, intuitive interface with responsive design.',
    technologies: ['React', 'Vite', 'Material UI', 'Weather API'],
    image: '/weatherApp.png',
    liveUrl: '', // Add live deployment URL if available
    repoUrl: '', // Add repository URL if available
    accent: 'cyan',
  },
  {
    id: 'iphone-sales-dashboard',
    title: 'iPhone Sales Dashboard',
    tagline: 'Power BI sales analytics',
    description:
      'A Power BI dashboard for analyzing iPhone sales data. Includes sales metrics, transaction analysis, product breakdowns, and visual insights for decision-making.',
    technologies: ['Power BI', 'Data Analysis', 'Data Visualization'],
    image: '/powerbi-dashboard.png',
    liveUrl: '', // Add dashboard link or screenshot URL if available
    repoUrl: '',
    accent: 'electric',
  },
];
