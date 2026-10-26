'use client';
import { useTheme } from '@/components/providers/ThemeProvider';
import JsonLdArticle from '@/components/JsonLdArticle';

export default function EventDrivenAIBlog() {
  const { currentTheme: theme } = useTheme();
  return (
   <article className="max-w-4xl mx-auto px-4 pt-24 pb-8 sm:px-6 lg:px-8">
      <JsonLdArticle
        headline="Event-Driven AI Architectures with Spring Cloud Stream and Kafka"
        description="Learn how to build scalable, asynchronous AI systems using Spring Cloud Stream and Apache Kafka. Handle long-running AI tasks without blocking your users."
        datePublished="2025-12-12"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/event-driven-ai-architectures-kafka-spring"
      />
      {/* Hero Section */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          Event-Driven AI Architectures with Spring Cloud Stream and Kafka
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <time dateTime="2025-12-12">December 12, 2025</time>
          <span>•</span>
          <span>24 min read</span>
          <span>•</span>
          <span>Kafka, Microservices, AI</span>
        </div>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          Generative AI operations are slow. A GPT-4 call can take 30 seconds. A complex RAG chain can take minutes.
          Synchronous HTTP request/response cycles (REST) are ill-suited for this.
          The solution? Event-Driven Architecture (EDA).
        </p>
      </header>

      {/* Quick Navigation */}
      <nav className="bg-blue-50 dark:bg-gray-800 rounded-lg p-6 mb-12">
        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Jump to Section</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-blue-600 dark:text-blue-400">
            <li><a href="#why-eda" className="hover:underline">→ Why Event-Driven for AI?</a></li>
            <li><a href="#architecture" className="hover:underline">→ System Architecture</a></li>
            <li><a href="#producer" className="hover:underline">→ The Producer (API Gateway)</a></li>
            <li><a href="#consumer" className="hover:underline">→ The Consumer (AI Worker)</a></li>
            <li><a href="#frontend" className="hover:underline">→ Real-time Frontend Updates</a></li>
            <li><a href="#security" className="hover:underline">→ Security Considerations</a></li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">

        {/* Why EDA */}
        <section id="why-eda" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Why Event-Driven for AI?</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
             Blocking a thread for 30 seconds is a recipe for disaster in a high-concurrency Java application.
             If you have 200 Tomcat threads and 200 concurrent users waiting for GPT-4, your server is effectively dead.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
             By offloading the work to a Kafka topic, you acknowledge the request instantly (&quot;HTTP 202 Accepted&quot;) and process it in the background at your own pace.
          </p>
        </section>

        {/* Architecture */}
        <section id="architecture" className="mb-12">
           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">System Architecture</h2>
           <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
               <li><strong>Frontend (Next.js):</strong> Sends request, subscribes to WebSocket/SSE for updates.</li>
               <li><strong>API Service (Spring Boot):</strong> Validates request, publishes `JobSubmittedEvent` to Kafka.</li>
               <li><strong>Kafka:</strong> Buffers requests.</li>
               <li><strong>AI Worker (Spring Boot + Spring AI):</strong> Consumes event, calls LLM, publishes `JobCompletedEvent`.</li>
           </ul>
        </section>

        {/* Producer */}
        <section id="producer" className="mb-12">
           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">The Producer (API Gateway)</h2>
           <div className="bg-gray-900 text-gray-100 rounded-lg p-6 mb-6 overflow-x-auto">
            <pre className="text-sm"><code>{`@RestController
@RequiredArgsConstructor
public class JobController {

    private final StreamBridge streamBridge;

    @PostMapping("/generate")
    public ResponseEntity<Map<String, String>> submitJob(@RequestBody PromptRequest request) {
        String jobId = UUID.randomUUID().toString();

        JobEvent event = new JobEvent(jobId, request.getPrompt(), getCurrentUserId());

        streamBridge.send("ai-jobs-out-0", event);

        return ResponseEntity.accepted().body(Map.of("jobId", jobId));
    }
}`}</code></pre>
          </div>
        </section>

        {/* Consumer */}
        <section id="consumer" className="mb-12">
           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">The Consumer (AI Worker)</h2>
           <div className="bg-gray-900 text-gray-100 rounded-lg p-6 mb-6 overflow-x-auto">
            <pre className="text-sm"><code>{`@Component
@RequiredArgsConstructor
public class AIWorker {

    private final ChatClient chatClient;
    private final StreamBridge streamBridge;

    @Bean
    public Consumer<JobEvent> processJob() {
        return event -> {
            try {
                // Call OpenAI (This takes time!)
                String response = chatClient.prompt().user(event.prompt()).call().content();

                // Publish Result
                JobResult result = new JobResult(event.jobId(), response);
                streamBridge.send("ai-results-out-0", result);

            } catch (Exception e) {
                // Handle failures (DLQ, Retry)
                log.error("Job failed", e);
            }
        };
    }
}`}</code></pre>
          </div>
        </section>

        {/* Frontend */}
        <section id="frontend" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Real-time Frontend Updates</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                The frontend can't wait on an HTTP connection. Instead, it should use Server-Sent Events (SSE) or WebSockets to listen for the completion event.
            </p>
        </section>

        {/* Security Section */}
        <section id="security" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Security Considerations</h2>

          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Async architectures introduce complexity in identity propagation. When the worker processes the message, the original HTTP request context (and the user&apos;s JWT) is gone.
          </p>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-6 mb-6">
            <h3 className="text-lg font-semibold mb-3 text-yellow-800 dark:text-yellow-200">
              Async Security Checklist
            </h3>
            <ul className="space-y-2 text-yellow-900 dark:text-yellow-100">
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span><strong>Context Propagation:</strong> Pass the `userId` or `tenantId` in the Kafka message headers or payload. Never rely on ThreadLocal storage in async consumers.</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span><strong>Rate Limiting by Token Count:</strong> Standard request limits aren&apos;t enough; limit by total tokens processed to control costs and prevent DoS.</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span><strong>Poison Pills:</strong> Malformed messages that crash the consumer can halt the entire pipeline. Implement strict schema validation (Avro/Protobuf) and Dead Letter Queues (DLQ).</span>
              </li>
              <li className="flex items-start">
                <input type="checkbox" className="mt-1 mr-3" />
                <span><strong>Result Delivery:</strong> When sending results back via WebSocket/SSE, verify that the connection belongs to the user who initiated the job to prevent cross-user data leaks.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Conclusion */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Conclusion</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
             For production AI applications, Event-Driven Architecture is often the only viable way to scale.
             Spring Cloud Stream makes it trivial to decouple your request ingestion from the heavy lifting of AI processing.
          </p>
        </section>

        {/* Author Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Written by the DevMetrix Team • Published December 12, 2025
          </p>
        </div>

      </div>
    </article>
  );
}
