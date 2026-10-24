"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Bot,
  BrainCircuit,
  Database,
  Code2,
  Image as ImageIcon,
  Wrench,
  ChevronRight,
  Copy,
  Check,
  Terminal,
  BookOpen,
  Sparkles,
  Server,
  ShieldCheck,
  Activity
} from "lucide-react";

export default function SpringAIExamples() {
  const [activeSection, setActiveSection] = useState("intro");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const sections = [
    { id: "intro", title: "Introduction to Spring AI", icon: <BrainCircuit className="w-5 h-5" /> },
    { id: "chatbot", title: "Context-Aware Chatbot", icon: <Bot className="w-5 h-5" /> },
    { id: "rag", title: "RAG with Vector DB", icon: <Database className="w-5 h-5" /> },
    { id: "output", title: "Structured Output Mapping", icon: <Code2 className="w-5 h-5" /> },
    { id: "vision", title: "Multimodal Vision AI", icon: <ImageIcon className="w-5 h-5" /> },
    { id: "functions", title: "Function Calling", icon: <Wrench className="w-5 h-5" /> },
    { id: "production", title: "Production Readiness", icon: <Server className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-black text-purple-50 font-sans selection:bg-purple-500/30 selection:text-purple-100">

      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[100px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto pt-24 pb-20 px-4 sm:px-6 lg:px-8">

        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-sm text-purple-400 mb-8 font-medium">
          <Link href="/examples" className="hover:text-purple-300 transition-colors">Examples</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-purple-200">Spring AI</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-300 to-purple-300">
                Spring AI Masterclass
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-200/70 max-w-4xl mx-auto leading-relaxed">
              Unlock the power of Generative AI in Java. A comprehensive guide with 5 production-grade examples ranging from Chatbots to RAG and Function Calling.
            </p>
          </motion.div>

          {/* Stats / Tech Stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            {["Spring Boot 3.2+", "Java 17+", "OpenAI / Ollama", "PGVector", "Docker"].map((tech) => (
              <span key={tech} className="px-4 py-2 rounded-full bg-purple-900/30 border border-purple-500/20 text-purple-300 text-sm font-semibold shadow-[0_0_15px_rgba(168,85,247,0.1)] backdrop-blur-sm">
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="hidden lg:block space-y-2 sticky top-24 h-fit">
            <h3 className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-4 px-3">Table of Contents</h3>
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id);
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left ${
                  activeSection === section.id
                    ? "bg-purple-600/20 text-purple-100 border border-purple-500/30 shadow-lg shadow-purple-900/20"
                    : "text-purple-400 hover:bg-purple-900/10 hover:text-purple-200"
                }`}
              >
                <div className={`${activeSection === section.id ? "text-purple-300" : "opacity-50"}`}>
                  {section.icon}
                </div>
                <span className="font-medium text-sm">{section.title}</span>
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-24">

            {/* Section 1: Introduction */}
            <section id="intro" className="scroll-mt-32">
              <ContentCard title="The Rise of Java in the AI Era" icon={<BrainCircuit />}>
                <div className="prose prose-invert prose-purple max-w-none">
                  <p className="text-lg text-purple-100/90 leading-relaxed mb-6">
                    For over a decade, the field of Artificial Intelligence and Machine Learning has been dominated by Python. Its rich ecosystem of libraries like NumPy, Pandas, PyTorch, and TensorFlow made it the default choice for data scientists and researchers. However, we are currently witnessing a seismic shift in the industry: the move from <strong>Model Training</strong> to <strong>Generative AI Application Engineering</strong>.
                  </p>
                  <p className="text-purple-200/80 mb-6">
                    In this new era, the focus is less on designing neural network architectures and more on integrating pre-trained Large Language Models (LLMs) into existing enterprise systems. This is where Java, and specifically the <strong>Spring ecosystem</strong>, shines. Enterprise applications require stability, scalability, security, and type safety—attributes that Java has delivered for 25 years.
                  </p>
                  <p className="text-purple-200/80 mb-6">
                    <strong>Spring AI</strong> is an application framework for AI engineering. Its primary goal is to apply Spring ecosystem design principles—such as portability and modular design—to the AI domain. It offers a unified interface for interacting with various AI providers, including OpenAI, Azure OpenAI, Amazon Bedrock, Ollama, Hugging Face, and Mistral AI.
                  </p>

                  <div className="bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-xl my-8">
                    <h4 className="text-xl font-bold text-blue-300 mb-2">Why Spring AI Matters</h4>
                    <p className="text-purple-200/80 mb-4">
                      The core philosophy of Spring has always been "Write Once, Run Anywhere" (conceptually). Spring AI brings this to GenAI. Instead of coupling your application tightly to the OpenAI API, you program against the `ChatClient` interface.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-purple-200/80">
                      <li><strong>Portability:</strong> Switch between GPT-4, Claude 3, and Llama 3 with a simple configuration change in `application.yml`.</li>
                      <li><strong>POJO Mapping:</strong> Automatically map unstructured AI text responses to strongly-typed Java Records and Beans.</li>
                      <li><strong>Vector Store Abstraction:</strong> A unified API for vector databases like Redis, Pinecone, PGVector, Neo4j, and Chroma.</li>
                      <li><strong>Function Calling:</strong> Seamlessly expose Java methods as "tools" that the LLM can execute autonomously.</li>
                    </ul>
                  </div>

                  <h3 className="text-2xl font-bold text-purple-100 mt-8 mb-4">Setting Up Your Project</h3>
                  <p className="text-purple-200/80 mb-4">
                    Before diving into the examples, you need to set up a Spring Boot project. We recommend using Spring Boot 3.2.x or later and Java 17+. You should add the Spring AI Bill of Materials (BOM) to your `pom.xml` to manage dependencies effectively.
                  </p>

                  <CodeBlock
                    language="xml"
                    title="pom.xml"
                    code={`<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.ai</groupId>
            <artifactId>spring-ai-bom</artifactId>
            <version>1.0.0-SNAPSHOT</version> <!-- Check for latest version -->
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <!-- Starter for OpenAI -->
    <dependency>
        <groupId>org.springframework.ai</groupId>
        <artifactId>spring-ai-openai-spring-boot-starter</artifactId>
    </dependency>
    <!-- For Vector Stores (Example) -->
    <dependency>
        <groupId>org.springframework.ai</groupId>
        <artifactId>spring-ai-pgvector-store-spring-boot-starter</artifactId>
    </dependency>
</dependencies>`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="pom-xml"
                  />
                  <p className="text-purple-200/80 mt-4">
                    This setup ensures that all Spring AI modules (Core, OpenAI, PGVector, etc.) are version-compatible.
                  </p>
                </div>
              </ContentCard>
            </section>

            {/* Section 2: Chatbot */}
            <section id="chatbot" className="scroll-mt-32">
              <ContentCard title="Example 1: Context-Aware Chatbot" icon={<Bot />}>
                <div className="prose prose-invert prose-purple max-w-none">
                  <p className="text-purple-200/80 mb-6">
                    The most fundamental use case for Large Language Models is the chatbot. However, building a production-grade chatbot is significantly more complex than a simple API call. It involves <strong>Prompt Engineering</strong>, managing <strong>Conversation History</strong>, and handling <strong>Latency</strong>.
                  </p>

                  <h3 className="text-xl font-bold text-purple-100 mb-4">Prompt Templates and Variables</h3>
                  <p className="text-purple-200/80 mb-4">
                    Hardcoding strings in Java is a bad practice, and the same applies to prompts. Spring AI introduces `PromptTemplate`, which works similarly to `JdbcTemplate` or standard string interpolation, but is designed for prompts. It allows you to separate the <em>structure</em> of your prompt from the <em>data</em>.
                  </p>

                  <h3 className="text-xl font-bold text-purple-100 mb-4">Configuration</h3>
                  <p className="text-purple-200/80 mb-4">
                    First, configure your API key in `application.yml`. Never hardcode keys in your source code!
                  </p>

                  <CodeBlock
                    language="yaml"
                    title="application.yml"
                    code={`spring:
  ai:
    openai:
      api-key: \${OPENAI_API_KEY}
      chat:
        options:
          model: gpt-4o
          temperature: 0.7 # 0.0 for deterministic, 1.0 for creative`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="app-yaml-chat"
                  />

                  <h3 className="text-xl font-bold text-purple-100 mt-8 mb-4">The Implementation</h3>
                  <p className="text-purple-200/80 mb-4">
                    We will use the `ChatClient` builder. This fluent API allows you to set default system messages (personas) and default advisors (middleware for RAG or history).
                  </p>

                  <CodeBlock
                    language="java"
                    title="AIService.java"
                    code={`@Service
public class AIService {

    private final ChatClient chatClient;

    public AIService(ChatClient.Builder builder) {
        // Initialize with a default system persona
        // This sets the "System Message" which guides the AI's behavior
        this.chatClient = builder
                .defaultSystem("You are a helpful and witty coding assistant named 'Jules'. You prefer clean code.")
                .build();
    }

    public String generateResponse(String concept, String skillLevel) {
        // Using PromptTemplate for dynamic variable substitution
        String templateString = """
                Explain the concept of {concept} to a developer with {skillLevel} experience.
                Include a code example in Java.
                """;

        PromptTemplate promptTemplate = new PromptTemplate(templateString);
        Prompt prompt = promptTemplate.create(Map.of(
                "concept", concept,
                "skillLevel", skillLevel
        ));

        // The call() method blocks until the full response is received.
        return chatClient.prompt(prompt)
                .call()
                .content();
    }
}`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="chat-service"
                  />

                  <div className="mt-8 p-6 bg-purple-900/10 rounded-xl border border-purple-500/20">
                    <h4 className="flex items-center gap-2 text-lg font-bold text-purple-300 mb-2">
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                      Pro Tip: Streaming Responses
                    </h4>
                    <p className="text-sm text-purple-200/70 mb-2">
                      LLMs generate text token by token. Waiting for a full 500-word essay to generate might take 10 seconds, leading to a poor user experience.
                    </p>
                    <p className="text-sm text-purple-200/70">
                      Use `.stream()` instead of `.call()`. This returns a `Flux&lt;ChatResponse&gt;` (Reactive Streams). You can then pipe this directly to a Server-Sent Events (SSE) endpoint in your controller, allowing the user to see the text typing out in real-time.
                    </p>
                  </div>
                </div>
              </ContentCard>
            </section>

            {/* Section 3: RAG */}
            <section id="rag" className="scroll-mt-32">
              <ContentCard title="Example 2: RAG with PGVector" icon={<Database />}>
                <div className="prose prose-invert prose-purple max-w-none">
                  <p className="text-purple-200/80 mb-6">
                    One of the biggest limitations of LLMs is that they are trained on public data up to a specific cut-off date. They do not know about your private company data, your user manuals, or your recent database entries. If you ask GPT-4 about your internal HR policy, it will hallucinate.
                  </p>
                  <p className="text-purple-200/80 mb-6">
                    <strong>Retrieval Augmented Generation (RAG)</strong> is the standard architectural pattern to solve this. It involves retrieving relevant documents from your own data source and injecting them into the prompt context before sending it to the LLM. To do this efficiently at scale, we use <strong>Vector Databases</strong>.
                  </p>

                  <h3 className="text-xl font-bold text-purple-100 mb-4">The Math of Embeddings</h3>
                  <p className="text-purple-200/80 mb-6">
                    An "Embedding" is a list of floating-point numbers (a vector) that represents the semantic meaning of a piece of text. For example, "King" and "Queen" will have vectors that are numerically close to each other in high-dimensional space. "King" and "Apple" will be far apart. By converting your documents into vectors, you can perform <strong>Cosine Similarity</strong> searches to find text that is <em>conceptually</em> similar to a user's query, not just keyword matches.
                  </p>

                  <h3 className="text-xl font-bold text-purple-100 mb-4">Architecture Flow</h3>
                  <ol className="list-decimal list-inside space-y-2 text-purple-200/80 mb-6 marker:text-purple-400">
                    <li><strong>Ingestion (ETL):</strong> Load documents (PDF, JSON, Text) using Spring AI's `DocumentReader`.</li>
                    <li><strong>Splitting:</strong> LLMs have a context window limit (e.g., 128k tokens). You must break large PDFs into smaller chunks using `TokenTextSplitter`.</li>
                    <li><strong>Embedding:</strong> Convert chunks to vectors using an Embedding Model (e.g., `text-embedding-3-small` or `mxbai-embed-large`).</li>
                    <li><strong>Storage:</strong> Save the vector + text content in a Vector Store like PGVector.</li>
                    <li><strong>Retrieval:</strong> On query, finding the top K most similar vectors.</li>
                    <li><strong>Generation:</strong> Pass the retrieved text + user query to the LLM.</li>
                  </ol>

                  <CodeBlock
                    language="java"
                    title="RAGService.java"
                    code={`@Service
public class RAGService {

    private final VectorStore vectorStore;
    private final ChatClient chatClient;

    public RAGService(VectorStore vectorStore, ChatClient.Builder builder) {
        this.vectorStore = vectorStore;
        this.chatClient = builder.build();
    }

    // 1. Ingestion Process (Run via a job or admin API)
    public void ingestDocuments(Resource pdfResource) {
        // Tika is a library that can read PDF, Word, HTML, etc.
        TikaDocumentReader reader = new TikaDocumentReader(pdfResource);
        List<Document> documents = reader.get();

        // Split into chunks. Overlap ensures context isn't lost at boundaries.
        TokenTextSplitter splitter = new TokenTextSplitter(1000, 400, 10, 5000, true);
        List<Document> chunks = splitter.apply(documents);

        // This call automatically computes embeddings and saves to DB
        vectorStore.add(chunks);
    }

    // 2. Retrieval & Generation
    public String askWithContext(String query) {
        // Retrieve top 3 most similar documents
        // 'SearchRequest' allows filtering by metadata (e.g., only docs from 2024)
        List<Document> similarDocs = vectorStore.similaritySearch(
                SearchRequest.query(query).withTopK(3)
        );

        // Combine the content of the found documents
        String context = similarDocs.stream()
                .map(Document::getContent)
                .collect(Collectors.joining("\\n"));

        // Prompt Engineering: Instruct the AI to ONLY use the provided context
        String systemPrompt = """
                You are a helpful documentation assistant.
                You must answer the user's question strictly using the provided context.
                If the answer is not in the context, simply say 'I don't know'.
                Do not make up facts.

                CONTEXT:
                {context}
                """;

        return chatClient.prompt()
                .system(s -> s.text(systemPrompt).param("context", context))
                .user(query)
                .call()
                .content();
    }
}`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="rag-service"
                  />

                  <p className="text-purple-200/80 mt-6">
                    This example uses `spring-ai-pgvector-store-spring-boot-starter`. You need a PostgreSQL instance with the `vector` extension installed. Spring Boot will automatically configure the `VectorStore` bean if the properties are present. This abstraction is powerful: if you decide to switch to Redis or Neo4j later, you only change your dependencies and config, not your Java code.
                  </p>
                </div>
              </ContentCard>
            </section>

            {/* Section 4: Structured Output */}
            <section id="output" className="scroll-mt-32">
              <ContentCard title="Example 3: Structured Output Mapping" icon={<Code2 />}>
                <div className="prose prose-invert prose-purple max-w-none">
                  <p className="text-purple-200/80 mb-6">
                    One of the most frustrating aspects of working with LLMs is that they return unstructured text. If you want to use the output in your code (e.g., to save to a database or display in a UI), you need structured data like JSON.
                  </p>
                  <p className="text-purple-200/80 mb-6">
                    Historically, developers would prompt the LLM: <em>"Please return valid JSON"</em>. But LLMs often fail—they might add markdown code blocks (```json ... ```), trailing commas, or conversational text ("Here is your JSON:"). Spring AI solves this with the `BeanOutputParser`.
                  </p>

                  <h3 className="text-xl font-bold text-purple-100 mb-4">Type-Safe AI with Java Records</h3>
                  <p className="text-purple-200/80 mb-4">
                    The `BeanOutputParser` does two things:
                    1. It generates a <strong>schema</strong> based on your Java Record and injects it into the prompt.
                    2. It validates the output and deserializes it into your Java object.
                  </p>

                  <CodeBlock
                    language="java"
                    title="MovieRecommender.java"
                    code={`// Define your type-safe data structure
public record MovieRecommendation(
    String title,
    int year,
    String reason,
    List<String> cast
) {}

@RestController
@RequestMapping("/movies")
public class MovieController {

    private final ChatClient chatClient;

    public MovieController(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    @GetMapping("/recommend")
    public MovieRecommendation getRecommendation(@RequestParam String genre) {
        // Create the parser for our specific record class
        var outputParser = new BeanOutputParser<>(MovieRecommendation.class);

        String userPrompt = """
                Recommend a classic {genre} movie from the 90s.
                {format_instructions}
                """;

        PromptTemplate template = new PromptTemplate(userPrompt);
        Prompt prompt = template.create(Map.of(
                "genre", genre,
                // Automatically injects the JSON schema instructions
                "format_instructions", outputParser.getFormat()
        ));

        ChatResponse response = chatClient.prompt(prompt).call();

        // Parse result directly to Java object
        return outputParser.parse(response.getResult().getOutput().getContent());
    }
}`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="structured-output"
                  />
                  <p className="text-purple-200/80 mt-4">
                    Behind the scenes, `outputParser.getFormat()` creates a prompt segment like: <em>"Your response should be in JSON format conforming to the following schema: ..."</em>. If the LLM returns broken JSON, the parser can even automatically retry with a correction prompt (if configured with a RetryTemplate), asking the LLM to fix its own syntax error.
                  </p>
                </div>
              </ContentCard>
            </section>

            {/* Section 5: Vision */}
            <section id="vision" className="scroll-mt-32">
              <ContentCard title="Example 4: Multimodal Vision AI" icon={<ImageIcon />}>
                <div className="prose prose-invert prose-purple max-w-none">
                  <p className="text-purple-200/80 mb-6">
                    The latest generation of models (GPT-4o, Gemini 1.5 Pro, Claude 3.5 Sonnet) are <strong>Multimodal</strong>. They can understand text, images, audio, and video. Spring AI supports sending non-text data to these models.
                  </p>
                  <p className="text-purple-200/80 mb-6">
                    This capability unlocks powerful use cases:
                    <br/>- <strong>Expense Management:</strong> Upload a photo of a receipt, and extract the vendor, date, and total amount into a Java Record.
                    <br/>- <strong>Accessibility:</strong> Generate alt-text descriptions for images uploaded by users.
                    <br/>- <strong>Medical Analysis:</strong> Analyze X-rays or skin conditions (with appropriate disclaimers).
                  </p>

                  <CodeBlock
                    language="java"
                    title="VisionService.java"
                    code={`@Service
public class VisionService {

    private final ChatClient chatClient;

    public VisionService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public String analyzeImage(MultipartFile file) throws IOException {
        // Convert the uploaded file to a Spring Resource
        Resource imageResource = new ByteArrayResource(file.getBytes());

        // Define the user message with both text and media
        UserMessage userMessage = new UserMessage(
                "Analyze this image and list all food ingredients visible along with their estimated calorie count.",
                List.of(new Media(MimeTypeUtils.IMAGE_JPEG, imageResource))
        );

        // Send the request
        ChatResponse response = chatClient.prompt(new Prompt(userMessage)).call();

        return response.getResult().getOutput().getContent();
    }
}`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="vision-service"
                  />
                  <p className="text-purple-200/80 mt-4">
                    Note on costs: Sending images consumes significantly more tokens than text. Most APIs allow you to specify the "detail" level (Low/High). Spring AI allows passing these options via `OpenAiChatOptions` if needed.
                  </p>
                </div>
              </ContentCard>
            </section>

            {/* Section 6: Function Calling */}
            <section id="functions" className="scroll-mt-32">
              <ContentCard title="Example 5: Function Calling (Tools)" icon={<Wrench />}>
                <div className="prose prose-invert prose-purple max-w-none">
                  <p className="text-purple-200/80 mb-6">
                    Perhaps the most powerful feature of modern LLMs is <strong>Tool Use</strong> (or Function Calling). By default, an LLM is a brain in a jar—it cannot access the internet, check the time, or query a database. Function calling bridges this gap.
                  </p>
                  <p className="text-purple-200/80 mb-6">
                    You can describe a Java method to the LLM (name, description, parameter schema). When the LLM realizes it needs that function to answer a user's question, it pauses generation and requests that the function be executed. Spring AI handles this loop automatically: it executes your Java method and feeds the result back to the LLM.
                  </p>

                  <h3 className="text-xl font-bold text-purple-100 mb-4">Step 1: Define the Function</h3>
                  <p className="text-purple-200/80 mb-4">
                    Functions are defined as standard Java `java.util.function.Function` beans. The `@Description` annotation is crucial—it's what the LLM reads to decide <em>when</em> to use the tool.
                  </p>

                  <CodeBlock
                    language="java"
                    title="ToolsConfig.java"
                    code={`@Configuration
public class ToolsConfig {

    // Define Input and Output records (Schemas)
    public record WeatherRequest(String location, String unit) {}
    public record WeatherResponse(String temp, String condition) {}

    @Bean
    @Description("Get the current weather for a specific location. Unit can be C or F.")
    public Function<WeatherRequest, WeatherResponse> currentWeather() {
        return request -> {
            // Logic to call external Weather API (e.g., OpenWeatherMap)
            System.out.println("Calling weather API for " + request.location());

            // In a real app, use RestClient to call an external API here
            return new WeatherResponse("25", "Sunny");
        };
    }

    @Bean
    @Description("Book a flight for the user.")
    public Function<FlightRequest, FlightResponse> bookFlight() {
        return request -> {
           // Execute transactional logic
           return new FlightResponse("CONFIRMED", "Ticket #123");
        };
    }
}`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="tools-config"
                  />

                  <h3 className="text-xl font-bold text-purple-100 mt-8 mb-4">Step 2: Enable the Function in ChatClient</h3>

                  <CodeBlock
                    language="java"
                    title="AssistantService.java"
                    code={`@Service
public class AssistantService {

    private final ChatClient chatClient;

    public AssistantService(ChatClient.Builder builder) {
        this.chatClient = builder
                // Register the tool by its bean name
                // You can register multiple tools here
                .defaultFunctions("currentWeather", "bookFlight")
                .build();
    }

    public String chat(String userMessage) {
        // Scenario: User asks "What's the weather in Tokyo?"
        // 1. LLM analyzes prompt. Sees it matches 'currentWeather' description.
        // 2. LLM returns a structured request to call 'currentWeather' with location="Tokyo".
        // 3. Spring AI intercepts this, calls your Java bean, and gets the result.
        // 4. Spring AI sends the result (25 degrees) back to the LLM.
        // 5. LLM generates final response: "It is currently 25 degrees and Sunny in Tokyo."
        return chatClient.prompt(userMessage).call().content();
    }
}`}
                    onCopy={copyToClipboard}
                    copiedId={copiedCode}
                    id="assistant-service"
                  />

                  <div className="mt-8 p-6 bg-purple-900/10 rounded-xl border border-purple-500/20">
                    <h4 className="flex items-center gap-2 text-lg font-bold text-purple-300 mb-2">
                      <ShieldCheck className="w-5 h-5 text-green-400" />
                      Security Warning
                    </h4>
                    <p className="text-sm text-purple-200/70">
                      Be extremely careful when exposing functions that modify state (like `deleteUser` or `transferMoney`). The LLM is probabilistic and might call functions unexpectedly. Always implement permission checks inside your functions and consider a "human-in-the-loop" approval step for sensitive actions.
                    </p>
                  </div>
                </div>
              </ContentCard>
            </section>

             {/* Section 7: Production */}
             <section id="production" className="scroll-mt-32">
              <ContentCard title="Production Readiness" icon={<Server />}>
                <div className="prose prose-invert prose-purple max-w-none">
                  <p className="text-purple-200/80 mb-6">
                    Moving from a prototype to production requires more than just working code. You need observability, testing, and performance optimization.
                  </p>

                  <h3 className="text-xl font-bold text-purple-100 mb-4">Evaluation and Testing</h3>
                  <p className="text-purple-200/80 mb-4">
                    How do you test a non-deterministic system? Spring AI provides an <strong>Evaluation Framework</strong> that allows you to run "evals" against your prompts. You can check for relevance, faithfulness (did it hallucinate?), and toxicity.
                  </p>

                  <h3 className="text-xl font-bold text-purple-100 mb-4">Observability</h3>
                  <p className="text-purple-200/80 mb-4">
                    Spring AI instruments your application with Micrometer traces and metrics automatically.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-purple-200/80 mb-6">
                    <li><strong>Tracing:</strong> Export traces to Zipkin or Grafana Tempo to visualize the entire chain (Ingress -&gt; Controller -&gt; ChatClient -&gt; OpenAI).</li>
                    <li><strong>Metrics:</strong> Track token usage (cost), latency, and error rates using Prometheus and Grafana.</li>
                  </ul>

                  <h3 className="text-xl font-bold text-purple-100 mb-4">GraalVM Native Images</h3>
                  <p className="text-purple-200/80 mb-4">
                    AI applications often run as serverless functions (Lambda, Knative) to save costs. Java's cold start time can be an issue here. Spring AI fully supports <strong>GraalVM Native Images</strong>, allowing your application to start in milliseconds and consume significantly less memory.
                  </p>
                </div>
              </ContentCard>
            </section>

            {/* Conclusion */}
            <section className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-purple-500/30 rounded-2xl p-10 text-center">
              <h2 className="text-3xl font-bold text-purple-100 mb-6">Ready to Build?</h2>
              <p className="text-lg text-purple-200/80 mb-8 max-w-2xl mx-auto">
                Spring AI transforms Java from a backend workhorse into a powerhouse for Generative AI engineering. Start small with the Chat Client, then scale up to RAG and Autonomous Agents using Function Calling.
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  href="https://docs.spring.io/spring-ai/reference/"
                  target="_blank"
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-purple-900/50 flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  Read Full Docs
                </Link>
                <Link
                  href="https://start.spring.io"
                  target="_blank"
                  className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-purple-200 font-bold rounded-lg transition-all border border-purple-500/30 flex items-center gap-2"
                >
                  <Terminal className="w-4 h-4" />
                  Spring Initializr
                </Link>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Components

function ContentCard({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <div
      className="bg-gray-900/40 backdrop-blur-md border border-purple-500/20 rounded-2xl p-8 overflow-hidden relative group"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/5 rounded-full blur-[80px] group-hover:bg-purple-600/10 transition-colors duration-700" />

      <div className="flex items-center gap-4 mb-8 border-b border-purple-500/10 pb-6 relative z-10">
        <div className="p-3 bg-purple-900/30 rounded-lg text-purple-300 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
          {icon}
        </div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-100 to-purple-300">
          {title}
        </h2>
      </div>

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

function CodeBlock({ title, code, onCopy, copiedId, id }: {
  language: string,
  title: string,
  code: string,
  onCopy: (code: string, id: string) => void,
  copiedId: string | null,
  id: string
}) {
  return (
    <div className="my-6 rounded-xl overflow-hidden border border-purple-500/30 bg-[#0d1117] shadow-xl">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700/50 backdrop-blur">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
          </div>
          <span className="text-xs font-mono text-gray-400 ml-2">{title}</span>
        </div>
        <button
          onClick={() => onCopy(code, id)}
          className="text-xs flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/5"
        >
          {copiedId === id ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copiedId === id ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="p-4 overflow-x-auto custom-scrollbar">
        <pre className="font-mono text-sm leading-relaxed text-blue-100">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
