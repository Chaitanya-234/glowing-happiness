import React from 'react';
import { Target, DollarSign } from 'lucide-react';

interface BusinessObjectivesProps {
  data: {
    errorCost: string;
    primaryObjective: string;
    constraints: string[];
  };
  onChange: (field: string, value: any) => void;
}

const ERROR_COST_PROFILES = [
  'Equal Costs (False Positive = False Negative)',
  'False Negatives Costlier (e.g., missed fraud/disease)',
  'False Positives Costlier (e.g., spam filter)',
  'Custom/Complex Cost Matrix'
];

const OBJECTIVES = [
  'Maximize Accuracy',
  'Maximize Recall (Minimize Missed Cases)',
  'Maximize Precision (Minimize False Alarms)',
  'Maximize F1-Score (Balanced)',
  'Maximize AUC-ROC',
  'Maximize Revenue / Minimize Financial Loss',
  'Optimize Ranking (NDCG/MRR)'
];

const CONSTRAINTS_OPTIONS = [
  'Interpretability Required',
  'Real-time Inference Limit',
  'Fairness / Bias Constraints',
  'Probability Calibration Required',
  'Differentiability (for Gradient Descent)',
  'Robustness to Noise',
  'Hardware Constraints (Mobile/Edge)'
];

export default function BusinessObjectives({ data, onChange }: BusinessObjectivesProps) {
  const toggleConstraint = (constraint: string) => {
    const newConstraints = data.constraints.includes(constraint)
      ? data.constraints.filter(c => c !== constraint)
      : [...data.constraints, constraint];
    onChange('constraints', newConstraints);
  };

  // Generate a sanitized ID from string
  const sanitizeId = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '-');

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <Target className="w-5 h-5 text-violet-600 dark:text-violet-400" />
        Business Objectives & Constraints
      </h3>

      <div className="space-y-6">
        <div>
          <label htmlFor="errorCost" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Error Cost Profile
          </label>
          <div className="relative">
            <select
              id="errorCost"
              value={data.errorCost}
              onChange={(e) => onChange('errorCost', e.target.value)}
              className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-violet-500 focus:border-violet-500 transition-colors pl-10"
            >
              <option value="">Select cost profile...</option>
              {ERROR_COST_PROFILES.map((profile) => (
                <option key={profile} value={profile}>{profile}</option>
              ))}
            </select>
            <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3" id="primaryObjectiveLabel">
            Primary Objective
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-labelledby="primaryObjectiveLabel">
            {OBJECTIVES.map((obj) => (
              <label
                key={obj}
                htmlFor={sanitizeId(obj)}
                className={`
                  flex items-center p-3 rounded-lg border cursor-pointer transition-all
                  ${data.primaryObjective === obj
                    ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300'
                    : 'border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-700'
                  }
                `}
              >
                <input
                  type="radio"
                  id={sanitizeId(obj)}
                  name="primaryObjective"
                  value={obj}
                  checked={data.primaryObjective === obj}
                  onChange={(e) => onChange('primaryObjective', e.target.value)}
                  className="w-4 h-4 text-violet-600 focus:ring-violet-500 border-gray-300"
                />
                <span className="ml-2 text-sm">{obj}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Operational Constraints
          </label>
          <div className="flex flex-wrap gap-2">
            {CONSTRAINTS_OPTIONS.map((constraint) => (
              <button
                key={constraint}
                type="button"
                onClick={() => toggleConstraint(constraint)}
                aria-pressed={data.constraints.includes(constraint)}
                className={`
                  px-3 py-1.5 rounded-full text-sm font-medium transition-colors border
                  ${data.constraints.includes(constraint)
                    ? 'bg-violet-100 dark:bg-violet-900/40 text-violet-800 dark:text-violet-200 border-violet-200 dark:border-violet-700'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-600 hover:border-violet-300'
                  }
                `}
              >
                {constraint}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
