'use client';

import React from 'react';
import { Plus, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EndpointConfigProps {
  scenarios: any[];
  onChange: (scenarios: any[]) => void;
}

export default function EndpointConfig({ scenarios, onChange }: EndpointConfigProps) {
  const addScenario = () => {
    onChange([
      ...scenarios,
      {
        id: Date.now().toString(),
        name: `Scenario ${scenarios.length + 1}`,
        steps: [{ method: 'GET', url: '/', name: 'Home' }],
      },
    ]);
  };

  const removeScenario = (index: number) => {
    const newScenarios = [...scenarios];
    newScenarios.splice(index, 1);
    onChange(newScenarios);
  };

  const updateScenarioName = (index: number, name: string) => {
    const newScenarios = [...scenarios];
    newScenarios[index].name = name;
    onChange(newScenarios);
  };

  const addStep = (scenarioIndex: number) => {
    const newScenarios = [...scenarios];
    newScenarios[scenarioIndex].steps.push({ method: 'GET', url: '', name: 'Request' });
    onChange(newScenarios);
  };

  const updateStep = (scenarioIndex: number, stepIndex: number, field: string, value: string) => {
    const newScenarios = [...scenarios];
    newScenarios[scenarioIndex].steps[stepIndex][field] = value;
    onChange(newScenarios);
  };

  const removeStep = (scenarioIndex: number, stepIndex: number) => {
    const newScenarios = [...scenarios];
    newScenarios[scenarioIndex].steps.splice(stepIndex, 1);
    onChange(newScenarios);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">Scenarios</h3>
        <button
          onClick={addScenario}
          className="text-sm px-3 py-1.5 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-300 rounded-md hover:bg-violet-200 dark:hover:bg-violet-900/50 transition-colors flex items-center gap-1"
        >
          <Plus className="w-4 h-4" /> Add Scenario
        </button>
      </div>

      <AnimatePresence>
        {scenarios.map((scenario, sIndex) => (
          <motion.div
            key={scenario.id || sIndex}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-900/50"
          >
            <div className="flex justify-between items-center mb-4">
              <input
                type="text"
                value={scenario.name}
                onChange={(e) => updateScenarioName(sIndex, e.target.value)}
                className="bg-transparent font-medium text-slate-900 dark:text-slate-100 border-b border-transparent hover:border-slate-300 focus:border-violet-500 outline-none transition-colors"
                placeholder="Scenario Name"
              />
              <button
                onClick={() => removeScenario(sIndex)}
                className="text-slate-400 hover:text-red-500 transition-colors"
                aria-label="Remove Scenario"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 pl-4 border-l-2 border-slate-200 dark:border-slate-700">
              {scenario.steps.map((step: any, stepIndex: number) => (
                <div key={stepIndex} className="flex gap-2 items-start group">
                  <select
                    value={step.method}
                    onChange={(e) => updateStep(sIndex, stepIndex, 'method', e.target.value)}
                    className="w-24 px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded text-xs font-medium"
                  >
                    <option>GET</option>
                    <option>POST</option>
                    <option>PUT</option>
                    <option>DELETE</option>
                  </select>

                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={step.url}
                      onChange={(e) => updateStep(sIndex, stepIndex, 'url', e.target.value)}
                      className="w-full px-2 py-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded text-sm outline-none focus:border-violet-500"
                      placeholder="/api/resource"
                    />
                     <input
                      type="text"
                      value={step.name}
                      onChange={(e) => updateStep(sIndex, stepIndex, 'name', e.target.value)}
                      className="w-full px-2 py-1 bg-transparent border-none text-xs text-slate-500 placeholder-slate-400 focus:ring-0 p-0"
                      placeholder="Request Name (for reporting)"
                    />
                  </div>

                  <button
                    onClick={() => removeStep(sIndex, stepIndex)}
                    className="p-1.5 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}

              <button
                onClick={() => addStep(sIndex)}
                className="text-xs flex items-center gap-1 text-violet-600 dark:text-violet-400 hover:underline mt-2"
              >
                <Plus className="w-3 h-3" /> Add Step
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {scenarios.length === 0 && (
         <div className="text-center py-8 text-slate-500 dark:text-slate-400 text-sm border border-dashed border-slate-300 dark:border-slate-700 rounded-xl">
            No scenarios defined. Click "Add Scenario" to start.
         </div>
      )}
    </div>
  );
}
