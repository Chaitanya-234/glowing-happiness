// app/blog/javascript-async-patterns/page.tsx
import JsonLdArticle from '@/components/JsonLdArticle';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mastering JavaScript Async Patterns: Promises, Async/Await | DevMetrix',
  description: 'Deep dive into asynchronous JavaScript from callbacks to modern async/await patterns. Real-world examples and best practices.',
  keywords: ['javascript async', 'promises', 'async await', 'callbacks', 'asynchronous javascript'],
  authors: [{ name: 'DevMetrix JavaScript Team' }],
  openGraph: {
    title: 'JavaScript Async Patterns: Complete Guide',
    type: 'article',
    publishedTime: '2025-10-18T00:00:00.000Z',
  },
};

export default function JavaScriptAsyncGuide() {
  return (
    <article className="min-h-screen bg-black pt-24 pb-20 px-4">
      <JsonLdArticle
        headline="Mastering JavaScript Async Patterns: Promises, Async/Await"
        description="Deep dive into asynchronous JavaScript, from callbacks to modern async/await patterns with real-world examples."
        datePublished="2025-10-18"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/javascript-async-patterns"
      />
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-500 via-orange-500 to-red-500"></div>
          <div className="pl-8">
            <span className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-300 text-xs font-semibold rounded-full mb-4 border border-yellow-500/30">
              ⚡ JavaScript
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 mb-4 leading-tight">
              Mastering JavaScript Async Patterns: Promises, Async/Await
            </h1>
            <div className="flex flex-wrap gap-4 text-xs md:text-sm text-purple-300/40 mb-4">
              <span>📅 October 18, 2025</span>
              <span>•</span>
              <span>⏱️ 16 min read</span>
              <span>•</span>
              <span>✍️ By DevMetrix JavaScript Team</span>
            </div>
          </div>
        </div>

        <div className="sticky top-16 z-40 mb-8 bg-yellow-900/20 backdrop-blur-sm border border-yellow-500/20 rounded-lg p-3">
          <div className="flex items-center gap-3 text-xs text-yellow-200/60 overflow-x-auto">
            <span className="whitespace-nowrap">🗺️ Topics:</span>
            <a href="#callbacks" className="px-2 py-1 bg-yellow-800/30 rounded hover:bg-yellow-700/40 transition-colors whitespace-nowrap">Callbacks</a>
            <a href="#promises" className="px-2 py-1 bg-yellow-800/30 rounded hover:bg-yellow-700/40 transition-colors whitespace-nowrap">Promises</a>
            <a href="#async" className="px-2 py-1 bg-yellow-800/30 rounded hover:bg-yellow-700/40 transition-colors whitespace-nowrap">Async/Await</a>
          </div>
        </div>

        <div className="prose prose-invert prose-purple prose-lg max-w-none">
          <div className="bg-gradient-to-br from-yellow-900/20 via-orange-900/20 to-red-900/20 border-2 border-yellow-500/30 rounded-xl p-6 md:p-8 mb-12">
            <p className="text-lg md:text-xl text-purple-100/80 leading-relaxed mb-4">
              Asynchronous JavaScript is probably the most confusing topic for developers learning the language.
              I remember spending weeks wrapping my head around callbacks, then promises showed up and changed
              everything, then async/await made it even better. Let's break down this journey from callback hell
              to async paradise.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-12">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">😵</div>
              <div className="text-xs font-semibold text-red-300">Callbacks</div>
              <div className="text-xs text-red-200/50">The old way</div>
            </div>
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">🤔</div>
              <div className="text-xs font-semibold text-yellow-300">Promises</div>
              <div className="text-xs text-yellow-200/50">Better</div>
            </div>
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 text-center">
              <div className="text-3xl mb-2">😎</div>
              <div className="text-xs font-semibold text-green-300">Async/Await</div>
              <div className="text-xs text-green-200/50">Best</div>
            </div>
          </div>

          <h2 id="callbacks" className="text-3xl font-bold text-red-200/80 mt-12 mb-6">
            🔙 Callbacks: Where It All Started
          </h2>

          <p className="text-sm md:text-base text-purple-200/60 leading-relaxed">
            Before promises existed, callbacks were the only way to handle async operations. And honestly?
            They worked fine for simple cases. But when you needed to do multiple async operations in sequence,
            you'd end up in what we affectionately call "callback hell."
          </p>

          <div className="my-8 bg-red-900/10 border-l-4 border-red-500 rounded-r-lg p-6">
            <h3 className="text-xl font-semibold text-red-200/80 mb-4">The Pyramid of Doom:</h3>
            <pre className="bg-red-900/20 p-4 rounded-lg border border-red-500/30 overflow-x-auto text-xs">
              <code className="text-red-100/80">{`// Classic callback hell
getUserData(userId, (user) => {
  getOrders(user.id, (orders) => {
    getOrderDetails(orders[0].id, (details) => {
      getShippingInfo(details.shippingId, (shipping) => {
        console.log('Finally got the data!');
        // Good luck debugging this...
      });
    });
  });
});`}</code>
            </pre>
          </div>

          <h2 id="promises" className="text-3xl font-bold text-yellow-200/80 mt-12 mb-6">
            🎯 Promises: The Game Changer
          </h2>

          <p className="text-sm md:text-base text-purple-200/60">
            Promises changed everything. Instead of nested callbacks, you get a clean chain. A promise is
            exactly what it sounds like - a promise to return a value in the future.
          </p>

          <div className="my-8 bg-green-900/10 border-l-4 border-green-500 rounded-r-lg p-6">
            <h3 className="text-xl font-semibold text-green-200/80 mb-4">Same Code, Way Better:</h3>
            <pre className="bg-green-900/20 p-4 rounded-lg border border-green-500/30 overflow-x-auto text-xs">
              <code className="text-green-100/80">{`getUserData(userId)
  .then(user => getOrders(user.id))
  .then(orders => getOrderDetails(orders[0].id))
  .then(details => getShippingInfo(details.shippingId))
  .then(shipping => console.log('Got it!', shipping))
  .catch(error => console.error('Something broke:', error));`}</code>
            </pre>
          </div>

          <h2 id="async" className="text-3xl font-bold text-green-200/80 mt-12 mb-6">
            ⚡ Async/Await: Writing Async Code Like Sync
          </h2>

          <div className="my-8 bg-gradient-to-r from-green-900/20 to-blue-900/20 border-2 border-green-500/30 rounded-lg p-6">
            <pre className="bg-green-900/30 p-4 rounded text-xs overflow-x-auto">
              <code className="text-green-100/80">{`async function getFullOrderInfo(userId) {
  try {
    const user = await getUserData(userId);
    const orders = await getOrders(user.id);
    const details = await getOrderDetails(orders[0].id);
    const shipping = await getShippingInfo(details.shippingId);

    return shipping;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}`}</code>
            </pre>
          </div>

          <div className="my-12 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-2 border-purple-500/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-purple-100/80 mb-6">✅ Best Practices Checklist</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Always use try/catch with async/await</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Handle promise rejections</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Use Promise.all for parallel requests</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Avoid mixing patterns (callbacks + promises)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Set timeouts for long operations</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Test async code thoroughly</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-2 border-yellow-500/30 rounded-xl">
            <h3 className="text-2xl font-semibold text-yellow-100/80 mb-4">🛠️ Test Your JavaScript</h3>
            <p className="text-sm text-yellow-200/60 mb-4">
              Try our API tester to see async JavaScript in action. Test real endpoints and see how promises work.
            </p>
            <Link
              href="/tools/api-tester"
              className="inline-block px-6 py-3 bg-yellow-600/30 text-yellow-100 rounded-lg border border-yellow-500/30 hover:bg-yellow-500/40 transition-all font-semibold no-underline"
            >
              Try API Tester →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
