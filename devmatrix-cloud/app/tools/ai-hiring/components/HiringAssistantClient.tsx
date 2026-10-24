'use client';

import React, { useState } from 'react';
import JobDescriptionInput from './JobDescriptionInput';
import ResumeUploader from './ResumeUploader';
import { scoreCandidate, detectRedFlags, generateInterviewQuestions } from '../actions';
import RankedCandidates from './RankedCandidates';
import CandidateProfile from './CandidateProfile';
import HiringPipeline from './HiringPipeline';
import ComparisonTable from './ComparisonTable';
import ExportOptions from './ExportOptions';
import EmailTemplates from './EmailTemplates';
import DiversityInsights from './DiversityInsights';

// Placeholder types based on schemas
type JobData = any;
type Candidate = any;

export default function HiringAssistantClient() {
  const [step, setStep] = useState<'jd' | 'upload' | 'analysis' | 'dashboard'>('jd');
  const [viewMode, setViewMode] = useState<'list' | 'pipeline' | 'compare' | 'analytics'>('list');
  const [jobData, setJobData] = useState<JobData | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [emailCandidate, setEmailCandidate] = useState<Candidate | null>(null);
  const [processingStatus, setProcessingStatus] = useState('');

  const handleJobAnalyzed = (data: JobData) => {
    setJobData(data);
    setStep('upload');
  };

  const handleResumesUploaded = async (parsedResumes: any[]) => {
    setStep('analysis');
    setProcessingStatus('Scoring candidates against requirements...');

    const processedCandidates = [];

    for (let i = 0; i < parsedResumes.length; i++) {
      const resume = parsedResumes[i];
      setProcessingStatus(`Analyzing candidate ${i + 1} of ${parsedResumes.length}: ${resume.name}`);

      try {
        // Run scoring and red flag detection in parallel
        const [scoreResult, flagsResult, questionsResult] = await Promise.all([
          scoreCandidate(resume, jobData),
          detectRedFlags(resume),
          generateInterviewQuestions(resume, jobData)
        ]);

        processedCandidates.push({
          ...resume,
          scoring: scoreResult.success ? scoreResult.data : null,
          redFlags: flagsResult.success ? flagsResult.data : null,
          interviewQuestions: questionsResult.success ? questionsResult.data : null,
          status: 'New', // Initial pipeline stage
        });
      } catch (error) {
        console.error(`Error processing ${resume.name}:`, error);
        processedCandidates.push({
          ...resume,
          error: 'Failed to fully analyze candidate',
          status: 'Error'
        });
      }
    }

    setCandidates(processedCandidates);
    setStep('dashboard');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          AI Hiring Assistant
          <span className="ml-3 text-sm font-normal text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-900/20 px-3 py-1 rounded-full border border-violet-100 dark:border-violet-800">
            Beta
          </span>
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Automate resume screening, scoring, and interview prep with Gemini 2.5 Flash.
        </p>
      </div>

      {step === 'jd' && (
        <div className="max-w-3xl mx-auto">
          <JobDescriptionInput onAnalyze={handleJobAnalyzed} />
        </div>
      )}

      {step === 'upload' && (
        <div className="max-w-3xl mx-auto space-y-6">
           <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 mb-6">
             <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Selected Job: {jobData.jobTitle}</h3>
             <div className="flex flex-wrap gap-2">
               {jobData.mustHaveSkills.map((skill: string, i: number) => (
                 <span key={i} className="text-xs bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 px-2 py-1 rounded-md border border-violet-100 dark:border-violet-800">
                   {skill}
                 </span>
               ))}
             </div>
           </div>
           <ResumeUploader onUploadComplete={handleResumesUploaded} />
        </div>
      )}

      {step === 'analysis' && (
        <div className="max-w-xl mx-auto text-center py-20">
          <div className="w-16 h-16 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Analyzing Candidates</h2>
          <p className="text-slate-600 dark:text-slate-400">{processingStatus}</p>
        </div>
      )}

      {step === 'dashboard' && (
        <div>
          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
             <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="text-sm text-slate-500 dark:text-slate-400">Total Candidates</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{candidates.length}</p>
             </div>
             <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="text-sm text-slate-500 dark:text-slate-400">Strong Matches</p>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {candidates.filter(c => c.scoring?.overallScore >= 75).length}
                </p>
             </div>
             <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <p className="text-sm text-slate-500 dark:text-slate-400">Job Role</p>
                <p className="text-lg font-semibold text-slate-900 dark:text-white truncate">{jobData.jobTitle}</p>
             </div>
             <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center">
                 <button onClick={() => setStep('jd')} className="text-sm text-violet-600 hover:underline">
                    Start New Hiring Round
                 </button>
             </div>
          </div>

          {/* View Controls & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
             <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-900 text-violet-600 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
                >
                  List View
                </button>
                <button
                  onClick={() => setViewMode('pipeline')}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'pipeline' ? 'bg-white dark:bg-slate-900 text-violet-600 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
                >
                  Pipeline
                </button>
                <button
                  onClick={() => setViewMode('compare')}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'compare' ? 'bg-white dark:bg-slate-900 text-violet-600 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
                >
                  Compare
                </button>
                <button
                  onClick={() => setViewMode('analytics')}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${viewMode === 'analytics' ? 'bg-white dark:bg-slate-900 text-violet-600 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'}`}
                >
                  Analytics
                </button>
             </div>

             <div className="flex items-center gap-2">
               <ExportOptions candidates={candidates} jobTitle={jobData.jobTitle} />
             </div>
          </div>

          {/* Main Content Area */}
          <div className="min-h-[500px]">
            {viewMode === 'list' && (
              <RankedCandidates
                candidates={candidates}
                onSelectCandidate={setSelectedCandidate}
              />
            )}

            {viewMode === 'pipeline' && (
              <HiringPipeline
                candidates={candidates}
                onUpdateStatus={(id, status) => {
                  setCandidates(prev => prev.map(c => c.id === id ? { ...c, status } : c));
                }}
                onSelectCandidate={setSelectedCandidate}
              />
            )}

            {viewMode === 'compare' && (
              <ComparisonTable candidates={candidates} />
            )}

            {viewMode === 'analytics' && (
              <DiversityInsights candidates={candidates} />
            )}
          </div>
        </div>
      )}

      {selectedCandidate && (
        <CandidateProfile
          candidate={selectedCandidate}
          jobData={jobData}
          onClose={() => setSelectedCandidate(null)}
        />
      )}

      {emailCandidate && (
        <EmailTemplates
          candidate={emailCandidate}
          jobTitle={jobData.jobTitle}
          onClose={() => setEmailCandidate(null)}
        />
      )}
    </div>
  );
}
