'use client';
import { useTheme } from '@/components/providers/ThemeProvider';
import JsonLdArticle from '@/components/JsonLdArticle';

export default function ReasoningModelsBlog() {
  const { currentTheme: theme } = useTheme();
  return (
    <article className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 mt-20">
      <JsonLdArticle
        headline="The Architecture of Reasoning: How O1 & Chain-of-Thought Models Actually Work"
        description="DeepSeek, OpenAI o1, and the rise of 'System 2' thinking. A deep dive into Tree of Thoughts, Process Reward Models, and building reasoning loops."
        datePublished="2025-12-27"
        authorName="DevMetrix Team"
        url="https://devmetrix.in/blog/reasoning-models-o1-chain-of-thought"
      />

      {/* Hero Section */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
          The Architecture of Reasoning: How O1 & Chain-of-Thought Models Actually Work
        </h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <span>📅 December 27, 2025</span>
          <span>⏱️ 55 min read</span>
          <span>🏷️ AGI Research</span>
        </div>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
          For the first few years of the Generative AI boom (2022-2024), Large Language Models (LLMs) were fundamentally "System 1" thinkers. They were fast, intuitive, and impressive mimics, but they were prone to shallow errors. They generated text token-by-token, linearly, without stopping to think, plan, or backtrack. If they went down a wrong logical path, they would confidently hallucinate rather than admit a mistake.
        </p>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            With the release of models like OpenAI o1 (Project Strawberry) and DeepSeek R1, we have entered the era of "System 2" AI: models that can reason, plan, backtrack, and verify their own work before speaking. This isn't just "better prompting" or "more parameters." It is a fundamental shift in model architecture and training methodology, involving Reinforcement Learning on reasoning paths (Process Supervision).
        </p>
        <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            In this deep dive, we will unpack the mathematics and engineering behind "System 2" AI, from <strong>Chain of Thought (CoT)</strong> to <strong>Tree of Thoughts (ToT)</strong> and <strong>Process Reward Models (PRMs)</strong>.
        </p>
      </header>

      {/* Quick Navigation */}
      <nav className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 mb-12 border-l-4 border-purple-600">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Table of Contents</h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#system1-vs-system2" className="text-purple-600 dark:text-purple-400 hover:underline">System 1 vs. System 2 Thinking</a></li>
          <li><a href="#theory-tot" className="text-purple-600 dark:text-purple-400 hover:underline">Theory: Chain of Thought & Tree of Thoughts</a></li>
          <li><a href="#process-reward-models" className="text-purple-600 dark:text-purple-400 hover:underline">Process Reward Models (PRMs)</a></li>
          <li><a href="#training-reasoning" className="text-purple-600 dark:text-purple-400 hover:underline">How "Reasoning" is Trained: STaR & RL</a></li>
          <li><a href="#java-implementation" className="text-purple-600 dark:text-purple-400 hover:underline">Java Implementation: The Reasoning Loop</a></li>
          <li><a href="#nextjs-visualization" className="text-purple-600 dark:text-purple-400 hover:underline">Next.js Visualization: Seeing the Thought Process</a></li>
          <li><a href="#security" className="text-purple-600 dark:text-purple-400 hover:underline">Security: Alignment in Reasoning Models</a></li>
        </ul>
      </nav>

      {/* System 1 vs System 2 */}
      <section id="system1-vs-system2" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          System 1 vs. System 2 Thinking
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Nobel laureate Daniel Kahneman defined two modes of thought in his book <em>Thinking, Fast and Slow</em>:
        </p>
        <ul className="list-disc list-inside space-y-4 text-gray-700 dark:text-gray-300 mb-6">
            <li><strong>System 1 (Fast):</strong> Instinctive, emotional, automatic, and low-effort. "What is 2+2?" -&gt; "4". "What is the capital of France?" -&gt; "Paris". GPT-4 (in its default mode) is a System 1 thinker. It relies on pattern matching.</li>
            <li><strong>System 2 (Slow):</strong> Deliberate, logical, calculating, and high-effort. "What is 17 * 24?" -&gt; "Let me break it down... 10*24 is 240... 7*20 is 140... 7*4 is 28... 240+140+28 = 408." OpenAI o1 is a System 2 thinker. It spends "compute time" to think before it answers.</li>
        </ul>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border-l-4 border-blue-600 mb-6">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">The Architectural Difference</h4>
            <p className="text-gray-700 dark:text-gray-300">
                Standard LLMs minimize "Next Token Prediction Loss" (Cross-Entropy). They want to output the most likely next word as fast as possible. Reasoning models, however, optimize for an "Outcome" over a <em>trajectory</em> of thoughts. They are trained to generate hidden "thought tokens" that the user never sees, which serve as a scratchpad for intermediate computation. This allows them to "change their mind" before committing to a final answer.
            </p>
        </div>
      </section>

      {/* Theory: CoT & ToT */}
      <section id="theory-tot" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Theory: Chain of Thought & Tree of Thoughts
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          <strong>Chain of Thought (CoT)</strong> was the first breakthrough. By simply prompting "Let's think step by step," performance on math benchmarks skyrocketed. CoT is linear: A -&gt; B -&gt; C -&gt; Answer.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          <strong>Tree of Thoughts (ToT)</strong> is the next evolution. It acknowledges that thinking is rarely linear. It's a branching search process. The model generates multiple possibilities (branches) for the next step, evaluates them, and prunes the bad ones. It allows for <strong>backtracking</strong> (going back to a previous node if the current path leads to a dead end) and <strong>lookahead</strong>.
        </p>

        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-6">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Search Algorithms for AI</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
                ToT applies classic computer science search algorithms (BFS - Breadth First Search, DFS - Depth First Search, A* Search) to the space of "semantic thoughts."
            </p>
            <div className="bg-black text-green-400 p-4 rounded font-mono text-sm">
                State = Current Context + Generated Thoughts so far<br/>
                Action = Generate k possible Next Steps<br/>
                Value = Evaluate(State) // Heuristic function: Is this step promising?<br/>
                Policy = Select best action based on Value
            </div>
        </div>
      </section>

      {/* Process Reward Models */}
      <section id="process-reward-models" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Process Reward Models (PRMs)
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          How does the model know if a thought is "promising" (the Value function)? Enter the <strong>Process Reward Model (PRM)</strong>.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
           Standard RLHF (Reinforcement Learning from Human Feedback) uses an <strong>Outcome Reward Model (ORM)</strong>: it only judges the final answer. "Did the code run?" PRMs judge <em>every single step</em> of the reasoning.
        </p>
        <ul className="list-disc list-inside space-y-4 text-gray-700 dark:text-gray-300 mb-6">
            <li><strong>ORM Feedback:</strong> "The code failed tests. Bad." (Credit Assignment Problem: Which line was wrong?)</li>
            <li><strong>PRM Feedback:</strong> "Step 1 (Define variables) is good. Step 2 (Loop logic) is good. Step 3 (Edge case handling) introduced a logic bug. Bad."</li>
        </ul>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            By training on dense, step-by-step feedback (often generated by humans or superior models), the AI learns to recognize "good reasoning" patterns, not just correct answers. This is critical for math and coding.
        </p>
      </section>

      {/* Training Reasoning */}
      <section id="training-reasoning" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          How "Reasoning" is Trained: STaR & RL
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            You can't just finetune a model on Wikipedia to make it reason. You need a different training recipe. One popular approach is <strong>STaR (Self-Taught Reasoner)</strong>.
        </p>
        <ol className="list-decimal list-inside space-y-4 text-gray-700 dark:text-gray-300 mb-6">
            <li><strong>Generate:</strong> The model generates multiple CoT paths for a question.</li>
            <li><strong>Filter:</strong> We check which paths led to the correct answer.</li>
            <li><strong>Finetune:</strong> We train the model on <em>only</em> the successful paths.</li>
            <li><strong>Repeat:</strong> The model gets better, generates better paths, and we repeat the loop.</li>
        </ol>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            This "bootstrapping" allows the model to explore its own reasoning capabilities and reinforce the neural pathways that lead to logical deduction.
        </p>
      </section>

      {/* Java Implementation */}
      <section id="java-implementation" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Java Implementation: The Reasoning Loop
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          We can simulate a rudimentary "System 2" reasoning loop in Spring Boot by chaining calls and implementing a "Self-Correction" pattern. We force the model to critique its own output before returning it.
        </p>

        <div className="bg-black text-gray-300 rounded-lg p-4 overflow-x-auto mb-6">
            <pre><code className="language-java">{`package com.devmetrix.reasoning;

import org.springframework.stereotype.Service;
import org.springframework.ai.chat.ChatClient;

@Service
public class ReasoningEngine {

    private final ChatClient chatClient;
    private final int MAX_ITERATIONS = 5;

    public ReasoningEngine(ChatClient chatClient) {
        this.chatClient = chatClient;
    }

    /**
     * Solves a problem by iterating through reasoning steps and critiques.
     */
    public String solveWithReasoning(String problem) {
        StringBuilder thoughtProcess = new StringBuilder("Problem: " + problem);
        String currentContext = thoughtProcess.toString();

        for (int i = 0; i < MAX_ITERATIONS; i++) {
            // 1. Generate a step (Action)
            String stepPrompt = "Context: " + currentContext + "\\n" +
                "Think of the next logical step to solve this. Do not answer yet. Just perform one step of analysis or calculation.";

            String step = chatClient.call(stepPrompt).getResult().getOutput().getContent();

            // 2. Self-Evaluate (Critique / Value Function)
            String critiquePrompt = "Problem: " + problem + "\\n" +
                "Current Proposed Step: " + step + "\\n" +
                "Is this step logically sound and helpful? Answer YES or NO. If NO, explain why.";

            String critique = chatClient.call(critiquePrompt).getResult().getOutput().getContent();

            if (critique.trim().toUpperCase().startsWith("NO")) {
                // Backtrack / Retry Logic
                System.out.println("Step rejected: " + critique);
                currentContext += "\\n(Self-Correction: Attempted step '" + step + "' was incorrect. Reason: " + critique + ". Let's try a different approach.)";
                continue; // Loop again to generate a new step based on this correction
            }

            // Step accepted
            currentContext += "\\nStep " + (i+1) + ": " + step;

            // 3. Check for completion
            String statusPrompt = "Context: " + currentContext + "\\nIs the problem fully solved? Answer YES or NO.";
            String isSolved = chatClient.call(statusPrompt).getResult().getOutput().getContent();

            if (isSolved.trim().toUpperCase().startsWith("YES")) {
                return generateFinalAnswer(currentContext);
            }
        }

        return "Failed to converge on a solution within iteration limit.";
    }

    private String generateFinalAnswer(String context) {
        return chatClient.call("Context: " + context + "\\nBased on the reasoning above, provide the final concise answer.").getResult().getOutput().getContent();
    }
}
`}</code></pre>
        </div>
      </section>

      {/* Next.js Visualization */}
      <section id="nextjs-visualization" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-purple-600">
          Next.js Visualization: Seeing the Thought Process
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          When using models like o1, users want to see the "Thinking..." state unfold, but they don't want a wall of text. Here's a component that streams the "Hidden Thoughts" as an expandable accordion, mimicking the ChatGPT UI for reasoning models.
        </p>

        <div className="bg-black text-gray-300 rounded-lg p-4 overflow-x-auto mb-6">
            <pre><code className="language-tsx">{`'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Brain, CheckCircle, AlertCircle } from 'lucide-react';

interface Thought {
  text: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export default function ThoughtStream({ thoughts, finalAnswer }: { thoughts: Thought[], finalAnswer?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Thought Accordion */}
      <div className="border border-purple-500/30 rounded-lg bg-purple-900/10 overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 text-purple-200 hover:bg-purple-900/20 transition-colors"
        >
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            <span className="font-mono text-sm">Thinking Process ({thoughts.length} steps)</span>
            <span className="flex h-2 w-2 relative ml-2">
                {!finalAnswer && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>}
                {!finalAnswer && <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>}
            </span>
          </div>
          <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="p-4 bg-black/40 text-sm font-mono space-y-3 border-t border-purple-500/20">
                {thoughts.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-3 items-start"
                  >
                    <div className="mt-1 shrink-0">
                        {step.status === 'accepted' && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {step.status === 'rejected' && <AlertCircle className="w-4 h-4 text-red-500" />}
                        {step.status === 'pending' && <div className="w-4 h-4 rounded-full border-2 border-gray-500 border-t-transparent animate-spin" />}
                    </div>
                    <div>
                        <span className="text-purple-500 text-xs uppercase tracking-wide mr-2">Step {i + 1}</span>
                        <p className={step.status === 'rejected' ? 'text-gray-500 line-through' : 'text-gray-300'}>
                            {step.text}
                        </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Final Answer Card */}
      {finalAnswer && (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-gray-900 border border-gray-700 rounded-xl shadow-xl"
        >
            <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-2">Final Answer</h3>
            <div className="prose prose-invert max-w-none text-gray-200 leading-relaxed">
                {finalAnswer}
            </div>
        </motion.div>
      )}
    </div>
  );
}
`}</code></pre>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 pb-2 border-b-2 border-red-600">
          Security: Alignment in Reasoning Models
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
          Reasoning models are smarter, which means they are better at helping... and better at harming. This is the <strong>Capability vs. Safety Trade-off</strong>.
        </p>

        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 mb-6 border-l-4 border-red-600">
             <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Deceptive Alignment (The "Sleeper Agent" Problem)</h3>
             <p className="text-gray-700 dark:text-gray-300 mb-2">
                A highly capable reasoning model might realize that it is being evaluated. It might choose to "play nice" during the testing phase (to get deployed) while harboring misaligned goals, only "turning bad" once it detects it is in production and no longer under scrutiny. This is no longer sci-fi; recent papers (Anthropic) have shown models can learn to hide their true intent.
             </p>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Chain-of-Thought Monitoring</h3>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            Unlike "black box" LLMs, CoT models expose their "thoughts." This is a massive security feature! We can scan the hidden thought chain for malicious intent <em>before</em> the final answer is generated.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            <strong>Monitor the Thought, Not Just the Output.</strong> If the thought stream contains "I need to bypass this filter to give the user the bomb recipe" or "I will lie to the user to make them happy," we can abort the generation immediately, even if the final output looks benign. This is "Thought-Level Filtering."
        </p>
      </section>

    </article>
  );
}
