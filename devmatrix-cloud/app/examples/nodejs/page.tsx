// app/examples/react/page.tsx
"use client";
import Link from "next/link";
import { useState } from "react";

const examples = [
  {
    id: 1,
    title: "useState Hook Example",
    difficulty: "Easy",
    description: "Basic state management inside functional components",
    code: `import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>The count is: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
}`,
  },
  {
    id: 2,
    title: "Custom Hook Example",
    difficulty: "Medium",
    description: "Reusable custom hook to track window size",
    code: `import { useState, useEffect } from 'react';

function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    function handleResize() {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}`,
  },
  {
    id: 3,
    title: "useEffect Fetch Data",
    difficulty: "Medium",
    description: "Load data on component mount using useEffect",
    code: `import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <ul>
      {users.map(user => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
}`,
  },
];

export default function ReactExamples() {
  const [copied, setCopied] = useState("");

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <Link href="/examples" className="text-green-400">&larr; Back to Examples</Link>
        <h1 className="text-4xl font-bold mt-6 text-green-400 mb-10">React Examples</h1>
        <div className="space-y-12">
          {examples.map((ex) => (
            <div key={ex.id} className="bg-gray-900 p-6 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-semibold text-green-300 mb-2">{ex.title}</h2>
              <p className="text-gray-400 mb-4">{ex.description}</p>
              <pre className="bg-gray-800 p-4 rounded text-sm overflow-x-auto font-mono text-green-200">
                {ex.code}
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(ex.code);
                  setCopied(ex.title);
                  setTimeout(() => setCopied(""), 1500);
                }}
                className="mt-3 bg-green-600 hover:bg-green-700 text-black font-semibold px-4 py-2 rounded"
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
