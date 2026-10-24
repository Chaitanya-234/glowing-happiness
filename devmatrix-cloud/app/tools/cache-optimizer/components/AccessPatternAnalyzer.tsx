import React, { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';

type AccessPatternAnalyzerProps = {
  data: any;
  onChange: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

const emptyPattern = {
  dataCategory: '',
  readFrequency: 'Medium',
  writeFrequency: 'Medium',
  updatePattern: 'Hourly',
  sizeEstimate: '1MB',
  importance: 'Medium',
};

export default function AccessPatternAnalyzer({ data, onChange, onNext, onBack }: AccessPatternAnalyzerProps) {
  const [patterns, setPatterns] = useState(data.accessPatterns || [emptyPattern]);
  const [traffic, setTraffic] = useState(data.trafficPatterns || {
    peakTimes: [],
    geoDistribution: 'Single Region',
    seasonality: 'Steady',
    predictability: 'Predictable',
  });

  const handlePatternChange = (index: number, field: string, value: string) => {
    const newPatterns = [...patterns];
    newPatterns[index] = { ...newPatterns[index], [field]: value };
    setPatterns(newPatterns);
    onChange({ ...data, accessPatterns: newPatterns });
  };

  const addPattern = () => {
    const newPatterns = [...patterns, { ...emptyPattern }];
    setPatterns(newPatterns);
    onChange({ ...data, accessPatterns: newPatterns });
  };

  const removePattern = (index: number) => {
    const newPatterns = patterns.filter((_: any, i: number) => i !== index);
    setPatterns(newPatterns);
    onChange({ ...data, accessPatterns: newPatterns });
  };

  const handleTrafficChange = (field: string, value: any) => {
    const newTraffic = { ...traffic, [field]: value };
    setTraffic(newTraffic);
    onChange({ ...data, trafficPatterns: newTraffic });
  };

  const togglePeakTime = (time: string) => {
    const peaks = traffic.peakTimes || [];
    const newPeaks = peaks.includes(time)
      ? peaks.filter((t: string) => t !== time)
      : [...peaks, time];
    handleTrafficChange('peakTimes', newPeaks);
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-bold text-purple-100 mb-4">Data Access Patterns</h3>
        <p className="text-purple-200/60 mb-6 text-sm">
          Define the different types of data your application handles and how they are accessed.
        </p>

        <div className="space-y-4">
          {patterns.map((pattern: any, index: number) => (
            <div key={index} className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-4 relative">
              <div className="absolute top-4 right-4">
                {patterns.length > 1 && (
                  <button
                    onClick={() => removePattern(index)}
                    className="text-purple-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                <div>
                  <label className="block text-purple-200/60 mb-1 text-xs uppercase font-semibold">Data Category</label>
                  <input
                    type="text"
                    value={pattern.dataCategory}
                    onChange={(e) => handlePatternChange(index, 'dataCategory', e.target.value)}
                    className="w-full bg-purple-900/20 text-purple-100 p-2 rounded border border-purple-500/20 text-sm focus:border-purple-400/40 focus:outline-none"
                    placeholder="e.g. Product Catalog"
                  />
                </div>

                 <div>
                  <label className="block text-purple-200/60 mb-1 text-xs uppercase font-semibold">Read Frequency</label>
                  <select
                    value={pattern.readFrequency}
                    onChange={(e) => handlePatternChange(index, 'readFrequency', e.target.value)}
                    className="w-full bg-purple-900/20 text-purple-100 p-2 rounded border border-purple-500/20 text-sm focus:border-purple-400/40 focus:outline-none"
                  >
                    <option value="Very High">Very High</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                 <div>
                  <label className="block text-purple-200/60 mb-1 text-xs uppercase font-semibold">Write Frequency</label>
                  <select
                    value={pattern.writeFrequency}
                    onChange={(e) => handlePatternChange(index, 'writeFrequency', e.target.value)}
                    className="w-full bg-purple-900/20 text-purple-100 p-2 rounded border border-purple-500/20 text-sm focus:border-purple-400/40 focus:outline-none"
                  >
                    <option value="Very High">Very High</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-purple-200/60 mb-1 text-xs uppercase font-semibold">Update Pattern</label>
                  <select
                    value={pattern.updatePattern}
                    onChange={(e) => handlePatternChange(index, 'updatePattern', e.target.value)}
                    className="w-full bg-purple-900/20 text-purple-100 p-2 rounded border border-purple-500/20 text-sm focus:border-purple-400/40 focus:outline-none"
                  >
                    <option value="Real-time">Real-time</option>
                    <option value="Hourly">Hourly</option>
                    <option value="Daily">Daily</option>
                    <option value="Rarely">Rarely</option>
                  </select>
                </div>

                 <div>
                  <label className="block text-purple-200/60 mb-1 text-xs uppercase font-semibold">Importance</label>
                   <select
                    value={pattern.importance}
                    onChange={(e) => handlePatternChange(index, 'importance', e.target.value)}
                    className="w-full bg-purple-900/20 text-purple-100 p-2 rounded border border-purple-500/20 text-sm focus:border-purple-400/40 focus:outline-none"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addPattern}
            className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors text-sm font-semibold"
          >
            <Plus size={16} />
            Add Another Data Category
          </button>
        </div>
      </div>

      <div className="border-t border-purple-500/20 pt-6">
        <h3 className="text-xl font-bold text-purple-100 mb-4">Traffic Characteristics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div>
            <label className="block text-purple-200/60 mb-2 text-sm font-semibold">Peak Traffic Times</label>
            <div className="flex flex-wrap gap-2">
              {['Morning', 'Afternoon', 'Evening', 'Night'].map((time) => (
                <button
                  key={time}
                  onClick={() => togglePeakTime(time)}
                  className={`px-3 py-1.5 rounded text-sm transition-all ${
                    traffic.peakTimes.includes(time)
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-900/20 text-purple-300 hover:bg-purple-800/40'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
           </div>

           <div>
            <label className="block text-purple-200/60 mb-2 text-sm font-semibold">Geographic Distribution</label>
            <select
              value={traffic.geoDistribution}
              onChange={(e) => handleTrafficChange('geoDistribution', e.target.value)}
              className="w-full bg-purple-900/10 text-purple-100/80 p-3 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none"
            >
              <option value="Single Region">Single Region</option>
              <option value="Multi-Region">Multi-Region (e.g. US + EU)</option>
              <option value="Global">Global</option>
            </select>
           </div>

           <div>
            <label className="block text-purple-200/60 mb-2 text-sm font-semibold">Seasonality</label>
            <select
              value={traffic.seasonality}
              onChange={(e) => handleTrafficChange('seasonality', e.target.value)}
              className="w-full bg-purple-900/10 text-purple-100/80 p-3 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none"
            >
              <option value="Steady">Steady</option>
              <option value="Weekly Peaks">Weekly Peaks</option>
              <option value="Annual Peaks">Annual Peaks (e.g. Black Friday)</option>
            </select>
           </div>

           <div>
            <label className="block text-purple-200/60 mb-2 text-sm font-semibold">Predictability</label>
            <select
              value={traffic.predictability}
              onChange={(e) => handleTrafficChange('predictability', e.target.value)}
              className="w-full bg-purple-900/10 text-purple-100/80 p-3 rounded-lg border border-purple-500/20 focus:border-purple-400/40 focus:outline-none"
            >
              <option value="Predictable">Predictable</option>
              <option value="Unpredictable">Unpredictable</option>
              <option value="Mixed">Mixed</option>
            </select>
           </div>
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={onBack}
          className="px-8 py-3 bg-transparent text-purple-300 rounded-lg border border-purple-600/20 hover:border-purple-500/40 transition-all font-semibold"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all font-semibold shadow-lg shadow-purple-900/20"
        >
          Generate Strategy
        </button>
      </div>
    </div>
  );
}
