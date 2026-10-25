// app/page.tsx
import AdContainer from '@/components/AdContainer';
import CommunitySection from '@/components/CommunitySection';
import FeaturedContent from '@/components/FeaturedContent';
import FeaturedProjects from '@/components/FeaturedProjects';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import NewsletterCTA from '@/components/NewsletterCTA';
import OpenSourceSection from '@/components/OpenSourceSection';
import StatsSection from '@/components/StatsSection';
import ToolsShowcase from '@/components/ToolsShowcase';

/** One wrapper = identical spacing everywhere, and a wide ad can never push the page sideways. */
function AdSlot({ slot, format = 'horizontal' }: { slot: string; format?: 'horizontal' | 'rectangle' }) {
  return (
    <div className="mx-auto w-full max-w-7xl overflow-hidden px-4 my-8 md:my-12">
      <AdContainer slot={slot} format={format} label="Advertisement" className="w-full" />
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="overflow-x-clip">
      <Hero />
      <ToolsShowcase />
      <StatsSection />

      <AdSlot slot="6465093078" />

      <FeaturedContent />
      <FeaturedProjects />
      <OpenSourceSection />

      {/* rectangle fits phone width better than a 728px banner */}
      <AdSlot slot="5535154789" format="rectangle" />

      <FeaturesSection />
      <NewsletterCTA />

      <AdSlot slot="6465093078" />

      <CommunitySection />
      <Footer />
    </main>
  );
}