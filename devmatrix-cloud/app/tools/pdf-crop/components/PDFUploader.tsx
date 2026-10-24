'use client';

import Icon from '@/components/Icon';
import React from 'react';

export default function PDFUploader({ onUpload }: { onUpload: (file: File) => void }) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="glass glass-hover border-2 border-dashed border-border/40 hover:border-accent/60 rounded-3xl p-10 text-center transition-colors cursor-pointer relative overflow-hidden group">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />
      <div className="flex flex-col items-center gap-4 relative z-0">
        <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
          <Icon name="upload_file" className="text-[32px]" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Upload PDF File</h3>
          <p className="text-muted mt-1">Drag & drop or click to browse</p>
        </div>
        <p className="text-xs text-muted/60">Max file size: 50MB</p>
      </div>
    </div>
  );
}