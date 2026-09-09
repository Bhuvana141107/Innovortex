import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  GraduationCap, 
  Briefcase, 
  User, 
  Cpu, 
  Sparkles, 
  Compass, 
  Target, 
  Activity,
  Layers,
  ChevronRight,
  TrendingUp,
  FileCode,
  Award
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const LandingPage: React.FC = () => {
  const { setViewMode, login, setRole, startOnboarding } = useApp();
  const [activeLoopIndex, setActiveLoopIndex] = useState<number>(0);

  const loopStages = [
    { name: 'Assess', desc: 'Diagnostic multi-tier evaluation testing conceptual syntax and edge reasoning.' },
    { name: 'Profile', desc: 'Holistic 4-tier capability mapping using Bloom’s cognitive taxonomy.' },
    { name: 'Gap Analysis', desc: 'Automated delta engine calculating exact deficits against industry benchmarks.' },
    { name: 'Learn', desc: 'Curated 6-week adaptive roadmaps with milestone tracking.' },
    { name: 'Practice', desc: 'AI Shadow Problems with edge test-cases and misconception detection.' },
    { name: 'Validate', desc: 'Socratic AI Defense Engine proving the human understands and can defend the solution.' },
    { name: 'Match', desc: 'Direct matching to verified employer commitments and corporate challenges.' },
    { name: 'Feedback', desc: 'Industry mentor reviews and institutional faculty telemetry.' },
    { name: 'Improve', desc: 'Cryptographic Capability Passport with tamper-proof SHA-256 validation.' }
  ];

  const handleLaunchRole = (role: UserRole, studentId?: string) => {
    login(role, studentId);
    setViewMode('app');
  };

  return (
    <div className="min-h-screen bg-[#F9F7F4] text-[#141412] flex flex-col font-sans selection:bg-[#C8BFB0] selection:text-[#141412]">
      {/* Top Banner */}
      <div className="bg-[#1A1A18] text-[#F9F7F4] text-xs py-2 px-4 border-b border-[#3C3A36]">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-mono">
            <span className="bg-[#3C3A36] text-[#DDD9D1] px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-semibold">
              SIH 2026 PS26044
            </span>
            <span className="font-bold tracking-tight">SkillLoop</span>
            <span className="text-[#8C8880] hidden sm:inline">— Capability Intelligence Platform</span>
          </div>
          <div className="text-[11px] text-[#DDD9D1] font-mono italic">
            "Measuring what humans understand, build, defend and adapt."
          </div>
        </div>
      </div>

      {/* Top Navigation */}
      <header className="sticky top-0 z-30 bg-[#F9F7F4]/90 backdrop-blur-md border-b border-[#E0DBD3]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-[#1A1A18] text-[#F9F7F4] flex items-center justify-center font-display font-bold text-lg shadow-sm">
              SL
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-semibold text-lg tracking-tight">SkillLoop</span>
                <span className="text-[10px] font-mono uppercase bg-[#EAE6DF] text-[#5C5954] px-1.5 py-0.5 rounded border border-[#E0DBD3]">
                  Figma Edition
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleLaunchRole('STUDENT', 'stu_1')}
              className="text-xs font-medium text-[#5C5954] hover:text-[#141412] px-3 py-1.5 transition-colors hidden sm:inline-block"
            >
              Quick Demo Login
            </button>
            <button
              onClick={() => setViewMode('app')}
              className="bg-[#1A1A18] hover:bg-[#262522] text-[#F9F7F4] text-xs font-semibold px-4 py-2 rounded transition-all shadow-sm flex items-center gap-2"
            >
              <span>Launch Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="pt-16 pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2EFE9] border border-[#E0DBD3] text-xs font-mono text-[#5C5954] mb-6 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-[#1A1A18]" />
            <span>SIH 2026 Problem Statement PS26044 · Ministry of Education</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#141412] leading-[1.08] mb-6 animate-fade-up">
            From Skill Gaps to <br />
            <span className="italic font-normal">Industry-Ready Talent</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#5C5954] leading-relaxed mb-10 animate-fade-up delay-100">
            A continuous capability intelligence system replacing passive resumes with live AI shadow challenges,
            Socratic defense validation, and cryptographically verified talent passports.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-up delay-200">
            <button
              onClick={() => setViewMode('app')}
              className="bg-[#1A1A18] hover:bg-[#262522] text-[#F9F7F4] text-sm font-semibold px-6 py-3 rounded transition-all shadow-md flex items-center gap-2 group"
            >
              <span>Enter Unified Platform</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => startOnboarding('student')}
              className="bg-[#F2EFE9] hover:bg-[#EAE6DF] text-[#141412] border border-[#E0DBD3] text-sm font-semibold px-6 py-3 rounded transition-all flex items-center gap-2"
            >
              <span>Guided Onboarding Flow</span>
              <ChevronRight className="w-4 h-4 text-[#8C8880]" />
            </button>
          </div>
        </section>

        {/* 9-Stage Continuous Loop Interactive Widget */}
        <section className="py-12 bg-[#F2EFE9] border-y border-[#E0DBD3]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#8C8880]">THE CONTINUOUS ECOSYSTEM</p>
                <h2 className="font-display text-xl sm:text-2xl font-light text-[#141412]">The 9-Stage SkillLoop Pipeline</h2>
              </div>
              <span className="text-xs font-mono text-[#5C5954] bg-[#EAE6DF] px-2.5 py-1 rounded border border-[#E0DBD3]">
                Stage {activeLoopIndex + 1} of {loopStages.length}
              </span>
            </div>

            {/* Stages Scrollable Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-1 no-scrollbar">
              {loopStages.map((stage, idx) => {
                const isActive = activeLoopIndex === idx;
                return (
                  <button
                    key={stage.name}
                    onClick={() => setActiveLoopIndex(idx)}
                    className={`shrink-0 px-3.5 py-2 rounded text-xs font-medium transition-all text-left border ${
                      isActive
                        ? 'bg-[#1A1A18] text-[#F9F7F4] border-[#1A1A18] shadow-sm'
                        : 'bg-[#F9F7F4] text-[#5C5954] border-[#E0DBD3] hover:border-[#8C8880]'
                    }`}
                  >
                    <span className={`block text-[10px] font-mono ${isActive ? 'text-[#C8BFB0]' : 'text-[#8C8880]'}`}>
                      0{idx + 1}
                    </span>
                    <span className="font-semibold">{stage.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Active stage details callout */}
            <div className="mt-4 p-4 rounded bg-[#F9F7F4] border border-[#E0DBD3] flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase text-[#1A1A18]">
                  Stage {activeLoopIndex + 1}: {loopStages[activeLoopIndex].name}
                </span>
                <p className="text-sm text-[#5C5954]">
                  {loopStages[activeLoopIndex].desc}
                </p>
              </div>
              <button
                onClick={() => setViewMode('app')}
                className="shrink-0 text-xs font-semibold text-[#1A1A18] hover:underline flex items-center gap-1"
              >
                <span>Try In App</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* 3 Persona Portals */}
        <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-[10px] font-mono uppercase tracking-widest text-[#8C8880] mb-2">PERSONA PORTALS</p>
            <h2 className="font-display text-3xl font-light text-[#141412] mb-3">Designed For Every Stakeholder</h2>
            <p className="text-sm text-[#5C5954]">
              Seamlessly toggle between roles or select a persona below to experience specialized capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Student Card */}
            <div className="p-6 rounded-md bg-[#F2EFE9] border border-[#E0DBD3] hover:border-[#8C8880] transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded bg-[#EAE6DF] border border-[#E0DBD3] flex items-center justify-center text-[#1A1A18]">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C8880]">For Candidates</span>
                  <h3 className="font-display text-xl font-normal text-[#141412] mt-0.5">Student & Learner</h3>
                </div>
                <p className="text-xs text-[#5C5954] leading-relaxed">
                  Map your capabilities, resolve skill gaps through AI shadow sandboxes, defend solutions before Socratic AI, and earn cryptographically verified passports.
                </p>
                <div className="space-y-1.5 pt-2 border-t border-[#E0DBD3]">
                  {['Socratic AI Defense Engine', '4-Tier Capability Map', 'AI Shadow Problems', 'Capability Passport (SHA-256)'].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-[#3C3A36]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#3A5C3A]" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-[#E0DBD3] flex items-center gap-2">
                <button
                  onClick={() => handleLaunchRole('STUDENT', 'stu_1')}
                  className="flex-1 bg-[#1A1A18] hover:bg-[#262522] text-[#F9F7F4] text-xs font-semibold py-2.5 px-3 rounded transition-all text-center"
                >
                  Enter Student Portal
                </button>
                <button
                  onClick={() => startOnboarding('student')}
                  className="p-2.5 rounded border border-[#E0DBD3] hover:bg-[#EAE6DF] text-[#5C5954]"
                  title="Onboarding Tour"
                >
                  <Compass className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Faculty Card */}
            <div className="p-6 rounded-md bg-[#F2EFE9] border border-[#E0DBD3] hover:border-[#8C8880] transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded bg-[#EAE6DF] border border-[#E0DBD3] flex items-center justify-center text-[#1A1A18]">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C8880]">For Educators</span>
                  <h3 className="font-display text-xl font-normal text-[#141412] mt-0.5">Faculty & Academia</h3>
                </div>
                <p className="text-xs text-[#5C5954] leading-relaxed">
                  Track batch-level proficiency, detect cohort misconceptions in real time, and align institutional curriculum to live industry demand signals.
                </p>
                <div className="space-y-1.5 pt-2 border-t border-[#E0DBD3]">
                  {['Batch Skill Gap Heatmap', 'NEP 2020 Data Ingestion Collector', 'Curriculum Industry Alignment', 'Automated Mentor Alerts'].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-[#3C3A36]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#3A5C3A]" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-[#E0DBD3] flex items-center gap-2">
                <button
                  onClick={() => handleLaunchRole('FACULTY')}
                  className="flex-1 bg-[#1A1A18] hover:bg-[#262522] text-[#F9F7F4] text-xs font-semibold py-2.5 px-3 rounded transition-all text-center"
                >
                  Enter Faculty Portal
                </button>
                <button
                  onClick={() => startOnboarding('faculty')}
                  className="p-2.5 rounded border border-[#E0DBD3] hover:bg-[#EAE6DF] text-[#5C5954]"
                  title="Onboarding Tour"
                >
                  <Compass className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mentor & Industry Card */}
            <div className="p-6 rounded-md bg-[#F2EFE9] border border-[#E0DBD3] hover:border-[#8C8880] transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded bg-[#EAE6DF] border border-[#E0DBD3] flex items-center justify-center text-[#1A1A18]">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C8880]">For Recruiters</span>
                  <h3 className="font-display text-xl font-normal text-[#141412] mt-0.5">Industry & Mentors</h3>
                </div>
                <p className="text-xs text-[#5C5954] leading-relaxed">
                  Sponsor high-stakes problem capsules, audit candidate defense reasoning, and convert top-tier performers into guaranteed hires.
                </p>
                <div className="space-y-1.5 pt-2 border-t border-[#E0DBD3]">
                  {['Employer Commitments Ledger', 'Industry Problem Capsules', 'Candidate Defense Auditing', 'Guaranteed Interview Pipelines'].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs text-[#3C3A36]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#3A5C3A]" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-[#E0DBD3] flex items-center gap-2">
                <button
                  onClick={() => handleLaunchRole('INDUSTRY')}
                  className="flex-1 bg-[#1A1A18] hover:bg-[#262522] text-[#F9F7F4] text-xs font-semibold py-2.5 px-3 rounded transition-all text-center"
                >
                  Enter Industry Portal
                </button>
                <button
                  onClick={() => startOnboarding('mentor')}
                  className="p-2.5 rounded border border-[#E0DBD3] hover:bg-[#EAE6DF] text-[#5C5954]"
                  title="Onboarding Tour"
                >
                  <Compass className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Telemetry Stats */}
        <section className="py-12 bg-[#F2EFE9] border-t border-[#E0DBD3]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-1">
                <p className="font-display text-3xl sm:text-4xl font-light text-[#141412]">142+</p>
                <p className="text-xs font-mono text-[#5C5954] uppercase tracking-wider">Students Profiled</p>
              </div>
              <div className="space-y-1">
                <p className="font-display text-3xl sm:text-4xl font-light text-[#141412]">94.2%</p>
                <p className="text-xs font-mono text-[#5C5954] uppercase tracking-wider">Defense Rigor Rate</p>
              </div>
              <div className="space-y-1">
                <p className="font-display text-3xl sm:text-4xl font-light text-[#141412]">38</p>
                <p className="text-xs font-mono text-[#5C5954] uppercase tracking-wider">Problem Capsules</p>
              </div>
              <div className="space-y-1">
                <p className="font-display text-3xl sm:text-4xl font-light text-[#141412]">SHA-256</p>
                <p className="text-xs font-mono text-[#5C5954] uppercase tracking-wider">Tamper-Proof Passports</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#F9F7F4] border-t border-[#E0DBD3] py-8 text-xs text-[#8C8880]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-sm text-[#141412]">SkillLoop</span>
            <span>— Smart India Hackathon 2026 PS26044 Prototype</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setViewMode('app')} className="hover:text-[#141412] transition-colors">
              Platform Dashboard
            </button>
            <button onClick={() => startOnboarding('student')} className="hover:text-[#141412] transition-colors">
              Onboarding
            </button>
            <span>v1.0.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
