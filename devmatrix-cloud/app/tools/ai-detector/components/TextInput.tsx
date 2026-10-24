'use client';

import { useState, useEffect } from 'react';
import { Trash, FileText, Clipboard } from 'lucide-react';

interface TextInputProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

export default function TextInput({ onAnalyze, isLoading }: TextInputProps) {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(text.length);
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    setWordCount(words);
  }, [text]);

  const handleClear = () => setText('');
  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
    } catch (err) {
      console.error('Failed to read clipboard', err);
    }
  };

  const loadSample = () => {
    setText("Artificial intelligence has revolutionized numerous industries, offering unprecedented opportunities for automation and efficiency. It is important to consider the ethical implications of deploying these technologies at scale. Moreover, the rapid advancement of machine learning algorithms necessitates a robust regulatory framework to ensure fairness and accountability. Furthermore, we must address the potential displacement of workers in certain sectors. It's worth noting that while AI can enhance productivity, it cannot replicate the nuanced understanding and emotional intelligence inherent to human decision-making. Therefore, a collaborative approach, often referred to as 'human-in-the-loop', is essential for maximizing the benefits of AI while mitigating its risks.");
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap justify-between items-center text-sm text-slate-500 dark:text-slate-400 gap-2">
        <div className="flex gap-4">
          <span className="font-medium text-slate-700 dark:text-slate-300">{wordCount} words</span>
          <span>{charCount} characters</span>
        </div>
        <div className="flex gap-3">
           <button
             onClick={loadSample}
             className="text-violet-600 hover:text-violet-700 dark:text-violet-400 hover:underline text-xs font-medium transition-colors"
           >
            Load Sample AI Text
          </button>
          <button
            onClick={handlePaste}
            className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
            title="Paste from clipboard"
          >
            <Clipboard className="w-3.5 h-3.5" /> Paste
          </button>
          <button
            onClick={handleClear}
            className="flex items-center gap-1 hover:text-red-500 transition-colors"
            title="Clear text"
          >
            <Trash className="w-3.5 h-3.5" /> Clear
          </button>
        </div>
      </div>

      <div className="relative group">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste text here to analyze for AI generation patterns... (Minimum 50 words recommended for accurate results)"
          className="w-full h-80 p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none resize-none transition-all shadow-sm group-hover:shadow-md text-base leading-relaxed"
          disabled={isLoading}
        />

        <div className="absolute bottom-5 right-5 z-10">
          <button
            onClick={() => onAnalyze(text)}
            disabled={isLoading || wordCount < 10}
            className="bg-violet-600 hover:bg-violet-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-violet-500/25 disabled:shadow-none disabled:cursor-not-allowed flex items-center gap-2 transform active:scale-95"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <FileText className="w-5 h-5" />
                Analyze Text
              </>
            )}
          </button>
        </div>
      </div>

      {wordCount < 50 && wordCount > 0 && (
        <p className="text-amber-600 dark:text-amber-400 text-sm flex items-center gap-2 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg border border-amber-200 dark:border-amber-800/50">
          <span className="text-lg">⚠️</span>
          Warning: Short texts (under 50 words) may produce less accurate results. 200+ words recommended.
        </p>
      )}
    </div>
  );
}
