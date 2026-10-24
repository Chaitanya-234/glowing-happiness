'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  RotateCcw,
  Trash2,
  Plus,
  Save,
  Code,
  Clock,
  AlertCircle,
  CheckCircle2,
  Wifi,
  Globe,
  Settings,
  X
} from 'lucide-react';
import { toast } from 'sonner';

type WebhookEvent = {
  id: string;
  name: string;
  source: 'custom' | 'stripe' | 'github' | 'shopify';
  url: string;
  method: string;
  headers: { key: string; value: string }[];
  body: string;
  secret: string; // for HMAC
  createdAt: number;
};

type ReplayLog = {
  id: string;
  eventId: string;
  timestamp: number;
  status: number;
  duration: number;
  responseBody: string;
};

const TEMPLATES = {
  stripe: {
    name: 'Stripe Payment Success',
    headers: [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'Stripe-Signature', value: '{{signature}}' }
    ],
    body: JSON.stringify({
      id: "evt_123",
      object: "event",
      type: "payment_intent.succeeded",
      data: {
        object: {
          id: "pi_123",
          amount: 2000,
          currency: "usd",
          status: "succeeded"
        }
      }
    }, null, 2)
  },
  github: {
    name: 'GitHub Push Event',
    headers: [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'X-GitHub-Event', value: 'push' },
      { key: 'X-Hub-Signature-256', value: '{{signature}}' }
    ],
    body: JSON.stringify({
      ref: "refs/heads/main",
      repository: {
        name: "devmatrix-cloud",
        full_name: "devmatrix/devmatrix-cloud"
      },
      pusher: {
        name: "jules-agent"
      }
    }, null, 2)
  },
  shopify: {
    name: 'Shopify Order Created',
    headers: [
      { key: 'Content-Type', value: 'application/json' },
      { key: 'X-Shopify-Topic', value: 'orders/create' },
      { key: 'X-Shopify-Hmac-Sha256', value: '{{signature}}' }
    ],
    body: JSON.stringify({
      id: 820982911946154508,
      email: "jon@doe.ca",
      total_price: "20.00",
      currency: "USD"
    }, null, 2)
  }
};

export default function WebhookReplayClient() {
  const [events, setEvents] = useState<WebhookEvent[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [logs, setLogs] = useState<ReplayLog[]>([]);

  // Editor State
  const [editName, setEditName] = useState('');
  const [editUrl, setEditUrl] = useState('');
  const [editMethod, setEditMethod] = useState('POST');
  const [editBody, setEditBody] = useState('');
  const [editHeaders, setEditHeaders] = useState<{ key: string; value: string }[]>([]);
  const [editSecret, setEditSecret] = useState('');
  const [proxyEnabled, setProxyEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  // Load from LocalStorage
  useEffect(() => {
    const savedEvents = localStorage.getItem('webhook_events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      // Default initial event
      createNewEvent();
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem('webhook_events', JSON.stringify(events));
    }
  }, [events]);

  useEffect(() => {
    if (selectedEventId) {
      const evt = events.find(e => e.id === selectedEventId);
      if (evt) {
        setEditName(evt.name);
        setEditUrl(evt.url);
        setEditMethod(evt.method);
        setEditBody(evt.body);
        setEditHeaders(evt.headers);
        setEditSecret(evt.secret);
      }
    }
  }, [selectedEventId]);

  const createNewEvent = (template?: keyof typeof TEMPLATES) => {
    const newId = crypto.randomUUID();
    const tmpl = template ? TEMPLATES[template] : {
      name: 'New Webhook',
      headers: [{ key: 'Content-Type', value: 'application/json' }],
      body: '{\n  "message": "Hello World"\n}'
    };

    const newEvent: WebhookEvent = {
      id: newId,
      name: tmpl.name,
      source: template || 'custom',
      url: 'https://webhook.site/...',
      method: 'POST',
      headers: tmpl.headers,
      body: tmpl.body,
      secret: '',
      createdAt: Date.now()
    };

    setEvents(prev => [newEvent, ...prev]);
    setSelectedEventId(newId);
  };

  const saveCurrentEvent = () => {
    if (!selectedEventId) return;
    setEvents(prev => prev.map(e => e.id === selectedEventId ? {
      ...e,
      name: editName,
      url: editUrl,
      method: editMethod,
      body: editBody,
      headers: editHeaders,
      secret: editSecret
    } : e));
    toast.success('Webhook config saved');
  };

  const calculateSignature = async (body: string, secret: string, type: string) => {
    if (!secret) return '';
    try {
      const encoder = new TextEncoder();
      const keyData = encoder.encode(secret);
      const msgData = encoder.encode(body);

      const algorithm = { name: 'HMAC', hash: 'SHA-256' };
      const key = await crypto.subtle.importKey('raw', keyData, algorithm, false, ['sign']);
      const signature = await crypto.subtle.sign('HMAC', key, msgData);

      if (type === 'shopify') {
        // Base64 for Shopify
        return btoa(String.fromCharCode(...new Uint8Array(signature)));
      }
      // Hex for others
      return Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      console.error(e);
      return 'error-calculating-sig';
    }
  };

  const handleReplay = async () => {
    if (!editUrl) {
      toast.error('Please enter a target URL');
      return;
    }

    setLoading(true);
    try {
      // 1. Prepare Headers (inject Signature if needed)
      const finalHeaders: Record<string, string> = {};
      const evt = events.find(e => e.id === selectedEventId);

      for (const h of editHeaders) {
        if (h.value.includes('{{signature}}')) {
           const sig = await calculateSignature(editBody, editSecret, evt?.source || 'custom');
           finalHeaders[h.key] = h.value.replace('{{signature}}', sig);
        } else {
           finalHeaders[h.key] = h.value;
        }
      }

      let resStatus = 0;
      let resBody = '';
      let duration = 0;

      if (proxyEnabled) {
        const res = await fetch('/api/proxy-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            url: editUrl,
            method: editMethod,
            headers: finalHeaders,
            body: editBody
          })
        });
        const data = await res.json();
        resStatus = data.status;
        resBody = data.body || data.error;
        duration = data.duration;
      } else {
        // Direct fetch
        const start = Date.now();
        const res = await fetch(editUrl, {
          method: editMethod,
          headers: finalHeaders,
          body: editBody
        });
        duration = Date.now() - start;
        resStatus = res.status;
        resBody = await res.text();
      }

      // Add Log
      const newLog: ReplayLog = {
        id: crypto.randomUUID(),
        eventId: selectedEventId!,
        timestamp: Date.now(),
        status: resStatus,
        duration,
        responseBody: resBody.slice(0, 500) // Truncate
      };
      setLogs(prev => [newLog, ...prev]);

      if (resStatus >= 200 && resStatus < 300) {
        toast.success(`Delivered: ${resStatus}`);
      } else {
        toast.error(`Failed: ${resStatus}`);
      }

    } catch (e: any) {
      toast.error(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const copyAsCurl = () => {
    let cmd = `curl -X ${editMethod} "${editUrl}"`;
    editHeaders.forEach(h => {
      cmd += ` \\\n  -H "${h.key}: ${h.value}"`;
    });
    // simplistic escaping
    const escapedBody = editBody.replace(/"/g, '\\"');
    cmd += ` \\\n  -d "${escapedBody}"`;
    navigator.clipboard.writeText(cmd);
    toast.success('Copied as cURL');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-140px)]">

        {/* Sidebar: Event List */}
        <div className="lg:col-span-3 bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
            <h2 className="font-semibold text-neutral-300">Saved Events</h2>
            <div className="flex gap-2">
              <button onClick={() => createNewEvent()} title="New Custom" className="p-1 hover:bg-neutral-800 rounded">
                <Plus size={18} className="text-neutral-400" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {events.map(evt => (
               <div
                 key={evt.id}
                 onClick={() => setSelectedEventId(evt.id)}
                 className={`p-3 rounded-lg cursor-pointer transition-colors text-sm ${
                   selectedEventId === evt.id ? 'bg-purple-900/20 border border-purple-500/30' : 'bg-neutral-800/50 border border-transparent hover:bg-neutral-800'
                 }`}
               >
                 <div className="font-medium text-neutral-200 truncate">{evt.name}</div>
                 <div className="flex justify-between mt-1 text-xs text-neutral-500">
                    <span className="uppercase">{evt.source}</span>
                    <span>{new Date(evt.createdAt).toLocaleDateString()}</span>
                 </div>
               </div>
            ))}
          </div>

          <div className="p-4 border-t border-neutral-800 bg-neutral-900">
             <div className="text-xs font-semibold text-neutral-500 mb-2 uppercase tracking-wider">Templates</div>
             <div className="grid grid-cols-3 gap-2">
                <button onClick={() => createNewEvent('stripe')} className="text-xs bg-neutral-800 hover:bg-neutral-700 py-2 rounded text-neutral-300">Stripe</button>
                <button onClick={() => createNewEvent('github')} className="text-xs bg-neutral-800 hover:bg-neutral-700 py-2 rounded text-neutral-300">GitHub</button>
                <button onClick={() => createNewEvent('shopify')} className="text-xs bg-neutral-800 hover:bg-neutral-700 py-2 rounded text-neutral-300">Shopify</button>
             </div>
          </div>
        </div>

        {/* Main Editor */}
        <div className="lg:col-span-6 flex flex-col gap-6 overflow-y-auto">
          {selectedEventId ? (
            <>
               <motion.div
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="bg-neutral-900 rounded-xl border border-neutral-800 p-6"
               >
                  {/* Header Config */}
                  <div className="flex items-center gap-4 mb-6">
                     <select
                       value={editMethod}
                       onChange={(e) => setEditMethod(e.target.value)}
                       className="bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-purple-500"
                     >
                       <option>POST</option>
                       <option>GET</option>
                       <option>PUT</option>
                       <option>DELETE</option>
                     </select>
                     <input
                       type="text"
                       value={editUrl}
                       onChange={(e) => setEditUrl(e.target.value)}
                       placeholder="https://api.your-backend.com/webhook"
                       className="flex-1 bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-sm font-mono focus:outline-none focus:border-purple-500"
                     />
                  </div>

                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <label className="flex items-center gap-2 text-neutral-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={proxyEnabled}
                        onChange={(e) => setProxyEnabled(e.target.checked)}
                        className="accent-purple-500"
                      />
                      <span>Use Proxy (Bypass CORS)</span>
                    </label>
                    <div className="h-4 w-[1px] bg-neutral-700"></div>
                    <button onClick={copyAsCurl} className="flex items-center gap-1 text-neutral-400 hover:text-neutral-200">
                      <Code size={14} /> cURL
                    </button>
                  </div>

                  {/* Tabs / Sections */}
                  <div className="space-y-6">
                    {/* Headers */}
                    <div>
                      <div className="flex justify-between mb-2">
                        <h3 className="text-sm font-semibold text-neutral-400">Headers</h3>
                        <button
                          onClick={() => setEditHeaders([...editHeaders, { key: '', value: '' }])}
                          className="text-xs text-purple-400 hover:text-purple-300"
                        >
                          + Add Header
                        </button>
                      </div>
                      <div className="space-y-2">
                        {editHeaders.map((h, i) => (
                          <div key={i} className="flex gap-2">
                            <input
                              placeholder="Key"
                              value={h.key}
                              onChange={(e) => {
                                const newH = [...editHeaders];
                                newH[i].key = e.target.value;
                                setEditHeaders(newH);
                              }}
                              className="w-1/3 bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs font-mono"
                            />
                            <input
                              placeholder="Value"
                              value={h.value}
                              onChange={(e) => {
                                const newH = [...editHeaders];
                                newH[i].value = e.target.value;
                                setEditHeaders(newH);
                              }}
                              className="flex-1 bg-neutral-800 border border-neutral-700 rounded px-2 py-1 text-xs font-mono"
                            />
                            <button
                              onClick={() => setEditHeaders(editHeaders.filter((_, idx) => idx !== i))}
                              className="text-neutral-600 hover:text-red-400"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Secret */}
                    <div>
                      <label className="block text-sm font-semibold text-neutral-400 mb-1">
                         Signing Secret <span className="text-xs font-normal text-neutral-500">(Optional - for HMAC)</span>
                      </label>
                      <input
                        type="password"
                        value={editSecret}
                        onChange={(e) => setEditSecret(e.target.value)}
                        placeholder="whsec_..."
                        className="w-full bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-sm font-mono"
                      />
                      <p className="text-xs text-neutral-600 mt-1">Use <code>&#123;&#123;signature&#125;&#125;</code> in header value to auto-inject calculated HMAC.</p>
                    </div>

                    {/* Body */}
                    <div>
                       <div className="flex justify-between mb-2">
                          <h3 className="text-sm font-semibold text-neutral-400">Payload Body</h3>
                       </div>
                       <textarea
                         value={editBody}
                         onChange={(e) => setEditBody(e.target.value)}
                         className="w-full h-64 bg-neutral-950 border border-neutral-800 rounded p-3 text-sm font-mono focus:outline-none focus:border-purple-500 resize-none"
                       />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={saveCurrentEvent}
                      className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Save size={18} /> Save
                    </button>
                    <button
                      onClick={handleReplay}
                      disabled={loading}
                      className="flex-[2] bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white py-2 rounded-lg font-medium transition-all shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {loading ? <div className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></div> : <><Play size={18} /> Replay Event</>}
                    </button>
                  </div>
               </motion.div>
            </>
          ) : (
             <div className="flex items-center justify-center h-full text-neutral-500">
                Select or create an event to start.
             </div>
          )}
        </div>

        {/* Right Sidebar: Logs */}
        <div className="lg:col-span-3 bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden flex flex-col">
           <div className="p-4 border-b border-neutral-800">
              <h2 className="font-semibold text-neutral-300">Replay History</h2>
           </div>
           <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {logs.length === 0 && <div className="text-center text-neutral-500 text-sm mt-10">No logs yet</div>}
              {logs.map(log => (
                 <div key={log.id} className="bg-neutral-800/50 p-3 rounded-lg border border-neutral-800 text-sm">
                    <div className="flex items-center justify-between mb-2">
                       <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                         log.status >= 200 && log.status < 300 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                       }`}>
                          {log.status === 0 ? 'ERR' : log.status}
                       </span>
                       <span className="text-neutral-500 text-xs">{new Date(log.timestamp).toLocaleTimeString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-400 mb-2">
                       <Clock size={12} /> {log.duration}ms
                    </div>
                    <div className="bg-neutral-950 p-2 rounded text-xs font-mono text-neutral-400 truncate max-w-full">
                       {log.responseBody || '(No response body)'}
                    </div>
                 </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
}
