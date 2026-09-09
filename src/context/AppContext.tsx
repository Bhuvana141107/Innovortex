import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserRole, 
  StudentProfile, 
  DiagnosticQuestion, 
  SkillGapItem, 
  RoadmapItem, 
  ShadowProblem, 
  ProblemCapsule, 
  DefenseSubmission, 
  EmployerCommitment, 
  ChallengeLedgerEvent, 
  CapabilityPassportData, 
  CurriculumMapItem,
  JobApplication,
  Team,
  AppNotification
} from '../types';
import { 
  INITIAL_STUDENTS, 
  DIAGNOSTIC_QUESTIONS, 
  INITIAL_SKILL_GAPS, 
  INITIAL_ROADMAP, 
  INITIAL_SHADOW_PROBLEMS, 
  INITIAL_PROBLEM_CAPSULES, 
  INITIAL_DEFENSE_SUBMISSIONS, 
  INITIAL_EMPLOYER_COMMITMENTS, 
  INITIAL_CHALLENGE_LEDGER, 
  INITIAL_PASSPORT_DATA, 
  INITIAL_CURRICULUM_MAP, 
  INITIAL_JOB_APPLICATIONS, 
  INITIAL_TEAMS, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';

export interface DataIngestionLog {
  id: string;
  source: 'CSV/JSON File' | 'GitHub Repository' | 'College LMS / ERP' | 'Industry Demand API' | 'Manual Log';
  timestamp: string;
  recordsCount: number;
  status: 'Synced' | 'Processing' | 'Validated';
  summary: string;
}

interface Toast {
  id: string;
  text: string;
  type: 'success' | 'alert' | 'info';
}

interface AppContextType {
  isLoggedIn: boolean;
  login: (role: UserRole, studentId?: string) => void;
  logout: () => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeStudentId: string;
  setActiveStudentId: (id: string) => void;
  activeStudent: StudentProfile;
  students: StudentProfile[];
  diagnosticQuestions: DiagnosticQuestion[];
  skillGaps: SkillGapItem[];
  roadmap: RoadmapItem[];
  shadowProblems: ShadowProblem[];
  problemCapsules: ProblemCapsule[];
  defenseSubmissions: DefenseSubmission[];
  employerCommitments: EmployerCommitment[];
  challengeLedger: ChallengeLedgerEvent[];
  passportData: CapabilityPassportData;
  curriculumMap: CurriculumMapItem[];
  applications: JobApplication[];
  teams: Team[];
  notifications: AppNotification[];
  ingestionLogs: DataIngestionLog[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  viewMode: 'landing' | 'onboarding' | 'app';
  setViewMode: (mode: 'landing' | 'onboarding' | 'app') => void;
  onboardingRole: 'student' | 'faculty' | 'mentor' | null;
  setOnboardingRole: (role: 'student' | 'faculty' | 'mentor' | null) => void;
  startOnboarding: (role: 'student' | 'faculty' | 'mentor') => void;
  toast: Toast | null;
  showToast: (text: string, type?: 'success' | 'alert' | 'info') => void;
  
  // Actions
  submitDiagnosticAnswers: (answers: Record<string, number>) => void;
  updateRoadmapItemStatus: (id: string, status: 'not_started' | 'in_progress' | 'completed') => void;
  attemptShadowProblem: (problemId: string, code: string, reasoning: string) => { passed: boolean; score: number; misconception?: string };
  submitDefenseResponse: (submissionData: {
    challengeId: string;
    challengeTitle: string;
    solutionCode: string;
    approach: string;
    tradeOffs: string;
    scalability: string;
    debugging: string;
    adaptation: string;
  }) => void;
  createEmployerCommitment: (newCommitment: {
    companyName: string;
    commitmentType: 'hiring' | 'innovation' | 'paid_project';
    title: string;
    roleTarget: string;
    guaranteeText: string;
    stipendOrCompensation: string;
    openPositions: number;
  }) => void;
  evaluateCandidateDefense: (submissionId: string, scores: DefenseSubmission['scores'], feedback: string, issueOffer: boolean) => void;
  applyToJob: (commitmentId: string) => void;
  dismissMentorAlert: (studentId: string) => void;
  ingestDataStream: (log: Omit<DataIngestionLog, 'id' | 'timestamp' | 'status'>) => void;
  resetDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'skillloop_state_v3';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_isLoggedIn`);
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [role, setRoleState] = useState<UserRole>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_role`);
    return (saved as UserRole) || 'STUDENT';
  });

  const [activeStudentId, setActiveStudentIdState] = useState<string>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_activeStudentId`);
    return saved || 'stu_1';
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [viewMode, setViewMode] = useState<'landing' | 'onboarding' | 'app'>('app');
  const [onboardingRole, setOnboardingRole] = useState<'student' | 'faculty' | 'mentor' | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);

  const startOnboarding = (onbRole: 'student' | 'faculty' | 'mentor') => {
    setOnboardingRole(onbRole);
    setViewMode('onboarding');
  };

  const [students, setStudents] = useState<StudentProfile[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_students`);
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [skillGaps, setSkillGaps] = useState<SkillGapItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_skillGaps`);
    return saved ? JSON.parse(saved) : INITIAL_SKILL_GAPS;
  });

  const [roadmap, setRoadmap] = useState<RoadmapItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_roadmap`);
    return saved ? JSON.parse(saved) : INITIAL_ROADMAP;
  });

  const [shadowProblems, setShadowProblems] = useState<ShadowProblem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_shadowProblems`);
    return saved ? JSON.parse(saved) : INITIAL_SHADOW_PROBLEMS;
  });

  const [problemCapsules, setProblemCapsules] = useState<ProblemCapsule[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_problemCapsules`);
    return saved ? JSON.parse(saved) : INITIAL_PROBLEM_CAPSULES;
  });

  const [defenseSubmissions, setDefenseSubmissions] = useState<DefenseSubmission[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_defenseSubmissions`);
    return saved ? JSON.parse(saved) : INITIAL_DEFENSE_SUBMISSIONS;
  });

  const [employerCommitments, setEmployerCommitments] = useState<EmployerCommitment[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_employerCommitments`);
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYER_COMMITMENTS;
  });

  const [challengeLedger, setChallengeLedger] = useState<ChallengeLedgerEvent[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_challengeLedger`);
    return saved ? JSON.parse(saved) : INITIAL_CHALLENGE_LEDGER;
  });

  const [passportData, setPassportData] = useState<CapabilityPassportData>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_passportData`);
    return saved ? JSON.parse(saved) : INITIAL_PASSPORT_DATA;
  });

  const [curriculumMap, setCurriculumMap] = useState<CurriculumMapItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_curriculumMap`);
    return saved ? JSON.parse(saved) : INITIAL_CURRICULUM_MAP;
  });

  const [applications, setApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_applications`);
    return saved ? JSON.parse(saved) : INITIAL_JOB_APPLICATIONS;
  });

  const [teams, setTeams] = useState<Team[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_teams`);
    return saved ? JSON.parse(saved) : INITIAL_TEAMS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_notifications`);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [ingestionLogs, setIngestionLogs] = useState<DataIngestionLog[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_ingestionLogs`);
    return saved ? JSON.parse(saved) : [
      {
        id: 'ing_1',
        source: 'CSV/JSON File',
        timestamp: '2026-09-08 14:20',
        recordsCount: 142,
        status: 'Synced',
        summary: 'Ingested 142 student diagnostic test scores & GitHub commit telemetry logs.'
      },
      {
        id: 'ing_2',
        source: 'GitHub Repository',
        timestamp: '2026-09-07 18:00',
        recordsCount: 45,
        status: 'Synced',
        summary: 'Parsed Python memory eviction microservice repo benchmarks for Rahul Kumar.'
      },
      {
        id: 'ing_3',
        source: 'Industry Demand API',
        timestamp: '2026-09-06 09:15',
        recordsCount: 500,
        status: 'Synced',
        summary: 'Real-time job market sync: Kafka stream processing & Redis locking demand up by 38%.'
      }
    ];
  });

  // Save state to LocalStorage
  useEffect(() => {
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_isLoggedIn`, JSON.stringify(isLoggedIn));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_role`, role);
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_activeStudentId`, activeStudentId);
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_students`, JSON.stringify(students));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_skillGaps`, JSON.stringify(skillGaps));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_roadmap`, JSON.stringify(roadmap));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_shadowProblems`, JSON.stringify(shadowProblems));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_problemCapsules`, JSON.stringify(problemCapsules));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_defenseSubmissions`, JSON.stringify(defenseSubmissions));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_employerCommitments`, JSON.stringify(employerCommitments));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_challengeLedger`, JSON.stringify(challengeLedger));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_passportData`, JSON.stringify(passportData));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_curriculumMap`, JSON.stringify(curriculumMap));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_applications`, JSON.stringify(applications));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_teams`, JSON.stringify(teams));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_notifications`, JSON.stringify(notifications));
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_ingestionLogs`, JSON.stringify(ingestionLogs));
  }, [isLoggedIn, role, activeStudentId, students, skillGaps, roadmap, shadowProblems, problemCapsules, defenseSubmissions, employerCommitments, challengeLedger, passportData, curriculumMap, applications, teams, notifications, ingestionLogs]);

  const activeStudent = students.find(s => s.id === activeStudentId) || students[0];

  const showToast = (text: string, type: 'success' | 'alert' | 'info' = 'info') => {
    const id = Date.now().toString();
    setToast({ id, text, type });
    setTimeout(() => setToast(null), 4000);
  };

  const login = (newRole: UserRole, studentId?: string) => {
    setIsLoggedIn(true);
    setRoleState(newRole);
    if (studentId) setActiveStudentIdState(studentId);
    
    if (newRole === 'STUDENT') setActiveTab('dashboard');
    else if (newRole === 'INDUSTRY') setActiveTab('industry-commitments');
    else if (newRole === 'FACULTY' || newRole === 'INSTITUTION') setActiveTab('academia');
    else if (newRole === 'ADMIN') setActiveTab('dashboard');

    showToast(`Welcome to SkillLoop! Logged in as ${newRole}`, 'success');
  };

  const logout = () => {
    setIsLoggedIn(false);
    showToast('Logged out of SkillLoop session.', 'info');
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole === 'STUDENT') setActiveTab('dashboard');
    else if (newRole === 'INDUSTRY') setActiveTab('industry-commitments');
    else if (newRole === 'FACULTY' || newRole === 'INSTITUTION') setActiveTab('academia');
    else if (newRole === 'ADMIN') setActiveTab('dashboard');
    showToast(`Role switched to ${newRole}`, 'info');
  };

  const setActiveStudentId = (id: string) => {
    setActiveStudentIdState(id);
    const target = students.find(s => s.id === id);
    if (target) showToast(`Switched active student to ${target.name}`, 'info');
  };

  const submitDiagnosticAnswers = (answers: Record<string, number>) => {
    let totalScore = 0;
    const stageScores: Record<string, { correct: number; total: number }> = {
      'Syntax': { correct: 0, total: 0 },
      'Data Structures': { correct: 0, total: 0 },
      'Debugging': { correct: 0, total: 0 },
      'Algorithms': { correct: 0, total: 0 },
      'Code Design': { correct: 0, total: 0 },
      'Industry Practice': { correct: 0, total: 0 }
    };

    DIAGNOSTIC_QUESTIONS.forEach(q => {
      const selected = answers[q.id];
      if (selected !== undefined) {
        stageScores[q.capabilityImpact].total += 1;
        if (selected === q.correctAnswer) {
          totalScore += 1;
          stageScores[q.capabilityImpact].correct += 1;
        }
      }
    });

    const overallPct = Math.round((totalScore / DIAGNOSTIC_QUESTIONS.length) * 100);

    setStudents(prev => prev.map(stu => {
      if (stu.id !== activeStudentId) return stu;
      const updatedCaps = stu.capabilities.map(cap => {
        const stats = stageScores[cap.stage];
        if (stats && stats.total > 0) {
          const addedPct = Math.round((stats.correct / stats.total) * 15);
          return {
            ...cap,
            percentage: Math.min(100, cap.percentage + addedPct),
            evidenceCount: cap.evidenceCount + stats.correct
          };
        }
        return cap;
      });
      return {
        ...stu,
        readinessScore: Math.min(100, Math.round((stu.readinessScore + overallPct) / 2)),
        diagnosticCompleted: true,
        lastDiagnosticDate: new Date().toISOString().split('T')[0],
        capabilities: updatedCaps
      };
    }));

    setPassportData(prev => ({
      ...prev,
      verifiedBadges: { ...prev.verifiedBadges, diagnosticVerified: true },
      verifiedEvidence: [
        { id: `ev_diag_${Date.now()}`, type: 'diagnostic', title: `Diagnostic Test Submission (${overallPct}%)`, timestamp: new Date().toISOString().split('T')[0], score: overallPct },
        ...prev.verifiedEvidence
      ]
    }));

    showToast(`Diagnostic submitted! Overall score: ${overallPct}%. Capabilities updated.`, 'success');
  };

  const updateRoadmapItemStatus = (id: string, status: 'not_started' | 'in_progress' | 'completed') => {
    setRoadmap(prev => prev.map(item => item.id === id ? { ...item, status } : item));
    if (status === 'completed') {
      setStudents(prev => prev.map(stu => stu.id === activeStudentId ? { ...stu, readinessScore: Math.min(100, stu.readinessScore + 5) } : stu));
      showToast('Roadmap task marked completed! +5 Readiness Score', 'success');
    } else {
      showToast(`Roadmap task updated to ${status.replace('_', ' ')}`, 'info');
    }
  };

  const attemptShadowProblem = (problemId: string, code: string, reasoning: string) => {
    const prob = shadowProblems.find(p => p.id === problemId);
    if (!prob) return { passed: false, score: 0 };

    const containsGoodPatterns = code.includes('evict') || code.includes('ttl') || code.includes('hash') || code.includes('map') || code.includes('bucket') || code.includes('filter');
    const lengthQuality = Math.min(40, code.length / 5);
    const reasoningQuality = Math.min(40, reasoning.length / 5);
    const score = Math.round(Math.min(95, 30 + (containsGoodPatterns ? 25 : 5) + lengthQuality + reasoningQuality));

    const passed = score >= prob.readinessThreshold;

    setShadowProblems(prev => prev.map(p => {
      if (p.id !== problemId) return p;
      const newAttempts = p.attemptsCount + 1;
      return {
        ...p,
        attemptsCount: newAttempts,
        lastScore: score,
        status: passed ? 'passed' : 'failed'
      };
    }));

    if (passed) {
      setProblemCapsules(prev => prev.map(cap => {
        if (cap.id === prob.unlockedCapsuleId) {
          const stageOrder: Record<string, string> = { 'Sanitized': 'Contextual', 'Contextual': 'Restricted', 'Restricted': 'Full', 'Full': 'Full' };
          return { ...cap, currentStage: (stageOrder[cap.currentStage] || 'Contextual') as any };
        }
        return cap;
      }));

      setStudents(prev => prev.map(stu => stu.id === activeStudentId ? { ...stu, readinessScore: Math.min(100, stu.readinessScore + 8) } : stu));

      setChallengeLedger(prev => [
        {
          id: `led_${Date.now()}`,
          challengeId: prob.challengeId,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          stage: 'Capsule Unlocked',
          actor: `${activeStudent.name} (Student)`,
          description: `Passed Shadow Problem Readiness Check (Score: ${score}/${prob.readinessThreshold}). Unlocked Problem Capsule Stage.`,
          verifiedHash: `0x${Math.random().toString(16).substring(2, 10)}`
        },
        ...prev
      ]);

      showToast(`Shadow Problem Passed! Score: ${score}/100. Problem Capsule unlocked!`, 'success');
    } else {
      const newAttempts = (prob.attemptsCount || 0) + 1;
      if (newAttempts >= 2) {
        const misconception = prob.detectedMisconception || 'Repeated efficiency and edge-case boundary errors under latency constraints';
        setStudents(prev => prev.map(stu => {
          if (stu.id !== activeStudentId) return stu;
          return {
            ...stu,
            mentorAlertActive: true,
            mentorAlertDetails: {
              attemptCount: newAttempts,
              misconception,
              gapName: prob.title,
              suggestedAction: 'Schedule mentor review session or revisit recommended roadmap practice items.'
            }
          };
        }));
        showToast(`Score: ${score}/${prob.readinessThreshold}. Mentor Alert Triggered due to repeated failure!`, 'alert');
      } else {
        showToast(`Score: ${score}/${prob.readinessThreshold}. Threshold not met. Review AI Guidance and retry!`, 'alert');
      }
    }

    return { passed, score, misconception: prob.detectedMisconception };
  };

  const submitDefenseResponse = (submissionData: {
    challengeId: string;
    challengeTitle: string;
    solutionCode: string;
    approach: string;
    tradeOffs: string;
    scalability: string;
    debugging: string;
    adaptation: string;
  }) => {
    const solScore = Math.round(Math.min(30, 15 + submissionData.solutionCode.length / 10));
    const reaScore = Math.round(Math.min(25, 10 + submissionData.approach.length / 10));
    const defScore = Math.round(Math.min(25, 10 + (submissionData.tradeOffs.length + submissionData.scalability.length) / 15));
    const adaScore = Math.round(Math.min(20, 8 + submissionData.adaptation.length / 10));
    const total = solScore + reaScore + defScore + adaScore;

    const newDef: DefenseSubmission = {
      id: `def_${Date.now()}`,
      studentId: activeStudentId,
      studentName: activeStudent.name,
      challengeId: submissionData.challengeId,
      challengeTitle: submissionData.challengeTitle,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      solutionCode: submissionData.solutionCode,
      approach: submissionData.approach,
      tradeOffs: submissionData.tradeOffs,
      scalability: submissionData.scalability,
      debugging: submissionData.debugging,
      adaptation: submissionData.adaptation,
      scores: {
        solution: solScore,
        reasoning: reaScore,
        defense: defScore,
        adaptation: adaScore,
        total
      },
      verified: true,
      evaluatorFeedback: 'Verified submission with defense & adaptation analysis.'
    };

    setDefenseSubmissions(prev => [newDef, ...prev]);

    setPassportData(prev => ({
      ...prev,
      verifiedBadges: {
        ...prev.verifiedBadges,
        challengeVerified: true,
        defenseVerified: true
      },
      verifiedEvidence: [
        { id: `ev_def_${Date.now()}`, type: 'defense', title: `${submissionData.challengeTitle} Defense (Score: ${total}/100)`, timestamp: new Date().toISOString().split('T')[0], score: total },
        ...prev.verifiedEvidence
      ],
      verifiedProjects: [
        {
          title: submissionData.challengeTitle,
          repoUrl: `https://github.com/${activeStudent.name.toLowerCase().replace(' ', '')}/challenge-repo`,
          defenseScore: total,
          skillsDemonstrated: ['Defense & Reasoning', 'Live Adaptation', 'Code Architecture', 'System Trade-offs']
        },
        ...prev.verifiedProjects
      ]
    }));

    setChallengeLedger(prev => [
      {
        id: `led_${Date.now()}`,
        challengeId: submissionData.challengeId,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        stage: 'Defense Completed',
        actor: `${activeStudent.name} (Student)`,
        description: `Submitted 4-part Defense & Adaptation for ${submissionData.challengeTitle}. Score: ${total}/100.`,
        verifiedHash: `0x${Math.random().toString(16).substring(2, 10)}`
      },
      ...prev
    ]);

    setStudents(prev => prev.map(stu => stu.id === activeStudentId ? { ...stu, readinessScore: Math.min(100, stu.readinessScore + 12) } : stu));

    showToast(`Defense submitted & verified! Total Score: ${total}/100. Passport updated.`, 'success');
  };

  const createEmployerCommitment = (newCommitment: {
    companyName: string;
    commitmentType: 'hiring' | 'innovation' | 'paid_project';
    title: string;
    roleTarget: string;
    guaranteeText: string;
    stipendOrCompensation: string;
    openPositions: number;
  }) => {
    const id = `chal_${Date.now()}`;
    const commitmentObj: EmployerCommitment = {
      ...newCommitment,
      id,
      companyLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
      termsAgreed: true,
      activeParticipants: 0,
      completedDefenses: 0
    };

    setEmployerCommitments(prev => [commitmentObj, ...prev]);

    setChallengeLedger(prev => [
      {
        id: `led_${Date.now()}`,
        challengeId: id,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
        stage: 'Commitment',
        actor: `${newCommitment.companyName} (Employer)`,
        description: `Employer Commitment published: ${newCommitment.title} (${newCommitment.guaranteeText})`,
        verifiedHash: `0x${Math.random().toString(16).substring(2, 10)}`
      },
      ...prev
    ]);

    showToast(`Employer Commitment published! ID: ${id}`, 'success');
  };

  const evaluateCandidateDefense = (submissionId: string, scores: DefenseSubmission['scores'], feedback: string, issueOffer: boolean) => {
    setDefenseSubmissions(prev => prev.map(def => {
      if (def.id !== submissionId) return def;
      return {
        ...def,
        scores,
        verified: true,
        evaluatorFeedback: feedback
      };
    }));

    const targetDef = defenseSubmissions.find(d => d.id === submissionId);
    if (targetDef) {
      setChallengeLedger(prev => [
        {
          id: `led_${Date.now()}`,
          challengeId: targetDef.challengeId,
          timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
          stage: issueOffer ? 'Hiring Offered' : 'Evaluation',
          actor: 'Industry Evaluator',
          description: `Evaluated ${targetDef.studentName}'s Defense. Score: ${scores.total}/100. Feedback: ${feedback}. ${issueOffer ? 'Hiring Offer Extended!' : ''}`,
          verifiedHash: `0x${Math.random().toString(16).substring(2, 10)}`
        },
        ...prev
      ]);

      if (issueOffer) {
        setNotifications(prev => [
          {
            id: `notif_${Date.now()}`,
            title: 'Hiring Offer Extended!',
            message: `Congratulations ${targetDef.studentName}! Your defense score of ${scores.total}/100 earned you a verified hiring offer for ${targetDef.challengeTitle}.`,
            timestamp: 'Just now',
            read: false,
            type: 'success'
          },
          ...prev
        ]);
      }
    }

    showToast(`Defense evaluated. Score: ${scores.total}/100. ${issueOffer ? 'Offer issued!' : ''}`, 'success');
  };

  const applyToJob = (commitmentId: string) => {
    const comm = employerCommitments.find(c => c.id === commitmentId);
    if (!comm) return;

    const existing = applications.find(a => a.commitmentId === commitmentId && a.studentId === activeStudentId);
    if (existing) {
      showToast('Application already submitted for this challenge!', 'alert');
      return;
    }

    const newApp: JobApplication = {
      id: `app_${Date.now()}`,
      studentId: activeStudentId,
      studentName: activeStudent.name,
      commitmentId,
      companyName: comm.companyName,
      roleTarget: comm.roleTarget,
      appliedDate: new Date().toISOString().split('T')[0],
      status: activeStudent.readinessScore >= 70 ? 'Shortlisted' : 'Applied'
    };

    setApplications(prev => [newApp, ...prev]);

    setEmployerCommitments(prev => prev.map(c => c.id === commitmentId ? { ...c, activeParticipants: c.activeParticipants + 1 } : c));

    showToast(`Successfully applied to ${comm.companyName} challenge with Capability Passport!`, 'success');
  };

  const dismissMentorAlert = (studentId: string) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, mentorAlertActive: false } : s));
    showToast('Mentor alert resolved and dismissed.', 'info');
  };

  const ingestDataStream = (logData: Omit<DataIngestionLog, 'id' | 'timestamp' | 'status'>) => {
    const newLog: DataIngestionLog = {
      ...logData,
      id: `ing_${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Synced'
    };

    setIngestionLogs(prev => [newLog, ...prev]);

    // Give active student a readiness boost upon institutional data sync!
    setStudents(prev => prev.map(s => s.id === activeStudentId ? { ...s, readinessScore: Math.min(100, s.readinessScore + 4) } : s));

    showToast(`Data Ingestion Stream Synced! ${newLog.recordsCount} records processed.`, 'success');
  };

  const resetDemoData = () => {
    localStorage.clear();
    setStudents(INITIAL_STUDENTS);
    setSkillGaps(INITIAL_SKILL_GAPS);
    setRoadmap(INITIAL_ROADMAP);
    setShadowProblems(INITIAL_SHADOW_PROBLEMS);
    setProblemCapsules(INITIAL_PROBLEM_CAPSULES);
    setDefenseSubmissions(INITIAL_DEFENSE_SUBMISSIONS);
    setEmployerCommitments(INITIAL_EMPLOYER_COMMITMENTS);
    setChallengeLedger(INITIAL_CHALLENGE_LEDGER);
    setPassportData(INITIAL_PASSPORT_DATA);
    setCurriculumMap(INITIAL_CURRICULUM_MAP);
    setApplications(INITIAL_JOB_APPLICATIONS);
    setTeams(INITIAL_TEAMS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setActiveStudentIdState('stu_1');
    setRoleState('STUDENT');
    setIsLoggedIn(true);
    setActiveTab('dashboard');
    showToast('Demo data reset to initial state!', 'success');
  };

  return (
    <AppContext.Provider value={{
      isLoggedIn,
      login,
      logout,
      role,
      setRole,
      activeStudentId,
      setActiveStudentId,
      activeStudent,
      students,
      diagnosticQuestions: DIAGNOSTIC_QUESTIONS,
      skillGaps,
      roadmap,
      shadowProblems,
      problemCapsules,
      defenseSubmissions,
      employerCommitments,
      challengeLedger,
      passportData,
      curriculumMap,
      applications,
      teams,
      notifications,
      ingestionLogs,
      activeTab,
      setActiveTab,
      viewMode,
      setViewMode,
      onboardingRole,
      setOnboardingRole,
      startOnboarding,
      toast,
      showToast,
      submitDiagnosticAnswers,
      updateRoadmapItemStatus,
      attemptShadowProblem,
      submitDefenseResponse,
      createEmployerCommitment,
      evaluateCandidateDefense,
      applyToJob,
      dismissMentorAlert,
      ingestDataStream,
      resetDemoData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
