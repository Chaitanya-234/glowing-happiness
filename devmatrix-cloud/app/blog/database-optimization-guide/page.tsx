'use client';
// app/blog/database-optimization-guide/page.tsx
import { useTheme } from '@/components/providers/ThemeProvider';
import JsonLdArticle from '@/components/JsonLdArticle';
import { Metadata } from 'next';
import Link from 'next/link';

const metadata: Metadata = {
  title: 'Database Optimization: Indexing, Queries, and Performance | DevMetrix',
  description: 'Master database optimization with indexing strategies, query optimization, and scaling techniques for high-traffic applications. Real-world examples.',
  keywords: ['database optimization', 'sql indexing', 'query optimization', 'database performance', 'sql tuning'],
  authors: [{ name: 'DevMetrix Database Team', url: 'https://devmetrix.in/about' }],
  openGraph: {
    title: 'Database Optimization: Complete Guide for Developers',
    description: 'Learn proven database optimization techniques from experienced engineers',
    type: 'article',
    publishedTime: '2025-10-16T00:00:00.000Z',
  },
};

export default function DatabaseOptimizationGuide() {
  const { currentTheme: theme } = useTheme();
  return (
    <article className={`min-h-screen ${theme.colors.background} pt-24 pb-20 px-4 transition-colors duration-300`}>
      <JsonLdArticle
        headline="Database Optimization: Indexing, Queries, and Performance"
        description="Improve database performance with indexing strategies, query optimization, and scaling techniques for high-traffic applications."
        datePublished="2025-10-16"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/database-optimization-guide"
      />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-red-500"></div>
          <div className="pl-8">
            <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-semibold rounded-full mb-4 border border-purple-500/30">
              🗄️ Database
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 mb-4 leading-tight">
              Database Optimization: Indexing, Queries, and Performance
            </h1>
            <div className="flex flex-wrap gap-4 text-xs md:text-sm text-purple-300/40 mb-4">
              <span>📅 October 16, 2025</span>
              <span>•</span>
              <span>⏱️ 14 min read</span>
              <span>•</span>
              <span>✍️ By DevMetrix Database Team</span>
            </div>
            <p className="text-sm text-purple-300/30">Last updated: October 2025 • Reviewed by database architects</p>
          </div>
        </div>

        {/* Quick Nav */}
        <div className="sticky top-16 z-40 mb-8 bg-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-3">
          <div className="flex items-center gap-3 text-xs text-purple-200/60">
            <span className="whitespace-nowrap">📚 Jump to:</span>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              <a href="#indexes" className="px-2 py-1 bg-purple-800/30 rounded hover:bg-purple-700/40 transition-colors whitespace-nowrap">Indexes</a>
              <a href="#queries" className="px-2 py-1 bg-purple-800/30 rounded hover:bg-purple-700/40 transition-colors whitespace-nowrap">Queries</a>
              <a href="#scaling" className="px-2 py-1 bg-purple-800/30 rounded hover:bg-purple-700/40 transition-colors whitespace-nowrap">Scaling</a>
              <a href="#monitoring" className="px-2 py-1 bg-purple-800/30 rounded hover:bg-purple-700/40 transition-colors whitespace-nowrap">Monitoring</a>
            </div>
          </div>
        </div>

        <div className="prose prose-invert prose-purple prose-lg max-w-none">
          {/* Intro */}
          <div className="bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-red-900/20 border-2 border-purple-500/30 rounded-xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-9xl opacity-5">⚡</div>
            <p className="text-lg md:text-xl text-purple-100/80 leading-relaxed mb-4 relative z-10">
              Your database is slow. Pages take forever to load. Users are complaining. Sound familiar?
              I've been there. The good news? Most database performance problems have simple solutions.
              You don't need to be a DBA wizard - you just need to understand a few key concepts.
            </p>
            <p className="text-base text-purple-200/60 relative z-10">
              I've seen databases go from 10 second queries to 10 milliseconds with one index. I've watched
              apps handle 10x more traffic after query optimization. This guide covers the techniques that
              actually move the needle in production.
            </p>
          </div>

          {/* Performance Impact Scale */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🚀</div>
              <div className="text-xs font-semibold text-green-300">Instant</div>
              <div className="text-xs text-green-200/50 mt-1">&lt; 100ms</div>
            </div>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-xs font-semibold text-blue-300">Fast</div>
              <div className="text-xs text-blue-200/50 mt-1">100ms - 1s</div>
            </div>
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🐌</div>
              <div className="text-xs font-semibold text-yellow-300">Slow</div>
              <div className="text-xs text-yellow-200/50 mt-1">1s - 5s</div>
            </div>
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">💀</div>
              <div className="text-xs font-semibold text-red-300">Timeout</div>
              <div className="text-xs text-red-200/50 mt-1">&gt; 5s</div>
            </div>
          </div>

          <h2 id="indexes" className="text-3xl font-bold text-purple-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">📇</span>
            Indexing: Your First Line of Defense
          </h2>

          <p className="text-sm md:text-base text-purple-200/60 leading-relaxed">
            Think of an index like a book's table of contents. Without it, you'd have to read every page to
            find what you want. With it, you jump straight to the right page. Databases work the same way.
          </p>

          <div className="my-8 grid md:grid-cols-2 gap-6">
            <div className="bg-red-900/10 border border-red-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-200/80 mb-3 flex items-center gap-2">
                <span>🐢</span> Without Index
              </h3>
              <pre className="bg-red-900/20 p-3 rounded text-xs overflow-x-auto mb-3">
                <code className="text-red-100/80">{`-- Full table scan!
SELECT * FROM users
WHERE email = 'john@example.com';

-- Database reads ALL rows
-- 1,000,000 rows = 10 seconds`}</code>
              </pre>
              <p className="text-xs text-red-200/60">Scans every single row. Gets slower as table grows.</p>
            </div>

            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-200/80 mb-3 flex items-center gap-2">
                <span>⚡</span> With Index
              </h3>
              <pre className="bg-green-900/20 p-3 rounded text-xs overflow-x-auto mb-3">
                <code className="text-green-100/80">{`-- Uses index!
CREATE INDEX idx_email ON users(email);

SELECT * FROM users
WHERE email = 'john@example.com';

-- Database jumps to the row
-- 1,000,000 rows = 10 milliseconds`}</code>
              </pre>
              <p className="text-xs text-green-200/60">Direct lookup. Consistent speed regardless of table size.</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-2 border-purple-500/30 rounded-xl p-6 my-8">
            <h3 className="text-xl font-bold text-purple-200/80 mb-4">When to Add Indexes:</h3>
            <div className="space-y-3 text-sm text-purple-200/60">
              <div className="flex gap-2">
                <span className="text-green-400">✓</span>
                <span><strong>WHERE clauses</strong> - Columns you filter by</span>
              </div>
              <div className="flex gap-2">
                <span className="text-green-400">✓</span>
                <span><strong>JOIN conditions</strong> - Foreign keys</span>
              </div>
              <div className="flex gap-2">
                <span className="text-green-400">✓</span>
                <span><strong>ORDER BY</strong> - Columns you sort by</span>
              </div>
              <div className="flex gap-2">
                <span className="text-green-400">✓</span>
                <span><strong>Frequently queried</strong> - Columns used in most queries</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border-2 border-red-500/30 rounded-xl p-6 my-8">
            <h3 className="text-xl font-bold text-red-200/80 mb-4">⚠️ Index Gotchas:</h3>
            <div className="space-y-3 text-sm text-red-200/60">
              <div className="flex gap-2">
                <span className="text-red-400">✗</span>
                <span><strong>Too many indexes</strong> - Slows down INSERT/UPDATE operations</span>
              </div>
              <div className="flex gap-2">
                <span className="text-red-400">✗</span>
                <span><strong>Low cardinality</strong> - Don't index boolean columns</span>
              </div>
              <div className="flex gap-2">
                <span className="text-red-400">✗</span>
                <span><strong>Small tables</strong> - Under 1000 rows don't need indexes</span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-pink-200/80 mt-8 mb-4">Compound Indexes (The Secret Weapon):</h3>

          <p className="text-sm text-purple-200/60 mb-4">
            When you filter by multiple columns, compound indexes are magic:
          </p>

          <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs my-6">
            <code className="text-purple-100/80">{`-- Query that uses multiple columns
SELECT * FROM orders
WHERE user_id = 123
  AND status = 'pending'
  AND created_at > '2025-01-01';

-- Create compound index (order matters!)
CREATE INDEX idx_orders_lookup
ON orders(user_id, status, created_at);

-- Most selective column first!
-- user_id (narrows to specific user)
-- status (narrows to pending orders)
-- created_at (final filter)`}</code>
          </pre>

          <h2 id="queries" className="text-3xl font-bold text-pink-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">🔍</span>
            Query Optimization: Write Smarter SQL
          </h2>

          <p className="text-sm md:text-base text-purple-200/60 leading-relaxed mb-6">
            Even with perfect indexes, bad queries kill performance. Here are the patterns I see causing problems constantly:
          </p>

          <div className="space-y-6 my-8">
            <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border-l-4 border-red-500 rounded-r-lg p-6">
              <h3 className="text-lg font-semibold text-red-200/80 mb-3">❌ The SELECT * Problem:</h3>
              <pre className="bg-red-900/20 p-3 rounded text-xs overflow-x-auto mb-3">
                <code className="text-red-100/80">{`-- Bad: Fetches ALL columns (waste bandwidth)
SELECT * FROM users WHERE id = 1;

-- Returns: id, email, password, name, bio,
-- avatar, created_at, updated_at, settings...`}</code>
              </pre>
              <pre className="bg-green-900/20 p-3 rounded text-xs overflow-x-auto">
                <code className="text-green-100/80">{`-- Good: Only fetch what you need
SELECT id, name, email FROM users WHERE id = 1;

-- 10x faster, less memory, cleaner code`}</code>
              </pre>
            </div>

            <div className="bg-gradient-to-r from-orange-900/20 to-yellow-900/20 border-l-4 border-orange-500 rounded-r-lg p-6">
              <h3 className="text-lg font-semibold text-orange-200/80 mb-3">❌ The N+1 Query Problem:</h3>
              <p className="text-sm text-orange-200/60 mb-3">
                This one is BRUTAL. It happens when you loop through results and query inside the loop:
              </p>
              <pre className="bg-red-900/20 p-3 rounded text-xs overflow-x-auto mb-3">
                <code className="text-red-100/80">{`// Bad: 101 queries! (1 + 100)
const users = await User.findAll(); // 1 query

for (const user of users) {
  const posts = await Post.findAll({
    where: { userId: user.id }
  }); // 100 queries!
}`}</code>
              </pre>
              <pre className="bg-green-900/20 p-3 rounded text-xs overflow-x-auto">
                <code className="text-green-100/80">{`// Good: 1 query with JOIN
const users = await User.findAll({
  include: [{ model: Post }]
});

// Or use IN clause
const userIds = users.map(u => u.id);
const posts = await Post.findAll({
  where: { userId: userIds }
});`}</code>
              </pre>
            </div>

            <div className="bg-gradient-to-r from-yellow-900/20 to-green-900/20 border-l-4 border-yellow-500 rounded-r-lg p-6">
              <h3 className="text-lg font-semibold text-yellow-200/80 mb-3">❌ The LIKE '%pattern%' Problem:</h3>
              <pre className="bg-red-900/20 p-3 rounded text-xs overflow-x-auto mb-3">
                <code className="text-red-100/80">{`-- Bad: Can't use index (leading wildcard)
SELECT * FROM products
WHERE name LIKE '%phone%';

-- Scans entire table!`}</code>
              </pre>
              <pre className="bg-green-900/20 p-3 rounded text-xs overflow-x-auto">
                <code className="text-green-100/80">{`-- Better: No leading wildcard
SELECT * FROM products
WHERE name LIKE 'phone%';

-- Can use index!

-- Best: Full-text search
CREATE FULLTEXT INDEX idx_name ON products(name);
SELECT * FROM products
WHERE MATCH(name) AGAINST('phone');`}</code>
              </pre>
            </div>
          </div>

          <h2 id="scaling" className="text-3xl font-bold text-blue-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">📈</span>
            Scaling Strategies for Growth
          </h2>

          <div className="grid md:grid-cols-3 gap-4 my-8">
            <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-lg p-6">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-base font-bold text-blue-200/80 mb-2">Vertical Scaling</h3>
              <p className="text-xs text-blue-200/60 mb-3">Bigger machine, more power</p>
              <div className="flex gap-2 text-xs flex-wrap">
                <span className="px-2 py-1 bg-green-800/40 text-green-200 rounded">✓ Easy</span>
                <span className="px-2 py-1 bg-red-800/40 text-red-200 rounded">✗ Expensive</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-lg p-6">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="text-base font-bold text-green-200/80 mb-2">Read Replicas</h3>
              <p className="text-xs text-green-200/60 mb-3">Split reads across servers</p>
              <div className="flex gap-2 text-xs flex-wrap">
                <span className="px-2 py-1 bg-green-800/40 text-green-200 rounded">✓ Scales reads</span>
                <span className="px-2 py-1 bg-blue-800/40 text-blue-200 rounded">~ Medium complexity</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-6">
              <div className="text-3xl mb-3">✂️</div>
              <h3 className="text-base font-bold text-purple-200/80 mb-2">Sharding</h3>
              <p className="text-xs text-purple-200/60 mb-3">Split data across databases</p>
              <div className="flex gap-2 text-xs flex-wrap">
                <span className="px-2 py-1 bg-green-800/40 text-green-200 rounded">✓ Infinite scale</span>
                <span className="px-2 py-1 bg-red-800/40 text-red-200 rounded">✗ Complex</span>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-semibold text-cyan-200/80 mt-8 mb-4">Caching: The Performance Multiplier</h3>

          <p className="text-sm text-purple-200/60 mb-4">
            The fastest database query is the one you don't make. Cache everything you can:
          </p>

          <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs my-6">
            <code className="text-purple-100/80">{`// Redis caching example
const Redis = require('redis');
const client = Redis.createClient();

async function getUser(userId) {
  // Check cache first
  const cached = await client.get(\`user:\${userId}\`);
  if (cached) {
    return JSON.parse(cached); // Cache hit!
  }

  // Cache miss - query database
  const user = await db.query(
    'SELECT * FROM users WHERE id = ?',
    [userId]
  );

  // Store in cache (expire after 1 hour)
  await client.setEx(
    \`user:\${userId}\`,
    3600,
    JSON.stringify(user)
  );

  return user;
}

// Result: 100x faster for repeated queries`}</code>
          </pre>

          <h2 id="monitoring" className="text-3xl font-bold text-orange-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">📊</span>
            Monitoring and Debugging
          </h2>

          <div className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-2 border-orange-500/30 rounded-xl p-6 my-8">
            <h3 className="text-xl font-bold text-orange-200/80 mb-4">Essential Queries to Monitor:</h3>
            <pre className="bg-orange-900/30 p-4 rounded text-xs overflow-x-auto">
              <code className="text-orange-100/80">{`-- PostgreSQL: Find slow queries
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

-- MySQL: Enable slow query log
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 1;

-- Check query execution plan
EXPLAIN ANALYZE
SELECT * FROM orders WHERE user_id = 123;`}</code>
            </pre>
          </div>

          {/* Optimization Checklist */}
          <div className="my-12 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-2 border-purple-500/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-purple-100/80 mb-6 flex items-center gap-3">
              <span className="text-3xl">✅</span>
              Database Optimization Checklist
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Index WHERE/JOIN columns</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>SELECT only needed columns</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Fix N+1 queries with JOINs</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Use connection pooling</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Implement caching layer</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Monitor slow query log</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Use EXPLAIN for queries</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Set up read replicas</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Archive old data</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Regular vacuum/optimize</span>
                </div>
              </div>
            </div>
          </div>

          <div className="my-12 bg-blue-900/10 border border-blue-500/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-200/80 mb-4">🎯 The Bottom Line</h3>
            <p className="text-sm text-blue-200/60 leading-relaxed">
              Start with the basics: add indexes to your WHERE clauses, stop using SELECT *, and cache frequently
              accessed data. These three changes alone will solve 80% of database performance issues. As you grow,
              add read replicas and consider sharding. But honestly, most apps never need that level of complexity.
              Just index properly and write smart queries.
            </p>
          </div>

          {/* Author Box */}
          <div className="mt-16 mb-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">👨‍💼</div>
              <div>
                <h3 className="text-lg font-semibold text-purple-100/80 mb-2">About the Authors</h3>
                <p className="text-sm text-purple-200/60 leading-relaxed mb-3">
                  Written by DevMetrix's database team with experience optimizing databases handling millions
                  of queries per second at scale. We've seen it all - from startups to enterprise systems.
                </p>
                <p className="text-xs text-purple-300/40">
                  ✓ Reviewed by database architects • ✓ Updated October 2025 • ✓ Based on production experience
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-2 border-purple-500/30 rounded-xl">
            <h3 className="text-2xl font-semibold text-purple-100/80 mb-4 flex items-center gap-3">
              <span className="text-3xl">🔧</span>
              Test Your Database Queries
            </h3>
            <p className="text-sm text-purple-200/60 mb-4 leading-relaxed">
              Use our API tester to check your database-backed endpoints. Monitor response times and optimize
              slow queries before they impact users.
            </p>
            <Link
              href="/tools/api-tester"
              className="inline-block px-6 py-3 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold no-underline text-sm"
            >
              Try API Tester →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
