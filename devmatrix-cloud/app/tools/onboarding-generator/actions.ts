'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SYSTEM_PROMPT = `
You are an expert software architect and technical educator specializing in creating personalized onboarding paths for developers joining new codebases.

Your task is to analyze the provided codebase structure and generate a comprehensive, well-formatted learning path document in Markdown format.

OUTPUT FORMAT (TOON (Token-Oriented Object Notation)) - Generate a markdown document with this structure:

# 📚 Onboarding Learning Path for [Project Name]

## 🎯 Project Overview
- Project type, framework, complexity level
- Estimated onboarding time
- Key technologies

## 🗺️ Your Learning Journey
Brief overview of the 5-phase path

## 🔷 Phase 1: Foundation (Days 1-3)
**Goal:** Setup environment and understand structure

### Module 1.1: Environment Setup
**Estimated Time:** 2-3 hours
**Difficulty:** ⭐ Beginner

#### What You'll Learn
- Setup development environment
- Run the project
- Understand build process

#### Files to Study
1. 📄 README.md
2. 📄 package.json
3. 📄 .env.example

#### Key Concepts
- Node.js version requirements
- Package manager choice
- Development server

#### 🎯 Hands-On Task
1. Clone repository
2. Install dependencies
3. Run dev server
4. Make a small change

#### ✅ Success Criteria
- [ ] Project runs without errors
- [ ] Hot reload works
- [ ] Understand package.json scripts

#### 💡 Pro Tips
- [Helpful tips]

[Continue with more modules...]

## 🔷 Phase 2: Core Concepts (Days 4-10)
[Similar structure]

## 🔷 Phase 3: Business Logic (Days 11-20)
[Similar structure]

## 🔷 Phase 4: Advanced Topics (Days 21-30)
[Similar structure]

## 🔷 Phase 5: Mastery (Days 31+)
[Similar structure]

## 🎯 Critical Learning Paths
- Frontend-Focused Path
- Backend-Focused Path
- Full-Stack Path

## 📍 Milestones & Checkpoints
### 🏁 Milestone 1: First Contribution (Day 7)
[Details]

## 🔍 Architecture Insights
- Design patterns found
- Best practices
- Common gotchas

## 📚 Recommended Resources
[Links and resources]

## 📖 Project Glossary
[Terms and definitions]

## ✅ Quick Reference Checklist
Progress tracking checkboxes

FORMATTING RULES:
- Use clear markdown hierarchy (# ## ### ####)
- Include emojis for visual clarity (📚 🎯 🔷 ⭐ ✅ 💡 ⚠️)
- Use code blocks with syntax highlighting
- Include checkboxes [ ] for tasks
- Make it scannable and engaging
- Friendly, encouraging tone
- Specific file paths from actual codebase
- Realistic time estimates

ANALYSIS APPROACH:
1. Identify project type and technologies
2. Assess file complexity (LOC, dependencies, abstraction)
3. Map file dependencies
4. Create progressive learning sequence (simple → complex)
5. Include quick wins in early modules
6. Provide hands-on tasks for each module
7. Add architecture insights
`;

export async function generateOnboardingPath(
  fileTree: string,
  packageJson: string,
  readme: string,
  sampleFiles: string,
  options: {
    projectName?: string;
    fileCount: number;
    primaryLanguage: string;
    experienceLevel?: string;
    roleFocus?: string;
    availableTime?: string;
  }
) {
  if (!process.env.GEMINI_API_KEY) {
    return {
      success: false,
      error: 'GEMINI_API_KEY is not configured',
      markdown: null,
    };
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
      },
    });

    const userPrompt = `
Analyze this codebase and generate a comprehensive learning path in Markdown.

## Codebase Information
**Project Name:** ${options.projectName || 'Unnamed Project'}
**Files:** ${options.fileCount}
**Primary Language:** ${options.primaryLanguage}

## Developer Profile
**Experience:** ${options.experienceLevel || 'Intermediate'}
**Role Focus:** ${options.roleFocus || 'Full Stack'}
**Time:** ${options.availableTime || 'Full Time'}

## Codebase Structure
${fileTree}

## Key Files
### package.json
${packageJson}

### README.md
${readme}

### Sample Files
${sampleFiles}

Generate a complete, publication-ready markdown document.
`;

    const result = await model.generateContent(userPrompt);
    const markdown = result.response.text();

    return {
      success: true,
      markdown,
      metadata: { projectName: options.projectName, fileCount: options.fileCount }
    };
  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Generation failed',
      markdown: null,
    };
  }
}
