// Render once in app/layout.tsx, inside <body>, before <Navbar/>
export default function GlassBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[70rem] h-[36rem] rounded-full bg-[#60a5fa]/30 blur-[140px]" />
      <div className="absolute top-1/4 -left-32 w-[38rem] h-[38rem] rounded-full bg-[#38bdf8]/20 blur-[130px]" />
      <div className="absolute top-2/3 -right-32 w-[42rem] h-[42rem] rounded-full bg-[#2563eb]/30 blur-[150px]" />
    </div>
  );
}