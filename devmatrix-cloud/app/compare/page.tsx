// app/compare/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Technology Comparisons | DevMetrix',
  description: 'Side-by-side comparisons of popular technologies. Make informed decisions for your next project.',
};

const comparisons = [
  {
    slug: 'risc-vs-cisc',
    title: 'RISC vs CISC',
    description: 'The fundamental battle of computer architecture.',
    icon: '💻',
    color: 'from-blue-600 to-indigo-600',
    topics: ['Computer Architecture', 'Hardware'],
    readTime: '45 min'
  },
  {
    slug: 'virtualization-vs-containers',
    title: 'VMs vs Containers',
    description: 'Hardware vs OS-level virtualization.',
    icon: '📦',
    color: 'from-blue-500 to-green-500',
    topics: ['Cloud', 'Infrastructure'],
    readTime: '40 min'
  },
  {
    slug: 'sql-vs-nosql',
    title: 'SQL vs NoSQL',
    description: 'Relational structure vs Flexible documents.',
    icon: '🗄️',
    color: 'from-blue-400 to-orange-500',
    topics: ['Database', 'Data'],
    readTime: '35 min'
  },
  {
    slug: 'rest-vs-grpc',
    title: 'REST vs gRPC',
    description: 'JSON/HTTP1 vs Protobuf/HTTP2.',
    icon: '🔌',
    color: 'from-pink-500 to-cyan-500',
    topics: ['API', 'Microservices'],
    readTime: '30 min'
  },
  {
    slug: 'monolithic-vs-microservices',
    title: 'Monolith vs Microservices',
    description: 'Architectural unity vs Distributed complexity.',
    icon: '🏗️',
    color: 'from-red-500 to-indigo-500',
    topics: ['Architecture', 'System Design'],
    readTime: '45 min'
  },
  {
    slug: 'imperative-vs-declarative',
    title: 'Imperative vs Declarative',
    description: 'Control flow vs Logic flow.',
    icon: '📜',
    color: 'from-gray-500 to-cyan-500',
    topics: ['Programming', 'Theory'],
    readTime: '25 min'
  },
  {
    slug: 'compiled-vs-interpreted',
    title: 'Compiled vs Interpreted',
    description: 'AOT performance vs JIT flexibility.',
    icon: '⚙️',
    color: 'from-blue-600 to-yellow-500',
    topics: ['Languages', 'Performance'],
    readTime: '30 min'
  },
  {
    slug: 'symmetric-vs-asymmetric-encryption',
    title: 'Symmetric vs Asymmetric',
    description: 'Shared secrets vs Public/Private keys.',
    icon: '🔐',
    color: 'from-green-600 to-purple-600',
    topics: ['Security', 'Cryptography'],
    readTime: '35 min'
  },
  {
    slug: 'http1-vs-http2-vs-http3',
    title: 'HTTP Versions',
    description: 'TCP text vs Multiplexing vs QUIC UDP.',
    icon: '🌐',
    color: 'from-blue-400 to-red-500',
    topics: ['Networking', 'Web'],
    readTime: '40 min'
  },
  {
    slug: 'vertical-vs-horizontal-scaling',
    title: 'Vertical vs Horizontal Scaling',
    description: 'Bigger hardware vs More hardware.',
    icon: '📈',
    color: 'from-orange-500 to-cyan-500',
    topics: ['System Design', 'Scalability'],
    readTime: '30 min'
  },
  {
    slug: 'csr-vs-ssr',
    title: 'CSR vs SSR',
    description: 'Client-side vs Server-side rendering.',
    icon: '🖥️',
    color: 'from-cyan-400 to-green-500',
    topics: ['Frontend', 'Performance'],
    readTime: '25 min'
  },
  {
    slug: 'fpga-vs-microcontroller',
    title: 'FPGA vs Microcontroller',
    description: 'Hardware vs Software: The embedded systems dilemma.',
    icon: '🔋',
    color: 'from-green-600 to-emerald-600',
    topics: ['Embedded Systems', 'Hardware'],
    readTime: '40 min'
  },
  {
    slug: 'cloud-vs-edge',
    title: 'Cloud vs Edge Computing',
    description: 'Centralized vs Distributed: Where should data live?',
    icon: '☁️',
    color: 'from-cyan-500 to-blue-500',
    topics: ['Cloud', 'Distributed Systems'],
    readTime: '35 min'
  },
  {
    slug: 'von-neumann-vs-harvard',
    title: 'Von Neumann vs Harvard',
    description: 'Unified vs Split Memory: A historical perspective.',
    icon: '🧠',
    color: 'from-purple-600 to-pink-600',
    topics: ['Computer Architecture', 'Theory'],
    readTime: '30 min'
  },
  {
    slug: 'gpu-vs-cpu',
    title: 'GPU vs CPU',
    description: 'Throughput vs Latency in modern computing.',
    icon: '🎮',
    color: 'from-red-500 to-orange-500',
    topics: ['Hardware', 'Performance'],
    readTime: '35 min'
  },
  {
    slug: 'embedded-vs-general-purpose',
    title: 'Embedded vs General Purpose',
    description: 'Dedicated efficiency vs Flexible power.',
    icon: '📠',
    color: 'from-yellow-500 to-orange-500',
    topics: ['Systems', 'Engineering'],
    readTime: '30 min'
  },
  {
    slug: 'wired-vs-wireless',
    title: 'Wired vs Wireless',
    description: 'The physics of connectivity: Ethernet vs Wi-Fi.',
    icon: '📡',
    color: 'from-blue-400 to-cyan-400',
    topics: ['Networking', 'Infrastructure'],
    readTime: '30 min'
  },
  {
    slug: 'open-source-vs-proprietary-hardware',
    title: 'Open Source vs Proprietary HW',
    description: 'The ethics and economics of hardware design.',
    icon: '🔓',
    color: 'from-green-500 to-teal-500',
    topics: ['Hardware', 'Open Source'],
    readTime: '30 min'
  },
  {
    slug: 'ipv4-vs-ipv6',
    title: 'IPv4 vs IPv6',
    description: 'The internet addressing crisis and its solution.',
    icon: '🌐',
    color: 'from-indigo-500 to-purple-500',
    topics: ['Networking', 'Protocols'],
    readTime: '35 min'
  },
  {
    slug: 'tcp-vs-udp',
    title: 'TCP vs UDP',
    description: 'Reliability vs Speed: The transport layer showdown.',
    icon: '📦',
    color: 'from-orange-500 to-red-500',
    topics: ['Networking', 'Protocols'],
    readTime: '25 min'
  },
  {
    slug: 'graphql-vs-rest',
    title: 'GraphQL vs REST API',
    description: 'Which API architecture is right for your project?',
    icon: '🔌',
    color: 'from-purple-500 to-pink-500',
    topics: ['API', 'Backend'],
    readTime: '12 min'
  },
  {
    slug: 'mongodb-vs-postgresql',
    title: 'MongoDB vs PostgreSQL',
    description: 'NoSQL vs SQL: Choose the right database',
    icon: '🗄️',
    color: 'from-green-500 to-emerald-500',
    topics: ['Database'],
    readTime: '10 min'
  },
  {
    slug: 'docker-vs-kubernetes',
    title: 'Docker vs Kubernetes',
    description: 'Container runtime vs orchestration platform',
    icon: '🐳',
    color: 'from-blue-500 to-cyan-500',
    topics: ['DevOps', 'Containers'],
    readTime: '14 min'
  },
  {
    slug: 'react-vs-vue-vs-angular',
    title: 'React vs Vue vs Angular',
    description: 'The ultimate frontend framework comparison',
    icon: '⚛️',
    color: 'from-blue-400 to-purple-500',
    topics: ['Frontend', 'JavaScript'],
    readTime: '15 min'
  },
  {
    slug: 'typescript-vs-javascript',
    title: 'TypeScript vs JavaScript',
    description: 'Should you adopt TypeScript?',
    icon: '🔷',
    color: 'from-blue-600 to-indigo-600',
    topics: ['JavaScript', 'TypeScript'],
    readTime: '8 min'
  },
  {
    slug: 'github-actions-vs-jenkins',
    title: 'GitHub Actions vs Jenkins',
    description: 'Complete guide comparing secure CI/CD pipelines and workflows',
    icon: '⚙️',
    color: 'from-blue-600 to-cyan-400',
    topics: ['CI/CD', 'DevOps', 'Security'],
    readTime: '20 min'
  },
  {
    slug: 'nextjs-vs-remix',
    title: 'Next.js vs Remix',
    description: 'Two modern React frameworks battle for full-stack dominance.',
    icon: '🚀',
    color: 'from-slate-800 to-black',
    topics: ['Frontend', 'React', 'Fullstack'],
    readTime: '10 min'
  },
  {
    slug: 'tailwind-vs-bootstrap',
    title: 'Tailwind CSS vs Bootstrap',
    description: 'Utility-first vs Component-based styling showdown.',
    icon: '🎨',
    color: 'from-cyan-400 to-blue-500',
    topics: ['CSS', 'Frontend'],
    readTime: '8 min'
  },
  {
    slug: 'aws-vs-azure',
    title: 'AWS vs Azure',
    description: 'Amazon Web Services vs Microsoft Azure.',
    icon: '☁️',
    color: 'from-orange-400 to-yellow-500',
    topics: ['Cloud', 'DevOps'],
    readTime: '12 min'
  },
  {
    slug: 'nodejs-vs-python',
    title: 'Node.js vs Python',
    description: 'JavaScript everywhere vs The Language of Data.',
    icon: '🐍',
    color: 'from-green-500 to-yellow-500',
    topics: ['Backend', 'Languages'],
    readTime: '10 min'
  },
  {
    slug: 'mysql-vs-mariadb',
    title: 'MySQL vs MariaDB',
    description: 'The original open-source DB vs its community-driven successor.',
    icon: '🐬',
    color: 'from-blue-400 to-orange-400',
    topics: ['Database', 'SQL'],
    readTime: '9 min'
  },
  {
    slug: 'flutter-vs-react-native',
    title: 'Flutter vs React Native',
    description: 'Google\'s UI toolkit vs Meta\'s JS framework.',
    icon: '📱',
    color: 'from-blue-400 to-cyan-400',
    topics: ['Mobile', 'Cross-Platform'],
    readTime: '11 min'
  },
  {
    slug: 'rust-vs-go',
    title: 'Rust vs Go',
    description: 'The system languages: Memory safety vs Simplicity.',
    icon: '🦀',
    color: 'from-orange-600 to-red-600',
    topics: ['Systems', 'Languages'],
    readTime: '13 min'
  },
  {
    slug: 'redux-vs-context-api',
    title: 'Redux vs Context API',
    description: 'State management: Do you really need Redux?',
    icon: '🔄',
    color: 'from-purple-600 to-indigo-600',
    topics: ['React', 'State Management'],
    readTime: '8 min'
  },
  {
    slug: 'jest-vs-mocha',
    title: 'Jest vs Mocha',
    description: 'Battle of the JavaScript Test Runners.',
    icon: '🧪',
    color: 'from-red-600 to-pink-600',
    topics: ['Testing', 'JavaScript'],
    readTime: '9 min'
  },
  {
    slug: 'npm-vs-yarn-vs-pnpm',
    title: 'npm vs Yarn vs pnpm',
    description: 'The war for your node_modules folder.',
    icon: '📦',
    color: 'from-red-500 to-yellow-500',
    topics: ['Tools', 'DevOps'],
    readTime: '7 min'
  },
  {
    slug: 'vite-vs-webpack',
    title: 'Vite vs Webpack',
    description: 'The Speedster vs The Configurator: Battle for Build Tools.',
    icon: '⚡',
    color: 'from-purple-500 to-blue-500',
    topics: ['Frontend', 'Tooling'],
    readTime: '10 min'
  },
  {
    slug: 'bun-vs-nodejs',
    title: 'Bun vs Node.js',
    description: 'The new ultra-fast runtime challenges the king.',
    icon: '🥟',
    color: 'from-yellow-200 to-orange-200',
    topics: ['Runtime', 'Backend'],
    readTime: '12 min'
  },
  {
    slug: 'supabase-vs-firebase',
    title: 'Supabase vs Firebase',
    description: 'Open Source SQL vs Google\'s Realtime Giant.',
    icon: '🔥',
    color: 'from-green-400 to-orange-400',
    topics: ['BaaS', 'Database'],
    readTime: '15 min'
  },
  {
    slug: 'postman-vs-insomnia',
    title: 'Postman vs Insomnia',
    description: 'API Development: Feature-rich vs Minimalist.',
    icon: '🚀',
    color: 'from-orange-500 to-purple-500',
    topics: ['API', 'Tools'],
    readTime: '8 min'
  },
  {
    slug: 'rabbitmq-vs-kafka',
    title: 'RabbitMQ vs Kafka',
    description: 'Message Queues vs Event Streaming.',
    icon: '📨',
    color: 'from-orange-500 to-gray-500',
    topics: ['Backend', 'System Design'],
    readTime: '18 min'
  },
  {
    slug: 'nginx-vs-apache',
    title: 'Nginx vs Apache',
    description: 'Event-driven speed vs Process-driven flexibility.',
    icon: '🚦',
    color: 'from-green-600 to-red-600',
    topics: ['Servers', 'DevOps'],
    readTime: '14 min'
  },
  {
    slug: 'playwright-vs-cypress',
    title: 'Playwright vs Cypress',
    description: 'Modern E2E Testing Framework Showdown.',
    icon: '🎭',
    color: 'from-green-400 to-green-600',
    topics: ['Testing', 'QA'],
    readTime: '11 min'
  },
  {
    slug: 'session-vs-jwt',
    title: 'Session vs JWT',
    description: 'Stateful vs Stateless Authentication.',
    icon: '🔑',
    color: 'from-blue-500 to-yellow-500',
    topics: ['Security', 'Auth'],
    readTime: '16 min'
  },
  {
    slug: 'svelte-vs-react',
    title: 'Svelte vs React',
    description: 'The Compiler vs The Virtual DOM.',
    icon: '🧡',
    color: 'from-orange-500 to-cyan-500',
    topics: ['Frontend', 'Frameworks'],
    readTime: '10 min'
  },
  {
    slug: 'prisma-vs-typeorm',
    title: 'Prisma vs TypeORM',
    description: 'Modern Type-Safe ORM vs Traditional Decorators.',
    icon: '💎',
    color: 'from-cyan-600 to-red-500',
    topics: ['Database', 'TypeScript'],
    readTime: '12 min'
  },
  {
    slug: 'redis-vs-memcached',
    title: 'Redis vs Memcached',
    description: 'The Data Structure Store vs The Pure Cache.',
    icon: '🧠',
    color: 'from-red-500 to-green-500',
    topics: ['Database', 'Caching'],
    readTime: '15 min'
  },
  {
    slug: 'kotlin-vs-java',
    title: 'Kotlin vs Java',
    description: 'The Modern Conciseness vs The Industrial Standard.',
    icon: '☕',
    color: 'from-purple-500 to-orange-500',
    topics: ['Languages', 'Mobile', 'Backend'],
    readTime: '20 min'
  },
  {
    slug: 'terraform-vs-ansible',
    title: 'Terraform vs Ansible',
    description: 'Infrastructure Architect vs Configuration Master.',
    icon: '🏗️',
    color: 'from-purple-600 to-red-600',
    topics: ['DevOps', 'IaC'],
    readTime: '18 min'
  },
  {
    slug: 'grafana-vs-kibana',
    title: 'Grafana vs Kibana',
    description: 'Metrics Dashboard vs Log Explorer.',
    icon: '📊',
    color: 'from-orange-500 to-pink-500',
    topics: ['DevOps', 'Observability'],
    readTime: '16 min'
  },
  {
    slug: 'vim-vs-vscode',
    title: 'Vim vs VS Code',
    description: 'Keyboard Warrior vs Modern Editor.',
    icon: '📝',
    color: 'from-green-500 to-blue-500',
    topics: ['Tools', 'Productivity'],
    readTime: '12 min'
  },
  {
    slug: 'linux-vs-windows-server',
    title: 'Linux vs Windows Server',
    description: 'Open Kernel vs Enterprise OS.',
    icon: '🐧',
    color: 'from-yellow-500 to-blue-600',
    topics: ['OS', 'Servers'],
    readTime: '25 min'
  },
  {
    slug: 'pytorch-vs-tensorflow',
    title: 'PyTorch vs TensorFlow',
    description: 'Research Choice vs Production Giant.',
    icon: '🧠',
    color: 'from-red-500 to-orange-500',
    topics: ['AI', 'Machine Learning'],
    readTime: '22 min'
  },
  {
    slug: 'websockets-vs-sse',
    title: 'WebSockets vs SSE',
    description: 'Bi-Directional Pipe vs One-Way Stream.',
    icon: '📡',
    color: 'from-blue-400 to-green-400',
    topics: ['Web', 'Networking'],
    readTime: '14 min'
  },
  {
    slug: 'oauth2-vs-saml',
    title: 'OAuth 2.0 vs SAML',
    description: 'Modern Auth vs Enterprise SSO.',
    icon: '🔐',
    color: 'from-blue-500 to-red-500',
    topics: ['Security', 'Auth'],
    readTime: '18 min'
  },
  {
    slug: 'vercel-vs-netlify',
    title: 'Vercel vs Netlify',
    description: 'Next.js Native vs JAMstack Pioneer.',
    icon: '☁️',
    color: 'from-black to-cyan-500',
    topics: ['Cloud', 'Frontend'],
    readTime: '12 min'
  }
];

export default function ComparisonsPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 mb-4">
            Technology Comparisons
          </h1>
          <p className="text-lg text-purple-200/60 max-w-2xl mx-auto">
            Detailed, unbiased comparisons to help you make the right technology choices for your projects.
          </p>
        </div>

        {/* Comparisons Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {comparisons.map((comp) => (
            <Link
              key={comp.slug}
              href={`/compare/${comp.slug}`}
              className="group"
            >
              <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6 hover:border-purple-400/50 transition-all h-full flex flex-col">
                <div className="flex items-start gap-6 mb-4">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${comp.color} flex items-center justify-center text-3xl flex-shrink-0 shadow-lg`}>
                    {comp.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-purple-100 mb-2 group-hover:text-purple-300 transition-colors">
                      {comp.title}
                    </h3>
                    <p className="text-sm text-purple-200/60">
                      {comp.description}
                    </p>
                  </div>
                </div>

                {/* Meta */}
                <div className="mt-auto flex flex-wrap items-center gap-3 text-xs pt-4 border-t border-purple-500/10">
                  {comp.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 bg-purple-800/30 text-purple-300 rounded"
                    >
                      {topic}
                    </span>
                  ))}
                  <span className="text-purple-400 ml-auto">• {comp.readTime} read</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Request Comparison */}
        <div className="mt-16 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-2 border-purple-500/30 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-purple-100 mb-4">
            📝 Request a Comparison
          </h2>
          <p className="text-purple-200/70 mb-6 max-w-2xl mx-auto">
            Don&apos;t see the comparison you&apos;re looking for? Let us know what technologies you&apos;d like us to compare!
          </p>
          <button className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors font-semibold">
            Suggest a Comparison
          </button>
        </div>
      </div>
    </div>
  );
}
