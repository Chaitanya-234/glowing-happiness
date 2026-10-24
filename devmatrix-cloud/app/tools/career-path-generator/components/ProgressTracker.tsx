import React from 'react';

interface ProgressTrackerProps {
  totalWeeks: number;
  completedWeeks: number;
}

export function ProgressTracker({ totalWeeks, completedWeeks }: ProgressTrackerProps) {
  const percentage = Math.round((completedWeeks / totalWeeks) * 100);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900 dark:text-white">Your Progress</h3>
        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{percentage}%</span>
      </div>

      <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 mb-4">
        <div
          className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>{completedWeeks} of {totalWeeks} weeks completed</span>
        <span>{totalWeeks - completedWeeks} weeks remaining</span>
      </div>
    </div>
  );
}
