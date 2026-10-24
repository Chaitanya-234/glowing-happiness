// app/tools/json-formatter/page.tsx
import { Metadata } from 'next';
import JSONFormatterClient from './JSONFormatterClient';

export const metadata: Metadata = {
  title: 'JSON Formatter & Validator - Free Online Tool | DevMetrix',
  description: 'Format, validate, and beautify JSON data online. Free JSON formatter with syntax highlighting, error detection, and minification. No signup required.',
  keywords: ['json formatter', 'json validator', 'prettify json', 'json beautifier', 'online json tool'],
};

export default function JSONFormatterPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <JSONFormatterClient />
      
      {/* SEO Content Section */}
      <div className="max-w-4xl mx-auto px-4 mt-16">
        <article className="prose prose-invert prose-purple max-w-none">
          <h2 className="text-3xl font-bold text-purple-100/70 mb-6">
            About JSON Formatter Tool
          </h2>
          <p className="text-purple-200/50 leading-relaxed mb-4">
            Our JSON Formatter & Validator is a free online tool that helps developers format, 
            validate, and beautify JSON (JavaScript Object Notation) data. Whether you're working 
            with API responses, configuration files, or data structures, this tool makes JSON 
            readable and easy to debug.
          </p>
          
          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            Key Features
          </h3>
          <ul className="list-disc list-inside text-purple-200/40 space-y-2">
            <li>Instant JSON validation with detailed error messages</li>
            <li>Beautify (prettify) or minify JSON with one click</li>
            <li>Syntax highlighting for better readability</li>
            <li>Support for large JSON files up to 10MB</li>
            <li>Copy formatted JSON to clipboard instantly</li>
            <li>100% client-side processing - your data stays private</li>
          </ul>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            How to Use JSON Formatter
          </h3>
          <ol className="list-decimal list-inside text-purple-200/40 space-y-2">
            <li>Paste your JSON data into the input field</li>
            <li>The tool automatically validates and formats your JSON</li>
            <li>View errors if JSON is invalid, with line numbers</li>
            <li>Click "Beautify" to format or "Minify" to compress</li>
            <li>Copy the result with one click</li>
          </ol>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            What is JSON?
          </h3>
          <p className="text-purple-200/50 leading-relaxed">
            JSON (JavaScript Object Notation) is a lightweight data interchange format that's 
            easy for humans to read and write, and easy for machines to parse and generate. 
            It's widely used in web development for API responses, configuration files, and 
            data storage. JSON uses key-value pairs and supports strings, numbers, booleans, 
            arrays, and nested objects.
          </p>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            Common JSON Use Cases
          </h3>
          <ul className="list-disc list-inside text-purple-200/40 space-y-2">
            <li>REST API request and response bodies</li>
            <li>Configuration files for applications</li>
            <li>Data exchange between client and server</li>
            <li>NoSQL database document storage</li>
            <li>Package managers (package.json, composer.json)</li>
          </ul>
        </article>
      </div>
    </div>
  );
}
