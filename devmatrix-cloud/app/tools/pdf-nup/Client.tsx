'use client';

import Icon from '@/components/Icon';
import { FileToolLayout } from '@/components/tools/FileToolLayout';
import { PDFDocument, rgb } from 'pdf-lib';
import React, { useMemo, useState } from 'react';

type PaperKey = 'A4' | 'Letter' | 'Legal';
type Orientation = 'portrait' | 'landscape';
type FillOrder = 'across' | 'down';
type Preset = 2 | 4 | 6 | 9 | 16 | 'custom';

const PAPERS: Record<PaperKey, [number, number]> = {
  A4: [595.28, 841.89],
  Letter: [612, 792],
  Legal: [612, 1008],
};
const PRESETS: Record<Exclude<Preset, 'custom'>, [number, number]> = {
  2: [2, 1],
  4: [2, 2],
  6: [3, 2],
  9: [3, 3],
  16: [4, 4],
};
const MAX_SIZE = 50 * 1024 * 1024;

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, Number.isFinite(n) ? n : min));
const formatSize = (b: number) => (b > 1024 * 1024 ? `${(b / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(b / 1024))} KB`);

/** Shared geometry: used by both the live preview and the real PDF output. */
function sheetGeometry(paper: PaperKey, orientation: Orientation, cols: number, rows: number, margin: number, gap: number) {
  let [w, h] = PAPERS[paper];
  if (orientation === 'landscape') [w, h] = [h, w];
  const cw = (w - 2 * margin - (cols - 1) * gap) / cols;
  const ch = (h - 2 * margin - (rows - 1) * gap) / rows;
  return { w, h, cw, ch };
}
function cellOf(i: number, cols: number, rows: number, order: FillOrder) {
  return order === 'across'
    ? { row: Math.floor(i / cols), col: i % cols }
    : { row: i % rows, col: Math.floor(i / rows) };
}
/** Fit a page (pw x ph) inside a cell, centered. All values top-left based. */
function fitInCell(pw: number, ph: number, x: number, y: number, cw: number, ch: number) {
  const s = Math.min(cw / pw, ch / ph);
  const dw = pw * s;
  const dh = ph * s;
  return { dx: x + (cw - dw) / 2, dy: y + (ch - dh) / 2, dw, dh };
}

const inputCls =
  'w-full rounded-full px-4 py-2.5 text-sm bg-foreground/10 border border-border/25 text-foreground outline-none focus:border-border/60 transition-colors';
const labelCls = 'block text-sm font-medium text-foreground mb-2';

function Choice({ active, onClick, children, className = '' }: { active: boolean; onClick: () => void; children: React.ReactNode; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-4 py-2 text-sm font-medium border transition-colors ${
        active
          ? 'bg-primary text-primary-foreground border-primary'
          : 'bg-foreground/10 text-foreground border-border/25 hover:bg-foreground/15'
      } ${className}`}
    >
      {children}
    </button>
  );
}

export default function PdfNupClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pageSizes, setPageSizes] = useState<[number, number][]>([]);
  const [preset, setPreset] = useState<Preset>(2);
  const [customCols, setCustomCols] = useState(2);
  const [customRows, setCustomRows] = useState(3);
  const [paper, setPaper] = useState<PaperKey>('A4');
  const [orientation, setOrientation] = useState<Orientation>('portrait');
  const [order, setOrder] = useState<FillOrder>('across');
  const [margin, setMargin] = useState(18);
  const [gap, setGap] = useState(10);
  const [border, setBorder] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ url: string; name: string } | null>(null);

  const [cols, rows] = preset === 'custom' ? [customCols, customRows] : PRESETS[preset];
  const perSheet = cols * rows;
  const total = pageSizes.length;
  const sheets = Math.ceil(total / perSheet);
  const geo = useMemo(() => sheetGeometry(paper, orientation, cols, rows, margin, gap), [paper, orientation, cols, rows, margin, gap]);
  const layoutOk = geo.cw > 10 && geo.ch > 10;

  const loadFile = async (f: File) => {
    setError(null);
    setResult(null);
    if (f.type !== 'application/pdf' && !f.name.toLowerCase().endsWith('.pdf')) {
      setError('Please choose a PDF file.');
      return;
    }
    if (f.size > MAX_SIZE) {
      setError('File is larger than 50MB.');
      return;
    }
    try {
      const doc = await PDFDocument.load(await f.arrayBuffer());
      setPageSizes(doc.getPages().map((p) => [p.getWidth(), p.getHeight()] as [number, number]));
      setFile(f);
    } catch {
      setError('Could not read PDF file. Please upload a valid PDF.');
    }
  };

  const reset = () => {
    if (result) URL.revokeObjectURL(result.url);
    setFile(null);
    setPageSizes([]);
    setResult(null);
    setError(null);
  };

  const create = async () => {
    if (!file || !layoutOk) return;
    setProcessing(true);
    setError(null);
    try {
      const src = await PDFDocument.load(await file.arrayBuffer());
      const out = await PDFDocument.create();
      const embedded = await out.embedPdf(src, src.getPageIndices());

      for (let s = 0; s < sheets; s++) {
        const page = out.addPage([geo.w, geo.h]);
        for (let k = 0; k < perSheet; k++) {
          const idx = s * perSheet + k;
          if (idx >= total) break;
          const { row, col } = cellOf(k, cols, rows, order);
          const x = margin + col * (geo.cw + gap);
          const y = margin + row * (geo.ch + gap);
          const [pw, ph] = pageSizes[idx];
          const { dx, dy, dw, dh } = fitInCell(pw, ph, x, y, geo.cw, geo.ch);
          const pdfY = geo.h - dy - dh; // PDF origin is bottom-left
          page.drawPage(embedded[idx], { x: dx, y: pdfY, width: dw, height: dh });
          if (border) {
            page.drawRectangle({
              x: dx, y: pdfY, width: dw, height: dh,
              borderColor: rgb(0.55, 0.55, 0.6), borderWidth: 0.75,
            });
          }
        }
      }

      const bytes = await out.save();
      const url = URL.createObjectURL(new Blob([bytes as any], { type: 'application/pdf' }));
      const name = `${file.name.replace(/\.pdf$/i, '')}-${cols}x${rows}.pdf`;
      setResult({ url, name });

      // Start the download right away
      const a = document.createElement('a');
      a.href = url;
      a.download = name;
      a.click();
    } catch (err: any) {
      setError(err.message || 'Something went wrong while creating the PDF.');
    } finally {
      setProcessing(false);
    }
  };

  /* ---------- live preview of sheet 1 ---------- */
  const preview = (
    <div
      className="relative mx-auto bg-white rounded-md shadow-xl"
      style={{ aspectRatio: `${geo.w} / ${geo.h}`, width: `min(100%, ${(340 * geo.w) / geo.h}px)` }}
      aria-label="Sheet 1 preview"
    >
      {layoutOk &&
        Array.from({ length: perSheet }, (_, k) => {
          const { row, col } = cellOf(k, cols, rows, order);
          const x = margin + col * (geo.cw + gap);
          const y = margin + row * (geo.ch + gap);
          const pct = (v: number, total: number) => `${(v / total) * 100}%`;
          if (k >= total) {
            return (
              <div
                key={k}
                className="absolute border border-dashed border-slate-300 rounded-[2px]"
                style={{ left: pct(x, geo.w), top: pct(y, geo.h), width: pct(geo.cw, geo.w), height: pct(geo.ch, geo.h) }}
              />
            );
          }
          const [pw, ph] = pageSizes[k];
          const f = fitInCell(pw, ph, x, y, geo.cw, geo.ch);
          return (
            <div
              key={k}
              className={`absolute grid place-items-center bg-slate-100 text-slate-500 font-semibold text-[11px] ${
                border ? 'border border-slate-400' : 'shadow-[inset_0_0_0_1px_rgba(100,116,139,0.25)]'
              }`}
              style={{ left: pct(f.dx, geo.w), top: pct(f.dy, geo.h), width: pct(f.dw, geo.w), height: pct(f.dh, geo.h) }}
            >
              {k + 1}
            </div>
          );
        })}
    </div>
  );

  return (
    <FileToolLayout
      toolId="pdf-nup"
      title="PDF N-Up Layout"
      description="Put several PDF pages onto one sheet. Great for handouts, study notes and saving paper."
      icon={<Icon name="grid_view" className="text-[64px] text-accent" />}
      howToSteps={[
        { title: 'Upload PDF', description: 'Select the PDF whose pages you want to arrange.' },
        { title: 'Pick a layout', description: 'Choose how many pages per sheet, the paper size, orientation, margins and fill order.' },
        { title: 'Create & download', description: 'Check the live preview, then download your new PDF.' },
      ]}
      features={[
        { title: 'Private', description: 'Your file never leaves your browser.', icon: <Icon name="lock" /> },
        { title: 'Flexible Grids', description: '2, 4, 6, 9, 16 per sheet or any custom grid.', icon: <Icon name="grid_on" /> },
        { title: 'Live Preview', description: 'See sheet 1 update as you change settings.', icon: <Icon name="visibility" /> },
        { title: 'Free', description: 'Completely free, no signup.', icon: <Icon name="redeem" /> },
      ]}
      faq={[
        { question: 'What does pages per sheet (N-up) mean?', answer: 'Instead of one page per sheet, several pages are shrunk and placed on each sheet in a grid, for example 4 pages in a 2 x 2 layout.' },
        { question: 'What is the difference between the fill orders?', answer: 'Across, then down fills each row left to right, which matches normal reading order. Down, then across fills column by column, which some booklet workflows expect.' },
        { question: 'Will my pages be cropped or distorted?', answer: 'No. Each page is scaled down proportionally to fit its cell and centered, so nothing is stretched or cut.' },
        { question: 'Is my PDF uploaded anywhere?', answer: 'No. Everything runs in your browser.' },
      ]}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {!file && (
          <>
            <label
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                const f = e.dataTransfer.files?.[0];
                if (f) loadFile(f);
              }}
              className={`glass flex flex-col items-center justify-center gap-1 rounded-3xl p-10 cursor-pointer border-2 border-dashed transition-colors ${
                dragging ? 'border-accent bg-foreground/10' : 'border-border/40 hover:border-accent'
              }`}
            >
              <Icon name="upload_file" className="text-[48px] text-accent mb-3" />
              <span className="text-base font-semibold text-foreground">Drag and drop your PDF here</span>
              <span className="text-sm text-muted my-1">or</span>
              <span className="btn-solid mt-2 px-6 py-2.5 text-sm">Browse files</span>
              <span className="text-xs text-muted mt-4">PDF only, up to 50MB</span>
              <input type="file" accept=".pdf" className="hidden" onChange={(e) => e.target.files?.[0] && loadFile(e.target.files[0])} />
            </label>
            {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}
          </>
        )}

        {file && !result && (
          <div className="space-y-6">
            {/* File card */}
            <div className="flex items-center gap-4 rounded-3xl bg-foreground/10 border border-border/20 p-4">
              <span className="w-11 h-11 shrink-0 rounded-2xl bg-foreground/10 border border-border/25 grid place-items-center text-accent">
                <Icon name="picture_as_pdf" className="text-[24px]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-foreground truncate">{file.name}</p>
                <p className="text-sm text-muted">{total} pages • {formatSize(file.size)}</p>
              </div>
              <button onClick={reset} aria-label="Remove file" className="p-2 rounded-full text-muted hover:text-foreground hover:bg-foreground/10 transition-colors">
                <Icon name="close" className="text-[20px]" />
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Controls */}
              <div className="space-y-5">
                <div>
                  <span className={labelCls}>Pages per sheet</span>
                  <div className="grid grid-cols-3 gap-2">
                    {([2, 4, 6, 9, 16] as const).map((n) => (
                      <Choice key={n} active={preset === n} onClick={() => setPreset(n)}>{n}-up</Choice>
                    ))}
                    <Choice active={preset === 'custom'} onClick={() => setPreset('custom')}>Custom</Choice>
                  </div>
                  {preset === 'custom' && (
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div>
                        <label htmlFor="cols" className="block text-xs text-muted mb-1">Columns</label>
                        <input id="cols" type="number" min={1} max={10} value={customCols} onChange={(e) => setCustomCols(clamp(parseInt(e.target.value, 10), 1, 10))} className={inputCls} />
                      </div>
                      <div>
                        <label htmlFor="rows" className="block text-xs text-muted mb-1">Rows</label>
                        <input id="rows" type="number" min={1} max={10} value={customRows} onChange={(e) => setCustomRows(clamp(parseInt(e.target.value, 10), 1, 10))} className={inputCls} />
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className={labelCls}>Paper</span>
                    <div className="flex flex-wrap gap-2">
                      {(['A4', 'Letter', 'Legal'] as PaperKey[]).map((p) => (
                        <Choice key={p} active={paper === p} onClick={() => setPaper(p)} className="px-3">{p}</Choice>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className={labelCls}>Orientation</span>
                    <div className="flex flex-wrap gap-2">
                      {(['portrait', 'landscape'] as Orientation[]).map((o) => (
                        <Choice key={o} active={orientation === o} onClick={() => setOrientation(o)} className="px-3 capitalize">{o}</Choice>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <span className={labelCls}>Fill order</span>
                  <div className="grid grid-cols-2 gap-2">
                    <Choice active={order === 'across'} onClick={() => setOrder('across')}>Across, then down</Choice>
                    <Choice active={order === 'down'} onClick={() => setOrder('down')}>Down, then across</Choice>
                  </div>
                  <p className="text-xs text-muted mt-2">
                    Across fills left to right, then down: normal reading order. Down fills column by column, which some booklet workflows expect.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="margin" className={labelCls}>Margin (pt)</label>
                    <input id="margin" type="number" min={0} max={100} value={margin} onChange={(e) => setMargin(clamp(parseInt(e.target.value, 10), 0, 100))} className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="gap" className={labelCls}>Gap (pt)</label>
                    <input id="gap" type="number" min={0} max={50} value={gap} onChange={(e) => setGap(clamp(parseInt(e.target.value, 10), 0, 50))} className={inputCls} />
                  </div>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={border}
                  onClick={() => setBorder(!border)}
                  className="w-full flex items-start gap-4 text-left rounded-3xl bg-foreground/10 border border-border/20 p-4 hover:bg-foreground/15 transition-colors"
                >
                  <span className={`mt-0.5 shrink-0 w-11 h-6 rounded-full p-0.5 transition-colors ${border ? 'bg-primary' : 'bg-foreground/25'}`}>
                    <span className={`block w-5 h-5 rounded-full bg-background transition-transform ${border ? 'translate-x-5' : ''}`} />
                  </span>
                  <span>
                    <span className="block font-semibold text-foreground">Draw a border around each page</span>
                    <span className="block text-sm text-muted mt-1">Helps when pages have white backgrounds and would otherwise run together.</span>
                  </span>
                </button>
              </div>

              {/* Preview */}
              <div className="space-y-3">
                <div className="rounded-3xl bg-foreground/10 border border-border/20 p-4 grid place-items-center min-h-[300px]">
                  {layoutOk ? preview : (
                    <p role="alert" className="text-sm text-red-600 dark:text-red-400 text-center">
                      Margin and gap are too large for this grid. Reduce them or use fewer pages per sheet.
                    </p>
                  )}
                </div>
                <p className="text-center text-xs text-muted">
                  Sheet 1 preview · {cols}×{rows} on {orientation} {paper}
                </p>
              </div>
            </div>

            {error && <p role="alert" className="text-sm text-red-600 dark:text-red-400">{error}</p>}

            <div className="space-y-3">
              <p className="text-sm text-muted">
                {total} {total === 1 ? 'page' : 'pages'} → <span className="font-semibold text-foreground">{sheets} {sheets === 1 ? 'sheet' : 'sheets'}</span>
              </p>
              <button
                onClick={create}
                disabled={processing || !layoutOk}
                className="btn-solid w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="download" className="text-[20px]" />
                {processing ? 'Creating…' : 'Create & download'}
              </button>
            </div>
          </div>
        )}

        {result && (
          <div className="glass text-center space-y-4 rounded-3xl p-8">
            <span className="w-14 h-14 mx-auto rounded-full bg-foreground/10 border border-border/25 grid place-items-center text-accent">
              <Icon name="check_circle" className="text-[28px]" />
            </span>
            <p className="text-lg font-medium text-foreground">Your {cols}×{rows} PDF is ready!</p>
            <p className="text-sm text-muted">If the download did not start, use the button below.</p>
            <a href={result.url} download={result.name} className="btn-solid inline-flex items-center gap-2 px-8 py-3 text-sm">
              <Icon name="download" className="text-[18px]" />
              Download {result.name}
            </a>
            <div>
              <button onClick={() => setResult(null)} className="text-sm text-accent hover:underline mr-4">Adjust layout</button>
              <button onClick={reset} className="text-sm text-muted hover:text-foreground hover:underline">Start over</button>
            </div>
          </div>
        )}
      </div>
    </FileToolLayout>
  );
}