'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, List, Share2, ArrowUp, Menu } from 'lucide-react';

export interface Section {
  title: string;
  id: string;
  content: React.ReactNode;
}

interface AcademicComparisonProps {
  title: string;
  topicA: string;
  topicB: string;
  abstract: string;
  sections: Section[];
  author?: string;
  publishDate?: string;
}

export default function AcademicComparison({
  title,
  topicA,
  topicB,
  abstract,
  sections,
  author = "DevMetrix Research Team",
  publishDate = new Date().toISOString().split('T')[0]
}: AcademicComparisonProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  // Scroll spy to update active section
  useEffect(() => {
    const handleScroll = () => {
      // Progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setReadingProgress(progress);

      // Spy
      const sectionElements = sections.map(s => document.getElementById(s.id));
      for (const section of sectionElements) {
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
      setActiveSection(id);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-slate-300 font-sans selection:bg-purple-500/30">

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-600 via-blue-500 to-cyan-400 z-50" style={{ width: `${readingProgress}%` }} />

      {/* Navigation / Header */}
      <nav className="fixed top-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tight text-white">
            Dev<span className="text-purple-500">Metrix</span> <span className="text-slate-500 hidden sm:inline">| Academic</span>
          </div>
          <div className="flex items-center gap-4">
             <button
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
               className="md:hidden p-2 text-slate-300 hover:text-white"
             >
               <Menu className="w-6 h-6" />
             </button>
             <button className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors border border-white/10 rounded-full hover:bg-white/5">
                <Share2 className="w-4 h-4" /> Share
             </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 pt-32 pb-20 flex flex-col md:flex-row gap-12 relative">

        {/* Sidebar (Table of Contents) */}
        <aside className={`
          fixed inset-y-0 left-0 w-72 bg-black/95 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 z-30 pt-24 px-6 overflow-y-auto
          md:relative md:transform-none md:bg-transparent md:border-none md:pt-0 md:w-80 md:block
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
           <div className="sticky top-32 space-y-8">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                  <List className="w-4 h-4" /> Contents
                </h3>
                <ul className="space-y-1 border-l border-white/10">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={`text-left w-full pl-4 py-2 text-sm transition-all border-l-2 -ml-[2px] ${
                          activeSection === section.id
                            ? 'border-purple-500 text-purple-400 font-medium bg-purple-500/5'
                            : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600'
                        }`}
                      >
                        {section.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20">
                 <h4 className="text-white font-semibold mb-2 text-sm">Comparison Details</h4>
                 <div className="space-y-2 text-xs text-slate-400">
                    <div className="flex justify-between">
                       <span>Subject A:</span>
                       <span className="text-purple-300">{topicA}</span>
                    </div>
                    <div className="flex justify-between">
                       <span>Subject B:</span>
                       <span className="text-blue-300">{topicB}</span>
                    </div>
                    <div className="flex justify-between">
                       <span>Words:</span>
                       <span>20,000+</span>
                    </div>
                 </div>
              </div>
           </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">

          {/* Header */}
          <header className="mb-16 border-b border-white/10 pb-12">
             <div className="flex items-center gap-3 text-purple-400 text-sm font-medium mb-4 uppercase tracking-wider">
                <BookOpen className="w-4 h-4" /> Technical Monograph
             </div>
             <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-8 leading-tight">
               {title}
             </h1>

             {/* Abstract */}
             <div className="bg-zinc-900/50 border-l-4 border-purple-500 p-6 md:p-8 rounded-r-xl mb-8">
                <p className="text-lg md:text-xl text-slate-300 italic leading-relaxed font-serif">
                   &quot;{abstract}&quot;
                </p>
             </div>

             <div className="flex items-center gap-6 text-sm text-slate-500">
                <span>By <span className="text-slate-300">{author}</span></span>
                <span>•</span>
                <time>{publishDate}</time>
             </div>
          </header>

          {/* Sections */}
          <div className="space-y-20">
             {sections.map((section, idx) => (
               <motion.section
                 key={section.id}
                 id={section.id}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.5 }}
                 className="scroll-mt-32"
               >
                  <div className="flex items-center gap-4 mb-8">
                     <span className="text-4xl md:text-5xl font-black text-white/5 font-mono select-none">
                        {String(idx + 1).padStart(2, '0')}
                     </span>
                     <h2 className="text-2xl md:text-3xl font-bold text-slate-100">
                        {section.title}
                     </h2>
                  </div>

                  <div className="prose prose-invert prose-lg max-w-none
                    prose-headings:text-slate-100 prose-headings:font-bold
                    prose-p:text-slate-300 prose-p:leading-loose
                    prose-a:text-purple-400 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-white prose-strong:font-bold
                    prose-ul:list-disc prose-ul:pl-6 prose-li:marker:text-purple-500
                    prose-code:text-purple-300 prose-code:bg-purple-900/20 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                    prose-blockquote:border-l-purple-500 prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                    prose-th:border-white/10 prose-td:border-white/10
                    prose-img:rounded-xl prose-img:border prose-img:border-white/10
                  ">
                     {section.content}
                  </div>
               </motion.section>
             ))}
          </div>

          {/* Footer of Article */}
          <div className="mt-24 pt-12 border-t border-white/10">
             <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-2xl p-8 md:p-12 text-center border border-purple-500/20">
                <h3 className="text-2xl font-bold text-white mb-4">Was this analysis helpful?</h3>
                <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                   This comprehensive study is part of our open-access engineering library. Share it with your team or peers.
                </p>
                <div className="flex justify-center gap-4">
                   <button
                     onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                     className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                   >
                     <ArrowUp className="w-4 h-4" /> Back to Top
                   </button>
                   <button className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-colors shadow-lg shadow-purple-500/25">
                     Subscribe for Updates
                   </button>
                </div>
             </div>
          </div>

        </main>
      </div>
    </div>
  );
}
