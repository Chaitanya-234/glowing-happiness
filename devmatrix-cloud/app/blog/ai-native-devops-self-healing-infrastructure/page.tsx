import JsonLdArticle from '@/components/JsonLdArticle';

export default function AiOpsBlog() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-20">
      <JsonLdArticle
        headline="AI-Native DevOps: Building Self-Healing Infrastructure with Prometheus and LLMs"
        description="Transform your DevOps with AI agents that monitor Prometheus alerts, investigate logs, and automatically remediate production incidents in real-time."
        datePublished="2025-12-21"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/ai-native-devops-self-healing-infrastructure"
      />

      {/* Hero Section */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          AI-Native DevOps: Building Self-Healing Infrastructure with Prometheus and LLMs
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <span>📅 December 21, 2025</span>
          <span>⏱️ 35 min read</span>
          <span>🏷️ DevOps AI</span>
        </div>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          The pager rings at 3 AM. A Kubernetes pod is crash-looping. Traditionally, you wake up, log in, run `kubectl logs`, and spend an hour debugging. In the era of <strong>AI-Native DevOps</strong>, this workflow is obsolete. An AI agent has already intercepted the Prometheus alert, analyzed the stack trace, cross-referenced it with recent git commits, and even applied a rollback—all before you woke up. This guide shows you how to build this system.
        </p>
      </header>

      {/* Quick Navigation */}
      <nav className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 mb-12 border-l-4 border-purple-600">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Quick Navigation</h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#architecture" className="text-purple-600 dark:text-purple-400 hover:underline">Architecture: The Loop</a></li>
          <li><a href="#security-risks" className="text-purple-600 dark:text-purple-400 hover:underline">Security: The Rogue Agent Problem</a></li>
          <li><a href="#code-agent" className="text-purple-600 dark:text-purple-400 hover:underline">Building the Agent (Node.js)</a></li>
          <li><a href="#code-spring" className="text-purple-600 dark:text-purple-400 hover:underline">Observability Hooks (Spring Boot)</a></li>
          <li><a href="#workflow" className="text-purple-600 dark:text-purple-400 hover:underline">Interactive Incident Workflow</a></li>
        </ul>
      </nav>

      {/* Architecture */}
      <section id="architecture" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Architecture: The Loop
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            The core of AI-Native DevOps is the <strong>OODA Loop</strong> (Observe, Orient, Decide, Act) automated by an LLM Agent.
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border-l-4 border-blue-500 mb-6">
            <h4 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-2">The Components</h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                <li><strong>Sensor:</strong> Prometheus Alertmanager sends a webhook when a metric spikes.</li>
                <li><strong>Brain:</strong> An LLM Agent (LangChain/AutoGPT) receives the webhook.</li>
                <li><strong>Hands:</strong> The Agent has tools: `kubectl`, `git`, `aws-cli`.</li>
                <li><strong>Judge:</strong> A Human-in-the-Loop (via Slack) approves high-risk actions.</li>
            </ul>
        </div>
      </section>

      {/* Security Risks */}
      <section id="security-risks" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Security: The Rogue Agent Problem
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Giving an AI `kubectl admin` access is a recipe for disaster. If the LLM hallucinates, it could delete your production database.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Mitigation Strategies</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg border border-red-200 dark:border-red-700">
                <h4 className="text-xl font-bold text-red-700 dark:text-red-400 mb-2">Least Privilege (RBAC)</h4>
                <p className="text-gray-600 dark:text-gray-300">
                    The Agent&apos;s ServiceAccount should only have permission to `get logs` and `restart deployment`. It should <strong>never</strong> have `delete persistentvolume`.
                </p>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-700">
                <h4 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">Human Approval</h4>
                <p className="text-gray-600 dark:text-gray-300">
                    For any write operation (Act), the agent must send a message to Slack: "I want to restart service X. Approve?"
                </p>
            </div>
        </div>
      </section>

      {/* Building the Agent */}
      <section id="code-agent" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Building the Agent (Node.js)
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            This is a simplified webhook handler that acts as our AI DevOps Engineer.
        </p>

        <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-gray-400 text-sm">agent.ts (Node.js)</span>
            </div>
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
{`import express from 'express';
import { ChatOpenAI } from "@langchain/openai";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { Tool } from "langchain/tools";
import { exec } from 'child_process';

const app = express();
app.use(express.json());

// Define a Custom Tool for Kubectl
class KubectlLogsTool extends Tool {
  name = "kubectl_logs";
  description = "Get logs for a pod. Input should be pod name.";
  async _call(podName: string) {
    return new Promise((resolve) => {
        exec(\`kubectl logs \${podName} --tail=50\`, (error, stdout) => {
            resolve(stdout || "No logs found or error.");
        });
    });
  }
}

app.post('/webhook/alertmanager', async (req, res) => {
  const alert = req.body.alerts[0];
  const podName = alert.labels.pod;

  const model = new ChatOpenAI({ temperature: 0 });
  const tools = [new KubectlLogsTool()];

  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "openai-functions",
  });

  const prompt = \`
    Alert received for pod \${podName}.
    The error is: \${alert.annotations.description}.
    1. Get the logs.
    2. Analyze the root cause.
    3. Suggest a fix.
  \`;

  const result = await executor.run(prompt);

  // Send result to Slack (omitted)
  console.log("AI Investigation Result:", result);

  res.sendStatus(200);
});`}
            </pre>
        </div>
      </section>

      {/* Observability Hooks */}
      <section id="code-spring" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Observability Hooks (Spring Boot)
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            For the AI to understand the application, the app must expose deep diagnostics. Standard Actuator health checks aren&apos;t enough. We need a &quot;Diagnostic Endpoint&quot; designed for LLMs.
        </p>

        <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
             <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-gray-400 text-sm">DiagnosticController.java</span>
            </div>
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
{`@RestController
public class DiagnosticController {

    @Autowired
    private DataSource dataSource;

    @GetMapping("/internal/diagnose")
    public Map<String, Object> getDiagnostics() {
        Map<String, Object> status = new HashMap<>();

        // 1. DB Connection Pool Status
        if (dataSource instanceof HikariDataSource) {
            HikariPoolMXBean pool = ((HikariDataSource) dataSource).getHikariPoolMXBean();
            status.put("db_active_connections", pool.getActiveConnections());
            status.put("db_threads_awaiting", pool.getThreadsAwaitingConnection());
        }

        // 2. Memory Usage
        status.put("heap_used", Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory());

        // 3. Last 5 Exceptions (from a memory buffer)
        status.put("recent_errors", ErrorBuffer.getLatest());

        return status;
    }
}`}
            </pre>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Interactive Incident Workflow
        </h2>
        <div className="relative border-l-4 border-gray-200 dark:border-gray-700 ml-4 pl-8 space-y-10">
            <div className="relative">
                <span className="absolute -left-12 top-0 bg-red-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">1</span>
                <h4 className="font-bold text-lg">Alert Fired</h4>
                <p className="text-gray-600 dark:text-gray-400">Prometheus detects high latency.</p>
            </div>
             <div className="relative">
                <span className="absolute -left-12 top-0 bg-purple-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">2</span>
                <h4 className="font-bold text-lg">Agent Investigates</h4>
                <p className="text-gray-600 dark:text-gray-400">Agent queries `/internal/diagnose` and sees &quot;db_threads_awaiting: 50&quot;.</p>
            </div>
             <div className="relative">
                <span className="absolute -left-12 top-0 bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">3</span>
                <h4 className="font-bold text-lg">Hypothesis</h4>
                <p className="text-gray-600 dark:text-gray-400">Agent hypothesizes: &quot;Connection pool exhaustion due to slow query.&quot;</p>
            </div>
             <div className="relative">
                <span className="absolute -left-12 top-0 bg-green-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">4</span>
                <h4 className="font-bold text-lg">Remediation</h4>
                <p className="text-gray-600 dark:text-gray-400">Agent scales up the ReplicaSet to handle load OR restarts the pod (if configured).</p>
            </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Conclusion</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            AI-Native DevOps is not about replacing SREs; it&apos;s about giving them superpowers. By offloading the &quot;investigation&quot; phase to an AI, humans can focus on the &quot;architecture&quot; phase, building systems that are resilient by design.
        </p>
      </section>

    </article>
  );
}
