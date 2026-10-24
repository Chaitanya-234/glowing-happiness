import JsonLdArticle from '@/components/JsonLdArticle';

export default function ServerlessAiBlog() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-20">
      <JsonLdArticle
        headline="Serverless AI: Running Local LLMs in the Browser with WebGPU and WebLLM"
        description="Run powerful LLMs like Llama 3 directly in the user browser using WebGPU. A deep dive into privacy-first, zero-latency, and zero-cost AI architecture."
        datePublished="2025-12-19"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/serverless-ai-local-llms-browser-webgpu"
      />

      {/* Hero Section */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          Serverless AI: Running Local LLMs in the Browser with WebGPU and WebLLM
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <span>📅 December 19, 2025</span>
          <span>⏱️ 28 min read</span>
          <span>🏷️ Web AI</span>
        </div>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          The cloud is expensive. Inference costs for models like GPT-4 are a major bottleneck for scaling AI apps. But what if you could offload 100% of the compute to the user&apos;s device? Thanks to <strong>WebGPU</strong> and highly optimized libraries like <strong>WebLLM</strong> and <strong>Transformers.js</strong>, you can now run Llama 3 8B, Phi-3, and Mistral directly in Chrome, running at 50+ tokens/sec on a modern MacBook or gaming PC.
        </p>
      </header>

      {/* Quick Navigation */}
      <nav className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 mb-12 border-l-4 border-purple-600">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Quick Navigation</h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#why-webgpu" className="text-purple-600 dark:text-purple-400 hover:underline">Why WebGPU Changes Everything</a></li>
          <li><a href="#security-privacy" className="text-purple-600 dark:text-purple-400 hover:underline">Security: The Privacy-First Advantage</a></li>
          <li><a href="#implementation-nextjs" className="text-purple-600 dark:text-purple-400 hover:underline">Next.js Implementation: Transformers.js</a></li>
          <li><a href="#implementation-backend" className="text-purple-600 dark:text-purple-400 hover:underline">Backend Coordination (Spring Boot)</a></li>
          <li><a href="#performance-tips" className="text-purple-600 dark:text-purple-400 hover:underline">Pro-Tips for Performance</a></li>
        </ul>
      </nav>

      {/* Why WebGPU */}
      <section id="why-webgpu" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Why WebGPU Changes Everything
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          For years, running AI in the browser meant using WebGL, which was designed for graphics, not general-purpose compute (GPGPU). WebGPU is the successor, offering low-level access to the GPU with compute shaders that map perfectly to the matrix multiplication operations required by Transformers.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Before (WebGL)</h4>
                <p className="text-gray-600 dark:text-gray-400">
                    High overhead, data marshaling bottlenecks. Llama 2 ran at 2-3 tokens/sec. Usable only for tiny models.
                </p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg border border-purple-500">
                <h4 className="text-xl font-bold text-purple-700 dark:text-purple-400 mb-2">Now (WebGPU)</h4>
                <p className="text-gray-600 dark:text-gray-300">
                    Direct compute shader access. Llama 3 8B runs at 40-50 tokens/sec on an M3 MacBook Air.
                </p>
            </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security-privacy" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Security: The Privacy-First Advantage & New Risks
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            The biggest selling point of browser-based AI is <strong>Privacy</strong>. No data ever leaves the user&apos;s device. This is massive for HIPAA-compliant apps, legal tech, or personal journaling apps where users trust no one with their data.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">But what about the risks?</h3>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Running models on the client introduces new vectors that backend engineers often ignore:
        </p>

        <div className="space-y-6">
             <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border-l-4 border-red-500">
                <h4 className="text-xl font-bold text-red-800 dark:text-red-300 mb-2">Model Theft</h4>
                <p className="text-gray-700 dark:text-gray-300">
                    If you finetune a proprietary model and ship the weights to the client, a user can simply inspect the Network tab and download your `.onnx` or `.wasm` files. <strong>Rule:</strong> Never ship proprietary IP models to the client. Use open weights (Llama, Mistral) or distill knowledge into a generic model.
                </p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border-l-4 border-yellow-500">
                <h4 className="text-xl font-bold text-yellow-800 dark:text-yellow-300 mb-2">XSS & Prompt Injection (Client-Side)</h4>
                <p className="text-gray-700 dark:text-gray-300">
                    If your client-side model processes untrusted input (e.g., from a shared document), it is still vulnerable to Prompt Injection. If the model output is rendered into the DOM without sanitization, it can lead to XSS.
                </p>
            </div>
        </div>
      </section>

      {/* Next.js Implementation */}
      <section id="implementation-nextjs" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Next.js Implementation: Transformers.js
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            We will use `transformers.js` to run a text generation pipeline in a Web Worker (to avoid freezing the main UI thread).
        </p>

        <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-gray-400 text-sm">worker.js (Web Worker)</span>
            </div>
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
{`import { pipeline, env } from '@xenova/transformers';

// Skip local model checks
env.allowLocalModels = false;
env.useBrowserCache = true;

class TextGenerationPipeline {
  static task = 'text-generation';
  static model = 'Xenova/TinyLlama-1.1B-Chat-v1.0';
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = await pipeline(this.task, this.model, { progress_callback });
    }
    return this.instance;
  }
}

self.addEventListener('message', async (event) => {
  const { text } = event.data;

  const generator = await TextGenerationPipeline.getInstance(data => {
    self.postMessage({ status: 'progress', data });
  });

  const output = await generator(text, {
    max_new_tokens: 200,
    temperature: 0.7,
    callback_function: (beams) => {
        // Stream tokens back
        const decodedText = generator.tokenizer.decode(beams[0].output_token_ids, { skip_special_tokens: true });
        self.postMessage({ status: 'update', output: decodedText });
    }
  });

  self.postMessage({ status: 'complete', output: output[0].generated_text });
});`}
            </pre>
        </div>

        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            And the React component to consume it:
        </p>

        <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
             <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-gray-400 text-sm">ChatComponent.tsx</span>
            </div>
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
{`'use client';
import { useEffect, useRef, useState } from 'react';

export default function ChatComponent() {
  const worker = useRef<Worker>(null);
  const [output, setOutput] = useState('');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('./worker.js', import.meta.url), {
        type: 'module',
      });

      worker.current.onmessage = (e) => {
        if (e.data.status === 'update') {
            setOutput(e.data.output);
        }
      };
    }
  }, []);

  const generate = () => {
    worker.current?.postMessage({ text: "Explain quantum computing to a 5 year old." });
  };

  return (
    <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
        <button onClick={generate} className="bg-purple-600 px-4 py-2 rounded text-white mb-4">
            Generate on Device
        </button>
        <div className="prose prose-invert">
            {output}
        </div>
    </div>
  );
}`}
            </pre>
        </div>
      </section>

      {/* Backend Coordination */}
      <section id="implementation-backend" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Backend Coordination (Spring Boot)
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Even in a &quot;serverless&quot; AI architecture, the backend still plays a crucial role: syncing state, managing user profiles, or offering a fallback to a larger server-side model if the user&apos;s device is too weak (e.g., an old mobile phone).
        </p>
         <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-gray-400 text-sm">Java (Spring Boot) Device Capability Check</span>
            </div>
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
{`@RestController
@RequestMapping("/api/config")
public class ModelConfigController {

    @PostMapping("/negotiate")
    public ModelConfig negotiateModel(@RequestBody DeviceCapabilities device) {
        // If device has < 4GB VRAM or is mobile, suggest server-side
        if (device.getVram() < 4096 || device.isMobile()) {
            return new ModelConfig(ExecutionMode.SERVER, "gpt-4o-mini");
        }

        // Else suggest local Llama 3
        return new ModelConfig(ExecutionMode.LOCAL, "Llama-3-8B-Quantized");
    }
}

class DeviceCapabilities {
    private int vram;
    private boolean mobile;
    // getters/setters
}`}
            </pre>
        </div>
      </section>

      {/* Performance Tips */}
      <section id="performance-tips" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Pro-Tips for Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border-t-4 border-green-500">
                <h4 className="font-bold text-lg mb-2">Use Quantization</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Always use 4-bit (q4f16) or 8-bit quantization. It reduces memory usage by 70% with negligible quality loss.
                </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border-t-4 border-blue-500">
                <h4 className="font-bold text-lg mb-2">Cache Model Weights</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    The Cache API is your friend. Users shouldn&apos;t download 4GB every time they visit.
                </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border-t-4 border-purple-500">
                <h4 className="font-bold text-lg mb-2">Web Workers</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Never run inference on the main thread. It will lock up the UI and kill the scroll performance.
                </p>
            </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Conclusion</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Local AI is the future of privacy-preserving, zero-cost interaction. By leveraging WebGPU and smart backend coordination, we can build apps that are both powerful and respectful of user data. The tools are here—it&apos;s time to build.
        </p>
      </section>

    </article>
  );
}
