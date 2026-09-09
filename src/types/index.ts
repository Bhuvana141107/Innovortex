export type UserRole = 'STUDENT' | 'FACULTY' | 'INSTITUTION' | 'INDUSTRY' | 'ADMIN';

export type CapabilityStage = 
  | 'Syntax' 
  | 'Data Structures' 
  | 'Debugging' 
  | 'Algorithms' 
  | 'Code Design' 
  | 'Industry Practice';

export interface EvidenceItem {
  id: string;
  type: 'diagnostic' | 'project' | 'challenge' | 'defense';
  title: string;
  timestamp: string;
  score: number;
}

export interface CapabilityProgress {
  stage: CapabilityStage;
  percentage: number; // 0 to 100
  evidenceCount: number;
  weaknesses: string[];
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  targetRole: string; // e.g. "Data Analyst", "Software Developer", "Cloud Intern", "AI/ML Intern"
  readinessScore: number; // 0 to 100
  activeChallengeId?: string;
  capabilities: CapabilityProgress[];
  diagnosticCompleted: boolean;
  lastDiagnosticDate?: string;
  mentorAlertActive: boolean;
  mentorAlertDetails?: {
    attemptCount: number;
    misconception: string;
    gapName: string;
    suggestedAction: string;
  };
}

export interface DiagnosticQuestion {
  id: string;
  title: string;
  category: 'Syntax' | 'Data Structures' | 'Debugging' | 'Algorithms' | 'Code Design' | 'Industry Practice';
  type: 'MCQ' | 'DEBUGGING' | 'SCENARIO' | 'REASONING';
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  capabilityImpact: CapabilityStage;
}

export interface SkillGapItem {
  id: string;
  industryRequirement: string;
  studentCapability: string;
  gapPercentage: number;
  academicSubject: string;
  recommendedResource: {
    title: string;
    type: 'Doc' | 'Interactive' | 'Paper' | 'Repository';
    url: string;
  };
  practiceTask: string;
  portfolioProject: string;
  readinessImpact: number;
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  category: CapabilityStage;
  gapRefId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  estimatedHours: number;
  impactScore: number;
}

export interface ShadowProblem {
  id: string;
  challengeId: string;
  companyName: string;
  title: string;
  summary: string;
  scenarioDescription: string;
  constraints: string[];
  readinessThreshold: number; // e.g. 70
  unlockedCapsuleId: string;
  status: 'locked' | 'ready' | 'passed' | 'failed';
  attemptsCount: number;
  lastScore?: number;
  detectedMisconception?: string;
}

export type CapsuleUnlockStage = 'Sanitized' | 'Contextual' | 'Restricted' | 'Full';

export interface ProblemCapsule {
  id: string;
  title: string;
  company: string;
  commitmentType: 'hiring' | 'innovation' | 'paid_project';
  currentStage: CapsuleUnlockStage;
  requiredReadiness: number;
  stages: {
    sanitized: {
      title: string;
      summary: string;
      businessGoal: string;
    };
    contextual: {
      title: string;
      environmentContext: string;
      realWorldEdgeCases: string[];
    };
    restricted: {
      title: string;
      inputSchemas: string;
      performanceConstraints: string[];
    };
    full: {
      title: string;
      dataSpecification: string;
      fullRepoAccess: string;
    };
  };
}

export interface AIGuidancePrompt {
  type: 'hint' | 'question' | 'explanation' | 'misconception' | 'resource';
  query: string;
  responseTitle: string;
  content: string;
  guidingQuestion?: string;
  suggestedDocs?: string[];
}

export interface DefenseSubmission {
  id: string;
  studentId: string;
  studentName: string;
  challengeId: string;
  challengeTitle: string;
  timestamp: string;
  solutionCode: string;
  approach: string;
  tradeOffs: string;
  scalability: string;
  debugging: string;
  adaptation: string;
  scores: {
    solution: number; // max 30
    reasoning: number; // max 25
    defense: number; // max 25
    adaptation: number; // max 20
    total: number; // max 100
  };
  verified: boolean;
  evaluatorFeedback?: string;
}

export type EmployerCommitmentType = 'hiring' | 'innovation' | 'paid_project';

export interface EmployerCommitment {
  id: string;
  companyName: string;
  companyLogo: string;
  commitmentType: EmployerCommitmentType;
  title: string;
  roleTarget: string;
  guaranteeText: string;
  stipendOrCompensation: string;
  openPositions: number;
  termsAgreed: boolean;
  activeParticipants: number;
  completedDefenses: number;
}

export interface ChallengeLedgerEvent {
  id: string;
  challengeId: string;
  timestamp: string;
  stage: 'Commitment' | 'Participants Joined' | 'Capsule Unlocked' | 'Iterations' | 'Mentor Review' | 'Defense Completed' | 'Evaluation' | 'Hiring Offered';
  actor: string;
  description: string;
  verifiedHash: string;
}

export interface CapabilityPassportData {
  studentId: string;
  studentName: string;
  verifiedBadges: {
    diagnosticVerified: boolean;
    projectVerified: boolean;
    challengeVerified: boolean;
    defenseVerified: boolean;
  };
  verifiedEvidence: EvidenceItem[];
  verifiedProjects: {
    title: string;
    repoUrl: string;
    defenseScore: number;
    skillsDemonstrated: string[];
  }[];
  mentorSignatures: {
    mentorName: string;
    role: string;
    organization: string;
    comment: string;
    date: string;
  }[];
  certifications: {
    title: string;
    issuer: string;
    date: string;
    verificationHash: string;
  }[];
}

export interface CurriculumMapItem {
  subjectCode: string;
  subjectName: string;
  mappedCapability: CapabilityStage;
  industryDemandScore: number; // 0 to 100
  studentCohortAvg: number; // 0 to 100
  gapScore: number; // demand - avg
  recommendedUpdate: string;
}

export interface JobApplication {
  id: string;
  studentId: string;
  studentName: string;
  commitmentId: string;
  companyName: string;
  roleTarget: string;
  appliedDate: string;
  status: 'Applied' | 'Shortlisted' | 'Defense Required' | 'Hired' | 'Rejected';
  rejectionFeedback?: {
    reason: string;
    gapDetected: string;
    recommendedRoadmapAction: string;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  readinessScore: number;
  capabilitiesCount: number;
  avatar: string;
}

export interface Team {
  id: string;
  name: string;
  challengeTitle: string;
  company: string;
  members: TeamMember[];
  avgReadiness: number;
  status: 'Forming' | 'Active' | 'Defending' | 'Completed';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'alert' | 'success' | 'info';
}

