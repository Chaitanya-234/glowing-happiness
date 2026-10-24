import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Career Path Generator | Learn Skills from Job Postings | DevMetrix',
  description: 'Free AI-powered career path generator. Paste any job description, get personalized learning roadmap with week-by-week plans, resources, and portfolio projects. Compare your skills, identify gaps, and become job-ready in weeks.',
  keywords: [
    'career path generator',
    'learning path generator',
    'job skill analyzer',
    'ai career planner',
    'developer roadmap',
    'skill gap analysis',
    'learn from job description',
    'job requirements analyzer',
    'career transition planner',
    'upskill for job',
    'reskill developer',
    'job readiness tool'
  ],
  openGraph: {
    title: "AI Career Path Generator - Learn Any Job's Required Skills",
    description: "Paste a job posting, get a personalized 12-16 week learning roadmap. AI analyzes required skills, compares to yours, creates week-by-week study plan with resources and portfolio projects.",
    type: 'website',
    url: 'https://devmetrix.com/tools/career-path-generator',
    siteName: 'DevMetrix',
  },
  twitter: {
    card: 'summary_large_image',
    title: "AI Career Path Generator | DevMetrix",
    description: "Transform job postings into personalized learning roadmaps. Skill gap analysis + resources + projects. Free.",
    creator: '@devmetrix',
  }
};

export default function CareerPathLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}

      {/* SEO Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12 prose dark:prose-invert">
        <h2 className="text-3xl font-bold">What is a Career Learning Path?</h2>
        <p>
          A career learning path is a structured roadmap designed to take you from your current skill level to the requirements of a specific job role. Unlike generic tutorials, a personalized path focuses only on the skills you're missing, optimizing your learning time.
        </p>
        <p>
          For developers, this is critical because job descriptions often list a mix of languages, frameworks, and tools that can feel overwhelming. Our AI Career Path Generator breaks these down into manageable weekly goals.
        </p>

        <h2 className="text-3xl font-bold mt-12">Why Use an AI Career Path Generator?</h2>
        <p>
          Creating a study plan manually is time-consuming and prone to error. You might spend weeks learning a technology that isn't actually critical for the role, or miss a key requirement entirely.
        </p>
        <ul>
          <li><strong>Data-Driven:</strong> Uses AI to analyze the actual text of job postings to find hidden requirements.</li>
          <li><strong>Personalized:</strong> Accounts for your existing skills so you don't relearn what you already know.</li>
          <li><strong>Structured:</strong> Turns a list of requirements into a calendar-based plan.</li>
          <li><strong>Realistic:</strong> Provides honest time estimates based on real-world learning curves.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-12">How Our Tool Works</h2>
        <h3 className="text-xl font-bold mt-6">1. Job Description Analysis</h3>
        <p>We use advanced Natural Language Processing (NLP) to parse job descriptions. It identifies not just technical keywords like "React" or "Python", but also soft skills, seniority levels ("Lead", "Senior"), and domain knowledge ("Fintech", "Healthcare").</p>

        <h3 className="text-xl font-bold mt-6">2. Skill Gap Analysis</h3>
        <p>By comparing your current profile (via manual entry or GitHub analysis) with the job requirements, we pinpoint exactly where you need to improve. We categorize gaps as "Missing" (new skill needed) or "Weak" (needs improvement).</p>

        <h3 className="text-xl font-bold mt-6">3. Learning Path Creation</h3>
        <p>The AI generates a week-by-week schedule. Each week focuses on a specific theme (e.g., "Advanced State Management") and provides curated free and paid resources to help you master it.</p>

        <h3 className="text-xl font-bold mt-6">4. Portfolio Projects</h3>
        <p>To prove you're ready, we suggest portfolio projects that combine the specific skills the employer is looking for. These aren't generic to-do apps; they are tailored to demonstrate the competencies found in the job ad.</p>

        <h2 className="text-3xl font-bold mt-12">Common Career Transitions</h2>
        <p>
          Whether you are a <strong>Bootcamp Grad looking for your first job</strong>, a <strong>Junior Developer aiming for Mid-level</strong>, or making a <strong>Career Pivot</strong> (e.g., Backend to Fullstack), this tool adapts the complexity and resources to fit your journey.
        </p>
        <p>
            It can be daunting to switch tracks. A backend developer moving to frontend faces a completely different ecosystem. Our tool highlights these specific ecosystem differences (e.g., "Learn browser DOM vs Node.js runtime") to make the transition smoother.
        </p>

        <h2 className="text-3xl font-bold mt-12">Portfolio Projects That Get You Hired</h2>
        <p>
            The most effective way to demonstrate your skills is through portfolio projects. Our tool suggests projects that are directly relevant to the job you want.
            When building these projects, focus on:
        </p>
        <ul>
            <li><strong>Clean Code:</strong> Write readable, maintainable code. Use linters and formatters.</li>
            <li><strong>Documentation:</strong> A good README is essential. Explain what the project does, how to run it, and the decisions you made.</li>
            <li><strong>Deployment:</strong> A live link is worth a thousand words. Deploy to Vercel, Netlify, or AWS.</li>
            <li><strong>Testing:</strong> Show that you care about quality by adding unit and integration tests.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-12">The Science of Effective Learning</h2>
        <p>
            Our roadmap generator is built on principles of effective learning:
        </p>
        <ul>
            <li><strong>Spaced Repetition:</strong> Concepts are revisited in different contexts (theory, then practice, then project).</li>
            <li><strong>Active Recall:</strong> Projects force you to retrieve information rather than just passively watching videos.</li>
            <li><strong>Just-in-Time Learning:</strong> You learn tools when you need them for a specific phase, not in isolation.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-12">Frequently Asked Questions</h2>

        <h3 className="text-xl font-bold mt-4">How accurate is the skill gap analysis?</h3>
        <p>The analysis is based on the provided job description and your self-reported skills or GitHub profile. While highly accurate in identifying keywords and concepts, it's always good to use your judgment.</p>

        <h3 className="text-xl font-bold mt-4">Can I use this if I'm a complete beginner?</h3>
        <p>Yes! The tool will identify foundational skills you need. However, for complete beginners, we recommend starting with broad foundational courses before targeting specific job listings.</p>

        <h3 className="text-xl font-bold mt-4">How long will it take to become job-ready?</h3>
        <p>This varies greatly. If you have some experience, it might take 4-8 weeks to bridge the gap. For career changers, expect 3-6 months or more depending on time availability.</p>

        <h3 className="text-xl font-bold mt-4">Is this tool free?</h3>
        <p>Yes, the AI Career Path Generator is completely free to use for developers.</p>
      </div>
    </>
  );
}
