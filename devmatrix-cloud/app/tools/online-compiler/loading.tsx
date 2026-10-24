export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 border-4 border-neonBlue border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg text-gray-600 dark:text-gray-300">Loading Compiler...</p>
      </div>
    </div>
  );
}
