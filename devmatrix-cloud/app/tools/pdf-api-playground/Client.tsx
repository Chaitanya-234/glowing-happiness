'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const METHODS = ['POST', 'GET'];

export default function PDFApiPlaygroundClient() {
  const [url, setUrl] = useState('https://api.example.com/v1/pdf/generate');
  const [method, setMethod] = useState('POST');
  const [headers, setHeaders] = useState('Content-Type: application/json');
  const [body, setBody] = useState('{\n  "title": "My Report",\n  "content": "Hello World"\n}');
  const [loading, setLoading] = useState(false);
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseBlob, setResponseBlob] = useState<Blob | null>(null);
  const [responseUrl, setResponseUrl] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<string | null>(null);

  const handleSend = async () => {
    setLoading(true);
    setResponseStatus(null);
    setResponseBlob(null);
    setResponseUrl(null);
    setResponseText(null);

    try {
      const headerObj: Record<string, string> = {};
      headers.split('\n').forEach(line => {
        const [k, v] = line.split(':');
        if (k && v) headerObj[k.trim()] = v.trim();
      });

      const options: RequestInit = {
        method,
        headers: headerObj,
        body: method !== 'GET' ? body : undefined,
      };

      // Since we can't actually hit external APIs easily from a client due to CORS,
      // we will simulate a PDF response if the URL contains "example" or just fail gracefully.
      // But for a "Playground" in a real app, this would hit a proxy or the actual API.
      // For this demo, we'll simulate a PDF generation if the user hits the default URL.

      let res;
      if (url.includes('api.example.com')) {
         // SIMULATION MODE
         await new Promise(r => setTimeout(r, 1000));
         const mockPdf = await fetch('https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf').then(r => r.blob());
         res = {
           status: 200,
           headers: new Headers({ 'content-type': 'application/pdf' }),
           blob: async () => mockPdf,
           text: async () => "Binary PDF Data"
         };
         setResponseStatus(200);
      } else {
        res = await fetch(url, options);
        setResponseStatus(res.status);
      }

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/pdf')) {
        // It's a PDF
        const blob = await res.blob();
        setResponseBlob(blob);
        setResponseUrl(URL.createObjectURL(blob));
      } else {
        // It's text/json
        const text = await res.text();
        setResponseText(text);
      }

    } catch (err: any) {
      setResponseText(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 mb-4">
            PDF API Playground
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Test and debug PDF generation APIs. Send requests and instantly preview binary PDF responses.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Request Builder */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-400">Request Builder</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Method & URL</label>
                <div className="flex gap-2">
                  <select
                    value={method}
                    onChange={e => setMethod(e.target.value)}
                    className="bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  >
                    {METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <input
                    type="text"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    className="flex-1 bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-neutral-400 mb-1">Headers</label>
                <textarea
                  value={headers}
                  onChange={e => setHeaders(e.target.value)}
                  className="w-full h-24 bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-sm text-neutral-400 mb-1">Body (JSON)</label>
                <textarea
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  className="w-full h-40 bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>

              <button
                onClick={handleSend}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending Request...' : 'Send Request'}
              </button>
            </div>
          </div>

          {/* Right: Response Viewer */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col h-[600px] lg:h-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-green-400">Response</h2>
              {responseStatus && (
                <span className={`text-sm px-2 py-1 rounded ${responseStatus === 200 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                  Status: {responseStatus}
                </span>
              )}
            </div>

            <div className="flex-1 bg-neutral-950 rounded-md border border-neutral-800 overflow-hidden relative">
              {!responseStatus && !loading && (
                <div className="absolute inset-0 flex items-center justify-center text-neutral-500 text-sm">
                  Send a request to see the response.
                </div>
              )}

              {loading && (
                 <div className="absolute inset-0 flex items-center justify-center text-blue-400 text-sm animate-pulse">
                  Processing...
                </div>
              )}

              {responseUrl ? (
                <iframe
                  src={responseUrl}
                  className="w-full h-full"
                  title="PDF Preview"
                />
              ) : responseText ? (
                <pre className="p-4 text-xs font-mono text-neutral-300 overflow-auto h-full">
                  {responseText}
                </pre>
              ) : null}
            </div>

            {responseUrl && (
              <div className="mt-4 flex justify-end">
                <a
                  href={responseUrl}
                  download="response.pdf"
                  className="text-sm text-blue-400 hover:underline"
                >
                  Download PDF
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-neutral-200">How to use</h3>
          <ul className="list-disc list-inside text-neutral-400 space-y-2">
            <li>Enter your API endpoint URL (must support CORS or use a proxy).</li>
            <li>Set the HTTP method (usually POST for generation).</li>
            <li>Configure headers (e.g., API Keys).</li>
            <li>Provide the JSON payload expected by the API.</li>
            <li>If the response is a PDF, it will be rendered in the previewer automatically.</li>
          </ul>
          <div className="mt-4 p-4 bg-blue-900/20 text-blue-200 rounded-lg text-sm">
            <strong>Demo Mode:</strong> The default URL is a simulation. Click "Send Request" to see a mock PDF response.
          </div>
        </div>
      </div>
    </div>
  );
}
