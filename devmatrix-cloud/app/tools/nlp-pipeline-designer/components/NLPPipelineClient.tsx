'use client';

import { useState } from 'react';
import TaskSelector from './TaskSelector';
import DatasetInput from './DatasetInput';
import LanguageSelector from './LanguageSelector';
import RequirementsForm from './RequirementsForm';
import PipelineVisualization from './PipelineVisualization';
import ModelRecommendation from './ModelRecommendation';
import DeploymentGuide from './DeploymentGuide';
import ResourceEstimator from './ResourceEstimator';
import BenchmarkComparison from './BenchmarkComparison';
import CodeViewer from './CodeViewer';
import { generateNLPPipeline } from '../actions';
import { Loader2, ArrowRight, ArrowLeft, Download, RefreshCw, Brain } from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';
import { NLPPipelineSchema } from '@/lib/ai-schemas';

type NLPPipelineData = z.infer<typeof NLPPipelineSchema>;

export default function NLPPipelineClient() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [task, setTask] = useState('');
  const [dataset, setDataset] = useState({
    size: '',
    format: '',
    description: '',
    language: '',
    domain: ''
  });
  const [requirements, setRequirements] = useState({
    priority: 'balanced',
    targetAccuracy: '',
    latency: 'none',
    compute: 'colab'
  });

  const [pipelineData, setPipelineData] = useState<NLPPipelineData | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateNLPPipeline(
        task,
        {
            size: dataset.size,
            format: dataset.format,
            domain: dataset.domain,
            language: dataset.language,
            description: dataset.description
        },
        requirements
      );

      if (result.success && result.data) {
        setPipelineData(result.data);
        setStep(3);
        toast.success('Pipeline generated successfully!');
      } else {
        setError(result.error || 'Failed to generate pipeline');
        toast.error(result.error || 'Failed to generate pipeline');
      }
    } catch (err) {
      setError('An unexpected error occurred');
      toast.error('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-16 h-16 text-blue-600 dark:text-purple-500 animate-spin mb-6" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-purple-100">Designing Your NLP Pipeline...</h3>
            <p className="text-gray-500 dark:text-purple-200/60 mt-2 text-center max-w-md">
                Our AI is analyzing your task, selecting optimal models, and generating production-ready code. This may take 30-60 seconds.
            </p>
        </div>
      );
    }

    if (error) {
         return (
            <div className="text-center py-20">
                <div className="text-red-500 text-xl font-semibold mb-4">Error</div>
                <p className="text-gray-600 dark:text-purple-200/60 mb-6">{error}</p>
                <button
                    onClick={() => setStep(2)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-purple-600 dark:hover:bg-purple-500"
                >
                    Go Back & Try Again
                </button>
            </div>
         )
    }

    switch (step) {
      case 1:
        return (
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-purple-50 mb-2 text-center">Select Your NLP Task</h2>
            <p className="text-gray-500 dark:text-purple-200/50 text-center mb-10">Choose the type of text analysis you want to perform</p>
            <TaskSelector
                selectedTask={task}
                onSelect={(t) => {
                    setTask(t);
                    setStep(2);
                }}
            />
          </div>
        );

      case 2:
        return (
          <div className="max-w-3xl mx-auto">
             <div className="mb-8 flex items-center gap-4">
                <button onClick={() => setStep(1)} className="text-gray-500 hover:text-gray-900 dark:text-purple-200/60 dark:hover:text-purple-100">
                    <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-purple-50">Project Details</h2>
                    <p className="text-gray-500 dark:text-purple-200/60 text-sm">Task: {task}</p>
                </div>
             </div>

             <div className="space-y-12">
                <section>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-purple-100 mb-4 border-b border-gray-200 dark:border-purple-500/20 pb-2">Dataset Characteristics</h3>
                    <DatasetInput data={dataset} onChange={setDataset} />
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-purple-100 mb-4 border-b border-gray-200 dark:border-purple-500/20 pb-2">Language & Domain</h3>
                    <LanguageSelector data={dataset} onChange={setDataset} />
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-purple-100 mb-4 border-b border-gray-200 dark:border-purple-500/20 pb-2">Requirements & Constraints</h3>
                    <RequirementsForm data={requirements} onChange={setRequirements} />
                </section>

                <div className="flex justify-end pt-6">
                    <button
                        onClick={handleGenerate}
                        disabled={!dataset.size || !dataset.language}
                        className="px-8 py-3 bg-blue-600 dark:bg-purple-600 text-white rounded-xl font-medium text-lg hover:bg-blue-700 dark:hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-blue-200 dark:shadow-purple-900/20 transition-all"
                    >
                        <Brain className="w-5 h-5" />
                        Generate Pipeline
                    </button>
                </div>
             </div>
          </div>
        );

      case 3:
        if (!pipelineData) return null;

        return (
            <div className="max-w-7xl mx-auto">
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-purple-50">{pipelineData.taskAnalysis.taskType} Pipeline</h1>
                        <p className="text-gray-500 dark:text-purple-200/60 mt-1">
                            Optimized for {dataset.language} ({dataset.domain}) • {requirements.priority} priority
                        </p>
                    </div>
                    <div className="flex gap-3">
                         <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-white dark:bg-purple-900/10 border border-gray-300 dark:border-purple-500/20 text-gray-700 dark:text-purple-200 rounded-lg hover:bg-gray-50 dark:hover:bg-purple-900/20 flex items-center gap-2 transition-colors"
                        >
                            <RefreshCw className="w-4 h-4" /> New Pipeline
                        </button>
                        <button className="px-4 py-2 bg-blue-600 dark:bg-purple-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-purple-500 flex items-center gap-2 transition-colors">
                            <Download className="w-4 h-4" /> Export Package
                        </button>
                    </div>
                </div>

                <PipelineVisualization pipeline={pipelineData.pipeline} />

                <div className="mt-8 flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Navigation */}
                    <div className="w-full lg:w-64 flex-shrink-0">
                        <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0">
                            {[
                                { id: 'overview', label: 'Overview & Models' },
                                { id: 'preprocessing', label: 'Preprocessing' },
                                { id: 'training', label: 'Training Strategy' },
                                { id: 'evaluation', label: 'Evaluation' },
                                { id: 'deployment', label: 'Deployment' },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-3 rounded-lg text-left whitespace-nowrap transition-colors ${
                                        activeTab === tab.id
                                            ? 'bg-blue-50 dark:bg-purple-900/30 text-blue-700 dark:text-purple-300 font-medium'
                                            : 'text-gray-600 dark:text-purple-200/60 hover:bg-gray-50 dark:hover:bg-purple-900/10'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </nav>

                        <div className="mt-8 hidden lg:block">
                            <h4 className="font-semibold text-gray-900 dark:text-purple-100 mb-4">Resource Estimates</h4>
                            <div className="text-sm space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-purple-200/50">Training Time</span>
                                    <span className="font-medium dark:text-purple-100">{pipelineData.resourceEstimates.training.trainingTime}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-purple-200/50">GPU Memory</span>
                                    <span className="font-medium dark:text-purple-100">{pipelineData.resourceEstimates.training.gpuRequired}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500 dark:text-purple-200/50">Est. Cost</span>
                                    <span className="font-medium text-green-600 dark:text-green-400">{pipelineData.resourceEstimates.training.cost}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 min-w-0">
                        {activeTab === 'overview' && (
                            <div className="space-y-8 animate-in fade-in duration-500">
                                <section>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-purple-100 mb-4">Recommended Models</h3>
                                    <ModelRecommendation models={pipelineData.modelRecommendations} />
                                </section>

                                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <BenchmarkComparison
                                        models={pipelineData.modelRecommendations.map((m: any) => ({
                                            name: m.name,
                                            accuracy: m.expectedAccuracy,
                                            speed: m.inferenceLatency
                                        }))}
                                    />
                                    <div className="bg-blue-50 dark:bg-purple-900/10 p-6 rounded-xl border border-blue-100 dark:border-purple-500/20">
                                        <h3 className="font-semibold text-blue-900 dark:text-purple-200 mb-3">Task Analysis</h3>
                                        <ul className="space-y-2">
                                            {pipelineData.taskAnalysis.commonChallenges.map((challenge: string, i: number) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-blue-800 dark:text-purple-300/80">
                                                    <div className="w-1.5 h-1.5 bg-blue-500 dark:bg-purple-500 rounded-full mt-1.5" />
                                                    {challenge}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </section>
                            </div>
                        )}

                        {activeTab === 'preprocessing' && (
                            <div className="space-y-6 animate-in fade-in duration-500">
                                <div className="bg-white dark:bg-purple-900/10 p-6 rounded-xl border border-gray-200 dark:border-purple-500/20">
                                    <h3 className="font-semibold text-gray-900 dark:text-purple-100 mb-4">Preprocessing Steps</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {pipelineData.pipeline.stages.find((s:any) => s.name === 'Data Preprocessing')?.steps?.map((step: string, i: number) => (
                                            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-purple-900/20 rounded-lg">
                                                <div className="w-6 h-6 bg-blue-100 dark:bg-purple-500/20 text-blue-600 dark:text-purple-300 rounded-full flex items-center justify-center text-xs font-bold">
                                                    {i + 1}
                                                </div>
                                                <span className="text-gray-700 dark:text-purple-200">{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <CodeViewer
                                    code={pipelineData.preprocessingCode.code}
                                    language={pipelineData.preprocessingCode.language}
                                    title="Preprocessing Script"
                                />
                            </div>
                        )}

                        {activeTab === 'training' && (
                            <div className="space-y-6 animate-in fade-in duration-500">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="bg-white dark:bg-purple-900/10 p-4 rounded-xl border border-gray-200 dark:border-purple-500/20">
                                        <div className="text-sm text-gray-500 dark:text-purple-200/50">Strategy</div>
                                        <div className="font-semibold text-gray-900 dark:text-purple-100">{pipelineData.fineTuningConfig.strategy}</div>
                                    </div>
                                    <div className="bg-white dark:bg-purple-900/10 p-4 rounded-xl border border-gray-200 dark:border-purple-500/20">
                                        <div className="text-sm text-gray-500 dark:text-purple-200/50">Learning Rate</div>
                                        <div className="font-semibold text-gray-900 dark:text-purple-100">{pipelineData.fineTuningConfig.learningRate}</div>
                                    </div>
                                    <div className="bg-white dark:bg-purple-900/10 p-4 rounded-xl border border-gray-200 dark:border-purple-500/20">
                                        <div className="text-sm text-gray-500 dark:text-purple-200/50">Batch Size</div>
                                        <div className="font-semibold text-gray-900 dark:text-purple-100">{pipelineData.fineTuningConfig.batchSize}</div>
                                    </div>
                                </div>
                                <CodeViewer
                                    code={pipelineData.trainingCode.code}
                                    language={pipelineData.trainingCode.language}
                                    title="Training Loop"
                                />
                            </div>
                        )}

                        {activeTab === 'evaluation' && (
                            <div className="space-y-6 animate-in fade-in duration-500">
                                <CodeViewer
                                    code={pipelineData.evaluationCode.code}
                                    language={pipelineData.evaluationCode.language}
                                    title="Evaluation Metrics"
                                />
                            </div>
                        )}

                        {activeTab === 'deployment' && (
                            <div className="animate-in fade-in duration-500">
                                <DeploymentGuide strategy={pipelineData.deploymentStrategy} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-300 pb-20">
        <div className="container mx-auto px-4 py-8">
            {renderContent()}
        </div>
    </div>
  );
}
