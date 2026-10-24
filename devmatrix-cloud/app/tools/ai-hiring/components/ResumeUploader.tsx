'use client';

import React, { useState, useRef } from 'react';
import { parseResume } from '../actions';

interface ResumeUploaderProps {
  onUploadComplete: (parsedResumes: any[]) => void;
}

export default function ResumeUploader({ onUploadComplete }: ResumeUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<{ processed: number; total: number }>({ processed: 0, total: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = async (selectedFiles: File[]) => {
    const validFiles = selectedFiles.filter(file => file.type === 'application/pdf' || file.type === 'text/plain');

    if (validFiles.length === 0) {
      alert('Please upload PDF or TXT files only.');
      return;
    }

    setFiles(validFiles);
    setUploading(true);
    setProgress({ processed: 0, total: validFiles.length });

    const parsedResumes: any[] = [];

    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      try {
        let text = '';
        if (file.type === 'application/pdf') {
          text = await extractTextFromPDF(file);
        } else {
          text = await file.text();
        }

        const result = await parseResume(text);
        if (result.success && result.data) {
          parsedResumes.push({ ...result.data, fileName: file.name, id: `cand_${Date.now()}_${i}` });
        } else {
          console.error(`Failed to parse ${file.name}:`, result.error);
        }
      } catch (error) {
        console.error(`Error processing ${file.name}:`, error);
      }
      setProgress(prev => ({ ...prev, processed: i + 1 }));
    }

    setUploading(false);
    onUploadComplete(parsedResumes);
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();

    try {
      const pdfjsLib = await import('pdfjs-dist');
      if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      }

      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        fullText += pageText + '\n';
      }

      return fullText;
    } catch (error) {
      console.error('PDF extraction error:', error);
      throw new Error('Failed to extract text from PDF');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <span className="w-8 h-8 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-lg flex items-center justify-center text-sm">2</span>
        Upload Resumes
      </h2>

      <p className="text-slate-600 dark:text-slate-400 mb-4 text-sm">
        Drag & drop PDF resumes here. Our AI will automatically parse and analyze them.
      </p>

      <div
        className={`border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer relative ${
          isDragging
            ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20'
            : 'border-slate-300 dark:border-slate-700 hover:border-violet-400 hover:bg-slate-50 dark:hover:bg-slate-800'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          accept=".pdf,.txt"
          onChange={handleFileSelect}
        />

        <div className="flex flex-col items-center gap-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
            uploading ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
          }`}>
            {uploading ? (
              <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            )}
          </div>

          <div>
            {uploading ? (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Analyzing Resumes...</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  Processed {progress.processed} of {progress.total}
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Click or Drag & Drop</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Support for PDF and TXT files</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {uploading && (
        <div className="mt-6">
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-violet-600 h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${(progress.processed / progress.total) * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}
