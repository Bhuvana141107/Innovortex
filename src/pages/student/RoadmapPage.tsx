import React from 'react';
import { ListOrdered, CheckCircle2, Play, RotateCcw, ArrowRight, Zap, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const RoadmapPage: React.FC = () => {
  const { roadmap, updateRoadmapItemStatus, activeStudent, setActiveTab } = useApp();

  const completedCount = roadmap.filter(r => r.status === 'completed').length;
  const progressPct = Math.round((completedCount / roadmap.length) * 100);

  return (
    <div className="space-y-6 fade-in pb-12">
      {/* Header */}
      <div className="border-b border-mono-200 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-mono-950 tracking-tight">Adaptive Action Roadmap</h1>
              <span className="text-xs font-mono bg-mono-900 text-white px-2 py-0.5 rounded font-semibold">
                Dynamic Gap Bridge
              </span>
            </div>
            <p className="text-xs text-mono-500 mt-1">
              Personalized action tasks generated from detected capability gaps. Completing tasks directly increases your Career Readiness Score.
            </p>
          </div>

          <div className="text-right font-mono">
            <span className="text-2xl font-extrabold text-mono-950">{completedCount}/{roadmap.length}</span>
            <span className="text-xs text-mono-500 block">Tasks Completed</span>
          </div>
        </div>
      </div>

      {/* Progress Bar Card */}
      <div className="p-5 bg-white border border-mono-300 rounded-lg shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-mono-600 font-semibold">Overall Roadmap Completion</span>
          <span className="text-mono-950 font-bold">{progressPct}%</span>
        </div>
        <div className="w-full bg-mono-100 h-3 rounded-full overflow-hidden border border-mono-200">
          <div 
            className="bg-mono-950 h-full transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Roadmap Items List */}
      <div className="space-y-4">
        {roadmap.map((item, idx) => {
          return (
            <div 
              key={item.id}
              className={`p-5 border rounded-lg transition-all ${
                item.status === 'completed'
                  ? 'bg-mono-50 border-mono-300'
                  : item.status === 'in_progress'
                  ? 'bg-white border-mono-950 shadow-xs'
                  : 'bg-white border-mono-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-mono-950 text-white px-2 py-0.5 rounded">
                      TASK 0{idx + 1}
                    </span>
                    <span className="text-xs font-mono uppercase bg-mono-200 text-mono-800 px-2 py-0.5 rounded">
                      Category: {item.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-mono-900">
                      +{item.impactScore} Readiness Score
                    </span>
                  </div>

                  <h3 className="font-bold text-mono-950 text-base">{item.title}</h3>
                  <p className="text-xs text-mono-600 leading-relaxed">{item.description}</p>

                  <div className="flex items-center gap-4 text-[11px] text-mono-500 font-mono pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      Est. Time: {item.estimatedHours} Hours
                    </span>
                    <span>Status: <strong className="text-mono-950 uppercase">{item.status.replace('_', ' ')}</strong></span>
                  </div>
                </div>

                {/* State Toggle Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  {item.status === 'not_started' && (
                    <button
                      onClick={() => updateRoadmapItemStatus(item.id, 'in_progress')}
                      className="px-4 py-2 bg-mono-950 text-white text-xs font-bold rounded hover:bg-mono-800 transition-colors flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Start Task</span>
                    </button>
                  )}

                  {item.status === 'in_progress' && (
                    <button
                      onClick={() => updateRoadmapItemStatus(item.id, 'completed')}
                      className="px-4 py-2 bg-mono-950 text-white text-xs font-bold rounded hover:bg-mono-800 transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Complete (+{item.impactScore})</span>
                    </button>
                  )}

                  {item.status === 'completed' && (
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1.5 bg-mono-200 text-mono-950 text-xs font-bold rounded border border-mono-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </span>
                      <button
                        onClick={() => updateRoadmapItemStatus(item.id, 'in_progress')}
                        className="p-1.5 text-mono-500 hover:text-mono-950 border border-mono-300 rounded hover:bg-mono-100 transition-colors"
                        title="Re-open Task"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next Flow Step Button */}
      <div className="p-6 border border-mono-300 rounded-lg bg-mono-50 flex justify-between items-center">
        <div>
          <h4 className="font-bold text-sm text-mono-950">Ready for Practical Execution?</h4>
          <p className="text-xs text-mono-500">Apply your roadmap learning in the synthetic Shadow Problem environment.</p>
        </div>
        <button
          onClick={() => setActiveTab('shadow-problem')}
          className="px-5 py-2.5 bg-mono-950 text-white text-xs font-bold rounded-md hover:bg-mono-800 transition-colors flex items-center gap-2 shadow-xs"
        >
          <span>Shadow Problem Environment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
