import JsonLdArticle from '@/components/JsonLdArticle';

export default function RagSpringBootBlog() {
  return (
   <article className="max-w-4xl mx-auto px-4 pt-24 pb-8 sm:px-6 lg:px-8">
      <JsonLdArticle
        headline="Building RAG with Spring Boot and Vector Databases"
        description="A deep dive into Retrieval-Augmented Generation (RAG) using Spring Boot, PgVector, and OpenAI. Learn how to build intelligent search and Q&A systems on your own data."
        datePublished="2025-12-09"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/building-rag-spring-boot-vector-db"
      />
      {/* Hero Section */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          Building RAG with Spring Boot and Vector Databases
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <time dateTime="2025-12-09">December 9, 2025</time>
          <span>•</span>
          <span>25 min read</span>
          <span>•</span>
          <span>Spring Boot, RAG, PgVector</span>
        </div>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          Retrieval-Augmented Generation (RAG) is the architecture of choice for bringing custom knowledge to LLMs.
          Instead of fine-tuning models, we can inject relevant context dynamically.
          In this guide, we&apos;ll build a production-ready RAG system using Spring Boot, PostgreSQL (PgVector), and Spring AI.
        </p>
      </header>

      {/* Quick Navigation */}
      <nav className="bg-blue-50 dark:bg-gray-800 rounded-lg p-6 mb-12">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Jump to Section</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-blue-600 dark:text-blue-400">
          <li><a href="#rag-concept" className="hover:underline">→ Understanding RAG</a></li>
          <li><a href="#architecture" className="hover:underline">→ System Architecture</a></li>
          <li><a href="#vector-db" className="hover:underline">→ Setting up PgVector</a></li>
          <li><a href="#ingestion" className="hover:underline">→ Document Ingestion Pipeline</a></li>
          <li><a href="#retrieval" className="hover:underline">→ The Retrieval Service</a></li>
          <li><a href="#security" className="hover:underline">→ Security & Data Privacy</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">

        {/* Concept */}
        <section id="rag-concept" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Understanding RAG</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            LLMs like GPT-4 are frozen in time. They don&apos;t know about your private company data, your latest emails, or yesterday&apos;s news.
            RAG bridges this gap by following a three-step process:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Retrieve:</strong> Search a knowledge base (Vector DB) for information relevant to the user&apos;s query.</li>
            <li><strong>Augment:</strong> Combine the user&apos;s query with the retrieved information to create a context-rich prompt.</li>
            <li><strong>Generate:</strong> Send the augmented prompt to the LLM to generate an answer.</li>
          </ol>
        </section>

        {/* Architecture */}
        <section id="architecture" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">System Architecture</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Our stack consists of:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Spring Boot 3.2+:</strong> The application framework.</li>
                <li><strong>Spring AI:</strong> Abstraction for embeddings and chat models.</li>
                <li><strong>PostgreSQL + PgVector:</strong> The vector database for storing embeddings.</li>
                <li><strong>OpenAI `text-embedding-ada-002`:</strong> For generating vector embeddings.</li>
            </ul>
        </section>

        {/* Vector DB */}
        <section id="vector-db" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Setting up PgVector</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                First, enable the `vector` extension in your PostgreSQL database.
            </p>
            <div className="bg-gray-900 text-gray-100 rounded-lg p-6 mb-6 overflow-x-auto">
            <pre className="text-sm"><code>{`CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE vector_store (
	id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
	content text,
	metadata json,
	embedding vector(1536)
);`}</code></pre>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                In `application.yml`, configure the Spring AI vector store to point to this instance.
            </p>
        </section>

        {/* Ingestion */}
        <section id="ingestion" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Document Ingestion Pipeline</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We need a service to read documents (PDFs, text files), split them into chunks, generate embeddings, and store them.
            </p>
             <div className="bg-gray-900 text-gray-100 rounded-lg p-6 mb-6 overflow-x-auto">
            <pre className="text-sm"><code>{`@Service
@RequiredArgsConstructor
public class IngestionService {

    private final VectorStore vectorStore;

    public void ingestFile(Resource file) {
        // 1. Read
        TikaDocumentReader reader = new TikaDocumentReader(file);
        List<Document> documents = reader.get();

        // 2. Split
        // 1536 tokens is a good balance for ADA-002
        TokenTextSplitter splitter = new TokenTextSplitter(1000, 400, 10, 10000, true);
        List<Document> chunks = splitter.apply(documents);

        // 3. Store (Spring AI handles embedding generation automatically here)
        vectorStore.add(chunks);
    }
}`}</code></pre>
            </div>
        </section>

        {/* Retrieval */}
        <section id="retrieval" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">The Retrieval Service</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                When a user asks a question, we search the vector store and feed the results to the Chat Client.
            </p>
            <div className="bg-gray-900 text-gray-100 rounded-lg p-6 mb-6 overflow-x-auto">
            <pre className="text-sm"><code>{`@RestController
@RequiredArgsConstructor
public class RagController {

    private final VectorStore vectorStore;
    private final ChatClient chatClient;

    @PostMapping("/ask")
    public Map<String, String> ask(@RequestBody String question) {
        // 1. Similarity Search
        List<Document> similarDocs = vectorStore.similaritySearch(
            SearchRequest.query(question).withTopK(4)
        );

        // 2. Build Context
        String context = similarDocs.stream()
            .map(Document::getContent)
            .collect(Collectors.joining("\\n\\n"));

        // 3. Prompt Template
        SystemPromptTemplate systemPrompt = new SystemPromptTemplate(
            "You are a helpful assistant. Use the following context to answer the user&apos;s question. " +
            "If the answer is not in the context, say you don&apos;t know.\\n\\n" +
            "Context:\\n{context}"
        );

        Message systemMessage = systemPrompt.createMessage(Map.of("context", context));

        // 4. Generate
        String answer = chatClient.prompt()
            .messages(systemMessage, new UserMessage(question))
            .call()
            .content();

        return Map.of("answer", answer, "source_docs", context);
    }
}`}</code></pre>
            </div>
        </section>

        {/* Security Section */}
        <section id="security" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Security & Data Privacy in RAG</h2>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            RAG systems expose your internal knowledge base to the AI. This means access control is critical.
            A common vulnerability is &quot;Context Leaking,&quot; where a user asks a question that retrieves documents they shouldn&apos;t have access to (e.g., HR salaries).
          </p>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 text-yellow-800 dark:text-yellow-200">
              RAG Security Checklist
            </h3>
            <ul className="space-y-2 text-yellow-900 dark:text-yellow-100">
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span><strong>Document-Level ACLs:</strong> Store permissions in the vector metadata. When querying, filter results based on the current user&apos;s roles.</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span><strong>Prompt Injection in RAG:</strong> Malicious documents ingested into your system can contain &quot;poisoned&quot; instructions that override the system prompt when retrieved. Sanitize input documents.</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span><strong>Data Sovereignty:</strong> Ensure your vector database and the embedding model comply with data residency laws (GDPR, CCPA).</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span><strong>Embedding Inversion:</strong> While difficult, it is theoretically possible to reconstruct text from embeddings. Treat vectors as sensitive data.</span>
              </li>
            </ul>
          </div>

           <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            <strong>Implementing Metadata Filters for ACLs:</strong>
          </p>
          <div className="bg-gray-900 text-gray-100 rounded-lg p-6 mb-6 overflow-x-auto">
            <pre className="text-sm"><code>{`// Searching with Filters
FilterExpressionBuilder b = new FilterExpressionBuilder();
Expression filter = b.eq("department", currentUser.getDepartment()).build();

List<Document> results = vectorStore.similaritySearch(
    SearchRequest.query(question)
    .withTopK(3)
    .withFilterExpression(filter)
);`}</code></pre>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            By attaching metadata like `department` or `userId` to every document during ingestion, we can enforce strict access controls at the retrieval query level, ensuring users never see context they aren&apos;t authorized to view.
          </p>
        </section>

        {/* Conclusion */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Conclusion</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            RAG is a powerful pattern that turns generic LLMs into domain experts. With Spring AI and PgVector, Java developers can build these systems using familiar tools and patterns.
            Focus on data quality and security—your RAG system is only as good (and safe) as the data you feed it.
          </p>
        </section>

        {/* Author Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Written by the DevMetrix Team • Published December 9, 2025
          </p>
        </div>

      </div>
    </article>
  );
}
