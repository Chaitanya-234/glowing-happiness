'use client';

import React, { useState } from 'react';
import { FileToolLayout } from '@/components/tools/FileToolLayout';
import { FileProcessingTool } from '@/components/tools/FileProcessingTool';
import { PDFDocument, StandardFonts, rgb, degrees } from 'pdf-lib';

export default function PdfWatermarkClient() {
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');

  const handleWatermark = async (files: File[]) => {
    if (!watermarkText) throw new Error("Please enter watermark text.");

    // Check if JSZip is needed
    let JSZip: any;
    if (files.length > 1) {
       const mod = await import('jszip');
       JSZip = mod.default;
    }

    const processedFiles = [];

    for (const file of files) {
       const buffer = await file.arrayBuffer();
       const pdfDoc = await PDFDocument.load(buffer);
       const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

       const pages = pdfDoc.getPages();
       for (const page of pages) {
         const { width, height } = page.getSize();
         page.drawText(watermarkText, {
            x: width / 2 - (watermarkText.length * 25) / 2, // Approximate centering
            y: height / 2,
            size: 50,
            font: helveticaFont,
            color: rgb(0.95, 0.1, 0.1),
            opacity: 0.3,
            rotate: degrees(45),
         });
       }

       const pdfBytes = await pdfDoc.save();

       processedFiles.push({
         name: file.name,
         data: pdfBytes
       });
    }

    if (processedFiles.length === 1) {
       // Fix for Blob types
       const blob = new Blob([processedFiles[0].data as unknown as BlobPart], { type: 'application/pdf' });
       const url = URL.createObjectURL(blob);
       return {
          downloadUrl: url,
          fileName: `watermarked-${processedFiles[0].name}`
       };
    } else {
       const zip = new JSZip();
       processedFiles.forEach(f => {
          zip.file(`watermarked-${f.name}`, f.data);
       });
       const content = await zip.generateAsync({ type: 'blob' });
       const url = URL.createObjectURL(content);
       return {
          downloadUrl: url,
          fileName: 'watermarked-pdfs.zip'
       };
    }
  };

  return (
    <FileToolLayout
      toolId="pdf-watermark"
      title="Watermark PDF File"
      description="Add a visible text watermark to your PDF documents. Protect your copyright or mark documents as confidential."
      icon={<span className="text-6xl">🖊️</span>}
      howToSteps={[
        { title: 'Upload PDF', description: 'Select the PDF file you want to watermark.' },
        { title: 'Set Text', description: 'Enter the text you want to appear as a watermark.' },
        { title: 'Download', description: 'Download your watermarked PDF file.' }
      ]}
      features={[
        { title: 'Custom Text', description: 'Add any text you want.', icon: '✍️' },
        { title: 'Secure', description: 'Processing happens in your browser.', icon: '🔒' },
        { title: 'Visible Protection', description: 'Deter unauthorized sharing.', icon: '👁️' },
        { title: 'Free', description: 'Watermark unlimited files.', icon: '💸' },
      ]}
      faq={[
        { question: 'Can I use an image?', answer: 'Currently we only support text watermarks, but image support is coming soon!' },
        { question: 'Is the original file modified?', answer: 'No, we create a copy of your file with the watermark added.' },
      ]}
    >
      <FileProcessingTool
        accept=".pdf"
        multiple={true}
        processingLabel="Add Watermark"
        downloadLabel="Download PDF"
        onProcess={handleWatermark}
        settingsComponent={
           <div className="flex flex-col gap-2">
              <label className="text-purple-200">Watermark Text:</label>
              <input
                type="text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                placeholder="e.g. CONFIDENTIAL"
                className="bg-black/40 border border-purple-500/30 rounded px-3 py-2 text-purple-100 outline-none focus:border-purple-400 w-full"
              />
           </div>
        }
      />
    </FileToolLayout>
  );
}
