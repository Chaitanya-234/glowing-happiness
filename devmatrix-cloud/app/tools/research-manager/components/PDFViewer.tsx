'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Loader2, Save } from 'lucide-react';
// import * as pdfjsLib from 'pdfjs-dist';
// Dynamic import is better for Next.js to avoid build issues

interface PDFViewerProps {
  file: File | null;
  onAddAnnotation: (annotation: any) => void;
}

export default function PDFViewer({ file, onAddAnnotation }: PDFViewerProps) {
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const renderTaskRef = useRef<any>(null);

  useEffect(() => {
    if (!file) return;

    const loadPdf = async () => {
      setLoading(true);
      try {
        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        setCurrentPage(1);
      } catch (error) {
        console.error('Error loading PDF:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPdf();
  }, [file]);

  const renderPage = useCallback(async () => {
    if (!pdfDoc || !canvasRef.current) return;

    if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
    }

    try {
      const page = await pdfDoc.getPage(currentPage);
      const viewport = page.getViewport({ scale });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      if (!context) return;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      const renderTask = page.render(renderContext);
      renderTaskRef.current = renderTask;
      await renderTask.promise;

      // Text Layer
      if (textLayerRef.current) {
          textLayerRef.current.innerHTML = '';
          textLayerRef.current.style.height = `${viewport.height}px`;
          textLayerRef.current.style.width = `${viewport.width}px`;

          const textContent = await page.getTextContent();
          const pdfjs = await import('pdfjs-dist'); // Re-import for util

          // Basic text layer rendering (simplified)
          // For a full implementation we'd need pdfjs-dist/web/pdf_viewer.css and more setup
          // Here we'll just extract text for search/selection if possible, but
          // rendering HTML text layer correctly over canvas is tricky without the viewer CSS.
          // We will skip visual text layer for this MVP and rely on canvas.
          // Note: Selection won't work on canvas.
          // Alternative: Use a library or just allow "Page Level" notes.

          // Given constraints, we'll stick to Page Level notes for now to ensure stability.
      }

    } catch (error: any) {
        if (error.name !== 'RenderingCancelledException') {
            console.error('Render error:', error);
        }
    }
  }, [pdfDoc, currentPage, scale]);

  useEffect(() => {
    renderPage();
  }, [renderPage]);

  const changePage = (offset: number) => {
    const newPage = currentPage + offset;
    if (newPage >= 1 && newPage <= numPages) {
      setCurrentPage(newPage);
    }
  };

  const handleAddNote = () => {
    const note = prompt("Enter note for this page:");
    if (note) {
        onAddAnnotation({
            type: 'note',
            page: currentPage,
            text: note,
            date: new Date().toISOString()
        });
    }
  };

  if (!file) {
      return (
          <div className="flex items-center justify-center h-64 bg-slate-100 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
              <p className="text-slate-500">No PDF loaded</p>
          </div>
      );
  }

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2">
            <button
                onClick={() => changePage(-1)}
                disabled={currentPage <= 1}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg disabled:opacity-50"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium w-20 text-center">
                {currentPage} / {numPages}
            </span>
            <button
                onClick={() => changePage(1)}
                disabled={currentPage >= numPages}
                className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg disabled:opacity-50"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>

        <div className="flex items-center gap-2">
            <button onClick={() => setScale(s => Math.max(0.5, s - 0.1))} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-sm w-12 text-center">{Math.round(scale * 100)}%</span>
            <button onClick={() => setScale(s => Math.min(2.0, s + 0.1))} className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                <ZoomIn className="w-5 h-5" />
            </button>
        </div>

        <button
            onClick={handleAddNote}
            className="flex items-center gap-2 px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
            <Save className="w-4 h-4" />
            Add Note
        </button>
      </div>

      {/* Viewer Area */}
      <div className="flex-1 overflow-auto p-4 flex justify-center bg-slate-100 dark:bg-slate-900/50">
        <div className="relative shadow-lg">
            <canvas ref={canvasRef} className="bg-white" />
            <div ref={textLayerRef} className="absolute inset-0 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
