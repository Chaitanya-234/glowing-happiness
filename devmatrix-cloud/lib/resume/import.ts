import { isResume, newEntry, uid, type Design, type Entry, type Resume, type Section } from './types';

export interface Imported { resume: Resume; design?: Design; exact: boolean }

function group(s: string, i: number): { text: string; end: number } | null {
  while (i < s.length && /\s/.test(s[i])) i++;
  if (s[i] !== '{') return null;
  let depth = 0;
  for (let j = i; j < s.length; j++) {
    const c = s[j];
    if (c === '\\') { j++; continue; }
    if (c === '{') depth++;
    else if (c === '}' && --depth === 0) return { text: s.slice(i + 1, j), end: j + 1 };
  }
  return null;
}

function unlatex(s: string): string {
  let t = s;
  for (let i = 0; i < 3; i++) {
    t = t.replace(/\\href\{[^{}]*\}\{([^{}]*)\}/g, '$1')
      .replace(/\\(?:textbf|textit|emph|underline|textsc|texttt|textsl|small|large|Large|Huge|scshape)\s*\{([^{}]*)\}/g, '$1');
  }
  return t
    .replace(/\\(?:begin|end)\{[^}]*\}(?:\[[^\]]*\])?/g, ' ').replace(/\\color\{[^}]*\}/g, '')
    .replace(/\\vspace\*?\{[^}]*\}/g, '').replace(/\\\\/g, ' ').replace(/\$\|\$/g, '|').replace(/\$\\?[a-z]*\$/g, '')
    .replace(/\\([&%$#_{}])/g, '$1').replace(/---/g, '—').replace(/--/g, '–').replace(/``|''/g, '"').replace(/~/g, ' ')
    .replace(/\\[a-zA-Z]+\*?/g, ' ').replace(/[{}]/g, '').replace(/\s+/g, ' ').trim();
}

const splitDates = (d: string): [string, string] => {
  const parts = unlatex(d).split(/\s*[–—-]\s*/);
  return [parts[0] ?? '', parts.slice(1).join(' – ')];
};

function parseEntries(body: string): { entries: Entry[]; loose: string[] } {
  const re = /\\(resumeSubheading|resumeProjectHeading|resumeItem|cvEntryOne|cvEntry|item)\b/g;
  const entries: Entry[] = [];
  const loose: string[] = [];
  let cur: Entry | null = null;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body))) {
    let pos = m.index + m[0].length;
    const cmd = m[1];
    if (cmd === 'cvEntry' || cmd === 'cvEntryOne') {
      const a: string[] = [];
      for (let k = 0; k < (cmd === 'cvEntry' ? 4 : 2); k++) { const g = group(body, pos); if (!g) break; a.push(g.text); pos = g.end; }
      const [start, end] = splitDates(a[1] ?? '');
      cur = { ...newEntry(), primary: unlatex(a[0] ?? ''), secondary: unlatex(a[2] ?? ''), location: unlatex(a[3] ?? ''), start, end, bullets: [] };
      entries.push(cur);
      re.lastIndex = pos;
    } else if (cmd === 'resumeSubheading') {
      const a: string[] = [];
      for (let k = 0; k < 4; k++) { const g = group(body, pos); if (!g) break; a.push(g.text); pos = g.end; }
      const [start, end] = splitDates(a[1] ?? '');
      cur = { ...newEntry(), primary: unlatex(a[0] ?? ''), secondary: unlatex(a[2] ?? ''), location: unlatex(a[3] ?? ''), start, end, bullets: [] };
      entries.push(cur);
      re.lastIndex = pos;
    } else if (cmd === 'resumeProjectHeading') {
      const h = group(body, pos);
      if (h) {
        const d = group(body, h.end);
        const [p, ...rest] = unlatex(h.text).split('|');
        const [start, end] = splitDates(d?.text ?? '');
        cur = { ...newEntry(), primary: (p ?? '').trim(), secondary: rest.join('|').trim(), start, end, bullets: [] };
        entries.push(cur);
        re.lastIndex = d ? d.end : h.end;
      }
    } else if (cmd === 'resumeItem') {
      const g = group(body, pos);
      if (g) {
        if (!cur) { cur = { ...newEntry(), bullets: [] }; entries.push(cur); }
        cur.bullets.push(unlatex(g.text));
        re.lastIndex = g.end;
      }
    } else {
      const text = unlatex(body.slice(pos).split(/\\item\b|\\end\{|\\resume\w+|\\cvEntry/)[0]);
      if (text) { loose.push(text); cur?.bullets.push(text); }
    }
  }
  entries.forEach((e) => { if (!e.bullets.length) e.bullets = ['']; });
  return { entries, loose };
}

function parseSkills(body: string) {
  const groups = [];
  for (const chunk of body.split(/\\\\|\\item\b/)) {
    const m = chunk.match(/\\textbf\{([^}]*)\}\s*\{?\s*:?\s*([\s\S]+)/);
    if (!m) continue;
    const label = unlatex(m[1]).replace(/:$/, '').trim();
    const items = unlatex(m[2]).replace(/^:\s*/, '');
    if (label || items) groups.push({ id: uid(), label, items });
  }
  return groups;
}

export function importTex(src: string): Imported | null {
  const marker = src.match(/%\s*CVSTUDIO-DATA:\s*([A-Za-z0-9+/=]+)/);
  if (marker) {
    try {
      const data = JSON.parse(decodeURIComponent(escape(atob(marker[1]))));
      if (isResume(data.resume)) return { resume: data.resume, design: data.design, exact: true };
    } catch { /* fall through to heuristic */ }
  }

  const text = src.replace(/(^|[^\\])%.*$/gm, '$1');
  const doc = text.includes('\\begin{document}') ? text.split('\\begin{document}')[1] : text;
  const firstSection = doc.search(/\\section\*?\{/);
  const head = firstSection >= 0 ? doc.slice(0, firstSection) : doc;

  let name = '';
  for (const re of [/\{\\Huge((?:[^{}]|\{[^{}]*\})*)\}/, /\\name\{([^}]*)\}/, /\\author\{([^}]*)\}/, /\\Huge[^{}]*?(?:\\scshape)?\s+([^{}\\]+)\}/, /\\textbf\{\\Huge[^{}]*?([A-Za-z][^{}]*)\}/]) {
    const m = head.match(re);
    if (m && unlatex(m[1])) { name = unlatex(m[1]); break; }
  }
  const title = unlatex(head.match(/\{\\large((?:[^{}]|\{[^{}]*\})*)\}/)?.[1] ?? '');
  const email = head.match(/[\w.+-]+@[\w-]+\.[\w.-]+/)?.[0] ?? '';
  const phone = head.match(/\+?\d[\d\s().-]{8,}\d/)?.[0]?.trim() ?? '';
  const links = [...head.matchAll(/\\href\{([^}]*)\}\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g)]
    .filter((m) => !/^mailto:/i.test(m[1]))
    .map((m) => ({ id: uid(), url: m[1], label: unlatex(m[2]) }));

  const parts = [...doc.matchAll(/\\section\*?\{([^}]*)\}/g)];
  const endDoc = doc.search(/\\end\{document\}/);
  const stop = endDoc >= 0 ? endDoc : doc.length;
  const sections: Section[] = parts.map((m, i) => {
    const title = unlatex(m[1]) || 'Section';
    const bodyText = doc.slice(m.index! + m[0].length, parts[i + 1]?.index ?? stop);
    const base = { id: uid(), title, visible: true };
    if (/summary|objective|profile|about/i.test(title)) return { ...base, kind: 'summary', text: unlatex(bodyText) };
    if (/skill|technolog|tools|competenc/i.test(title)) {
      const groups = parseSkills(bodyText);
      if (groups.length) return { ...base, kind: 'skills', groups };
    }
    if (/experience|employment|work|intern|education|academic|studies|project/i.test(title)) {
      const { entries, loose } = parseEntries(bodyText);
      if (entries.length) return { ...base, kind: 'entries', entries };
      if (loose.length) return { ...base, kind: 'list', items: loose };
    }
    const { loose } = parseEntries(bodyText);
    return { ...base, kind: 'list', items: loose.length ? loose : [unlatex(bodyText)].filter(Boolean) };
  }) as Section[];

  if (!name && !sections.length) return null;
  return { resume: { basics: { name, title, email, phone, location: '', links }, sections }, exact: false };
}
