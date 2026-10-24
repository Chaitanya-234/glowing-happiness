'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  JobDescriptionAnalysisSchema,
  ResumeParsingSchema,
  CandidateScoringSchema,
  RedFlagAnalysisSchema,
  InterviewQuestionGenerationSchema
} from '../../../lib/ai-schemas';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || '');

const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  generationConfig: { responseMimeType: 'application/json' },
});

export async function analyzeJobDescription(text: string) {
  if (!apiKey) return { error: 'API key not configured' };

  try {
    const prompt = `
      You are an expert technical recruiter. Analyze the following job description and extract key requirements into a structured JSON format.

      Job Description:
      "${text}"

      Output strictly in JSON format matching this schema:
      {
        "jobTitle": "string",
        "level": "string (Junior/Mid/Senior/Lead/Principal)",
        "mustHaveSkills": ["string"],
        "niceToHaveSkills": ["string"],
        "education": "string",
        "yearsExperience": "string",
        "domain": "string",
        "softSkills": ["string"],
        "dealBreakers": ["string"],
        "summary": "string (brief summary)"
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleanedText = responseText.replace(/```json\n?|\n?```/g, '').trim();
    const json = JSON.parse(cleanedText);

    return { success: true, data: JobDescriptionAnalysisSchema.parse(json) };
  } catch (error) {
    console.error('Error analyzing JD:', error);
    return { success: false, error: 'Failed to analyze job description' };
  }
}

export async function parseResume(text: string) {
  if (!apiKey) return { error: 'API key not configured' };

  try {
    const prompt = `
      You are an expert resume parser. Extract structured data from the following resume text.
      Identify hidden insights like career trajectory, gaps, and key achievements.

      Resume Text:
      "${text.substring(0, 30000)}"

      Output strictly in JSON format matching this schema:
      {
        "name": "string",
        "contact": { "email": "string", "phone": "string", "location": "string", "linkedin": "string", "github": "string", "portfolio": "string" },
        "summary": "string",
        "experience": [{ "company": "string", "role": "string", "startDate": "string", "endDate": "string", "duration": "string", "description": "string", "achievements": ["string"], "technologies": ["string"] }],
        "education": [{ "degree": "string", "institution": "string", "graduationYear": "string", "gpa": number }],
        "skills": { "technical": ["string"], "tools": ["string"], "soft": ["string"], "languages": ["string"] },
        "totalExperience": "string",
        "certifications": ["string"],
        "projects": [{ "name": "string", "description": "string", "technologies": ["string"], "link": "string" }]
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleanedText = responseText.replace(/```json\n?|\n?```/g, '').trim();
    const json = JSON.parse(cleanedText);

    return { success: true, data: ResumeParsingSchema.parse(json) };
  } catch (error) {
    console.error('Error parsing resume:', error);
    return { success: false, error: 'Failed to parse resume' };
  }
}

export async function scoreCandidate(resumeData: any, jobRequirements: any) {
  if (!apiKey) return { error: 'API key not configured' };

  try {
    const prompt = `
      You are an AI hiring manager. Score this candidate against the job requirements.
      Be objective and strict.

      Job Requirements:
      ${JSON.stringify(jobRequirements)}

      Candidate Resume Data:
      ${JSON.stringify(resumeData)}

      Scoring weights: Skills (40%), Experience (30%), Education (15%), Soft Skills (10%), Adjustments (5%).

      Output strictly in JSON format matching this schema:
      {
        "overallScore": number (0-100),
        "matchLevel": "string (Excellent Match/Strong Match/Good Match/Fair Match/Weak Match)",
        "scoreBreakdown": {
          "skills": { "score": number, "weight": 40, "contribution": number, "details": { "mustHavesCovered": number, "mustHavesTotal": number, "coveragePercent": number, "niceToHavesCovered": number, "niceToHavesTotal": number, "missingCritical": ["string"], "strengths": ["string"] } },
          "experience": { "score": number, "weight": 30, "contribution": number, "details": { "yearsRequired": number, "yearsCandidate": number, "levelMatch": "string", "relevantExperience": "string" } },
          "education": { "score": number, "weight": 15, "contribution": number, "details": { "degreeMatch": "string", "certifications": ["string"] } },
          "softSkills": { "score": number, "weight": 10, "contribution": number, "details": { "leadership": "string", "communication": "string", "problemSolving": "string" } },
          "adjustments": { "score": number, "weight": 5, "contribution": number, "bonuses": ["string"], "penalties": ["string"] }
        },
        "recommendation": "string",
        "interviewFocus": ["string"]
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleanedText = responseText.replace(/```json\n?|\n?```/g, '').trim();
    const json = JSON.parse(cleanedText);

    return { success: true, data: CandidateScoringSchema.parse(json) };
  } catch (error) {
    console.error('Error scoring candidate:', error);
    return { success: false, error: 'Failed to score candidate' };
  }
}

export async function detectRedFlags(resumeData: any) {
  if (!apiKey) return { error: 'API key not configured' };

  try {
    const prompt = `
      Analyze this candidate's resume data for potential red flags and green flags.
      Look for job hopping, gaps, inconsistent dates, regression, etc.

      Candidate Resume Data:
      ${JSON.stringify(resumeData)}

      Output strictly in JSON format matching this schema:
      {
        "redFlags": [{ "flag": "string", "severity": "High/Medium/Low", "description": "string", "recommendation": "string", "canBeExplained": boolean, "possibleReasons": ["string"], "explanation": "string" }],
        "greenFlags": ["string"]
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleanedText = responseText.replace(/```json\n?|\n?```/g, '').trim();
    const json = JSON.parse(cleanedText);

    return { success: true, data: RedFlagAnalysisSchema.parse(json) };
  } catch (error) {
    console.error('Error detecting flags:', error);
    return { success: false, error: 'Failed to detect flags' };
  }
}

export async function generateInterviewQuestions(resumeData: any, jobRequirements: any) {
  if (!apiKey) return { error: 'API key not configured' };

  try {
    const prompt = `
      Generate role-specific interview questions for this candidate based on the job requirements and their resume.
      Tailor questions to their experience level and missing skills.

      Job Requirements:
      ${JSON.stringify(jobRequirements)}

      Candidate Resume Data:
      ${JSON.stringify(resumeData)}

      Output strictly in JSON format matching this schema:
      {
        "technicalQuestions": [{ "question": "string", "purpose": "string", "difficulty": "Easy/Medium/Hard", "expectedAnswer": "string", "followUps": ["string"] }],
        "behavioralQuestions": [{ "question": "string", "purpose": "string", "difficulty": "Easy/Medium/Hard", "lookFor": "string" }],
        "startupSpecificQuestions": [{ "question": "string", "purpose": "string", "difficulty": "Easy/Medium/Hard", "lookFor": "string" }],
        "cultureQuestions": [{ "question": "string", "purpose": "string", "difficulty": "Easy/Medium/Hard", "lookFor": "string" }]
      }
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const cleanedText = responseText.replace(/```json\n?|\n?```/g, '').trim();
    const json = JSON.parse(cleanedText);

    return { success: true, data: InterviewQuestionGenerationSchema.parse(json) };
  } catch (error) {
    console.error('Error generating questions:', error);
    return { success: false, error: 'Failed to generate questions' };
  }
}
