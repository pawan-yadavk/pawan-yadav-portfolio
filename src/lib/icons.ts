import {
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Code,
  Monitor,
  Server,
  Database,
  Wrench,
  Cpu,
  Rocket,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Code,
  Monitor,
  Server,
  Database,
  Wrench,
  Cpu,
  Rocket,
  GraduationCap,
};

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Code;
}
