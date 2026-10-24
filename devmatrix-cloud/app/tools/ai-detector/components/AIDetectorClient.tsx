'use client';

import { useState } from 'react';
import TextInput from './TextInput';
import FileUploader from './FileUploader';
import URLInput from './URLInput';
import DetectionResults from './DetectionResults';
import { analyzeText } from '../actions';
import { Type, FileText, Globe, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

export default function AIDetectorClient() {
  const [activeTab, setActiveTab] = useState<'text' | 'file' | 'url'>('text');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [originalText, setOriginalText] = useState('');
  const [error, setError] = useState('');

  const handleAnalyze = async (text: string) => {
    if (!text || text.trim().length < 50) {
      toast.error("Please enter at least 50 characters of text.");
      return;
    }

    setIsLoading(true);
    setError('');
    setResult(null);
    setOriginalText(text);

    // Scroll to results area if on mobile
    if (window.innerWidth < 768) {
       setTimeout(() => {
           document.getElementById('analysis-container')?.scrollIntoView({ behavior: 'smooth' });
       }, 100);
    }

    try {
      const response = await analyzeText(text);
      if (response.success && response.data) {
        setResult(response.data);
        toast.success("Analysis complete!");
        // Scroll to results
        setTimeout(() => {
            document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        setError(response.error || "Failed to analyze text");
        toast.error(response.error || "Failed to analyze text");
        if (response.details) {
            console.error(response.details);
        }
      }
    } catch (err) {
      setError("An unexpected error occurred.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="analysis-container">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 via-fuchsia-600 to-violet-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-violet-400 mb-6 pb-2 animate-in fade-in slide-in-from-bottom-4 duration-700">
          AI Content Detector
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          Detect ChatGPT, Gemini, and Claude generated text with professional-grade accuracy.
          Analyze linguistic patterns, perplexity, and authentic writing markers.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden mb-12 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
        <div className="flex border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('text')}
            className={`flex-1 py-5 text-sm md:text-base font-medium flex items-center justify-center gap-2 transition-all ${
              activeTab === 'text'
                ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border-b-2 border-violet-500'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Type className="w-4 h-4 md:w-5 md:h-5" /> Text Input
          </button>
          <button
            onClick={() => setActiveTab('file')}
            className={`flex-1 py-5 text-sm md:text-base font-medium flex items-center justify-center gap-2 transition-all ${
              activeTab === 'file'
                ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border-b-2 border-violet-500'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <FileText className="w-4 h-4 md:w-5 md:h-5" /> File Upload
          </button>
          <button
            onClick={() => setActiveTab('url')}
            className={`flex-1 py-5 text-sm md:text-base font-medium flex items-center justify-center gap-2 transition-all ${
              activeTab === 'url'
                ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-600 dark:text-violet-400 border-b-2 border-violet-500'
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
          >
            <Globe className="w-4 h-4 md:w-5 md:h-5" /> URL Analysis
          </button>
        </div>

        <div className="p-6 md:p-10 bg-slate-50/50 dark:bg-slate-900/50 min-h-[400px]">
          <div className="animate-in fade-in zoom-in-95 duration-300">
            {activeTab === 'text' && <TextInput onAnalyze={handleAnalyze} isLoading={isLoading} />}
            {activeTab === 'file' && <FileUploader onAnalyze={handleAnalyze} isLoading={isLoading} />}
            {activeTab === 'url' && <URLInput onAnalyze={handleAnalyze} isLoading={isLoading} />}
          </div>

           {error && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-xl flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-semibold">Analysis Failed</h4>
                    <p className="text-sm opacity-90">{error}</p>
                </div>
            </div>
          )}
        </div>
      </div>

      <div id="results" className="scroll-mt-20">
        {result && <DetectionResults data={result} originalText={originalText} />}
      </div>
    </div>
  );
}
