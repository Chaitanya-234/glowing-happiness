'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Info } from 'lucide-react';

export default function NumberBaseConverterClient() {
  const [values, setValues] = useState({
    binary: '',
    octal: '',
    decimal: '',
    hex: '',
    custom: '',
  });
  const [customBase, setCustomBase] = useState<number>(32);
  const [lastChanged, setLastChanged] = useState<keyof typeof values | 'custom'>('decimal');
  const [copied, setCopied] = useState<string | null>(null);

  // Helper to validate input for a specific base
  const isValidForBase = (value: string, base: number) => {
    if (!value) return true;
    const regex = new RegExp(`^[0-9a-zA-Z]*$`);
    if (!regex.test(value)) return false;

    for (const char of value) {
      const digit = parseInt(char, 36);
      if (isNaN(digit) || digit >= base) return false;
    }
    return true;
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const updateValues = (value: string, fromBase: number, source: keyof typeof values) => {
    if (!isValidForBase(value, fromBase)) return;

    // Handle empty input
    if (value === '') {
      setValues({ binary: '', octal: '', decimal: '', hex: '', custom: '' });
      setLastChanged(source);
      return;
    }

    try {
      // Parse to decimal first. Using parseInt for simplicity.
      // For very large numbers, BigInt would be needed but custom parsing logic is required for arbitrary bases with BigInt.
      const decimalValue = parseInt(value, fromBase);

      if (isNaN(decimalValue)) return;

      setValues({
        binary: decimalValue.toString(2),
        octal: decimalValue.toString(8),
        decimal: decimalValue.toString(10),
        hex: decimalValue.toString(16).toUpperCase(),
        custom: decimalValue.toString(customBase).toUpperCase(),
      });
      setLastChanged(source);
    } catch (error) {
      console.error('Conversion error:', error);
    }
  };

  // Re-calculate custom value when custom base changes
  useEffect(() => {
    if (values.decimal) {
      const decimalValue = parseInt(values.decimal, 10);
      setValues(prev => ({
        ...prev,
        custom: decimalValue.toString(customBase).toUpperCase()
      }));
    }
  }, [customBase]);

  const generateExplanation = () => {
    if (!values.decimal) return null;

    const decimalValue = parseInt(values.decimal, 10);
    const steps = [];

    // If source wasn't decimal, explain Source -> Decimal
    if (lastChanged !== 'decimal' && lastChanged !== 'custom') { // Simplification: treating custom as target for now or just generic
       // Actually 'custom' is also a source.
    }

    // We can show Decimal -> Binary, Decimal -> Hex, etc.
    // Let's just show a breakdown of the Decimal value to the other bases for clarity.

    return (
      <div className="space-y-6 text-slate-300">
        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700/50">
          <h3 className="text-xl font-semibold text-white mb-4">How it works</h3>
          <p className="mb-4">
            The standard way to convert between bases is to first convert the source number to <strong>Decimal (Base 10)</strong>, and then convert that decimal number to the target base.
          </p>

          <div className="space-y-4">
             <div>
                <h4 className="font-medium text-blue-400 mb-2">Decimal Representation</h4>
                <p>Value: <span className="font-mono bg-slate-800 px-2 py-1 rounded text-white">{values.decimal}</span></p>
             </div>

             {values.binary && (
               <div>
                 <h4 className="font-medium text-purple-400 mb-2">Decimal to Binary (Base 2)</h4>
                 <p className="text-sm opacity-80 mb-2">Divide the decimal number by 2 repeatedly and keep track of the remainders.</p>
                 <div className="font-mono text-xs md:text-sm bg-slate-950 p-3 rounded overflow-x-auto">
                    {getDivisionSteps(decimalValue, 2)}
                 </div>
               </div>
             )}

             {values.hex && (
                <div>
                 <h4 className="font-medium text-emerald-400 mb-2">Decimal to Hexadecimal (Base 16)</h4>
                 <p className="text-sm opacity-80 mb-2">Divide by 16 repeatedly. Remainders 10-15 become A-F.</p>
                 <div className="font-mono text-xs md:text-sm bg-slate-950 p-3 rounded overflow-x-auto">
                    {getDivisionSteps(decimalValue, 16)}
                 </div>
               </div>
             )}
          </div>
        </div>
      </div>
    );
  };

  const getDivisionSteps = (num: number, base: number) => {
    let current = num;
    const steps = [];
    if (current === 0) return '0 / ' + base + ' = 0 with remainder 0';

    while (current > 0) {
      const remainder = current % base;
      const quotient = Math.floor(current / base);
      let remainderStr = remainder.toString();
      if (base === 16 && remainder >= 10) {
        remainderStr = `${remainder} (${remainder.toString(16).toUpperCase()})`;
      }
      steps.push(`${current} ÷ ${base} = ${quotient} with remainder ${remainderStr}`);
      current = quotient;
    }
    return steps.join('\n');
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Number Base Converter
          </h1>
          <p className="text-slate-400 text-lg">
            Convert numbers between Binary, Octal, Decimal, Hexadecimal and Custom bases in real-time.
          </p>
        </motion.div>

        <div className="grid gap-6 mb-12">
          {/* Main Converters */}
          <div className="grid md:grid-cols-2 gap-6">
            <BaseInput
              label="Decimal (Base 10)"
              value={values.decimal}
              onChange={(v) => updateValues(v, 10, 'decimal')}
              onCopy={() => handleCopy(values.decimal, 'decimal')}
              copied={copied === 'decimal'}
              placeholder="e.g. 255"
              color="blue"
            />
            <BaseInput
              label="Binary (Base 2)"
              value={values.binary}
              onChange={(v) => updateValues(v, 2, 'binary')}
              onCopy={() => handleCopy(values.binary, 'binary')}
              copied={copied === 'binary'}
              placeholder="e.g. 11111111"
              color="purple"
            />
            <BaseInput
              label="Hexadecimal (Base 16)"
              value={values.hex}
              onChange={(v) => updateValues(v, 16, 'hex')}
              onCopy={() => handleCopy(values.hex, 'hex')}
              copied={copied === 'hex'}
              placeholder="e.g. FF"
              color="emerald"
            />
            <BaseInput
              label="Octal (Base 8)"
              value={values.octal}
              onChange={(v) => updateValues(v, 8, 'octal')}
              onCopy={() => handleCopy(values.octal, 'octal')}
              copied={copied === 'octal'}
              placeholder="e.g. 377"
              color="amber"
            />
          </div>

          {/* Custom Base */}
          <div className="bg-slate-900/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
               <label className="text-slate-300 font-medium flex items-center gap-2">
                 Custom Base
                 <input
                   type="number"
                   min="2"
                   max="36"
                   value={customBase}
                   onChange={(e) => {
                     const val = parseInt(e.target.value);
                     if (val >= 2 && val <= 36) setCustomBase(val);
                   }}
                   className="bg-slate-800 border border-slate-600 rounded px-2 py-1 w-20 text-center text-white focus:ring-2 focus:ring-blue-500 outline-none"
                 />
               </label>
            </div>
            <div className="relative">
              <input
                type="text"
                value={values.custom}
                onChange={(e) => updateValues(e.target.value, customBase, 'custom')}
                className="w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all font-mono"
                placeholder={`Enter Base ${customBase} number...`}
              />
              <button
                onClick={() => handleCopy(values.custom, 'custom')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                title="Copy to clipboard"
              >
                {copied === 'custom' ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Explanation */}
        {values.decimal && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
             {generateExplanation()}
          </motion.div>
        )}
      </div>
    </div>
  );
}

interface BaseInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  onCopy: () => void;
  copied: boolean;
  placeholder: string;
  color: 'blue' | 'purple' | 'emerald' | 'amber';
}

function BaseInput({ label, value, onChange, onCopy, copied, placeholder, color }: BaseInputProps) {
  const colors = {
    blue: 'focus:border-blue-500/50 focus:ring-blue-500/50',
    purple: 'focus:border-purple-500/50 focus:ring-purple-500/50',
    emerald: 'focus:border-emerald-500/50 focus:ring-emerald-500/50',
    amber: 'focus:border-amber-500/50 focus:ring-amber-500/50',
  };

  // Generate a unique ID based on the label (sanitized)
  const id = label.toLowerCase().replace(/[^a-z0-9]/g, '-');

  return (
    <div className="bg-slate-900/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm relative group">
      <label htmlFor={id} className="block text-slate-300 text-sm font-medium mb-2">{label}</label>
      <div className="relative">
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full bg-slate-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all font-mono ${colors[color]}`}
          placeholder={placeholder}
        />
        <button
          onClick={onCopy}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
          title="Copy to clipboard"
        >
          {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
        </button>
      </div>
    </div>
  );
}
