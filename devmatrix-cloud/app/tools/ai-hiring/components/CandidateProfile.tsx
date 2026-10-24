'use client';

import React, { useState } from 'react';
import CandidateScorer from './CandidateScorer';
import SkillMatcher from './SkillMatcher';
import RedFlagDetector from './RedFlagDetector';

interface CandidateProfileProps {
  candidate: any;
  jobData: any;
  onClose: () => void;
}

export default function CandidateProfile({ candidate, jobData, onClose }: CandidateProfileProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'resume' | 'analysis'>('overview');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 w-full max-w-6xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden relative border border-slate-200 dark:border-slate-800">

        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-start bg-white dark:bg-slate-900 z-10">
          <div className="flex gap-4">
             <div className="w-16 h-16 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center text-2xl font-bold">
               {candidate.name.charAt(0)}
             </div>
             <div>
               <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{candidate.name}</h2>
               <p className="text-slate-500 dark:text-slate-400 text-sm">
                 {candidate.contact.email} • {candidate.contact.location}
               </p>
               <div className="flex gap-2 mt-2">
                 {candidate.contact.linkedin && (
                   <a href={candidate.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded hover:underline">
                     LinkedIn
                   </a>
                 )}
                 {candidate.contact.github && (
                   <a href={candidate.contact.github} target="_blank" rel="noopener noreferrer" className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded hover:underline">
                     GitHub
                   </a>
                 )}
               </div>
             </div>
          </div>

          <div className="flex gap-3">
             <div className="text-right mr-4">
                <div className="text-3xl font-bold text-violet-600 dark:text-violet-400">{candidate.scoring?.overallScore}%</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Match Score</div>
             </div>
             <button
               onClick={onClose}
               className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 p-2 rounded-full transition-colors h-10 w-10 flex items-center justify-center"
             >
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-50 dark:bg-slate-950/50">
          {['overview', 'resume', 'analysis'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-3 text-sm font-medium capitalize border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-violet-600 text-violet-600 dark:text-violet-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50 dark:bg-black/20">

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               <div className="lg:col-span-2 space-y-6">
                 {/* Experience Summary */}
                 <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                   <h3 className="font-bold text-lg mb-4">Summary</h3>
                   <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                     {candidate.summary}
                   </p>
                 </div>

                 {/* Skills Matrix */}
                 <SkillMatcher
                   skills={candidate.scoring?.scoreBreakdown.skills.details}
                   jobSkills={{ mustHave: jobData.mustHaveSkills, niceToHave: jobData.niceToHaveSkills }}
                 />
               </div>

               <div className="space-y-6">
                 {/* Score Card */}
                 <CandidateScorer
                   overallScore={candidate.scoring?.overallScore}
                   matchLevel={candidate.scoring?.matchLevel}
                   breakdown={candidate.scoring?.scoreBreakdown}
                 />

                 {/* Quick Recommendation */}
                 <div className="bg-violet-50 dark:bg-violet-900/10 p-5 rounded-xl border border-violet-100 dark:border-violet-800">
                    <h3 className="font-bold text-violet-900 dark:text-violet-100 mb-2 flex items-center gap-2">
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                       AI Recommendation
                    </h3>
                    <p className="text-sm text-violet-800 dark:text-violet-200 mb-3">
                      {candidate.scoring?.recommendation}
                    </p>
                    <div className="space-y-1">
                      {candidate.scoring?.interviewFocus.slice(0, 3).map((focus: string, i: number) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-violet-700 dark:text-violet-300">
                           <span className="mt-0.5">•</span>
                           {focus}
                        </div>
                      ))}
                    </div>
                 </div>
               </div>
            </div>
          )}

          {activeTab === 'resume' && (
             <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-4xl mx-auto min-h-full">
                {/* Resume Content Structured View */}

                <div className="mb-8">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b pb-2">Experience</h3>
                  <div className="space-y-6">
                    {candidate.experience.map((exp: any, i: number) => (
                      <div key={i} className="relative pl-4 border-l-2 border-slate-200 dark:border-slate-700">
                         <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-900"></div>
                         <h4 className="font-bold text-slate-800 dark:text-slate-100">{exp.role}</h4>
                         <div className="text-sm text-slate-500 mb-2 flex justify-between">
                            <span>{exp.company}</span>
                            <span>{exp.startDate} - {exp.endDate} ({exp.duration})</span>
                         </div>
                         <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{exp.description}</p>
                         <div className="flex flex-wrap gap-1">
                            {exp.technologies?.map((tech: string, t: number) => (
                              <span key={t} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded">
                                {tech}
                              </span>
                            ))}
                         </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b pb-2">Education</h3>
                  <div className="space-y-4">
                    {candidate.education.map((edu: any, i: number) => (
                      <div key={i}>
                         <h4 className="font-bold text-slate-800 dark:text-slate-100">{edu.degree}</h4>
                         <div className="text-sm text-slate-500">
                            {edu.institution}, {edu.graduationYear}
                         </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                   <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 border-b pb-2">Projects</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     {candidate.projects?.map((proj: any, i: number) => (
                       <div key={i} className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                          <h4 className="font-bold text-sm mb-1">{proj.name}</h4>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">{proj.description}</p>
                          <div className="flex flex-wrap gap-1">
                             {proj.technologies?.map((tech: string, t: number) => (
                               <span key={t} className="text-[10px] bg-white dark:bg-slate-800 border px-1 rounded">
                                 {tech}
                               </span>
                             ))}
                          </div>
                       </div>
                     ))}
                   </div>
                </div>
             </div>
          )}

          {activeTab === 'analysis' && (
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RedFlagDetector
                  redFlags={candidate.redFlags?.redFlags || []}
                  greenFlags={candidate.redFlags?.greenFlags || []}
                />

                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                   <h3 className="text-lg font-bold mb-4">Interview Questions</h3>
                   <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-violet-600 dark:text-violet-400 text-sm uppercase tracking-wider mb-3">Technical</h4>
                        <ul className="space-y-4">
                          {candidate.interviewQuestions?.technicalQuestions?.slice(0, 3).map((q: any, i: number) => (
                            <li key={i} className="text-sm">
                              <p className="font-medium text-slate-800 dark:text-slate-200 mb-1">Q: {q.question}</p>
                              <p className="text-slate-500 italic text-xs">Look for: {q.expectedAnswer}</p>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold text-amber-600 dark:text-amber-400 text-sm uppercase tracking-wider mb-3">Behavioral</h4>
                        <ul className="space-y-4">
                          {candidate.interviewQuestions?.behavioralQuestions?.slice(0, 2).map((q: any, i: number) => (
                            <li key={i} className="text-sm">
                              <p className="font-medium text-slate-800 dark:text-slate-200 mb-1">Q: {q.question}</p>
                              <p className="text-slate-500 italic text-xs">Assess: {q.purpose}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                   </div>
                </div>
             </div>
          )}

        </div>
      </div>
    </div>
  );
}
