// app/blog/graphql-vs-rest-comparison/page.tsx
import JsonLdArticle from '@/components/JsonLdArticle';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'GraphQL vs REST: Choosing the Right API Architecture in 2025 | DevMetrix',
  description: 'Compare GraphQL and REST APIs with real use cases, pros and cons, security implications, and migration strategies for existing applications.',
  keywords: ['graphql', 'rest api', 'graphql vs rest', 'api architecture', 'api design', 'graphql security'],
  authors: [{ name: 'DevMetrix API Team', url: 'https://devmetrix.in/about' }],
  openGraph: {
    title: 'GraphQL vs REST: Complete Comparison Guide',
    type: 'article',
    publishedTime: '2025-10-11T00:00:00.000Z',
  },
};

export default function GraphQLvsRESTGuide() {
  return (
    <article className="min-h-screen bg-black pt-24 pb-20 px-4">
      <JsonLdArticle
        headline="GraphQL vs REST: Choosing the Right API Architecture"
        description="Compare GraphQL and REST APIs with use cases, pros and cons, and migration strategies for existing applications."
        datePublished="2025-10-11"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/graphql-vs-rest-comparison"
      />
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500"></div>
          <div className="pl-8">
            <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-semibold rounded-full mb-4 border border-purple-500/30">
              🔌 API Design
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-blue-200 mb-4 leading-tight">
              GraphQL vs REST: Choosing the Right API Architecture
            </h1>
            <div className="flex flex-wrap gap-4 text-xs md:text-sm text-purple-300/40 mb-4">
              <span>📅 October 11, 2025</span>
              <span>•</span>
              <span>⏱️ 14 min read</span>
              <span>•</span>
              <span>✍️ By DevMetrix API Team</span>
            </div>
            <p className="text-sm text-purple-300/30">Last updated: October 2025 • Reviewed by API architects</p>
          </div>
        </div>

        <div className="sticky top-16 z-40 mb-8 bg-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-3">
          <div className="flex items-center gap-3 text-xs text-purple-200/60 overflow-x-auto">
            <span className="whitespace-nowrap">🗺️ Topics:</span>
            <a href="#comparison" className="px-2 py-1 bg-purple-800/30 rounded hover:bg-purple-700/40 transition-colors whitespace-nowrap">Comparison</a>
            <a href="#graphql" className="px-2 py-1 bg-purple-800/30 rounded hover:bg-purple-700/40 transition-colors whitespace-nowrap">GraphQL</a>
            <a href="#security" className="px-2 py-1 bg-purple-800/30 rounded hover:bg-purple-700/40 transition-colors whitespace-nowrap">Security</a>
            <a href="#migration" className="px-2 py-1 bg-purple-800/30 rounded hover:bg-purple-700/40 transition-colors whitespace-nowrap">Migration</a>
          </div>
        </div>

        <div className="prose prose-invert prose-purple prose-lg max-w-none">
          <div className="bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20 border-2 border-purple-500/30 rounded-xl p-6 md:p-8 mb-12">
            <p className="text-lg md:text-xl text-purple-100/80 leading-relaxed mb-4">
              "Should we use GraphQL or REST?" This is the question I hear most from teams building new APIs. The answer?
              It depends. I've built production APIs with both, and each shines in different scenarios. REST isn't dead,
              and GraphQL isn't always better. Let me show you when to use each.
            </p>
          </div>

          <h2 id="comparison" className="text-3xl font-bold text-purple-200/80 mt-12 mb-6">
            The Core Differences
          </h2>

          <div className="overflow-x-auto my-8">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-purple-500/30">
                  <th className="text-left p-3 text-purple-100/70">Feature</th>
                  <th className="text-left p-3 text-purple-100/70">REST</th>
                  <th className="text-left p-3 text-purple-100/70">GraphQL</th>
                </tr>
              </thead>
              <tbody className="text-purple-200/60">
                <tr className="border-b border-purple-500/10">
                  <td className="p-3 font-semibold">Data Fetching</td>
                  <td className="p-3">Multiple endpoints, over-fetching</td>
                  <td className="p-3">Single endpoint, precise data</td>
                </tr>
                <tr className="border-b border-purple-500/10">
                  <td className="p-3 font-semibold">Learning Curve</td>
                  <td className="p-3">Easy, well-known</td>
                  <td className="p-3">Steeper, new concepts</td>
                </tr>
                <tr className="border-b border-purple-500/10">
                  <td className="p-3 font-semibold">Caching</td>
                  <td className="p-3">HTTP caching, CDN-friendly</td>
                  <td className="p-3">Complex, needs custom solutions</td>
                </tr>
                <tr className="border-b border-purple-500/10">
                  <td className="p-3 font-semibold">Versioning</td>
                  <td className="p-3">URL-based versions</td>
                  <td className="p-3">Schema evolution, no versions</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Type Safety</td>
                  <td className="p-3">Optional (OpenAPI)</td>
                  <td className="p-3">Built-in, strongly typed</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="graphql" className="text-3xl font-bold text-pink-200/80 mt-12 mb-6">
            When GraphQL Wins
          </h2>

          <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs my-6">
            <code className="text-purple-100/80">{`// REST: Multiple requests for related data
const user = await fetch('/api/users/123').then(r => r.json());
const posts = await fetch(\`/api/users/\${user.id}/posts\`).then(r => r.json());
const comments = await fetch(\`/api/posts/\${posts[0].id}/comments\`).then(r => r.json());
// 3 network requests!

// GraphQL: One request, exactly what you need
const query = \`
  query {
    user(id: "123") {
      name
      email
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
\`;

const data = await fetch('/graphql', {
  method: 'POST',
  body: JSON.stringify({ query }),
  headers: { 'Content-Type': 'application/json' }
}).then(r => r.json());
// 1 request, nested data, no over-fetching!`}</code>
          </pre>

          <h2 id="security" className="text-3xl font-bold text-red-200/80 mt-12 mb-6">
            GraphQL Security: The Hidden Dangers
          </h2>

          <div className="bg-gradient-to-br from-red-900/20 via-orange-900/20 to-yellow-900/20 border-2 border-red-500/30 rounded-xl p-6 md:p-8 mb-12">
            <p className="text-base md:text-lg text-red-100/80 leading-relaxed mb-4">
              GraphQL's flexibility is both its strength and its security nightmare. The same feature that lets clients request
              exactly what they need also lets attackers craft queries that bring down your entire system. I've personally
              responded to incidents where a single malicious GraphQL query consumed all server resources and crashed production.
            </p>

            <p className="text-sm text-red-200/60 leading-relaxed mb-4">
              The problem is query depth and complexity. In REST, you control what data each endpoint returns. In GraphQL,
              clients control the query structure. An attacker can nest queries deeply, create circular references through your
              schema, or request thousands of related objects in a single query. Your server happily tries to fulfill the request,
              spawning database queries that never finish, consuming memory until the process crashes.
            </p>

            <p className="text-sm text-red-200/60 leading-relaxed mb-4">
              Here's a real attack I've seen: an attacker discovered a GraphQL API with related user and post objects. They
              crafted a query requesting all users, each user's posts, each post's comments, each comment's author (which cycles
              back to users), and nested this pattern 20 levels deep. One HTTP request triggered millions of database queries.
              The server locked up completely within seconds. No rate limiting helped because it was technically just one request.
            </p>

            <p className="text-sm text-red-200/60 leading-relaxed mb-4">
              Authorization is another minefield. In REST, you secure endpoints. In GraphQL, you must secure every field in your
              schema. Miss one field authorization check, and attackers can access it through any query path. I audited a GraphQL
              API where the user's email field wasn't properly secured. Even though the user profile endpoint required authentication,
              attackers could query it through related objects (posts → author → email) and harvest email addresses for the entire
              user base.
            </p>

            <h3 className="text-xl font-bold text-orange-200/80 mt-6 mb-4">Query Depth and Complexity Limiting</h3>

            <pre className="bg-orange-900/30 p-4 rounded-lg border border-orange-500/30 overflow-x-auto text-xs mb-6">
              <code className="text-orange-100/80">{`// Limit query depth to prevent nested attacks
const depthLimit = require('graphql-depth-limit');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(5)] // Max 5 levels deep
});

// Limit query complexity
const { createComplexityLimitRule } = require('graphql-validation-complexity');

const complexityLimit = createComplexityLimitRule(1000, {
  onCost: (cost) => {
    console.log('Query cost:', cost);
  }
});

const server = new ApolloServer({
  validationRules: [complexityLimit]
});`}</code>
            </pre>

            <h3 className="text-xl font-bold text-yellow-200/80 mt-6 mb-4">Field-Level Authorization</h3>

            <pre className="bg-yellow-900/30 p-4 rounded-lg border border-yellow-500/30 overflow-x-auto text-xs">
              <code className="text-yellow-100/80">{`// Secure EVERY field, not just queries
const resolvers = {
  User: {
    email: (user, args, context) => {
      // Check if user can see this email
      if (context.user.id !== user.id && !context.user.isAdmin) {
        throw new Error('Unauthorized');
      }
      return user.email;
    },
    ssn: (user, args, context) => {
      // Admins only
      if (!context.user.isAdmin) {
        return null; // or throw error
      }
      return user.ssn;
    }
  }
};`}</code>
            </pre>
          </div>

          <h2 id="migration" className="text-3xl font-bold text-blue-200/80 mt-12 mb-6">
            Migration Strategy
          </h2>

          <pre className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/20 overflow-x-auto text-xs my-6">
            <code className="text-blue-100/80">{`// Gradual migration: Wrap REST in GraphQL
const { RESTDataSource } = require('apollo-datasource-rest');

class UsersAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.example.com/';
  }

  async getUser(id) {
    return this.get(\`users/\${id}\`);
  }

  async getPosts(userId) {
    return this.get(\`users/\${userId}/posts\`);
  }
}

// GraphQL resolvers call REST API
const resolvers = {
  Query: {
    user: (_, { id }, { dataSources }) => {
      return dataSources.usersAPI.getUser(id);
    }
  },
  User: {
    posts: (user, _, { dataSources }) => {
      return dataSources.usersAPI.getPosts(user.id);
    }
  }
};`}</code>
          </pre>

          <div className="my-12 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-2 border-purple-500/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-purple-100/80 mb-6">✅ Decision Checklist</h2>
            <div className="space-y-4">
              <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-green-200/80 mb-3">Choose REST when:</h3>
                <ul className="space-y-2 text-sm text-green-200/60">
                  <li>• Simple CRUD operations</li>
                  <li>• Heavy caching requirements</li>
                  <li>• Public API for third parties</li>
                  <li>• Team unfamiliar with GraphQL</li>
                </ul>
              </div>
              <div className="bg-blue-900/10 border border-blue-500/30 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-200/80 mb-3">Choose GraphQL when:</h3>
                <ul className="space-y-2 text-sm text-blue-200/60">
                  <li>• Complex, nested data relationships</li>
                  <li>• Multiple client types (web, mobile, etc.)</li>
                  <li>• Rapid frontend iteration needed</li>
                  <li>• Strong typing requirements</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-16 mb-8 bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">👥</div>
              <div>
                <h3 className="text-lg font-semibold text-purple-100/80 mb-2">About the Team</h3>
                <p className="text-sm text-purple-200/60 leading-relaxed mb-3">
                  Written by DevMetrix's API architects with experience building both REST and GraphQL APIs at scale for
                  Fortune 500 companies and high-growth startups.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-2 border-purple-500/30 rounded-xl">
            <h3 className="text-2xl font-semibold text-purple-100/80 mb-4">🧪 Test Both Approaches</h3>
            <p className="text-sm text-purple-200/60 mb-4">
              Use our API tester to compare REST and GraphQL response times and data efficiency in your application.
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
