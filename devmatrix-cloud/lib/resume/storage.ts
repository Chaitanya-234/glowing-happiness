import { SAMPLE_DESIGN, SAMPLE_RESUME } from './sample';
import { TEMPLATES } from './templates';
import { isResume, uid, type Design, type Resume } from './types';

const KEY = 'cvstudio:v1';

/** Fill in anything an imported or older draft might be missing so the PDF/LaTeX builders never crash. */
export function normalizeResume(r: Resume): Resume {
  const b = r.basics ?? ({} as Resume['basics']);
  return {
    basics: {
      name: b.name ?? '', title: b.title ?? '', email: b.email ?? '', phone: b.phone ?? '', location: b.location ?? '',
      links: (b.links ?? []).map((l) => ({ id: l.id ?? uid(), label: l.label ?? '', url: l.url ?? '' })),
    },
    sections: (r.sections ?? []).map((s) => ({ ...s, id: s.id ?? uid(), title: s.title ?? 'Section', visible: s.visible !== false })),
  };
}

export function normalizeDesign(d?: Partial<Design> | null): Design {
  const template = d?.template && TEMPLATES[d.template] ? d.template : SAMPLE_DESIGN.template;
  return {
    template,
    paper: d?.paper === 'letter' ? 'letter' : 'a4',
    ...TEMPLATES[template].defaults,
    ...(d?.accent ? { accent: d.accent } : {}),
    ...(typeof d?.baseSize === 'number' ? { baseSize: d.baseSize } : {}),
    ...(typeof d?.margin === 'number' ? { margin: d.margin } : {}),
    ...(typeof d?.lineHeight === 'number' ? { lineHeight: d.lineHeight } : {}),
  };
}

export function loadDraft(): { resume: Resume; design: Design } | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!isResume(data.resume)) return null;
    return { resume: normalizeResume(data.resume), design: normalizeDesign(data.design) };
  } catch {
    return null;
  }
}

export function saveDraft(resume: Resume, design: Design) {
  try { localStorage.setItem(KEY, JSON.stringify({ resume, design })); } catch { /* storage full or blocked */ }
}

export const freshSample = () => ({ resume: structuredClone(SAMPLE_RESUME), design: { ...SAMPLE_DESIGN } });