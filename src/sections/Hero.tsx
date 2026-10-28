import { lazy, Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, FileText } from 'lucide-react';
import { personal } from '@/data/portfolio';
import { useTypingText } from '@/lib/useTypingText';
import { SocialIcons } from '@/components/SocialIcons';

const HeroScene = lazy(() => import('@/components/HeroScene'));

export default function Hero() {
  const typed = useTypingText(personal.roles);
  const [photoAvailable, setPhotoAvailable] = useState(true);

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden px-0 pt-28 pb-16 sm:pt-32 lg:pb-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-grid-glow" />
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-electric-500/40 to-transparent" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="order-2 text-center lg:order-1 lg:text-left"
        >
          <span className="chip mx-auto mb-5 border-electric-500/30 text-electric-400 lg:mx-0">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-electric-400" />
            </span>
            Available for opportunities
          </span>

          <p className="font-mono text-sm text-slate-400">Hi, I'm</p>
          <h1 className="mt-1 font-display text-[clamp(2.25rem,8vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-white text-balance">
            {personal.name}
          </h1>

          <div className="mt-4 flex min-h-[2.25rem] items-center justify-center gap-2 lg:justify-start">
            <span className="font-display text-lg font-semibold text-slate-300 sm:text-2xl">
              {typed}
            </span>
            <span className="inline-block h-6 w-[2px] animate-pulse bg-electric-400 sm:h-7" />
          </div>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base lg:mx-0 text-balance">
            {personal.heroIntro}
          </p>

          <div className="mt-7 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:justify-start">
            <a href="#projects" className="btn-primary magnetic-button w-full sm:w-auto">
              View Projects <ArrowRight size={16} />
            </a>

            {personal.resumeAvailable ? (
              <a href={personal.resumeUrl} download className="btn-ghost magnetic-button w-full sm:w-auto">
                <Download size={16} /> Download Resume
              </a>
            ) : (
              <span
                className="btn-ghost w-full cursor-default opacity-80 sm:w-auto"
                title="Add your real resume PDF and update resumeUrl in portfolio.ts"
              >
                <FileText size={16} /> Resume unavailable
              </span>
            )}

            <a href="#contact" className="btn-ghost magnetic-button w-full sm:w-auto">
              <Mail size={16} /> Contact Me
            </a>
          </div>

          <div className="mt-7 flex justify-center lg:justify-start">
            <SocialIcons />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="order-1 relative mx-auto h-[340px] w-full max-w-[430px] sm:h-[430px] lg:order-2 lg:h-[500px]"
        >
          <div className="absolute inset-10 rounded-full bg-gradient-to-br from-electric-500/25 to-violet-500/25 blur-3xl" />
          <div className="absolute inset-0 opacity-75">
            <Suspense
              fallback={
                <div className="grid h-full place-items-center">
                  <div className="h-10 w-10 animate-spin rounded-full border-2 border-electric-500 border-t-transparent" />
                </div>
              }
            >
              <HeroScene />
            </Suspense>
          </div>

          
          <div className="portrait-orbit absolute left-1/2 top-1/2 h-[290px] w-[290px] -translate-x-1/2 -translate-y-1/2 sm:h-[360px] sm:w-[360px] lg:h-[400px] lg:w-[400px]">
            <div className="portrait-frame group absolute left-1/2 top-1/2 h-[210px] w-[210px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full sm:h-[260px] sm:w-[260px] lg:h-[290px] lg:w-[290px]">
              {photoAvailable ? (
                <img
                  src={personal.profileImage}
                  alt={personal.profileImageAlt}
                  className="h-full w-full rounded-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  onError={() => setPhotoAvailable(false)}
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-5 text-center">
                  <span className="font-display text-5xl font-bold gradient-text">
                    {personal.initials}
                  </span>
                  <span className="text-xs leading-relaxed text-slate-400">
                    Profile photo placeholder
                  </span>
                </div>
              )}
            </div>
          </div>


        <span className="absolute bottom-12 left-2 rounded-xl border border-white/10 bg-ink-900/70 px-3 py-2 text-[10px] font-medium text-slate-400 backdrop-blur-xl sm:left-4">
          {personal.role}
      </span>
        </motion.div>
      </div>

      <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 sm:block">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-2 text-slate-500"
        >
          <span className="text-xs">Scroll</span>
          <span className="flex h-8 w-5 justify-center rounded-full border border-white/15 p-1">
            <motion.span
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-electric-400"
            />
          </span>
        </motion.div>
      </div>
    </section>
  );
}
