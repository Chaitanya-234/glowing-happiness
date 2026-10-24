'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Target, Clock, Palette, Sparkles, Loader2, Save, Download, ChevronDown, ChevronUp, Code, HelpCircle, CheckCircle, Search, UploadCloud, FileText, X } from 'lucide-react';
import { generateCourseOutline } from '../actions';
import { toast } from 'sonner';

interface Lesson {
  title: string;
  duration: string;
  objectives: string[];
  topics: string[];
}

interface Module {
  title: string;
  duration: string;
  lessons: Lesson[];
}

interface Quiz {
  moduleTitle: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
}

interface CodingExercise {
  moduleTitle: string;
  title: string;
  description: string;
  starterCode: string;
  solution: string;
  hints: string[];
}

interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
}

interface FAQ {
  question: string;
  answer: string;
}

interface SCORMMetadata {
  manifestTitle: string;
  identifier: string;
  version: string;
  scormType: 'sco' | 'asset';
}

interface CourseData {
  title: string;
  description: string;
  modules: Module[];
  quizzes: Quiz[];
  codingExercises: CodingExercise[];
  seoMetadata: SEOMetadata;
  faq: FAQ[];
  scormMetadata: SCORMMetadata;
}

export default function CourseOutlinerClient() {
  const [topic, setTopic] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [duration, setDuration] = useState('');
  const [styleGuide, setStyleGuide] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<CourseData | null>(null);
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({});

  // File upload state
  const [sourceContent, setSourceContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (uploadedFile: File) => {
    setIsExtracting(true);
    setFile(uploadedFile);

    try {
        if (uploadedFile.type === 'application/pdf' || uploadedFile.name.endsWith('.pdf')) {
            const pdfjs = await import('pdfjs-dist');
            pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

            const arrayBuffer = await uploadedFile.arrayBuffer();
            const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
            const pdf = await loadingTask.promise;

            let fullText = '';
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const pageText = textContent.items.map((item: any) => item.str).join(' ');
                fullText += pageText + '\n';
            }
            setSourceContent(fullText);
            toast.success("PDF content extracted successfully.");
        } else {
            const text = await uploadedFile.text();
            setSourceContent(text);
            toast.success("Text file extracted successfully.");
        }
    } catch (err) {
        console.error("Error reading file:", err);
        toast.error("Failed to read file. Please ensure it is a valid text or PDF file.");
        setFile(null);
        setSourceContent('');
    } finally {
        setIsExtracting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setFile(null);
    setSourceContent('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const toggleModule = (index: number) => {
    setExpandedModules(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !targetAudience || !duration) {
      toast.error('Please fill in the required fields (Topic, Audience, Duration).');
      return;
    }

    setIsGenerating(true);
    setResult(null);

    try {
      const response = await generateCourseOutline(topic, targetAudience, duration, styleGuide, sourceContent);

      if (response.success && response.data) {
        setResult(response.data as CourseData);
        toast.success('Course outline generated successfully!');
      } else {
        toast.error(response.error || 'Failed to generate course outline.');
      }
    } catch (error) {
      toast.error('An unexpected error occurred.');
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadJSON = () => {
    if (!result) return;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(result, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${result.title.toLowerCase().replace(/\s+/g, '-')}-course.json`);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    toast.success('Course data downloaded as JSON.');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 py-12 px-4 sm:px-6 lg:px-8 bg-[url('/grid.svg')] bg-center bg-fixed">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 mb-4 ring-1 ring-indigo-500/20"
          >
            <BookOpen className="w-8 h-8" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
          >
            AI Course Outliner & SCORM Helper
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto"
          >
            Instantly generate structured course modules, lessons, quizzes, and coding exercises tailored to your audience.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />

              <form onSubmit={handleGenerate} className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-400" /> Course Topic *
                  </label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Advanced React Patterns, Spring Boot Microservices"
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <Target className="w-4 h-4 text-purple-400" /> Target Audience *
                  </label>
                  <input
                    type="text"
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="e.g., Intermediate Frontend Devs, Junior Backend Eng."
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-pink-400" /> Duration / Scope *
                  </label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g., 4 weeks, 10 hours, Crash Course"
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500 transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <Palette className="w-4 h-4 text-emerald-400" /> Style & Presets (Optional)
                  </label>
                  <textarea
                    value={styleGuide}
                    onChange={(e) => setStyleGuide(e.target.value)}
                    placeholder="e.g., 'Optimize for Spring Boot devs', 'Use practical real-world analogies', 'Keep it highly technical'"
                    rows={3}
                    className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <UploadCloud className="w-4 h-4 text-amber-400" /> Source Material / Transcripts (Optional)
                  </label>

                  {!file ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-slate-800 bg-slate-950/30 hover:bg-slate-950/60 rounded-xl p-6 text-center cursor-pointer transition-all hover:border-amber-500/50 flex flex-col items-center justify-center gap-2"
                    >
                      <UploadCloud className="w-8 h-8 text-slate-500" />
                      <p className="text-sm text-slate-400">Upload PDF or Text file to generate content</p>
                      <p className="text-xs text-slate-600">Supports .txt, .md, .pdf</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                      <div className="flex items-center gap-3 overflow-hidden">
                        {isExtracting ? (
                          <Loader2 className="w-5 h-5 text-amber-500 animate-spin flex-shrink-0" />
                        ) : (
                          <FileText className="w-5 h-5 text-amber-500 flex-shrink-0" />
                        )}
                        <div className="truncate">
                          <p className="text-sm font-medium text-amber-200 truncate">{file.name}</p>
                          <p className="text-xs text-amber-500/70">
                            {isExtracting ? 'Extracting text...' : `${(file.size / 1024).toFixed(1)} KB`}
                          </p>
                        </div>
                      </div>
                      {!isExtracting && (
                        <button
                          type="button"
                          onClick={clearFile}
                          className="p-1 hover:bg-amber-500/20 rounded-lg transition-colors text-amber-400"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".txt,.md,.pdf,application/pdf,text/plain"
                    className="hidden"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-indigo-500 hover:from-indigo-600 to-purple-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)]"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" /> Generate Course
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-8 space-y-6"
          >
            {isGenerating && (
              <div className="flex flex-col items-center justify-center py-24 space-y-4 bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-3xl h-full">
                <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
                <p className="text-slate-400 animate-pulse">Designing curriculum structure...</p>
              </div>
            )}

            {!isGenerating && !result && (
              <div className="flex flex-col items-center justify-center py-24 text-center space-y-4 bg-slate-900/30 backdrop-blur-sm border border-slate-800/50 rounded-3xl h-full">
                <div className="p-4 bg-slate-800/50 rounded-full">
                  <Sparkles className="w-8 h-8 text-slate-500" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-slate-300">Ready to build your course</h3>
                  <p className="text-slate-500 max-w-md mx-auto">
                    Fill out the parameters on the left to generate a comprehensive AI-powered course outline complete with lessons, quizzes, and code exercises.
                  </p>
                </div>
              </div>
            )}

            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6"
                >
                  {/* Action Bar */}
                  <div className="flex justify-between items-center bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-4 sticky top-4 z-20 shadow-xl">
                    <div className="space-y-1">
                      <h2 className="text-lg font-bold text-slate-100 line-clamp-1">{result.title}</h2>
                      <p className="text-xs text-slate-400 line-clamp-1">{result.description}</p>
                    </div>
                    <button
                      onClick={downloadJSON}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition-colors border border-slate-700 text-sm font-medium"
                    >
                      <Download className="w-4 h-4" /> Export JSON
                    </button>
                  </div>

                  {/* Course Outline (Modules) */}
                  <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-indigo-500/10 rounded-lg">
                        <BookOpen className="w-5 h-5 text-indigo-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-100">Course Outline</h3>
                    </div>

                    <div className="space-y-4">
                      {result.modules.map((mod, modIndex) => (
                        <div key={modIndex} className="border border-slate-800 bg-slate-950/50 rounded-2xl overflow-hidden transition-all duration-300">
                          <button
                            onClick={() => toggleModule(modIndex)}
                            className="w-full flex items-center justify-between p-5 hover:bg-slate-800/30 transition-colors text-left"
                          >
                            <div className="flex flex-col gap-1">
                              <span className="text-sm font-semibold text-indigo-400 tracking-wider">MODULE {modIndex + 1}</span>
                              <h4 className="text-lg font-bold text-slate-200">{mod.title}</h4>
                            </div>
                            <div className="flex items-center gap-4 text-slate-400">
                              <span className="text-sm flex items-center gap-1"><Clock className="w-4 h-4" /> {mod.duration}</span>
                              {expandedModules[modIndex] ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                            </div>
                          </button>

                          <AnimatePresence>
                            {expandedModules[modIndex] && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t border-slate-800 bg-slate-900/20"
                              >
                                <div className="p-5 space-y-6">
                                  {mod.lessons.map((lesson, lessonIndex) => (
                                    <div key={lessonIndex} className="pl-4 border-l-2 border-slate-800 space-y-3 relative before:absolute before:w-3 before:h-3 before:bg-slate-800 before:rounded-full before:-left-[7px] before:top-2">
                                      <div className="flex justify-between items-start">
                                        <h5 className="font-semibold text-slate-300 flex-1">{lesson.title}</h5>
                                        <span className="text-xs text-slate-500 whitespace-nowrap ml-4 bg-slate-800/50 px-2 py-1 rounded-md">{lesson.duration}</span>
                                      </div>

                                      {lesson.objectives.length > 0 && (
                                        <div className="space-y-1">
                                          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Objectives</p>
                                          <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                                            {lesson.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
                                          </ul>
                                        </div>
                                      )}

                                      {lesson.topics.length > 0 && (
                                        <div className="space-y-1">
                                          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Topics Covered</p>
                                          <div className="flex flex-wrap gap-2">
                                            {lesson.topics.map((topic, i) => (
                                              <span key={i} className="text-xs px-2 py-1 bg-slate-800/50 text-slate-300 rounded-md border border-slate-700/50">
                                                {topic}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Two Column Layout for Secondary Content */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {/* Coding Exercises */}
                    {result.codingExercises.length > 0 && (
                      <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 relative overflow-hidden h-fit">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2 bg-emerald-500/10 rounded-lg">
                            <Code className="w-5 h-5 text-emerald-400" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-100">Coding Exercises</h3>
                        </div>
                        <div className="space-y-4">
                          {result.codingExercises.map((ex, i) => (
                            <div key={i} className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 space-y-3">
                              <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">{ex.moduleTitle}</span>
                              <h4 className="font-semibold text-slate-200">{ex.title}</h4>
                              <p className="text-sm text-slate-400">{ex.description}</p>
                              {ex.hints.length > 0 && (
                                <div className="text-xs text-slate-500">
                                  <strong>Hints:</strong> {ex.hints.join(' | ')}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Quizzes */}
                    {result.quizzes.length > 0 && (
                      <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 relative overflow-hidden h-fit">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="p-2 bg-amber-500/10 rounded-lg">
                            <HelpCircle className="w-5 h-5 text-amber-400" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-100">Module Quizzes</h3>
                        </div>
                        <div className="space-y-6 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                          {result.quizzes.map((quiz, qIndex) => (
                            <div key={qIndex} className="space-y-4">
                              <h4 className="text-sm font-bold text-amber-500 border-b border-slate-800 pb-2">{quiz.moduleTitle}</h4>
                              <div className="space-y-4">
                                {quiz.questions.map((q, idx) => (
                                  <div key={idx} className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 space-y-3">
                                    <p className="text-sm font-medium text-slate-300">Q: {q.question}</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                      {q.options.map((opt, oIdx) => (
                                        <div key={oIdx} className={`text-xs p-2 rounded-lg border ${opt === q.correctAnswer ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}>
                                          {opt === q.correctAnswer && <CheckCircle className="inline-block w-3 h-3 mr-1" />}
                                          {opt}
                                        </div>
                                      ))}
                                    </div>
                                    <p className="text-xs text-slate-500 italic border-l-2 border-slate-700 pl-2 mt-2">
                                      {q.explanation}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Metadata and SCORM Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* SEO Metadata */}
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                          <Search className="w-5 h-5 text-blue-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-100">SEO Meta</h3>
                      </div>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-slate-500 block mb-1 text-xs uppercase">Title Tag</span>
                          <p className="text-slate-300 bg-slate-950/50 p-2 rounded-lg border border-slate-800">{result.seoMetadata.title}</p>
                        </div>
                        <div>
                          <span className="text-slate-500 block mb-1 text-xs uppercase">Meta Description</span>
                          <p className="text-slate-300 bg-slate-950/50 p-2 rounded-lg border border-slate-800 text-xs leading-relaxed">{result.seoMetadata.description}</p>
                        </div>
                        <div>
                          <span className="text-slate-500 block mb-1 text-xs uppercase">Keywords</span>
                          <div className="flex flex-wrap gap-1">
                            {result.seoMetadata.keywords.map((kw, i) => (
                              <span key={i} className="text-xs px-2 py-1 bg-blue-500/10 text-blue-300 rounded-md border border-blue-500/20">{kw}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SCORM Metadata */}
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-fuchsia-500/10 rounded-lg">
                          <Save className="w-5 h-5 text-fuchsia-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-100">SCORM Package Info</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                          <span className="text-slate-500 block mb-1 text-xs uppercase">Manifest Title</span>
                          <p className="text-slate-300 text-sm font-medium">{result.scormMetadata.manifestTitle}</p>
                        </div>
                        <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                          <span className="text-slate-500 block mb-1 text-xs uppercase">Identifier</span>
                          <p className="text-slate-300 text-sm font-mono truncate">{result.scormMetadata.identifier}</p>
                        </div>
                        <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                          <span className="text-slate-500 block mb-1 text-xs uppercase">Version</span>
                          <p className="text-slate-300 text-sm">{result.scormMetadata.version}</p>
                        </div>
                        <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                          <span className="text-slate-500 block mb-1 text-xs uppercase">Type</span>
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 uppercase tracking-wider">
                            {result.scormMetadata.scormType}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FAQ Section */}
                  {result.faq.length > 0 && (
                    <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8">
                       <h3 className="text-xl font-bold text-slate-100 mb-6">Frequently Asked Questions</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         {result.faq.map((item, i) => (
                           <div key={i} className="bg-slate-950/50 border border-slate-800 p-4 rounded-xl space-y-2">
                             <p className="font-medium text-slate-200 text-sm">{item.question}</p>
                             <p className="text-sm text-slate-400">{item.answer}</p>
                           </div>
                         ))}
                       </div>
                    </div>
                  )}

                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
