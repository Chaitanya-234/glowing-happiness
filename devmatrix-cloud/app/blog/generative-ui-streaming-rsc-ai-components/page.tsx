'use client';
import { useTheme } from '@/components/providers/ThemeProvider';
import JsonLdArticle from '@/components/JsonLdArticle';

export default function GenerativeUiBlog() {
  const { currentTheme: theme } = useTheme();
  return (
    <article className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-20">
      <JsonLdArticle
        headline="Generative UI: Streaming React Server Components with AI for Dynamic Interfaces"
        description="Move beyond text responses. Learn how to use Vercel AI SDK and React Server Components to generate interactive UI elements on the fly based on user intent."
        datePublished="2025-12-20"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/generative-ui-streaming-rsc-ai-components"
      />

      {/* Hero Section */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          Generative UI: Streaming React Server Components with AI for Dynamic Interfaces
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <span>📅 December 20, 2025</span>
          <span>⏱️ 30 min read</span>
          <span>🏷️ Frontend AI</span>
        </div>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          The chat interface is evolving. We started with text, then markdown. Now, we are entering the era of <strong>Generative UI</strong>. Instead of just describing a flight itinerary in text, the AI renders a fully interactive flight booking card. Instead of explaining a stock trend, it renders a live TradingView chart. This guide explores how to build these experiences using <strong>Next.js 15</strong>, <strong>React Server Components (RSC)</strong>, and the <strong>Vercel AI SDK</strong>.
        </p>
      </header>

      {/* Quick Navigation */}
      <nav className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 mb-12 border-l-4 border-purple-600">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Quick Navigation</h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#concept" className="text-purple-600 dark:text-purple-400 hover:underline">The Concept: AI as a UI Architect</a></li>
          <li><a href="#security" className="text-purple-600 dark:text-purple-400 hover:underline">Security Risks: XSS & Hallucinations</a></li>
          <li><a href="#code-nextjs" className="text-purple-600 dark:text-purple-400 hover:underline">Next.js Implementation: createStreamableUI</a></li>
          <li><a href="#code-spring" className="text-purple-600 dark:text-purple-400 hover:underline">Backend Data Provider (Spring Boot)</a></li>
          <li><a href="#lifecycle" className="text-purple-600 dark:text-purple-400 hover:underline">The GenUI Lifecycle</a></li>
        </ul>
      </nav>

      {/* Concept */}
      <section id="concept" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          The Concept: AI as a UI Architect
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Traditionally, UI is deterministic. You build a `FlightCard` component and render it when `data.type === 'flight'`. With Generative UI, the LLM decides <em>which</em> component to render and with <em>what</em> props, based on the user&apos;s natural language query.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500 mb-6">
            <h4 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-2">Streaming Components</h4>
            <p className="text-gray-700 dark:text-gray-300">
                The magic happens via RSC streaming. The AI doesn&apos;t just send a JSON blob; it streams the React Component tree itself. This means the user sees the skeleton loader, then the partial UI, then the final interactive widget—all orchestrated by the LLM.
            </p>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Security Risks: XSS & Hallucinations
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Allowing an AI to generate UI sounds dangerous—and it can be.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cross-Site Scripting (XSS)</h3>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            If you allow the LLM to generate raw HTML (e.g., via `dangerouslySetInnerHTML`), it will eventually generate `&lt;script&gt;alert(1)&lt;/script&gt;`.
            <strong>Solution:</strong> Never let the LLM write code. Let it call <strong>Tools</strong> that map to pre-built, safe React Components.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Hallucinated Actions</h3>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            An LLM might render a &quot;Buy Now&quot; button with a price of $0.00 because it hallucinated a discount.
            <strong>Solution:</strong> The UI rendered by the AI must be stateless or validated by the backend before any transaction occurs. The &quot;Buy&quot; button should trigger a Server Action that re-validates the price.
        </p>
      </section>

      {/* Next.js Implementation */}
      <section id="code-nextjs" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Next.js Implementation: createStreamableUI
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Here is a Server Action that streams a stock chart based on a user prompt.
        </p>

        <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-gray-400 text-sm">actions.tsx (Server Action)</span>
            </div>
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
{`'use server';

import { createStreamableUI } from 'ai/rsc';
import { OpenAI } from 'openai';
import { StockChart } from '@/components/StockChart';
import { Spinner } from '@/components/Spinner';

const openai = new OpenAI();

export async function submitUserMessage(content: string) {
  const ui = createStreamableUI(<Spinner />);

  (async () => {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content }],
      tools: [
        {
          type: 'function',
          function: {
            name: 'show_stock_price',
            description: 'Get stock price and show chart',
            parameters: {
              type: 'object',
              properties: {
                symbol: { type: 'string' },
              },
              required: ['symbol'],
            },
          },
        },
      ],
    });

    const toolCall = response.choices[0].message.tool_calls?.[0];

    if (toolCall && toolCall.function.name === 'show_stock_price') {
      const args = JSON.parse(toolCall.function.arguments);
      const data = await fetchStockData(args.symbol); // Fetch from external API

      // Replace the spinner with the actual component
      ui.done(<StockChart symbol={args.symbol} data={data} />);
    } else {
      ui.done(<div className="text-gray-500">I could not find a chart for that.</div>);
    }
  })();

  return {
    id: Date.now(),
    display: ui.value,
  };
}`}
            </pre>
        </div>
      </section>

      {/* Backend Data Provider */}
      <section id="code-spring" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Backend Data Provider (Spring Boot)
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            The Next.js server needs a reliable source of truth. Your Spring Boot backend acts as the data provider that ensures the numbers shown in the Generative UI are accurate and authorized.
        </p>

        <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
             <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-gray-400 text-sm">Java (Spring Boot)</span>
            </div>
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
{`@RestController
@RequestMapping("/api/stocks")
public class StockController {

    @GetMapping("/{symbol}")
    @PreAuthorize("hasRole('USER')") // Ensure user has access
    public StockData getStock(@PathVariable String symbol) {
        // In a real app, this calls an exchange API
        return new StockData(symbol, 150.25, List.of(140.0, 145.0, 150.25));
    }
}

// The UI will fetch this data, or the Next.js server will proxy it.
// Key Point: The AI *decides* to show the chart, but the *data* comes from here.`}
            </pre>
        </div>
      </section>

      {/* Lifecycle */}
      <section id="lifecycle" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          The GenUI Lifecycle
        </h2>
        <div className="space-y-4">
             <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="h-10 w-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold mr-4">1</div>
                <div>
                    <h4 className="font-bold">Intent Recognition</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">LLM analyzes user prompt: &quot;Show me AAPL stock&quot;.</p>
                </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold mr-4">2</div>
                <div>
                    <h4 className="font-bold">Tool Selection</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">LLM selects `show_stock_price` tool.</p>
                </div>
            </div>
             <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold mr-4">3</div>
                <div>
                    <h4 className="font-bold">Component Hydration</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Next.js renders `&lt;StockChart /&gt;` on the server and streams HTML.</p>
                </div>
            </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Conclusion</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Generative UI represents the shift from &quot;Command Line Interface&quot; thinking to &quot;Intent Oriented Interface&quot; thinking. By combining the reasoning power of LLMs with the component model of React, we can build interfaces that adapt to the user, rather than forcing the user to adapt to the interface.
        </p>
      </section>

    </article>
  );
}
