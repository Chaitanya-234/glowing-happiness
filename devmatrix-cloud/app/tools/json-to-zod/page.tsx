// app/tools/json-to-zod/page.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function JsonToZodPage() {
  const [jsonInput, setJsonInput] = useState('{\n  "name": "John Doe",\n  "age": 30,\n  "email": "john@example.com",\n  "isAdmin": false\n}');
  const [zodOutput, setZodOutput] = useState('');
  const [error, setError] = useState('');

  const generateZodSchema = (obj: unknown, indent = ''): string => {
    if (obj === null) return 'z.null()';
    if (Array.isArray(obj)) {
      if (obj.length === 0) return 'z.array(z.unknown())';
      const itemSchema = generateZodSchema(obj[0], indent);
      return `z.array(${itemSchema})`;
    }
    if (typeof obj === 'object') {
      const typedObj = obj as Record<string, unknown>;
      const keys = Object.keys(typedObj);
      if (keys.length === 0) return 'z.object({})';
      const props = keys.map(key => {
        return `${indent}  ${key}: ${generateZodSchema(typedObj[key], indent + '  ')}`;
      }).join(',\n');
      return `z.object({\n${props}\n${indent}})`;
    }
    if (typeof obj === 'string') return 'z.string()';
    if (typeof obj === 'number') return 'z.number()';
    if (typeof obj === 'boolean') return 'z.boolean()';
    return 'z.unknown()';
  };

  const handleConvert = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      const schema = `import { z } from 'zod';\n\nconst Schema = ${generateZodSchema(parsed)};\n\ntype SchemaType = z.infer<typeof Schema>;`;
      setZodOutput(schema);
      setError('');
    } catch {
      setError('Invalid JSON');
      setZodOutput('');
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60"
        >
          JSON to Zod Converter
        </motion.h1>
        <p className="text-center text-purple-200/40 mb-12 max-w-2xl mx-auto">
          Instantly generate Zod validation schemas from JSON objects.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input */}
          <div className="flex flex-col h-[600px]">
            <label className="text-purple-200/60 mb-2 font-semibold">JSON Input</label>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="flex-1 w-full p-4 bg-purple-900/10 text-purple-100/80 rounded-xl border border-purple-500/20 focus:border-purple-400/40 focus:outline-none font-mono text-sm resize-none"
              placeholder="Paste JSON here..."
            />
            {error && <p className="text-red-400 mt-2">{error}</p>}
            <button
              onClick={handleConvert}
              className="mt-4 px-6 py-3 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold"
            >
              Convert to Zod
            </button>
          </div>

          {/* Output */}
          <div className="flex flex-col h-[600px]">
             <div className="flex justify-between items-center mb-2">
                <label className="text-purple-200/60 font-semibold">Zod Schema</label>
                <button
                   onClick={() => navigator.clipboard.writeText(zodOutput)}
                   disabled={!zodOutput}
                   className="text-xs px-3 py-1 bg-purple-600/20 text-purple-200/80 rounded border border-purple-500/30 hover:bg-purple-500/30 transition-all disabled:opacity-50"
                >
                   Copy
                </button>
             </div>
            <pre className="flex-1 w-full p-4 bg-black/40 text-purple-100/80 rounded-xl border border-purple-500/20 overflow-auto font-mono text-sm">
              {zodOutput || '// Zod schema will appear here...'}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
