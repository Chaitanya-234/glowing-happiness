// app/examples/javascript/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'JavaScript Code Examples & Snippets | DevMetrix',
  description: 'Ready-to-use JavaScript code examples. ES6+, async/await, promises, array methods, and more.',
};

const examples = [
  {
    id: 1,
    title: 'Fetch API with Async/Await',
    difficulty: 'Easy',
    category: 'API',
    description: 'Make HTTP requests with proper error handling',
    code: `async function fetchData(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
}

// Usage
fetchData('https://api.example.com/data')
  .then(data => console.log(data))
  .catch(err => console.error(err));`,
    tags: ['fetch', 'async', 'error-handling']
  },
  {
    id: 2,
    title: 'Array Map, Filter, Reduce',
    difficulty: 'Easy',
    category: 'Arrays',
    description: 'Essential array methods for data transformation',
    code: `const users = [
  { name: 'John', age: 25, active: true },
  { name: 'Jane', age: 30, active: false },
  { name: 'Bob', age: 35, active: true }
];

// Map - transform array
const names = users.map(user => user.name);
// ['John', 'Jane', 'Bob']

// Filter - get subset
const activeUsers = users.filter(user => user.active);
// [{ name: 'John', ... }, { name: 'Bob', ... }]

// Reduce - calculate total
const totalAge = users.reduce((sum, user) => sum + user.age, 0);
// 90

// Chaining methods
const activeUserNames = users
  .filter(user => user.active)
  .map(user => user.name);
// ['John', 'Bob']`,
    tags: ['arrays', 'map', 'filter', 'reduce']
  },
  {
    id: 3,
    title: 'Promise.all for Parallel Requests',
    difficulty: 'Medium',
    category: 'Promises',
    description: 'Execute multiple async operations in parallel',
    code: `async function fetchMultipleEndpoints() {
  try {
    const [users, posts, comments] = await Promise.all([
      fetch('https://api.example.com/users'),
      fetch('https://api.example.com/posts'),
      fetch('https://api.example.com/comments')
    ]);

    const usersData = await users.json();
    const postsData = await posts.json();
    const commentsData = await comments.json();

    return { usersData, postsData, commentsData };
  } catch (error) {
    console.error('One or more requests failed:', error);
    throw error;
  }
}

// Alternative: Promise.allSettled (doesn't fail if one fails)
async function fetchWithFallback() {
  const results = await Promise.allSettled([
    fetch('https://api.example.com/users'),
    fetch('https://api.example.com/posts')
  ]);

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      console.log(\`Request \${index} succeeded\`, result.value);
    } else {
      console.log(\`Request \${index} failed\`, result.reason);
    }
  });
}`,
    tags: ['promises', 'async', 'parallel']
  },
  {
    id: 4,
    title: 'Debounce Function',
    difficulty: 'Medium',
    category: 'Performance',
    description: 'Limit function execution rate for better performance',
    code: `function debounce(func, delay) {
  let timeoutId;

  return function(...args) {
    // Clear previous timeout
    clearTimeout(timeoutId);

    // Set new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Usage: Search input
const searchInput = document.querySelector('#search');

const handleSearch = debounce((event) => {
  console.log('Searching for:', event.target.value);
  // Make API call here
}, 500); // Wait 500ms after user stops typing

searchInput.addEventListener('input', handleSearch);

// Alternative: Throttle (run at most once per interval)
function throttle(func, interval) {
  let lastTime = 0;

  return function(...args) {
    const now = Date.now();

    if (now - lastTime >= interval) {
      lastTime = now;
      func.apply(this, args);
    }
  };
}`,
    tags: ['performance', 'debounce', 'optimization']
  },
  {
    id: 5,
    title: 'Deep Clone Object',
    difficulty: 'Medium',
    category: 'Objects',
    description: 'Create a true copy of nested objects',
    code: `// Method 1: JSON parse/stringify (simple but limited)
function deepClone1(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Limitations: doesn't work with functions, dates, undefined

// Method 2: Recursive clone (handles more cases)
function deepClone2(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (obj instanceof Array) {
    return obj.map(item => deepClone2(item));
  }

  if (obj instanceof Object) {
    const clonedObj = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone2(obj[key]);
      }
    }
    return clonedObj;
  }
}

// Method 3: Modern structuredClone (best, but new)
const original = { name: 'John', nested: { age: 30 } };
const copy = structuredClone(original);

// Test deep clone
copy.nested.age = 31;
console.log(original.nested.age); // 30 (unchanged)`,
    tags: ['objects', 'clone', 'immutability']
  },
  {
    id: 6,
    title: 'Local Storage Helper',
    difficulty: 'Easy',
    category: 'Storage',
    description: 'Safe wrapper for localStorage with JSON support',
    code: `const storage = {
  // Set item with JSON serialization
  set(key, value) {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  },

  // Get item with JSON parsing
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return defaultValue;
    }
  },

  // Remove item
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from localStorage:', error);
    }
  },

  // Clear all
  clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
};

// Usage
storage.set('user', { name: 'John', age: 30 });
const user = storage.get('user');
console.log(user.name); // 'John'`,
    tags: ['storage', 'localStorage', 'helper']
  },
];

export default function JavaScriptExamplesPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Link */}
        <Link
          href="/examples"
          className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-200 mb-8 transition-colors"
        >
          ← Back to Examples
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-3xl">
              ⚡
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-200">
                JavaScript Examples
              </h1>
              <p className="text-purple-200/60 mt-2">
                {examples.length} production-ready code snippets
              </p>
            </div>
          </div>
        </div>

        {/* Examples List */}
        <div className="space-y-8">
          {examples.map((example) => (
            <div
              key={example.id}
              className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-purple-500/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-purple-100">
                        {example.title}
                      </h3>
                      <span className={`text-xs px-2 py-1 rounded ${
                        example.difficulty === 'Easy'
                          ? 'bg-green-900/30 text-green-300'
                          : example.difficulty === 'Medium'
                          ? 'bg-yellow-900/30 text-yellow-300'
                          : 'bg-red-900/30 text-red-300'
                      }`}>
                        {example.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-purple-200/60">
                      {example.description}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-500 transition-colors">
                      📋 Copy Code
                    </button>
                    <button className="px-4 py-2 bg-purple-900/30 border border-purple-500/30 text-purple-100 text-sm rounded-lg hover:bg-purple-800/30 transition-colors">
                      ▶️ Run
                    </button>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {example.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-purple-800/30 text-purple-300 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Code */}
              <div className="relative">
                <pre className="bg-black/40 p-6 overflow-x-auto">
                  <code className="text-sm text-purple-300 font-mono leading-relaxed">
                    {example.code}
                  </code>
                </pre>

                {/* Copy button overlay */}
                <button className="absolute top-4 right-4 px-3 py-1 bg-purple-600/80 backdrop-blur-sm text-white text-xs rounded hover:bg-purple-500 transition-colors">
                  Copy
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Related Resources */}
        <div className="mt-16 bg-purple-900/20 border border-purple-500/30 rounded-xl p-8">
          <h3 className="text-xl font-bold text-purple-100 mb-4">
            📚 Related Resources
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/examples/react" className="text-purple-300 hover:text-purple-200 transition-colors">
              → React Examples
            </Link>
            <Link href="/examples/nodejs" className="text-purple-300 hover:text-purple-200 transition-colors">
              → Node.js Examples
            </Link>
            <Link href="/blog/javascript-async-patterns" className="text-purple-300 hover:text-purple-200 transition-colors">
              → JavaScript Async Patterns Guide
            </Link>
            <Link href="/cheat-sheets/javascript-array-methods" className="text-purple-300 hover:text-purple-200 transition-colors">
              → JavaScript Array Methods Cheat Sheet
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
