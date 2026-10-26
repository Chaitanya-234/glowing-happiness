'use client';
import { useTheme } from '@/components/providers/ThemeProvider';
import JsonLdArticle from '@/components/JsonLdArticle';

export default function RagTwoBlog() {
  const { currentTheme: theme } = useTheme();
  return (
    <article className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-20">
      <JsonLdArticle
        headline="RAG 2.0: The Complete Guide to GraphRAG, Hybrid Search, and Knowledge Graphs"
        description="Move beyond basic vector search. Learn how GraphRAG and hybrid retrieval systems create more accurate, context-aware RAG applications for enterprise use."
        datePublished="2025-12-15"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/rag-2-0-guide-graphrag-hybrid-search-knowledge-graphs"
      />

      {/* Hero Section */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          RAG 2.0: The Complete Guide to GraphRAG, Hybrid Search, and Knowledge Graphs
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <span>📅 December 15, 2025</span>
          <span>⏱️ 30 min read</span>
          <span>🏷️ AI Engineering</span>
        </div>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          Retrieval-Augmented Generation (RAG) changed the game by allowing LLMs to "read" your private data. But "RAG 1.0"—dumping text chunks into a vector database and doing similarity search—is hitting a wall. It fails at "global" questions ("What are the main themes in these 100 documents?") and struggles with structured data. Enter <strong>RAG 2.0</strong>: a sophisticated blend of Knowledge Graphs (GraphRAG), Hybrid Search (Keyword + Vector), and Agentic Retrieval that solves these limitations.
        </p>
      </header>

      {/* Quick Navigation */}
      <nav className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 mb-12 border-l-4 border-purple-600">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Quick Navigation</h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#why-rag-1-fails" className="text-purple-600 dark:text-purple-400 hover:underline">Why RAG 1.0 Fails at Scale</a></li>
          <li><a href="#graphrag-explained" className="text-purple-600 dark:text-purple-400 hover:underline">GraphRAG: Structured Knowledge for LLMs</a></li>
          <li><a href="#hybrid-search" className="text-purple-600 dark:text-purple-400 hover:underline">Hybrid Search: Best of Both Worlds</a></li>
          <li><a href="#implementation-guide" className="text-purple-600 dark:text-purple-400 hover:underline">Implementation Guide (Neo4j & LangChain)</a></li>
          <li><a href="#spring-boot-rag" className="text-purple-600 dark:text-purple-400 hover:underline">Enterprise RAG with Spring Boot</a></li>
          <li><a href="#future" className="text-purple-600 dark:text-purple-400 hover:underline">The Future of Information Retrieval</a></li>
        </ul>
      </nav>

      {/* Why RAG 1.0 Fails Section */}
      <section id="why-rag-1-fails" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Why RAG 1.0 Fails at Scale
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Standard RAG works by chunking text, embedding it, and retrieving the top-k most similar chunks. This is great for "lookup" tasks but terrible for "reasoning" tasks.
        </p>

        <div className="space-y-4 mb-6">
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border-l-4 border-red-600">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">The "Connecting the Dots" Problem</h4>
                <p className="text-gray-700 dark:text-gray-300">
                    If Fact A is in Document 1 and Fact B is in Document 50, a vector search might retrieve one but not the other if they don't share similar keywords. It misses the <em>relationship</em> between them.
                </p>
            </div>
             <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border-l-4 border-red-600">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">The "Global Summary" Problem</h4>
                <p className="text-gray-700 dark:text-gray-300">
                    Ask "What are the common complaints across all support tickets?" Top-k retrieval will just fetch 5 random tickets. It can't aggregate insights across the entire dataset.
                </p>
            </div>
        </div>
      </section>

      {/* GraphRAG Explained */}
      <section id="graphrag-explained" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          GraphRAG: Structured Knowledge for LLMs
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          <strong>GraphRAG</strong> (pioneered by Microsoft Research) solves this by extracting a Knowledge Graph from your data <em>before</em> retrieval. It identifies entities (People, Places, Concepts) and relationships (Works_At, Located_In, Causes).
        </p>

        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 mb-6 border-l-4 border-purple-600">
             <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">How GraphRAG Works</h3>
             <ol className="list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300">
                <li><strong>Extraction:</strong> The LLM reads documents and extracts entities and relationships.</li>
                <li><strong>Graph Construction:</strong> Nodes and edges are stored in a Graph Database (like Neo4j).</li>
                <li><strong>Community Detection:</strong> Algorithms (like Leiden) cluster related nodes into "communities."</li>
                <li><strong>Summarization:</strong> The LLM generates summaries for each community.</li>
                <li><strong>Query Time:</strong> When you ask a question, the system traverses the graph to find connected concepts, not just similar words.</li>
             </ol>
        </div>
      </section>

      {/* Hybrid Search Section */}
      <section id="hybrid-search" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Hybrid Search: Best of Both Worlds
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Vector search (Semantic) is great for concepts. Keyword search (BM25) is great for exact matches (like product IDs or specific names). <strong>Hybrid Search</strong> combines them using Reciprocal Rank Fusion (RRF).
        </p>

        <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-gray-400 text-sm">Concept: Hybrid Search Algorithm</span>
            </div>
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
{`function hybridSearch(query) {
    // 1. Get results from Vector DB (Semantic)
    vector_results = vectorDB.search(embedding(query), k=10)

    // 2. Get results from Search Engine (Keyword/BM25)
    keyword_results = elasticSearch.search(query, k=10)

    // 3. Fuse results using RRF (Reciprocal Rank Fusion)
    combined_scores = {}

    for rank, doc in enumerate(vector_results):
        combined_scores[doc.id] += 1 / (rank + 60)

    for rank, doc in enumerate(keyword_results):
        combined_scores[doc.id] += 1 / (rank + 60)

    // 4. Sort and return top results
    return sortByScore(combined_scores)
}`}
            </pre>
        </div>
      </section>

      {/* Implementation Guide */}
      <section id="implementation-guide" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Implementation Guide (Neo4j & LangChain)
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Let's build a simple GraphRAG pipeline using LangChain and Neo4j.
        </p>

        <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-gray-400 text-sm">TypeScript / LangChain</span>
            </div>
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
{`import { Neo4jGraph } from "@langchain/community/graphs/neo4j_graph";
import { ChatOpenAI } from "@langchain/openai";
import { GraphCypherQAChain } from "@langchain/community/chains/graph_qa/cypher";

// 1. Connect to Neo4j
const graph = await Neo4jGraph.initialize({
  url: "bolt://localhost:7687",
  username: "neo4j",
  password: "password",
});

// 2. Refresh Schema
await graph.refreshSchema();

// 3. Create the Chain
const model = new ChatOpenAI({ temperature: 0, modelName: "gpt-4" });

const chain = GraphCypherQAChain.fromLLM({
  llm: model,
  graph: graph,
  returnDirect: true, // Return exact graph result or let LLM summarize
});

// 4. Ask a Question
// The LLM will generate a Cypher query automatically!
const response = await chain.run(
  "How many employees work in the 'Engineering' department?"
);

console.log(response);`}
            </pre>
        </div>
      </section>

      {/* Spring Boot RAG Section */}
      <section id="spring-boot-rag" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Enterprise RAG with Spring Boot
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          For Java developers, <strong>Spring AI</strong> simplifies connecting to Vector Databases (like PgVector or Pinecone) and Graph Databases (Neo4j).
        </p>

        <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-gray-400 text-sm">Java (Spring Boot)</span>
            </div>
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
{`@Service
public class AdvancedRagService {

    private final VectorStore vectorStore;
    private final ChatClient chatClient;

    public AdvancedRagService(VectorStore vectorStore, ChatClient chatClient) {
        this.vectorStore = vectorStore;
        this.chatClient = chatClient;
    }

    public String ask(String query) {
        // 1. Semantic Search
        List<Document> similarDocs = vectorStore.similaritySearch(
            SearchRequest.query(query).withTopK(5)
        );

        // 2. Build Context
        String context = similarDocs.stream()
            .map(Document::getContent)
            .collect(Collectors.joining("\\n"));

        // 3. Prompt Engineering
        String systemPrompt = """
            You are a helpful assistant. Use the following context to answer the user's question.
            If the answer isn't in the context, say "I don't know".

            Context:
            {context}
            """;

        // 4. Generate Answer
        return chatClient.call(
            new Prompt(
                new SystemMessage(systemPrompt.replace("{context}", context)),
                new UserMessage(query)
            )
        ).getResult().getOutput().getContent();
    }
}`}
            </pre>
        </div>
      </section>

      {/* Future Section */}
      <section id="future" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          The Future of Information Retrieval
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          RAG is evolving from a static search mechanism to a dynamic research process. Future systems won't just retrieve documents; they will actively browse, verify, and cross-reference information like a human researcher.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            By combining the structure of Knowledge Graphs with the flexibility of Vector Search, we are building AI systems that don't just "know" facts, but understand how the world fits together.
        </p>
      </section>

    </article>
  );
}
