'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';

export default function ApiRequestToPdfClient() {
  const [method, setMethod] = useState('POST');
  const [url, setUrl] = useState('https://api.example.com/v1/users');
  const [reqHeaders, setReqHeaders] = useState('Content-Type: application/json\nAuthorization: Bearer *****');
  const [reqBody, setReqBody] = useState('{\n  "name": "John Doe",\n  "email": "john@example.com"\n}');

  const [status, setStatus] = useState('201 Created');
  const [resHeaders, setResHeaders] = useState('Content-Type: application/json\nX-Request-ID: req_123');
  const [resBody, setResBody] = useState('{\n  "id": "usr_999",\n  "created_at": "2023-10-01T12:00:00Z"\n}');

  const [maskSensitive, setMaskSensitive] = useState(true);

  const generatePdf = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let y = 20;

    // Helper for adding section
    const addSection = (title: string, content: string, color: [number, number, number] = [0, 0, 0]) => {
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.setFont('helvetica', 'bold');
      doc.text(title, margin, y);
      y += 6;

      doc.setFontSize(10);
      doc.setFont('courier', 'normal');
      doc.setTextColor(color[0], color[1], color[2]);

      const splitText = doc.splitTextToSize(content, pageWidth - (margin * 2));
      doc.text(splitText, margin, y);
      y += (splitText.length * 4) + 8;

      // Page break check (simple)
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    };

    // Title
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('API Request Audit Log', margin, y);
    y += 10;

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Generated: ${new Date().toLocaleString()}`, margin, y);
    y += 15;

    // Request
    doc.setFillColor(240, 240, 240);
    doc.rect(margin, y - 5, pageWidth - (margin * 2), 8, 'F');
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`REQUEST: ${method} ${url}`, margin + 2, y);
    y += 10;

    addSection('Request Headers', maskSensitive ? maskData(reqHeaders) : reqHeaders);
    addSection('Request Body', maskSensitive ? maskData(reqBody) : reqBody);

    y += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, pageWidth - margin, y);
    y += 10;

    // Response
    doc.setFillColor(status.startsWith('2') ? 220 : 255, status.startsWith('2') ? 255 : 220, status.startsWith('2') ? 220 : 220);
    doc.rect(margin, y - 5, pageWidth - (margin * 2), 8, 'F');
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(`RESPONSE: ${status}`, margin + 2, y);
    y += 10;

    addSection('Response Headers', resHeaders);
    addSection('Response Body', resBody);

    doc.save('api-log.pdf');
  };

  const maskData = (text: string) => {
    // Simple mask simulation
    return text.replace(/(Authorization: Bearer ).*/, '$1[REDACTED]')
               .replace(/("password":\s*").*"/, '$1******"');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 mb-4">
            API Request to PDF Logger
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Create professional audit logs for API transactions. Useful for compliance, debugging, and sharing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">

          {/* Request Section */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-orange-400 mb-4">Request</h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <select
                  value={method}
                  onChange={e => setMethod(e.target.value)}
                  className="bg-neutral-800 border border-neutral-700 rounded-md px-2 py-1 text-sm font-bold"
                >
                  {['GET', 'POST', 'PUT', 'DELETE'].map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <input
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  className="flex-1 bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1 text-sm font-mono"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-500 block mb-1">Headers</label>
                <textarea
                  value={reqHeaders}
                  onChange={e => setReqHeaders(e.target.value)}
                  className="w-full h-24 bg-neutral-800 border border-neutral-700 rounded-md p-2 text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-500 block mb-1">Body</label>
                <textarea
                  value={reqBody}
                  onChange={e => setReqBody(e.target.value)}
                  className="w-full h-32 bg-neutral-800 border border-neutral-700 rounded-md p-2 text-xs font-mono"
                />
              </div>
            </div>
          </div>

          {/* Response Section */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-green-400 mb-4">Response</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-neutral-500 block mb-1">Status</label>
                <input
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-1 text-sm font-bold text-green-400"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-500 block mb-1">Headers</label>
                <textarea
                  value={resHeaders}
                  onChange={e => setResHeaders(e.target.value)}
                  className="w-full h-24 bg-neutral-800 border border-neutral-700 rounded-md p-2 text-xs font-mono"
                />
              </div>

              <div>
                <label className="text-xs text-neutral-500 block mb-1">Body</label>
                <textarea
                  value={resBody}
                  onChange={e => setResBody(e.target.value)}
                  className="w-full h-32 bg-neutral-800 border border-neutral-700 rounded-md p-2 text-xs font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="mask"
              checked={maskSensitive}
              onChange={e => setMaskSensitive(e.target.checked)}
              className="w-4 h-4 accent-orange-500"
            />
            <label htmlFor="mask" className="text-sm text-neutral-300">Mask Sensitive Data (Authorization, Password)</label>
          </div>

          <button
            onClick={generatePdf}
            className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-md transition-colors shadow-lg shadow-orange-900/20"
          >
            Generate Audit Log PDF
          </button>
        </div>
      </div>
    </div>
  );
}
