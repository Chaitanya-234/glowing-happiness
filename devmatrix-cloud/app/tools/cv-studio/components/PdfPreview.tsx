'use client';

import type { PDFDocumentProxy } from 'pdfjs-dist';
import { useEffect, useRef, useState } from 'react';

/** Renders every page of a PDF (as bytes) to canvases. Works on every browser, including mobile Safari. */
export default function PdfPreview({ bytes }: { bytes: Uint8Array | null }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvases = useRef<(HTMLCanvasElement | null)[]>([]);
  const [width, setWidth] = useState(0);
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(Math.floor(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!bytes) return;
    let alive = true;
    let loaded: PDFDocumentProxy | null = null;
    (async () => {
      const pdfjs = await import('pdfjs-dist');
      if (!pdfjs.GlobalWorkerOptions.workerSrc) {
        // bundled with the app, so the preview also works offline
        pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();
      }
      // slice(): pdf.js transfers the buffer to its worker, which would empty our copy
      loaded = await pdfjs.getDocument({ data: bytes.slice() }).promise;
      if (alive) setDoc(loaded); else loaded.destroy();
    })().catch(() => {});
    return () => { alive = false; };
  }, [bytes]);

  useEffect(() => () => { doc?.destroy(); }, [doc]);

  useEffect(() => {
    if (!doc || !width) return;
    let cancelled = false;
    const tasks: { cancel: () => void }[] = [];
    (async () => {
      for (let i = 1; i <= doc.numPages; i++) {
        const page = await doc.getPage(i);
        const canvas = canvases.current[i - 1];
        if (!canvas || cancelled) return;
        const base = page.getViewport({ scale: 1 });
        const scale = width / base.width;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const vp = page.getViewport({ scale: scale * dpr });
        canvas.width = vp.width;
        canvas.height = vp.height;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${base.height * scale}px`;
        const ctx = canvas.getContext('2d');
        if (!ctx) continue;
        const task = page.render({ canvasContext: ctx, viewport: vp, canvas });
        tasks.push(task);
        try { await task.promise; } catch { /* cancelled */ }
      }
    })();
    return () => { cancelled = true; tasks.forEach((t) => t.cancel()); };
  }, [doc, width]);

  const count = doc?.numPages ?? 0;
  return (
    <div ref={wrapRef} className="w-full space-y-4">
      {Array.from({ length: count }, (_, i) => (
        // white = paper; intentionally not themed
        <canvas key={i} ref={(el) => { canvases.current[i] = el; }} className="block bg-white rounded-md shadow-xl" aria-label={`Resume page ${i + 1}`} />
      ))}
    </div>
  );
}