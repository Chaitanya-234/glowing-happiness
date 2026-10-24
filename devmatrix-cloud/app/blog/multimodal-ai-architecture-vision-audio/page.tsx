'use client';

import JsonLdArticle from '@/components/JsonLdArticle';
import {
    Activity,
    Aperture,
    ArrowRight,
    BookOpen,
    CheckCircle, Circle,
    Cpu,
    Eye,
    Globe,
    Image as ImageIcon,
    Layers,
    Menu,
    Video,
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
  { id: 'intro', title: 'Introduction', icon: Eye },
  { id: 'llm-to-mllm', title: 'From LLMs to MLLMs', icon: Layers },
  { id: 'theoretical-framework', title: 'Theoretical Framework', icon: BookOpen },
  { id: 'architecture', title: 'Architecture Deep Dive', icon: Cpu },
  { id: 'training', title: 'Training Pipelines', icon: Activity },
  { id: 'gemini-gpt4', title: 'Gemini 1.5 vs GPT-4o', icon: Zap },
  { id: 'applications', title: 'Industry Applications', icon: Globe },
  { id: 'future', title: 'Future of Multimodality', icon: Aperture },
];

const checklistItems: string[] = [
  'Assess data requirements (text, image, audio, video)',
  'Choose between Native MLLMs vs. Glue Architectures',
  'Evaluate latency constraints for real-time video/audio',
  'Implement safety filters for visual inputs (NSFW/Violence)',
  'Optimize context window usage for high-res images',
  'Plan for increased inference costs (tokens per pixel)',
  'Test multimodal alignment (does it see what you see?)',
  'Consider privacy implications of processing user audio/video',
];

export default function MultimodalAiGuide() {
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});
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

  const toggleChecklist = (index: number): void => {
    setChecklist(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const scrollToSection = (id: string): void => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const completedItems = Object.values(checklist).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-950/20 to-gray-900 text-white font-sans">
      <JsonLdArticle
        headline="Multimodal AI Architecture: Bridging Text, Vision, and Audio"
        description="Deep dive into the architecture of Multimodal Large Language Models (MLLMs). Learn how Gemini 1.5 and GPT-4o process text, images, and audio simultaneously."
        datePublished="2026-01-03"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/multimodal-ai-architecture-vision-audio"
      />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-[100]">
        <div
          className="h-full bg-gradient-to-r from-teal-400 to-emerald-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-20 right-4 z-[60] lg:hidden bg-teal-600 hover:bg-teal-700 p-3 rounded-lg shadow-lg transition-colors"
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <nav className={`fixed top-0 left-0 h-full bg-gray-900/95 backdrop-blur-sm border-r border-teal-500/30 w-64 transform transition-transform duration-300 z-[55] ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 pt-20 lg:pt-0`}>
        <div className="p-6 overflow-y-auto h-full">
          <h2 className="text-xl font-bold text-teal-400 mb-6">Table of Contents</h2>
          <ul className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                      activeSection === section.id
                        ? 'bg-teal-600 text-white'
                        : 'text-teal-300 hover:bg-teal-800/30'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{section.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 p-4 bg-teal-900/30 rounded-lg">
            <div className="text-sm text-teal-300 mb-2">Readiness Checklist</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-400 to-emerald-500 transition-all duration-300"
                  style={{ width: `${(completedItems / checklistItems.length) * 100}%` }}
                />
              </div>
              <span className="text-sm text-teal-400">{completedItems}/{checklistItems.length}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-64 px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <div className="max-w-4xl mx-auto">

          {/* Hero Section */}
          <header className="mb-12 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-sm font-medium mb-6 border border-teal-500/30">
              <Eye size={16} />
              <span>Vision, Audio, & Text Unified</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 leading-tight mb-4 lg:mb-6">
              Multimodal AI Architecture: Bridging Text, Vision, and Audio
            </h1>
            <p className="text-teal-100/80 text-base lg:text-lg mb-8 leading-relaxed max-w-2xl">
              We humans don't just read text; we see, hear, and feel. Now, AI models are catching up. Dive deep into the architecture of Multimodal Large Language Models (MLLMs), from tokenizing pixels to processing audio waveforms in real-time.
            </p>
            <div className="flex flex-wrap gap-4 text-teal-400 text-xs sm:text-sm border-t border-teal-500/20 pt-6">
              <span className="flex items-center gap-1"><Zap size={14}/> Published: January 3, 2026</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1"><Activity size={14}/> 40 min read</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1"><Layers size={14}/> Multimodal AI</span>
            </div>
          </header>

          {/* Introduction */}
          <section id="intro" className="mb-12 lg:mb-16">
            <div className="prose prose-lg prose-invert max-w-none text-gray-300">
              <p className="lead text-xl text-teal-100/90">
                The first decade of Deep Learning was characterized by specialization. We had CNNs for images (ResNet, EfficientNet), RNNs/LSTMs for audio, and Transformers for text (BERT, GPT). Each modality lived in its own silo, with its own architectures, datasets, and benchmarks.
              </p>
              <p>
                But the world is not unimodal. When you watch a movie, you process visual cues (facial expressions, lighting), auditory cues (dialogue, music), and textual cues (subtitles) simultaneously to form a coherent understanding. To build truly general AI, we needed to break down these silos.
              </p>
              <p>
                2024 and 2025 gave us the answer: <strong>Multimodal Large Language Models (MLLMs)</strong>. Models like Gemini 1.5 Pro and GPT-4o are not just "text models with eyes"; they are natively multimodal, capable of reasoning across different types of data as fluidly as we do. This article explores the engineering marvels that make this possible.
              </p>
            </div>
          </section>

          {/* LLMs to MLLMs */}
          <section id="llm-to-mllm" className="mb-12 lg:mb-16 scroll-mt-24">
            <div className="bg-gradient-to-r from-teal-900/40 to-cyan-900/40 border border-teal-500/30 rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-teal-500/20 rounded-lg">
                  <Layers className="text-teal-400" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-white m-0">From LLMs to MLLMs</h2>
              </div>

              <div className="space-y-6 text-gray-300">
                <p>
                  A Large Language Model (LLM) is essentially a machine that predicts the next token in a sequence. It operates on a discrete vocabulary of text tokens.
                </p>
                <p>
                  To create a Multimodal LLM (MLLM), the fundamental challenge is: <strong>How do we represent images and audio as tokens that an LLM can understand?</strong>
                </p>

                <h3 className="text-xl font-semibold text-teal-300">The Universal Interface</h3>
                <p>
                  The breakthrough realization was that we can align all modalities into a shared embedding space. If the vector for the word "cat" and the vector for an image of a cat are close together in high-dimensional space, the model can "understand" the image using the same reasoning capabilities it learned from text.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                   <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 text-center">
                     <div className="bg-blue-500/20 p-3 rounded-full inline-block mb-3"><ImageIcon className="text-blue-400"/></div>
                     <strong className="block text-white mb-1">Visual Input</strong>
                     <span className="text-xs text-gray-400">Pixels → Patches → Visual Tokens</span>
                   </div>
                   <div className="flex items-center justify-center">
                     <ArrowRight className="text-gray-600 hidden md:block" />
                     <ArrowRight className="text-gray-600 md:hidden rotate-90 my-2" />
                   </div>
                   <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-700 text-center">
                     <div className="bg-purple-500/20 p-3 rounded-full inline-block mb-3"><Cpu className="text-purple-400"/></div>
                     <strong className="block text-white mb-1">Transformer Backbone</strong>
                     <span className="text-xs text-gray-400">Processes All Tokens</span>
                   </div>
                </div>
              </div>
            </div>
          </section>

          {/* Theoretical Framework */}
           <section id="theoretical-framework" className="mb-12 lg:mb-16 scroll-mt-24">
             <div className="flex items-center gap-3 mb-6">
                <BookOpen className="text-teal-400" size={28} />
                <h2 className="text-3xl font-bold text-white">Theoretical Framework</h2>
              </div>

              <div className="prose prose-lg prose-invert max-w-none text-gray-300 space-y-6">
                <p>
                  The capability of MLLMs is grounded in complex mathematical principles that allow disparate data types to coexist in a single semantic universe.
                </p>

                <h3 className="text-2xl text-teal-200 mt-8">Contrastive Learning and Alignment (CLIP)</h3>
                <p>
                  A cornerstone of multimodality is <strong>Contrastive Language-Image Pre-training (CLIP)</strong>. The core idea is to learn a joint embedding space where the dot product of an image embedding <code>I</code> and its corresponding text caption embedding <code>T</code> is maximized, while minimizing the dot product with incorrect captions.
                </p>
                <p>
                  Mathematically, we optimize the InfoNCE loss function. For a batch of <code>N</code> pairs, we want the model to identify the correct <code>N</code> pairs out of <code>N^2</code> possibilities. This forces the model to learn <strong>semantic features</strong> (e.g., recognizing "fluffiness" or "redness") rather than just pixel statistics.
                </p>

                <h3 className="text-2xl text-teal-200 mt-8">The Manifold Hypothesis</h3>
                <p>
                  The Manifold Hypothesis states that high-dimensional real-world data (like 4K images or raw audio) actually lies on a low-dimensional manifold embedded within that space.
                </p>
                <p>
                  An MLLM works because the "Text Manifold" and the "Image Manifold" can be topologically aligned. When we project visual tokens into the LLM's input space, we are effectively mapping points from the visual manifold onto the text manifold. If this mapping is smooth, the LLM can "read" the image as if it were a detailed description.
                </p>

                <h3 className="text-2xl text-teal-200 mt-8">Cross-Attention Mechanisms</h3>
                <p>
                  In the Transformer architecture, the <strong>Attention Mechanism</strong> <code>Attention(Q, K, V) = softmax(QK^T / sqrt(d))V</code> allows tokens to influence each other. In MLLMs, we often use <strong>Cross-Attention</strong>.
                </p>
                <p>
                  Here, the Queries (Q) might come from the text stream ("What color is the car?"), while the Keys (K) and Values (V) come from the image encoder. This allows the model to "attend" to specific regions of the image that are relevant to the text query, effectively "looking" at the car when asked about it.
                </p>

                <h3 className="text-2xl text-teal-200 mt-8">Information Theory & Bitrate Discrepancy</h3>
                <p>
                  A challenge in multimodality is the vast difference in information density.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Text:</strong> High semantic density, low bitrate. A single word "Universe" contains massive concept coverage.</li>
                    <li><strong>Video:</strong> Low semantic density, massive bitrate. A 10-second video of a wall is megabytes of data but contains almost zero semantic information.</li>
                </ul>
                <p>
                  To solve this, MLLMs use <strong>Perceiver Resamplers</strong> or <strong>Q-Formers</strong> to compress thousands of visual features into a small, fixed number of "learned queries" (e.g., 64 or 128 tokens) that capture the essence of the visual input without overwhelming the LLM's context window.
                </p>
              </div>
          </section>

          {/* Architecture Deep Dive */}
          <section id="architecture" className="mb-12 lg:mb-16 scroll-mt-24">
             <div className="flex items-center gap-3 mb-6">
                <Cpu className="text-teal-400" size={28} />
                <h2 className="text-3xl font-bold text-white">Architecture Deep Dive</h2>
              </div>

              <div className="prose prose-lg prose-invert max-w-none text-gray-300 space-y-6">
                <p>
                  Let's open the hood of a modern MLLM. While proprietary architectures like GPT-4o are closed, open-weights models like LLaVA (Large Language-and-Vision Assistant) and Chameleon give us a clear blueprint.
                </p>

                <h3 className="text-2xl text-teal-200 mt-8">1. Visual Encoders & Tokenization</h3>
                <p>
                  You cannot feed raw pixels into an LLM. An HD image has millions of pixels; that's too many tokens.
                </p>
                <p>
                  <strong>ViT (Vision Transformer):</strong> Most MLLMs use a Vision Transformer (like CLIP-ViT or SigLIP) as the "eye." The image is sliced into patches (e.g., 14x14 pixels). Each patch is flattened and projected into a vector.
                </p>
                <p>
                  <strong>The Projector (The Glue):</strong> The output of the Vision Encoder (e.g., 256 image feature vectors) needs to be translated into the LLM's language. This is done by a "Projector" module—often a simple Multi-Layer Perceptron (MLP) or a Q-Former (Query Transformer). The Projector maps visual features to the same dimension as the LLM's text embeddings.
                </p>
                <p className="bg-gray-800/50 p-4 border-l-4 border-teal-500 italic">
                  "To the LLM, an image just looks like a sequence of strange, foreign words at the beginning of the sentence."
                </p>

                <h3 className="text-2xl text-teal-200 mt-8">2. Audio Processing</h3>
                <p>
                  Audio is handled similarly. Raw waveforms are converted into spectrograms (visual representations of sound frequencies). These spectrograms are then chopped into time-slices and encoded by an Audio Encoder (like Whisper or Conformer).
                </p>
                <p>
                  <strong>Native Audio Support:</strong> Older systems used a separate "Speech-to-Text" (ASR) model to transcribe audio, then fed the text to the LLM. This loses information like tone, emotion, and background noise. <strong>Native MLLMs</strong> ingest the audio tokens directly, allowing them to detect sarcasm or identify a specific person's voice.
                </p>

                <h3 className="text-2xl text-teal-200 mt-8">3. Early Fusion vs. Late Fusion</h3>
                <p>
                  This is a critical architectural decision.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Late Fusion (The Glue approach):</strong> You take a pre-trained LLM (like Llama 3) and a pre-trained Vision Encoder (like CLIP), and you train a small adapter to connect them. This is efficient but limited. The LLM's "brain" wasn't built for vision.</li>
                  <li><strong>Early Fusion (The Native approach):</strong> You train the model from scratch on mixed sequences of text, images, and audio. The model learns to process multimodal data at a fundamental level. GPT-4o and Gemini 1.5 are examples of this. They don't "see" an image via a translator; they "grok" it natively.</li>
                </ul>

                <h3 className="text-2xl text-teal-200 mt-8">4. Any-to-Any Generation</h3>
                <p>
                  True MLLMs are "Any-to-Any." They can take text/audio/image input and output text/audio/image.
                </p>
                <p>
                  <strong>Image Generation:</strong> Instead of just outputting text, the model can output "visual tokens." A separate decoder (like a VQ-GAN decoder) turns these tokens back into pixels. This allows the model to generate diagrams, edit images, or draw on a whiteboard, seamlessly interleaved with text.
                </p>
              </div>
          </section>

          {/* Training Pipelines */}
          <section id="training" className="mb-12 lg:mb-16 scroll-mt-24">
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="text-emerald-400" size={28} />
                <h2 className="text-3xl font-bold text-white">Training Pipelines</h2>
              </div>

              <div className="prose prose-lg prose-invert max-w-none text-gray-300">
                <p>
                  Training an MLLM is significantly harder than a text-only model due to data complexity and instability.
                </p>

                <h3 className="text-xl font-bold text-emerald-300 mt-6">Stage 1: Pre-training (Feature Alignment)</h3>
                <p>
                   The goal here is to teach the model that an image of a dog aligns with the text "a dog." Models are trained on massive datasets of image-text pairs (like LAION-5B) and video-text transcripts. The model learns to predict the text caption given the image.
                </p>

                <h3 className="text-xl font-bold text-emerald-300 mt-6">Stage 2: Instruction Tuning (Visual Reasoning)</h3>
                <p>
                  Just recognizing objects isn't enough. We want the model to <em>reason</em>.
                  "Why is this meme funny?"
                  "What happens if I cut the red wire in this diagram?"
                </p>
                <p>
                  This requires high-quality "Visual Instruction Data"—questions and complex answers about images. Often, this data is synthetically generated by using a strong model (like GPT-4V) to ask questions about images and answer them, creating a training set for smaller models.
                </p>
              </div>
            </div>
          </section>

          {/* Gemini vs GPT-4o */}
          <section id="gemini-gpt4" className="mb-12 lg:mb-16 scroll-mt-24">
             <div className="flex items-center gap-3 mb-6">
                <Zap className="text-teal-400" size={28} />
                <h2 className="text-3xl font-bold text-white">Gemini 1.5 vs GPT-4o</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800/40 p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/50 transition-colors">
                  <h3 className="text-xl font-bold text-blue-300 mb-4">Gemini 1.5 Pro</h3>
                  <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start gap-2">
                        <CheckCircle className="text-blue-500 min-w-[16px] mt-1" size={16} />
                        <span><strong>Massive Context Window:</strong> Up to 2 Million tokens. Can ingest entire movies (video + audio) or massive codebases at once.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle className="text-blue-500 min-w-[16px] mt-1" size={16} />
                        <span><strong>Mixture-of-Experts (MoE):</strong> Highly efficient inference architecture.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle className="text-blue-500 min-w-[16px] mt-1" size={16} />
                        <span><strong>Video First:</strong> Built from the ground up to understand temporal sequences in video.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-800/40 p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-colors">
                  <h3 className="text-xl font-bold text-purple-300 mb-4">GPT-4o (Omni)</h3>
                   <ul className="space-y-3 text-sm text-gray-300">
                    <li className="flex items-start gap-2">
                        <CheckCircle className="text-purple-500 min-w-[16px] mt-1" size={16} />
                        <span><strong>Real-time Audio:</strong> Extremely low latency (~300ms) for conversational speech. Can sing, whisper, and emote.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle className="text-purple-500 min-w-[16px] mt-1" size={16} />
                        <span><strong>Native End-to-End:</strong> Single model handles text, audio, and vision inputs/outputs without separate ASR/TTS models.</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <CheckCircle className="text-purple-500 min-w-[16px] mt-1" size={16} />
                        <span><strong>Visual Reasoning:</strong> State-of-the-art on charts, handwriting, and complex visual logic.</span>
                    </li>
                  </ul>
                </div>
              </div>
          </section>

          {/* Applications */}
          <section id="applications" className="mb-12 lg:mb-16 scroll-mt-24">
            <div className="bg-gradient-to-br from-teal-900/20 to-emerald-900/20 border border-teal-500/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Globe className="text-teal-400" size={28} />
                <h2 className="text-3xl font-bold text-white">Industry Applications</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="space-y-2">
                    <div className="bg-gray-800 p-3 rounded-lg w-fit"><Activity className="text-red-400"/></div>
                    <h3 className="text-lg font-bold text-white">Healthcare</h3>
                    <p className="text-gray-400 text-sm">
                        Analyzing X-rays, MRIs, and CT scans alongside patient history (text) to diagnose conditions. MLLMs can spot anomalies a doctor might miss in the visual noise.
                    </p>
                 </div>
                 <div className="space-y-2">
                    <div className="bg-gray-800 p-3 rounded-lg w-fit"><Cpu className="text-yellow-400"/></div>
                    <h3 className="text-lg font-bold text-white">Robotics</h3>
                    <p className="text-gray-400 text-sm">
                        Robots need to see. MLLMs allow robots to understand natural language commands ("Pick up the red apple") and translate them into motor actions based on visual input.
                    </p>
                 </div>
                 <div className="space-y-2">
                    <div className="bg-gray-800 p-3 rounded-lg w-fit"><Video className="text-pink-400"/></div>
                    <h3 className="text-lg font-bold text-white">Content Creation</h3>
                    <p className="text-gray-400 text-sm">
                        Automated video editing, generating thumbnails, captioning videos, and even creating entire movies from scripts.
                    </p>
                 </div>
              </div>
            </div>
          </section>

          {/* Checklist */}
           <section className="mb-12 lg:mb-16">
            <div className="bg-gray-800/50 border border-teal-500/30 rounded-xl p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-teal-300 mb-4 flex items-center gap-2">
                ✅ Multimodal Strategy Checklist
              </h3>
              <p className="text-teal-200/80 mb-6">
                Building a multimodal app? Don't miss these steps:
              </p>

              <div className="space-y-3">
                {checklistItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleChecklist(idx)}
                    className="w-full flex items-start gap-3 bg-gray-900/50 hover:bg-gray-900/70 p-4 rounded-lg transition-all text-left group"
                  >
                    {checklist[idx] ? (
                      <CheckCircle className="text-emerald-400 flex-shrink-0 mt-0.5" size={20} />
                    ) : (
                      <Circle className="text-gray-500 group-hover:text-emerald-400 flex-shrink-0 mt-0.5 transition-colors" size={20} />
                    )}
                    <span className={`${checklist[idx] ? 'text-emerald-300 line-through' : 'text-gray-300'}`}>
                      {item}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Future Outlook */}
          <section id="future" className="mb-16 scroll-mt-24">
             <div className="flex items-center gap-3 mb-6">
                <Aperture className="text-teal-400" size={28} />
                <h2 className="text-3xl font-bold text-white">The Future of Multimodality</h2>
              </div>
              <div className="prose prose-lg prose-invert max-w-none text-gray-300">
                <p>
                  We are rapidly approaching a point where the distinction between "text model" and "image model" will disappear. All foundation models will be inherently multimodal.
                </p>
                <p>
                  <strong>Sensory Expansion:</strong> Why stop at vision and audio? Future models will ingest touch (haptic data), smell (chemical sensor data), and 3D spatial data (LiDAR).
                </p>
                <p>
                  <strong>The Action Gap:</strong> The next frontier is connecting this multimodal understanding to <em>action</em>—bringing us back to Agentic AI. A model that can see the screen (Vision), understand the user's voice (Audio), and click the mouse (Action) is the ultimate interface.
                </p>
              </div>
          </section>

          {/* Conclusion */}
          <section className="mb-16 border-t border-gray-800 pt-12">
            <div className="bg-gray-800/50 border border-teal-500/30 rounded-xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Experience Multimodality</h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Don't just read about it. Test our multimodal tools powered by Gemini 1.5 and GPT-4o today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                 <Link
                    href="/ai-tools/code-translator"
                    className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 px-8 py-4 rounded-full font-bold transition-all text-white shadow-lg shadow-teal-900/50"
                >
                    <Layers size={20} />
                    Try AI Tools
                </Link>
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-8 py-4 rounded-full font-bold transition-all text-white"
                >
                    Back to Blog <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
