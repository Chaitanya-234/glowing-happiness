import React, { useState } from 'react';
import { Calendar, ChevronDown, ChevronRight, CheckCircle2, Square, CheckSquare } from 'lucide-react';
import { CareerPathSchema } from '../../../../lib/ai-schemas';
import { z } from 'zod';
import { ResourceCard } from './ResourceCard';

type LearningRoadmapData = z.infer<typeof CareerPathSchema>['learningRoadmap'];

interface LearningRoadmapProps {
  data: LearningRoadmapData;
  completedWeeks: number[];
  onToggleWeek: (weekNum: number) => void;
}

export function LearningRoadmap({ data, completedWeeks, onToggleWeek }: LearningRoadmapProps) {
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([1]);

  const toggleExpand = (weekNum: number, e: React.MouseEvent) => {
    // Prevent expanding when clicking the checkbox
    if ((e.target as HTMLElement).closest('button.checkbox-btn')) return;

    setExpandedWeeks(prev =>
      prev.includes(weekNum)
        ? prev.filter(w => w !== weekNum)
        : [...prev, weekNum]
    );
  };

  return (
    <div className="space-y-8">
      {/* Phases Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.phases.map((phase, i) => (
          <div key={i} className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1 block">Phase {i + 1}</span>
            <h4 className="font-bold text-gray-900 dark:text-white">{phase.name}</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{phase.weeks} weeks</p>
          </div>
        ))}
      </div>

      {/* Weekly Breakdown */}
      <div className="space-y-4">
        {data.weeks.map((week) => {
          const isCompleted = completedWeeks.includes(week.weekNumber);

          return (
            <div key={week.weekNumber} className={`rounded-xl border overflow-hidden shadow-sm transition-all ${isCompleted ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}>
              <div
                onClick={(e) => toggleExpand(week.weekNumber, e)}
                className="w-full flex items-center justify-between p-5 cursor-pointer hover:bg-opacity-80 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => onToggleWeek(week.weekNumber)}
                    className="checkbox-btn flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    title={isCompleted ? "Mark as incomplete" : "Mark as complete"}
                  >
                     {isCompleted ? (
                       <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center">
                         <CheckCircle2 className="w-6 h-6" />
                       </div>
                     ) : (
                       <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                         {week.weekNumber}
                       </div>
                     )}
                  </button>

                  <div>
                    <h3 className={`text-lg font-bold ${isCompleted ? 'text-green-800 dark:text-green-300' : 'text-gray-900 dark:text-white'}`}>
                      {week.theme}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                      <Calendar className="w-3 h-3" /> {week.timeCommitment}
                    </p>
                  </div>
                </div>
                {expandedWeeks.includes(week.weekNumber) ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </div>

              {expandedWeeks.includes(week.weekNumber) && (
                <div className="p-5 pt-0 border-t border-gray-100 dark:border-gray-700">
                  <div className="mt-4 grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Objectives</h4>
                      <ul className="space-y-2 mb-6">
                        {week.objectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {obj}
                          </li>
                        ))}
                      </ul>

                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Topics</h4>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {week.topics.map((topic, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md text-xs font-medium">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Recommended Resources</h4>
                      <div className="space-y-3">
                        {week.resources.map((resource, i) => (
                          <ResourceCard key={i} resource={resource} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                    <h4 className="text-sm font-bold text-green-800 dark:text-green-300 mb-1">Weekly Milestone</h4>
                    <p className="text-sm text-green-700 dark:text-green-400">{week.milestone}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
