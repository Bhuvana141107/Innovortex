import React from 'react';
import {
  LayoutDashboard,
  HelpCircle,
  Compass,
  Split,
  ListOrdered,
  Code2,
  Box,
  ShieldAlert,
  Award,
  Users,
  Briefcase,
  Building2,
  FileText,
  CheckSquare,
  BarChart3,
  BookOpen,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar: React.FC = () => {
  const { role, activeTab, setActiveTab, activeStudent } = useApp();

  const studentNav = [
    { id: 'dashboard', label: 'Dashboard & Visuals', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'diagnostic', label: 'Diagnostic Testing', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'capability-map', label: 'Capability Map (4-Tier)', icon: <Compass className="w-4 h-4" /> },
    { id: 'skill-gap', label: 'Skill Gap Engine', icon: <Split className="w-4 h-4" /> },
    { id: 'roadmap', label: 'Adaptive 6-Wk Roadmap', icon: <ListOrdered className="w-4 h-4" /> },
    { id: 'shadow-problem', label: 'AI Shadow Sandbox', icon: <Code2 className="w-4 h-4" /> },
    { id: 'problem-capsule', label: 'Problem Capsules', icon: <Box className="w-4 h-4" /> },
    { id: 'defense', label: 'Socratic AI Defense', icon: <ShieldAlert className="w-4 h-4" /> },
    { id: 'passport', label: 'Capability Passport', icon: <Award className="w-4 h-4" /> },
    { id: 'team-matching', label: 'Team Matching', icon: <Users className="w-4 h-4" /> },
    { id: 'jobs', label: 'Opportunities & Jobs', icon: <Briefcase className="w-4 h-4" /> },
  ];

  const industryNav = [
    { id: 'industry-commitments', label: 'Employer Commitments', icon: <Building2 className="w-4 h-4" /> },
    { id: 'challenge-ledger', label: 'Auditable Challenge Ledger', icon: <FileText className="w-4 h-4" /> },
    { id: 'candidate-eval', label: 'Candidate Defenses & Hiring', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'team-matching', label: 'Candidate Teams', icon: <Users className="w-4 h-4" /> },
  ];

  const academiaNav = [
    { id: 'academia', label: 'Demand & Capability Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'data-collector', label: 'NEP 2020 Data Collector', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'curriculum', label: 'Curriculum Mapping', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'cohort', label: 'Student Cohort Oversight', icon: <GraduationCap className="w-4 h-4" /> },
  ];

  let navItems = studentNav;
  if (role === 'INDUSTRY') navItems = industryNav;
  else if (role === 'FACULTY' || role === 'INSTITUTION') navItems = academiaNav;
  else if (role === 'ADMIN') navItems = [...studentNav, ...industryNav];

  return (
    <aside className="w-64 bg-[#FAF7F2] border-r border-[#EAE2D3] flex flex-col shrink-0 min-h-[calc(100vh-4.5rem)]">
      {/* Active profile badge */}
      <div className="p-4 border-b border-[#EAE2D3] bg-[#F4EFE6]">
        <div className="text-[10px] font-mono uppercase tracking-wider text-[#7A6B62] font-semibold mb-1">
          Active Role: {role}
        </div>
        {role === 'STUDENT' ? (
          <div className="flex items-center gap-3">
            <img
              src={activeStudent.avatar}
              alt={activeStudent.name}
              className="w-9 h-9 rounded-full border border-[#EAE2D3] object-cover"
            />
            <div className="overflow-hidden">
              <div className="font-semibold text-xs text-[#1C1413] truncate">{activeStudent.name}</div>
              <div className="text-[11px] text-[#5C4E46] truncate">{activeStudent.targetRole}</div>
            </div>
          </div>
        ) : (
          <div className="font-semibold text-xs text-[#1C1413] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#72192D]" />
            <span>{role} Workspace</span>
          </div>
        )}
      </div>

      {/* Navigation links */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-[#7A6B62] font-semibold">
          Platform Capabilities
        </div>
        {navItems.map((item) => {
          const isActive = activeTab === item.id || 
            (item.id === 'curriculum' && activeTab === 'academia') || 
            (item.id === 'cohort' && activeTab === 'academia');
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id === 'curriculum' || item.id === 'cohort' ? 'academia' : item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#FBF0F2] text-[#72192D] border-l-2 border-[#72192D] shadow-xs'
                  : 'text-[#5C4E46] hover:bg-[#F4EFE6] hover:text-[#1C1413]'
              }`}
            >
              <span className={isActive ? 'text-[#72192D]' : 'text-[#7A6B62]'}>
                {item.icon}
              </span>
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer info card */}
      <div className="p-4 border-t border-[#EAE2D3] bg-[#F4EFE6]">
        <div className="border border-[#EAE2D3] rounded-lg p-2.5 bg-[#FAF7F2] text-[11px] text-[#5C4E46] leading-snug">
          <span className="font-semibold text-[#1C1413] block mb-0.5">Continuous Loop Active</span>
          <span>Measuring understanding, build quality, Socratic defense & adaptation.</span>
        </div>
      </div>
    </aside>
  );
};
