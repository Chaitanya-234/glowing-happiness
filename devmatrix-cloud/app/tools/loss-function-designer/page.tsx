import React from 'react';
import LossFunctionClient from './components/LossFunctionClient';

export default function LossFunctionDesignerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "AI Loss Function Designer",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "featureList": [
          "Custom loss function design",
          "Imbalanced data handling",
          "Asymmetric error cost encoding",
          "PyTorch/TensorFlow code generation",
          "Loss landscape visualization"
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Design a Custom Loss Function",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Define Problem",
            "text": "Specify your ML task type (e.g., classification, regression) and domain context."
          },
          {
            "@type": "HowToStep",
            "name": "Analyze Dataset",
            "text": "Input dataset characteristics like class imbalance ratio and size."
          },
          {
            "@type": "HowToStep",
            "name": "Set Objectives",
            "text": "Define business constraints, error costs, and optimization goals."
          },
          {
            "@type": "HowToStep",
            "name": "Generate Code",
            "text": "Get AI-generated, mathematically sound loss function code in PyTorch or TensorFlow."
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Tool Section */}
      <LossFunctionClient />

      {/* SEO Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            The Ultimate Guide to Custom Loss Functions in Machine Learning
          </h1>

          <p className="lead text-xl text-slate-600 dark:text-slate-300 mb-8">
            While standard loss functions like Cross-Entropy and MSE serve as reliable baselines, real-world machine learning problems often require more nuanced approaches. This guide explores the art and science of designing custom loss functions to handle class imbalance, encode business constraints, and optimize for complex objectives.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-6">What is a Loss Function in Machine Learning?</h2>
          <p>
            At its core, a <strong>loss function</strong> (also known as a cost function or objective function) is a mathematical formula that quantifies the difference between a model's predicted output and the actual ground truth. It serves as the compass for the training process: by minimizing this value, the model "learns" to make better predictions.
          </p>
          <p>
            During training, the loss function provides the gradient signal used by optimization algorithms (like SGD or Adam) to update the model's weights. If the loss function doesn't accurately reflect your true goal, your model will effectively become excellent at solving the wrong problem.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-6">Why Custom Loss Functions Matter</h2>
          <p>
            Standard loss functions assume ideal conditions: balanced datasets, equal costs for all error types, and independent samples. However, real-world data rarely adheres to these assumptions.
          </p>
          <ul>
            <li><strong>Business Alignment:</strong> In fraud detection, a false negative (missing a fraud) might cost $10,000, while a false positive (flagging a legit transaction) costs $5 in customer friction. Standard Cross-Entropy treats these errors equally.</li>
            <li><strong>Imbalanced Data:</strong> If 99% of your data is "normal" and 1% is "anomaly", a model can achieve 99% accuracy by predicting "normal" for everything. A custom loss is needed to penalize missing the minority class.</li>
            <li><strong>Complex Objectives:</strong> Sometimes you need to optimize for ranking metrics (NDCG) or ensure fairness across demographic groups, which standard losses don't directly address.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-6">Common Loss Functions Explained</h2>

          <h3 className="text-xl font-semibold mt-8 mb-4">Classification Losses</h3>
          <p>
            <strong>Cross-Entropy Loss (Log Loss):</strong> The standard for classification. It measures the performance of a classification model whose output is a probability value between 0 and 1.
          </p>
          <p>
            <strong>Focal Loss:</strong> Designed by Lin et al. for dense object detection, it reshapes the standard Cross-Entropy loss to down-weight easy examples and focus training on hard negatives. This is the go-to standard for imbalanced classification.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">Regression Losses</h3>
          <p>
            <strong>Mean Squared Error (MSE):</strong> Penalizes large errors squarely, making it sensitive to outliers.
            <br />
            <strong>Mean Absolute Error (MAE):</strong> More robust to outliers but has gradients that are not continuous at zero.
            <br />
            <strong>Huber Loss:</strong> Combines the best of both worlds—quadratic for small errors (differentiable) and linear for large errors (robust).
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-6">Designing Custom Losses: A Component-Based Approach</h2>
          <p>
            The most effective way to design a custom loss is to view it as a composition of functional components.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">1. The Base Component</h3>
          <p>Start with a standard loss that fits your task type (e.g., BCE for binary classification). This provides the fundamental gradient signal.</p>

          <h3 className="text-xl font-semibold mt-8 mb-4">2. The Weighting Component</h3>
          <p>
            Modify the base loss to handle imbalance.
            <br />
            <code>w_class = n_samples / (n_classes * n_samples_class)</code>
            <br />
            Multiplying the loss by these weights prevents the majority class from dominating the gradient updates.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">3. The Focusing Component</h3>
          <p>
            Add a modulating factor like <code>(1 - p_t)^gamma</code> from Focal Loss. This reduces the loss contribution from examples the model is already confident about, forcing it to "study harder" on the difficult cases.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">4. The Constraint Component</h3>
          <p>
            Add penalty terms for business rules. For example, if you need the model's predicted probabilities to be calibrated, you might add a term that penalizes the difference between predicted confidence and empirical accuracy.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-6">Implementing in PyTorch and TensorFlow</h2>
          <p>
            Modern deep learning frameworks make it easy to implement custom autograd functions. In PyTorch, you typically subclass <code>nn.Module</code> and implement the <code>forward</code> method.
          </p>
          <pre className="bg-slate-800 text-slate-100 p-4 rounded-lg overflow-x-auto">
            <code>
{`class CustomFocalLoss(nn.Module):
    def __init__(self, alpha=1, gamma=2):
        super().__init__()
        self.alpha = alpha
        self.gamma = gamma

    def forward(self, inputs, targets):
        bce_loss = F.binary_cross_entropy_with_logits(inputs, targets, reduction='none')
        pt = torch.exp(-bce_loss)
        focal_loss = self.alpha * (1-pt)**self.gamma * bce_loss
        return focal_loss.mean()`}
            </code>
          </pre>

          <h2 className="text-2xl font-bold mt-12 mb-6">Hyperparameter Tuning for Custom Losses</h2>
          <p>
            Custom losses introduce new hyperparameters (like alpha and gamma in Focal Loss, or beta in F-beta optimizations). Tuning these is critical.
          </p>
          <ul>
            <li><strong>Grid Search:</strong> Good for 1-2 parameters with small ranges.</li>
            <li><strong>Bayesian Optimization:</strong> Recommended for custom losses with multiple interacting components.</li>
            <li><strong>Validation Metric:</strong> Never tune your loss function parameters based on the loss value itself (which is arbitrary). Always tune based on the business metric you care about (e.g., Recall @ Precision 95%).</li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-6">Common Pitfalls</h2>
          <p>
            <strong>Numerical Instability:</strong> Operations like <code>log(0)</code> will cause NaNs. Always use <code>log(p + epsilon)</code> or stable implementations like <code>log_softmax</code>.
            <br />
            <strong>Gradient Explosion:</strong> If your penalty terms are too large, gradients can explode. Use gradient clipping.
            <br />
            <strong>Overfitting to Constraints:</strong> If a constraint weight is too high, the model might satisfy the constraint perfectly (e.g., 0 false positives) by becoming useless (predicting nothing).
          </p>

          <div className="bg-violet-50 dark:bg-violet-900/20 p-6 rounded-xl border border-violet-100 dark:border-violet-800 mt-12">
            <h3 className="text-xl font-bold text-violet-900 dark:text-violet-100 mb-2">Ready to Design Your Loss?</h3>
            <p className="text-violet-700 dark:text-violet-200">
              Use the <strong>AI Loss Function Designer</strong> tool above to automatically generate a mathematically robust loss function tailored to your specific problem. It handles the math, code generation, and sanity checks for you.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
