'use client';

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Download, FileText, Check } from 'lucide-react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { toast } from 'sonner';

interface GeneratedFile {
  path: string;
  content: string;
  type: 'config' | 'translation' | 'doc';
}

interface GeneratedOutputProps {
  files: GeneratedFile[];
}

export default function GeneratedOutput({ files }: GeneratedOutputProps) {
  const [activeFile, setActiveFile] = useState(files[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!activeFile) return;
    try {
      await navigator.clipboard.writeText(activeFile.content);
      setCopied(true);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const handleDownloadZip = async () => {
    try {
      const zip = new JSZip();
      files.forEach(file => {
        zip.file(file.path, file.content);
      });

      const content = await zip.generateAsync({ type: 'blob' });
      saveAs(content, 'i18n-setup.zip');
      toast.success('Download started');
    } catch (err) {
      toast.error('Failed to create ZIP');
      console.error(err);
    }
  };

  const getLanguage = (path: string) => {
    if (path.endsWith('.json')) return 'json';
    if (path.endsWith('.ts') || path.endsWith('.tsx')) return 'typescript';
    if (path.endsWith('.js')) return 'javascript';
    if (path.endsWith('.md')) return 'markdown';
    return 'text';
  };

  const sortedFiles = [...files].sort((a, b) => {
      // Config first, then translations, then docs
      const typeOrder = { config: 0, translation: 1, doc: 2 };
      return typeOrder[a.type] - typeOrder[b.type] || a.path.localeCompare(b.path);
  });

  return (
    <div className="flex flex-col lg:flex-row h-[600px] border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-xl">
      {/* Sidebar - File Explorer */}
      <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 flex flex-col">
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-200 flex justify-between items-center">
            <span>Files Generated</span>
            <span className="text-xs bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-full">{files.length}</span>
        </div>
        <div className="overflow-y-auto flex-1 p-2 space-y-1">
          {sortedFiles.map((file) => (
            <button
              key={file.path}
              onClick={() => setActiveFile(file)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                activeFile?.path === file.path
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <FileText className="w-4 h-4 flex-shrink-0" />
              <span className="truncate" title={file.path}>{file.path}</span>
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-slate-200 dark:border-slate-700">
            <button
                onClick={handleDownloadZip}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
                <Download className="w-4 h-4" />
                Download ZIP
            </button>
        </div>
      </div>

      {/* Main Content - Code Viewer */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e]">
        <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#3e3e42] text-gray-300 text-sm">
          <span className="font-mono truncate">{activeFile?.path}</span>
          <button
            onClick={handleCopy}
            className="p-1.5 hover:bg-[#3e3e42] rounded text-gray-400 hover:text-white transition-colors"
            title="Copy content"
          >
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
        <div className="flex-1 overflow-auto custom-scrollbar">
          {activeFile && (
            <SyntaxHighlighter
              language={getLanguage(activeFile.path)}
              style={vscDarkPlus}
              customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent', fontSize: '14px' }}
              showLineNumbers={true}
            >
              {activeFile.content}
            </SyntaxHighlighter>
          )}
        </div>
      </div>
    </div>
  );
}
