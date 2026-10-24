import React from 'react';
import { Calculator, Copy, Check } from 'lucide-react';
import { z } from 'zod';
import { LossFunctionDesignerSchema } from '@/lib/ai-schemas';

type LossDesign = z.infer<typeof LossFunctionDesignerSchema>['lossDesign'];

interface LossFunctionDisplayProps {
  lossDesign: LossDesign;
}

export default function LossFunctionDisplay({ lossDesign }: LossFunctionDisplayProps) {
  const [copied, setCopied] = React.useState(false);

  const copyEquation = () => {
    navigator.clipboard.writeText(lossDesign.latexEquation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const encodedLatex = encodeURIComponent(lossDesign.latexEquation);
  // Using a reliable public LaTeX renderer
  const latexImageUrl = `https://latex.codecogs.com/svg.latex?\\huge&space;${encodedLatex}`;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
        <div className="flex justify-between items-start">
          <div>
            <span className="inline-block px-3 py-1 mb-2 text-xs font-medium rounded-full bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300">
              {lossDesign.category}
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {lossDesign.name}
            </h2>
          </div>
        </div>
      </div>

      <div className="p-8 flex flex-col items-center justify-center bg-white dark:bg-slate-800 min-h-[200px]">
        {/* LaTeX Rendering */}
        <div className="w-full overflow-x-auto flex justify-center py-6 mb-4">
           <img
             src={latexImageUrl}
             alt={lossDesign.finalEquation}
             className="dark:invert" // Invert colors for dark mode if using black text
             style={{ minHeight: '40px', maxWidth: '100%' }}
           />
        </div>

        {/* Raw Equation Copy */}
        <div className="w-full max-w-2xl relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Calculator className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            readOnly
            value={lossDesign.latexEquation}
            className="block w-full pl-10 pr-12 py-2.5 text-sm rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-mono"
          />
          <button
            onClick={copyEquation}
            className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">
          Loss Composition
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {lossDesign.components.map((comp, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-slate-900 dark:text-white">{comp.name}</span>
                <span className="text-xs font-mono bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300 px-2 py-1 rounded">
                  w = {comp.weight}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{comp.purpose}</p>
              {comp.parameters && (
                <div className="space-y-1">
                  {Object.entries(comp.parameters).map(([key, val]) => (
                    <div key={key} className="flex justify-between text-xs border-b border-slate-100 dark:border-slate-700/50 last:border-0 py-1">
                      <span className="font-mono text-slate-500">{key}</span>
                      <span className="font-mono text-slate-900 dark:text-slate-300">
                        {typeof val === 'object' ? JSON.stringify(val) : val}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
