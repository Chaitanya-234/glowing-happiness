'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { AIDetectorSchema } from '@/lib/ai-schemas';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function analyzeText(text: string) {
  if (!process.env.GEMINI_API_KEY) {
    return { success: false, error: 'GEMINI_API_KEY is not configured' };
  }

  const systemPrompt = `
Analyze text for AI generation indicators.

**Text Analysis Tasks:**
1. Examine writing style and patterns
2. Identify linguistic markers
3. Calculate perplexity indicators (estimate)
4. Measure burstiness (sentence variation)
5. Detect AI-specific phrases
6. Analyze structure and formatting
7. Identify unnatural patterns
8. Check for human characteristics
9. Assess vocabulary diversity
10. Evaluate emotional authenticity

**Detection Criteria:**

STRONG AI INDICATORS (High Confidence):
- Overuse of AI-common phrases ("It's worth noting", "It's important to", "In conclusion", "delve", "meticulous")
- Perfect grammar with no errors
- Lack of personal voice
- Formulaic structure throughout
- No typos or informal language
- Balanced but generic viewpoints
- Hedging language overuse
- Predictable transitions

MODERATE AI INDICATORS:
- Very formal tone
- Consistent sentence structure
- Academic style for casual topic
- Lack of contractions
- Generic examples
- No emotional language
- Overly comprehensive

HUMAN INDICATORS:
- Personal anecdotes
- Informal language/slang
- Minor grammatical imperfections
- Emotional language
- Strong opinions
- Colloquialisms
- Typos or informal punctuation
- Stream-of-consciousness
- Topic drift
- Inconsistent quality

**Per-Sentence Analysis:**
- Score each sentence (0-100% AI likelihood)
- Identify specific markers
- Provide reasoning
- Confidence level

**Overall Assessment:**
- Aggregate sentence scores
- Weight by sentence importance
- Calculate overall AI percentage
- Confidence interval
- Reasoning summary

**AI Signatures:**
- ChatGPT: "It's worth noting", "It's important to", "Keep in mind", Structured responses, Numbered lists, Disclaimer language.
- Gemini: Comprehensive coverage, Multiple viewpoints presented, Formal academic tone, Structured arguments, Fact-based responses.
- Claude: Thoughtful analysis, Nuanced perspectives, Disclaimers about uncertainty, Careful language.

**OUTPUT FORMAT (JSON):**

Return a JSON object matching this structure:
{
  "overallScore": {
    "aiProbability": number (0-100),
    "confidence": "Low" | "Medium" | "High" | "Very High",
    "verdict": string,
    "confidenceRange": string (e.g. "70-80%"),
    "reasoning": string
  },
  "breakdown": {
    "aiIndicators": number,
    "humanIndicators": number,
    "neutralIndicators": number,
    "perplexityScore": number,
    "burstinessScore": number,
    "vocabularyDiversity": number
  },
  "sentenceAnalysis": [
    {
      "sentenceNumber": number,
      "text": string,
      "aiProbability": number (0-100),
      "confidence": "Low" | "Medium" | "High" | "Very High",
      "markers": string[],
      "humanMarkers": string[],
      "reasoning": string
    }
  ],
  "detectedPatterns": [
    {
      "pattern": string,
      "occurrences": number or string,
      "examples": string[],
      "severity": "Low" | "Moderate" | "High",
      "aiIndicator": boolean
    }
  ],
  "aiSignatures": {
    "chatgpt": {
      "likelihood": number (0-100),
      "markers": string[]
    },
    "gemini": {
      "likelihood": number (0-100),
      "markers": string[]
    },
    "claude": {
      "likelihood": number (0-100),
      "markers": string[]
    },
    "mostLikely": string
  },
  "writingStyle": {
    "tone": string,
    "complexity": string,
    "sentenceLengthAvg": number,
    "sentenceLengthVariance": number,
    "vocabularyLevel": string,
    "readabilityScore": number,
    "emotionalTone": string
  },
  "suspiciousSections": [
    {
      "startIndex": number,
      "endIndex": number,
      "text": string,
      "aiProbability": number,
      "reason": string
    }
  ],
  "recommendations": string[],
  "alternativeExplanations": string[]
}
`;

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: systemPrompt,
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const userPrompt = `Analyze the following text for AI generation indicators:\n\n${text}`;

    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const textResult = response.text();

    // Clean up any potential markdown code blocks if the model adds them despite MIME type
    const jsonString = textResult.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
      const parsedData = JSON.parse(jsonString);
      const validation = AIDetectorSchema.safeParse(parsedData);

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
    return { success: false, error: 'Failed to analyze text' };
  }
}
