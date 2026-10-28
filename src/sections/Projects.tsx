import { ExternalLink, Github, FolderGit2 } from 'lucide-react';
import { projects, type Project } from '@/data/projects';
import { SectionHeading } from '@/sections/About';
import TiltCard from '@/components/TiltCard';

const accentMap: Record<Project['accent'], { ring: string; text: string; from: string; to: string; shadow: string }> = {
  electric: {
    ring: 'hover:border-electric-500/50',
    text: 'text-electric-400',
    from: 'from-electric-500/25',
    to: 'to-electric-500/0',
    shadow: 'hover:shadow-glow',
  },
  violet: {
    ring: 'hover:border-violet-500/50',
    text: 'text-violet-400',
    from: 'from-violet-500/25',
    to: 'to-violet-500/0',
    shadow: 'hover:shadow-glow-violet',
  },
  cyan: {
    ring: 'hover:border-cyan-500/50',
    text: 'text-cyan-400',
    from: 'from-cyan-500/25',
    to: 'to-cyan-500/0',
    shadow: 'hover:shadow-glow-cyan',
  },
};

function ProjectVisual({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="relative h-full w-full overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
      </div>
    );
  }
  // generated gradient visual
  const a = accentMap[project.accent];
  return (
    <div className="relative grid h-full w-full place-items-center overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${a.from} ${a.to}`} />
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.15),transparent_40%)]" />
      <div className={`relative grid h-20 w-20 place-items-center rounded-2xl glass ${a.text}`}>
        <FolderGit2 size={36} />
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="05 — Projects" title="Featured Projects" />
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-slate-400 text-balance">
          A selection of projects I've built — from full-stack web apps to data dashboards. Links
          marked as placeholders can be added in <code className="text-electric-400">src/data/projects.ts</code>.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => {
            const a = accentMap[project.accent];
            return (
              <TiltCard
                key={project.id}
                revealDelay={i * 0.08}
                className={`group glass flex flex-col overflow-hidden transition ${a.ring} ${a.shadow}`}
              >
                <div className="relative h-44 sm:h-52">
                  <ProjectVisual project={project} />
                  {project.featured && (
                    <span className="absolute left-4 top-4 rounded-full bg-electric-500/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold text-white">{project.title}</h3>
                  </div>
                  <p className={`mt-1 text-sm font-medium ${a.text}`}>{project.tagline}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{project.description}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="chip text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2.5 pt-2">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-electric-500 to-violet-500 px-3.5 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5"
                      >
                        <ExternalLink size={14} /> Live App
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3.5 py-2 text-xs font-medium text-slate-500">
                        <ExternalLink size={14} /> Live (add link)
                      </span>
                    )}

                    {project.repoUrl ? (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3.5 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/[0.06] hover:text-white"
                      >
                        <Github size={14} /> Source Code
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3.5 py-2 text-xs font-medium text-slate-500">
                        <Github size={14} /> Repo (add link)
                      </span>
                    )}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
