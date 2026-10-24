export interface Issue {
  type: 'security' | 'maintenance' | 'license' | 'supply-chain';
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  recommendation: string;
  urgency: 'immediate' | 'this-week' | 'this-month' | 'low-priority';
  cveId?: string;
  cvssScore?: number;
}

export interface RiskyDependency {
  name: string;
  version: string;
  depth: number;
  dependencyPath: string[];
  riskLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  issues: Issue[];
  metadata: {
    lastPublished: string;
    weeklyDownloads: number | null;
    maintainers: number | null;
    license: string;
    repository: string | null;
    homepage: string | null;
  };
}

export interface RiskBreakdown {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export interface Summary {
  totalDependencies: number;
  directDependencies: number;
  indirectDependencies: number;
  deepestLevel: number;
  scanDate: string;
  riskBreakdown: RiskBreakdown;
}

export interface AlternativeSuggestion {
  risky: string;
  alternative: string;
  reason: string;
  migrationDifficulty: 'easy' | 'moderate' | 'difficult';
  breakingChanges: boolean;
}

export interface SecurityScore {
  overall: number;
  explanation: string;
}

export interface ScanResult {
  summary: Summary;
  riskyDependencies: RiskyDependency[];
  recommendations: string[];
  alternativeSuggestions: AlternativeSuggestion[];
  hiddenRisksFound: string[];
  securityScore: SecurityScore;
}
