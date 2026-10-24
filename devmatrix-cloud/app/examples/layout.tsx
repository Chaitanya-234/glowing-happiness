// app/examples/layout.tsx
import ResponsiveAdStrategy from '@/components/ResponsiveAdStrategy';

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Responsive Ad Strategy - Shows ads on ALL devices */}
      <ResponsiveAdStrategy

        mobileAdSlot="5535154789"    // Mobile/Laptop banner
      />

      {/* Blog Content */}
      {children}
    </>
  );
}