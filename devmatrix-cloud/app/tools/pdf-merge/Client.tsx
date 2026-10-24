'use client';

import { FileToolLayout } from '@/components/tools/FileToolLayout';
import { PDFDocument, degrees } from 'pdf-lib';
import React, { useRef, useState } from 'react';

type PageItem = {
  id: string;
  fileId: string;
  fileName: string;
  pageIndex: number; // 0-indexed within its source file
  thumbnail: string; // data URL
  rotation: number; // 0, 90, 180, 270
};

type SourceFile = {
  id: string;
  file: File;
};

export default function PdfMergeClient() {
  const [sourceFiles, setSourceFiles] = useState<SourceFile[]>([]);
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loadingThumbs, setLoadingThumbs] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ url: string; name: string } | null>(null);
  const dragIndexRef = useRef<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const renderThumbnails = async (file: File, fileId: string): Promise<PageItem[]> => {
    const pdfjsLib = await import('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.mjs',
      import.meta.url
    ).toString();

    const buffer = await file.arrayBuffer();
    const loadingTask = pdfjsLib.getDocument({ data: buffer });
    const pdf = await loadingTask.promise;

    const items: PageItem[] = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 0.4 });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const ctx = canvas.getContext('2d')!;
      await page.render({canvas,canvasContext: ctx, viewport,}).promise;

      items.push({
        id: `${fileId}-${i}`,
        fileId,
        fileName: file.name,
        pageIndex: i - 1,
        thumbnail: canvas.toDataURL('image/png'),
        rotation: 0,
      });
    }
    return items;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files || []);
    if (picked.length === 0) return;
    setError(null);
    setResult(null);
    setLoadingThumbs(true);
    e.target.value = '';

    try {
      const newSourceFiles: SourceFile[] = picked.map((file) => ({
        id: `${file.name}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        file,
      }));

      const newPageBatches = await Promise.all(
        newSourceFiles.map((sf) => renderThumbnails(sf.file, sf.id))
      );

      setSourceFiles((prev) => [...prev, ...newSourceFiles]);
      setPages((prev) => [...prev, ...newPageBatches.flat()]);
    } catch (err: any) {
      setError(err.message || 'Could not read one of the PDF files.');
    } finally {
      setLoadingThumbs(false);
    }
  };

  const removePage = (id: string) => {
    setPages((prev) => prev.filter((p) => p.id !== id));
  };

  const rotatePage = (id: string) => {
    setPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, rotation: (p.rotation + 90) % 360 } : p))
    );
  };

  const movePage = (from: number, to: number) => {
    setPages((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };

  const handleDragStart = (index: number) => {
    dragIndexRef.current = index;
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
    const from = dragIndexRef.current;
    if (from === null || from === index) return;
    movePage(from, index);
    dragIndexRef.current = index;
  };

  const handleDragEnd = () => {
    dragIndexRef.current = null;
    setDragOverIndex(null);
  };

  const handleMerge = async () => {
    if (pages.length === 0) {
      setError('Add at least one PDF with pages to merge.');
      return;
    }
    setProcessing(true);
    setError(null);
    try {
      const sourceDocs = new Map<string, PDFDocument>();
      for (const sf of sourceFiles) {
        const buffer = await sf.file.arrayBuffer();
        sourceDocs.set(sf.id, await PDFDocument.load(buffer));
      }

      const mergedPdf = await PDFDocument.create();
      for (const p of pages) {
        const srcDoc = sourceDocs.get(p.fileId);
        if (!srcDoc) continue;
        const [copiedPage] = await mergedPdf.copyPages(srcDoc, [p.pageIndex]);
        if (p.rotation !== 0) {
          const currentRotation = copiedPage.getRotation().angle;
          copiedPage.setRotation(degrees(currentRotation + p.rotation));
        }
        mergedPdf.addPage(copiedPage);
      }

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes as unknown as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setResult({ url, name: 'merged-document.pdf' });
    } catch (err: any) {
      setError(err.message || 'Something went wrong while merging the PDFs.');
    } finally {
      setProcessing(false);
    }
  };

  const reset = () => {
    setSourceFiles([]);
    setPages([]);
    setResult(null);
    setError(null);
  };

  return (
    <FileToolLayout
      toolId="pdf-merge"
      title="Merge PDF Files"
      description="Combine multiple PDF files into one single document in seconds. 100% free and secure client-side processing."
      icon={<span className="text-6xl">📑</span>}
      howToSteps={[
        { title: 'Upload Files', description: 'Select the PDF files you want to combine.' },
        { title: 'Organize Pages', description: 'Drag pages to reorder, rotate, or delete any page across files.' },
        { title: 'Merge & Download', description: 'Click "Merge Organized Pages" and download your combined PDF.' },
      ]}
      features={[
        { title: '100% Secure', description: 'Files are processed in your browser. No data is sent to any server.', icon: '🔒' },
        { title: 'Page-Level Control', description: 'Reorder, rotate, or drop individual pages before merging.', icon: '🔀' },
        { title: 'Fast Processing', description: 'Merge dozens of files in seconds with zero lag.', icon: '⚡' },
        { title: 'Free Forever', description: 'No hidden fees, subscriptions, or watermarks.', icon: '🎁' },
      ]}
      faq={[
        { question: 'Is it safe to merge sensitive documents?', answer: 'Yes! We use client-side processing, meaning your files never leave your computer. They are processed entirely within your browser memory.' },
        { question: 'Can I reorder pages, not just files?', answer: 'Yes — every page from every uploaded PDF appears individually, and you can drag any page anywhere in the final order.' },
        { question: 'Can I remove or rotate specific pages?', answer: 'Yes, each page thumbnail has its own rotate and delete controls.' },
      ]}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {!result && pages.length === 0 && (
          <label className="flex flex-col items-center justify-center gap-1 rounded-xl p-10 cursor-pointer border-2 border-dashed border-gray-700 bg-gray-900/50 hover:border-indigo-500 hover:bg-gray-900/80 transition-colors duration-200">
            <span className="text-base font-semibold text-gray-100">
              Add PDF files to merge
            </span>
            <span className="text-sm text-gray-500">Click to browse — you can add more than one</span>
            <input
              type="file"
              accept=".pdf"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        )}

        {loadingThumbs && (
          <p className="text-sm text-gray-400 text-center">Loading page previews…</p>
        )}

        {!result && pages.length > 0 && (
          <>
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <p className="text-lg font-semibold text-gray-100">
                  Pages: {pages.length}
                </p>
                <p className="text-sm text-gray-500">Drag pages to reorder across PDFs</p>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={reset} className="text-sm text-gray-400 hover:text-gray-200">
                  ← Back
                </button>
                <label className="text-sm text-indigo-400 hover:text-indigo-300 cursor-pointer">
                  + Add more files
                  <input
                    type="file"
                    accept=".pdf"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
                <button
                  onClick={handleMerge}
                  disabled={processing}
                  className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white transition-colors disabled:opacity-40"
                >
                  {processing ? 'Merging…' : 'Merge Organized Pages'}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {pages.map((page, index) => (
                <div
                  key={page.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`rounded-lg border bg-gray-900/60 overflow-hidden cursor-grab transition-opacity ${
                    dragOverIndex === index ? 'border-indigo-500' : 'border-gray-800'
                  }`}
                >
                  <div className="relative bg-white flex items-center justify-center h-48 overflow-hidden">
                    <img
                      src={page.thumbnail}
                      alt={`Page ${index + 1}`}
                      style={{ transform: `rotate(${page.rotation}deg)` }}
                      className="max-h-full max-w-full transition-transform duration-200"
                    />
                    <span className="absolute top-1.5 right-1.5 bg-gray-900/80 text-gray-200 text-[10px] px-1.5 py-0.5 rounded truncate max-w-[70%]">
                      {page.fileName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm font-medium text-indigo-400">{index + 1}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => rotatePage(page.id)}
                        className="text-gray-500 hover:text-gray-200"
                        title="Rotate"
                      >
                        ↻
                      </button>
                      <button
                        onClick={() => removePage(page.id)}
                        className="text-gray-500 hover:text-red-400"
                        title="Delete page"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {result && (
          <div className="text-center space-y-4 border border-gray-700 rounded-lg p-6 bg-gray-900/60">
            <p className="text-lg font-medium text-gray-100">Your PDFs have been merged!</p>
            <a
              href={result.url}
              download={result.name}
              className="inline-block bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-500 transition-colors"
            >
              Download {result.name}
            </a>
            <div>
              <button onClick={reset} className="text-sm text-gray-400 hover:underline">
                Merge different files
              </button>
            </div>
          </div>
        )}
      </div>
    </FileToolLayout>
  );
}