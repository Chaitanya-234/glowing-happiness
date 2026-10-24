'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { DetailedInterviewQuestionSchema } from '../../../lib/ai-schemas';
import { z } from 'zod';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export type InterviewConfig = {
  role: string;
  experienceLevel: string;
  techStack: {
    languages: string[];
    frontend: string[];
    backend: string[];
    databases: string[];
    cloud: string[];
    tools: string[];
  };
  questionCount: number;
  focusAreas?: string[];
  excludeTopics?: string;
  customInstructions?: string;
};

const SYSTEM_PROMPT = `
You are an expert technical interviewer and hiring manager. Your task is to generate high-quality technical interview questions tailored to specific roles, experience levels, and technology stacks.

**Role Understanding:**
- Analyze job role requirements (Frontend, Backend, Full-stack, DevOps, Data Engineer, ML Engineer, etc.)
- Map experience level to appropriate difficulty (Junior: Entry-level, Mid-level: 2-5 years, Senior: 5+ years, Lead/Principal: 10+ years)
- Consider tech stack requirements and focus areas
- Understand company context (startup vs enterprise, product vs consulting)

**Question Type Generation:**

A. CODING PROBLEMS (30-40% of questions)
- Data structures and algorithms
- Problem-solving challenges
- Code optimization tasks
- Debugging scenarios
- Refactoring exercises

Requirements for each coding problem:
- Clear problem statement
- Input/output examples (minimum 3 examples)
- Edge cases to consider
- Constraints (time complexity, space complexity)
- Multiple solution approaches (brute force, optimized)
- Complete working solutions in requested language(s)
- Explanation of solution approach
- Time and space complexity analysis
- Follow-up questions to test deeper understanding
- Real-world application of the problem

B. SYSTEM DESIGN QUESTIONS (20-30% of questions, weighted toward senior roles)
- Scalability challenges
- Architecture decisions
- Database design
- API design
- Microservices vs monolith
- Caching strategies
- Load balancing
- Message queues
- Distributed systems

Requirements for each system design question:
- Scenario description with scale requirements
- Key considerations to discuss
- Components to design
- Trade-offs to analyze
- Scalability requirements (users, requests, data size)
- Expected diagrams description
- Common pitfalls to avoid
- Evaluation criteria for candidate's answer
- Follow-up questions
- Sample high-level solution approach

C. BEHAVIORAL QUESTIONS (15-20% of questions)
- Leadership and teamwork
- Conflict resolution
- Project management
- Communication skills
- Learning and adaptability
- Problem-solving approach
- Cultural fit

Requirements for each behavioral question:
- STAR method framework (Situation, Task, Action, Result)
- What the interviewer is assessing
- Red flags to watch for
- Good answer indicators
- Follow-up probes
- Example strong answer (optional)

D. TECHNICAL KNOWLEDGE QUESTIONS (15-25% of questions)
- Framework-specific questions
- Language-specific questions
- Best practices
- Design patterns
- Testing strategies
- Security practices
- Performance optimization
- DevOps and deployment

Requirements for each technical question:
- Question with clear context
- Expected answer points
- Common misconceptions
- Follow-up questions
- Practical application scenario
- Difficulty justification

E. SCENARIO-BASED QUESTIONS (10-15% of questions)
- Production bug investigation
- Performance degradation
- Security incident response
- Technical decision making
- Code review scenarios

Requirements for each scenario:
- Detailed scenario setup
- Information to provide gradually
- Expected approach from candidate
- Key decision points
- Evaluation criteria
- Sample resolution path

**Difficulty Calibration:**
- Junior: Fundamentals, basic data structures, simple algos, debugging.
- Mid-level: Intermediate algos, design patterns, API design, trade-offs.
- Senior: Complex algos, system design, architecture, performance, security, mentorship.
- Lead/Principal: Advanced system design, tech strategy, leadership, org impact.

**Quality Standards:**
- All coding problems must have verified working solutions.
- Questions should be original or significantly adapted.
- Difficulty ratings should be accurate.
- Include diversity of question types.
- Avoid brain teasers unless requested.
- Focus on practical, job-relevant scenarios.
`;

export async function generateInterviewQuestions(config: InterviewConfig) {
  if (!genAI) {
    throw new Error('GEMINI_API_KEY is not set');
  }

  // Initialize model with system instruction for this specific request
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: SYSTEM_PROMPT
  });

  const userPrompt = `
Generate ${config.questionCount} interview questions for the following profile:

**Role:** ${config.role}
**Experience Level:** ${config.experienceLevel}
**Tech Stack:**
- Languages: ${config.techStack.languages.join(', ')}
- Frontend: ${config.techStack.frontend.join(', ')}
- Backend: ${config.techStack.backend.join(', ')}
- Databases: ${config.techStack.databases.join(', ')}
- Cloud/DevOps: ${config.techStack.cloud.join(', ')}
- Tools: ${config.techStack.tools.join(', ')}

**Focus Areas:** ${config.focusAreas?.join(', ') || 'General'}
**Exclude Topics:** ${config.excludeTopics || 'None'}
**Special Requirements:** ${config.customInstructions || 'None'}

Ensure a good mix of question types as per the system instructions.
Return the result strictly as a JSON object matching the following schema.
  `;

  const schemaDescription = `{
  "questions": [{
    "id": "unique_id",
    "type": "Coding | System Design | Behavioral | Technical Knowledge | Scenario-Based",
    "difficulty": "Junior | Mid-level | Senior | Lead/Principal",
    "title": "Short descriptive title",
    "question": "The full question text",
    "estimatedTime": "e.g. 15 mins",
    "tags": ["tag1", "tag2"],
    "codeSnippet": "Optional initial code for the question",
    "inputOutputExamples": [{"input": "...", "output": "...", "explanation": "..."}],
    "constraints": ["O(n) time", "O(1) space"],
    "solution": {
        "approach": "Explanation of the solution",
        "code": "Full solution code",
        "complexity": "Time: O(n), Space: O(1)",
        "alternatives": ["Approach 2..."],
        "diagramDescription": "Description of architecture diagram for system design"
    },
    "hints": ["Hint 1", "Hint 2"],
    "evaluationCriteria": ["Check 1", "Check 2"],
    "commonPitfalls": ["Pitfall 1"]
  }]
}`;

  try {
    const result = await model.generateContent({
      contents: [
        { role: 'user', parts: [{ text: userPrompt + "\n\nJSON Schema:\n" + schemaDescription }] }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const text = result.response.text();
    const json = JSON.parse(text);
    return DetailedInterviewQuestionSchema.parse(json);
  } catch (error) {
    console.error('Error generating interview questions:', error);
    throw new Error('Failed to generate interview questions');
  }
}
