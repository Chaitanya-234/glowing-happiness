'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { GraphQLDesignerSchema } from '../../../lib/ai-schemas';
import { z } from 'zod';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export type RestApiInput = {
  format: 'openapi' | 'postman' | 'manual' | 'curl' | 'json' | 'text';
  content: string; // The actual content (JSON string, text description, etc.)
  context?: string; // Optional user context or extra instructions
};

const SYSTEM_PROMPT = `
You are an expert GraphQL Architect and Backend Engineer. Your task is to analyze REST API inputs (OpenAPI, Postman, manual lists, cURL, etc.) and generate a production-ready GraphQL schema with complete resolvers, DataLoader optimization, and migration strategies.

**1. REST API Analysis:**
- Identify HTTP methods, URL paths, path/query parameters, request/response bodies, authentication, and error responses.
- Infer data structures: entity types, field names/types, required/optional/nullable fields, enums, array fields, timestamps.
- Normalize naming: convert snake_case to camelCase, handle singular/plural conventions.

**2. Relationship Inference:**
- One-to-One: Detect from foreign keys, embedded objects, specific endpoints (e.g., /users/:id/profile).
- One-to-Many: Detect from arrays, foreign keys in child entities, nested endpoints (e.g., /users/:id/posts).
- Many-to-Many: Detect from junction tables/endpoints, arrays on both sides.
- Self-Referential: Detect from parentId fields, tree structures.
- Score confidence (High/Medium/Low) for each relationship.

**3. GraphQL Schema Generation (SDL):**
- **Types:** Use ID!, proper scalars (DateTime, JSON, URL, Email), enums, and non-nullable fields where appropriate.
- **Inputs:** Separate Create/Update inputs. Update inputs should have optional fields.
- **Queries:** Single entity (user), List with pagination (users with limit/offset/cursor), Filters (where), Sorting (orderBy).
- **Mutations:** CRUD operations (create, update, delete). Return created/updated entities.
- **Connection Types:** Implement Relay-style connections or standard limit/offset responses.

**4. Resolver Implementation:**
- **Query Resolvers:** Map to REST endpoints, handle auth, transform responses, handle errors.
- **Field Resolvers:** Implement for relationships. **CRITICAL: Use DataLoader pattern** to solve N+1 problems.
- **Mutation Resolvers:** Validate input, call REST API, handle side effects.
- **Error Handling:** Wrap in try-catch, format errors.

**5. DataLoader Optimization:**
- Identify N+1 opportunities.
- Generate DataLoader instances (batch functions).
- Show how to integrate Loaders into context and resolvers.

**6. Client Query Generation:**
- Generate example queries (Get, List) and mutations (Create, Update).
- Include fragments for reusability.

**7. Migration Strategy:**
- Assess complexity.
- Propose a phased rollout (Setup, Parallel Running, Client Migration, Deprecation).
- Provide code comparison (REST fetch vs GraphQL query).

**8. Output Format:**
- Return strictly a JSON object adhering to the provided schema.
`;

export async function generateGraphQLSchema(input: RestApiInput) {
  if (!genAI) {
    throw new Error('GEMINI_API_KEY is not set');
  }

  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction: SYSTEM_PROMPT
  });

  const userPrompt = `
Analyze the following REST API definition and generate a complete GraphQL design.

**Input Format:** ${input.format}
**Content:**
${input.content}

**Additional Context:**
${input.context || 'None'}

Return the result strictly as a JSON object matching the following schema structure. Ensure the JSON is valid and complete.
  `;

  // We provide a simplified schema description to guide the model,
  // relying on the Zod schema for strict validation after generation.
  const schemaDescription = `{
  "apiAnalysis": {
    "totalEndpoints": number,
    "entitiesDetected": number,
    "relationshipsFound": number,
    "confidence": "High" | "Medium" | "Low",
    "endpoints": [{ "method": "...", "path": "...", "params": [...], "response": { "type": "...", "sample": {...} } }]
  },
  "relationships": [{ "type": "...", "from": "...", "to": "...", "via": "...", "confidence": number, "evidence": [...] }],
  "graphqlSchema": {
    "types": "SDL string...",
    "queries": "SDL string...",
    "mutations": "SDL string...",
    "inputs": "SDL string...",
    "enums": "SDL string...",
    "customScalars": ["..."]
  },
  "resolvers": {
    "queries": { "queryName": { "code": "...", "restEndpoint": "...", "description": "..." } },
    "mutations": { ... },
    "fieldResolvers": { "Type.field": { "code": "...", "optimization": "...", "restEndpoint": "..." } }
  },
  "dataLoaders": {
    "loaderName": { "batchFunction": "...", "purpose": "...", "restEndpoint": "..." }
  },
  "clientQueries": {
    "examples": [{ "name": "...", "query": "...", "variables": {...}, "description": "...", "equivalentREST": "..." }],
    "fragments": ["..."]
  },
  "migrationGuide": {
    "complexity": "...",
    "estimatedEffort": "...",
    "phases": [{ "phase": number, "name": "...", "duration": "...", "tasks": [...] }],
    "codeExamples": { "restToGraphQL": { "before": "...", "after": "..." } }
  },
  "optimizations": { "dataLoader": "...", "queryCost": "...", "caching": "...", "monitoring": "..." },
  "comparison": { "benefits": [...], "tradeoffs": [...], "metrics": { "apiCallReduction": "...", "payloadSizeReduction": "...", "developmentSpeedIncrease": "..." } },
  "implementation": {
    "serverSetup": { "language": "...", "framework": "...", "code": "..." },
    "clientSetup": { "framework": "...", "code": "..." }
  }
}`;

  try {
    const result = await model.generateContent({
      contents: [
        { role: 'user', parts: [{ text: userPrompt + "\n\nTarget JSON Structure:\n" + schemaDescription }] }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const text = result.response.text();
    // Basic cleanup if the model wraps in markdown
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();

    const json = JSON.parse(cleanedText);
    return GraphQLDesignerSchema.parse(json);
  } catch (error) {
    console.error('Error generating GraphQL schema:', error);
    if (error instanceof z.ZodError) {
        console.error('Zod Validation Error:', JSON.stringify(error.errors, null, 2));
        throw new Error(`Validation failed: ${error.errors.map(e => e.message).join(', ')}`);
    }
    throw new Error('Failed to generate GraphQL schema');
  }
}
