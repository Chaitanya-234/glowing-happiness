'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Listbox } from '@headlessui/react';

const METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

export default function APITesterClient() {
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');
  const [method, setMethod] = useState(METHODS[0]);
  const [headers, setHeaders] = useState('');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<number | null>(null);

  const sendRequest = async () => {
    setLoading(true);
    setResponse('');
    setStatus(null);

    try {
      const headerObj: any = {};
      if (headers) {
        headers.split('\n').forEach(line => {
          const [key, value] = line.split(':');
          if (key && value) {
            headerObj[key.trim()] = value.trim();
          }
        });
      }

      const options: RequestInit = {
        method,
        headers: headerObj,
      };

      if (method !== 'GET' && body) {
        options.body = body;
      }

      const res = await fetch(url, options);
      setStatus(res.status);
      const data = await res.text();

      try {
        const jsonData = JSON.parse(data);
        setResponse(JSON.stringify(jsonData, null, 2));
      } catch {
        setResponse(data);
      }
    } catch (error: any) {
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const generateCurlCommand = () => {
    let cmd = `curl -X ${method}`;

    if (headers) {
      headers.split('\n').forEach(line => {
        const [key, value] = line.split(':');
        if (key && value) {
          cmd += ` -H "${key.trim()}: ${value.trim()}"`;
        }
      });
    }

    if (method !== 'GET' && body) {
      const escapedBody = body.replace(/"/g, '\\"');
      cmd += ` -d "${escapedBody}"`;
    }

    cmd += ` "${url}"`;

    return cmd;
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60"
      >
        API Tester
      </motion.h1>
      <p className="text-center text-purple-200/40 mb-12 max-w-2xl mx-auto">
        Test REST APIs quickly and easily. No signup required.
      </p>

      <div className="space-y-6 max-w-full px-2 sm:px-4">

        {/* URL and Method: stack vertically on small devices */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">

          {/* Custom Listbox for method */}
          <Listbox value={method} onChange={setMethod}>
            <div className="relative w-full sm:w-auto">
              <Listbox.Button className="
                relative cursor-pointer rounded-xl bg-gradient-to-r from-purple-700 via-purple-900 to-indigo-900
                px-5 py-3 text-purple-100 font-semibold text-lg shadow-md shadow-purple-800/40
                transition-colors duration-300 ease-in-out hover:from-purple-600 hover:via-purple-800 hover:to-indigo-800
                focus:outline-none focus:ring-4 focus:ring-purple-500/60 focus:ring-offset-0 w-full sm:w-auto
                flex justify-between items-center
              ">
                <span>{method}</span>
                <svg
                  className="w-5 h-5 text-purple-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.292l3.71-4.06a.75.75 0 111.08 1.04l-4.25 4.65a.75.75 0 01-1.08 0l-4.25-4.65a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </Listbox.Button>
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full sm:w-auto overflow-auto rounded-md bg-purple-900 text-purple-100 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {METHODS.map((m) => (
                  <Listbox.Option
                    key={m}
                    value={m}
                    className={({ active }) =>
                      `cursor-pointer select-none px-4 py-2 ${
                        active ? 'bg-purple-700 text-white' : ''
                      }`
                    }
                  >
                    {m}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>

          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://api.example.com/endpoint"
            className="flex-1 px-4 py-3 bg-purple-900/10 text-purple-100/80 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none w-full"
          />

          <button
            onClick={sendRequest}
            disabled={loading}
            className="px-8 py-3 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold disabled:opacity-50 w-full sm:w-auto"
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>

        {/* Headers */}
        <div>
          <label className="block text-purple-200/60 mb-2 font-semibold">Headers (one per line):</label>
          <textarea
            value={headers}
            onChange={(e) => setHeaders(e.target.value)}
            className="w-full h-24 bg-purple-900/10 text-purple-100/80 p-4 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none font-mono text-sm resize-none"
            placeholder="Content-Type: application/json&#10;Authorization: Bearer token123"
          />
        </div>

        {/* Body (only when method isn't GET) */}
        {method !== 'GET' && (
          <div>
            <label className="block text-purple-200/60 mb-2 font-semibold">Request Body:</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full h-32 bg-purple-900/10 text-purple-100/80 p-4 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none font-mono text-sm resize-none"
              placeholder='{"key": "value"}'
            />
          </div>
        )}

        {/* Response */}
        <div>
          <label className="block text-purple-200/60 mb-2 font-semibold">
            Response:
            {status && (
              <span className={`ml-2 text-sm ${status < 400 ? 'text-green-400' : 'text-red-400'}`}>
                Status: {status}
              </span>
            )}
          </label>
          <textarea
            value={response}
            readOnly
            className="w-full h-96 bg-purple-900/10 text-purple-100/80 p-4 rounded-lg border border-purple-500/20 font-mono text-sm resize-none"
            placeholder="Response will appear here..."
          />
        </div>

        {/* cURL Command */}
        <div>
          <label className="block text-purple-200/60 mb-2 font-semibold">cURL Command:</label>
          <textarea
            value={generateCurlCommand()}
            readOnly
            className="w-full h-32 bg-purple-900/10 text-purple-100/80 p-4 rounded-lg border border-purple-500/20 font-mono text-sm resize-none"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
