// app/tools/sql-formatter/page.tsx
import { Metadata } from 'next';
import SqlFormatterClient from './SqlFormatterClient';

export const metadata: Metadata = {
  title: 'SQL Formatter & Beautifier - Free Online Tool | DevMetrix',
  description: 'Format, beautify, and validate SQL queries online. Support for MySQL, PostgreSQL, SQL Server, and more. Free SQL formatter with syntax highlighting.',
  keywords: ['sql formatter', 'sql beautifier', 'prettify sql', 'sql validator', 'online sql tool', 'format sql', 'sql syntax highlighter'],
};

export default function SqlFormatterPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20">
      <SqlFormatterClient />

      {/* SEO Content Section */}
      <div className="max-w-4xl mx-auto px-4 mt-16">
        <article className="prose prose-invert prose-purple max-w-none">
          <h2 className="text-3xl font-bold text-purple-100/70 mb-6">
            About SQL Formatter Tool
          </h2>
          <p className="text-purple-200/50 leading-relaxed mb-4">
            Our SQL Formatter is a free online tool designed to help developers and database administrators
            format and beautify their SQL queries. Whether you're debugging a complex query or just want
            to make your SQL code more readable, this tool handles various SQL dialects including MySQL,
            PostgreSQL, SQL Server, and more.
          </p>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            Key Features
          </h3>
          <ul className="list-disc list-inside text-purple-200/40 space-y-2">
            <li>Instant SQL formatting and beautification</li>
            <li>Support for multiple SQL dialects (Standard, MySQL, PostgreSQL, etc.)</li>
            <li>Customizable indentation (2 spaces, 4 spaces, tabs)</li>
            <li>Syntax validation feedback</li>
            <li>Copy formatted SQL to clipboard instantly</li>
            <li>100% client-side processing - your queries stay private</li>
          </ul>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            How to Use SQL Formatter
          </h3>
          <ol className="list-decimal list-inside text-purple-200/40 space-y-2">
            <li>Paste your raw SQL query into the input field</li>
            <li>Select your SQL dialect (optional, defaults to Standard SQL)</li>
            <li>Click "Format SQL" to beautify the code</li>
            <li>Use the "Copy" button to grab the formatted result</li>
          </ol>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            Why Format SQL?
          </h3>
          <p className="text-purple-200/50 leading-relaxed">
            Formatted SQL is easier to read, understand, and maintain. Proper indentation and line breaks
            help in identifying logical structure, joins, and conditions in complex queries. It also
            makes collaboration easier among team members.
          </p>

          <h3 className="text-2xl font-semibold text-purple-100/60 mt-8 mb-4">
            FAQ
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-purple-100/60">Is my SQL data safe?</h4>
              <p className="text-purple-200/40">Yes, all processing happens in your browser. No data is sent to any server.</p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-100/60">Which SQL dialects are supported?</h4>
              <p className="text-purple-200/40">We support Standard SQL, MySQL, PostgreSQL, SQLite, SQL Server, and more.</p>
            </div>
          </div>
        </article>
      </div>

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'SQL Formatter',
            applicationCategory: 'DeveloperApplication',
            operatingSystem: 'Any',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            description: 'Free online SQL formatter and beautifier. Format, validate, and prettify SQL queries instantly.',
          }),
        }}
      />
    </div>
  );
}
