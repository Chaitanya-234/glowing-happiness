// app/examples/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Code Examples & Snippets | DevMetrix',
  description: 'Ready-to-use code examples for JavaScript, React, Node.js and more. Copy, paste, and learn.',
};

const categories = [
  {
    slug: 'javascript',
    title: 'JavaScript',
    icon: '⚡',
    color: 'from-yellow-500 to-orange-500',
    count: 25,
    description: 'ES6+, async/await, promises, arrays'
  },
  {
    slug: 'react',
    title: 'React',
    icon: '⚛️',
    color: 'from-blue-500 to-cyan-500',
    count: 18,
    description: 'Hooks, components, patterns'
  },
  {
    slug: 'nodejs',
    title: 'Node.js',
    icon: '🟢',
    color: 'from-green-500 to-emerald-500',
    count: 15,
    description: 'Express, APIs, middleware'
  },
  {
    slug: 'typescript',
    title: 'TypeScript',
    icon: '🔷',
    color: 'from-blue-600 to-indigo-600',
    count: 12,
    description: 'Types, interfaces, generics'
  },
  {
    slug: 'spring-ai',
    title: 'Spring AI',
    icon: '🌱',
    color: 'from-green-500 to-emerald-600',
    count: 5,
    description: 'Chatbots, RAG, Function Calling'
  },
  {
    slug: 'spring-security-jwt',
    title: 'Spring Security',
    icon: '🛡️',
    color: 'from-indigo-500 to-purple-600',
    count: 10,
    description: 'JWT, OAuth2, Roles, Filter'
  },
  {
    slug: 'spring-boot-rate-limiting',
    title: 'Spring Boot Rate Limiting',
    icon: '🛡️',
    color: 'from-red-500 to-orange-600',
    count: 1,
    description: 'API Protection, Bucket4j, Redis'
  },
  {
    slug: 'spring-redis',
    title: 'Spring Redis',
    icon: '🚀',
    color: 'from-red-500 to-rose-600',
    count: 1,
    description: 'Redis Caching, RedisTemplate, Session'
  },
];

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-200 via-blue-200 to-purple-200 mb-4">
            Code Examples & Snippets
          </h1>
          <p className="text-lg text-purple-200/60 max-w-2xl mx-auto">
            Production-ready code examples you can copy and use immediately. Learn by doing.
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/examples/${cat.slug}`}
              className="group"
            >
              <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6 hover:border-purple-400/50 transition-all hover:scale-105 h-full">
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl mb-4`}>
                  {cat.icon}
                </div>

                <h3 className="text-xl font-bold text-purple-100 mb-2 group-hover:text-purple-300 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-sm text-purple-200/60 mb-4">
                  {cat.description}
                </p>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-purple-400">{cat.count} examples</span>
                  <span className="text-purple-300 group-hover:translate-x-1 transition-transform">
                    Browse →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Popular Examples */}
        <div>
          <h2 className="text-2xl font-bold text-purple-100 mb-6">
            🔥 Most Popular Examples
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {popularExamples.map((example) => (
              <div
                key={example.title}
                className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-5 hover:border-purple-400/40 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-purple-100 mb-1">
                      {example.title}
                    </h3>
                    <p className="text-xs text-purple-300/60">
                      {example.category}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-900/30 text-green-300 rounded">
                    {example.difficulty}
                  </span>
                </div>

                <pre className="bg-black/40 rounded p-3 text-xs overflow-x-auto mb-3">
                  <code className="text-purple-300">{example.preview}</code>
                </pre>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-purple-400">
                    👁️ {example.views} views
                  </span>
                  <button className="text-xs text-purple-300 hover:text-purple-200 transition-colors">
                    View Full Code →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const popularExamples = [
  {
    title: 'Fetch API with Error Handling',
    category: 'JavaScript',
    difficulty: 'Easy',
    preview: 'async function fetchData(url) {\n  try {\n    const res = await fetch(url);\n    ...',
    views: '2.5k'
  },
  {
    title: 'Custom React Hook',
    category: 'React',
    difficulty: 'Medium',
    preview: 'function useLocalStorage(key, initial) {\n  const [value, setValue] = ...',
    views: '1.8k'
  },
  {
    title: 'Express Middleware',
    category: 'Node.js',
    difficulty: 'Medium',
    preview: 'const authMiddleware = (req, res, next) => {\n  const token = ...',
    views: '1.2k'
  },
  {
    title: 'TypeScript Generic Function',
    category: 'TypeScript',
    difficulty: 'Hard',
    preview: 'function getProperty<T, K extends keyof T>(\n  obj: T, key: K\n) ...',
    views: '980'
  },
];
