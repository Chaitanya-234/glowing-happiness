'use client';

import Icon from '@/components/Icon';
import { useState } from 'react';
import { analyzePDFPage } from '../actions';

interface AutoCropDetectorProps {
  file: File | null;
  pageNumber: number;
  onCropFound: (crop: { x: number; y: number; width: number; height: number }) => void;
  onError: (error: string) => void;
}

export default function AutoCropDetector({ file, pageNumber, onCropFound, onError }: AutoCropDetectorProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAutoCrop = async () => {
    if (!file) return;
    setIsAnalyzing(true);
    onError("");

    try {
      const pdfjsLib = await import('pdfjs-dist');
      if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
      }

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
      const page = await pdf.getPage(pageNumber);

      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = document.createElement('canvas');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const context = canvas.getContext('2d');

      if (!context) throw new Error("Could not create canvas context");

      const renderContext: any = {
        canvasContext: context,
        viewport: viewport
      };

      await page.render(renderContext).promise;

      const base64Image = canvas.toDataURL('image/png');
      const viewportPoints = page.getViewport({ scale: 1.0 });

      const result = await analyzePDFPage(base64Image, pageNumber, viewportPoints.width, viewportPoints.height);

      if (result.success && result.data) {
        const suggestion = result.data.cropSuggestions[0]?.suggestedCrop;
        if (suggestion) {
           const newCrop = {
             x: suggestion.left,
             y: suggestion.top,
             width: viewportPoints.width - suggestion.left - suggestion.right,
             height: viewportPoints.height - suggestion.top - suggestion.bottom
           };
           onCropFound(newCrop);
        } else {
            onError("No crop suggestion found.");
        }
      } else {
        onError(result.error || "Failed to auto-detect crop");
      }

    } catch (err: any) {
      console.error("Auto crop error:", err);
      onError(err.message || "Failed to analyze page");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-surface/10 p-4 rounded-xl border border-border/20">
      <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
        <Icon name="auto_awesome" className="text-[20px] text-accent" />
        AI Smart Crop
      </h3>
      <p className="text-xs text-muted mb-4">
        Automatically detect content boundaries and remove margins.
      </p>

      <button
        onClick={handleAutoCrop}
        disabled={isAnalyzing || !file}
        className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 text-sm ${
          isAnalyzing
            ? 'bg-accent/20 text-accent cursor-wait'
            : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
        }`}
      >
        {isAnalyzing ? (
          <>
            <Icon name="sync" className="text-[16px] animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Icon name="bolt" className="text-[16px]" />
            Auto-Detect Crop
          </>
        )}
      </button>
    </div>
  );
}