// components/ToolIcon.tsx
import {
    Activity,
    AlignLeft,
    BarChart3,
    Binary,
    BookOpen,
    Boxes,
    Braces,
    Brain,
    Briefcase,
    Bug,
    Calculator,
    Calendar,
    CaseSensitive,
    ClipboardCheck,
    ClipboardList,
    Clock,
    Code,
    Cpu,
    Database,
    Dices,
    Droplets,
    FileCode,
    FileJson,
    FileOutput,
    FileText,
    Fingerprint,
    FlaskConical,
    Gauge,
    GitCompare,
    Globe,
    GraduationCap,
    Hash,
    Image,
    Key,
    Layers,
    Link2,
    ListOrdered,
    Lock,
    Mail,
    Merge,
    Network,
    Package,
    Paintbrush,
    Palette,
    Percent,
    QrCode,
    Regex,
    Repeat,
    Ruler,
    Scale,
    ScanLine,
    Scissors,
    Server,
    Shield, ShieldCheck,
    Sparkles,
    Terminal,
    TestTube,
    Timer,
    TrendingDown,
    TrendingUp,
    UserCheck,
    UserPlus,
    Users,
    Wand2,
    Workflow,
    Zap,
    type LucideIcon
} from 'lucide-react';

// ---------- 1. Map tool.id -> icon ----------
const ICON_MAP: Record<string, LucideIcon> = {
  // PDF
  'pdf-merge': Merge,
  'pdf-split': Scissors,
  'pdf-to-jpg': Image,
  'jpg-to-pdf': FileOutput,
  'pdf-crop': Scissors,
  'pdf-watermark': Droplets,
  'pdf-api-playground': FileCode,
  'html-invoice-to-pdf': FileText,
  'json-to-pdf': FileJson,
  'api-request-to-pdf': ClipboardList,

  // Image
  'image-compressor': Image,
  'image-converter': Repeat,
  'ai-detector': ScanLine,

  // Data
  'json-formatter': Braces,
  'json-to-zod': ShieldCheck,
  'json-to-csv': FileJson,
  'csv-to-json': Database,
  'sql-formatter': Database,
  'toon-converter': Binary,

  // Development
  'online-compiler': Terminal,
  'api-tester': Server,
  'mock-api-generator': Workflow,
  'api-contract-tester': ClipboardCheck,
  'http-status-explorer': Globe,
  'regex-playground': Regex,
  'diff-viewer': GitCompare,
  'code-snippets': ClipboardList,
  'uuid-generator': Fingerprint,
  'timestamp-converter': Clock,
  'cron-generator': Timer,
  'number-base-converter': Binary,
  'px-to-rem': Ruler,
  'user-agent-parser': Globe,
  'device-info': Cpu,
  'keycode-info': Terminal,
  'html-entity-encoder': Code,
  'html-entity-decoder': Code,
  'markdown-converter': FileCode,
  'i18n-generator': Globe,
  'dockerfile-optimizer': Boxes,
  'webhook-replay': Repeat,
  'document-webhook-tester': Repeat,
  'onboarding-generator': Workflow,

  // Security
  'jwt-decoder': Key,
  'bcrypt-generator': Lock,
  'hash-generator': Hash,
  'password-generator': Key,
  'security-scanner': Shield,
  'dependency-scanner': Package,
  'ssl-checker': ShieldCheck,
  'port-scanner': Network,

  // Encoding
  'base64-encoder': Binary,
  'url-encoder': Link2,
  'text-to-binary': Binary,
  'binary-to-text': Binary,
  'qr-code-generator': QrCode,

  // Text
  'string-case-converter': CaseSensitive,
  'word-counter': AlignLeft,

  // Design
  'color-converter': Palette,
  'glassmorphism-generator': Sparkles,
  'tailwind-gradient-generator': Paintbrush,
  'css-box-shadow': Layers,
  'css-border-radius': Boxes,
  'lorem-ipsum-generator': FileText,
  'emoji-picker': Sparkles,
  'lorem-ipsum-image': Image,
  'aspect-ratio-calculator': Ruler,

  // Math
  'percentage-calculator': Percent,
  'random-number-generator': Dices,
  'roman-numeral-converter': Hash,

  // Productivity
  'pomodoro-timer': Timer,
  'stopwatch': Clock,
  'reaction-time-test': Zap,
  'typing-speed-test': Gauge,
  'age-calculator': Calendar,
  'bmi-calculator': Scale,
  'discount-calculator': TrendingDown,
  'tip-calculator': Calculator,

  // Network / DevOps
  'latency-monitor': Activity,
  'http-load-testing': Gauge,
  'lighthouse-analyzer': BarChart3,
  'gatling-tool': Zap,
  'cache-optimizer': Layers,
  'dns-propagation-checker': Globe,

  // SEO
  'slug-generator': Link2,

  // Finance
  'credit-card-validator': ShieldCheck,

  // AI Tools
  'ai-course-creator': GraduationCap,
  'course-outliner': GraduationCap,
  'ai-blog-architect': FileText,
  'ai-spec-generator': ClipboardList,
  'ai-persona-generator': Users,
  'ai-startup-validator': Briefcase,
  'saas-plan-advisor': TrendingUp,
  'saas-email-generator': Mail,
  'saas-metric-calculator': BarChart3,
  'churn-reduction-strategist': TrendingDown,
  'feature-prioritizer': ListOrdered,
  'code-translator': Repeat,
  'accessibility-checker': UserCheck,
  'cross-browser-tester': Globe,
  'mutation-testing': Bug,
  'unit-test-generator': TestTube,
  'integration-test-builder': FlaskConical,
  'test-coverage-analyzer': BarChart3,
  'e2e-test-scenario-generator': Workflow,
  'performance-test-suite-creator': Gauge,
  'crud-generator': Boxes,
  'interview-generator': UserPlus,
  'career-path-generator': TrendingUp,
  'graphql-designer': Network,
  'nlp-pipeline-designer': Brain,
  'ai-hiring': UserCheck,
  'ai-prompt-builder': Wand2,
  'loss-function-designer': TrendingDown,
  'research-manager': BookOpen,
};

// ---------- 2. Category color palette ----------
const CATEGORY_STYLES: Record<string, { bg: string; text: string; ring: string }> = {
  'PDF Tools':          { bg: 'bg-red-500/15',     text: 'text-red-400',     ring: 'ring-red-500/30' },
  'Image Tools':        { bg: 'bg-pink-500/15',    text: 'text-pink-400',    ring: 'ring-pink-500/30' },
  'Data Processing':    { bg: 'bg-blue-500/15',    text: 'text-blue-400',    ring: 'ring-blue-500/30' },
  'Data':               { bg: 'bg-blue-500/15',    text: 'text-blue-400',    ring: 'ring-blue-500/30' },
  'Data Formats':       { bg: 'bg-blue-500/15',    text: 'text-blue-400',    ring: 'ring-blue-500/30' },
  'Development':        { bg: 'bg-violet-500/15',  text: 'text-violet-400',  ring: 'ring-violet-500/30' },
  'Security':           { bg: 'bg-amber-500/15',   text: 'text-amber-400',   ring: 'ring-amber-500/30' },
  'Encoding':           { bg: 'bg-teal-500/15',    text: 'text-teal-400',    ring: 'ring-teal-500/30' },
  'Text Processing':    { bg: 'bg-cyan-500/15',    text: 'text-cyan-400',    ring: 'ring-cyan-500/30' },
  'Design':             { bg: 'bg-fuchsia-500/15', text: 'text-fuchsia-400', ring: 'ring-fuchsia-500/30' },
  'CSS':                { bg: 'bg-sky-500/15',     text: 'text-sky-400',     ring: 'ring-sky-500/30' },
  'Math':               { bg: 'bg-indigo-500/15',  text: 'text-indigo-400',  ring: 'ring-indigo-500/30' },
  'Productivity':       { bg: 'bg-lime-500/15',    text: 'text-lime-400',    ring: 'ring-lime-500/30' },
  'Network':            { bg: 'bg-emerald-500/15', text: 'text-emerald-400', ring: 'ring-emerald-500/30' },
  'DevOps':             { bg: 'bg-orange-500/15',  text: 'text-orange-400',  ring: 'ring-orange-500/30' },
  'SEO':                { bg: 'bg-green-500/15',   text: 'text-green-400',   ring: 'ring-green-500/30' },
  'Finance':            { bg: 'bg-green-500/15',   text: 'text-green-400',   ring: 'ring-green-500/30' },
  'Health':             { bg: 'bg-rose-500/15',    text: 'text-rose-400',    ring: 'ring-rose-500/30' },
  'Life':               { bg: 'bg-rose-500/15',    text: 'text-rose-400',    ring: 'ring-rose-500/30' },
  'Game':               { bg: 'bg-yellow-500/15',  text: 'text-yellow-400',  ring: 'ring-yellow-500/30' },
  'AI Tools':           { bg: 'bg-purple-500/15',  text: 'text-purple-400',  ring: 'ring-purple-500/30' },
  'AI':                 { bg: 'bg-purple-500/15',  text: 'text-purple-400',  ring: 'ring-purple-500/30' },
};

const DEFAULT_STYLE = { bg: 'bg-slate-500/15', text: 'text-slate-400', ring: 'ring-slate-500/30' };

// ---------- 3. Component ----------
interface ToolIconProps {
  toolId: string;
  category?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZES = {
  sm: { tile: 'w-8 h-8 rounded-lg',      icon: 'w-4 h-4' },
  md: { tile: 'w-12 h-12 rounded-xl',    icon: 'w-6 h-6' },
  lg: { tile: 'w-14 h-14 rounded-2xl',   icon: 'w-7 h-7' },
} as const;

export function ToolIcon({ toolId, category, size = 'md', className = '' }: ToolIconProps) {
  const Icon = ICON_MAP[toolId] ?? Sparkles;
  const style = (category && CATEGORY_STYLES[category]) || DEFAULT_STYLE;
  const s = SIZES[size];

  return (
    <div
      className={`flex items-center justify-center shrink-0 ring-1 ${s.tile} ${style.bg} ${style.text} ${style.ring} ${className}`}
    >
      <Icon className={s.icon} aria-hidden="true" strokeWidth={2} />
    </div>
  );
}