import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Loss Function Designer | Custom ML Loss Generator | DevMetrix',
  description: 'Free AI-powered loss function designer for machine learning. Design custom losses for imbalanced datasets, asymmetric costs, and multi-task learning. Get mathematically sound implementations in PyTorch, TensorFlow, JAX with hyperparameter tuning guidance. Handles classification, regression, segmentation, detection, and ranking tasks.',
  keywords: [
    'loss function designer',
    'custom loss function generator',
    'ai loss function',
    'machine learning loss',
    'deep learning loss function',
    'classification loss function',
    'regression loss function',
    'imbalanced classification loss',
    'multi-task loss function',
    'segmentation loss function',
    'object detection loss',
    'ranking loss function',
    'metric learning loss',
    'class imbalance loss',
    'asymmetric cost loss',
    'focal loss generator',
    'weighted loss function',
    'cost-sensitive learning',
    'hard example mining',
    'multi-objective loss',
    'pytorch loss function',
    'tensorflow loss',
    'keras custom loss',
    'jax loss function',
    'custom loss implementation',
    'focal loss implementation',
    'dice loss',
    'triplet loss',
    'contrastive loss',
    'adversarial loss',
    'calibration loss',
    'fairness loss',
    'fraud detection loss',
    'medical diagnosis loss',
    'anomaly detection loss',
    'recommendation loss',
    'image segmentation loss',
    'business constraint encoding',
    'cost-sensitive machine learning',
    'imbalanced data handling',
    'precision recall optimization',
    'how to design custom loss function',
    'loss function for imbalanced dataset',
    'pytorch custom loss function example',
    'multi-task learning loss weights',
    'focal loss vs cross entropy',
    'asymmetric cost classification',
    'custom loss function best practices',
    'gradient-based loss optimization'
  ],
  openGraph: {
    title: 'AI Loss Function Designer - Create Custom ML Losses',
    description: 'Design mathematically sound custom loss functions for your ML problem. Handles class imbalance, asymmetric costs, multi-task learning. Get PyTorch/TensorFlow code with tuning guidance.',
    type: 'website',
    url: 'https://devmetrix.com/tools/loss-function-designer',
    siteName: 'DevMetrix',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Loss Function Designer | DevMetrix',
    description: 'Design custom ML loss functions with AI. Imbalance, costs, multi-task. Get production code.',
    creator: '@devmetrix',
  },
};

export default function LossFunctionDesignerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
