import I18nGeneratorClient from './components/I18nGeneratorClient';

export default function Page() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1120]">
      {/* Hero Section */}
      <div className="bg-slate-50 dark:bg-[#0f172a] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 pt-24 pb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white text-center mb-6">
            AI Internationalization (i18n) Generator
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 text-center max-w-3xl mx-auto">
            Automatically extract translatable strings, generate translation files for 100+ languages, and set up your i18n configuration in minutes.
          </p>
        </div>
      </div>

      {/* Tool Interface */}
      <I18nGeneratorClient />

      {/* Detailed Content / Article */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <article className="prose prose-slate dark:prose-invert lg:prose-lg max-w-none">

          <h2>What is Internationalization (i18n)?</h2>
          <p>
            Internationalization, commonly abbreviated as <strong>i18n</strong> (because there are 18 letters between the 'i' and the 'n'), is the process of designing and developing a software application so that it can be adapted to various languages and regions without engineering changes.
          </p>
          <p>
            In a globalized world, limiting your application to a single language means missing out on a vast audience. i18n involves abstracting all user-facing strings into resource files, handling date and number formatting based on locale, and ensuring layouts can accommodate text of varying lengths and directions (like RTL languages).
          </p>
          <p>
            This is distinct from <strong>Localization (L10n)</strong>, which is the actual process of translating the text and adapting the content for a specific market. Internationalization is the technical preparation; localization is the content adaptation.
          </p>

          <h2>Why Automate i18n Setup?</h2>
          <p>
            Setting up internationalization manually is a notoriously tedious and error-prone task. Developers often face several challenges:
          </p>
          <ul>
            <li><strong>Manual Extraction:</strong> Hunting through thousands of lines of code to find every "Submit" button or error message is exhausting and easy to mess up.</li>
            <li><strong>Context Loss:</strong> Moving a string like "Open" to a JSON file often strips it of context—does it mean "Open a file" or "Open status"?</li>
            <li><strong>Configuration Complexity:</strong> Setting up libraries like <code>i18next</code> or <code>react-intl</code> requires boilerplate code for providers, hooks, and loaders.</li>
            <li><strong>Maintenance Nightmares:</strong> Keeping translation files in sync with code changes is a constant struggle.</li>
          </ul>
          <p>
            Our <strong>AI i18n Generator</strong> solves these problems by using advanced Large Language Models (LLMs) to understand your code, extract strings with context, and generate a production-ready setup instantly.
          </p>

          <h2>How Our AI i18n Generator Works</h2>

          <h3>Step 1: Code Analysis</h3>
          <p>
            When you upload your code, our system uses the Gemini API to scan your files. It doesn't just look for quote marks; it understands the Abstract Syntax Tree (AST) of your component. It distinguishes between a user-facing label like <code>&lt;button&gt;Save&lt;/button&gt;</code> and a technical string like <code>className="btn-primary"</code>.
          </p>

          <h3>Step 2: String Extraction</h3>
          <p>
            The AI identifies strings that need translation and ignores those that don't. It's smart enough to detect:
          </p>
          <ul>
            <li><strong>Static Text:</strong> Simple headers and paragraphs.</li>
            <li><strong>Attributes:</strong> <code>placeholder</code>, <code>title</code>, and <code>aria-label</code> props.</li>
            <li><strong>Interpolation:</strong> Dynamic strings like "Hello, &#123;name&#125;" are preserved with their variables.</li>
            <li><strong>Pluralization:</strong> It detects logic like "1 item" vs "2 items" and structures keys accordingly.</li>
          </ul>

          <h3>Step 3: Translation Key Generation</h3>
          <p>
            Instead of generic keys like <code>string_1</code>, our tool generates semantic keys based on content and context. A button text "Save Changes" inside a profile form might get the key <code>profile.form.save_changes</code>. This dot-notation namespacing keeps your translation files organized and maintainable.
          </p>

          <h3>Step 4: Configuration Generation</h3>
          <p>
            Depending on your chosen library (i18next, react-intl, etc.), the tool generates the necessary configuration files. This includes initializing the i18n instance, setting up language detection plugins, and configuring the <code>I18nProvider</code> for your application root.
          </p>

          <h3>Step 5: Translation File Creation</h3>
          <p>
            Finally, it generates the actual <code>en.json</code>, <code>es.json</code>, etc., files. If you opt for AI translation, it populates these files with initial translations, giving you a running start.
          </p>

          <h2>Key Features Explained</h2>

          <h3>Multi-Framework Support</h3>
          <p>
            Different projects have different needs. We support the major players in the JavaScript ecosystem:
          </p>
          <ul>
            <li><strong>i18next:</strong> The most popular, feature-rich framework. Ideal for large enterprise apps.</li>
            <li><strong>react-intl:</strong> Part of the FormatJS suite, standard in the React ecosystem. Excellent for date/number formatting.</li>
            <li><strong>next-intl:</strong> Optimized specifically for Next.js App Router, with full Server Component support.</li>
            <li><strong>vue-i18n:</strong> The de facto standard for Vue.js applications.</li>
          </ul>

          <h3>100+ Language Support</h3>
          <p>
            Scale your application globally. From widespread languages like Spanish, French, and Chinese to regional dialects. Our tool sets up the correct ISO 639-1 codes (e.g., <code>en-US</code> vs <code>en-GB</code>) to ensure browsers detect the language correctly.
          </p>

          <h3>Pluralization Handling</h3>
          <p>
            Pluralization is one of the hardest parts of i18n. English has two forms (singular/plural), but Arabic has six, and Russian has three complex rules. Our tool detects count-based logic in your code (e.g., <code>items.length</code> checks) and generates the correct plural keys (<code>key_zero</code>, <code>key_one</code>, <code>key_other</code>) required by your i18n library.
          </p>

          <h3>RTL Language Support</h3>
          <p>
            Right-to-Left (RTL) languages like Arabic, Hebrew, and Persian require more than just translation; the UI layout must flip. Our generator includes RTL detection in the configuration, allowing you to automatically apply <code>dir="rtl"</code> to your document body or specific components when an RTL language is active.
          </p>

          <h2>Supported i18n Libraries</h2>

          <h3>i18next</h3>
          <p>
            i18next is a mature, powerful library. Our tool generates an <code>i18n.ts</code> file that initializes the instance, configures the HTTP backend (if needed) to load translations, and sets up the language detector.
          </p>
          <pre><code>{`// Generated i18n.ts example
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/common.json';

i18n
  .use(initReactI18next)
  .init({
    resources: { en: { common: en } },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });
`}</code></pre>

          <h3>react-intl</h3>
          <p>
            Uses the Context API to provide translations. We generate the wrapper component and the message definitions.
          </p>

          <h3>next-intl</h3>
          <p>
            Modern Next.js 13+ applications use Server Components. <code>next-intl</code> allows you to translate on the server, sending zero JavaScript to the client for static text. We generate the <code>middleware.ts</code> and <code>i18n.ts</code> request config required for this setup.
          </p>

          <h2>Best Practices for i18n</h2>
          <p>
            To ensure a smooth internationalization process, follow these guidelines:
          </p>
          <ol>
            <li><strong>Start Early:</strong> Retrofitting i18n into a finished app is painful. Use this tool early in your development cycle.</li>
            <li><strong>Use Keys, Not English:</strong> Don't use <code>t('Hello World')</code>. Use <code>t('home.greeting')</code>. This allows you to change the English text without refactoring code.</li>
            <li><strong>Avoid String Concatenation:</strong> Don't do <code>"Hello " + name</code>. Languages have different word orders. Use interpolation: <code>t('greeting', &#123; name &#125;)</code>.</li>
            <li><strong>Provide Context:</strong> When sending files to human translators, add comments about where the string appears (e.g., "Button on the payment modal").</li>
            <li><strong>Design for Expansion:</strong> German words are often 30% longer than English. Ensure your buttons and containers can expand flexibly.</li>
          </ol>

          <h2>Common Challenges and Solutions</h2>

          <h3>Text Expansion</h3>
          <p>
            <strong>Problem:</strong> A button designed for "Save" fits perfectly, but the German "Speichern" breaks the layout.<br/>
            <strong>Solution:</strong> Use CSS flexbox or grid to allow containers to grow. Avoid fixed widths in pixels.
          </p>

          <h3>Missing Translations</h3>
          <p>
            <strong>Problem:</strong> You added a new feature but haven't translated the strings yet.<br/>
            <strong>Solution:</strong> Always configure a <code>fallbackLng</code> (usually English). Our generated config includes this safety net so users see English instead of a missing key.
          </p>

          <h3>Date and Number Formatting</h3>
          <p>
            <strong>Problem:</strong> 1,000.00 in the US is 1.000,00 in Germany.<br/>
            <strong>Solution:</strong> Don't format manually. Use the <code>Intl.NumberFormat</code> and <code>Intl.DateTimeFormat</code> APIs, which are supported by all modern browsers and integrated into the i18n libraries we support.
          </p>

          <h2>Frequently Asked Questions</h2>

          <div className="space-y-6 mt-8">
            <div>
              <h3 className="text-xl font-bold mb-2">How accurate is the AI translation?</h3>
              <p>
                The AI translations (powered by Gemini) are excellent for prototyping and getting started. They understand context better than old machine translation. However, for a production-grade application, we strongly recommend having a professional translator or native speaker review the content, especially for nuanced brand messaging.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Can I use this for existing projects?</h3>
              <p>
                Absolutely! This tool is perfect for migrating an existing codebase. Upload your component files, and it will extract the hardcoded strings, giving you the JSON files and keys you need to replace them.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Is my code stored or shared?</h3>
              <p>
                No. Your code is processed in real-time by the API for analysis and extraction only. We do not store, log, or train models on your uploaded code. Privacy is a top priority.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">How do I handle dynamic content?</h3>
              <p>
                Our tool detects variables in your code. If you have <code>Hello &#123;user.name&#125;</code>, it will generate a key that accepts a variable, e.g., <code>"greeting": "Hello &#123;&#123;name&#125;&#125;"</code>. You then pass the variable in your code: <code>t('greeting', &#123; name: user.name &#125;)</code>.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">What file formats are supported?</h3>
              <p>
                We currently support JavaScript (.js), JSX (.jsx), TypeScript (.ts, .tsx), Vue (.vue), Svelte (.svelte), and HTML files. The extraction logic is optimized for modern component-based frameworks.
              </p>
            </div>
          </div>

        </article>

        {/* Schema.org Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "AI i18n Generator",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "Free AI-powered tool to automate internationalization setup, extract strings, and generate translation files.",
              "featureList": "Automatic string extraction, multi-language translation generation, i18next/react-intl configuration setup, pluralization handling",
              "screenshot": "https://devmetrix.in/images/tools/i18n-generator-preview.png"
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How accurate is the AI translation?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The AI translations are excellent for prototyping but should be reviewed by human translators for production use."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I use this for existing projects?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, it is designed to help migrate existing codebases by extracting hardcoded strings."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is my code stored?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No, code is processed in real-time and not stored."
                  }
                }
              ]
            })
          }}
        />
      </div>
    </div>
  );
}
