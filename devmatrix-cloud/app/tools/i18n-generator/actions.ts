'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface ExtractedString {
  id: string;
  original: string;
  key: string;
  context?: string;
  category: 'text' | 'button' | 'label' | 'error' | 'placeholder' | 'other';
  needsPlural: boolean;
  file?: string;
}

export interface I18nConfig {
  library: 'i18next' | 'react-intl' | 'next-intl' | 'vue-i18n';
  sourceLanguage: string;
  targetLanguages: string[];
  features: {
    pluralization: boolean;
    rtl: boolean;
    namespaces: boolean;
  };
  outputFormat: 'json' | 'yaml' | 'po';
}

const EXTRACTION_PROMPT = `
You are an expert internationalization (i18n) engineer. Your task is to analyze code and extract user-facing translatable strings.

**Analysis Capabilities:**
- Scan code files for user-facing text (strings in JSX, templates, HTML)
- Identify hardcoded strings that need translation
- Detect context clues (button text, error messages, labels, placeholders)
- Recognize pluralization needs (1 item vs 2 items)
- Detect dynamic content with interpolation ({{name}}, {count})

**Extraction Rules:**
- Extract strings from JSX text content
- Extract strings from component props (title, placeholder, aria-label)
- Extract strings from validation messages and toast notifications
- Ignore code-related strings (CSS classes, IDs, technical values, URLs, API endpoints)
- Preserve variable placeholders

**Output Format:**
Return a valid JSON object with a "strings" array. Each item should have:
- "original": The exact string found
- "key": A suggested semantic key (dot notation, e.g., "common.save", "errors.required")
- "context": Where it appears or usage notes
- "category": One of "text", "button", "label", "error", "placeholder", "other"
- "needsPlural": boolean
`;

export async function extractStrings(code: string, fileName: string) {
  if (!process.env.GEMINI_API_KEY) {
    // Fallback simulation for development without API key
    return {
      success: true,
      strings: [
        { id: '1', original: 'Welcome to our app', key: 'home.welcome', category: 'text', needsPlural: false, context: 'Hero title' },
        { id: '2', original: 'Submit', key: 'common.submit', category: 'button', needsPlural: false, context: 'Form button' },
        { id: '3', original: 'You have {count} messages', key: 'messages.count', category: 'text', needsPlural: true, context: 'Notification' }
      ] as ExtractedString[]
    };
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: EXTRACTION_PROMPT,
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `Analyze this ${fileName} code and extract translatable strings:\n\n${code}`;
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    const parsed = JSON.parse(response);

    // Add IDs and file info
    const strings = (parsed.strings || []).map((s: any, index: number) => ({
      ...s,
      id: `${Date.now()}-${index}`,
      file: fileName
    }));

    return { success: true, strings };
  } catch (error) {
    console.error('Extraction error:', error);
    return { success: false, error: 'Failed to extract strings' };
  }
}

const TRANSLATION_PROMPT = `
You are a professional translator and i18n expert. Translate the provided strings into the target languages.

**Rules:**
- Maintain tone and context
- Preserve variable placeholders exactly (e.g., {{name}}, {count})
- Handle plural forms correctly if "needsPlural" is true
- Provide appropriate RTL characters for RTL languages
- Use natural, native-sounding phrasing
`;

export async function translateStrings(strings: ExtractedString[], targetLanguages: string[], sourceLanguage: string) {
  if (!process.env.GEMINI_API_KEY) {
     // Simulation
     const mockTranslations: Record<string, Record<string, string>> = {};
     targetLanguages.forEach(lang => {
       mockTranslations[lang] = {};
       strings.forEach(s => {
         mockTranslations[lang][s.key] = `[${lang}] ${s.original}`;
       });
     });
     return { success: true, translations: mockTranslations };
  }

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: TRANSLATION_PROMPT,
      generationConfig: { responseMimeType: "application/json" }
    });

    const prompt = `
      Source Language: ${sourceLanguage}
      Target Languages: ${targetLanguages.join(', ')}
      Strings to Translate: ${JSON.stringify(strings.map(s => ({ key: s.key, original: s.original, context: s.context, needsPlural: s.needsPlural })))}

      Output JSON format: { "translations": { "langCode": { "key": "translation" } } }
      For plural strings, use nested objects or library-specific suffixes (e.g., key_one, key_other) suitable for i18next by default.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    const parsed = JSON.parse(response);

    return { success: true, translations: parsed.translations };
  } catch (error) {
    console.error('Translation error:', error);
    return { success: false, error: 'Failed to translate strings' };
  }
}

const GENERATION_PROMPT = `
You are a senior frontend architect. Generate a complete internationalization (i18n) setup for a Next.js 15 project.

**Task:**
Create configuration files, translation files, and setup instructions based on the provided configuration and translated strings.

**Output:**
Return a JSON object with a "files" array. Each file object must have:
- "path": Relative path (e.g., "i18n.ts", "locales/en/common.json")
- "content": The string content of the file (code or JSON)
- "type": "config" | "translation" | "doc"

Include:
1. Configuration file (i18n.ts, i18next-parser.config.js, etc.) specific to the selected library.
2. Translation files (JSON) for all languages.
3. A "setup-guide.md" with step-by-step instructions.
4. A "usage-examples.md" showing how to use the translation hooks/components.
5. A "migration-guide.md" on how to replace the extracted strings.
`;

export async function generateI18nSetup(
  config: I18nConfig,
  strings: ExtractedString[],
  translations: Record<string, any>
) {
    if (!process.env.GEMINI_API_KEY) {
        // Simulation
        return {
            success: true,
            files: [
                { path: 'locales/en/common.json', content: JSON.stringify({ hello: 'World' }, null, 2), type: 'translation' },
                { path: 'setup.md', content: '# Setup\n\nRun npm install...', type: 'doc' }
            ]
        };
    }

    try {
        const model = genAI.getGenerativeModel({
            model: 'gemini-2.5-flash',
            systemInstruction: GENERATION_PROMPT,
            generationConfig: { responseMimeType: "application/json" }
        });

        const prompt = `
            Config: ${JSON.stringify(config)}
            Strings: ${JSON.stringify(strings.map(s => ({ key: s.key, original: s.original })))}
            Translations: ${JSON.stringify(translations)}
        `;

        const result = await model.generateContent(prompt);
        const response = result.response.text();
        const parsed = JSON.parse(response);

        return { success: true, files: parsed.files };

    } catch (error) {
        console.error('Generation error:', error);
        return { success: false, error: 'Failed to generate setup' };
    }
}
