import { motion } from 'framer-motion';
import { Download, FileText } from 'lucide-react';
import { personal } from '@/data/portfolio';
import { SectionHeading } from '@/sections/About';

export default function Resume() {
  return (
    <section id="resume" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading eyebrow="04 — Resume" title="Resume" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="glass-strong mt-12 flex flex-col items-center justify-between gap-6 p-6 text-center sm:flex-row sm:p-8 sm:text-left"
        >
          <div className="flex items-start gap-4">
            <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-gradient-to-br from-electric-500/20 to-violet-500/20 text-electric-400">
              <FileText size={22} />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold text-white">{personal.name}'s Resume</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">
                Education, technical skills, projects, and internship experience in one place.
              </p>
            </div>
          </div>
          {personal.resumeAvailable ? (
            <a href={personal.resumeUrl} download className="btn-primary magnetic-button w-full flex-none sm:w-auto">
              <Download size={16} /> Download Resume
            </a>
          ) : (
            <span className="btn-ghost w-full flex-none cursor-default opacity-75 sm:w-auto">
              <FileText size={16} /> Resume coming soon
            </span>
          )}
        </motion.div>
      </div>
    </section>
  );
}
