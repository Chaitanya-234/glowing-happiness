'use client';

import { useState } from 'react';
import { FolderPlus, FolderOpen, Trash2, Check, Plus, Folder } from 'lucide-react';

interface ProjectManagerProps {
  projects: { id: string; name: string; count: number }[];
  currentProject: string;
  onSelectProject: (id: string) => void;
  onCreateProject: (name: string) => void;
  onDeleteProject: (id: string) => void;
}

export default function ProjectManager({
  projects, currentProject, onSelectProject, onCreateProject, onDeleteProject
}: ProjectManagerProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const handleCreate = () => {
    if (newProjectName.trim()) {
      onCreateProject(newProjectName.trim());
      setNewProjectName('');
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">Projects</h3>
          <button
            onClick={() => setIsCreating(true)}
            className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md text-slate-500 hover:text-violet-600 transition-colors"
          >
              <FolderPlus className="w-4 h-4" />
          </button>
      </div>

      <div className="space-y-1">
          {projects.map(project => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project.id)}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors group ${
                    currentProject === project.id
                        ? 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-medium'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                  <div className="flex items-center gap-2 truncate">
                      <Folder className={`w-4 h-4 ${currentProject === project.id ? 'fill-violet-200 dark:fill-violet-800' : ''}`} />
                      <span className="truncate max-w-[120px]">{project.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                      <span className="text-xs bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-500">
                          {project.count}
                      </span>
                      {project.id !== 'default' && (
                          <button
                            onClick={(e) => { e.stopPropagation(); onDeleteProject(project.id); }}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-opacity"
                          >
                              <Trash2 className="w-3 h-3" />
                          </button>
                      )}
                  </div>
              </div>
          ))}
      </div>

      {isCreating && (
          <div className="flex items-center gap-2 mt-2 bg-white dark:bg-slate-800 p-2 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm animate-in fade-in slide-in-from-top-1">
              <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Project Name"
                  autoFocus
                  className="flex-1 text-sm bg-transparent outline-none min-w-0"
                  onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              />
              <button onClick={handleCreate} className="text-green-600 hover:bg-green-50 rounded p-1">
                  <Check className="w-3 h-3" />
              </button>
          </div>
      )}
    </div>
  );
}
