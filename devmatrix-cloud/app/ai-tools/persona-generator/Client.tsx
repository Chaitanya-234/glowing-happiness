'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { Loader2, User, MapPin, Briefcase, Target, Heart, MessageCircle } from 'lucide-react';

type Persona = {
  name: string;
  role: string;
  demographics: {
    age: string;
    location: string;
    education: string;
  };
  bio: string;
  painPoints: string[];
  goals: string[];
  preferredChannels: string[];
};

export default function PersonaGeneratorClient() {
  const [product, setProduct] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Persona | null>(null);

  const handleGenerate = async () => {
    if (!product) return;
    setLoading(true);
    setResult(null);

    try {
      const prompt = `Create a detailed user persona for a product described as: "${product}".
      Include demographics, psychographics, and goals.`;

      const data = await generateStructuredContent(prompt, 'persona');
      setResult(data as Persona);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 mb-4"
          >
            <User className="w-8 h-8 text-orange-400" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-400 to-pink-400">
            User Persona Generator
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-lg">
            Understand your audience better. Generate detailed user personas for your product in seconds.
          </p>
        </div>

        {/* Input */}
        <div className="bg-white/5 border border-white/10 p-2 rounded-2xl flex flex-col md:flex-row gap-2">
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Describe your product (e.g. A fitness app for busy moms)"
            className="flex-1 bg-transparent px-6 py-4 text-white placeholder-gray-500 focus:outline-none"
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !product}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-600 to-red-600 font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 min-w-[160px]"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Generate'}
          </button>
        </div>

        {/* Result Card */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white text-black rounded-3xl overflow-hidden shadow-2xl shadow-orange-900/20"
            >
              {/* Card Header with Pattern */}
              <div className="h-32 bg-gradient-to-r from-orange-500 to-red-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                <div className="absolute -bottom-16 left-8 p-1 bg-white rounded-full">
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-4xl border-4 border-white shadow-lg overflow-hidden relative">
                    {/* Abstract Avatar Placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400"></div>
                    <span className="relative z-10 text-white font-bold">{result.name.charAt(0)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-20 px-8 pb-8 grid md:grid-cols-3 gap-8">
                {/* Left Column: Bio & Demographics */}
                <div className="md:col-span-1 space-y-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{result.name}</h2>
                    <p className="text-lg text-gray-500 font-medium">{result.role}</p>
                  </div>

                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" /> {result.demographics.age} years old
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" /> {result.demographics.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-400" /> {result.demographics.education}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl">
                    <p className="text-gray-600 italic text-sm leading-relaxed">"{result.bio}"</p>
                  </div>
                </div>

                {/* Right Column: Details */}
                <div className="md:col-span-2 grid md:grid-cols-2 gap-6">

                  {/* Goals */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2 uppercase tracking-wide text-sm">
                      <Target className="w-4 h-4 text-green-500" /> Goals & Motivations
                    </h3>
                    <ul className="space-y-2">
                      {result.goals.map((g, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></span>
                          {g}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pain Points */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2 uppercase tracking-wide text-sm">
                      <Heart className="w-4 h-4 text-red-500" /> Frustrations
                    </h3>
                    <ul className="space-y-2">
                      {result.painPoints.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Channels */}
                  <div className="md:col-span-2 pt-4 border-t border-gray-100">
                     <h3 className="font-bold text-gray-900 flex items-center gap-2 uppercase tracking-wide text-sm mb-3">
                      <MessageCircle className="w-4 h-4 text-blue-500" /> Preferred Channels
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {result.preferredChannels.map((c, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
