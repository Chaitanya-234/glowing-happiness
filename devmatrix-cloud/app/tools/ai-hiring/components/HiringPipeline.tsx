'use client';

import React, { useState } from 'react';

interface HiringPipelineProps {
  candidates: any[];
  onUpdateStatus: (candidateId: string, newStatus: string) => void;
  onSelectCandidate: (candidate: any) => void;
}

const STAGES = ['New', 'Screening', 'Shortlisted', 'Interview', 'Offer', 'Rejected'];

export default function HiringPipeline({ candidates, onUpdateStatus, onSelectCandidate }: HiringPipelineProps) {
  const [draggedCandidateId, setDraggedCandidateId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, candidateId: string) => {
    setDraggedCandidateId(candidateId);
    e.dataTransfer.setData('text/plain', candidateId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, stage: string) => {
    e.preventDefault();
    const candidateId = e.dataTransfer.getData('text/plain');
    if (candidateId) {
      onUpdateStatus(candidateId, stage);
    }
    setDraggedCandidateId(null);
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'New': return 'border-blue-200 bg-blue-50/50 dark:border-blue-900/50 dark:bg-blue-900/10';
      case 'Screening': return 'border-indigo-200 bg-indigo-50/50 dark:border-indigo-900/50 dark:bg-indigo-900/10';
      case 'Shortlisted': return 'border-violet-200 bg-violet-50/50 dark:border-violet-900/50 dark:bg-violet-900/10';
      case 'Interview': return 'border-purple-200 bg-purple-50/50 dark:border-purple-900/50 dark:bg-purple-900/10';
      case 'Offer': return 'border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/50 dark:bg-emerald-900/10';
      case 'Rejected': return 'border-slate-200 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/30';
      default: return 'border-slate-200';
    }
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 h-[calc(100vh-200px)] min-w-full">
      {STAGES.map((stage) => {
        const stageCandidates = candidates.filter(c => c.status === stage || (!c.status && stage === 'New'));

        return (
          <div
            key={stage}
            className={`flex-shrink-0 w-80 rounded-xl border flex flex-col ${getStageColor(stage)} transition-colors`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage)}
          >
            <div className="p-3 font-semibold text-slate-700 dark:text-slate-300 border-b border-black/5 dark:border-white/5 flex justify-between items-center">
              {stage}
              <span className="text-xs bg-white dark:bg-slate-800 px-2 py-0.5 rounded-full shadow-sm">
                {stageCandidates.length}
              </span>
            </div>

            <div className="flex-1 p-2 space-y-2 overflow-y-auto">
              {stageCandidates.map((candidate) => (
                <div
                  key={candidate.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, candidate.id)}
                  onClick={() => onSelectCandidate(candidate)}
                  className="bg-white dark:bg-slate-900 p-3 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 cursor-move hover:shadow-md transition-all active:cursor-grabbing"
                >
                  <div className="font-medium text-slate-900 dark:text-white mb-1">{candidate.name}</div>
                  <div className="text-xs text-slate-500 mb-2 truncate">{candidate.experience?.[0]?.role}</div>

                  <div className="flex justify-between items-center">
                    <span className={`text-xs font-bold ${
                       candidate.scoring?.overallScore >= 75 ? 'text-emerald-600' :
                       candidate.scoring?.overallScore >= 60 ? 'text-amber-600' : 'text-red-600'
                    }`}>
                      {candidate.scoring?.overallScore || 0}% Match
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
