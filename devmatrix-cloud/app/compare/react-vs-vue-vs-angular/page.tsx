// app/compare/react-vs-vue-vs-angular/page.tsx
import Link from 'next/link';

export default function ReactVueAngular() {
  const comparison = [
    { feature: 'Type', react: 'Library', vue: 'Framework', angular: 'Framework' },
    { feature: 'Language', react: 'JavaScript/JSX', vue: 'JavaScript/HTML templates', angular: 'TypeScript' },
    { feature: 'Learning Curve', react: 'Moderate', vue: 'Easy', angular: 'Steep' },
    { feature: 'Data Binding', react: 'One-way', vue: 'Two-way', angular: 'Two-way' },
    { feature: 'Size', react: 'Small', vue: 'Small', angular: 'Large' },
    { feature: 'Community', react: 'Very large', vue: 'Growing', angular: 'Large' },
    { feature: 'Use Cases', react: 'Complex SPAs', vue: 'Progressive adoption', angular: 'Enterprise Apps' },
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4 max-w-6xl mx-auto text-purple-200">
      <Link href="/compare" className="text-neonBlue underline mb-6 inline-block">← Back to Comparisons</Link>
      <h1 className="text-5xl font-bold mb-8">React vs Vue vs Angular</h1>
      <table className="table-auto w-full border-collapse rounded-lg border border-purple-700 overflow-hidden mb-10">
        <thead className="bg-purple-900/80">
          <tr>
            <th className="p-4 text-left">Feature</th>
            <th className="p-4 text-left border-l border-purple-700">React</th>
            <th className="p-4 text-left border-l border-purple-700">Vue</th>
            <th className="p-4 text-left border-l border-purple-700">Angular</th>
          </tr>
        </thead>
        <tbody>
          {comparison.map(({ feature, react, vue, angular }, idx) => (
            <tr key={feature} className={idx % 2 === 0 ? 'bg-purple-900/20' : 'bg-purple-900/10'}>
              <td className="p-4 font-semibold">{feature}</td>
              <td className="p-4 border-l border-purple-700">{react}</td>
              <td className="p-4 border-l border-purple-700">{vue}</td>
              <td className="p-4 border-l border-purple-700">{angular}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4">Choosing Your Framework</h2>
        <p className="text-gray-400">
          Vue is simpler for beginners, React is highly flexible and popular, Angular offers a full enterprise-grade framework. Pick based on your project size, team skill, and future maintenance needs.
        </p>
      </section>
    </div>
  );
}
