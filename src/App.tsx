import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Skills from '@/sections/Skills';
import Experience from '@/sections/Experience';
import Resume from '@/sections/Resume';
import Projects from '@/sections/Projects';
import Achievements from '@/sections/Achievements';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';
import Chatbot from '@/components/Chatbot';
import MouseEffects from '@/components/MouseEffects';

export default function App() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <MouseEffects />
      {/* scroll progress bar */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-electric-500 via-cyan-400 to-violet-500"
      />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Resume />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
