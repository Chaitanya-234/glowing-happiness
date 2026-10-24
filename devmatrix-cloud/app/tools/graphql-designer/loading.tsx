export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Loading GraphQL Designer...</h2>
      <p className="text-gray-500 dark:text-gray-400 mt-2">Preparing AI models and environment.</p>
    </div>
  );
}
