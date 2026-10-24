'use client';

import React, { useState, useEffect } from 'react';
import { JobDescriptionInput } from './JobDescriptionInput';
import { SkillAssessment } from './SkillAssessment';
import { SkillGapAnalysis } from './SkillGapAnalysis';
import { LearningRoadmap } from './LearningRoadmap';
import { ProjectSuggestion } from './ProjectSuggestion';
import { ProgressTracker } from './ProgressTracker';
import { ExportOptions } from './ExportOptions';
import { generateCareerPath } from '../actions';
import { CareerPathSchema } from '../../../../lib/ai-schemas';
import { z } from 'zod';
import { toast } from 'sonner';

type CareerPathData = z.infer<typeof CareerPathSchema>;

export function CareerPathClient() {
  const [step, setStep] = useState(1);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [careerPath, setCareerPath] = useState<CareerPathData | null>(null);
  const [completedWeeks, setCompletedWeeks] = useState<number[]>([]);

  // Load state from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('career-path-data');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed.careerPath) {
            setCareerPath(parsed.careerPath);
            setCompletedWeeks(parsed.completedWeeks || []);
            // Only jump to result if we have data
            setStep(3);
          }
        } catch (e) {
          console.error("Failed to load saved career path", e);
        }
      }
    }
  }, []);

  // Save state when it changes
  useEffect(() => {
    if (typeof window !== 'undefined' && careerPath) {
      localStorage.setItem('career-path-data', JSON.stringify({
        careerPath,
        completedWeeks
      }));
    }
  }, [careerPath, completedWeeks]);

  const handleJobAnalysis = (description: string) => {
    setJobDescription(description);
    setStep(2);
  };

  const handleSkillSubmit = async (data: any) => {
    setLoading(true);
    try {
      const result = await generateCareerPath({
        jobDescription,
        currentSkills: data.skills,
        experienceLevel: data.experienceLevel,
        learningStyle: data.learningStyle,
        timeAvailability: data.timeAvailability,
        githubData: data.githubData,
      });
      setCareerPath(result);
      setCompletedWeeks([]); // Reset progress for new path
      setStep(3);
      toast.success('Career path generated successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to generate career path. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleWeekCompletion = (weekNum: number) => {
    setCompletedWeeks(prev => {
      const newWeeks = prev.includes(weekNum)
        ? prev.filter(w => w !== weekNum)
        : [...prev, weekNum];

      // Show celebration toast on completion
      if (!prev.includes(weekNum)) {
        toast.success(`Week ${weekNum} completed! Keep it up! 🎉`);
      }

      return newWeeks;
    });
  };

  const resetPath = () => {
    if (window.confirm("Are you sure you want to start over? This will clear your current roadmap.")) {
      setCareerPath(null);
      setCompletedWeeks([]);
      setJobDescription('');
      setStep(1);
      localStorage.removeItem('career-path-data');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12 relative">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
          AI Career Path Generator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Turn any job description into a personalized step-by-step learning roadmap.
          Analyze gaps, get resources, and build portfolio projects that get you hired.
        </p>
        {step === 3 && (
            <button
                onClick={resetPath}
                className="absolute top-0 right-0 text-sm text-gray-500 hover:text-red-500 underline"
            >
                Start Over
            </button>
        )}
      </div>

      {step === 1 && (
        <JobDescriptionInput onAnalyze={handleJobAnalysis} isAnalyzing={false} />
      )}

      {step === 2 && (
        <SkillAssessment onSubmit={handleSkillSubmit} isGenerating={loading} />
      )}

      {step === 3 && careerPath && (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <SkillGapAnalysis data={careerPath.skillGapAnalysis} />
            <ProgressTracker
                totalWeeks={careerPath.learningRoadmap.totalDurationWeeks}
                completedWeeks={completedWeeks.length}
            />
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
               <h3 className="font-bold mb-4">Export</h3>
               <ExportOptions data={careerPath} />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Learning Roadmap</h2>
              <LearningRoadmap
                data={careerPath.learningRoadmap}
                completedWeeks={completedWeeks}
                onToggleWeek={toggleWeekCompletion}
              />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Portfolio Projects</h2>
              <div className="space-y-6">
                {careerPath.portfolioProjects.map((project, i) => (
                  <ProjectSuggestion key={i} project={project} index={i} />
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
