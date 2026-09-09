import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

export const HackathonDemoNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setActiveTab, setRole, setViewMode, showToast } = useApp();

  const demoLinks = [
    { label: '1. Student Journey', tab: 'dashboard', role: 'STUDENT', icon: '👨‍🎓', desc: 'Readiness & Radar' },
    { label: '2. Skill Gap & Simulator', tab: 'skillgap', role: 'STUDENT', icon: '🔍', desc: 'Delta & Boost simulator' },
    { label: '3. Skill Assessment', tab: 'assessment', role: 'STUDENT', icon: '📝', desc: 'Interactive Quiz' },
    { label: '4. Opportunity Matching', tab: 'opportunities', role: 'STUDENT', icon: '💼', desc: 'TechNova & Zepto Matches' },
    { label: '5. Industry Portal', tab: 'industry-portal', role: 'INDUSTRY', icon: '🏢', desc: 'TechNova Talent Discovery' },
    { label: '6. Academia Analytics', tab: 'academia', role: 'FACULTY', icon: '🏫', desc: 'NEP 2020 & Cohort Gaps' },
    { label: '7. AI Copilot', tab: 'copilot', role: 'STUDENT', icon: '🤖', desc: 'Instant Advisory' }
  ];

  const handleNavigate = (tab: string, role: any) => {
    setRole(role);
    setActiveTab(tab);
    setViewMode('app');
    setIsOpen(false);
    showToast(`Navigated to ${tab.toUpperCase()} (${role})`, 'info');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="mb-3 glass-strong rounded-2xl p-4 border border-amber-500/30 shadow-2xl min-w-56 animate-fade-up">
          <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
            <span className="text-amber-400 font-bold text-xs font-mono tracking-wider">
              🚀 HACKATHON DEMO NAV
            </span>
            <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded">
              SIH 2026
            </span>
          </div>

          <div className="space-y-1">
            {demoLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigate(item.tab, item.role)}
                className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg hover:bg-amber-500/10 text-slate-300 hover:text-amber-300 text-xs transition-all text-left group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{item.icon}</span>
                  <span className="font-medium group-hover:text-white">{item.label}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500 group-hover:text-slate-400 hidden sm:inline">
                  {item.desc}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-400 hover:from-orange-500 hover:to-yellow-300 text-white font-bold text-2xl shadow-lg transition-all hover-lift flex items-center justify-center border border-amber-400/40 glow-orange"
        title="Hackathon Fast Navigator"
      >
        <span>🚀</span>
      </button>
    </div>
  );
};
