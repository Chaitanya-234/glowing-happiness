'use client';

import { ArrowRight, CheckCircle, Database, FileText, Layers, LineChart, Rocket, Settings } from 'lucide-react';

interface Stage {
  stage: number;
  name: string;
  description: string;
  steps?: string[];
  recommendedApproach?: string;
  strategy?: string;
}

interface PipelineVisualizationProps {
  pipeline: {
    stages: Stage[];
  };
}

const ICONS: Record<string, any> = {
  'Data Preprocessing': Database,
  'Tokenization': FileText,
  'Model Selection': Layers,
  'Fine-Tuning': Settings,
  'Evaluation': LineChart,
  'Deployment': Rocket,
};

export default function PipelineVisualization({ pipeline }: PipelineVisualizationProps) {
  return (
    <div className="py-8">
      <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 overflow-x-auto pb-4">
        {pipeline.stages.map((stage, index) => {
          const Icon = ICONS[stage.name] || Layers;
          const isLast = index === pipeline.stages.length - 1;

          return (
            <div key={stage.stage} className="flex-1 min-w-[200px] flex md:block relative">
              <div className="bg-white dark:bg-purple-900/10 p-4 rounded-xl border border-gray-200 dark:border-purple-500/20 shadow-sm hover:shadow-md transition-all h-full z-10 relative">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-50 dark:bg-purple-500/20 text-blue-600 dark:text-purple-300 rounded-lg">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-purple-100 text-sm">{stage.name}</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-purple-200/60 mb-3">{stage.description}</p>
                <div className="space-y-1">
                  {(stage.steps || [stage.recommendedApproach || stage.strategy]).slice(0, 3).map((step, i) => (
                    step && (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-purple-200/70">
                        <CheckCircle className="w-3 h-3 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                        <span>{step}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>

              {!isLast && (
                <div className="hidden md:flex absolute top-1/2 -right-4 w-8 justify-center items-center z-0 text-gray-300 dark:text-purple-200/20 transform -translate-y-1/2">
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
