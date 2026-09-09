import React, { useState } from 'react';
import { Users, ShieldCheck, Plus, CheckCircle2, Sparkles, UserPlus } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TeamMatchingPage: React.FC = () => {
  const { teams, students, showToast } = useApp();
  const [showBuildModal, setShowBuildModal] = useState(false);

  return (
    <div className="space-y-6 fade-in pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-mono-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-mono-950 tracking-tight">Candidate Team Assembly & Skill Matching</h1>
            <span className="text-xs font-mono bg-mono-900 text-white px-2 py-0.5 rounded font-semibold">
              P1 Feature
            </span>
          </div>
          <p className="text-xs text-mono-500 mt-1">
            Form high-capability candidate teams tailored to complex multi-role industry challenges based on verified skill complementarity.
          </p>
        </div>

        <button
          onClick={() => setShowBuildModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-mono-950 text-white text-xs font-bold rounded-md hover:bg-mono-800 transition-colors shadow-xs"
        >
          <UserPlus className="w-4 h-4" />
          <span>Form New Candidate Team</span>
        </button>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teams.map((t) => (
          <div key={t.id} className="p-6 bg-white border border-mono-300 rounded-lg shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-mono-200 pb-3">
                <div>
                  <h3 className="font-bold text-mono-950 text-base">{t.name}</h3>
                  <span className="text-xs text-mono-500">{t.company} • {t.challengeTitle}</span>
                </div>
                <span className="text-xs font-mono font-bold bg-mono-950 text-white px-2.5 py-1 rounded">
                  Avg Readiness: {t.avgReadiness}%
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase text-mono-500 font-bold block">
                  Team Roster & Verified Roles ({t.members.length} Members):
                </span>
                <div className="space-y-2">
                  {t.members.map((m) => (
                    <div key={m.id} className="p-3 border border-mono-200 rounded bg-mono-50 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img 
                          src={m.avatar} 
                          alt={m.name}
                          className="w-8 h-8 rounded-full border border-mono-300 object-cover" 
                        />
                        <div>
                          <span className="font-bold text-mono-950 block">{m.name}</span>
                          <span className="text-[11px] text-mono-500 font-mono">{m.role}</span>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-mono-950 bg-white px-2 py-0.5 rounded border border-mono-200">
                        {m.readinessScore}% Readiness
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-mono-200 flex justify-between items-center text-xs font-mono text-mono-500">
              <span>Match Status: <strong className="text-mono-950 uppercase">{t.status}</strong></span>
              <button 
                onClick={() => showToast(`Team ${t.name} selected for Challenge sandbox!`, 'success')}
                className="text-mono-950 font-bold hover:underline"
              >
                Inspect Skill Radar
              </button>
            </div>
          </div>
        ))}
      </div>

      {showBuildModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mono-950/60 backdrop-blur-xs fade-in">
          <div className="w-full max-w-md bg-white border border-mono-300 rounded-lg p-6 space-y-4">
            <h3 className="font-bold text-mono-950 text-base border-b border-mono-200 pb-2">
              Form Candidate Team
            </h3>
            <p className="text-xs text-mono-600 leading-relaxed">
              Auto-matching candidate capabilities using vector similarity across Data Structures, Debugging, and Code Design.
            </p>
            <div className="p-3 bg-mono-50 border border-mono-200 rounded text-xs font-mono text-mono-800">
              Selected Members: Rahul Kumar (Systems Lead) + Priya Sharma (Backend)
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowBuildModal(false)}
                className="px-4 py-2 border border-mono-300 text-mono-700 text-xs font-semibold rounded hover:bg-mono-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowBuildModal(false);
                  showToast('Candidate Team assembled successfully!', 'success');
                }}
                className="px-4 py-2 bg-mono-950 text-white text-xs font-bold rounded hover:bg-mono-800 shadow-xs"
              >
                Confirm Team Assembly
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
