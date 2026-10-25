'use client';

import Icon from '@/components/Icon';
import { saveAs } from 'file-saver';
import { AnimatePresence, motion } from 'framer-motion';
import { degrees, PDFDocument } from 'pdf-lib';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import React, { useEffect, useRef, useState } from 'react';

// DND Kit Imports
import {
    closestCenter,
    DndContext,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import {
    arrayMove,
    rectSortingStrategy,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// --- Types ---
interface PageItem {
  id: string; // Unique ID for DND (original index + random string)
  originalIndex: number; // 0-based index from original PDF
  rotation: number; // 0, 90, 180, 270
}

// --- Sortable Thumbnail Component ---
function SortablePage({ 
  page, 
  pdfDoc, 
  onRotate, 
  onDelete 
}: { 
  page: PageItem; 
  pdfDoc: PDFDocumentProxy | null;
  onRotate: (id: string) => void;
  onDelete: (id: string) => void;
}) {
   const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: page.id });
  
  // 1. Add the containerRef here
  const containerRef = useRef<HTMLDivElement>(null);
  const [isRendering, setIsRendering] = useState(true);
  

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.5 : 1,
  };

        useEffect(() => {
    const container = containerRef.current;
    if (!pdfDoc || !container) return;
    
    let isMounted = true;
    let renderTask: any = null;
    let currentCanvas: HTMLCanvasElement | null = null;

    const renderPage = async () => {
      try {
        setIsRendering(true);
        const pdfPage = await pdfDoc.getPage(page.originalIndex + 1);
        const viewport = pdfPage.getViewport({ scale: 0.5 });
        
        // Create a BRAND NEW canvas element to bypass React Strict Mode DOM reuse
        currentCanvas = document.createElement('canvas');
        currentCanvas.className = "max-h-[200px] w-auto max-w-full object-contain pointer-events-none";
        currentCanvas.width = viewport.width;
        currentCanvas.height = viewport.height;
        
        const context = currentCanvas.getContext('2d');
        if (!context) return;

        // Render to the detached canvas
        renderTask = pdfPage.render({ 
          canvasContext: context, 
          viewport,
          canvas: currentCanvas 
        });
        
        await renderTask.promise;

        // Once rendered, inject it into the DOM
        if (isMounted) {
          container.innerHTML = ''; // Clear old canvas
          container.appendChild(currentCanvas);
        }
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') {
          console.error('Error rendering thumbnail:', err);
        }
      } finally {
        if (isMounted) setIsRendering(false);
      }
    };

    renderPage();

    return () => {
      isMounted = false;
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [pdfDoc, page.originalIndex]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
        isDragging ? 'border-accent bg-accent/10 shadow-2xl' : 'border-border/20 bg-surface/10 hover:border-border/40'
      }`}
    >
      {/* Drag Handle (Covers the thumbnail area) */}
      <div 
        {...attributes} 
        {...listeners} 
        className="cursor-grab active:cursor-grabbing w-full flex justify-center py-2 relative"
      >
         <div 
          className="relative overflow-hidden rounded-md shadow-sm border border-border/20 bg-white"
          style={{ transform: `rotate(${page.rotation}deg)`, transition: 'transform 0.2s ease' }}
        >
          {isRendering && (
            <div className="absolute inset-0 flex items-center justify-center bg-surface/50 z-10">
              <Icon name="sync" className="animate-spin text-accent" />
            </div>
          )}
          {/* 2. Replace <canvas> with this div */}
          <div ref={containerRef} className="flex items-center justify-center" />
        </div>
      </div>

      {/* Page Number */}
      <span className="text-xs font-semibold text-muted mt-1">
        Page {page.originalIndex + 1}
      </span>

      {/* Action Buttons */}
      <div className="flex gap-1 w-full mt-1">
        <button
          onClick={() => onRotate(page.id)}
          className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-medium bg-surface/20 hover:bg-surface/30 text-foreground rounded-md transition-colors"
          title="Rotate 90 degrees"
        >
          <Icon name="rotate_right" className="text-[14px]" />
        </button>
        <button
          onClick={() => onDelete(page.id)}
          className="flex-1 flex items-center justify-center gap-1 py-1.5 text-xs font-medium bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-md transition-colors"
          title="Delete page"
        >
          <Icon name="delete" className="text-[14px]" />
        </button>
      </div>
    </div>
  );
}

// --- Main Client Component ---
export default function PDFPageSorterClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pdfDoc, setPdfDoc] = useState<PDFDocumentProxy | null>(null);
  const [pages, setPages] = useState<PageItem[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // DND Sensors (pointer for mouse/touch, keyboard for accessibility)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;
    
    setFile(uploadedFile);
    setIsLoading(true);

    try {
      const pdfjsLib = await import('pdfjs-dist');
      if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      }

      const arrayBuffer = await uploadedFile.arrayBuffer();
      const doc = await pdfjsLib.getDocument(arrayBuffer).promise;
      setPdfDoc(doc);

      // Initialize page state
      const initialPages: PageItem[] = Array.from({ length: doc.numPages }, (_, i) => ({
        id: `page-${i}-${Math.random().toString(36).substring(7)}`,
        originalIndex: i,
        rotation: 0,
      }));
      setPages(initialPages);
    } catch (err) {
      console.error(err);
      alert('Failed to load PDF. Please try a valid file.');
      setFile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setPages((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleRotate = (id: string) => {
    setPages((prev) =>
      prev.map((p) => (p.id === id ? { ...p, rotation: (p.rotation + 90) % 360 } : p))
    );
  };

  const handleDelete = (id: string) => {
    setPages((prev) => prev.filter((p) => p.id !== id));
  };

  const handleExport = async () => {
    if (!file || pages.length === 0) return;
    setIsExporting(true);

    try {
      // 1. Load original PDF with pdf-lib
      const originalBytes = await file.arrayBuffer();
      const originalDoc = await PDFDocument.load(originalBytes);
      
      // 2. Create a new document
      const newDoc = await PDFDocument.create();

      // 3. Copy pages in the new order
      for (const pageItem of pages) {
        const [copiedPage] = await newDoc.copyPages(originalDoc, [pageItem.originalIndex]);
        
        // Apply rotation
        copiedPage.setRotation(degrees(pageItem.rotation));
        
        newDoc.addPage(copiedPage);
      }

      // 4. Save and download
      const newBytes = await newDoc.save();
      const blob = new Blob([newBytes as any], { type: 'application/pdf' });
      
      const originalName = file.name.replace('.pdf', '');
      saveAs(blob, `${originalName}-organized.pdf`);
      
    } catch (error) {
      console.error('Export error:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  if (!file) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-4 md:text-5xl">
            PDF Page Sorter
          </h1>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            Easily rearrange, rotate, and delete pages in your PDF. 
            Drag and drop to build your perfect document.
          </p>
        </div>
        
        <div className="glass glass-hover border-2 border-dashed border-border/40 hover:border-accent/60 rounded-3xl p-10 text-center transition-colors cursor-pointer relative overflow-hidden group">
          <input
            type="file"
            accept=".pdf"
            onChange={handleUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="flex flex-col items-center gap-4 relative z-0">
            <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Icon name="upload_file" className="text-[32px]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {isLoading ? 'Loading PDF...' : 'Select PDF File'}
              </h3>
              <p className="text-muted mt-1">Drag & drop or click to browse</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      {/* Header Bar */}
      <div className="glass rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-24 z-40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 text-primary rounded-xl flex items-center justify-center">
            <Icon name="picture_as_pdf" />
          </div>
          <div>
            <h2 className="font-bold text-foreground truncate max-w-[200px] md:max-w-md">{file.name}</h2>
            <p className="text-xs text-muted">{pages.length} pages remaining</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => setFile(null)}
            className="flex-1 md:flex-none py-2 px-4 rounded-xl text-sm font-medium text-muted hover:text-foreground hover:bg-surface/15 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            disabled={isExporting || pages.length === 0}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 py-2 px-6 rounded-xl text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {isExporting ? (
              <>
                <Icon name="sync" className="animate-spin text-[18px]" />
                Saving...
              </>
            ) : (
              <>
                <Icon name="download" className="text-[18px]" />
                Save PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Grid */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToWindowEdges]}
      >
        <SortableContext items={pages.map((p) => p.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 pb-20">
            <AnimatePresence>
              {pages.map((page) => (
                <motion.div
                  key={page.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <SortablePage
                    page={page}
                    pdfDoc={pdfDoc}
                    onRotate={handleRotate}
                    onDelete={handleDelete}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </SortableContext>
      </DndContext>

      {pages.length === 0 && (
        <div className="text-center py-20">
          <Icon name="delete_sweep" className="text-[48px] text-muted mb-4" />
          <h3 className="text-xl font-bold text-foreground">All pages deleted</h3>
          <p className="text-muted mb-6">You must keep at least one page to save a PDF.</p>
          <button onClick={() => setFile(null)} className="btn-solid px-6 py-2 rounded-xl">
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}