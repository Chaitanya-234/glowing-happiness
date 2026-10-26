'use client';
// app/blog/api-testing-strategies/page.tsx
import { useTheme } from '@/components/providers/ThemeProvider';
import AdContainer from '@/components/AdContainer';
import JsonLdArticle from '@/components/JsonLdArticle';
import { Metadata } from 'next';
import Link from 'next/link';

const metadata: Metadata = {
  title: 'API Testing Strategies: Tools and Best Practices for 2025 | DevMetrix',
  description: 'Master API testing with comprehensive strategies for unit tests, integration tests, and automated workflows. Real examples and best practices.',
  keywords: ['api testing', 'rest api testing', 'integration testing', 'postman', 'jest', 'automated testing'],
  authors: [{ name: 'DevMetrix Engineering Team' }],
  openGraph: {
    title: 'API Testing Strategies: Complete Guide for Developers',
    description: 'Learn proven API testing strategies from experienced engineers. Improve reliability today.',
    type: 'article',
    publishedTime: '2025-10-19T00:00:00.000Z',
  },
};

export default function APITestingGuide() {
  const { currentTheme: theme } = useTheme();
  return (
    <article className={`min-h-screen ${theme.colors.background} pt-24 pb-20 px-4 transition-colors duration-300`}>
      <JsonLdArticle
        headline="API Testing Strategies: Tools and Best Practices"
        description="Master API testing with comprehensive strategies for unit tests, integration tests, and automated workflows."
        datePublished="2025-10-19"
        authorName="DevMetrix Engineering Team"
        url="https://devmetrix.in/blog/api-testing-strategies"
      />
      <div className="max-w-4xl mx-auto">
        {/* Article Header with Visual Flair */}
        <div className="mb-12 relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-green-500 to-purple-500"></div>
          <div className="pl-8">
            <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full mb-4 border border-blue-500/30">
              🧪 Testing
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-green-200 to-purple-200 mb-4 leading-tight">
              API Testing Strategies: Tools and Best Practices
            </h1>
            <div className="flex flex-wrap gap-4 text-xs md:text-sm text-purple-300/40 mb-4">
              <span>📅 October 19, 2025</span>
              <span>•</span>
              <span>⏱️ 14 min read</span>
              <span>•</span>
              <span>✍️ By DevMetrix Engineering Team</span>
            </div>
            <p className="text-sm text-purple-300/30">Last updated: October 2025 • Peer-reviewed by senior engineers</p>
          </div>
        </div>

        {/* Reading Progress Indicator */}
        <div className="sticky top-16 z-40 mb-8 bg-blue-900/20 backdrop-blur-sm border border-blue-500/20 rounded-lg p-3">
          <div className="flex items-center gap-3 text-xs text-blue-200/60">
            <span className="whitespace-nowrap">🗺️ Jump to:</span>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              <a href="#why" className="px-2 py-1 bg-blue-800/30 rounded hover:bg-blue-700/40 transition-colors whitespace-nowrap">Why Test</a>
              <a href="#types" className="px-2 py-1 bg-blue-800/30 rounded hover:bg-blue-700/40 transition-colors whitespace-nowrap">Test Types</a>
              <a href="#tools" className="px-2 py-1 bg-blue-800/30 rounded hover:bg-blue-700/40 transition-colors whitespace-nowrap">Tools</a>
              <a href="#automation" className="px-2 py-1 bg-blue-800/30 rounded hover:bg-blue-700/40 transition-colors whitespace-nowrap">Automation</a>
            </div>
          </div>
        </div>

        <div className="prose prose-invert prose-purple prose-lg max-w-none">
          {/* Introduction with Impact Box */}
          <div className="bg-gradient-to-br from-blue-900/20 via-green-900/20 to-purple-900/20 border-2 border-blue-500/30 rounded-xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-9xl opacity-5">🎯</div>
            <p className="text-lg md:text-xl text-purple-100/80 leading-relaxed mb-4 relative z-10">
              Here's a truth bomb: untested APIs are ticking time bombs. I've watched production systems
              crash because someone changed a single line of code and didn't test it. The panic, the late
              nights, the angry customers - all preventable with proper API testing.
            </p>
            <p className="text-base text-purple-200/60 relative z-10">
              This guide isn't about testing theory. It's about practical strategies that actually work
              in real projects. We'll cover everything from writing your first API test to building
              automated testing pipelines that catch bugs before they reach production.
            </p>
          </div>

          {/* Testing Maturity Levels */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">😰</div>
              <div className="text-xs font-semibold text-red-300">Level 1</div>
              <div className="text-xs text-red-200/50 mt-1">Manual Testing Only</div>
            </div>
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🤔</div>
              <div className="text-xs font-semibold text-yellow-300">Level 2</div>
              <div className="text-xs text-yellow-200/50 mt-1">Some Unit Tests</div>
            </div>
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">😊</div>
              <div className="text-xs font-semibold text-green-300">Level 3</div>
              <div className="text-xs text-green-200/50 mt-1">Integration Tests</div>
            </div>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🚀</div>
              <div className="text-xs font-semibold text-blue-300">Level 4</div>
              <div className="text-xs text-blue-200/50 mt-1">Full Automation</div>
            </div>
          </div>

          <h2 id="why" className="text-3xl font-bold text-blue-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">🤷</span>
            Why API Testing Actually Matters
          </h2>

          <p className="text-sm md:text-base text-purple-200/60 leading-relaxed">
            Look, I get it. Testing feels like extra work. You've got features to ship, deadlines to meet.
            But here's what happens without tests: you break something, a customer notices before you do,
            they tweet about it, your reputation takes a hit. Sound familiar?
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-red-900/10 border border-red-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-200/80 mb-3 flex items-center gap-2">
                <span>❌</span> Without Tests
              </h3>
              <ul className="space-y-2 text-sm text-red-200/60">
                <li className="flex gap-2"><span className="text-red-400">•</span> Fear of making changes</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> Bugs discovered in production</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> Manual testing takes hours</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> Unclear what broke and why</li>
                <li className="flex gap-2"><span className="text-red-400">•</span> New developers afraid to touch code</li>
              </ul>
            </div>

            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-200/80 mb-3 flex items-center gap-2">
                <span>✅</span> With Good Tests
              </h3>
              <ul className="space-y-2 text-sm text-green-200/60">
                <li className="flex gap-2"><span className="text-green-400">•</span> Confidence to refactor</li>
                <li className="flex gap-2"><span className="text-green-400">•</span> Bugs caught immediately</li>
                <li className="flex gap-2"><span className="text-green-400">•</span> Tests run in seconds</li>
                <li className="flex gap-2"><span className="text-green-400">•</span> Clear failure messages</li>
                <li className="flex gap-2"><span className="text-green-400">•</span> Documentation through tests</li>
              </ul>
            </div>
          </div>

          <h2 id="types" className="text-3xl font-bold text-green-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">🎯</span>
            Types of API Tests (The Testing Pyramid)
          </h2>


<AdContainer
        slot="4520516006"
        format="horizontal"
        label="Advertisement"
        className="max-w-7xl mx-auto px-4 my-12"
      />
          <div className="my-8 relative">
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border-2 border-blue-500/40 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🔬</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-blue-200/80 mb-2">Unit Tests (70%)</h3>
                    <p className="text-sm text-blue-200/60 mb-3">Test individual functions and methods in isolation. Fast, cheap, lots of them.</p>
                    <div className="flex gap-2 text-xs">
                      <span className="px-2 py-1 bg-blue-800/40 rounded">Fast</span>
                      <span className="px-2 py-1 bg-blue-800/40 rounded">Isolated</span>
                      <span className="px-2 py-1 bg-blue-800/40 rounded">Many</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-900/30 to-green-800/30 border-2 border-green-500/40 rounded-lg p-6 ml-8">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🔗</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-green-200/80 mb-2">Integration Tests (20%)</h3>
                    <p className="text-sm text-green-200/60 mb-3">Test how components work together. Database, APIs, services.</p>
                    <div className="flex gap-2 text-xs">
                      <span className="px-2 py-1 bg-green-800/40 rounded">Realistic</span>
                      <span className="px-2 py-1 bg-green-800/40 rounded">Some</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 border-2 border-purple-500/40 rounded-lg p-6 ml-16">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🎭</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-purple-200/80 mb-2">E2E Tests (10%)</h3>
                    <p className="text-sm text-purple-200/60 mb-3">Test complete user flows. Slow but catches real issues.</p>
                    <div className="flex gap-2 text-xs">
                      <span className="px-2 py-1 bg-purple-800/40 rounded">Slow</span>
                      <span className="px-2 py-1 bg-purple-800/40 rounded">Few</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-purple-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">✍️</span>
            Writing Your First API Test
          </h2>

          <p className="text-sm md:text-base text-purple-200/60 mb-4">
            Let's start with something simple. Here's a basic REST API endpoint and how to test it properly:
          </p>

          <div className="my-8 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-purple-100/70 mb-3">The API We're Testing:</h3>
              <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs">
                <code className="text-purple-100/80">{`// routes/users.js
app.get('/api/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({
    id: user.id,
    name: user.name,
    email: user.email
  });
});`}</code>
              </pre>
            </div>

            <div className="bg-green-900/10 border-l-4 border-green-500 rounded-r-lg p-6">
              <h3 className="text-lg font-semibold text-green-200/80 mb-3">✅ Good Test (Jest + Supertest):</h3>
              <pre className="bg-green-900/20 p-4 rounded-lg border border-green-500/30 overflow-x-auto text-xs">
                <code className="text-green-100/80">{`const request = require('supertest');
const app = require('../app');

describe('GET /api/users/:id', () => {
  it('should return user when found', async () => {
    const response = await request(app)
      .get('/api/users/123')
      .expect(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
  });

  it('should return 404 when user not found', async () => {
    const response = await request(app)
      .get('/api/users/999')
      .expect(404);

    expect(response.body.error).toBe('User not found');
  });

  it('should not expose password field', async () => {
    const response = await request(app)
      .get('/api/users/123')
      .expect(200);

    expect(response.body).not.toHaveProperty('password');
  });
});`}</code>
              </pre>
            </div>
          </div>

          <div className="bg-blue-900/10 border border-blue-500/30 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold text-blue-200/80 mb-3">💡 What Makes This Test Good:</h3>
            <ul className="space-y-2 text-sm text-blue-200/60">
              <li className="flex gap-2"><span className="text-blue-400">✓</span> Tests the happy path (user found)</li>
              <li className="flex gap-2"><span className="text-blue-400">✓</span> Tests error cases (user not found)</li>
              <li className="flex gap-2"><span className="text-blue-400">✓</span> Tests security (no password exposed)</li>
              <li className="flex gap-2"><span className="text-blue-400">✓</span> Clear test names that describe behavior</li>
              <li className="flex gap-2"><span className="text-blue-400">✓</span> Each test focuses on one thing</li>
            </ul>
          </div>

          <h2 id="tools" className="text-3xl font-bold text-orange-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">🛠️</span>
            Essential Testing Tools
          </h2>

<AdContainer
        slot="4520516006"
        format="horizontal"
        label="Advertisement"
        className="max-w-7xl mx-auto px-4 my-12"
      />

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-blue-500/30 rounded-lg p-6">
              <div className="text-3xl mb-3">🃏</div>
              <h3 className="text-lg font-bold text-blue-200/80 mb-2">Jest</h3>
              <p className="text-sm text-blue-200/60 mb-3">The most popular JavaScript testing framework. Great for unit and integration tests.</p>
              <pre className="bg-blue-900/20 p-3 rounded text-xs overflow-x-auto">
                <code className="text-blue-100/80">{`npm install --save-dev jest
npm test`}</code>
              </pre>
            </div>

            <div className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border border-orange-500/30 rounded-lg p-6">
              <div className="text-3xl mb-3">📮</div>
              <h3 className="text-lg font-bold text-orange-200/80 mb-2">Postman</h3>
              <p className="text-sm text-orange-200/60 mb-3">Perfect for manual testing and creating test collections. Great UI.</p>
              <div className="text-xs text-orange-200/50">Collections • Environments • Newman CLI</div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-lg p-6">
              <div className="text-3xl mb-3">🎭</div>
              <h3 className="text-lg font-bold text-purple-200/80 mb-2">Cypress / Playwright</h3>
              <p className="text-sm text-purple-200/60 mb-3">For end-to-end testing. Simulates real user interactions.</p>
              <div className="text-xs text-purple-200/50">E2E • Visual Testing • Time Travel</div>
            </div>

            <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-lg p-6">
              <div className="text-3xl mb-3">🔨</div>
              <h3 className="text-lg font-bold text-green-200/80 mb-2">Supertest</h3>
              <p className="text-sm text-green-200/60 mb-3">HTTP assertion library. Works great with Express/Node.js APIs.</p>
              <div className="text-xs text-green-200/50">HTTP Testing • Easy Setup • Fast</div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-pink-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">🎪</span>
            Testing Different Scenarios
          </h2>

          <div className="space-y-6 my-8">
            <div className="bg-purple-900/10 border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-200/80 mb-3">Testing Authentication:</h3>
              <pre className="bg-purple-900/20 p-4 rounded text-xs overflow-x-auto">
                <code className="text-purple-100/80">{`it('should require authentication', async () => {
  await request(app)
    .get('/api/protected')
    .expect(401);
});

it('should accept valid token', async () => {
  const token = generateTestToken();

  await request(app)
    .get('/api/protected')
    .set('Authorization', \`Bearer \${token}\`)
    .expect(200);
});`}</code>
              </pre>
            </div>

            <div className="bg-orange-900/10 border border-orange-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-orange-200/80 mb-3">Testing Request Validation:</h3>
              <pre className="bg-orange-900/20 p-4 rounded text-xs overflow-x-auto">
                <code className="text-orange-100/80">{`it('should validate required fields', async () => {
  const response = await request(app)
    .post('/api/users')
    .send({ name: 'John' }) // Missing email
    .expect(400);

  expect(response.body.errors).toContain('email is required');
});

it('should validate email format', async () => {
  await request(app)
    .post('/api/users')
    .send({ name: 'John', email: 'invalid' })
    .expect(400);
});`}</code>
              </pre>
            </div>
          </div>

          <h2 id="automation" className="text-3xl font-bold text-cyan-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">⚙️</span>
            Automation and CI/CD
          </h2>

          <p className="text-sm md:text-base text-purple-200/60 mb-6">
            The real magic happens when tests run automatically. Every commit, every pull request, tests
            run before code hits production. Here's how to set it up:
          </p>

          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-2 border-blue-500/30 rounded-lg p-6 my-8">
            <h3 className="text-xl font-semibold text-blue-200/80 mb-4">GitHub Actions Example:</h3>
            <pre className="bg-blue-900/30 p-4 rounded-lg border border-blue-500/30 overflow-x-auto text-xs">
              <code className="text-blue-100/80">{`# .github/workflows/test.yml
name: API Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Upload coverage
        uses: codecov/codecov-action@v3`}</code>
            </pre>
          </div>

          {/* Testing Checklist */}
          <div className="my-12 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-2 border-purple-500/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-purple-100/80 mb-6 flex items-center gap-3">
              <span className="text-3xl">✅</span>
              Your API Testing Checklist
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Test happy path for each endpoint</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Test error cases (404, 400, 500)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Test authentication/authorization</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Test input validation</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Test rate limiting</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Mock external dependencies</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Use test database (not production!)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Clean up test data after each run</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Run tests in CI/CD pipeline</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Track code coverage (aim for 80%+)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="my-12 bg-green-900/10 border border-green-500/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-green-200/80 mb-4">🎯 Final Thoughts</h3>
            <p className="text-sm text-green-200/60 leading-relaxed">
              Start small. Pick your most critical API endpoint and write tests for it today. Then add
              another. Before you know it, you'll have a solid test suite that catches bugs before your
              users do. The initial investment feels like extra work, but the time you save debugging
              production issues makes it worth it ten times over. Trust me on this.
            </p>
          </div>

          {/* Author Credibility Box */}
          <div className="mt-16 mb-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">👥</div>
              <div>
                <h3 className="text-lg font-semibold text-purple-100/80 mb-2">About the Team</h3>
                <p className="text-sm text-purple-200/60 leading-relaxed mb-3">
                  Written by DevMetrix's engineering team with collective experience testing APIs at companies
                  ranging from early-stage startups to Fortune 500 enterprises. We've seen what works and
                  what doesn't in production environments.
                </p>
                <p className="text-xs text-purple-300/40">
                  ✓ Peer-reviewed by senior engineers • ✓ Updated October 2025 •
                  ✓ Based on real production experience
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-gradient-to-br from-blue-900/20 to-green-900/20 border-2 border-blue-500/30 rounded-xl">
            <h3 className="text-2xl font-semibold text-blue-100/80 mb-4 flex items-center gap-3">
              <span className="text-3xl">🧪</span>
              Test Your APIs Now
            </h3>
            <p className="text-sm text-blue-200/60 mb-4 leading-relaxed">
              Use our free API tester to manually test your endpoints before writing automated tests.
              Test authentication, headers, and response validation instantly.
            </p>
            <Link
              href="/tools/api-tester"
              className="inline-block px-6 py-3 bg-blue-600/30 text-blue-100 rounded-lg border border-blue-500/30 hover:bg-blue-500/40 transition-all font-semibold no-underline text-sm"
            >
              🚀 Try API Tester →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
