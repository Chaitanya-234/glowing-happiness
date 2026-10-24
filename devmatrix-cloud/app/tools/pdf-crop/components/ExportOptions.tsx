'use client';

import Icon from '@/components/Icon';
import { saveAs } from 'file-saver';
import { PDFDocument } from 'pdf-lib';
import { useState } from 'react';

interface ExportOptionsProps {
  file: File | null;
  crops: Record<number, { x: number, y: number, width: number, height: number }>;
}

export default function ExportOptions({ file, crops }: ExportOptionsProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDownload = async () => {
    if (!file) return;

    setIsProcessing(true);
    try {
      const fileBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileBuffer);
      const pages = pdfDoc.getPages();

      pages.forEach((page, index) => {
        const crop = crops[index];
        if (crop) {
          const { height } = page.getSize();
          const x = crop.x;
          const y = height - crop.y - crop.height;
          page.setCropBox(x, y, crop.width, crop.height);
          page.setMediaBox(x, y, crop.width, crop.height);
        }
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
      saveAs(blob, `cropped-${file.name}`);
    } catch (error) {
      console.error("Export error:", error);
      alert("Failed to export PDF.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-surface/10 p-6 rounded-xl border border-border/20">
       <h3 className="text-lg font-semibold mb-4 text-foreground">Export</h3>
       <div className="space-y-4">
         <div className="flex items-center justify-between text-sm text-muted">
           <span>Cropped Pages:</span>
           <span className="font-medium text-foreground">{Object.keys(crops).length}</span>
         </div>

         <button
           onClick={handleDownload}
           disabled={isProcessing || !file}
           className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
         >
           {isProcessing ? (
             <>
               <Icon name="sync" className="text-[20px] animate-spin" />
               Processing...
             </>
           ) : (
             <>
               <Icon name="download" className="text-[20px]" />
               Download Cropped PDF
             </>
           )}
         </button>
       </div>
    </div>
  );
}