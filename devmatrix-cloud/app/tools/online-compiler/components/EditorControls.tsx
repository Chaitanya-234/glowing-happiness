'use client';

import { Play, Trash2, Type } from 'lucide-react';

interface EditorControlsProps {
  onRun: () => void;
  onClear: () => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  isRunning: boolean;
}

export default function EditorControls({ onRun, onClear, fontSize, onFontSizeChange, isRunning }: EditorControlsProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onRun}
        disabled={isRunning}
        className={`flex items-center px-4 py-1.5 rounded-md text-white font-medium transition-colors ${
          isRunning
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
        }`}
      >
        <Play className="w-4 h-4 mr-2" />
        {isRunning ? 'Running...' : 'Run'}
      </button>

      <button
        onClick={onClear}
        className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
        title="Clear Code"
      >
        <Trash2 className="w-5 h-5" />
      </button>

      <div className="flex items-center space-x-2 border-l border-gray-300 dark:border-gray-700 pl-2 ml-2">
        <Type className="w-4 h-4 text-gray-500" />
        <select
          value={fontSize}
          onChange={(e) => onFontSizeChange(Number(e.target.value))}
          className="bg-transparent text-sm text-gray-700 dark:text-gray-300 focus:outline-none cursor-pointer"
        >
          {[12, 14, 16, 18, 20, 24, 28].map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
