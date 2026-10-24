import { InterviewGeneratorClient } from './components/InterviewGeneratorClient';

export default function InterviewGeneratorPage() {
  return (
    <div className="min-h-screen bg-black text-purple-100 pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-100 to-purple-200">
            AI Interview Question Generator
          </h1>
          <p className="text-xl text-purple-200/50 mb-4 max-w-3xl mx-auto">
            Generate role-specific technical interview questions in seconds using advanced AI.
            Tailored for your tech stack and experience level.
          </p>
        </div>

        <InterviewGeneratorClient />

        <article className="mt-24 prose prose-invert prose-lg max-w-4xl mx-auto text-purple-200/80">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-purple-100 to-purple-200 mb-8">
            The Ultimate Guide to AI-Powered Technical Interview Generation
          </h1>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-purple-100 mb-6">What is a Technical Interview?</h2>
            <p>
              A technical interview is a specialized recruitment process designed to rigorously assess a candidate's engineering skills, problem-solving abilities, and domain-specific knowledge. Unlike behavioral interviews that focus primarily on soft skills and past experiences, technical interviews require candidates to demonstrate their competency in real-time through practical exercises.
            </p>
            <p>
              The core components of a comprehensive technical interview typically include coding challenges, system design discussions, behavioral assessments, and domain-specific knowledge probes. Coding challenges evaluate a candidate's grasp of data structures and algorithms, requiring them to write clean, efficient, and bug-free code. System design interviews, often reserved for more senior roles, test the ability to architect scalable, reliable, and maintainable software systems.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-purple-100 mb-6">Why Use an AI Interview Question Generator?</h2>
            <p>
              For hiring managers, technical recruiters, and engineering leads, the process of creating high-quality interview questions is fraught with challenges. Manually maintaining a question bank is time-consuming and prone to stagnation.
            </p>
            <p>
              This is where an AI Interview Question Generator becomes a transformative tool. By leveraging advanced Large Language Models (LLMs) like Gemini, hiring teams can instantly generate an infinite supply of unique, role-specific questions tailored to the exact requirements of an open position.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-purple-200/70">
              <li><strong className="text-purple-100">Elimination of Stale Questions:</strong> Every generated question is fresh.</li>
              <li><strong className="text-purple-100">Consistency and Fairness:</strong> Standardized evaluation process reduces bias.</li>
              <li><strong className="text-purple-100">Role Specificity:</strong> Scenarios relevant to the specific tech stack.</li>
              <li><strong className="text-purple-100">Time Efficiency:</strong> Preparation done in seconds.</li>
              <li><strong className="text-purple-100">Comprehensive Evaluation Guides:</strong> Includes solution guides and grading criteria.</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-purple-100 mb-6">How Our AI Interview Generator Works</h2>

            <h3 className="text-2xl font-semibold text-purple-200 mb-4 mt-6">Step 1: Configure Interview Parameters</h3>
            <p>
              The user interface allows for granular control over the generated content. You start by selecting the target role, experience level, and specific technology stack.
            </p>

            <h3 className="text-2xl font-semibold text-purple-200 mb-4 mt-6">Step 2: AI Analysis and Contextual Generation</h3>
            <p>
              Once the parameters are submitted, our system constructs a complex prompt that instructs the AI model to adopt the persona of an expert technical interviewer. The AI analyzes the requirements to understand the nuances of the role.
            </p>

            <h3 className="text-2xl font-semibold text-purple-200 mb-4 mt-6">Step 3: Review, Filter, and Customize</h3>
            <p>
              The generated questions are presented in an interactive dashboard. Users can view questions in a list or card format, complete with metadata such as difficulty level and estimated time.
            </p>

            <h3 className="text-2xl font-semibold text-purple-200 mb-4 mt-6">Step 4: Export and Conduct Interview</h3>
            <p>
              Finally, the tool supports various export options including PDF, Markdown, and JSON. Each export includes the questions and a hidden "Interviewer's Guide" with solutions.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-purple-100 mb-6">Types of Interview Questions Generated</h2>

            <h3 className="text-2xl font-semibold text-purple-200 mb-4">Coding Problems (30-40%)</h3>
            <p>
              Coding problems remain the cornerstone of technical assessment. Our tool generates problems that test fundamental computer science concepts.
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4 text-purple-200/70">
              <li><strong>Data Structures:</strong> Arrays, linked lists, trees, graphs, hashmaps.</li>
              <li><strong>Algorithms:</strong> Sorting, searching, recursion, dynamic programming.</li>
              <li><strong>Practical Scripting:</strong> File manipulation, API data processing.</li>
            </ul>

            <h3 className="text-2xl font-semibold text-purple-200 mb-4">System Design Questions (20-30%)</h3>
            <p>
              System design interviews are critical for assessing senior candidates on designing complex, scalable systems.
            </p>

            <h3 className="text-2xl font-semibold text-purple-200 mb-4">Behavioral Questions (15-20%)</h3>
            <p>
              Behavioral questions assess how a candidate navigates team dynamics, handles pressure, and learns from failure using the STAR method.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-purple-100 mb-6">Question Difficulty Levels Explained</h2>

            <div className="space-y-6">
              <div className="bg-purple-900/10 p-6 rounded-lg border border-purple-500/20">
                <h3 className="text-xl font-bold text-green-400 mb-2">Easy (Junior Level)</h3>
                <p className="text-purple-200/80">
                  Targeted at candidates with 0-2 years of experience. Focus on core competency and basic constructs.
                  <br/><strong>Examples:</strong> String manipulation, basic array operations.
                </p>
              </div>
              <div className="bg-purple-900/10 p-6 rounded-lg border border-purple-500/20">
                <h3 className="text-xl font-bold text-blue-400 mb-2">Medium (Mid-Level)</h3>
                <p className="text-purple-200/80">
                  Targeted at candidates with 2-5 years of experience. Require understanding of data structures and efficiency.
                  <br/><strong>Examples:</strong> Tree traversals, database schema design.
                </p>
              </div>
              <div className="bg-purple-900/10 p-6 rounded-lg border border-purple-500/20">
                <h3 className="text-xl font-bold text-orange-400 mb-2">Hard (Senior Level)</h3>
                <p className="text-purple-200/80">
                  Targeted at candidates with 5-8 years of experience. Involve complex optimization and distributed systems.
                  <br/><strong>Examples:</strong> Advanced dynamic programming, graph algorithms.
                </p>
              </div>
              <div className="bg-purple-900/10 p-6 rounded-lg border border-purple-500/20">
                <h3 className="text-xl font-bold text-red-400 mb-2">Expert (Principal/Staff Level)</h3>
                <p className="text-purple-200/80">
                  Targeted at candidates with 8+ years of experience. Open-ended, ambiguous problems.
                  <br/><strong>Examples:</strong> Designing global streaming platforms, technical strategy.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-purple-900/5 p-8 rounded-xl border border-purple-500/10">
            <h2 className="text-3xl font-bold text-purple-100 mb-6">Frequently Asked Questions</h2>

            <div className="space-y-8">
              <div>
                  <h4 className="text-xl font-bold text-purple-200 mb-2">How many questions should I generate?</h4>
                  <p className="text-purple-200/70">
                      We recommend generating 5-7 questions to allow for flexibility in a standard 1-hour interview.
                  </p>
              </div>
              <div>
                  <h4 className="text-xl font-bold text-purple-200 mb-2">Are the solutions provided by the AI guaranteed to be correct?</h4>
                  <p className="text-purple-200/70">
                      They are generally highly accurate, but we strongly recommend reviewing them before the interview.
                  </p>
              </div>
              <div>
                  <h4 className="text-xl font-bold text-purple-200 mb-2">Can I save the generated questions?</h4>
                  <p className="text-purple-200/70">
                      Yes, you can export your generated question set to PDF, Markdown, or JSON.
                  </p>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
