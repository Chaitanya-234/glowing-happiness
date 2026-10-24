// app/tools/jwt-decoder/page.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function JWTDecoderPage() {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [signature, setSignature] = useState('');
  const [error, setError] = useState('');

  const decodeJWT = () => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format. JWT must have 3 parts separated by dots.');
      }

      // Decode header
      const decodedHeader = JSON.parse(atob(parts[0]));
      setHeader(JSON.stringify(decodedHeader, null, 2));

      // Decode payload
      const decodedPayload = JSON.parse(atob(parts[1]));
      setPayload(JSON.stringify(decodedPayload, null, 2));

      // Signature (keep as is)
      setSignature(parts[2]);

      setError('');
    } catch (e: any) {
      setError(e.message);
      setHeader('');
      setPayload('');
      setSignature('');
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200/80 to-purple-100/60"
        >
          JWT Decoder
        </motion.h1>
        <p className="text-center text-purple-200/40 mb-12 max-w-2xl mx-auto">
          Decode and verify JSON Web Tokens. View header, payload, and signature components.
        </p>

        {/* Token Input */}
        <div className="mb-6">
          <label className="block text-purple-200/60 mb-2 font-semibold">JWT Token:</label>
          <textarea
            value={token}
            onChange={(e) => setToken(e.target.value)}
            className="w-full h-32 bg-purple-900/10 text-purple-100/80 p-4 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none font-mono text-sm resize-none"
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
          />
          {error && <p className="text-red-400 text-sm mt-2">✗ {error}</p>}
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={decodeJWT}
            className="px-8 py-3 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold"
          >
            Decode Token
          </button>
          <button
            onClick={() => {
              setToken('');
              setHeader('');
              setPayload('');
              setSignature('');
              setError('');
            }}
            className="px-8 py-3 bg-transparent text-purple-200/60 rounded-lg border border-purple-600/20 hover:border-purple-500/40 transition-all font-semibold"
          >
            Clear
          </button>
        </div>

        {/* Decoded Parts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <label className="block text-purple-200/60 mb-2 font-semibold">Header:</label>
            <textarea
              value={header}
              readOnly
              className="w-full h-64 bg-purple-900/10 text-purple-100/80 p-4 rounded-lg border border-purple-500/20 font-mono text-sm resize-none"
              placeholder="Decoded header..."
            />
          </div>

          <div>
            <label className="block text-purple-200/60 mb-2 font-semibold">Payload:</label>
            <textarea
              value={payload}
              readOnly
              className="w-full h-64 bg-purple-900/10 text-purple-100/80 p-4 rounded-lg border border-purple-500/20 font-mono text-sm resize-none"
              placeholder="Decoded payload..."
            />
          </div>

          <div>
            <label className="block text-purple-200/60 mb-2 font-semibold">Signature:</label>
            <textarea
              value={signature}
              readOnly
              className="w-full h-64 bg-purple-900/10 text-purple-100/80 p-4 rounded-lg border border-purple-500/20 font-mono text-sm resize-none break-all"
              placeholder="Signature..."
            />
          </div>
        </div>

        {/* SEO Content */}
        <div className="mt-16 max-w-4xl mx-auto prose prose-invert prose-purple">
          <h2 className="text-3xl font-bold text-purple-100/70 mb-6">About JWT Decoder</h2>
          <p className="text-purple-200/50 leading-relaxed mb-4">
            JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained
            way for securely transmitting information between parties as a JSON object. This tool helps
            you decode and inspect JWT tokens without verification.
          </p>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">JWT Structure</h3>
          <ul className="list-disc list-inside text-purple-200/40 space-y-2">
            <li><strong>Header:</strong> Contains token type (JWT) and signing algorithm (HS256, RS256, etc.)</li>
            <li><strong>Payload:</strong> Contains claims (user data, expiration, issuer, etc.)</li>
            <li><strong>Signature:</strong> Verifies the token hasn't been tampered with</li>
          </ul>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">Common Use Cases</h3>
          <ul className="list-disc list-inside text-purple-200/40 space-y-2">
            <li>User authentication and authorization</li>
            <li>API authentication (Bearer tokens)</li>
            <li>Single Sign-On (SSO) systems</li>
            <li>Secure data exchange between services</li>
            <li>OAuth 2.0 and OpenID Connect</li>
          </ul>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">Security Note</h3>
          <p className="text-purple-200/50 leading-relaxed">
            This tool only decodes JWT tokens - it does not verify signatures. Never share your
            secret keys publicly. JWT tokens should be transmitted over HTTPS and stored securely.
          </p>
        </div>
      </div>
    </div>
  );
}
