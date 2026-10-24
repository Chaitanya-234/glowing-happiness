'use client';

interface RequirementsFormProps {
  data: any;
  onChange: (data: any) => void;
}

export default function RequirementsForm({ data, onChange }: RequirementsFormProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-purple-200 mb-3">
          Optimization Priority
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { id: 'accuracy', label: 'Max Accuracy', desc: 'Best possible performance' },
            { id: 'balanced', label: 'Balanced', desc: 'Good tradeoff' },
            { id: 'speed', label: 'Max Speed', desc: 'Fast inference' }
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() => updateField('priority', opt.id)}
              className={`p-4 rounded-xl border text-center transition-all ${
                data.priority === opt.id
                  ? 'bg-blue-50 dark:bg-purple-900/30 border-blue-500 dark:border-purple-500 ring-2 ring-blue-200 dark:ring-purple-900/50'
                  : 'bg-white dark:bg-purple-900/5 border-gray-200 dark:border-purple-500/20 hover:border-blue-300 dark:hover:border-purple-500/50'
              }`}
            >
              <div className={`font-semibold ${data.priority === opt.id ? 'text-blue-900 dark:text-purple-100' : 'text-gray-900 dark:text-purple-200'}`}>{opt.label}</div>
              <div className={`text-xs mt-1 ${data.priority === opt.id ? 'text-blue-700 dark:text-purple-300' : 'text-gray-500 dark:text-purple-200/60'}`}>{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-purple-200 mb-1">
          Target Accuracy (Optional)
        </label>
        <input
          type="text"
          value={data.targetAccuracy}
          onChange={(e) => updateField('targetAccuracy', e.target.value)}
          placeholder="e.g., > 95% or SOTA"
          className="w-full px-4 py-2 border border-gray-300 dark:border-purple-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 bg-white dark:bg-black text-gray-900 dark:text-purple-100 placeholder-gray-400 dark:placeholder-purple-200/30"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-purple-200 mb-1">
          Latency Constraint
        </label>
        <select
          value={data.latency}
          onChange={(e) => updateField('latency', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-purple-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 bg-white dark:bg-black text-gray-900 dark:text-purple-100"
        >
          <option value="none">No strict constraint</option>
          <option value="realtime">Real-time (&lt; 100ms)</option>
          <option value="near-realtime">Near Real-time (&lt; 500ms)</option>
          <option value="batch">Batch Processing (Offline)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-purple-200 mb-1">
          Available Compute for Training
        </label>
        <select
          value={data.compute}
          onChange={(e) => updateField('compute', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-purple-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 bg-white dark:bg-black text-gray-900 dark:text-purple-100"
        >
          <option value="colab">Free Tier (e.g., Colab T4)</option>
          <option value="single-gpu">Single High-End GPU (A100/V100)</option>
          <option value="multi-gpu">Multi-GPU Cluster</option>
          <option value="cpu">CPU Only</option>
        </select>
      </div>
    </div>
  );
}
