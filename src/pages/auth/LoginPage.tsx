import React, { useState } from 'react';
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  User,
  GraduationCap,
  Building2,
  Briefcase,
  Sliders,
  CheckCircle2,
  KeyRound,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';

export const LoginPage: React.FC = () => {
  const { login, students, setViewMode } = useApp();
  const [selectedRole, setSelectedRole] = useState<UserRole>('STUDENT');
  const [selectedStudentId, setSelectedStudentId] = useState('stu_1');
  const [username, setUsername] = useState('rahul.kumar@inst.edu.in');
  const [password, setPassword] = useState('••••••••••••');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole, selectedRole === 'STUDENT' ? selectedStudentId : undefined);
    setViewMode('app');
  };

  const handleQuickDemoLogin = (role: UserRole, stuId?: string, email?: string) => {
    if (email) setUsername(email);
    login(role, stuId);
    setViewMode('app');
  };

  const roleDetails: Record<UserRole, { title: string; subtitle: string; icon: React.ReactNode; defaultEmail: string }> = {
    STUDENT: {
      title: 'Student / Candidate',
      subtitle: 'Solve Shadow Problems, complete Diagnostics, defend code & earn Capability Passports',
      icon: <User className="w-5 h-5 text-[#1A1A18]" />,
      defaultEmail: 'rahul.kumar@inst.edu.in'
    },
    FACULTY: {
      title: 'Faculty / Educator',
      subtitle: 'Monitor cohort skill gaps, detect misconceptions, and align curriculum with NEP 2020',
      icon: <GraduationCap className="w-5 h-5 text-[#1A1A18]" />,
      defaultEmail: 'dr.ramesh@inst.edu.in'
    },
    INSTITUTION: {
      title: 'Institution / Dean',
      subtitle: 'Accreditation reporting, cross-department analytics, and placement readiness tracking',
      icon: <Building2 className="w-5 h-5 text-[#1A1A18]" />,
      defaultEmail: 'dean.academics@inst.edu.in'
    },
    INDUSTRY: {
      title: 'Industry / Employer',
      subtitle: 'Sponsor challenge capsules, audit candidate defense reasoning, issue guaranteed hires',
      icon: <Briefcase className="w-5 h-5 text-[#1A1A18]" />,
      defaultEmail: 'rajesh.sharma@industrycorp.com'
    },
    ADMIN: {
      title: 'Platform Evaluator',
      subtitle: 'System administration, telemetry ingestion, and evaluation controls',
      icon: <Sliders className="w-5 h-5 text-[#1A1A18]" />,
      defaultEmail: 'admin@skillloop.gov.in'
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F4] text-[#141412] flex flex-col justify-between selection:bg-[#C8BFB0] font-sans">
      {/* Top Banner */}
      <header className="border-b border-[#E0DBD3] bg-[#F9F7F4]/90 backdrop-blur-md px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('landing')}
              className="mr-2 p-1.5 rounded hover:bg-[#EAE6DF] text-[#5C5954] transition-colors"
              title="Return to Landing Page"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="w-9 h-9 bg-[#1A1A18] text-[#F9F7F4] rounded flex items-center justify-center font-display font-bold text-lg">
              SL
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-semibold text-lg text-[#141412]">SkillLoop</span>
                <span className="text-[10px] font-mono uppercase bg-[#EAE6DF] text-[#5C5954] px-1.5 py-0.5 rounded border border-[#E0DBD3]">
                  SIH 2026 PS26044
                </span>
              </div>
              <p className="text-xs text-[#8C8880]">Capability Intelligence Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode('landing')}
              className="text-xs font-semibold text-[#5C5954] hover:text-[#141412] transition-colors"
            >
              View Landing Page
            </button>
            <span className="hidden sm:inline-block text-[11px] font-mono text-[#8C8880] bg-[#F2EFE9] px-2.5 py-1 rounded border border-[#E0DBD3]">
              Evidence-Verified Auth
            </span>
          </div>
        </div>
      </header>

      {/* Main Login Area */}
      <main className="max-w-6xl mx-auto px-4 py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Context & Vision */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2EFE9] border border-[#E0DBD3] text-[#5C5954] text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#1A1A18]" />
            <span>SIH 2026 PS26044 Judging Prototype</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-light text-[#141412] leading-tight">
            From Skill Gaps to <br />
            <span className="italic font-normal">Industry-Ready Talent</span>
          </h2>

          <div className="p-5 rounded bg-[#F2EFE9] border border-[#E0DBD3] space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8C8880] block">
              Core Philosophy
            </span>
            <p className="text-sm font-display italic text-[#3C3A36] leading-relaxed">
              "We don’t measure what AI can produce. We measure what the human can understand, build, defend and adapt."
            </p>
          </div>

          {/* Quick 1-Click Persona Access */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8C8880]">
                Quick 1-Click Demo Personas
              </span>
              <span className="text-[10px] font-mono text-[#8C8880]">Instant Role Switch</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('STUDENT', 'stu_1', 'rahul.kumar@inst.edu.in')}
                className="text-left p-3 rounded bg-[#F2EFE9] hover:bg-[#EAE6DF] border border-[#E0DBD3] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#141412]">Rahul Kumar</span>
                  <span className="text-[10px] font-mono bg-[#EAE6DF] px-1.5 py-0.5 rounded text-[#5C5954]">68% Ready</span>
                </div>
                <p className="text-[11px] text-[#8C8880] mt-0.5">Data Analyst Track · Has Active Gap Alert</p>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('STUDENT', 'stu_2', 'priya.sharma@inst.edu.in')}
                className="text-left p-3 rounded bg-[#F2EFE9] hover:bg-[#EAE6DF] border border-[#E0DBD3] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#141412]">Priya Sharma</span>
                  <span className="text-[10px] font-mono bg-[#E8F0E8] text-[#3A5C3A] px-1.5 py-0.5 rounded">82% Ready</span>
                </div>
                <p className="text-[11px] text-[#8C8880] mt-0.5">Software Developer · Defended Solutions</p>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('FACULTY', undefined, 'dr.ramesh@inst.edu.in')}
                className="text-left p-3 rounded bg-[#F2EFE9] hover:bg-[#EAE6DF] border border-[#E0DBD3] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#141412]">Dr. Ramesh Kumar</span>
                  <span className="text-[10px] font-mono bg-[#EAE6DF] px-1.5 py-0.5 rounded text-[#5C5954]">Faculty</span>
                </div>
                <p className="text-[11px] text-[#8C8880] mt-0.5">Batch Analytics & NEP Ingestion</p>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemoLogin('INDUSTRY', undefined, 'rajesh.sharma@industrycorp.com')}
                className="text-left p-3 rounded bg-[#F2EFE9] hover:bg-[#EAE6DF] border border-[#E0DBD3] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#141412]">Rajesh Sharma</span>
                  <span className="text-[10px] font-mono bg-[#EAE6DF] px-1.5 py-0.5 rounded text-[#5C5954]">Employer</span>
                </div>
                <p className="text-[11px] text-[#8C8880] mt-0.5">Zepto Tech · Commitment & Challenge Ledger</p>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Login Card */}
        <div className="lg:col-span-6">
          <div className="bg-[#F2EFE9] border border-[#E0DBD3] rounded-md p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <KeyRound className="w-4 h-4 text-[#1A1A18]" />
                <h3 className="font-display text-xl font-light text-[#141412]">Sign In to Platform</h3>
              </div>
              <p className="text-xs text-[#5C5954]">
                Choose your role to explore the tailored intelligence workflow.
              </p>
            </div>

            {/* Role Selector Tabs */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 p-1 bg-[#EAE6DF] rounded border border-[#E0DBD3]">
              {(['STUDENT', 'FACULTY', 'INSTITUTION', 'INDUSTRY', 'ADMIN'] as UserRole[]).map((r) => {
                const isSelected = selectedRole === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => {
                      setSelectedRole(r);
                      setUsername(roleDetails[r].defaultEmail);
                    }}
                    className={`py-2 px-1 text-center rounded transition-all ${
                      isSelected
                        ? 'bg-[#1A1A18] text-[#F9F7F4] shadow-xs'
                        : 'text-[#5C5954] hover:text-[#141412]'
                    }`}
                  >
                    <span className="block text-[11px] font-mono font-semibold uppercase">{r.slice(0, 4)}</span>
                  </button>
                );
              })}
            </div>

            {/* Role description callout */}
            <div className="p-3.5 rounded bg-[#F9F7F4] border border-[#E0DBD3] flex items-start gap-3">
              <div className="shrink-0 mt-0.5">{roleDetails[selectedRole].icon}</div>
              <div>
                <h4 className="text-xs font-semibold text-[#141412]">{roleDetails[selectedRole].title}</h4>
                <p className="text-[11px] text-[#5C5954] mt-0.5 leading-normal">
                  {roleDetails[selectedRole].subtitle}
                </p>
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {selectedRole === 'STUDENT' && (
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#5C5954] mb-1">
                    Select Student Persona
                  </label>
                  <select
                    value={selectedStudentId}
                    onChange={(e) => {
                      setSelectedStudentId(e.target.value);
                      const stu = students.find(s => s.id === e.target.value);
                      if (stu) setUsername(stu.email);
                    }}
                    className="w-full px-3 py-2 text-xs bg-[#F9F7F4] border border-[#E0DBD3] rounded text-[#141412] focus:outline-none focus:border-[#1A1A18]"
                  >
                    {students.map((stu) => (
                      <option key={stu.id} value={stu.id}>
                        {stu.name} — {stu.targetRole} (Score: {stu.readinessScore}%)
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5C5954] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F9F7F4] border border-[#E0DBD3] rounded text-[#141412] focus:outline-none focus:border-[#1A1A18]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#5C5954] mb-1">
                  Security Passphrase
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#F9F7F4] border border-[#E0DBD3] rounded text-[#141412] focus:outline-none focus:border-[#1A1A18]"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1A1A18] hover:bg-[#262522] text-[#F9F7F4] text-xs font-semibold py-2.5 px-4 rounded transition-all shadow-sm flex items-center justify-center gap-2 mt-2"
              >
                <span>Enter as {selectedRole}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E0DBD3] bg-[#F9F7F4] py-4 text-center text-xs text-[#8C8880]">
        SkillLoop Capability Intelligence Platform · Smart India Hackathon 2026 PS26044
      </footer>
    </div>
  );
};
