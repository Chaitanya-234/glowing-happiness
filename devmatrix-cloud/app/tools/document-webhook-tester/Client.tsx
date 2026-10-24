'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function DocumentWebhookTesterClient() {
  const [targetUrl, setTargetUrl] = useState('https://webhook.site/...');
  const [eventType, setEventType] = useState('document.completed');
  const [payload, setPayload] = useState('{\n  "document_id": "doc_12345",\n  "status": "completed",\n  "download_url": "https://example.com/doc.pdf"\n}');
  const [secret, setSecret] = useState('my-secret-key');
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // HMAC Calculator State
  const [hmacInput, setHmacInput] = useState('');
  const [hmacKey, setHmacKey] = useState('');
  const [hmacResult, setHmacResult] = useState('');

  const sendWebhook = async () => {
    if (!targetUrl) return;
    setLoading(true);
    const logId = Date.now();
    addLog(`[${logId}] Sending webhook to ${targetUrl}...`);

    try {
      // Calculate Signature (Simulation)
      // In a real browser env, using Web Crypto API for HMAC SHA256
      const encoder = new TextEncoder();
      const keyData = encoder.encode(secret);
      const msgData = encoder.encode(payload);

      const key = await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
      const signature = await crypto.subtle.sign('HMAC', key, msgData);
      const signatureHex = Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');

      addLog(`[${logId}] Generated Signature: ${signatureHex}`);

      const res = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Webhook-Signature': signatureHex,
          'X-Event-Type': eventType
        },
        body: payload
      });

      addLog(`[${logId}] Response Status: ${res.status}`);
      const text = await res.text();
      addLog(`[${logId}] Response Body: ${text.slice(0, 100)}...`);

    } catch (err: any) {
      addLog(`[${logId}] Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const addLog = (msg: string) => {
    setLogs(prev => [`${new Date().toLocaleTimeString()} - ${msg}`, ...prev]);
  };

  const calculateHmac = async () => {
    try {
      const encoder = new TextEncoder();
      const keyData = encoder.encode(hmacKey);
      const msgData = encoder.encode(hmacInput);
      const key = await crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
      const signature = await crypto.subtle.sign('HMAC', key, msgData);
      const signatureHex = Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');
      setHmacResult(signatureHex);
    } catch (e: any) {
      setHmacResult("Error: " + e.message);
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
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 mb-4">
            Document Webhook Tester
          </h1>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Simulate webhook events, validate HMAC signatures, and debug your integration endpoints.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Simulator */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-purple-400">Webhook Simulator</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Target URL</label>
                <input
                  type="text"
                  value={targetUrl}
                  onChange={e => setTargetUrl(e.target.value)}
                  placeholder="https://your-api.com/webhooks"
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Event Type</label>
                  <select
                    value={eventType}
                    onChange={e => setEventType(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-purple-500"
                  >
                    <option value="document.completed">document.completed</option>
                    <option value="document.signed">document.signed</option>
                    <option value="document.failed">document.failed</option>
                    <option value="ping">ping</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-neutral-400 mb-1">Secret Key (for HMAC)</label>
                  <input
                    type="text"
                    value={secret}
                    onChange={e => setSecret(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-purple-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-neutral-400 mb-1">Payload (JSON)</label>
                <textarea
                  value={payload}
                  onChange={e => setPayload(e.target.value)}
                  className="w-full h-32 bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>

              <button
                onClick={sendWebhook}
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-2 rounded-md transition-colors disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Webhook Event'}
              </button>

              <div className="mt-4 bg-neutral-950 rounded-md border border-neutral-800 p-4 h-40 overflow-y-auto font-mono text-xs text-neutral-300">
                {logs.length === 0 ? <span className="text-neutral-600">Logs will appear here...</span> : logs.map((l, i) => <div key={i}>{l}</div>)}
              </div>
            </div>
          </div>

          {/* Validator */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-pink-400">Signature Validator</h2>
            <p className="text-sm text-neutral-400 mb-4">
              Verify if a received webhook payload matches the signature header.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-1">Secret Key</label>
                <input
                  type="text"
                  value={hmacKey}
                  onChange={e => setHmacKey(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-pink-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-sm text-neutral-400 mb-1">Payload Body</label>
                <textarea
                  value={hmacInput}
                  onChange={e => setHmacInput(e.target.value)}
                  className="w-full h-32 bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-pink-500 font-mono"
                />
              </div>

              <button
                onClick={calculateHmac}
                className="w-full bg-pink-600 hover:bg-pink-500 text-white font-medium py-2 rounded-md transition-colors"
              >
                Calculate Signature
              </button>

              {hmacResult && (
                <div className="mt-4 p-4 bg-neutral-800 rounded-md border border-neutral-700">
                  <label className="block text-xs text-neutral-500 mb-1">Expected Signature (SHA-256)</label>
                  <code className="block text-green-400 font-mono text-sm break-all">
                    {hmacResult}
                  </code>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
