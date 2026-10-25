'use client';

import Icon from '@/components/Icon';
import { newEntry, uid, type Basics, type Entry, type Resume, type Section, type SectionKind } from '@/lib/resume/types';
import { useState } from 'react';

const input = 'w-full bg-surface/15 border border-border/20 rounded-lg px-2.5 py-2 text-sm text-foreground placeholder:text-muted/70 focus:border-accent focus:ring-1 focus:ring-accent/30 outline-none transition-colors';
const iconBtn = 'p-1.5 rounded-md text-muted hover:text-foreground hover:bg-surface/20 transition-colors disabled:opacity-30 disabled:pointer-events-none';
const ghostBtn = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-accent hover:bg-surface/20 transition-colors';

function move<T>(arr: T[], i: number, j: number): T[] {
  if (j < 0 || j >= arr.length) return arr;
  const out = [...arr];
  [out[i], out[j]] = [out[j], out[i]];
  return out;
}

const PRESETS: { label: string; kind: SectionKind; title: string; icon: string }[] = [
  { label: 'Experience', kind: 'entries', title: 'Experience', icon: 'work' },
  { label: 'Education', kind: 'entries', title: 'Education', icon: 'school' },
  { label: 'Projects', kind: 'entries', title: 'Projects', icon: 'code' },
  { label: 'Skills', kind: 'skills', title: 'Skills', icon: 'build' },
  { label: 'Summary', kind: 'summary', title: 'Summary', icon: 'notes' },
  { label: 'Certifications', kind: 'list', title: 'Certifications', icon: 'workspace_premium' },
  { label: 'Publications', kind: 'entries', title: 'Publications', icon: 'menu_book' },
  { label: 'Custom list', kind: 'list', title: 'Awards', icon: 'format_list_bulleted' },
];

function makeSection(kind: SectionKind, title: string): Section {
  const base = { id: uid(), kind, title, visible: true };
  if (kind === 'summary') return { ...base, text: '' };
  if (kind === 'skills') return { ...base, groups: [{ id: uid(), label: '', items: '' }] };
  if (kind === 'list') return { ...base, items: [''] };
  return { ...base, entries: [newEntry()] };
}

function entryHints(title: string) {
  if (/education|academic|studies/i.test(title)) return { primary: 'School', secondary: 'Degree', location: 'City' };
  if (/project/i.test(title)) return { primary: 'Project name', secondary: 'Tech stack', location: '' };
  if (/publication/i.test(title)) return { primary: 'Title', secondary: 'Venue / authors', location: '' };
  return { primary: 'Company', secondary: 'Role', location: 'City or Remote' };
}

export default function EditorPanel({ resume, onChange, onReset, onClear }: {
  resume: Resume; onChange: (r: Resume) => void; onReset: () => void; onClear: () => void;
}) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [adding, setAdding] = useState(false);
  const isOpen = (id: string, idx: number) => open[id] ?? idx < 2;

  const setBasics = (p: Partial<Basics>) => onChange({ ...resume, basics: { ...resume.basics, ...p } });
  const mapSec = (id: string, fn: (s: Section) => Section) => onChange({ ...resume, sections: resume.sections.map((s) => (s.id === id ? fn(s) : s)) });
  const setEntries = (sid: string, fn: (e: Entry[]) => Entry[]) => mapSec(sid, (s) => ({ ...s, entries: fn(s.entries ?? []) }));
  const setEntry = (sid: string, eid: string, p: Partial<Entry>) => setEntries(sid, (es) => es.map((e) => (e.id === eid ? { ...e, ...p } : e)));

  return (
    <div className="space-y-8 pb-10">
      {/* ---------- Basics ---------- */}
      <section>
        <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
          <Icon name="person" className="text-accent text-[18px]" /> Contact details
        </h3>
        <div className="space-y-2.5">
          <input className={input} placeholder="Full name" value={resume.basics.name} onChange={(e) => setBasics({ name: e.target.value })} />
          <input className={input} placeholder="Headline (e.g. Senior Software Engineer)" value={resume.basics.title} onChange={(e) => setBasics({ title: e.target.value })} />
          <div className="grid grid-cols-2 gap-2.5">
            <input className={input} type="email" placeholder="Email" value={resume.basics.email} onChange={(e) => setBasics({ email: e.target.value })} />
            <input className={input} type="tel" placeholder="Phone" value={resume.basics.phone} onChange={(e) => setBasics({ phone: e.target.value })} />
          </div>
          <input className={input} placeholder="Location (e.g. Austin, TX)" value={resume.basics.location} onChange={(e) => setBasics({ location: e.target.value })} />

          <div className="pt-1 space-y-2">
            {resume.basics.links.map((l, i) => (
              <div key={l.id} className="flex gap-2 items-center">
                <input className={`${input} w-[38%]`} placeholder="Label" value={l.label}
                  onChange={(e) => setBasics({ links: resume.basics.links.map((x, k) => (k === i ? { ...x, label: e.target.value } : x)) })} />
                <input className={`${input} flex-1`} placeholder="https://…" value={l.url}
                  onChange={(e) => setBasics({ links: resume.basics.links.map((x, k) => (k === i ? { ...x, url: e.target.value } : x)) })} />
                <button className={iconBtn} aria-label="Remove link" onClick={() => setBasics({ links: resume.basics.links.filter((_, k) => k !== i) })}>
                  <Icon name="close" className="text-[18px]" />
                </button>
              </div>
            ))}
            <button className={ghostBtn} onClick={() => setBasics({ links: [...resume.basics.links, { id: uid(), label: '', url: '' }] })}>
              <Icon name="add_link" className="text-[16px]" /> Add link
            </button>
          </div>
        </div>
      </section>

      {/* ---------- Sections ---------- */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Icon name="view_headline" className="text-accent text-[18px]" /> Sections
          </h3>
          <span className="text-xs text-muted">Use the arrows to reorder</span>
        </div>

        <div className="space-y-3">
          {resume.sections.map((sec, idx) => {
            const expanded = isOpen(sec.id, idx);
            const hints = entryHints(sec.title);
            return (
              <div key={sec.id} className={`glass border border-border/20 rounded-xl ${sec.visible ? '' : 'opacity-60'}`}>
                <div className="flex items-center gap-1 p-2">
                  <button className={iconBtn} aria-label={expanded ? 'Collapse section' : 'Expand section'} onClick={() => setOpen({ ...open, [sec.id]: !expanded })}>
                    <Icon name="expand_more" className={`text-[20px] transition-transform ${expanded ? '' : '-rotate-90'}`} />
                  </button>
                  <input
                    value={sec.title}
                    onChange={(e) => mapSec(sec.id, (s) => ({ ...s, title: e.target.value }))}
                    aria-label="Section title"
                    className="flex-1 min-w-0 bg-transparent text-sm font-bold text-foreground outline-none focus:bg-surface/15 rounded px-1.5 py-1"
                  />
                  <button className={iconBtn} aria-label={sec.visible ? 'Hide section' : 'Show section'} title={sec.visible ? 'Hide from resume' : 'Show on resume'}
                    onClick={() => mapSec(sec.id, (s) => ({ ...s, visible: !s.visible }))}>
                    <Icon name={sec.visible ? 'visibility' : 'visibility_off'} className="text-[18px]" />
                  </button>
                  <button className={iconBtn} aria-label="Move up" disabled={idx === 0} onClick={() => onChange({ ...resume, sections: move(resume.sections, idx, idx - 1) })}>
                    <Icon name="arrow_upward" className="text-[18px]" />
                  </button>
                  <button className={iconBtn} aria-label="Move down" disabled={idx === resume.sections.length - 1} onClick={() => onChange({ ...resume, sections: move(resume.sections, idx, idx + 1) })}>
                    <Icon name="arrow_downward" className="text-[18px]" />
                  </button>
                  <button className={iconBtn} aria-label="Delete section" onClick={() => { if (confirm(`Delete the "${sec.title}" section?`)) onChange({ ...resume, sections: resume.sections.filter((s) => s.id !== sec.id) }); }}>
                    <Icon name="delete" className="text-[18px]" />
                  </button>
                </div>

                {expanded && (
                  <div className="px-3 pb-3 space-y-3">
                    {sec.kind === 'summary' && (
                      <textarea className={`${input} h-28 resize-y`} placeholder="Two or three sentences on what you do and what you are good at."
                        value={sec.text ?? ''} onChange={(e) => mapSec(sec.id, (s) => ({ ...s, text: e.target.value }))} />
                    )}

                    {sec.kind === 'list' && (
                      <div className="space-y-2">
                        {(sec.items ?? []).map((it, i) => (
                          <div key={i} className="flex gap-2 items-start">
                            <textarea rows={2} className={`${input} flex-1 resize-none`} placeholder="Item" value={it}
                              onChange={(e) => mapSec(sec.id, (s) => ({ ...s, items: (s.items ?? []).map((x, k) => (k === i ? e.target.value : x)) }))} />
                            <button className={iconBtn} aria-label="Remove item" onClick={() => mapSec(sec.id, (s) => ({ ...s, items: (s.items ?? []).filter((_, k) => k !== i) }))}>
                              <Icon name="close" className="text-[18px]" />
                            </button>
                          </div>
                        ))}
                        <button className={ghostBtn} onClick={() => mapSec(sec.id, (s) => ({ ...s, items: [...(s.items ?? []), ''] }))}>
                          <Icon name="add" className="text-[16px]" /> Add item
                        </button>
                      </div>
                    )}

                    {sec.kind === 'skills' && (
                      <div className="space-y-2">
                        {(sec.groups ?? []).map((g, gi) => (
                          <div key={g.id} className="flex gap-2 items-center">
                            <input className={`${input} w-[34%]`} placeholder="Category" value={g.label}
                              onChange={(e) => mapSec(sec.id, (s) => ({ ...s, groups: (s.groups ?? []).map((x, k) => (k === gi ? { ...x, label: e.target.value } : x)) }))} />
                            <input className={`${input} flex-1`} placeholder="Go, Python, SQL" value={g.items}
                              onChange={(e) => mapSec(sec.id, (s) => ({ ...s, groups: (s.groups ?? []).map((x, k) => (k === gi ? { ...x, items: e.target.value } : x)) }))} />
                            <button className={iconBtn} aria-label="Remove group" onClick={() => mapSec(sec.id, (s) => ({ ...s, groups: (s.groups ?? []).filter((_, k) => k !== gi) }))}>
                              <Icon name="close" className="text-[18px]" />
                            </button>
                          </div>
                        ))}
                        <button className={ghostBtn} onClick={() => mapSec(sec.id, (s) => ({ ...s, groups: [...(s.groups ?? []), { id: uid(), label: '', items: '' }] }))}>
                          <Icon name="add" className="text-[16px]" /> Add skill group
                        </button>
                      </div>
                    )}

                    {sec.kind === 'entries' && (
                      <div className="space-y-3">
                        {(sec.entries ?? []).map((e, ei, all) => (
                          <div key={e.id} className="rounded-lg border border-border/20 bg-surface/10 p-2.5 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-muted truncate">{e.primary || e.secondary || `Entry ${ei + 1}`}</span>
                              <div className="flex">
                                <button className={iconBtn} aria-label="Move entry up" disabled={ei === 0} onClick={() => setEntries(sec.id, (es) => move(es, ei, ei - 1))}><Icon name="arrow_upward" className="text-[16px]" /></button>
                                <button className={iconBtn} aria-label="Move entry down" disabled={ei === all.length - 1} onClick={() => setEntries(sec.id, (es) => move(es, ei, ei + 1))}><Icon name="arrow_downward" className="text-[16px]" /></button>
                                <button className={iconBtn} aria-label="Delete entry" onClick={() => setEntries(sec.id, (es) => es.filter((x) => x.id !== e.id))}><Icon name="delete" className="text-[16px]" /></button>
                              </div>
                            </div>
                            <input className={input} placeholder={hints.primary} value={e.primary} onChange={(ev) => setEntry(sec.id, e.id, { primary: ev.target.value })} />
                            <div className="grid grid-cols-2 gap-2">
                              <input className={input} placeholder={hints.secondary} value={e.secondary} onChange={(ev) => setEntry(sec.id, e.id, { secondary: ev.target.value })} />
                              <input className={input} placeholder={hints.location || 'Location'} value={e.location} onChange={(ev) => setEntry(sec.id, e.id, { location: ev.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <input className={input} placeholder="Start (Mar 2021)" value={e.start} onChange={(ev) => setEntry(sec.id, e.id, { start: ev.target.value })} />
                              <input className={input} placeholder="End (Present)" value={e.end} onChange={(ev) => setEntry(sec.id, e.id, { end: ev.target.value })} />
                            </div>
                            <div className="space-y-1.5">
                              {e.bullets.map((b, bi) => (
                                <div key={bi} className="flex gap-1.5 items-start">
                                  <span className="mt-2.5 text-muted text-xs">•</span>
                                  <textarea rows={2} className={`${input} flex-1 resize-none`} placeholder="Verb + what you did + what changed (add a number)" value={b}
                                    onChange={(ev) => setEntry(sec.id, e.id, { bullets: e.bullets.map((x, k) => (k === bi ? ev.target.value : x)) })} />
                                  <button className={iconBtn} aria-label="Remove bullet" onClick={() => setEntry(sec.id, e.id, { bullets: e.bullets.filter((_, k) => k !== bi) })}>
                                    <Icon name="close" className="text-[16px]" />
                                  </button>
                                </div>
                              ))}
                              <button className={ghostBtn} onClick={() => setEntry(sec.id, e.id, { bullets: [...e.bullets, ''] })}>
                                <Icon name="add" className="text-[16px]" /> Add bullet
                              </button>
                            </div>
                          </div>
                        ))}
                        <button className={ghostBtn} onClick={() => setEntries(sec.id, (es) => [...es, newEntry()])}>
                          <Icon name="add" className="text-[16px]" /> Add entry
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Add section */}
        <div className="mt-4">
          {!adding ? (
            <button className="w-full btn-glass rounded-xl py-2.5 text-sm font-semibold flex items-center justify-center gap-2" onClick={() => setAdding(true)}>
              <Icon name="add" className="text-[18px]" /> Add section
            </button>
          ) : (
            <div className="glass border border-border/20 rounded-xl p-3">
              <div className="grid grid-cols-2 gap-2">
                {PRESETS.map((p) => (
                  <button key={p.label} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface/15 hover:bg-surface/25 text-sm text-foreground transition-colors text-left"
                    onClick={() => {
                      const s = makeSection(p.kind, p.title);
                      onChange({ ...resume, sections: [...resume.sections, s] });
                      setOpen({ ...open, [s.id]: true });
                      setAdding(false);
                    }}>
                    <Icon name={p.icon} className="text-accent text-[18px]" /> {p.label}
                  </button>
                ))}
              </div>
              <button className={`${ghostBtn} mt-2`} onClick={() => setAdding(false)}>Cancel</button>
            </div>
          )}
        </div>
      </section>

      {/* ---------- Draft actions ---------- */}
      <section className="flex flex-wrap gap-2 pt-2 border-t border-border/20">
        <button className={ghostBtn} onClick={() => { if (confirm('Replace your draft with the example resume?')) onReset(); }}>
          <Icon name="restart_alt" className="text-[16px]" /> Load example
        </button>
        <button className={ghostBtn} onClick={() => { if (confirm('Clear everything and start from a blank resume?')) onClear(); }}>
          <Icon name="delete_sweep" className="text-[16px]" /> Start blank
        </button>
      </section>
    </div>
  );
}