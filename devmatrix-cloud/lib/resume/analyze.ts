import { TEMPLATES } from './templates';
import type { Design, Resume } from './types';
import { entryHas } from './types';

export interface Issue { id: string; level: 'warn' | 'tip'; text: string }

const WEAK = /^(responsible for|worked on|helped|assisted with|duties included|tasked with|in charge of)/i;

export function resumeText(r: Resume): string {
  const b = r.basics;
  const out = [b.name, b.title, [b.phone, b.email, b.location, ...b.links.map((l) => l.label || l.url)].filter(Boolean).join(' | ')];
  for (const s of r.sections.filter((x) => x.visible)) {
    out.push('', s.title.toUpperCase());
    if (s.kind === 'summary') out.push(s.text ?? '');
    if (s.kind === 'list') out.push(...(s.items ?? []).filter((i) => i.trim()).map((i) => `- ${i}`));
    if (s.kind === 'skills') out.push(...(s.groups ?? []).map((g) => `${g.label}: ${g.items}`));
    if (s.kind === 'entries') {
      for (const e of (s.entries ?? []).filter(entryHas)) {
        out.push([e.primary, e.secondary, e.location, [e.start, e.end].filter(Boolean).join(' - ')].filter(Boolean).join(' | '));
        out.push(...e.bullets.filter((x) => x.trim()).map((x) => `- ${x}`));
      }
    }
  }
  return out.join('\n').trim();
}

export function analyze(r: Resume, d: Design, pages: number): Issue[] {
  const T = TEMPLATES[d.template];
  const b = r.basics;
  const out: Issue[] = [];
  const add = (id: string, level: Issue['level'], text: string) => out.push({ id, level, text });

  if (!b.name.trim()) add('name', 'warn', 'Add your name.');
  if (!b.email.trim()) add('email', 'warn', 'Add an email address. Recruiters need a way to reach you.');
  if (!b.phone.trim()) add('phone', 'tip', 'Consider adding a phone number.');
  if (!b.links.some((l) => /linkedin|github|portfolio|\.dev|\.io/i.test(l.url + l.label))) add('links', 'tip', 'Add a LinkedIn, GitHub or portfolio link.');

  const secs = r.sections.filter((s) => s.visible && s.kind === 'entries');
  let missingDates = 0;
  const bullets: string[] = [];
  for (const s of secs) {
    const dated = /experience|work|employ|education/i.test(s.title);
    for (const e of (s.entries ?? []).filter(entryHas)) {
      if (dated && !e.start.trim() && !e.end.trim()) missingDates++;
      if (/experience|work|employ|project/i.test(s.title)) bullets.push(...e.bullets.filter((x) => x.trim()));
    }
  }
  if (missingDates) add('dates', 'warn', `${missingDates} ${missingDates === 1 ? 'entry has' : 'entries have'} no dates. Screeners skip undated roles.`);

  if (bullets.length >= 3) {
    const withNum = bullets.filter((x) => /\d/.test(x)).length;
    if (withNum / bullets.length < 0.3) add('numbers', 'tip', `Only ${withNum} of ${bullets.length} bullets contain a number. Add figures like %, $, time saved or team size.`);
    const weak = bullets.filter((x) => WEAK.test(x.trim())).length;
    if (weak) add('weak', 'tip', `${weak} ${weak === 1 ? 'bullet starts' : 'bullets start'} with a weak phrase ("Responsible for", "Worked on"). Start with a strong verb instead.`);
    const long = bullets.filter((x) => x.length > 210).length;
    if (long) add('long', 'tip', `${long} ${long === 1 ? 'bullet is' : 'bullets are'} over 210 characters. Aim for one or two lines.`);
  } else if (secs.length) add('bullets', 'tip', 'Add at least three achievement bullets under Experience or Projects.');

  const summary = r.sections.find((s) => s.kind === 'summary' && s.visible);
  if (summary && (summary.text ?? '').length > 600) add('summary', 'tip', 'Your summary is long. Keep it to two or three sentences.');

  if (T.columns === 2) add('columns', 'warn', 'Two-column layouts can be read out of order by applicant tracking systems. Fine for roles that go straight to a person; use a one-column template otherwise.');

  const years = (() => {
    const ys: number[] = [];
    for (const s of secs.filter((x) => /experience|work|employ/i.test(x.title))) for (const e of s.entries ?? []) { const y = e.start.match(/(19|20)\d{2}/)?.[0]; if (y) ys.push(+y); }
    return ys.length ? new Date().getFullYear() - Math.min(...ys) : 0;
  })();
  if (!T.academic) {
    if (pages > 2) add('pages', 'warn', `Your resume runs to ${pages} pages. Two is the practical maximum outside academia.`);
    else if (pages === 2 && years < 10) add('pages', 'tip', `Your resume is 2 pages with about ${years || 'under 10'} years of experience. One page is usually enough under 10 years.`);
  }

  if (/[^\u0000-\u00ff\u2013\u2014\u2018\u2019\u201c\u201d\u2022\u2026\u20ac]/.test(resumeText(r))) {
    add('chars', 'warn', 'Some characters are outside the PDF font range (for example non-Latin scripts) and will show as "?". Use the LaTeX export for those.');
  }
  return out;
}

export const scoreOf = (issues: Issue[]) => Math.max(0, 100 - issues.filter((i) => i.level === 'warn').length * 14 - issues.filter((i) => i.level === 'tip').length * 5);

const STOP = new Set('the and for with you your our are will this that have has from they their who all can not but any more other new able work working team teams years year experience skills strong ability including such using use used must should well also etc about into over under been being were was its than then them these those what when where which while within without across per via need looking join role candidate job'.split(' '));

export function keywordMatch(jd: string, text: string) {
  const freq = new Map<string, number>();
  for (const raw of jd.toLowerCase().match(/[a-z][a-z0-9+#.\-]{1,}/g) ?? []) {
    const w = raw.replace(/[.\-]+$/, '');
    if (w.length < 3 || STOP.has(w)) continue;
    freq.set(w, (freq.get(w) ?? 0) + 1);
  }
  const top = [...freq.entries()].sort((a, b) => b[1] - a[1] || b[0].length - a[0].length).slice(0, 30).map(([w]) => w);
  const hay = text.toLowerCase();
  const matched = top.filter((w) => hay.includes(w));
  return { matched, missing: top.filter((w) => !hay.includes(w)), pct: top.length ? Math.round((matched.length / top.length) * 100) : 0, total: top.length };
}
