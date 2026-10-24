'use client';

import React from 'react';
import { FileToolLayout } from '@/components/tools/FileToolLayout';
import { FileProcessingTool } from '@/components/tools/FileProcessingTool';
import imageCompression from 'browser-image-compression';
import JSZip from 'jszip';

export default function ImageCompressorClient() {
  const handleCompress = async (files: File[]) => {
    const compressedFiles = [];

    // Options for compression
    const options = {
      maxSizeMB: 1, // Target 1MB
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    for (const file of files) {
      try {
        const compressedFile = await imageCompression(file, options);
        compressedFiles.push({ original: file, compressed: compressedFile });
      } catch (error) {
        console.error("Compression failed for", file.name, error);
      }
    }

    if (compressedFiles.length === 1) {
       const url = URL.createObjectURL(compressedFiles[0].compressed);
       return {
         downloadUrl: url,
         fileName: `compressed-${compressedFiles[0].original.name}`,
       };
    } else {
       const zip = new JSZip();
       compressedFiles.forEach(f => {
         zip.file(`compressed-${f.original.name}`, f.compressed);
       });

       const content = await zip.generateAsync({ type: 'blob' });
       const url = URL.createObjectURL(content);
       return {
          downloadUrl: url,
          fileName: 'compressed-images.zip'
       };
    }
  };

  return (
    <FileToolLayout
      toolId="image-compressor"
      title="Compress Images"
      description="Compress JPG, PNG, and WEBP images while maintaining the best quality. Reduce file size for web usage."
      icon={<span className="text-6xl">📉</span>}
      howToSteps={[
        { title: 'Upload Images', description: 'Select up to 20 images you want to compress.' },
        { title: 'Wait for Compression', description: 'Our smart algorithm reduces file size while keeping quality high.' },
        { title: 'Download', description: 'Download your optimized images individually or as a ZIP.' }
      ]}
      features={[
        { title: 'Smart Compression', description: 'Best balance between quality and file size.', icon: '🧠' },
        { title: 'Bulk Processing', description: 'Compress multiple images at once.', icon: '📦' },
        { title: 'Privacy First', description: 'Images never leave your browser.', icon: '🛡️' },
        { title: 'All Formats', description: 'Supports JPG, PNG, WEBP.', icon: '🖼️' },
      ]}
      faq={[
        { question: 'How much space can I save?', answer: 'Typically 50-80% depending on the original image quality.' },
        { question: 'Does it reduce quality?', answer: 'We use smart lossy compression that removes invisible data. The visual difference is usually negligible.' },
      ]}
    >
      <FileProcessingTool
        accept="image/*"
        multiple={true}
        processingLabel="Compress Images"
        downloadLabel="Download Compressed Images"
        onProcess={handleCompress}
      />
    </FileToolLayout>
  );
}
