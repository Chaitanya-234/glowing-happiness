import { PDFDocument, PDFFont, PDFPage, PDFString, StandardFonts, rgb } from 'pdf-lib';
import { TEMPLATES, type TemplateDef } from './templates';
import { dateText, entryHas, hasContent, type Basics, type Design, type Resume, type Section } from './types';

type RGB = [number, number, number];
interface Fonts { r: PDFFont; b: PDFFont; i: PDFFont }
interface Seg { t: string; f: PDFFont }
interface Item { t: string; url?: string }

const PAPER = { a4: [595.28, 841.89], letter: [612, 792] } as const;
const INK: RGB = [0.08, 0.09, 0.11];
const MUTED: RGB = [0.36, 0.38, 0.42];

const hex = (h: string): RGB => {
  const n = parseInt(h.replace('#', '').padEnd(6, '0').slice(0, 6), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};
const tint = (c: RGB, t: number): RGB => [c[0] + (1 - c[0]) * t, c[1] + (1 - c[1]) * t, c[2] + (1 - c[2]) * t];
const col = (c: RGB) => rgb(c[0], c[1], c[2]);

/* ---------- text safety: standard PDF fonts only cover Latin-1 ---------- */
const sets = new WeakMap<PDFFont, Set<number>>();
const REPL: Record<string, string> = { '→': '->', '−': '-', '‐': '-', '‑': '-', '‒': '-', '―': '-', '′': "'", '″': '"', '≥': '>=', '≤': '<=', '\u200b': '' };
function safe(f: PDFFont, s: string) {
  let set = sets.get(f);
  if (!set) { set = new Set(f.getCharacterSet()); sets.set(f, set); }
  let out = '';
  for (const ch of s.replace(/[\r\n\t]+/g, ' ')) out += set.has(ch.codePointAt(0)!) ? ch : (REPL[ch] ?? '?');
  return out;
}

function wrap(text: string, f: PDFFont, size: number, max: number): string[] {
  const out: string[] = [];
  const w = (s: string) => f.widthOfTextAtSize(s, size);
  let cur = '';
  for (const word of text.split(/\s+/).filter(Boolean)) {
    let wd = word;
    while (w(wd) > max && wd.length > 1) {
      let k = wd.length;
      while (k > 1 && w(wd.slice(0, k)) > max) k--;
      if (cur) { out.push(cur); cur = ''; }
      out.push(wd.slice(0, k));
      wd = wd.slice(k);
    }
    const t = cur ? `${cur} ${wd}` : wd;
    if (!cur || w(t) <= max) cur = t; else { out.push(cur); cur = wd; }
  }
  if (cur) out.push(cur);
  return out.length ? out : [''];
}

function wrapRich(parts: Seg[], size: number, max: number): Seg[][] {
  const lines: Seg[][] = [[]];
  let x = 0;
  for (const p of parts) {
    for (const wd of p.t.split(/(\s+)/).filter(Boolean)) {
      const wdt = p.f.widthOfTextAtSize(wd, size);
      const space = /^\s+$/.test(wd);
      if (!space && x > 0 && x + wdt > max) { lines.push([]); x = 0; }
      if (space && x === 0) continue;
      const line = lines[lines.length - 1];
      const last = line[line.length - 1];
      if (last && last.f === p.f) last.t += wd; else line.push({ t: wd, f: p.f });
      x += wdt;
    }
  }
  return lines;
}

function addLink(pdf: PDFDocument, page: PDFPage, x: number, y: number, w: number, h: number, url: string) {
  const annot = pdf.context.obj({ Type: 'Annot', Subtype: 'Link', Rect: [x, y, x + w, y + h], Border: [0, 0, 0], A: { Type: 'Action', S: 'URI', URI: PDFString.of(url) } });
  page.node.addAnnot(pdf.context.register(annot));
}

/* ---------- page + column flow ---------- */
class Ctx {
  pages: PDFPage[] = [];
  constructor(public pdf: PDFDocument, public W: number, public H: number, public mt: number, public mb: number, private onPage: (p: PDFPage) => void) {}
  page(i: number) {
    while (this.pages.length <= i) { const p = this.pdf.addPage([this.W, this.H]); this.onPage(p); this.pages.push(p); }
    return this.pages[i];
  }
}

class Flow {
  pi = 0;
  y: number;
  constructor(public c: Ctx, public x: number, public w: number, public lh: number) { this.y = c.mt; }
  get page() { return this.c.page(this.pi); }
  ensure(h: number) { if (this.y + h > this.c.H - this.c.mb) { this.pi++; this.y = this.c.mt; } }
  gap(h: number) { this.y += h; }
  baseline(lhPt: number, size: number) { return this.y + (lhPt - size) / 2 + size * 0.82; }
  text(s: string, f: PDFFont, size: number, x: number, color: RGB, bt: number) {
    this.page.drawText(s, { x, y: this.c.H - bt, size, font: f, color: col(color) });
  }
  link(url: string, x: number, bt: number, w: number, size: number) {
    addLink(this.c.pdf, this.page, x, this.c.H - bt - size * 0.25, w, size * 1.1, url);
  }
  para(t: string, f: PDFFont, size: number, color: RGB, o: { indent?: number; align?: 'left' | 'center'; url?: string } = {}) {
    const ind = o.indent ?? 0;
    const lhPt = size * this.lh;
    for (const l of wrap(safe(f, t), f, size, this.w - ind)) {
      this.ensure(lhPt);
      const tw = f.widthOfTextAtSize(l, size);
      const x = this.x + ind + (o.align === 'center' ? (this.w - ind - tw) / 2 : 0);
      const bt = this.baseline(lhPt, size);
      this.text(l, f, size, x, color, bt);
      if (o.url) this.link(o.url, x, bt, tw, size);
      this.y += lhPt;
    }
  }
  row(left: Seg, right: Seg | null, size: number, lc: RGB, rc: RGB) {
    const lt = safe(left.f, left.t);
    const rt = right ? safe(right.f, right.t) : '';
    const rw = rt ? right!.f.widthOfTextAtSize(rt, size) : 0;
    const lhPt = size * this.lh;
    wrap(lt, left.f, size, Math.max(40, this.w - rw - (rt ? 12 : 0))).forEach((l, i) => {
      this.ensure(lhPt);
      const bt = this.baseline(lhPt, size);
      this.text(l, left.f, size, this.x, lc, bt);
      if (i === 0 && rt) this.text(rt, right!.f, size, this.x + this.w - rw, rc, bt);
      this.y += lhPt;
    });
  }
  bullet(t: string, f: PDFFont, size: number, color: RGB, ch: string) {
    const tx = size * 1.5;
    const lhPt = size * this.lh;
    wrap(safe(f, t), f, size, this.w - tx).forEach((l, i) => {
      this.ensure(lhPt);
      const bt = this.baseline(lhPt, size);
      if (i === 0) this.text(safe(f, ch), f, size, this.x + size * 0.3, color, bt);
      this.text(l, f, size, this.x + tx, color, bt);
      this.y += lhPt;
    });
  }
  rich(parts: Seg[], size: number, color: RGB) {
    const lhPt = size * this.lh;
    for (const line of wrapRich(parts.map((p) => ({ t: safe(p.f, p.t), f: p.f })), size, this.w)) {
      if (!line.length) continue;
      this.ensure(lhPt);
      const bt = this.baseline(lhPt, size);
      let x = this.x;
      for (const s of line) { this.text(s.t, s.f, size, x, color, bt); x += s.f.widthOfTextAtSize(s.t, size); }
      this.y += lhPt;
    }
  }
  rule(color: RGB, th = 0.7) {
    const y = this.c.H - this.y;
    this.page.drawLine({ start: { x: this.x, y }, end: { x: this.x + this.w, y }, thickness: th, color: col(color) });
    this.y += th + 1;
  }
}

/* ---------- pieces ---------- */
function contactItems(b: Basics): Item[] {
  const items: Item[] = [];
  if (b.phone.trim()) items.push({ t: b.phone.trim(), url: `tel:${b.phone.replace(/[^\d+]/g, '')}` });
  if (b.email.trim()) items.push({ t: b.email.trim(), url: `mailto:${b.email.trim()}` });
  if (b.location.trim()) items.push({ t: b.location.trim() });
  for (const l of b.links) {
    const url = l.url.trim();
    const label = l.label.trim() || url.replace(/^https?:\/\/(www\.)?/i, '').replace(/\/$/, '');
    if (label) items.push({ t: label, url: url ? (/^[a-z]+:/i.test(url) ? url : `https://${url}`) : undefined });
  }
  return items;
}

function inline(fl: Flow, items: Item[], F: Fonts, size: number, align: 'left' | 'center', sep: string, ink: RGB, accent: RGB) {
  const f = F.r;
  const texts = items.map((i) => safe(f, i.t));
  const ws = texts.map((t) => f.widthOfTextAtSize(t, size));
  const sw = f.widthOfTextAtSize(sep, size);
  const lines: number[][] = [[]];
  let x = 0;
  ws.forEach((w, i) => {
    const cur = lines[lines.length - 1];
    const add = (cur.length ? sw : 0) + w;
    if (cur.length && x + add > fl.w) { lines.push([i]); x = w; } else { cur.push(i); x += add; }
  });
  const lhPt = size * fl.lh;
  for (const ln of lines) {
    if (!ln.length) continue;
    fl.ensure(lhPt);
    const total = ln.reduce((a, i) => a + ws[i], 0) + sw * (ln.length - 1);
    let cx = fl.x + (align === 'center' ? (fl.w - total) / 2 : 0);
    const bt = fl.baseline(lhPt, size);
    ln.forEach((i, k) => {
      fl.text(texts[i], f, size, cx, items[i].url ? accent : ink, bt);
      if (items[i].url) fl.link(items[i].url!, cx, bt, ws[i], size);
      cx += ws[i];
      if (k < ln.length - 1) { fl.text(sep, f, size, cx, MUTED, bt); cx += sw; }
    });
    fl.y += lhPt;
  }
}

function heading(fl: Flow, title: string, F: Fonts, T: TemplateDef, size: number, accent: RGB) {
  const s = size * 1.1;
  const caps = T.heading === 'rule' || T.heading === 'caps' || T.heading === 'bar';
  const text = caps ? title.toUpperCase() : T.heading === 'slash' ? `// ${title}` : title;
  const lhPt = s * fl.lh;
  fl.gap(size * 0.9);
  fl.ensure(lhPt + size * 0.6 + size * fl.lh * 3);
  const bt = fl.baseline(lhPt, s);
  if (T.heading === 'bar') fl.page.drawRectangle({ x: fl.x, y: fl.c.H - (fl.y + lhPt * 0.92), width: 3, height: lhPt * 0.84, color: col(accent) });
  fl.text(safe(F.b, text), F.b, s, fl.x + (T.heading === 'bar' ? 9 : 0), T.accentHeadings ? accent : INK, bt);
  fl.y += lhPt;
  if (T.heading === 'rule') { fl.gap(1); fl.rule(T.accentHeadings ? accent : MUTED); }
  fl.gap(size * 0.25);
}

function renderSection(fl: Flow, sec: Section, F: Fonts, T: TemplateDef, size: number, narrow: boolean) {
  if (sec.kind === 'summary') { fl.para(sec.text ?? '', F.r, size, INK); return; }
  if (sec.kind === 'list') { for (const it of sec.items ?? []) if (it.trim()) fl.bullet(it, F.r, size, INK, T.bullet); return; }
  if (sec.kind === 'skills') {
    for (const g of sec.groups ?? []) {
      if (!g.label.trim() && !g.items.trim()) continue;
      if (narrow) { if (g.label.trim()) fl.para(g.label, F.b, size, INK); fl.para(g.items, F.r, size, INK); }
      else fl.rich([{ t: g.label.trim() ? `${g.label.trim()}: ` : '', f: F.b }, { t: g.items, f: F.r }], size, INK);
      fl.gap(size * 0.12);
    }
    return;
  }
  for (const e of (sec.entries ?? []).filter(entryHas)) {
    const date = dateText(e);
    fl.ensure(size * fl.lh * 3 + size * 0.3);
    if (narrow) {
      if (e.primary.trim()) fl.para(e.primary, F.b, size, INK);
      if (e.secondary.trim()) fl.para(e.secondary, F.i, size, INK);
      const meta = [date, e.location.trim()].filter(Boolean).join(' | ');
      if (meta) fl.para(meta, F.r, size * 0.92, MUTED);
    } else {
      fl.row({ t: e.primary.trim() || e.secondary.trim(), f: F.b }, date ? { t: date, f: F.r } : null, size, INK, MUTED);
      if (e.primary.trim() && (e.secondary.trim() || e.location.trim())) {
        fl.row({ t: e.secondary, f: F.i }, e.location.trim() ? { t: e.location, f: F.i } : null, size, INK, MUTED);
      }
    }
    for (const b of e.bullets) if (b.trim()) fl.bullet(b, F.r, size, INK, T.bullet);
    fl.gap(size * 0.5);
  }
}

/* ---------- entry point ---------- */
export async function buildPdf(resume: Resume, design: Design): Promise<{ bytes: Uint8Array; pages: number }> {
  const T = TEMPLATES[design.template];
  const [W, H] = PAPER[design.paper];
  const pdf = await PDFDocument.create();
  const name = resume.basics.name.trim() || 'Resume';
  pdf.setTitle(`${name} - Resume`);
  pdf.setAuthor(name);
  pdf.setProducer('CV Studio');
  pdf.setCreator('CV Studio');

  const names = { sans: [StandardFonts.Helvetica, StandardFonts.HelveticaBold, StandardFonts.HelveticaOblique], serif: [StandardFonts.TimesRoman, StandardFonts.TimesRomanBold, StandardFonts.TimesRomanItalic], mono: [StandardFonts.Courier, StandardFonts.CourierBold, StandardFonts.CourierOblique] }[T.font];
  const F: Fonts = { r: await pdf.embedFont(names[0]), b: await pdf.embedFont(names[1]), i: await pdf.embedFont(names[2]) };

  const accent = hex(design.accent);
  const size = design.baseSize;
  const lh = design.lineHeight;
  const m = design.margin;
  const sideW = T.columns === 2 ? W * 0.3 : 0;
  const ctx = new Ctx(pdf, W, H, m, m, (p) => {
    if (sideW) p.drawRectangle({ x: 0, y: 0, width: sideW, height: H, color: col(tint(accent, 0.9)) });
  });
  ctx.page(0);

  const secs = resume.sections.filter((s) => s.visible && hasContent(s));
  const b = resume.basics;
  const nameStr = b.name.trim() || 'Your Name';

  const nameLine = (fl: Flow, align: 'left' | 'center') => {
    let n = size * T.nameScale;
    while (n > 12 && F.b.widthOfTextAtSize(safe(F.b, nameStr), n) > fl.w) n -= 1;
    fl.para(nameStr, F.b, n, T.accentName ? accent : INK, { align });
    if (b.title.trim()) fl.para(b.title, F.r, size * 1.1, MUTED, { align });
  };

  if (T.columns === 1) {
    const fl = new Flow(ctx, m, W - 2 * m, lh);
    nameLine(fl, T.header);
    fl.gap(size * 0.2);
    inline(fl, contactItems(b), F, size, T.header, T.sep, INK, accent);
    if (T.heading === 'bar') { fl.gap(size * 0.4); fl.rule(accent, 1.6); }
    for (const s of secs) { heading(fl, s.title, F, T, size, accent); renderSection(fl, s, F, T, size, false); }
  } else {
    const pad = Math.max(16, m * 0.7);
    const side = new Flow(ctx, pad, sideW - 2 * pad, lh);
    const mainX = sideW + 22;
    const main = new Flow(ctx, mainX, W - mainX - m, lh);
    nameLine(main, 'left');
    main.gap(size * 0.4);

    const contacts = contactItems(b);
    if (contacts.length) {
      heading(side, 'Contact', F, T, size, accent);
      for (const c of contacts) { side.para(c.t, F.r, size, c.url ? accent : INK, { url: c.url }); side.gap(size * 0.15); }
    }
    const isSide = (s: Section) => s.kind === 'skills' || s.kind === 'list' || /education/i.test(s.title);
    for (const s of secs) {
      const fl = isSide(s) ? side : main;
      heading(fl, s.title, F, T, size, accent);
      renderSection(fl, s, F, T, size, fl === side);
    }
  }

  return { bytes: await pdf.save(), pages: ctx.pages.length };
}
