// app/tools/lorem-ipsum-generator/LoremIpsumGeneratorClient.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const LOREM_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`;

export default function LoremIpsumGeneratorClient() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [output, setOutput] = useState('');

  const generateLorem = () => {
    let result = '';
    const sentences = LOREM_TEXT.split('. ').map(s => s.trim().replace(/\.$/, ''));
    const words = LOREM_TEXT.replace(/[.,]/g, '').split(' ');

    if (type === 'paragraphs') {
        let paragraphs = [];
        for (let i = 0; i < count; i++) {
           // Shuffle sentences to create random paragraphs
           const shuffled = [...sentences].sort(() => 0.5 - Math.random());
           const paraLength = Math.floor(Math.random() * 5) + 3; // 3-7 sentences
           let para = shuffled.slice(0, paraLength).join('. ') + '.';
           paragraphs.push(para);
        }
        result = paragraphs.join('\n\n');
    } else if (type === 'sentences') {
        const shuffled = [...sentences].sort(() => 0.5 - Math.random());
        result = shuffled.slice(0, count).join('. ') + '.';
    } else if (type === 'words') {
         const shuffled = [...words].sort(() => 0.5 - Math.random());
         result = shuffled.slice(0, count).join(' ');
    }

    if (startWithLorem && type === 'paragraphs') {
       // Ensure first paragraph starts with standard text if requested
       if (!result.startsWith('Lorem ipsum')) {
           // Basic logic to prepend or replace
           result = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. " + result;
       }
    }

    setOutput(result);
  };

  // Generate on mount or change
  useState(() => {
     generateLorem();
  });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60"
      >
        Lorem Ipsum Generator
      </motion.h1>
      <p className="text-center text-purple-200/40 mb-12 max-w-2xl mx-auto">
        Generate placeholder text for your mockups and designs.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {/* Controls */}
        <div className="lg:col-span-1 bg-purple-900/10 rounded-xl border border-purple-500/20 p-6 space-y-6 h-fit">
           <div>
              <label className="block text-purple-200/60 mb-2 font-semibold">Generate</label>
              <div className="flex gap-2 mb-4">
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={count}
                    onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 bg-purple-900/20 text-purple-100/80 border border-purple-500/20 rounded px-3 py-2 focus:outline-none focus:border-purple-400/40"
                  />
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="flex-1 bg-purple-900/20 text-purple-100/80 border border-purple-500/20 rounded px-3 py-2 focus:outline-none focus:border-purple-400/40"
                  >
                      <option value="paragraphs">Paragraphs</option>
                      <option value="sentences">Sentences</option>
                      <option value="words">Words</option>
                  </select>
              </div>
           </div>

           <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="startLorem"
                checked={startWithLorem}
                onChange={(e) => setStartWithLorem(e.target.checked)}
                className="w-5 h-5 accent-purple-500 rounded border-gray-300"
              />
              <label htmlFor="startLorem" className="text-purple-200/60 cursor-pointer select-none">Start with "Lorem ipsum..."</label>
           </div>

           <button
              onClick={generateLorem}
              className="w-full px-8 py-3 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold"
            >
              Generate
            </button>
        </div>

        {/* Output */}
        <div className="lg:col-span-2">
           <div className="relative">
              <textarea
                value={output}
                readOnly
                className="w-full h-96 bg-purple-900/10 text-purple-100/80 p-6 rounded-xl border border-purple-500/20 focus:outline-none resize-none leading-relaxed text-lg shadow-inner"
              />
              <button
                onClick={copyToClipboard}
                className="absolute top-4 right-4 px-4 py-2 bg-purple-900/80 text-purple-200/80 rounded border border-purple-500/30 hover:bg-purple-800 transition-all text-sm font-semibold backdrop-blur-sm"
              >
                Copy Text
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
