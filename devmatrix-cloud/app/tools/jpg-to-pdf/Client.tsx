'use client';

import React from 'react';
import { FileToolLayout } from '@/components/tools/FileToolLayout';
import { FileProcessingTool } from '@/components/tools/FileProcessingTool';
import { PDFDocument, PageSizes } from 'pdf-lib';

export default function JpgToPdfClient() {
  const handleConvert = async (files: File[]) => {
    const pdfDoc = await PDFDocument.create();

    for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        let image;

        // Check format
        if (file.type === 'image/jpeg' || file.name.toLowerCase().endsWith('.jpg') || file.name.toLowerCase().endsWith('.jpeg')) {
           image = await pdfDoc.embedJpg(arrayBuffer);
        } else if (file.type === 'image/png' || file.name.toLowerCase().endsWith('.png')) {
           image = await pdfDoc.embedPng(arrayBuffer);
        } else {
           // Skip unsupported for now, or maybe convert?
           // PDF-lib supports jpg and png.
           continue;
        }

        const { width, height } = image.scale(1);

        // We can fit image to A4 or keep original size.
        // Let's create a page matching image size for best quality.
        const page = pdfDoc.addPage([width, height]);
        page.drawImage(image, {
            x: 0,
            y: 0,
            width: width,
            height: height,
        });
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);

    return {
      downloadUrl: url,
      fileName: 'images-combined.pdf',
    };
  };

  return (
    <FileToolLayout
      toolId="jpg-to-pdf"
      title="JPG to PDF Converter"
      description="Convert your images (JPG, PNG) into a single PDF document. Perfect for creating portfolios or scanning documents."
      icon={<span className="text-6xl">📄</span>}
      howToSteps={[
        { title: 'Upload Images', description: 'Select the JPG or PNG images you want to convert.' },
        { title: 'Convert', description: 'We combine them into a single PDF file.' },
        { title: 'Download', description: 'Download your new PDF document.' }
      ]}
      features={[
        { title: 'Multi-Page', description: 'Combine many images into one file.', icon: '📑' },
        { title: 'Original Quality', description: 'Images are embedded without quality loss.', icon: '💎' },
        { title: 'Fast', description: 'Instant conversion.', icon: '⚡' },
        { title: 'Secure', description: 'Your photos stay private.', icon: '🔒' },
      ]}
      faq={[
        { question: 'What image formats are supported?', answer: 'We support JPG and PNG formats.' },
        { question: 'Is there a limit?', answer: 'Browser memory is the only limit. You can usually convert dozens of images at once.' },
      ]}
    >
      <FileProcessingTool
        accept="image/jpeg, image/png"
        multiple={true}
        processingLabel="Convert to PDF"
        downloadLabel="Download PDF"
        onProcess={handleConvert}
      />
    </FileToolLayout>
  );
}
