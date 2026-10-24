'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  ResearchPaperSchema,
  ResearchGapSchema,
  LiteratureReviewSchema
} from '@/lib/ai-schemas';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// --- Analyze Paper ---

const ANALYZE_PAPER_PROMPT = `
You are an expert academic research assistant. Analyze the provided research paper text and extract structured information.

Your tasks:
1.  **Metadata Extraction**: Extract title, authors (with affiliations), publication year, journal, DOI, etc.
2.  **Summarization**:
    *   Executive Summary: 2-3 sentences.
    *   Detailed Summary: 1-2 paragraphs.
    *   Key Findings: Bullet points.
    *   Methodology: Research design, data collection, analysis.
    *   Results: Main statistical or qualitative findings.
    *   Conclusions: Implications and limitations.
3.  **Section Analysis**: Break down by Introduction, Lit Review, Methodology, Results, Discussion, Conclusion.
4.  **Citation Generation**: Generate citations in APA, MLA, Chicago, Harvard, IEEE styles. Also generate in-text citations.
5.  **Research Gaps**: Identify specific gaps mentioned in the paper or implied by limitations.
6.  **Related Papers**: Suggest 3-5 related papers (real papers if possible, or describe types of papers needed).

**Important**: Return valid JSON matching the schema. If specific metadata is missing, make a best guess or use empty strings/arrays, do not hallucinate critical details like specific numbers unless found in text.
`;

export async function analyzePaper(text: string) {
  if (!process.env.GEMINI_API_KEY) {
    return { success: false, error: 'GEMINI_API_KEY is not configured' };
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: ANALYZE_PAPER_PROMPT,
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const result = await model.generateContent(text);
    const response = await result.response;
    const jsonString = response.text();

    try {
      const parsedData = JSON.parse(jsonString);
      const validation = ResearchPaperSchema.safeParse(parsedData);

      if (validation.success) {
        return { success: true, data: validation.data };
      } else {
        console.error('Schema validation error:', JSON.stringify(validation.error.errors, null, 2));
        return { success: false, error: 'AI generated invalid data structure', details: validation.error.errors };
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return { success: false, error: 'Failed to parse AI response' };
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    return { success: false, error: 'Failed to analyze paper' };
  }
}

// --- Find Research Gaps ---

const FIND_GAPS_PROMPT = `
You are a senior research strategist. Analyze the provided summaries of multiple research papers to identify research gaps.

Your tasks:
1.  **Compare Methodologies**: Look for limitations in current approaches (e.g., all survey-based, small samples).
2.  **Identify Contradictions**: Find where papers disagree.
3.  **Spot Under-researched Areas**: Topics mentioned but not deeply explored.
4.  **Temporal/Geographical Gaps**: Outdated research or specific regions missing.
5.  **Synthesize**: Create a structured list of gaps with severity and opportunities.

**Important**: Return valid JSON matching the schema.
`;

export async function findResearchGaps(papers: any[]) {
  if (!process.env.GEMINI_API_KEY) {
    return { success: false, error: 'GEMINI_API_KEY is not configured' };
  }

  const paperSummaries = papers.map((p, i) => `Paper ${i+1}: ${p.metadata.title} (${p.metadata.year}) - ${p.aiAnalysis.executiveSummary}`).join('\n\n');

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: FIND_GAPS_PROMPT,
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const result = await model.generateContent(paperSummaries);
    const response = await result.response;
    const jsonString = response.text();

    try {
      const parsedData = JSON.parse(jsonString);
      const validation = ResearchGapSchema.safeParse(parsedData);

      if (validation.success) {
        return { success: true, data: validation.data };
      } else {
        console.error('Schema validation error:', JSON.stringify(validation.error.errors, null, 2));
        return { success: false, error: 'AI generated invalid data structure', details: validation.error.errors };
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return { success: false, error: 'Failed to parse AI response' };
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    return { success: false, error: 'Failed to identify research gaps' };
  }
}

// --- Generate Literature Review ---

const LIT_REVIEW_PROMPT = `
You are an academic writer. Generate a comprehensive literature review based on the provided paper summaries and topic.

Your tasks:
1.  **Introduction**: Define the scope and importance of the topic.
2.  **Thematic Organization**: Group papers by themes (e.g., Methodology, Theoretical Framework, Findings).
3.  **Synthesis**: Don't just list papers; synthesize their findings. Compare and contrast.
4.  **Gap Identification**: Highlight what is missing in the current body of work.
5.  **Conclusion**: Summarize the state of the art and future directions.
6.  **Citations**: Use (Author, Year) format in the text.

**Important**: Return valid JSON matching the schema. The 'bibliography' field should be a list of formatted strings.
`;

export async function generateLiteratureReview(papers: any[], topic: string) {
  if (!process.env.GEMINI_API_KEY) {
    return { success: false, error: 'GEMINI_API_KEY is not configured' };
  }

  const paperContext = papers.map((p, i) => `
    [${i+1}] Title: ${p.metadata.title}
    Authors: ${p.metadata.authors.map((a:any) => a.name).join(', ')}
    Year: ${p.metadata.year}
    Summary: ${p.aiAnalysis.detailedSummary}
    Findings: ${p.aiAnalysis.keyFindings.join('; ')}
  `).join('\n\n');

  const userPrompt = `Topic: ${topic}\n\nSource Papers:\n${paperContext}`;

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: LIT_REVIEW_PROMPT,
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const jsonString = response.text();

    try {
      const parsedData = JSON.parse(jsonString);
      const validation = LiteratureReviewSchema.safeParse(parsedData);

      if (validation.success) {
        return { success: true, data: validation.data };
      } else {
        console.error('Schema validation error:', JSON.stringify(validation.error.errors, null, 2));
        return { success: false, error: 'AI generated invalid data structure', details: validation.error.errors };
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return { success: false, error: 'Failed to parse AI response' };
    }
  } catch (error) {
    console.error('Gemini API error:', error);
    return { success: false, error: 'Failed to generate literature review' };
  }
}
