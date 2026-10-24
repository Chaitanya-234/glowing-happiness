'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Settings, Search, Languages, Download, ArrowRight, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

import CodeUploader from './CodeUploader';
import ConfigPanel from './ConfigPanel';
import LanguageSelector from './LanguageSelector';
import ExtractedStrings from './ExtractedStrings';
import TranslationEditor from './TranslationEditor';
import GeneratedOutput from './GeneratedOutput';

import { extractStrings, translateStrings, generateI18nSetup, ExtractedString, I18nConfig } from '../actions';

const STEPS = [
  { id: 'upload', title: 'Upload Code', icon: FileText },
  { id: 'config', title: 'Configuration', icon: Settings },
  { id: 'review', title: 'Review Strings', icon: Search },
  { id: 'translate', title: 'Translate', icon: Languages },
  { id: 'generate', title: 'Generate', icon: Download },
];

export default function I18nGeneratorClient() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // State
  const [code, setCode] = useState('');
  const [fileName, setFileName] = useState('');
  const [config, setConfig] = useState<I18nConfig>({
    library: 'i18next',
    sourceLanguage: 'en',
    targetLanguages: ['es'],
    features: {
      pluralization: true,
      rtl: false,
      namespaces: true,
    },
    outputFormat: 'json',
  });
  const [extractedStrings, setExtractedStrings] = useState<ExtractedString[]>([]);
  const [translations, setTranslations] = useState<Record<string, any>>({});
  const [generatedFiles, setGeneratedFiles] = useState<any[]>([]);

  const handleNext = async () => {
    const stepId = STEPS[currentStep].id;

    try {
      if (stepId === 'upload') {
        if (!code.trim()) {
          toast.error('Please upload or paste code first');
          return;
        }
      }

      if (stepId === 'config') {
         if (config.targetLanguages.length === 0) {
             toast.error('Please select at least one target language');
             return;
         }
         // Perform extraction
         setIsLoading(true);
         const result = await extractStrings(code, fileName || 'component.tsx');
         setIsLoading(false);

         if (result.success && result.strings) {
             setExtractedStrings(result.strings);
             toast.success(`Extracted ${result.strings.length} strings`);
         } else {
             toast.error('Failed to extract strings: ' + result.error);
             return; // Stop
         }
      }

      if (stepId === 'review') {
          if (extractedStrings.length === 0) {
              toast.error('No strings to translate');
              return;
          }
          // Pre-fill existing translations or empty
          const initialTranslations: Record<string, any> = {};
          config.targetLanguages.forEach(lang => {
              initialTranslations[lang] = {};
          });
          setTranslations(initialTranslations);
      }

      if (stepId === 'translate') {
          // Trigger AI translation for missing ones or all?
          // Let's offer a button inside the step instead of blocking "Next"
          // If user clicks next, we assume they are done editing.

          setIsLoading(true);
          // If translations are empty, auto-translate?
          // Better: The user should have used the "Translate with AI" button in the UI,
          // or we do it here if empty.

          // Let's generate the setup now.
          const result = await generateI18nSetup(config, extractedStrings, translations);
          setIsLoading(false);

          if (result.success && result.files) {
              setGeneratedFiles(result.files);
              toast.success('Files generated successfully');
          } else {
              toast.error('Failed to generate files');
              return;
          }
      }

      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    } catch (error) {
        setIsLoading(false);
        console.error(error);
        toast.error('An unexpected error occurred');
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleAiTranslate = async () => {
      setIsLoading(true);
      const result = await translateStrings(extractedStrings, config.targetLanguages, config.sourceLanguage);
      setIsLoading(false);

      if (result.success && result.translations) {
          setTranslations(result.translations);
          toast.success('Translations generated');
      } else {
          toast.error('Translation failed');
      }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex justify-between items-center relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-200 dark:bg-slate-700 -z-10" />
            {STEPS.map((step, index) => {
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;
                const Icon = step.icon;

                return (
                    <div key={step.id} className="flex flex-col items-center gap-2 bg-white dark:bg-[#0f172a] px-2">
                        <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${
                                isActive
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                    : isCompleted
                                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                                        : 'border-slate-200 dark:border-slate-700 text-slate-400'
                            }`}
                        >
                            {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                        </div>
                        <span className={`text-xs font-medium ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500'}`}>
                            {step.title}
                        </span>
                    </div>
                );
            })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="min-h-[600px] mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 0 && (
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Upload Code</h2>
                    <CodeUploader code={code} setCode={setCode} fileName={fileName} setFileName={setFileName} />
                </div>
            )}

            {currentStep === 1 && (
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Language Settings</h2>
                        <LanguageSelector config={config} setConfig={setConfig} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Configuration</h2>
                        <ConfigPanel config={config} setConfig={setConfig} />
                    </div>
                </div>
            )}

            {currentStep === 2 && (
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Review Extracted Strings</h2>
                    <ExtractedStrings strings={extractedStrings} setStrings={setExtractedStrings} />
                </div>
            )}

            {currentStep === 3 && (
                <div className="max-w-5xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Translation</h2>
                        <button
                            onClick={handleAiTranslate}
                            disabled={isLoading}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Languages className="w-4 h-4" />}
                            AI Auto-Translate All
                        </button>
                    </div>
                    <TranslationEditor
                        strings={extractedStrings}
                        translations={translations}
                        setTranslations={setTranslations}
                        targetLanguages={config.targetLanguages}
                    />
                </div>
            )}

            {currentStep === 4 && (
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Generated i18n Setup</h2>
                    <GeneratedOutput files={generatedFiles} />
                </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Actions */}
      <div className="flex justify-between max-w-6xl mx-auto pt-6 border-t border-slate-200 dark:border-slate-800">
        <button
            onClick={handleBack}
            disabled={currentStep === 0 || isLoading}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 0
                    ? 'opacity-0 pointer-events-none'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
        >
            <ArrowLeft className="w-4 h-4" />
            Back
        </button>

        {currentStep < STEPS.length - 1 && (
            <button
                onClick={handleNext}
                disabled={isLoading}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                    </>
                ) : (
                    <>
                        {currentStep === 1 ? 'Extract Strings' : currentStep === 3 ? 'Generate Files' : 'Next Step'}
                        <ArrowRight className="w-4 h-4" />
                    </>
                )}
            </button>
        )}
      </div>
    </div>
  );
}
