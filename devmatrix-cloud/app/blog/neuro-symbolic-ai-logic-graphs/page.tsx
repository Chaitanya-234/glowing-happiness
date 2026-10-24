import JsonLdArticle from '@/components/JsonLdArticle';

export default function NeuroSymbolicAiBlog() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-20">
      <JsonLdArticle
        headline="Neuro-Symbolic AI: Merging LLMs with Logic & Knowledge Graphs"
        description="LLMs hallucinate. Logic systems are brittle. Discover how Neuro-Symbolic AI combines the best of both worlds to build robust, reasoning systems."
        datePublished="2025-12-25"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/neuro-symbolic-ai-logic-graphs"
      />

      {/* Hero Section */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          Neuro-Symbolic AI: Merging LLMs with Logic & Knowledge Graphs
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <span>📅 December 25, 2025</span>
          <span>⏱️ 50 min read</span>
          <span>🏷️ Advanced AI</span>
        </div>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          We are currently witnessing the limitations of "Pure Deep Learning." Large Language Models (LLMs) like GPT-4 and Claude 3.5 are impressive statistical mimics—they predict the next token based on probability distributions learned from massive internet corpora. However, they lack a fundamental understanding of truth, logic, or causality. This leads to the infamous "hallucination" problem, where an AI will confidently assert that <span className="italic">1 + 1 = 3</span> if the context nudges it that way.
        </p>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
          On the other hand, traditional Symbolic AI (GOFAI - Good Old-Fashioned AI), such as Expert Systems and Knowledge Graphs, is perfectly logical. It deals in absolutes: true or false, entity and relation. But it is brittle, hard to scale, and cannot handle the messiness of the real world (images, audio, messy text).
        </p>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
          The future of Artificial General Intelligence (AGI) belongs to <strong>Neuro-Symbolic AI</strong>: systems that combine the learning capability and flexibility of neural networks with the reasoning power and explainability of symbolic logic. This is "System 1" (Fast, Intuitive Pattern Matching) meeting "System 2" (Slow, Deliberate Logical Reasoning).
        </p>
      </header>

      {/* Quick Navigation */}
      <nav className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 mb-12 border-l-4 border-purple-600">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Table of Contents</h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#the-hallucination-problem" className="text-purple-600 dark:text-purple-400 hover:underline">The Hallucination Problem</a></li>
          <li><a href="#symbolic-grounding" className="text-purple-600 dark:text-purple-400 hover:underline">Theory: Symbolic Grounding & Knowledge Graphs</a></li>
          <li><a href="#architecture-patterns" className="text-purple-600 dark:text-purple-400 hover:underline">Architecture: Neural Front, Symbolic Back</a></li>
          <li><a href="#logic-tensor-networks" className="text-purple-600 dark:text-purple-400 hover:underline">Advanced Theory: Logic Tensor Networks (LTNs)</a></li>
          <li><a href="#java-implementation" className="text-purple-600 dark:text-purple-400 hover:underline">Java Implementation: Knowledge Graph Builder</a></li>
          <li><a href="#nextjs-implementation" className="text-purple-600 dark:text-purple-400 hover:underline">Next.js Implementation: The Hybrid Interface</a></li>
          <li><a href="#security" className="text-purple-600 dark:text-purple-400 hover:underline">Security: Preventing Logic Injection</a></li>
        </ul>
      </nav>

      {/* The Hallucination Problem */}
      <section id="the-hallucination-problem" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          The Hallucination Problem: Why Stats Aren't Enough
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          If you ask an LLM "Who is the CEO of DevMetrix?", it might invent a name. Why? Because it doesn't "know" facts; it knows probability distributions of word sequences. If "DevMetrix" appears in contexts similar to "Tech Company", the model predicts a generic tech CEO name with high probability.
        </p>
        <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-lg border border-red-200 dark:border-red-900 mb-6">
            <h3 className="text-xl font-bold text-red-600 mb-2">Why LLMs Fail at Logic</h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-4">
                <li><strong>No Ground Truth:</strong> Training data contains contradictions. The internet says both "The Earth is flat" and "The Earth is round." The model learns both.</li>
            <li><strong>Stochasticity:</strong> A temperature &gt; 0 means the model <em>must</em> sometimes choose a less probable word to be "creative." In factual recall, creativity is lying.</li>
                <li><strong>Inability to Backtrack:</strong> Standard autoregressive models generate left-to-right. Once they output "The answer is...", they are committed, even if the logic falls apart halfway through the sentence.</li>
                <li><strong>Compositional Generalization:</strong> LLMs struggle to apply known rules to new combinations. They might know "A is B" and "B is C", but fail to conclude "A is C" in complex scenarios (transitivity failure).</li>
            </ul>
        </div>
      </section>

      {/* Theory: Symbolic Grounding */}
      <section id="symbolic-grounding" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Theory: Symbolic Grounding & Knowledge Graphs
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          <strong>Symbolic Grounding</strong> is the process of anchoring the vague, high-dimensional vector representations of a neural network into discrete, verifiable symbols (entities and relationships) that map to the real world.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            The most common symbolic structure used today is the <strong>Knowledge Graph (KG)</strong>. A KG stores data as triples: <code>(Subject, Predicate, Object)</code>. E.g., <code>(Elon Musk, CEO_OF, Tesla)</code>. Unlike a vector database, a KG explicitly encodes the <em>relationship</em> between data points.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-600 mb-6">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Neuro-Symbolic Integration Patterns</h4>
            <ol className="list-decimal list-inside space-y-4 text-gray-700 dark:text-gray-300">
                <li><strong>LLM-for-KG (Graph Construction):</strong> Using the LLM to read millions of unstructured documents and extract entities and relations to <em>build</em> or <em>enrich</em> the graph. The LLM acts as the parser.</li>
                <li><strong>KG-for-LLM (Graph RAG):</strong> Using the graph to retrieve multi-hop facts to <em>ground</em> the LLM's generation. Instead of just retrieving similar chunks (Vector RAG), we traverse the graph to find connected concepts.</li>
                <li><strong>Deep Neuro-Symbolic Integration:</strong> Embedding the logic rules directly into the neural network's architecture or loss function. This forces the model to learn representations that satisfy logical constraints.</li>
            </ol>
        </div>
      </section>

      {/* Architecture: Neural Front, Symbolic Back */}
      <section id="architecture-patterns" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Architecture: Neural Front, Symbolic Back
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          The most practical architecture for enterprise applications in 2025 is <strong>Neural Front, Symbolic Back</strong>.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
             The LLM handles the "messy" natural language input (Parsing, Intent Detection, Ambiguity Resolution), and translates it into a "clean" symbolic query (SPARQL, Cypher, SQL). The Symbolic system (Graph Database) executes the query (guaranteeing correctness and determinism), and the LLM translates the structured result back to natural language.
        </p>
        <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 mb-6 font-mono text-sm text-green-400">
            <strong>User:</strong> "Does the CEO of Tesla own any social media companies?"<br/><br/>
            <strong>1. Neural Parsing (LLM):</strong><br/>
            Identify Entities: "Tesla" (Company), "Social Media" (Industry)<br/>
            Identify Relation: "CEO", "Owns"<br/><br/>
            <strong>2. Symbolic Query Generation (Cypher):</strong><br/>
            MATCH (p:Person)-[:CEO_OF]-&gt;(c:Company &#123;name: 'Tesla'&#125;)<br/>
            MATCH (p)-[:OWNS]-&gt;(o:Company)<br/>
            WHERE o.industry = 'Social Media'<br/>
            RETURN p.name, o.name<br/><br/>
            <strong>3. Symbolic Execution (Neo4j):</strong><br/>
            Result: [&#123;p.name: "Elon Musk", o.name: "X (Twitter)"&#125;]<br/><br/>
            <strong>4. Neural Response Generation (LLM):</strong><br/>
            "Yes, Elon Musk, the CEO of Tesla, owns X (formerly Twitter)."
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            This architecture eliminates hallucination for the queried facts because the answer comes from the database, not the model's weights.
        </p>
      </section>

      {/* Advanced Theory: LTNs */}
      <section id="logic-tensor-networks" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Advanced Theory: Logic Tensor Networks (LTNs)
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            For true researchers, simply chaining an LLM and a DB isn't "Deep" Neuro-Symbolic AI. <strong>Logic Tensor Networks (LTNs)</strong> represent a deeper fusion.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            In an LTN, logical formulas are translated into differentiable loss functions. We use "Real Logic" where truth values are continuous numbers between 0 and 1 (fuzzy logic).
        </p>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Example: Enforcing Transitivity</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
                Suppose we want to learn the "Ancestor" relationship. We know a rule: <br/>
                <code>For all x, y, z: Parent(x, y) AND Ancestor(y, z) -&gt; Ancestor(x, z)</code>
            </p>
            <p className="text-gray-700 dark:text-gray-300">
                In an LTN, we train the neural network to minimize the "violation" of this rule. If the network predicts <code>Parent(A, B) = 0.9</code> and <code>Ancestor(B, C) = 0.9</code>, but <code>Ancestor(A, C) = 0.1</code>, the loss function spikes, forcing the network to adjust weights until it respects the logical law.
            </p>
        </div>
      </section>

      {/* Java Implementation */}
      <section id="java-implementation" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Java Implementation: Knowledge Graph Builder
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Here, we use Spring Boot to ingest unstructured text documents (e.g., PDFs, Wiki pages), call an LLM (via Spring AI) to extract semantic triples, and persist them into a Neo4j graph database.
        </p>

        <div className="bg-black text-gray-300 rounded-lg p-4 overflow-x-auto mb-6">
            <pre><code className="language-java">{`package com.devmetrix.neurosymbolic;

import org.springframework.stereotype.Service;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Session;
import org.springframework.ai.chat.ChatClient;
import java.util.List;
import java.util.Map;

@Service
public class KnowledgeGraphService {

    private final ChatClient chatClient;
    private final Driver neo4jDriver; // Neo4j Java Driver

    public KnowledgeGraphService(ChatClient chatClient, Driver neo4jDriver) {
        this.chatClient = chatClient;
        this.neo4jDriver = neo4jDriver;
    }

    /**
     * Ingests a text block and converts it to graph nodes/edges
     */
    public void ingestDocument(String content) {
        // 1. Prompt LLM to extract triples
        // We ask for a strict JSON format to ensure parsability
        String prompt = """
            You are a Knowledge Graph extraction engine.
            Extract all entities and relationships from the text below.
            Ignore generic entities like 'it' or 'they'.
            Format: JSON list of objects with keys: subject, predicate, object, subjectType, objectType.

            Text: """ + content;

        String jsonResponse = chatClient.call(prompt).getResult().getOutput().getContent();
        List<Triple> triples = parseJson(jsonResponse); // Custom JSON parser

        // 2. Insert into Neo4j
        // We use MERGE to avoid duplicates (idempotency)
        try (Session session = neo4jDriver.session()) {
            for (Triple t : triples) {
                session.run("""
                    MERGE (s:Entity {name: $sub})
                    ON CREATE SET s.type = $subType
                    MERGE (o:Entity {name: $obj})
                    ON CREATE SET o.type = $objType
                    MERGE (s)-[r:RELATION {type: $pred}]-&gt;(o)
                    """,
                    Map.of(
                        "sub", t.subject(),
                        "subType", t.subjectType(),
                        "obj", t.object(),
                        "objType", t.objectType(),
                        "pred", formatPredicate(t.predicate())
                    )
                );
            }
        }
    }

    private String formatPredicate(String pred) {
        return pred.toUpperCase().replace(" ", "_");
    }

    // Java 17+ Record for immutable data
    record Triple(String subject, String predicate, String object, String subjectType, String objectType) {}
}
`}</code></pre>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            <em>Pro Tip:</em> In production, you would need an "Entity Resolution" step. The LLM might extract "Elon Musk" from one doc and "Elon R. Musk" from another. You need a fuzzy matching algorithm or a vector-based similarity check to merge these into a single node ID.
        </p>
      </section>

      {/* Next.js Implementation */}
      <section id="nextjs-implementation" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Next.js Implementation: The Hybrid Interface
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          The frontend needs to show not just the answer, but the <em>reasoning path</em> through the graph. This builds trust (Explainable AI). We can use a library like `react-force-graph` to visualize the subgraph retrieved by the query.
        </p>

        <div className="bg-black text-gray-300 rounded-lg p-4 overflow-x-auto mb-6">
            <pre><code className="language-tsx">{`'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Dynamic import to avoid SSR issues with canvas/window
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), { ssr: false });

export default function KnowledgeVisualizer({ graphData }) {
  // graphData format: { nodes: [{id: 'Elon'}, {id: 'Tesla'}], links: [{source: 'Elon', target: 'Tesla', label: 'CEO'}] }

  const [dimensions, setDimensions] = useState({ w: 800, h: 500 });

  useEffect(() => {
    // Responsive resizing logic here
    setDimensions({ w: window.innerWidth, h: 500 });
  }, []);

  return (
    <div className="border border-purple-500/30 rounded-xl overflow-hidden bg-gray-900 h-[500px] relative">
      <div className="absolute top-4 left-4 z-10 bg-black/70 p-2 rounded text-xs text-white border border-gray-700">
        <span className="text-purple-400 font-bold">● Entities:</span> {graphData.nodes.length} <br/>
        <span className="text-gray-400 font-bold">― Relations:</span> {graphData.links.length}
      </div>

      <ForceGraph2D
        width={dimensions.w}
        height={dimensions.h}
        graphData={graphData}
        nodeLabel="id"
        nodeColor={node => node.type === 'Person' ? '#8b5cf6' : '#10b981'} // Conditional coloring
        linkColor={() => '#4b5563'} // Gray links
        nodeRelSize={6}
        linkDirectionalArrowLength={3.5}
        linkDirectionalArrowRelPos={1}
        linkCurvature={0.25}
        backgroundColor="#111827" // dark-gray-900
        cooldownTicks={100}
        onNodeClick={node => alert(\`You clicked \${node.id}\`)}
      />
    </div>
  );
}
`}</code></pre>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-red-600">
          Security: Preventing Logic Injection
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          When we allow an LLM to generate database queries (Text-to-SQL or Text-to-Cypher), we open the door to a new class of vulnerability: <strong>Logic Injection</strong> (or Indirect Prompt Injection leading to SQLi).
        </p>

        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 mb-6 border-l-4 border-red-600">
             <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">The Attack Scenario</h3>
             <p className="text-gray-700 dark:text-gray-300 mb-2">
                User: "Show me the users where name is 'admin' OR 1=1 DELETE DETACH n"
             </p>
             <p className="text-gray-700 dark:text-gray-300 mb-2">
                If the LLM blindly pastes this user input into the Cypher query string it generates, the attacker could wipe your entire graph database.
             </p>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Mitigation Strategies</h3>
        <ul className="list-disc list-inside space-y-4 text-gray-700 dark:text-gray-300 mb-6">
            <li><strong>Strict Parameterization:</strong> Never allow the LLM to concatenate values into the query string. Force the LLM to generate a JSON object of parameters, and use the database driver's parameter substitution (e.g., `$name`) to safely insert them.</li>
            <li><strong>Read-Only Permissions (Principle of Least Privilege):</strong> The database user used by the inference service should have strictly <code>READ</code> access. It should physically lack the permission to <code>CREATE</code>, <code>DELETE</code>, or <code>SET</code> properties.</li>
            <li><strong>Grammar-Constrained Decoding:</strong> Use tools like Llama.cpp grammars or LMQL to constrain the LLM's output. You can mathematically force the model to output only valid Cypher syntax that matches a specific safe template, rejecting any token that would break the syntax or introduce forbidden keywords.</li>
            <li><strong>The "Semantic Firewall":</strong> A separate, smaller model (or a set of regex rules) that validates the generated query against a whitelist of allowed patterns before execution. If the query contains `DELETE` or access to the `UserPassword` node label, block it.</li>
        </ul>
      </section>

    </article>
  );
}
