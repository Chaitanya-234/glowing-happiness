export default function ResearchManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full min-h-screen bg-slate-50 dark:bg-slate-950">{children}</div>;
}
