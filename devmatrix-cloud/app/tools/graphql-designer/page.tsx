import GraphQLDesignerClient from './components/GraphQLDesignerClient';

export default function GraphQLDesignerPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-purple-100 pt-24 pb-20">
      <div className="container mx-auto px-4">

        <GraphQLDesignerClient />

        <article className="mt-24 prose prose-invert prose-lg max-w-4xl mx-auto text-gray-600 dark:text-purple-200/80 px-4">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-purple-200 dark:via-purple-100 dark:to-purple-200 mb-8">
            Ultimate Guide: Converting REST APIs to GraphQL
          </h1>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-purple-100 mb-6">What is GraphQL?</h2>
            <p>
              GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. Created by Facebook in 2012 and open-sourced in 2015, it provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.
            </p>
            <p>
              Unlike REST, where the server defines the structure of data returned by each endpoint, GraphQL allows the client to dictate the shape of the response. This fundamental inversion of control solves many inefficiencies inherent in traditional REST architectures.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-purple-100 mb-6">REST vs. GraphQL: A Complete Comparison</h2>

            <h3 className="text-2xl font-semibold text-gray-800 dark:text-purple-200 mb-4">The N+1 Query Problem</h3>
            <p>
              One of the most significant performance bottlenecks in API development is the N+1 problem. In REST, fetching a list of items and then their related details often requires N+1 API calls (one for the list, and N for the details). GraphQL, when implemented with patterns like DataLoader, solves this elegantly by batching requests on the server side.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 dark:text-purple-200 mb-4">Over-fetching and Under-fetching</h3>
            <p>
              REST endpoints often return fixed data structures. This leads to <strong>over-fetching</strong> (downloading data the client doesn't use) or <strong>under-fetching</strong> (not getting enough data, requiring additional requests). GraphQL eliminates this by allowing precise field selection.
            </p>

            <div className="overflow-x-auto my-8">
              <table className="min-w-full text-left border border-gray-200 dark:border-gray-700 rounded-lg">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="p-4 font-semibold text-gray-900 dark:text-white">Feature</th>
                    <th className="p-4 font-semibold text-gray-900 dark:text-white">REST</th>
                    <th className="p-4 font-semibold text-gray-900 dark:text-white">GraphQL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="p-4">Data Fetching</td>
                    <td className="p-4">Multiple Endpoints</td>
                    <td className="p-4">Single Endpoint</td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-900/50">
                    <td className="p-4">Response Structure</td>
                    <td className="p-4">Server Defined</td>
                    <td className="p-4">Client Defined</td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800">
                    <td className="p-4">Versioning</td>
                    <td className="p-4">v1, v2, v3...</td>
                    <td className="p-4">Evolution / Deprecation</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-purple-100 mb-6">How Our AI Converter Works</h2>
            <p>
              Migrating from REST to GraphQL manually is a daunting task requiring deep understanding of your data graph. Our AI-powered tool automates this process through several intelligent steps:
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 dark:text-purple-200 mb-4 mt-6">1. API Analysis</h3>
            <p>
              The tool parses your input (OpenAPI, JSON, or text) to identify entities. It looks for patterns in URL structures (e.g., <code>/users/:id</code>) to detect resources and their relationships.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 dark:text-purple-200 mb-4 mt-6">2. Relationship Inference</h3>
            <p>
              By analyzing field names like <code>authorId</code> or nested arrays in responses, the AI constructs a knowledge graph of your data model, determining one-to-one, one-to-many, and many-to-many relationships.
            </p>

            <h3 className="text-2xl font-semibold text-gray-800 dark:text-purple-200 mb-4 mt-6">3. Schema & Resolver Generation</h3>
            <p>
              It generates a compliant GraphQL SDL (Schema Definition Language) and writes TypeScript resolvers. Crucially, it automatically implements the <strong>DataLoader</strong> pattern for identified relationships to ensure high performance.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-purple-100 mb-6">Migration Strategies</h2>
            <p>
              You don't have to rewrite everything at once. We recommend a phased approach:
            </p>
            <ol className="list-decimal pl-6 space-y-4 mt-4 text-gray-600 dark:text-purple-200/70">
              <li>
                <strong className="text-gray-900 dark:text-purple-100">The "Strangler" Pattern:</strong> Build a GraphQL facade over your existing REST APIs. The resolvers call the old endpoints behind the scenes.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-purple-100">Parallel Running:</strong> Keep both APIs active. Migrate high-traffic or complex screens to GraphQL first to validate performance gains.
              </li>
              <li>
                <strong className="text-gray-900 dark:text-purple-100">Deprecation:</strong> Once clients are moved, mark REST endpoints as deprecated before decommissioning.
              </li>
            </ol>
          </section>

          <section className="mb-12 bg-gray-50 dark:bg-purple-900/10 p-8 rounded-xl border border-gray-200 dark:border-purple-500/20">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-purple-100 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-bold text-gray-800 dark:text-purple-200 mb-2">Is GraphQL better than REST?</h4>
                <p className="text-gray-600 dark:text-purple-200/70">
                  It depends. GraphQL excels for complex, graph-like data and mobile applications where bandwidth is premium. REST can be simpler for flat data or public caching scenarios.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800 dark:text-purple-200 mb-2">Do I need to change my database?</h4>
                <p className="text-gray-600 dark:text-purple-200/70">
                  No. GraphQL is database-agnostic. It sits as a layer above your existing services or databases.
                </p>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800 dark:text-purple-200 mb-2">How do I handle caching?</h4>
                <p className="text-gray-600 dark:text-purple-200/70">
                  GraphQL caching is more complex than HTTP caching because of the single endpoint. Most teams use normalized client-side caches (like Apollo Client) or persisted queries.
                </p>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
