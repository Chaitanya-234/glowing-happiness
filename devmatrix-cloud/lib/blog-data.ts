import { ThemeId } from '@/lib/themes/blog-themes';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Used for search indexing
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  themeId: ThemeId;
  featuredImage: string;
  datePublished: string;
  dateModified?: string;
  readingTime: number; // in minutes
  popularity: number;
  viewCount: number;
}

const DEFAULT_AUTHOR = {
  name: 'DevMetrix Team',
  avatar: '/authors/team-avatar.png', // Placeholder
};

const DEFAULT_IMAGE = '/blog/placeholders/tech-bg.jpg'; // Placeholder

// Helper to generate consistent tags from title/category
function generateTags(title: string, category: string): string[] {
  const tags = [category.toLowerCase()];
  const keywords = ['react', 'next.js', 'spring boot', 'java', 'javascript', 'typescript', 'ai', 'security', 'api', 'graphql', 'rest', 'docker', 'kubernetes', 'aws', 'cloud', 'web3', 'blockchain', 'testing', 'performance', 'database'];

  keywords.forEach(kw => {
    if (title.toLowerCase().includes(kw)) {
      tags.push(kw);
    }
  });

  return Array.from(new Set(tags));
}

// Helper to parse reading time string "35 min" -> 35
function parseReadingTime(timeStr: string): number {
  const match = timeStr.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 5;
}

const rawPosts = [
  {
    slug: 'ai-native-cicd-intelligent-pipeline-revolution-2026',
    title: 'AI-Native CI/CD: The Intelligent Pipeline Revolution in 2026',
    excerpt: 'Explore how AI-native CI/CD pipelines are transforming software delivery. Discover how intelligent orchestration, predictive testing, and smart deployments are reshaping DevOps.',
    date: '2026-04-12',
    category: 'DevOps',
    readTime: '14 min',
  },
  {
    slug: 'model-merging-llm-guide-mergekit',
    title: 'Model Merging Guide: Creating State-of-the-Art LLMs Without Training',
    excerpt: 'Training LLMs is expensive. Merging them is cheap. Learn how to combine Mistral, Llama 3, and other models using MergeKit to create powerful "Frankenmerges" without a GPU farm.',
    date: '2026-01-10',
    category: 'AI Research',
    readTime: '45 min',
  },
  {
    slug: 'building-ai-web-browsing-agents-computer-use',
    title: 'Building AI Agents That Can Browse the Web: A Deep Dive into "Computer Use"',
    excerpt: 'The next frontier of AI is action. Learn how to build agents that can control a web browser, extract data, and perform tasks using Anthropic Computer Use and browser-use.',
    date: '2026-01-05',
    category: 'AI Engineering',
    readTime: '40 min',
  },
  {
    slug: 'cybersecurity-owasp-top-10-2025',
    title: 'Cybersecurity 2025: OWASP Top 10 Prevention',
    excerpt: 'Stay ahead of hackers. A deep dive into the OWASP Top 10 vulnerabilities in 2025 and how to prevent them in Spring Boot and Next.js.',
    date: '2025-11-29',
    category: 'Cybersecurity',
    readTime: '35 min',
  },
  {
    slug: 'graphql-federation-apollo-guide',
    title: 'GraphQL Federation with Apollo: Scaling Graphs',
    excerpt: 'Learn how to scale your API layer using GraphQL Federation. Combine Spring Boot and Node.js services into a unified supergraph.',
    date: '2025-11-28',
    category: 'API Design',
    readTime: '28 min',
  },
  {
    slug: 'edge-computing-vercel-cloudflare-guide',
    title: 'Edge Computing with Vercel Middleware & Cloudflare Workers',
    excerpt: 'Optimize performance by moving logic to the edge. A comprehensive guide to Vercel Middleware and Cloudflare Workers for Next.js developers.',
    date: '2025-11-27',
    category: 'Performance',
    readTime: '26 min',
  },
  {
    slug: 'web3-authentication-siwe-guide',
    title: 'Web3 Authentication with SIWE (Sign-In with Ethereum)',
    excerpt: 'Learn how to implement Sign-In with Ethereum (SIWE) in Next.js and Spring Boot. A secure, decentralized alternative to passwords.',
    date: '2025-11-26',
    category: 'Web3',
    readTime: '22 min',
  },
  {
    slug: 'advanced-typescript-patterns-conditional-types',
    title: 'Advanced TypeScript Patterns: Conditional Types & More',
    excerpt: 'Level up your TypeScript skills with advanced patterns. Master conditional types, mapped types, and learn how to type-safe your full stack.',
    date: '2025-11-25',
    category: 'TypeScript',
    readTime: '25 min',
  },
  {
    slug: 'kubernetes-for-developers-guide',
    title: 'Kubernetes for Developers: A Practical Guide from Docker to K8s',
    excerpt: 'Master Kubernetes without the ops headache. Learn container orchestration, deployments, and how to run Spring Boot and Next.js on K8s.',
    date: '2025-11-24',
    category: 'DevOps',
    readTime: '30 min',
  },
  {
    slug: 'micro-frontends-module-federation-2025',
    title: 'Micro-Frontends with Module Federation: Scaling Teams in 2025',
    excerpt: 'Learn how to scale your frontend development by breaking monoliths into micro-frontends using Webpack Module Federation and Next.js.',
    date: '2025-11-23',
    category: 'Architecture',
    readTime: '32 min',
  },
  {
    slug: 'rust-for-javascript-developers',
    title: 'Rust for JavaScript Developers: Integrating WASM in 2025',
    excerpt: 'Learn how to supercharge your web applications by integrating Rust and WebAssembly (WASM) into your Next.js workflow.',
    date: '2025-11-22',
    category: 'Systems Programming',
    readTime: '35 min',
  },
  {
    slug: 'nextjs-15-server-actions-guide',
    title: 'Next.js 15 Server Actions: The Complete Guide for 2025',
    excerpt: 'Master Next.js 15 Server Actions with this comprehensive guide. Learn how to build type-safe, efficient data mutations with Spring Boot integration.',
    date: '2025-11-21',
    category: 'Web Development',
    readTime: '28 min',
  },
  {
    slug: 'building-ai-agents-langchain-nextjs',
    title: 'Building Autonomous AI Agents with LangChain & Next.js',
    excerpt: 'Learn how to build powerful autonomous AI agents using LangChain, Next.js, and Spring Boot. A complete guide for 2025.',
    date: '2025-11-20',
    category: 'AI & Automation',
    readTime: '25 min',
  },
  {
    slug: 'complete-guide-json-validation',
    title: 'The Complete Guide to JSON Validation: Best Practices and Tools',
    excerpt: 'Master JSON validation with this comprehensive guide covering syntax rules, common errors, validation tools, and best practices for API development.',
    date: '2025-10-27',
    category: 'Tutorial',
    readTime: '25 min',
  },
  {
    slug: 'jwt-authentication-complete-guide',
    title: 'JWT Authentication: Complete Guide for Developers in 2025',
    excerpt: 'Everything you need to know about JSON Web Tokens, from basic concepts to advanced security practices and implementation strategies.',
    date: '2025-10-26',
    category: 'Security',
    readTime: '30 min',
  },
  {
    slug: 'regex-mastery-complete-tutorial',
    title: 'Regular Expressions Mastery: From Beginner to Expert',
    excerpt: 'Learn regular expressions from scratch with practical examples, common patterns, and real-world use cases for web developers.',
    date: '2025-10-25',
    category: 'Tutorial',
    readTime: '35 min',
  },
  {
    slug: 'rest-api-design-best-practice',
    title: 'REST API Design: Best Practices and Common Pitfalls',
    excerpt: 'Design better APIs with proven patterns, naming conventions, error handling strategies, and versioning techniques.',
    date: '2025-10-24',
    category: 'API Design',
    readTime: '28 min',
  },
  {
    slug: 'base64-encoding-explained',
    title: 'Base64 Encoding Explained: When and How to Use It',
    excerpt: 'Understand Base64 encoding, its use cases, performance implications, and alternatives for modern web development.',
    date: '2025-10-23',
    category: 'Tutorial',
    readTime: '20 min',
  },
  {
    slug: 'markdown-documentation-guide',
    title: 'Writing Better Documentation with Markdown: Complete Guide',
    excerpt: 'Create professional documentation using Markdown with advanced formatting, GitHub-flavored syntax, and automation tools.',
    date: '2025-10-22',
    category: 'Documentation',
    readTime: '22 min',
  },
  {
    slug: 'cron-jobs-scheduling-guide',
    title: 'Cron Jobs and Task Scheduling: A Practical Guide',
    excerpt: 'Master cron expressions, scheduling patterns, and best practices for automated task execution in production environments.',
    date: '2025-10-21',
    category: 'DevOps',
    readTime: '25 min',
  },
  {
    slug: 'web-security-essentials',
    title: 'Web Security Essentials Every Developer Must Know',
    excerpt: 'Protect your applications from common vulnerabilities including XSS, CSRF, SQL injection, and authentication attacks.',
    date: '2025-10-20',
    category: 'Security',
    readTime: '32 min',
  },
  {
    slug: 'api-testing-strategies',
    title: 'API Testing Strategies: Tools and Best Practices',
    excerpt: 'Comprehensive guide to testing REST APIs, including unit tests, integration tests, and automated testing workflows.',
    date: '2025-10-19',
    category: 'Testing',
    readTime: '26 min',
  },
  {
    slug: 'javascript-async-patterns',
    title: 'Mastering JavaScript Async Patterns: Promises, Async/Await',
    excerpt: 'Deep dive into asynchronous JavaScript, from callbacks to modern async/await patterns with real-world examples.',
    date: '2025-10-18',
    category: 'JavaScript',
    readTime: '30 min',
  },
  {
    slug: 'git-workflow-best-practices',
    title: 'Git Workflow Best Practices for Development Teams',
    excerpt: 'Optimize your team collaboration with proven Git workflows, branching strategies, and commit conventions.',
    date: '2025-10-17',
    category: 'DevOps',
    readTime: '24 min',
  },
  {
    slug: 'database-optimization-guide',
    title: 'Database Optimization: Indexing, Queries, and Performance',
    excerpt: 'Improve database performance with indexing strategies, query optimization, and scaling techniques for high-traffic applications.',
    date: '2025-10-16',
    category: 'Database',
    readTime: '28 min',
  },
  {
    slug: 'docker-containers-beginners',
    title: 'Docker Containers for Beginners: Complete Tutorial',
    excerpt: 'Learn Docker from scratch - containers, images, Docker Compose, and deployment strategies for modern applications.',
    date: '2025-10-15',
    category: 'DevOps',
    readTime: '35 min',
  },
  {
    slug: 'typescript-advanced-patterns',
    title: 'Advanced TypeScript Patterns for Large-Scale Applications',
    excerpt: 'Master advanced TypeScript features including generics, conditional types, and design patterns for enterprise apps.',
    date: '2025-10-14',
    category: 'TypeScript',
    readTime: '30 min',
  },
  {
    slug: 'microservices-architecture-guide',
    title: 'Microservices Architecture: Design Patterns and Best Practices',
    excerpt: 'Build scalable microservices with proper service boundaries, communication patterns, and deployment strategies.',
    date: '2025-10-13',
    category: 'Architecture',
    readTime: '32 min',
  },
  {
    slug: 'web-performance-optimization',
    title: 'Web Performance Optimization: Core Web Vitals and Beyond',
    excerpt: 'Boost your website speed with lazy loading, code splitting, caching strategies, and Core Web Vitals optimization.',
    date: '2025-10-12',
    category: 'Performance',
    readTime: '27 min',
  },
  {
    slug: 'graphql-vs-rest-comparison',
    title: 'GraphQL vs REST: Choosing the Right API Architecture',
    excerpt: 'Compare GraphQL and REST APIs with use cases, pros and cons, and migration strategies for existing applications.',
    date: '2025-10-11',
    category: 'API Design',
    readTime: '25 min',
  },
  {
    slug: 'pagination-springboot',
    title: 'Mastering Pagination in Spring Boot: The Ultimate 2025 Guide',
    excerpt: 'Explore all popular ways to implement pagination in Spring Boot, complete with examples, best practices, GitHub repo demos, and security considerations.',
    date: '2025-11-19',
    category: 'Backend Development',
    readTime: '25 min'
  },
  {
    slug: 'zero-downtime-springboot-aws-eb',
    title: 'Zero-Downtime Deployments of Spring Boot on AWS Elastic Beanstalk: Complete Setup',
    excerpt: 'Master zero-downtime deployments for Spring Boot apps on AWS Elastic Beanstalk with detailed setup, blue/green deployments, CI/CD pipelines, security best practices, and real-world examples.',
    date: '2025-11-19',
    category: 'Cloud Deployment',
    readTime: '30 min'
  },
  {
    slug: 'toon-data-format',
    title: 'TOON: The Next-Gen Data Format for Efficient LLM Tokenization',
    excerpt: 'Explore TOON, a lightweight alternative to JSON optimized for reducing token overhead in large language models. Discover why it matters and how it stacks up against JSON.',
    date: '2025-11-18',
    category: 'Data Formats',
    readTime: '15 min',
  },
  {
    slug: 's3-presigned-url-backblaze',
    title: 'Mastering S3 Presigned URLs with Backblaze: A Practical Guide',
    excerpt: 'Explore how to generate and use S3 presigned URLs with Backblaze B2, including code examples, security best practices, and a real-world analogy with the Newcastle vs Man City match.',
    date: '2025-11-23',
    category: 'Cloud Storage',
    readTime: '20 min',
  },
  {
    slug: 'ai-powered-code-review-spring-boot-openai',
    title: 'Building AI-Powered Code Review Systems with Spring Boot and OpenAI API',
    excerpt: 'Learn how to build an intelligent code review system that catches bugs, suggests improvements, and provides instant feedback using Spring Boot, OpenAI GPT-4, and GitHub webhooks. Includes complete architecture, security best practices, and production deployment strategies.',
    date: '2025-11-30',
    category: 'Spring Boot',
    readTime: '20 min',
  },
  {
    slug: 'deepfake-payment-fraud-ai-defense',
    title: 'The Rise of Deepfake Payment Fraud: Can AI Stop Its Own Threats?',
    excerpt: 'Explore how deepfake-powered voice and video scams are driving multi-million dollar payment fraud—and how AI, biometric liveness detection, and blockchain-based verification can fight back in this 2025-ready security deep dive.',
    date: '2025-12-04',
    category: 'Cybersecurity',
    readTime: '25 min',
  },
  {
    slug: 'web3-future-beyond-crypto-nfts',
    title: 'The Real Future of Web3: Beyond Crypto and NFTs',
    excerpt: 'Discover how Web3 is transforming enterprise operations, supply chains, healthcare, and digital identity through decentralized technologies—moving far beyond cryptocurrency speculation and NFT hype into real-world utility.',
    date: '2025-12-04',
    category: 'Web3',
    readTime: '22 min',
  },
  {
    slug: 'autonomous-ai-agents-2025-business-life',
    title: 'Why 2025 Is the Year of Autonomous AI Agents: What That Means for Business & Everyday Life',
    excerpt: 'Discover how autonomous AI agents that plan and execute multi-step tasks are revolutionizing business workflows and everyday life—from customer service automation to personal productivity, with real examples and implementation guides.',
    date: '2025-12-05',
    category: 'AI & Automation',
    readTime: '24 min',
  },
  {
    slug: 'can-ai-replace-traditional-kyc-payments',
    title: 'Can AI Replace Traditional KYC? The Future of Identity Verification in Payments',
    excerpt: 'Explore how AI is transforming Know Your Customer (KYC) processes with automated document forensics, biometric liveness detection, and behavioral risk scoring, promising a future of frictionless and secure payments.',
    date: '2025-12-06',
    category: 'Fintech & AI',
    readTime: '22 min',
  },
  {
    slug: 'spring-ai-integrating-llms',
    title: 'Spring AI: Integrating LLMs into Java Applications',
    excerpt: 'A comprehensive guide to building AI-powered Java applications using the new Spring AI project. Learn how to integrate OpenAI, Azure OpenAI, and other LLMs with standard Spring Boot patterns.',
    date: '2025-12-08',
    category: 'Spring Boot',
    readTime: '20 min',
  },
  {
    slug: 'building-rag-spring-boot-vector-db',
    title: 'Building RAG with Spring Boot and Vector Databases',
    excerpt: 'A deep dive into Retrieval-Augmented Generation (RAG) using Spring Boot, PgVector, and OpenAI. Learn how to build intelligent search and Q&A systems on your own data.',
    date: '2025-12-09',
    category: 'Spring Boot',
    readTime: '25 min',
  },
  {
    slug: 'secure-ai-guardrails-spring-boot',
    title: 'Secure AI: Implementing Guardrails in Spring Boot AI Applications',
    excerpt: 'Learn how to secure your generative AI applications against prompt injection, data leakage, and hallucinations using Spring Boot, AOP, and dedicated guardrail libraries.',
    date: '2025-12-10',
    category: 'Security',
    readTime: '18 min',
  },
  {
    slug: 'deploying-ml-models-spring-boot-tensorflow',
    title: 'Deploying ML Models with Spring Boot and TensorFlow/ONNX',
    excerpt: 'Learn how to serve machine learning models in production using Spring Boot. We cover exporting models to ONNX, running inference in Java, and optimizing for high throughput.',
    date: '2025-12-11',
    category: 'MLOps',
    readTime: '22 min',
  },
  {
    slug: 'event-driven-ai-architectures-kafka-spring',
    title: 'Event-Driven AI Architectures with Spring Cloud Stream and Kafka',
    excerpt: 'Learn how to build scalable, asynchronous AI systems using Spring Cloud Stream and Apache Kafka. Handle long-running AI tasks without blocking your users.',
    date: '2025-12-12',
    category: 'Architecture',
    readTime: '24 min',
  },
  {
    slug: 'mastering-multi-agent-systems-langgraph-crewai',
    title: 'Mastering Multi-Agent Systems: Orchestrating AI Swarms with LangGraph and CrewAI',
    excerpt: 'Deep dive into building multi-agent AI systems where agents collaborate, plan, and execute complex workflows using LangGraph and CrewAI frameworks.',
    date: '2025-12-13',
    category: 'AI Agents',
    readTime: '26 min',
  },
  {
    slug: 'rise-of-small-language-models-slm-llama-phi-edge',
    title: 'The Rise of Small Language Models: Why Llama 3 8B and Phi-3 Rule the Edge',
    excerpt: 'Bigger isn’t always better. Discover how Small Language Models (SLMs) are bringing powerful AI to edge devices, reducing costs, and enhancing privacy.',
    date: '2025-12-14',
    category: 'Generative AI',
    readTime: '24 min',
  },
  {
    slug: 'rag-2-0-guide-graphrag-hybrid-search-knowledge-graphs',
    title: 'RAG 2.0: The Complete Guide to GraphRAG, Hybrid Search, and Knowledge Graphs',
    excerpt: 'Move beyond basic vector search. Learn how GraphRAG and hybrid retrieval systems create more accurate, context-aware RAG applications for enterprise use.',
    date: '2025-12-15',
    category: 'AI Engineering',
    readTime: '30 min',
  },
  {
    slug: 'ai-software-engineers-devin-cursor-developer-career',
    title: 'AI Software Engineers: How Devin and Cursor Are Rewriting the Developer Career Path',
    excerpt: 'Are AI software engineers replacing us? A realistic look at how tools like Devin and Cursor are transforming the role of developers from coders to architects.',
    date: '2025-12-16',
    category: 'Career & AI',
    readTime: '28 min',
  },
  {
    slug: 'multimodal-ai-revolution-gpt4o-gemini-building-apps',
    title: 'Multimodal AI Revolution: Building Apps That See, Hear, and Speak with GPT-4o',
    excerpt: 'Learn to build the next generation of apps that process text, audio, and video simultaneously using GPT-4o and Gemini 1.5 Pro multimodal capabilities.',
    date: '2025-12-17',
    category: 'Multimodal AI',
    readTime: '25 min',
  },
  {
    slug: 'constitutional-ai-governance-ethics-2025',
    title: 'Constitutional AI & The New Era of AI Governance: Building Ethical Systems in 2025',
    excerpt: 'As AI regulations tighten, "Constitutional AI" is the new standard. Learn how to implement guardrails, PII detection, and policy-based control using NeMo Guardrails and LangChain.',
    date: '2025-12-18',
    category: 'AI Ethics & Safety',
    readTime: '32 min',
  },
  {
    slug: 'serverless-ai-local-llms-browser-webgpu',
    title: 'Serverless AI: Running Local LLMs in the Browser with WebGPU and WebLLM',
    excerpt: 'Run powerful LLMs like Llama 3 directly in the user browser using WebGPU. A deep dive into privacy-first, zero-latency, and zero-cost AI architecture.',
    date: '2025-12-19',
    category: 'Web AI',
    readTime: '28 min',
  },
  {
    slug: 'generative-ui-streaming-rsc-ai-components',
    title: 'Generative UI: Streaming React Server Components with AI for Dynamic Interfaces',
    excerpt: 'Move beyond text responses. Learn how to use Vercel AI SDK and React Server Components to generate interactive UI elements on the fly based on user intent.',
    date: '2025-12-20',
    category: 'Frontend AI',
    readTime: '30 min',
  },
  {
    slug: 'ai-native-devops-self-healing-infrastructure',
    title: 'AI-Native DevOps: Building Self-Healing Infrastructure with Prometheus and LLMs',
    excerpt: 'Transform your DevOps with AI agents that monitor Prometheus alerts, investigate logs, and automatically remediate production incidents in real-time.',
    date: '2025-12-21',
    category: 'DevOps AI',
    readTime: '35 min',
  },
  {
    slug: 'voice-first-ai-realtime-api-multimodal',
    title: 'Voice-First Revolution: Building Real-Time Conversational AI with OpenAI Realtime API',
    excerpt: 'The future is voice. Master the OpenAI Realtime API to build low-latency, interruptible, and emotionally expressive voice assistants using WebSockets.',
    date: '2025-12-22',
    category: 'Voice AI',
    readTime: '27 min',
  },
  {
    slug: 'prompt-engineering-dspy-optimization',
    title: 'Prompt Engineering 2.0: From Chain-of-Thought to DSPy & Auto-Optimization',
    excerpt: 'Stop writing manual prompts. Learn how DSPy and programmatic prompt optimization are replacing "prompt engineering" with "flow engineering" in 2025.',
    date: '2025-12-23',
    category: 'AI Engineering',
    readTime: '35 min',
  },
  {
    slug: 'federated-learning-privacy-ai',
    title: 'Federated Learning & Privacy-Preserving AI: The Future of Distributed Training',
    excerpt: 'Train AI models without seeing the data. Discover how Federated Learning and Differential Privacy are enabling the next generation of secure, decentralized AI.',
    date: '2025-12-24',
    category: 'Privacy & AI',
    readTime: '45 min',
  },
  {
    slug: 'neuro-symbolic-ai-logic-graphs',
    title: 'Neuro-Symbolic AI: Merging LLMs with Logic & Knowledge Graphs',
    excerpt: 'LLMs hallucinate. Logic systems are brittle. Discover how Neuro-Symbolic AI combines the best of both worlds to build robust, reasoning systems.',
    date: '2025-12-25',
    category: 'Advanced AI',
    readTime: '50 min',
  },
  {
    slug: 'llm-evaluation-observability-ragas',
    title: 'LLM Evaluation & Observability: RAGAS, Arize, and Metrics that Matter',
    excerpt: 'Stop guessing if your AI is working. Learn how to rigorously evaluate RAG pipelines using RAGAS, visualize drift with Arize, and build observability into your LLM stack.',
    date: '2025-12-26',
    category: 'LLMOps',
    readTime: '50 min',
  },
  {
    slug: 'reasoning-models-o1-chain-of-thought',
    title: 'The Architecture of Reasoning: How O1 & Chain-of-Thought Models Actually Work',
    excerpt: 'DeepSeek, OpenAI o1, and the rise of "System 2" thinking. A deep dive into Tree of Thoughts, Process Reward Models, and building reasoning loops.',
    date: '2025-12-27',
    category: 'AGI Research',
    readTime: '55 min',
  },
  {
    slug: 'synthetic-data-engineering-guide',
    title: 'Synthetic Data Revolution: Training Superior AI Models with Generated Data',
    excerpt: 'Learn how Synthetic Data Engineering is solving the data scarcity problem. Deep dive into model distillation, self-instruct protocols, and building generation pipelines with Spring AI.',
    date: '2025-12-28',
    category: 'AI Engineering',
    readTime: '45 min',
  },
  {
    slug: 'enterprise-llm-serving-vllm-ray',
    title: 'Enterprise LLM Serving: Scaling to Millions with vLLM and Ray',
    excerpt: 'Master the art of high-throughput LLM serving. Learn about Continuous Batching, PagedAttention, and building a scalable inference cluster with Ray Serve and vLLM.',
    date: '2025-12-29',
    category: 'MLOps & Infrastructure',
    readTime: '55 min',
  },
  {
    slug: 'green-ai-energy-efficient-training',
    title: 'Green AI: Engineering Sustainable and Energy-Efficient Large Language Models',
    excerpt: 'Explore the future of sustainable AI. Learn about 4-bit quantization, model pruning, sparse mixture-of-experts (MoE), and how to reduce the carbon footprint of model training.',
    date: '2025-12-30',
    category: 'Sustainable AI',
    readTime: '40 min',
  },
  {
    slug: 'quantum-machine-learning-introduction',
    title: 'Quantum Machine Learning: The Future of AI on Qubits',
    excerpt: 'A deep dive into Quantum Machine Learning (QML). Understand Qubits, Variational Quantum Circuits (VQC), Quantum Neural Networks (QNN), and how to build your first QML app with Qiskit.',
    date: '2025-12-31',
    category: 'Futuristic Tech',
    readTime: '50 min',
  },
  {
    slug: 'visual-document-understanding-ocr-2-0',
    title: 'Visual Document Understanding: Next-Gen OCR with LayoutLM and Donut',
    excerpt: 'Forget Tesseract. Learn how to extract structured data from complex PDFs, invoices, and forms using LayoutLM, Donut, and Multimodal Transformers.',
    date: '2026-01-01',
    category: 'Multimodal AI',
    readTime: '35 min',
  },
  {
    slug: 'agentic-ai-autonomous-systems-2025',
    title: 'The Rise of Agentic AI: Beyond Chatbots to Autonomous Systems',
    excerpt: 'From simple chatbots to autonomous agents that plan, execute, and iterate. Explore the architecture, frameworks (LangGraph, CrewAI), and future of Agentic AI in 2025.',
    date: '2026-01-02',
    category: 'AI Agents',
    readTime: '45 min',
  },
  {
    slug: 'multimodal-ai-architecture-vision-audio',
    title: 'Multimodal AI Architecture: Bridging Text, Vision, and Audio',
    excerpt: 'Deep dive into the architecture of Multimodal Large Language Models (MLLMs). Learn how Gemini 1.5 and GPT-4o process text, images, and audio simultaneously.',
    date: '2026-01-03',
    category: 'Multimodal AI',
    readTime: '40 min',
    },
  {
    slug: 'model-merging-open-source-revolution',
    title: 'Model Merging: The Open Source AI Revolution (Frankenstein AI)',
    excerpt: 'Discover how Model Merging (Franken-merges) is allowing open source developers to create State-of-the-Art LLMs without massive compute budgets. A deep dive into SLERP, TIES, DARE, and MergeKit.',
    date: '2025-12-15',
    category: 'AI Engineering',
    readTime: '45 min',
  },
  {
    slug: 'ai-generated-video-diffusion-transformers',
    title: 'Diffusion Transformers (DiT): The Physics of AI Video',
    excerpt: 'A deep technical dive into Diffusion Transformers (DiT), the architecture behind Sora, Kling, and Gen-3. Learn about Spacetime Patches, Flow Matching, and the future of World Simulators.',
    date: '2025-12-28',
    category: 'Generative AI',
    readTime: '50 min',
  },
  {
    slug: 'spatial-intelligence-world-models-ai-physics',
    title: 'Spatial Intelligence: Beyond Generative AI to World Understanding',
    excerpt: 'Moving from text generation to 3D world understanding. A deep dive into World Models, V-JEPA, and the future of Embodied AI.',
    date: '2026-01-15',
    category: 'Advanced AI',
    readTime: '55 min',
  },
  {
    slug: 'ai-search-engines-perplexity-searchgpt-seo-death',
    title: 'The Death of SEO: Rise of AI Search Engines (Perplexity, SearchGPT)',
    excerpt: 'Google is no longer the only gatekeeper. Explore how AI Search Engines, RAG, and GEO are rewriting the rules of the web.',
    date: '2026-01-20',
    category: 'Future of Web',
    readTime: '60 min',
  },
  {
    slug: 'mamba-state-space-models-post-transformer-architecture',
    title: 'Beyond Transformers: The Rise of Mamba and State Space Models (SSMs)',
    excerpt: 'The Transformer architecture has dominated AI for years, but the quadratic cost of attention is a bottleneck. Enter Mamba and State Space Models (SSMs)—linear-time architectures that promise to dethrone the Transformer.',
    date: '2026-01-30',
    category: 'AI Research',
    readTime: '50 min',
  },
  {
    slug: 'liquid-neural-networks-lnn-adaptive-edge-ai',
    title: 'Liquid Neural Networks: The Future of Adaptive, Efficient Edge AI',
    excerpt: 'Liquid Neural Networks (LNNs) are a revolutionary class of time-continuous neural networks inspired by biological brains. They adapt on the fly, require fewer neurons, and are perfect for safety-critical edge AI.',
    date: '2026-01-20',
    category: 'AI Research',
    readTime: '45 min',
  },
  {
    slug: 'beyond-transformers-mamba-ssm-architecture',
    title: 'Beyond the Transformer: The Rise of Mamba and State Space Models (SSMs)',
    excerpt: 'The Transformer architecture has dominated AI for a decade. But its quadratic complexity is a bottleneck. Enter Mamba: a State Space Model (SSM) that offers linear scaling with Transformer-quality performance.',
    date: '2026-02-15',
    category: 'AI Architecture',
    readTime: '55 min',
  },
  {
    slug: 'embodied-ai-robotics-foundation-models',
    title: 'Embodied AI: How Foundation Models are Powering the Next Generation of Robotics',
    excerpt: 'The brain of the robot is finally catching up to the body. Discover how Vision-Language-Action (VLA) models like RT-2 are enabling end-to-end learning, solving Moravec\'s Paradox, and powering humanoid robots.',
    date: '2026-01-29',
    category: 'Robotics & AI',
    readTime: '50 min',
  },
  {
    slug: 'ai-agents-revolution-autonomous-systems-2026',
    title: 'AI Agents Revolution: How Autonomous AI Systems Are Reshaping Business Operations in 2026',
    excerpt: 'AI Agents are the hottest topic in AI right now. Discover how autonomous systems are moving beyond chatbots to reshape business operations in 2026.',
    date: '2026-03-15',
    category: 'AI & Automation',
    readTime: '45 min',
  },
  {
    slug: 'multimodal-ai-vision-language-models-2026',
    title: 'Beyond Text: How Multimodal AI is Creating a New Era of Human-Computer Interaction',
    excerpt: 'Multimodal AI is creating a new era of Human-Computer Interaction. Learn how Vision-Language Models process images and text to transform industries.',
    date: '2026-03-20',
    category: 'Multimodal AI',
    readTime: '40 min',
  },
  {
    slug: 'ai-hyper-personalization-revolution-2026',
    title: 'The Hyper-Personalization Revolution: How AI is Creating Unique Digital Experiences for Every Individual in 2026',
    excerpt: 'Discover how AI-powered personalization engines are revolutionizing digital experiences. Learn about hyper-personalization technology, real-world applications, and the future of customized AI interactions.',
    date: '2026-02-10',
    category: 'AI & UX',
    readTime: '40 min',
  },
  {
    slug: 'ai-scientific-discovery-revolution-2026',
    title: 'AI Scientists: How Artificial Intelligence is Accelerating Scientific Discovery and Solving Humanity\'s Greatest Challenges',
    excerpt: 'Explore how AI is transforming scientific research across medicine, climate science, and physics. Discover breakthrough AI technologies accelerating discovery and solving complex problems.',
    date: '2026-02-15',
    category: 'AI Research',
    readTime: '50 min',
  },
  {
    slug: 'ai-autonomous-incident-response-devops-2026',
    title: 'The Silent Guardian: How AI-Powered Autonomous Incident Response is Ending the Era of Downtime in DevOps Forever',
    excerpt: 'Discover how AI-powered autonomous incident response is revolutionizing DevOps. Learn how self-healing systems detect, diagnose, and fix outages before users ever notice.',
    date: '2026-03-25',
    category: 'DevOps & AI',
    readTime: '35 min',
  },
  {
    slug: 'ai-ephemeral-cloud-environments-devops-future',
    title: 'AI Ephemeral Environments: The Future of Dev Infrastructure',
    excerpt: 'Learn how AI-powered ephemeral cloud environments are revolutionizing DevOps. Discover how self-provisioning, self-destroying infrastructure is saving teams millions while shipping faster than ever.',
    date: '2026-04-12',
    category: 'DevOps',
    readTime: '16 min',
  },
  {
    slug: 'ai-observability-kills-traditional-monitoring-devops-2026',
    title: 'AI Observability: Why Traditional Monitoring Is Dying in 2026',
    excerpt: 'Discover how AI observability is replacing traditional monitoring forever. Learn how intelligent systems are moving from watching your infrastructure to truly understanding it.',
    date: '2026-04-20',
    category: 'DevOps & AI',
    readTime: '17 min',
  },
  {
    slug: 'theme-system-demo',
    title: 'Theme System Demo',
    excerpt: 'This post demonstrates the new theme selection system. Try changing the theme using the button in the bottom right corner!',
    date: '2025-01-01',
    category: 'Features',
    readTime: '5 min',
  }
];

export const blogPosts: BlogPost[] = rawPosts.map((post) => ({
  id: post.slug,
  title: post.title,
  slug: post.slug,
  excerpt: post.excerpt,
  content: post.excerpt, // Using excerpt as content for now
  category: post.category,
  tags: generateTags(post.title, post.category),
  author: DEFAULT_AUTHOR,
  themeId: 'default',
  featuredImage: DEFAULT_IMAGE,
  datePublished: post.date,
  readingTime: parseReadingTime(post.readTime),
  popularity: Math.floor(Math.random() * 100), // Random popularity for demo
  viewCount: Math.floor(Math.random() * 1000), // Random view count for demo
}));

export function getAllPosts(): BlogPost[] {
  return blogPosts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}
