'use client';

import React from 'react';
import { Download, FileText, FileJson, Copy, Share2 } from 'lucide-react';
import { saveAs } from 'file-saver';
import { toast } from 'sonner';

interface ExportOptionsProps {
  analysisResult: any;
}

export function ExportOptions({ analysisResult }: ExportOptionsProps) {
  const downloadJson = () => {
    const blob = new Blob([JSON.stringify(analysisResult, null, 2)], { type: 'application/json' });
    saveAs(blob, `lighthouse-analysis-${new Date().toISOString().split('T')[0]}.json`);
    toast.success('Analysis exported as JSON');
  };

  const downloadMarkdown = () => {
    let md = `# Lighthouse Analysis Report\nDate: ${analysisResult.reportSummary.analysisDate}\n\n`;

    md += `## Overall Score: ${analysisResult.reportSummary.overallHealthScore}/100\n`;
    md += `- Performance: ${analysisResult.reportSummary.scores.performance}\n`;
    md += `- Accessibility: ${analysisResult.reportSummary.scores.accessibility}\n`;
    md += `- Best Practices: ${analysisResult.reportSummary.scores.bestPractices}\n`;
    md += `- SEO: ${analysisResult.reportSummary.scores.seo}\n\n`;

    md += `## Top Priority Recommendations\n\n`;
    analysisResult.prioritizedRecommendations.forEach((rec: any) => {
      md += `### ${rec.title} (Priority: ${rec.priority})\n`;
      md += `**Severity:** ${rec.severity} | **Impact:** ${rec.businessImpact}/10\n\n`;
      md += `**Problem:** ${rec.problem}\n\n`;
      md += `**Solution:** ${rec.solution}\n\n`;
      md += `**Steps:**\n`;
      rec.implementationSteps.forEach((step: string, i: number) => {
        md += `${i+1}. ${step}\n`;
      });
      md += `\n---\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    saveAs(blob, `lighthouse-analysis-${new Date().toISOString().split('T')[0]}.md`);
    toast.success('Analysis exported as Markdown');
  };

  const copyLink = () => {
    // In a real app, this would generate a shareable ID.
    // For now, we'll just toast.
    toast.info('Shareable links require saving the report to your account (Coming Soon).');
  };

  return (
    <div className="flex flex-wrap gap-4">
      <button
        onClick={downloadJson}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-medium"
      >
        <FileJson className="w-4 h-4" />
        Export JSON
      </button>
      <button
        onClick={downloadMarkdown}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-sm font-medium"
      >
        <FileText className="w-4 h-4" />
        Export Markdown
      </button>
      <button
        onClick={copyLink}
        className="flex items-center gap-2 px-4 py-2 bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800 rounded-lg text-violet-700 dark:text-violet-300 hover:bg-violet-100 dark:hover:bg-violet-900/40 transition-colors text-sm font-medium ml-auto"
      >
        <Share2 className="w-4 h-4" />
        Share Report
      </button>
    </div>
  );
}
