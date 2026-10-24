// app/examples/nodejs/page.tsx
"use client";
import Link from "next/link";
import { useState } from "react";

const examples = [
  {
    id: 1,
    title: "Express Basic Server",
    difficulty: "Easy",
    description: "Create a simple Express server",
    code: `const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.listen(PORT, () => {
  console.log(\`Server running at http://localhost:\${PORT}\`);
});`,
  },
  {
    id: 2,
    title: "Middleware Usage",
    difficulty: "Medium",
    description: "Example of logging middleware",
    code: `app.use((req, res, next) => {
  console.log(\`\${req.method} \${req.url}\`);
  next();
});`,
  },
  {
    id: 3,
    title: "JWT Authentication Middleware",
    difficulty: "Advanced",
    description: "Protect routes with JWT verification",
    code: `const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Access denied');

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
}

app.get('/protected', authMiddleware, (req, res) => {
  res.send('This is a protected route');
});`,
  },
];

export default function NodejsExamples() {
  const [copied, setCopied] = useState("");

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <Link href="/examples" className="text-indigo-400">&larr; Back to Examples</Link>
        <h1 className="text-4xl font-bold mt-6 text-indigo-400 mb-10">Node.js Examples</h1>
        <div className="space-y-12">
          {examples.map((ex) => (
            <div key={ex.id} className="bg-gray-900 p-6 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-semibold text-indigo-300 mb-2">{ex.title}</h2>
              <p className="text-gray-400 mb-4">{ex.description}</p>
              <pre className="bg-gray-800 p-4 rounded text-sm overflow-x-auto font-mono text-indigo-200">
                {ex.code}
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(ex.code);
                  setCopied(ex.title);
                  setTimeout(() => setCopied(""), 1500);
                }}
                className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-black font-semibold px-4 py-2 rounded"
              >
                {copied === ex.title ? "Copied!" : "Copy Code"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
