// app/premium/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'DevMetrix Premium - Coming Soon | DevMetrix',
  description: 'Get early access to DevMetrix Premium. Ad-free experience, advanced tools, and exclusive content.',
};

export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-black pt-24 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-yellow-500/20 text-yellow-300 text-sm font-semibold rounded-full mb-6 border border-yellow-500/30">
            👑 Coming Soon
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-orange-200 to-red-200 mb-6">
            DevMetrix Premium
          </h1>

          <p className="text-xl text-purple-200/70 max-w-2xl mx-auto mb-8">
            Unlock the full potential of DevMetrix with premium features, advanced tools, and an ad-free experience.
          </p>

          {/* Early Access Form */}
          <div className="max-w-md mx-auto">
            <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-2 border-yellow-500/30 rounded-xl p-6">
              <h3 className="text-lg font-bold text-yellow-100 mb-4">
                🎉 Get Early Access
              </h3>
              <p className="text-sm text-yellow-200/60 mb-4">
                Be the first to try Premium features when we launch. Plus, get 50% off for life!
              </p>

              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-yellow-900/30 border border-yellow-500/30 rounded-lg text-yellow-100 placeholder-yellow-400/50 focus:outline-none focus:border-yellow-400"
                />
                <button className="w-full px-6 py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors">
                  Join Waitlist
                </button>
                <p className="text-xs text-yellow-300/50 text-center">
                  👥 152 developers already on the list
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-purple-100 mb-10">
            What's Included in Premium?
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {premiumFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6 hover:border-purple-400/50 transition-all"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-purple-100 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-purple-200/60">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Preview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-purple-100 mb-10">
            Simple, Transparent Pricing
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="bg-purple-900/10 border border-purple-500/30 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">🆓</div>
              <h3 className="text-2xl font-bold text-purple-100 mb-2">Free</h3>
              <div className="text-4xl font-bold text-purple-200 mb-4">
                $0
                <span className="text-base text-purple-400 font-normal">/month</span>
              </div>
              <ul className="text-sm text-purple-200/60 space-y-2 mb-6">
                <li>✓ All basic tools</li>
                <li>✓ All blog posts</li>
                <li>✓ Code examples</li>
                <li>✓ Community access</li>
              </ul>
              <button className="w-full py-2 bg-purple-900/30 border border-purple-500/30 text-purple-200 rounded-lg">
                Current Plan
              </button>
            </div>

            {/* Premium */}
            <div className="bg-gradient-to-br from-yellow-900/20 to-orange-900/20 border-2 border-yellow-500/50 rounded-xl p-6 text-center relative transform scale-105">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full">
                MOST POPULAR
              </div>
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-2xl font-bold text-yellow-100 mb-2">Premium</h3>
              <div className="text-4xl font-bold text-yellow-200 mb-4">
                $9
                <span className="text-base text-yellow-400 font-normal">/month</span>
              </div>
              <ul className="text-sm text-yellow-200/70 space-y-2 mb-6 text-left">
                <li>✓ Everything in Free</li>
                <li>✓ Ad-free experience</li>
                <li>✓ Advanced tool features</li>
                <li>✓ Priority support</li>
                <li>✓ Exclusive content</li>
                <li>✓ Early access to features</li>
              </ul>
              <button className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors">
                Join Waitlist
              </button>
            </div>

            {/* Lifetime */}
            <div className="bg-purple-900/10 border border-purple-500/30 rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">👑</div>
              <h3 className="text-2xl font-bold text-purple-100 mb-2">Lifetime</h3>
              <div className="text-4xl font-bold text-purple-200 mb-4">
                $199
                <span className="text-base text-purple-400 font-normal"> once</span>
              </div>
              <ul className="text-sm text-purple-200/60 space-y-2 mb-6 text-left">
                <li>✓ Everything in Premium</li>
                <li>✓ Lifetime access</li>
                <li>✓ All future features</li>
                <li>✓ Priority support forever</li>
                <li>✓ Exclusive Discord role</li>
                <li>✓ Shape the roadmap</li>
              </ul>
              <button className="w-full py-2 bg-purple-900/30 border border-purple-500/30 text-purple-200 rounded-lg hover:bg-purple-800/40 transition-colors">
                Coming Soon
              </button>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-purple-100 mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-purple-100 mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-purple-200/60">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-2 border-yellow-500/30 rounded-xl p-10">
          <h2 className="text-3xl font-bold text-yellow-100 mb-4">
            Don't Miss Out!
          </h2>
          <p className="text-lg text-yellow-200/70 mb-6 max-w-2xl mx-auto">
            Early adopters get <strong className="text-yellow-100">50% off for life</strong> + exclusive founding member benefits.
          </p>
          <button className="px-10 py-4 bg-yellow-500 text-black font-bold text-lg rounded-lg hover:bg-yellow-400 transition-colors">
            Get Early Access Now
          </button>
          <p className="text-sm text-yellow-300/50 mt-4">
            Limited to first 500 members
          </p>
        </div>
      </div>
    </div>
  );
}

const premiumFeatures = [
  {
    icon: '🚫',
    title: 'Ad-Free Experience',
    description: 'Browse without distractions. No ads, no popups, just pure content.'
  },
  {
    icon: '🔧',
    title: 'Advanced Tool Features',
    description: 'Unlock advanced features in all tools: bulk operations, history, exports, and more.'
  },
  {
    icon: '📚',
    title: 'Exclusive Content',
    description: 'Access premium tutorials, deep-dive guides, and advanced techniques.'
  },
  {
    icon: '💬',
    title: 'Priority Support',
    description: 'Get help faster with dedicated support channel and faster response times.'
  },
  {
    icon: '⚡',
    title: 'Early Access',
    description: 'Be the first to try new features and tools before public release.'
  },
  {
    icon: '📊',
    title: 'Usage Analytics',
    description: 'Track your learning progress, see your most-used tools, and get insights.'
  },
  {
    icon: '💾',
    title: 'Cloud Sync',
    description: 'Save your work across devices. Access your snippets, notes, and history anywhere.'
  },
  {
    icon: '🎓',
    title: 'Interactive Courses',
    description: 'Step-by-step courses with hands-on projects and certificates.'
  },
];

const faqs = [
  {
    question: 'When will Premium launch?',
    answer: 'We\'re targeting Q1 2026 for the official launch. Early access members will get access 2-4 weeks before public launch.'
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We\'ll accept all major credit cards, PayPal, and cryptocurrency. Lifetime plan can be paid in installments.'
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes! Cancel anytime with no questions asked. Lifetime plan is non-refundable after 30 days.'
  },
  {
    question: 'Will the free tier still exist?',
    answer: 'Absolutely! The free tier will always remain free with all current features. Premium just adds extra goodies.'
  },
  {
    question: 'Is the 50% lifetime discount real?',
    answer: 'Yes! Early waitlist members lock in $4.50/month forever instead of $9/month. Price never increases for you.'
  },
];
