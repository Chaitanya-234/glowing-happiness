'use server';

import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import { CourseOutlinerSchema } from '@/lib/ai-schemas';

export async function generateCourseOutline(
  topic: string,
  targetAudience: string,
  duration: string,
  styleGuide: string,
  sourceContent?: string
) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        success: false,
        error: 'Gemini API key is not configured.',
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            title: { type: SchemaType.STRING },
            description: { type: SchemaType.STRING },
            modules: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  title: { type: SchemaType.STRING },
                  duration: { type: SchemaType.STRING },
                  lessons: {
                    type: SchemaType.ARRAY,
                    items: {
                      type: SchemaType.OBJECT,
                      properties: {
                        title: { type: SchemaType.STRING },
                        duration: { type: SchemaType.STRING },
                        objectives: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
                        topics: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
                      },
                      required: ["title", "duration", "objectives", "topics"]
                    }
                  }
                },
                required: ["title", "duration", "lessons"]
              }
            },
            quizzes: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  moduleTitle: { type: SchemaType.STRING },
                  questions: {
                    type: SchemaType.ARRAY,
                    items: {
                      type: SchemaType.OBJECT,
                      properties: {
                        question: { type: SchemaType.STRING },
                        options: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
                        correctAnswer: { type: SchemaType.STRING },
                        explanation: { type: SchemaType.STRING }
                      },
                      required: ["question", "options", "correctAnswer", "explanation"]
                    }
                  }
                },
                required: ["moduleTitle", "questions"]
              }
            },
            codingExercises: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  moduleTitle: { type: SchemaType.STRING },
                  title: { type: SchemaType.STRING },
                  description: { type: SchemaType.STRING },
                  starterCode: { type: SchemaType.STRING },
                  solution: { type: SchemaType.STRING },
                  hints: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } }
                },
                required: ["moduleTitle", "title", "description", "starterCode", "solution", "hints"]
              }
            },
            seoMetadata: {
              type: SchemaType.OBJECT,
              properties: {
                title: { type: SchemaType.STRING },
                description: { type: SchemaType.STRING },
                keywords: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } }
              },
              required: ["title", "description", "keywords"]
            },
            faq: {
              type: SchemaType.ARRAY,
              items: {
                type: SchemaType.OBJECT,
                properties: {
                  question: { type: SchemaType.STRING },
                  answer: { type: SchemaType.STRING }
                },
                required: ["question", "answer"]
              }
            },
            scormMetadata: {
              type: SchemaType.OBJECT,
              properties: {
                manifestTitle: { type: SchemaType.STRING },
                identifier: { type: SchemaType.STRING },
                version: { type: SchemaType.STRING },
                scormType: { type: SchemaType.STRING, format: "enum", enum: ["sco", "asset"] }
              },
              required: ["manifestTitle", "identifier", "version", "scormType"]
            }
          },
          required: ["title", "description", "modules", "quizzes", "codingExercises", "seoMetadata", "faq", "scormMetadata"]
        }
      },
    });

    const prompt = `You are an expert instructional designer, SCORM content creator, and educational technologist.
Your task is to generate a comprehensive course outline and associated materials based on the following inputs:

Topic: ${topic}
Target Audience: ${targetAudience}
Duration: ${duration}
Style/Presets: ${styleGuide || 'Standard professional educational tone'}
${sourceContent ? `\nSource Material / Transcripts (Base the course on this content):\n${sourceContent.substring(0, 50000)}\n` : ''}

You must provide:
1. A descriptive Title and short Description for the course.
2. A detailed module breakdown (modules, lessons, objectives, topics). Make sure the total duration aligns with the requested duration.
3. Quiz questions for the modules.
4. Coding exercises (if applicable to the topic, otherwise provide practical exercises formatted similarly). Provide starter code, solution, and hints.
5. SEO metadata for publishing the course online (Title, Description, Keywords).
6. Frequently Asked Questions (FAQ) for prospective students.
7. Basic SCORM package structure metadata (manifest title, identifier, version, and type).

Ensure all outputs follow the provided JSON schema strictly.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    const parsedData = JSON.parse(responseText);
    const validatedData = CourseOutlinerSchema.parse(parsedData);

    return { success: true, data: validatedData };
  } catch (error) {
    console.error('Course Outline Generation Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unexpected error occurred during outline generation.',
    };
  }
}
