// app/advertise/page.tsx
'use client';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

export default function AdvertisePage() {
  const packages = [
    {
      name: 'Bronze Sponsor',
      price: '$500/month',
      features: [
        'Logo in footer',
        '1 featured ad rotation',
        'Monthly analytics report',
        'Community mention',
      ],
      color: 'gray',
    },
    {
      name: 'Silver Sponsor',
      price: '$1,500/month',
      features: [
        'Everything in Bronze',
        '3 featured ad rotations',
        'Sidebar placement on tools pages',
        'Blog post collaboration',
        'Newsletter mention',
      ],
      color: 'neonBlue',
      popular: true,
    },
    {
      name: 'Gold Sponsor',
      price: '$3,500/month',
      features: [
        'Everything in Silver',
        'Homepage hero placement',
        'Unlimited ad rotations',
        'Dedicated landing page',
        'Social media promotion',
        'Video testimonial feature',
      ],
      color: 'neonGreen',
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-darkBg py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl font-bold font-mono mb-6">
              📢 Advertise on <span className="text-neonBlue">DevMetrix</span>
            </h1>
            <p className="text-2xl text-gray-400 max-w-3xl mx-auto">
              Reach 15,000+ developers actively using our tools and engaging with our community
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16"
          >
            {[
              { number: '15K+', label: 'Monthly Users' },
              { number: '100K+', label: 'Page Views/Month' },
              { number: '50+', label: 'Countries' },
              { number: '3 min', label: 'Avg. Session Duration' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-6 bg-darkGray rounded-xl border border-gray-800 text-center"
              >
                <div className="text-4xl font-bold text-neonBlue mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pricing Packages */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl font-bold text-center mb-12">
              Sponsorship <span className="text-neonGreen">Packages</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className={`p-8 rounded-2xl border-2 ${
                    pkg.popular
                      ? 'border-neonBlue bg-gradient-to-br from-neonBlue/10 to-darkGray'
                      : 'border-gray-800 bg-darkGray'
                  } relative`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-neonBlue text-darkBg text-sm font-bold rounded-full">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
                  <div className="text-4xl font-bold text-neonBlue mb-6">
                    {pkg.price}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-gray-300">
                        <span className="text-neonGreen mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <button className="w-full px-6 py-3 bg-neonBlue text-darkBg font-bold rounded-lg hover:shadow-[0_0_30px_rgba(0,212,255,0.6)] transition-all">
                    Get Started
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="max-w-2xl mx-auto p-8 bg-darkGray rounded-2xl border border-gray-800"
          >
            <h3 className="text-3xl font-bold mb-6 text-center">
              Get in <span className="text-hotPink">Touch</span>
            </h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Company Name"
                className="w-full px-4 py-3 bg-darkBg border border-gray-700 rounded-lg text-white focus:border-neonBlue focus:outline-none"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 bg-darkBg border border-gray-700 rounded-lg text-white focus:border-neonBlue focus:outline-none"
              />
              <select className="w-full px-4 py-3 bg-darkBg border border-gray-700 rounded-lg text-white focus:border-neonBlue focus:outline-none">
                <option>Select Package</option>
                <option>Bronze Sponsor</option>
                <option>Silver Sponsor</option>
                <option>Gold Sponsor</option>
                <option>Custom Package</option>
              </select>
              <textarea
                placeholder="Tell us about your advertising goals..."
                rows={4}
                className="w-full px-4 py-3 bg-darkBg border border-gray-700 rounded-lg text-white focus:border-neonBlue focus:outline-none"
              />
              <button
                type="submit"
                className="w-full px-8 py-4 bg-neonBlue text-darkBg font-bold rounded-lg hover:shadow-[0_0_30px_rgba(0,212,255,0.6)] transition-all"
              >
                Submit Inquiry
              </button>
            </form>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
