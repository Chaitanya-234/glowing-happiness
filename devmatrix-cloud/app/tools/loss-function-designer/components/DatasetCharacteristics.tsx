import React from 'react';
import { Database, TrendingUp } from 'lucide-react';

interface DatasetCharacteristicsProps {
  data: {
    imbalanceRatio: string;
    datasetSize: string;
    dataQuality: string;
  };
  onChange: (field: string, value: string) => void;
}

const DATASET_SIZES = [
  '< 1,000 samples (Very Small)',
  '1,000 - 10,000 samples (Small)',
  '10,000 - 100,000 samples (Medium)',
  '100,000 - 1M samples (Large)',
  '> 1M samples (Very Large)'
];

const IMBALANCE_RATIOS = [
  'Balanced (1:1)',
  'Mild Imbalance (1:10)',
  'Moderate Imbalance (1:100)',
  'Severe Imbalance (1:1000)',
  'Extreme Imbalance (> 1:1000)',
  'Unknown'
];

const QUALITY_LEVELS = [
  'High Quality (Clean, Verified Labels)',
  'Moderate Quality (Some Noise/Errors)',
  'Low Quality (Noisy, Weak Labels)',
  'Mixed/Unknown'
];

export default function DatasetCharacteristics({ data, onChange }: DatasetCharacteristicsProps) {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
        <Database className="w-5 h-5 text-violet-600 dark:text-violet-400" />
        Dataset Characteristics
      </h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="imbalanceRatio" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Class Imbalance Ratio
          </label>
          <div className="relative">
            <select
              id="imbalanceRatio"
              value={data.imbalanceRatio}
              onChange={(e) => onChange('imbalanceRatio', e.target.value)}
              className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-violet-500 focus:border-violet-500 transition-colors pl-10"
            >
              <option value="">Select imbalance ratio...</option>
              {IMBALANCE_RATIOS.map((ratio) => (
                <option key={ratio} value={ratio}>{ratio}</option>
              ))}
            </select>
            <TrendingUp className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
          </div>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Critical for determining if techniques like Focal Loss are needed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="datasetSize" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Dataset Size
            </label>
            <select
              id="datasetSize"
              value={data.datasetSize}
              onChange={(e) => onChange('datasetSize', e.target.value)}
              className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-violet-500 focus:border-violet-500 transition-colors"
            >
              <option value="">Select size...</option>
              {DATASET_SIZES.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="dataQuality" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Data Quality
            </label>
            <select
              id="dataQuality"
              value={data.dataQuality}
              onChange={(e) => onChange('dataQuality', e.target.value)}
              className="w-full rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-violet-500 focus:border-violet-500 transition-colors"
            >
              <option value="">Select quality...</option>
              {QUALITY_LEVELS.map((quality) => (
                <option key={quality} value={quality}>{quality}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
