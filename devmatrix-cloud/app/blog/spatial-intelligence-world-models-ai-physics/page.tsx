'use client';

import JsonLdArticle from '@/components/JsonLdArticle';
import {
    Activity,
    AlertTriangle,
    ArrowRight,
    BookOpen,
    Bot,
    Box,
    CheckCircle, Circle,
    Cpu,
    Eye,
    Globe,
    Layers,
    Menu,
    Target,
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
  { id: 'intro', title: 'Introduction', icon: Globe },
  { id: 'what-is-spatial', title: 'What is Spatial AI?', icon: Box },
  { id: 'theoretical-framework', title: 'Theoretical Framework', icon: BookOpen },
  { id: 'architecture', title: 'World Model Architectures', icon: Layers },
  { id: 'robotics', title: 'Embodied Intelligence', icon: Activity },
  { id: 'use-cases', title: 'Real-World Applications', icon: Zap },
  { id: 'challenges', title: 'Challenges & Physics', icon: AlertTriangle },
  { id: 'future', title: 'The 3D Future', icon: Eye },
];

const checklistItems: string[] = [
  'Evaluate 3D data availability (LiDAR, CAD, NeRFs)',
  'Select a World Model architecture (JEPA vs Diffusion)',
  'Define "Action Space" for embodied agents',
  'Implement physics consistency checks (Collision detection)',
  'Optimize inference for real-time robotics (Latent space)',
  'Ensure Sim-to-Real transfer capability',
  'Integrate multimodal sensory inputs (Tactile, Proprioception)',
  'Establish safety guardrails for physical interaction',
];

export default function SpatialIntelligenceGuide() {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950/20 to-gray-900 text-white font-sans">
      <JsonLdArticle
        headline="Spatial Intelligence: Beyond Generative AI to World Understanding"
        description="Moving from text generation to 3D world understanding. A deep dive into World Models, V-JEPA, and the future of Embodied AI."
        datePublished="2026-01-15"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/spatial-intelligence-world-models-ai-physics"
      />

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-[100]">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-cyan-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Mobile Menu Toggle */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="fixed top-20 right-4 z-[60] lg:hidden bg-indigo-600 hover:bg-indigo-700 p-3 rounded-lg shadow-lg transition-colors"
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <nav className={`fixed top-0 left-0 h-full bg-gray-900/95 backdrop-blur-sm border-r border-indigo-500/30 w-64 transform transition-transform duration-300 z-[55] ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 pt-20 lg:pt-0`}>
        <div className="p-6 overflow-y-auto h-full">
          <h2 className="text-xl font-bold text-indigo-400 mb-6">Table of Contents</h2>
          <ul className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <li key={section.id}>
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                      activeSection === section.id
                        ? 'bg-indigo-600 text-white'
                        : 'text-indigo-300 hover:bg-indigo-800/30'
                    }`}
                  >
                    <Icon size={18} />
                    <span className="text-sm">{section.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 p-4 bg-indigo-900/30 rounded-lg">
            <div className="text-sm text-indigo-300 mb-2">Readiness Checklist</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-cyan-500 transition-all duration-300"
                  style={{ width: `${(completedItems / checklistItems.length) * 100}%` }}
                />
              </div>
              <span className="text-sm text-indigo-400">{completedItems}/{checklistItems.length}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="lg:ml-64 px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
        <div className="max-w-4xl mx-auto">

          {/* Hero Section */}
          <header className="mb-12 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-medium mb-6 border border-emerald-500/30">
              <Box size={16} />
              <span>The Next Frontier of AI</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 leading-tight mb-4 lg:mb-6">
              Spatial Intelligence: Beyond Generative AI to World Understanding
            </h1>
            <p className="text-indigo-200/90 text-base lg:text-lg mb-8 leading-relaxed max-w-2xl">
              Generative AI gave computers the ability to speak. Spatial Intelligence gives them the ability to see, move, and understand the physical world. Explore the revolution led by World Labs, V-JEPA, and the new era of Embodied AI.
            </p>
            <div className="flex flex-wrap gap-4 text-indigo-400 text-xs sm:text-sm border-t border-indigo-500/20 pt-6">
              <span className="flex items-center gap-1"><Zap size={14}/> Published: January 15, 2026</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1"><Target size={14}/> 55 min read</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1"><Cpu size={14}/> Robotics & 3D AI</span>
            </div>
          </header>

          {/* Introduction */}
          <section id="intro" className="mb-12 lg:mb-16">
            <div className="prose prose-lg prose-invert max-w-none text-gray-300">
              <p className="lead text-xl text-indigo-100/90">
                If 2023 was the year of the Chatbot, and 2024 was the year of the Agent, 2025 has undeniably become the year of <strong>Spatial Intelligence</strong>. For decades, Artificial Intelligence has been largely &quot;disembodied.&quot; It existed on servers, processed text or 2D images, and outputted similar digital artifacts. It had no concept of &quot;up,&quot; &quot;down,&quot; &quot;heavy,&quot; or &quot;impenetrable.&quot; It knew that the word &quot;apple&quot; is often followed by &quot;pie,&quot; but it didn&apos;t know that if you drop an apple, it falls, or if you squeeze it, it yields.
              </p>
              <p>
                But this is changing. With the emergence of startups like Fei-Fei Li&apos;s <strong>World Labs</strong> and the release of models like Meta&apos;s <strong>V-JEPA</strong> and OpenAI&apos;s advanced video-to-physics engines, we are witnessing the birth of AI that understands 3D space, physics, and object permanence. This isn&apos;t just about generating better video games; it&apos;s about creating the &quot;brains&quot; for the billions of robots that will eventually share our physical spaces.
              </p>
              <p>
                Spatial Intelligence is the missing link between the digital mind of an LLM and the physical body of a robot. It is the capability that allows a machine to reason about the 3D structure of the world from 2D inputs, predict how that world changes over time, and plan actions to achieve physical goals.
              </p>
            </div>
          </section>

          {/* What is Spatial AI? */}
          <section id="what-is-spatial" className="mb-12 lg:mb-16 scroll-mt-24">
            <div className="bg-gradient-to-r from-emerald-900/40 to-blue-900/40 border border-emerald-500/30 rounded-2xl p-8 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-emerald-500/20 rounded-lg">
                  <Box className="text-emerald-400" size={32} />
                </div>
                <h2 className="text-3xl font-bold text-white m-0">What is Spatial Intelligence?</h2>
              </div>

              <div className="space-y-6 text-gray-300">
                <p>
                  Spatial Intelligence is the ability to perceive, reason about, and interact with the 3D world. Unlike &quot;Computer Vision,&quot; which is often about classification (e.g., &quot;this image contains a cat&quot;), Spatial Intelligence is about <strong>reconstruction and simulation</strong> (e.g., &quot;this cat is 3 meters away, sitting on a soft surface, and if it jumps, it will land there&quot;).
                </p>

                <h3 className="text-xl font-semibold text-emerald-300">The Core Components</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <Box className="text-emerald-400 flex-shrink-0 mt-1" size={20}/>
                    <div>
                      <strong className="text-white block">3D Reconstruction</strong>
                      <span className="text-sm opacity-80">Inferring 3D geometry from 2D inputs. Knowing that a mug has a back side even if you can&apos;t see it.</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Box className="text-emerald-400 flex-shrink-0 mt-1" size={20}/>
                    <div>
                      <strong className="text-white block">Physics Simulation</strong>
                      <span className="text-sm opacity-80">Understanding gravity, friction, mass, and collision. Predicting the consequences of forces.</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Box className="text-emerald-400 flex-shrink-0 mt-1" size={20}/>
                    <div>
                      <strong className="text-white block">Affordance Recognition</strong>
                      <span className="text-sm opacity-80">Understanding what can be done with an object. A handle affords grasping; a button affords pushing.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Theoretical Framework */}
           <section id="theoretical-framework" className="mb-12 lg:mb-16 scroll-mt-24">
             <div className="flex items-center gap-3 mb-6">
                <BookOpen className="text-emerald-400" size={28} />
                <h2 className="text-3xl font-bold text-white">Theoretical Framework</h2>
              </div>

              <div className="prose prose-lg prose-invert max-w-none text-gray-300 space-y-6">
                <p>
                  The theoretical underpinnings of Spatial Intelligence represent a departure from the &quot;Next Token Prediction&quot; paradigm that dominates LLMs. While LLMs model the statistical distribution of language, Spatial Models must model the <strong>statistical distribution of the physical world</strong>. This section explores the deep theory behind how we teach machines to understand space, time, and causality.
                </p>

                <h3 className="text-2xl text-emerald-200 mt-8">1. World Models and the JEPA Architecture</h3>
                <p>
                  At the heart of modern Spatial Intelligence is the concept of a <strong>World Model</strong>. A World Model is an internal representation of the environment that allows an agent to simulate potential futures without acting in the real world.
                </p>
                <p>
                  Yann LeCun, Chief AI Scientist at Meta, has long argued that &quot;Autoregressive Generative Models&quot; (like GPT-4) are insufficient for physical understanding because they predict every pixel (or token) in detail. The physical world is noisy and unpredictable at the micro-level (the exact position of every leaf in the wind) but predictable at the macro-level (the tree is still standing).
                </p>
                <p>
                  LeCun proposed the <strong>Joint Embedding Predictive Architecture (JEPA)</strong>. Unlike Generative models that predict <code>x_{`{t+1}`}</code> from <code>x_t</code> in pixel space, JEPA predicts the <em>representation</em> of <code>x_{`{t+1}`}</code> in an abstract latent space.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>The Encoder:</strong> Maps the current observation (video frame) to a latent vector <code>s_t</code>.</li>
                    <li><strong>The Predictor:</strong> Takes <code>s_t</code> and a proposed action <code>a_t</code> and predicts the next latent state <code>s_{`{t+1}`}</code>.</li>
                    <li><strong>The Loss Function:</strong> Instead of minimizing pixel reconstruction error (which encourages blurriness in uncertain regions), JEPA minimizes the distance between the predicted latent state and the actual latent state of the next frame.</li>
                </ul>
                <p>
                  This allows the model to ignore irrelevant details (camera noise, moving shadows) and focus on semantically meaningful changes (the object moved left). This &quot;Semantic Physics&quot; is crucial for robotics, where processing every pixel is computationally prohibitive and sensitive to noise.
                </p>

                <h3 className="text-2xl text-emerald-200 mt-8">2. 3D Representations: From Voxels to Gaussian Splatting</h3>
                <p>
                  How do we represent 3D space in a neural network? The field has evolved through several paradigms, each with theoretical trade-offs between resolution, memory, and trainability.
                </p>
                <p>
                   <strong>Voxels (Volumetric Pixels):</strong> The earliest approach. Imagine Minecraft blocks. The world is a 3D grid <code>V(x,y,z)</code> where each cell is occupied or empty.
                   <br/><em>Theory limit:</em> Memory usage grows cubically <code>O(N^3)</code>. Doubling resolution increases memory 8x. This makes high-resolution voxel grids intractable for large scenes.
                </p>
                <p>
                   <strong>Implicit Neural Representations (NeRFs):</strong> Neural Radiance Fields changed everything in 2020. Instead of storing geometry explicitly, we train a neural network <code>F(x,y,z, \theta, \phi) \rightarrow (RGB, \sigma)</code>. The network <em>is</em> the scene. To render a pixel, you shoot a ray and query the network for color and density at points along the ray.
                   <br/><em>Theory benefit:</em> Infinite resolution (continuous function).
                   <br/><em>Theory drawback:</em> Extremely slow to render (requires millions of network evaluations per frame) and static (hard to deform or change).
                </p>
                <p>
                   <strong>3D Gaussian Splatting (3DGS):</strong> The current state-of-the-art (2024-2025). 3DGS represents the scene as a cloud of 3D Gaussians (ellipsoids), each with position, covariance (shape), opacity, and Spherical Harmonic coefficients (color).
                   <br/><em>Theory breakthrough:</em> Splatting allows for explicit rasterization. You project the 3D Gaussians to 2D screen space and blend them. This is differentiable and runs in real-time (100+ FPS). For Spatial Intelligence, 3DGS provides a mutable, explicit representation that agents can interact with.
                </p>

                <h3 className="text-2xl text-emerald-200 mt-8">3. The Embodiment Hypothesis & Moravec&apos;s Paradox</h3>
                <p>
                  Why is Spatial Intelligence so hard? We face <strong>Moravec&apos;s Paradox</strong>: &quot;It is comparatively easy to make computers exhibit adult level performance on intelligence tests or playing checkers, and difficult or impossible to give them the skills of a one-year-old when it comes to perception and mobility.&quot;
                </p>
                <p>
                  The theoretical explanation lies in evolution. We have spent hundreds of millions of years evolving sensorimotor control (walking, seeing, grasping). Abstract reasoning (chess, math) is a very recent wrapper on top of that. Therefore, the &quot;compute&quot; required for motor control is massive, but it&apos;s hidden in our biological hardware.
                </p>
                <p>
                  The <strong>Embodiment Hypothesis</strong> posits that true intelligence cannot arise from passive observation of data (like an LLM reading the internet). It requires a body that interacts with the world.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Active Perception:</strong> To understand a cup, you don&apos;t just look at it; you move your head to get parallax, you touch it to feel the temperature. The action informs the perception.</li>
                    <li><strong>Grounding:</strong> Symbols (words) must be grounded in sensorimotor experience. The word &quot;heavy&quot; has no meaning to GPT-4; it is just a token related to &quot;weight.&quot; To an embodied agent, &quot;heavy&quot; maps to a specific motor torque value required to lift the object. This grounding is essential for safe AI interaction in the physical world.</li>
                </ul>

                <h3 className="text-2xl text-emerald-200 mt-8">4. Physics Priors vs. Learned Physics</h3>
                <p>
                   Should we program Newton&apos;s laws into the AI, or should it learn them?
                </p>
                <p>
                   <strong>Symbolic Physics Engines (MuJoCo, PyBullet):</strong> These use explicit differential equations. They are accurate but rigid. They fail when modeling deformable objects (dough, cloth) or fluids where equations are complex.
                </p>
                <p>
                   <strong>Learned Physics (Neural Physics):</strong> The model learns <code>F(state, action) -&gt; next_state</code> from data.
                   <br/><em>The theoretical challenge:</em> <strong>OOD (Out of Distribution) Generalization.</strong> A learned physics model might think &quot;dropping a glass breaks it&quot; because it saw 1000 examples. But if you drop a plastic glass, it might still predict &quot;break&quot; if it hasn&apos;t learned the material property distinction.
                </p>
                <p>
                   The consensus in 2025 is <strong>Neuro-symbolic Physics</strong>: Using neural networks to estimate the parameters (mass, friction, elasticity) of the scene, and then using a differentiable physics engine to predict the dynamics. This constrains the AI to &quot;plausible&quot; physics while allowing it to handle uncertainty.
                </p>
              </div>
          </section>

          {/* Architecture */}
          <section id="architecture" className="mb-12 lg:mb-16 scroll-mt-24">
             <div className="flex items-center gap-3 mb-6">
                <Layers className="text-emerald-400" size={28} />
                <h2 className="text-3xl font-bold text-white">World Model Architectures</h2>
              </div>

              <div className="prose prose-lg prose-invert max-w-none text-gray-300 space-y-6">
                <p>
                  We are currently seeing a convergence of architectures designed to handle spatial data.
                </p>

                <h3 className="text-2xl text-emerald-200 mt-8">V-JEPA (Video Joint Embedding Predictive Architecture)</h3>
                <p>
                  Meta&apos;s V-JEPA is a non-generative model. It learns by masking out parts of a video in both space and time and trying to predict the abstract representation of the missing parts.
                </p>
                <div className="bg-black/50 p-4 rounded-lg border border-gray-700 my-4 font-mono text-sm">
                  {`Input Video -> Encoder -> [Latent State t]
                                   |
                                   v
[Action t] -> [Predictor Network] -> [Predicted Latent State t+1]
                                   |
Target Video -> Encoder -> [True Latent State t+1]
                                   ^
                           Loss = Distance(Predicted, True)`}
                </div>
                <p>
                  Because it doesn&apos;t generate pixels, V-JEPA is incredibly efficient to train and use as a &quot;backbone&quot; for robotics tasks. You can freeze the V-JEPA encoder and train a small policy network on top of it to control a robot arm with very few demonstrations.
                </p>

                <h3 className="text-2xl text-emerald-200 mt-8">Diffusion Transformers (DiT) as World Simulators</h3>
                <p>
                  OpenAI&apos;s Sora and similar models use Diffusion Transformers. While originally for video generation, they exhibit &quot;emergent physics.&quot; By training on internet-scale video, they implicitly learn that water flows down, reflections move with the camera, and objects block light.
                </p>
                <p>
                  However, purely generative models struggle with long-horizon consistency (objects might morph or disappear). Research is now focusing on <strong>Action-Conditioned Diffusion</strong>, where the video generation is driven by explicit control inputs (e.g., &quot;move camera right,&quot; &quot;pick up cup&quot;), effectively turning the video generator into a game engine.
                </p>
              </div>
          </section>

          {/* Robotics */}
          <section id="robotics" className="mb-12 lg:mb-16 scroll-mt-24">
            <div className="bg-gray-800/30 border border-gray-700/50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="text-blue-400" size={28} />
                <h2 className="text-3xl font-bold text-white">Embodied Intelligence</h2>
              </div>

              <div className="prose prose-lg prose-invert max-w-none text-gray-300">
                <p>
                  The ultimate test of Spatial Intelligence is Robotics. We are moving from &quot;pre-programmed&quot; robots (like car assembly arms that move to exact coordinates) to &quot;adaptive&quot; robots.
                </p>

                <h3 className="text-xl font-bold text-blue-300 mt-6">Foundation Models for Robotics</h3>
                <p>
                   Just as GPT-4 is a foundation model for text, we are seeing models like <strong>RT-2 (Robotic Transformer 2)</strong> and <strong>Figure 01&apos;s brain</strong>. These are Vision-Language-Action (VLA) models.
                </p>
                <p>
                  They take text instructions (&quot;pick up the empty coke can&quot;) and visual input (camera feed) and output tokenized actions (gripper coordinates).
                </p>
                <p>
                  The breakthrough here is <strong>Generalization</strong>. An old robot trained to pick up a red coke can would fail on a blue pepsi can. A VLA model trained on internet data knows that &quot;coke can&quot; and &quot;pepsi can&quot; are both &quot;soda cans&quot; and share the affordance &quot;graspable cylinder,&quot; allowing it to handle objects it has never seen before in the lab.
                </p>
              </div>
            </div>
          </section>

          {/* Use Cases */}
          <section id="use-cases" className="mb-12 lg:mb-16 scroll-mt-24">
             <div className="flex items-center gap-3 mb-6">
                <Zap className="text-emerald-400" size={28} />
                <h2 className="text-3xl font-bold text-white">Real-World Applications</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800/40 p-6 rounded-xl border border-emerald-500/20 hover:border-emerald-500/50 transition-colors">
                  <div className="h-12 w-12 bg-emerald-900/50 rounded-full flex items-center justify-center mb-4">
                    <Box className="text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Domestic Robots</h3>
                  <p className="text-gray-400 text-sm">
                    Robots like the Tesla Optimus or Figure 02 that can fold laundry, load dishwashers, and tidy rooms. Spatial intelligence allows them to navigate cluttered homes without bumping into furniture or stepping on toys.
                  </p>
                </div>

                <div className="bg-gray-800/40 p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/50 transition-colors">
                  <div className="h-12 w-12 bg-blue-900/50 rounded-full flex items-center justify-center mb-4">
                    <Eye className="text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Autonomous Construction</h3>
                  <p className="text-gray-400 text-sm">
                    Drones and bipeds that can walk onto a construction site, compare the physical reality to the BIM (Building Information Model) digital twin, identify errors, and even perform tasks like bricklaying or welding.
                  </p>
                </div>

                <div className="bg-gray-800/40 p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-colors">
                  <div className="h-12 w-12 bg-cyan-900/50 rounded-full flex items-center justify-center mb-4">
                    <Globe className="text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Generative 3D Worlds</h3>
                  <p className="text-gray-400 text-sm">
                    Generating entire interactive 3D environments for gaming and VR from a text prompt. &quot;Generate a cyberpunk city.&quot; The AI builds the geometry, textures, and physics colliders instantly.
                  </p>
                </div>
              </div>
          </section>

          {/* Challenges */}
          <section id="challenges" className="mb-12 lg:mb-16 scroll-mt-24">
            <div className="bg-red-900/10 border border-red-500/30 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="text-red-400" size={28} />
                <h2 className="text-3xl font-bold text-white">Challenges & Safety</h2>
              </div>

              <div className="space-y-4 text-gray-300">
                <p>
                  Integrating AI into the physical world introduces risks that don&apos;t exist in chatbots.
                </p>

                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="mt-1 min-w-[20px]"><X className="text-red-400" size={20}/></div>
                    <div>
                      <strong className="text-red-300 block">The Kinetic Energy Problem</strong>
                      <span className="text-sm opacity-80">A chatbot can say mean things. A robot can punch you. Safety constraints in spatial intelligence must be enforced at the hardware or control theory level, not just via RLHF.</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1 min-w-[20px]"><X className="text-red-400" size={20}/></div>
                    <div>
                      <strong className="text-red-300 block">Data Scarcity</strong>
                      <span className="text-sm opacity-80">We have trillions of tokens of text. We do not have trillions of hours of robot manipulation data. Sim-to-Real transfer (training in simulation and deploying in reality) is the primary bottleneck.</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-1 min-w-[20px]"><X className="text-red-400" size={20}/></div>
                    <div>
                      <strong className="text-red-300 block">Latency</strong>
                      <span className="text-sm opacity-80">A 500ms delay in a chatbot is annoying. A 500ms delay in a self-driving car or a balancing robot is catastrophic. Inference must be optimized for edge devices.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Checklist */}
           <section className="mb-12 lg:mb-16">
            <div className="bg-gradient-to-br from-emerald-900/20 to-cyan-900/20 border border-emerald-500/30 rounded-xl p-6 lg:p-8">
              <h3 className="text-2xl font-bold text-emerald-300 mb-4 flex items-center gap-2">
                ✅ Spatial AI Readiness Checklist
              </h3>
              <p className="text-emerald-200/80 mb-6">
                Building a spatial application? Verify these architectural decisions:
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

          {/* Conclusion */}
          <section className="mb-16 border-t border-gray-800 pt-12">
            <div className="bg-gray-800/50 border border-emerald-500/30 rounded-xl p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">The World is Not Flat</h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Spatial Intelligence is the next great leap. It brings the power of AI out of the screen and into the room with you. Whether you are building drones, AR apps, or smart cities, the future is 3D.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                 <Link
                    href="/ai-tools"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 px-8 py-4 rounded-full font-bold transition-all text-white shadow-lg shadow-emerald-900/50"
                >
                    <Bot size={20} />
                    Explore AI Tools
                </Link>
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-8 py-4 rounded-full font-bold transition-all text-white"
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
