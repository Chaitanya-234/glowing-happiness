'use client';
import { useTheme } from '@/components/providers/ThemeProvider';
import JsonLdArticle from '@/components/JsonLdArticle';

export default function VoiceAiBlog() {
  const { currentTheme: theme } = useTheme();
  return (
    <article className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-20">
      <JsonLdArticle
        headline="Voice-First Revolution: Building Real-Time Conversational AI with OpenAI Realtime API"
        description="The future is voice. Master the OpenAI Realtime API to build low-latency, interruptible, and emotionally expressive voice assistants using WebSockets."
        datePublished="2025-12-22"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/voice-first-ai-realtime-api-multimodal"
      />

      {/* Hero Section */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          Voice-First Revolution: Building Real-Time Conversational AI with OpenAI Realtime API
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <span>📅 December 22, 2025</span>
          <span>⏱️ 27 min read</span>
          <span>🏷️ Voice AI</span>
        </div>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          Typing is slow. Speaking is fast. As models like GPT-4o achieve human-level latency (300ms) and emotional intelligence, we are moving from &quot;Chatbots&quot; to &quot;Voice Agents.&quot; This isn&apos;t just Siri 2.0; it&apos;s a fundamental shift in Human-Computer Interaction (HCI). This guide covers how to build a real-time, interruptible voice assistant using <strong>WebSockets</strong>, <strong>OpenAI Realtime API</strong>, and <strong>Spring Boot</strong>.
        </p>
      </header>

      {/* Quick Navigation */}
      <nav className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 mb-12 border-l-4 border-purple-600">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Quick Navigation</h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#the-latency-problem" className="text-purple-600 dark:text-purple-400 hover:underline">The Latency Problem</a></li>
          <li><a href="#security" className="text-purple-600 dark:text-purple-400 hover:underline">Security: Spoofing & Deepfakes</a></li>
          <li><a href="#code-nextjs" className="text-purple-600 dark:text-purple-400 hover:underline">Next.js Implementation: WebSocket Client</a></li>
          <li><a href="#code-spring" className="text-purple-600 dark:text-purple-400 hover:underline">Backend Auth Token Generation</a></li>
          <li><a href="#budget" className="text-purple-600 dark:text-purple-400 hover:underline">Voice Latency Budget</a></li>
        </ul>
      </nav>

      {/* The Latency Problem */}
      <section id="the-latency-problem" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          The Latency Problem
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            In a traditional STT -&gt; LLM -&gt; TTS pipeline, latency stacks up:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300 mb-6">
            <li>Speech-to-Text (Whisper): 800ms</li>
            <li>LLM Inference (GPT-4): 2000ms</li>
            <li>Text-to-Speech (ElevenLabs): 1000ms</li>
            <li><strong>Total: ~4 seconds.</strong> (Too slow for conversation)</li>
        </ul>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500 mb-6">
            <h4 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-2">The Solution: Speech-to-Speech</h4>
            <p className="text-gray-700 dark:text-gray-300">
                Models like GPT-4o operate natively on audio. Audio In -&gt; Audio Out. No text conversion. This drops latency to ~300ms, which feels instantaneous.
            </p>
        </div>
      </section>

      {/* Security */}
      <section id="security" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Security: Spoofing & Deepfakes
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Voice biometrics are no longer secure. With 3 seconds of audio, I can clone your voice.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Defense in Depth</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-700">
                <h4 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">Liveness Detection</h4>
                <p className="text-gray-600 dark:text-gray-300">
                    Require the user to say a random phrase ("The purple elephant jumps over the moon") to prove they aren't a pre-recorded clip.
                </p>
            </div>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-700">
                <h4 className="text-xl font-bold text-yellow-700 dark:text-yellow-400 mb-2">Audio CAPTCHA</h4>
                <p className="text-gray-600 dark:text-gray-300">
                    Analyze background noise and spectral artifacts. Deepfakes often have "perfect" silence or specific artifacts in high frequencies.
                </p>
            </div>
        </div>
      </section>

      {/* Next.js Implementation */}
      <section id="code-nextjs" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Next.js Implementation: WebSocket Client
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            We use the `WebAudio` API to capture microphone input and stream it via WebSocket to OpenAI.
        </p>

        <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-gray-400 text-sm">useRealtimeVoice.ts (Custom Hook)</span>
            </div>
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
{`import { useEffect, useRef, useState } from 'react';

export function useRealtimeVoice(ephemeralToken: string) {
  const ws = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState('disconnected');

  useEffect(() => {
    if (!ephemeralToken) return;

    // Connect to OpenAI Realtime API
    ws.current = new WebSocket(
      'wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview',
      ['realtime', 'openai-beta', 'realtime-v1']
    );

    ws.current.onopen = () => {
      setStatus('connected');
      // Send auth token
      ws.current?.send(JSON.stringify({
         type: 'session.update',
         session: {
            voice: 'shimmer',
            instructions: 'You are a helpful assistant.'
         }
      }));
    };

    ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'response.audio.delta') {
            // Play this chunk immediately
            playAudioChunk(data.delta);
        }
    };

    return () => ws.current?.close();
  }, [ephemeralToken]);

  const sendAudio = (base64Audio: string) => {
    ws.current?.send(JSON.stringify({
        type: 'input_audio_buffer.append',
        audio: base64Audio
    }));
  };

  return { status, sendAudio };
}

function playAudioChunk(base64: string) {
    // WebAudio implementation omitted for brevity
}`}
            </pre>
        </div>
      </section>

      {/* Backend Auth Token Generation */}
      <section id="code-spring" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Backend Auth Token Generation
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Never expose your `sk-proj` key on the client. Instead, your Spring Boot backend should generate a short-lived ephemeral token for the client.
        </p>

        <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
             <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-gray-400 text-sm">TokenController.java</span>
            </div>
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
{`@RestController
@RequestMapping("/api/voice")
public class VoiceTokenController {

    @Value("\${openai.api.key}")
    private String apiKey;

    @GetMapping("/token")
    @PreAuthorize("isAuthenticated()")
    public Map<String, String> getEphemeralToken() {
        // In reality, you call OpenAI to create a session token
        // POST https://api.openai.com/v1/realtime/sessions

        String ephemeralToken = callOpenAIForSession(apiKey);

        return Map.of(
            "token", ephemeralToken,
            "expires_in", "60" // seconds
        );
    }

    private String callOpenAIForSession(String key) {
        // RestClient logic here
        return "sess_abc123...";
    }
}`}
            </pre>
        </div>
      </section>

      {/* Latency Budget */}
      <section id="budget" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Voice Latency Budget
        </h2>
        <table className="w-full text-left border-collapse border border-gray-700">
            <thead>
                <tr className="bg-gray-800 text-gray-300">
                    <th className="p-4 border border-gray-700">Component</th>
                    <th className="p-4 border border-gray-700">Latency (ms)</th>
                    <th className="p-4 border border-gray-700">Optimization</th>
                </tr>
            </thead>
            <tbody>
                <tr className="bg-gray-900 text-gray-300">
                    <td className="p-4 border border-gray-700">Network (RTT)</td>
                    <td className="p-4 border border-gray-700">50-100ms</td>
                    <td className="p-4 border border-gray-700">Use Edge Servers (Cloudflare)</td>
                </tr>
                <tr className="bg-gray-800 text-gray-300">
                    <td className="p-4 border border-gray-700">VAD (Voice Activity Detection)</td>
                    <td className="p-4 border border-gray-700">200ms</td>
                    <td className="p-4 border border-gray-700">Run Silero VAD on client</td>
                </tr>
                <tr className="bg-gray-900 text-gray-300">
                    <td className="p-4 border border-gray-700">Model Inference (First Token)</td>
                    <td className="p-4 border border-gray-700">200-400ms</td>
                    <td className="p-4 border border-gray-700">Use specialized "Realtime" models</td>
                </tr>
                <tr className="bg-gray-800 text-gray-300">
                    <td className="p-4 border border-gray-700"><strong>Total Target</strong></td>
                    <td className="p-4 border border-gray-700"><strong>&lt; 700ms</strong></td>
                    <td className="p-4 border border-gray-700">Sub-second is the goal</td>
                </tr>
            </tbody>
        </table>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Conclusion</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            The era of typing is ending. Voice is the most natural interface we have, and for the first time in history, computers can understand it with human-like nuance. By mastering the Realtime API, you aren&apos;t just building an app; you are building a companion.
        </p>
      </section>

    </article>
  );
}
