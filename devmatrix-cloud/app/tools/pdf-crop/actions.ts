'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { PDFCropSchema } from '@/lib/ai-schemas';

const getGenAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is not set");
    throw new Error("GEMINI_API_KEY is not configured");
  }
  return new GoogleGenerativeAI(apiKey);
};

export async function analyzePDFPage(
  imageBase64: string,
  pageNumber: number,
  width: number,
  height: number
) {
  try {
    const genAI = getGenAI();

    const systemPrompt = `
You are an expert Document Analysis AI specializing in PDF cropping and layout detection.
Your task is to analyze an image of a PDF page and determine the optimal cropping boundaries.

**Input Context:**
- Page Number: ${pageNumber}
- Page Width: ${width} points
- Page Height: ${height} points
- The provided image represents the full page content.

**Your Objectives:**
1. **Analyze Layout:** Identify text blocks, images, headers, footers, and page numbers.
2. **Detect Artifacts:** Identify scanner borders, black edges, punch holes, or excessive noise.
3. **Determine Content Bounds:** Calculate the bounding box that contains all meaningful content.
4. **Suggest Crop:** Calculate optimal crop margins to remove empty whitespace and artifacts while preserving content with a safe padding.
5. **Output Format:** JSON matching the defined schema.

**Coordinate System:**
- Use "points" as the unit (1/72 inch standard PDF unit).
- \`contentBounds\` should be absolute coordinates (left, top, right, bottom) from the top-left origin (0,0).
- \`suggestedCrop\` should be the **margins to remove** from each side (left, top, right, bottom).
  - e.g., if you want to remove 20 points from the left, \`suggestedCrop.left\` = 20.
- \`croppedSize\` should be the resulting width/height after applying margins.

**Response Structure:**
Return a strictly valid JSON object. Do not include markdown formatting.
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
      systemInstruction: systemPrompt,
    });

    // Remove data:image/png;base64, prefix if present
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Data,
          mimeType: "image/png",
        },
      },
      {
        text: `Analyze this PDF page (Page ${pageNumber}). Dimensions: ${width}x${height} points. Return valid JSON matching the schema.`,
      },
    ]);

    const response = await result.response;
    const text = response.text();
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
      const parsedData = JSON.parse(jsonString);
      // Validate against schema, but be lenient with optional fields if needed.
      // The schema expects cropSuggestions to be an array.

      // Fix potential structure issues if AI returns single object instead of expected structure
      if (!parsedData.analysis && parsedData.pageCount) {
         // It might be flat, wrap it? No, explicit schema usually guides Gemini well.
      }

      const validation = PDFCropSchema.safeParse(parsedData);

      if (validation.success) {
        return { success: true, data: validation.data };
      } else {
        console.error("PDF Crop Schema Validation Failed:", validation.error);
        // Attempt to fix or return partial
        return { success: false, error: "AI response did not match schema", details: validation.error };
      }
    } catch (e) {
      console.error("JSON Parse Error:", e);
      return { success: false, error: "Failed to parse AI response" };
    }

  } catch (error) {
    console.error("Analyze PDF Page Error:", error);
    return { success: false, error: "Failed to process request" };
  }
}
