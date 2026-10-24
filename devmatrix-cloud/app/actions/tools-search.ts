'use server';

import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { tools } from '@/lib/tools-data';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const searchSchema = {
  type: SchemaType.OBJECT,
  properties: {
    relevantToolIds: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "List of tool IDs that match the user's query"
    },
    suggestedCategories: {
      type: SchemaType.ARRAY,
      items: { type: SchemaType.STRING },
      description: "List of relevant categories if the query is broad"
    },
    reasoning: {
      type: SchemaType.STRING,
      description: "Brief explanation of why these tools were selected"
    }
  },
  required: ['relevantToolIds', 'suggestedCategories', 'reasoning']
};

const model = genAI.getGenerativeModel({
  model: 'gemini-2.5-flash',
  systemInstruction: 'You are a helpful assistant that finds relevant developer tools based on user queries.',
  generationConfig: {
    responseMimeType: 'application/json',
    responseSchema: searchSchema as any,
  },
});

export async function searchTools(query: string) {
  if (!process.env.GEMINI_API_KEY) {
    console.warn('GEMINI_API_KEY is not set');
    // Fallback or empty response
    return { relevantToolIds: [], suggestedCategories: [], reasoning: 'API Key missing' };
  }

  try {
    // Simplify tools list for context to save tokens
    const toolsContext = tools.map(t => ({
      id: t.id,
      name: t.name,
      description: t.description,
      category: t.category,
      features: t.features.slice(0, 5) // Limit features
    }));

    const prompt = `
      User Query: "${query}"

      Available Tools:
      ${JSON.stringify(toolsContext)}

      Task:
      Identify the most relevant tools for the user's query.
      If the user asks for a category (e.g., "PDF tools"), include all relevant tools.
      If the user describes a problem (e.g., "reduce image size"), find the specific tool.

      Return a JSON object with relevantToolIds, suggestedCategories, and reasoning.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return JSON.parse(responseText);
  } catch (error) {
    console.error('Error in searchTools:', error);
    return { relevantToolIds: [], suggestedCategories: [], reasoning: 'Error processing request' };
  }
}
