import type { TemplateId } from './types';

export interface TemplateDef {
  id: TemplateId; label: string; blurb: string; tag: string;
  font: 'sans' | 'serif' | 'mono';
  header: 'left' | 'center';
  heading: 'rule' | 'caps' | 'bar' | 'plain' | 'slash';
  accentHeadings: boolean; accentName: boolean;
  columns: 1 | 2; academic?: boolean;
  nameScale: number; bullet: string; sep: string;
  defaults: { baseSize: number; margin: number; lineHeight: number; accent: string };
}

export const TEMPLATE_LIST: TemplateDef[] = [
  { id: 'classic', label: 'Classic', tag: '1 column · ATS-safe', blurb: 'Centered serif header, ruled headings. The safe default.',
    font: 'serif', header: 'center', heading: 'rule', accentHeadings: false, accentName: false, columns: 1, nameScale: 2.2, bullet: '•', sep: '  |  ',
    defaults: { baseSize: 10.5, margin: 46, lineHeight: 1.2, accent: '#1f2937' } },
  { id: 'modern', label: 'Modern', tag: '1 column · ATS-safe', blurb: 'Clean sans-serif with a colored name and headings.',
    font: 'sans', header: 'left', heading: 'rule', accentHeadings: true, accentName: true, columns: 1, nameScale: 2.3, bullet: '•', sep: '  |  ',
    defaults: { baseSize: 10, margin: 44, lineHeight: 1.25, accent: '#2563eb' } },
  { id: 'compact', label: 'Compact', tag: '1 column · ATS-safe', blurb: 'Tight spacing to fit a lot on one page.',
    font: 'sans', header: 'center', heading: 'rule', accentHeadings: false, accentName: false, columns: 1, nameScale: 2, bullet: '•', sep: '  |  ',
    defaults: { baseSize: 9.25, margin: 32, lineHeight: 1.15, accent: '#334155' } },
  { id: 'minimal', label: 'Minimal', tag: '1 column · ATS-safe', blurb: 'Lots of white space, quiet colored headings.',
    font: 'sans', header: 'left', heading: 'plain', accentHeadings: true, accentName: false, columns: 1, nameScale: 2.1, bullet: '•', sep: '   ·   ',
    defaults: { baseSize: 10, margin: 56, lineHeight: 1.35, accent: '#0f766e' } },
  { id: 'executive', label: 'Executive', tag: '1 column · ATS-safe', blurb: 'Serif with a bold accent bar. Senior and leadership roles.',
    font: 'serif', header: 'left', heading: 'bar', accentHeadings: true, accentName: true, columns: 1, nameScale: 2.3, bullet: '•', sep: '  |  ',
    defaults: { baseSize: 10.5, margin: 50, lineHeight: 1.28, accent: '#7c2d12' } },
  { id: 'tech', label: 'Tech', tag: '1 column · ATS-safe', blurb: 'Monospace, code-comment headings. Developer resumes.',
    font: 'mono', header: 'left', heading: 'slash', accentHeadings: true, accentName: false, columns: 1, nameScale: 1.9, bullet: '-', sep: ' / ',
    defaults: { baseSize: 9, margin: 40, lineHeight: 1.3, accent: '#059669' } },
  { id: 'sidebar', label: 'Sidebar', tag: '2 columns · design roles', blurb: 'Tinted side column for contact, skills and education.',
    font: 'sans', header: 'left', heading: 'rule', accentHeadings: true, accentName: true, columns: 2, nameScale: 2.2, bullet: '•', sep: '  |  ',
    defaults: { baseSize: 9.5, margin: 30, lineHeight: 1.25, accent: '#4f46e5' } },
  { id: 'academic', label: 'Academic CV', tag: '1 column · multi-page', blurb: 'Long-form with room for publications and appointments.',
    font: 'serif', header: 'left', heading: 'rule', accentHeadings: false, accentName: false, columns: 1, academic: true, nameScale: 2.1, bullet: '•', sep: '  |  ',
    defaults: { baseSize: 11, margin: 54, lineHeight: 1.3, accent: '#1e3a8a' } },
];

export const TEMPLATES = Object.fromEntries(TEMPLATE_LIST.map((t) => [t.id, t])) as Record<TemplateId, TemplateDef>;
