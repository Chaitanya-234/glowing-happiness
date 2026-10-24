'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Play,
  Database,
  Settings,
  Download,
  Copy,
  Check,
  RefreshCw,
  Trash2,
  AlertCircle,
  Server,
  Terminal,
  FileJson,
  Zap,
  Activity,
  AlertTriangle
} from 'lucide-react';
import yaml from 'yaml';
import JSONSchemaFaker from 'json-schema-faker';

// Initialize JSON Schema Faker
JSONSchemaFaker.option({
  useDefaultValue: true,
  alwaysFakeOptionals: true,
});

// Types
interface Endpoint {
  method: string;
  path: string;
  summary?: string;
  parameters?: any[];
  responses?: any;
  requestBody?: any;
}

interface MockState {
  [key: string]: any;
}

interface HistoryItem {
  id: string;
  method: string;
  path: string;
  status: number;
  timestamp: Date;
  duration: number;
}

const DEFAULT_SCHEMA = `{
  "openapi": "3.0.0",
  "info": {
    "title": "Sample API",
    "version": "1.0.0"
  },
  "paths": {
    "/users": {
      "get": {
        "summary": "List users",
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "id": { "type": "integer", "minimum": 1 },
                      "name": { "type": "string", "faker": "name.findName" },
                      "email": { "type": "string", "format": "email" },
                      "role": { "type": "string", "enum": ["admin", "user"] }
                    },
                    "required": ["id", "name", "email"]
                  }
                }
              }
            }
          }
        }
      },
      "post": {
        "summary": "Create user",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": { "type": "string" },
                  "email": { "type": "string" }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "User created",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": { "type": "integer" },
                    "message": { "type": "string", "example": "User created successfully" }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/users/{id}": {
      "get": {
        "summary": "Get user by ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "integer" }
          }
        ],
        "responses": {
          "200": {
            "description": "User found",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": { "type": "integer" },
                    "name": { "type": "string" }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;

export default function MockApiGeneratorClient() {
  // State
  const [schemaInput, setSchemaInput] = useState(DEFAULT_SCHEMA);
  const [endpoints, setEndpoints] = useState<Endpoint[]>([]);
  const [mockData, setMockData] = useState<MockState>({});
  const [selectedEndpoint, setSelectedEndpoint] = useState<Endpoint | null>(null);
  const [activeTab, setActiveTab] = useState<'editor' | 'tester' | 'code'>('editor');
  const [logs, setLogs] = useState<HistoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  // Tester State
  const [requestUrl, setRequestUrl] = useState('');
  const [requestBody, setRequestBody] = useState('');
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseBody, setResponseBody] = useState<string>('');
  const [responseTime, setResponseTime] = useState<number | null>(null);

  // Advanced Simulation Config
  const [forceStatus, setForceStatus] = useState<number | 'default'>('default');
  const [rateLimitProb, setRateLimitProb] = useState(0); // 0-100%

  // Parse Schema
  const parseSchema = useCallback(async () => {
    setError(null);
    setIsGenerating(true);
    try {
      let parsed;
      try {
        parsed = JSON.parse(schemaInput);
      } catch {
        try {
          parsed = yaml.parse(schemaInput);
        } catch {
          throw new Error('Invalid JSON or YAML format');
        }
      }

      if (!parsed.paths) {
        throw new Error('Invalid OpenAPI/Swagger schema: "paths" is missing');
      }

      const extractedEndpoints: Endpoint[] = [];
      const newMockData: MockState = {};

      // Process Endpoints
      Object.entries(parsed.paths).forEach(([path, methods]: [string, any]) => {
        Object.entries(methods).forEach(([method, details]: [string, any]) => {
          if (['get', 'post', 'put', 'delete', 'patch'].includes(method.toLowerCase())) {
            extractedEndpoints.push({
              method: method.toUpperCase(),
              path,
              summary: details.summary,
              parameters: details.parameters,
              responses: details.responses,
              requestBody: details.requestBody,
            });

            // Generate initial mock data for GET requests if it returns an array
            if (method.toLowerCase() === 'get') {
              const successResponse = details.responses['200'] || details.responses['201'];
              if (successResponse?.content?.['application/json']?.schema) {
                 // We will generate this on demand or initially
                 // For stateful simulation, we try to store arrays
                 const schema = successResponse.content['application/json'].schema;
                 if (schema.type === 'array') {
                   // Generate initial list
                   try {
                     const fakeData = JSONSchemaFaker.generate(schema);
                     // Store key as resource name derived from path (e.g. /users -> users)
                     const resourceName = path.replace(/^\//, '').split('/')[0];
                     if (resourceName) {
                        newMockData[resourceName] = fakeData;
                     }
                   } catch (e) {
                     console.warn('Failed to generate mock data for', path, e);
                   }
                 }
              }
            }
          }
        });
      });

      setEndpoints(extractedEndpoints);
      setMockData(newMockData);

      if (extractedEndpoints.length > 0) {
        setSelectedEndpoint(extractedEndpoints[0]);
      }

      // Auto-switch to tester if user clicked Generate
      if (activeTab === 'editor') {
        setActiveTab('tester');
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  }, [schemaInput, activeTab]);

  useEffect(() => {
    // Initial parse
    parseSchema();
  }, []);

  // Set Request Details when endpoint selected
  useEffect(() => {
    if (selectedEndpoint) {
      // Replace {param} with random ID or default for tester friendliness
      let friendlyUrl = selectedEndpoint.path.replace(/\{([^}]+)\}/g, (match, p1) => {
          if (p1.toLowerCase().includes('id')) return '1';
          return 'test';
      });
      setRequestUrl(friendlyUrl);

      // Pre-fill body example if POST/PUT
      if (['POST', 'PUT', 'PATCH'].includes(selectedEndpoint.method)) {
        const schema = selectedEndpoint.requestBody?.content?.['application/json']?.schema;
        if (schema) {
           try {
             const fake = JSONSchemaFaker.generate(schema);
             setRequestBody(JSON.stringify(fake, null, 2));
           } catch {
             setRequestBody('{}');
           }
        } else {
          setRequestBody('');
        }
      } else {
        setRequestBody('');
      }
      setResponseBody('');
      setResponseStatus(null);
    }
  }, [selectedEndpoint]);

  // Simulate Request
  const handleSendRequest = async () => {
    if (!selectedEndpoint) return;

    const startTime = performance.now();
    setResponseStatus(null);

    // Simulate network delay
    await new Promise(r => setTimeout(r, 400 + Math.random() * 600));

    // Rate Limit Simulation
    if (Math.random() * 100 < rateLimitProb) {
        setResponseStatus(429);
        setResponseBody(JSON.stringify({ error: 'Too Many Requests', message: 'Rate limit exceeded' }, null, 2));
        setResponseTime(Math.round(performance.now() - startTime));
        return;
    }

    // Force Status Code
    if (forceStatus !== 'default' && typeof forceStatus === 'number') {
        setResponseStatus(forceStatus);
        const forcedBody = {
            error: forceStatus >= 400 ? 'Simulated Error' : undefined,
            message: `Forced ${forceStatus} response`,
            status: forceStatus
        };
        setResponseBody(JSON.stringify(forcedBody, null, 2));
        setResponseTime(Math.round(performance.now() - startTime));
        return;
    }

    let status = 200;
    let data: any = {};

    try {
      // Determine Resource Name (e.g. users from /users or /users/1)
      const resourceName = selectedEndpoint.path.replace(/^\//, '').split('/')[0];

      // Simple State Management Logic
      if (selectedEndpoint.method === 'GET') {
        // Return stored data if exists
        if (mockData[resourceName] && selectedEndpoint.responses?.['200']?.content?.['application/json']?.schema?.type === 'array') {
           data = mockData[resourceName];
        } else {
           // Generate fresh if not stored or single item
           const success = selectedEndpoint.responses?.['200'] || selectedEndpoint.responses?.['201'];
           if (success?.content?.['application/json']?.schema) {
             data = JSONSchemaFaker.generate(success.content['application/json'].schema);
           } else {
             data = { message: 'Success' };
           }
        }
      } else if (selectedEndpoint.method === 'POST') {
        status = 201;
        // Parse body
        let bodyObj = {};
        try { bodyObj = JSON.parse(requestBody); } catch {}

        // Add to store if array exists
        if (mockData[resourceName] && Array.isArray(mockData[resourceName])) {
           const newItem = { id: mockData[resourceName].length + 1, ...bodyObj };
           setMockData(prev => ({
             ...prev,
             [resourceName]: [...prev[resourceName], newItem]
           }));
           // Response
           const responseSchema = selectedEndpoint.responses?.['201']?.content?.['application/json']?.schema;
           if (responseSchema) {
             data = { ...JSONSchemaFaker.generate(responseSchema), ...newItem };
           } else {
             data = newItem;
           }
        } else {
           data = { id: Math.floor(Math.random() * 1000), ...bodyObj, message: 'Created (Stateless)' };
        }
      } else if (selectedEndpoint.method === 'DELETE') {
        status = 204;
        data = null;
        // Ideally remove from mockData if ID matches, but simplistic here
      } else {
        // Fallback
        const success = selectedEndpoint.responses?.['200'] || selectedEndpoint.responses?.['201'];
        if (success?.content?.['application/json']?.schema) {
            data = JSONSchemaFaker.generate(success.content['application/json'].schema);
        } else {
            data = { message: 'Operation successful' };
        }
      }

      setResponseStatus(status);
      setResponseBody(data ? JSON.stringify(data, null, 2) : '');

    } catch (e: any) {
      setResponseStatus(500);
      setResponseBody(JSON.stringify({ error: e.message }));
    }

    const endTime = performance.now();
    const duration = Math.round(endTime - startTime);
    setResponseTime(duration);

    // Add to history
    setLogs(prev => [{
      id: Math.random().toString(36),
      method: selectedEndpoint.method,
      path: requestUrl,
      status,
      timestamp: new Date(),
      duration
    }, ...prev].slice(0, 50));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const convertPathToExpress = (path: string) => {
    return path.replace(/\{([^}]+)\}/g, ':$1');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100">

      {/* Header */}
      <div className="bg-white dark:bg-[#111] border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Server className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">Mock API Generator</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Powered by JSON Schema Faker</p>
            </div>
          </div>

          <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            {(['editor', 'tester', 'code'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <button
            onClick={parseSchema}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
            Regenerate
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">

        {/* Error Banner */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Sidebar (Endpoints) - Only visible in Tester mode */}
          {activeTab === 'tester' && (
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-white dark:bg-[#111] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <h3 className="font-semibold text-sm uppercase tracking-wider text-gray-500">Endpoints</h3>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-[calc(100vh-250px)] overflow-y-auto">
                  {endpoints.length === 0 && (
                    <div className="p-4 text-center text-sm text-gray-500">No endpoints found</div>
                  )}
                  {endpoints.map((ep, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedEndpoint(ep)}
                      className={`w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-3 ${
                        selectedEndpoint === ep ? 'bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500' : 'border-l-4 border-transparent'
                      }`}
                    >
                      <span className={`
                        text-[10px] font-bold px-1.5 py-0.5 rounded uppercase w-12 text-center
                        ${ep.method === 'GET' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : ''}
                        ${ep.method === 'POST' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                        ${ep.method === 'PUT' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' : ''}
                        ${ep.method === 'DELETE' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : ''}
                      `}>
                        {ep.method}
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">{ep.path}</div>
                        <div className="text-xs text-gray-500 truncate">{ep.summary || 'No summary'}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mock Data Stats */}
              <div className="bg-white dark:bg-[#111] rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="w-4 h-4 text-gray-400" />
                  <h3 className="text-sm font-semibold">Active Mock State</h3>
                </div>
                <div className="text-xs space-y-2">
                  {Object.entries(mockData).map(([key, val]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-500">{key}:</span>
                      <span className="font-mono bg-gray-100 dark:bg-gray-800 px-1.5 rounded">{Array.isArray(val) ? `${val.length} items` : 'Object'}</span>
                    </div>
                  ))}
                  {Object.keys(mockData).length === 0 && <span className="text-gray-400 italic">No stateful data yet</span>}
                </div>
              </div>

               {/* Advanced Settings */}
               <div className="bg-white dark:bg-[#111] rounded-xl border border-gray-200 dark:border-gray-800 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Settings className="w-4 h-4 text-gray-400" />
                  <h3 className="text-sm font-semibold">Simulation Settings</h3>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-gray-500 block mb-1">Force Status Code</label>
                        <select
                            value={forceStatus}
                            onChange={(e) => setForceStatus(e.target.value === 'default' ? 'default' : parseInt(e.target.value))}
                            className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-1.5 text-xs"
                        >
                            <option value="default">Default (Success)</option>
                            <option value="200">200 OK</option>
                            <option value="201">201 Created</option>
                            <option value="400">400 Bad Request</option>
                            <option value="401">401 Unauthorized</option>
                            <option value="403">403 Forbidden</option>
                            <option value="404">404 Not Found</option>
                            <option value="500">500 Internal Server Error</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-xs text-gray-500 block mb-1 flex justify-between">
                            <span>Rate Limit Probability</span>
                            <span>{rateLimitProb}%</span>
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="10"
                            value={rateLimitProb}
                            onChange={(e) => setRateLimitProb(parseInt(e.target.value))}
                            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                        {rateLimitProb > 0 && <div className="text-[10px] text-orange-500 mt-1 flex gap-1 items-center"><AlertTriangle className="w-3 h-3"/> Will trigger 429</div>}
                    </div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content Area */}
          <div className={`${activeTab === 'tester' ? 'lg:col-span-9' : 'lg:col-span-12'}`}>

            {/* Editor Tab */}
            {activeTab === 'editor' && (
              <div className="h-[calc(100vh-200px)] flex flex-col gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/50">
                  <h2 className="text-blue-800 dark:text-blue-300 font-semibold text-lg mb-1">Define Your API Schema</h2>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Paste your OpenAPI (Swagger) YAML/JSON or standard JSON Schema below. We will automatically generate endpoints and mock data.
                  </p>
                </div>
                <div className="flex-1 relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111]">
                  <textarea
                    value={schemaInput}
                    onChange={(e) => setSchemaInput(e.target.value)}
                    className="w-full h-full p-4 font-mono text-sm resize-none focus:outline-none dark:bg-[#111] dark:text-gray-300"
                    spellCheck="false"
                  />
                  <div className="absolute bottom-4 right-4 text-xs text-gray-400 bg-white/80 dark:bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                    {schemaInput.length} chars
                  </div>
                </div>
              </div>
            )}

            {/* Tester Tab */}
            {activeTab === 'tester' && selectedEndpoint && (
              <div className="space-y-6">

                {/* Request Panel */}
                <div className="bg-white dark:bg-[#111] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-5">
                  <div className="flex items-center gap-2 mb-4">
                    <span className={`
                      text-xs font-bold px-2 py-1 rounded uppercase
                      ${selectedEndpoint.method === 'GET' ? 'bg-green-100 text-green-700' : ''}
                      ${selectedEndpoint.method === 'POST' ? 'bg-blue-100 text-blue-700' : ''}
                      ${selectedEndpoint.method === 'PUT' ? 'bg-orange-100 text-orange-700' : ''}
                      ${selectedEndpoint.method === 'DELETE' ? 'bg-red-100 text-red-700' : ''}
                    `}>
                      {selectedEndpoint.method}
                    </span>
                    <div className="flex-1 flex items-center bg-gray-50 dark:bg-gray-800 rounded-md px-3 border border-transparent focus-within:border-blue-500 transition-colors">
                        <span className="text-gray-400 text-sm font-mono">https://api.mock/v1</span>
                        <input
                            type="text"
                            value={requestUrl}
                            onChange={(e) => setRequestUrl(e.target.value)}
                            className="flex-1 bg-transparent border-none py-1.5 text-sm font-mono text-gray-600 dark:text-gray-300 focus:ring-0"
                        />
                    </div>
                    <button
                      onClick={handleSendRequest}
                      className="px-6 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition-transform active:scale-95 flex items-center gap-2"
                    >
                      <Zap className="w-4 h-4 fill-current" />
                      Send
                    </button>
                  </div>

                  {/* Tabs for Params/Body */}
                  {['POST', 'PUT', 'PATCH'].includes(selectedEndpoint.method) && (
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-gray-500 uppercase">Request Body (JSON)</label>
                      <textarea
                        value={requestBody}
                        onChange={(e) => setRequestBody(e.target.value)}
                        className="w-full h-40 p-3 text-sm font-mono bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  )}
                </div>

                {/* Response Panel */}
                <AnimatePresence>
                  {responseStatus !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white dark:bg-[#111] rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden"
                    >
                      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                        <div className="flex items-center gap-4">
                          <h3 className="font-semibold text-sm">Response</h3>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                            responseStatus >= 200 && responseStatus < 300
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                          }`}>
                            {responseStatus} {responseStatus === 200 ? 'OK' : responseStatus === 201 ? 'Created' : 'Error'}
                          </span>
                          <span className="text-xs text-gray-500">{responseTime}ms</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => copyToClipboard(responseBody)}
                            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors text-gray-500"
                            title="Copy JSON"
                          >
                            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      <div className="p-0 overflow-x-auto">
                        <pre className="p-5 text-sm font-mono text-gray-700 dark:text-gray-300 leading-relaxed">
                          {responseBody}
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>
            )}

            {activeTab === 'tester' && !selectedEndpoint && (
               <div className="h-64 flex flex-col items-center justify-center text-gray-400">
                 <Server className="w-12 h-12 mb-3 opacity-20" />
                 <p>Select an endpoint from the sidebar to test</p>
               </div>
            )}

            {/* Code Export Tab */}
            {activeTab === 'code' && (
              <div className="space-y-6">
                <div className="bg-white dark:bg-[#111] p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-purple-500" />
                    Run Locally with json-server
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    The quickest way to run this mock API locally is using <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">json-server</code>.
                    First, copy the generated data below into a <code className="text-purple-500">db.json</code> file.
                  </p>

                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold uppercase text-gray-500">db.json</span>
                      <button
                        onClick={() => copyToClipboard(JSON.stringify(mockData, null, 2))}
                        className="text-xs flex items-center gap-1 text-blue-600 hover:underline"
                      >
                        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} Copy JSON
                      </button>
                    </div>
                    <div className="bg-gray-900 text-gray-300 p-4 rounded-lg font-mono text-xs overflow-auto max-h-60">
                      {JSON.stringify(mockData, null, 2)}
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm">Then run these commands:</p>
                  <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm">
                    npm install -g json-server<br/>
                    json-server --watch db.json
                  </div>
                </div>

                <div className="bg-white dark:bg-[#111] p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-yellow-500" />
                    Node.js / Express Implementation
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    For more control, here is a scaffold for an Express server implementing these routes.
                  </p>
                   <div className="bg-gray-900 text-gray-300 p-4 rounded-lg font-mono text-xs overflow-auto max-h-96">
{`const express = require('express');
const app = express();
app.use(express.json());

// In-memory data store
let db = ${JSON.stringify(mockData, null, 2)};

${endpoints.map(ep => {
  const resource = ep.path.replace(/^\//, '').split('/')[0];
  const method = ep.method.toLowerCase();
  const expressPath = convertPathToExpress(ep.path);

  if (method === 'get') {
    return `
app.get('${expressPath}', (req, res) => {
  // TODO: Handle parameters like req.params
  res.json(db['${resource}'] || []);
});`;
  } else if (method === 'post') {
     return `
app.post('${expressPath}', (req, res) => {
  const newItem = { id: Date.now(), ...req.body };
  if(db['${resource}']) db['${resource}'].push(newItem);
  res.status(201).json(newItem);
});`;
  }
  return '';
}).join('\n')}

app.listen(3000, () => {
  console.log('Mock API running on http://localhost:3000');
});`}
                   </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Info Section */}
        <section className="mt-20 border-t border-gray-200 dark:border-gray-800 pt-10">
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold mb-4">Why Use Mock APIs?</h2>
              <ul className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start gap-2">
                   <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500" />
                   <span><strong>Frontend First Development:</strong> Start building UI before the backend is ready.</span>
                </li>
                <li className="flex items-start gap-2">
                   <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500" />
                   <span><strong>Isolate Testing:</strong> Test edge cases and error states (500, 404) easily without manipulating real databases.</span>
                </li>
                <li className="flex items-start gap-2">
                   <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500" />
                   <span><strong>Prototype Rapidly:</strong> valid ideas quickly with realistic data instead of "Lorem Ipsum".</span>
                </li>
              </ul>
            </div>
            <div>
               <h2 className="text-2xl font-bold mb-4">Supported Formats</h2>
               <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-white dark:bg-[#151515] rounded-lg border border-gray-200 dark:border-gray-800">
                   <div className="font-semibold mb-1">OpenAPI (Swagger)</div>
                   <div className="text-sm text-gray-500">v2.0, v3.0, v3.1</div>
                 </div>
                 <div className="p-4 bg-white dark:bg-[#151515] rounded-lg border border-gray-200 dark:border-gray-800">
                   <div className="font-semibold mb-1">JSON Schema</div>
                   <div className="text-sm text-gray-500">Draft 4, 7, 2019-09</div>
                 </div>
               </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
