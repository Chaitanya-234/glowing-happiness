// app/sitemap.ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://devmetrix.in';
  const currentDate = new Date();

  // ===========================
  // Tools Section
  // ===========================
  const tools = [
    'json-formatter',
    'api-tester',
    'mock-api-generator',
    'sql-formatter',
    'jwt-decoder',
    'regex-playground',
    'base64-encoder',
    'diff-viewer',
    'markdown-converter',
    'cron-generator',
    'qr-code-generator',
    'code-snippets',
    'url-encoder',
    'uuid-generator',
    'color-converter',
    'hash-generator',
    'online-compiler',
    'password-generator',
    'timestamp-converter',
    'string-case-converter',
    'toon-converter',
    'glassmorphism-generator',
    'lorem-ipsum-generator',
    'json-to-zod',
    'tailwind-gradient-generator',
    'css-box-shadow',
    'css-border-radius',
    'px-to-rem',
    'text-to-binary',
    'binary-to-text',
    'word-counter',
    'pomodoro-timer',
    'stopwatch',
    'aspect-ratio-calculator',
    'percentage-calculator',
    'age-calculator',
    'bmi-calculator',
    'discount-calculator',
    'tip-calculator',
    'random-number-generator',
    'slug-generator',
    'html-entity-encoder',
    'html-entity-decoder',
    'csv-to-json',
    'json-to-csv',
    'user-agent-parser',
    'device-info',
    'keycode-info',
    'emoji-picker',
    'lorem-ipsum-image',
    'reaction-time-test',
    'typing-speed-test',
    'phone-parser',
    'credit-card-validator',
    'roman-numeral-converter',
    'pdf-merge',
    'pdf-split',
    'pdf-to-jpg',
    'image-compressor',
    'image-converter',
    'pdf-watermark',
    'jpg-to-pdf',
    'pdf-api-playground',
    'document-webhook-tester',
    'json-to-pdf',
    'api-request-to-pdf',
    'html-invoice-to-pdf',
    'latency-monitor',
    'webhook-replay',
    'dns-propagation-checker',
    'ssl-checker',
    'port-scanner',
    'dependency-scanner',
    'bcrypt-generator',
    'number-base-converter',
    'cache-optimizer',
    'graphql-designer',
  ].map(tool => ({
    url: `${baseUrl}/tools/${tool}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // ===========================
  // AI Tools Section
  // ===========================
  const aiTools = [
    'course-creator',
    'blog-architect',
    'spec-generator',
    'persona-generator',
    'startup-validator',
    'saas-plan-advisor',
    'saas-email-generator',
    'saas-metric-calculator',
    'churn-reduction-strategist',
    'feature-prioritizer',
    'code-translator',
    'security-vulnerability-scanner',
    'accessibility-checker',
    'cross-browser-tester',
    'api-contract-tester',
    'mutation-testing-assistant',
    'unit-test-generator',
    'integration-test-builder',
    'test-coverage-analyzer',
    'e2e-test-scenario-generator',
    'performance-test-suite-creator',
    'dockerfile-optimizer',
    'crud-generator',
  ].map(tool => ({
    url: `${baseUrl}/ai-tools/${tool}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // ===========================
  // Blog Posts
  // ===========================
  const blogPosts = [
    'cybersecurity-owasp-top-10-2025',
    'graphql-federation-apollo-guide',
    'edge-computing-vercel-cloudflare-guide',
    'web3-authentication-siwe-guide',
    'advanced-typescript-patterns-conditional-types',
    'kubernetes-for-developers-guide',
    'micro-frontends-module-federation-2025',
    'rust-for-javascript-developers',
    'nextjs-15-server-actions-guide',
    'building-ai-agents-langchain-nextjs',
    'complete-guide-json-validation',
    'jwt-authentication-complete-guide',
    'regex-mastery-complete-tutorial',
    'rest-api-design-best-practice',
    'base64-encoding-explained',
    'markdown-documentation-guide',
    'cron-jobs-scheduling-guide',
    'web-security-essentials',
    'api-testing-strategies',
    'javascript-async-patterns',
    'git-workflow-best-practices',
    'database-optimization-guide',
    'docker-containers-beginners',
    'typescript-advanced-patterns',
    'microservices-architecture-guide',
    'web-performance-optimization',
    'graphql-vs-rest-comparison',
    'pagination-springboot',
    'zero-downtime-springboot-aws-eb',
    'toon-data-format',
    's3-presigned-url-backblaze',
    'ai-powered-code-review-spring-boot-openai',
    'deepfake-payment-fraud-ai-defense',
    'web3-future-beyond-crypto-nfts',
    'autonomous-ai-agents-2025-business-life',
    'can-ai-replace-traditional-kyc-payments',
    'spring-ai-integrating-llms',
    'building-rag-spring-boot-vector-db',
    'secure-ai-guardrails-spring-boot',
    'deploying-ml-models-spring-boot-tensorflow',
    'event-driven-ai-architectures-kafka-spring',
    'mastering-multi-agent-systems-langgraph-crewai',
    'rise-of-small-language-models-slm-llama-phi-edge',
    'rag-2-0-guide-graphrag-hybrid-search-knowledge-graphs',
    'ai-software-engineers-devin-cursor-developer-career',
    'multimodal-ai-revolution-gpt4o-gemini-building-apps',
    'constitutional-ai-governance-ethics-2025',
    'serverless-ai-local-llms-browser-webgpu',
    'generative-ui-streaming-rsc-ai-components',
    'ai-native-devops-self-healing-infrastructure',
    'voice-first-ai-realtime-api-multimodal',
    'prompt-engineering-dspy-optimization',
    'federated-learning-privacy-ai',
    'neuro-symbolic-ai-logic-graphs',
    'llm-evaluation-observability-ragas',
    'reasoning-models-o1-chain-of-thought',
    'synthetic-data-engineering-guide',
    'enterprise-llm-serving-vllm-ray',
    'green-ai-energy-efficient-training',
    'quantum-machine-learning-introduction',
    'visual-document-understanding-ocr-2-0',
    'agentic-ai-autonomous-systems-2025',
    'multimodal-ai-architecture-vision-audio',
    'spatial-intelligence-world-models-ai-physics',
    'ai-search-engines-perplexity-searchgpt-seo-death',
    'mamba-state-space-models-post-transformer-architecture',
    'liquid-neural-networks-lnn-adaptive-edge-ai',
    'ai-agents-revolution-autonomous-systems-2026',
    'multimodal-ai-vision-language-models-2026',
    'ai-hyper-personalization-revolution-2026',
    'ai-scientific-discovery-revolution-2026',
    'ai-native-cicd-intelligent-pipeline-revolution-2026',
    'ai-autonomous-incident-response-devops-2026',
    'ai-ephemeral-cloud-environments-devops-future',
    'ai-observability-kills-traditional-monitoring-devops-2026',
  ].map(post => ({
    url: `${baseUrl}/blog/${post}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // ===========================
  // Cheat Sheets
  // ===========================
  const cheatSheets = [
    'git-commands',
    'docker-commands',
    'javascript-array-methods',
    'http-status-codes',
    'regex-patterns',
    'sql-queries',
    'linux-terminal',
    'css-flexbox'
  ].map(sheet => ({
    url: `${baseUrl}/cheat-sheets/${sheet}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // ===========================
  // Examples pages
  // ===========================
  const examplesPages = [
    'javascript',
    'react',
    'nodejs',
    'typescript',
    'spring-ai',
    'spring-redis',
    'spring-boot-rate-limiting'
  ].map(ex => ({
    url: `${baseUrl}/examples/${ex}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // ===========================
  // Comparisons
  // ===========================
  const comparisons = [
    'risc-vs-cisc',
    'virtualization-vs-containers',
    'sql-vs-nosql',
    'rest-vs-grpc',
    'monolithic-vs-microservices',
    'imperative-vs-declarative',
    'compiled-vs-interpreted',
    'symmetric-vs-asymmetric-encryption',
    'http1-vs-http2-vs-http3',
    'vertical-vs-horizontal-scaling',
    'csr-vs-ssr',
    'fpga-vs-microcontroller',
    'cloud-vs-edge',
    'von-neumann-vs-harvard',
    'gpu-vs-cpu',
    'embedded-vs-general-purpose',
    'wired-vs-wireless',
    'open-source-vs-proprietary-hardware',
    'ipv4-vs-ipv6',
    'tcp-vs-udp',
    'graphql-vs-rest',
    'mongodb-vs-postgresql',
    'docker-vs-kubernetes',
    'react-vs-vue-vs-angular',
    'typescript-vs-javascript',
    'github-actions-vs-jenkins',
    'nextjs-vs-remix',
    'tailwind-vs-bootstrap',
    'aws-vs-azure',
    'nodejs-vs-python',
    'mysql-vs-mariadb',
    'flutter-vs-react-native',
    'rust-vs-go',
    'redux-vs-context-api',
    'jest-vs-mocha',
    'npm-vs-yarn-vs-pnpm',
    'vite-vs-webpack',
    'bun-vs-nodejs',
    'supabase-vs-firebase',
    'postman-vs-insomnia',
    'rabbitmq-vs-kafka',
    'nginx-vs-apache',
    'playwright-vs-cypress',
    'session-vs-jwt',
    'svelte-vs-react',
    'prisma-vs-typeorm',
    'redis-vs-memcached',
    'kotlin-vs-java',
    'terraform-vs-ansible',
    'grafana-vs-kibana',
    'vim-vs-vscode',
    'linux-vs-windows-server',
    'pytorch-vs-tensorflow',
    'websockets-vs-sse',
    'oauth2-vs-saml',
    'vercel-vs-netlify',
  ].map(slug => ({
    url: `${baseUrl}/compare/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // ===========================
  // Games
  // ===========================
  const games = [
    'memory-match',
    '2048',
    'snake',
    'sliding-puzzle',
    'candy-crush',
    'chess',
    'typing-speed-test',
    'pathfinding-visualizer',
    'sorting-algorithm-arena',
    'shader-showdown',
    'code-golf-course',
    'git-escape-room',
    'microservice-manager',
    'bug-hunt-royale',
    'recursion-tower-defense'
  ].map(game => ({
    url: `${baseUrl}/games/${game}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // ===========================
  // Projects / Showcase
  // ===========================
  // If you list individual featured OSS projects, include their slugs here:
  const projects = [
    // Example: 'devtools-pro', 'api-monitor-dashboard'
  ].map(p => ({
    url: `${baseUrl}/projects/${p}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // ===========================
  // Main Sitemap Structure
  // ===========================
  return [
    // Homepage
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    // Main index pages
    {
      url: `${baseUrl}/tools`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ai-tools`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
          url: `${baseUrl}/system-design`,
          lastModified: currentDate,
          changeFrequency: 'weekly' as const,
          priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cheat-sheets`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/examples`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tools/online-compiler`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1,
    },

    // New static pages
    {
      url: `${baseUrl}/advertise`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/community`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/premium`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },

    // Cheat sheets (individual)
    ...cheatSheets,

    // Tools (individual)
    ...tools,

    // AI Tools (individual)
    ...aiTools,

    // Blog posts (individual)
    ...blogPosts,

    // Examples (individual)
    ...examplesPages,

    // Comparisons (individual)
    ...comparisons,

    // Games (individual)
    ...games,

    // Projects (individual, optional)
    ...projects,

    // Legal and static
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];
}
