'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConfigurationForm } from './ConfigurationForm';
import { QuestionDisplay } from './QuestionDisplay';
import { generateInterviewQuestions, InterviewConfig } from '../actions';
import { Loader2 } from 'lucide-react';
import { Question } from './QuestionCard';

export function InterviewGeneratorClient() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (config: InterviewConfig) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateInterviewQuestions(config);
      setQuestions(result.questions);
    } catch (err) {
      setError('Failed to generate questions. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQuestions([]);
    setError(null);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <AnimatePresence mode="wait">
        {questions.length === 0 ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-2xl mx-auto"
          >
            <div className="bg-purple-900/10 border border-purple-500/20 rounded-xl p-6 md:p-8 backdrop-blur-sm">
              <ConfigurationForm onGenerate={handleGenerate} isLoading={loading} />

              {loading && (
                <div className="mt-8 text-center space-y-3">
                  <div className="flex justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
                  </div>
                  <p className="text-purple-200/70 font-medium animate-pulse">
                    Analyzing role requirements and crafting custom questions...
                  </p>
                </div>
              )}

              {error && (
                <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-200 text-center text-sm">
                  {error}
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
            <div className="mb-6 flex justify-between items-center">
              <button
                onClick={handleReset}
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
              >
                ← Generate New Questions
              </button>
            </div>

            <QuestionDisplay questions={questions} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
