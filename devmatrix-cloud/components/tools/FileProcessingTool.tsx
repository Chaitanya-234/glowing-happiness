'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, FileText, CheckCircle, AlertCircle, Settings } from 'lucide-react';

interface FileProcessingToolProps {
  accept: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  onProcess: (files: File[], settings?: any) => Promise<any>;
  processingLabel?: string;
  downloadLabel?: string;
  settingsComponent?: React.ReactNode;
}

export function FileProcessingTool({
  accept,
  multiple = false,
  maxSize = 10,
  onProcess,
  processingLabel = 'Process Files',
  downloadLabel = 'Download Result',
  settingsComponent,
}: FileProcessingToolProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const validateFiles = (newFiles: File[]) => {
    setError(null);
    const validFiles = newFiles.filter(file => {
      const isSizeValid = file.size / 1024 / 1024 <= maxSize;
      if (!isSizeValid) setError(`File ${file.name} exceeds ${maxSize}MB limit.`);
      // Simple type check if needed, but input accept handles most
      return isSizeValid;
    });
    return validFiles;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const validFiles = validateFiles(droppedFiles);

    if (validFiles.length > 0) {
      if (multiple) {
        setFiles(prev => [...prev, ...validFiles]);
      } else {
        setFiles([validFiles[0]]);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const validFiles = validateFiles(selectedFiles);

      if (validFiles.length > 0) {
        if (multiple) {
          setFiles(prev => [...prev, ...validFiles]);
        } else {
          setFiles([validFiles[0]]);
        }
      }
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setResult(null); // Reset result if files change
  };

  const handleProcess = async () => {
    if (files.length === 0) return;

    setIsProcessing(true);
    setError(null);
    try {
      const res = await onProcess(files);
      setResult(res);
    } catch (err: any) {
      setError(err.message || 'An error occurred during processing.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFiles([]);
    setResult(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            {/* Drop Zone */}
            {files.length === 0 ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
                  border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all
                  ${isDragging
                    ? 'border-purple-400 bg-purple-900/30 scale-[1.02]'
                    : 'border-purple-500/30 hover:border-purple-400/50 hover:bg-purple-900/10'}
                `}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                  accept={accept}
                  multiple={multiple}
                />
                <div className="flex flex-col items-center gap-4">
                  <div className="w-20 h-20 bg-purple-600/20 rounded-full flex items-center justify-center text-purple-300">
                    <Upload size={40} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Drop files here or click to upload
                    </h3>
                    <p className="text-purple-200/50">
                      {multiple ? 'Upload multiple files' : 'Upload a file'} up to {maxSize}MB
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              // File List
              <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-white">Selected Files ({files.length})</h3>
                    <button onClick={handleReset} className="text-sm text-red-400 hover:text-red-300">Clear All</button>
                 </div>

                 <div className="grid grid-cols-1 gap-3 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                   {files.map((file, i) => (
                     <div key={i} className="flex items-center justify-between bg-purple-900/20 p-3 rounded-lg border border-purple-500/10">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <FileText size={20} className="text-purple-400 shrink-0" />
                          <span className="text-sm text-purple-100 truncate max-w-[200px]">{file.name}</span>
                          <span className="text-xs text-purple-200/40">({(file.size / 1024).toFixed(1)} KB)</span>
                        </div>
                        <button onClick={() => removeFile(i)} className="p-1 hover:bg-red-500/20 rounded-full text-purple-200/50 hover:text-red-400 transition-colors">
                          <X size={16} />
                        </button>
                     </div>
                   ))}
                 </div>

                 {settingsComponent && (
                    <div className="mb-6 bg-purple-900/10 p-4 rounded-lg border border-purple-500/10">
                       <div className="flex items-center gap-2 mb-3 text-purple-300 font-medium">
                         <Settings size={18} />
                         <span>Settings</span>
                       </div>
                       {settingsComponent}
                    </div>
                 )}

                 <div className="flex gap-3">
                   <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 py-3 rounded-lg border border-purple-500/30 text-purple-200 hover:bg-purple-900/20 transition-all font-medium"
                    >
                      Add More Files
                   </button>
                   <button
                      onClick={handleProcess}
                      disabled={isProcessing}
                      className="flex-1 py-3 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg shadow-purple-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                   >
                      {isProcessing ? (
                        <>
                          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        processingLabel
                      )}
                   </button>
                 </div>

                 {error && (
                   <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2 text-red-200 text-sm">
                     <AlertCircle size={16} />
                     {error}
                   </div>
                 )}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 mx-auto mb-6">
              <CheckCircle size={48} />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Success!</h2>
            <p className="text-purple-200/60 mb-8 max-w-lg mx-auto">
              Your files have been processed successfully. Click the button below to download your result.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {/* Result handling is usually a download or a blob display */}
                {/* For flexibility, we assume onProcess might return a URL or Blob, or we handle download inside onProcess,
                    but usually it's better to let the user trigger the download here to avoid popup blockers.
                    Wait, if onProcess handles download, we just show "Done".
                    But usually we want a download button.
                    Let's assume result contains { downloadUrl, fileName } or we pass a callback.
                */}

                {result.downloadUrl && (
                  <a
                    href={result.downloadUrl}
                    download={result.fileName || 'download'}
                    className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg shadow-lg shadow-green-600/20 transition-all flex items-center justify-center gap-2"
                  >
                    <Upload size={20} className="rotate-180" /> {/* Download icon */}
                    {downloadLabel}
                  </a>
                )}

                <button
                  onClick={handleReset}
                  className="px-8 py-3 border border-purple-500/30 text-purple-200 hover:bg-purple-900/20 rounded-lg transition-all font-medium"
                >
                  Process More Files
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
