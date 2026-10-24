import React from 'react';
import { z } from 'zod';
import { LossFunctionDesignerSchema } from '@/lib/ai-schemas';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Activity, PieChart as PieChartIcon } from 'lucide-react';

type VisualizationData = z.infer<typeof LossFunctionDesignerSchema>['visualization'];

interface VisualizationPanelProps {
  visualization: VisualizationData;
}

const COLORS = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#7c3aed', '#6d28d9'];

export default function VisualizationPanel({ visualization }: VisualizationPanelProps) {
  const { lossLandscape, componentContribution } = visualization;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Component Contribution Chart */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <PieChartIcon className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          Component Contribution
        </h3>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={componentContribution.data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="percentage"
              >
                {componentContribution.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  borderColor: '#334155',
                  color: '#fff',
                  borderRadius: '0.5rem'
                }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
          Breakdown of how each loss component influences the total gradient.
        </p>
      </div>

      {/* Loss Landscape Description */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-violet-600 dark:text-violet-400" />
          Loss Landscape Analysis
        </h3>

        <div className="space-y-6">
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {lossLandscape.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
              Behavioral Curves
            </h4>
            <div className="space-y-4">
              {lossLandscape.curves.map((curve, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className="mt-1.5 w-2 h-2 rounded-full bg-violet-500 flex-shrink-0 group-hover:bg-violet-400 transition-colors" />
                  <div>
                    <span className="block text-sm font-semibold text-slate-900 dark:text-white mb-1">
                      {curve.name}
                    </span>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {curve.behavior}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between text-xs text-slate-400 pt-4 border-t border-slate-100 dark:border-slate-700/50">
             <span>X-Axis: {lossLandscape.xAxis}</span>
             <span>Y-Axis: {lossLandscape.yAxis}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
