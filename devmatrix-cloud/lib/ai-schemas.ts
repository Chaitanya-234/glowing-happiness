import { z } from 'zod';

export const InterviewQuestionSchema = z.object({
  questions: z.array(
    z.object({
      question: z.string(),
      type: z.enum(['Technical', 'Behavioral', 'System Design']),
      idealAnswer: z.string(),
      tips: z.string(),
    })
  ),
});

export const ResumeAnalysisSchema = z.object({
  score: z.number().min(0).max(100),
  missingKeywords: z.array(z.string()),
  criticalFeedback: z.array(z.string()),
  improvedSummary: z.string(),
});

export const CodeRefactorSchema = z.object({
  refactoredCode: z.string(),
  explanation: z.string(),
  securityIssues: z.array(
    z.object({
      severity: z.enum(['Low', 'Medium', 'High', 'Critical']),
      description: z.string(),
    })
  ),
});

export const ConceptExplanationSchema = z.object({
  analogy: z.string(),
  simplifiedExplanation: z.string(),
  funFact: z.string(),
  quizQuestion: z.string(),
  quizOptions: z.array(z.string()),
  quizCorrectAnswer: z.number().int().nonnegative(),
});

export const UserStorySchema = z.object({
  title: z.string(),
  userStory: z.string(),
  acceptanceCriteria: z.array(z.string()),
  technicalNotes: z.array(z.string()),
});

export const DocumentProcessorSchema = z.object({
  summary: z.string(),
  keyPoints: z.array(z.string()),
  sentiment: z.enum(['Positive', 'Neutral', 'Negative', 'Mixed']),
  category: z.string(),
  suggestedActions: z.array(z.string()),
});

export const DataAnalyzerSchema = z.object({
  analysisSummary: z.string(),
  identifiedTrends: z.array(
    z.object({
      trend: z.string(),
      impact: z.enum(['Low', 'Medium', 'High']),
    })
  ),
  recommendedChart: z.enum(['Bar', 'Line', 'Pie', 'Scatter', 'Table']),
  keyMetrics: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    })
  ),
});

export const ReportGeneratorSchema = z.object({
  reportTitle: z.string(),
  executiveSummary: z.string(),
  sections: z.array(
    z.object({
      heading: z.string(),
      content: z.string(),
    })
  ),
  conclusion: z.string(),
  recommendations: z.array(z.string()),
});

export const EmailAssistantSchema = z.object({
  subjectOptions: z.array(z.string()),
  emailBody: z.string(),
  toneAnalysis: z.string(),
  improvementTips: z.array(z.string()),
});

export const MeetingNoteSchema = z.object({
  meetingTitle: z.string(),
  summary: z.string(),
  agendaItems: z.array(z.string()),
  decisionsMade: z.array(z.string()),
  actionItems: z.array(
    z.object({
      assignee: z.string().optional(),
      task: z.string(),
      priority: z.enum(['High', 'Medium', 'Low']),
    })
  ),
});

export const CourseCurriculumSchema = z.object({
  title: z.string(),
  targetAudience: z.string(),
  duration: z.string(),
  seoMeta: z.object({
    description: z.string(),
    keywords: z.array(z.string()),
  }),
  scormMetadata: z.object({
    scormVersion: z.enum(['1.2', '2004']),
    manifestId: z.string(),
    organization: z.string(),
  }),
  modules: z.array(
    z.object({
      title: z.string(),
      duration: z.string(),
      lessons: z.array(
        z.object({
          title: z.string(),
          type: z.enum(['Video', 'Reading', 'Quiz', 'Exercise', 'Code']),
          contentOutline: z.string(),
          codeExample: z.string().optional(),
          solutionCode: z.string().optional(),
        })
      ),
    })
  ),
  finalQuiz: z.array(
    z.object({
      question: z.string(),
      options: z.array(z.string()),
      correctAnswer: z.number().int().nonnegative(),
    })
  ),
  faq: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ),
});

export const BlogOutlineSchema = z.object({
  title: z.string(),
  seoMeta: z.object({
    description: z.string(),
    keywords: z.array(z.string()),
  }),
  outline: z.array(
    z.object({
      heading: z.string(),
      subpoints: z.array(z.string()),
    })
  ),
  codeSnippets: z.array(
    z.object({
      language: z.string(),
      code: z.string(),
      description: z.string(),
    })
  ),
  faq: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ),
});

export const TechnicalSpecSchema = z.object({
  title: z.string(),
  problemStatement: z.string(),
  proposedSolution: z.string(),
  userStories: z.array(z.string()),
  databaseSchema: z.array(
    z.object({
      table: z.string(),
      fields: z.array(z.string()),
    })
  ),
  apiEndpoints: z.array(
    z.object({
      method: z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
      path: z.string(),
      description: z.string(),
    })
  ),
});

export const PersonaSchema = z.object({
  name: z.string(),
  role: z.string(),
  demographics: z.object({
    age: z.string(),
    location: z.string(),
    education: z.string(),
  }),
  bio: z.string(),
  painPoints: z.array(z.string()),
  goals: z.array(z.string()),
  preferredChannels: z.array(z.string()),
});

export const StartupValidatorSchema = z.object({
  marketAnalysis: z.object({
    totalAddressableMarket: z.string(),
    targetAudience: z.string(),
  }),
  competitors: z.array(
    z.object({
      name: z.string(),
      strength: z.string(),
      weakness: z.string(),
    })
  ),
  swot: z.object({
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    opportunities: z.array(z.string()),
    threats: z.array(z.string()),
  }),
  mvpFeatures: z.array(
    z.object({
      feature: z.string(),
      priority: z.enum(['High', 'Medium', 'Low']),
    })
  ),
  verdict: z.object({
    viabilityScore: z.number().min(0).max(100),
    summary: z.string(),
  }),
});

export const SaasPlanAdvisorSchema = z.object({
  suggestedPlans: z.array(
    z.object({
      name: z.string(),
      price: z.string(),
      features: z.array(z.string()),
      description: z.string(),
      targetAudience: z.string(),
    })
  ),
  pricingStrategy: z.string(),
  pageCopy: z.object({
    headline: z.string(),
    subheadline: z.string(),
    cta: z.string(),
  }),
});

export const SaasEmailGeneratorSchema = z.object({
  sequences: z.array(
    z.object({
      stage: z.string(),
      subject: z.string(),
      body: z.string(),
      delay: z.string(),
    })
  ),
});

export const SaasMetricAnalysisSchema = z.object({
  analysis: z.string(),
  healthScore: z.number().min(0).max(100),
  recommendations: z.array(z.string()),
  projectedGrowth: z.string(),
});

export const ChurnStrategySchema = z.object({
  primaryCause: z.string(),
  immediateActions: z.array(z.string()),
  longTermStrategy: z.string(),
  retentionEmailDraft: z.string(),
});

export const FeaturePrioritySchema = z.object({
  prioritizedFeatures: z.array(
    z.object({
      featureName: z.string(),
      impactScore: z.number(),
      effortScore: z.number(),
      priorityLevel: z.enum([
        'Must Have',
        'Should Have',
        'Could Have',
        "Won't Have",
      ]),
      reasoning: z.string(),
    })
  ),
});

export const CodeTranslatorSchema = z.object({
  translatedCode: z.string(),
  explanation: z.string(),
  complexityAnalysis: z.string(),
  tips: z.array(z.string()),
});

// New Tools

export const SecurityVulnerabilitySchema = z.object({
  vulnerabilities: z.array(z.object({
    id: z.string(),
    name: z.string(),
    severity: z.enum(['Critical', 'High', 'Medium', 'Low', 'Info']),
    description: z.string(),
    fixSuggestion: z.string(),
    secureCodeSnippet: z.string()
  })),
  securityScore: z.number().min(0).max(100),
  summary: z.string()
});

export const AccessibilityCheckerSchema = z.object({
  violations: z.array(z.object({
    ruleId: z.string(),
    impact: z.enum(['Critical', 'Serious', 'Moderate', 'Minor']),
    element: z.string(),
    description: z.string(),
    remediation: z.string(),
    wcagCriteria: z.string()
  })),
  complianceScore: z.number().min(0).max(100),
  summary: z.string()
});

export const CrossBrowserTesterSchema = z.object({
  compatibilityIssues: z.array(z.object({
    browsers: z.array(z.string()),
    issue: z.string(),
    cssPropertyOrFeature: z.string(),
    polyfillOrFix: z.string()
  })),
  testScript: z.string(),
  summary: z.string()
});

export const ApiContractTestingSchema = z.object({
  validationIssues: z.array(z.object({
    endpoint: z.string(),
    method: z.string(),
    issue: z.string(),
    severity: z.enum(['Error', 'Warning'])
  })),
  generatedTestCases: z.array(z.object({
    name: z.string(),
    description: z.string(),
    testCode: z.string()
  })),
  coverageAnalysis: z.string()
});

export const MutationTestingSchema = z.object({
  suggestedMutants: z.array(z.object({
    mutationType: z.string(),
    originalCode: z.string(),
    mutatedCode: z.string(),
    location: z.string()
  })),
  analysis: z.string(),
  effectivenessScore: z.number()
  });
// Testing & QA Tools Schemas

export const UnitTestGeneratorSchema = z.object({
  testSuiteName: z.string(),
  setupCode: z.string(),
  testCases: z.array(
    z.object({
      description: z.string(),
      code: z.string(),
      type: z.enum(['Happy Path', 'Edge Case', 'Error Handling']),
    })
  ),
  teardownCode: z.string().optional(),
});

export const IntegrationTestBuilderSchema = z.object({
  testSuiteDescription: z.string(),
  prerequisites: z.array(z.string()),
  tests: z.array(
    z.object({
      name: z.string(),
      endpoint: z.string(),
      method: z.string(),
      scenario: z.string(),
      testCode: z.string(),
    })
  ),
});

export const TestCoverageAnalyzerSchema = z.object({
  currentCoverageEstimate: z.number().min(0).max(100),
  uncoveredLines: z.array(z.string()),
  missedBranches: z.array(z.string()),
  suggestedTestCases: z.array(
    z.object({
      targetFunction: z.string(),
      scenario: z.string(),
      testCode: z.string(),
    })
  ),
  riskAssessment: z.enum(['Low', 'Medium', 'High', 'Critical']),
});

export const E2ETestScenarioSchema = z.object({
  scenarios: z.array(
    z.object({
      title: z.string(),
      userStoryLink: z.string(),
      steps: z.array(z.string()),
      generatedScript: z.string(),
    })
  ),
  bestPractices: z.array(z.string()),
});

export const PerformanceTestSchema = z.object({
  toolUsed: z.string(),
  scriptCode: z.string(),
  configuration: z.object({
    virtualUsers: z.number(),
    rampUpPeriod: z.string(),
    duration: z.string(),
  }),
  scenariosCovered: z.array(z.string()),
});

export const DockerfileOptimizerSchema = z.object({
  issueSummary: z.array(z.string()),
  optimizedDockerfile: z.string(),
  annotations: z.array(
    z.object({
      lineNumber: z.number().int(),
      issue: z.string(),
      suggestion: z.string(),
      severity: z.enum(['Critical', 'Warning', 'Info']),
    })
  ),
  imageSizeAnalysis: z.object({
    currentSizeEstimate: z.string(),
    optimizedSizeEstimate: z.string(),
    largestLayers: z.array(z.string()),
  }),
  vulnerabilities: z.array(
    z.object({
      package: z.string(),
      cveId: z.string().optional(),
      severity: z.enum(['Critical', 'High', 'Medium', 'Low']),
      recommendation: z.string(),
    })
  ),
  beforeAfterComparison: z.string(),
});

export const CrudGeneratorSchema = z.object({
  files: z.array(
    z.object({
      path: z.string(),
      content: z.string(),
      description: z.string(),
      type: z.enum(['backend', 'frontend', 'test', 'config', 'other']),
    })
  ),
  summary: z.string(),
  instructions: z.string(),
});

export const DetailedInterviewQuestionSchema = z.object({
  questions: z.array(z.object({
    id: z.string(),
    type: z.enum(['Coding', 'System Design', 'Behavioral', 'Technical Knowledge', 'Scenario-Based']),
    difficulty: z.enum(['Junior', 'Mid-level', 'Senior', 'Lead/Principal']),
    title: z.string(),
    question: z.string(),
    estimatedTime: z.string(),
    tags: z.array(z.string()),

    codeSnippet: z.string().optional(),
    inputOutputExamples: z.array(z.object({
        input: z.string(),
        output: z.string(),
        explanation: z.string().optional()
    })).optional(),
    constraints: z.array(z.string()).optional(),

    solution: z.object({
        approach: z.string(),
        code: z.string().optional(),
        complexity: z.string().optional(),
        alternatives: z.array(z.string()).optional(),
        diagramDescription: z.string().optional(),
    }),

    hints: z.array(z.string()),
    evaluationCriteria: z.array(z.string()),
    commonPitfalls: z.array(z.string()).optional(),
  }))
});

export const ToolSearchSchema = z.object({
  relevantToolIds: z.array(z.string()),
  suggestedCategories: z.array(z.string()),
  reasoning: z.string(),
});

export const CareerPathSchema = z.object({
  jobAnalysis: z.object({
    role: z.string(),
    company: z.string().optional(),
    requiredSkills: z.array(z.object({
      name: z.string(),
      category: z.string(),
      level: z.enum(['Junior', 'Mid', 'Senior', 'Lead']),
      priority: z.enum(['Must Have', 'Nice to Have']),
    })),
    domainKnowledge: z.array(z.string()),
    roleType: z.string(),
  }),
  skillGapAnalysis: z.object({
    summary: z.string(),
    matchPercentage: z.number(),
    strengths: z.array(z.string()),
    gaps: z.array(z.object({
      skill: z.string(),
      currentLevel: z.string(),
      requiredLevel: z.string(),
      gapType: z.enum(['Missing', 'Weak', 'Adequate', 'Strong']),
      priority: z.enum(['High', 'Medium', 'Low']),
    })),
  }),
  learningRoadmap: z.object({
    totalDurationWeeks: z.number(),
    phases: z.array(z.object({
      name: z.string(),
      weeks: z.string(),
      description: z.string(),
    })),
    weeks: z.array(z.object({
      weekNumber: z.number(),
      theme: z.string(),
      objectives: z.array(z.string()),
      timeCommitment: z.string(),
      topics: z.array(z.string()),
      resources: z.array(z.object({
        title: z.string(),
        type: z.enum(['Course', 'Article', 'Video', 'Book', 'Documentation', 'Interactive']),
        url: z.string().optional(),
        isPaid: z.boolean(),
        description: z.string(),
      })),
      practiceExercises: z.array(z.string()),
      milestone: z.string(),
    })),
  }),
  portfolioProjects: z.array(z.object({
    title: z.string(),
    description: z.string(),
    skillsDemonstrated: z.array(z.string()),
    coreFeatures: z.array(z.string()),
    advancedFeatures: z.array(z.string()),
    techStack: z.array(z.string()),
    estimatedTime: z.string(),
    difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
    successCriteria: z.array(z.string()),
  })),
});

export const CacheStrategySchema = z.object({
  applicationAnalysis: z.object({
    type: z.string(),
    scale: z.string(),
    readWriteRatio: z.string(),
    dataFreshness: z.string(),
    architecture: z.string(),
  }),
  accessPatterns: z.array(z.object({
    pattern: z.string(),
    frequency: z.string(),
    mutationRate: z.string(),
    recommendation: z.string(),
  })),
  cacheStrategy: z.object({
    layers: z.array(z.object({
      layer: z.string(),
      purpose: z.string(),
      technology: z.string(),
      configuration: z.record(z.union([z.string(), z.number(), z.boolean()])).optional(),
      whatToCache: z.array(z.string()),
      estimatedHitRate: z.string(),
      latencyImprovement: z.string(),
      costSavings: z.string().optional(),
      sizingRecommendation: z.string().optional(),
    })),
  }),
  invalidationStrategy: z.object({
    approaches: z.array(z.object({
      dataType: z.string(),
      strategy: z.string(),
      ttl: z.string(),
      reasoning: z.string(),
      trigger: z.string().optional(),
    })),
    cacheStampedePrevention: z.object({
      method: z.string(),
      implementation: z.string(),
    }).optional(),
  }),
  implementation: z.record(z.object({
    code: z.string(),
    language: z.string(),
  })),
  performanceEstimates: z.object({
    overall: z.object({
      currentLatencyP95: z.string(),
      optimizedLatencyP95: z.string(),
      improvement: z.string(),
    }),
    databaseLoadReduction: z.string(),
    costSavings: z.string(),
    hitRates: z.record(z.string()),
  }),
  monitoring: z.object({
    metricsToTrack: z.array(z.string()),
    alertingRules: z.array(z.object({
      metric: z.string(),
      threshold: z.string(),
      action: z.string(),
    })),
    dashboardConfig: z.string().optional(),
  }),
  optimizationSteps: z.array(z.string()),
  bestPractices: z.array(z.string()),
});

export const GraphQLDesignerSchema = z.object({
  apiAnalysis: z.object({
    totalEndpoints: z.number(),
    entitiesDetected: z.number(),
    relationshipsFound: z.number(),
    confidence: z.enum(['High', 'Medium', 'Low']),
    endpoints: z.array(z.object({
      method: z.string(),
      path: z.string(),
      params: z.array(z.string()),
      response: z.object({
        type: z.string(),
        sample: z.record(z.any()).optional(),
      }).optional(),
      authentication: z.string().optional(),
    })),
  }),
  relationships: z.array(z.object({
    type: z.string(),
    from: z.string(),
    to: z.string(),
    via: z.string(),
    confidence: z.number(),
    evidence: z.array(z.string()),
  })),
  graphqlSchema: z.object({
    types: z.string(),
    queries: z.string(),
    mutations: z.string(),
    inputs: z.string(),
    enums: z.string(),
    customScalars: z.array(z.string()),
  }),
  resolvers: z.object({
    queries: z.record(z.object({
      code: z.string(),
      restEndpoint: z.string(),
      description: z.string(),
    })),
    mutations: z.record(z.object({
      code: z.string(),
      restEndpoint: z.string(),
      description: z.string(),
    })).optional(),
    fieldResolvers: z.record(z.object({
      code: z.string(),
      optimization: z.string(),
      restEndpoint: z.string(),
    })).optional(),
  }),
  dataLoaders: z.record(z.object({
    batchFunction: z.string(),
    purpose: z.string(),
    restEndpoint: z.string(),
  })),
  clientQueries: z.object({
    examples: z.array(z.object({
      name: z.string(),
      query: z.string(),
      variables: z.record(z.any()),
      description: z.string(),
      equivalentREST: z.string(),
    })),
    fragments: z.array(z.string()),
  }),
  migrationGuide: z.object({
    complexity: z.string(),
    estimatedEffort: z.string(),
    phases: z.array(z.object({
      phase: z.number(),
      name: z.string(),
      duration: z.string(),
      tasks: z.array(z.string()),
    })),
    codeExamples: z.object({
      restToGraphQL: z.object({
        before: z.string(),
        after: z.string(),
      }),
    }),
  }),
  optimizations: z.object({
    dataLoader: z.string(),
    queryCost: z.string(),
    caching: z.string(),
    monitoring: z.string(),
  }),
  comparison: z.object({
    benefits: z.array(z.string()),
    tradeoffs: z.array(z.string()),
    metrics: z.object({
      apiCallReduction: z.string(),
      payloadSizeReduction: z.string(),
      developmentSpeedIncrease: z.string(),
    }),
  }),
  implementation: z.object({
    serverSetup: z.object({
      language: z.string(),
      framework: z.string(),
      code: z.string(),
    }),
    clientSetup: z.object({
      framework: z.string(),
      code: z.string(),
    }),
  }),
});

export const NLPPipelineSchema = z.object({
  taskAnalysis: z.object({
    taskType: z.string(),
    taskCategory: z.string(),
    complexity: z.string(),
    typicalAccuracy: z.string(),
    commonChallenges: z.array(z.string()),
  }),
  datasetRequirements: z.object({
    minimumSamples: z.number(),
    recommendedSamples: z.number(),
    labelingGuidelines: z.string(),
    dataQualityChecks: z.array(z.string()),
  }),
  pipeline: z.object({
    stages: z.array(
      z.object({
        stage: z.number(),
        name: z.string(),
        description: z.string(),
        steps: z.array(z.string()).optional(),
        tokenizer: z.string().optional(),
        maxLength: z.number().optional(),
        truncation: z.string().optional(),
        models: z.array(z.any()).optional(),
        strategy: z.string().optional(),
        hyperparameters: z.record(z.any()).optional(),
        metrics: z.array(z.string()).optional(),
        recommendedApproach: z.string().optional(),
        code: z.string().optional(),
      })
    ),
  }),
  modelRecommendations: z.array(
    z.object({
      rank: z.number(),
      name: z.string(),
      size: z.string(),
      huggingfaceId: z.string(),
      category: z.string(),
      expectedAccuracy: z.string(),
      trainingTime: z.string(),
      inferenceLatency: z.string(),
      memoryRequired: z.string(),
      pros: z.array(z.string()),
      cons: z.array(z.string()),
      whenToUse: z.string(),
      code: z.string(),
    })
  ),
  fineTuningConfig: z.object({
    strategy: z.string(),
    epochs: z.number(),
    batchSize: z.number(),
    learningRate: z.number(),
    warmupSteps: z.number(),
    weightDecay: z.number(),
    optimizer: z.string(),
    scheduler: z.string(),
    gradientAccumulation: z.number(),
    mixedPrecision: z.boolean(),
    earlyStopping: z.object({
      patience: z.number(),
      metric: z.string(),
    }),
    reasoning: z.string(),
  }),
  preprocessingCode: z.object({
    language: z.string(),
    code: z.string(),
  }),
  trainingCode: z.object({
    language: z.string(),
    framework: z.string(),
    code: z.string(),
  }),
  evaluationCode: z.object({
    language: z.string(),
    code: z.string(),
  }),
  deploymentStrategy: z.object({
    recommended: z.string(),
    alternatives: z.array(z.string()),
    optimization: z.object({
      quantization: z.string(),
      batchInference: z.string(),
      caching: z.string(),
    }),
    scalability: z.object({
      expectedQPS: z.string(),
      autoScaling: z.string(),
      loadBalancing: z.string(),
    }),
    apiCode: z.string(),
  }),
  resourceEstimates: z.object({
    training: z.object({
      gpuRequired: z.string(),
      trainingTime: z.string(),
      cpuAlternative: z.string(),
      colab: z.string(),
      cost: z.string(),
    }),
    inference: z.object({
      latency: z.record(z.string()),
      throughput: z.string(),
      memory: z.string(),
    }),
  }),
  bestPractices: z.array(z.string()),
  commonPitfalls: z.array(z.string()),
  furtherImprovements: z.array(z.string()),
});

export const LossFunctionDesignerSchema = z.object({
  problemAnalysis: z.object({
    taskType: z.string(),
    domain: z.string(),
    keyCharacteristics: z.array(z.string()),
    datasetSize: z.string(),
    imbalanceRatio: z.string(),
    businessObjective: z.string(),
  }),
  lossDesign: z.object({
    name: z.string(),
    category: z.string(),
    components: z.array(
      z.object({
        name: z.string(),
        purpose: z.string(),
        weight: z.number(),
        equation: z.string(),
        parameters: z.record(z.union([z.number(), z.string(), z.any()])).optional(),
      })
    ),
    finalEquation: z.string(),
    latexEquation: z.string(),
  }),
  implementation: z.object({
    pytorch: z.object({
      code: z.string(),
      usage: z.string(),
    }),
    tensorflow: z.object({
      code: z.string(),
      usage: z.string(),
    }),
    jax: z.object({
      code: z.string(),
    }),
  }),
  mathematicalBreakdown: z.object({
    components: z.array(
      z.object({
        component: z.string(),
        explanation: z.string(),
        gradientBehavior: z.string(),
        parameters: z.record(
          z.object({
            value: z.number(),
            meaning: z.string(),
            tuningRange: z.string(),
          })
        ).optional(),
      })
    ),
    combinationRationale: z.string(),
  }),
  comparison: z.object({
    withStandardLosses: z.array(
      z.object({
        lossName: z.string(),
        performance: z.string(),
        whenBetter: z.string(),
        expectedGap: z.string(),
      })
    ),
    comparisonTable: z.object({
      headers: z.array(z.string()),
      rows: z.array(z.array(z.string())),
    }),
  }),
  visualization: z.object({
    lossLandscape: z.object({
      description: z.string(),
      xAxis: z.string(),
      yAxis: z.string(),
      curves: z.array(
        z.object({
          name: z.string(),
          behavior: z.string(),
        })
      ),
    }),
    componentContribution: z.object({
      chartType: z.string(),
      data: z.array(
        z.object({
          component: z.string(),
          percentage: z.number(),
        })
      ),
    }),
  }),
  usageGuidance: z.object({
    whenToUse: z.array(z.string()),
    whenNotToUse: z.array(z.string()),
    implementationSteps: z.array(z.string()),
    hyperparameterTuning: z.object({
      priority: z.array(
        z.object({
          parameter: z.string(),
          importance: z.string(),
          tuningStrategy: z.string(),
          expectedImpact: z.string(),
        })
      ),
      tuningWorkflow: z.string(),
    }),
    commonIssues: z.array(
      z.object({
        issue: z.string(),
        causes: z.array(z.string()),
        solutions: z.array(z.string()),
      })
    ),
    monitoring: z.object({
      duringTraining: z.array(z.string()),
      postTraining: z.array(z.string()),
    }),
  }),
  multiTaskWeighting: z.object({
    weightRecommendations: z.array(z.any()).optional(),
    strategies: z.array(z.any()).optional(),
    scheduler: z.any().optional()
  }).nullable().optional(),
  expectedBehavior: z.object({
    trainingDynamics: z.object({
      convergence: z.string(),
      stability: z.string(),
      finalLossValue: z.string(),
      epochs: z.string(),
    }),
    modelBehavior: z.object({
      predictions: z.string(),
      confidenceScores: z.string(),
      decisionBoundary: z.string(),
      calibration: z.string(),
    }),
    performanceExpectations: z.object({
      recallImprovement: z.string(),
      precisionChange: z.string(),
      f1Change: z.string(),
      aucRoc: z.string(),
      businessMetric: z.string(),
    }),
    failureModes: z.array(
      z.object({
        mode: z.string(),
        detection: z.string(),
        mitigation: z.string(),
      })
    ),
  }),
  codeExamples: z.object({
    training: z.string(),
    validation: z.string(),
  }),
  references: z.array(z.string()),
});

export const GatlingScriptSchema = z.object({
  scriptMetadata: z.object({
    simulationName: z.string(),
    testType: z.string(),
    targetUsers: z.number(),
    duration: z.string(),
    rampUpTime: z.string(),
    scenarios: z.array(z.string()),
  }),
  generatedScript: z.object({
    language: z.string(),
    gatlingVersion: z.string(),
    fullCode: z.string(),
    sections: z.object({
      imports: z.string(),
      protocol: z.string(),
      feeders: z.string(),
      scenarios: z.record(z.string()),
      simulation: z.string(),
    }),
  }),
  testConfiguration: z.record(z.object({
    users: z.number(),
    rampUp: z.string().optional(),
    duration: z.string(),
  })),
  prerequisites: z.array(z.string()),
  recommendations: z.array(z.string()),
});

export const GatlingReportAnalysisSchema = z.object({
  reportSummary: z.object({
    testName: z.string(),
    testDate: z.string(),
    duration: z.string(),
    totalRequests: z.number(),
    failedRequests: z.number(),
    successRate: z.string(),
    peakConcurrentUsers: z.number(),
    peakThroughput: z.string(),
  }),
  performanceMetrics: z.object({
    responseTime: z.object({
      mean: z.number(),
      min: z.number(),
      max: z.number(),
      p50: z.number(),
      p75: z.number(),
      p95: z.number(),
      p99: z.number(),
      stdDev: z.number(),
    }),
    throughput: z.object({
      mean: z.number(),
      peak: z.number(),
      sustained: z.number(),
    }),
  }),
  bottlenecks: z.array(
    z.object({
      severity: z.enum(['Critical', 'High', 'Medium', 'Low']),
      affectedEndpoint: z.string(),
      description: z.string(),
      evidence: z.string(),
      suggestedInvestigation: z.string(),
    })
  ),
  optimizationSuggestions: z.array(
    z.object({
      priority: z.number(),
      category: z.enum(['Application', 'Infrastructure', 'Database', 'Network']),
      title: z.string(),
      description: z.string(),
      expectedImpact: z.string(),
      complexity: z.string(),
      implementationSteps: z.array(z.string()),
    })
  ),
  capacityPlanning: z.object({
    currentCapacityEstimate: z.string(),
    scalingRecommendations: z.array(z.string()),
    costEstimation: z.string(),
    infrastructureSuggestions: z.array(z.string()),
    scalingStrategy: z.string(),
    }),
    });
export const LighthouseAnalysisSchema = z.object({
  reportSummary: z.object({
    url: z.string(),
    analysisDate: z.string(),
    overallHealthScore: z.number(),
    scores: z.object({
      performance: z.number(),
      accessibility: z.number(),
      bestPractices: z.number(),
      seo: z.number(),
    }),
    deviceType: z.string(),
    criticalIssuesCount: z.number(),
    totalRecommendations: z.number(),
    estimatedImprovementPotential: z.string(),
  }),
  categoryAnalysis: z.object({
    performance: z.object({
      score: z.number(),
      grade: z.string(),
      topIssues: z.array(z.string()),
      quickWins: z.array(z.string()),
      strategicFixes: z.array(z.string()),
    }),
    accessibility: z.object({
      score: z.number(),
      grade: z.string(),
      topIssues: z.array(z.string()),
      quickWins: z.array(z.string()),
      strategicFixes: z.array(z.string()),
    }),
    bestPractices: z.object({
      score: z.number(),
      grade: z.string(),
      topIssues: z.array(z.string()),
      quickWins: z.array(z.string()),
      strategicFixes: z.array(z.string()),
    }),
    seo: z.object({
      score: z.number(),
      grade: z.string(),
      topIssues: z.array(z.string()),
      quickWins: z.array(z.string()),
      strategicFixes: z.array(z.string()),
    }),
  }),
  prioritizedRecommendations: z.array(
    z.object({
      id: z.string(),
      priority: z.number(),
      category: z.string(),
      title: z.string(),
      severity: z.enum(['Critical', 'High', 'Medium', 'Low']),
      businessImpact: z.number(),
      implementationEffort: z.number(),
      estimatedScoreImprovement: z.number(),
      priorityScore: z.number(),
      problem: z.string(),
      whyItMatters: z.string(),
      rootCause: z.string(),
      solution: z.string(),
      implementationSteps: z.array(z.string()),
      beforeAfter: z.object({
        before: z.string(),
        after: z.string(),
      }),
      estimatedTime: z.string(),
      verification: z.string(),
      relatedIssues: z.array(z.string()),
      tags: z.array(z.string()),
    })
  ),
  quickWins: z.array(z.string()),
  strategicFixes: z.array(z.string()),
  nextjsSpecific: z.object({
    renderingStrategy: z.string(),
    imageOptimization: z.string(),
    fontOptimization: z.string(),
    codeSplitting: z.string(),
    serverComponents: z.string(),
    recommendations: z.array(z.string()),
  }),
  impactEstimation: z.object({
    afterAllFixes: z.object({
      performance: z.object({ current: z.number(), estimated: z.number(), confidence: z.string() }),
      accessibility: z.object({ current: z.number(), estimated: z.number(), confidence: z.string() }),
      bestPractices: z.object({ current: z.number(), estimated: z.number(), confidence: z.string() }),
      seo: z.object({ current: z.number(), estimated: z.number(), confidence: z.string() }),
    }),
    businessImpact: z.object({
      pageLoadImprovement: z.string(),
      estimatedConversionLift: z.string(),
      bounceRateReduction: z.string(),
      seoRankingPotential: z.string(),
    }),
    resourceRequirements: z.object({
      totalDevelopmentHours: z.string(),
      skillsNeeded: z.array(z.string()),
      estimatedCost: z.string(),
    }),
  }),
  comparisonBaseline: z.object({
    industryAverage: z.object({
      performance: z.number(),
      accessibility: z.number(),
      bestPractices: z.number(),
      seo: z.number(),
    }),
    topPerformers: z.object({
      performance: z.number(),
      accessibility: z.number(),
      bestPractices: z.number(),
      seo: z.number(),
    }),
    yourPosition: z.string(),
  }),
  securityHighlights: z.object({
    criticalVulnerabilities: z.array(z.string()),
    missingHeaders: z.array(z.string()),
    recommendations: z.array(z.string()),
  }),
  accessibilityComplianceReport: z.object({
    wcagLevel: z.string(),
    failingCriteria: z.array(z.string()),
    recommendations: z.array(z.string()),
  }),
});

export const PDFCropSchema = z.object({
  analysis: z.object({
    pageCount: z.number().optional(),
    documentType: z.enum(['Scanned Document', 'Digital Document', 'Form', 'Book', 'Receipt', 'ID Card', 'Other']),
    detectedIssues: z.array(z.string()),
    recommendation: z.string(),
  }),
  cropSuggestions: z.array(z.object({
    pageNumber: z.number(),
    currentSize: z.object({
      width: z.number(),
      height: z.number(),
      unit: z.string(),
    }),
    contentBounds: z.object({
      left: z.number(),
      top: z.number(),
      right: z.number(),
      bottom: z.number(),
    }),
    suggestedCrop: z.object({
      left: z.number(),
      top: z.number(),
      right: z.number(),
      bottom: z.number(),
      unit: z.string(),
    }),
    croppedSize: z.object({
      width: z.number(),
      height: z.number(),
      unit: z.string(),
    }),
    confidence: z.number(),
    reasoning: z.string(),
  })),
  batchCropRecommendation: z.object({
    applyToAllPages: z.boolean(),
    uniformCrop: z.object({
      left: z.number(),
      top: z.number(),
      right: z.number(),
      bottom: z.number(),
    }).optional(),
    estimatedSizeReduction: z.string().optional(),
  }).optional(),
});

export const PDFEditorSchema = z.object({
  improvedText: z.string(),
  explanation: z.string(),
  improvements: z.array(z.string()),
});

export const AIDetectorSchema = z.object({
  overallScore: z.object({
    aiProbability: z.number().min(0).max(100),
    confidence: z.enum(['Low', 'Medium', 'High', 'Very High']),
    verdict: z.string(),
    confidenceRange: z.string(),
    reasoning: z.string(),
  }),
  breakdown: z.object({
    aiIndicators: z.number(),
    humanIndicators: z.number(),
    neutralIndicators: z.number(),
    perplexityScore: z.number(),
    burstinessScore: z.number(),
    vocabularyDiversity: z.number(),
  }),
  sentenceAnalysis: z.array(
    z.object({
      sentenceNumber: z.number(),
      text: z.string(),
      aiProbability: z.number().min(0).max(100),
      confidence: z.enum(['Low', 'Medium', 'High', 'Very High']),
      markers: z.array(z.string()),
      humanMarkers: z.array(z.string()),
      reasoning: z.string(),
    })
  ),
  detectedPatterns: z.array(
    z.object({
      pattern: z.string(),
      occurrences: z.union([z.number(), z.string()]),
      examples: z.array(z.string()),
      severity: z.enum(['Low', 'Moderate', 'High']),
      aiIndicator: z.boolean(),
    })
  ),
  aiSignatures: z.object({
    chatgpt: z.object({
      likelihood: z.number(),
      markers: z.array(z.string()),
    }),
    gemini: z.object({
      likelihood: z.number(),
      markers: z.array(z.string()),
    }),
    claude: z.object({
      likelihood: z.number(),
      markers: z.array(z.string()),
    }),
    mostLikely: z.string(),
  }),
  writingStyle: z.object({
    tone: z.string(),
    complexity: z.string(),
    sentenceLengthAvg: z.number(),
    sentenceLengthVariance: z.number(),
    vocabularyLevel: z.string(),
    readabilityScore: z.number(),
    emotionalTone: z.string(),
  }),
  suspiciousSections: z.array(
    z.object({
      startIndex: z.number(),
      endIndex: z.number(),
      text: z.string(),
      aiProbability: z.number(),
      reason: z.string(),
    })
  ),
  recommendations: z.array(z.string()),
  alternativeExplanations: z.array(z.string()),
  });
// AI Hiring Assistant Schemas

export const JobDescriptionAnalysisSchema = z.object({
  jobTitle: z.string(),
  level: z.string(),
  mustHaveSkills: z.array(z.string()),
  niceToHaveSkills: z.array(z.string()),
  education: z.string(),
  yearsExperience: z.string(),
  domain: z.string(),
  softSkills: z.array(z.string()),
  dealBreakers: z.array(z.string()),
  summary: z.string().optional(),
});

export const ResumeParsingSchema = z.object({
  name: z.string(),
  contact: z.object({
    email: z.string(),
    phone: z.string(),
    location: z.string(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    portfolio: z.string().optional(),
  }),
  summary: z.string(),
  experience: z.array(
    z.object({
      company: z.string(),
      role: z.string(),
      startDate: z.string(),
      endDate: z.string(),
      duration: z.string(),
      description: z.string(),
      achievements: z.array(z.string()),
      technologies: z.array(z.string()),
    })
  ),
  education: z.array(
    z.object({
      degree: z.string(),
      institution: z.string(),
      graduationYear: z.string(), // changed to string to accommodate 'Present' or fuzzy dates
      gpa: z.number().optional(),
    })
  ),
  skills: z.object({
    technical: z.array(z.string()),
    tools: z.array(z.string()),
    soft: z.array(z.string()),
    languages: z.array(z.string()),
  }),
  totalExperience: z.string(),
  certifications: z.array(z.string()).optional(),
  projects: z.array(z.object({
    name: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    link: z.string().optional(),
  })).optional(),
});

export const CandidateScoringSchema = z.object({
  overallScore: z.number(),
  matchLevel: z.enum(['Excellent Match', 'Strong Match', 'Good Match', 'Fair Match', 'Weak Match']),
  scoreBreakdown: z.object({
    skills: z.object({
      score: z.number(),
      weight: z.number(),
      contribution: z.number(),
      details: z.object({
        mustHavesCovered: z.number(),
        mustHavesTotal: z.number(),
        coveragePercent: z.number(),
        niceToHavesCovered: z.number(),
        niceToHavesTotal: z.number(),
        missingCritical: z.array(z.string()),
        strengths: z.array(z.string()),
      }),
    }),
    experience: z.object({
      score: z.number(),
      weight: z.number(),
      contribution: z.number(),
      details: z.object({
        yearsRequired: z.number().optional(),
        yearsCandidate: z.number().optional(),
        levelMatch: z.string(),
        relevantExperience: z.string(),
      }),
    }),
    education: z.object({
      score: z.number(),
      weight: z.number(),
      contribution: z.number(),
      details: z.object({
        degreeMatch: z.string(),
        certifications: z.array(z.string()),
      }),
    }),
    softSkills: z.object({
      score: z.number(),
      weight: z.number(),
      contribution: z.number(),
      details: z.object({
        leadership: z.string(),
        communication: z.string(),
        problemSolving: z.string(),
      }),
    }),
    adjustments: z.object({
      score: z.number(),
      weight: z.number(),
      contribution: z.number(),
      bonuses: z.array(z.string()),
      penalties: z.array(z.string()),
    }),
  }),
  recommendation: z.string(),
  interviewFocus: z.array(z.string()),
});

export const RedFlagAnalysisSchema = z.object({
  redFlags: z.array(
    z.object({
      flag: z.string(),
      severity: z.enum(['High', 'Medium', 'Low']),
      description: z.string(),
      recommendation: z.string(),
      canBeExplained: z.boolean(),
      possibleReasons: z.array(z.string()),
      explanation: z.string().optional(),
    })
  ),
  greenFlags: z.array(z.string()),
});

export const InterviewQuestionGenerationSchema = z.object({
  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      purpose: z.string(),
      difficulty: z.enum(['Easy', 'Medium', 'Hard']),
      expectedAnswer: z.string(),
      followUps: z.array(z.string()),
    })
  ),
  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      purpose: z.string(),
      difficulty: z.enum(['Easy', 'Medium', 'Hard']),
      lookFor: z.string(),
    })
  ),
  startupSpecificQuestions: z.array(
    z.object({
      question: z.string(),
      purpose: z.string(),
      difficulty: z.enum(['Easy', 'Medium', 'Hard']),
      lookFor: z.string(),
    })
  ),
  cultureQuestions: z.array(
    z.object({
      question: z.string(),
      purpose: z.string(),
      difficulty: z.enum(['Easy', 'Medium', 'Hard']),
      lookFor: z.string(),
    })
  ),
});

// Research Manager Schemas

export const ResearchPaperSchema = z.object({
  metadata: z.object({
    title: z.string(),
    authors: z.array(z.object({
      name: z.string(),
      affiliation: z.string().optional(),
      email: z.string().optional(),
    })),
    year: z.union([z.string(), z.number()]),
    journal: z.string().optional(),
    volume: z.union([z.string(), z.number()]).optional(),
    issue: z.union([z.string(), z.number()]).optional(),
    pages: z.string().optional(),
    doi: z.string().optional(),
    isbn: z.string().optional(),
    issn: z.string().optional(),
    publisher: z.string().optional(),
    abstract: z.string(),
    keywords: z.array(z.string()),
    citationCount: z.number().optional(),
    pdfPages: z.number().optional(),
  }),
  aiAnalysis: z.object({
    executiveSummary: z.string(),
    detailedSummary: z.string(),
    keyFindings: z.array(z.string()),
    methodology: z.string(),
    results: z.string(),
    conclusions: z.string(),
    limitations: z.array(z.string()),
    futureWork: z.array(z.string()),
    contributions: z.array(z.string()),
  }),
  sectionAnalysis: z.object({
    introduction: z.string(),
    literatureReview: z.string(),
    methodology: z.string(),
    results: z.string(),
    discussion: z.string(),
    conclusion: z.string(),
  }).optional(),
  citations: z.object({
    apa: z.string(),
    mla: z.string(),
    chicago: z.string(),
    harvard: z.string(),
    ieee: z.string(),
    inText: z.object({
      apa: z.string(),
      mla: z.string(),
      chicago: z.string(),
    }),
  }),
  relatedPapers: z.array(z.object({
    title: z.string(),
    authors: z.array(z.string()),
    year: z.union([z.string(), z.number()]),
    relevanceScore: z.number(),
    reason: z.string(),
  })),
  researchGaps: z.array(z.object({
    gapType: z.string(),
    description: z.string(),
    severity: z.string(),
    opportunities: z.array(z.string()),
  })),
});

export const ResearchGapSchema = z.object({
  researchGaps: z.array(z.object({
    gapType: z.enum(['Methodological', 'Temporal', 'Geographical', 'Theoretical', 'Sample', 'Other']),
    description: z.string(),
    severity: z.enum(['High', 'Medium', 'Low']),
    opportunities: z.array(z.string()),
    relatedPapers: z.array(z.string()),
  })),
  recommendations: z.array(z.string()),
  visualMapData: z.array(z.object({
    area: z.string(),
    intensity: z.number(),
    gapSize: z.number(),
  })).optional(),
});

export const LiteratureReviewSchema = z.object({
  title: z.string(),
  introduction: z.string(),
  themes: z.array(z.object({
    name: z.string(),
    synthesis: z.string(),
    keyCitations: z.array(z.string()),
  })),
  gapAnalysis: z.string(),
  conclusion: z.string(),
  bibliography: z.array(z.string()),
});

export const CourseOutlinerSchema = z.object({
  title: z.string(),
  description: z.string(),
  modules: z.array(z.object({
    title: z.string(),
    duration: z.string(),
    lessons: z.array(z.object({
      title: z.string(),
      duration: z.string(),
      objectives: z.array(z.string()),
      topics: z.array(z.string()),
    })),
  })),
  quizzes: z.array(z.object({
    moduleTitle: z.string(),
    questions: z.array(z.object({
      question: z.string(),
      options: z.array(z.string()),
      correctAnswer: z.string(),
      explanation: z.string(),
    })),
  })),
  codingExercises: z.array(z.object({
    moduleTitle: z.string(),
    title: z.string(),
    description: z.string(),
    starterCode: z.string(),
    solution: z.string(),
    hints: z.array(z.string()),
  })),
  seoMetadata: z.object({
    title: z.string(),
    description: z.string(),
    keywords: z.array(z.string()),
  }),
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })),
  scormMetadata: z.object({
    manifestTitle: z.string(),
    identifier: z.string(),
    version: z.string(),
    scormType: z.enum(['sco', 'asset']),
  })
});
