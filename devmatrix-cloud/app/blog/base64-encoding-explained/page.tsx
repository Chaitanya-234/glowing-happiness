'use client';
// app/blog/base64-encoding-explained/page.tsx
import { useTheme } from '@/components/providers/ThemeProvider';
import JsonLdArticle from '@/components/JsonLdArticle';
import { Metadata } from 'next';
import Link from 'next/link';

const metadata: Metadata = {
  title: 'Base64 Encoding Explained: When and How to Use It | DevMetrix',
  description: 'Understand Base64 encoding, its use cases, implementation, performance implications, and alternatives for modern web development.',
  keywords: ['base64', 'encoding', 'data encoding', 'base64 javascript', 'binary data'],
};

export default function Base64EncodingGuide() {
  const { currentTheme: theme } = useTheme();
  return (
    <article className={`min-h-screen ${theme.colors.background} pt-24 pb-20 px-4 transition-colors duration-300`}>
      <JsonLdArticle
        headline="Base64 Encoding Explained: When and How to Use It"
        description="Understand Base64 encoding, its use cases, performance implications, and alternatives for modern web development."
        datePublished="2025-10-23"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/base64-encoding-explained"
      />
      <div className="max-w-4xl mx-auto prose prose-invert prose-purple prose-lg">
        <h1 className="text-5xl font-bold text-purple-100/80 mb-4">
          Base64 Encoding Explained: When and How to Use It
        </h1>

        <div className="flex gap-4 text-sm text-purple-300/40 mb-8">
          <span>October 23, 2025</span>
          <span>•</span>
          <span>20 min read</span>
          <span>•</span>
          <span>Tutorial</span>
        </div>

        <p className="text-xl text-purple-200/60 leading-relaxed">
          Base64 encoding is a fundamental technique in web development for converting binary data
          into text format. This guide covers everything from basic concepts to practical applications,
          performance considerations, and when to use alternatives.
        </p>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          What is Base64 Encoding?
        </h2>

        <p className="text-purple-200/50 leading-relaxed">
          Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string
          format. It encodes binary data using 64 printable ASCII characters, making it safe for
          transmission over systems designed to handle text data.
        </p>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Why Base64?
        </h3>

        <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6 my-6">
          <ul className="space-y-3 text-purple-200/50">
            <li>✅ <strong className="text-purple-200/70">Text-Safe:</strong> Contains only printable ASCII characters</li>
            <li>✅ <strong className="text-purple-200/70">Email-Safe:</strong> Compatible with MIME email protocols</li>
            <li>✅ <strong className="text-purple-200/70">URL-Safe:</strong> Variant available for URLs</li>
            <li>✅ <strong className="text-purple-200/70">Universal:</strong> Supported across all platforms</li>
            <li>❌ <strong className="text-purple-200/70">Not Encryption:</strong> Data is easily decodable</li>
            <li>❌ <strong className="text-purple-200/70">Size Overhead:</strong> Increases data size by ~33%</li>
          </ul>
        </div>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          The Base64 Character Set
        </h2>

        <p className="text-purple-200/50">
          Base64 uses 64 characters to encode data:
        </p>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 my-6">
          <code className="text-purple-100/80">{`A-Z: Uppercase letters (26 characters)
a-z: Lowercase letters (26 characters)
0-9: Digits (10 characters)
+   : Plus sign
/   : Forward slash
=   : Padding character

Total: 64 characters + 1 padding`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          URL-Safe Variant
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`Standard Base64: + and /
URL-Safe:       - and _

// Standard
"Hello+World/Test"

// URL-Safe
"Hello-World_Test"`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          How Base64 Encoding Works
        </h2>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Step-by-Step Process
        </h3>

        <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6 my-6">
          <ol className="space-y-4 text-purple-200/50">
            <li><strong className="text-purple-200/70">1. Convert to Binary:</strong> Convert each character to 8-bit binary</li>
            <li><strong className="text-purple-200/70">2. Group by 6:</strong> Split binary into 6-bit groups</li>
            <li><strong className="text-purple-200/70">3. Convert to Decimal:</strong> Convert each 6-bit group to decimal (0-63)</li>
            <li><strong className="text-purple-200/70">4. Map to Characters:</strong> Map decimal values to Base64 characters</li>
            <li><strong className="text-purple-200/70">5. Add Padding:</strong> Add '=' characters if needed</li>
          </ol>
        </div>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Example: Encoding "Hi"
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`Text:    H        i
ASCII:   72       105
Binary:  01001000 01101001

Group by 6 bits:
010010 000110 1001--

Add padding (needs 2 bits):
010010 000110 100100

Decimal:
18     6      36     (pad)

Base64:
S      G      k      =

Result: "SGk="`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          JavaScript Implementation
        </h2>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Basic Encoding and Decoding
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Encoding a string
const text = "Hello, World!";
const encoded = btoa(text);
console.log(encoded);
// Output: "SGVsbG8sIFdvcmxkIQ=="

// Decoding
const decoded = atob(encoded);
console.log(decoded);
// Output: "Hello, World!"

// Note: btoa/atob only work with ASCII characters`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Encoding Unicode Text
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Problem: btoa doesn't handle Unicode
const unicode = "Hello 世界";
// btoa(unicode); // ❌ Error!

// Solution 1: Use TextEncoder/TextDecoder (Modern)
function encodeUnicode(str) {
  const encoder = new TextEncoder();
  const uint8Array = encoder.encode(str);
  const binaryString = String.fromCharCode(...uint8Array);
  return btoa(binaryString);
}

function decodeUnicode(base64) {
  const binaryString = atob(base64);
  const uint8Array = new Uint8Array(
    [...binaryString].map(char => char.charCodeAt(0))
  );
  const decoder = new TextDecoder();
  return decoder.decode(uint8Array);
}

// Usage
const encoded = encodeUnicode("Hello 世界");
console.log(encoded);
// Output: "SGVsbG8g5LiW55WM"

const decoded = decodeUnicode(encoded);
console.log(decoded);
// Output: "Hello 世界"

// Solution 2: Use encodeURIComponent (Simpler)
function encodeBase64(str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
      (match, p1) => String.fromCharCode(parseInt(p1, 16))
    )
  );
}

function decodeBase64(base64) {
  return decodeURIComponent(
    atob(base64).split('').map(c =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join('')
  );
}`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Encoding Files and Images
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Encode file to Base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      // Result includes data URL prefix
      const base64 = reader.result;
      resolve(base64);
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Usage
const input = document.querySelector('input[type="file"]');
input.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  const base64 = await fileToBase64(file);

  console.log(base64);
  // Output: "data:image/png;base64,iVBORw0KGgoAAAANS..."

  // Remove data URL prefix if needed
  const base64Data = base64.split(',')[1];
});

// Display Base64 image
function displayBase64Image(base64) {
  const img = document.createElement('img');
  img.src = \`data:image/png;base64,\${base64}\`;
  document.body.appendChild(img);
}

// Convert Base64 back to File
function base64ToFile(base64, filename, mimeType) {
  // Remove data URL prefix if present
  const base64Data = base64.split(',').pop();

  // Decode Base64
  const binaryString = atob(base64Data);

  // Create byte array
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Create Blob
  const blob = new Blob([bytes], { type: mimeType });

  // Create File
  return new File([blob], filename, { type: mimeType });
}`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Common Use Cases
        </h2>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          1. Embedding Images in HTML/CSS
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`<!-- HTML -->
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA..."
     alt="Small image">

/* CSS */
.icon {
  background-image: url(data:image/png;base64,iVBORw0KGgo...);
}

// Benefits:
// ✅ Reduces HTTP requests
// ✅ Faster for small images
// ❌ Increases HTML/CSS file size
// ❌ Not cacheable separately`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          2. Email Attachments
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// MIME email with Base64 attachment
const emailTemplate = \`
Content-Type: multipart/mixed; boundary="boundary123"

--boundary123
Content-Type: text/plain

This is the email body.

--boundary123
Content-Type: application/pdf;
Content-Disposition: attachment; filename="document.pdf"
Content-Transfer-Encoding: base64

JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIK...
--boundary123--
\`;`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          3. API Data Transfer
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Sending file via JSON API
async function uploadFile(file) {
  const base64 = await fileToBase64(file);

  const response = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      filename: file.name,
      mimeType: file.type,
      data: base64.split(',')[1] // Remove data URL prefix
    })
  });

  return response.json();
}

// Server-side (Node.js)
app.post('/api/upload', (req, res) => {
  const { filename, mimeType, data } = req.body;

  // Decode Base64
  const buffer = Buffer.from(data, 'base64');

  // Save file
  fs.writeFileSync(\`./uploads/\${filename}\`, buffer);

  res.json({ success: true });
});`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          4. Basic Authentication
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Basic Auth header
const username = 'user@example.com';
const password = 'secretpassword';

// Encode credentials
const credentials = btoa(\`\${username}:\${password}\`);

// Add to request header
fetch('/api/protected', {
  headers: {
    'Authorization': \`Basic \${credentials}\`
  }
});

// Server-side decoding
const authHeader = req.headers.authorization;
const credentials = authHeader.split(' ')[1];
const decoded = atob(credentials);
const [username, password] = decoded.split(':');

// Note: ALWAYS use HTTPS with Basic Auth!`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Performance Considerations
        </h2>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Size Overhead
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Base64 increases size by ~33%
Original: 1000 bytes
Base64:   1333 bytes (33% larger)

// Example comparison
const text = "Hello World!"; // 12 bytes
const encoded = btoa(text);  // 16 bytes (33% larger)

// For large files, this overhead is significant
Original file: 10 MB
Base64 encoded: ~13.3 MB`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          When NOT to Use Base64
        </h3>

        <div className="bg-red-900/10 border border-red-500/30 rounded-lg p-6 my-6">
          <p className="text-red-300 font-semibold mb-3">❌ Avoid Base64 for:</p>
          <ul className="space-y-2 text-red-200/70">
            <li>Large files (&gt; 100KB) - Use direct file upload instead</li>
            <li>Frequently changing data - Not cacheable efficiently</li>
            <li>Public images - Use CDN with proper URLs</li>
            <li>Video/audio files - Always use streaming</li>
            <li>Sensitive data without encryption - Base64 is NOT secure</li>
          </ul>
        </div>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          When TO Use Base64
        </h3>

        <div className="bg-green-900/10 border border-green-500/30 rounded-lg p-6 my-6">
          <p className="text-green-300 font-semibold mb-3">✅ Good use cases:</p>
          <ul className="space-y-2 text-green-200/70">
            <li>Small images/icons (&lt; 10KB) in CSS</li>
            <li>Email attachments (MIME standard)</li>
            <li>Temporary file transfers in JSON APIs</li>
            <li>Embedded fonts in CSS</li>
            <li>Generating downloadable files client-side</li>
          </ul>
        </div>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Alternative Solutions
        </h2>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          1. FormData (For File Uploads)
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Better than Base64 for large files
const formData = new FormData();
formData.append('file', file);
formData.append('description', 'My file');

fetch('/api/upload', {
  method: 'POST',
  body: formData
  // Content-Type automatically set
});

// Benefits:
// ✅ No size overhead
// ✅ Browser handles multipart encoding
// ✅ Better for large files
// ✅ Can upload multiple files`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          2. Blob URLs (For Browser Display)
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Create temporary URL for file
const file = event.target.files[0];
const blobUrl = URL.createObjectURL(file);

// Use in img tag
document.getElementById('preview').src = blobUrl;

// Clean up when done
URL.revokeObjectURL(blobUrl);

// Benefits:
// ✅ No encoding overhead
// ✅ Faster for large files
// ✅ Works with video/audio
// ⚠️ Only works in browser`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          3. Direct Binary Transfer
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Send binary data directly
fetch('/api/upload', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/octet-stream'
  },
  body: file
});

// Server receives raw binary data
app.post('/api/upload', (req, res) => {
  // req.body is Buffer
  fs.writeFileSync('file.bin', req.body);
});`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Security Considerations
        </h2>

        <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6 my-6">
          <h4 className="text-lg font-semibold text-purple-100/70 mb-4">⚠️ Important Security Notes:</h4>
          <ul className="space-y-3 text-purple-200/50">
            <li><strong className="text-purple-200/70">Not Encryption:</strong> Base64 is encoding, not encryption. Anyone can decode it.</li>
            <li><strong className="text-purple-200/70">Validate Input:</strong> Always validate decoded data before using it.</li>
            <li><strong className="text-purple-200/70">Size Limits:</strong> Implement size limits to prevent DOS attacks.</li>
            <li><strong className="text-purple-200/70">Content Type:</strong> Verify MIME types of decoded files.</li>
            <li><strong className="text-purple-200/70">Use HTTPS:</strong> Always transmit Base64 data over HTTPS.</li>
          </ul>
        </div>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Validating Base64 Data
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Validate Base64 string
function isValidBase64(str) {
  // Check if string contains only valid Base64 characters
  const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;

  if (!base64Regex.test(str)) {
    return false;
  }

  // Try to decode
  try {
    atob(str);
    return true;
  } catch (e) {
    return false;
  }
}

// Validate file size after decoding
function validateBase64FileSize(base64, maxSizeMB = 5) {
  // Calculate approximate size
  const sizeInBytes = (base64.length * 3) / 4;
  const sizeInMB = sizeInBytes / (1024 * 1024);

  return sizeInMB <= maxSizeMB;
}

// Validate MIME type from data URL
function getMimeType(dataUrl) {
  const match = dataUrl.match(/data:([^;]+);/);
  return match ? match[1] : null;
}

const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
const mimeType = getMimeType(dataUrl);

if (!allowedTypes.includes(mimeType)) {
  throw new Error('Invalid file type');
}`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Browser Compatibility
        </h2>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Check for Base64 support
if (typeof btoa === 'function' && typeof atob === 'function') {
  // Browser supports Base64
  console.log('Base64 supported');
} else {
  // Fallback for very old browsers
  console.log('Base64 not supported');
}

// Note: All modern browsers support Base64
// btoa/atob: IE10+, Chrome, Firefox, Safari, Edge`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Best Practices
        </h2>

        <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6 my-6">
          <ol className="space-y-3 text-purple-200/50">
            <li><strong className="text-purple-200/70">1. Size Limit:</strong> Only encode small files (&lt; 100KB)</li>
            <li><strong className="text-purple-200/70">2. Caching:</strong> Cache Base64 strings to avoid re-encoding</li>
            <li><strong className="text-purple-200/70">3. Lazy Loading:</strong> Don't embed large Base64 in initial page load</li>
            <li><strong className="text-purple-200/70">4. Compression:</strong> Consider compressing before Base64 encoding</li>
            <li><strong className="text-purple-200/70">5. Security:</strong> Validate all decoded data</li>
            <li><strong className="text-purple-200/70">6. Alternatives:</strong> Use FormData or direct binary for large files</li>
            <li><strong className="text-purple-200/70">7. Documentation:</strong> Document why Base64 is used in your code</li>
          </ol>
        </div>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Conclusion
        </h2>

        <p className="text-purple-200/50 leading-relaxed">
          Base64 encoding is a useful tool for specific scenarios, particularly for embedding small
          images, handling email attachments, and transferring binary data in JSON APIs. However, it's
          important to understand its limitations and use it appropriately.
        </p>

        <p className="text-purple-200/50 leading-relaxed mt-4">
          For large files, consider alternatives like FormData, Blob URLs, or direct binary transfer.
          Always prioritize performance and user experience when deciding whether to use Base64 encoding
          in your applications.
        </p>

        <div className="mt-12 p-6 bg-purple-900/20 border border-purple-500/20 rounded-lg">
          <h3 className="text-2xl font-semibold text-purple-100/70 mb-4">
            Try Our Base64 Encoder/Decoder
          </h3>
          <p className="text-purple-200/50 mb-4">
            Encode and decode Base64 strings instantly with our free online tool. Supports text, files, and URL-safe encoding!
          </p>
          <Link
            href="/tools/base64-encoder"
            className="inline-block px-6 py-3 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold no-underline"
          >
            Try Base64 Encoder →
          </Link>
        </div>
      </div>
    </article>
  );
}
