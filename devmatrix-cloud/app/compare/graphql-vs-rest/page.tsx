// app/compare/graphql-vs-rest/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'GraphQL vs REST API: Complete Comparison 2025 | DevMetrix',
  description: 'Detailed comparison of GraphQL and REST APIs. Learn when to use each, pros and cons, with real code examples.',
};

export default function GraphQLvsRESTPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Link */}
        <Link
          href="/compare"
          className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 mb-8 transition-colors"
        >
          ← Back to Comparisons
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 mb-4">
            GraphQL vs REST API
          </h1>
          <p className="text-lg text-purple-200/60 max-w-2xl mx-auto">
            Comprehensive comparison to help you choose the right API architecture for your project
          </p>
          <div className="flex items-center justify-center gap-4 mt-6 text-sm text-purple-300/60">
            <span>📅 Updated November 2025</span>
            <span>•</span>
            <span>⏱️ 12 min read</span>
          </div>
        </div>

        {/* Quick Comparison Table */}
        <div className="overflow-x-auto mb-12">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-purple-500/30">
                <th className="text-left p-4 text-purple-100 font-semibold">Feature</th>
                <th className="text-left p-4 text-purple-100 font-semibold">REST</th>
                <th className="text-left p-4 text-purple-100 font-semibold">GraphQL</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {comparisonData.map((row, idx) => (
                <tr key={idx} className="border-b border-purple-500/10 hover:bg-purple-900/10">
                  <td className="p-4 font-medium text-purple-200">{row.feature}</td>
                  <td className="p-4 text-purple-300/80">{row.rest}</td>
                  <td className="p-4 text-purple-300/80">{row.graphql}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* REST Overview */}
        <div className="mb-12 bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-2xl">
              🔵
            </div>
            <h2 className="text-3xl font-bold text-blue-200">REST API</h2>
          </div>

          <p className="text-purple-200/70 mb-6">
            REST (Representational State Transfer) uses multiple endpoints, each returning fixed data structures.
            It's the traditional approach that's been around since 2000.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-green-300 mb-3">✅ Pros</h3>
              <ul className="space-y-2 text-sm text-purple-200/70">
                <li className="flex gap-2">
                  <span className="text-green-400">•</span>
                  <span>Simple and well-understood</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400">•</span>
                  <span>Great HTTP caching support</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400">•</span>
                  <span>Easy to debug (browser tools)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400">•</span>
                  <span>CDN-friendly</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400">•</span>
                  <span>Mature tooling ecosystem</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-red-300 mb-3">❌ Cons</h3>
              <ul className="space-y-2 text-sm text-purple-200/70">
                <li className="flex gap-2">
                  <span className="text-red-400">•</span>
                  <span>Over-fetching (getting unused data)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400">•</span>
                  <span>Under-fetching (multiple requests needed)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400">•</span>
                  <span>Versioning challenges (v1, v2, v3...)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400">•</span>
                  <span>No type safety by default</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400">•</span>
                  <span>Multiple endpoints to manage</span>
                </li>
              </ul>
            </div>
          </div>

          {/* REST Code Example */}
          <div className="bg-black/40 rounded-lg p-4 border border-blue-500/20">
            <div className="text-xs text-blue-300 mb-2 font-semibold">REST Example:</div>
            <pre className="text-sm text-blue-200 overflow-x-auto">
              <code>{`// Need user data? Make 3 separate requests
GET /api/users/123
GET /api/users/123/posts
GET /api/posts/456/comments

// Each returns ALL fields (even if you only need a few)
{
  "id": 123,
  "name": "John",
  "email": "john@example.com",
  "bio": "...",
  "avatar": "...",
  "settings": {...},  // Don't need this
  "preferences": {...}, // Don't need this
  // ... more unused data
}`}</code>
            </pre>
          </div>
        </div>

        {/* GraphQL Overview */}
        <div className="mb-12 bg-gradient-to-br from-pink-900/20 to-purple-900/20 border border-pink-500/30 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center text-2xl">
              🔷
            </div>
            <h2 className="text-3xl font-bold text-pink-200">GraphQL</h2>
          </div>

          <p className="text-purple-200/70 mb-6">
            GraphQL uses a single endpoint where clients specify exactly what data they need.
            Developed by Facebook in 2012, open-sourced in 2015.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-green-300 mb-3">✅ Pros</h3>
              <ul className="space-y-2 text-sm text-purple-200/70">
                <li className="flex gap-2">
                  <span className="text-green-400">•</span>
                  <span>Request exactly what you need</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400">•</span>
                  <span>Single request for complex data</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400">•</span>
                  <span>Strong typing (auto-generated docs)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400">•</span>
                  <span>No versioning needed (evolve schema)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-400">•</span>
                  <span>Great for complex, nested data</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-red-300 mb-3">❌ Cons</h3>
              <ul className="space-y-2 text-sm text-purple-200/70">
                <li className="flex gap-2">
                  <span className="text-red-400">•</span>
                  <span>Steeper learning curve</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400">•</span>
                  <span>Caching is more complex</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400">•</span>
                  <span>File uploads require workarounds</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400">•</span>
                  <span>N+1 query problem (without DataLoader)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-red-400">•</span>
                  <span>Overkill for simple CRUD apps</span>
                </li>
              </ul>
            </div>
          </div>

          {/* GraphQL Code Example */}
          <div className="bg-black/40 rounded-lg p-4 border border-pink-500/20">
            <div className="text-xs text-pink-300 mb-2 font-semibold">GraphQL Example:</div>
            <pre className="text-sm text-pink-200 overflow-x-auto">
              <code>{`// One request, get exactly what you need
query {
  user(id: 123) {
    name           // Only these fields
    posts {
      title
      comments {
        text
        author {
          name
        }
      }
    }
  }
}

// Nested data in one go, no over-fetching`}</code>
            </pre>
          </div>
        </div>

        {/* When to Use What */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-purple-100 mb-6 text-center">
            🎯 When to Use What?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Use REST */}
            <div className="bg-blue-900/10 border border-blue-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-blue-200 mb-4">Choose REST when:</h3>
              <ul className="space-y-3 text-sm text-purple-200/70">
                <li className="flex gap-2">
                  <span className="text-blue-400">✓</span>
                  <span>Building simple CRUD applications</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400">✓</span>
                  <span>Caching is a top priority</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400">✓</span>
                  <span>Public API for third-party developers</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400">✓</span>
                  <span>Team is unfamiliar with GraphQL</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400">✓</span>
                  <span>Need CDN for static content</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-400">✓</span>
                  <span>Simple data relationships</span>
                </li>
              </ul>
            </div>

            {/* Use GraphQL */}
            <div className="bg-pink-900/10 border border-pink-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-pink-200 mb-4">Choose GraphQL when:</h3>
              <ul className="space-y-3 text-sm text-purple-200/70">
                <li className="flex gap-2">
                  <span className="text-pink-400">✓</span>
                  <span>Complex, nested data structures</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-pink-400">✓</span>
                  <span>Multiple client types (web, mobile, etc.)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-pink-400">✓</span>
                  <span>Need rapid frontend iteration</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-pink-400">✓</span>
                  <span>Bandwidth-sensitive applications</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-pink-400">✓</span>
                  <span>Strong typing requirements</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-pink-400">✓</span>
                  <span>Micro-frontends architecture</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Real-World Examples */}
        <div className="mb-12 bg-purple-900/20 border border-purple-500/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-purple-100 mb-6">
            🏢 Who Uses What?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-blue-300 mb-3">REST Users:</h3>
              <ul className="space-y-2 text-sm text-purple-200/70">
                <li>• Twitter API</li>
                <li>• Stripe API</li>
                <li>• Twilio API</li>
                <li>• Most public APIs</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-pink-300 mb-3">GraphQL Users:</h3>
              <ul className="space-y-2 text-sm text-purple-200/70">
                <li>• Facebook/Meta</li>
                <li>• GitHub API v4</li>
                <li>• Shopify</li>
                <li>• Airbnb</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Verdict */}
        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-2 border-purple-500/30 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold text-purple-100 mb-4">
            🏆 The Verdict
          </h2>
          <p className="text-lg text-purple-200/70 max-w-3xl mx-auto">
            There's no universal winner. <strong className="text-purple-100">REST is simpler and battle-tested</strong>,
            perfect for most APIs. <strong className="text-purple-100">GraphQL shines with complex data needs</strong> and
            multiple clients. Many companies use both - REST for public APIs, GraphQL for internal services.
          </p>
          <div className="mt-6 text-sm text-purple-300/60">
            Start with REST. Move to GraphQL when REST becomes painful.
          </div>
        </div>

        {/* Related Resources */}
        <div className="mt-12 bg-purple-900/20 border border-purple-500/30 rounded-xl p-8">
          <h3 className="text-xl font-bold text-purple-100 mb-4">
            📚 Related Resources
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/blog/rest-api-design-best-practices" className="text-purple-300 hover:text-purple-200 transition-colors">
              → REST API Design Best Practices
            </Link>
            <Link href="/tools/api-tester" className="text-purple-300 hover:text-purple-200 transition-colors">
              → Try Our API Tester Tool
            </Link>
            <Link href="/examples/nodejs" className="text-purple-300 hover:text-purple-200 transition-colors">
              → Node.js API Examples
            </Link>
            <Link href="/compare/mongodb-vs-postgresql" className="text-purple-300 hover:text-purple-200 transition-colors">
              → MongoDB vs PostgreSQL Comparison
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const comparisonData = [
  { feature: 'Data Fetching', rest: 'Multiple endpoints', graphql: 'Single endpoint' },
  { feature: 'Over-fetching', rest: 'Common issue', graphql: 'Not a problem' },
  { feature: 'Under-fetching', rest: 'Multiple requests', graphql: 'One request' },
  { feature: 'Learning Curve', rest: 'Easy', graphql: 'Moderate' },
  { feature: 'Caching', rest: 'HTTP caching (easy)', graphql: 'Complex (needs tools)' },
  { feature: 'Versioning', rest: 'v1, v2, v3...', graphql: 'Schema evolution' },
  { feature: 'Type Safety', rest: 'Optional (OpenAPI)', graphql: 'Built-in' },
  { feature: 'Tooling', rest: 'Mature', graphql: 'Growing' },
];
