'use client';

import JsonLdArticle from '@/components/JsonLdArticle';
import {
    AlertTriangle,
    Beaker,
    CheckCircle,
    ChevronDown, ChevronUp,
    Circle,
    Code,
    Cpu,
    GitMerge,
    Layers,
    Menu,
    Scale,
    Server,
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

interface Concept {
  id: string;
  title: string;
  icon: string;
  description: string;
  details: string;
}

const sections: Section[] = [
  { id: 'intro', title: 'Introduction', icon: Zap },
  { id: 'why-merge', title: 'Why Merge?', icon: Scale },
  { id: 'techniques', title: 'Merging Techniques', icon: Layers },
  { id: 'hardware', title: 'Hardware Requirements', icon: Server },
  { id: 'mergekit', title: 'Using MergeKit', icon: Code },
  { id: 'evaluation', title: 'Evaluation', icon: Beaker },
  { id: 'challenges', title: 'Challenges', icon: AlertTriangle },
  { id: 'future', title: 'The Future', icon: Cpu },
];

const checklistItems: string[] = [
  'Verify license compatibility (Apache 2.0 vs Llama Community)',
  'Ensure both models share the same architecture (e.g., Llama 3)',
  'Use high-RAM instance (Google Colab Pro+ or RunPod)',
  'Select the right algorithm (SLERP for same size, TIES for sparsity)',
  'Evaluate on standard benchmarks (GSM8K, MMLU) after merging',
  'Check for tokenizer mismatches',
  'Quantize the final model (GGUF/AWQ) for distribution',
  'Document the merge recipe in the model card',
];

const concepts: Concept[] = [
  {
    id: 'slerp',
    title: 'SLERP (Spherical Linear Interpolation)',
    icon: '🌐',
    description: 'The gold standard for merging two models of the same size. Unlike simple averaging, SLERP preserves the geometric properties of the weight vectors.',
    details: 'Linear interpolation (averaging) often results in a "slump" in performance because high-dimensional weights lie on a hypersphere, not a flat plane. SLERP follows the curve of the sphere, maintaining the magnitude and direction of the features. It uses a parameter `t` to control the blend ratio (usually 0.5 for a 50/50 mix).'
  },
  {
    id: 'ties',
    title: 'TIES (Task Arithmetic)',
    icon: '✂️',
    description: 'Trims the fat. TIES identifies the top-k most important parameter changes in each model and merges only those, ignoring noise.',
    details: 'TIES involves 4 steps: 1) Trim: reset the smallest 80% of weight changes to zero. 2) Elect: Resolve sign conflicts (if Model A wants to increase a weight and Model B wants to decrease it, who wins?). 3) Sign: Copy the sign of the winner. 4) Merge: Average the non-zero magnitudes. This prevents "interference" between models.'
  },
  {
    id: 'dare',
    title: 'DARE (Drop And REscale)',
    icon: '🎲',
    description: 'Radical sparsity. Randomly drops 90% of the delta weights and rescales the remaining ones. Surprisingly effective.',
    details: 'DARE creates extremely sparse deltas. This allows you to stack many, many fine-tunes on top of a base model without "catastrophic forgetting" or weight saturation. It is often combined with TIES to create "DARE-TIES" merges, which are highly effective for combining 3+ models.'
  },
   {
    id: 'frank',
    title: 'Frankenmerging (Passthrough)',
    icon: '🧟',
    description: 'Stitching layers together. Taking the first 20 layers of Model A and the last 20 layers of Model B to create a larger model.',
    details: 'This technique (e.g., Goliath-120B) allows you to create massive models from smaller components. It requires no retraining but relies on the models having compatible internal representations. It is a hacky way to scale parameter count (e.g., turning two 70B models into a 120B model).'
  }
];

export default function ModelMergingGuide() {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
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

  const toggleChecklist = (index: number): void => {
    setChecklist(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleSection = (id: string): void => {
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollToSection = (id: string): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const completedItems = Object.values(checklist).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-green-950 to-black text-white font-sans">
      <JsonLdArticle
        headline="Model Merging Guide: Creating State-of-the-Art LLMs Without Training"
        description="Training LLMs is expensive. Merging them is cheap. Learn how to combine Mistral, Llama 3, and other models using MergeKit to create powerful 'Frankenmerges' without a GPU farm."
        datePublished="2026-01-10"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/model-merging-llm-guide-mergekit"
      />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-[100]">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-emerald-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-20 right-4 z-[60] lg:hidden bg-emerald-700 hover:bg-emerald-800 p-3 rounded-lg shadow-lg transition-colors"
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <nav className={`fixed top-0 left-0 h-full bg-gray-900/95 backdrop-blur-sm border-r border-emerald-500/30 w-64 transform transition-transform duration-300 z-[55] ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 pt-20 lg:pt-0`}>
        <div className="p-6 overflow-y-auto h-full">
          <h2 className="text-xl font-bold text-emerald-400 mb-6">Table of Contents</h2>
          <ul className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                      activeSection === section.id
                        ? 'bg-emerald-700 text-white'
                        : 'text-emerald-300 hover:bg-emerald-900/40'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{section.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 p-4 bg-emerald-900/30 rounded-lg">
            <div className="text-sm text-emerald-300 mb-2">Merge Recipe Status</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-600 transition-all duration-300"
                  style={{ width: `${(completedItems / checklistItems.length) * 100}%` }}
                />
              </div>
              <span className="text-sm text-emerald-400">{completedItems}/{checklistItems.length}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-64 px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <div className="max-w-4xl mx-auto">

          {/* Hero Section */}
          <header className="mb-12 lg:mb-20">
             <div className="inline-block px-3 py-1 bg-green-900/30 text-green-300 rounded-full text-sm font-semibold mb-4 border border-green-500/30">
              🧪 AI Research & MLOps
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-500 to-teal-400 leading-tight mb-4 lg:mb-6">
              Model Merging Guide: Creating State-of-the-Art LLMs Without Training
            </h1>
            <p className="text-emerald-200/90 text-base lg:text-lg mb-4 leading-relaxed">
              Why train from scratch when you can combine the best experts? Discover the alchemy of Model Merging—the technique behind the top-performing open-source models on the leaderboard.
            </p>
            <div className="flex flex-wrap gap-3 text-emerald-400 text-xs sm:text-sm">
              <span>📅 January 10, 2026</span>
              <span>•</span>
              <span>⏱️ 45 min read</span>
              <span>•</span>
              <span>🏷️ AI Research</span>
            </div>
          </header>

          {/* Introduction */}
          <section id="intro" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 lg:p-8 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <GitMerge className="text-emerald-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-emerald-100">The Alchemy of Open Source AI</h2>
              </div>
              <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
                <p>
                  Training a state-of-the-art Large Language Model (LLM) is an exclusive club. The entry fee is millions of dollars in GPU compute. For a long time, the open-source community was stuck playing catch-up, fine-tuning base models released by Meta or Mistral but rarely exceeding their capabilities significantly.
                </p>
                <p>
                  <strong>Then came Model Merging.</strong>
                </p>
                <p>
                  In late 2023 and early 2024, a strange phenomenon occurred on the Hugging Face Open LLM Leaderboard. The top spots were no longer held by models trained by massive corporations, but by "Frankenmerges"—models stitched together by hobbyists on consumer hardware.
                </p>
                <div className="bg-emerald-900/20 border-l-4 border-emerald-500 p-6 rounded mt-6">
                  <p className="text-emerald-200 italic">
                    "Model merging is the democratization of AI capability. It allows us to combine a model that knows coding with a model that knows Japanese, creating a polyglot programmer without spending a cent on training."
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Why Merge? */}
          <section id="why-merge" className="mb-12 lg:mb-16">
            <div className="bg-gray-800/50 border border-emerald-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Scale className="text-emerald-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-emerald-100">Why Merge Models?</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                      <h3 className="text-xl font-bold text-teal-300 mb-3">💰 Cost Efficiency</h3>
                      <p className="text-gray-400">
                          Pre-training Llama 3 70B costs millions. Fine-tuning it costs thousands. Merging two fine-tuned versions of Llama 3 70B costs <strong>zero</strong> (aside from the RAM to load them). It is computationally practically free.
                      </p>
                  </div>
                   <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                      <h3 className="text-xl font-bold text-teal-300 mb-3">🧠 Skill Combination</h3>
                      <p className="text-gray-400">
                          Imagine you have "WizardMath-7B" (great at math) and "CodeLlama-7B" (great at code). Merging them can create a model that is good at <em>both</em>, effectively multitasking without multi-task training.
                      </p>
                  </div>
                  <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                      <h3 className="text-xl font-bold text-teal-300 mb-3">📈 Generalization</h3>
                      <p className="text-gray-400">
                          Merged models often suffer less from overfitting. By averaging the weights of multiple diverse fine-tunes, you cancel out the "noise" of specific datasets and keep the "signal" of general reasoning.
                      </p>
                  </div>
                  <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                      <h3 className="text-xl font-bold text-teal-300 mb-3">🚀 Performance</h3>
                      <p className="text-gray-400">
                          Empirically, merges dominate the leaderboards. Techniques like "Model Soups" have been proven in academia to improve accuracy on ImageNet, and the same holds true for NLP.
                      </p>
                  </div>
              </div>
            </div>
          </section>

          {/* Techniques Section */}
          <section id="techniques" className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-green-950 to-gray-900 border border-emerald-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Layers className="text-green-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-green-100">Merging Techniques Explained</h2>
              </div>

              <p className="text-gray-300 mb-8 text-lg">
                You can't just add two matrices together and expect magic (well, sometimes you can). Here are the sophisticated algorithms that make merging work.
              </p>

              {concepts.map((concept) => (
                <div key={concept.id} className="mb-4">
                  <button
                    onClick={() => toggleSection(concept.id)}
                    className="w-full bg-gray-800/80 hover:bg-gray-700 p-5 rounded-lg transition-all flex items-center justify-between border border-gray-600"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl bg-gray-900 p-2 rounded-md">{concept.icon}</span>
                      <div className="text-left">
                        <span className="block font-bold text-emerald-300 text-lg">{concept.title}</span>
                      </div>
                    </div>
                    {expandedSections[concept.id] ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                  </button>

                  {expandedSections[concept.id] && (
                    <div className="bg-gray-900/80 p-6 rounded-b-lg border-t-0 border-x border-b border-gray-600 mt-0">
                      <p className="text-gray-300 mb-4 text-base leading-relaxed font-medium">{concept.description}</p>
                      <div className="bg-black/30 p-4 rounded text-sm text-gray-400 leading-relaxed border-l-2 border-emerald-500/50">
                        {concept.details}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

           {/* Hardware Requirements */}
           <section id="hardware" className="mb-12 lg:mb-16">
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Server className="text-teal-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-teal-100">Hardware Requirements</h2>
              </div>
              <p className="text-gray-300 mb-6">
                  One of the biggest advantages of MergeKit is that it can run on relatively modest hardware. It supports <strong>CPU-offloading</strong>, meaning you don't need enough VRAM to hold the entire model, provided you have enough system RAM.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-800 text-emerald-300 border-b border-gray-700">
                            <th className="p-4">Model Size</th>
                            <th className="p-4">Minimum RAM (CPU)</th>
                            <th className="p-4">Recommended VRAM (GPU)</th>
                            <th className="p-4">Disk Space</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-400 text-sm">
                        <tr className="border-b border-gray-800 hover:bg-gray-800/50">
                            <td className="p-4 font-bold text-white">7B / 8B</td>
                            <td className="p-4">24 GB</td>
                            <td className="p-4">16 GB (optional)</td>
                            <td className="p-4">30 GB</td>
                        </tr>
                         <tr className="border-b border-gray-800 hover:bg-gray-800/50">
                            <td className="p-4 font-bold text-white">70B</td>
                            <td className="p-4">160 GB</td>
                            <td className="p-4">2x A100 (80GB)</td>
                            <td className="p-4">300 GB</td>
                        </tr>
                        <tr className="border-b border-gray-800 hover:bg-gray-800/50">
                            <td className="p-4 font-bold text-white">Mixture of Experts</td>
                            <td className="p-4">128 GB</td>
                            <td className="p-4">1x A100 (80GB)</td>
                            <td className="p-4">200 GB</td>
                        </tr>
                    </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-gray-500">
                  * Note: If you don't have a GPU, merging will be slow (10-30 mins for 7B) but still possible. With a GPU, it takes seconds.
              </p>
            </div>
          </section>


          {/* MergeKit Section */}
          <section id="mergekit" className="mb-12 lg:mb-16">
            <div className="bg-gray-800/50 border border-emerald-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Code className="text-emerald-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-emerald-100">Using MergeKit</h2>
              </div>

              <div className="space-y-4 text-gray-300 mb-6 leading-relaxed">
                <p>
                    <a href="https://github.com/arcee-ai/mergekit" className="text-emerald-400 underline hover:text-emerald-300">MergeKit</a> is the swiss-army knife of model merging. It optimizes memory usage, allowing you to merge models on modest hardware (sometimes even CPU only).
                </p>
                <p>
                    The process is defined by a <strong>YAML configuration file</strong>.
                </p>
              </div>

              <div className="bg-black rounded-lg overflow-hidden border border-gray-700 shadow-lg mb-6">
                <div className="bg-gray-900 px-4 py-3 flex items-center justify-between border-b border-gray-800">
                  <span className="text-sm text-gray-400 font-mono">config.yml</span>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <pre className="p-4 overflow-x-auto text-sm text-gray-300 font-mono">
                  <code>
<span className="text-purple-400">models:</span><br/>
{'  '}- <span className="text-blue-400">model:</span> mistralai/Mistral-7B-v0.1<br/>
{'    '}<span className="text-blue-400"># No parameters necessary for base model</span><br/>
{'  '}- <span className="text-blue-400">model:</span> OpenPipe/mistral-ft-optimized-1218<br/>
{'    '}<span className="text-blue-400">parameters:</span><br/>
{'      '}<span className="text-yellow-400">density:</span> 0.5<br/>
{'      '}<span className="text-yellow-400">weight:</span> 0.5<br/>
{'  '}- <span className="text-blue-400">model:</span> mlabonne/NeuralHermes-2.5-Mistral-7B<br/>
{'    '}<span className="text-blue-400">parameters:</span><br/>
{'      '}<span className="text-yellow-400">density:</span> 0.5<br/>
{'      '}<span className="text-yellow-400">weight:</span> 0.5<br/>
<span className="text-purple-400">merge_method:</span> ties<br/>
<span className="text-purple-400">base_model:</span> mistralai/Mistral-7B-v0.1<br/>
<span className="text-purple-400">parameters:</span><br/>
{'  '}<span className="text-yellow-400">normalize:</span> true<br/>
<span className="text-purple-400">dtype:</span> float16
                  </code>
                </pre>
              </div>

              <p className="text-gray-300 mb-4">
                  Run the merge with a single command:
              </p>

               <div className="bg-black rounded-lg overflow-hidden border border-gray-700 shadow-lg">
                <pre className="p-4 overflow-x-auto text-sm text-gray-300 font-mono">
                  <code>
                    <span className="text-green-400">$</span> pip install mergekit<br/>
                    <span className="text-green-400">$</span> mergekit-yaml config.yml ./merged-model-output --cuda
                  </code>
                </pre>
              </div>
            </div>
          </section>

          {/* Evaluation Section */}
          <section id="evaluation" className="mb-12 lg:mb-16">
            <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <Beaker className="text-teal-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-teal-100">Evaluation: Truth vs Vibes</h2>
              </div>

              <p className="text-gray-300 mb-6">
                This is where it gets tricky. You can easily create a model that scores incredibly high on benchmarks but outputs garbage in real conversation. This is known as <strong>Goodhart's Law</strong>: "When a measure becomes a target, it ceases to be a good measure."
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                 <div className="bg-gray-800 p-5 rounded-lg">
                    <h3 className="text-lg font-bold text-white mb-2">📊 Benchmarks (GSM8K, ARC)</h3>
                    <p className="text-gray-400 text-sm">
                        Merged models often accidentally train on the test set ("data contamination") because they combine so many sources. High scores on Hugging Face Leaderboard are necessary for attention but not sufficient for quality.
                    </p>
                 </div>
                 <div className="bg-gray-800 p-5 rounded-lg">
                    <h3 className="text-lg font-bold text-white mb-2">✨ Vibes (MT-Bench, Chatbot Arena)</h3>
                    <p className="text-gray-400 text-sm">
                        The ultimate test is "Vibes". Does the model feel smart? Does it follow instructions? Using LLM-as-a-Judge (GPT-4 grading your model's responses) is currently the best proxy for human preference.
                    </p>
                 </div>
              </div>
            </div>
          </section>

          {/* Challenges Section */}
          <section id="challenges" className="mb-12 lg:mb-16">
             <div className="bg-gradient-to-br from-yellow-900/20 to-gray-900 border border-yellow-500/30 rounded-xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="text-yellow-400" size={28} />
                <h2 className="text-2xl lg:text-3xl font-bold text-yellow-100">The Dangers of Merging</h2>
              </div>
               <ul className="list-disc pl-6 space-y-4 text-gray-300">
                  <li>
                      <strong>License Contamination:</strong> If you merge a model with an Apache 2.0 license and a model with a Creative Commons Non-Commercial license, the resulting model is effectively Non-Commercial. You must trace the lineage of every model you use.
                  </li>
                  <li>
                      <strong>Tokenizer Hell:</strong> Merging Llama 2 and Llama 3? Good luck. If the tokenizers (vocabularies) are different, the weights map to different words. You can only merge models that share the exact same architecture and vocabulary.
                  </li>
                  <li>
                      <strong>Concept Bleed:</strong> Merging an "Uncensored" model with a "Safety Tuned" model often results in unpredictable behavior. The model might refuse a request half-way through generation.
                  </li>
               </ul>
             </div>
          </section>

          {/* Future Section */}
          <section id="future" className="mb-16">
             <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 lg:p-8">
                <div className="flex items-center gap-3 mb-4">
                    <Cpu className="text-purple-400" size={28} />
                    <h2 className="text-2xl lg:text-3xl font-bold text-purple-100">The Future: Evolutionary Merging</h2>
                </div>
                <p className="text-gray-300 leading-relaxed">
                    We are moving towards automated evolutionary algorithms. Imagine a system that:
                </p>
                <ol className="list-decimal pl-6 mt-4 space-y-2 text-gray-300">
                    <li>Takes 100 open source models.</li>
                    <li>Randomly merges them with different recipes.</li>
                    <li>Evaluates the offspring.</li>
                    <li>Keeps the winners and merges them again.</li>
                </ol>
                <p className="text-gray-300 mt-4">
                    This "genetic algorithm" approach to model creation is already being explored by Sakana AI and others. We might soon see models that no human explicitly designed.
                </p>
             </div>
          </section>

           {/* Checklist Section */}
          <section className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-xl p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-emerald-300 mb-4 flex items-center gap-2">
                ✅ Merging Checklist
              </h3>
              <p className="text-emerald-200/80 mb-6">
                Before you publish your model to Hugging Face, ensure:
              </p>

              <div className="space-y-3">
                {checklistItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleChecklist(idx)}
                    className="w-full flex items-start gap-3 bg-gray-900/50 hover:bg-gray-900/70 p-4 rounded-lg transition-all text-left group"
                  >
                    {checklist[idx] ? (
                      <CheckCircle className="text-green-400 flex-shrink-0 mt-0.5" size={20} />
                    ) : (
                      <Circle className="text-gray-600 group-hover:text-green-400 flex-shrink-0 mt-0.5" size={20} />
                    )}
                    <span className={`${checklist[idx] ? 'text-green-300 line-through' : 'text-gray-300 group-hover:text-white'}`}>
                      {item}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

           {/* CTA Section */}
           <section className="mb-16">
            <div className="bg-gradient-to-r from-emerald-900/40 to-green-900/40 border border-emerald-500/30 rounded-xl p-6 lg:p-8 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-emerald-300 mb-2">
                  Explore AI Tools
                </h3>
                <p className="text-emerald-200/80 mb-0 max-w-xl">
                    Need to generate synthetic data for your next fine-tune? Or test your merged model's SSL certificates? We have tools for that.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                    href="/tools"
                    className="inline-block bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-semibold transition-all text-white shadow-lg whitespace-nowrap"
                >
                    View Tools →
                </Link>
                <Link
                    href="/blog"
                    className="inline-block bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-all text-white shadow-lg whitespace-nowrap"
                >
                    Back to Blog
                </Link>
              </div>
            </div>
          </section>

          {/* Related Topics */}
          <section className="mb-16">
             <h2 className="text-2xl font-bold text-gray-200 mb-6">Related Topics</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/blog/rise-of-small-language-models-slm-llama-phi-edge" className="block p-4 bg-gray-800/40 border border-gray-700 rounded-lg hover:bg-gray-800 transition-all group">
                    <h3 className="font-bold text-emerald-300 group-hover:text-white transition-colors">Small Language Models</h3>
                    <p className="text-sm text-gray-500 mt-2">Perfect candidates for merging.</p>
                </Link>
                <Link href="/blog/synthetic-data-engineering-guide" className="block p-4 bg-gray-800/40 border border-gray-700 rounded-lg hover:bg-gray-800 transition-all group">
                    <h3 className="font-bold text-emerald-300 group-hover:text-white transition-colors">Synthetic Data</h3>
                    <p className="text-sm text-gray-500 mt-2">Generate data to fine-tune your experts.</p>
                </Link>
             </div>
          </section>

        </div>
      </main>
    </div>
  );
}
