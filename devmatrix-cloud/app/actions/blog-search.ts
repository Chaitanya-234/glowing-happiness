'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { getAllPosts, BlogPost } from '@/lib/blog-data';
import clientPromise from '@/lib/mongodb';

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function searchBlogPosts(query: string): Promise<string[]> {
  if (!query.trim()) return [];

  // Get static posts
  const staticPosts = getAllPosts();
  let dbPosts: BlogPost[] = [];

  // Get DB posts
  try {
    const client = await clientPromise;
    const db = client.db('blog_database');
    const posts = await db
      .collection('posts')
      .find({})
      .sort({ datePublished: -1 })
      .toArray();

    dbPosts = posts.map(post => ({
      ...post,
      _id: post._id.toString()
    })) as unknown as BlogPost[];
  } catch (error) {
    console.error('Error fetching posts from MongoDB for search:', error);
  }

  const allPosts = [...dbPosts, ...staticPosts];
  const lowerQuery = query.toLowerCase();

  // Fallback function for basic search
  const basicSearch = () => {
    return allPosts
      .filter(p =>
        p.title.toLowerCase().includes(lowerQuery) ||
        p.excerpt.toLowerCase().includes(lowerQuery) ||
        p.tags.some(t => t.toLowerCase().includes(lowerQuery)) ||
        p.category.toLowerCase().includes(lowerQuery) ||
        p.author.name.toLowerCase().includes(lowerQuery)
      )
      .map(p => p.id);
  };

  // If no API key, fallback to basic search
  if (!genAI) {
    console.warn("Gemini API Key missing, falling back to basic search");
    return basicSearch();
  }

  try {
    // Use the requested model
    const model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash' });

    // Prepare context (lightweight version of posts to save tokens)
    const postsContext = allPosts.map(p => ({
      id: p.id,
      title: p.title,
      excerpt: p.excerpt,
      tags: p.tags,
      category: p.category
    }));

    const prompt = `
    You are an intelligent search engine for a technical developer blog.

    User Query: "${query}"

    Here is the list of available blog posts:
    ${JSON.stringify(postsContext)}

    Task:
    1. Analyze the user query to understand their intent (e.g., "posts about react" -> filter by React tag/title; "beginners guide" -> filter by difficulty or keywords).
    2. Rank the posts by relevance to the query.
    3. Return a JSON array of strings containing ONLY the 'id' of the matching posts, sorted by relevance (most relevant first).
    4. If no posts are relevant, return an empty array [].
    5. STRICTLY return only the JSON array. No markdown formatting (like \`\`\`json), no explanation.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Clean up potential markdown formatting from the model
    const cleanedText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

    let matchedIds: string[] = [];
    try {
      matchedIds = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error("Failed to parse Gemini response:", responseText);
      return basicSearch();
    }

    if (Array.isArray(matchedIds)) {
      // Filter out any IDs that might not exist (hallucinations)
      const validIds = matchedIds.filter(id => allPosts.some(p => p.id === id));

      // If AI returns nothing but basic search would find something (e.g. exact title match), maybe merge?
      // For now, trust the AI but if it returns empty for a very obvious keyword, it might be an issue.
      // However, usually AI is better.

      return validIds;
    }

    return basicSearch();

  } catch (error) {
    console.error("Gemini Search Error:", error);
    // Fallback to basic search on error
    return basicSearch();
  }
}
