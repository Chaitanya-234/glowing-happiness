'use client';

import React, { useState } from 'react';
import { FileToolLayout } from '@/components/tools/FileToolLayout';
import { FileProcessingTool } from '@/components/tools/FileProcessingTool';
import JSZip from 'jszip';

export default function ImageConverterClient() {
  const [targetFormat, setTargetFormat] = useState('png');

  const handleConvert = async (files: File[]) => {
    const convertedFiles = [];

    for (const file of files) {
       // Convert logic using Canvas
       const bitmap = await createImageBitmap(file);
       const canvas = document.createElement('canvas');
       canvas.width = bitmap.width;
       canvas.height = bitmap.height;
       const ctx = canvas.getContext('2d');
       if (ctx) {
         ctx.drawImage(bitmap, 0, 0);
         const blob = await new Promise<Blob | null>(resolve =>
            canvas.toBlob(resolve, `image/${targetFormat}`, 0.9)
         );

         if (blob) {
            const newName = file.name.substring(0, file.name.lastIndexOf('.')) + '.' + targetFormat;
            convertedFiles.push({ name: newName, blob });
         }
       }
    }

    if (convertedFiles.length === 1) {
       const url = URL.createObjectURL(convertedFiles[0].blob);
       return {
         downloadUrl: url,
         fileName: convertedFiles[0].name,
       };
    } else {
       const zip = new JSZip();
       convertedFiles.forEach(f => {
         zip.file(f.name, f.blob);
       });
       const content = await zip.generateAsync({ type: 'blob' });
       const url = URL.createObjectURL(content);
       return {
          downloadUrl: url,
          fileName: `converted-to-${targetFormat}.zip`
       };
    }
  };

  return (
    <FileToolLayout
      toolId="image-converter"
      title="Image Converter"
      description="Convert images between JPG, PNG, and WEBP formats instantly in your browser."
      icon={<span className="text-6xl">🔄</span>}
      howToSteps={[
        { title: 'Upload Images', description: 'Select the images you want to convert.' },
        { title: 'Choose Format', description: 'Select the output format (JPG, PNG, WEBP).' },
        { title: 'Download', description: 'Download your converted images.' }
      ]}
      features={[
        { title: 'All Formats', description: 'Convert to/from JPG, PNG, WEBP.', icon: '🎨' },
        { title: 'High Quality', description: 'Maintains original resolution.', icon: '💎' },
        { title: 'Batch Mode', description: 'Convert multiple images at once.', icon: '📚' },
        { title: 'Secure', description: 'No upload to server required.', icon: '🔒' },
      ]}
      faq={[
        { question: 'Does it support transparency?', answer: 'Yes, if you convert to PNG or WEBP, transparency is preserved. JPG does not support transparency.' },
        { question: 'Is it free?', answer: 'Yes, completely free.' },
      ]}
    >
      <FileProcessingTool
        accept="image/*"
        multiple={true}
        processingLabel={`Convert to ${targetFormat.toUpperCase()}`}
        downloadLabel="Download Converted Images"
        onProcess={handleConvert}
        settingsComponent={
           <div className="flex items-center gap-4">
              <label className="text-purple-200">Convert to:</label>
              <select
                value={targetFormat}
                onChange={(e) => setTargetFormat(e.target.value)}
                className="bg-black/40 border border-purple-500/30 rounded px-3 py-1 text-purple-100 outline-none focus:border-purple-400"
              >
                 <option value="png">PNG</option>
                 <option value="jpeg">JPG</option>
                 <option value="webp">WEBP</option>
              </select>
           </div>
        }
      />
    </FileToolLayout>
  );
}
