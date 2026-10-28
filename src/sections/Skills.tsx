import { skills } from '@/data/portfolio';
import { getIcon } from '@/lib/icons';
import { SectionHeading } from '@/sections/About';
import TiltCard from '@/components/TiltCard';

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="02 — Skills" title="Skills & Tech Stack" />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, gi) => {
            const Icon = getIcon(group.icon);
            return (
              <TiltCard
                key={group.category}
                revealDelay={gi * 0.08}
                className="group glass p-6 transition hover:border-electric-500/40 hover:shadow-glow"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-electric-500/20 to-violet-500/20 text-electric-400 transition group-hover:text-cyan-400">
                    <Icon size={18} />
                  </span>
                  <h3 className="font-display text-base font-semibold text-white">{group.category}</h3>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="chip transition group-hover:border-electric-500/30 group-hover:text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
