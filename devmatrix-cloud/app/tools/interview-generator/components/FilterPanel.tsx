'use client';

import React from 'react';

export interface QuestionFilters {
    types: string[];
    difficulty: string[];
}

interface FilterPanelProps {
  filters: QuestionFilters;
  onFilterChange: (filters: QuestionFilters) => void;
}

const QUESTION_TYPES = ['Coding', 'System Design', 'Behavioral', 'Technical Knowledge', 'Scenario-Based'];
const DIFFICULTIES = ['Junior', 'Mid-level', 'Senior', 'Lead/Principal'];

export function FilterPanel({ filters, onFilterChange }: FilterPanelProps) {

  const toggleType = (type: string) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    onFilterChange({ ...filters, types: newTypes });
  };

  const toggleDifficulty = (diff: string) => {
    const newDiffs = filters.difficulty.includes(diff)
      ? filters.difficulty.filter(d => d !== diff)
      : [...filters.difficulty, diff];
    onFilterChange({ ...filters, difficulty: newDiffs });
  };

  return (
    <div className="bg-purple-900/10 p-4 rounded-xl border border-purple-500/20 mb-6 backdrop-blur-sm">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-purple-200 mb-3">Filter by Type</h4>
          <div className="flex flex-wrap gap-2">
            {QUESTION_TYPES.map(type => (
              <button
                key={type}
                onClick={() => toggleType(type)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  filters.types.includes(type)
                    ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-500/20'
                    : 'bg-purple-900/20 text-purple-300 border-purple-500/20 hover:bg-purple-800/40'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-purple-200 mb-3">Filter by Difficulty</h4>
          <div className="flex flex-wrap gap-2">
            {DIFFICULTIES.map(diff => (
              <button
                key={diff}
                onClick={() => toggleDifficulty(diff)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                  filters.difficulty.includes(diff)
                    ? 'bg-purple-600 text-white border-purple-500 shadow-md shadow-purple-500/20'
                    : 'bg-purple-900/20 text-purple-300 border-purple-500/20 hover:bg-purple-800/40'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
