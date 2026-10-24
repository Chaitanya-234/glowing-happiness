// app/tools/cron-generator/page.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function CronGeneratorPage() {
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [dayOfMonth, setDayOfMonth] = useState('*');
  const [month, setMonth] = useState('*');
  const [dayOfWeek, setDayOfWeek] = useState('*');
  const [cronExpression, setCronExpression] = useState('* * * * *');
  const [description, setDescription] = useState('');

  const generateCron = () => {
    const expression = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
    setCronExpression(expression);
    setDescription(getCronDescription(expression));
  };

  const getCronDescription = (expr: string) => {
    const parts = expr.split(' ');
    const [min, hr, dom, mon, dow] = parts;

    let desc = 'Runs ';

    if (min === '*' && hr === '*' && dom === '*' && mon === '*' && dow === '*') {
      return 'Every minute';
    }

    if (min !== '*') desc += `at minute ${min} `;
    if (hr !== '*') desc += `at hour ${hr} `;
    if (dom !== '*') desc += `on day ${dom} of the month `;
    if (mon !== '*') desc += `in month ${mon} `;
    if (dow !== '*') desc += `on day ${dow} of the week `;

    return desc || 'Custom schedule';
  };

  const commonExpressions = [
    { name: 'Every minute', expr: '* * * * *' },
    { name: 'Every hour', expr: '0 * * * *' },
    { name: 'Every day at midnight', expr: '0 0 * * *' },
    { name: 'Every week (Sunday)', expr: '0 0 * * 0' },
    { name: 'Every month (1st)', expr: '0 0 1 * *' },
    { name: 'Every weekday at 9 AM', expr: '0 9 * * 1-5' },
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60"
        >
          Cron Expression Generator
        </motion.h1>
        <p className="text-center text-purple-200/40 mb-12 max-w-2xl mx-auto">
          Generate cron expressions visually with human-readable descriptions.
        </p>

        {/* Cron Builder */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div>
            <label className="block text-purple-200/60 mb-2 font-semibold text-sm">Minute (0-59)</label>
            <input
              type="text"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="w-full px-4 py-3 bg-purple-900/10 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none font-mono text-center"
              placeholder="*"
            />
          </div>
          <div>
            <label className="block text-purple-200/60 mb-2 font-semibold text-sm">Hour (0-23)</label>
            <input
              type="text"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="w-full px-4 py-3 bg-purple-900/10 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none font-mono text-center"
              placeholder="*"
            />
          </div>
          <div>
            <label className="block text-purple-200/60 mb-2 font-semibold text-sm">Day (1-31)</label>
            <input
              type="text"
              value={dayOfMonth}
              onChange={(e) => setDayOfMonth(e.target.value)}
              className="w-full px-4 py-3 bg-purple-900/10 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none font-mono text-center"
              placeholder="*"
            />
          </div>
          <div>
            <label className="block text-purple-200/60 mb-2 font-semibold text-sm">Month (1-12)</label>
            <input
              type="text"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full px-4 py-3 bg-purple-900/10 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none font-mono text-center"
              placeholder="*"
            />
          </div>
          <div>
            <label className="block text-purple-200/60 mb-2 font-semibold text-sm">Weekday (0-6)</label>
            <input
              type="text"
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(e.target.value)}
              className="w-full px-4 py-3 bg-purple-900/10 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none font-mono text-center"
              placeholder="*"
            />
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={generateCron}
            className="px-8 py-3 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold"
          >
            Generate Expression
          </button>
        </div>

        {/* Result */}
        {cronExpression && (
          <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-purple-100/70 mb-4">Generated Cron Expression:</h3>
            <div className="bg-purple-800/20 px-6 py-4 rounded-lg mb-4">
              <code className="text-2xl text-purple-100/90 font-mono">{cronExpression}</code>
            </div>
            <p className="text-purple-200/60">{description}</p>
            <button
              onClick={() => navigator.clipboard.writeText(cronExpression)}
              className="mt-4 px-6 py-2 bg-transparent text-purple-200/60 rounded-lg border border-purple-600/20 hover:border-purple-500/40 transition-all"
            >
              Copy Expression
            </button>
          </div>
        )}

        {/* Common Expressions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-purple-100/70 mb-4">Common Expressions:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {commonExpressions.map((item) => (
              <div
                key={item.name}
                onClick={() => {
                  const parts = item.expr.split(' ');
                  setMinute(parts[0]);
                  setHour(parts[1]);
                  setDayOfMonth(parts[2]);
                  setMonth(parts[3]);
                  setDayOfWeek(parts[4]);
                  setCronExpression(item.expr);
                  setDescription(getCronDescription(item.expr));
                }}
                className="p-4 bg-purple-900/10 border border-purple-500/20 rounded-lg hover:bg-purple-800/20 hover:border-purple-400/40 transition-all cursor-pointer"
              >
                <div className="font-semibold text-purple-100/80 mb-2">{item.name}</div>
                <code className="text-sm text-purple-200/60">{item.expr}</code>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-4xl mx-auto prose prose-invert prose-purple">
          <h2 className="text-3xl font-bold text-purple-100/70 mb-6">About Cron Expressions</h2>
          <p className="text-purple-200/50 leading-relaxed mb-4">
            Cron is a time-based job scheduler in Unix-like operating systems. A cron expression
            is a string of five fields separated by spaces that specify when to execute a command
            or script.
          </p>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">Cron Syntax</h3>
          <p className="text-purple-200/50 leading-relaxed">
            Format: <code>minute hour day month weekday</code>
          </p>
          <ul className="list-disc list-inside text-purple-200/40 space-y-2">
            <li><strong>*</strong> - Any value</li>
            <li><strong>,</strong> - Value list separator (e.g., 1,3,5)</li>
            <li><strong>-</strong> - Range of values (e.g., 1-5)</li>
            <li><strong>/</strong> - Step values (e.g., */5 = every 5)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
