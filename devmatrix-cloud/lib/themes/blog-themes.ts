export type ThemeId = 'default' | 'minimal' | 'dark-neon' | 'cyber' | 'gradient' | 'magazine' | 'retro' | 'ocean';

export interface BlogTheme {
  id: ThemeId;
  name: string;
  description: string;
  preview: string; // Preview image or icon
  colors: {
    background: string;
    cardBg: string;
    primary: string;
    secondary: string;
    text: string;
    textSecondary: string;
    border: string;
    accent: string;
  };
  typography: {
    fontFamily: string;
    headingWeight: string;
    bodyWeight: string;
  };
  layout: {
    cardBorderRadius: string;
    cardPadding: string;
    cardShadow: string;
    cardHoverEffect: string;
  };
  effects: {
    gradients: string[];
    animations: boolean;
    glowEffect: boolean;
  };
}

export const BLOG_THEMES: Record<ThemeId, BlogTheme> = {
  default: {
    id: 'default',
    name: 'Purple Dream',
    description: 'Classic purple theme with glassmorphism',
    preview: '🌌',
    colors: {
      background: 'bg-black',
      cardBg: 'bg-gray-900/50',
      primary: 'text-purple-200',
      secondary: 'text-purple-300/70',
      text: 'text-purple-100',
      textSecondary: 'text-purple-200/50',
      border: 'border-purple-500/20',
      accent: 'bg-purple-600',
    },
    typography: {
      fontFamily: 'font-sans',
      headingWeight: 'font-bold',
      bodyWeight: 'font-normal',
    },
    layout: {
      cardBorderRadius: 'rounded-xl',
      cardPadding: 'p-6',
      cardShadow: 'shadow-lg shadow-purple-900/20',
      cardHoverEffect: 'hover:shadow-2xl hover:shadow-purple-900/30 hover:-translate-y-1',
    },
    effects: {
      gradients: ['from-purple-600', 'to-purple-700'],
      animations: true,
      glowEffect: true,
    },
  },

  minimal: {
    id: 'minimal',
    name: 'Minimal Light',
    description: 'Clean and minimal design with focus on content',
    preview: '⚪',
    colors: {
      background: 'bg-gray-50',
      cardBg: 'bg-white',
      primary: 'text-gray-900',
      secondary: 'text-gray-600',
      text: 'text-gray-800',
      textSecondary: 'text-gray-500',
      border: 'border-gray-200',
      accent: 'bg-gray-900',
    },
    typography: {
      fontFamily: 'font-serif',
      headingWeight: 'font-semibold',
      bodyWeight: 'font-light',
    },
    layout: {
      cardBorderRadius: 'rounded-lg',
      cardPadding: 'p-8',
      cardShadow: 'shadow-sm',
      cardHoverEffect: 'hover:shadow-md',
    },
    effects: {
      gradients: ['from-gray-800', 'to-gray-900'],
      animations: false,
      glowEffect: false,
    },
  },

  'dark-neon': {
    id: 'dark-neon',
    name: 'Dark Neon',
    description: 'Vibrant neon colors on dark background',
    preview: '🌃',
    colors: {
      background: 'bg-slate-950',
      cardBg: 'bg-slate-900/80',
      primary: 'text-cyan-400',
      secondary: 'text-pink-400',
      text: 'text-cyan-100',
      textSecondary: 'text-cyan-300/60',
      border: 'border-cyan-500/30',
      accent: 'bg-gradient-to-r from-cyan-500 to-pink-500',
    },
    typography: {
      fontFamily: 'font-mono',
      headingWeight: 'font-black',
      bodyWeight: 'font-medium',
    },
    layout: {
      cardBorderRadius: 'rounded-2xl',
      cardPadding: 'p-6',
      cardShadow: 'shadow-2xl shadow-cyan-500/20',
      cardHoverEffect: 'hover:shadow-cyan-500/40 hover:border-cyan-400/50',
    },
    effects: {
      gradients: ['from-cyan-500', 'via-purple-500', 'to-pink-500'],
      animations: true,
      glowEffect: true,
    },
  },

  cyber: {
    id: 'cyber',
    name: 'Cyberpunk',
    description: 'Futuristic cyberpunk aesthetic',
    preview: '🤖',
    colors: {
      background: 'bg-black',
      cardBg: 'bg-gradient-to-br from-purple-900/20 to-pink-900/20',
      primary: 'text-yellow-400',
      secondary: 'text-purple-400',
      text: 'text-yellow-100',
      textSecondary: 'text-purple-300/70',
      border: 'border-yellow-500/40',
      accent: 'bg-yellow-500',
    },
    typography: {
      fontFamily: 'font-mono',
      headingWeight: 'font-extrabold',
      bodyWeight: 'font-normal',
    },
    layout: {
      cardBorderRadius: 'rounded-none',
      cardPadding: 'p-6',
      cardShadow: 'shadow-2xl shadow-yellow-500/10',
      cardHoverEffect: 'hover:shadow-yellow-500/30 hover:scale-105',
    },
    effects: {
      gradients: ['from-yellow-500', 'via-purple-500', 'to-pink-500'],
      animations: true,
      glowEffect: true,
    },
  },

  gradient: {
    id: 'gradient',
    name: 'Gradient Paradise',
    description: 'Colorful gradients everywhere',
    preview: '🌈',
    colors: {
      background: 'bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900',
      cardBg: 'bg-white/10 backdrop-blur-lg',
      primary: 'text-white',
      secondary: 'text-white/80',
      text: 'text-white',
      textSecondary: 'text-white/60',
      border: 'border-white/20',
      accent: 'bg-gradient-to-r from-orange-500 to-pink-500',
    },
    typography: {
      fontFamily: 'font-sans',
      headingWeight: 'font-bold',
      bodyWeight: 'font-normal',
    },
    layout: {
      cardBorderRadius: 'rounded-3xl',
      cardPadding: 'p-8',
      cardShadow: 'shadow-2xl shadow-black/30',
      cardHoverEffect: 'hover:shadow-black/50 hover:scale-[1.02]',
    },
    effects: {
      gradients: ['from-orange-500', 'via-pink-500', 'to-purple-500'],
      animations: true,
      glowEffect: true,
    },
  },

  magazine: {
    id: 'magazine',
    name: 'Magazine Style',
    description: 'Editorial magazine layout',
    preview: '📰',
    colors: {
      background: 'bg-stone-100',
      cardBg: 'bg-white',
      primary: 'text-stone-900',
      secondary: 'text-stone-700',
      text: 'text-stone-800',
      textSecondary: 'text-stone-600',
      border: 'border-stone-300',
      accent: 'bg-red-600',
    },
    typography: {
      fontFamily: 'font-serif',
      headingWeight: 'font-black',
      bodyWeight: 'font-normal',
    },
    layout: {
      cardBorderRadius: 'rounded-sm',
      cardPadding: 'p-6',
      cardShadow: 'shadow-xl',
      cardHoverEffect: 'hover:shadow-2xl',
    },
    effects: {
      gradients: ['from-red-600', 'to-red-700'],
      animations: false,
      glowEffect: false,
    },
  },

  retro: {
    id: 'retro',
    name: 'Retro Terminal',
    description: 'Old-school terminal vibes',
    preview: '💾',
    colors: {
      background: 'bg-black',
      cardBg: 'bg-green-950/30',
      primary: 'text-green-400',
      secondary: 'text-green-500',
      text: 'text-green-300',
      textSecondary: 'text-green-400/60',
      border: 'border-green-500/40',
      accent: 'bg-green-500',
    },
    typography: {
      fontFamily: 'font-mono',
      headingWeight: 'font-bold',
      bodyWeight: 'font-normal',
    },
    layout: {
      cardBorderRadius: 'rounded-none',
      cardPadding: 'p-4',
      cardShadow: 'shadow-none',
      cardHoverEffect: 'hover:border-green-400',
    },
    effects: {
      gradients: ['from-green-500', 'to-green-600'],
      animations: false,
      glowEffect: true,
    },
  },

  ocean: {
    id: 'ocean',
    name: 'Ocean Breeze',
    description: 'Deep sea blues and teals for a relaxing reading experience',
    preview: '🌊',
    colors: {
      background: 'bg-slate-900',
      cardBg: 'bg-slate-800/80',
      primary: 'text-teal-300',
      secondary: 'text-blue-300',
      text: 'text-slate-100',
      textSecondary: 'text-slate-400',
      border: 'border-teal-500/30',
      accent: 'bg-teal-500',
    },
    typography: {
      fontFamily: 'font-sans',
      headingWeight: 'font-bold',
      bodyWeight: 'font-normal',
    },
    layout: {
      cardBorderRadius: 'rounded-xl',
      cardPadding: 'p-6',
      cardShadow: 'shadow-lg shadow-teal-900/20',
      cardHoverEffect: 'hover:shadow-2xl hover:shadow-teal-900/30 hover:-translate-y-1',
    },
    effects: {
      gradients: ['from-teal-500', 'to-blue-500'],
      animations: true,
      glowEffect: true,
    },
  },
};
