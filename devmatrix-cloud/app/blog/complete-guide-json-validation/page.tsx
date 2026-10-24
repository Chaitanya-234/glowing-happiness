// app/blog/complete-guide-json-validation/page.tsx
import JsonLdArticle from '@/components/JsonLdArticle';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Complete Guide to JSON Validation | DevMetrix Blog',
  description: 'Master JSON validation with this comprehensive guide covering syntax rules, common errors, validation tools, and best practices.',
};

export default function JSONValidationGuide() {
  return (
    <article className="min-h-screen bg-black pt-24 pb-20 px-4">
      <JsonLdArticle
        headline="The Complete Guide to JSON Validation: Best Practices and Tools"
        description="Master JSON validation with this comprehensive guide covering syntax rules, common errors, validation tools, and best practices for API development."
        datePublished="2025-10-27"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/complete-guide-json-validation"
      />
      <div className="max-w-4xl mx-auto prose prose-invert prose-purple prose-lg">
        <h1 className="text-5xl font-bold text-purple-100/80 mb-4">
          The Complete Guide to JSON Validation: Best Practices and Tools
        </h1>

        <div className="flex gap-4 text-sm text-purple-300/40 mb-8">
          <span>October 27, 2025</span>
          <span>•</span>
          <span>25 min read</span>
          <span>•</span>
          <span>Tutorial</span>
        </div>

        <p className="text-xl text-purple-200/60 leading-relaxed">
          JSON (JavaScript Object Notation) has become the de facto standard for data interchange
          in modern web development. Whether you're building APIs, configuring applications, or
          storing data, understanding JSON validation is crucial for creating robust and reliable systems.
        </p>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          What is JSON?
        </h2>

        <p className="text-purple-200/50 leading-relaxed">
          JSON is a lightweight, text-based data format that's easy for humans to read and write,
          and easy for machines to parse and generate. It's based on a subset of JavaScript but
          is language-independent, making it perfect for data exchange between different programming
          languages and platforms.
        </p>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Basic JSON Structure
        </h3>

        <p className="text-purple-200/50">
          JSON data is organized in key-value pairs, similar to JavaScript objects. Here's a simple example:
        </p>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 overflow-x-auto">
          <code className="text-purple-100/80">{`{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "isActive": true,
  "roles": ["admin", "user"],
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zipCode": "10001"
  }
}`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          JSON Data Types
        </h2>

        <p className="text-purple-200/50 leading-relaxed">
          JSON supports six fundamental data types:
        </p>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          1. String
        </h3>

        <p className="text-purple-200/50">
          A sequence of characters enclosed in double quotes. Strings must use double quotes, not single quotes.
        </p>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`{
  "name": "Alice",
  "description": "Software engineer specializing in backend development"
}`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          2. Number
        </h3>

        <p className="text-purple-200/50">
          Integer or floating-point numbers without quotes. JSON doesn't distinguish between integers and floats.
        </p>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`{
  "age": 28,
  "salary": 75000.50,
  "temperature": -3.14,
  "scientificNotation": 1.5e10
}`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          3. Boolean
        </h3>

        <p className="text-purple-200/50">
          True or false values (lowercase, without quotes).
        </p>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`{
  "isActive": true,
  "isPremium": false
}`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          4. Null
        </h3>

        <p className="text-purple-200/50">
          Represents an empty or non-existent value.
        </p>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`{
  "middleName": null,
  "alternateEmail": null
}`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          5. Array
        </h3>

        <p className="text-purple-200/50">
          An ordered list of values enclosed in square brackets, separated by commas.
        </p>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`{
  "colors": ["red", "green", "blue"],
  "scores": [95, 87, 92, 88],
  "mixedArray": [1, "two", true, null, {"key": "value"}]
}`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          6. Object
        </h3>

        <p className="text-purple-200/50">
          An unordered collection of key-value pairs enclosed in curly braces.
        </p>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`{
  "user": {
    "id": 1,
    "profile": {
      "avatar": "url.jpg",
      "bio": "Developer"
    }
  }
}`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Common JSON Validation Errors
        </h2>

        <p className="text-purple-200/50 leading-relaxed">
          Understanding common errors helps you write valid JSON faster and debug issues efficiently.
        </p>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          1. Missing or Extra Commas
        </h3>

        <p className="text-purple-200/50">
          One of the most common errors is incorrect comma placement.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-red-400 font-semibold mb-2">❌ Invalid:</p>
            <pre className="bg-purple-900/20 p-4 rounded-lg border border-red-500/30">
              <code className="text-purple-100/80">{`{
  "name": "John",
  "age": 30,
}`}</code>
            </pre>
          </div>
          <div>
            <p className="text-green-400 font-semibold mb-2">✅ Valid:</p>
            <pre className="bg-purple-900/20 p-4 rounded-lg border border-green-500/30">
              <code className="text-purple-100/80">{`{
  "name": "John",
  "age": 30
}`}</code>
            </pre>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          2. Single Quotes Instead of Double Quotes
        </h3>

        <p className="text-purple-200/50">
          JSON requires double quotes for strings and keys.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-red-400 font-semibold mb-2">❌ Invalid:</p>
            <pre className="bg-purple-900/20 p-4 rounded-lg border border-red-500/30">
              <code className="text-purple-100/80">{`{
  'name': 'John',
  'age': 30
}`}</code>
            </pre>
          </div>
          <div>
            <p className="text-green-400 font-semibold mb-2">✅ Valid:</p>
            <pre className="bg-purple-900/20 p-4 rounded-lg border border-green-500/30">
              <code className="text-purple-100/80">{`{
  "name": "John",
  "age": 30
}`}</code>
            </pre>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          3. Unquoted Keys
        </h3>

        <p className="text-purple-200/50">
          Unlike JavaScript objects, JSON requires keys to be quoted strings.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-red-400 font-semibold mb-2">❌ Invalid:</p>
            <pre className="bg-purple-900/20 p-4 rounded-lg border border-red-500/30">
              <code className="text-purple-100/80">{`{
  name: "John",
  age: 30
}`}</code>
            </pre>
          </div>
          <div>
            <p className="text-green-400 font-semibold mb-2">✅ Valid:</p>
            <pre className="bg-purple-900/20 p-4 rounded-lg border border-green-500/30">
              <code className="text-purple-100/80">{`{
  "name": "John",
  "age": 30
}`}</code>
            </pre>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          JSON Validation Tools
        </h2>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          1. JavaScript Built-in Validation
        </h3>

        <p className="text-purple-200/50">
          JavaScript provides native JSON validation through `JSON.parse()`:
        </p>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`function validateJSON(jsonString) {
  try {
    JSON.parse(jsonString);
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: error.message
    };
  }
}

// Usage
const result = validateJSON('{"name": "John"}');
console.log(result.valid); // true`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          2. Online JSON Validators
        </h3>

        <p className="text-purple-200/50">
          Several online tools provide JSON validation with helpful error messages:
        </p>

        <ul className="list-disc list-inside text-purple-200/50 space-y-2">
          <li><strong className="text-purple-200/60">DevMetrix JSON Formatter:</strong> Instant validation with syntax highlighting</li>
          <li><strong className="text-purple-200/60">JSONLint:</strong> Comprehensive error messages</li>
          <li><strong className="text-purple-200/60">JSON Schema Validator:</strong> Schema-based validation</li>
        </ul>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          JSON Schema Validation
        </h2>

        <p className="text-purple-200/50 leading-relaxed">
          JSON Schema provides a powerful way to validate JSON structure and data types. It defines
          the expected format of your JSON data.
        </p>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Basic Schema Example
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "minLength": 1,
      "maxLength": 100
    },
    "age": {
      "type": "integer",
      "minimum": 0,
      "maximum": 150
    },
    "email": {
      "type": "string",
      "format": "email"
    }
  },
  "required": ["name", "email"]
}`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Best Practices for JSON Validation
        </h2>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          1. Always Validate User Input
        </h3>

        <p className="text-purple-200/50">
          Never trust JSON data from external sources without validation. This prevents security
          vulnerabilities and data corruption.
        </p>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Express.js example
app.post('/api/users', (req, res) => {
  try {
    const userData = req.body;

    // Validate required fields
    if (!userData.name || !userData.email) {
      return res.status(400).json({
        error: 'Missing required fields'
      });
    }

    // Validate email format
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    // Process valid data
    // ...
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          2. Use Schema Validation Libraries
        </h3>

        <p className="text-purple-200/50">
          Libraries like Ajv, Joi, or Yup provide robust validation with clear error messages:
        </p>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Using Ajv for JSON Schema validation
const Ajv = require('ajv');
const ajv = new Ajv();

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'number' }
  },
  required: ['name']
};

const validate = ajv.compile(schema);
const valid = validate(data);

if (!valid) {
  console.log(validate.errors);
}`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          3. Provide Clear Error Messages
        </h3>

        <p className="text-purple-200/50">
          When validation fails, give users specific information about what went wrong:
        </p>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`function validateUserData(data) {
  const errors = [];

  if (!data.name) {
    errors.push('Name is required');
  } else if (data.name.length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (!data.email) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Email format is invalid');
  }

  if (data.age && (data.age < 0 || data.age > 150)) {
    errors.push('Age must be between 0 and 150');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Performance Considerations
        </h2>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          1. Validate Once, Use Many Times
        </h3>

        <p className="text-purple-200/50">
          Compile validation schemas once and reuse them:
        </p>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Bad: Compiles schema on every validation
function validateUser(data) {
  const schema = { /* ... */ };
  const validate = ajv.compile(schema);
  return validate(data);
}

// Good: Compile once, reuse validator
const userValidator = ajv.compile(userSchema);

function validateUser(data) {
  return userValidator(data);
}`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          2. Limit JSON Size
        </h3>

        <p className="text-purple-200/50">
          Set maximum payload sizes to prevent memory issues:
        </p>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Express.js with body size limit
app.use(express.json({
  limit: '10mb',
  verify: (req, res, buf) => {
    if (buf.length > 10485760) {
      throw new Error('Payload too large');
    }
  }
}));`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Security Considerations
        </h2>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          1. Prevent JSON Injection
        </h3>

        <p className="text-purple-200/50">
          Always sanitize JSON data before storing or processing:
        </p>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Never construct JSON strings manually
// Bad
const json = \`{"name": "\${userInput}"}\`;

// Good - Use JSON.stringify
const json = JSON.stringify({ name: userInput });`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          2. Handle Parsing Errors Gracefully
        </h3>

        <p className="text-purple-200/50">
          Wrap JSON parsing in try-catch blocks to prevent crashes:
        </p>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`function safeJSONParse(str, fallback = null) {
  try {
    return JSON.parse(str);
  } catch (error) {
    console.error('JSON parse error:', error.message);
    return fallback;
  }
}

// Usage
const data = safeJSONParse(userInput, {});`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Testing JSON Validation
        </h2>

        <p className="text-purple-200/50">
          Write comprehensive tests for your validation logic:
        </p>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`describe('User Validation', () => {
  test('should accept valid user data', () => {
    const validUser = {
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    };

    expect(validateUser(validUser).valid).toBe(true);
  });

  test('should reject missing required fields', () => {
    const invalidUser = {
      age: 30
    };

    const result = validateUser(invalidUser);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Name is required');
  });

  test('should reject invalid email format', () => {
    const invalidUser = {
      name: 'John',
      email: 'not-an-email'
    };

    const result = validateUser(invalidUser);
    expect(result.valid).toBe(false);
  });
});`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Conclusion
        </h2>

        <p className="text-purple-200/50 leading-relaxed">
          JSON validation is a critical skill for modern web developers. By understanding JSON syntax,
          common errors, validation tools, and best practices, you can build more reliable and secure
          applications. Remember to always validate user input, use schema validation for complex data
          structures, and provide clear error messages to improve the developer and user experience.
        </p>

        <p className="text-purple-200/50 leading-relaxed">
          Start implementing these practices in your projects today, and you'll catch bugs earlier,
          improve data quality, and build more robust applications.
        </p>

        <div className="mt-12 p-6 bg-purple-900/20 border border-purple-500/20 rounded-lg">
          <h3 className="text-2xl font-semibold text-purple-100/70 mb-4">
            Try Our Free JSON Formatter
          </h3>
          <p className="text-purple-200/50 mb-4">
            Validate and format your JSON data instantly with our free online tool. No signup required!
          </p>
          <a
            href="/tools/json-formatter"
            className="inline-block px-6 py-3 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold"
          >
            Try JSON Formatter →
          </a>
        </div>
      </div>
    </article>
  );
}
