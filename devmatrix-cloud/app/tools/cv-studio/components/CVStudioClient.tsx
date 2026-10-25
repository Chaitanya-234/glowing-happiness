'use client';

import Icon from '@/components/Icon';
import { analyze, scoreOf, type Issue } from '@/lib/resume/analyze';
import { importTex } from '@/lib/resume/import';
import { toLatex } from '@/lib/resume/latex';
import { buildPdf } from '@/lib/resume/pdf';
import { freshSample, loadDraft, normalizeDesign, normalizeResume, saveDraft } from '@/lib/resume/storage';
import { TEMPLATES } from '@/lib/resume/templates';
import type { Design, Resume } from '@/lib/resume/types';
import { saveAs } from 'file-saver';
import React, { useEffect, useRef, useState } from 'react';
import DesignPanel from './Designpanel';
import EditorPanel from './EditorPanel';
import InsightsPanel from './Insightspanel';
import PdfPreview from './PdfPreview';

type LeftTab = 'edit' | 'design';
type View = 'left' | 'preview' | 'check';

const fileBase = (r: Resume) => (r.basics.name.trim() || 'resume').replace(/[^\w\- ]+/g, '').trim().replace(/\s+/g, '_') || 'resume';

const BLANK: Resume = {
  basics: { name: '', title: '', email: '', phone: '', location: '', links: [] },
  sections: [],
};

export default function CVStudioClient() {
  const initial = useRef(freshSample());
  const [resume, setResume] = useState<Resume>(initial.current.resume);
  const [design, setDesign] = useState<Design>(initial.current.design);
  const [hydrated, setHydrated] = useState(false);

  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null);
  const [pages, setPages] = useState(1);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [score, setScore] = useState(100);
  const [building, setBuilding] = useState(false);
  const [buildError, setBuildError] = useState<string | null>(null);

  const [leftTab, setLeftTab] = useState<LeftTab>('edit');
  const [view, setView] = useState<View>('left');
  const [toast, setToast] = useState<{ text: string; tone: 'ok' | 'warn' } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const say = (text: string, tone: 'ok' | 'warn' = 'ok') => {
    setToast({ text, tone });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4500);
  };

  const [leftOpen, setLeftOpen] = useState(true);
const [rightOpen, setRightOpen] = useState(true);

useEffect(() => {
  try {
    const p = JSON.parse(localStorage.getItem('cvstudio:panels') ?? '{}');
    if (typeof p.left === 'boolean') setLeftOpen(p.left);
    if (typeof p.right === 'boolean') setRightOpen(p.right);
  } catch { /* ignore */ }
}, []);
useEffect(() => {
  try { localStorage.setItem('cvstudio:panels', JSON.stringify({ left: leftOpen, right: rightOpen })); } catch { /* ignore */ }
}, [leftOpen, rightOpen]);

  /* 1. Restore the draft saved in this browser */
  useEffect(() => {
    const d = loadDraft();
    if (d) { setResume(d.resume); setDesign(d.design); }
    setHydrated(true);
  }, []);

  /* 2. Autosave as you type */
  useEffect(() => {
    if (!hydrated) return;
    const t = setTimeout(() => saveDraft(resume, design), 300);
    return () => clearTimeout(t);
  }, [resume, design, hydrated]);

  /* 3. Re-typeset the PDF (debounced) and re-run the checks */
  useEffect(() => {
    if (!hydrated) return;
    let cancelled = false;
    const t = setTimeout(async () => {
      setBuilding(true);
      try {
        const out = await buildPdf(resume, design);
        if (cancelled) return;
        const found = analyze(resume, design, out.pages);
        setPdfBytes(out.bytes);
        setPages(out.pages);
        setIssues(found);
        setScore(scoreOf(found));
        setBuildError(null);
      } catch (e) {
        if (!cancelled) setBuildError(e instanceof Error ? e.message : 'Could not build the PDF.');
        console.error('PDF build error', e);
      } finally {
        if (!cancelled) setBuilding(false);
      }
    }, 350);
    return () => { cancelled = true; clearTimeout(t); };
  }, [resume, design, hydrated]);

  /* ---------- actions ---------- */
  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = ''; // allow re-importing the same file
    if (!file) return;
    try {
      const imported = importTex(await file.text());
      if (!imported) { say('Could not find a name or any sections in that .tex file.', 'warn'); return; }
      setResume(normalizeResume(imported.resume));
      if (imported.design) setDesign(normalizeDesign(imported.design));
      say(imported.exact ? 'Imported with every detail restored.' : 'Imported from LaTeX. Check each section, since custom macros may not carry over.', imported.exact ? 'ok' : 'warn');
      setLeftTab('edit'); setView('left');
    } catch {
      say('That file could not be read.', 'warn');
    }
  };

  const downloadPdf = () => {
    if (!pdfBytes) return;
    saveAs(new Blob([pdfBytes as BlobPart], { type: 'application/pdf' }), `${fileBase(resume)}_Resume.pdf`);
  };
  const downloadTex = () => {
    saveAs(new Blob([toLatex(resume, design)], { type: 'application/x-tex;charset=utf-8' }), `${fileBase(resume)}_Resume.tex`);
  };

  const T = TEMPLATES[design.template];
  const warnCount = issues.filter((i) => i.level === 'warn').length;
  const scoreTone = score >= 80 ? 'text-emerald-600 dark:text-emerald-300' : score >= 55 ? 'text-amber-600 dark:text-amber-300' : 'text-rose-600 dark:text-rose-300';

  const tabBtn = (active: boolean) => `flex-1 py-2 text-sm font-semibold transition-colors border-b-2 ${active ? 'border-accent text-foreground' : 'border-transparent text-muted hover:text-foreground'}`;
  const navBtn = (active: boolean) => `flex flex-col items-center gap-0.5 py-2 text-[11px] font-semibold transition-colors ${active ? 'text-accent' : 'text-muted'}`;

  return (
    <div className="flex flex-col h-[calc(100dvh-4rem)] bg-background">
      {/* ---------- Top bar ---------- */}
      <header className="glass border-b border-border/20 px-3 md:px-4 py-2.5 flex items-center justify-between gap-2 shrink-0 z-40">
        <div className="flex items-center gap-3 min-w-0">
          <h1 className="font-bold text-foreground text-base md:text-lg flex items-center gap-2 shrink-0">
            <Icon name="description" className="text-accent" /> CV Studio
          </h1>
          <span className="hidden lg:inline text-xs text-muted truncate">{T.label} · {design.paper === 'a4' ? 'A4' : 'Letter'} · {pages} {pages === 1 ? 'page' : 'pages'}</span>
        </div>

        <div className="flex items-center gap-1.5 md:gap-2">
            <button onClick={() => setLeftOpen((v) => !v)} className="hidden md:flex p-2 rounded-lg bg-surface/15 hover:bg-surface/25 text-foreground transition-colors"
  aria-label={leftOpen ? 'Hide editor' : 'Show editor'} title={leftOpen ? 'Hide editor' : 'Show editor'} aria-pressed={!leftOpen}>
  <Icon name={leftOpen ? 'left_panel_close' : 'left_panel_open'} className="text-[20px]" />
</button>
<button onClick={() => setRightOpen((v) => !v)} className="hidden xl:flex p-2 rounded-lg bg-surface/15 hover:bg-surface/25 text-foreground transition-colors"
  aria-label={rightOpen ? 'Hide checks' : 'Show checks'} title={rightOpen ? 'Hide checks' : 'Show checks'} aria-pressed={!rightOpen}>
  <Icon name={rightOpen ? 'right_panel_close' : 'right_panel_open'} className="text-[20px]" />
</button>
          <button onClick={() => setView(view === 'check' ? 'left' : 'check')} className="xl:hidden hidden md:flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface/15 hover:bg-surface/25 text-sm font-semibold transition-colors" aria-label="Open checks">
            <Icon name="fact_check" className="text-[16px]" />
            <span className={scoreTone}>{score}</span>
          </button>
          <label className="cursor-pointer bg-surface/15 hover:bg-surface/25 text-foreground px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Icon name="upload_file" className="text-[16px]" />
            <span className="hidden sm:inline">Import .tex</span>
            <input type="file" accept=".tex,text/x-tex,text/plain" onChange={handleImport} className="hidden" />
          </label>
          <button onClick={downloadTex} className="bg-surface/15 hover:bg-surface/25 text-foreground px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Icon name="code" className="text-[16px]" />
            <span className="hidden sm:inline">Export LaTeX</span>
          </button>
          <button onClick={downloadPdf} disabled={!pdfBytes || !!buildError} className="btn-solid px-4 md:px-5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 disabled:opacity-50">
            <Icon name="download" className="text-[16px]" />
            <span>PDF</span>
          </button>
        </div>
      </header>

      {/* ---------- Workspace ---------- */}
      <div className="flex flex-1 min-h-0 relative">
        {/* Left: content + design */}
        <aside className={`${view === 'left' ? 'flex' : 'hidden'} ${leftOpen ? 'md:flex' : 'md:hidden'} flex-col w-full md:w-[400px] shrink-0 glass border-r border-border/20 min-h-0`}>
          <div className="flex border-b border-border/20 shrink-0">
            <button className={tabBtn(leftTab === 'edit')} onClick={() => setLeftTab('edit')}>Content</button>
            <button className={tabBtn(leftTab === 'design')} onClick={() => setLeftTab('design')}>Design</button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {leftTab === 'edit' ? (
              <EditorPanel
                resume={resume}
                onChange={setResume}
                onReset={() => { const s = freshSample(); setResume(s.resume); setDesign(s.design); }}
                onClear={() => setResume(BLANK)}
              />
            ) : (
              <DesignPanel design={design} onChange={setDesign} />
            )}
          </div>
        </aside>

        {/* Middle: live preview */}
        <main className={`${view === 'preview' ? 'block' : 'hidden'} md:block flex-1 min-w-0 bg-surface/5 overflow-y-auto p-3 md:p-8 relative`}>
          <div className="sticky top-0 z-10 h-0 flex justify-end pointer-events-none">
            {building && (
              <span className="mt-1 mr-1 inline-flex items-center gap-1.5 text-xs text-muted bg-background/80 backdrop-blur rounded-full px-2.5 py-1 border border-border/20">
                <Icon name="sync" className="animate-spin text-accent text-[14px]" /> Updating
              </span>
            )}
          </div>

          {buildError && (
            <div className="max-w-[820px] mx-auto mb-4 p-3 rounded-xl text-sm bg-rose-500/10 border border-rose-500/25 text-rose-700 dark:text-rose-300">
              The preview could not be built: {buildError}. Your content is safe. Try changing the last field you edited.
            </div>
          )}
          {T.columns === 2 && (
            <div className="max-w-[820px] mx-auto mb-4 p-3 rounded-xl text-sm flex gap-2 bg-amber-500/10 border border-amber-500/25 text-amber-700 dark:text-amber-300">
              <Icon name="warning" className="text-[18px] shrink-0 mt-0.5" />
              <span>Two-column layouts can confuse applicant tracking systems. The LaTeX export uses a single column.</span>
            </div>
          )}
          <div className="w-full max-w-[820px] mx-auto">
            <PdfPreview bytes={pdfBytes} />
          </div>
        </main>

        {/* Right: checks + job match (docked on xl, slide-over below) */}
        <aside className={`${view === 'check' ? 'flex' : 'hidden'} ${rightOpen ? 'xl:flex' : 'xl:hidden'} flex-col absolute xl:static inset-y-0 right-0 z-30 w-full md:w-[340px] shrink-0 glass border-l border-border/20 min-h-0`}>
          <div className="flex-1 overflow-y-auto p-4">
            <InsightsPanel issues={issues} score={score} pages={pages} resume={resume} />
          </div>
        </aside>
      </div>

      {/* ---------- Phone navigation ---------- */}
      <nav className="md:hidden grid grid-cols-4 glass border-t border-border/20 shrink-0 pb-[env(safe-area-inset-bottom)]">
        <button className={navBtn(view === 'left' && leftTab === 'edit')} onClick={() => { setLeftTab('edit'); setView('left'); }}><Icon name="edit_note" className="text-[22px]" />Edit</button>
        <button className={navBtn(view === 'left' && leftTab === 'design')} onClick={() => { setLeftTab('design'); setView('left'); }}><Icon name="palette" className="text-[22px]" />Design</button>
        <button className={navBtn(view === 'preview')} onClick={() => setView('preview')}><Icon name="visibility" className="text-[22px]" />Preview</button>
        <button className={navBtn(view === 'check')} onClick={() => setView('check')}>
          <span className="relative"><Icon name="fact_check" className="text-[22px]" />{warnCount > 0 && <span className="absolute -top-1 -right-2 min-w-4 h-4 px-1 rounded-full bg-rose-500 text-white text-[10px] grid place-items-center">{warnCount}</span>}</span>
          Check
        </button>
      </nav>

      {/* ---------- Toast ---------- */}
      {toast && (
        <div role="status" className={`fixed bottom-20 md:bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[92vw] px-4 py-2.5 rounded-xl text-sm font-medium shadow-xl border glass ${toast.tone === 'ok' ? 'border-emerald-500/30 text-foreground' : 'border-amber-500/40 text-foreground'}`}>
          <Icon name={toast.tone === 'ok' ? 'check_circle' : 'warning'} className={`text-[18px] mr-2 align-middle ${toast.tone === 'ok' ? 'text-emerald-500' : 'text-amber-500'}`} />
          {toast.text}
        </div>
      )}
    </div>
  );
}