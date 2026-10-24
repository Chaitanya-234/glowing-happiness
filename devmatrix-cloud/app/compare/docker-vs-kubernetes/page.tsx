// app/compare/docker-vs-kubernetes/page.tsx
import Link from 'next/link';

export default function DockerVsKubernetes() {
  const comparison = [
    { feature: "Type", docker: "Container runtime", kubernetes: "Container orchestration platform" },
    { feature: "Purpose", docker: "Build, ship, run containers", kubernetes: "Manage container clusters" },
    { feature: "Complexity", docker: "Simple, standalone", kubernetes: "Complex, multi-node" },
    { feature: "Scaling", docker: "Manual container scaling", kubernetes: "Automatic scaling and load balancing" },
    { feature: "Deployment", docker: "Single host / Swarm", kubernetes: "Highly available clusters" },
    { feature: "Networking", docker: "Basic container networking", kubernetes: "Advanced networking & service mesh" },
    { feature: "Learning Curve", docker: "Low", kubernetes: "Steep" },
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4 max-w-5xl mx-auto text-purple-200">
      <Link href="/compare" className="text-neonBlue underline mb-6 inline-block">← Back to Comparisons</Link>
      <h1 className="text-5xl font-bold mb-8">Docker vs Kubernetes</h1>
      <table className="table-auto w-full border-collapse rounded-lg border border-purple-700 overflow-hidden mb-10">
        <thead className="bg-purple-900/80">
          <tr>
            <th className="p-4 text-left">Feature</th>
            <th className="p-4 text-left border-l border-purple-700">Docker</th>
            <th className="p-4 text-left border-l border-purple-700">Kubernetes</th>
          </tr>
        </thead>
        <tbody>
          {comparison.map(({ feature, docker, kubernetes }, idx) => (
            <tr key={feature} className={idx % 2 === 0 ? 'bg-purple-900/20' : 'bg-purple-900/10'}>
              <td className="p-4 font-semibold">{feature}</td>
              <td className="p-4 border-l border-purple-700">{docker}</td>
              <td className="p-4 border-l border-purple-700">{kubernetes}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <section>
        <h2 className="text-3xl font-semibold mb-4">When to Choose Docker</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-400">
          <li>Simple containerized apps</li>
          <li>Local development and testing</li>
          <li>Small deployments or standalone services</li>
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-3xl font-semibold mb-4">When to Choose Kubernetes</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-400">
          <li>Large-scale, production-grade orchestration</li>
          <li>Self-healing, load balancing, scaling</li>
          <li>Multi-node cluster management</li>
        </ul>
      </section>
    </div>
  );
}
