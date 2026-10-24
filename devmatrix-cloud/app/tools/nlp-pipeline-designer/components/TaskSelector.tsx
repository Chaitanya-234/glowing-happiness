'use client';

import { useState } from 'react';
import { MessageSquare, Tag, Search, Languages, Zap, Brain, Database, FileText } from 'lucide-react';

const TASKS = [
  {
    id: 'classification',
    name: 'Text Classification',
    icon: Tag,
    description: 'Categorize text into predefined classes (e.g., Sentiment Analysis, Spam Detection).',
    color: 'text-blue-500 dark:text-purple-400',
    bg: 'bg-blue-50 dark:bg-purple-900/20',
    border: 'border-blue-200 dark:border-purple-500/30',
  },
  {
    id: 'ner',
    name: 'Named Entity Recognition',
    icon: Database,
    description: 'Extract entities like names, locations, and organizations from text.',
    color: 'text-green-500 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-500/30',
  },
  {
    id: 'qa',
    name: 'Question Answering',
    icon: MessageSquare,
    description: 'Answer questions based on a given context or knowledge base.',
    color: 'text-orange-500 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    border: 'border-orange-200 dark:border-orange-500/30',
  },
  {
    id: 'summarization',
    name: 'Summarization',
    icon: FileText,
    description: 'Generate concise summaries of long documents.',
    color: 'text-purple-500 dark:text-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-200 dark:border-purple-500/30',
  },
  {
    id: 'translation',
    name: 'Translation',
    icon: Languages,
    description: 'Translate text from one language to another.',
    color: 'text-teal-500 dark:text-teal-400',
    bg: 'bg-teal-50 dark:bg-teal-900/20',
    border: 'border-teal-200 dark:border-teal-500/30',
  },
  {
    id: 'generation',
    name: 'Text Generation',
    icon: Brain,
    description: 'Generate human-like text, complete sentences, or write stories.',
    color: 'text-pink-500 dark:text-pink-400',
    bg: 'bg-pink-50 dark:bg-pink-900/20',
    border: 'border-pink-200 dark:border-pink-500/30',
  },
  {
    id: 'ie',
    name: 'Information Extraction',
    icon: Search,
    description: 'Extract structured information like relations and events.',
    color: 'text-indigo-500 dark:text-indigo-400',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    border: 'border-indigo-200 dark:border-indigo-500/30',
  },
  {
    id: 'conversational',
    name: 'Conversational AI',
    icon: MessageSquare,
    description: 'Build chatbots and dialogue systems.',
    color: 'text-yellow-500 dark:text-yellow-400',
    bg: 'bg-yellow-50 dark:bg-yellow-900/20',
    border: 'border-yellow-200 dark:border-yellow-500/30',
  },
];

interface TaskSelectorProps {
  onSelect: (task: string) => void;
  selectedTask: string;
}

export default function TaskSelector({ onSelect, selectedTask }: TaskSelectorProps) {
  const [customTask, setCustomTask] = useState('');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {TASKS.map((task) => (
          <button
            key={task.id}
            onClick={() => onSelect(task.name)}
            className={`p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
              selectedTask === task.name
                ? `${task.border} ${task.bg} ring-2 ring-offset-2 ring-blue-500 dark:ring-purple-500 dark:ring-offset-black`
                : 'border-gray-200 dark:border-purple-500/20 hover:border-blue-300 dark:hover:border-purple-500/50 bg-white dark:bg-purple-900/5'
            }`}
          >
            <div className={`p-2 rounded-lg inline-block ${task.bg} mb-3`}>
              <task.icon className={`w-6 h-6 ${task.color}`} />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-purple-100">{task.name}</h3>
            <p className="text-sm text-gray-500 dark:text-purple-200/60 mt-1">{task.description}</p>
          </button>
        ))}
      </div>

      <div className="mt-6 p-6 bg-gray-50 dark:bg-purple-900/10 rounded-xl border border-gray-200 dark:border-purple-500/20">
        <h3 className="font-semibold text-gray-900 dark:text-purple-100 mb-2">Or describe a custom task</h3>
        <div className="flex gap-4">
          <input
            type="text"
            value={customTask}
            onChange={(e) => setCustomTask(e.target.value)}
            placeholder="E.g., Detect sarcasm in movie reviews..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-purple-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 focus:border-blue-500 dark:focus:border-purple-500 bg-white dark:bg-black text-gray-900 dark:text-purple-100 placeholder-gray-400 dark:placeholder-purple-200/30"
          />
          <button
            onClick={() => onSelect(customTask)}
            disabled={!customTask.trim()}
            className="px-6 py-2 bg-blue-600 dark:bg-purple-600 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Set Custom Task
          </button>
        </div>
      </div>
    </div>
  );
}
