'use client';

import { useState } from 'react';
import JSZip from 'jszip';
import { generateOnboardingPath } from '../actions';
import FileUploadZone from './FileUploadZone';
import LearningPathDisplay from './LearningPathDisplay';
import { Loader2, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Status = 'idle' | 'uploading' | 'parsing' | 'analyzing' | 'complete' | 'error';

interface ProcessingStep {
  id: string;
  label: string;
  status: 'pending' | 'processing' | 'complete';
}

export default function OnboardingGeneratorClient() {
  const [status, setStatus] = useState<Status>('idle');
  const [markdown, setMarkdown] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [steps, setSteps] = useState<ProcessingStep[]>([
    { id: 'upload', label: 'Reading ZIP file', status: 'pending' },
    { id: 'parse', label: 'Extracting codebase structure', status: 'pending' },
    { id: 'analyze', label: 'AI creating learning path', status: 'pending' },
  ]);

  const updateStep = (id: string, status: 'processing' | 'complete') => {
    setSteps(prev => prev.map(step => step.id === id ? { ...step, status } : step));
  };

  const handleFileUpload = async (file: File) => {
    if (!file || !file.name.endsWith('.zip')) {
      setError('Please upload a .zip file');
      return;
    }

    if (file.size > 50 * 1024 * 1024) { // 50MB limit
        setError('File size exceeds 50MB limit');
        return;
    }

    setStatus('uploading');
    setError(null);
    setSteps(prev => prev.map(s => ({ ...s, status: 'pending' })));

    try {
      // Step 1: Upload/Read
      updateStep('upload', 'processing');
      // Simulate slight delay for UI feel
      await new Promise(resolve => setTimeout(resolve, 500));
      updateStep('upload', 'complete');

      // Step 2: Parse
      setStatus('parsing');
      updateStep('parse', 'processing');

      const zip = new JSZip();
      const contents = await zip.loadAsync(file);

      const fileTree: string[] = [];
      let packageJson = '';
      let readme = '';
      let sampleFilesContent = '';
      let sampleCount = 0;

      // Process files
      const entries = Object.entries(contents.files);
      // Limit processing to prevent browser hang on massive zips
      const MAX_FILES_TO_LIST = 2000;

      for (const [relativePath, zipEntry] of entries) {
        if (fileTree.length < MAX_FILES_TO_LIST) {
            fileTree.push(relativePath);
        }

        if (zipEntry.dir) continue;

        const fileName = relativePath.split('/').pop()?.toLowerCase();

        // Extract key files
        if (fileName === 'package.json') {
          packageJson = await zipEntry.async('string');
        } else if (fileName === 'readme.md') {
          readme = await zipEntry.async('string');
        } else {
            // Sample source files (limit to ~10 non-minified, source files)
            if (sampleCount < 10 && !relativePath.includes('node_modules') && !relativePath.includes('dist') && !relativePath.includes('.git')) {
                const ext = fileName?.split('.').pop();
                if (['ts', 'tsx', 'js', 'jsx', 'py', 'java', 'go', 'rs', 'rb', 'php'].includes(ext || '')) {
                    const content = await zipEntry.async('string');
                    // Simple check to avoid binary or minified files
                    if (content.length < 20000 && !content.includes('\0')) {
                        sampleFilesContent += `\n\n### File: ${relativePath}\n\`\`\`${ext}\n${content.slice(0, 2000)}\n\`\`\``;
                        sampleCount++;
                    }
                }
            }
        }
      }

      updateStep('parse', 'complete');

      // Step 3: Analyze
      setStatus('analyzing');
      updateStep('analyze', 'processing');

      const result = await generateOnboardingPath(
        fileTree.slice(0, 1000).join('\n'), // Limit file tree size
        packageJson,
        readme,
        sampleFilesContent,
        {
            projectName: file.name.replace('.zip', ''),
            fileCount: entries.length,
            primaryLanguage: 'Detected from files' // We let AI infer this or we could count extensions
        }
      );

      if (result.success && result.markdown) {
        setMarkdown(result.markdown);
        updateStep('analyze', 'complete');
        setStatus('complete');
      } else {
        throw new Error(result.error || 'Generation failed');
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to process file');
      setStatus('error');
    }
  };

  const reset = () => {
    setStatus('idle');
    setMarkdown('');
    setError(null);
    setSteps(steps.map(s => ({ ...s, status: 'pending' })));
  };

  if (status === 'complete') {
    return <LearningPathDisplay markdown={markdown} onReset={reset} />;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Start Your Journey
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Upload your codebase ZIP file. We'll analyze the structure, dependencies, and key files to create a personalized learning path.
              </p>
            </div>

            <FileUploadZone onFileSelect={handleFileUpload} />

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 text-red-700 dark:text-red-400">
                <AlertCircle size={20} />
                <p>{error}</p>
              </div>
            )}
          </motion.div>
        )}

        {(status === 'uploading' || status === 'parsing' || status === 'analyzing' || status === 'error') && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-8"
            >
                <h3 className="text-xl font-bold mb-6 text-center">Generating Your Path</h3>

                <div className="space-y-6">
                    {steps.map((step) => (
                        <div key={step.id} className="flex items-center gap-4">
                            <div className={`
                                w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300
                                ${step.status === 'complete' ? 'bg-green-100 text-green-600' :
                                  step.status === 'processing' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}
                            `}>
                                {step.status === 'complete' ? <CheckCircle2 size={18} /> :
                                 step.status === 'processing' ? <Loader2 size={18} className="animate-spin" /> :
                                 <div className="w-2 h-2 rounded-full bg-current" />}
                            </div>
                            <div className="flex-1">
                                <p className={`font-medium ${step.status === 'pending' ? 'text-gray-400' : 'text-gray-900 dark:text-gray-200'}`}>
                                    {step.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {status === 'error' && (
                     <div className="mt-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-center">
                        <p className="text-red-700 dark:text-red-400 mb-4">{error}</p>
                        <button
                            onClick={reset}
                            className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
