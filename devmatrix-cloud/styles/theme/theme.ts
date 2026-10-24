export const themeNames = ['glass', 'neon', 'light'] as const;
export type ThemeName = (typeof themeNames)[number];

export const themeLabels: Record<ThemeName, string> = {
  glass: 'Glass',
  neon: 'Neon',
  light: 'Light',
};

export const darkThemes: ThemeName[] = ['glass', 'neon'];
export const DEFAULT_THEME: ThemeName = 'glass';
export const STORAGE_KEY = 'devmetrix-theme';

export const colorTokens = [
  'background', 'foreground', 'muted', 'primary',
  'primary-foreground', 'accent', 'surface', 'border',
] as const;
export type ColorToken = (typeof colorTokens)[number];

// Typed access for inline styles: style={{ color: cssVar('accent') }}
export const cssVar = (token: ColorToken, alpha?: number) =>
  `rgb(var(--color-${token})${alpha !== undefined ? ` / ${alpha}` : ''})`;

// Tailwind: bg-background, text-muted, bg-primary/20, border-border/30 ...
export const tailwindColors = Object.fromEntries(
  colorTokens.map((t) => [t, `rgb(var(--color-${t}) / <alpha-value>)`])
);

// Runs before first paint so there is no theme flash
export const noFlashScript = `(function(){try{var n=${JSON.stringify(themeNames)},d=${JSON.stringify(
  darkThemes
)},t=localStorage.getItem('${STORAGE_KEY}');if(!t||n.indexOf(t)<0)t='${DEFAULT_THEME}';var e=document.documentElement;e.dataset.theme=t;e.classList.toggle('dark',d.indexOf(t)>-1);}catch(e){}})();`;