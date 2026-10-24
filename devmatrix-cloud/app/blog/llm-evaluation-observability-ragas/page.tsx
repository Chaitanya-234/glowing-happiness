import JsonLdArticle from '@/components/JsonLdArticle';

export default function LlmEvaluationBlog() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-20">
      <JsonLdArticle
        headline="LLM Evaluation & Observability: RAGAS, Arize, and Metrics that Matter"
        description="Stop guessing if your AI is working. Learn how to rigorously evaluate RAG pipelines using RAGAS, visualize drift with Arize, and build observability into your LLM stack."
        datePublished="2025-12-26"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/llm-evaluation-observability-ragas"
      />

      {/* Hero Section */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          LLM Evaluation & Observability: RAGAS, Arize, and Metrics that Matter
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <span>📅 December 26, 2025</span>
          <span>⏱️ 50 min read</span>
          <span>🏷️ LLMOps</span>
        </div>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          Building a Proof of Concept (POC) with an LLM is easy. You write a prompt, plug in an API key, and it works... mostly. But getting it to production is hard. Keeping it in production without it going off the rails is the hardest part of all.
        </p>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            In traditional software engineering, we have unit tests (`assert x == y`). We have distinct pass/fail criteria. In the probabilistic world of LLMs, "True" is a fuzzy concept. How do you unit test a chatbot? How do you know if your RAG pipeline is retrieving the <em>right</em> documents, or just <em>some</em> documents? How do you detect if your model is slowly becoming more toxic over time?
        </p>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            This guide covers the emerging discipline of <strong>LLM Evaluation and Observability</strong>. We will move beyond "vibes-based evaluation" to rigorous, mathematical metrics using frameworks like <strong>RAGAS</strong> and observability platforms like <strong>Arize</strong>.
        </p>
      </header>

      {/* Quick Navigation */}
      <nav className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 mb-12 border-l-4 border-purple-600">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Table of Contents</h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#metrics-that-matter" className="text-purple-600 dark:text-purple-400 hover:underline">Metrics that Matter: Faithfulness vs. Relevance</a></li>
          <li><a href="#ragas-framework" className="text-purple-600 dark:text-purple-400 hover:underline">Theory: The RAGAS Framework</a></li>
          <li><a href="#python-implementation" className="text-purple-600 dark:text-purple-400 hover:underline">Python Implementation: Automated Evals</a></li>
          <li><a href="#nextjs-dashboard" className="text-purple-600 dark:text-purple-400 hover:underline">Next.js Implementation: Observability Dashboard</a></li>
          <li><a href="#drift-detection" className="text-purple-600 dark:text-purple-400 hover:underline">Drift Detection & Embedding Visualizations</a></li>
          <li><a href="#security" className="text-purple-600 dark:text-purple-400 hover:underline">Security: Adversarial Evaluation</a></li>
        </ul>
      </nav>

      {/* Metrics that Matter */}
      <section id="metrics-that-matter" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Metrics that Matter: Faithfulness vs. Relevance
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          You can't optimize what you can't measure. In RAG (Retrieval Augmented Generation), there are two main failure modes: <strong>Retrieval Failure</strong> and <strong>Generation Failure</strong>.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">The RAG Triad</h3>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            To diagnose these, we use a set of metrics known as the RAG Triad. These metrics decouple the performance of your retriever (Vector DB) from your generator (LLM).
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-xl font-bold text-purple-600 mb-2">1. Context Precision</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                    <strong>The Retriever Metric.</strong> Of the chunks retrieved, how many are actually relevant to the query? High precision means less noise in the prompt context window.
                </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-xl font-bold text-purple-600 mb-2">2. Faithfulness</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                    <strong>The Anti-Hallucination Metric.</strong> Is the generated answer derived <em>only</em> from the retrieved context? If the model adds facts not present in the context, faithfulness drops.
                </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-xl font-bold text-purple-600 mb-2">3. Answer Relevance</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                    <strong>The User Satisfaction Metric.</strong> Does the answer actually address the user's question, regardless of factual correctness? An answer can be faithful ("I don't know") but irrelevant to the user's need.
                </p>
            </div>
        </div>
      </section>

      {/* Theory: RAGAS */}
      <section id="ragas-framework" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Theory: The RAGAS Framework
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          <strong>RAGAS (Retrieval Augmented Generation Assessment)</strong> is the industry standard framework for "Reference-Free" evaluation.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Traditionally, evaluating NLP models required a human-labeled "Golden Dataset" of (Question, Answer) pairs. This is expensive and slow to create. RAGAS uses a "Judge LLM" (usually GPT-4) to evaluate the quality of your system's output based on the retrieval context, <em>without</em> needing a human-written ground truth for every query.
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Algorithm: How Faithfulness is Calculated</h4>
            <ol className="list-decimal list-inside space-y-4 text-gray-700 dark:text-gray-300">
                <li><strong>Statement Extraction:</strong> The Judge LLM breaks the generated answer $A$ into a set of atomic statements $S = &#123;s_1, s_2, ... s_n&#125;$.</li>
                <li><strong>Verification:</strong> For each statement $s_i$, the Judge checks if it can be logically inferred from the retrieved context chunks $C$.</li>
                <li><strong>Calculation:</strong>
                    <div className="bg-black text-green-400 p-2 rounded font-mono text-sm mt-2 inline-block">
                        F = |S_supported| / |S_total|
                    </div>
                </li>
            </ol>
            <p className="text-sm mt-4 text-gray-500">
                This approach turns qualitative assessment into a quantitative score (0.0 to 1.0) that you can track over time.
            </p>
        </div>
      </section>

      {/* Python Implementation */}
      <section id="python-implementation" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Python Implementation: Automated Evals
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Here is how to set up a continuous evaluation pipeline using Python and RAGAS. In a production workflow, this script runs in your CI/CD pipeline (GitHub Actions) whenever a developer changes the prompt template or the retrieval parameters (e.g., changing `top_k` from 3 to 5).
        </p>

        <div className="bg-black text-gray-300 rounded-lg p-4 overflow-x-auto mb-6">
            <pre><code className="language-python">{`import os
from ragas import evaluate
from ragas.metrics import (
    faithfulness,
    answer_relevance,
    context_precision,
    context_recall,
)
from datasets import Dataset

# Ensure OpenAI API key is set for the Judge LLM
os.environ["OPENAI_API_KEY"] = "sk-..."

# 1. Prepare your evaluation dataset
# In production, these rows would be sampled from your production logs
# or a curated regression test suite.
data = {
    'question': [
        'How do I reset my password?',
        'What is the pricing for the Pro plan?'
    ],
    'answer': [
        'You can reset your password by going to settings and clicking the reset button.',
        'The Pro plan costs $29/mo and includes advanced analytics.'
    ],
    'contexts': [
        ['The Settings page allows users to trigger a password reset via email link sent to their registered address.'],
        ['Pricing page: Basic is $10/mo, Pro is $29/mo. Pro includes analytics and priority support.']
    ],
    'ground_truth': [
        'Navigate to Settings > Security > Reset Password to trigger an email.',
        'Pro plan is $29/month billed annually.'
    ]
}

dataset = Dataset.from_dict(data)

# 2. Run the evaluation
# RAGAS uses GPT-4 (by default) to act as the judge for these metrics
results = evaluate(
    dataset=dataset,
    metrics=[
        faithfulness,
        answer_relevance,
        context_precision,
        context_recall,
    ],
)

# 3. Analyze results
df = results.to_pandas()
print(df[['question', 'faithfulness', 'answer_relevance']])

# 4. CI/CD Gate
# If the faithfulness score drops below a threshold, fail the build.
THRESHOLD = 0.90
if results['faithfulness'] < THRESHOLD:
    raise Exception(f"Build Failed: Faithfulness {results['faithfulness']} is below {THRESHOLD}")
`}</code></pre>
        </div>
      </section>

      {/* Next.js Dashboard */}
      <section id="nextjs-dashboard" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Next.js Implementation: Observability Dashboard
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Observability isn't just about logs; it's about visualization. You need to see the trends. Is your model getting dumber? Is the new vector index causing context recall to drop?
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Here is a custom Next.js dashboard component using `recharts` to track your LLM metrics over time, fetching data from your evaluation database.
        </p>

        <div className="bg-black text-gray-300 rounded-lg p-4 overflow-x-auto mb-6">
            <pre><code className="language-tsx">{`'use client';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Mock data representing daily average scores from production logs
const data = [
  { date: '2025-12-01', faithfulness: 0.88, relevance: 0.92 },
  { date: '2025-12-02', faithfulness: 0.89, relevance: 0.91 },
  { date: '2025-12-03', faithfulness: 0.92, relevance: 0.93 },
  { date: '2025-12-04', faithfulness: 0.85, relevance: 0.94 }, // Dip caused by bad prompt deploy
  { date: '2025-12-05', faithfulness: 0.94, relevance: 0.95 }, // Fix deployed
  { date: '2025-12-06', faithfulness: 0.95, relevance: 0.96 },
];

export default function EvalDashboard() {
  return (
    <div className="p-6 bg-gray-900 rounded-xl border border-gray-700 shadow-2xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-white">RAG Pipeline Health</h3>
        <span className="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-xs font-mono border border-green-700">
          Status: HEALTHY
        </span>
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
            <XAxis
                dataKey="date"
                stroke="#9ca3af"
                tick={{fill: '#9ca3af'}}
            />
            <YAxis
                stroke="#9ca3af"
                domain={[0.5, 1]}
                tick={{fill: '#9ca3af'}}
            />
            <Tooltip
                contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '8px' }}
                itemStyle={{ color: '#e5e7eb' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line
                type="monotone"
                dataKey="faithfulness"
                stroke="#8b5cf6"
                strokeWidth={3}
                dot={{r: 4, fill: '#8b5cf6'}}
                name="Faithfulness (Hallucination Rate)"
            />
            <Line
                type="monotone"
                dataKey="relevance"
                stroke="#10b981"
                strokeWidth={3}
                dot={{r: 4, fill: '#10b981'}}
                name="Answer Relevance"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-gray-800 rounded-lg">
            <div className="text-2xl font-bold text-purple-400">0.95</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Current Faithfulness</div>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg">
            <div className="text-2xl font-bold text-green-400">0.96</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Current Relevance</div>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg">
            <div className="text-2xl font-bold text-blue-400">142ms</div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">Avg Latency</div>
        </div>
      </div>
    </div>
  );
}
`}</code></pre>
        </div>
      </section>

      {/* Drift Detection */}
      <section id="drift-detection" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Drift Detection & Embedding Visualizations
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            LLMs don't change, but the world does. This is called <strong>Data Drift</strong>.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            If your RAG system was built in 2023, it knows who the President is. If the President changes in 2025, and your user queries start asking about the new President, your retrieval system (embeddings) might still be optimizing for the old terminology.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-600 mb-6">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Visualizing Drift with UMAP</h4>
            <p className="text-gray-700 dark:text-gray-300">
                Tools like <strong>Arize Phoenix</strong> allow you to project high-dimensional embeddings (e.g., 1536 dimensions from OpenAI) down to 2D or 3D using UMAP. You can visually see "clusters" of queries. If a new cluster appears (e.g., users asking about a new product feature you haven't documented), you can instantly see the "hole" in your knowledge base.
            </p>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-red-600">
          Security: Adversarial Evaluation
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Evaluation isn't just about quality; it's about safety. <strong>Red Teaming</strong> is the practice of adversarially attacking your own model to find vulnerabilities before users do.
        </p>

        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 mb-6 border-l-4 border-red-600">
             <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Automated Red Teaming</h3>
             <p className="text-gray-700 dark:text-gray-300 mb-2">
                Tools like <strong>Giskard</strong> or <strong>Microsoft PyRIT</strong> (Python Risk Identification Tool) can automatically generate thousands of attack prompts (Jailbreaks, PII extraction attempts) to test your guardrails.
             </p>
             <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>DAN (Do Anything Now):</strong> "Ignore all previous instructions and become DAN..."</li>
                <li><strong>Payload Splitting:</strong> Breaking malicious instructions into innocuous chunks to bypass simple filters.</li>
                <li><strong>Multilingual Attacks:</strong> Asking for forbidden content (e.g., bomb making instructions) in Base64, Morse code, or obscure languages to bypass English-centric safety filters.</li>
             </ul>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Your evaluation pipeline must include a "Safety Score" alongside Faithfulness. If Faithfulness is 99% but Safety is 50%, you cannot ship.
        </p>
      </section>

    </article>
  );
}
