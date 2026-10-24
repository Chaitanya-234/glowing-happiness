export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0B1120] pt-24 pb-12 flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mb-6"></div>
      <h2 className="text-xl font-semibold text-white mb-2">Initializing Scanner...</h2>
      <p className="text-gray-400">Preparing secure environment for analysis.</p>
    </div>
  );
}
