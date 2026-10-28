import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { navLinks, personal } from '@/data/portfolio';
import { SocialIcons } from '@/components/SocialIcons';

export default function Footer() {
  const year = new Date().getFullYear();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer className="relative border-t border-white/10 bg-ink-950/60 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <a href="#home" className="inline-flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-electric-500 to-violet-500 font-display text-sm font-bold text-white">
                {personal.initials}
              </span>
              <span className="font-display text-base font-semibold text-white">{personal.name}</span>
            </a>
            <p className="mt-2 text-xs text-slate-500">
              {personal.role} · {personal.location}
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs font-medium text-slate-400 transition hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <SocialIcons />
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {year} {personal.name} Pvt Ltd.
          </p>
          <p className="text-xs text-slate-600">Designed & developed by : {personal.name}</p>
        </div>
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="fixed bottom-24 right-5 z-40 grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-electric-500 to-violet-500 text-white shadow-glow transition hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-400 sm:bottom-6"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
