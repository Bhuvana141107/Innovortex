import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';

// Landing & Onboarding (from Figma design)
import { LandingPage } from './pages/landing/LandingPage';
import { OnboardingFlow } from './pages/onboarding/OnboardingFlow';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';

// Student Pages
import { StudentDashboard } from './pages/student/StudentDashboard';
import { DiagnosticPage } from './pages/student/DiagnosticPage';
import { CapabilityMapPage } from './pages/student/CapabilityMapPage';
import { SkillGapEnginePage } from './pages/student/SkillGapEnginePage';
import { RoadmapPage } from './pages/student/RoadmapPage';
import { ShadowProblemPage } from './pages/student/ShadowProblemPage';
import { ProblemCapsulePage } from './pages/student/ProblemCapsulePage';
import { DefensePage } from './pages/student/DefensePage';
import { CapabilityPassportPage } from './pages/student/CapabilityPassportPage';

// Industry Pages
import { EmployerCommitmentPage } from './pages/industry/EmployerCommitmentPage';
import { ChallengeLedgerPage } from './pages/industry/ChallengeLedgerPage';
import { CandidateEvaluationPage } from './pages/industry/CandidateEvaluationPage';

// Academia Pages
import { AcademiaDashboard } from './pages/academia/AcademiaDashboard';
import { DataCollectorPage } from './pages/academia/DataCollectorPage';

// P1 Feature Pages
import { TeamMatchingPage } from './pages/p1/TeamMatchingPage';
import { JobsPage } from './pages/p1/JobsPage';

// Warm editorial Toast popup component
const ToastNotification: React.FC = () => {
  const { toast } = useApp();
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 fade-in">
      <div className={`px-4 py-3 rounded-lg border shadow-lg text-xs font-mono font-medium flex items-center gap-3 ${
        toast.type === 'success'
          ? 'bg-[#72192D] text-[#FAF7F2] border-[#5A1222]'
          : toast.type === 'alert'
            ? 'bg-[#C75D35] text-[#FAF7F2] border-[#99411F]'
            : 'bg-[#F4EFE6] text-[#1C1413] border-[#EAE2D3]'
      }`}>
        <span>{toast.text}</span>
      </div>
    </div>
  );
};

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <StudentDashboard />;
      case 'diagnostic':
        return <DiagnosticPage />;
      case 'capability-map':
        return <CapabilityMapPage />;
      case 'skill-gap':
        return <SkillGapEnginePage />;
      case 'roadmap':
        return <RoadmapPage />;
      case 'shadow-problem':
        return <ShadowProblemPage />;
      case 'problem-capsule':
        return <ProblemCapsulePage />;
      case 'defense':
        return <DefensePage />;
      case 'passport':
        return <CapabilityPassportPage />;
      case 'industry-commitments':
        return <EmployerCommitmentPage />;
      case 'challenge-ledger':
        return <ChallengeLedgerPage />;
      case 'candidate-eval':
        return <CandidateEvaluationPage />;
      case 'academia':
        return <AcademiaDashboard />;
      case 'data-collector':
        return <DataCollectorPage />;
      case 'team-matching':
        return <TeamMatchingPage />;
      case 'jobs':
        return <JobsPage />;
      default:
        return <StudentDashboard />;
    }
  };

  return (
    <div className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
      {renderTabContent()}
    </div>
  );
};

const AppShell: React.FC = () => {
  const { isLoggedIn, viewMode } = useApp();

  if (viewMode === 'landing') {
    return <LandingPage />;
  }

  if (viewMode === 'onboarding') {
    return <OnboardingFlow />;
  }

  if (!isLoggedIn) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1C1413] flex flex-col font-sans selection:bg-[#72192D] selection:text-[#FAF7F2]">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 overflow-x-hidden flex flex-col bg-[#FAF7F2]">
          <MainContent />
        </main>
      </div>
      <ToastNotification />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}

export default App;
