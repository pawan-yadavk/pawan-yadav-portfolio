// Local knowledge base for the demo portfolio chatbot.
// Used to answer questions about Pawan without any external API.

export const chatbotSuggestions = [
  'Tell me about Pawan.',
  'What projects has he built?',
  'What was his role in HireHelper?',
  'Which technologies does he use?',
  'How can I contact him?',
];

type QA = { keywords: string[]; answer: string };

export const chatbotKnowledge: QA[] = [
  {
    keywords: ['who', 'about', 'tell me about pawan', 'pawan', 'introduction', 'background'],
    answer:
      "Pawan Yadav is a Full Stack Web Developer based in Bhopal, India. He's pursuing a B.Tech in Computer Science and Cyber Security at Sagar Institute of Research & Technology, graduating in 2027. He builds responsive web applications end-to-end and enjoys solving problems through code.",
  },
  {
    keywords: ['project', 'projects', 'built', 'work', 'portfolio'],
    answer:
      'Pawan has built several projects:\n\n• HireHelper — a MERN-stack service request & task management app (his flagship internship project).\n• Wanderlust Stay — a MERN accommodation listing platform with reviews, Cloudinary images, and maps.\n• Weather App — a React + Vite + Material UI app that shows live weather data.\n• iPhone Sales Dashboard — a Power BI dashboard analyzing iPhone sales. You can see all of them in the Projects section.',
  },
  {
    keywords: ['hirehelper', 'role', 'internship', 'infosys', 'contribution', 'did he do'],
    answer:
      'During the Infosys Springboard Software Development Internship (Feb–Apr 2026), Pawan worked on HireHelper as a Software Development Intern. He built backend APIs, integrated database operations, implemented authentication flows, and contributed to core features like task feeds, requests, and notifications — all as part of a team.',
  },
  {
    keywords: ['tech', 'technology', 'technologies', 'stack', 'skills', 'languages', 'tools', 'framework'],
    answer:
      'Pawan works with:\n\n• Frontend: HTML, CSS, JavaScript, React, responsive design\n• Backend: Node.js, Express, REST APIs, authentication\n• Database: MongoDB, SQL\n• Tools: Git, GitHub, VS Code, Power BI\n• Programming: Java, C, OOP, and DSA fundamentals',
  },
  {
    keywords: ['contact', 'email', 'reach', 'hire', 'get in touch', 'connect'],
    answer:
      'You can reach Pawan through the Contact section on this site. You can also find his GitHub at github.com/pawan-yadavk. His email and other social links will appear there once configured — scroll to the contact form to send a message!',
  },
  {
    keywords: ['education', 'college', 'degree', 'study', 'b.tech', 'graduation'],
    answer:
      "Pawan is pursuing a B.Tech in Computer Science and Cyber Security at Sagar Institute of Research & Technology, Bhopal, with an expected graduation in 2027.",
  },
  {
    keywords: ['location', 'where', 'based', 'live', 'from'],
    answer: 'Pawan is based in Bhopal, Madhya Pradesh, India.',
  },
  {
    keywords: ['experience', 'job', 'work experience', 'intern'],
    answer:
      "Pawan completed the Infosys Springboard Virtual Software Development Internship (Feb–Apr 2026) as a Software Development Intern, working on the HireHelper project — contributing to backend APIs, database integration, authentication, and application functionality.",
  },
  {
    keywords: ['achievements', 'awards', 'certificates', 'accomplishments'],
    answer:
      "Pawan's highlights include shipping real full-stack projects (HireHelper, Wanderlust Stay, Weather App), completing the Infosys Springboard internship, and actively strengthening his skills in full-stack development, Java, and DSA.",
  },
  {
    keywords: ['resume', 'cv', 'download'],
    answer:
      "A resume download button is available in the hero section. It's a placeholder until Pawan adds his actual PDF at /public/resume.pdf — once added, the button will download the real file.",
  },
];

export const chatbotFallback =
  "I'm not sure about that — I can only answer questions about Pawan's background, projects, skills, experience, and contact info. Try one of the suggested questions below!";

export function getChatbotAnswer(question: string): string {
  const q = question.toLowerCase().trim();
  if (!q) return chatbotFallback;

  let best: { score: number; answer: string } | null = null;
  for (const qa of chatbotKnowledge) {
    let score = 0;
    for (const kw of qa.keywords) {
      if (q.includes(kw)) score += kw.split(' ').length;
    }
    if (best === null || score > best.score) {
      if (score > 0) best = { score, answer: qa.answer };
    }
  }
  return best ? best.answer : chatbotFallback;
}
