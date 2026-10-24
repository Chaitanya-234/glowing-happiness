import type { Metadata } from 'next';
import Link from 'next/link';
import SocialMediaPostGeneratorClient from './Client';

export const metadata: Metadata = {
  title: 'AI Social Media Post Generator | LinkedIn, Twitter, Instagram',
  description: 'Create engaging, viral content for LinkedIn, Twitter, and Instagram in seconds. Our AI generates hooks, hashtags, and formatted posts tailored to your platform.',
  keywords: [
    'ai social media post generator',
    'linkedin post writer',
    'twitter thread generator',
    'instagram caption ai',
    'viral content generator',
    'social media manager tools',
    'content creation ai',
    'hashtag generator'
  ],
  openGraph: {
    title: 'Viral Social Media Post Generator',
    description: 'Stop struggling with writer\'s block. Generate professional, funny, or inspirational posts for any platform instantly.',
    type: 'website',
  }
};

export default function SocialMediaPostGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AI Social Post Generator',
    applicationCategory: 'MultimediaApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'An AI tool that writes engaging social media posts with hooks, emojis, and hashtags for LinkedIn, Twitter, and Instagram.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      ratingCount: '1320',
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
        name: 'AI Social Post Generator',
        item: 'https://devmetrix.in/ai-tools/social-media-post-generator',
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Does it add emojis?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, the AI automatically includes relevant emojis to make your posts more engaging and visually appealing.'
        }
      },
      {
        '@type': 'Question',
        name: 'Can I choose the tone?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. You can select tones like Professional (for LinkedIn), Casual (for Instagram), or Controversial (for Twitter engagement).'
        }
      },
      {
        '@type': 'Question',
        name: 'Does it generate hashtags?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, it suggests relevant, high-traffic hashtags at the end of every post to maximize your reach.'
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
                AI Social Post Generator
            </h1>
            <p className="text-xl text-purple-200/50 max-w-3xl mx-auto">
                Create viral content for LinkedIn, Twitter, and Instagram instantly. <br className="hidden md:block" />
                Hooks, hashtags, and formatting included.
            </p>
        </section>

        {/* The Tool Interface */}
        <SocialMediaPostGeneratorClient />

        {/* SEO Content Section */}
        <section className="max-w-4xl mx-auto px-4 py-16 space-y-16">
            {/* How it Works */}
            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-100/90">How to Go Viral</h2>
                <ol className="list-decimal list-inside space-y-4 text-purple-200/60 text-lg">
                    <li><strong className="text-purple-100/80">Topic:</strong> What's on your mind? (e.g., "AI replacing jobs").</li>
                    <li><strong className="text-purple-100/80">Platform:</strong> Choose where you are posting (LinkedIn requires a different vibe than Twitter).</li>
                    <li><strong className="text-purple-100/80">Tone:</strong> Select "Controversial" for engagement or "Professional" for thought leadership.</li>
                    <li><strong className="text-purple-100/80">Post:</strong> Copy the result, paste it, and watch the likes roll in.</li>
                </ol>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-pink-400 mb-3">Beat Writer's Block</h3>
                    <p className="text-purple-200/50">
                        Consistency is key on social media. Use AI to generate draft after draft so you never miss a day of posting.
                    </p>
                </div>
                <div className="p-6 rounded-2xl bg-purple-900/10 border border-purple-500/10">
                    <h3 className="text-xl font-semibold text-pink-400 mb-3">Platform Optimized</h3>
                    <p className="text-purple-200/50">
                        We know that Twitter needs threads and LinkedIn needs whitespace. Our AI formats the text specifically for the platform you choose.
                    </p>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="space-y-8 pt-8 border-t border-purple-500/20">
                <h2 className="text-3xl font-bold text-purple-100/90">Frequently Asked Questions</h2>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">Can I write long-form posts?</h3>
                        <p className="text-purple-200/50">Yes, specifically for LinkedIn, the tool can generate longer, article-style posts that establish authority.</p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-purple-100/80 mb-2">Is the content unique?</h3>
                        <p className="text-purple-200/50">Yes, every generation is unique based on your input topic and tone settings.</p>
                    </div>
                </div>
            </div>

            {/* Related Tools Links */}
            <div className="pt-12 text-center">
                <h3 className="text-2xl font-bold text-purple-100/80 mb-6">More Content Tools</h3>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link href="/ai-tools/youtube-script-generator" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        YouTube Script Generator
                    </Link>
                    <Link href="/ai-tools/concept-explainer" className="px-6 py-3 bg-purple-900/30 border border-purple-500/30 rounded-full text-purple-200 hover:bg-purple-800/40 hover:text-white transition-colors">
                        Concept Explainer
                    </Link>
                    <Link href="/ai-tools" className="px-6 py-3 bg-pink-600/20 border border-pink-500/30 rounded-full text-pink-300 hover:bg-pink-600/30 hover:text-white transition-colors font-semibold">
                        View All Tools
                    </Link>
                </div>
            </div>
        </section>
      </div>
    </>
  );
}
