'use server';

import { generateStructuredContent } from '../../actions/gemini-structured';
import { CacheStrategySchema } from '../../../lib/ai-schemas';
import { z } from 'zod';

export type CacheStrategyInput = {
  applicationDetails: {
    name: string;
    type: string;
    dailyRequests: number;
    concurrentUsers: number;
    databaseSize: string;
    growthRate: string;
    techStack: {
      frontend: string[];
      backend: string[];
      database: string[];
      caching: string[];
    };
    performanceRequirements: {
      targetLatency: string;
      dataFreshness: string;
      consistency: string;
      budget: string;
    };
  };
  accessPatterns: {
    dataCategory: string;
    readFrequency: string;
    writeFrequency: string;
    updatePattern: string;
    sizeEstimate: string;
    importance: string;
  }[];
  trafficPatterns: {
    peakTimes: string[];
    geoDistribution: string;
    seasonality: string;
    predictability: string;
  };
};

export async function generateCacheStrategy(input: CacheStrategyInput) {
  const prompt = `
    Create a comprehensive "AI Cache Strategy Optimizer" plan for the following application:

    **Application Analysis:**
    - Name: ${input.applicationDetails.name}
    - Type: ${input.applicationDetails.type}
    - Scale: ${input.applicationDetails.dailyRequests} requests/day, ${input.applicationDetails.concurrentUsers} concurrent users
    - Database Size: ${input.applicationDetails.databaseSize}
    - Growth Rate: ${input.applicationDetails.growthRate}
    - Tech Stack:
      - Frontend: ${input.applicationDetails.techStack.frontend.join(', ')}
      - Backend: ${input.applicationDetails.techStack.backend.join(', ')}
      - Database: ${input.applicationDetails.techStack.database.join(', ')}
      - Current Caching: ${input.applicationDetails.techStack.caching.join(', ')}
    - Performance Goals:
      - Target Latency: ${input.applicationDetails.performanceRequirements.targetLatency}
      - Data Freshness: ${input.applicationDetails.performanceRequirements.dataFreshness}
      - Consistency: ${input.applicationDetails.performanceRequirements.consistency}
      - Budget: ${input.applicationDetails.performanceRequirements.budget}

    **Access Patterns:**
    ${input.accessPatterns.map(p => `
    - Category: ${p.dataCategory}
      - Read: ${p.readFrequency}, Write: ${p.writeFrequency}
      - Updates: ${p.updatePattern}
      - Size: ${p.sizeEstimate}
      - Importance: ${p.importance}
    `).join('')}

    **Traffic Patterns:**
    - Peaks: ${input.trafficPatterns.peakTimes.join(', ')}
    - Geo: ${input.trafficPatterns.geoDistribution}
    - Seasonality: ${input.trafficPatterns.seasonality}
    - Predictability: ${input.trafficPatterns.predictability}

    **INSTRUCTIONS:**

    You are an expert software architect specializing in high-performance caching strategies.
    Analyze the provided application details and access patterns to design a multi-tier caching strategy.

    1. **Application Architecture Analysis**: Confirm understanding of the app structure, scale, and constraints.
    2. **Data Access Pattern Recognition**: Identify hot/warm/cold data, read/write ratios, and mutation patterns.
    3. **Cache Layer Strategy Design**: Recommend specific layers (Client, CDN, App, Distributed, DB, Full-Page) based on the inputs.
    4. **Cache Invalidation Strategy**: Design intelligent invalidation (TTL, Event-based, Tag-based, SWR) for each data type.
    5. **Cache Sizing**: Recommend optimal cache sizes and eviction policies.
    6. **Performance Estimation**: Predict hit rates, latency improvements, and load reduction.
    7. **Code Generation**: Provide specific configuration snippets (Redis, Nginx, Next.js) and implementation code (Middleware, wrappers) in the relevant languages for the tech stack.
    8. **Monitoring**: Suggest metrics and alerts.

    Adhere strictly to the JSON schema provided. Ensure recommendations are specific to the tech stack (e.g., if using Next.js, mention Data Cache; if Python, mention Django/Flask caching).
  `;

  return generateStructuredContent(prompt, 'cache_optimizer');
}
