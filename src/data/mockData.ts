import { 
  StudentProfile, 
  DiagnosticQuestion, 
  SkillGapItem, 
  RoadmapItem, 
  ShadowProblem, 
  ProblemCapsule, 
  EmployerCommitment, 
  ChallengeLedgerEvent, 
  CapabilityPassportData, 
  CurriculumMapItem,
  JobApplication,
  Team,
  AppNotification,
  DefenseSubmission
} from '../types';

export const INITIAL_STUDENTS: StudentProfile[] = [
  {
    id: 'stu_1',
    name: 'Rahul Kumar',
    email: 'rahul.kumar@inst.edu.in',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    targetRole: 'Data Analyst',
    readinessScore: 68,
    activeChallengeId: 'chal_1',
    diagnosticCompleted: true,
    lastDiagnosticDate: '2026-09-02',
    mentorAlertActive: true,
    mentorAlertDetails: {
      attemptCount: 3,
      misconception: 'Confusing event-driven streaming with batch SQL aggregation under sub-second latency constraints',
      gapName: 'Real-time Stream Processing & Indexing',
      suggestedAction: 'Complete the Kafka & Windowed Aggregation Practice Task before re-attemping Shadow Problem'
    },
    capabilities: [
      { stage: 'Syntax', percentage: 95, evidenceCount: 14, weaknesses: ['Minor syntax hiccups in raw memory pointers'] },
      { stage: 'Data Structures', percentage: 84, evidenceCount: 11, weaknesses: ['Graph traversal time complexity optimization'] },
      { stage: 'Debugging', percentage: 72, evidenceCount: 8, weaknesses: ['Concurrency race conditions under high thread loads'] },
      { stage: 'Algorithms', percentage: 65, evidenceCount: 6, weaknesses: ['Dynamic programming state space reduction'] },
      { stage: 'Code Design', percentage: 58, evidenceCount: 4, weaknesses: ['Decoupling database persistence from business logic'] },
      { stage: 'Industry Practice', percentage: 48, evidenceCount: 3, weaknesses: ['Production telemetry logging and distributed tracing'] }
    ]
  },
  {
    id: 'stu_2',
    name: 'Priya Sharma',
    email: 'priya.sharma@inst.edu.in',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    targetRole: 'Software Developer',
    readinessScore: 82,
    activeChallengeId: 'chal_2',
    diagnosticCompleted: true,
    lastDiagnosticDate: '2026-09-05',
    mentorAlertActive: false,
    capabilities: [
      { stage: 'Syntax', percentage: 98, evidenceCount: 18, weaknesses: [] },
      { stage: 'Data Structures', percentage: 92, evidenceCount: 15, weaknesses: ['Custom Trie implementation edge cases'] },
      { stage: 'Debugging', percentage: 88, evidenceCount: 12, weaknesses: ['Memory leak identification in long-running Node workers'] },
      { stage: 'Algorithms', percentage: 80, evidenceCount: 10, weaknesses: ['NP-hard approximation algorithms'] },
      { stage: 'Code Design', percentage: 76, evidenceCount: 7, weaknesses: ['Microservices saga pattern implementation'] },
      { stage: 'Industry Practice', percentage: 70, evidenceCount: 5, weaknesses: ['CI/CD deployment script failure recovery'] }
    ]
  },
  {
    id: 'stu_3',
    name: 'Arjun Patel',
    email: 'arjun.patel@inst.edu.in',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    targetRole: 'AI/ML Intern',
    readinessScore: 54,
    activeChallengeId: 'chal_3',
    diagnosticCompleted: false,
    mentorAlertActive: false,
    capabilities: [
      { stage: 'Syntax', percentage: 80, evidenceCount: 6, weaknesses: ['Vectorized operations vs Python loops'] },
      { stage: 'Data Structures', percentage: 65, evidenceCount: 4, weaknesses: ['Efficient multidimensional array manipulation'] },
      { stage: 'Debugging', percentage: 50, evidenceCount: 2, weaknesses: ['Gradient vanishing / exploding tensor debugging'] },
      { stage: 'Algorithms', percentage: 55, evidenceCount: 3, weaknesses: ['Mathematical proof of optimization convergence'] },
      { stage: 'Code Design', percentage: 40, evidenceCount: 1, weaknesses: ['ML model API containerization and serving'] },
      { stage: 'Industry Practice', percentage: 32, evidenceCount: 1, weaknesses: ['Model drift monitoring and automated retraining'] }
    ]
  }
];

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'dq_1',
    title: 'Python Memory & Reference Mechanics',
    category: 'Syntax',
    type: 'MCQ',
    question: 'What is the output of the following Python snippet, and what underlying memory principle dictates this result?',
    codeSnippet: `def append_to_list(val, target=[]):\n    target.append(val)\n    return target\n\nprint(append_to_list(1))\nprint(append_to_list(2))`,
    options: [
      '[1] and [2] — Default arguments are evaluated afresh on every function call',
      '[1] and [1, 2] — Mutable default arguments are evaluated once at function definition time',
      'AttributeError — target list is immutable when defined in signature',
      '[1, 2] and [1, 2] — Functions share global scope by default'
    ],
    correctAnswer: 1,
    explanation: 'In Python, default parameter expressions are evaluated when the function definition is executed, creating a single mutable object that persists across calls unless explicitly reassigned.',
    capabilityImpact: 'Syntax'
  },
  {
    id: 'dq_2',
    title: 'Binary Search Boundary Indexing Debugging',
    category: 'Debugging',
    type: 'DEBUGGING',
    question: 'Identify the subtle bug in this modified binary search implementation designed for duplicate values:',
    codeSnippet: `def find_first_occurrence(arr, target):\n    low, high = 0, len(arr)\n    while low < high:\n        mid = (low + high) // 2\n        if arr[mid] >= target:\n            high = mid\n        else:\n            low = mid\n    return low if arr[low] == target else -1`,
    options: [
      'Infinite loop when low = mid without incrementing (should be low = mid + 1)',
      'IndexError on high = len(arr) during array indexing',
      'Incorrect mid calculation leading to integer overflow',
      'The loop condition should be low <= high'
    ],
    correctAnswer: 0,
    explanation: 'When target is strictly greater than arr[mid], setting `low = mid` without adding 1 leads to an infinite loop when `high - low == 1` because integer division floors `mid` to `low`.',
    capabilityImpact: 'Debugging'
  },
  {
    id: 'dq_3',
    title: 'Real-Time Transaction Data Structure Selection',
    category: 'Data Structures',
    type: 'SCENARIO',
    question: 'You are designing a high-frequency financial fraud monitor that must track the last N transaction IDs in sliding time windows while checking existence in O(1) average time. Which composite data structure handles insertion, eviction, and membership check with minimal memory overhead?',
    options: [
      'Array combined with Linear Search for memory efficiency',
      'Doubly Linked List paired with a Hash Map (LRU Cache pattern)',
      'Binary Search Tree with parent pointers',
      'Min-Heap combined with a Stack'
    ],
    correctAnswer: 1,
    explanation: 'A Hash Map + Doubly Linked List enables O(1) insertion, O(1) eviction of the oldest element, and O(1) membership lookups for sliding window sliding bounds.',
    capabilityImpact: 'Data Structures'
  },
  {
    id: 'dq_4',
    title: 'Dynamic Programming vs Greedy Choice Trade-off',
    category: 'Algorithms',
    type: 'REASONING',
    question: 'When solving the 0/1 Knapsack Problem for high-volume cargo routing, why does a Greedy approach based on value-to-weight ratio fail to guarantee an optimal solution?',
    options: [
      'Greedy choices assume fractional items can be selected; taking full items leaves empty capacity that higher density items cannot fill efficiently',
      'Greedy approaches require logarithmic sorting time which exceeds polynomial bounds',
      'Greedy algorithms only work on tree structures, not linear arrays',
      'Dynamic programming always requires quadratic memory rendering greedy choices invalid'
    ],
    correctAnswer: 0,
    explanation: 'Because items cannot be divided (0/1 constraint), taking an item with high density may leave empty space that cannot fit subsequent items, whereas a lower density item might fill the remaining space perfectly for higher total value.',
    capabilityImpact: 'Algorithms'
  },
  {
    id: 'dq_5',
    title: 'Microservices Idempotency & Retry Strategy',
    category: 'Code Design',
    type: 'SCENARIO',
    question: 'In a distributed payment system, an API call times out mid-transaction. How should the client microservice handle retries to prevent double charging?',
    options: [
      'Immediately retry up to 5 times without delay',
      'Generate a unique Idempotency-Key header per transaction attempt and pass it in all retry payloads using exponential backoff with jitter',
      'Roll back the local database transaction and throw an uncaught exception',
      'Use asynchronous multithreading without awaiting server acknowledgments'
    ],
    correctAnswer: 1,
    explanation: 'Idempotency keys ensure the server processes the exact business request only once, even if network timeouts cause duplicate API requests.',
    capabilityImpact: 'Code Design'
  },
  {
    id: 'dq_6',
    title: 'SQL Window Functions & High-Performance Indexing',
    category: 'Industry Practice',
    type: 'MCQ',
    question: 'Which SQL construct allows computing a running total of customer purchases partitioned by region without flattening rows via GROUP BY?',
    codeSnippet: `SELECT customer_id, region, amount,\n  SUM(amount) OVER (PARTITION BY region ORDER BY created_at)\nFROM orders;`,
    options: [
      'Aggregate GROUP BY with HAVING clause',
      'Window Function using OVER (PARTITION BY ... ORDER BY ...)',
      'Recursive CTE with CROSS JOIN',
      'Correlated Subquery in WHERE clause'
    ],
    correctAnswer: 1,
    explanation: 'SQL Window functions perform aggregate calculations across a set of table rows related to the current row without grouping them into a single summary output.',
    capabilityImpact: 'Industry Practice'
  },
  {
    id: 'dq_7',
    title: 'React State Mutability & Memory Leak Prevention',
    category: 'Debugging',
    type: 'DEBUGGING',
    question: 'Why does the following React hook trigger memory leaks and stale state bugs in production dashboards?',
    codeSnippet: `useEffect(() => {\n  const socket = connectWebSocket();\n  socket.on('data', (payload) => {\n    setData(payload);\n  });\n}, []);`,
    options: [
      'Missing cleanup function `return () => socket.disconnect()` to unbind event listeners on component unmount',
      'WebSockets cannot be invoked inside `useEffect`',
      'Dependency array must contain `payload`',
      'State setter `setData` should be wrapped in `async/await`'
    ],
    correctAnswer: 0,
    explanation: 'Failing to return a cleanup function leaves active socket connections and listeners attached when the component unmounts, leading to memory leaks and calling state updates on unmounted nodes.',
    capabilityImpact: 'Debugging'
  },
  {
    id: 'dq_8',
    title: 'Defensive Programming & Input Sanitization',
    category: 'Code Design',
    type: 'REASONING',
    question: 'Why is client-side input validation insufficient to defend a system against SQL Injection attacks?',
    options: [
      'Client validation reduces network bandwidth but attacker tools bypass client UI JavaScript completely by sending raw HTTP calls directly to endpoints',
      'SQL databases do not parse characters sent over HTTP',
      'Client validation causes high browser CPU usage',
      'Server frameworks automatically block all payload parameters'
    ],
    correctAnswer: 0,
    explanation: 'Attackers can bypass browser JS validation effortlessly via tools like Postman, curl, or proxies. Server-side parameterized queries (prepared statements) are the essential defense layer.',
    capabilityImpact: 'Code Design'
  }
];

export const INITIAL_SKILL_GAPS: SkillGapItem[] = [
  {
    id: 'gap_1',
    industryRequirement: 'Real-Time Financial Event Deduplication & Windowed Aggregation',
    studentCapability: 'Basic SQL batch querying and static array filtering',
    gapPercentage: 42,
    academicSubject: 'CS402 Database Management Systems & Indexing',
    recommendedResource: {
      title: 'Apache Kafka & Distributed Stream Processing Architecture Guide',
      type: 'Doc',
      url: 'https://kafka.apache.org/documentation/'
    },
    practiceTask: 'Build an in-memory sliding window deduplication filter with 10,000 events/sec capacity.',
    portfolioProject: 'High-Throughput Financial Fraud Ingestion Microservice',
    readinessImpact: 18
  },
  {
    id: 'gap_2',
    industryRequirement: 'Microservice Circuit Breakers & Distributed Idempotency',
    studentCapability: 'Monolithic Express/Django CRUD routing',
    gapPercentage: 35,
    academicSubject: 'CS304 Software Architecture & Design Patterns',
    recommendedResource: {
      title: 'Resilience Engineering & Idempotency Key Design Patterns',
      type: 'Paper',
      url: 'https://martinfowler.com/articles/patterns-of-distributed-systems/'
    },
    practiceTask: 'Implement an HTTP client proxy with exponential backoff, jitter, and Redis lock idempotency.',
    portfolioProject: 'Resilient Payment Gateway Integration Proxy',
    readinessImpact: 15
  },
  {
    id: 'gap_3',
    industryRequirement: 'Model Drift Detection & Machine Learning Telemetry',
    studentCapability: 'Offline Scikit-Learn Jupyter Notebook model training',
    gapPercentage: 48,
    academicSubject: 'CS410 Machine Learning Systems & Production',
    recommendedResource: {
      title: 'Production ML Monitoring: Evidently AI & Prometheus Integration',
      type: 'Repository',
      url: 'https://github.com/evidentlyai/evidently'
    },
    practiceTask: 'Create an automated drift evaluator calculating Kolmogorov-Smirnov test statistics over incoming feature streams.',
    portfolioProject: 'Automated ML Model Drift Monitor & Alerting Engine',
    readinessImpact: 22
  }
];

export const INITIAL_ROADMAP: RoadmapItem[] = [
  {
    id: 'road_1',
    title: 'Master Sliding Window Deduplication & Stream Indexing',
    description: 'Implement sliding window logic with O(1) hash lookups and timestamp evictions for fraud transaction streams.',
    category: 'Data Structures',
    gapRefId: 'gap_1',
    status: 'in_progress',
    estimatedHours: 8,
    impactScore: 12
  },
  {
    id: 'road_2',
    title: 'Implement Idempotent API Middleware with Redis Lock',
    description: 'Create Express/FastAPI middleware that intercepts incoming retry tokens and prevents duplicate database writes.',
    category: 'Code Design',
    gapRefId: 'gap_2',
    status: 'not_started',
    estimatedHours: 6,
    impactScore: 15
  },
  {
    id: 'road_3',
    title: 'Debug Race Conditions in Concurrent Worker Threads',
    description: 'Solve locking and deadlock scenarios in multi-threaded connection pools under simulated network latency.',
    category: 'Debugging',
    gapRefId: 'gap_1',
    status: 'completed',
    estimatedHours: 10,
    impactScore: 10
  },
  {
    id: 'road_4',
    title: 'Deploy Model Drift Statistics Engine',
    description: 'Construct telemetry pipelines measuring feature distribution divergence against baseline training sets.',
    category: 'Industry Practice',
    gapRefId: 'gap_3',
    status: 'not_started',
    estimatedHours: 14,
    impactScore: 18
  }
];

export const INITIAL_SHADOW_PROBLEMS: ShadowProblem[] = [
  {
    id: 'sp_1',
    challengeId: 'chal_1',
    companyName: 'TechNova Systems',
    title: 'Fraud Detection Pipeline: Idempotent Event Deduplicator',
    summary: 'Synthetic representation of TechNova high-frequency card transaction filter.',
    scenarioDescription: 'TechNova processes 50,000 credit card authorizations per second. Intermittent network retries send duplicate payload events with identical transaction hashes within a 5-minute time window. Design a memory-efficient deduplication handler that drops duplicates while recording telemetry metrics.',
    constraints: [
      'Maximum memory footprint: 64MB for 500k active keys',
      'Eviction latency must remain strictly under 2ms',
      'Zero duplicate writes allowed to downstream ledger'
    ],
    readinessThreshold: 75,
    unlockedCapsuleId: 'capsule_1',
    status: 'ready',
    attemptsCount: 2,
    lastScore: 68,
    detectedMisconception: 'Attempted to use full relational database join query inside sub-millisecond hot loop.'
  },
  {
    id: 'sp_2',
    challengeId: 'chal_2',
    companyName: 'Infosys Innovation Labs',
    title: 'Smart Campus IoT Gate Rate Limiter',
    summary: 'Synthetic challenge for distributed turnstile authentication queues.',
    scenarioDescription: 'Simulate campus gate sensors transmitting 100k card scans per minute during peak lecture hours. Implement a token bucket rate limiter with burst buffering.',
    constraints: [
      'Token bucket capacity: 100 requests / second per gateway',
      'Thread safe atomic counter update',
      'Graceful degradation mode during database latency spikes'
    ],
    readinessThreshold: 70,
    unlockedCapsuleId: 'capsule_2',
    status: 'ready',
    attemptsCount: 1,
    lastScore: 82
  },
  {
    id: 'sp_3',
    challengeId: 'chal_3',
    companyName: 'Microsoft Cloud & AI',
    title: 'Healthcare HIPAA Anonymization Data Pipeline',
    summary: 'Synthetic challenge covering patient PII sanitization and differential privacy.',
    scenarioDescription: 'Construct an async ETL pipeline that strips 18 HIPAA identifier types from incoming HL7 clinical JSON payloads while injecting Laplace noise into aggregate age fields.',
    constraints: [
      '100% regex match accuracy for SSN, Phone, and Medical Record IDs',
      'Strict schema validation against FHIR R4 specs',
      'Zero PII leaks in system diagnostic logs'
    ],
    readinessThreshold: 80,
    unlockedCapsuleId: 'capsule_3',
    status: 'locked',
    attemptsCount: 0
  }
];

export const INITIAL_PROBLEM_CAPSULES: ProblemCapsule[] = [
  {
    id: 'capsule_1',
    title: 'TechNova Real-Time Financial Fraud Detection Engine',
    company: 'TechNova Systems',
    commitmentType: 'hiring',
    currentStage: 'Contextual',
    requiredReadiness: 75,
    stages: {
      sanitized: {
        title: 'Stage 1: Sanitized Problem Statement',
        summary: 'High-level business requirement for filtering stream anomalies.',
        businessGoal: 'Prevent fraudulent duplicate transactions from deducting double balance from merchant accounts.'
      },
      contextual: {
        title: 'Stage 2: Contextual Business Environment',
        environmentContext: 'Deployed on Kubernetes with 8 container nodes receiving Kafka partition topics.',
        realWorldEdgeCases: [
          'Out-of-order event arrivals up to 45 seconds late',
          'Database socket disconnects during peak volume',
          'Malformed JSON payloads with partial byte corruption'
        ]
      },
      restricted: {
        title: 'Stage 3: Restricted Specs & Input Schemas',
        inputSchemas: '{\n  "tx_id": "UUID-v4",\n  "amount": "DECIMAL(12,2)",\n  "timestamp_epoch": "INT64",\n  "card_hash": "SHA-256",\n  "merchant_id": "STRING"\n}',
        performanceConstraints: [
          'P99 response time < 5ms',
          'Throughput: 50,000 operations / second',
          'Max CPU core usage: 4 cores per pod'
        ]
      },
      full: {
        title: 'Stage 4: Full Repository Access & Production Sandbox',
        dataSpecification: 'Access to anonymized 5GB production log dump and TechNova sandbox environment.',
        fullRepoAccess: 'git@github.com:technova-recruiting/fraud-detection-core.git (Branch: candidate-capsule-rahul)'
      }
    }
  },
  {
    id: 'capsule_2',
    title: 'Infosys AI-Powered Code Refactoring & Compliance Engine',
    company: 'Infosys Innovation Labs',
    commitmentType: 'innovation',
    currentStage: 'Sanitized',
    requiredReadiness: 70,
    stages: {
      sanitized: {
        title: 'Stage 1: Sanitized Overview',
        summary: 'Automated AST parser for legacy Java codebase modernization.',
        businessGoal: 'Automatically identify anti-patterns and memory leaks in legacy enterprise applications.'
      },
      contextual: {
        title: 'Stage 2: Enterprise Context',
        environmentContext: 'Integrated into Infosys internal dev portal CI/CD pipeline.',
        realWorldEdgeCases: ['Circular dependency resolution', 'Custom annotation handling']
      },
      restricted: {
        title: 'Stage 3: AST Parser Specifications',
        inputSchemas: 'Java 8 to Java 21 bytecode AST conversion specifications.',
        performanceConstraints: ['Parse 100k lines of code in < 30 seconds']
      },
      full: {
        title: 'Stage 4: Full Project Sandbox',
        dataSpecification: '50 Enterprise Java repositories for refactoring benchmarks.',
        fullRepoAccess: 'git@github.com:infosys-labs/code-refactor-ai.git'
      }
    }
  }
];

export const INITIAL_DEFENSE_SUBMISSIONS: DefenseSubmission[] = [
  {
    id: 'def_1',
    studentId: 'stu_1',
    studentName: 'Rahul Kumar',
    challengeId: 'chal_1',
    challengeTitle: 'TechNova Financial Fraud Detection Engine',
    timestamp: '2026-09-07 14:30',
    solutionCode: `class FraudDeduplicator:\n    def __init__(self, ttl_seconds=300):\n        self.ttl = ttl_seconds\n        self.seen_hashes = {}\n    \n    def is_duplicate(self, tx_id, timestamp):\n        self._evict_expired(timestamp)\n        if tx_id in self.seen_hashes:\n            return True\n        self.seen_hashes[tx_id] = timestamp\n        return False\n        \n    def _evict_expired(self, current_time):\n        # Evict entries older than TTL\n        expired = [k for k, v in self.seen_hashes.items() if current_time - v > self.ttl]\n        for k in expired:\n            del self.seen_hashes[k]`,
    approach: 'I used an in-memory Hash Map indexed by transaction UUID, accompanied by timestamp-based lazy eviction to keep memory footprint bounded.',
    tradeOffs: 'Memory lookup is O(1), but lazy eviction during write calls can cause micro-spikes in latency under high insertion bursts. In a full production setup, a separate background eviction worker would be preferred.',
    scalability: 'Across multiple pods, this local map would be upgraded to a Redis Cluster using sliding window sorted sets (`ZREMRANGEBYSCORE`) backed by memory limits.',
    debugging: 'Initially, I experienced memory leaks because timestamps were compared as floating point seconds without handling out-of-order arrival buffers. I fixed this by enforcing an epoch buffer.',
    adaptation: 'When presented with the live constraint of 45-second out-of-order network latency, I added a 60-second grace window to the TTL calculation.',
    scores: {
      solution: 27,
      reasoning: 23,
      defense: 22,
      adaptation: 18,
      total: 90
    },
    verified: true,
    evaluatorFeedback: 'Exemplary reasoning and clear understanding of memory trade-offs under real-time network constraints.'
  }
];

export const INITIAL_EMPLOYER_COMMITMENTS: EmployerCommitment[] = [
  {
    id: 'chal_1',
    companyName: 'TechNova Systems',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    commitmentType: 'hiring',
    title: 'TechNova Real-Time Financial Fraud Detection Challenge',
    roleTarget: 'Data Analyst & Systems Engineer',
    guaranteeText: 'Guaranteed ₹12-16 LPA Hiring Offer for Top 10 Defended Solutions',
    stipendOrCompensation: '₹12,000,000 - ₹1,600,000 PA',
    openPositions: 10,
    termsAgreed: true,
    activeParticipants: 142,
    completedDefenses: 18
  },
  {
    id: 'chal_2',
    companyName: 'Infosys Innovation Labs',
    companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
    commitmentType: 'innovation',
    title: 'AI-Powered Automated Code Refactoring & Quality Engine',
    roleTarget: 'Software Developer & AI Researcher',
    guaranteeText: '₹2.5 Lakh Innovation Grant & Incubation Support',
    stipendOrCompensation: '₹250,000 Cash Grant',
    openPositions: 5,
    termsAgreed: true,
    activeParticipants: 98,
    completedDefenses: 12
  },
  {
    id: 'chal_3',
    companyName: 'Microsoft Cloud & AI',
    companyLogo: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?w=100&auto=format&fit=crop&q=80',
    commitmentType: 'paid_project',
    title: 'Cloud Infrastructure Resilience & Anonymization Pipeline',
    roleTarget: 'Cloud Intern / AI Engineer',
    guaranteeText: '₹50,000/month Paid 6-Month Internship with Pre-Placement Offer',
    stipendOrCompensation: '₹50,000 / month',
    openPositions: 8,
    termsAgreed: true,
    activeParticipants: 215,
    completedDefenses: 24
  },
  {
    id: 'chal_4',
    companyName: 'TCS Digital',
    companyLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&auto=format&fit=crop&q=80',
    commitmentType: 'hiring',
    title: 'Scalable Microservices Architecture & Event Streaming',
    roleTarget: 'Software Developer',
    guaranteeText: 'Guaranteed 50+ Roles for Students Achieving 80%+ Defense Verification',
    stipendOrCompensation: '₹7,000,000 - ₹1,000,000 PA',
    openPositions: 50,
    termsAgreed: true,
    activeParticipants: 450,
    completedDefenses: 62
  },
  {
    id: 'chal_5',
    companyName: 'Accenture Strategy',
    companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80',
    commitmentType: 'innovation',
    title: 'Sustainable Supply Chain Carbon Footprint Telemetry Engine',
    roleTarget: 'Data Analyst / ML Engineer',
    guaranteeText: '₹3 Lakh Cash Prize + Global Presentation to Executive Board',
    stipendOrCompensation: '₹300,000 Prize Fund',
    openPositions: 3,
    termsAgreed: true,
    activeParticipants: 110,
    completedDefenses: 8
  }
];

export const INITIAL_CHALLENGE_LEDGER: ChallengeLedgerEvent[] = [
  {
    id: 'led_1',
    challengeId: 'chal_1',
    timestamp: '2026-08-15 09:00',
    stage: 'Commitment',
    actor: 'TechNova Systems (Employer)',
    description: 'Employer Commitment created with ₹14 LPA salary guarantee for 10 verified candidates.',
    verifiedHash: '0x8f2a1b9c3e4d5f6a'
  },
  {
    id: 'led_2',
    challengeId: 'chal_1',
    timestamp: '2026-08-16 12:30',
    stage: 'Participants Joined',
    actor: 'Institution Cohort',
    description: '142 verified engineering students enrolled in Challenge sandbox.',
    verifiedHash: '0x1c3d5e7f9a2b4c6e'
  },
  {
    id: 'led_3',
    challengeId: 'chal_1',
    timestamp: '2026-08-20 16:45',
    stage: 'Capsule Unlocked',
    actor: 'Rahul Kumar (Student)',
    description: 'Passed Shadow Problem Readiness Check (Score: 78/100). Problem Capsule Stage 2 Contextual unlocked.',
    verifiedHash: '0x5b7a9c1e3f2d4e6f'
  },
  {
    id: 'led_4',
    challengeId: 'chal_1',
    timestamp: '2026-09-07 14:30',
    stage: 'Defense Completed',
    actor: 'Rahul Kumar (Student)',
    description: 'Submitted 4-part Reasoning & Live Adaptation Defense for Fraud Detection Engine.',
    verifiedHash: '0x9a8b7c6d5e4f3a2b'
  },
  {
    id: 'led_5',
    challengeId: 'chal_1',
    timestamp: '2026-09-08 10:15',
    stage: 'Evaluation',
    actor: 'Dr. Ananya Sen (Industry Evaluator)',
    description: 'Evaluated Defense submission. Verified total capability score: 90/100.',
    verifiedHash: '0x4d3c2b1a9f8e7d6c'
  },
  {
    id: 'led_6',
    challengeId: 'chal_1',
    timestamp: '2026-09-08 11:00',
    stage: 'Hiring Offered',
    actor: 'TechNova HR Portal',
    description: 'Official Hiring Offer extended to Rahul Kumar (Data Analyst & Systems Role).',
    verifiedHash: '0x7e6d5c4b3a2f1e0d'
  }
];

export const INITIAL_PASSPORT_DATA: CapabilityPassportData = {
  studentId: 'stu_1',
  studentName: 'Rahul Kumar',
  verifiedBadges: {
    diagnosticVerified: true,
    projectVerified: true,
    challengeVerified: true,
    defenseVerified: true
  },
  verifiedEvidence: [
    { id: 'ev_1', type: 'diagnostic', title: 'Foundational Diagnostics (8/8 Verified)', timestamp: '2026-09-02', score: 85 },
    { id: 'ev_2', type: 'project', title: 'In-Memory Sliding Window Deduplicator', timestamp: '2026-09-04', score: 88 },
    { id: 'ev_3', type: 'challenge', title: 'TechNova Fraud Pipeline Readiness Pass', timestamp: '2026-09-06', score: 78 },
    { id: 'ev_4', type: 'defense', title: 'TechNova Live Adaptation & Reasoning Defense', timestamp: '2026-09-07', score: 90 }
  ],
  verifiedProjects: [
    {
      title: 'High-Throughput Financial Fraud Ingestion Microservice',
      repoUrl: 'https://github.com/rahulkumar/fraud-ingestion-core',
      defenseScore: 90,
      skillsDemonstrated: ['Python Memory Management', 'O(1) Sliding Eviction', 'Idempotent Webhooks', 'Distributed Logging']
    },
    {
      title: 'Distributed Log Stream Telemetry Aggregator',
      repoUrl: 'https://github.com/rahulkumar/stream-telemetry-agg',
      defenseScore: 84,
      skillsDemonstrated: ['Kafka Consumer Groups', 'SQL Window Functions', 'Docker Containerization']
    }
  ],
  mentorSignatures: [
    {
      mentorName: 'Dr. Ananya Sen',
      role: 'Principal Systems Architect',
      organization: 'TechNova Systems',
      comment: 'Rahul demonstrated remarkable depth in explaining runtime memory bounds and successfully adapted his solution when faced with live out-of-order latency constraints.',
      date: '2026-09-08'
    },
    {
      mentorName: 'Prof. Rajesh Verma',
      role: 'Head of Computer Science',
      organization: 'National Institute of Technology',
      comment: 'Consistently demonstrates evidence-backed mastery across Data Structures and Code Design beyond traditional academic curricula.',
      date: '2026-09-03'
    }
  ],
  certifications: [
    {
      title: 'SkillLoop Verified Capability Master: Data Engineering & Stream Processing',
      issuer: 'SkillLoop National Capability Authority',
      date: '2026-09-08',
      verificationHash: 'SKL-2026-PS26044-8F92A1'
    },
    {
      title: 'AWS Certified Solutions Architect — Associate',
      issuer: 'Amazon Web Services',
      date: '2026-01-15',
      verificationHash: 'AWS-CERT-90218-RK'
    }
  ]
};

export const INITIAL_CURRICULUM_MAP: CurriculumMapItem[] = [
  {
    subjectCode: 'CS402',
    subjectName: 'Database Management Systems & Indexing',
    mappedCapability: 'Industry Practice',
    industryDemandScore: 94,
    studentCohortAvg: 62,
    gapScore: 32,
    recommendedUpdate: 'Add mandatory module on Partitioned Window Functions & Distributed Stream Join Buffers.'
  },
  {
    subjectCode: 'CS304',
    subjectName: 'Software Architecture & Design Patterns',
    mappedCapability: 'Code Design',
    industryDemandScore: 90,
    studentCohortAvg: 58,
    gapScore: 32,
    recommendedUpdate: 'Integrate hands-on lab on Microservice Circuit Breakers, Idempotency Keys, and Rate Limiting.'
  },
  {
    subjectCode: 'CS201',
    subjectName: 'Data Structures & Algorithm Analysis',
    mappedCapability: 'Data Structures',
    industryDemandScore: 88,
    studentCohortAvg: 78,
    gapScore: 10,
    recommendedUpdate: 'Expand practical benchmarks for LRU Caches and Memory Eviction Strategies in production.'
  },
  {
    subjectCode: 'CS410',
    subjectName: 'Machine Learning Systems & Production',
    mappedCapability: 'Algorithms',
    industryDemandScore: 95,
    studentCohortAvg: 52,
    gapScore: 43,
    recommendedUpdate: 'Shift focus from offline Jupyter notebooks to MLOps model drift monitoring & telemetry.'
  }
];

export const INITIAL_JOB_APPLICATIONS: JobApplication[] = [
  {
    id: 'app_1',
    studentId: 'stu_1',
    studentName: 'Rahul Kumar',
    commitmentId: 'chal_1',
    companyName: 'TechNova Systems',
    roleTarget: 'Data Analyst & Systems Engineer',
    appliedDate: '2026-09-07',
    status: 'Hired'
  },
  {
    id: 'app_2',
    studentId: 'stu_2',
    studentName: 'Priya Sharma',
    commitmentId: 'chal_3',
    companyName: 'Microsoft Cloud & AI',
    roleTarget: 'Cloud Intern',
    appliedDate: '2026-09-06',
    status: 'Shortlisted'
  },
  {
    id: 'app_3',
    studentId: 'stu_3',
    studentName: 'Arjun Patel',
    commitmentId: 'chal_4',
    companyName: 'TCS Digital',
    roleTarget: 'Software Developer',
    appliedDate: '2026-09-01',
    status: 'Rejected',
    rejectionFeedback: {
      reason: 'Capability Gap detected in Debugging multi-threaded race conditions and API parameter sanitization.',
      gapDetected: 'Debugging & Code Design (Readiness Score: 54% vs Required: 70%)',
      recommendedRoadmapAction: 'Complete CS304 Idempotency Middleware and Shadow Problem 1 before re-applying.'
    }
  }
];

export const INITIAL_TEAMS: Team[] = [
  {
    id: 'team_1',
    name: 'Algorithmic Vanguard',
    challengeTitle: 'TechNova Real-Time Financial Fraud Detection Challenge',
    company: 'TechNova Systems',
    members: [
      { id: 'stu_1', name: 'Rahul Kumar', role: 'Data Systems Lead', readinessScore: 68, capabilitiesCount: 6, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
      { id: 'stu_2', name: 'Priya Sharma', role: 'Backend Architect', readinessScore: 82, capabilitiesCount: 6, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80' }
    ],
    avgReadiness: 75,
    status: 'Active'
  },
  {
    id: 'team_2',
    name: 'Neural Streamers',
    challengeTitle: 'Cloud Infrastructure Resilience & Anonymization Pipeline',
    company: 'Microsoft Cloud & AI',
    members: [
      { id: 'stu_3', name: 'Arjun Patel', role: 'ML Intern', readinessScore: 54, capabilitiesCount: 4, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' }
    ],
    avgReadiness: 54,
    status: 'Forming'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    title: 'Hiring Offer Extended!',
    message: 'TechNova Systems has extended an official hiring offer for Data Analyst & Systems Engineer.',
    timestamp: '10 minutes ago',
    read: false,
    type: 'success'
  },
  {
    id: 'notif_2',
    title: 'Mentor Alert Triggered',
    message: 'Rahul Kumar failed Shadow Problem 1 twice with misconception: Event-driven streaming vs batch SQL.',
    timestamp: '1 hour ago',
    read: false,
    type: 'alert'
  },
  {
    id: 'notif_3',
    title: 'Problem Capsule Unlocked',
    message: 'Contextual Stage unlocked for TechNova Fraud Detection Pipeline.',
    timestamp: 'Yesterday',
    read: true,
    type: 'info'
  }
];
