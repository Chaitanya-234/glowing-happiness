'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApplicationInput from './ApplicationInput';
import AccessPatternAnalyzer from './AccessPatternAnalyzer';
import CacheStrategyDisplay from './CacheStrategyDisplay';
import { generateCacheStrategy } from '../actions';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function CacheOptimizerClient() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [strategy, setStrategy] = useState<any>(null);

  const [inputData, setInputData] = useState({
    name: '',
    type: '',
    dailyRequests: 0,
    concurrentUsers: 0,
    databaseSize: '',
    growthRate: '',
    techStack: {
      frontend: [],
      backend: [],
      database: [],
      caching: [],
    },
    performanceRequirements: {
      targetLatency: '',
      dataFreshness: '',
      consistency: '',
      budget: '',
    },
    accessPatterns: [
       {
        dataCategory: 'General API',
        readFrequency: 'Medium',
        writeFrequency: 'Medium',
        updatePattern: 'Hourly',
        sizeEstimate: '1KB',
        importance: 'Medium',
      }
    ],
    trafficPatterns: {
      peakTimes: [],
      geoDistribution: 'Single Region',
      seasonality: 'Steady',
      predictability: 'Predictable',
    },
  });

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      // Map inputData to the structure expected by the action
      const actionInput = {
         applicationDetails: {
             name: inputData.name,
             type: inputData.type,
             dailyRequests: inputData.dailyRequests,
             concurrentUsers: inputData.concurrentUsers,
             databaseSize: inputData.databaseSize,
             growthRate: inputData.growthRate,
             techStack: inputData.techStack,
             performanceRequirements: inputData.performanceRequirements
         },
         accessPatterns: inputData.accessPatterns,
         trafficPatterns: inputData.trafficPatterns
      };

      const result = await generateCacheStrategy(actionInput);
      setStrategy(result);
      setStep(3);
      toast.success('Cache strategy generated successfully!');
    } catch (error) {
      console.error('Error generating strategy:', error);
      toast.error('Failed to generate strategy. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setStrategy(null);
  };

  return (
    <div className="bg-black/40 backdrop-blur-xl border border-purple-500/10 rounded-2xl p-6 md:p-8 shadow-2xl">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all ${
                  step >= i ? 'bg-purple-500' : 'bg-purple-900/40'
                }`}
              />
            ))}
          </div>
          <span className="text-purple-200/40 text-sm font-mono">
            Step {step} of 3
          </span>
        </div>

        <h2 className="text-2xl font-bold text-purple-100">
            {step === 1 && 'Application Analysis'}
            {step === 2 && 'Access Patterns'}
            {step === 3 && 'Optimization Strategy'}
        </h2>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <ApplicationInput
              data={inputData}
              onChange={setInputData}
              onNext={handleNext}
            />
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
             {isLoading ? (
                 <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
                    <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Analyzing Architecture...</h3>
                    <p className="text-purple-200/60 max-w-md">
                        Our AI is evaluating your access patterns and designing a custom multi-tier caching strategy.
                    </p>
                 </div>
             ) : (
                <AccessPatternAnalyzer
                    data={inputData}
                    onChange={setInputData}
                    onNext={handleGenerate}
                    onBack={handleBack}
                />
             )}
          </motion.div>
        )}

        {step === 3 && strategy && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <CacheStrategyDisplay
              strategy={strategy}
              onReset={handleReset}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
