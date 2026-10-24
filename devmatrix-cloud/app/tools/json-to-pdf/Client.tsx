'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function JsonToPdfClient() {
  const [jsonInput, setJsonInput] = useState('[\n  {"id": 1, "name": "John Doe", "email": "john@example.com", "role": "Admin"},\n  {"id": 2, "name": "Jane Smith", "email": "jane@example.com", "role": "User"}\n]');
  const [title, setTitle] = useState('Report');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    setError(null);
    try {
      const data = JSON.parse(jsonInput);

      if (!Array.isArray(data)) {
        throw new Error('Input must be a JSON array of objects.');
      }

      if (data.length === 0) {
        throw new Error('JSON array is empty.');
      }

      // Get headers from first object keys
      const headers = Object.keys(data[0]);
      const rows = data.map((item: any) => headers.map(key => {
         const val = item[key];
         return typeof val === 'object' ? JSON.stringify(val) : String(val);
      }));

      const doc = new jsPDF({ orientation });

      doc.setFontSize(18);
      doc.text(title, 14, 22);

      doc.setFontSize(10);
      doc.text(`Generated on ${new Date().toLocaleString()}`, 14, 30);

      autoTable(doc, {
        head: [headers],
        body: rows,
        startY: 35,
        theme: 'grid',
        headStyles: { fillColor: [66, 66, 66] },
      });

      doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}.pdf`);

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500 mb-4">
            JSON to PDF Converter
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Transform raw JSON data into professional PDF tables instantly.
          </p>
        </motion.div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Document Title</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-green-500"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Orientation</label>
              <select
                value={orientation}
                onChange={e => setOrientation(e.target.value as any)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-green-500"
              >
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-neutral-400 mb-1">JSON Data (Array of Objects)</label>
            <textarea
              value={jsonInput}
              onChange={e => setJsonInput(e.target.value)}
              className="w-full h-80 bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-green-500 font-mono"
              placeholder='[{"name": "Alice", "age": 30}, ...]'
            />
            {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </div>

          <button
            onClick={handleConvert}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-medium py-3 rounded-md transition-colors flex justify-center items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
            Download PDF
          </button>
        </div>

        <div className="mt-8 text-sm text-neutral-500 text-center">
          <p>Privacy Note: All processing happens in your browser. No data is sent to any server.</p>
        </div>
      </div>
    </div>
  );
}
