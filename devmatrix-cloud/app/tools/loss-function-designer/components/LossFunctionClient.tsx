'use client';

import React, { useState } from 'react';
import { generateLossFunction } from '../actions';
import { toast } from 'sonner';
import { Loader2, Wand2, ChevronRight, RefreshCw, Download } from 'lucide-react';
import ProblemInput from './ProblemInput';
import DatasetCharacteristics from './DatasetCharacteristics';
import BusinessObjectives from './BusinessObjectives';
import LossFunctionDisplay from './LossFunctionDisplay';
import MathematicalBreakdown from './MathematicalBreakdown';
import CodeImplementation from './CodeImplementation';
import VisualizationPanel from './VisualizationPanel';
import ComparisonTable from './ComparisonTable';
import UsageGuide from './UsageGuide';
import WeightSuggestions from './WeightSuggestions';
import ExampleScenarios from './ExampleScenarios';
import { LossFunctionDesignerSchema } from '@/lib/ai-schemas';
import { z } from 'zod';

type LossResult = z.infer<typeof LossFunctionDesignerSchema>;

export default function LossFunctionClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<LossResult | null>(null);

  const [problemData, setProblemData] = useState({
    taskType: '',
    description: '',
    domain: ''
  });

  const [datasetData, setDatasetData] = useState({
    imbalanceRatio: '',
    datasetSize: '',
    dataQuality: ''
  });

  const [objectivesData, setObjectivesData] = useState({
    errorCost: '',
    primaryObjective: '',
    constraints: [] as string[]
  });

  const handleScenarioSelect = (data: any) => {
    setProblemData(data.problem);
    setDatasetData(data.dataset);
    setObjectivesData(data.objectives);
    setResult(null);
    toast.success('Example scenario loaded!');
  };

  const handleGenerate = async () => {
    if (!problemData.taskType || !problemData.description) {
      toast.error('Please describe the problem and task type.');
      return;
    }

    setIsLoading(true);
    setResult(null);

    try {
      // Determine if multi-task based on description or constraints (simple heuristic for now)
      const isMultiTask = problemData.taskType.toLowerCase().includes('multi-task') ||
                          problemData.description.toLowerCase().includes('multiple tasks');

      const response = await generateLossFunction(
        problemData,
        datasetData,
        objectivesData,
        { isMultiTask }
      );

      if (response.success && response.data) {
        setResult(response.data);
        toast.success('Loss function designed successfully!');
      } else {
        toast.error(response.error || 'Failed to generate loss function.');
        if (response.details) {
          console.error('Validation details:', response.details);
        }
      }
    } catch (err) {
      toast.error('An unexpected error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(result, null, 2)], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = "custom-loss-function.json";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          AI Loss Function Designer
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
          Design mathematically sound, production-ready custom loss functions tailored to your specific
          machine learning problem, dataset imbalance, and business constraints.
        </p>
      </div>

      <ExampleScenarios onSelect={handleScenarioSelect} />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Input Column */}
        <div className="lg:col-span-1 space-y-6">
          <ProblemInput
            data={problemData}
            onChange={(f, v) => setProblemData(prev => ({ ...prev, [f]: v }))}
          />
          <DatasetCharacteristics
            data={datasetData}
            onChange={(f, v) => setDatasetData(prev => ({ ...prev, [f]: v }))}
          />
          <BusinessObjectives
            data={objectivesData}
            onChange={(f, v) => setObjectivesData(prev => ({ ...prev, [f]: v }))}
          />

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full py-4 px-6 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold shadow-lg shadow-violet-200 dark:shadow-violet-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Designing Loss...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                Generate Loss Function
              </>
            )}
          </button>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-2 space-y-8">
          {!result && !isLoading && (
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 h-[600px] flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 p-8 text-center">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-full mb-4 shadow-sm">
                <Wand2 className="w-8 h-8 text-violet-400 dark:text-violet-500" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                Ready to Design
              </h3>
              <p className="max-w-md">
                Fill in your problem details on the left or select an example scenario to generate a custom loss function.
              </p>
            </div>
          )}

          {isLoading && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 h-[600px] flex flex-col items-center justify-center p-8 text-center">
               <Loader2 className="w-12 h-12 text-violet-600 animate-spin mb-6" />
               <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                 Analyzing Problem Context
               </h3>
               <p className="text-slate-500 dark:text-slate-400 max-w-md animate-pulse">
                 Our AI is evaluating your dataset characteristics and encoding business constraints into a mathematical formulation...
               </p>
            </div>
          )}

          {result && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Designed Solution
                </h2>
                <div className="flex gap-2">
                   <button
                     onClick={handleDownload}
                     className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
                   >
                     <Download className="w-4 h-4" /> Export JSON
                   </button>
                   <button
                     onClick={handleGenerate}
                     className="px-4 py-2 text-sm font-medium text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800 rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/40 transition-colors flex items-center gap-2"
                   >
                     <RefreshCw className="w-4 h-4" /> Regenerate
                   </button>
                </div>
              </div>

              <LossFunctionDisplay lossDesign={result.lossDesign} />

              <MathematicalBreakdown breakdown={result.mathematicalBreakdown} />

              <VisualizationPanel visualization={result.visualization} />

              <CodeImplementation implementation={result.implementation} />

              <ComparisonTable comparison={result.comparison} />

              <WeightSuggestions multiTaskWeighting={result.multiTaskWeighting} />

              <UsageGuide guidance={result.usageGuidance} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
