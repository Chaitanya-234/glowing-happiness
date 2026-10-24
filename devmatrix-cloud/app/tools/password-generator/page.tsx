// app/tools/password-generator/page.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PasswordGeneratorPage() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  const generatePassword = () => {
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') {
      setPassword('Please select at least one character type');
      return;
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(result);
  };

  const getStrength = () => {
    if (length < 8) return { text: 'Weak', color: 'text-red-400' };
    if (length < 12) return { text: 'Medium', color: 'text-yellow-400' };
    if (length < 16) return { text: 'Strong', color: 'text-green-400' };
    return { text: 'Very Strong', color: 'text-green-500' };
  };

  const strength = getStrength();

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60"
        >
          Password Generator
        </motion.h1>
        <p className="text-center text-purple-200/40 mb-12 max-w-2xl mx-auto">
          Generate strong, random passwords with customizable options.
        </p>

        <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-8 mb-6">
          <div className="mb-6">
            <label className="block text-purple-200/60 mb-2 font-semibold">
              Password Length: {length}
            </label>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full h-2 bg-purple-900/30 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-xs text-purple-300/30 mt-1">
              <span>8</span>
              <span>64</span>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-5 h-5 accent-purple-500"
              />
              <span className="text-purple-200/60">Include Uppercase (A-Z)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-5 h-5 accent-purple-500"
              />
              <span className="text-purple-200/60">Include Lowercase (a-z)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-5 h-5 accent-purple-500"
              />
              <span className="text-purple-200/60">Include Numbers (0-9)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-5 h-5 accent-purple-500"
              />
              <span className="text-purple-200/60">Include Symbols (!@#$%)</span>
            </label>
          </div>

          <button
            onClick={generatePassword}
            className="w-full px-8 py-3 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold mb-6"
          >
            Generate Password
          </button>

          {password && (
            <div className="bg-purple-800/20 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-purple-200/60 text-sm">Generated Password:</span>
                <span className={`text-sm font-semibold ${strength.color}`}>{strength.text}</span>
              </div>
              <div className="flex gap-2">
                <code className="flex-1 text-purple-100/80 font-mono text-lg bg-purple-900/30 p-3 rounded break-all">
                  {password}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(password)}
                  className="px-4 py-2 bg-transparent text-purple-200/60 rounded-lg border border-purple-600/20 hover:border-purple-500/40 transition-all whitespace-nowrap"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>

        {/* SEO Content */}
        <div className="mt-16 prose prose-invert prose-purple">
          <h2 className="text-3xl font-bold text-purple-100/70 mb-6">Password Security Tips</h2>
          <ul className="list-disc list-inside text-purple-200/50 space-y-2">
            <li>Use at least 12 characters for strong passwords</li>
            <li>Include a mix of uppercase, lowercase, numbers, and symbols</li>
            <li>Never reuse passwords across different accounts</li>
            <li>Use a password manager to store passwords securely</li>
            <li>Change passwords regularly, especially for sensitive accounts</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
