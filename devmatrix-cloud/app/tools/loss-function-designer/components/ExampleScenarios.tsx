import React from 'react';
import { Sparkles, CreditCard, Stethoscope, Search, ShoppingCart } from 'lucide-react';

interface ExampleScenariosProps {
  onSelect: (scenario: any) => void;
}

const SCENARIOS = [
  {
    icon: CreditCard,
    title: "Fraud Detection",
    description: "Highly imbalanced finance dataset where missing fraud is costly.",
    data: {
      problem: {
        taskType: "Binary Classification",
        domain: "Finance",
        description: "Detecting fraudulent credit card transactions in real-time. The dataset has very few positive examples (fraud) compared to legitimate ones."
      },
      dataset: {
        imbalanceRatio: "Severe Imbalance (1:1000)",
        datasetSize: "100,000 - 1M samples (Large)",
        dataQuality: "High Quality (Clean, Verified Labels)"
      },
      objectives: {
        errorCost: "False Negatives Costlier (e.g., missed fraud/disease)",
        primaryObjective: "Maximize Recall (Minimize Missed Cases)",
        constraints: ["Real-time Inference Limit", "Probability Calibration Required"]
      }
    }
  },
  {
    icon: Stethoscope,
    title: "Medical Diagnosis",
    description: "Multi-class disease classification with severity-weighted errors.",
    data: {
      problem: {
        taskType: "Multi-Class Classification",
        domain: "Healthcare / Medical",
        description: "Classifying skin lesions into 7 categories (melanoma, nevus, etc.). Melanoma is rare but critical to detect early."
      },
      dataset: {
        imbalanceRatio: "Moderate Imbalance (1:100)",
        datasetSize: "10,000 - 100,000 samples (Medium)",
        dataQuality: "Moderate Quality (Some Noise/Errors)"
      },
      objectives: {
        errorCost: "Custom/Complex Cost Matrix",
        primaryObjective: "Maximize F1-Score (Balanced)",
        constraints: ["Interpretability Required", "Fairness / Bias Constraints"]
      }
    }
  },
  {
    icon: Search,
    title: "Search Ranking",
    description: "Optimizing search results relevance with click-through data.",
    data: {
      problem: {
        taskType: "Ranking / Recommendation",
        domain: "E-commerce / Retail",
        description: "Ranking product search results based on relevance and user engagement history."
      },
      dataset: {
        imbalanceRatio: "Extreme Imbalance (> 1:1000)",
        datasetSize: "> 1M samples (Very Large)",
        dataQuality: "Low Quality (Noisy, Weak Labels)"
      },
      objectives: {
        errorCost: "Equal Costs (False Positive = False Negative)",
        primaryObjective: "Optimize Ranking (NDCG/MRR)",
        constraints: ["Real-time Inference Limit"]
      }
    }
  },
  {
    icon: ShoppingCart,
    title: "Customer Churn",
    description: "Predicting users likely to leave a subscription service.",
    data: {
      problem: {
        taskType: "Binary Classification",
        domain: "E-commerce / Retail",
        description: "Predicting which subscription customers will churn in the next 30 days to offer retention incentives."
      },
      dataset: {
        imbalanceRatio: "Mild Imbalance (1:10)",
        datasetSize: "100,000 - 1M samples (Large)",
        dataQuality: "High Quality (Clean, Verified Labels)"
      },
      objectives: {
        errorCost: "False Positives Costlier (e.g., spam filter)",
        primaryObjective: "Maximize Revenue / Minimize Financial Loss",
        constraints: ["Interpretability Required"]
      }
    }
  }
];

export default function ExampleScenarios({ onSelect }: ExampleScenariosProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {SCENARIOS.map((scenario, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(scenario.data)}
          className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-violet-400 dark:hover:border-violet-500 hover:shadow-md transition-all text-left group"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-violet-100 dark:bg-violet-900/30 rounded-lg text-violet-600 dark:text-violet-400 group-hover:bg-violet-200 dark:group-hover:bg-violet-800/50 transition-colors">
              <scenario.icon className="w-5 h-5" />
            </div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
              {scenario.title}
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            {scenario.description}
          </p>
        </button>
      ))}
    </div>
  );
}
