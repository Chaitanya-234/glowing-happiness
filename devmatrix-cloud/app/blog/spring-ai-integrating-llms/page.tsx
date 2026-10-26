'use client';
import { useTheme } from '@/components/providers/ThemeProvider';
import JsonLdArticle from '@/components/JsonLdArticle';

export default function SpringAIBlog() {
  const { currentTheme: theme } = useTheme();
  return (
   <article className="max-w-4xl mx-auto px-4 pt-24 pb-8 sm:px-6 lg:px-8">
      <JsonLdArticle
        headline="Spring AI: Integrating LLMs into Java Applications"
        description="A comprehensive guide to building AI-powered Java applications using the new Spring AI project. Learn how to integrate OpenAI, Azure OpenAI, and other LLMs with standard Spring Boot patterns."
        datePublished="2025-12-08"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/spring-ai-integrating-llms"
      />
      {/* Hero Section */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          Spring AI: Integrating LLMs into Java Applications
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <time dateTime="2025-12-08">December 8, 2025</time>
          <span>•</span>
          <span>20 min read</span>
          <span>•</span>
          <span>Spring Boot, AI, LLM</span>
        </div>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          The Java ecosystem has officially entered the AI era with the release of the Spring AI project.
          Gone are the days of hacking together HTTP clients to talk to OpenAI or LangChain wrappers.
          Spring AI brings the familiar dependency injection, configuration, and abstraction patterns of Spring
          to the world of Large Language Models.
        </p>
      </header>

      {/* Quick Navigation */}
      <nav className="bg-blue-50 dark:bg-gray-800 rounded-lg p-6 mb-12">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Jump to Section</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-blue-600 dark:text-blue-400">
          <li><a href="#introduction" className="hover:underline">→ Introduction to Spring AI</a></li>
          <li><a href="#setup" className="hover:underline">→ Project Setup & Dependencies</a></li>
          <li><a href="#chat-client" className="hover:underline">→ Implementing Chat Client</a></li>
          <li><a href="#rag" className="hover:underline">→ RAG Implementation</a></li>
          <li><a href="#functions" className="hover:underline">→ Function Calling</a></li>
          <li><a href="#security" className="hover:underline">→ Security Considerations</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">

        {/* Introduction */}
        <section id="introduction" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">What is Spring AI?</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Spring AI is an application framework for AI engineering. Its goal is to apply Spring ecosystem design
            principles, such as portability and modular design, to the AI domain and promote using POJOs as the
            building blocks of an AI application across the AI providers.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Key features include:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            <li><strong>Portable API:</strong> Support for chat, text-to-image, and embedding models across providers (OpenAI, Microsoft, Amazon, Google, Huggingface).</li>
            <li><strong>Prompt Templates:</strong> Powerful template engine for managing prompts.</li>
            <li><strong>Output Parsers:</strong> Map AI responses to POJOs automatically.</li>
            <li><strong>RAG Support:</strong> Built-in document loaders, splitters, and vector store integrations.</li>
            <li><strong>Function Calling:</strong> Delegate tool execution to Spring beans.</li>
          </ul>
        </section>

        {/* Setup */}
        <section id="setup" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Getting Started</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            To start using Spring AI, you need to add the Spring AI milestone repository and the OpenAI starter (or any other provider you prefer).
          </p>

          <div className="bg-gray-900 text-gray-100 rounded-lg p-6 mb-6 overflow-x-auto">
            <pre className="text-sm"><code>{`<!-- pom.xml -->
<repositories>
    <repository>
        <id>spring-milestones</id>
        <name>Spring Milestones</name>
        <url>https://repo.spring.io/milestone</url>
        <snapshots>
            <enabled>false</enabled>
        </snapshots>
    </repository>
</repositories>

<dependencies>
    <dependency>
        <groupId>org.springframework.ai</groupId>
        <artifactId>spring-ai-openai-spring-boot-starter</artifactId>
        <version>1.0.0-SNAPSHOT</version>
    </dependency>
</dependencies>`}</code></pre>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Configure your API key in `application.properties`:
          </p>
           <div className="bg-gray-900 text-gray-100 rounded-lg p-6 mb-6 overflow-x-auto">
            <pre className="text-sm"><code>{`spring.ai.openai.api-key=\${OPENAI_API_KEY}
spring.ai.openai.chat.options.model=gpt-4-turbo`}</code></pre>
          </div>
        </section>

        {/* Chat Client */}
        <section id="chat-client" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">The ChatClient Interface</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            The `ChatClient` is the core interface. It abstracts the interaction with the LLM. Here is how you can inject and use it in a controller.
          </p>

           <div className="bg-gray-900 text-gray-100 rounded-lg p-6 mb-6 overflow-x-auto">
            <pre className="text-sm"><code>{`@RestController
@RequestMapping("/ai")
public class AssistantController {

    private final ChatClient chatClient;

    public AssistantController(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    @GetMapping("/chat")
    public String chat(@RequestParam String message) {
        return chatClient.prompt()
                .user(message)
                .call()
                .content();
    }

    @GetMapping("/generate-json")
    public MovieRecommendation recommendMovie(@RequestParam String genre) {
         return chatClient.prompt()
                .user(u -> u.text("Recommend a movie in the {genre} genre").param("genre", genre))
                .call()
                .entity(MovieRecommendation.class);
    }
}

record MovieRecommendation(String title, String year, String summary) {}`}</code></pre>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Notice how we can ask for a POJO response directly using `.entity()`. Spring AI handles the prompt engineering (requesting JSON) and the deserialization for us.
          </p>
        </section>

        {/* RAG */}
        <section id="rag" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Implementing Retrieval Augmented Generation (RAG)</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                RAG allows you to ground your AI responses in your own data. Spring AI provides a consistent API for Vector Stores.
            </p>
             <div className="bg-gray-900 text-gray-100 rounded-lg p-6 mb-6 overflow-x-auto">
            <pre className="text-sm"><code>{`@Service
public class DocumentService {

    private final VectorStore vectorStore;

    public DocumentService(VectorStore vectorStore) {
        this.vectorStore = vectorStore;
    }

    public void ingestDocs() {
        // Load documents
        List<Document> documents = new TextReader(new ClassPathResource("policy.txt")).get();

        // Split into chunks
        TokenTextSplitter splitter = new TokenTextSplitter();
        List<Document> chunks = splitter.apply(documents);

        // Save to Vector DB (e.g., PGVector)
        vectorStore.add(chunks);
    }

    public String chatWithDocs(String query) {
        // Retrieve similar documents
        List<Document> similarDocs = vectorStore.similaritySearch(
            SearchRequest.query(query).withTopK(3)
        );

        // Construct prompt with context
        String context = similarDocs.stream()
            .map(Document::getContent)
            .collect(Collectors.joining("\\n"));

        // Call ChatClient (implementation omitted for brevity)
        return callChatModel(query, context);
    }
}`}</code></pre>
            </div>
        </section>


        {/* Security Section */}
        <section id="security" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Security Considerations</h2>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Integrating LLMs into enterprise Java applications introduces new attack vectors.
            The nondeterministic nature of AI responses combined with the ability to execute actions via function calling requires a defense-in-depth approach.
          </p>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 text-yellow-800 dark:text-yellow-200">
              Spring AI Security Checklist
            </h3>
            <ul className="space-y-2 text-yellow-900 dark:text-yellow-100">
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span><strong>Prompt Injection Defense:</strong> Never trust user input directly in prompts. Use delimiters and system instructions to separate instructions from data.</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span><strong>Output Sanitization:</strong> If the AI generates HTML or SQL, validate and sanitize it before rendering or executing.</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span><strong>PII Redaction:</strong> Use Spring AOP to intercept requests and redact sensitive info (SSN, emails) before sending to external LLM providers.</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span><strong>Function Calling Controls:</strong> Apply strict RBAC (Role-Based Access Control) to methods exposed as AI functions. An AI agent should not have admin privileges.</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span><strong>Rate Limiting:</strong> Implement Resilience4j or Spring Cloud Gateway rate limiters to prevent DoS attacks that target expensive AI endpoints.</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span><strong>Audit Logging:</strong> Log all prompts and completions (redacted) for compliance and forensic analysis.</span>
              </li>
            </ul>
          </div>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            <strong>Example: PII Redaction Interceptor</strong>
            <br/>
            You can create a custom interceptor to scan for sensitive data patterns.
          </p>

          <div className="bg-gray-900 text-gray-100 rounded-lg p-6 mb-6 overflow-x-auto">
            <pre className="text-sm"><code>{`@Component
public class PiiRedactionInterceptor implements ClientHttpRequestInterceptor {

    @Override
    public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) throws IOException {
        String content = new String(body, StandardCharsets.UTF_8);
        if (containsPii(content)) {
            throw new SecurityException("PII detected in outbound AI request");
        }
        return execution.execute(request, body);
    }

    private boolean containsPii(String content) {
        // Regex checks for credit cards, SSNs, etc.
        return false;
    }
}`}</code></pre>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Conclusion</h2>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Spring AI bridges the gap between traditional enterprise Java development and the cutting-edge world of Generative AI.
            By providing a consistent abstraction layer, it allows developers to swap models, implement RAG, and build agents without rewriting their entire codebase.
          </p>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            As you adopt these tools, remember that AI is not just another API—it requires careful thought regarding ethics, security, and user experience.
            Start small, secure your inputs, and leverage the power of the Spring ecosystem to build robust, scalable AI applications.
          </p>
        </section>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-800 dark:to-blue-800 rounded-lg p-8 text-white mb-12">
          <h3 className="text-2xl font-bold mb-4">Ready to Build AI Apps?</h3>
          <p className="mb-6 text-lg">
            Check out our other guides on building RAG systems and securing AI agents.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="/blog" className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              View All Guides
            </a>
          </div>
        </div>

        {/* Author Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Written by the DevMetrix Team • Published December 8, 2025
          </p>
        </div>

      </div>
    </article>
  );
}
