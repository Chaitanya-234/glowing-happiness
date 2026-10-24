// app/blog/typescript-advanced-patterns/page.tsx
import JsonLdArticle from '@/components/JsonLdArticle';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Advanced TypeScript Patterns for Large-Scale Applications | DevMetrix',
  description: 'Master advanced TypeScript with generics, conditional types, utility types, and design patterns for enterprise applications. Security best practices included.',
  keywords: ['typescript', 'typescript generics', 'typescript patterns', 'typescript advanced', 'type safety', 'typescript security'],
  authors: [{ name: 'DevMetrix TypeScript Team', url: 'https://devmetrix.in/about' }],
  openGraph: {
    title: 'Advanced TypeScript Patterns for Enterprise Apps',
    description: 'Level up your TypeScript skills with advanced patterns and security practices',
    type: 'article',
    publishedTime: '2025-10-14T00:00:00.000Z',
  },
};

export default function TypeScriptAdvancedGuide() {
  return (
    <article className="min-h-screen bg-black pt-24 pb-20 px-4">
      <JsonLdArticle
        headline="Advanced TypeScript Patterns for Large-Scale Applications"
        description="Master advanced TypeScript features including generics, conditional types, and design patterns for enterprise apps."
        datePublished="2025-10-14"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/typescript-advanced-patterns"
      />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-500"></div>
          <div className="pl-8">
            <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-semibold rounded-full mb-4 border border-blue-500/30">
              📘 TypeScript
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 mb-4 leading-tight">
              Advanced TypeScript Patterns for Large-Scale Applications
            </h1>
            <div className="flex flex-wrap gap-4 text-xs md:text-sm text-purple-300/40 mb-4">
              <span>📅 October 14, 2025</span>
              <span>•</span>
              <span>⏱️ 16 min read</span>
              <span>•</span>
              <span>✍️ By DevMetrix TypeScript Team</span>
            </div>
            <p className="text-sm text-purple-300/30">Last updated: October 2025 • Reviewed by TypeScript experts</p>
          </div>
        </div>

        {/* Quick Nav */}
        <div className="sticky top-16 z-40 mb-8 bg-blue-900/20 backdrop-blur-sm border border-blue-500/20 rounded-lg p-3">
          <div className="flex items-center gap-3 text-xs text-blue-200/60 overflow-x-auto">
            <span className="whitespace-nowrap">🗺️ Topics:</span>
            <a href="#generics" className="px-2 py-1 bg-blue-800/30 rounded hover:bg-blue-700/40 transition-colors whitespace-nowrap">Generics</a>
            <a href="#utility" className="px-2 py-1 bg-blue-800/30 rounded hover:bg-blue-700/40 transition-colors whitespace-nowrap">Utility Types</a>
            <a href="#security" className="px-2 py-1 bg-blue-800/30 rounded hover:bg-blue-700/40 transition-colors whitespace-nowrap">Security</a>
            <a href="#patterns" className="px-2 py-1 bg-blue-800/30 rounded hover:bg-blue-700/40 transition-colors whitespace-nowrap">Patterns</a>
          </div>
        </div>

        <div className="prose prose-invert prose-purple prose-lg max-w-none">
          {/* Intro */}
          <div className="bg-gradient-to-br from-blue-900/20 via-indigo-900/20 to-purple-900/20 border-2 border-blue-500/30 rounded-xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-9xl opacity-5">⚡</div>
            <p className="text-lg md:text-xl text-purple-100/80 leading-relaxed mb-4 relative z-10">
              TypeScript isn't just "JavaScript with types." When you master advanced patterns, it becomes a powerful
              tool for catching bugs at compile time, enforcing architectural decisions, and building maintainable
              large-scale applications. I've seen TypeScript transform codebases from maintenance nightmares into
              well-documented, self-checking systems.
            </p>
            <p className="text-base text-purple-200/60 relative z-10">
              This guide goes beyond the basics. We'll explore generics that actually make sense, utility types
              that save hours of work, and patterns used in production by companies like Microsoft, Google, and Airbnb.
              Plus, we'll cover critical security implications of type safety that most developers miss.
            </p>
          </div>

          {/* Skill Progression */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🌱</div>
              <div className="text-xs font-semibold text-green-300">Beginner</div>
              <div className="text-xs text-green-200/50 mt-1">Basic types</div>
            </div>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🌿</div>
              <div className="text-xs font-semibold text-blue-300">Intermediate</div>
              <div className="text-xs text-blue-200/50 mt-1">Interfaces, Unions</div>
            </div>
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🌳</div>
              <div className="text-xs font-semibold text-purple-300">Advanced</div>
              <div className="text-xs text-purple-200/50 mt-1">Generics, Conditional</div>
            </div>
            <div className="bg-pink-900/20 border border-pink-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🚀</div>
              <div className="text-xs font-semibold text-pink-300">Expert</div>
              <div className="text-xs text-pink-200/50 mt-1">Type Gymnastics</div>
            </div>
          </div>

          <h2 id="generics" className="text-3xl font-bold text-blue-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">🧬</span>
            Generics: Write Once, Type Safely Everywhere
          </h2>

          <p className="text-sm md:text-base text-purple-200/60 leading-relaxed">
            Generics are probably the most powerful feature in TypeScript. They let you write reusable code that
            works with any type while maintaining type safety. Think of them as type variables - placeholders that
            get filled in when you use the function or class.
          </p>

          <div className="my-8 space-y-6">
            <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border-l-4 border-blue-500 rounded-r-lg p-6">
              <h3 className="text-xl font-semibold text-blue-200/80 mb-4">Basic Generic Function:</h3>
              <pre className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30 overflow-x-auto text-xs mb-4">
                <code className="text-blue-100/80">{`// Without generics - need different functions for each type
function getFirstString(arr: string[]): string | undefined {
  return arr[0];
}
function getFirstNumber(arr: number[]): number | undefined {
  return arr[0];
}

// With generics - one function for all types
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

// TypeScript infers the type automatically
const firstNum = getFirst([1, 2, 3]); // number | undefined
const firstStr = getFirst(['a', 'b']); // string | undefined
const firstObj = getFirst([{ id: 1 }]); // { id: number } | undefined`}</code>
              </pre>
            </div>

            <div className="bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border-l-4 border-indigo-500 rounded-r-lg p-6">
              <h3 className="text-xl font-semibold text-indigo-200/80 mb-4">Generic Constraints:</h3>
              <pre className="bg-indigo-900/20 p-4 rounded-lg border border-indigo-500/30 overflow-x-auto text-xs">
                <code className="text-indigo-100/80">{`// Constrain generic to objects with 'id' property
interface HasId {
  id: number;
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

// Works with any object that has an id
const users = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];
const posts = [{ id: 1, title: 'Hello', body: '...' }];

findById(users, 1); // Works!
findById(posts, 1); // Works!
// findById(['a', 'b'], 1); // Error: string doesn't have 'id'`}</code>
              </pre>
            </div>

            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-l-4 border-purple-500 rounded-r-lg p-6">
              <h3 className="text-xl font-semibold text-purple-200/80 mb-4">Real-World: API Response Handler</h3>
              <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30 overflow-x-auto text-xs">
                <code className="text-purple-100/80">{`interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

async function fetchApi<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  return response.json();
}

// Type-safe API calls
interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  userId: number;
}

// TypeScript knows the exact shape of data
const userResponse = await fetchApi<User>('/api/users/1');
console.log(userResponse.data.name); // ✓ Type-safe!

const postsResponse = await fetchApi<Post[]>('/api/posts');
console.log(postsResponse.data[0].title); // ✓ Type-safe!`}</code>
              </pre>
            </div>
          </div>

          <h2 id="utility" className="text-3xl font-bold text-indigo-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">🛠️</span>
            Utility Types: TypeScript's Hidden Gems
          </h2>

          <p className="text-sm md:text-base text-purple-200/60 leading-relaxed mb-6">
            TypeScript comes with built-in utility types that save you from writing boilerplate code. These are
            game-changers for maintaining large codebases.
          </p>

          <div className="grid md:grid-cols-2 gap-6 my-8">
            <div className="bg-blue-900/10 border border-blue-500/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-200/80 mb-3">Partial&lt;T&gt;</h3>
              <p className="text-xs text-blue-200/60 mb-3">Makes all properties optional</p>
              <pre className="bg-blue-900/20 p-3 rounded text-xs overflow-x-auto">
                <code className="text-blue-100/80">{`interface User {
  id: number;
  name: string;
  email: string;
}

// For updates - not all fields required
function updateUser(
  id: number,
  updates: Partial<User>
) {
  // Only update provided fields
}

updateUser(1, { name: 'John' }); // ✓
updateUser(1, { email: 'j@x.com' }); // ✓`}</code>
              </pre>
            </div>

            <div className="bg-indigo-900/10 border border-indigo-500/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-indigo-200/80 mb-3">Pick&lt;T, K&gt;</h3>
              <p className="text-xs text-indigo-200/60 mb-3">Select specific properties</p>
              <pre className="bg-indigo-900/20 p-3 rounded text-xs overflow-x-auto">
                <code className="text-indigo-100/80">{`// Only expose safe fields
type PublicUser = Pick<User,
  'id' | 'name'
>;

function getPublicProfile(
  user: User
): PublicUser {
  return {
    id: user.id,
    name: user.name
    // email not included
  };
}`}</code>
              </pre>
            </div>

            <div className="bg-purple-900/10 border border-purple-500/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-purple-200/80 mb-3">Omit&lt;T, K&gt;</h3>
              <p className="text-xs text-purple-200/60 mb-3">Exclude specific properties</p>
              <pre className="bg-purple-900/20 p-3 rounded text-xs overflow-x-auto">
                <code className="text-purple-100/80">{`// Remove sensitive fields
type SafeUser = Omit<User,
  'password' | 'ssn'
>;

function sanitizeUser(
  user: User
): SafeUser {
  const { password, ssn, ...safe } = user;
  return safe;
}`}</code>
              </pre>
            </div>

            <div className="bg-pink-900/10 border border-pink-500/30 rounded-lg p-6">
              <h3 className="text-lg font-bold text-pink-200/80 mb-3">Record&lt;K, T&gt;</h3>
              <p className="text-xs text-pink-200/60 mb-3">Create object types with known keys</p>
              <pre className="bg-pink-900/20 p-3 rounded text-xs overflow-x-auto">
                <code className="text-pink-100/80">{`type Role = 'admin' | 'user' | 'guest';

type Permissions = Record<
  Role,
  string[]
>;

const perms: Permissions = {
  admin: ['read', 'write', 'delete'],
  user: ['read', 'write'],
  guest: ['read']
};`}</code>
              </pre>
            </div>
          </div>

          <h2 id="security" className="text-3xl font-bold text-red-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">🔒</span>
            TypeScript Security: Type Safety Isn't Enough
          </h2>

          <div className="bg-gradient-to-br from-red-900/20 via-orange-900/20 to-yellow-900/20 border-2 border-red-500/30 rounded-xl p-6 md:p-8 mb-12">
            <p className="text-base md:text-lg text-red-100/80 leading-relaxed mb-4">
              Here's a hard truth that many TypeScript developers don't realize: type safety doesn't protect you
              from security vulnerabilities. I've audited codebases where teams felt secure because they used
              TypeScript, but they had critical XSS vulnerabilities, SQL injection risks, and authentication bypasses.
              TypeScript is a powerful tool, but it's not a security silver bullet.
            </p>

            <p className="text-sm text-red-200/60 leading-relaxed mb-4">
              The problem is that types are erased at runtime. All your beautiful type definitions vanish when the
              code compiles to JavaScript. This means malicious input, API responses with unexpected shapes, or
              compromised dependencies can bypass your type system entirely. You need runtime validation, not just
              compile-time checking.
            </p>

            <p className="text-sm text-red-200/60 leading-relaxed mb-4">
              Let me show you exactly where developers get this wrong and how to fix it. These patterns have stopped
              real security breaches in production systems I've worked on.
            </p>

            <h3 className="text-xl font-bold text-red-200/80 mt-6 mb-4">The False Sense of Security</h3>

            <p className="text-sm text-red-200/60 leading-relaxed mb-4">
              Consider this common pattern. It looks type-safe, but it's dangerously vulnerable:
            </p>

            <pre className="bg-red-900/30 p-4 rounded-lg border border-red-500/30 overflow-x-auto text-xs mb-6">
              <code className="text-red-100/80">{`// Looks safe, but it's NOT
interface User {
  id: number;
  email: string;
  isAdmin: boolean;
}

app.post('/api/update-profile', async (req, res) => {
  // TypeScript says this is safe
  const userData: User = req.body;

  // But attacker can send:
  // { id: 123, email: "fake@evil.com", isAdmin: true }
  // TypeScript won't catch this at runtime!

  await db.users.update(userData.id, userData);
  // Boom - attacker just made themselves admin
});`}</code>
            </pre>

            <p className="text-sm text-red-200/60 leading-relaxed mb-4">
              The type annotation <code className="text-red-300">User</code> is just a hint to the compiler. At runtime,
              TypeScript has no way to verify that <code className="text-red-300">req.body</code> actually matches the
              User interface. An attacker can send any JSON they want, and TypeScript will happily compile your code
              without complaint.
            </p>

            <h3 className="text-xl font-bold text-orange-200/80 mt-6 mb-4">Runtime Validation: The Real Solution</h3>

            <p className="text-sm text-orange-200/60 leading-relaxed mb-4">
              You need libraries that validate data at runtime. My go-to choices are Zod, Yup, or io-ts. They bridge
              the gap between compile-time types and runtime safety:
            </p>

            <pre className="bg-green-900/30 p-4 rounded-lg border border-green-500/30 overflow-x-auto text-xs mb-6">
              <code className="text-green-100/80">{`import { z } from 'zod';

// Define schema with runtime validation
const UserUpdateSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2).max(100),
  // isAdmin is NOT allowed in updates!
}).strict();

app.post('/api/update-profile', async (req, res) => {
  try {
    // Validate at runtime
    const userData = UserUpdateSchema.parse(req.body);

    // If we get here, data is ACTUALLY safe
    await db.users.update(req.user.id, userData);

    res.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Detailed validation errors
      res.status(400).json({
        error: 'Invalid input',
        details: error.errors
      });
    }
  }
});

// Bonus: Extract TypeScript type from schema
type UserUpdate = z.infer<typeof UserUpdateSchema>;`}</code>
            </pre>

            <p className="text-sm text-yellow-200/60 leading-relaxed mb-4">
              This approach gives you both compile-time types AND runtime validation. The <code className="text-yellow-300">.strict()</code>
              call is crucial - it rejects any properties not explicitly defined in the schema. Without it, attackers
              could still sneak in extra fields like <code className="text-yellow-300">isAdmin</code>.
            </p>

            <h3 className="text-xl font-bold text-yellow-200/80 mt-6 mb-4">Never Trust External Data</h3>

            <p className="text-sm text-yellow-200/60 leading-relaxed mb-4">
              API responses, environment variables, local storage, cookies - all of these come from outside your
              type system. Always validate them:
            </p>

            <pre className="bg-yellow-900/30 p-4 rounded-lg border border-yellow-500/30 overflow-x-auto text-xs mb-6">
              <code className="text-yellow-100/80">{`// API Response Schema
const ApiResponseSchema = z.object({
  data: z.object({
    id: z.number(),
    email: z.string().email(),
    name: z.string()
  }),
  status: z.number()
});

async function fetchUser(id: number) {
  const response = await fetch(\`/api/users/\${id}\`);
  const json = await response.json();

  // Validate before using
  const validated = ApiResponseSchema.parse(json);

  return validated.data;
  // If API returns unexpected data, parse() throws
  // Better to fail fast than use corrupted data
}

// Environment variables
const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  NODE_ENV: z.enum(['development', 'production', 'test'])
});

// Validate on startup
const env = EnvSchema.parse(process.env);`}</code>
            </pre>

            <h3 className="text-xl font-bold text-green-200/80 mt-6 mb-4">Branded Types for Critical Data</h3>

            <p className="text-sm text-green-200/60 leading-relaxed mb-4">
              Some values need extra protection. User IDs, passwords, tokens - you don't want these confused with
              regular strings. Branded types help:
            </p>

            <pre className="bg-green-900/30 p-4 rounded-lg border border-green-500/30 overflow-x-auto text-xs">
              <code className="text-green-100/80">{`// Create branded types
type UserId = string & { readonly __brand: 'UserId' };
type SessionToken = string & { readonly __brand: 'SessionToken' };

// Factory functions with validation
function createUserId(id: string): UserId {
  if (!/^[0-9a-f]{24}$/.test(id)) {
    throw new Error('Invalid user ID format');
  }
  return id as UserId;
}

function createSessionToken(token: string): SessionToken {
  if (token.length < 32) {
    throw new Error('Invalid session token');
  }
  return token as SessionToken;
}

// Now you can't mix them up
function getUser(id: UserId) { /* ... */ }
function validateSession(token: SessionToken) { /* ... */ }

const userId = createUserId('507f1f77bcf86cd799439011');
const token = createSessionToken('secure-token-here...');

getUser(userId); // ✓ Works
// getUser(token); // ✗ Type error - can't pass SessionToken as UserId
// getUser('random-string'); // ✗ Type error - must use createUserId()`}</code>
            </pre>
          </div>

          <h2 id="patterns" className="text-3xl font-bold text-purple-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">🎨</span>
            Design Patterns with TypeScript
          </h2>

          <div className="space-y-6 my-8">
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-2 border-blue-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-blue-200/80 mb-4">Builder Pattern with Type Safety:</h3>
              <pre className="bg-blue-900/30 p-4 rounded text-xs overflow-x-auto">
                <code className="text-blue-100/80">{`class QueryBuilder<T> {
  private conditions: string[] = [];

  where(field: keyof T, value: any): this {
    this.conditions.push(\`\${String(field)} = \${value}\`);
    return this;
  }

  orderBy(field: keyof T, direction: 'ASC' | 'DESC' = 'ASC'): this {
    this.conditions.push(\`ORDER BY \${String(field)} \${direction}\`);
    return this;
  }

  build(): string {
    return this.conditions.join(' ');
  }
}

interface User {
  id: number;
  name: string;
  email: string;
}

// Type-safe query building
const query = new QueryBuilder<User>()
  .where('email', 'test@test.com')
  .orderBy('name', 'ASC')
  .build();

// query.where('invalid', 'value'); // Error: 'invalid' not in User`}</code>
              </pre>
            </div>

            <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-2 border-purple-500/30 rounded-xl p-6">
              <h3 className="text-xl font-bold text-purple-200/80 mb-4">Discriminated Unions for State Management:</h3>
              <pre className="bg-purple-900/30 p-4 rounded text-xs overflow-x-auto">
                <code className="text-purple-100/80">{`type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

function handleRequest<T>(state: RequestState<T>) {
  switch (state.status) {
    case 'idle':
      return 'Not started yet';
    case 'loading':
      return 'Loading...';
    case 'success':
      // TypeScript knows state.data exists here!
      return \`Got data: \${state.data}\`;
    case 'error':
      // TypeScript knows state.error exists here!
      return \`Error: \${state.error}\`;
  }
}

// Usage
const userState: RequestState<User> = {
  status: 'success',
  data: { id: 1, name: 'John', email: 'j@x.com' }
};`}</code>
              </pre>
            </div>
          </div>

          {/* Checklist */}
          <div className="my-12 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-2 border-blue-500/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-blue-100/80 mb-6 flex items-center gap-3">
              <span className="text-3xl">✅</span>
              TypeScript Best Practices Checklist
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-blue-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Enable strict mode in tsconfig.json</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-blue-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Use runtime validation (Zod/Yup)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-blue-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Avoid 'any' type everywhere</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-blue-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Use generics for reusable code</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-blue-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Leverage utility types (Pick, Omit, etc.)</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-blue-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Use discriminated unions for state</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-blue-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Create branded types for sensitive data</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-blue-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Validate all external data</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-blue-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Write type-safe API clients</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-blue-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Document complex types</span>
                </div>
              </div>
            </div>
          </div>

          <div className="my-12 bg-blue-900/10 border border-blue-500/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-200/80 mb-4">🎯 Key Takeaway</h3>
            <p className="text-sm text-blue-200/60 leading-relaxed">
              Advanced TypeScript is about more than fancy types - it's about building systems that are both
              maintainable and secure. Use generics to reduce code duplication, leverage utility types to express
              intent clearly, and always remember: type safety at compile time doesn't protect you at runtime.
              Validate everything that crosses your application boundary.
            </p>
          </div>

          {/* Author Box */}
          <div className="mt-16 mb-8 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">👨‍💻</div>
              <div>
                <h3 className="text-lg font-semibold text-blue-100/80 mb-2">About the Authors</h3>
                <p className="text-sm text-blue-200/60 leading-relaxed mb-3">
                  Written by DevMetrix's TypeScript team with experience building type-safe applications at scale.
                  We've migrated dozens of JavaScript codebases to TypeScript and fixed countless type-related bugs
                  in production systems.
                </p>
                <p className="text-xs text-blue-300/40">
                  ✓ TypeScript experts • ✓ Updated October 2025 • ✓ Security-reviewed practices
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-2 border-blue-500/30 rounded-xl">
            <h3 className="text-2xl font-semibold text-blue-100/80 mb-4 flex items-center gap-3">
              <span className="text-3xl">🔧</span>
              Build Type-Safe APIs
            </h3>
            <p className="text-sm text-blue-200/60 mb-4 leading-relaxed">
              Test your TypeScript APIs with proper type checking. Use our API tester to verify your endpoints
              return the expected data shapes.
            </p>
            <Link
              href="/tools/api-tester"
              className="inline-block px-6 py-3 bg-blue-600/30 text-blue-100 rounded-lg border border-blue-500/30 hover:bg-blue-500/40 transition-all font-semibold no-underline text-sm"
            >
              Try API Tester →
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
