'use client';

import { useState, useRef, useCallback } from 'react';
import { UploadCloud, FileText, AlertCircle, X, CheckCircle, File as FileIcon } from 'lucide-react';

interface FileUploaderProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

export default function FileUploader({ onAnalyze, isLoading }: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
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
    setIsProcessing(true);
    setError('');

    // Simple file type validation
    const allowedTypes = ['text/plain', 'text/markdown', 'application/json', 'text/csv', 'application/pdf'];
    const allowedExtensions = ['.txt', '.md', '.json', '.csv', '.pdf'];

    const isAllowed = allowedTypes.includes(file.type) || allowedExtensions.some(ext => file.name.endsWith(ext));

    if (!isAllowed) {
        if (file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
             setError("Word documents are not yet supported directly. Please copy and paste text.");
        } else {
             setError("Unsupported file type. Please upload a .txt, .md, or .pdf file.");
        }
        setIsProcessing(false);
        return;
    }

    try {
        if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
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
                setError("PDF content is too short (minimum 50 characters).");
                setFile(null);
            } else {
                setFile(file);
                onAnalyze(fullText);
            }
        } else {
            const text = await file.text();
            if (text.length < 50) {
                setError("File content is too short (minimum 50 characters).");
                setFile(null);
            } else {
                setFile(file);
                onAnalyze(text);
            }
        }
    } catch (err) {
        console.error(err);
        setError("Failed to read file. Please ensure it is a valid text or PDF file.");
        setFile(null);
    } finally {
        setIsProcessing(false);
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

  const removeFile = () => {
      setFile(null);
      setError('');
      if (inputRef.current) inputRef.current.value = '';
  };

  const triggerUpload = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 py-8">
       <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 mb-2">
            <UploadCloud className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Upload Document</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
            Supported formats: .txt, .md (PDF & DOCX coming soon)
        </p>
      </div>

      <div
        className={`relative border-2 border-dashed rounded-xl p-12 transition-all text-center cursor-pointer group ${
          dragActive
            ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10 scale-[1.02]"
            : "border-slate-300 dark:border-slate-700 hover:border-violet-400 dark:hover:border-violet-600 bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={file ? undefined : triggerUpload}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept=".txt,.md,.json,.csv"
          onChange={handleChange}
          disabled={isLoading || isProcessing}
        />

        {file ? (
            <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 max-w-md mx-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-lg shrink-0">
                        <FileText className="w-5 h-5" />
                    </div>
                    <div className="text-left overflow-hidden">
                        <p className="font-medium text-slate-900 dark:text-slate-100 truncate">{file.name}</p>
                        <p className="text-xs text-slate-500">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                </div>
                <button
                    onClick={removeFile}
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-500 hover:text-red-500 transition-colors shrink-0"
                    title="Remove file"
                >
                    <X className="w-5 h-5" />
                </button>
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
                        Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-slate-500 mt-1">
                        Maximum file size 10MB
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
