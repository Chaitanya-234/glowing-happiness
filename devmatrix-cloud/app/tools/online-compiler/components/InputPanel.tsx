'use client';

interface InputPanelProps {
  input: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function InputPanel({ input, onChange, isOpen, onToggle }: InputPanelProps) {
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-900 mt-2">
      <div
        className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 cursor-pointer select-none"
        onClick={onToggle}
      >
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Standard Input (stdin)</span>
        <span className="text-gray-500">
          {isOpen ? '▼' : '▶'}
        </span>
      </div>

      {isOpen && (
        <textarea
          value={input}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter input for your program here..."
          className="w-full h-32 p-3 text-sm font-mono bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none resize-y"
        />
      )}
    </div>
  );
}
