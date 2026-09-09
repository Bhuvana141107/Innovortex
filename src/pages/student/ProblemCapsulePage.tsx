import React, { useState } from 'react';
import { Box, Lock, Unlock, ArrowRight, ShieldCheck, FileText, Code2, Database, Terminal } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CapsuleUnlockStage } from '../../types';

export const ProblemCapsulePage: React.FC = () => {
  const { problemCapsules, setActiveTab } = useApp();
  const [selectedCapsuleId, setSelectedCapsuleId] = useState(problemCapsules[0].id);
  const [activeStageTab, setActiveStageTab] = useState<CapsuleUnlockStage>('Contextual');

  const capsule = problemCapsules.find(c => c.id === selectedCapsuleId) || problemCapsules[0];

  const stagesOrder: CapsuleUnlockStage[] = ['Sanitized', 'Contextual', 'Restricted', 'Full'];

  const getStageUnlockStatus = (stage: CapsuleUnlockStage) => {
    const currentIdx = stagesOrder.indexOf(capsule.currentStage);
    const targetIdx = stagesOrder.indexOf(stage);
    return targetIdx <= currentIdx;
  };

  return (
    <div className="space-y-6 fade-in pb-12">
      {/* Header */}
      <div className="border-b border-mono-200 pb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-mono-950 tracking-tight">Industry Problem Capsule</h1>
          <span className="text-xs font-mono bg-mono-900 text-white px-2 py-0.5 rounded font-semibold">
            Progressive Unlock
          </span>
        </div>
        <p className="text-xs text-mono-500 mt-1">
          Gradual exposure of production requirements, edge cases, input schemas, and repository access based on demonstrated readiness.
        </p>
      </div>

      {/* Main Grid: Left Column Capsule Selector, Right Column Progressive Stage Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (1 Col): Capsule Selector List */}
        <div className="space-y-4">
          <h3 className="font-bold text-mono-950 text-sm uppercase tracking-wide font-mono">
            Active Employer Capsules ({problemCapsules.length})
          </h3>

          <div className="space-y-3">
            {problemCapsules.map((cap) => {
              const isSelected = cap.id === selectedCapsuleId;
              return (
                <div
                  key={cap.id}
                  onClick={() => setSelectedCapsuleId(cap.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-mono-950 text-white border-mono-950 shadow-sm'
                      : 'bg-white text-mono-950 border-mono-300 hover:border-mono-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase opacity-75">{cap.company}</span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                      isSelected ? 'bg-white text-mono-950' : 'bg-mono-200 text-mono-900'
                    }`}>
                      Stage: {cap.currentStage}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs mt-2 leading-snug">{cap.title}</h4>

                  <div className="mt-3 pt-2 border-t border-mono-800/20 flex items-center justify-between text-xs font-mono">
                    <span className="opacity-80">Req. Readiness: {cap.requiredReadiness}%</span>
                    <span className="uppercase font-bold">{cap.commitmentType.replace('_', ' ')}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (2 Cols): 4-Stage Progressive Pipeline & Content Viewer */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-white border border-mono-300 rounded-lg shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-mono-200 pb-4 gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase bg-mono-100 text-mono-800 px-2 py-0.5 rounded font-bold">
                  {capsule.company} Problem Capsule
                </span>
                <h3 className="font-bold text-mono-950 text-lg mt-1">{capsule.title}</h3>
              </div>
              <span className="text-xs font-mono font-bold bg-mono-950 text-white px-3 py-1 rounded">
                Current Level: {capsule.currentStage}
              </span>
            </div>

            {/* 4-Stage Unlock Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-mono-200 pb-4">
              {stagesOrder.map((stgName, idx) => {
                const isUnlocked = getStageUnlockStatus(stgName);
                const isActiveTab = activeStageTab === stgName;
                return (
                  <button
                    key={stgName}
                    disabled={!isUnlocked}
                    onClick={() => setActiveStageTab(stgName)}
                    className={`p-3 rounded-md border text-left text-xs transition-all flex flex-col justify-between ${
                      isActiveTab
                        ? 'bg-mono-950 text-white border-mono-950 shadow-xs'
                        : isUnlocked
                        ? 'bg-mono-50 text-mono-900 border-mono-200 hover:bg-mono-100'
                        : 'bg-mono-100 text-mono-400 border-mono-200 opacity-60 cursor-not-allowed'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span>STAGE 0{idx + 1}</span>
                      {isUnlocked ? <Unlock className="w-3.5 h-3.5 text-mono-300" /> : <Lock className="w-3.5 h-3.5 text-mono-400" />}
                    </div>
                    <span className="font-bold mt-1">{stgName}</span>
                    <span className="text-[10px] font-mono mt-1 opacity-80">
                      {isUnlocked ? 'Unlocked' : 'Locked'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Stage Content Viewer */}
            <div className="space-y-4">
              {activeStageTab === 'Sanitized' && (
                <div className="p-5 border border-mono-200 rounded-md bg-mono-50 space-y-3 fade-in">
                  <h4 className="font-bold text-mono-950 text-sm">{capsule.stages.sanitized.title}</h4>
                  <p className="text-xs text-mono-700 leading-relaxed">{capsule.stages.sanitized.summary}</p>
                  <div className="p-3 bg-white border border-mono-300 rounded font-mono text-xs">
                    <span className="font-bold text-mono-950 block mb-1">Core Business Goal:</span>
                    <span className="text-mono-800">{capsule.stages.sanitized.businessGoal}</span>
                  </div>
                </div>
              )}

              {activeStageTab === 'Contextual' && (
                <div className="p-5 border border-mono-200 rounded-md bg-mono-50 space-y-4 fade-in">
                  <h4 className="font-bold text-mono-950 text-sm">{capsule.stages.contextual.title}</h4>
                  <p className="text-xs text-mono-700 leading-relaxed">{capsule.stages.contextual.environmentContext}</p>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase text-mono-500 font-bold block">
                      Production Edge Cases & Real-World Constraints:
                    </span>
                    <ul className="space-y-1.5 text-xs text-mono-900 font-mono">
                      {capsule.stages.contextual.realWorldEdgeCases.map((ec, i) => (
                        <li key={i} className="flex items-center gap-2 bg-white p-2 rounded border border-mono-200">
                          <span className="text-mono-400">•</span>
                          <span>{ec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeStageTab === 'Restricted' && (
                <div className="p-5 border border-mono-200 rounded-md bg-mono-50 space-y-4 fade-in">
                  <h4 className="font-bold text-mono-950 text-sm">{capsule.stages.restricted.title}</h4>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase text-mono-500 font-bold block">
                      Production Schema Definition:
                    </span>
                    <pre className="p-3 bg-mono-950 text-mono-100 font-mono text-xs rounded border border-mono-800">
                      {capsule.stages.restricted.inputSchemas}
                    </pre>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase text-mono-500 font-bold block">
                      Performance Constraints:
                    </span>
                    <ul className="space-y-1 text-xs font-mono text-mono-800">
                      {capsule.stages.restricted.performanceConstraints.map((pc, i) => (
                        <li key={i}>- {pc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeStageTab === 'Full' && (
                <div className="p-5 border border-mono-200 rounded-md bg-mono-50 space-y-4 fade-in">
                  <h4 className="font-bold text-mono-950 text-sm">{capsule.stages.full.title}</h4>
                  <p className="text-xs text-mono-700 leading-relaxed">{capsule.stages.full.dataSpecification}</p>
                  <div className="p-3 bg-mono-950 text-mono-100 font-mono text-xs rounded border border-mono-800 flex items-center justify-between">
                    <span className="truncate">{capsule.stages.full.fullRepoAccess}</span>
                    <span className="text-[10px] bg-mono-800 px-2 py-0.5 rounded text-mono-300">SSH Key Verified</span>
                  </div>
                </div>
              )}
            </div>

            {/* Next Action: Proceed to Defense & Reasoning */}
            <div className="pt-4 border-t border-mono-200 flex justify-between items-center">
              <span className="text-xs text-mono-500">Ready to defend your solution architecture?</span>
              <button
                onClick={() => setActiveTab('defense')}
                className="px-5 py-2.5 bg-mono-950 text-white text-xs font-bold rounded-md hover:bg-mono-800 transition-colors flex items-center gap-2 shadow-xs"
              >
                <span>Defense & Reasoning Checkpoint</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
