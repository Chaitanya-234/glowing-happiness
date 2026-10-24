// app/compare/typescript-vs-javascript/page.tsx
import Link from 'next/link';

export default function TSvsJS() {
  const comparison = [
    { feature: 'Typing', ts: 'Static, compile-time types', js: 'Dynamic, runtime types' },
    { feature: 'Error Detection', ts: 'Catch errors before runtime', js: 'Errors at runtime' },
    { feature: 'Learning Curve', ts: 'Steeper', js: 'Gentle' },
    { feature: 'Tooling', ts: 'Requires compiler/build step', js: 'Native in browser' },
    { feature: 'Community', ts: 'Growing rapidly', js: 'Massive and mature' },
    { feature: 'Use Cases', ts: 'Large codebases, strict contracts', js: 'Small projects, scripts' },
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4 max-w-5xl mx-auto text-purple-200">
      <Link href="/compare" className="text-neonBlue underline mb-6 inline-block">← Back to Comparisons</Link>
      <h1 className="text-5xl font-bold mb-8">TypeScript vs JavaScript</h1>
      <table className="table-auto w-full border-collapse rounded-lg border border-purple-700 overflow-hidden mb-10">
        <thead className="bg-purple-900/80">
          <tr>
            <th className="p-4 text-left">Feature</th>
            <th className="p-4 text-left border-l border-purple-700">TypeScript</th>
            <th className="p-4 text-left border-l border-purple-700">JavaScript</th>
          </tr>
        </thead>
        <tbody>
          {comparison.map(({ feature, ts, js }, idx) => (
            <tr key={feature} className={idx % 2 === 0 ? 'bg-purple-900/20' : 'bg-purple-900/10'}>
              <td className="p-4 font-semibold">{feature}</td>
              <td className="p-4 border-l border-purple-700">{ts}</td>
              <td className="p-4 border-l border-purple-700">{js}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">Which to Choose?</h2>
        <p className="text-gray-400">
          TypeScript adds type safety and better tooling to JavaScript at the cost of complexity. For large apps and teams, TypeScript is recommended. For small scripts and prototyping, JavaScript is simpler.
        </p>
      </section>
    </div>
  );
}
