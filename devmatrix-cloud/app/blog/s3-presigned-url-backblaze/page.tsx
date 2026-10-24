'use client';
import JsonLdArticle from '@/components/JsonLdArticle';
import { AlertCircle, Check, Copy, DollarSign, Download, LucideIcon, Shield, Upload, Zap } from 'lucide-react';
import { useState } from 'react';


export default function S3PresignedUrlBackblazeBlog() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string): void => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const nodeJsCode = `const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const client = new S3Client({
  endpoint: 'https://s3.us-west-004.backblazeb2.com',
  region: 'us-west-004',
  credentials: {
    accessKeyId: process.env.B2_KEY_ID,
    secretAccessKey: process.env.B2_KEY,
  },
});

const command = new GetObjectCommand({
  Bucket: 'my-bucket',
  Key: 'private/path/secret.pdf'
});

(async () => {
  const url = await getSignedUrl(client, command, { expiresIn: 3600 });
  console.log('Presigned URL:', url);
})();`;

  const pythonCode = `import boto3
from botocore.client import Config

# Initialize S3 client with Backblaze endpoint
s3_client = boto3.client(
    's3',
    endpoint_url='https://s3.us-west-004.backblazeb2.com',
    aws_access_key_id=os.environ['B2_KEY_ID'],
    aws_secret_access_key=os.environ['B2_KEY'],
    config=Config(signature_version='s3v4'),
    region_name='us-west-004'
)

# Generate presigned URL (valid for 1 hour)
presigned_url = s3_client.generate_presigned_url(
    'get_object',
    Params={'Bucket': 'my-bucket', 'Key': 'private/path/secret.pdf'},
    ExpiresIn=3600
)
print(f'Presigned URL: {presigned_url}')`;

  const uploadCode = `const { PutObjectCommand } = require('@aws-sdk/client-s3');

const uploadCommand = new PutObjectCommand({
  Bucket: 'my-bucket',
  Key: 'uploads/new-file.pdf',
  ContentType: 'application/pdf'
});

const uploadUrl = await getSignedUrl(client, uploadCommand, {
  expiresIn: 1800  // 30 minutes
});

// Frontend: Use the URL to upload
const response = await fetch(uploadUrl, {
  method: 'PUT',
  body: fileData,
  headers: { 'Content-Type': 'application/pdf' }
});`;

  const CodeBlock = ({ code, language, id }: { code: string; language: string; id: string }) => (
    <div className="relative group my-6">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
      <div className="relative bg-gray-900 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <span className="text-sm font-mono text-gray-400">{language}</span>
          <button
            onClick={() => copyToClipboard(code, id)}
            className="flex items-center gap-2 px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
          >
            {copiedCode === id ? (
              <>
                <Check className="w-3 h-3" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                Copy
              </>
            )}
          </button>
        </div>
        <pre className="p-4 overflow-x-auto text-sm">
          <code className="text-gray-100 font-mono">{code}</code>
        </pre>
      </div>
    </div>
  );

 const FeatureCard = ({
   icon: Icon,
   title,
   description,
 }: {
   icon: LucideIcon;
   title: string;
   description: string;
 }) => (
   <div className="group relative">
     <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
     <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
       <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
         <Icon className="w-6 h-6 text-white" />
       </div>
       <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
         {title}
       </h3>
       <p className="text-gray-600 dark:text-gray-300">
         {description}
       </p>
     </div>
   </div>
 );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <JsonLdArticle
        headline="Mastering S3 Presigned URLs with Backblaze: A Practical Guide"
        description="Explore how to generate and use S3 presigned URLs with Backblaze B2, including code examples, security best practices, and a real-world analogy with the Newcastle vs Man City match."
        datePublished="2025-11-23"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/s3-presigned-url-backblaze"
      />
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.15) 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
        
        <article className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-6">
              <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Cloud Storage Guide</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Mastering S3 Presigned URLs<br />
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                with Backblaze
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Generate secure, time-limited access to private storage objects with S3-compatible APIs. 
              Learn implementation, best practices, and cost optimization.
            </p>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">80%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Lower Storage Costs</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">S3 Compatible</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">5min</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Setup Time</div>
            </div>
          </div>

          {/* Introduction */}
          <section className="mb-12 sm:mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-200 dark:border-gray-700 shadow-xl">
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                <strong className="text-purple-600 dark:text-purple-400">S3 presigned URLs</strong> are cryptographically signed, 
                time-limited links that grant temporary access to private objects in cloud storage. They're essential for secure file 
                sharing without exposing credentials or making buckets public.
              </p>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                With <strong>Backblaze B2's S3-Compatible API</strong>, you get all the power of AWS S3 presigned URLs at a 
                fraction of the cost—up to 80% cheaper! This guide covers implementation, security, and includes a memorable 
                football analogy (Newcastle 2-1 Man City) to help you understand access control.
              </p>
            </div>
          </section>

          {/* What is a Presigned URL */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
              What is a Presigned URL? 🔐
            </h2>
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 sm:p-8 border border-purple-200 dark:border-gray-700">
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                A <strong>presigned URL</strong> is a special web address that includes authentication information in the URL itself. 
                It allows anyone with the link to access a private object without needing AWS credentials or authentication headers.
              </p>
              
              <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6 mb-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-sm sm:text-base">The signature encodes:</h3>
                <ul className="space-y-2 text-sm sm:text-base text-gray-700 dark:text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 dark:text-purple-400 mt-1">✓</span>
                    <span><strong>Who issued it:</strong> Your access key ID</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 dark:text-purple-400 mt-1">✓</span>
                    <span><strong>What operation:</strong> GET (download), PUT (upload), DELETE, etc.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 dark:text-purple-400 mt-1">✓</span>
                    <span><strong>Which object:</strong> Bucket name and object key/path</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 dark:text-purple-400 mt-1">✓</span>
                    <span><strong>When it expires:</strong> Unix timestamp for expiration</span>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200">
                      <strong>Key Benefit:</strong> Both AWS S3 and Backblaze B2 S3-Compatible APIs support presigned URLs, 
                      making them ideal for secure, credential-free data transfers across platforms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Use Backblaze */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
              Why Choose Backblaze? 💰
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <FeatureCard
                icon={Zap}
                title="S3 Compatible"
                description="Drop-in replacement for AWS S3. Use standard SDKs (boto3, AWS SDK) with just endpoint changes."
              />
              <FeatureCard
                icon={DollarSign}
                title="Massive Savings"
                description="Up to 80% cheaper storage and egress costs compared to AWS S3. Free egress with Bandwidth Alliance."
              />
              <FeatureCard
                icon={Shield}
                title="Enterprise Security"
                description="Same security model as AWS. Encrypted transfers, time-limited access, and cryptographic signatures."
              />
            </div>
          </section>

          {/* Step-by-Step Guide */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
              Implementation Guide 🚀
            </h2>
            
            {/* Steps */}
            <div className="space-y-6">
              {[
                {
                  num: "1",
                  title: "Create Application Key",
                  content: "Navigate to Backblaze console → App Keys → Create new key. Select S3 Compatible API and note your keyID and applicationKey."
                },
                {
                  num: "2",
                  title: "Install AWS SDK",
                  content: "For Node.js: npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner. For Python: pip install boto3."
                },
                {
                  num: "3",
                  title: "Configure Endpoint",
                  content: "Point SDK to Backblaze endpoint (e.g., s3.us-west-004.backblazeb2.com) instead of AWS endpoints."
                },
                {
                  num: "4",
                  title: "Generate URL",
                  content: "Use SDK methods like getSignedUrl() or generate_presigned_url() with your desired expiration time."
                }
              ].map((step) => (
                <div key={step.num} className="flex gap-4 sm:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg">
                      {step.num}
                    </div>
                  </div>
                  <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{step.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Code Examples */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
              Code Examples 💻
            </h2>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Download className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Download (GET) - Node.js</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
                Generate a presigned URL to allow temporary downloads of a private object:
              </p>
              <CodeBlock code={nodeJsCode} language="JavaScript" id="nodejs" />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Download className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Download (GET) - Python</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
                Using boto3 to generate presigned URLs with Backblaze:
              </p>
              <CodeBlock code={pythonCode} language="Python" id="python" />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 lg:p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <Upload className="w-6 h-6 text-green-600 dark:text-green-400" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Upload (PUT) - Node.js</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4">
                Allow users to upload files directly to Backblaze without exposing credentials:
              </p>
              <CodeBlock code={uploadCode} language="JavaScript" id="upload" />
            </div>
          </section>

          {/* Match Analogy */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
              The Stadium Analogy ⚽
            </h2>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 sm:p-8 lg:p-10 border-2 border-green-300 dark:border-green-700">
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-3xl flex-shrink-0">
                  ⚽
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Newcastle 2-1 Man City (November 2025)
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                    Imagine how presigned URLs work using this epic upset as an analogy...
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6">
                  <div className="text-2xl mb-3">🏟️</div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">The Stadium = Storage Bucket</h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Private and secure. Only those with valid tickets (presigned URLs) can enter.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6">
                  <div className="text-2xl mb-3">🎫</div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">The Ticket = Presigned URL</h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Cryptographically signed by the club (API), valid for one match (object) and time window.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6">
                  <div className="text-2xl mb-3">🔐</div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Gate Security = Backblaze API</h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    Validates signature and expiry time. No credentials needed at the gate!
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-6">
                  <div className="text-2xl mb-3">⏰</div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">Final Whistle = Expiration</h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                    After expiry, even valid tickets can't grant re-entry. Access is revoked automatically.
                  </p>
                </div>
              </div>

              <div className="mt-6 bg-green-100 dark:bg-green-900/30 rounded-xl p-4 sm:p-6">
                <p className="text-sm sm:text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                  <strong>The Upset:</strong> During Newcastle's stunning 2-1 victory, only fans with properly signed tickets 
                  saw Barnes score both goals. After the match ended (URL expired), even Haaland with an old season pass 
                  (expired/invalid presigned URL) couldn't get back in! 🎯
                </p>
              </div>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
              Backblaze vs AWS S3 📊
            </h2>
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 rounded-xl">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                          Feature
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                          Backblaze B2
                        </th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                          AWS S3
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                          Presigned URL Support
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                          ✅ Full support (GET, PUT, DELETE)
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                          ✅ Full SDK support
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                          Storage Cost (per GB)
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                          <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            $0.006/GB
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                          $0.023/GB (Standard)
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                          Egress/Bandwidth
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm">
                          <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                            Free with Bandwidth Alliance
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                          $0.09/GB
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                          API Compatibility
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                          S3-Compatible (endpoint change only)
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                          Native AWS SDK
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                          Setup Complexity
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                          5 minutes (change endpoint)
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                          Standard AWS setup
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900 dark:text-white">
                          Max URL Expiry
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                          7 days
                        </td>
                        <td className="px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                          7 days
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          {/* Security Best Practices */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
              Security Best Practices 🔒
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {[
                {
                  icon: "⏰",
                  title: "Minimize Expiration Time",
                  desc: "Use the shortest expiry that works for your use case. For downloads: 5-60 minutes. For uploads: 15-30 minutes.",
                  priority: "Critical"
                },
                {
                  icon: "🔐",
                  title: "Always Use HTTPS",
                  desc: "Never use HTTP for presigned URLs. The signature protects tampering, but HTTPS protects the URL itself in transit.",
                  priority: "Critical"
                },
                {
                  icon: "📝",
                  title: "Validate Uploads",
                  desc: "For PUT presigned URLs, validate content type, file size, and scan for malware. Add Content-Type restrictions.",
                  priority: "High"
                },
                {
                  icon: "🚫",
                  title: "Never Expose Keys",
                  desc: "Generate presigned URLs server-side only. Never put API keys in frontend code or client applications.",
                  priority: "Critical"
                },
                {
                  icon: "📊",
                  title: "Monitor Usage",
                  desc: "Log presigned URL generation and usage. Set up alerts for unusual patterns or excessive requests.",
                  priority: "Medium"
                },
                {
                  icon: "🔄",
                  title: "Rotate Credentials",
                  desc: "Regularly rotate your Backblaze application keys. Old URLs will stop working, enhancing security.",
                  priority: "High"
                }
              ].map((practice, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{practice.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">{practice.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                          practice.priority === 'Critical' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                          practice.priority === 'High' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
                          'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}>
                          {practice.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{practice.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Advanced Use Cases */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
              Advanced Use Cases 🎯
            </h2>
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 sm:p-8 border border-purple-200 dark:border-gray-700">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">📱 Direct Mobile Uploads</h3>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
                  Mobile apps can request presigned PUT URLs from your backend, then upload directly to Backblaze without 
                  proxying through your servers. This saves bandwidth and reduces latency.
                </p>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 text-xs sm:text-sm font-mono text-gray-800 dark:text-gray-200">
                  Backend → Generate PUT URL → Send to Mobile → Mobile uploads directly to B2
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 sm:p-8 border border-green-200 dark:border-gray-700">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">📧 Secure Email Attachments</h3>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
                  Instead of attaching large files to emails, generate short-lived presigned URLs (1-7 days) and share the link. 
                  Recipients can download without authentication.
                </p>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 text-xs sm:text-sm font-mono text-gray-800 dark:text-gray-200">
                  Store file → Generate URL (7 days) → Email link → Recipient downloads
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 sm:p-8 border border-orange-200 dark:border-gray-700">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">🎥 Video Streaming</h3>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
                  Generate presigned URLs for video content with appropriate expiry. Video players can stream directly from 
                  Backblaze with byte-range requests supported.
                </p>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 text-xs sm:text-sm font-mono text-gray-800 dark:text-gray-200">
                  User requests video → Generate URL → HLS/MP4 streams from B2 → Expires after viewing
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-800 rounded-xl p-6 sm:p-8 border border-blue-200 dark:border-gray-700">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">📊 Report Generation</h3>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-4">
                  Generate reports server-side, upload to Backblaze, create a presigned URL, and share with stakeholders. 
                  Reports auto-expire after a set period.
                </p>
                <div className="bg-white dark:bg-gray-900 rounded-lg p-4 text-xs sm:text-sm font-mono text-gray-800 dark:text-gray-200">
                  Cron job → Generate PDF → Upload to B2 → Create URL (24h) → Notify users
                </div>
              </div>
            </div>
          </section>

          {/* Troubleshooting */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
              Troubleshooting Guide 🔧
            </h2>
            <div className="space-y-4">
              {[
                {
                  problem: "SignatureDoesNotMatch Error",
                  solution: "Verify your endpoint URL, region, access key ID, and secret key are correct. Ensure no extra whitespace in credentials.",
                  code: "Double-check: endpoint, region, credentials"
                },
                {
                  problem: "URL Expired / AccessDenied",
                  solution: "The presigned URL has expired or was generated with incorrect permissions. Generate a new URL with appropriate expiry time.",
                  code: "Check: Date/time sync, expiry duration"
                },
                {
                  problem: "CORS Errors on Frontend",
                  solution: "Configure CORS rules in your Backblaze bucket settings to allow your domain. Include appropriate headers for GET/PUT operations.",
                  code: "Set CORS: AllowedOrigins, AllowedMethods, AllowedHeaders"
                },
                {
                  problem: "Upload Fails Silently",
                  solution: "Ensure Content-Type header matches what was specified in PutObjectCommand. Verify file size doesn't exceed limits.",
                  code: "Match Content-Type in presigned URL and upload request"
                },
                {
                  problem: "Private Bucket Shows Public",
                  solution: "Backblaze presigned URLs only work on private buckets. Public buckets don't need presigned URLs—use direct links instead.",
                  code: "Check bucket settings: must be Private"
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-4 sm:p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2">{item.problem}</h3>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-3">{item.solution}</p>
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 text-xs sm:text-sm font-mono text-gray-700 dark:text-gray-300">
                          {item.code}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Performance Tips */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
              Performance Optimization ⚡
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="text-3xl mb-4">🚀</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Cache URLs Wisely</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  If serving the same file to multiple users, generate one presigned URL and cache it on your backend 
                  until it's close to expiry.
                </p>
                <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
                  ⚡ Reduces API calls by 90%
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="text-3xl mb-4">🌍</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Use CDN Edge Caching</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Combine presigned URLs with CloudFlare or other CDNs. Set appropriate Cache-Control headers 
                  for frequently accessed files.
                </p>
                <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
                  ⚡ Faster global delivery
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="text-3xl mb-4">📦</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Batch URL Generation</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  When displaying lists of files, generate presigned URLs in batch operations rather than 
                  one-by-one to reduce round-trip time.
                </p>
                <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
                  ⚡ Parallel processing
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="text-3xl mb-4">⏲️</div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Lazy Generate URLs</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Don't generate presigned URLs until user initiates action. Generate on-demand when 
                  download/upload button is clicked.
                </p>
                <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
                  ⚡ Saves unused generations
                </div>
              </div>
            </div>
          </section>

          {/* Cost Comparison */}
          <section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
              Real Cost Savings Example 💰
            </h2>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 sm:p-8 lg:p-10 border-2 border-green-300 dark:border-green-700">
              <div className="text-center mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Scenario: Video Platform
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                  10TB storage, 50TB bandwidth per month
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6">
                  <div className="text-center mb-4">
                    <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">AWS S3</div>
                    <div className="text-4xl font-bold text-gray-900 dark:text-white">$4,730</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">/month</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Storage (10TB):</span>
                      <span className="font-semibold text-gray-900 dark:text-white">$230</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Bandwidth (50TB):</span>
                      <span className="font-semibold text-gray-900 dark:text-white">$4,500</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white relative overflow-hidden">
                  <div className="absolute top-2 right-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold">
                    SAVE 98%
                  </div>
                  <div className="text-center mb-4">
                    <div className="text-sm font-semibold mb-2 opacity-90">Backblaze B2</div>
                    <div className="text-4xl font-bold">$60</div>
                    <div className="text-xs opacity-75 mt-1">/month</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="opacity-90">Storage (10TB):</span>
                      <span className="font-semibold">$60</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="opacity-90">Bandwidth (50TB):</span>
                      <span className="font-semibold">$0*</span>
                    </div>
                  </div>
                  <div className="mt-4 text-xs opacity-75">
                    *Free with Bandwidth Alliance partners
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                  Annual Savings: $56,040
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Enough to hire another developer or invest in growth!
                </p>
              </div>
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12 sm:mb-16">
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-6 sm:p-8 lg:p-10 border-2 border-purple-300 dark:border-purple-700">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Ready to Get Started? 🚀
              </h2>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Presigned URLs are a powerful tool for secure, scalable file access in cloud storage. With Backblaze's 
                S3-Compatible API, you get enterprise-grade security and performance at a fraction of AWS costs. Whether 
                you're building a file-sharing platform, mobile app, or video streaming service, presigned URLs provide 
                the perfect balance of security, convenience, and cost-effectiveness.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://www.backblaze.com/sign-up/cloud-storage" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:shadow-lg"
                >
                  Start Free Trial
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a 
                  href="https://www.backblaze.com/docs/cloud-storage" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 font-semibold rounded-lg border-2 border-purple-600 dark:border-purple-400 hover:bg-purple-50 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  Read Documentation
                </a>
              </div>
            </div>
          </section>

          {/* References */}
          <section className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              References & Further Reading 📚
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <ul className="space-y-3">
                {[
                  {
                    title: "Backblaze: B2 Native vs S3-Compatible API",
                    url: "https://www.backblaze.com/blog/whats-the-diff-backblaze-s3-compatible-api-vs-b2-native-api/"
                  },
                  {
                    title: "AWS: Securing S3 presigned URLs for Serverless",
                    url: "https://aws.amazon.com/blogs/compute/securing-amazon-s3-presigned-urls-for-serverless-applications/"
                  },
                  {
                    title: "AWS Docs: Share Objects with Presigned URLs",
                    url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html"
                  },
                  {
                    title: "Backblaze S3 Compatible API Documentation",
                    url: "https://www.backblaze.com/docs/cloud-storage-s3-compatible-api"
                  },
                  {
                    title: "Newcastle 2-1 Man City Match Report",
                    url: "https://www.flashscore.com/news/soccer-premier-league-barnes-scores-twice-as-quickfire-newcastle-down-man-city/UD9Pdbkn/"
                  }
                ].map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 text-sm sm:text-base text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors group"
                    >
                      <svg className="w-5 h-5 flex-shrink-0 mt-0.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                      <span className="group-hover:underline">{link.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Footer Note */}
          <div className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p>Last updated: November 2025 | Built with Next.js & Tailwind CSS</p>
          </div>
        </article>
      </div>
    </div>
  );
}