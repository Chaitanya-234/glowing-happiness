"use client";
import Link from "next/link";
import { useState } from "react";

const examples = [
  {
    id: 1,
    title: "Generics Example",
    difficulty: "Medium",
    description: "Create reusable generic functions",
    code: `function identity<T>(arg: T): T {
  return arg;
}

const str = identity<string>("Hello");
const num = identity<number>(42);`,
  },
  {
    id: 2,
    title: "Utility Types",
    difficulty: "Medium",
    description: "Use built-in TypeScript utility types",
    code: `interface User {
  id: number;
  name: string;
  age?: number;
}

type UserPreview = Pick<User, "id" | "name">;
type UserOptional = Partial<User>;
type UserRequired = Required<User>;`,
  },
  {
    id: 3,
    title: "Decorators",
    difficulty: "Advanced",
    description: "Add behavior to classes or properties",
    code: `function Log(target: any, propertyKey: string) {
  let value = target[propertyKey];

  const getter = () => {
    console.log("Get:", propertyKey);
    return value;
  }

  const setter = (newVal: any) => {
    console.log("Set:", propertyKey, newVal);
    value = newVal;
  }

  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true
  });
}

class Person {
  @Log
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const p = new Person("Alice");
p.name = "Bob";`,
  },
];

export default function TypeScriptExamples() {
  const [copied, setCopied] = useState("");

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <Link href="/examples" className="text-blue-400">&larr; Back to Examples</Link>
        <h1 className="text-4xl font-bold mt-6 text-blue-400 mb-10">TypeScript Examples</h1>
        <div className="space-y-12">
          {examples.map((ex) => (
            <div key={ex.id} className="bg-gray-900 p-6 rounded-lg border border-gray-700">
              <h2 className="text-2xl font-semibold text-blue-300 mb-2">{ex.title}</h2>
              <p className="text-gray-400 mb-4">{ex.description}</p>
              <pre className="bg-gray-800 p-4 rounded text-sm overflow-x-auto font-mono text-blue-200">
                {ex.code}
              </pre>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(ex.code);
                  setCopied(ex.title);
                  setTimeout(() => setCopied(""), 1500);
                }}
                className="mt-3 bg-blue-600 hover:bg-blue-700 text-black font-semibold px-4 py-2 rounded"
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
