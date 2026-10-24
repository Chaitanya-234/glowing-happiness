import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NLP Pipeline Designer | AI Text Analysis Tool | DevMetrix',
  description: 'Free AI-powered NLP pipeline designer. Design complete text classification, NER, summarization, and QA pipelines. Get model recommendations (BERT, GPT, T5), preprocessing code, training strategies, and deployment guides. Supports 100+ languages and domains.',
  keywords: [
    'nlp pipeline designer', 'text analysis tool', 'ai nlp tool', 'bert pipeline generator',
    'transformers code generator', 'text classification pipeline', 'sentiment analysis tool',
    'named entity recognition tool', 'question answering system', 'text summarization tool',
    'machine translation pipeline', 'chatbot development tool', 'text generation pipeline',
    'bert fine-tuning', 'gpt fine-tuning', 'transformer model selection', 'huggingface pipeline',
    'pretrained model recommendation', 'distilbert implementation', 'roberta fine-tuning',
    'tokenization strategy', 'text preprocessing pipeline', 'model training code',
    'nlp evaluation metrics', 'transformer deployment', 'model optimization', 'quantization nlp',
    'distillation nlp', 'pytorch nlp pipeline', 'tensorflow nlp', 'huggingface transformers',
    'spacy pipeline', 'keras nlp', 'multilingual nlp', 'language-specific nlp',
    'chinese nlp pipeline', 'arabic nlp processing', 'low-resource languages',
    'medical nlp pipeline', 'legal text analysis', 'financial nlp', 'social media nlp'
  ],
  openGraph: {
    title: 'AI NLP Pipeline Designer - Design Text Analysis Systems',
    description: 'Design production-ready NLP pipelines in minutes. AI recommends models (BERT, GPT, T5), generates complete code, training strategies, and deployment guides.',
    url: 'https://devmetrix.com/tools/nlp-pipeline-designer',
    siteName: 'DevMetrix',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NLP Pipeline Designer | DevMetrix',
    description: 'Design complete NLP pipelines with AI. Model recommendations, training code, deployment strategies. Free tool.',
    creator: '@devmetrix',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
