// app/page.tsx
import AdContainer from '@/components/AdContainer';
import CommunitySection from '@/components/CommunitySection';
import FeaturedContent from '@/components/FeaturedContent';
import FeaturedProjects from '@/components/FeaturedProjects';
import FeaturesSection from '@/components/FeaturesSection';
import Footer from '@/components/Footer';
import Heros from '@/components/Heros';
import NewsletterCTA from '@/components/NewsletterCTA';
import OpenSourceSection from '@/components/OpenSourceSection';
import StatsSection from '@/components/StatsSection';
import ToolsShowcase from '@/components/ToolsShowcase';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Heros />

      {/* Ad Placement 1: After Hero - High visibility, first scroll */}
      <AdContainer
        slot="5535154789"
        format="horizontal"
        label="Advertisement"
        className="max-w-7xl mx-auto px-4 pt-8"
      />

      {/* Tools Showcase */}
      <ToolsShowcase />

      {/* Stats Section */}
      <StatsSection />

      

      {/* Ad Placement 2: After Tools - Mid-page engagement */}
      <AdContainer
        slot="6465093078"
        format="horizontal"
        label="Advertisement"
        className="max-w-7xl mx-auto px-4 my-12"
      />

      {/* Featured Content */}
      <FeaturedContent />

      {/* You might want to remove or keep this depending on what it contains */}
      {/* <AdsSection /> */}

      {/* Featured Projects */}
      <FeaturedProjects />

      {/* Open Source Section */}
      <OpenSourceSection />

      {/* Ad Placement 3: Before features - Re-engagement point */}
      <AdContainer
        slot="5535154789"
        format="rectangle"
        label="Advertisement"
        className="max-w-7xl mx-auto px-4 my-12"
      />

      {/* Features Section */}
      <FeaturesSection />

      {/* Newsletter CTA */}
      <NewsletterCTA />

      {/* Ad Placement 4: Before community - Final engagement */}
      <AdContainer
        slot="6465093078"
        format="horizontal"
        label="Advertisement"
        className="max-w-7xl mx-auto px-4 my-12"
      />

      {/* Community Section */}
      <CommunitySection />

      {/* Footer */}
      <Footer />
    </>
  );
}
