'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import ModeSelector from './ModeSelector';
import ScenarioBuilder from './ScenarioBuilder';
import GeneratedScript from './GeneratedScript';
import ReportUploader from './ReportUploader';
import ReportAnalyzer from './ReportAnalyzer';
import { generateGatlingScript, analyzeGatlingReport } from '../actions';

export default function GatlingToolClient() {
  const [mode, setMode] = useState<'generator' | 'analyzer'>('generator');

  // State for Generator Mode
  const [generatorInput, setGeneratorInput] = useState<any>({});
  const [generatedScript, setGeneratedScript] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // State for Analyzer Mode
  const [reportData, setReportData] = useState<any>(null);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleGenerate = async (input: any) => {
    setIsGenerating(true);
    setGeneratedScript(null);
    try {
      const result = await generateGatlingScript(input);
      if (result.success) {
        setGeneratedScript(result.data);
        toast.success('Script generated successfully!');
      } else {
        toast.error('Failed to generate script. Please try again.');
        console.error(result.error);
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnalyze = async (data: any) => {
    setReportData(data);
    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
      // We pass the parsed JSON data to the server action
      // Ensure we don't pass too massive data if it's not needed, but stats.json is usually manageable
      const result = await analyzeGatlingReport(data);
      if (result.success) {
        setAnalysisResult(result.data);
        toast.success('Report analyzed successfully!');
      } else {
        toast.error('Failed to analyze report.');
        console.error(result.error);
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-4 md:p-8 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600 dark:from-violet-400 dark:to-purple-400 mb-4">
            AI Gatling Load Testing Tool
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Generate production-ready Scala DSL scripts and analyze load test reports with the power of Gemini 2.5 AI.
          </p>
        </div>

        <ModeSelector mode={mode} setMode={setMode} />

        <AnimatePresence mode="wait">
          {mode === 'generator' ? (
            <motion.div
              key="generator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center text-sm">1</span>
                      Configure Scenario
                    </h2>
                    <ScenarioBuilder
                      input={generatorInput}
                      setInput={setGeneratorInput}
                      onGenerate={handleGenerate}
                      isGenerating={isGenerating}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 min-h-[600px] flex flex-col">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 flex items-center justify-center text-sm">2</span>
                      Generated Script
                    </h2>
                    <GeneratedScript script={generatedScript} isLoading={isGenerating} />
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="analyzer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
               <div className="space-y-8">
                <ReportUploader onUpload={handleAnalyze} />

                {reportData && (
                  <ReportAnalyzer
                    reportData={reportData}
                    analysisResult={analysisResult}
                    isAnalyzing={isAnalyzing}
                  />
                )}
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
