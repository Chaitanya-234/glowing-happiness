// app/blog/regex-mastery-complete-tutorial/page.tsx
import JsonLdArticle from '@/components/JsonLdArticle';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Regular Expressions Mastery: From Beginner to Expert | DevMetrix',
  description: 'Master regex patterns with practical examples, common use cases, and real-world applications for web developers.',
  keywords: ['regex', 'regular expressions', 'pattern matching', 'javascript regex', 'regex tutorial'],
};

export default function RegexMasteryGuide() {
  return (
    <article className="min-h-screen bg-black pt-24 pb-20 px-4">
      <JsonLdArticle
        headline="Regular Expressions Mastery: From Beginner to Expert"
        description="Learn regular expressions from scratch with practical examples, common patterns, and real-world use cases for web developers."
        datePublished="2025-10-25"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/regex-mastery-complete-tutorial"
      />
      <div className="max-w-4xl mx-auto prose prose-invert prose-purple prose-lg">
        <h1 className="text-5xl font-bold text-purple-100/80 mb-4">
          Regular Expressions Mastery: From Beginner to Expert
        </h1>

        <div className="flex gap-4 text-sm text-purple-300/40 mb-8">
          <span>October 25, 2025</span>
          <span>•</span>
          <span>35 min read</span>
          <span>•</span>
          <span>Tutorial</span>
        </div>

        <p className="text-xl text-purple-200/60 leading-relaxed">
          Regular expressions (regex) are powerful tools for pattern matching and text manipulation.
          Whether you're validating form inputs, parsing data, or transforming text, mastering regex
          will make you a more efficient developer.
        </p>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          What Are Regular Expressions?
        </h2>

        <p className="text-purple-200/50 leading-relaxed">
          Regular expressions are sequences of characters that define search patterns. They're used
          in almost every programming language for tasks like validation, searching, and text
          manipulation. Think of them as a specialized language for describing text patterns.
        </p>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Basic Syntax
        </h3>

        <p className="text-purple-200/50">
          In JavaScript, regex patterns are enclosed in forward slashes:
        </p>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Basic regex pattern
const pattern = /hello/;

// With flags
const patternWithFlags = /hello/gi;

// Using RegExp constructor
const dynamicPattern = new RegExp('hello', 'gi');`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Regex Flags
        </h2>

        <p className="text-purple-200/50">
          Flags modify how the pattern matching works:
        </p>

        <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6 my-6">
          <ul className="space-y-3 text-purple-200/50">
            <li><code className="text-purple-300/70">g</code> - Global: Find all matches, not just the first</li>
            <li><code className="text-purple-300/70">i</code> - Case insensitive: Match regardless of case</li>
            <li><code className="text-purple-300/70">m</code> - Multiline: ^ and $ match line starts/ends</li>
            <li><code className="text-purple-300/70">s</code> - Dot all: . matches newline characters</li>
            <li><code className="text-purple-300/70">u</code> - Unicode: Enable full unicode support</li>
            <li><code className="text-purple-300/70">y</code> - Sticky: Match from lastIndex position</li>
          </ul>
        </div>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`const text = 'Hello World, hello universe';

// Without flags
console.log(text.match(/hello/));
// Output: ['Hello'] (first match only, case matters)

// With 'g' flag
console.log(text.match(/hello/g));
// Output: null (case matters, no lowercase 'hello')

// With 'gi' flags
console.log(text.match(/hello/gi));
// Output: ['Hello', 'hello'] (all matches, case insensitive)`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Character Classes
        </h2>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Basic Character Classes
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-purple-500/20">
                <th className="text-left p-3 text-purple-100/70">Pattern</th>
                <th className="text-left p-3 text-purple-100/70">Description</th>
                <th className="text-left p-3 text-purple-100/70">Example</th>
              </tr>
            </thead>
            <tbody className="text-purple-200/50">
              <tr className="border-b border-purple-500/10">
                <td className="p-3"><code className="text-purple-300/70">.</code></td>
                <td className="p-3">Any character except newline</td>
                <td className="p-3"><code>/c.t/</code> matches "cat", "cot"</td>
              </tr>
              <tr className="border-b border-purple-500/10">
                <td className="p-3"><code className="text-purple-300/70">\d</code></td>
                <td className="p-3">Any digit (0-9)</td>
                <td className="p-3"><code>/\d+/</code> matches "123"</td>
              </tr>
              <tr className="border-b border-purple-500/10">
                <td className="p-3"><code className="text-purple-300/70">\D</code></td>
                <td className="p-3">Any non-digit</td>
                <td className="p-3"><code>/\D+/</code> matches "abc"</td>
              </tr>
              <tr className="border-b border-purple-500/10">
                <td className="p-3"><code className="text-purple-300/70">\w</code></td>
                <td className="p-3">Word character (a-z, A-Z, 0-9, _)</td>
                <td className="p-3"><code>/\w+/</code> matches "hello_123"</td>
              </tr>
              <tr className="border-b border-purple-500/10">
                <td className="p-3"><code className="text-purple-300/70">\W</code></td>
                <td className="p-3">Non-word character</td>
                <td className="p-3"><code>/\W+/</code> matches "!@#"</td>
              </tr>
              <tr className="border-b border-purple-500/10">
                <td className="p-3"><code className="text-purple-300/70">\s</code></td>
                <td className="p-3">Whitespace (space, tab, newline)</td>
                <td className="p-3"><code>/\s+/</code> matches spaces</td>
              </tr>
              <tr>
                <td className="p-3"><code className="text-purple-300/70">\S</code></td>
                <td className="p-3">Non-whitespace</td>
                <td className="p-3"><code>/\S+/</code> matches "hello"</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Custom Character Sets
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Match specific characters
const vowels = /[aeiou]/gi;
console.log('hello'.match(vowels));
// Output: ['e', 'o']

// Match ranges
const lowerCase = /[a-z]/g;
const upperCase = /[A-Z]/g;
const alphaNumeric = /[a-zA-Z0-9]/g;

// Negated sets (NOT these characters)
const notVowels = /[^aeiou]/gi;
console.log('hello'.match(notVowels));
// Output: ['h', 'l', 'l']`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Quantifiers
        </h2>

        <p className="text-purple-200/50">
          Quantifiers specify how many times a pattern should match:
        </p>

        <div className="overflow-x-auto mt-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-purple-500/20">
                <th className="text-left p-3 text-purple-100/70">Quantifier</th>
                <th className="text-left p-3 text-purple-100/70">Description</th>
                <th className="text-left p-3 text-purple-100/70">Example</th>
              </tr>
            </thead>
            <tbody className="text-purple-200/50">
              <tr className="border-b border-purple-500/10">
                <td className="p-3"><code className="text-purple-300/70">*</code></td>
                <td className="p-3">0 or more times</td>
                <td className="p-3"><code>/ab*c/</code> matches "ac", "abc", "abbc"</td>
              </tr>
              <tr className="border-b border-purple-500/10">
                <td className="p-3"><code className="text-purple-300/70">+</code></td>
                <td className="p-3">1 or more times</td>
                <td className="p-3"><code>/ab+c/</code> matches "abc", "abbc"</td>
              </tr>
              <tr className="border-b border-purple-500/10">
                <td className="p-3"><code className="text-purple-300/70">?</code></td>
                <td className="p-3">0 or 1 time (optional)</td>
                <td className="p-3"><code>/colou?r/</code> matches "color", "colour"</td>
              </tr>
              <tr className="border-b border-purple-500/10">
                <td className="p-3"><code className="text-purple-300/70">{`{n}`}</code></td>
                <td className="p-3">Exactly n times</td>
                <td className="p-3"><code>{`/\\d{3}/`}</code> matches "123"</td>
              </tr>
              <tr className="border-b border-purple-500/10">
                <td className="p-3"><code className="text-purple-300/70">{`{n,}`}</code></td>
                <td className="p-3">n or more times</td>
                <td className="p-3"><code>{`/\\d{2,}/`}</code> matches "12", "123"</td>
              </tr>
              <tr>
                <td className="p-3"><code className="text-purple-300/70">{`{n,m}`}</code></td>
                <td className="p-3">Between n and m times</td>
                <td className="p-3"><code>{`/\\d{2,4}/`}</code> matches "12", "123"</td>
              </tr>
            </tbody>
          </table>
        </div>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 mt-6">
          <code className="text-purple-100/80">{`// Phone number pattern (XXX-XXX-XXXX)
const phonePattern = /\\d{3}-\\d{3}-\\d{4}/;
console.log(phonePattern.test('123-456-7890')); // true

// ZIP code (5 or 9 digits)
const zipPattern = /^\\d{5}(-\\d{4})?$/;
console.log(zipPattern.test('12345')); // true
console.log(zipPattern.test('12345-6789')); // true

// Password (8-16 chars, must include number)
const passwordPattern = /^(?=.*\\d).{8,16}$/;
console.log(passwordPattern.test('password123')); // true`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Anchors and Boundaries
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-purple-500/20">
                <th className="text-left p-3 text-purple-100/70">Anchor</th>
                <th className="text-left p-3 text-purple-100/70">Description</th>
                <th className="text-left p-3 text-purple-100/70">Example</th>
              </tr>
            </thead>
            <tbody className="text-purple-200/50">
              <tr className="border-b border-purple-500/10">
                <td className="p-3"><code className="text-purple-300/70">^</code></td>
                <td className="p-3">Start of string/line</td>
                <td className="p-3"><code>/^Hello/</code> matches "Hello world"</td>
              </tr>
              <tr className="border-b border-purple-500/10">
                <td className="p-3"><code className="text-purple-300/70">$</code></td>
                <td className="p-3">End of string/line</td>
                <td className="p-3"><code>/world$/</code> matches "Hello world"</td>
              </tr>
              <tr>
                <td className="p-3"><code className="text-purple-300/70">\b</code></td>
                <td className="p-3">Word boundary</td>
                <td className="p-3"><code>/\bcat\b/</code> matches "cat" not "catch"</td>
              </tr>
            </tbody>
          </table>
        </div>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20 mt-6">
          <code className="text-purple-100/80">{`// Must start with uppercase letter
const startsWithUpper = /^[A-Z]/;
console.log(startsWithUpper.test('Hello')); // true
console.log(startsWithUpper.test('hello')); // false

// Must end with punctuation
const endsWithPunc = /[.!?]$/;
console.log(endsWithPunc.test('Hello!')); // true

// Whole word match
const wholeWord = /\\bcat\\b/;
console.log('the cat sat'.match(wholeWord)); // matches
console.log('catch it'.match(wholeWord)); // no match`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Groups and Capturing
        </h2>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Capturing Groups
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Extract parts of a date
const datePattern = /(\\d{4})-(\\d{2})-(\\d{2})/;
const match = '2025-10-25'.match(datePattern);

console.log(match[0]); // "2025-10-25" (full match)
console.log(match[1]); // "2025" (year)
console.log(match[2]); // "10" (month)
console.log(match[3]); // "25" (day)

// Named capturing groups
const namedPattern = /(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/;
const namedMatch = '2025-10-25'.match(namedPattern);

console.log(namedMatch.groups.year);  // "2025"
console.log(namedMatch.groups.month); // "10"
console.log(namedMatch.groups.day);   // "25"`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Non-Capturing Groups
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Non-capturing group (?:...)
const pattern = /(?:Mr|Mrs|Ms)\\.\\s+(\\w+)/;
const match = 'Mr. Smith'.match(pattern);

console.log(match[0]); // "Mr. Smith"
console.log(match[1]); // "Smith" (only captured group)`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Common Regex Patterns
        </h2>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Email Validation
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Basic email pattern
const emailPattern = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

// More strict email pattern
const strictEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;

function validateEmail(email) {
  return strictEmail.test(email);
}

console.log(validateEmail('user@example.com'));     // true
console.log(validateEmail('invalid.email'));        // false
console.log(validateEmail('user@domain'));          // false`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Phone Number Validation
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// US phone number patterns
const usPhone1 = /^\\d{3}-\\d{3}-\\d{4}$/;           // 123-456-7890
const usPhone2 = /^\\(\\d{3}\\)\\s?\\d{3}-\\d{4}$/; // (123) 456-7890
const usPhone3 = /^\\d{10}$/;                        // 1234567890

// Flexible phone pattern
const phonePattern = /^[\\d\\s()+-]+$/;

function validatePhone(phone) {
  // Remove all non-digits
  const digits = phone.replace(/\\D/g, '');

  // Check if 10 digits
  return digits.length === 10;
}

console.log(validatePhone('(123) 456-7890'));  // true
console.log(validatePhone('123-456-7890'));    // true
console.log(validatePhone('123 456 7890'));    // true`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          URL Validation
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// URL pattern
const urlPattern = /^https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)$/;

function validateURL(url) {
  return urlPattern.test(url);
}

console.log(validateURL('https://example.com'));           // true
console.log(validateURL('http://www.example.com/path'));   // true
console.log(validateURL('not-a-url'));                     // false`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Password Strength
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Strong password requirements:
// - At least 8 characters
// - At least one uppercase letter
// - At least one lowercase letter
// - At least one number
// - At least one special character

function validateStrongPassword(password) {
  const minLength = /.{8,}/;
  const hasUpper = /[A-Z]/;
  const hasLower = /[a-z]/;
  const hasNumber = /\\d/;
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/;

  return (
    minLength.test(password) &&
    hasUpper.test(password) &&
    hasLower.test(password) &&
    hasNumber.test(password) &&
    hasSpecial.test(password)
  );
}

// Or use lookaheads in a single regex
const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;

console.log(strongPassword.test('Weak123'));           // false
console.log(strongPassword.test('Strong@Pass123'));    // true`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          JavaScript Regex Methods
        </h2>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          String Methods
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`const text = 'The quick brown fox jumps over the lazy dog';

// match() - returns array of matches
console.log(text.match(/the/gi));
// Output: ['The', 'the']

// search() - returns index of first match
console.log(text.search(/fox/));
// Output: 16

// replace() - replaces matches
console.log(text.replace(/the/gi, 'a'));
// Output: "a quick brown fox jumps over a lazy dog"

// replaceAll() - replaces all matches (ES2021)
console.log(text.replaceAll(/the/gi, 'a'));

// split() - splits string by pattern
console.log('a,b;c:d'.split(/[,;:]/));
// Output: ['a', 'b', 'c', 'd']`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          RegExp Methods
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`const pattern = /\\d+/g;
const text = 'I have 2 cats and 3 dogs';

// test() - returns true/false
console.log(/\\d/.test(text));
// Output: true

// exec() - returns match details
let match;
while ((match = pattern.exec(text)) !== null) {
  console.log(\`Found \${match[0]} at index \${match.index}\`);
}
// Output:
// Found 2 at index 7
// Found 3 at index 18`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Advanced Techniques
        </h2>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Lookahead and Lookbehind
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Positive lookahead (?=...)
// Match digits followed by "px"
const pxPattern = /\\d+(?=px)/;
console.log('10px 20em 30px'.match(pxPattern));
// Output: ['10'] (doesn't include 'px')

// Negative lookahead (?!...)
// Match digits NOT followed by "px"
const notPxPattern = /\\d+(?!px)/;
console.log('10px 20em 30px'.match(notPxPattern));
// Output: ['2'] (from '20em')

// Positive lookbehind (?<=...)
// Match digits preceded by "$"
const pricePattern = /(?<=\\$)\\d+/;
console.log('$100 and €50'.match(pricePattern));
// Output: ['100']

// Negative lookbehind (?<!...)
// Match digits NOT preceded by "$"
const notPricePattern = /(?<!\\$)\\d+/;
console.log('$100 and 50'.match(notPricePattern));
// Output: ['0', '0', '5', '0'] (individual digits)`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Real-World Examples
        </h2>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Credit Card Validation
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`function validateCreditCard(cardNumber) {
  // Remove spaces and dashes
  const cleaned = cardNumber.replace(/[\\s-]/g, '');

  // Check if 13-19 digits
  const pattern = /^\\d{13,19}$/;

  if (!pattern.test(cleaned)) {
    return false;
  }

  // Luhn algorithm check
  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);

    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

console.log(validateCreditCard('4532-1488-0343-6467')); // true (Visa)
console.log(validateCreditCard('1234-5678-9012-3456')); // false`}</code>
        </pre>

        <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
          Extract Data from Text
        </h3>

        <pre className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/20">
          <code className="text-purple-100/80">{`// Extract all email addresses from text
function extractEmails(text) {
  const emailPattern = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g;
  return text.match(emailPattern) || [];
}

const text = \`Contact us at support@example.com or sales@example.com\`;
console.log(extractEmails(text));
// Output: ['support@example.com', 'sales@example.com']

// Extract hashtags from social media post
function extractHashtags(text) {
  const hashtagPattern = /#[a-zA-Z0-9_]+/g;
  return text.match(hashtagPattern) || [];
}

const post = 'Learning #JavaScript and #WebDev is fun! #coding';
console.log(extractHashtags(post));
// Output: ['#JavaScript', '#WebDev', '#coding']`}</code>
        </pre>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Performance Tips
        </h2>

        <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6 my-6">
          <h4 className="text-lg font-semibold text-purple-100/70 mb-4">Best Practices:</h4>
          <ul className="space-y-3 text-purple-200/50">
            <li>✅ Use specific patterns instead of broad ones</li>
            <li>✅ Compile regex once and reuse</li>
            <li>✅ Use non-capturing groups when you don't need the match</li>
            <li>✅ Avoid excessive backtracking with greedy quantifiers</li>
            <li>❌ Don't use regex for simple string operations</li>
            <li>❌ Avoid nested quantifiers like <code className="text-purple-300/70">(a+)+</code></li>
          </ul>
        </div>

        <h2 className="text-3xl font-bold text-purple-100/70 mt-12 mb-6">
          Conclusion
        </h2>

        <p className="text-purple-200/50 leading-relaxed">
          Regular expressions are an essential tool in every developer's toolkit. While they can seem
          intimidating at first, with practice and understanding of the core concepts, you'll find them
          invaluable for text processing, validation, and data extraction tasks.
        </p>

        <p className="text-purple-200/50 leading-relaxed mt-4">
          Start with simple patterns and gradually build complexity as you become more comfortable.
          Remember to test your regex thoroughly and consider edge cases in your validation logic.
        </p>

        <div className="mt-12 p-6 bg-purple-900/20 border border-purple-500/20 rounded-lg">
          <h3 className="text-2xl font-semibold text-purple-100/70 mb-4">
            Try Our Regex Playground
          </h3>
          <p className="text-purple-200/50 mb-4">
            Test and build regex patterns with live matching and visual highlighting!
          </p>
          <Link
            href="/tools/regex-playground"
            className="inline-block px-6 py-3 bg-purple-600/30 text-purple-100 rounded-lg border border-purple-500/30 hover:bg-purple-500/40 transition-all font-semibold no-underline"
          >
            Try Regex Playground →
          </Link>
        </div>
      </div>
    </article>
  );
}
