'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import JSZip from 'jszip';
import { generateStructuredContent } from '@/app/actions/gemini-structured';
import {
  Loader2,
  Code2,
  Database,
  Layout,
  Settings,
  Plus,
  Trash2,
  FileCode,
  Check,
  Copy,
  Download,
  AlertCircle
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

type Field = {
  id: string;
  name: string;
  type: string;
  required: boolean;
  unique: boolean;
  description: string;
};

type Config = {
  backend: string;
  frontend: string;
  database: string;
  validation: string;
  auth: boolean;
  softDelete: boolean;
};

type GeneratedFile = {
  path: string;
  content: string;
  description: string;
  type: 'backend' | 'frontend' | 'test' | 'config' | 'other';
};

type Result = {
  files: GeneratedFile[];
  summary: string;
  instructions: string;
};

const FIELD_TYPES = [
  'string', 'number', 'boolean', 'Date', 'UUID', 'Email', 'JSON', 'Enum'
];

const FRAMEWORKS = {
  backend: ['Next.js API Routes', 'Express.js', 'NestJS', 'Fastify', 'tRPC'],
  frontend: ['React', 'Next.js App Router', 'Vue.js', 'Svelte', 'Angular'],
  database: ['Prisma', 'TypeORM', 'Mongoose', 'Drizzle', 'Raw SQL'],
  validation: ['Zod', 'Yup', 'Joi', 'class-validator']
};

const SYSTEM_PROMPT = `
You are an expert full-stack developer who generates complete, production-ready CRUD operations from data model schemas. Your code follows best practices, includes proper error handling, validation, and is well-documented.

CORE RESPONSIBILITIES:
Generate complete CRUD (Create, Read, Update, Delete) operations including:
1. Backend API endpoints (REST or GraphQL)
2. Database queries/ORM models
3. Frontend forms and UI components
4. Validation schemas (client and server-side)
5. Unit tests for all operations
6. TypeScript types/interfaces
7. Error handling
8. Authentication/authorization (if specified)

ANALYSIS REQUIREMENTS:

1. DATA MODEL PARSING
   Understand the provided schema including:
   - Field names and types (string, number, boolean, date, etc.)
   - Required vs optional fields
   - Field constraints (min, max, pattern, enum, etc.)
   - Relationships (one-to-one, one-to-many, many-to-many)
   - Unique constraints
   - Default values
   - Indexes needed

2. FRAMEWORK DETECTION
   Support multiple frameworks:
   - Backend: Express, Next.js API Routes, Fastify, NestJS, tRPC
   - Frontend: React, Next.js, Vue, Svelte
   - Database: Prisma, TypeORM, Mongoose, Drizzle, SQL
   - Validation: Zod, Yup, Joi, class-validator

3. CODE GENERATION STRUCTURE

   For each CRUD operation, generate:

   A. CREATE OPERATION
   Backend:
   - POST endpoint/resolver
   - Input validation
   - Database insert query
   - Success/error responses
   - Generate unique IDs (UUID/auto-increment)

   Frontend:
   - Create form component
   - Form state management
   - Client-side validation
   - Submit handler with loading states
   - Error display
   - Success feedback

   Tests:
   - Valid input test
   - Invalid input tests (missing required, wrong type, etc.)
   - Duplicate entry test (if unique constraints)
   - Database error handling

   B. READ OPERATION
   Backend:
   - GET all endpoint (with pagination, filtering, sorting)
   - GET by ID endpoint
   - Query optimization (select only needed fields)
   - Not found handling

   Frontend:
   - List/table component with data display
   - Pagination controls
   - Search/filter UI
   - Sorting controls
   - Loading states
   - Empty state

   Tests:
   - Fetch all records test
   - Fetch by ID test (exists and not exists)
   - Pagination test
   - Filter/search tests

   C. UPDATE OPERATION
   Backend:
   - PUT/PATCH endpoint
   - Partial update support
   - Optimistic locking (version checking)
   - Not found handling
   - Validation before update

   Frontend:
   - Edit form (pre-filled with existing data)
   - Dirty state tracking
   - Cancel/reset functionality
   - Confirmation dialog

   Tests:
   - Full update test
   - Partial update test
   - Non-existent record test
   - Concurrent update test

   D. DELETE OPERATION
   Backend:
   - DELETE endpoint
   - Soft delete vs hard delete (based on config)
   - Cascade delete for relationships
   - Not found handling

   Frontend:
   - Delete button with confirmation
   - Undo functionality (for soft delete)
   - Loading state during deletion

   Tests:
   - Delete existing record
   - Delete non-existent record
   - Cascade delete test

4. VALIDATION GENERATION

   Generate comprehensive validation:
   - Required field validation
   - Type validation (string, number, email, URL, etc.)
   - Length constraints (min/max)
   - Pattern validation (regex)
   - Custom business rules
   - Cross-field validation
   - Unique constraints
   - Foreign key validation

5. RELATIONSHIPS HANDLING

   For relationships, generate:
   - Foreign key constraints
   - Cascade rules
   - Join queries
   - Nested create/update operations
   - Population/eager loading options

6. AUTHENTICATION & AUTHORIZATION (if enabled)

   Include:
   - JWT token validation
   - User ownership checks
   - Role-based access control
   - Protected routes/endpoints
   - Permission checks in queries

7. CODE QUALITY STANDARDS

   All generated code must:
   - Follow language/framework conventions
   - Include TypeScript types everywhere
   - Have proper error handling (try-catch)
   - Use async/await (not callbacks)
   - Include JSDoc comments
   - Follow naming conventions (camelCase, PascalCase, etc.)
   - Be formatted properly (proper indentation)
   - Include TODO comments for customization points

IMPORTANT RULES:

1. Generate COMPLETE, working code - no placeholders like "// Add your logic here"
2. Include ALL CRUD operations (Create, Read, Update, Delete)
3. Follow the selected framework's conventions exactly
4. Include proper TypeScript types throughout
5. Add error handling for all database operations
6. Include loading and error states in frontend components
7. Generate realistic validation rules based on field types
8. Add helpful comments explaining non-obvious code
9. Include TODO comments only for business-specific customization
10. Make code production-ready, not just a skeleton
11. Follow REST API conventions (proper HTTP methods and status codes)
12. Include pagination for list operations (limit 20 by default)
13. Add indexes for frequently queried fields
14. Use transactions for multi-step operations
15. Include soft delete timestamps (deletedAt) if soft delete is enabled
`;

export default function CrudGeneratorClient() {
  const [activeTab, setActiveTab] = useState<'schema' | 'config' | 'results'>('schema');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const [schema, setSchema] = useState<Field[]>([
    { id: '1', name: 'title', type: 'string', required: true, unique: false, description: 'The title of the item' },
    { id: '2', name: 'description', type: 'string', required: false, unique: false, description: 'Detailed description' },
    { id: '3', name: 'price', type: 'number', required: true, unique: false, description: 'Price in USD' },
  ]);

  const [config, setConfig] = useState<Config>({
    backend: 'Next.js API Routes',
    frontend: 'React',
    database: 'Prisma',
    validation: 'Zod',
    auth: false,
    softDelete: false,
  });

  const addField = () => {
    setSchema([...schema, {
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      type: 'string',
      required: false,
      unique: false,
      description: ''
    }]);
  };

  const removeField = (id: string) => {
    setSchema(schema.filter(f => f.id !== id));
  };

  const updateField = (id: string, updates: Partial<Field>) => {
    setSchema(schema.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Validate schema
      if (schema.length === 0) {
        throw new Error('Please add at least one field to the schema.');
      }
      if (schema.some(f => !f.name)) {
        throw new Error('All fields must have a name.');
      }

      const prompt = `
${SYSTEM_PROMPT}

DATA MODEL SCHEMA:
${JSON.stringify(schema, null, 2)}

CONFIGURATION:
${JSON.stringify(config, null, 2)}
      `;

      const data = await generateStructuredContent(prompt, 'crud_generator');
      setResult(data as Result);
      setActiveTab('results');
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An error occurred during generation');
    } finally {
      setLoading(false);
    }
  };

  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  const copyToClipboard = (content: string, path: string) => {
    navigator.clipboard.writeText(content);
    setCopiedFile(path);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const handleDownloadZip = async () => {
    if (!result) return;

    const zip = new JSZip();
    result.files.forEach(file => {
      zip.file(file.path, file.content);
    });

    const blob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'crud-starter.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 mb-4"
          >
            <Code2 className="w-10 h-10 text-indigo-400" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
            AI CRUD Generator
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Instantly generate production-ready backend and frontend code for your data models.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Panel - Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
              <div className="flex gap-2 mb-6 bg-black/40 p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab('schema')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${
                    activeTab === 'schema'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Schema
                </button>
                <button
                  onClick={() => setActiveTab('config')}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-bold transition-all ${
                    activeTab === 'config'
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Config
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'schema' ? (
                  <motion.div
                    key="schema"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                      {schema.map((field) => (
                        <div key={field.id} className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <input
                              type="text"
                              value={field.name}
                              onChange={(e) => updateField(field.id, { name: e.target.value })}
                              placeholder="Field Name"
                              className="bg-transparent border-b border-white/20 text-white font-mono text-sm focus:border-indigo-500 outline-none w-full"
                            />
                            <button
                              onClick={() => removeField(field.id)}
                              className="text-gray-500 hover:text-red-400 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <select
                              value={field.type}
                              onChange={(e) => updateField(field.id, { type: e.target.value })}
                              className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-gray-300 outline-none focus:border-indigo-500"
                            >
                              {FIELD_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>

                            <div className="flex items-center gap-2">
                              <label className="flex items-center gap-1 text-xs text-gray-400 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={field.required}
                                  onChange={(e) => updateField(field.id, { required: e.target.checked })}
                                  className="rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-500"
                                />
                                Req
                              </label>
                              <label className="flex items-center gap-1 text-xs text-gray-400 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={field.unique}
                                  onChange={(e) => updateField(field.id, { unique: e.target.checked })}
                                  className="rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-500"
                                />
                                Unq
                              </label>
                            </div>
                          </div>

                          <input
                            type="text"
                            value={field.description}
                            onChange={(e) => updateField(field.id, { description: e.target.value })}
                            placeholder="Description..."
                            className="w-full bg-transparent text-xs text-gray-500 border-none outline-none focus:text-gray-300"
                          />
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={addField}
                      className="w-full py-3 rounded-xl border border-dashed border-white/20 text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      <Plus className="w-4 h-4" /> Add Field
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="config"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-6"
                  >
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                          <Database className="w-4 h-4 text-indigo-400" /> Backend Framework
                        </label>
                        <select
                          value={config.backend}
                          onChange={(e) => setConfig({ ...config, backend: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-indigo-500"
                        >
                          {FRAMEWORKS.backend.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                          <Layout className="w-4 h-4 text-pink-400" /> Frontend Framework
                        </label>
                        <select
                          value={config.frontend}
                          onChange={(e) => setConfig({ ...config, frontend: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-indigo-500"
                        >
                          {FRAMEWORKS.frontend.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                          <Database className="w-4 h-4 text-green-400" /> Database / ORM
                        </label>
                        <select
                          value={config.database}
                          onChange={(e) => setConfig({ ...config, database: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-indigo-500"
                        >
                          {FRAMEWORKS.database.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                          <Check className="w-4 h-4 text-yellow-400" /> Validation Library
                        </label>
                        <select
                          value={config.validation}
                          onChange={(e) => setConfig({ ...config, validation: e.target.value })}
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-indigo-500"
                        >
                          {FRAMEWORKS.validation.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                      </div>

                      <div className="pt-4 space-y-3">
                        <label className="flex items-center gap-3 p-3 rounded-xl bg-black/20 cursor-pointer hover:bg-black/40 transition-colors">
                          <input
                            type="checkbox"
                            checked={config.auth}
                            onChange={(e) => setConfig({ ...config, auth: e.target.checked })}
                            className="rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-500"
                          />
                          <span className="text-sm text-gray-300">Include Authentication Checks</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 rounded-xl bg-black/20 cursor-pointer hover:bg-black/40 transition-colors">
                          <input
                            type="checkbox"
                            checked={config.softDelete}
                            onChange={(e) => setConfig({ ...config, softDelete: e.target.checked })}
                            className="rounded border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-500"
                          />
                          <span className="text-sm text-gray-300">Use Soft Deletes</span>
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-8">
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 font-bold hover:shadow-lg hover:shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Generating Code...
                    </>
                  ) : (
                    <>
                      <Code2 className="w-5 h-5" /> Generate CRUD
                    </>
                  )}
                </button>
                {error && (
                  <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    {error}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Results */}
          <div className="lg:col-span-2">
            <AnimatePresence>
              {result ? (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                     <div className="flex items-center justify-between mb-4">
                       <h2 className="text-2xl font-bold text-white">Generated Files</h2>
                       <button
                          onClick={handleDownloadZip}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-bold transition-all text-sm"
                       >
                          <Download className="w-4 h-4" /> Download ZIP
                       </button>
                     </div>
                     <p className="text-gray-400 text-sm mb-6">{result.summary}</p>

                     <div className="space-y-8">
                        {result.files.map((file, idx) => (
                          <div key={idx} className="border border-white/10 rounded-xl overflow-hidden bg-black/40">
                            <div className="flex items-center justify-between p-3 bg-white/5 border-b border-white/5">
                              <div className="flex items-center gap-2">
                                <FileCode className="w-4 h-4 text-indigo-400" />
                                <span className="font-mono text-sm text-gray-200">{file.path}</span>
                              </div>
                              <button
                                onClick={() => copyToClipboard(file.content, file.path)}
                                className="p-2 rounded hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
                                title="Copy code"
                              >
                                {copiedFile === file.path ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                              </button>
                            </div>
                            <div className="relative">
                              <SyntaxHighlighter
                                language={file.path.endsWith('.ts') || file.path.endsWith('.tsx') ? 'typescript' : 'javascript'}
                                style={vscDarkPlus}
                                customStyle={{
                                  margin: 0,
                                  borderRadius: 0,
                                  background: 'transparent',
                                  fontSize: '0.9rem',
                                  padding: '1.5rem',
                                }}
                              >
                                {file.content}
                              </SyntaxHighlighter>
                            </div>
                            <div className="p-3 bg-white/5 border-t border-white/5 text-xs text-gray-500">
                              {file.description}
                            </div>
                          </div>
                        ))}
                     </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full min-h-[500px] flex items-center justify-center border-2 border-dashed border-white/10 rounded-3xl text-gray-600 bg-white/5 backdrop-blur-md">
                  <div className="text-center space-y-4 max-w-sm px-6">
                    <Settings className="w-16 h-16 mx-auto opacity-20" />
                    <h3 className="text-xl font-bold text-gray-400">Ready to Generate</h3>
                    <p className="text-sm">
                      Define your schema on the left, check the configuration, and hit Generate to build your CRUD app.
                    </p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
