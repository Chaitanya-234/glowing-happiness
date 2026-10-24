'use client';

import React, { useState, useCallback } from 'react';
import { Upload, FileText, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CodeUploaderProps {
  code: string;
  setCode: (code: string) => void;
  fileName: string;
  setFileName: (name: string) => void;
}

export default function CodeUploader({ code, setCode, fileName, setFileName }: CodeUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    const file = e.dataTransfer.files[0];
    if (file) {
      if (file.size > 1024 * 1024 * 10) { // 10MB
        setError('File size too large (max 10MB)');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
            setCode(event.target.result as string);
            setFileName(file.name);
        }
      };
      reader.onerror = () => setError('Failed to read file');
      reader.readAsText(file);
    }
  }, [setCode, setFileName]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (file) {
        if (file.size > 1024 * 1024 * 10) {
            setError('File size too large (max 10MB)');
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target?.result) {
                setCode(event.target.result as string);
                setFileName(file.name);
            }
        };
        reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileSelect}
          accept=".js,.jsx,.ts,.tsx,.vue,.html,.svelte"
        />

        <div className="flex flex-col items-center justify-center text-center">
          <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
            <Upload className="w-8 h-8 text-slate-500 dark:text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
            Upload your code file
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6">
            Drag and drop your file here, or click to browse. Supported formats: JSX, TSX, Vue, HTML, Svelte.
          </p>
          <label
            htmlFor="file-upload"
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors cursor-pointer shadow-sm hover:shadow-md"
          >
            Browse Files
          </label>
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400 rounded-lg border border-red-100 dark:border-red-900/50"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
            <label htmlFor="code-input" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Or paste code directly
            </label>
            {fileName && (
                <span className="flex items-center gap-1 text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                    <FileText className="w-3 h-3" />
                    {fileName}
                </span>
            )}
        </div>
        <textarea
          id="code-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="// Paste your component code here..."
          className="w-full h-64 p-4 font-mono text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
        />
      </div>
    </div>
  );
}
