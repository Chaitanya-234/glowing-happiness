'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Toaster, toast } from 'sonner';
import { runCode } from '../actions';
import { getTemplate } from '../lib/code-templates';
import { encodeCode, decodeCode } from '../lib/share-utils';
import CodeEditor from './CodeEditor';
import LanguageSelector from './LanguageSelector';
import ThemeSelector from './ThemeSelector';
import EditorControls from './EditorControls';
import OutputPanel from './OutputPanel';
import InputPanel from './InputPanel';
import SavedSnippets from './SavedSnippets';
import { Share2, FileCode } from 'lucide-react';

function CompilerContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [languageId, setLanguageId] = useState<number>(71); // Default Python (71)
  const [theme, setTheme] = useState('vs-dark');
  const [code, setCode] = useState(getTemplate(71));
  const [stdin, setStdin] = useState('');
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [fontSize, setFontSize] = useState(14);

  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [memory, setMemory] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const langParam = searchParams.get('lang');
    const codeParam = searchParams.get('code');

    if (langParam) {
      const id = parseInt(langParam);
      if (!isNaN(id)) setLanguageId(id);
    }

    if (codeParam) {
      const decoded = decodeCode(codeParam);
      if (decoded) setCode(decoded);
    } else if (langParam && !codeParam) {
       // If only lang changed via URL but no code, reset to template?
       // Only if it's the initial load or explicit navigation.
       // For now, we trust the state unless code param exists.
       const id = parseInt(langParam);
       if (!isNaN(id)) setCode(getTemplate(id));
    }
  }, [searchParams]);

  const handleLanguageChange = (id: number) => {
    setLanguageId(id);
    // Only reset code if it's the default template of the previous language or empty
    // Actually, usually user wants a fresh start or keeps code.
    // Let's ask confirm if code length > 20
    if (code.length > 50 && code !== getTemplate(languageId)) {
        if (confirm('Switching language will reset your current code. Continue?')) {
            setCode(getTemplate(id));
        } else {
            // Revert selection? Hard to do with simple state update.
            // Ideally we change state only after confirmation.
            // For now, simpler: just change it. The previous language check is tricky.
            // Let's just update the code to the new template.
            // Refinement: Users might want to keep logic. But syntax differs.
             setLanguageId(id); // Already done above, but for clarity
             setCode(getTemplate(id));
             return;
        }
        // If they cancelled, we should revert languageId, but state update is async/batch.
        // Better logic: don't setLanguageId until confirmed.
    } else {
        setCode(getTemplate(id));
    }
  };

  // Safe language change wrapper
  const onLanguageSelect = (id: number) => {
      if (code.length > 50 && code !== getTemplate(languageId)) {
          if (confirm('Switching language will reset your code. Continue?')) {
             setLanguageId(id);
             setCode(getTemplate(id));
          }
      } else {
          setLanguageId(id);
          setCode(getTemplate(id));
      }
  };

  const handleRun = async () => {
  setIsLoading(true);
  setOutput(null);
  setError(null);
  setStatus(null);
  setTime(null);
  setMemory(null);

  try {
    const res = await fetch('/api/run-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source_code: code,
        language_id: languageId,
        stdin,
      }),
    });

    if (!res.ok) {
      throw new Error('Failed to run code');
    }

    const result = await res.json();

    if (result.stdout) setOutput(result.stdout);
    if (result.stderr) setError(result.stderr);
    if (result.compile_output) {
      setError(prev =>
        prev ? prev + '\n' + result.compile_output : result.compile_output
      );
    }

    setStatus(result.status?.description ?? null);
    setTime(result.time ?? null);
    setMemory(result.memory ?? null);

    if (
      !result.stdout &&
      !result.stderr &&
      !result.compile_output
    ) {
      setOutput('Program finished with no output.');
    }

  } catch (err) {
    console.error(err);
    setError('An unexpected error occurred.');
  } finally {
    setIsLoading(false);
  }
};


  const handleShare = () => {
    const encoded = encodeCode(code);
    const url = `${window.location.origin}/tools/online-compiler?lang=${languageId}&code=${encoded}`;
    navigator.clipboard.writeText(url);
    toast.success('Share link copied to clipboard!');
  };

  const handleLoadSnippet = (snippetCode: string, snippetLangId: number) => {
      setCode(snippetCode);
      setLanguageId(snippetLangId);
  };

  return (
    <div className="flex flex-col space-y-4">
      <Toaster position="top-right" />

      {/* Top Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
        <div className="flex flex-wrap items-center gap-4">
          <LanguageSelector selectedId={languageId} onChange={onLanguageSelect} />
          <ThemeSelector theme={theme} onChange={setTheme} />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="hidden md:block">
            <EditorControls
                onRun={handleRun}
                onClear={() => setCode('')}
                fontSize={fontSize}
                onFontSizeChange={setFontSize}
                isRunning={isLoading}
            />
          </div>
          <div className="md:hidden">
              {/* Show only non-run controls on mobile top bar if needed, or rely on bottom bar */}
              {/* For now, we'll hide the Run button in EditorControls via CSS or props, but since EditorControls bundles them, we wrap it in hidden md:block above and recreate simplified controls for mobile if needed, or just let the bottom bar handle Run. */}
          </div>

          <button
            onClick={handleShare}
            className="hidden md:flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </button>
          <SavedSnippets
            currentCode={code}
            currentLanguageId={languageId}
            onLoad={handleLoadSnippet}
          />
        </div>
      </div>

      {/* Mobile Fixed Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-50 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <button
            onClick={handleRun}
            disabled={isLoading}
            className={`flex-1 mr-4 flex justify-center items-center px-6 py-3 text-base font-bold text-white rounded-md transition-colors shadow-sm ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-neonGreen hover:bg-green-600'
            }`}
        >
            {isLoading ? 'Running...' : 'Run Code'}
        </button>
        <button
            onClick={handleShare}
            className="p-3 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors shadow-sm"
            aria-label="Share Code"
        >
            <Share2 className="w-6 h-6" />
        </button>
      </div>

      {/* Main Editor Area */}
      <div className="flex flex-col lg:flex-row gap-4 h-[800px] pb-24 md:pb-0">
        {/* Left: Editor */}
        <div className="lg:w-3/5 flex flex-col h-full space-y-2">
            <div className="flex-1 min-h-0">
                <CodeEditor
                    languageId={languageId}
                    theme={theme}
                    code={code}
                    onChange={setCode}
                    fontSize={fontSize}
                />
            </div>
            {/* Stdin Panel */}
            <div className="flex-shrink-0">
                <InputPanel
                    input={stdin}
                    onChange={setStdin}
                    isOpen={isInputOpen}
                    onToggle={() => setIsInputOpen(!isInputOpen)}
                />
            </div>
        </div>

        {/* Right: Output */}
        <div className="lg:w-2/5 h-full">
          <OutputPanel
            output={output}
            error={error}
            status={status}
            time={time}
            memory={memory}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}

export default function CompilerClient() {
    return (
        <Suspense fallback={<div className="p-8 text-center">Loading Compiler...</div>}>
            <CompilerContent />
        </Suspense>
    );
}
