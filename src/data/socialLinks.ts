import { personal } from '@/data/portfolio';

// Social links configuration.
// Add your real URLs below. An empty string ("") hides the icon automatically.

export type SocialLink = {
  key: string;
  label: string;
  href: string;
  icon: 'Github' | 'Linkedin' | 'Instagram' | 'Facebook' | 'Youtube' | 'Mail' | 'Code';
};

export const socialLinks: SocialLink[] = [
  {
    key: 'github',
    label: 'GitHub',
    href: 'https://github.com/pawan-yadavk',
    icon: 'Github',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/pawan-kumar-8a61242a8',
    icon: 'Linkedin',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/pawan.yadav_9/',
    icon: 'Instagram',
  },
  {
    key: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=100068387167161',
    icon: 'Facebook',
  },
  {
    key: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@PawanSirtvlog',
    icon: 'Youtube',
  },
  {
    key: 'email',
    label: 'Email',
    href: personal.email ? `mailto:${personal.email}` : '',
    icon: 'Mail',
  },
  {
    key: 'leetcode',
    label: 'LeetCode',
    href: 'https://leetcode.com/u/pawan_kumar9/',
    icon: 'Code',
  },
];

export const visibleSocials = socialLinks.filter((s) => s.href && s.href.length > 0);
