'use client';
import { useTheme } from '@/components/providers/ThemeProvider';
import JsonLdArticle from '@/components/JsonLdArticle';

export default function MultiAgentSystemsBlog() {
  const { currentTheme: theme } = useTheme();
  return (
    <article className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-20">
      <JsonLdArticle
        headline="Mastering Multi-Agent Systems: Orchestrating AI Swarms with LangGraph and CrewAI"
        description="Deep dive into building multi-agent AI systems where agents collaborate, plan, and execute complex workflows using LangGraph and CrewAI frameworks."
        datePublished="2025-12-13"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/mastering-multi-agent-systems-langgraph-crewai"
      />

      {/* Hero Section */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          Mastering Multi-Agent Systems: Orchestrating AI Swarms with LangGraph and CrewAI
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <span>📅 December 13, 2025</span>
          <span>⏱️ 26 min read</span>
          <span>🏷️ AI Agents</span>
        </div>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          The single-agent era is over. While a single GPT-4 instance is powerful, it has limits. The real breakthrough in 2025 is <strong>Multi-Agent Systems (MAS)</strong>—architectures where specialized AI agents collaborate, critique each other's work, and orchestrate complex workflows that no single model could handle alone. In this deep dive, we'll master the art of AI orchestration using LangGraph and CrewAI to build swarms that code, research, and solve problems autonomously.
        </p>
      </header>

      {/* Quick Navigation */}
      <nav className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 mb-12 border-l-4 border-purple-600">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Quick Navigation</h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#why-multi-agent" className="text-purple-600 dark:text-purple-400 hover:underline">Why Single Agents Fail & Swarms Succeed</a></li>
          <li><a href="#architecture" className="text-purple-600 dark:text-purple-400 hover:underline">The Architecture of a Swarm</a></li>
          <li><a href="#langgraph-deep-dive" className="text-purple-600 dark:text-purple-400 hover:underline">Deep Dive: LangGraph Orchestration</a></li>
          <li><a href="#crewai-implementation" className="text-purple-600 dark:text-purple-400 hover:underline">Building a Research Team with CrewAI</a></li>
          <li><a href="#spring-boot-integration" className="text-purple-600 dark:text-purple-400 hover:underline">Enterprise Integration: Spring Boot & Java Agents</a></li>
          <li><a href="#security" className="text-purple-600 dark:text-purple-400 hover:underline">Security Guardrails for Autonomous Swarms</a></li>
          <li><a href="#future" className="text-purple-600 dark:text-purple-400 hover:underline">The Future of Multi-Agent AI</a></li>
        </ul>
      </nav>

      {/* Why Multi-Agent Section */}
      <section id="why-multi-agent" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Why Single Agents Fail & Swarms Succeed
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Imagine asking a single junior developer to design a system architecture, write the backend code, build the frontend, deploy the infrastructure, and write the marketing copy. They might produce something, but it will likely be mediocre at best.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          LLMs work the same way. When you force a single prompt context to handle diverse tasks, performance degrades due to context drift and lack of specialization. <strong>Multi-Agent Systems</strong> solve this by mimicking human organizations: we break complex problems into sub-tasks and assign them to specialized "workers."
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mb-6 border-l-4 border-blue-600">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">The Power of Specialization</h3>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">▸</span>
              <span><strong>Role-Based Prompting:</strong> "You are a senior Python engineer" yields better code than "You are a helpful assistant."</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">▸</span>
              <span><strong>Context Isolation:</strong> Each agent only sees the information relevant to its specific task, reducing hallucinations.</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">▸</span>
              <span><strong>Self-Correction:</strong> A "Critic" agent can review the work of a "Writer" agent and request revisions before the user ever sees the output.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          The Architecture of a Swarm
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Building a multi-agent system isn't just about spawning multiple LLM calls. It's about <strong>orchestration</strong>. How do agents talk to each other? Who decides what to do next?
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">Key Patterns</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-xl font-bold text-purple-600 mb-2">Sequential Handoffs</h4>
                <p className="text-gray-600 dark:text-gray-300">Agent A completes a task and passes the output to Agent B. Classic assembly line.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-xl font-bold text-purple-600 mb-2">Hierarchical (Boss-Worker)</h4>
                <p className="text-gray-600 dark:text-gray-300">A "Manager" agent breaks down a goal and assigns sub-tasks to "Worker" agents.</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-xl font-bold text-purple-600 mb-2">Joint Collaboration</h4>
                <p className="text-gray-600 dark:text-gray-300">Agents debate and refine a shared state until a consensus is reached.</p>
            </div>
             <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-xl font-bold text-purple-600 mb-2">Dynamic Routing</h4>
                <p className="text-gray-600 dark:text-gray-300">A "Router" agent analyzes the input and decides which expert agent is best suited to handle it.</p>
            </div>
        </div>
      </section>

      {/* LangGraph Deep Dive */}
      <section id="langgraph-deep-dive" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Deep Dive: LangGraph Orchestration
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          LangChain is great, but for loops and cycles (essential for agentic behaviors), we need <strong>LangGraph</strong>. It treats your agent workflow as a graph where nodes are agents/tools and edges are the control flow.
        </p>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">Building a Code Review Graph</h3>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Let's build a system where a Junior Coder writes code, and a Senior Reviewer critiques it. If the review fails, it loops back to the coder.
        </p>

        <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-gray-400 text-sm">Next.js / TypeScript (LangGraph)</span>
            </div>
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
{`import { StateGraph, END } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, BaseMessage } from "@langchain/core/messages";

// 1. Define the State
interface AgentState {
  messages: BaseMessage[];
  code: string | null;
  feedback: string | null;
  iterations: number;
}

// 2. Define the Nodes (Agents)
const model = new ChatOpenAI({ modelName: "gpt-4-turbo" });

async function juniorCoder(state: AgentState) {
  const { messages, feedback, code } = state;
  let prompt = "Write a Python function to calculate Fibonacci numbers.";

  if (feedback) {
    prompt += \`\n\nPrevious code: \${code}\nReviewer feedback: \${feedback}\nPlease fix the code.\`;
  }

  const response = await model.invoke([new HumanMessage(prompt)]);
  return {
    code: response.content as string,
    iterations: state.iterations + 1
  };
}

async function seniorReviewer(state: AgentState) {
  const { code } = state;
  const prompt = \`Review this code for efficiency and style:\n\${code}\n
  If it's good, say "APPROVED". Otherwise, provide critique.\`;

  const response = await model.invoke([new HumanMessage(prompt)]);
  const content = response.content as string;

  return {
    feedback: content
  };
}

// 3. Define the Router (Conditional Edge)
function shouldContinue(state: AgentState) {
  if (state.feedback?.includes("APPROVED") || state.iterations > 3) {
    return "end";
  }
  return "retry";
}

// 4. Build the Graph
const workflow = new StateGraph<AgentState>({
  channels: {
    messages: { value: (x, y) => x.concat(y), default: () => [] },
    code: { value: (x, y) => y ?? x, default: () => null },
    feedback: { value: (x, y) => y ?? x, default: () => null },
    iterations: { value: (x, y) => y ?? x, default: () => 0 },
  }
});

workflow.addNode("coder", juniorCoder);
workflow.addNode("reviewer", seniorReviewer);

workflow.setEntryPoint("coder");
workflow.addEdge("coder", "reviewer");
workflow.addConditionalEdges(
  "reviewer",
  shouldContinue,
  {
    end: END,
    retry: "coder"
  }
);

export const app = workflow.compile();`}
            </pre>
        </div>
      </section>

      {/* CrewAI Implementation */}
      <section id="crewai-implementation" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Building a Research Team with CrewAI
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            CrewAI operates at a higher abstraction level, focusing on "Role-Playing." You define agents with backstories and goals, and CrewAI manages the delegation. It's incredibly intuitive for simulating human teams.
        </p>

        <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-gray-400 text-sm">Python (CrewAI)</span>
            </div>
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
{`from crewai import Agent, Task, Crew, Process
from langchain_community.tools import DuckDuckGoSearchRun

search_tool = DuckDuckGoSearchRun()

# 1. Define Agents
researcher = Agent(
  role='Senior Tech Researcher',
  goal='Uncover groundbreaking developments in AI Agents',
  backstory="""You are a veteran tech analyst with a knack for
  finding hidden gems in academic papers and GitHub repos.""",
  verbose=True,
  allow_delegation=False,
  tools=[search_tool]
)

writer = Agent(
  role='Tech Content Strategist',
  goal='Craft compelling content on tech advancements',
  backstory="""You are a famous tech blogger known for simplifying
  complex topics for a general audience.""",
  verbose=True,
  allow_delegation=True
)

# 2. Define Tasks
task1 = Task(
  description='Conduct a comprehensive analysis of the latest AI Agent frameworks in 2025.',
  agent=researcher,
  expected_output='A detailed report summarizing key frameworks like LangGraph and AutoGen.'
)

task2 = Task(
  description='Using the insights provided, write an engaging blog post about the future of AI Agents.',
  agent=writer,
  expected_output='A 1500-word blog post in markdown format.'
)

# 3. Form the Crew
crew = Crew(
  agents=[researcher, writer],
  tasks=[task1, task2],
  process=Process.sequential  # Execution flow
)

result = crew.kickoff()`}
            </pre>
        </div>
      </section>

      {/* Spring Boot Integration */}
      <section id="spring-boot-integration" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Enterprise Integration: Spring Boot & Java Agents
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          While Python dominates the AI research space, the Enterprise runs on Java. With <strong>Spring AI</strong> and <strong>LangChain4j</strong>, we can build robust, production-grade agents directly in our Spring Boot backend.
        </p>

        <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                <span className="text-gray-400 text-sm">Java (Spring Boot + LangChain4j)</span>
            </div>
            <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
{`@Service
public class EnterpriseAgentService {

    interface Assistant {
        @SystemMessage("You are a helpful banking assistant. Today is {{current_date}}.")
        String chat(@UserMessage String userMessage);
    }

    private final Assistant assistant;

    public EnterpriseAgentService(ChatLanguageModel chatLanguageModel) {
        this.assistant = AiServices.builder(Assistant.class)
                .chatLanguageModel(chatLanguageModel)
                .tools(new BankingTools()) // Register Java methods as tools
                .build();
    }

    public String processUserRequest(String userId, String request) {
        // In a real app, you'd load conversation history from a DB here
        return assistant.chat(request);
    }
}

// Define Tools that the Agent can call
public class BankingTools {

    @Tool("Check the account balance for a specific customer")
    public double getBalance(String customerId) {
        // Logic to query mainframe/database
        return 5000.00;
    }

    @Tool("Transfer money between accounts")
    public String transfer(String fromId, String toId, double amount) {
        // Transactional logic
        return "Transferred " + amount + " success.";
    }
}`}
            </pre>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Security Guardrails for Autonomous Swarms
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Giving agents the ability to execute code and call APIs is powerful but dangerous. An unchecked agent could accidentally delete a production database or leak sensitive data.
        </p>

        <div className="space-y-4 mb-6">
          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border-l-4 border-red-600">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">1. Human-in-the-Loop (HITL)</h4>
            <p className="text-gray-700 dark:text-gray-300">
              Never let an agent execute "consequential" actions (like sending money or deleting files) without explicit human approval. LangGraph's <code>interrupt</code> feature allows you to pause the graph state and wait for user input before proceeding.
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border-l-4 border-red-600">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">2. Scoped Permissions (Least Privilege)</h4>
            <p className="text-gray-700 dark:text-gray-300">
              When creating API keys for your agents, grant only the bare minimum permissions. If an agent only needs to read data, do not give it write access. Use ephemeral tokens that expire quickly.
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border-l-4 border-red-600">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">3. Output Validation</h4>
            <p className="text-gray-700 dark:text-gray-300">
               Always sanitize and validate the output from an LLM before executing it as code or SQL. Use parsers (like Pydantic or Zod) to enforce structure and constraints on the agent's response.
            </p>
          </div>
        </div>
      </section>

      {/* Future Section */}
      <section id="future" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          The Future of Multi-Agent AI
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          We are moving towards an "Internet of Agents." Soon, your personal shopping agent will negotiate directly with Amazon's sales agent. Developers won't just write code; they will be the managers of AI engineering teams.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            The tools we covered today—LangGraph, CrewAI, and Spring AI—are the building blocks of this future. Mastering them now puts you ahead of 99% of the industry.
        </p>
      </section>

    </article>
  );
}
