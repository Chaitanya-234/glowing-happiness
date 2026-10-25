export type SectionKind = 'summary' | 'entries' | 'skills' | 'list';
export type TemplateId = 'classic' | 'modern' | 'compact' | 'minimal' | 'executive' | 'tech' | 'sidebar' | 'academic';

export interface Entry { id: string; primary: string; secondary: string; location: string; start: string; end: string; bullets: string[] }
export interface SkillGroup { id: string; label: string; items: string }
export interface Link { id: string; label: string; url: string }
export interface Basics { name: string; title: string; email: string; phone: string; location: string; links: Link[] }
export interface Section {
  id: string; kind: SectionKind; title: string; visible: boolean;
  text?: string; entries?: Entry[]; groups?: SkillGroup[]; items?: string[];
}
export interface Resume { basics: Basics; sections: Section[] }
export interface Design { template: TemplateId; accent: string; baseSize: number; margin: number; lineHeight: number; paper: 'a4' | 'letter' }

export const uid = () => Math.random().toString(36).slice(2, 10);
export const newEntry = (): Entry => ({ id: uid(), primary: '', secondary: '', location: '', start: '', end: '', bullets: [''] });

export const dateText = (e: Entry) => [e.start.trim(), e.end.trim()].filter(Boolean).join(' – ');
export const entryHas = (e: Entry) => !!(e.primary.trim() || e.secondary.trim() || e.bullets.some((b) => b.trim()));
export const hasContent = (s: Section) =>
  s.kind === 'summary' ? !!s.text?.trim()
  : s.kind === 'entries' ? !!s.entries?.some(entryHas)
  : s.kind === 'skills' ? !!s.groups?.some((g) => g.label.trim() || g.items.trim())
  : !!s.items?.some((i) => i.trim());

export const isResume = (x: any): x is Resume =>
  !!x && typeof x === 'object' && !!x.basics && Array.isArray(x.sections) && Array.isArray(x.basics.links ?? []);
