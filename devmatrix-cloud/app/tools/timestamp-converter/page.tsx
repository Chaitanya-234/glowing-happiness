// app/tools/timestamp-converter/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function TimestampConverterPage() {
  const [timestamp, setTimestamp] = useState('');
  const [datetime, setDatetime] = useState('');
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timestampToDate = () => {
    try {
      const ts = parseInt(timestamp);
      const date = new Date(ts * 1000); // Assuming seconds
      setDatetime(date.toISOString());
    } catch (error) {
      setDatetime('Invalid timestamp');
    }
  };

  const dateToTimestamp = () => {
    try {
      const date = new Date(datetime);
      const ts = Math.floor(date.getTime() / 1000);
      setTimestamp(ts.toString());
    } catch (error) {
      setTimestamp('Invalid date');
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60"
        >
          Timestamp Converter
        </motion.h1>
        <p className="text-center text-purple-200/40 mb-12 max-w-2xl mx-auto">
          Convert between Unix timestamps and human-readable dates.
        </p>

        {/* Current Time */}
        <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-purple-100/70 mb-4">Current Time:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-purple-200/50 text-sm">Unix Timestamp:</span>
              <code className="block text-purple-100/80 font-mono text-lg mt-1">
                {Math.floor(currentTime / 1000)}
              </code>
            </div>
            <div>
              <span className="text-purple-200/50 text-sm">ISO 8601:</span>
              <code className="block text-purple-100/80 font-mono text-lg mt-1">
                {new Date(currentTime).toISOString()}
              </code>
            </div>
          </div>
        </div>

        {/* Converters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Timestamp to Date */}
          <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-100/70 mb-4">Timestamp to Date</h3>
            <input
              type="text"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              className="w-full px-4 py-2 bg-purple-900/10 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none font-mono mb-3"
              placeholder="1730000000"
            />
            <button
              onClick={timestampToDate}
              className="w-full px-6 py-2 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold mb-3"
            >
              Convert
            </button>
            {datetime && (
              <div className="bg-purple-800/20 p-3 rounded">
                <code className="text-purple-100/80 font-mono text-sm">{datetime}</code>
              </div>
            )}
          </div>

          {/* Date to Timestamp */}
          <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-purple-100/70 mb-4">Date to Timestamp</h3>
            <input
              type="datetime-local"
              value={datetime.slice(0, 16)}
              onChange={(e) => setDatetime(e.target.value)}
              className="w-full px-4 py-2 bg-purple-900/10 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none mb-3"
            />
            <button
              onClick={dateToTimestamp}
              className="w-full px-6 py-2 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold mb-3"
            >
              Convert
            </button>
            {timestamp && (
              <div className="bg-purple-800/20 p-3 rounded">
                <code className="text-purple-100/80 font-mono text-sm">{timestamp}</code>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
