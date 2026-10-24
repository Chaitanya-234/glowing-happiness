'use client';

import Icon from '@/components/Icon';
import { useState } from 'react';
import AutoCropDetector from './AutoCropDetector';
import CropEditor from './CropEditor';
import ExportOptions from './ExportOptions';
import ManualCropControls from './ManualCropControls';
import PDFUploader from './PDFUploader';

export default function PDFCropClient() {
  const [file, setFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [crops, setCrops] = useState<Record<number, { x: number; y: number; width: number; height: number }>>({});
  const [autoCropError, setAutoCropError] = useState<string | null>(null);

  const onFileLoad = async (loadedFile: File) => {
    setFile(loadedFile);
    try {
      const pdfjsLib = await import('pdfjs-dist');
      if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      }

      const arrayBuffer = await loadedFile.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      setNumPages(pdf.numPages);
      setCurrentPage(1);
      setCrops({});
    } catch (e) {
      console.error("Failed to load PDF:", e);
      alert("Failed to load PDF. Please try a valid file.");
      setFile(null);
    }
  };

  const handleCropChange = (newCrop: { x: number; y: number; width: number; height: number }) => {
    setCrops(prev => ({
      ...prev,
      [currentPage]: newCrop
    }));
  };

  const handleCropFound = (newCrop: { x: number; y: number; width: number; height: number }) => {
    setCrops(prev => ({
      ...prev,
      [currentPage]: newCrop
    }));
  };

  const handleResetCrop = () => {
    const newCrops = { ...crops };
    delete newCrops[currentPage];
    setCrops(newCrops);
  };

  const handleApplyToAll = () => {
    const currentCrop = crops[currentPage];
    if (!currentCrop) return;

    setCrops(prev => {
      const newCrops = { ...prev };
      for (let i = 1; i <= numPages; i++) {
        newCrops[i] = { ...currentCrop };
      }
      return newCrops;
    });
  };

  if (!file) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-4">
            AI PDF Crop Tool
          </h1>
          <p className="text-muted max-w-2xl mx-auto text-lg">
            Intelligently remove margins, white space, and scanner borders from your PDF documents using advanced AI detection.
          </p>
        </div>
        
        <PDFUploader onUpload={onFileLoad} />

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="glass p-6 rounded-2xl">
            <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-4">
              <Icon name="bolt" className="text-[24px]" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">AI Smart Detection</h3>
            <p className="text-muted text-sm">
              Automatically detects content boundaries and removes scanner artifacts and excessive margins.
            </p>
          </div>
          <div className="glass p-6 rounded-2xl">
            <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-4">
              <Icon name="grid_view" className="text-[24px]" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Precise Control</h3>
            <p className="text-muted text-sm">
              Fine-tune crop areas manually with visual handles or precise coordinate inputs.
            </p>
          </div>
          <div className="glass p-6 rounded-2xl">
            <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-4">
              <Icon name="verified_user" className="text-[24px]" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Secure & Free</h3>
            <p className="text-muted text-sm">
              Process locally in your browser (preview) and download instantly. No registration required.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="glass border-b border-border/20 px-4 py-3 flex items-center justify-between z-10 rounded-t-xl">
        <div className="flex items-center gap-3">
           <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-lg">C</div>
           <h1 className="text-lg font-bold text-foreground hidden md:block">PDF Cropper</h1>
        </div>

        <div className="flex items-center gap-4 bg-surface/15 px-4 py-1.5 rounded-full border border-border/20">
            <span className="text-sm font-medium text-foreground truncate max-w-[200px]">{file.name}</span>
            <span className="text-xs text-muted border-l border-border/20 pl-3">{numPages} pages</span>
        </div>

        <button
          onClick={() => setFile(null)}
          className="text-sm text-muted hover:text-rose-400 transition-colors flex items-center gap-1"
        >
          <Icon name="close" className="text-[16px]" />
          <span className="hidden sm:inline">Close</span>
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden mt-4 gap-4">
        {/* Sidebar - Page Selector */}
        <aside className="w-64 glass border border-border/20 rounded-xl flex flex-col overflow-y-auto z-0 hidden md:flex">
           <div className="p-4 border-b border-border/20 sticky top-0 bg-surface/5 backdrop-blur-md z-10 rounded-t-xl">
             <h2 className="font-semibold text-foreground text-sm uppercase tracking-wider">Pages</h2>
           </div>
           <div className="flex-1 p-2 space-y-1">
             {Array.from({ length: numPages }, (_, i) => i + 1).map(pageNum => (
               <button
                 key={pageNum}
                 onClick={() => setCurrentPage(pageNum)}
                 className={`w-full text-left px-3 py-2.5 rounded-lg text-sm flex items-center justify-between transition-all ${
                   currentPage === pageNum
                     ? 'bg-primary/20 text-accent font-semibold shadow-sm'
                     : 'hover:bg-surface/15 text-muted border border-transparent'
                 }`}
               >
                 <span>Page {pageNum}</span>
                 {crops[pageNum] && (
                   <span className="w-2 h-2 rounded-full bg-accent shadow-sm" title="Cropped"></span>
                 )}
               </button>
             ))}
           </div>
        </aside>

        {/* Main Editor Area */}
        <main className="flex-1 flex flex-col min-w-0 relative">
           {/* Mobile Page Controls */}
           <div className="md:hidden glass border border-border/20 rounded-xl p-2 flex items-center justify-between mb-4">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="p-2 hover:bg-surface/15 rounded disabled:opacity-50 text-foreground"
              >
                <Icon name="arrow_back" className="text-[20px]" />
              </button>
              <span className="font-medium text-sm text-foreground">Page {currentPage} of {numPages}</span>
              <button
                onClick={() => setCurrentPage(p => Math.min(numPages, p + 1))}
                disabled={currentPage >= numPages}
                className="p-2 hover:bg-surface/15 rounded disabled:opacity-50 text-foreground"
              >
                <Icon name="arrow_forward" className="text-[20px]" />
              </button>
           </div>

           {/* Editor */}
           <div className="flex-1 relative rounded-xl overflow-hidden border border-border/20">
              <CropEditor
                file={file}
                pageNumber={currentPage}
                cropData={crops[currentPage] || null}
                onCropChange={handleCropChange}
              />

              {/* Floating Error Toast */}
              {autoCropError && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 glass text-rose-400 px-4 py-3 rounded-xl border border-rose-500/30 z-50 flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
                  <Icon name="error" className="text-[20px]" />
                  <span className="text-sm font-medium">{autoCropError}</span>
                  <button onClick={() => setAutoCropError(null)} className="ml-2 hover:bg-surface/20 p-1 rounded">
                    <Icon name="close" className="text-[16px]" />
                  </button>
                </div>
              )}
           </div>
        </main>

        {/* Right Sidebar - Controls & Export */}
        <aside className="w-80 glass border border-border/20 rounded-xl flex flex-col overflow-y-auto p-5 gap-6 z-10">
           <div>
             <h2 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
               <Icon name="tune" className="text-[18px] text-accent" />
               Tools
             </h2>

             <div className="space-y-6">
               <AutoCropDetector
                 file={file}
                 pageNumber={currentPage}
                 onCropFound={handleCropFound}
                 onError={(err) => setAutoCropError(err)}
               />

               <ManualCropControls
                 crop={crops[currentPage] || null}
                 onUpdate={handleCropChange}
                 onReset={handleResetCrop}
                 onApplyToAll={handleApplyToAll}
               />
             </div>
           </div>

           <div className="mt-auto pt-6 border-t border-border/20">
             <ExportOptions file={file} crops={crops} />
           </div>
        </aside>
      </div>
    </div>
  );
}