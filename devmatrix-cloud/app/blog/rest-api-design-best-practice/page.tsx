'use client';
// app/blog/rest-api-design-best-practices/page.tsx
import { useTheme } from '@/components/providers/ThemeProvider';
import JsonLdArticle from '@/components/JsonLdArticle';
import { Metadata } from 'next';
import Link from 'next/link';

const metadata: Metadata = {
  title: 'REST API Design: Best Practices and Common Pitfalls | DevMetrix',
  description: 'Master REST API design with proven patterns, naming conventions, error handling strategies, and versioning techniques for scalable APIs.',
  keywords: ['rest api', 'api design', 'web services', 'api best practices', 'restful api'],
};

export default function RESTAPIDesignGuide() {
  const { currentTheme: theme } = useTheme();
  return (
    <article className={`min-h-screen ${theme.colors.background} pt-24 pb-20 px-4 transition-colors duration-300`}>
      <JsonLdArticle
        headline="REST API Design: Best Practices and Common Pitfalls"
        description="Design better APIs with proven patterns, naming conventions, error handling strategies, and versioning techniques."
        datePublished="2025-10-24"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/rest-api-design-best-practice"
      />
      <div className="max-w-4xl mx-auto prose prose-invert prose-purple prose-lg">
        <h1 className="text-5xl font-bold text-purple-100/80 mb-4">
          REST API Design: Best Practices and Common Pitfalls
        </h1>

        <div className="flex gap-4 text-sm text-purple-300/40 mb-8">
          <span>October 24, 2025</span>
          <span>•</span>
          <span>28 min read</span>
          <span>•</span>
          <span>API Design</span>
        </div>

        <p className="text-xl text-purple-200/60 leading-relaxed">
          Designing a great REST API is both an art and a science. A well-designed API is intuitive,
          consistent, and scalable. This comprehensive guide covers everything from basic principles
          to advanced patterns for building production-ready RESTful APIs.
        </p>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          What is REST?
        </h2>

        <p className="text-purple-200/50 leading-relaxed">
          REST (Representational State Transfer) is an architectural style for designing networked
          applications. It relies on stateless, client-server communication using standard HTTP methods
          and follows a set of constraints that make APIs predictable and maintainable.
        </p>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          REST Principles
        </h3>

        <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6 my-6">
          <ol className="space-y-3 text-purple-200/50">
            <li><strong className="text-purple-200/70">Client-Server:</strong> Separation of concerns between UI and data storage</li>
            <li><strong className="text-purple-200/70">Stateless:</strong> Each request contains all information needed to process it</li>
            <li><strong className="text-purple-200/70">Cacheable:</strong> Responses explicitly indicate if they can be cached</li>
            <li><strong className="text-purple-200/70">Uniform Interface:</strong> Consistent way to interact with resources</li>
            <li><strong className="text-purple-200/70">Layered System:</strong> Client doesn't know if connected directly to server or intermediary</li>
            <li><strong className="text-purple-200/70">Code on Demand (Optional):</strong> Server can extend client functionality</li>
          </ol>
        </div>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          HTTP Methods
        </h2>

        <p className="text-purple-200/50">
          REST APIs use standard HTTP methods to perform CRUD operations:
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-purple-500/20">
                <th className="text-left p-3 text-purple-100/70">Method</th>
                <th className="text-left p-3 text-purple-100/70">Purpose</th>
                <th className="text-left p-3 text-purple-100/70">Idempotent</th>
                <th className="text-left p-3 text-purple-100/70">Safe</th>
              </tr>
            </thead>
            <tbody className="text-purple-200/50 text-sm">
              <tr className="border-b border-purple-500/10">
                <td className="p-3"><code className="text-purple-300/70">GET</code></td>
                <td className="p-3">Retrieve resource(s)</td>
                <td className="p-3">✅ Yes</td>
                <td className="p-3">✅ Yes</td>
              </tr>
              <tr className="border-b border-purple-500/10">
                <td className="p-3"><code className="text-purple-300/70">POST</code></td>
                <td className="p-3">Create new resource</td>
                <td className="p-3">❌ No</td>
                <td className="p-3">❌ No</td>
              </tr>
              <tr className="border-b border-purple-500/10">
                <td className="p-3"><code className="text-purple-300/70">PUT</code></td>
                <td className="p-3">Update/replace entire resource</td>
                <td className="p-3">✅ Yes</td>
                <td className="p-3">❌ No</td>
              </tr>
              <tr className="border-b border-purple-500/10">
                <td className="p-3"><code className="text-purple-300/70">PATCH</code></td>
                <td className="p-3">Partial update of resource</td>
                <td className="p-3">❌ No</td>
                <td className="p-3">❌ No</td>
              </tr>
              <tr>
                <td className="p-3"><code className="text-purple-300/70">DELETE</code></td>
                <td className="p-3">Remove resource</td>
                <td className="p-3">✅ Yes</td>
                <td className="p-3">❌ No</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Resource Naming Conventions
        </h2>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Use Nouns, Not Verbs
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div>
            <p className="text-red-400 font-semibold mb-2">❌ Bad:</p>
            <pre className="bg-purple-900/20 p-4 rounded-lg border border-red-500/30 text-sm">
              <code className="text-purple-100/80">{`GET /getUsers
POST /createUser
PUT /updateUser/123
DELETE /deleteUser/123`}</code>
            </pre>
          </div>
          <div>
            <p className="text-green-400 font-semibold mb-2">✅ Good:</p>
            <pre className="bg-purple-900/20 p-4 rounded-lg border border-green-500/30 text-sm">
              <code className="text-purple-100/80">{`GET /users
POST /users
PUT /users/123
DELETE /users/123`}</code>
            </pre>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Use Plural Nouns for Collections
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div>
            <p className="text-red-400 font-semibold mb-2">❌ Bad:</p>
            <pre className="bg-purple-900/20 p-4 rounded-lg border border-red-500/30 text-sm">
              <code className="text-purple-100/80">{`GET /user
GET /user/123
POST /user`}</code>
            </pre>
          </div>
          <div>
            <p className="text-green-400 font-semibold mb-2">✅ Good:</p>
            <pre className="bg-purple-900/20 p-4 rounded-lg border border-green-500/30 text-sm">
              <code className="text-purple-100/80">{`GET /users
GET /users/123
POST /users`}</code>
            </pre>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Nested Resources
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Get all posts by a user
GET /users/123/posts

// Get a specific post by a user
GET /users/123/posts/456

// Create a new post for a user
POST /users/123/posts

// Get comments on a post
GET /users/123/posts/456/comments

// Avoid deep nesting (max 2-3 levels)
❌ GET /users/123/posts/456/comments/789/replies/101`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Use Lowercase and Hyphens
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div>
            <p className="text-red-400 font-semibold mb-2">❌ Bad:</p>
            <pre className="bg-purple-900/20 p-4 rounded-lg border border-red-500/30 text-sm">
              <code className="text-purple-100/80">{`GET /userProfiles
GET /User_Profiles
GET /USERS`}</code>
            </pre>
          </div>
          <div>
            <p className="text-green-400 font-semibold mb-2">✅ Good:</p>
            <pre className="bg-purple-900/20 p-4 rounded-lg border border-green-500/30 text-sm">
              <code className="text-purple-100/80">{`GET /user-profiles
GET /users
GET /blog-posts`}</code>
            </pre>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          HTTP Status Codes
        </h2>

        <p className="text-purple-200/50">
          Always use appropriate HTTP status codes to indicate the result of an operation:
        </p>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Success Codes (2xx)
        </h3>

        <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6 my-6">
          <ul className="space-y-3 text-purple-200/50">
            <li><code className="text-green-400">200 OK</code> - Successful GET, PUT, PATCH, or DELETE</li>
            <li><code className="text-green-400">201 Created</code> - Successful POST that creates a resource</li>
            <li><code className="text-green-400">204 No Content</code> - Successful request with no response body</li>
          </ul>
        </div>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Client Error Codes (4xx)
        </h3>

        <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6 my-6">
          <ul className="space-y-3 text-purple-200/50">
            <li><code className="text-red-400">400 Bad Request</code> - Invalid request syntax or parameters</li>
            <li><code className="text-red-400">401 Unauthorized</code> - Authentication required or failed</li>
            <li><code className="text-red-400">403 Forbidden</code> - Authenticated but not authorized</li>
            <li><code className="text-red-400">404 Not Found</code> - Resource doesn't exist</li>
            <li><code className="text-red-400">409 Conflict</code> - Request conflicts with current state</li>
            <li><code className="text-red-400">422 Unprocessable Entity</code> - Validation errors</li>
            <li><code className="text-red-400">429 Too Many Requests</code> - Rate limit exceeded</li>
          </ul>
        </div>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Server Error Codes (5xx)
        </h3>

        <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6 my-6">
          <ul className="space-y-3 text-purple-200/50">
            <li><code className="text-orange-400">500 Internal Server Error</code> - Generic server error</li>
            <li><code className="text-orange-400">502 Bad Gateway</code> - Invalid response from upstream server</li>
            <li><code className="text-orange-400">503 Service Unavailable</code> - Server temporarily unavailable</li>
            <li><code className="text-orange-400">504 Gateway Timeout</code> - Upstream server timeout</li>
          </ul>
        </div>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Error Handling
        </h2>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Consistent Error Response Format
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request parameters",
    "details": [
      {
        "field": "email",
        "message": "Email format is invalid"
      },
      {
        "field": "age",
        "message": "Age must be between 18 and 120"
      }
    ],
    "timestamp": "2025-10-24T10:30:00Z",
    "path": "/api/users",
    "requestId": "req-123-456"
  }
}`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Implementation Example (Express.js)
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Error handler middleware
app.use((err, req, res, next) => {
  const error = {
    code: err.code || 'INTERNAL_ERROR',
    message: err.message || 'An unexpected error occurred',
    timestamp: new Date().toISOString(),
    path: req.path,
    requestId: req.id
  };

  // Add validation details if present
  if (err.validationErrors) {
    error.details = err.validationErrors.map(e => ({
      field: e.field,
      message: e.message
    }));
  }

  // Log error (but don't expose internal details to client)
  console.error('API Error:', {
    ...error,
    stack: err.stack
  });

  // Send appropriate status code
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({ error });
});`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Filtering, Sorting, and Pagination
        </h2>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Filtering
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Filter by single field
GET /users?status=active

// Filter by multiple fields
GET /users?status=active&role=admin

// Filter with comparison operators
GET /products?price_min=10&price_max=100

// Filter by date range
GET /orders?created_after=2025-01-01&created_before=2025-12-31`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Sorting
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Sort by single field (ascending)
GET /users?sort=name

// Sort descending (use minus prefix)
GET /users?sort=-created_at

// Sort by multiple fields
GET /users?sort=last_name,first_name

// Sort with explicit direction
GET /users?sort=name:asc,created_at:desc`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Pagination
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Offset-based pagination
GET /users?page=2&limit=20

// Cursor-based pagination (better for large datasets)
GET /users?cursor=eyJpZCI6MTIzfQ&limit=20

// Response format
{
  "data": [...],
  "pagination": {
    "total": 1000,
    "page": 2,
    "limit": 20,
    "totalPages": 50,
    "hasNext": true,
    "hasPrev": true,
    "nextCursor": "eyJpZCI6MTQzfQ",
    "prevCursor": "eyJpZCI6MTAzfQ"
  },
  "links": {
    "self": "/users?page=2&limit=20",
    "first": "/users?page=1&limit=20",
    "prev": "/users?page=1&limit=20",
    "next": "/users?page=3&limit=20",
    "last": "/users?page=50&limit=20"
  }
}`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Versioning Strategies
        </h2>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          1. URL Path Versioning (Most Common)
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`GET /api/v1/users
GET /api/v2/users

// Pros: Clear, easy to implement, cache-friendly
// Cons: Multiple endpoints to maintain`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          2. Header Versioning
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`GET /api/users
Accept: application/vnd.myapi.v2+json

// Pros: Clean URLs
// Cons: Less visible, harder to test`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          3. Query Parameter Versioning
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`GET /api/users?version=2

// Pros: Easy to implement
// Cons: Can be overlooked, pollutes query parameters`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Authentication & Authorization
        </h2>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Bearer Token Authentication
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Request
GET /api/users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

// Implementation
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      error: {
        code: 'UNAUTHORIZED',
        message: 'Authentication required'
      }
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      error: {
        code: 'INVALID_TOKEN',
        message: 'Token is invalid or expired'
      }
    });
  }
};`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Rate Limiting
        </h2>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Rate limit headers
HTTP/1.1 200 OK
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1635724800

// When rate limit exceeded
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1635724800
Retry-After: 3600

{
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later.",
    "retryAfter": 3600
  }
}

// Implementation with express-rate-limit
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests from this IP'
    }
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          HATEOAS (Hypermedia)
        </h2>

        <p className="text-purple-200/50">
          Include links to related resources in responses:
        </p>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`{
  "id": 123,
  "name": "John Doe",
  "email": "john@example.com",
  "_links": {
    "self": {
      "href": "/users/123"
    },
    "posts": {
      "href": "/users/123/posts"
    },
    "followers": {
      "href": "/users/123/followers"
    },
    "following": {
      "href": "/users/123/following"
    }
  }
}`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Caching
        </h2>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Cache-Control Headers
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Cache for 1 hour
Cache-Control: public, max-age=3600

// Don't cache (for sensitive data)
Cache-Control: no-store, no-cache, must-revalidate

// Cache but revalidate
Cache-Control: public, max-age=0, must-revalidate

// Implementation
app.get('/api/users/:id', (req, res) => {
  const user = getUserById(req.params.id);

  // Set cache headers
  res.set('Cache-Control', 'public, max-age=300'); // 5 minutes
  res.set('ETag', generateETag(user));

  res.json(user);
});`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          ETags for Conditional Requests
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Client sends ETag from previous request
GET /api/users/123
If-None-Match: "33a64df551425fcc55e4d42a148795d9"

// Server responds with 304 if unchanged
HTTP/1.1 304 Not Modified
ETag: "33a64df551425fcc55e4d42a148795d9"

// Or 200 with new data if changed
HTTP/1.1 200 OK
ETag: "686897696a7c876b7e"
{ ... new data ... }`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Security Best Practices
        </h2>

        <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6 my-6">
          <ul className="space-y-3 text-purple-200/50">
            <li>✅ Always use HTTPS in production</li>
            <li>✅ Implement authentication and authorization</li>
            <li>✅ Validate all input data</li>
            <li>✅ Use rate limiting to prevent abuse</li>
            <li>✅ Implement CORS properly</li>
            <li>✅ Don't expose sensitive data in responses</li>
            <li>✅ Use security headers (HSTS, CSP, etc.)</li>
            <li>✅ Log security events and monitor for anomalies</li>
            <li>❌ Never include passwords or secrets in responses</li>
            <li>❌ Don't trust client-side validation alone</li>
          </ul>
        </div>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Documentation
        </h2>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          OpenAPI/Swagger Documentation
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`openapi: 3.0.0
info:
  title: User API
  version: 1.0.0
  description: API for managing users

paths:
  /users:
    get:
      summary: List all users
      parameters:
        - name: page
          in: query
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
      responses:
        200:
          description: Successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: '#/components/schemas/User'
                  pagination:
                    $ref: '#/components/schemas/Pagination'

components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        email:
          type: string
          format: email`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Conclusion
        </h2>

        <p className="text-purple-200/50 leading-relaxed">
          Building a great REST API requires careful consideration of design patterns, naming conventions,
          error handling, and security. By following these best practices, you'll create APIs that are
          intuitive, maintainable, and scalable. Remember that consistency is key - establish patterns
          early and stick to them throughout your API.
        </p>

        <p className="text-purple-200/50 leading-relaxed mt-4">
          Start small, iterate based on feedback, and always prioritize developer experience. A well-designed
          API is a pleasure to use and will accelerate development for everyone who integrates with it.
        </p>

        <div className="mt-12 p-6 bg-purple-900/20 border border-purple-500/20 rounded-lg">
          <h3 className="text-2xl font-semibold text-purple-100/70 mb-4">
            Test Your APIs Instantly
          </h3>
          <p className="text-purple-200/50 mb-4">
            Use our free API tester to quickly test REST endpoints with custom headers and authentication!
          </p>
          <Link
            href="/tools/api-tester"
            className="inline-block px-6 py-3 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold no-underline"
          >
            Try API Tester →
          </Link>
        </div>
      </div>
    </article>
  );
}
