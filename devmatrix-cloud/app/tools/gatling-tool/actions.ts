'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { GatlingScriptSchema, GatlingReportAnalysisSchema } from '@/lib/ai-schemas';
import { z } from 'zod';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function generateGatlingScript(input: any) {
  if (!process.env.GEMINI_API_KEY) {
    return { success: false, error: 'GEMINI_API_KEY is not configured' };
  }

  const systemPrompt = `
You are an expert Performance Engineer specializing in Gatling (Scala DSL) and Load Testing.
Your goal is to generate production-ready Gatling simulation scripts based on user requirements.

**Gatling Architecture & Best Practices:**

1. **Simulation Structure:**
   - Extend \`Simulation\` class.
   - Define HTTP protocol configuration (\`httpProtocol\`) separately.
   - Define scenarios (\`scenario("Name")\`) separately.
   - Use modular chains for request steps.
   - In \`setUp\`, use injection profiles properly.

2. **HTTP Protocol:**
   - Base URL.
   - Common headers (Accept, Content-Type).
   - Connection pooling settings (if needed).
   - Response validation checks (status, body).

3. **Scenario Design:**
   - Use \`.exec(http("Request Name")...)\`.
   - Implement "Think Time" using \`.pause()\`.
   - Use Feeders for data parameterization (\`.feed(csv("file.csv").circular)\`).
   - Handle loops (\`.repeat\`, \`.during\`) and conditions (\`.doIf\`).
   - Group requests if they represent a single user action.

4. **Injection Patterns (Open Model vs Closed Model):**
   - **Open Model:** \`constantUsersPerSec\`, \`rampUsersPerSec\` (Control arrival rate).
   - **Closed Model:** \`constantConcurrentUsers\`, \`rampConcurrentUsers\` (Control concurrency).
   - **Common:** \`rampUsers(N).during(D)\`, \`heavisideClosedUsers(N).during(D)\`.
   - **Throttling:** Use \`.throttle()\` if RPS targets are strict.

5. **Assertions:**
   - Global assertions: \`global.responseTime.percentile3.lt(100)\` (p95 < 100ms).
   - Success rate: \`global.successfulRequests.percent.gt(95)\`.

**Output Requirements:**

Generate a complete, valid Scala file that can be run with Gatling 3.9+.
Return the result as a strictly formatted JSON object matching the schema.
Ensure the Scala code is properly escaped in the JSON string.
`;

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: systemPrompt,
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const userPrompt = `
      Generate a Gatling load testing script for the following requirements:

      ${JSON.stringify(input, null, 2)}

      **Requirements:**
      1. Analyze the input to determine the best test strategy (Smoke, Load, Stress, etc.).
      2. Construct the Scala code with appropriate imports, protocol, and scenario definitions.
      3. Define meaningful assertions based on the test type.
      4. Provide recommendations for running the test.

      Return the response in strict JSON format matching the following structure:
      {
        "scriptMetadata": {
          "simulationName": "string",
          "testType": "string",
          "targetUsers": number,
          "duration": "string",
          "rampUpTime": "string",
          "scenarios": ["string"]
        },
        "generatedScript": {
          "language": "scala",
          "gatlingVersion": "3.9.5",
          "fullCode": "string (complete file content)",
          "sections": {
            "imports": "string",
            "protocol": "string",
            "feeders": "string",
            "scenarios": { "scenarioName": "string" },
            "simulation": "string"
          }
        },
        "testConfiguration": {
          "loadTest": { "users": number, "rampUp": "string", "duration": "string" }
        },
        "prerequisites": ["string"],
        "recommendations": ["string"]
      }
    `;

    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const text = response.text();

    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(jsonString);
    const validation = GatlingScriptSchema.safeParse(parsedData);

    if (validation.success) {
      return { success: true, data: validation.data };
    } else {
      console.error('Schema validation error (Script):', validation.error.errors);
      return { success: false, error: 'AI generated invalid data structure', details: validation.error.errors, raw: parsedData };
    }

  } catch (error) {
    console.error('Gemini API error (Script):', error);
    return { success: false, error: 'Failed to generate script' };
  }
}

export async function analyzeGatlingReport(reportData: any) {
  if (!process.env.GEMINI_API_KEY) {
    return { success: false, error: 'GEMINI_API_KEY is not configured' };
  }

  const systemPrompt = `
You are an expert Performance Analyst. Your job is to analyze Gatling load test reports and identify performance bottlenecks, root causes, and optimization opportunities.

**Analysis Methodology:**

1. **Response Time Analysis:**
   - Evaluate mean, p95, and p99 response times against standard thresholds (e.g., <500ms is Good, >2s is Poor).
   - Identify high variance (difference between mean and p99).
   - Detect degradation over time.

2. **Throughput Analysis:**
   - Check if throughput matches the expected load (Arrival Rate vs Throughput).
   - Identify saturation points (throughput flattens while users increase).
   - Look for sudden drops indicating failures or restarts.

3. **Error Analysis:**
   - Analyze 4xx and 5xx error rates.
   - Correlate errors with high load or specific endpoints.
   - Identify timeout patterns.

4. **Bottleneck Detection:**
   - **CPU/Processing:** High response time with low error rate (often).
   - **Database:** Specific endpoints slow, others fast.
   - **Network/Bandwidth:** Throughput cap reached globally.
   - **Connection Pool:** Timeout errors after a ramp-up.
   - **Memory Leak:** Gradual degradation of response time over long duration.

5. **Capacity Planning:**
   - Estimate max concurrent users based on current results.
   - Suggest scaling strategies (Vertical vs Horizontal).

**Output Requirements:**

Return a comprehensive analysis in strict JSON format.
`;

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: systemPrompt,
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const userPrompt = `
      Analyze the following Gatling test report metrics:

      ${JSON.stringify(reportData, null, 2)}

      **Tasks:**
      1. Summarize the test performance.
      2. Identify specific bottlenecks with severity levels.
      3. Provide concrete optimization suggestions (Application, Infra, DB).
      4. Estimate capacity and provide scaling advice.

      Return the response in strict JSON format matching the following structure:
      {
        "reportSummary": { ... },
        "performanceMetrics": { ... },
        "bottlenecks": [ { "severity": "Critical|High|Medium|Low", ... } ],
        "optimizationSuggestions": [ { "priority": number, ... } ],
        "capacityPlanning": { ... }
      }
    `;

    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const text = response.text();

    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsedData = JSON.parse(jsonString);
    const validation = GatlingReportAnalysisSchema.safeParse(parsedData);

    if (validation.success) {
      return { success: true, data: validation.data };
    } else {
      console.error('Schema validation error (Report):', validation.error.errors);
      return { success: false, error: 'AI generated invalid data structure', details: validation.error.errors, raw: parsedData };
    }

  } catch (error) {
    console.error('Gemini API error (Report):', error);
    return { success: false, error: 'Failed to analyze report' };
  }
}
