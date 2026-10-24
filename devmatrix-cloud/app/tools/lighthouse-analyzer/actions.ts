'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { LighthouseAnalysisSchema } from '@/lib/ai-schemas';
import { z } from 'zod';

// Helper to initialize Gemini
const getGenAI = () => {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }
  return new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
};

export async function analyzeLighthouseReport(reportData: any) {
  try {
    const genAI = getGenAI();

    // Construct the system prompt based on the detailed requirements
    const systemPrompt = `
You are an expert Senior Web Performance Engineer and Core Web Vitals Specialist.
Your task is to deeply analyze a provided Lighthouse JSON report (or summary of it) and provide a comprehensive, actionable, and prioritized optimization strategy.

**Lighthouse Report Understanding:**

A. PERFORMANCE (Weight: Most Critical):
Understand and analyze these metrics:
- **LCP (Largest Contentful Paint)**: < 2.5s (Good), > 4.0s (Poor). Measures loading speed.
- **FID/INP (Interaction to Next Paint)**: < 200ms (Good), > 500ms (Poor). Measures interactivity.
- **CLS (Cumulative Layout Shift)**: < 0.1 (Good), > 0.25 (Poor). Measures visual stability.
- **FCP, TTI, TBT, Speed Index**: Understanding their role in the rendering path.

Performance Opportunities to Identify:
- Render-blocking resources
- Unused CSS/JavaScript
- Unoptimized images (size, format, lazy loading)
- Text compression (Gzip/Brotli)
- Caching policies
- DOM size and complexity
- JavaScript execution time
- Critical rendering path optimization
- Third-party script impact
- Code splitting opportunities

B. ACCESSIBILITY (Weight: Critical for compliance):
- Color and Contrast (WCAG AA/AAA)
- Semantics (Heading hierarchy, ARIA, Labels)
- Navigation (Keyboard, Focus management)
- Content (Alt text, Language, Meta)

C. BEST PRACTICES:
- Security (HTTPS, Headers, CSP, Vulnerabilities)
- Modern Web (HTTP/2, Image formats, Deprecated APIs)

D. SEO:
- Meta tags, Titles, Descriptions
- Crawlability (robots.txt, sitemaps)
- Mobile-friendliness
- Structured Data (JSON-LD)

**AI Analysis Capabilities:**

1. **Root Cause Identification:**
   - Don't just list failing audits. Explain WHY they fail.
   - Trace performance issues to code patterns (e.g., "Large Layout Shift caused by un-dimensioned image").
   - Identify cascading issues (e.g., "Render blocking JS causing delayed LCP").

2. **Prioritization Logic:**
   Calculate Priority Score = (Business_Impact * 3 + Score_Improvement * 2) / Implementation_Effort
   - **Business Impact (1-10)**: UX, Revenue, SEO ranking.
   - **Implementation Effort (1-10)**: Time, Complexity, Risk.
   - **Score Improvement**: Estimated Lighthouse points gained.

   Categories:
   - **Quick Wins**: High impact, Low effort.
   - **Strategic Fixes**: High impact, High effort.
   - **Maintenance**: Low impact, Low effort.

3. **Next.js Specific Analysis:**
   - Detect Next.js render strategies (SSG, SSR, CSR).
   - Recommend \`next/image\` for image issues.
   - Recommend \`next/font\` for font loading.
   - Suggest Route Groups, Streaming, and Suspense for LCP/TBT.
   - Analyze Bundle Size (suggest dynamic imports).
   - Server Components vs Client Components usage.

**Recommendation Generation:**

For each issue, provide:
- Problem Description & Root Cause
- Solution Approach & Implementation Steps (Step-by-step)
- Code Pattern (Before/After examples)
- Estimated Time & Impact
- Verification Method

**Impact Estimation:**
- Predict the new score after fixes.
- Estimate business metrics (Load time reduction in seconds).

**Output Format:**

Return a strictly valid JSON object matching the following structure. Do not return Markdown code blocks, just the JSON string.

{
  "reportSummary": { ... },
  "categoryAnalysis": { ... },
  "prioritizedRecommendations": [ ... ],
  "quickWins": [ ... ],
  "strategicFixes": [ ... ],
  "nextjsSpecific": { ... },
  "impactEstimation": { ... },
  "comparisonBaseline": { ... },
  "securityHighlights": { ... },
  "accessibilityComplianceReport": { ... }
}

Refer to the LighthouseAnalysisSchema for the exact fields required.
`;

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: systemPrompt,
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    // We accept a simplified version of the report to avoid token limits,
    // or the full report if it's small enough.
    // The client should pre-process and send relevant parts.
    // For now, we assume 'reportData' is a JSON object.
    const userPrompt = `
      Analyze this Lighthouse report data:
      ${JSON.stringify(reportData, null, 2)}

      Provide a comprehensive analysis focusing on Next.js optimizations.
      Return the result in strict JSON format.
    `;

    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const text = response.text();

    // Clean up potential markdown formatting
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
      const parsedData = JSON.parse(jsonString);
      const validation = LighthouseAnalysisSchema.safeParse(parsedData);

      if (validation.success) {
        return { success: true, data: validation.data };
      } else {
        console.error('Schema validation error:', JSON.stringify(validation.error.errors, null, 2));
        return {
          success: false,
          error: 'AI generated invalid data structure',
          details: validation.error.errors,
          partialData: parsedData // return partial data for debugging or fallback
        };
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return { success: false, error: 'Failed to parse AI response' };
    }

  } catch (error) {
    console.error('Lighthouse Analysis Action Error:', error);
    return { success: false, error: 'Failed to analyze report' };
  }
}
