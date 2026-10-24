import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, Star } from 'lucide-react';
import { CareerPathSchema } from '../../../../lib/ai-schemas';
import { z } from 'zod';

type SkillGapAnalysisData = z.infer<typeof CareerPathSchema>['skillGapAnalysis'];

export function SkillGapAnalysis({ data }: { data: SkillGapAnalysisData }) {
  const getGapColor = (type: string) => {
    switch (type) {
      case 'Missing': return 'text-red-500 bg-red-50 dark:bg-red-900/20';
      case 'Weak': return 'text-orange-500 bg-orange-50 dark:bg-orange-900/20';
      case 'Adequate': return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'Strong': return 'text-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'text-gray-500';
    }
  };

  const getGapIcon = (type: string) => {
    switch (type) {
      case 'Missing': return <XCircle className="w-5 h-5" />;
      case 'Weak': return <AlertTriangle className="w-5 h-5" />;
      case 'Adequate': return <CheckCircle2 className="w-5 h-5" />;
      case 'Strong': return <Star className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Skill Gap Analysis</h3>

      <div className="flex items-center justify-center mb-8">
        <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-4 border-blue-100 dark:border-blue-900">
           <div className="text-center">
             <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{data.matchPercentage}%</span>
             <p className="text-xs text-gray-500 uppercase font-semibold">Match</p>
           </div>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">{data.summary}</p>

      <div className="space-y-4">
        {data.gaps.map((gap, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">{gap.skill}</h4>
              <p className="text-xs text-gray-500">Required: {gap.requiredLevel}</p>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getGapColor(gap.gapType)}`}>
              {getGapIcon(gap.gapType)}
              {gap.gapType}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
