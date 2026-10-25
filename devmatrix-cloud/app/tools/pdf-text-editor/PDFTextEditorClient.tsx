'use client';

import Icon from '@/components/Icon';
import { saveAs } from 'file-saver';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import type { PDFDocumentProxy, PageViewport } from 'pdfjs-dist';
import React, { useEffect, useRef, useState } from 'react';
import { Rnd } from 'react-rnd';

/* ───────────── types ───────────── */
type ToolMode = 'edit' | 'text' | 'sign' | 'draw' | 'insert';
type Family = 'sans' | 'serif' | 'mono';

/** One text fragment from the PDF. x/y/width/fontSize are in PDF points; y is the baseline. */
interface TextItem {
  id: string;
  pageIndex: number;
  str: string;
  x: number;
  y: number;
  width: number;
  fontSize: number;
  family: Family;
}

/** Added text or image. x/y/w/h are in points, measured from the TOP-LEFT of the page view. */
interface Box {
  id: string;
  pageIndex: number;
  type: 'text' | 'image';
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
  fontSize: number;
  imageData?: string;
}

const SCALE = 1.5;
const familyOf = (css?: string): Family =>
  !css ? 'sans' : /mono|courier/i.test(css) ? 'mono' : /serif/i.test(css) && !/sans/i.test(css) ? 'serif' : 'sans';
const cssFont: Record<Family, string> = {
  sans: 'Helvetica, Arial, sans-serif',
  serif: '"Times New Roman", Times, serif',
  mono: '"Courier New", monospace',
};
// Standard PDF fonts only support Latin-1; anything else becomes "?"
const clean = (s: string) => s.replace(/[^\x20-\x7E\xA0-\xFF\n]/g, '?');

const TIPS: Record<ToolMode, string> = {
  edit: 'Click any text on the page and type to change it. Enter finishes, Esc undoes.',
  text: 'Click anywhere on the page to add a new text box.',
  sign: 'Click where the signature should go, then draw it.',
  draw: 'Click where the drawing should go, then draw it.',
  insert: 'Choose an image to place on the page.',
};

/* ───────────── in-place editable text ───────────── */
function EditableText({
  item, left, top, fontPx, widthPx, initial, edited, interactive, onChange, onRevert,
}: {
  item: TextItem;
  left: number;
  top: number;
  fontPx: number;
  widthPx: number;
  initial: string;
  edited: boolean;
  interactive: boolean;
  onChange: (text: string) => void;
  onRevert: () => void;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [focused, setFocused] = useState(false);

  // Set the text once; never re-render children, or the caret would jump while typing.
  useEffect(() => {
    if (ref.current) ref.current.textContent = initial;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The page itself is paper, so these stay white/black in every theme.
  const show = edited || focused;
  return (
    <span
      ref={ref}
      role="textbox"
      aria-label={`Edit text: ${item.str}`}
      contentEditable={interactive}
      suppressContentEditableWarning
      spellCheck={false}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onInput={(e) => onChange((e.currentTarget.textContent ?? '').replace(/\n/g, ''))}
      onKeyDown={(e) => {
        if (e.key === 'Enter') { e.preventDefault(); e.currentTarget.blur(); }
        if (e.key === 'Escape') {
          e.preventDefault();
          if (ref.current) ref.current.textContent = item.str;
          onRevert();
          e.currentTarget.blur();
        }
      }}
      onPaste={(e) => {
        e.preventDefault();
        document.execCommand('insertText', false, e.clipboardData.getData('text/plain').replace(/\n/g, ' '));
      }}
      className="absolute outline-offset-1 hover:outline hover:outline-1 hover:outline-dashed hover:outline-accent focus:outline focus:outline-2 focus:outline-accent"
      style={{
        left,
        top,
        fontSize: fontPx,
        lineHeight: 1,
        minWidth: widthPx,
        padding: '0 1px',
        whiteSpace: 'pre',
        fontFamily: cssFont[item.family],
        color: show ? '#000' : 'transparent',
        background: show ? '#fff' : 'transparent',
        caretColor: '#000',
        cursor: interactive ? 'text' : 'default',
        pointerEvents: interactive ? 'auto' : 'none',
      }}
    />
  );
}

/* ───────────── signature / drawing pad ───────────── */
function DrawPad({
  title, stroke, onCancel, onDone,
}: {
  title: string;
  stroke: number;
  onCancel: () => void;
  onDone: (dataUrl: string, width: number, height: number) => void;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const b = useRef({ minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity });
  const [empty, setEmpty] = useState(true);

  const pos = (e: React.PointerEvent) => {
    const c = ref.current!;
    const r = c.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * c.width, y: ((e.clientY - r.top) / r.height) * c.height };
  };
  const track = (p: { x: number; y: number }) => {
    b.current.minX = Math.min(b.current.minX, p.x); b.current.maxX = Math.max(b.current.maxX, p.x);
    b.current.minY = Math.min(b.current.minY, p.y); b.current.maxY = Math.max(b.current.maxY, p.y);
  };
  const down = (e: React.PointerEvent) => {
    const c = ref.current!;
    c.setPointerCapture(e.pointerId);
    drawing.current = true;
    const ctx = c.getContext('2d')!;
    ctx.lineWidth = stroke; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#111';
    const p = pos(e);
    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + 0.01, p.y); ctx.stroke();
    track(p); setEmpty(false);
  };
  const move = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const ctx = ref.current!.getContext('2d')!;
    const p = pos(e);
    ctx.lineTo(p.x, p.y); ctx.stroke(); track(p);
  };
  const clear = () => {
    const c = ref.current!;
    c.getContext('2d')!.clearRect(0, 0, c.width, c.height);
    b.current = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
    setEmpty(true);
  };
  const done = () => {
    const c = ref.current!;
    const m = stroke + 4;
    const x = Math.max(0, b.current.minX - m), y = Math.max(0, b.current.minY - m);
    const w = Math.min(c.width, b.current.maxX + m) - x, h = Math.min(c.height, b.current.maxY + m) - y;
    const out = document.createElement('canvas');
    out.width = w; out.height = h;
    out.getContext('2d')!.drawImage(c, x, y, w, h, 0, 0, w, h);
    onDone(out.toDataURL('image/png'), w, h);
  };

  return (
    <div className="fixed inset-0 z-[200] grid place-items-center p-4 bg-background/70 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label={title}>
      <div className="glass w-full max-w-xl rounded-3xl p-6 space-y-4">
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        {/* white = paper; strokes are saved on a transparent background */}
        <canvas
          ref={ref}
          width={600}
          height={240}
          className="w-full rounded-2xl bg-white touch-none cursor-crosshair"
          onPointerDown={down}
          onPointerMove={move}
          onPointerUp={() => (drawing.current = false)}
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button onClick={clear} disabled={empty} className="btn-glass px-5 py-2 text-sm disabled:opacity-50">Clear</button>
          <div className="flex gap-3">
            <button onClick={onCancel} className="btn-glass px-5 py-2 text-sm">Cancel</button>
            <button onClick={done} disabled={empty} className="btn-solid px-6 py-2 text-sm disabled:opacity-50">Place on page</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────── main editor ───────────── */
export default function PDFTextEditorClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [viewport, setViewport] = useState<PageViewport | null>(null);
  const [isRendering, setIsRendering] = useState(false);
  const [pageItems, setPageItems] = useState<TextItem[]>([]);

  const [activeTool, setActiveTool] = useState<ToolMode>('edit');
  const [textEdits, setTextEdits] = useState<Record<string, { item: TextItem; text: string }>>({});
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [activeBoxId, setActiveBoxId] = useState<string | null>(null);
  const [padAt, setPadAt] = useState<{ x: number; y: number; mode: 'sign' | 'draw' } | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const editCount = Object.keys(textEdits).length + boxes.length;
  const activeBox = boxes.find((b) => b.id === activeBoxId && b.type === 'text');

  /* ── 1. upload ── */
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setError(null);
    setLoading(true);
    try {
      const pdfjsLib = await import('pdfjs-dist');
      if (!pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      }
      const buf = await f.arrayBuffer();
      const doc = await pdfjsLib.getDocument({ data: new Uint8Array(buf) }).promise;
      setFile(f);
      setPdfDoc(doc);
      setNumPages(doc.numPages);
      setPageNum(1);
      setTextEdits({});
      setBoxes([]);
      setActiveTool('edit');
    } catch (err) {
      console.error(err);
      setError('Could not load this PDF. It may be damaged or password protected.');
    } finally {
      setLoading(false);
      e.target.value = '';
    }
  };

  const closeFile = () => {
    pdfDoc?.destroy();
    setFile(null); setPdfDoc(null); setViewport(null); setPageItems([]);
    setTextEdits({}); setBoxes([]); setActiveBoxId(null); setError(null);
  };

  /* ── 2. render page + extract editable text ── */
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;
    let alive = true;
    let task: any = null;

    (async () => {
      try {
        setIsRendering(true);
        const page = await pdfDoc.getPage(pageNum);
        const vp = page.getViewport({ scale: SCALE });
        const canvas = canvasRef.current;
        if (!canvas || !alive) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        canvas.width = vp.width;
        canvas.height = vp.height;
        setViewport(vp);
        task = page.render({ canvasContext: ctx, viewport: vp, canvas });
        await task.promise;

        const tc: any = await page.getTextContent();
        if (!alive) return;
        const items: TextItem[] = [];
        tc.items.forEach((it: any, i: number) => {
          if (!it.str || !it.str.trim()) return;
          items.push({
            id: `${pageNum - 1}-${i}`,
            pageIndex: pageNum - 1,
            str: it.str,
            x: it.transform[4],
            y: it.transform[5],
            width: it.width,
            fontSize: Math.hypot(it.transform[2], it.transform[3]),
            family: familyOf(tc.styles?.[it.fontName]?.fontFamily),
          });
        });
        setPageItems(items);
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') console.error(err);
      } finally {
        if (alive) setIsRendering(false);
      }
    })();

    return () => { alive = false; task?.cancel(); };
  }, [pdfDoc, pageNum]);

  /* ── 3. tools ── */
  const selectTool = (tool: ToolMode) => {
    if (tool === 'insert') { imageInputRef.current?.click(); return; }
    setActiveTool(tool);
    setActiveBoxId(null);
  };

  const handleImagePicked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader.result as string;
      const img = new Image();
      img.onload = () => {
        const w = Math.min(200, img.naturalWidth);
        const h = (w * img.naturalHeight) / img.naturalWidth;
        const box: Box = { id: crypto.randomUUID(), pageIndex: pageNum - 1, type: 'image', x: 40, y: 40, w, h, text: '', fontSize: 0, imageData: data };
        setBoxes((p) => [...p, box]);
        setActiveBoxId(box.id);
        setActiveTool('edit');
      };
      img.src = data;
    };
    reader.readAsDataURL(f);
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (!canvasRef.current || activeTool === 'edit' || activeTool === 'insert') return;
    const r = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / SCALE;
    const y = (e.clientY - r.top) / SCALE;

    if (activeTool === 'text') {
      const box: Box = { id: crypto.randomUUID(), pageIndex: pageNum - 1, type: 'text', x, y, w: 170, h: 28, text: '', fontSize: 14 };
      setBoxes((p) => [...p, box]);
      setActiveBoxId(box.id);
    } else {
      setPadAt({ x, y, mode: activeTool });
    }
  };

  const placePadImage = (dataUrl: string, w: number, h: number) => {
    if (!padAt) return;
    const bw = Math.min(180, w / 2);
    const box: Box = { id: crypto.randomUUID(), pageIndex: pageNum - 1, type: 'image', x: padAt.x, y: padAt.y, w: bw, h: (bw * h) / w, text: '', fontSize: 0, imageData: dataUrl };
    setBoxes((p) => [...p, box]);
    setActiveBoxId(box.id);
    setPadAt(null);
    setActiveTool('edit');
  };

  const updateBox = (id: string, patch: Partial<Box>) => setBoxes((p) => p.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  const deleteBox = (id: string) => { setBoxes((p) => p.filter((b) => b.id !== id)); if (activeBoxId === id) setActiveBoxId(null); };

  const setItemText = (item: TextItem, text: string) =>
    setTextEdits((prev) => {
      if (text === item.str) { const { [item.id]: _drop, ...rest } = prev; return rest; }
      return { ...prev, [item.id]: { item, text } };
    });
  const revertItem = (id: string) => setTextEdits((prev) => { const { [id]: _drop, ...rest } = prev; return rest; });

  /* ── 4. export ── */
  const handleExport = async () => {
    if (!file || !pdfDoc) return;
    setIsExporting(true);
    setError(null);
    try {
      const doc = await PDFDocument.load(await file.arrayBuffer());
      const pages = doc.getPages();
      const fonts: Record<Family, any> = {
        sans: await doc.embedFont(StandardFonts.Helvetica),
        serif: await doc.embedFont(StandardFonts.TimesRoman),
        mono: await doc.embedFont(StandardFonts.Courier),
      };

      // edited PDF text: cover the original, draw the new text in the same spot
      for (const { item, text } of Object.values(textEdits)) {
        const page = pages[item.pageIndex];
        const fs = item.fontSize;
        page.drawRectangle({ x: item.x - 1, y: item.y - fs * 0.25, width: item.width + 2, height: fs * 1.2, color: rgb(1, 1, 1) });
        if (text.trim()) {
          page.drawText(clean(text), { x: item.x, y: item.y, size: fs, font: fonts[item.family], color: rgb(0, 0, 0) });
        }
      }

      // added text and images
      for (const b of boxes) {
        const page = pages[b.pageIndex];
        const [vx0, , , vy1] = (await pdfDoc.getPage(b.pageIndex + 1)).view;
        if (b.type === 'text' && b.text.trim()) {
          page.drawText(clean(b.text), {
            x: vx0 + b.x + 2,
            y: vy1 - (b.y + b.fontSize * 0.95),
            size: b.fontSize,
            font: fonts.sans,
            color: rgb(0, 0, 0),
            maxWidth: Math.max(10, b.w - 4),
            lineHeight: b.fontSize * 1.2,
          });
        } else if (b.type === 'image' && b.imageData) {
          const bytes = await (await fetch(b.imageData)).arrayBuffer();
          const img = b.imageData.startsWith('data:image/png') ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
          page.drawImage(img, { x: vx0 + b.x, y: vy1 - b.y - b.h, width: b.w, height: b.h });
        }
      }

      const out = await doc.save();
      saveAs(new Blob([out as any], { type: 'application/pdf' }), `edited-${file.name}`);
    } catch (err) {
      console.error(err);
      setError('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  /* ── upload screen ── */
  if (!file) {
    return (
      <div className="max-w-4xl mx-auto pt-28 pb-12 px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-4 md:text-5xl">PDF Text Editor</h1>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            Click any text to edit it. Add text, images and signatures. 100% local, no uploads.
          </p>
        </div>

        <div className="glass glass-hover border-2 border-dashed border-border/40 hover:border-accent rounded-3xl p-10 text-center transition-colors cursor-pointer relative overflow-hidden group">
          <input type="file" accept=".pdf,application/pdf" onChange={handleUpload} aria-label="Select PDF file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
          <div className="flex flex-col items-center gap-4 relative z-0">
            <div className="w-16 h-16 bg-surface/15 border border-border/20 text-accent rounded-full grid place-items-center group-hover:scale-110 transition-transform">
              <Icon name="upload_file" className="text-[32px]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{loading ? 'Loading…' : 'Select PDF File'}</h3>
              <p className="text-muted mt-1">Drag & drop or click to browse</p>
            </div>
          </div>
        </div>
        {error && (
          <p role="alert" className="mt-4 flex items-start gap-2 rounded-2xl bg-surface/15 border border-border/40 px-4 py-3 text-sm text-foreground">
            <Icon name="error" className="text-[18px] text-accent shrink-0 mt-0.5" />{error}
          </p>
        )}
      </div>
    );
  }

  const pageBoxes = boxes.filter((b) => b.pageIndex === pageNum - 1);
  const tools: { id: ToolMode; icon: string; label: string }[] = [
    { id: 'edit', icon: 'edit_note', label: 'Edit' },
    { id: 'text', icon: 'text_fields', label: 'Text' },
    { id: 'sign', icon: 'signature', label: 'Sign' },
    { id: 'draw', icon: 'brush', label: 'Draw' },
    { id: 'insert', icon: 'add_photo_alternate', label: 'Insert' },
  ];

  /* ── editor ── */
  return (
    <div className="max-w-7xl mx-auto pt-28 pb-6 px-4 flex flex-col gap-4">
      <input ref={imageInputRef} type="file" accept="image/png,image/jpeg" className="hidden" onChange={handleImagePicked} />

      {/* toolbar */}
      <div className="glass rounded-2xl p-2 flex items-center justify-center gap-2 flex-wrap">
        {tools.map((t) => (
          <button
            key={t.id}
            onClick={() => selectTool(t.id)}
            aria-pressed={activeTool === t.id}
            className={`flex flex-col items-center justify-center p-3 rounded-xl min-w-[70px] transition-all ${
              activeTool === t.id ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted hover:text-foreground hover:bg-surface/15'
            }`}
          >
            <Icon name={t.icon} className="text-[22px] mb-1" />
            <span className="text-[11px] font-medium">{t.label}</span>
          </button>
        ))}
      </div>
      <p className="text-center text-sm text-muted -mt-2">{TIPS[activeTool]}</p>

      {/* header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-9 h-9 shrink-0 bg-surface/15 border border-border/20 text-accent rounded-xl grid place-items-center">
            <Icon name="picture_as_pdf" />
          </span>
          <span className="font-bold text-foreground truncate max-w-[260px]">{file.name}</span>
          <button onClick={closeFile} aria-label="Close file" className="p-1.5 rounded-full text-muted hover:text-foreground hover:bg-surface/15">
            <Icon name="close" className="text-[20px]" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {activeBox && (
            <label className="flex items-center gap-2 text-sm text-muted">
              Font size
              <input
                type="number" min={6} max={96} value={activeBox.fontSize}
                onChange={(e) => updateBox(activeBox.id, { fontSize: Math.min(96, Math.max(6, parseInt(e.target.value, 10) || 12)) })}
                className="w-20 rounded-full px-3 py-1.5 text-sm bg-surface/15 border border-border/20 text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/30"
              />
            </label>
          )}
          <div className="flex items-center bg-surface/15 rounded-xl border border-border/20 p-1">
            <button onClick={() => setPageNum((p) => Math.max(1, p - 1))} disabled={pageNum <= 1} aria-label="Previous page" className="p-1.5 hover:bg-surface/25 rounded disabled:opacity-50 text-foreground"><Icon name="chevron_left" /></button>
            <span className="px-3 text-sm font-medium text-foreground">Page {pageNum} / {numPages}</span>
            <button onClick={() => setPageNum((p) => Math.min(numPages, p + 1))} disabled={pageNum >= numPages} aria-label="Next page" className="p-1.5 hover:bg-surface/25 rounded disabled:opacity-50 text-foreground"><Icon name="chevron_right" /></button>
          </div>
          <button onClick={handleExport} disabled={isExporting || editCount === 0} className="btn-solid inline-flex items-center gap-2 py-2.5 px-6 text-sm disabled:opacity-50 disabled:cursor-not-allowed">
            <Icon name={isExporting ? 'progress_activity' : 'download'} className={isExporting ? 'motion-safe:animate-spin' : ''} />
            {isExporting ? 'Saving…' : `Save PDF${editCount ? ` (${editCount})` : ''}`}
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="flex items-start gap-2 rounded-2xl bg-surface/15 border border-border/40 px-4 py-3 text-sm text-foreground">
          <Icon name="error" className="text-[18px] text-accent shrink-0 mt-0.5" />{error}
        </p>
      )}

      {/* page */}
      <div className="h-[70vh] overflow-auto flex justify-center p-4 bg-surface/5 rounded-2xl border border-border/10 relative">
        {isRendering && (
          <div className="absolute inset-0 grid place-items-center bg-background/50 z-50">
            <Icon name="progress_activity" className="motion-safe:animate-spin text-accent text-[32px]" />
          </div>
        )}

        {/* white background = paper, intentionally not themed */}
        <div className="relative shadow-2xl bg-white shrink-0" style={{ width: viewport?.width, height: viewport?.height }}>
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className={`block ${activeTool === 'edit' ? 'cursor-default' : 'cursor-crosshair'}`}
          />

          {/* editable text layer */}
          {viewport &&
            pageItems.map((item) => {
              const [px, py] = viewport.convertToViewportPoint(item.x, item.y);
              const fontPx = item.fontSize * SCALE;
              const edit = textEdits[item.id];
              return (
                <EditableText
                  key={item.id}
                  item={item}
                  left={px}
                  top={py - fontPx * 0.85}
                  fontPx={fontPx}
                  widthPx={item.width * SCALE}
                  initial={edit?.text ?? item.str}
                  edited={!!edit}
                  interactive={activeTool === 'edit'}
                  onChange={(t) => setItemText(item, t)}
                  onRevert={() => revertItem(item.id)}
                />
              );
            })}

          {/* added text + images */}
          {pageBoxes.map((b) => {
            const active = activeBoxId === b.id;
            return (
              <Rnd
                key={b.id}
                size={{ width: b.w * SCALE, height: b.h * SCALE }}
                position={{ x: b.x * SCALE, y: b.y * SCALE }}
                onDragStart={() => setActiveBoxId(b.id)}
                onDragStop={(_e, d) => updateBox(b.id, { x: d.x / SCALE, y: d.y / SCALE })}
                onResizeStop={(_e, _dir, ref, _delta, pos) =>
                  updateBox(b.id, { w: ref.offsetWidth / SCALE, h: ref.offsetHeight / SCALE, x: pos.x / SCALE, y: pos.y / SCALE })
                }
                bounds="parent"
                dragHandleClassName={b.type === 'text' ? 'box-drag' : undefined}
                className={`border-2 ${active ? 'border-accent' : 'border-transparent hover:border-accent/50'}`}
              >
                <div className="w-full h-full relative" onMouseDown={() => setActiveBoxId(b.id)}>
                  {b.type === 'text' ? (
                    <textarea
                      autoFocus
                      value={b.text}
                      placeholder="Type here"
                      onChange={(e) => updateBox(b.id, { text: e.target.value })}
                      onFocus={() => setActiveBoxId(b.id)}
                      className="w-full h-full resize-none outline-none bg-transparent text-black placeholder:text-black/40 overflow-hidden"
                      style={{ fontSize: b.fontSize * SCALE, lineHeight: 1.2, fontFamily: cssFont.sans, padding: 0 }}
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={b.imageData} alt="Added to page" className="w-full h-full object-contain pointer-events-none select-none" draggable={false} />
                  )}

                  {active && (
                    <>
                      {b.type === 'text' && (
                        <span className="box-drag absolute -top-7 left-0 inline-flex items-center gap-1 h-6 px-2 rounded-md bg-accent text-primary-foreground text-[11px] font-semibold cursor-move select-none">
                          <Icon name="drag_indicator" className="text-[14px]" />Move
                        </span>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteBox(b.id); }}
                        aria-label="Delete"
                        className="absolute -top-3 -right-3 w-6 h-6 bg-primary text-primary-foreground rounded-full grid place-items-center shadow-md z-50 hover:scale-110"
                      >
                        <Icon name="close" className="text-[14px]" />
                      </button>
                    </>
                  )}
                </div>
              </Rnd>
            );
          })}
        </div>
      </div>

      {padAt && (
        <DrawPad
          title={padAt.mode === 'sign' ? 'Draw your signature' : 'Draw on the page'}
          stroke={padAt.mode === 'sign' ? 3 : 5}
          onCancel={() => setPadAt(null)}
          onDone={placePadImage}
        />
      )}
    </div>
  );
}