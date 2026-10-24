import ResponsiveAdStrategy from '@/components/ResponsiveAdStrategy';
import BlogHistoryTracker from '@/components/blog/BlogHistoryTracker';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import ThemeSelector from '@/components/blog/ThemeSelector';
import ThemeIndicator from '@/components/blog/ThemeIndicator';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      {/* Client-side history tracker & privacy notice */}
      <BlogHistoryTracker />

      {/* Single Top Banner Ad - Shows on ALL devices */}
      <ResponsiveAdStrategy
        mobileAdSlot="5535154789"    // Only one ad slot needed
      />

      {/* Blog Content */}
      {children}

      <ThemeSelector />
      <ThemeIndicator />
    </ThemeProvider>
  );
}
