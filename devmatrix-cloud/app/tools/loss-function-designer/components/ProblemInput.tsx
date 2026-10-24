import React from 'react';
import { Brain } from 'lucide-react';

interface ProblemInputProps {
  data: {
    taskType: string;
    description: string;
    domain: string;
  };
  onChange: (field: string, value: string) => void;
}

const TASK_TYPES = [
  'Binary Classification',
  'Multi-Class Classification',
  'Multi-Label Classification',
  'Regression (Single Output)',
  'Regression (Multi Output)',
  'Object Detection',
  'Semantic Segmentation',
  'Instance Segmentation',
  'Ranking / Recommendation',
  'Metric Learning',
  'Generative (GAN/VAE)',
  'Anomaly Detection',
  'Time Series Forecasting'
];

const DOMAINS = [
  'Computer Vision',
  'Natural Language Processing',
  'Healthcare / Medical',
  'Finance / Fintech',
  'E-commerce / Retail',
  'Manufacturing / Industrial',
  'Autonomous Systems',
  'Social Media',
  'Cybersecurity',
  'Scientific Research',
  'Gaming',
  'Other'
];

export default function ProblemInput({ data, onChange }: ProblemInputProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          Problem Definition
        </h3>

        <div className="space-y-4">
          <div>
            <label htmlFor="taskType" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Task Type
            </label>
            <select
              id="taskType"
              value={data.taskType}
              onChange={(e) => onChange('taskType', e.target.value)}
              className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-violet-500 focus:border-violet-500 transition-colors"
            >
              <option value="">Select a task type...</option>
              {TASK_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="domain" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Domain
            </label>
            <select
              id="domain"
              value={data.domain}
              onChange={(e) => onChange('domain', e.target.value)}
              className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-violet-500 focus:border-violet-500 transition-colors"
            >
              <option value="">Select a domain...</option>
              {DOMAINS.map((domain) => (
                <option key={domain} value={domain}>{domain}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Problem Description
            </label>
            <textarea
              id="description"
              value={data.description}
              onChange={(e) => onChange('description', e.target.value)}
              placeholder="Describe your specific problem, challenges, and goals... (e.g., 'Detecting fraudulent transactions in a highly imbalanced dataset where missing a fraud case is very expensive.')"
              rows={4}
              className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:ring-violet-500 focus:border-violet-500 transition-colors"
            />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 text-right">
              {data.description.length} characters
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
