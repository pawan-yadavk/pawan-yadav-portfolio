import { visibleSocials } from '@/data/socialLinks';
import { getIcon } from '@/lib/icons';

export function SocialIcons({ className = '' }: { className?: string }) {
  if (visibleSocials.length === 0) return null;
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {visibleSocials.map((s) => {
        const Icon = getIcon(s.icon);
        return (
          <a
            key={s.key}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="grid h-10 w-10 place-items-center rounded-xl glass text-slate-300 transition hover:text-white hover:border-electric-500/50 hover:shadow-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-400"
          >
            <Icon size={18} />
          </a>
        );
      })}
    </div>
  );
}
