'use client';

import { useState, useRef, useCallback } from 'react';
import { UploadCloud, FileText, AlertCircle, X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface PaperUploaderProps {
  onPaperProcessed: (text: string, file: File) => void;
  isProcessing: boolean;
}

export default function PaperUploader({ onPaperProcessed, isProcessing }: PaperUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const processFile = async (file: File) => {
    setError('');

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
        setError("Only PDF files are supported currently.");
        return;
    }

    try {
        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

        const arrayBuffer = await file.arrayBuffer();
        const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;

        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item: any) => item.str).join(' ');
            fullText += pageText + '\n';
        }

        if (fullText.length < 50) {
            setError("PDF content is too short or could not be extracted.");
        } else {
            onPaperProcessed(fullText, file);
        }
    } catch (err) {
        console.error(err);
        setError("Failed to read PDF file. It might be password protected or corrupted.");
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerUpload = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full space-y-4">
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 transition-all text-center cursor-pointer group ${
          dragActive
            ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10 scale-[1.02]"
            : "border-slate-300 dark:border-slate-700 hover:border-violet-400 dark:hover:border-violet-600 bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={isProcessing ? undefined : triggerUpload}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".pdf"
          onChange={handleChange}
          disabled={isProcessing}
        />

        {isProcessing ? (
           <div className="flex flex-col items-center justify-center space-y-3 py-4">
             <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
             <p className="text-slate-600 dark:text-slate-400 font-medium">Analyzing Paper...</p>
           </div>
        ) : (
            <div className="space-y-4 pointer-events-none">
                <div className="flex justify-center">
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
                        <UploadCloud className={`w-8 h-8 ${dragActive ? 'text-violet-500' : 'text-slate-400 dark:text-slate-500 group-hover:text-violet-500'}`} />
                    </div>
                </div>
                <div>
                    <p className="font-medium text-slate-900 dark:text-slate-100 text-lg">
                        Click to upload research paper
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                        PDF format only (Max 20MB)
                    </p>
                </div>
            </div>
        )}
      </div>

       {error && (
        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg text-sm border border-amber-200 dark:border-amber-800/50 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
        </div>
      )}
    </div>
  );
}
