'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import { Loader2, BookOpen, Clock, Users, ChevronDown, ChevronUp, Download, FileJson, GraduationCap, Lightbulb, Code2, HelpCircle, Package, Search } from 'lucide-react';

type CourseCurriculum = {
  title: string;
  targetAudience: string;
  duration: string;
  seoMeta: {
    description: string;
    keywords: string[];
  };
  scormMetadata: {
    scormVersion: '1.2' | '2004';
    manifestId: string;
    organization: string;
  };
  modules: {
    title: string;
    duration: string;
    lessons: {
      title: string;
      type: 'Video' | 'Reading' | 'Quiz' | 'Exercise' | 'Code';
      contentOutline: string;
      codeExample?: string;
      solutionCode?: string;
    }[];
  }[];
  finalQuiz: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
};

const PRESETS = [
  { label: 'Spring Boot Devs', topic: 'Advanced Spring Boot with Cloud Native', audience: 'Java Developers' },
  { label: 'React Beginners', topic: 'Modern React from Scratch', audience: 'Beginner Web Developers' },
  { label: 'Python Data Science', topic: 'Python for Data Analysis and ML', audience: 'Data Analysts' },
  { label: 'DevOps Essentials', topic: 'Docker & Kubernetes Fundamentals', audience: 'System Admins & Developers' },
];

export default function CourseCreatorClient() {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [duration, setDuration] = useState('');
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CourseCurriculum | null>(null);
  const [error, setError] = useState('');
  const [expandedModule, setExpandedModule] = useState<number | null>(0);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const prompt = `Create a detailed course curriculum for a course about "${topic}".
      Target audience: ${audience || 'General'}.
      Total duration: ${duration || 'Self-paced'}.
      Context/Notes provided: "${context}".
      Include 4-6 modules with 3-4 lessons each.
      Ensure you include specific coding examples if the topic is technical.
      Generate SEO metadata, FAQs, and SCORM package metadata.`;

      const data = await generateStructuredContent(prompt, 'course_creator');
      setResult(data as CourseCurriculum);
    } catch (err) {
      setError('Failed to generate course content. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generateIdea = () => {
    const ideas = [
      'Microservices with Go',
      'Rust for Systems Programming',
      'AI Engineering with Python',
      'Full Stack Next.js SaaS',
      'Cybersecurity Fundamentals',
      'Mobile App Dev with Flutter',
    ];
    setTopic(ideas[Math.floor(Math.random() * ideas.length)]);
  };

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setTopic(preset.topic);
    setAudience(preset.audience);
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${result.title.replace(/\s+/g, '-').toLowerCase()}-curriculum.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block p-3 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/30 mb-4"
          >
            <GraduationCap className="w-10 h-10 text-blue-400" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            AI Course Creator
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Turn any topic into a professional course curriculum in seconds.
            Includes modules, lesson plans, quizzes, and SCORM metadata.
          </p>
        </div>

        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl space-y-6"
        >
          {/* Presets */}
          <div className="flex flex-wrap gap-2">
             <span className="text-sm font-medium text-gray-400 self-center mr-2">Quick Presets:</span>
             {PRESETS.map((p, i) => (
               <button
                 key={i}
                 onClick={() => applyPreset(p)}
                 className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 transition-colors"
               >
                 {p.label}
               </button>
             ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-300">Course Topic</label>
              <div className="relative">
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Advanced React Patterns, Introduction to Pottery..."
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
                <button
                  onClick={generateIdea}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-yellow-400 transition-colors"
                  title="Generate Random Idea"
                >
                  <Lightbulb className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Target Audience</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="e.g. Senior Developers"
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-4 pl-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Total Duration</label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 4 weeks, 10 hours"
                  className="w-full bg-black/50 border border-white/10 rounded-xl p-4 pl-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-300">Context / Notes (Optional)</label>
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Paste existing content summaries, specific requirements, or rough notes here..."
                className="w-full bg-black/50 border border-white/10 rounded-xl p-4 h-24 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !topic}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 font-bold text-lg hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Designing Curriculum...
              </>
            ) : (
              <>
                <BookOpen className="w-5 h-5" />
                Generate Course
              </>
            )}
          </button>

          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-center">
              {error}
            </div>
          )}
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Course Header */}
              <div className="p-8 rounded-3xl bg-gradient-to-b from-blue-900/20 to-transparent border border-blue-500/20 text-center space-y-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-50">
                    <Package className="w-24 h-24 text-blue-500/20" />
                </div>
                <h2 className="text-3xl font-bold text-white relative z-10">{result.title}</h2>
                <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-300 relative z-10">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
                    <Users className="w-4 h-4" /> {result.targetAudience}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {result.duration}
                  </span>
                   <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-2" title="SCORM Version">
                    <Package className="w-4 h-4" /> {result.scormMetadata.scormVersion}
                  </span>
                </div>
                <p className="text-gray-400 max-w-2xl mx-auto text-sm italic border-t border-white/10 pt-4 mt-4">
                  "{result.seoMeta.description}"
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {result.seoMeta.keywords.slice(0, 5).map((k, i) => (
                        <span key={i} className="text-xs text-blue-400 bg-blue-400/10 px-2 py-1 rounded">#{k}</span>
                    ))}
                </div>
              </div>

              {/* Modules Accordion */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <h3 className="text-xl font-bold text-gray-200">Curriculum Modules</h3>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Download className="w-4 h-4" /> Export JSON
                  </button>
                </div>

                {result.modules.map((module, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedModule(expandedModule === idx ? null : idx)}
                      className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors text-left"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-1 rounded text-xs font-bold bg-blue-500/20 text-blue-400">
                            Module {idx + 1}
                          </span>
                          <span className="text-gray-400 text-sm">{module.duration}</span>
                        </div>
                        <h4 className="text-lg font-semibold text-white">{module.title}</h4>
                      </div>
                      {expandedModule === idx ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
                    </button>

                    <AnimatePresence>
                      {expandedModule === idx && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-6 pt-0 border-t border-white/10 space-y-4">
                            {module.lessons.map((lesson, lIdx) => (
                              <div key={lIdx} className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
                                <div className="flex items-center justify-between">
                                  <h5 className="font-medium text-blue-200">{lesson.title}</h5>
                                  <span className={`text-xs px-2 py-1 rounded border ${
                                      lesson.type === 'Code' ? 'bg-purple-500/20 border-purple-500/30 text-purple-300' :
                                      lesson.type === 'Quiz' ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300' :
                                      'bg-white/10 border-white/5 text-gray-400'
                                  }`}>
                                    {lesson.type}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                  {lesson.contentOutline}
                                </p>
                                {lesson.codeExample && (
                                    <div className="mt-3 p-3 rounded bg-black/50 border border-white/10 text-xs font-mono text-gray-300 overflow-x-auto">
                                        <div className="flex items-center gap-2 mb-2 text-gray-500">
                                            <Code2 className="w-3 h-3" /> Code Example
                                        </div>
                                        <pre>{lesson.codeExample}</pre>
                                    </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              {/* Grid: Quiz & FAQ */}
              <div className="grid md:grid-cols-2 gap-6">
                  {/* Quiz Section */}
                  <div className="p-6 rounded-3xl bg-purple-900/10 border border-purple-500/20 space-y-6">
                    <h3 className="text-xl font-bold text-purple-200 flex items-center gap-2">
                      <FileJson className="w-5 h-5" /> Final Quiz
                    </h3>
                    <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                      {result.finalQuiz.map((q, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-black/40 border border-purple-500/10 space-y-3">
                          <p className="font-medium text-gray-200 text-sm">
                            <span className="text-purple-400 mr-2">{idx + 1}.</span>
                            {q.question}
                          </p>
                          <div className="space-y-1 pl-6">
                            {q.options.map((opt, oIdx) => (
                              <div
                                key={oIdx}
                                className={`text-xs ${oIdx === q.correctAnswer ? 'text-green-400 font-semibold' : 'text-gray-500'}`}
                              >
                                • {opt}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* FAQ Section */}
                  <div className="p-6 rounded-3xl bg-blue-900/10 border border-blue-500/20 space-y-6">
                    <h3 className="text-xl font-bold text-blue-200 flex items-center gap-2">
                      <HelpCircle className="w-5 h-5" /> Frequently Asked Questions
                    </h3>
                    <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
                        {result.faq.map((f, idx) => (
                            <div key={idx} className="p-4 rounded-xl bg-black/40 border border-blue-500/10 space-y-2">
                                <p className="font-medium text-blue-100 text-sm">{f.question}</p>
                                <p className="text-xs text-gray-400 leading-relaxed">{f.answer}</p>
                            </div>
                        ))}
                    </div>
                  </div>
              </div>

              {/* SCORM Info Footer */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-500 font-mono text-center">
                SCORM Manifest ID: {result.scormMetadata.manifestId} | Org: {result.scormMetadata.organization}
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
