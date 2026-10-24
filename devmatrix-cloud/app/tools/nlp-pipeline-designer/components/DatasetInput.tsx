'use client';

interface DatasetInputProps {
  data: any;
  onChange: (data: any) => void;
}

export default function DatasetInput({ data, onChange }: DatasetInputProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-purple-200 mb-1">
          Dataset Size (Samples)
        </label>
        <select
          value={data.size}
          onChange={(e) => updateField('size', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-purple-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 bg-white dark:bg-black text-gray-900 dark:text-purple-100"
        >
          <option value="">Select size...</option>
          <option value="small">Small (&lt; 1,000 samples)</option>
          <option value="medium">Medium (1,000 - 100,000 samples)</option>
          <option value="large">Large (&gt; 100,000 samples)</option>
        </select>
        <p className="mt-1 text-sm text-gray-500 dark:text-purple-200/50">
          Small datasets usually require transfer learning or few-shot approaches.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-purple-200 mb-1">
          Data Format
        </label>
        <select
          value={data.format}
          onChange={(e) => updateField('format', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-purple-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 bg-white dark:bg-black text-gray-900 dark:text-purple-100"
        >
          <option value="">Select format...</option>
          <option value="csv">CSV / Excel</option>
          <option value="json">JSON / JSONL</option>
          <option value="text">Plain Text Files</option>
          <option value="pdf">PDF / Documents</option>
          <option value="html">HTML / Web Scraped</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-purple-200 mb-1">
          Dataset Description & Characteristics
        </label>
        <textarea
          value={data.description}
          onChange={(e) => updateField('description', e.target.value)}
          placeholder="Describe your data: Is it clean? Noisy? Is it labeled? Example: 'User reviews from an e-commerce site, mostly short sentences, some typos, binary sentiment labels.'"
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 dark:border-purple-500/30 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-500 bg-white dark:bg-black text-gray-900 dark:text-purple-100 placeholder-gray-400 dark:placeholder-purple-200/30"
        />
      </div>
    </div>
  );
}
