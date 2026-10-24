'use client';

import React, { useState, useEffect } from 'react';
import { FileToolLayout } from '@/components/tools/FileToolLayout';
import { FileProcessingTool } from '@/components/tools/FileProcessingTool';
// pdfjs-dist import must be dynamic to avoid SSR issues with canvas/DOMMatrix
// import * as pdfjsLib from 'pdfjs-dist';

export default function PdfToJpgClient() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);

  if (!isClient) return null; // Avoid SSR issues with pdfjs-dist

  const handleConvert = async (files: File[]) => {
    // Dynamically import pdfjs-dist
    const pdfjsLib = await import('pdfjs-dist');
    if (typeof window !== 'undefined' && 'Worker' in window) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
    }

    // We'll need JSZip to pack images
    const { default: JSZip } = await import('jszip');
    const zip = new JSZip();
    let hasContent = false;

    for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();

        // Load PDF
        // Note: pdfjsLib.getDocument returns a promise that resolves to a PDFDocumentProxy
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const pdf = await loadingTask.promise;
        const totalPages = pdf.numPages;

        for (let i = 1; i <= totalPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 2.0 }); // 2.0 scale for better quality

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            if (context) {
                // @ts-expect-error - pdfjs-dist types are sometimes mismatched for render options
                await page.render({ canvasContext: context, viewport: viewport }).promise;

                // Convert to Blob
                const blob = await new Promise<Blob | null>(resolve =>
                   canvas.toBlob(resolve, 'image/jpeg', 0.9)
                );

                if (blob) {
                   const fileName = `${file.name.replace('.pdf', '')}-page-${i}.jpg`;
                   zip.file(fileName, blob);
                   hasContent = true;
                }
            }
        }
    }

    if (!hasContent) throw new Error("Could not extract images.");

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);

    return {
      downloadUrl: url,
      fileName: 'converted-jpgs.zip',
    };
  };

  return (
    <FileToolLayout
      toolId="pdf-to-jpg"
      title="PDF to JPG Converter"
      description="Convert each page of your PDF document into a high-quality JPG image. Download individual images or a ZIP archive."
      icon={<span className="text-6xl">🖼️</span>}
      howToSteps={[
        { title: 'Upload PDF', description: 'Select the PDF file you want to convert.' },
        { title: 'Process', description: 'We render each page as a high-resolution image.' },
        { title: 'Download', description: 'Download all images in a ZIP file.' }
      ]}
      features={[
        { title: 'High Resolution', description: 'Clear and crisp images.', icon: '👁️' },
        { title: 'All Pages', description: 'Extracts every single page.', icon: '📚' },
        { title: 'Secure', description: 'Rendering happens in your browser.', icon: '🔒' },
        { title: 'Fast', description: 'Instant conversion using WebAssembly.', icon: '⚡' },
      ]}
      faq={[
        { question: 'What is the image quality?', answer: 'We render at 2x scale (approx 150-200 DPI) suitable for most uses.' },
        { question: 'Can I convert to PNG?', answer: 'Currently we output JPG, but you can use our Image Converter tool to switch formats later.' },
      ]}
    >
      <FileProcessingTool
        accept=".pdf"
        multiple={true}
        processingLabel="Convert to JPG"
        downloadLabel="Download Images (ZIP)"
        onProcess={handleConvert}
      />
    </FileToolLayout>
  );
}
