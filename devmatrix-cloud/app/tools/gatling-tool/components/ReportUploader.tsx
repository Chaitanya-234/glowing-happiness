'use client';

import React, { useCallback, useState } from 'react';
import { UploadCloud, FileJson, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ReportUploaderProps {
  onUpload: (data: any) => void;
}

export default function ReportUploader({ onUpload }: ReportUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    setError(null);
    setSuccess(false);

    if (!file.name.endsWith('.json')) {
      setError('Please upload a valid Gatling stats.json or global_stats.json file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        // Basic validation to check if it looks like a Gatling stats file
        if (!json.contents && !json.stats) {
             // Try to be flexible, maybe it's the raw stats.json
             if(json.name && json.numberOfRequests) {
                 // seems valid
             } else {
                 throw new Error("Invalid structure");
             }
        }

        setSuccess(true);
        onUpload(json);
      } catch (err) {
        setError('Failed to parse JSON. Please ensure the file is not corrupted.');
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer ${
          isDragging
            ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20 scale-[1.02]'
            : 'border-slate-300 dark:border-slate-700 hover:border-violet-400 dark:hover:border-violet-500 bg-slate-50 dark:bg-slate-800/50'
        }`}
      >
        <input
          type="file"
          accept=".json"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
             success ? 'bg-green-100 text-green-600' : 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400'
          }`}>
             {success ? <CheckCircle2 className="w-8 h-8" /> : <UploadCloud className="w-8 h-8" />}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {success ? 'Report Uploaded!' : 'Upload Gatling Report'}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Drag and drop your <code>stats.json</code> or <code>global_stats.json</code> file here to analyze performance metrics.
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-lg flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
}
