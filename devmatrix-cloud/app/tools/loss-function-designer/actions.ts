'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { LossFunctionDesignerSchema } from '@/lib/ai-schemas';
import { z } from 'zod';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function generateLossFunction(
  problemDescription: {
    taskType: string;
    description: string;
    domain: string;
  },
  datasetCharacteristics: {
    imbalanceRatio: string;
    datasetSize: string;
    dataQuality: string;
  },
  businessObjectives: {
    errorCost: string;
    primaryObjective: string;
    constraints: string[];
  },
  multiTaskInfo?: {
    isMultiTask: boolean;
    tasks?: string[];
  }
) {
  if (!process.env.GEMINI_API_KEY) {
    return { success: false, error: 'GEMINI_API_KEY is not configured' };
  }

  const systemPrompt = `
You are an expert Machine Learning Engineer and AI Mathematician. Your goal is to design comprehensive, production-ready custom loss functions.

**Problem Type Recognition:**

Identify and understand ML problem characteristics:

A. Task Categories:
- Classification (binary, multi-class, multi-label)
- Regression (single-output, multi-output)
- Ranking (learning to rank, recommendation)
- Segmentation (semantic, instance, panoptic)
- Object Detection (bounding box, keypoint)
- Generative (VAE, GAN, Diffusion)
- Multi-task learning (multiple objectives)
- Metric learning (similarity, triplet)
- Anomaly detection (outlier identification)
- Survival analysis (time-to-event)

B. Domain Context:
- Computer Vision (image classification, detection, segmentation)
- Natural Language Processing (sentiment, NER, generation)
- Recommendation Systems (collaborative filtering, ranking)
- Time Series (forecasting, anomaly detection)
- Healthcare (diagnosis, prognosis, treatment)
- Finance (fraud detection, credit scoring, trading)
- E-commerce (conversion, churn, pricing)
- Manufacturing (quality control, predictive maintenance)

**Dataset Imbalance Analysis:**

Understand data distribution challenges:

A. Class Imbalance Severity:
- Mild (1:2 to 1:10 ratio)
- Moderate (1:10 to 1:100 ratio)
- Severe (1:100 to 1:1000+ ratio)
- Extreme (minority class < 0.1%)

B. Imbalance Types:
- Binary imbalance (positive vs negative)
- Multi-class imbalance (some classes rare)
- Multi-label imbalance (some labels rare)
- Hierarchical imbalance (parent-child relationships)
- Spatial imbalance (segmentation, small objects)
- Temporal imbalance (time series, rare events)

C. Imbalance Impact:
- Model bias toward majority class
- Poor minority class recall
- Misleading accuracy metrics
- Difficulty learning rare patterns
- Gradient dominance by frequent classes

**Business Constraint Understanding:**

Encode business logic into loss functions:

A. Asymmetric Error Costs:
- False Positives more costly (e.g., spam filter - missing important email)
- False Negatives more costly (e.g., cancer detection - missing diagnosis)
- Severity-weighted errors (different mistake severities)
- Temporal costs (early errors vs late errors)

B. Business Objectives:
- Maximize precision (minimize false alarms)
- Maximize recall (catch all positive cases)
- Optimize F-beta score (balance precision/recall with beta)
- Minimize specific error types
- Fairness constraints (demographic parity, equal opportunity)
- Calibration requirements (probability accuracy)
- Ranking quality (NDCG, MRR optimization)
- User satisfaction metrics
- Revenue impact (expected value optimization)

C. Operational Constraints:
- Threshold-dependent decisions
- Cost-sensitive deployment
- Real-time prediction requirements
- Interpretability needs
- Regulatory compliance (explainability, fairness)

D. Multi-Objective Trade-offs:
- Accuracy vs Fairness
- Performance vs Calibration
- Speed vs Quality
- Precision vs Recall
- Multiple task performance (multi-task learning)

**Loss Function Component Design:**

Design mathematically sound loss components:

A. Base Loss Functions (Building Blocks):

CLASSIFICATION LOSSES:
- Cross-Entropy (standard for classification)
- Binary Cross-Entropy (binary problems)
- Categorical Cross-Entropy (multi-class)
- Sparse Categorical Cross-Entropy (integer labels)
- Focal Loss (address class imbalance, focus on hard examples)
- Label Smoothing Cross-Entropy (regularization)
- Margin-based losses (SVM, hinge loss)

REGRESSION LOSSES:
- Mean Squared Error (MSE) - sensitive to outliers
- Mean Absolute Error (MAE) - robust to outliers
- Huber Loss (MSE for small errors, MAE for large)
- Log-Cosh Loss (smooth approximation)
- Quantile Loss (predict specific quantiles)
- Smooth L1 Loss (between MSE and MAE)

RANKING LOSSES:
- Pairwise Ranking Loss
- Listwise Ranking Loss
- NDCG Loss (differentiable approximation)
- Triplet Loss (metric learning)
- Contrastive Loss (similarity learning)

SEGMENTATION LOSSES:
- Dice Loss (intersection over union)
- IoU Loss (intersection over union)
- Tversky Loss (generalization of Dice)
- Boundary Loss (focus on edges)
- Combined (Cross-Entropy + Dice)

DETECTION LOSSES:
- Bounding Box Regression (Smooth L1, IoU)
- Classification Loss (Cross-Entropy)
- Objectness Loss (confidence score)
- Multi-part losses (YOLO, Faster R-CNN style)

B. Imbalance Handling Components:

CLASS WEIGHTS:
- Inverse frequency weighting (1/class_frequency)
- Effective number of samples (1-beta^n)/(1-beta)
- Balanced weights (total_samples / (n_classes * class_samples))
- Custom business-driven weights

FOCAL LOSS MECHANISM:
- Modulating factor: (1 - p_t)^gamma
- Focuses on hard-to-classify examples
- Gamma parameter (0 to 5, typically 2)
- Down-weights easy examples automatically

SAMPLE REWEIGHTING:
- Hard example mining
- Online hard example mining (OHEM)
- Importance sampling
- Curriculum learning (easy to hard)

C. Regularization Components:

PENALTY TERMS:
- L1 regularization (sparsity, feature selection)
- L2 regularization (weight decay, smoothness)
- Elastic Net (L1 + L2 combination)
- Dropout regularization (in loss context)

CONSISTENCY REGULARIZATION:
- Unsupervised consistency (augmented views)
- Temporal consistency (video, time series)
- Semi-supervised learning components

ADVERSARIAL COMPONENTS:
- Adversarial training loss
- Domain adversarial loss
- Fairness adversarial loss

D. Multi-Task Components:

TASK-SPECIFIC LOSSES:
- Separate loss per task
- Task weighting (static or dynamic)
- Uncertainty-based weighting (learn task weights)
- Gradient normalization across tasks

SHARED REPRESENTATIONS:
- Auxiliary task losses
- Distillation losses (knowledge transfer)
- Contrastive learning across tasks

E. Calibration Components:

CALIBRATION LOSSES:
- Temperature scaling loss
- Platt scaling loss
- Expected Calibration Error (ECE) minimization
- Brier score (probability accuracy)

F. Fairness Components:

FAIRNESS CONSTRAINTS:
- Demographic parity term
- Equal opportunity term
- Equalized odds term
- Individual fairness term
- Calibration fairness

**Loss Function Composition:**

Combine components into final loss:

A. Composition Strategies:

WEIGHTED SUM:
- L_total = w1*L1 + w2*L2 + ... + wn*Ln
- Most common approach
- Weights sum to 1 (or flexible)
- Each component targets specific objective

MULTI-STAGE:
- Different loss functions at different training stages
- Curriculum learning (change loss over time)
- Warmup periods for components

CONDITIONAL:
- Loss changes based on training progress
- Threshold-based switching
- Metric-based adaptation

B. Weight Determination:

STATIC WEIGHTS:
- Manual specification based on importance
- Grid search over weight combinations
- Bayesian optimization of weights

DYNAMIC WEIGHTS:
- Uncertainty-based (learn task uncertainty, weight inversely)
- Gradient normalization (balance gradient magnitudes)
- Performance-based (weight by validation performance)
- Attention-based (learn attention over losses)

C. Mathematical Formulation:

For each designed loss, provide:
- Complete mathematical equation (LaTeX notation)
- Component breakdown with explanations
- Parameter definitions and typical ranges
- Gradient properties (convex, non-convex, smooth)
- Computational complexity
- Numerical stability considerations

**Code Generation:**

Generate production-ready implementation:

A. Framework Support:
- PyTorch (most popular for research)
- TensorFlow/Keras (industry standard)
- JAX (high-performance, Google)
- Pseudo-code (framework-agnostic understanding)

B. Implementation Requirements:

PYTORCH IMPLEMENTATION:
Structure:

Inherit from nn.Module
Implement forward() method
Handle batch dimensions
Support optional parameters (weights, reduction)
Include numerical stability (log-sum-exp, epsilon)
Clear docstrings
Type hints


TENSORFLOW/KERAS:
Structure:

Function-based or class-based
Compatible with tf.keras.losses.Loss
Handle y_true and y_pred
Support sample_weight
Reduction modes (sum, mean, none)


JAX IMPLEMENTATION:
Structure:

Pure functions
JIT-compatible
Vectorized operations
Gradient-friendly


C. Code Features:
- Numerically stable implementations
- Efficient tensor operations
- GPU-compatible
- Batch processing support
- Configurable hyperparameters
- Gradient clipping (if needed)
- Error handling (shape mismatches, invalid values)
- Comments explaining each step

**Visualization Generation:**

Create visual explanations:

A. Loss Landscape:
- 2D visualization of loss surface
- Show how loss changes with predictions
- Highlight difficult regions
- Compare with standard losses

B. Component Contribution:
- Pie chart or bar chart showing weight of each component
- Evolution of component weights (if dynamic)
- Gradient contribution per component

C. Behavior Plots:
- Loss value vs prediction confidence
- Loss value vs class imbalance ratio
- Loss behavior for edge cases (very confident wrong predictions)
- Comparison curves (custom vs standard)

D. Training Dynamics:
- Expected training curve shape
- Convergence characteristics
- Potential instabilities

**Comparison with Standard Losses:**

Provide comprehensive comparison:

A. Standard Loss Baselines:
- Cross-Entropy (classification)
- MSE (regression)
- Focal Loss (imbalanced classification)
- Dice Loss (segmentation)
- Triplet Loss (metric learning)

B. Comparison Dimensions:

THEORETICAL:
- Mathematical properties (convexity, smoothness)
- Gradient behavior
- Sensitivity to outliers
- Robustness to label noise

PRACTICAL:
- Expected performance improvement
- Training stability
- Convergence speed
- Hyperparameter sensitivity
- Computational overhead

USE CASE:
- When custom loss outperforms
- When standard loss is sufficient
- Trade-offs to consider

C. Tabular Comparison:
| Aspect | Custom Loss | Cross-Entropy | Focal Loss |
|--------|-------------|---------------|------------|
| Imbalance Handling | Excellent | Poor | Good |
| Training Speed | Medium | Fast | Medium |
| etc. | ... | ... | ... |

**Usage Guidance:**

Provide implementation advice:

A. When to Use This Loss:
- Specific problem characteristics that make it suitable
- Dataset size and quality requirements
- Computational budget considerations
- Team expertise needed

B. When NOT to Use:
- Cases where standard loss is better
- Situations where complexity isn't worth it
- Alternative approaches to consider

C. Hyperparameter Tuning:
- Which parameters to tune first
- Typical value ranges
- Sensitivity analysis
- Tuning strategy (grid search, Bayesian)

D. Integration Steps:
- How to replace existing loss
- Validation strategy (sanity checks)
- Monitoring during training
- Debugging tips

E. Common Issues and Solutions:
- Gradient vanishing/exploding
- Numerical instability
- Slow convergence
- Overfitting to loss components
- Task weight imbalance

**Multi-Task Weight Suggestions:**

For multi-task learning scenarios:

A. Weight Initialization:
- Equal weights (baseline)
- Task importance-based
- Inverse task difficulty
- Uncertainty-based initialization

B. Dynamic Weighting Strategies:
- GradNorm (gradient normalization)
- Uncertainty weighting (learn task uncertainties)
- Loss-balanced task weighting
- DWA (Dynamic Weight Averaging)

C. Weight Scheduling:
- Constant throughout training
- Warmup then constant
- Curriculum (change over epochs)
- Adaptive (based on validation performance)

D. Code for Weight Management:
- Implementation of dynamic weighting
- Logging and monitoring weights
- Visualization of weight evolution

**Expected Behavior Analysis:**

Predict loss function behavior:

A. Training Characteristics:
- Convergence speed (faster/slower than standard)
- Stability (smooth vs oscillating)
- Final loss value range
- Overfitting tendency

B. Model Behavior:
- How model predictions will change
- Class distribution in predictions
- Confidence calibration
- Decision boundary characteristics

C. Performance Expectations:
- Expected metric improvements (accuracy, F1, etc.)
- Which metrics will improve most
- Potential trade-offs
- Variance in results (high/low)

D. Failure Modes:
- What can go wrong
- How to detect issues
- Recovery strategies

**Output Format:**

Return JSON with this structure:

{
  "problemAnalysis": {
    "taskType": "Binary Classification - Fraud Detection",
    "domain": "Finance",
    "keyCharacteristics": [
      "Severe class imbalance (1:1000)",
      "High cost of false negatives (missing fraud)",
      "Moderate cost of false positives (customer friction)",
      "Requires high recall while maintaining precision"
    ],
    "datasetSize": "100,000 samples",
    "imbalanceRatio": "1:1000",
    "businessObjective": "Maximize fraud detection (recall) while keeping false alarms manageable"
  },
  "lossDesign": {
    "name": "Weighted Focal Loss with Asymmetric Penalties",
    "category": "Custom Classification Loss",
    "components": [
      {
        "name": "Focal Loss Base",
        "purpose": "Focus on hard-to-classify fraud cases",
        "weight": 0.7,
        "equation": "FL = -α(1-p)^γ * log(p)",
        "parameters": {
          "alpha": 0.75,
          "gamma": 2.0
        }
      },
      {
        "name": "Asymmetric Penalty",
        "purpose": "Heavily penalize missed fraud (false negatives)",
        "weight": 0.3,
        "equation": "AP = β * I(y=1, ŷ=0) * log(1-p)",
        "parameters": {
          "beta": 5.0
        }
      }
    ],
    "finalEquation": "L = 0.7 * FL + 0.3 * AP",
    "latexEquation": "\\mathcal{L} = 0.7 \\cdot \\left[-\\alpha(1-p_t)^\\gamma \\log(p_t)\\right] + 0.3 \\cdot \\left[\\beta \\cdot \\mathbb{1}_{y=1,\\hat{y}=0} \\cdot \\log(1-p)\\right]"
  },
  "implementation": {
    "pytorch": {
      "code": "import torch\nimport torch.nn as nn\n\nclass WeightedFocalAsymmetricLoss(nn.Module):\n    def __init__(self, alpha=0.75, gamma=2.0, beta=5.0, focal_weight=0.7):\n        super().__init__()\n        self.alpha = alpha\n        self.gamma = gamma\n        self.beta = beta\n        self.focal_weight = focal_weight\n        self.asymmetric_weight = 1 - focal_weight\n    \n    def forward(self, inputs, targets):\n        # Implementation details...\n        pass",
      "usage": "loss_fn = WeightedFocalAsymmetricLoss()\nloss = loss_fn(predictions, labels)"
    },
    "tensorflow": {
      "code": "import tensorflow as tf\n\ndef weighted_focal_asymmetric_loss(alpha=0.75, gamma=2.0, beta=5.0):\n    def loss(y_true, y_pred):\n        # Implementation details...\n        pass\n    return loss",
      "usage": "model.compile(loss=weighted_focal_asymmetric_loss())"
    },
    "jax": {
      "code": "import jax.numpy as jnp\n\ndef weighted_focal_asymmetric_loss(predictions, targets, alpha=0.75, gamma=2.0, beta=5.0):\n    # Implementation details...\n    pass"
    }
  },
  "mathematicalBreakdown": {
    "components": [
      {
        "component": "Focal Loss (FL)",
        "explanation": "Down-weights easy examples (high confidence correct predictions) and focuses learning on hard examples. The (1-p)^γ term reduces loss for well-classified examples. With γ=2, an example with p=0.9 has 100x less loss than p=0.5.",
        "gradientBehavior": "Stronger gradients for misclassified examples, weaker for correct predictions",
        "parameters": {
          "alpha": {
            "value": 0.75,
            "meaning": "Weight for positive class (fraud). 0.75 means fraud examples weighted 3x more than non-fraud.",
            "tuningRange": "0.5-0.9 for severe imbalance"
          },
          "gamma": {
            "value": 2.0,
            "meaning": "Focusing parameter. Higher = more focus on hard examples.",
            "tuningRange": "0-5, typically 2"
          }
        }
      },
      {
        "component": "Asymmetric Penalty (AP)",
        "explanation": "Adds extra penalty when fraud is missed (y=1 but ŷ=0). This explicitly encodes the business constraint that missing fraud is costly. β=5 means false negatives are penalized 5x more.",
        "gradientBehavior": "Strong gradient when fraud is misclassified as non-fraud",
        "parameters": {
          "beta": {
            "value": 5.0,
            "meaning": "False negative cost multiplier. 5.0 = missing fraud is 5x worse than false alarm.",
            "tuningRange": "2-10 depending on business cost ratio"
          }
        }
      }
    ],
    "combinationRationale": "70% focal loss provides general imbalance handling and hard example mining. 30% asymmetric penalty specifically targets the business objective of minimizing missed fraud. This combination balances technical (imbalance) and business (cost) considerations."
  },
  "comparison": {
    "withStandardLosses": [
      {
        "lossName": "Cross-Entropy",
        "performance": "Poor - dominated by majority class, low recall on fraud",
        "whenBetter": "Balanced datasets with equal error costs",
        "expectedGap": "Custom loss should improve recall by 20-30 percentage points"
      },
      {
        "lossName": "Focal Loss (standard)",
        "performance": "Good - handles imbalance, but doesn't encode asymmetric costs",
        "whenBetter": "When false positives and false negatives equally costly",
        "expectedGap": "Custom loss should improve recall by 5-10 points while maintaining similar precision"
      },
      {
        "lossName": "Weighted Cross-Entropy",
        "performance": "Moderate - handles imbalance but not hard examples",
        "whenBetter": "Simple imbalance without hard example issues",
        "expectedGap": "Custom loss should be more robust and converge faster"
      }
    ],
    "comparisonTable": {
      "headers": ["Metric", "Custom Loss", "Cross-Entropy", "Focal Loss", "Weighted CE"],
      "rows": [
        ["Recall (Fraud)", "92-95%", "45-60%", "85-90%", "75-85%"],
        ["Precision", "40-50%", "70-80%", "45-55%", "50-60%"],
        ["F1 Score", "56-65%", "54-68%", "59-67%", "60-70%"],
        ["Training Stability", "Good", "Excellent", "Good", "Good"],
        ["Convergence Speed", "Medium", "Fast", "Medium", "Fast"],
        ["Hyperparameter Sensitivity", "Medium", "Low", "Medium", "Low"]
      ]
    }
  },
  "visualization": {
    "lossLandscape": {
      "description": "Loss surface showing how loss changes with predicted probability",
      "xAxis": "Predicted probability (0-1)",
      "yAxis": "Loss value",
      "curves": [
        {
          "name": "Custom Loss (y=1, fraud)",
          "behavior": "High loss at low probabilities, rapidly decreasing as confidence increases"
        },
        {
          "name": "Custom Loss (y=0, non-fraud)",
          "behavior": "High loss at high probabilities, decreasing as confidence in non-fraud increases"
        },
        {
          "name": "Cross-Entropy (comparison)",
          "behavior": "Logarithmic decrease, doesn't focus on hard examples"
        }
      ]
    },
    "componentContribution": {
      "chartType": "pie",
      "data": [
        { "component": "Focal Loss", "percentage": 70 },
        { "component": "Asymmetric Penalty", "percentage": 30 }
      ]
    }
  },
  "usageGuidance": {
    "whenToUse": [
      "Severe class imbalance (>1:100 ratio)",
      "Asymmetric error costs (one error type much costlier)",
      "Hard example problems (some samples very difficult)",
      "Business constraints on specific error types",
      "Standard losses underperforming on minority class"
    ],
    "whenNotToUse": [
      "Balanced datasets (cross-entropy is simpler)",
      "Equal error costs (no business asymmetry)",
      "Very small datasets (<1000 samples - risk overfitting to loss)",
      "Real-time inference critical (negligible difference in practice)",
      "Team unfamiliar with custom losses (maintenance burden)"
    ],
    "implementationSteps": [
      "1. Replace existing loss function with custom loss in training code",
      "2. Start with suggested parameter values (alpha=0.75, gamma=2.0, beta=5.0)",
      "3. Run initial training for 10-20% of planned epochs",
      "4. Validate that loss is decreasing and metrics improving",
      "5. Check for numerical instabilities (NaN, Inf values)",
      "6. Fine-tune parameters based on validation performance",
      "7. Monitor recall vs precision trade-off",
      "8. Compare with baseline model (cross-entropy) on validation set",
      "9. Perform error analysis on misclassified samples",
      "10. Deploy with A/B testing against production baseline"
    ],
    "hyperparameterTuning": {
      "priority": [
        {
          "parameter": "beta (asymmetric penalty)",
          "importance": "High",
          "tuningStrategy": "Grid search [2, 5, 10] based on business cost ratio",
          "expectedImpact": "Directly controls recall/precision trade-off"
        },
        {
          "parameter": "focal_weight (component balance)",
          "importance": "Medium",
          "tuningStrategy": "Try [0.5, 0.7, 0.9] to balance components",
          "expectedImpact": "Affects overall training dynamics"
        },
        {
          "parameter": "gamma (focusing)",
          "importance": "Medium",
          "tuningStrategy": "Try [1.0, 2.0, 3.0] for hard example focus",
          "expectedImpact": "Changes emphasis on difficult examples"
        },
        {
          "parameter": "alpha (class weight)",
          "importance": "Low",
          "tuningStrategy": "Usually set to minority class ratio (0.75 for 1:3)",
          "expectedImpact": "Basic class balance"
        }
      ],
      "tuningWorkflow": "Use Bayesian optimization or grid search on validation set. Monitor both loss value AND business metrics (recall, precision). Don't overfit to validation performance."
    },
    "commonIssues": [
      {
        "issue": "Loss not decreasing",
        "causes": ["Learning rate too high/low", "Numerical instability", "Parameter values extreme"],
        "solutions": ["Reduce LR to 1e-4 or lower", "Add epsilon=1e-7 to log operations", "Use suggested parameter ranges"]
      },
      {
        "issue": "Model predicts only one class",
        "causes": ["Weights too extreme", "Imbalance handling too aggressive"],
        "solutions": ["Reduce beta to 2-3", "Increase focal_weight to 0.8-0.9", "Add class balancing in data sampling"]
      },
      {
        "issue": "High recall but very low precision",
        "causes": ["Asymmetric penalty too strong"],
        "solutions": ["Reduce beta", "Add precision-focused term", "Adjust decision threshold in post-processing"]
      },
      {
        "issue": "Training unstable (loss spikes)",
        "causes": ["Gradient explosion from hard examples"],
        "solutions": ["Gradient clipping (max_norm=1.0)", "Reduce gamma to 1.0", "Lower learning rate"]
      }
    ],
    "monitoring": {
      "duringTraining": [
        "Plot loss curve (should decrease smoothly)",
        "Track recall and precision on validation set",
        "Monitor class distribution in predictions",
        "Check gradient norms (detect explosions)",
        "Visualize confusion matrix each epoch",
        "Log loss component contributions"
      ],
      "postTraining": [
        "Error analysis (which fraud cases still missed?)",
        "Calibration analysis (are probabilities accurate?)",
        "Fairness analysis (if applicable)",
        "Business metric evaluation (expected cost reduction)",
        "Comparison with production baseline"
      ]
    }
  },
  "multiTaskWeighting": null,
  "expectedBehavior": {
    "trainingDynamics": {
      "convergence": "Medium speed - faster than weighted CE, slower than standard CE",
      "stability": "Good with proper hyperparameters, may oscillate if beta too high",
      "finalLossValue": "Lower than cross-entropy (0.1-0.3 vs 0.5-0.8)",
      "epochs": "May need 20-30% more epochs than cross-entropy for full convergence"
    },
    "modelBehavior": {
      "predictions": "Higher recall on fraud class (more conservative)",
      "confidenceScores": "Lower average confidence (due to hard example focus)",
      "decisionBoundary": "Shifted toward higher fraud predictions",
      "calibration": "May be slightly less calibrated than CE, consider temperature scaling"
    },
    "performanceExpectations": {
      "recallImprovement": "+15 to +30 percentage points vs cross-entropy",
      "precisionChange": "-5 to -15 percentage points (acceptable trade-off)",
      "f1Change": "+5 to +15 percentage points",
      "aucRoc": "Similar or slightly better (+0.02 to +0.05)",
      "businessMetric": "Estimated 40-60% reduction in missed fraud cases"
    },
    "failureModes": [
      {
        "mode": "Overfitting to rare fraud patterns",
        "detection": "High training recall, low validation recall",
        "mitigation": "Stronger regularization, data augmentation, reduce model capacity"
      },
      {
        "mode": "Excessive false positives",
        "detection": "Recall >95% but precision <20%",
        "mitigation": "Reduce beta, add precision-focused term, adjust threshold"
      }
    ]
  },
  "codeExamples": {
    "training": "...",
    "validation": "..."
  },
  "references": [
    "Lin et al. (2017) - Focal Loss for Dense Object Detection",
    "Cui et al. (2019) - Class-Balanced Loss Based on Effective Number of Samples",
    "Khan et al. (2019) - Cost-Sensitive Learning of Deep Feature Representations"
  ]
}

Return strict JSON format only.
`;

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: systemPrompt,
      generationConfig: {
        responseMimeType: 'application/json',
      },
    });

    const userPrompt = `
      Analyze the following ML problem and design a custom loss function:

      Problem Description:
      - Task Type: ${problemDescription.taskType}
      - Domain: ${problemDescription.domain}
      - Description: ${problemDescription.description}

      Dataset Characteristics:
      - Imbalance Ratio: ${datasetCharacteristics.imbalanceRatio}
      - Size: ${datasetCharacteristics.datasetSize}
      - Quality: ${datasetCharacteristics.dataQuality}

      Business Objectives:
      - Error Cost Profile: ${businessObjectives.errorCost}
      - Primary Objective: ${businessObjectives.primaryObjective}
      - Constraints: ${businessObjectives.constraints.join(', ')}

      Multi-Task Context: ${multiTaskInfo && multiTaskInfo.isMultiTask ? `Yes, tasks: ${multiTaskInfo.tasks?.join(', ')}` : 'No'}

      Return the result in strict JSON format matching the schema defined in the system prompt.
      Ensure ALL fields are populated with high-quality, actionable content.
      Ensure all code snippets are properly escaped within the JSON strings.
    `;

    const result = await model.generateContent(userPrompt);
    const response = await result.response;
    const text = response.text();

    // Clean up markdown block markers
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
      const parsedData = JSON.parse(jsonString);
      const validation = LossFunctionDesignerSchema.safeParse(parsedData);

      if (validation.success) {
        return { success: true, data: validation.data };
      } else {
        console.error('Schema validation error:', JSON.stringify(validation.error.errors, null, 2));
        return { success: false, error: 'AI generated invalid data structure', details: validation.error.errors, partialData: parsedData };
      }
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return { success: false, error: 'Failed to parse AI response' };
    }

  } catch (error) {
    console.error('Gemini API error:', error);
    return { success: false, error: 'Failed to generate loss function' };
  }
}
