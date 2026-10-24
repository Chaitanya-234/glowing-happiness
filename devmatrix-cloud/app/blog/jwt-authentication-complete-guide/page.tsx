// app/blog/jwt-authentication-complete-guide/page.tsx
import JsonLdArticle from '@/components/JsonLdArticle';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'JWT Authentication: Complete Guide for Developers in 2025 | DevMetrix',
  description: 'Master JWT authentication with this comprehensive guide covering implementation, security, best practices, and real-world examples.',
  keywords: ['jwt', 'authentication', 'json web tokens', 'security', 'api authentication'],
};

export default function JWTAuthenticationGuide() {
  return (
    <article className="min-h-screen bg-black pt-24 pb-20 px-4">
      <JsonLdArticle
        headline="JWT Authentication: Complete Guide for Developers in 2025"
        description="Master JWT authentication with this comprehensive guide covering implementation, security, best practices, and real-world examples."
        datePublished="2025-10-26"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/jwt-authentication-complete-guide"
      />
      <div className="max-w-4xl mx-auto prose prose-invert prose-purple prose-lg">
        <h1 className="text-5xl font-bold text-purple-100/80 mb-4">
          JWT Authentication: Complete Guide for Developers in 2025
        </h1>

        <div className="flex gap-4 text-sm text-purple-300/40 mb-8">
          <span>October 26, 2025</span>
          <span>•</span>
          <span>30 min read</span>
          <span>•</span>
          <span>Security</span>
        </div>

        <p className="text-xl text-purple-200/60 leading-relaxed">
          JSON Web Tokens (JWT) have become the industry standard for authentication in modern web applications.
          This comprehensive guide covers everything from basic concepts to advanced security practices.
        </p>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          What is JWT?
        </h2>

        <p className="text-purple-200/50 leading-relaxed">
          JWT (JSON Web Token) is an open standard (RFC 7519) that defines a compact and self-contained way
          for securely transmitting information between parties as a JSON object. This information can be
          verified and trusted because it is digitally signed.
        </p>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          JWT Structure
        </h3>

        <p className="text-purple-200/50">
          A JWT consists of three parts separated by dots (.):
        </p>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 overflow-x-auto">
          <code className="text-purple-100/80 text-sm">{`xxxxx.yyyyy.zzzzz

Header.Payload.Signature`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          1. Header
        </h3>

        <p className="text-purple-200/50">
          The header typically consists of two parts: the type of token (JWT) and the signing algorithm (HMAC, RSA, etc.).
        </p>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`{
  "alg": "HS256",
  "typ": "JWT"
}`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          2. Payload
        </h3>

        <p className="text-purple-200/50">
          The payload contains the claims - statements about the user and additional data.
        </p>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`{
  "sub": "1234567890",
  "name": "John Doe",
  "email": "john@example.com",
  "iat": 1516239022,
  "exp": 1516242622
}`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          3. Signature
        </h3>

        <p className="text-purple-200/50">
          The signature is created by encoding the header and payload, then signing them with a secret key.
        </p>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          How JWT Authentication Works
        </h2>

        <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6 my-8">
          <h3 className="text-xl font-semibold text-purple-100/70 mb-4">Authentication Flow:</h3>
          <ol className="space-y-3 text-purple-200/50">
            <li>1. User logs in with credentials (username/password)</li>
            <li>2. Server validates credentials and generates JWT</li>
            <li>3. Server sends JWT back to client</li>
            <li>4. Client stores JWT (localStorage, sessionStorage, or cookie)</li>
            <li>5. Client includes JWT in Authorization header for subsequent requests</li>
            <li>6. Server verifies JWT signature and extracts user information</li>
            <li>7. Server processes request if JWT is valid</li>
          </ol>
        </div>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Implementing JWT Authentication
        </h2>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Backend Implementation (Node.js + Express)
        </h3>

        <p className="text-purple-200/50">
          Install required packages:
        </p>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`npm install jsonwebtoken bcrypt express`}</code>
        </pre>

        <p className="text-purple-200/50 mt-6">
          Create authentication routes:
        </p>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = '7d';

// User registration
router.post('/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate input
    if (!email || !password || !name) {
      return res.status(400).json({
        error: 'All fields are required'
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: 'User already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      name
    });

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });

  } catch (error) {
    res.status(500).json({
      error: 'Registration failed'
    });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        error: 'Email and password are required'
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: 'Invalid credentials'
      });
    }

    // Verify password
    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({
        error: 'Invalid credentials'
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });

  } catch (error) {
    res.status(500).json({
      error: 'Login failed'
    });
  }
});

module.exports = router;`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Creating Authentication Middleware
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// middleware/auth.js
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'No token provided'
      });
    }

    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user info to request
    req.user = {
      userId: decoded.userId,
      email: decoded.email
    };

    next();

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expired'
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Invalid token'
      });
    }

    res.status(500).json({
      error: 'Authentication failed'
    });
  }
};

module.exports = authMiddleware;`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Using the Middleware
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`const authMiddleware = require('./middleware/auth');

// Protected route example
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select('-password');

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      { name },
      { new: true }
    ).select('-password');

    res.json({
      message: 'Profile updated',
      user
    });
  } catch (error) {
    res.status(500).json({ error: 'Update failed' });
  }
});`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Frontend Implementation (React)
        </h2>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Login Component
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });

      // Store token
      localStorage.setItem('token', response.data.token);

      // Store user info
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect to dashboard
      window.location.href = '/dashboard';

    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <div className="error">{error}</div>}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />

      <button type="submit">Login</button>
    </form>
  );
}`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Axios Interceptor for Authentication
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// utils/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

// Request interceptor - add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Security Best Practices
        </h2>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          1. Use Strong Secret Keys
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Generate a strong secret
const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');

// Store in environment variables
// .env file
JWT_SECRET=your-super-secret-key-here-min-32-chars`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          2. Set Appropriate Expiration Times
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Short-lived access tokens
const accessToken = jwt.sign(payload, JWT_SECRET, {
  expiresIn: '15m'
});

// Long-lived refresh tokens
const refreshToken = jwt.sign(payload, REFRESH_SECRET, {
  expiresIn: '7d'
});`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          3. Implement Refresh Token Strategy
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Refresh token endpoint
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        error: 'Refresh token required'
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_SECRET
    );

    // Check if refresh token is blacklisted
    const blacklisted = await RefreshToken.findOne({
      token: refreshToken,
      revoked: true
    });

    if (blacklisted) {
      return res.status(401).json({
        error: 'Token revoked'
      });
    }

    // Generate new access token
    const newAccessToken = jwt.sign(
      { userId: decoded.userId, email: decoded.email },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.json({
      accessToken: newAccessToken
    });

  } catch (error) {
    res.status(401).json({
      error: 'Invalid refresh token'
    });
  }
});`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Common Security Vulnerabilities
        </h2>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          1. Storing Sensitive Data in JWT
        </h3>

        <div className="bg-red-900/10 border border-red-500/30 rounded-lg p-6 my-6">
          <p className="text-red-300 font-semibold mb-3">❌ Never store sensitive data in JWT:</p>
          <ul className="list-disc list-inside text-red-200/70 space-y-2">
            <li>Passwords</li>
            <li>Credit card numbers</li>
            <li>Social security numbers</li>
            <li>Private keys</li>
          </ul>
        </div>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          2. Not Validating Token Expiration
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Always verify expiration
try {
  const decoded = jwt.verify(token, JWT_SECRET);

  // Additional check (belt and suspenders)
  if (decoded.exp < Date.now() / 1000) {
    throw new Error('Token expired');
  }

} catch (error) {
  // Handle expired or invalid token
}`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Conclusion
        </h2>

        <p className="text-purple-200/50 leading-relaxed">
          JWT authentication is a powerful tool for securing modern applications. By following these
          best practices and implementing proper security measures, you can build robust authentication
          systems that protect your users and data.
        </p>

        <div className="mt-12 p-6 bg-purple-900/20 border border-purple-500/20 rounded-lg">
          <h3 className="text-2xl font-semibold text-purple-100/70 mb-4">
            Try Our JWT Decoder Tool
          </h3>
          <p className="text-purple-200/50 mb-4">
            Decode and inspect JWT tokens instantly with our free online tool!
          </p>
          <Link
            href="/tools/jwt-decoder"
            className="inline-block px-6 py-3 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold no-underline"
          >
            Try JWT Decoder →
          </Link>
        </div>
      </div>
    </article>
  );
}
