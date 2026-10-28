import { motion } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';
import { about, personal } from '@/data/portfolio';

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="01 — About" title="About Me" />

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="glass-strong p-6 sm:p-8 lg:col-span-3"
          >
            <div className="space-y-4 text-sm leading-relaxed text-slate-300 sm:text-base">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 lg:col-span-2"
          >
            
<div className="glass p-6">
  <div className="flex items-center gap-3 text-electric-400">
    <GraduationCap size={20} />
    <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
      Education
    </h3>
            </div>
            <div className="mt-4 space-y-5">
              <div>
                <p className="font-semibold text-white">
                  {personal.education.degree}
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  {personal.education.college}
                </p>
                <p className="mt-1 text-xs text-electric-400">
                  Expected Graduation: {personal.education.graduationYear}
                </p>
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="font-semibold text-white">Class 12th — BSEB</p>
                <p className="mt-1 text-sm text-slate-400">
                  {personal.education.school12.college}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {personal.education.school12.year}
                </p>
              </div>

              <div className="border-t border-white /10 pt-4">
                <p className="font-semibold text-white">Class 10th — BSEB</p>
                <p className="mt-1 text-sm text-slate-400">
                  {personal.education.school10.school}
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  {personal.education.school10.year}
                </p>
              </div>
            </div>
          </div>

            <div className="glass p-6">
              <div className="flex items-center gap-3 text-violet-400">
                <MapPin size={20} />
                <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
                  Location
                </h3>
              </div>
                  <p className="mt-3 text-sm text-slate-300">
                    Currently based in {personal.location}
                  </p>
                  <p className="mt-2 text-sm text-slate-300">
                    Hometown: {personal.hometown}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Open to remote & in-person roles
                  </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-electric-400">{eyebrow}</p>
      <h2 className="mt-3 section-title">{title}</h2>
      <div className="mx-auto mt-4 h-px w-24 bg-gradient-to-r from-transparent via-electric-500 to-transparent" />
    </motion.div>
  );
}
