'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { z } from 'zod';
import {
  InterviewQuestionSchema,
  ResumeAnalysisSchema,
  CodeRefactorSchema,
  ConceptExplanationSchema,
  UserStorySchema,
  DocumentProcessorSchema,
  DataAnalyzerSchema,
  ReportGeneratorSchema,
  EmailAssistantSchema,
  MeetingNoteSchema,
  CourseCurriculumSchema,
  BlogOutlineSchema,
  TechnicalSpecSchema,
  PersonaSchema,
  StartupValidatorSchema,
  SaasPlanAdvisorSchema,
  SaasEmailGeneratorSchema,
  SaasMetricAnalysisSchema,
  ChurnStrategySchema,
  FeaturePrioritySchema,
  CodeTranslatorSchema,
  SecurityVulnerabilitySchema,
  AccessibilityCheckerSchema,
  CrossBrowserTesterSchema,
  ApiContractTestingSchema,
  MutationTestingSchema,
  UnitTestGeneratorSchema,
  IntegrationTestBuilderSchema,
  TestCoverageAnalyzerSchema,
  E2ETestScenarioSchema,
  PerformanceTestSchema,
  DockerfileOptimizerSchema,
  CrudGeneratorSchema,
  CareerPathSchema,
  CacheStrategySchema,
} from '../../lib/ai-schemas';

const apiKey = process.env.GEMINI_API_KEY;

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const model = genAI ? genAI.getGenerativeModel({
  model: 'models/gemini-2.5-flash',
}) : null;

// Schema registry to avoid passing Zod objects from client
const SCHEMA_REGISTRY = {
  interview: {
    schema: InterviewQuestionSchema,
    description: `{
      "questions": [{
        "question": "The interview question",
        "type": "Technical | Behavioral | System Design",
        "idealAnswer": "A comprehensive answer key",
        "tips": "Tips for answering well"
      }]
    }`,
  },

  resume: {
    schema: ResumeAnalysisSchema,
    description: `{
      "score": 85,
      "missingKeywords": ["React", "TypeScript", "CI/CD"],
      "criticalFeedback": ["Bullet points lack metrics"],
      "improvedSummary": "Improved summary text"
    }`,
  },

  refactor: {
    schema: CodeRefactorSchema,
    description: `{
      "refactoredCode": "Full refactored code",
      "explanation": "Explanation of improvements",
      "securityIssues": [{
        "severity": "High",
        "description": "Description"
      }]
    }`,
  },

  concept: {
    schema: ConceptExplanationSchema,
    description: `{
      "analogy": "Analogy",
      "simplifiedExplanation": "Simple explanation",
      "funFact": "Fun fact",
      "quizQuestion": "Question?",
      "quizOptions": ["A", "B", "C", "D"],
      "quizCorrectAnswer": 0
    }`,
  },

  story: {
    schema: UserStorySchema,
    description: `{
      "title": "Feature title",
      "userStory": "As a user...",
      "acceptanceCriteria": ["Given..."],
      "technicalNotes": ["Note"]
    }`,
  },

  doc_processor: {
    schema: DocumentProcessorSchema,
    description: `{
      "summary": "Summary",
      "keyPoints": ["Point"],
      "sentiment": "Positive | Neutral | Negative",
      "category": "Category",
      "suggestedActions": ["Action"]
    }`,
  },

  data_analyzer: {
    schema: DataAnalyzerSchema,
    description: `{
      "analysisSummary": "Summary",
      "identifiedTrends": [{
        "trend": "Trend",
        "impact": "High | Low"
      }],
      "recommendedChart": "Bar | Line | Pie",
      "keyMetrics": [{
        "label": "Metric",
        "value": "Value"
      }]
    }`,
  },

  report_generator: {
    schema: ReportGeneratorSchema,
    description: `{
      "reportTitle": "Title",
      "executiveSummary": "Summary",
      "sections": [{
        "heading": "Heading",
        "content": "Content"
      }],
      "conclusion": "Conclusion",
      "recommendations": ["Recommendation"]
    }`,
  },

  email_assistant: {
    schema: EmailAssistantSchema,
    description: `{
      "subjectOptions": ["Option"],
      "emailBody": "Email body",
      "toneAnalysis": "Formal | Casual",
      "improvementTips": ["Tip"]
    }`,
  },

  meeting_notes: {
    schema: MeetingNoteSchema,
    description: `{
      "meetingTitle": "Title",
      "summary": "Summary",
      "agendaItems": ["Item"],
      "decisionsMade": ["Decision"],
      "actionItems": [{
        "assignee": "Name",
        "task": "Task",
        "priority": "High | Medium | Low"
      }]
    }`,
  },

  course_creator: {
    schema: CourseCurriculumSchema,
    description: `{
      "title": "Course title",
      "targetAudience": "Audience",
      "duration": "Duration",
      "seoMeta": {
        "description": "SEO Description",
        "keywords": ["keyword"]
      },
      "scormMetadata": {
        "scormVersion": "1.2 | 2004",
        "manifestId": "com.example.course",
        "organization": "Example Org"
      },
      "modules": [{
        "title": "Module",
        "duration": "1h",
        "lessons": [{
          "title": "Lesson",
          "type": "Video | Reading | Quiz | Exercise | Code",
          "contentOutline": "Outline",
          "codeExample": "Optional code snippet",
          "solutionCode": "Optional solution code"
        }]
      }],
      "finalQuiz": [{
        "question": "Question",
        "options": ["A", "B"],
        "correctAnswer": 0
      }],
      "faq": [{
        "question": "Question",
        "answer": "Answer"
      }]
    }`,
  },

  blog_architect: {
    schema: BlogOutlineSchema,
    description: `{
      "title": "Blog title",
      "seoMeta": {
        "description": "SEO description",
        "keywords": ["keyword"]
      },
      "outline": [{
        "heading": "Heading",
        "subpoints": ["Point"]
      }],
      "codeSnippets": [{
        "language": "typescript",
        "code": "code",
        "description": "desc"
      }],
      "faq": [{
        "question": "Q",
        "answer": "A"
      }]
    }`,
  },

  tech_spec: {
    schema: TechnicalSpecSchema,
    description: `{
      "title": "Spec title",
      "problemStatement": "Problem",
      "proposedSolution": "Solution",
      "userStories": ["Story"],
      "databaseSchema": [{
        "table": "users",
        "fields": ["id", "name"]
      }],
      "apiEndpoints": [{
        "method": "GET",
        "path": "/api",
        "description": "Desc"
      }]
    }`,
  },

  persona: {
    schema: PersonaSchema,
    description: `{
      "name": "Name",
      "role": "Role",
      "demographics": {
        "age": "25-34",
        "location": "USA",
        "education": "BS"
      },
      "bio": "Bio",
      "painPoints": ["Pain"],
      "goals": ["Goal"],
      "preferredChannels": ["Twitter"]
    }`,
  },

  startup_validator: {
    schema: StartupValidatorSchema,
    description: `{
      "marketAnalysis": {
        "totalAddressableMarket": "$1B",
        "targetAudience": "Developers"
      },
      "competitors": [{
        "name": "Competitor",
        "strength": "Strength",
        "weakness": "Weakness"
      }],
      "swot": {
        "strengths": ["S"],
        "weaknesses": ["W"],
        "opportunities": ["O"],
        "threats": ["T"]
      },
      "mvpFeatures": [{
        "feature": "Feature",
        "priority": "High"
      }],
      "verdict": {
        "viabilityScore": 85,
        "summary": "Summary"
      }
    }`,
  },

  saas_plan_advisor: {
    schema: SaasPlanAdvisorSchema,
    description: `{
      "suggestedPlans": [{
        "name": "Starter",
        "price": "$29/mo",
        "features": ["Feature"],
        "description": "Description",
        "targetAudience": "Startups"
      }],
      "pricingStrategy": "Strategy",
      "pageCopy": {
        "headline": "Headline",
        "subheadline": "Subheadline",
        "cta": "CTA"
      }
    }`,
  },

  saas_email_generator: {
    schema: SaasEmailGeneratorSchema,
    description: `{
      "sequences": [{
        "stage": "Trial",
        "subject": "Subject",
        "body": "Body",
        "delay": "Day 1"
      }]
    }`,
  },

  saas_metric_analysis: {
    schema: SaasMetricAnalysisSchema,
    description: `{
      "analysis": "Analysis",
      "healthScore": 85,
      "recommendations": ["Rec"],
      "projectedGrowth": "Growth"
    }`,
  },

  churn_strategy: {
    schema: ChurnStrategySchema,
    description: `{
      "primaryCause": "Cause",
      "immediateActions": ["Action"],
      "longTermStrategy": "Strategy",
      "retentionEmailDraft": "Email"
    }`,
  },

  feature_priority: {
    schema: FeaturePrioritySchema,
    description: `{
      "prioritizedFeatures": [{
        "featureName": "Feature",
        "impactScore": 8,
        "effortScore": 3,
        "priorityLevel": "Should Have",
        "reasoning": "Reason"
      }]
    }`,
  },

  code_translator: {
    schema: CodeTranslatorSchema,
    description: `{
      "translatedCode": "The full translated code block",
      "explanation": "Detailed explanation of changes and language differences",
      "complexityAnalysis": "Time and Space complexity analysis",
      "tips": ["Best practice tip 1", "Performance tip 2"]
    }`,
  },

  security_scanner: {
    schema: SecurityVulnerabilitySchema,
    description: `{
      "vulnerabilities": [{
        "id": "Vuln-001",
        "name": "SQL Injection",
        "severity": "Critical | High | Medium | Low | Info",
        "description": "Desc",
        "fixSuggestion": "Use parameterized queries",
        "secureCodeSnippet": "Code"
      }],
      "securityScore": 85,
      "summary": "Summary"
    }`,
  },

  accessibility_checker: {
    schema: AccessibilityCheckerSchema,
    description: `{
      "violations": [{
        "ruleId": "Rule-001",
        "impact": "Critical | Serious | Moderate | Minor",
        "element": "Button",
        "description": "Missing aria-label",
        "remediation": "Add aria-label",
        "wcagCriteria": "1.1.1"
      }],
      "complianceScore": 90,
      "summary": "Summary"
    }`,
  },

  cross_browser_tester: {
    schema: CrossBrowserTesterSchema,
    description: `{
      "compatibilityIssues": [{
        "browsers": ["IE11", "Safari < 14"],
        "issue": "Flexbox gap not supported",
        "cssPropertyOrFeature": "gap",
        "polyfillOrFix": "Use margins"
      }],
      "testScript": "Playwright/Cypress script",
      "summary": "Summary"
    }`,
  },

  api_contract_tester: {
    schema: ApiContractTestingSchema,
    description: `{
      "validationIssues": [{
        "endpoint": "/api/users",
        "method": "POST",
        "issue": "Missing required field",
        "severity": "Error | Warning"
      }],
      "generatedTestCases": [{
        "name": "Test Name",
        "description": "Test Desc",
        "testCode": "Test Code"
      }],
      "coverageAnalysis": "Analysis"
    }`,
  },

  mutation_testing_assistant: {
    schema: MutationTestingSchema,
    description: `{
      "suggestedMutants": [{
        "mutationType": "Arithmetic Operator Replacement",
        "originalCode": "a + b",
        "mutatedCode": "a - b",
        "location": "Line 5"
      }],
      "analysis": "Analysis",
      "effectivenessScore": 80
      }`,
      },
  unit_test: {
    schema: UnitTestGeneratorSchema,
    description: `{
      "testSuiteName": "Name",
      "setupCode": "Setup",
      "testCases": [{
        "description": "Desc",
        "code": "Code",
        "type": "Happy Path | Edge Case | Error Handling"
      }],
      "teardownCode": "Teardown"
    }`,
  },

  integration_test: {
    schema: IntegrationTestBuilderSchema,
    description: `{
      "testSuiteDescription": "Desc",
      "prerequisites": ["Prereq"],
      "tests": [{
        "name": "Name",
        "endpoint": "Endpoint",
        "method": "Method",
        "scenario": "Scenario",
        "testCode": "Code"
      }]
    }`,
  },

  coverage_analyzer: {
    schema: TestCoverageAnalyzerSchema,
    description: `{
      "currentCoverageEstimate": 80,
      "uncoveredLines": ["Line 10-15"],
      "missedBranches": ["If statement"],
      "suggestedTestCases": [{
        "targetFunction": "Func",
        "scenario": "Scenario",
        "testCode": "Code"
      }],
      "riskAssessment": "Low | Medium | High | Critical"
    }`,
  },

  e2e_scenario: {
    schema: E2ETestScenarioSchema,
    description: `{
      "scenarios": [{
        "title": "Title",
        "userStoryLink": "Link",
        "steps": ["Step"],
        "generatedScript": "Code"
      }],
      "bestPractices": ["Practice"]
    }`,
  },

  performance_test: {
    schema: PerformanceTestSchema,
    description: `{
      "toolUsed": "JMeter | k6",
      "scriptCode": "Code",
      "configuration": {
        "virtualUsers": 100,
        "rampUpPeriod": "10s",
        "duration": "1m"
      },
      "scenariosCovered": ["Scenario"]
    }`,
  },

  dockerfile_optimizer: {
    schema: DockerfileOptimizerSchema,
    description: `{
      "issueSummary": ["Warning: Using latest tag", "Critical: Running as root"],
      "optimizedDockerfile": "FROM node:18-alpine...",
      "annotations": [{
        "lineNumber": 1,
        "issue": "Using latest tag",
        "suggestion": "Pin to specific version",
        "severity": "Warning"
      }],
      "imageSizeAnalysis": {
        "currentSizeEstimate": "1.2GB",
        "optimizedSizeEstimate": "400MB",
        "largestLayers": ["Base Image", "npm install"]
      },
      "vulnerabilities": [{
        "package": "openssl",
        "cveId": "CVE-2023-1234",
        "severity": "High",
        "recommendation": "Upgrade to 3.1.0"
      }],
      "beforeAfterComparison": "Reduced image size by 60%..."
    }`,
  },

  crud_generator: {
    schema: CrudGeneratorSchema,
    description: `{
      "files": [{
        "path": "path/to/file.ts",
        "content": "file content",
        "description": "description",
        "type": "backend | frontend | test | config | other"
      }],
      "summary": "Summary of generated code",
      "instructions": "Instructions on how to use the code"
    }`,
  },

  career_path: {
    schema: CareerPathSchema,
    description: `{
      "jobAnalysis": {
        "role": "Role",
        "requiredSkills": [{ "name": "React", "category": "Frontend", "level": "Mid", "priority": "Must Have" }],
        "domainKnowledge": ["Finance"],
        "roleType": "IC"
      },
      "skillGapAnalysis": {
        "summary": "Summary",
        "matchPercentage": 75,
        "strengths": ["React"],
        "gaps": [{ "skill": "Node", "currentLevel": "Beginner", "requiredLevel": "Mid", "gapType": "Weak", "priority": "High" }]
      },
      "learningRoadmap": {
        "totalDurationWeeks": 12,
        "phases": [{ "name": "Phase 1", "weeks": "1-4", "description": "Desc" }],
        "weeks": [{
          "weekNumber": 1,
          "theme": "React Basics",
          "objectives": ["Obj"],
          "timeCommitment": "10h",
          "topics": ["Components"],
          "resources": [{ "title": "Docs", "type": "Documentation", "isPaid": false, "description": "Desc" }],
          "practiceExercises": ["Ex"],
          "milestone": "Todo App"
        }]
      },
      "portfolioProjects": [{
        "title": "Project",
        "description": "Desc",
        "skillsDemonstrated": ["React"],
        "coreFeatures": ["Feature"],
        "advancedFeatures": ["Adv Feature"],
        "techStack": ["React"],
        "estimatedTime": "20h",
        "difficulty": "Intermediate",
        "successCriteria": ["Criteria"]
      }]
    }`,
  },

  cache_optimizer: {
    schema: CacheStrategySchema,
    description: `{
      "applicationAnalysis": { "type": "E-commerce", "scale": "High", "readWriteRatio": "Read-heavy", "dataFreshness": "Low", "architecture": "Microservices" },
      "accessPatterns": [{ "pattern": "Browsing", "frequency": "High", "mutationRate": "Low", "recommendation": "CDN" }],
      "cacheStrategy": {
        "layers": [{ "layer": "CDN", "purpose": "Static", "technology": "CloudFront", "whatToCache": ["Images"], "estimatedHitRate": "90%", "latencyImprovement": "50ms" }]
      },
      "invalidationStrategy": {
        "approaches": [{ "dataType": "Product", "strategy": "TTL", "ttl": "1h", "reasoning": "Standard" }]
      },
      "implementation": {
        "redisSetup": { "code": "code", "language": "typescript" }
      },
      "performanceEstimates": {
        "overall": { "currentLatencyP95": "100ms", "optimizedLatencyP95": "20ms", "improvement": "80%" },
        "databaseLoadReduction": "50%",
        "costSavings": "$100",
        "hitRates": { "cdn": "90%" }
      },
      "monitoring": {
        "metricsToTrack": ["Hit Rate"],
        "alertingRules": [{ "metric": "Hit Rate", "threshold": "<50%", "action": "Alert" }]
      },
      "optimizationSteps": ["Step 1"],
      "bestPractices": ["Practice 1"]
    }`,
  },
} as const;

type SchemaKey = keyof typeof SCHEMA_REGISTRY;

/**
 * Generates structured content using Gemini with server-side schema selection.
 */
export async function generateStructuredContent<K extends SchemaKey>(
  prompt: string,
  schemaKey: K
): Promise<z.infer<(typeof SCHEMA_REGISTRY)[K]['schema']>> {
  if (!model) {
    throw new Error('GEMINI_API_KEY is not set');
  }

  try {
    const selected = SCHEMA_REGISTRY[schemaKey];
    if (!selected) {
      throw new Error(`Invalid schema key: ${schemaKey}`);
    }

    const fullPrompt = `
${prompt}

Return ONLY valid JSON that matches this schema:
${selected.description}

No markdown. No explanations. JSON only.
    `;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const text = result.response.text();
    if (!text) {
      throw new Error('Empty response from Gemini');
    }

    let json;
    try {
      json = JSON.parse(text.trim());
    } catch {
      throw new Error('Invalid JSON returned by Gemini');
    }

    return selected.schema.parse(json);
  } catch (error) {
    console.error('generateStructuredContent error:', error);
    throw error instanceof Error ? error : new Error(String(error));
  }
}
