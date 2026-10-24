'use server';

import { tools } from '@/lib/tools-data';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import path from 'path';

const apiKey = process.env.GEMINI_API_KEY;

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Cache for site structure to avoid reading FS on every request
let cachedSiteContext: string | null = null;

async function getSiteContext() {
  if (cachedSiteContext) return cachedSiteContext;

  let blogList = 'No blogs found.';
  let gamesList = 'No games found.';
  let aiToolsList = 'No AI tools found.';

  try {
    const blogDir = path.join(process.cwd(), 'app/blog');
    if (fs.existsSync(blogDir)) {
      const blogs = fs.readdirSync(blogDir).filter(f => !f.includes('.')); // Filter out files, keep directories
      blogList = blogs.map(b => `- ${b.replace(/-/g, ' ')} (/blog/${b})`).join('\n');
    }
  } catch (e) {
    console.error('Error reading blog directory:', e);
  }

  try {
    const gamesDir = path.join(process.cwd(), 'app/games');
    if (fs.existsSync(gamesDir)) {
      const games = fs.readdirSync(gamesDir).filter(f => !f.includes('.') && f !== 'GamesPageClient.tsx');
      gamesList = games.map(g => `- ${g.replace(/-/g, ' ')} (/games/${g})`).join('\n');
    }
  } catch (e) {
    console.error('Error reading games directory:', e);
  }

  try {
    const aiToolsDir = path.join(process.cwd(), 'app/ai-tools');
    if (fs.existsSync(aiToolsDir)) {
      const aiTools = fs.readdirSync(aiToolsDir).filter(f => !f.includes('.') && f !== 'AiToolsClient.tsx');
      aiToolsList = aiTools.map(t => `- ${t.replace(/-/g, ' ')} (/ai-tools/${t})`).join('\n');
    }
  } catch (e) {
    console.error('Error reading ai-tools directory:', e);
  }

  const toolsList = tools.map(t => `- ${t.name}: ${t.description} (${t.link})`).join('\n');

  cachedSiteContext = `
Here is the complete knowledge base of Devmetrix.in content:

## Tools (Utilities)
${toolsList}

## AI Tools (Generators & Helpers)
${aiToolsList}

## Games
${gamesList}

## Technical Blogs
${blogList}

## Site Structure
- Home: /
- Tools: /tools (All utilities)
- AI Tools: /ai-tools (All AI generators)
- Blog: /blog
- Games: /games
- Cheat Sheets: /cheat-sheets/[topic]
- Pricing: /pricing (if asked, we offer free tools and some pro plans for AI features)
`;
  return cachedSiteContext;
}

export type ChatMessage = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

// Helper function to estimate tokens (rough approximation)
function estimateTokens(input: string | number): number {
  // Handle both string and number inputs
  const charCount = typeof input === 'string' ? input.length : input;
  // Rough estimate: 1 token ≈ 4 characters
  return Math.ceil(charCount / 4);
}

// Helper function to get history statistics
function getHistoryStats(history: ChatMessage[]) {
  const totalChars = history.reduce((sum, msg) => 
    sum + msg.parts[0].text.length, 0
  );
  const estimatedTokens = estimateTokens(totalChars);
  
  return {
    messageCount: history.length,
    totalChars,
    estimatedTokens,
    shouldTruncate: estimatedTokens > 3000
  };
}

// Intelligent history management with sliding window
function manageHistory(history: ChatMessage[]): ChatMessage[] {
  const MAX_MESSAGES = 10; // Keep last 10 messages (5 exchanges)
  const MAX_TOKENS = 3000; // Approximate token limit for history
  
  // If history is short enough, return as is
  if (history.length <= MAX_MESSAGES) {
    const stats = getHistoryStats(history);
    if (stats.estimatedTokens <= MAX_TOKENS) {
      return history;
    }
  }
  
  // Use sliding window: keep only recent messages
  let processedHistory = history.slice(-MAX_MESSAGES);
  
  // Check if we're still over token limit
  let stats = getHistoryStats(processedHistory);
  
  // If still too large, reduce further
  while (stats.estimatedTokens > MAX_TOKENS && processedHistory.length > 2) {
    processedHistory = processedHistory.slice(2); // Remove 2 oldest messages
    stats = getHistoryStats(processedHistory);
  }
  
  return processedHistory;
}

// Validate history starts with user role
function validateHistory(history: ChatMessage[]): ChatMessage[] {
  if (history.length === 0) return [];
  
  // Find first user message
  const firstUserIndex = history.findIndex(m => m.role === 'user');
  
  if (firstUserIndex === -1) {
    // No user messages found, return empty
    return [];
  }
  
  if (firstUserIndex > 0) {
    // Remove leading model messages
    return history.slice(firstUserIndex);
  }
  
  return history;
}

export async function chatWithDevBot(history: ChatMessage[], message: string, currentPath: string) {
  if (!genAI) {
      return {
          success: false,
          message: "I'm currently sleeping! (API Key not configured)"
      };
  }

  const context = await getSiteContext();
  
  const systemInstruction = `
You are DevBot, the intelligent, friendly, and Gen-Z savvy assistant for Devmetrix.in.
Your goal is to help users navigate the site, find tools, read blogs, and understand features.

**Tone & Style:**
- Friendly, enthusiastic, and helpful.
- Use emojis occasionally (✨, 🚀, 🤖, 💻).
- Be concise but informative.
- Use Markdown for formatting (bold, lists, links).

**Context:**
The user is currently browsing: ${currentPath}
${context}

**Instructions:**
1. If the user asks for a tool, blog, or game, provide a direct link in Markdown format: [Link Text](/path).
2. If the user is on a specific page, offer help related to that page.
3. If the user asks "What can you do?", list categories (Tools, AI, Blogs, Games).
4. If the user asks technical questions, answer briefly and suggest a relevant tool or blog post if available.
5. If you don't know the answer, politely say so and suggest exploring the /tools page.
6. Always check the knowledge base before answering.
`;

  try {
    // Step 1: Manage history size with sliding window
    let processedHistory = manageHistory(history);
    
    // Step 2: Validate history format (must start with user)
    processedHistory = validateHistory(processedHistory);
    
    // Log stats for debugging (optional)
    const stats = getHistoryStats(processedHistory);
    console.log(`DevBot Stats: ${stats.messageCount} messages, ~${stats.estimatedTokens} tokens`);
    
    // Step 3: Instantiate model with dynamic system instruction
    const model = genAI.getGenerativeModel({
      model: 'models/gemini-2.5-flash',
      systemInstruction: systemInstruction,
    });

    // Step 4: Start chat with processed history
    const chat = model.startChat({
      history: processedHistory.map(h => ({
        role: h.role,
        parts: h.parts
      })),
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    // Step 5: Send user message
    const result = await chat.sendMessage(message);
    const response = result.response.text();
    
    return { 
      success: true, 
      message: response,
      historyTruncated: processedHistory.length < history.length,
      stats: stats
    };
  } catch (error) {
    console.error('DevBot Error:', error);
    
    // Check if it's a token limit error
    if (error instanceof Error && error.message.includes('token')) {
      return { 
        success: false, 
        message: "Whoa! Our conversation got too long. 🤯 Let's start fresh - ask me anything!" 
      };
    }
    
    return { 
      success: false, 
      message: "Oops! My circuits are a bit crossed. 🤖💥 Try asking again in a moment." 
    };
  }
}
