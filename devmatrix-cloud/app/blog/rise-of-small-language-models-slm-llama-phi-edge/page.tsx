import JsonLdArticle from '@/components/JsonLdArticle';

export default function SmallLanguageModelsBlog() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-20">
      <JsonLdArticle
        headline="The Rise of Small Language Models: Why Llama 3 8B and Phi-3 Rule the Edge"
        description="Bigger isn’t always better. Discover how Small Language Models (SLMs) are bringing powerful AI to edge devices, reducing costs, and enhancing privacy."
        datePublished="2025-12-14"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/rise-of-small-language-models-slm-llama-phi-edge"
      />

      {/* Hero Section */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          The Rise of Small Language Models: Why Llama 3 8B and Phi-3 Rule the Edge
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <span>📅 December 14, 2025</span>
          <span>⏱️ 24 min read</span>
          <span>🏷️ Generative AI</span>
        </div>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          For years, the AI arms race was defined by parameter counts. "Trillions of parameters!" shouted the headlines. But in 2025, the narrative has flipped. The most exciting developments aren't happening on massive server clusters—they're happening on your laptop, your phone, and even your Raspberry Pi. Welcome to the era of <strong>Small Language Models (SLMs)</strong>, where efficiency, privacy, and speed reign supreme.
        </p>
      </header>

      {/* Quick Navigation */}
      <nav className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 mb-12 border-l-4 border-purple-600">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Quick Navigation</h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#why-slms" className="text-purple-600 dark:text-purple-400 hover:underline">Why "Small" is the New Big</a></li>
          <li><a href="#top-models" className="text-purple-600 dark:text-purple-400 hover:underline">Top Contenders: Llama 3, Phi-3, and Gemma</a></li>
          <li><a href="#running-locally" className="text-purple-600 dark:text-purple-400 hover:underline">Tutorial: Running SLMs Locally with Ollama</a></li>
          <li><a href="#edge-ai" className="text-purple-600 dark:text-purple-400 hover:underline">Edge AI: Moving Intelligence to the Device</a></li>
          <li><a href="#java-integration" className="text-purple-600 dark:text-purple-400 hover:underline">Java Integration: Spring AI & Local Models</a></li>
          <li><a href="#future" className="text-purple-600 dark:text-purple-400 hover:underline">The Future of Decentralized AI</a></li>
        </ul>
      </nav>

      {/* Why SLMs Section */}
      <section id="why-slms" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Why "Small" is the New Big
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          While GPT-4 is undeniably powerful, it's also expensive, slow, and requires sending your data to a third-party server. SLMs, typically ranging from 1B to 8B parameters, offer a compelling alternative.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
                <h4 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">1. Privacy First</h4>
                <p className="text-gray-600 dark:text-gray-300">Run sensitive data (medical records, legal docs) entirely offline. No data ever leaves your device.</p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-700">
                <h4 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-2">2. Cost Efficiency</h4>
                <p className="text-gray-600 dark:text-gray-300">Forget massive API bills. SLMs run on consumer-grade GPUs or even CPUs, drastically reducing inference costs.</p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-700">
                <h4 className="text-xl font-bold text-yellow-700 dark:text-yellow-400 mb-2">3. Low Latency</h4>
                <p className="text-gray-600 dark:text-gray-300">Local inference means zero network latency. Instant responses for chat apps, coding assistants, and real-time analysis.</p>
            </div>
             <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-200 dark:border-purple-700">
                <h4 className="text-xl font-bold text-purple-700 dark:text-purple-400 mb-2">4. Customization</h4>
                <p className="text-gray-600 dark:text-gray-300">Fine-tuning a 7B model on your specific domain data is feasible and affordable for most businesses.</p>
            </div>
        </div>
      </section>

      {/* Top Models Section */}
      <section id="top-models" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Top Contenders: Llama 3, Phi-3, and Gemma
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          The SLM landscape is crowded, but three models stand out for their exceptional performance-to-size ratio.
        </p>

        <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">🦙 Llama 3 (8B)</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>The Standard Bearer.</strong> Meta's open-weights model is incredibly robust. It punches way above its weight class, often outperforming older 70B models in reasoning and coding benchmarks.</p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
                    <li>Great for: General purpose chat, RAG, simple coding tasks.</li>
                    <li>Hardware: Runs comfortably on 8GB VRAM (RTX 3060/4060) or Apple M-series chips.</li>
                </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">🔬 Phi-3 (3.8B - Mini)</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>The Efficiency King.</strong> Microsoft's Phi-3 is trained on "textbook quality" data, making it smarter than it has any right to be at this size. It's astonishingly good at logic and math.</p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
                    <li>Great for: Mobile devices, reasoning tasks, summarization.</li>
                    <li>Hardware: Can run on modern smartphones (iPhone 15 Pro)!</li>
                </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">💎 Gemma 2 (9B)</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-2"><strong>Google's Open Contender.</strong> Built from the same research as Gemini. It shines in creative writing and following complex instructions.</p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 text-sm">
                    <li>Great for: Creative writing, roleplay, nuanced instruction following.</li>
                    <li>Hardware: Requires slightly more VRAM (12GB+ recommended).</li>
                </ul>
            </div>
        </div>
      </section>

      {/* Running Locally Section */}
      <section id="running-locally" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Tutorial: Running SLMs Locally with Ollama
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Running these models used to be a headache of Python dependencies and CUDA driver issues. Enter <strong>Ollama</strong>. It's like Docker for LLMs—simple, standardized, and powerful.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">Step 1: Installation</h3>
        <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
{`# macOS / Linux
curl -fsSL https://ollama.com/install.sh | sh

# Windows
# Download the installer from ollama.com`}
            </pre>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">Step 2: Run a Model</h3>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Pull and run Llama 3 8B with a single command. It will download the model weights (~4.7GB) automatically.
        </p>
        <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
{`ollama run llama3

>>> Why is the sky blue?
The sky appears blue to the human eye because...`}
            </pre>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">Step 3: Programmatic Access (JavaScript)</h3>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Ollama exposes a REST API running on port 11434. Here's how to call it from Node.js/Next.js.
        </p>
        <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-gray-400 text-sm">TypeScript / Next.js</span>
            </div>
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
{`async function chatWithLlama(prompt: string) {
  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'llama3',
      prompt: prompt,
      stream: false // Set to true for streaming responses
    })
  });

  const data = await response.json();
  return data.response;
}

// Usage
chatWithLlama("Explain quantum computing like I'm 5")
  .then(console.log);`}
            </pre>
        </div>
      </section>

      {/* Java Integration Section */}
      <section id="java-integration" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Java Integration: Spring AI & Local Models
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          For enterprise developers, integration is key. You don't want to rewrite your backend in Python just to use AI. <strong>Spring AI</strong> provides first-class support for Ollama, allowing you to swap between OpenAI and local models with just a config change.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">Configuration</h3>
        <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-gray-400 text-sm">application.yml</span>
            </div>
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
{`spring:
  ai:
    ollama:
      base-url: http://localhost:11434
      chat:
        model: llama3
        options:
          temperature: 0.7`}
            </pre>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">Service Implementation</h3>
        <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-gray-400 text-sm">Java (Spring Boot)</span>
            </div>
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
{`import org.springframework.ai.chat.ChatClient;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/local-ai")
public class LocalAiController {

    private final ChatClient chatClient;

    public LocalAiController(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    @PostMapping("/generate")
    public Map<String, String> generate(@RequestBody String prompt) {
        // This automatically uses the configured Ollama model
        String response = chatClient.call(prompt);
        return Map.of("response", response);
    }

    // RAG Example with Local Documents
    @PostMapping("/ask-docs")
    public String askDocs(@RequestBody String question) {
        // Assume we have a VectorStore loaded with local docs
        // Spring AI makes switching from Pinecone (Cloud) to
        // a simple in-memory SimpleVectorStore trivial.
        // ... retrieval logic ...
        return "RAG response from local data";
    }
}`}
            </pre>
        </div>
      </section>

       {/* Edge AI Section */}
      <section id="edge-ai" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Edge AI: Moving Intelligence to the Device
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          The implications of capable SLMs are massive for IoT and Edge Computing.
        </p>

        <div className="space-y-4 mb-6">
             <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border-l-4 border-purple-600">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Smart Home 2.0</h4>
                <p className="text-gray-700 dark:text-gray-300">
                    Imagine a home assistant that actually understands context and controls your devices without sending your voice recordings to the cloud. "Turn off the lights in the room I'm in" becomes possible without internet access.
                </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border-l-4 border-purple-600">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Industrial IoT</h4>
                <p className="text-gray-700 dark:text-gray-300">
                    Factories can deploy SLMs on edge gateways to analyze sensor data in real-time, detecting anomalies and predicting maintenance needs without the latency of uploading terabytes of data to AWS.
                </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border-l-4 border-purple-600">
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Healthcare Privacy</h4>
                <p className="text-gray-700 dark:text-gray-300">
                    Doctors can use SLM-powered transcription and diagnostic tools on their local tablets, ensuring patient data remains completely compliant with HIPAA/GDPR regulations.
                </p>
            </div>
        </div>
      </section>

      {/* Future Section */}
      <section id="future" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          The Future of Decentralized AI
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          We are witnessing a "Mainframe-to-PC" moment for Artificial Intelligence. Just as computing moved from massive central mainframes to personal computers, AI is moving from massive central clusters to personal devices.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            SLMs like Llama 3 and Phi-3 are just the beginning. As hardware accelerators (NPUs) become standard in every laptop and phone, "Local AI" will just be "Software."
        </p>
      </section>

    </article>
  );
}
