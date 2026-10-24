// components/AdsSection.tsx
'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface Ad {
  id: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  category: 'sponsor' | 'promotion' | 'featured';
  badge?: string;
  sponsorName?: string;
}

const ads: Ad[] = [
  {
    id: '1',
    title: 'Boost Your Development with AI',
    description: 'Get 50% off on premium AI coding tools. Accelerate your development workflow with intelligent code completion.',
    image: '🤖',
    ctaText: 'Get Started',
    ctaLink: '#',
    category: 'sponsor',
    badge: 'Sponsored',
    sponsorName: 'AI Tools Inc.'
  },
  {
    id: '2',
    title: 'Deploy Faster with Cloud Platform',
    description: 'Scale your applications effortlessly. Free tier available with 1GB storage and unlimited deployments.',
    image: '☁️',
    ctaText: 'Try Free',
    ctaLink: '#',
    category: 'promotion',
    badge: 'New',
    sponsorName: 'CloudDeploy'
  },
  {
    id: '3',
    title: 'Join Our Developer Conference',
    description: 'Connect with industry leaders, learn new technologies, and network with 10,000+ developers worldwide.',
    image: '🎯',
    ctaText: 'Register Now',
    ctaLink: '#',
    category: 'featured',
    badge: 'Limited Time',
    sponsorName: 'DevConf 2025'
  }
];

export default function AdsSection() {
  const [activeAd, setActiveAd] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);

  // Auto-rotate ads every 5 seconds
  useEffect(() => {
    if (!autoRotate) return;
    
    const interval = setInterval(() => {
      setActiveAd((prev) => (prev + 1) % ads.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoRotate]);

  const nextAd = () => {
    setAutoRotate(false);
    setActiveAd((prev) => (prev + 1) % ads.length);
  };

  const prevAd = () => {
    setAutoRotate(false);
    setActiveAd((prev) => (prev - 1 + ads.length) % ads.length);
  };

  const handleAdClick = (ad: Ad) => {
    // Client-side only analytics (Google Analytics, if you add it)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'ad_click', {
        ad_id: ad.id,
        sponsor_name: ad.sponsorName,
        category: ad.category,
      });
    }
    console.log(`Ad clicked: ${ad.id} - ${ad.sponsorName}`);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'sponsor':
        return 'text-neonBlue border-neonBlue bg-neonBlue/10';
      case 'promotion':
        return 'text-neonGreen border-neonGreen bg-neonGreen/10';
      case 'featured':
        return 'text-hotPink border-hotPink bg-hotPink/10';
      default:
        return 'text-gray-400 border-gray-400 bg-gray-400/10';
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-darkGray to-darkBg relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 gap-4 h-full">
          {Array.from({ length: 48 }).map((_, i) => (
            <div key={i} className="bg-neonBlue rounded-sm animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold font-mono mb-4">
            🎯 <span className="text-neonBlue">Featured</span> Partners
          </h2>
          <p className="text-gray-400 text-lg">
            Discover tools and services that can accelerate your development journey
          </p>
        </motion.div>

        {/* Ad Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevAd}
            onMouseEnter={() => setAutoRotate(false)}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-darkGray/80 backdrop-blur-sm border border-gray-700 rounded-full flex items-center justify-center text-white hover:bg-neonBlue hover:border-neonBlue transition-all duration-300"
            aria-label="Previous ad"
          >
            ←
          </button>
          <button
            onClick={nextAd}
            onMouseEnter={() => setAutoRotate(false)}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-darkGray/80 backdrop-blur-sm border border-gray-700 rounded-full flex items-center justify-center text-white hover:bg-neonBlue hover:border-neonBlue transition-all duration-300"
            aria-label="Next ad"
          >
            →
          </button>

          {/* Ad Cards */}
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              key={activeAd}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-darkGray to-darkBg border border-gray-700 rounded-2xl p-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Ad Content */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(ads[activeAd].category)}`}>
                      {ads[activeAd].badge}
                    </span>
                    <span className="text-gray-500 text-sm capitalize">{ads[activeAd].category}</span>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {ads[activeAd].title}
                  </h3>
                  
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    {ads[activeAd].description}
                  </p>
                  
                  <motion.a
                    href={ads[activeAd].ctaLink}
                    onClick={() => handleAdClick(ads[activeAd])}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block px-8 py-3 bg-neonBlue text-darkBg font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,212,255,0.6)] transition-all duration-300"
                  >
                    {ads[activeAd].ctaText} →
                  </motion.a>

                  {/* Sponsor Attribution */}
                  {ads[activeAd].sponsorName && (
                    <div className="mt-4 text-sm text-gray-500">
                      Sponsored by {ads[activeAd].sponsorName}
                    </div>
                  )}
                </div>

                {/* Ad Visual */}
                <div className="flex justify-center">
                  <motion.div
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="w-48 h-48 bg-gradient-to-br from-neonBlue/20 to-hotPink/20 rounded-2xl flex items-center justify-center text-8xl border border-gray-600"
                  >
                    {ads[activeAd].image}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 gap-2">
            {ads.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveAd(index);
                  setAutoRotate(false);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeAd 
                    ? 'bg-neonBlue scale-125' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to ad ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <p className="text-gray-500 text-sm">
            Want to promote your product here? 
            <a href="mailto:ads@devmetrix.cloud" className="text-neonBlue hover:text-neonGreen transition-colors ml-1 font-medium">
              Contact us about advertising
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
