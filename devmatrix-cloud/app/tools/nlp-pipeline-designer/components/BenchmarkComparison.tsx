'use client';

interface BenchmarkComparisonProps {
  models: {
    name: string;
    accuracy: string;
    speed: string;
  }[];
}

export default function BenchmarkComparison({ models }: BenchmarkComparisonProps) {
  // Helper to extract number from string like "92%" or "~50ms"
  const parseValue = (str: string) => {
    const match = str.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  };

  const accuracyData = models.map(m => ({
    name: m.name,
    value: parseValue(m.accuracy),
    display: m.accuracy
  }));

  const maxAccuracy = Math.max(...accuracyData.map(d => d.value)) || 100;

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-purple-100">Performance Benchmark</h3>
      <div className="space-y-4">
        {accuracyData.map((item, index) => (
          <div key={item.name} className="relative">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700 dark:text-purple-200">{item.name}</span>
              <span className="text-gray-900 dark:text-purple-100 font-bold">{item.display} Accuracy</span>
            </div>
            <div className="h-3 bg-gray-100 dark:bg-purple-900/20 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  index === 0 ? 'bg-blue-600 dark:bg-purple-500' : index === 1 ? 'bg-blue-400 dark:bg-purple-600' : 'bg-blue-300 dark:bg-purple-700'
                }`}
                style={{ width: `${(item.value / maxAccuracy) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
