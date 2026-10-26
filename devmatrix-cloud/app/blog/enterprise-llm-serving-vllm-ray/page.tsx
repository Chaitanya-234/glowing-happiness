'use client';
import { useTheme } from '@/components/providers/ThemeProvider';
import JsonLdArticle from '@/components/JsonLdArticle';

const metadata = {
  title: 'Enterprise LLM Serving: Scaling to Millions with vLLM and Ray | DevMetrix',
  description: 'Master the art of high-throughput LLM serving. Learn about Continuous Batching, PagedAttention, and building a scalable inference cluster with Ray Serve and vLLM.',
  keywords: ['LLM Serving', 'vLLM', 'Ray Serve', 'MLOps', 'PagedAttention', 'Kubernetes'],
};

export default function LlmServingBlog() {
  const { currentTheme: theme } = useTheme();
  return (
    <article className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-20">
      <JsonLdArticle
        headline="Enterprise LLM Serving: Scaling to Millions with vLLM and Ray"
        description="Master the art of high-throughput LLM serving. Learn about Continuous Batching, PagedAttention, and building a scalable inference cluster with Ray Serve and vLLM."
        datePublished="2025-12-29"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/enterprise-llm-serving-vllm-ray"
      />

      {/* Hero Section */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          Enterprise LLM Serving: Scaling to Millions with vLLM and Ray
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <span>📅 December 29, 2025</span>
          <span>⏱️ 55 min read</span>
          <span>🏷️ MLOps & Infrastructure</span>
        </div>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          It is easy to run a Large Language Model (LLM) on your laptop. You download Ollama, run `ollama run llama3`, and you're chatting. But serving that same model to 10,000 concurrent users with sub-200ms latency is a completely different beast.
        </p>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
          In the enterprise, the bottleneck isn't usually compute—it's memory bandwidth. The naive approach of loading a model into a Flask app and processing one request at a time (sequential processing) is catastrophically inefficient. The GPU sits idle 90% of the time waiting for data to move from VRAM to the compute cores.
        </p>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
          This guide is for the engineers tasked with building the "inference engine" for their company. We will move beyond Hugging Face Pipelines and dive deep into <strong>vLLM</strong>, <strong>Continuous Batching</strong>, and <strong>Ray Serve</strong> to build a production-grade inference cluster that rivals OpenAI's throughput.
        </p>
      </header>

      {/* Quick Navigation */}
      <nav className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 mb-12 border-l-4 border-purple-600">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Table of Contents</h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#memory-bound" className="text-purple-600 dark:text-purple-400 hover:underline">The Problem: LLMs are Memory Bound</a></li>
          <li><a href="#paged-attention" className="text-purple-600 dark:text-purple-400 hover:underline">Theory: PagedAttention & KV Cache Management</a></li>
          <li><a href="#continuous-batching" className="text-purple-600 dark:text-purple-400 hover:underline">Theory: Continuous Batching (Iteration-level Scheduling)</a></li>
          <li><a href="#speculative-decoding" className="text-purple-600 dark:text-purple-400 hover:underline">Advanced Theory: Speculative Decoding</a></li>
          <li><a href="#python-implementation" className="text-purple-600 dark:text-purple-400 hover:underline">Python Implementation: Ray Serve Cluster with vLLM</a></li>
          <li><a href="#java-implementation" className="text-purple-600 dark:text-purple-400 hover:underline">Java Implementation: The Spring Boot Gateway</a></li>
          <li><a href="#security" className="text-purple-600 dark:text-purple-400 hover:underline">Security: Model Weights Protection & DoS Prevention</a></li>
        </ul>
      </nav>

      {/* The Problem */}
      <section id="memory-bound" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          The Problem: LLMs are Memory Bound
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Understanding LLM performance requires understanding the <strong>KV Cache</strong>. When an LLM generates the 100th token, it needs to attend to (look at) all 99 previous tokens. We cache the Key and Value matrices for these tokens so we don't have to recompute them. This is the KV Cache.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
           This cache grows linearly with sequence length. For long contexts (e.g., 128k tokens), the KV Cache can consume gigabytes of VRAM per request. If you allocate memory statically (reserving a contiguous block for the max possible length), you waste massive amounts of VRAM due to fragmentation. This "internal fragmentation" was the primary killer of LLM throughput until 2023.
        </p>
      </section>

      {/* Theory: PagedAttention */}
      <section id="paged-attention" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Theory: PagedAttention & KV Cache Management
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            The breakthrough that put vLLM on the map is <strong>PagedAttention</strong>. It borrows a 50-year-old idea from operating systems: Virtual Memory and Paging.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-600 mb-6">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">How OS Paging Works vs. PagedAttention</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-2">
                <strong>OS:</strong> Programs think they have a contiguous block of memory. In reality, the OS breaks memory into non-contiguous "pages" and maps them via a Page Table. This eliminates external fragmentation.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
                <strong>PagedAttention:</strong> Instead of reserving a contiguous VRAM block for a user's entire 4k context window, vLLM breaks the KV cache into blocks (e.g., 16 tokens per block). These blocks are stored in non-contiguous physical memory. When a user generates more tokens, vLLM simply allocates a new block from anywhere in memory and updates the block table.
            </p>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            This results in near-zero memory waste. If a request finishes early, its blocks are freed immediately. This allows vLLM to pack 20x more concurrent requests into the same GPU compared to naive Hugging Face implementations.
        </p>

        <div className="bg-gray-900 p-6 rounded-lg font-mono text-xs text-green-400 mb-6 overflow-x-auto">
            <h5 className="text-white font-bold mb-2">Memory Mapping Visualization</h5>
            <pre>{`
Logical KV Cache (Tokens)       Physical Block Table (VRAM)
-------------------------       ---------------------------
[Seq A: Token 0-15 ]  ----->    [ Block 7  (Addr 0x00A0) ]
[Seq A: Token 16-31]  ----->    [ Block 42 (Addr 0x0FE0) ]
[Seq B: Token 0-15 ]  ----->    [ Block 2  (Addr 0x0010) ]
            `}</pre>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
           Just like virtual memory allows your 16GB RAM laptop to run Chrome (which thinks it has 100GB), PagedAttention allows the GPU to "oversubscribe" memory safely.
        </p>
      </section>

      {/* Theory: Continuous Batching */}
      <section id="continuous-batching" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Theory: Continuous Batching (Iteration-level Scheduling)
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            In traditional "Static Batching," if you batch 4 requests together, the batch is only finished when the <em>longest</em> request finishes. If Request A generates 5 tokens and Request B generates 500 tokens, the GPU slots for Request A sit idle for 495 steps.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            <strong>Continuous Batching</strong> (or Orca-style scheduling) solves this. The scheduler works at the <em>iteration</em> level, not the request level.
        </p>
        <ul className="list-disc list-inside space-y-4 text-gray-700 dark:text-gray-300 mb-6">
            <li>At step T, we generate one token for all active requests.</li>
            <li>If Request A finishes at step T, we immediately evict it from the batch.</li>
            <li>At step T+1, we insert a new waiting Request C into the empty slot.</li>
            <li>The GPU is always fully utilized.</li>
        </ul>
      </section>

      {/* Advanced Theory: Speculative Decoding */}
      <section id="speculative-decoding" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Advanced Theory: Speculative Decoding
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Even with batching, LLMs are limited by the speed of memory access (memory bandwidth). Generating one token requires reading all 70B parameters from VRAM.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            <strong>Speculative Decoding</strong> uses a small "Draft Model" (e.g., a 120M parameter model) to quickly guess the next 5 tokens. Then, the big "Target Model" (70B) verifies all 5 tokens in a single forward pass.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Because checking 5 tokens in parallel costs about the same as generating 1 token (due to matrix math parallelism), if the Draft Model is accurate, we get a 2x-3x speedup in latency for free.
        </p>
      </section>

      {/* Python Implementation */}
      <section id="python-implementation" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Python Implementation: Ray Serve Cluster with vLLM
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          We will use <strong>Ray Serve</strong> to orchestrate our inference. Ray allows us to scale across multiple nodes and handle autoscaling.
        </p>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Why Ray?</h3>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Ray provides the "Control Plane" that vLLM lacks. vLLM is just an engine (like a V8 engine). Ray is the car. Ray handles:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-4">
            <li><strong>Replica Management:</strong> Spinning up 10 copies of the model across 4 different EC2 instances.</li>
            <li><strong>Autoscaling:</strong> Scaling from 1 replica to 50 based on queue depth.</li>
            <li><strong>Fault Tolerance:</strong> If a GPU overheats and kills a replica, Ray restarts it instantly.</li>
        </ul>

        <div className="bg-black text-gray-300 rounded-lg p-4 overflow-x-auto mb-6">
            <pre><code className="language-python">{`from typing import Dict
from ray import serve
from vllm import AsyncLLMEngine, EngineArgs, SamplingParams
import uuid

# Define the Ray deployment
@serve.deployment(num_replicas=2, ray_actor_options={"num_gpus": 1})
class VLLMDeployment:
    def __init__(self):
        # Initialize vLLM engine with PagedAttention
        args = EngineArgs(
            model="meta-llama/Meta-Llama-3-8B-Instruct",
            tensor_parallel_size=1, # 1 GPU per replica
            gpu_memory_utilization=0.90, # Use 90% VRAM
            max_num_batched_tokens=4096
        )
        self.engine = AsyncLLMEngine.from_engine_args(args)

    async def __call__(self, request: starlette.requests.Request):
        json_input = await request.json()
        prompt = json_input.get("prompt")
        stream = json_input.get("stream", False)

        request_id = str(uuid.uuid4())
        sampling_params = SamplingParams(temperature=0.7, max_tokens=500)

        results_generator = self.engine.generate(
            prompt, sampling_params, request_id
        )

        if stream:
            return StreamingResponse(self._stream_results(results_generator))

        # Non-streaming wait for final result
        final_output = None
        async for request_output in results_generator:
            final_output = request_output

        return {"text": final_output.outputs[0].text}

    async def _stream_results(self, results_generator):
        async for request_output in results_generator:
            text = request_output.outputs[0].text
            yield text.encode("utf-8")

# Deploy the application
deployment = VLLMDeployment.bind()
`}</code></pre>
        </div>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            This Python code runs inside the Ray cluster. Ray handles the HTTP ingress, load balances requests between the 2 replicas, and restarts them if they crash.
        </p>
      </section>

      {/* Java Implementation */}
      <section id="java-implementation" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Java Implementation: The Spring Boot Gateway
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Your Ray cluster should not be exposed directly to the public internet. You need a Spring Boot Gateway to handle Authentication, Rate Limiting, and Logging before forwarding to Ray.
        </p>

        <div className="bg-black text-gray-300 rounded-lg p-4 overflow-x-auto mb-6">
            <pre><code className="language-java">{`package com.devmetrix.llmgateway;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Configuration
public class GatewayConfig {

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()
            .route("llm_route", r -> r.path("/v1/chat/completions")
                .filters(f -> f
                    .filter(new ApiKeyAuthFilter()) // Custom Auth
                    .requestRateLimiter(c -> c.setRateLimiter(redisRateLimiter())) // Redis Rate Limiting
                    .rewritePath("/v1/chat/completions", "/") // Rewrite to match Ray's endpoint
                )
                .uri("http://ray-cluster-service:8000")) // Internal K8s DNS
            .build();
    }
}

// Simple Auth Filter Example
class ApiKeyAuthFilter implements GatewayFilter, Ordered {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String apiKey = exchange.getRequest().getHeaders().getFirst("X-API-Key");
        if (apiKey == null || !isValid(apiKey)) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
        return chain.filter(exchange);
    }
}
`}</code></pre>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-red-600">
          Security: Model Weights Protection & DoS Prevention
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Running inference at scale introduces unique security challenges.
        </p>

        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 mb-6 border-l-4 border-red-600">
             <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">The "Model Extraction" Attack</h3>
             <p className="text-gray-700 dark:text-gray-300 mb-2">
                If an attacker can query your model unlimited times with carefully crafted inputs, they can train a copycat model on your outputs (Distillation Attack). They effectively steal your IP (the fine-tuned weights) for the cost of API calls.
             </p>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Defense Strategies</h3>
        <ul className="list-disc list-inside space-y-4 text-gray-700 dark:text-gray-300 mb-6">
            <li><strong>Hard Rate Limits:</strong> Implement strict per-user rate limits. No normal user needs to generate 1M tokens per day.</li>
            <li><strong>Watermarking (Output):</strong> Subtly alter the probability distribution of tokens in a way that is undetectable to humans but detectable statistically. If a competitor releases a model that matches your watermark, you have proof of theft.</li>
            <li><strong>Input Length Bounds (DoS):</strong> A common DoS attack against Transformers is sending a request with 100,000 tokens of context. The quadratic complexity of attention (O(N^2)) will cause the GPU to OOM (Out of Memory) and crash the replica. Always enforce a hard `max_model_len` at the API gateway level.</li>
        </ul>
      </section>

    </article>
  );
}
