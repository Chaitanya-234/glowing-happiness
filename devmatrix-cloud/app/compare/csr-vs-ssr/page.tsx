import AcademicComparison, { Section } from '@/components/AcademicComparison';
import DebateComparison from '@/components/DebateComparison';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CSR vs SSR: A Rendering Pattern Comparison | DevMetrix',
  description: 'Comparing Client-Side Rendering (CSR) and Server-Side Rendering (SSR). Analysis of SEO, Performance (TTFB, FCP), and modern hybrids (Next.js).',
  keywords: ['CSR', 'SSR', 'rendering', 'React', 'Next.js', 'SEO', 'web performance', 'hydration'],
};

export default function Page() {
  const sections: Section[] = [
    {
      id: 'introduction',
      title: '1. Introduction',
      content: (
        <>
          <p>
            The location where web content is generated—on the server or in the user's browser—fundamentally dictates the performance profile and search engine visibility of a web application. The pendulum has swung from the original Server-Side Rendering (SSR) of the 90s (PHP/Perl) to the Client-Side Rendering (CSR) of the 2010s (SPAs), and now back to a hybrid model.
          </p>
          <img src="https://placehold.co/800x400?text=Rendering+Strategies" alt="Diagram showing data flow in CSR vs SSR" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'debate',
      title: '2. The Great Debate',
      content: (
        <div className="not-prose -mx-6 md:-mx-12">
            <DebateComparison
              title="CSR vs SSR"
              description="Browser vs Server"
              personaA={{
                name: "The SPA Purist",
                role: "React Developer",
                color: "cyan",
              }}
              personaB={{
                name: "The SEO Specialist",
                role: "Marketing Tech",
                color: "green",
              }}
              intro="Where should the HTML be born?"
              turns={[
                {
                  speaker: "A",
                  text: "CSR is the future. I send a blank HTML shell and a JS bundle. The app feels like a native mobile app. No page reloads, instant transitions.",
                  topic: "UX"
                },
                {
                  speaker: "B",
                  text: "But your user stares at a white screen for 3 seconds while that JS bundle downloads! And Googlebot sees an empty page. If you care about ranking, you need SSR.",
                  topic: "SEO"
                },
                {
                  speaker: "A",
                  text: "Googlebot runs JS now! And with code-splitting, I can make the initial load fast. Why burden the server with rendering logic? Let the client's device do the work.",
                  topic: "Offloading"
                },
                {
                  speaker: "B",
                  text: "Mobile devices are slow. SSR sends ready-to-render HTML. The user sees content instantly (FCP). It's perceived performance. Plus, social media preview cards don't run JS.",
                  topic: "Performance"
                }
              ]}
              conclusion="Modern frameworks (Next.js, Remix) offer the best of both: SSR for the initial load, then hydration into a CSR experience."
              winner="Hybrid (SSG/SSR + Hydration)"
            />
        </div>
      )
    },
    {
      id: 'historical-evolution',
      title: '3. Historical Evolution',
      content: (
        <>
           <p><strong>Web 1.0:</strong> SSR (PHP, ASP). <strong>Web 2.0:</strong> AJAX. <strong>Web 3.0:</strong> Isomorphic/Universal JS (Next.js).</p>
           <img src="https://placehold.co/800x400?text=Web+Evolution" alt="Timeline of web rendering" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'theoretical-foundations',
      title: '4. Theoretical Foundations',
      content: (
        <>
           <p><strong>Hydration:</strong> The process where client-side JS takes over static HTML sent by the server to make it interactive.</p>
        </>
      )
    },
    {
      id: 'system-architecture',
      title: '5. System Architecture',
      content: (
        <>
           <p><strong>SSR:</strong> Server does work on every request. High server load.</p>
           <p><strong>CSR:</strong> Client does work. Low server load (just API calls).</p>
        </>
      )
    },
    {
      id: 'software-implications',
      title: '6. Software Implications',
      content: (
        <>
           <p>SSR requires a Node.js runtime on the server. CSR can be hosted on a cheap CDN (S3/Netlify).</p>
        </>
      )
    },
    {
      id: 'performance-analysis',
      title: '7. Performance Analysis',
      content: (
        <>
           <p><strong>TTFB:</strong> Slow in SSR. Fast in CSR.</p>
           <p><strong>FCP:</strong> Fast in SSR. Slow in CSR.</p>
           <img src="https://placehold.co/800x400?text=Web+Vitals+Comparison" alt="Bar chart of TTFB and FCP" className="w-full rounded-xl my-8 border border-white/10" />
        </>
      )
    },
    {
      id: 'economic-factors',
      title: '8. Economic Factors',
      content: (
        <>
           <p>CSR is cheaper to host (Static). SSR costs more (Compute).</p>
        </>
      )
    },
    {
      id: 'reliability-security',
      title: '9. Reliability and Security',
      content: (
        <>
           <p>SSR protects API keys (server-side calls). CSR exposes all logic to the browser.</p>
        </>
      )
    },
    {
      id: 'applications',
      title: '10. Applications',
      content: (
        <>
           <p><strong>SSR:</strong> E-commerce, News sites.</p>
           <p><strong>CSR:</strong> Dashboards, Admin panels.</p>
        </>
      )
    },
    {
      id: 'case-studies',
      title: '11. Case Studies',
      content: (
        <>
           <p><strong>Netflix:</strong> Removed React from their landing page to improve load time by 50%.</p>
        </>
      )
    },
    {
      id: 'advantages-disadvantages',
      title: '12. Advantages and Disadvantages',
      content: (
        <>
           <ul className="list-disc pl-6">
              <li><strong>SSR:</strong> Good SEO, Fast FCP. Slow TTFB.</li>
              <li><strong>CSR:</strong> Rich interactions, Cheap hosting. Bad SEO.</li>
           </ul>
        </>
      )
    },
    {
      id: 'future-trends',
      title: '13. Future Trends',
      content: (
        <>
           <p><strong>React Server Components (RSC):</strong> The next evolution, allowing granular SSR at the component level.</p>
        </>
      )
    },
    {
      id: 'ethical-impact',
      title: '14. Ethical Impact',
      content: (
        <>
           <p>SSR is more accessible to users with low-end devices and slow connections.</p>
        </>
      )
    },
    {
      id: 'summary-table',
      title: '15. Comparative Summary',
      content: (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/20">
                <th className="p-4 text-white">Feature</th>
                <th className="p-4 text-purple-400">CSR</th>
                <th className="p-4 text-blue-400">SSR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
               <tr>
                <td className="p-4 font-semibold text-slate-300">Initial Load</td>
                <td className="p-4">Slow (Download JS)</td>
                <td className="p-4">Fast (HTML)</td>
              </tr>
              <tr>
                <td className="p-4 font-semibold text-slate-300">SEO</td>
                <td className="p-4">Poor</td>
                <td className="p-4">Excellent</td>
              </tr>
            </tbody>
          </table>
        </div>
      )
    },
    {
      id: 'conclusion',
      title: '16. Conclusion',
      content: (
        <>
           <p>Use SSR for content. Use CSR for apps. Use Hybrids for everything else.</p>
        </>
      )
    }
  ];

  return (
    <AcademicComparison
      title="CSR vs SSR Rendering"
      topicA="Client-Side Rendering"
      topicB="Server-Side Rendering"
      abstract="A performance and architectural analysis of web rendering patterns. This study evaluates the trade-off between server load, initial load latency, and search engine optimization."
      sections={sections}
    />
  );
}
