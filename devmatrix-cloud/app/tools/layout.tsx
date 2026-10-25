// app/tools/layout.tsx
import ResponsiveAdStrategy from '@/components/ResponsiveAdStrategy';

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}

      <div className="px-4 pb-16">
        <ResponsiveAdStrategy mobileAdSlot="5535154789" />
      </div>
    </>
  );
}