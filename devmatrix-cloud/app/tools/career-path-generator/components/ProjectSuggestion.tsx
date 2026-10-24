import React from 'react';
import { Layers, Clock, Award } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  skillsDemonstrated: string[];
  coreFeatures: string[];
  techStack: string[];
  estimatedTime: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export function ProjectSuggestion({ project, index }: { project: Project; index: number }) {
  const difficultyColor = {
    Beginner: 'text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400',
    Intermediate: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400',
    Advanced: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-xs font-bold tracking-wider text-gray-500 uppercase mb-1 block">Project #{index + 1}</span>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColor[project.difficulty]}`}>
          {project.difficulty}
        </span>
      </div>

      <p className="text-gray-600 dark:text-gray-300 mb-6">{project.description}</p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white mb-3">
            <Layers className="w-4 h-4 text-blue-500" /> Core Features
          </h4>
          <ul className="space-y-2">
            {project.coreFeatures.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div>
           <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white mb-3">
            <Award className="w-4 h-4 text-amber-500" /> Skills Demonstrated
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.skillsDemonstrated.map((skill, i) => (
              <span key={i} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>{project.estimatedTime}</span>
        </div>
        <div className="flex items-center gap-2">
           <span className="text-xs text-gray-400">Stack:</span>
           {project.techStack.map((tech, i) => (
             <span key={i} className="text-xs font-mono font-medium text-gray-600 dark:text-gray-400">
               {tech}
             </span>
           ))}
        </div>
      </div>
    </div>
  );
}
