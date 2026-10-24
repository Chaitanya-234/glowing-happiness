// app/tools/api-tester/page.tsx
import { Metadata } from 'next';
import APITesterClient from './APITesterClient';

export const metadata: Metadata = {
  title: 'API Tester - Test REST APIs Online | DevMetrix',
  description: 'Free online API testing tool. Test GET, POST, PUT, DELETE requests with custom headers and authentication. View formatted responses instantly.',
  keywords: ['api tester', 'rest api', 'http client', 'postman alternative', 'api testing tool'],
};

export default function APITesterPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <APITesterClient />
      
      <div className="max-w-4xl mx-auto px-4 mt-16">
        <article className="prose prose-invert prose-purple max-w-none">
          <h2 className="text-3xl font-bold text-purple-100/70 mb-6">
            About API Tester Tool
          </h2>
          <p className="text-purple-200/50 leading-relaxed mb-4">
            Our API Tester is a lightweight, free alternative to Postman for testing REST APIs. 
            Perfect for quick API testing, debugging, and development. Test any HTTP endpoint 
            with custom headers, query parameters, and request bodies.
          </p>
          
          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            Features
          </h3>
          <ul className="list-disc list-inside text-purple-200/40 space-y-2">
            <li>Support for GET, POST, PUT, DELETE, PATCH methods</li>
            <li>Custom headers and authentication (Bearer, Basic Auth)</li>
            <li>JSON request body editor with validation</li>
            <li>Formatted JSON response viewer</li>
            <li>Response time and status code display</li>
            <li>Copy response with one click</li>
          </ul>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            How to Test an API
          </h3>
          <ol className="list-decimal list-inside text-purple-200/40 space-y-2">
            <li>Enter the API endpoint URL</li>
            <li>Select HTTP method (GET, POST, etc.)</li>
            <li>Add headers if needed (Authorization, Content-Type)</li>
            <li>Add request body for POST/PUT requests</li>
            <li>Click "Send Request" to test</li>
            <li>View formatted response and status code</li>
          </ol>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            What is a REST API?
          </h3>
          <p className="text-purple-200/50 leading-relaxed">
            REST (Representational State Transfer) API is an architectural style for building web services. 
            REST APIs use HTTP methods (GET, POST, PUT, DELETE) to perform CRUD operations on resources. 
            They return data in JSON or XML format and are stateless, making them perfect for modern web applications.
          </p>
        </article>
      </div>
    </div>
  );
}
