import type { Metadata } from 'next';
import Link from 'next/link';
import YouTubeScriptGeneratorClient from './Client';

export const metadata: Metadata = {
  title: 'AI YouTube Script Generator | Viral Video Scripts',
  description: 'Generate viral-worthy scripts for your YouTube videos in seconds. Get hooks, intros, main content points, and call-to-actions tailored to your audience.',
  keywords: [
    'ai youtube script generator',
    'video script writer',
    'viral script ai',
    'youtube content creator tools',
    'hook generator',
    'youtube intro writer',
    'content strategy ai',
    'script outline generator'
  ],
  openGraph: {
    title: 'Instant YouTube Script Writer',
    description: 'Create engaging scripts with hooks, intros, and call-to-actions. Optimized for retention and engagement.',
    type: 'website',
  }
};

export default function YouTubeScriptGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI YouTube Script Generator',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'An AI-powered tool that writes complete YouTube video scripts including titles, hooks, and content outlines.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '750',
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://devmetrix.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'AI Tools',
        item: 'https://devmetrix.in/ai-tools',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'AI YouTube Script Generator',
        item: 'https://devmetrix.in/ai-tools/youtube-script-generator',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does it write the whole script?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It provides a detailed outline with word-for-word suggestions for key sections like the Hook and Intro. The main body is structured in bullet points for you to elaborate on naturally.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I choose the video tone?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you can select from various tones like "Funny", "Professional", "Dramatic", or "Educational" to match your channel style.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is it good for Shorts?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Select "Short (< 1 min)" as the duration to generate punchy scripts optimized for YouTube Shorts and TikTok.'
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-black pt-24">
        {/* Semantic Header Section */}
        <section className="text-center px-4 mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-500">
                AI YouTube Script Generator
            </h1>
            <p className="text-xl text-purple-200/50 max-w-3xl mx-auto">
                Generate engaging, viral-worthy scripts for your YouTube videos in seconds. <br className="hidden md:block" />
                Stop staring at a blank page and start filming.
            </p>
        </section>

        {/* The Tool Interface */}
        <YouTubeScriptGeneratorClient />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto px-4 py-16 space-y-16">
            {/* How it Works */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-100/90">How to Create Viral Scripts</h2>
                <ol className="list-decimal list-inside space-y-4 text-purple-200/60 text-lg">
                    <li><strong className="text-purple-100/80">Topic:</strong> Enter your video idea (e.g., "iPhone 15 Review").</li>
                    <li><strong className="text-purple-100/80">Audience:</strong> Define who is watching (e.g., "Tech Enthusiasts").</li>
                    <li><strong className="text-purple-100/80">Tone & Duration:</strong> Customize the vibe and length of the script.</li>
                    <li><strong className="text-purple-100/80">Generate:</strong> Get a structured script with title options, hook, and outro.</li>
                </ol>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-red-400 mb-3">Hook Your Audience</h3>
                    <p className="text-purple-200/50">
                        The first 30 seconds are critical. Our AI writes compelling hooks designed to increase retention and stop users from clicking away.
                    </p>
                </div>
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-red-400 mb-3">Never Run Out of Ideas</h3>
                    <p className="text-purple-200/50">
                        Use the tool to brainstorm angles and structures you hadn't considered, keeping your content calendar full.
                    </p>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-8 pt-8 border-t border-purple-500/20">
                <h2 className="text-3xl font-bold text-purple-100/90">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">Can I use this for other platforms?</h3>
                        <p className="text-purple-200/50">Yes, the scripts work great for Instagram Reels, TikTok, and LinkedIn video posts as well.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">Is the content copyright free?</h3>
                        <p className="text-purple-200/50">Yes, the AI generates original text for you to use in your videos without attribution.</p>
                    </div>
                </div>
            </div>

            {/* Related Tools Links */}
            <div className="pt-12 text-center">
                <h3 className="text-2xl font-bold text-purple-100/80 mb-6">Grow Your Audience</h3>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/ai-tools/social-media-post-generator" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        Social Post Generator
                    </Link>
                    <Link href="/ai-tools/concept-explainer" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        Concept Explainer
                    </Link>
                    <Link href="/ai-tools" className="px-6 py-3 bg-red-600/20 border border-red-500/30 rounded-full text-red-300 hover:bg-red-600/30 hover:text-white transition-colors font-semibold">
                        View All Tools
                    </Link>
                </div>
            </div>
        </section>
      </div>
    </>
  );
}
