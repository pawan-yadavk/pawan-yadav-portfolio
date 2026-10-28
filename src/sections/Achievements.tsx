import { motion } from 'framer-motion';
import { achievements } from '@/data/portfolio';
import { getIcon } from '@/lib/icons';
import { SectionHeading } from '@/sections/About';

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="06 — Highlights" title="Achievements & Learning" />

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {achievements.map((item, i) => {
            const Icon = getIcon(item.icon);
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group glass p-6 text-center transition hover:border-violet-500/40 hover:shadow-glow-violet"
              >
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-electric-500/20 to-violet-500/20 text-violet-400 transition group-hover:text-cyan-400">
                  <Icon size={26} />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
