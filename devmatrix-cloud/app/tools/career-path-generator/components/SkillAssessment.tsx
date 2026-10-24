import React, { useState } from 'react';
import { Target, Plus, X } from 'lucide-react';
import { GithubIntegration } from './GithubIntegration';

interface SkillAssessmentProps {
  onSubmit: (data: {
    skills: string[];
    experienceLevel: string;
    learningStyle: string;
    timeAvailability: string;
    githubData?: string;
  }) => void;
  isGenerating: boolean;
}

export function SkillAssessment({ onSubmit, isGenerating }: SkillAssessmentProps) {
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('Intermediate');
  const [learningStyle, setLearningStyle] = useState('Visual (Videos & Examples)');
  const [timeAvailability, setTimeAvailability] = useState('10-15 hours/week');
  const [githubData, setGithubData] = useState<string | undefined>(undefined);

  const addSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSubmit = () => {
    if (skills.length === 0 && !githubData) {
      alert('Please add at least one skill or connect GitHub.');
      return;
    }
    onSubmit({
      skills,
      experienceLevel,
      learningStyle,
      timeAvailability,
      githubData,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <Target className="w-6 h-6 text-purple-600 dark:text-purple-300" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Step 2: Assess Your Skills</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Tell us what you already know</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <GithubIntegration onAnalyze={setGithubData} />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Manual Skill Entry
              </label>
              <form onSubmit={addSkill} className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="e.g. React, Python, AWS"
                  className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg"
                />
                <button
                  type="submit"
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </form>

              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm">
                    {skill}
                    <button onClick={() => removeSkill(skill)} className="hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Current Experience Level
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg"
              >
                <option>Beginner (0-1 years)</option>
                <option>Intermediate (2-4 years)</option>
                <option>Senior (5+ years)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Preferred Learning Style
              </label>
              <select
                value={learningStyle}
                onChange={(e) => setLearningStyle(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg"
              >
                <option>Visual (Videos & Examples)</option>
                <option>Reading (Docs & Books)</option>
                <option>Hands-on (Projects & Labs)</option>
                <option>Mixed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time Availability
              </label>
              <select
                value={timeAvailability}
                onChange={(e) => setTimeAvailability(e.target.value)}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg"
              >
                <option>5-10 hours/week</option>
                <option>10-20 hours/week</option>
                <option>20-40 hours/week (Full-time)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isGenerating}
            className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors disabled:opacity-50"
          >
            {isGenerating ? 'Generating Roadmap...' : 'Generate Career Path'}
          </button>
        </div>
      </div>
    </div>
  );
}
