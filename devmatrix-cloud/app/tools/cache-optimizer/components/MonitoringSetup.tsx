import React from 'react';
import { Activity, AlertTriangle, BarChart } from 'lucide-react';

type MonitoringSetupProps = {
  monitoring: any;
};

export default function MonitoringSetup({ monitoring }: MonitoringSetupProps) {
  if (!monitoring) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4 text-purple-100">
            <Activity className="text-blue-400" />
            <h3 className="font-bold text-lg">Key Metrics</h3>
          </div>
          <ul className="space-y-2">
            {monitoring.metricsToTrack.map((metric: string, i: number) => (
              <li key={i} className="flex items-center gap-2 text-purple-200/80 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                {metric}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4 text-purple-100">
            <AlertTriangle className="text-yellow-400" />
            <h3 className="font-bold text-lg">Alerting Rules</h3>
          </div>
          <div className="space-y-4">
            {monitoring.alertingRules.map((rule: any, i: number) => (
              <div key={i} className="bg-black/20 p-3 rounded border border-purple-500/10">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-purple-200 text-sm">{rule.metric}</span>
                  <span className="text-yellow-400 text-xs font-mono bg-yellow-400/10 px-1.5 py-0.5 rounded">{rule.threshold}</span>
                </div>
                <p className="text-xs text-purple-200/60">Action: {rule.action}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {monitoring.dashboardConfig && (
        <div className="bg-purple-900/10 border border-purple-500/20 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4 text-purple-100">
            <BarChart className="text-green-400" />
            <h3 className="font-bold text-lg">Dashboard Configuration</h3>
          </div>
          <p className="text-sm text-purple-200/60 mb-4">
            Use this configuration to set up your Grafana or monitoring dashboard.
          </p>
          <pre className="bg-black/40 p-4 rounded-lg overflow-x-auto text-xs text-purple-200 font-mono border border-purple-500/10 max-h-60">
            {monitoring.dashboardConfig}
          </pre>
        </div>
      )}
    </div>
  );
}
