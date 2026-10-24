'use client';

interface ResourceEstimatorProps {
  estimates: {
    training: {
      gpuRequired: string;
      trainingTime: string;
      cpuAlternative: string;
      colab: string;
      cost: string;
    };
    inference: {
      latency: Record<string, string>;
      throughput: string;
      memory: string;
    };
  };
}

export default function ResourceEstimator({ estimates }: ResourceEstimatorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-purple-100 mb-4">Training Resources</h3>
        <div className="bg-white dark:bg-purple-900/10 rounded-xl border border-gray-200 dark:border-purple-500/20 overflow-hidden">
          <div className="divide-y divide-gray-100 dark:divide-purple-500/10">
            <div className="p-4 flex justify-between items-center">
              <span className="text-gray-600 dark:text-purple-200/70 text-sm">GPU Required</span>
              <span className="font-medium text-gray-900 dark:text-purple-100 text-sm">{estimates.training.gpuRequired}</span>
            </div>
            <div className="p-4 flex justify-between items-center">
              <span className="text-gray-600 dark:text-purple-200/70 text-sm">Estimated Time</span>
              <span className="font-medium text-gray-900 dark:text-purple-100 text-sm">{estimates.training.trainingTime}</span>
            </div>
            <div className="p-4 flex justify-between items-center">
              <span className="text-gray-600 dark:text-purple-200/70 text-sm">Cloud Cost (Est.)</span>
              <span className="font-medium text-green-600 dark:text-green-400 text-sm">{estimates.training.cost}</span>
            </div>
            <div className="p-4 flex justify-between items-center">
              <span className="text-gray-600 dark:text-purple-200/70 text-sm">Google Colab</span>
              <span className="font-medium text-gray-900 dark:text-purple-100 text-sm">{estimates.training.colab}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-purple-100 mb-4">Inference Resources</h3>
        <div className="bg-white dark:bg-purple-900/10 rounded-xl border border-gray-200 dark:border-purple-500/20 overflow-hidden">
          <div className="divide-y divide-gray-100 dark:divide-purple-500/10">
             {Object.entries(estimates.inference.latency).map(([key, value]) => (
                <div key={key} className="p-4 flex justify-between items-center">
                  <span className="text-gray-600 dark:text-purple-200/70 text-sm capitalize">{key} Latency</span>
                  <span className="font-medium text-gray-900 dark:text-purple-100 text-sm">{value}</span>
                </div>
             ))}
            <div className="p-4 flex justify-between items-center">
              <span className="text-gray-600 dark:text-purple-200/70 text-sm">Throughput</span>
              <span className="font-medium text-gray-900 dark:text-purple-100 text-sm">{estimates.inference.throughput}</span>
            </div>
            <div className="p-4 flex justify-between items-center">
              <span className="text-gray-600 dark:text-purple-200/70 text-sm">Memory Usage</span>
              <span className="font-medium text-gray-900 dark:text-purple-100 text-sm">{estimates.inference.memory}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
