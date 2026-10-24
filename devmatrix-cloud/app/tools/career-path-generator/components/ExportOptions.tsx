import React from 'react';
import { Download, Share2 } from 'lucide-react';
import { jsPDF } from 'jspdf';
import { CareerPathSchema } from '../../../../lib/ai-schemas';
import { z } from 'zod';

type CareerPathData = z.infer<typeof CareerPathSchema>;

interface ExportOptionsProps {
  data: CareerPathData;
}

export function ExportOptions({ data }: ExportOptionsProps) {
  const handleDownloadPDF = async () => {
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text("Career Path Roadmap", 10, 10);

      doc.setFontSize(12);
      let y = 30;

      data.learningRoadmap.weeks.forEach((week) => {
          if (y > 270) {
              doc.addPage();
              y = 10;
          }
          doc.setFont("helvetica", "bold");
          doc.text(`Week ${week.weekNumber}: ${week.theme}`, 10, y);
          y += 7;

          doc.setFont("helvetica", "normal");
          week.objectives.forEach((obj) => {
            if (y > 280) {
                doc.addPage();
                y = 10;
            }
            doc.text(`- ${obj}`, 15, y);
            y += 7;
          });
          y += 5;
      });

      doc.save("career-path.pdf");
  };

  return (
    <div className="flex gap-3">
      <button
        onClick={handleDownloadPDF}
        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition-colors border border-gray-200 dark:border-gray-700"
      >
        <Download className="w-4 h-4" />
        Export PDF
      </button>
      <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition-colors border border-gray-200 dark:border-gray-700">
        <Share2 className="w-4 h-4" />
        Share
      </button>
    </div>
  );
}
