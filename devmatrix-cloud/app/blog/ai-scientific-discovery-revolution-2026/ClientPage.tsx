'use client';

import AdContainer from '@/components/AdContainer';
import JsonLdArticle from '@/components/JsonLdArticle';
import { motion } from 'framer-motion';
import {
    Activity,
    ArrowRight, Atom,
    Cpu,
    Database,
    Dna, FlaskConical,
    FlaskRound,
    Globe,
    Menu,
    Microscope,
    ShieldAlert,
    X,
    Zap
} from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const sections: Section[] = [
  { id: 'intro', title: 'Introduction', icon: Microscope },
  { id: 'scientific-method', title: 'The New Scientific Method', icon: Database },
  { id: 'drug-discovery', title: 'Drug Discovery', icon: Dna },
  { id: 'climate', title: 'Climate & Environment', icon: Globe },
  { id: 'physics', title: 'Physics & Chemistry', icon: Atom },
  { id: 'challenges', title: 'Challenges', icon: ShieldAlert },
  { id: 'future', title: 'Future of Science', icon: Cpu },
];

export default function AiSciencePost() {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (scrollTop / docHeight) * 100;
      setProgress(scrollProgress);

      const sectionElements = sections.map(s => document.getElementById(s.id));
      const currentSection = sectionElements.findIndex((el) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom > 150;
      });

      if (currentSection !== -1) {
        setActiveSection(sections[currentSection].id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#020410] text-gray-200 font-sans selection:bg-teal-500/30 selection:text-teal-100">
      <JsonLdArticle
        headline="AI Scientists: How Artificial Intelligence is Accelerating Scientific Discovery and Solving Humanity's Greatest Challenges"
        description="Explore how AI is transforming scientific research across medicine, climate science, and physics. Discover breakthrough AI technologies accelerating discovery and solving complex problems."
        datePublished="2026-02-15"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/ai-scientific-discovery-revolution-2026"
      />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-900 z-[100]">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600"
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.1 }}
        />
      </div>

      {/* Background Ambience & Floating Molecules */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0 overflow-hidden">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-900/20 rounded-full blur-[100px] mix-blend-screen animate-pulse"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[100px] mix-blend-screen animate-pulse delay-700"></div>

         {/* Floating Elements */}
         <motion.div
           className="absolute top-1/4 left-10 text-teal-500/10"
           animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
           transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
         >
           <Atom size={120} />
         </motion.div>
         <motion.div
           className="absolute bottom-1/3 right-10 text-blue-500/10"
           animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
           transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
         >
           <Dna size={140} />
         </motion.div>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-20 right-4 z-[60] lg:hidden bg-teal-900/80 backdrop-blur border border-teal-500/30 text-teal-100 p-3 rounded-lg shadow-[0_0_15px_rgba(20,184,166,0.5)]"
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <nav className={`fixed top-0 left-0 h-full bg-[#030616]/95 backdrop-blur-md border-r border-teal-900/50 w-72 transform transition-transform duration-300 z-[55] ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 pt-20 lg:pt-0`}>
        <div className="p-6 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-teal-900 scrollbar-track-black">
          <div className="flex items-center gap-2 mb-8 px-2">
            <Atom className="text-teal-400" size={24} />
            <span className="font-bold text-lg tracking-wider text-white">DEVMATRIX</span>
          </div>

          <h2 className="text-xs font-bold text-teal-500/70 uppercase tracking-widest mb-6 px-2">Table of Contents</h2>
          <ul className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 border border-transparent ${
                      activeSection === section.id
                        ? 'bg-teal-900/30 text-teal-300 border-teal-500/30 shadow-[0_0_15px_rgba(20,184,166,0.1)]'
                        : 'text-gray-400 hover:text-teal-400 hover:bg-teal-900/10'
                    }`}
                  >
                    <Icon size={16} className={activeSection === section.id ? "text-teal-400" : "text-gray-600"} />
                    <span className="text-sm font-medium">{section.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-72 px-4 sm:px-6 lg:px-16 py-12 lg:py-20 relative z-10">
        <div className="max-w-4xl mx-auto">

          {/* Hero Section */}
          <header className="mb-16 lg:mb-24 relative">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
             >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-900/30 text-teal-400 text-xs font-mono mb-6 border border-teal-500/30 shadow-[0_0_10px_rgba(20,184,166,0.2)]">
                  <FlaskConical size={12} />
                  <span>THE AGE OF AI DISCOVERY</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-8 tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-500">AI Scientists:</span> <br/>Accelerating Discovery
                </h1>
                <p className="text-gray-400 text-lg lg:text-xl leading-relaxed max-w-3xl border-l-2 border-teal-500/50 pl-6">
                   How Artificial Intelligence is solving humanity&apos;s greatest challenges—from folding proteins to predicting climate patterns—and redefining the scientific method itself.
                </p>

                <div className="flex flex-wrap gap-6 text-gray-500 text-sm font-mono mt-10">
                  <span className="flex items-center gap-2"><Zap className="text-teal-500" size={14}/> 2026-02-15</span>
                  <span className="flex items-center gap-2"><Activity className="text-teal-500" size={14}/> 50 min read</span>
                  <span className="flex items-center gap-2"><Globe className="text-teal-500" size={14}/> Science</span>
                </div>
            </motion.div>
          </header>

          {/* Introduction */}
          <section id="intro" className="mb-20">
            <div className="prose prose-lg prose-invert max-w-none text-gray-300">
              <p className="lead text-2xl text-white font-light">
                In September 2024, Google DeepMind&apos;s AI system made a discovery that would have taken human scientists decades—it mapped the entire protein universe. Just months later, an AI system designed a new antibiotic to kill drug-resistant bacteria.
              </p>
              <p>
                This isn&apos;t just automation; it&apos;s a fundamental transformation. We are witnessing the emergence of AI as a true scientific partner, capable of forming hypotheses, designing experiments, and making discoveries that push the boundaries of human knowledge.
              </p>
              <p>
                 According to a 2026 Nature survey, over 70% of research institutions now use AI as a core tool. Experiments that took years now take days.
              </p>
            </div>

            <AdContainer
              slot="4520516006"
              format="horizontal"
              label="Advertisement"
              className="max-w-full mx-auto px-0 my-12"
            />
          </section>

          {/* The New Scientific Method */}
          <section id="scientific-method" className="mb-20 scroll-mt-24">
            <div className="bg-[#0f1225] border border-teal-900/30 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="p-3 bg-teal-500/10 rounded-xl">
                  <Database className="text-teal-400" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-white m-0">Reimagining the Scientific Method</h2>
              </div>

              <div className="prose prose-lg prose-invert max-w-none text-gray-300 relative z-10">
                <p>
                  The traditional method—observe, hypothesize, test—is being augmented. AI systems can consider thousands of variables simultaneously. They generate hypotheses human researchers might never spot by analyzing millions of papers and datasets.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                   <div className="bg-teal-900/20 p-5 rounded-xl border border-teal-500/20">
                      <h4 className="text-teal-300 font-bold mb-2">Hypothesis Generation</h4>
                      <p className="text-sm">AI scans literature to find cross-disciplinary connections, suggesting that a biological mechanism shares math with materials science.</p>
                   </div>
                   <div className="bg-blue-900/20 p-5 rounded-xl border border-blue-500/20">
                      <h4 className="text-blue-300 font-bold mb-2">Automated Experimentation</h4>
                      <p className="text-sm">Robot scientists run thousands of trials autonomously, learning from each result to optimize the next experiment.</p>
                   </div>
                </div>

                <p>
                   It&apos;s a closed-loop system: AI designs the experiment, the robot executes it, AI analyzes the data, and plans the next step. This runs 24/7.
                </p>
              </div>
            </div>
          </section>

          {/* Drug Discovery */}
           <section id="drug-discovery" className="mb-20 scroll-mt-24">
             <div className="flex items-center gap-3 mb-8">
                <Dna className="text-pink-400" size={28} />
                <h2 className="text-3xl font-bold text-white">AI in Drug Discovery</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 hover:border-pink-500/50 transition-all group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-pink-900/30 rounded-lg text-pink-400 group-hover:text-pink-300">
                      <FlaskRound size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white">Protein Folding</h3>
                  </div>
                  <p className="text-gray-400">
                    AlphaFold predicted 200 million protein structures. This roadmap of biology accelerates drug design by showing exactly how molecules interact with disease targets.
                  </p>
                </div>

                <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 hover:border-teal-500/50 transition-all group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-teal-900/30 rounded-lg text-teal-400 group-hover:text-teal-300">
                      <ShieldAlert size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white">Antibiotics</h3>
                  </div>
                  <p className="text-gray-400">
                    AI found Halicin, a new antibiotic class. It screens chemical libraries against bacterial mechanisms to find compounds that evade resistance, potentially preventing a post-antibiotic era.
                  </p>
                </div>

                 <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-blue-900/30 rounded-lg text-blue-400 group-hover:text-blue-300">
                      <Activity size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white">Personalized Medicine</h3>
                  </div>
                  <p className="text-gray-400">
                    Analyzing your specific genetic profile to predict which cancer treatment will work. No more trial and error; just precision therapy.
                  </p>
                </div>
              </div>

              <AdContainer
                slot="7853256351"
                format="horizontal"
                label="Advertisement"
                className="max-w-full mx-auto px-0 my-12"
              />
          </section>

          {/* Climate & Environment */}
          <section id="climate" className="mb-20 scroll-mt-24">
             <div className="bg-gradient-to-br from-[#0a1a1a] to-[#0a0a1a] border border-teal-900/50 rounded-3xl p-8 lg:p-12 relative">

                <div className="flex items-center gap-3 mb-8 relative z-10">
                   <Globe className="text-green-400" size={28} />
                   <h2 className="text-3xl font-bold text-white">Climate & Environment</h2>
                 </div>

                <div className="space-y-6 relative z-10 text-gray-300">
                  <p>
                    <strong>Weather Prediction:</strong> Google&apos;s GraphCast predicts weather 10 days out more accurately than physics models, and does it in minutes, not hours.
                  </p>
                  <p>
                    <strong>Materials Science:</strong> AI is finding new materials for batteries and solar cells. It predicts properties from atomic structures, screening millions of candidates to find the few that will make green energy cheaper.
                  </p>
                  <p>
                    <strong>Conservation:</strong> Computer vision tracks deforestation and wildlife populations from satellite imagery in real-time, optimizing protection efforts.
                  </p>
                </div>
             </div>
          </section>

          {/* Physics & Chemistry */}
          <section id="physics" className="mb-20 scroll-mt-24">
            <div className="flex items-center gap-3 mb-8">
              <Atom className="text-purple-500" size={28} />
              <h2 className="text-3xl font-bold text-white">Physics & Fundamental Science</h2>
            </div>

            <div className="prose prose-lg prose-invert max-w-none text-gray-300">
               <p>
                 At CERN, AI filters petabytes of data from the Large Hadron Collider to find the one collision in a billion that reveals new physics. In fusion research, DeepMind&apos;s AI learned to control unstable plasma in a reactor, bringing us closer to limitless clean energy.
               </p>
               <p>
                 <strong>Retrosynthesis:</strong> In chemistry, AI suggests how to build complex molecules. It figures out the recipe backwards, suggesting reaction steps that often work on the first try.
               </p>
            </div>
          </section>

          {/* Challenges */}
          <section id="challenges" className="mb-20 scroll-mt-24">
             <div className="flex items-center gap-3 mb-8">
                <ShieldAlert className="text-orange-400" size={28} />
                <h2 className="text-3xl font-bold text-white">Challenges</h2>
              </div>

              <div className="bg-orange-900/10 border border-orange-500/30 rounded-2xl p-8">
                 <ul className="space-y-4">
                    <li className="flex gap-3">
                       <ShieldAlert className="text-orange-400 shrink-0" size={20}/>
                       <span className="text-gray-300"><strong>Reproducibility:</strong> If an AI makes a discovery using a proprietary black-box model, can other scientists verify it?</span>
                    </li>
                    <li className="flex gap-3">
                       <ShieldAlert className="text-orange-400 shrink-0" size={20}/>
                       <span className="text-gray-300"><strong>Interpretability:</strong> An AI might predict <em>that</em> a drug works, but not explain <em>why</em>. Science needs understanding, not just answers.</span>
                    </li>
                     <li className="flex gap-3">
                       <ShieldAlert className="text-orange-400 shrink-0" size={20}/>
                       <span className="text-gray-300"><strong>Bias:</strong> Medical AI trained on data from one demographic may fail for others. Ensuring diverse training data is critical.</span>
                    </li>
                 </ul>
              </div>
          </section>

          {/* Future Outlook */}
          <section id="future" className="mb-20 scroll-mt-24">
             <div className="flex items-center gap-3 mb-8">
                <Cpu className="text-indigo-400" size={28} />
                <h2 className="text-3xl font-bold text-white">The Future Laboratory</h2>
              </div>

              <div className="prose prose-lg prose-invert max-w-none text-gray-300">
                <p>
                  We are moving toward <strong>Autonomous Research Laboratories</strong> where AI handles the entire cycle, and humans set high-level goals.
                </p>
                <p>
                   The future isn&apos;t AI replacing scientists, but <strong>Collaborative Discovery</strong>. AI handles the data crunching and pattern matching; humans provide intuition and ethics. Together, we will solve the "unsolvable" problems of our time.
                </p>
              </div>
          </section>

          <AdContainer
            slot="5598967412"
            format="horizontal"
            label="Advertisement"
            className="max-w-full mx-auto px-0 my-12"
          />

          {/* Conclusion */}
          <section className="mb-16 border-t border-teal-900/50 pt-12">
            <div className="bg-black/50 border border-teal-500/30 rounded-xl p-10 text-center relative overflow-hidden">
               <div className="absolute inset-0 bg-teal-500/5 z-0"></div>
              <h2 className="text-3xl font-bold text-white mb-4 relative z-10">A New Era of Discovery</h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto relative z-10">
                We are not just witnessing a technological revolution; we are participating in a transformation of humanity&apos;s relationship with knowledge itself.
              </p>
              <div className="flex flex-wrap justify-center gap-4 relative z-10">
                 <Link
                    href="/ai-tools"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-500 hover:to-blue-500 px-8 py-4 rounded-full font-bold transition-all text-white shadow-[0_0_20px_rgba(20,184,166,0.4)]"
                >
                    <Microscope size={20} />
                    Explore Science Tools
                </Link>
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gray-800 px-8 py-4 rounded-full font-bold transition-all text-white border border-gray-700"
                >
                    Read More Articles <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
