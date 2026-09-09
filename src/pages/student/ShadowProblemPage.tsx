import React, { useState } from 'react';
import { Code2, Play, CheckCircle2, AlertTriangle, Box, Sparkles, ArrowRight, Lock, RotateCcw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AIGuidanceModal } from '../../components/ai/AIGuidanceModal';

export const ShadowProblemPage: React.FC = () => {
  const { shadowProblems, attemptShadowProblem, setActiveTab, activeStudent } = useApp();
  const [selectedProblemId, setSelectedProblemId] = useState(shadowProblems[0].id);
  const [codeSolution, setCodeSolution] = useState(
    `class FraudDeduplicator:\n    def __init__(self, ttl_seconds=300):\n        self.ttl = ttl_seconds\n        self.seen_hashes = {}\n    \n    def is_duplicate(self, tx_id, timestamp):\n        self._evict_expired(timestamp)\n        if tx_id in self.seen_hashes:\n            return True\n        self.seen_hashes[tx_id] = timestamp\n        return False\n        \n    def _evict_expired(self, current_time):\n        expired = [k for k, v in self.seen_hashes.items() if current_time - v > self.ttl]\n        for k in expired:\n            del self.seen_hashes[k]`
  );
  const [reasoningInput, setReasoningInput] = useState(
    `I chose an in-memory Hash Map with lazy timestamp eviction to ensure O(1) membership lookup latency while keeping total memory bounded under 64MB.`
  );
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [executionResult, setExecutionResult] = useState<{
    tested: boolean;
    passed: boolean;
    score: number;
    misconception?: string;
  } | null>(null);

  const activeProblem = shadowProblems.find(p => p.id === selectedProblemId) || shadowProblems[0];

  const handleRunReadinessCheck = () => {
    const res = attemptShadowProblem(activeProblem.id, codeSolution, reasoningInput);
    setExecutionResult({
      tested: true,
      passed: res.passed,
      score: res.score,
      misconception: res.misconception
    });
  };

  return (
    <div className="space-y-6 fade-in pb-12 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#EAE2D3] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-display font-bold text-[#1C1413] tracking-tight">Shadow Problem Environment</h1>
            <span className="text-xs font-mono bg-[#FBF0F2] text-[#72192D] border border-[#F4D9DF] px-2 py-0.5 rounded font-semibold">
              Readiness Check
            </span>
          </div>
          <p className="text-xs text-[#7A6B62] mt-1">
            Synthetic industry problems designed to measure human understanding, build quality, and boundary reasoning before unlocking Problem Capsules.
          </p>
        </div>

        <button
          onClick={() => setIsAIModalOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 bg-[#F4EFE6] text-[#72192D] text-xs font-semibold rounded-xl hover:bg-[#EAE2D3] border border-[#EAE2D3] transition-colors shadow-xs"
        >
          <Sparkles className="w-4 h-4 text-[#72192D]" />
          <span>Ask AI Guidance</span>
        </button>
      </div>

      {/* Main Grid: Left Column Problem Selection & Constraints, Right Column Code Runner */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (1 Col): Problem Selector & Specs */}
        <div className="space-y-6">
          {/* Problem Selector Dropdown/Cards */}
          <div className="p-5 bg-white border border-[#EAE2D3] rounded-2xl shadow-sm space-y-4">
            <h3 className="font-bold text-[#1C1413] text-sm uppercase tracking-wide font-mono">
              Synthetic Industry Challenges
            </h3>

            <div className="space-y-2.5">
              {shadowProblems.map((prob) => {
                const isSelected = prob.id === selectedProblemId;
                return (
                  <button
                    key={prob.id}
                    onClick={() => {
                      setSelectedProblemId(prob.id);
                      setExecutionResult(null);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-[#FBF0F2] text-[#1C1413] border-[#72192D] shadow-xs'
                        : 'bg-[#FAF7F2] text-[#453831] border-[#EAE2D3] hover:bg-[#F4EFE6] hover:border-[#D5869B]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-[#7A6B62] font-semibold">{prob.companyName}</span>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        prob.status === 'passed' 
                          ? 'bg-[#E8EFEA] text-[#2C543D] border border-[#D2DFD6]' 
                          : isSelected ? 'bg-[#72192D] text-[#FAF7F2]' : 'bg-[#EAE2D3] text-[#5C4E46]'
                      }`}>
                        Threshold: {prob.readinessThreshold}%
                      </span>
                    </div>

                    <h4 className="font-bold text-xs mt-1 truncate text-[#1C1413]">{prob.title}</h4>
                    <p className="text-[11px] mt-0.5 line-clamp-1 text-[#7A6B62]">
                      {prob.summary}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scenario & Constraints Detail */}
          <div className="p-5 bg-white border border-[#EAE2D3] rounded-2xl shadow-sm space-y-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#7A6B62] font-bold block">
                Challenge Scenario ({activeProblem.companyName})
              </span>
              <h4 className="font-bold text-[#1C1413] text-sm mt-0.5">{activeProblem.title}</h4>
            </div>

            <p className="text-xs text-[#453831] leading-relaxed bg-[#FAF7F2] p-3 rounded-xl border border-[#EAE2D3]">
              {activeProblem.scenarioDescription}
            </p>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase text-[#7A6B62] font-bold block">
                Strict Constraints & Edge Cases:
              </span>
              <ul className="space-y-1 text-xs text-[#453831] font-mono">
                {activeProblem.constraints.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#72192D] font-bold">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column (2 Cols): Code Editor & Reasoning Runner */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 bg-white border border-[#EAE2D3] rounded-2xl shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAE2D3] pb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#72192D]" />
                <h3 className="font-display font-bold text-[#1C1413] text-base">Solution Code Editor</h3>
              </div>
              <span className="text-xs font-mono bg-[#F4EFE6] text-[#72192D] px-2.5 py-0.5 rounded-md border border-[#EAE2D3] font-semibold">
                Python 3.11 Runtime
              </span>
            </div>

            {/* Code Input Box */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-[#7A6B62] font-bold block">
                Implementation Code (In-Memory Hot Path)
              </label>
              <textarea
                rows={10}
                value={codeSolution}
                onChange={(e) => setCodeSolution(e.target.value)}
                className="w-full font-mono text-xs p-4 bg-[#1C1413] text-[#FAF7F2] rounded-xl border border-[#2E231E] focus:outline-none focus:border-[#72192D] leading-relaxed shadow-inner"
              />
            </div>

            {/* Reasoning & Defense Explanation Input Box */}
            <div className="space-y-1">
              <label className="text-[11px] font-mono uppercase text-[#7A6B62] font-bold block">
                Human Reasoning & Time Complexity Justification
              </label>
              <textarea
                rows={3}
                value={reasoningInput}
                onChange={(e) => setReasoningInput(e.target.value)}
                placeholder="Explain your approach, eviction policy, time complexity bounds, and memory trade-offs..."
                className="w-full text-xs p-3 border border-[#EAE2D3] bg-[#FAF7F2] text-[#1C1413] rounded-xl focus:outline-none focus:border-[#72192D] leading-relaxed"
              />
            </div>

            {/* Run Test & Execution Result Feedback */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#EAE2D3]">
              <button
                onClick={handleRunReadinessCheck}
                className="px-6 py-2.5 bg-[#72192D] hover:bg-[#8E233B] text-[#FAF7F2] text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Run Readiness Check</span>
              </button>

              <span className="text-xs text-[#7A6B62] font-mono font-semibold">
                Attempts recorded: {activeProblem.attemptsCount} | Last Score: {activeProblem.lastScore || 'N/A'}
              </span>
            </div>

            {/* Result Display Box */}
            {executionResult && (
              <div className={`p-4 border rounded-xl fade-in space-y-3 ${
                executionResult.passed 
                  ? 'bg-[#E8EFEA] border-[#D2DFD6]' 
                  : 'bg-[#FBEDE6] border-[#F5D7C9]'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {executionResult.passed ? (
                      <CheckCircle2 className="w-5 h-5 text-[#2C543D]" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-[#99411F]" />
                    )}
                    <h4 className="font-bold text-sm text-[#1C1413]">
                      {executionResult.passed ? 'Readiness Check PASSED!' : 'Readiness Threshold Not Met'}
                    </h4>
                  </div>
                  <span className={`font-mono font-extrabold text-sm ${executionResult.passed ? 'text-[#2C543D]' : 'text-[#99411F]'}`}>
                    Score: {executionResult.score} / 100
                  </span>
                </div>

                <p className="text-xs text-[#453831] leading-relaxed">
                  {executionResult.passed 
                    ? `Congratulations! Score of ${executionResult.score}/100 exceeds the threshold of ${activeProblem.readinessThreshold}%. Problem Capsule Stage unlocked!`
                    : `Your submission scored ${executionResult.score}/100 (Threshold: ${activeProblem.readinessThreshold}%). Review the constraints and use AI Guidance to refine your memory eviction strategy.`}
                </p>

                {executionResult.passed ? (
                  <button
                    onClick={() => setActiveTab('problem-capsule')}
                    className="w-full py-2 bg-[#2C543D] text-[#FAF7F2] text-xs font-bold rounded-lg hover:bg-[#1F3D2B] transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Box className="w-4 h-4 text-[#D2DFD6]" />
                    <span>Proceed to Problem Capsule Unlock</span>
                  </button>
                ) : (
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-[#F5D7C9]">
                    <span className="text-[#7A6B62]">Need conceptual assistance?</span>
                    <button
                      onClick={() => setIsAIModalOpen(true)}
                      className="text-[#72192D] font-bold hover:underline"
                    >
                      Open AI Guidance Engine
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <AIGuidanceModal 
        isOpen={isAIModalOpen} 
        onClose={() => setIsAIModalOpen(false)}
        contextTitle={activeProblem.title}
        contextDescription={activeProblem.summary}
      />
    </div>
  );
};
