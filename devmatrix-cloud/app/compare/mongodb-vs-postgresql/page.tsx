// app/compare/mongodb-vs-postgresql/page.tsx
import Link from 'next/link';

export default function MongoVsPostgres() {
  const comparison = [
    { feature: 'Database Type', mongo: 'NoSQL document store', postgres: 'Relational SQL database' },
    { feature: 'Schema', mongo: 'Flexible, schema-less', postgres: 'Strict schema' },
    { feature: 'Query Language', mongo: 'JSON-like queries', postgres: 'SQL' },
    { feature: 'Transactions', mongo: 'Multi-document ACID (newer)', postgres: 'Full ACID compliance' },
    { feature: 'Joins', mongo: 'Limited ($lookup)', postgres: 'Powerful, native' },
    { feature: 'Scalability', mongo: 'Horizontal scaling (sharding)', postgres: 'Vertical scaling; horizontal with tools' },
    { feature: 'Use Cases', mongo: 'Flexible data, rapid development', postgres: 'Complex queries, relational data' },
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4 max-w-5xl mx-auto text-purple-200">
      <Link href="/compare" className="text-neonBlue underline mb-6 inline-block">← Back to Comparisons</Link>
      <h1 className="text-5xl font-bold mb-8">MongoDB vs PostgreSQL</h1>

      <table className="table-auto w-full border-collapse rounded-lg border border-purple-700 overflow-hidden mb-10">
        <thead className="bg-purple-900/80">
          <tr>
            <th className="p-4 text-left">Feature</th>
            <th className="p-4 text-left border-l border-purple-700">MongoDB</th>
            <th className="p-4 text-left border-l border-purple-700">PostgreSQL</th>
          </tr>
        </thead>
        <tbody>
          {comparison.map(({ feature, mongo, postgres }, idx) => (
            <tr key={feature} className={idx % 2 === 0 ? 'bg-purple-900/20' : 'bg-purple-900/10'}>
              <td className="p-4 font-semibold">{feature}</td>
              <td className="p-4 border-l border-purple-700">{mongo}</td>
              <td className="p-4 border-l border-purple-700">{postgres}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">Choose MongoDB if:</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-400">
          <li>You need flexible, evolving schemas</li>
          <li>Building applications rapidly with unstructured data</li>
          <li>Need to scale horizontally easily</li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">Choose PostgreSQL if:</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-400">
          <li>You require complex queries and joins</li>
          <li>You want strong ACID guarantees</li>
          <li>Your data and schema are stable and relational</li>
        </ul>
      </section>
    </div>
  );
}
