'use client';

import React from 'react';
import AdContainer from '@/components/AdContainer';
import Link from 'next/link';

export function LighthouseGuide() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-4xl mx-auto py-12 px-4 md:px-0">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
        The Ultimate Guide to Google Lighthouse and Next.js Optimization
      </h2>

      <p className="lead text-xl text-slate-600 dark:text-slate-300 mb-8">
        Achieving a perfect 100/100 Lighthouse score is the holy grail for modern web developers.
        It signifies not just technical excellence, but a superior user experience, better search engine rankings,
        and broader accessibility. This comprehensive guide will take you deep into the mechanics of Google Lighthouse,
        Core Web Vitals, and how to optimize your Next.js application for peak performance.
      </p>

      <div className="my-8">
         <AdContainer slot="4520516006" />
      </div>

      <h2 id="what-is-lighthouse" className="scroll-mt-20">What is Google Lighthouse?</h2>
      <p>
        Google Lighthouse is an open-source, automated tool for improving the quality of web pages.
        You can run it against any web page, public or requiring authentication. It has audits for performance,
        accessibility, progressive web apps, SEO, and more.
      </p>
      <p>
        Originally developed by Google as a Chrome Extension, it is now integrated directly into Chrome DevTools,
        PageSpeed Insights, and web.dev. When you run a Lighthouse audit, it fires up a browser instance (often headless),
        loads your page, and runs a series of checks against it. These checks range from simple meta tag verifications
        to complex performance profiling using trace data.
      </p>
      <p>
        The significance of Lighthouse cannot be overstated. With Google's Core Web Vitals becoming a ranking signal
        in 2021, the metrics measured by Lighthouse directly influence your site's visibility in search results.
        Beyond SEO, study after study has shown that improved performance metrics correlate strongly with user retention,
        conversion rates, and revenue.
      </p>

      <h2 id="understanding-scores" className="scroll-mt-20">Understanding Lighthouse Scores</h2>
      <p>
        Lighthouse scores are calculated based on weighted averages of various audit results. Each category
        (Performance, Accessibility, Best Practices, SEO) is scored from 0 to 100.
      </p>
      <ul>
        <li><strong>0 to 49 (Red):</strong> Poor. Significant issues affecting users.</li>
        <li><strong>50 to 89 (Orange):</strong> Needs Improvement. Functional but not optimal.</li>
        <li><strong>90 to 100 (Green):</strong> Good. Follows best practices and delivers excellent UX.</li>
      </ul>
      <p>
        It's important to note that the <strong>Performance</strong> score is a weighted average of metric scores.
        The weights change over time as Google refines what matters most for users. Currently, metrics like
        Largest Contentful Paint (LCP) and Total Blocking Time (TBT) carry the heaviest weight.
      </p>

      <h2 id="four-categories" className="scroll-mt-20">The Four Lighthouse Categories Explained</h2>

      <h3>1. Performance Score</h3>
      <p>
        This is often the hardest score to perfect. It analyzes how quickly a web page loads and how quickly
        users can interact with it. The key metrics include:
      </p>
      <ul>
        <li><strong>Largest Contentful Paint (LCP):</strong> Measures loading performance. Ideally &lt; 2.5s.</li>
        <li><strong>Cumulative Layout Shift (CLS):</strong> Measures visual stability. Ideally &lt; 0.1.</li>
        <li><strong>Interaction to Next Paint (INP):</strong> Measures responsiveness (replaced FID). Ideally &lt; 200ms.</li>
        <li><strong>Total Blocking Time (TBT):</strong> Measures load responsiveness. Ideally &lt; 200ms.</li>
        <li><strong>Speed Index:</strong> How quickly content is visually displayed.</li>
      </ul>

      <h3>2. Accessibility Score</h3>
      <p>
        This category checks your site against the Web Content Accessibility Guidelines (WCAG). It ensures your
        site is usable by people with disabilities. Checks include color contrast ratios, proper ARIA labels,
        heading structures, and keyboard navigation. Failing these not only hurts users but can expose businesses
        to legal risks.
      </p>

      <h3>3. Best Practices Score</h3>
      <p>
        This audit looks for general web best practices. It checks for secure connections (HTTPS),
        correct image aspect ratios, deprecated API usage, and security vulnerabilities in JavaScript libraries.
        It's essentially a health check for your codebase's hygiene.
      </p>

      <h3>4. SEO Score</h3>
      <p>
        The SEO audit checks for technical aspects that ensure your page can be crawled and understood by search engines.
        It verifies mobile-friendliness, valid structured data, proper meta tags, and legible font sizes. Note that
        a 100 SEO score doesn't guarantee a #1 ranking, but a low score is definitely a handicap.
      </p>

      <div className="my-8">
         <AdContainer slot="7853256351" />
      </div>

      <h2 id="ai-advantage" className="scroll-mt-20">Why AI-Powered Analysis is Better</h2>
      <p>
        A raw Lighthouse report is a JSON file filled with technical jargon. While it tells you <em>what</em> is wrong
        (e.g., "Eliminate render-blocking resources"), it often lacks the <em>context</em> of your specific application
        architecture.
      </p>
      <p>
        <strong>Context-Aware Prioritization:</strong> Our AI Analyzer understands that a 500ms delay in LCP on an
        e-commerce product page is more critical than on a "About Us" page. It balances business impact against
        technical effort.
      </p>
      <p>
        <strong>Next.js Specificity:</strong> Generic advice says "optimize images". Our AI, aware of Next.js, says
        "Replace the standard &lt;img&gt; tag in \`Header.tsx\` with \`next/image\` and configure \`priority={true}\`."
        It bridges the gap between the problem and the framework-specific solution.
      </p>

      <h2 id="core-web-vitals" className="scroll-mt-20">Core Web Vitals Deep Dive</h2>

      <h3>Largest Contentful Paint (LCP)</h3>
      <p>
        LCP marks the point when the page's main content has likely loaded. For many sites, this is the hero image
        or the main headline.
      </p>
      <p><strong>Optimization Tips:</strong></p>
      <ul>
        <li>Preload the LCP image using <code>&lt;link rel="preload"&gt;</code>.</li>
        <li>Use efficient image formats like WebP or AVIF.</li>
        <li>Eliminate render-blocking JavaScript and CSS that delays the browser from painting the LCP element.</li>
        <li>In Next.js, always use the <code>priority</code> prop on the LCP image component.</li>
      </ul>

      <h3>Cumulative Layout Shift (CLS)</h3>
      <p>
        CLS measures the sum total of all individual layout shift scores for every unexpected layout shift
        that occurs during the entire lifespan of the page.
      </p>
      <p><strong>Optimization Tips:</strong></p>
      <ul>
        <li>Always include <code>width</code> and <code>height</code> attributes on images and video elements.</li>
        <li>Reserve space for ad slots before the ad library loads.</li>
        <li>Avoid inserting new content above existing content, unless in response to a user interaction.</li>
        <li>Use <code>font-display: optional</code> or <code>swap</code> carefully to avoid text jumps.</li>
      </ul>

      <h2 id="nextjs-optimization" className="scroll-mt-20">Next.js Performance Optimization Guide</h2>

      <h3>Image Optimization with next/image</h3>
      <p>
        The <code>next/image</code> component is a powerhouse. It automatically resizes images based on the user's
        device, converts them to modern formats like WebP/AVIF, and prevents CLS by enforcing sizing.
        Ideally, you should almost never use a standard <code>&lt;img&gt;</code> tag in a Next.js app.
      </p>

      <h3>Font Optimization with next/font</h3>
      <p>
        <code>next/font</code> (introduced in Next.js 13) automatically optimizes your fonts (including custom fonts)
        and removes external network requests for improved privacy and performance. It hosts Google Fonts locally
        at build time, eliminating the layout shift that often happens when web fonts load.
      </p>

      <h3>Code Splitting and Dynamic Imports</h3>
      <p>
        Next.js performs automatic code splitting by route. However, for heavy components (like huge charts or
        complex modals) that aren't immediately visible, you should use Dynamic Imports:
      </p>
      <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto text-sm">
        {`import dynamic from 'next/dynamic'
const HeavyChart = dynamic(() => import('../components/HeavyChart'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})`}
      </pre>

      <h2 id="accessibility-best-practices" className="scroll-mt-20">Accessibility Best Practices</h2>
      <p>
        Accessibility is not a feature; it's a requirement. Beyond the moral obligation to make the web inclusive,
        it expands your audience and improves SEO.
      </p>
      <ul>
        <li><strong>Contrast:</strong> Ensure text has a contrast ratio of at least 4.5:1 against its background.</li>
        <li><strong>Semantic HTML:</strong> Use buttons for actions and links for navigation. Don't use <code>div</code>s with click handlers.</li>
        <li><strong>Focus Management:</strong> Ensure users can navigate your site using only a keyboard. Focus states should be clearly visible.</li>
        <li><strong>Alt Text:</strong> Describe images meaningfully. Decorative images should have empty alt text (<code>alt=""</code>).</li>
      </ul>

      <div className="my-8">
         <AdContainer slot="5598967412" />
      </div>

      <h2 id="seo-checklist" className="scroll-mt-20">SEO Optimization Checklist</h2>
      <ul>
        <li>Ensure every page has a unique <code>&lt;title&gt;</code> and <code>&lt;meta name="description"&gt;</code>.</li>
        <li>Use canonical tags to prevent duplicate content issues.</li>
        <li>Implement Structured Data (Schema.org) using JSON-LD to help Google understand your content (e.g., Article, Product, Breadcrumb).</li>
        <li>Ensure your <code>robots.txt</code> allows crawling of important resources.</li>
        <li>Use descriptive anchor text for links (avoid "click here").</li>
      </ul>

      <h2 id="security-best-practices" className="scroll-mt-20">Security Best Practices</h2>
      <p>
        Lighthouse checks for vulnerabilities that could compromise your users.
      </p>
      <ul>
        <li><strong>HTTPS:</strong> Mandatory for modern web. Use HSTS headers to enforce it.</li>
        <li><strong>Content Security Policy (CSP):</strong> A strong CSP prevents Cross-Site Scripting (XSS) attacks by controlling what resources the browser is allowed to load.</li>
        <li><strong>No Vulnerable Libraries:</strong> Regularly audit your <code>package.json</code> using tools like <code>npm audit</code>.</li>
      </ul>

      <h2 id="tracking-progress" className="scroll-mt-20">Measuring and Tracking Progress</h2>
      <p>
        Performance is a journey, not a destination. As you add features, scores can regress.
      </p>
      <ul>
        <li><strong>Lighthouse CI:</strong> Integrate Lighthouse into your GitHub Actions workflow to block pull requests that degrade performance.</li>
        <li><strong>Real User Monitoring (RUM):</strong> Tools like Vercel Speed Insights give you data from real users, which complements Lighthouse's lab data.</li>
        <li><strong>Performance Budgets:</strong> Set strict limits on bundle sizes (e.g., "Main bundle must be under 100KB").</li>
      </ul>

      <h2 id="case-studies" className="scroll-mt-20">Real-World Case Studies</h2>
      <p>
        <strong>E-commerce Giant:</strong> A major retailer found that for every 100ms improvement in load time,
        their conversion rate increased by 1%. They focused heavily on optimizing images and deferring third-party scripts.
      </p>
      <p>
        <strong>News Publisher:</strong> By implementing <code>next/font</code> and reducing CLS from 0.2 to 0.05,
        a news site saw a 15% increase in ad viewability and a 10% increase in session duration.
      </p>

      <h2 id="faq" className="scroll-mt-20">Frequently Asked Questions</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold mb-2">How often should I run Lighthouse?</h3>
          <p>
            Ideally, on every deployment. At a minimum, you should audit your key pages (Home, Product, Pricing) weekly.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Why is my mobile score lower than desktop?</h3>
          <p>
            Lighthouse simulates a mid-tier mobile device on a slow 4G network. This is intentional to highlight performance
            issues that might not be visible on a powerful developer machine with fiber internet. Optimizing for this constrained
            environment ensures a fast experience for everyone.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Can I get a 100 score with third-party ads/analytics?</h3>
          <p>
            It's very difficult. Third-party scripts often bring their own performance penalties. Strategies like
            delaying execution until interaction or using web workers (e.g., PartyTown) can help mitigate the impact.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Does Lighthouse score affect SEO directly?</h3>
          <p>
            Core Web Vitals (LCP, CLS, INP) are direct ranking factors. While the "Performance Score" number itself isn't
            fed into the algorithm, the metrics that compose it are critical.
          </p>
        </div>
      </div>

    </div>
  );
}
