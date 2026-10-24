'use client';

interface OutputPanelProps {
  output: string | null;
  error: string | null;
  status: string | null;
  time: string | null;
  memory: number | null;
  isLoading: boolean;
}

export default function OutputPanel({ output, error, status, time, memory, isLoading }: OutputPanelProps) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Output</span>
        {status && (
          <div className="flex items-center space-x-3 text-xs">
            <span className={status === 'Accepted' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>
              {status}
            </span>
            {time && <span className="text-gray-500 dark:text-gray-400">{time}s</span>}
            {memory && <span className="text-gray-500 dark:text-gray-400">{memory}KB</span>}
          </div>
        )}
      </div>

      <div className="flex-1 p-4 overflow-auto font-mono text-sm">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-gray-500 animate-pulse">
            Compiling and Executing...
          </div>
        ) : (
          <>
            {error && (
              <pre className="text-red-600 dark:text-red-400 whitespace-pre-wrap mb-4">
                {error}
              </pre>
            )}
            {output && (
              <pre className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                {output}
              </pre>
            )}
            {!output && !error && !status && (
              <div className="text-gray-400 dark:text-gray-500 italic">
                Run code to see output here...
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
