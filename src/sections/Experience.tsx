import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, GitBranch } from 'lucide-react';
import { experience } from '@/data/portfolio';
import { SectionHeading } from '@/sections/About';

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading eyebrow="03 — Experience" title="Experience" />

        <div className="relative mt-14 pl-8">
          {/* timeline line */}
          <div className="absolute left-[7px] top-1 h-full w-px bg-gradient-to-b from-electric-500 via-violet-500 to-transparent" />

          {experience.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative mb-10 last:mb-0"
            >
              <span className="absolute -left-[29px] top-1.5 grid h-4 w-4 place-items-center rounded-full bg-ink-950 ring-2 ring-electric-500">
                <span className="h-1.5 w-1.5 rounded-full bg-electric-400" />
              </span>

              <div className="glass-strong p-6 sm:p-8 transition hover:border-electric-500/40">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-electric-400">
                    <Briefcase size={16} />
                    <h3 className="font-display text-lg font-semibold text-white">{exp.role}</h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] px-3 py-1 text-xs font-medium text-slate-300">
                    <Calendar size={12} /> {exp.period}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span className="font-medium text-violet-400">{exp.organization}</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin size={12} /> {exp.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <GitBranch size={12} /> Project: {exp.project}
                  </span>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} className="flex gap-2.5 text-sm text-slate-300">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-gradient-to-r from-electric-400 to-violet-400" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
